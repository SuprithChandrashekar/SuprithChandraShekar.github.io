/* Camera rig. The camera is tied to the runner and changes its seat as the
   scroll position moves through the sectors. Offsets are relative to the runner,
   which travels down -Z. */

import * as THREE from "three";

// p: scroll position. off: camera seat. look: aim point. shift: how far the frame
// is pushed sideways (fraction of the viewport) so the runner sits right of centre.
const KEYS = [
  // hero: three-quarter front, then round the left side to a chase seat
  { p: 0.0,   off: [-3.2, 1.2, -5.0],  look: [0.0, 1.78, 0.0],   shift: 0.2 },
  { p: 0.05,  off: [-6.4, 1.7, -1.4],  look: [0.0, 1.7, -0.6],   shift: 0.13 },
  { p: 0.105, off: [-3.2, 2.5, 7.8],   look: [0.3, 1.7, -6.0],   shift: 0.0 },
  // builds: the stacks alternate sides, so the seat weaves to keep each one clear of the runner
  { p: 0.16,  off: [2.0, 2.8, 9.0],    look: [-0.3, 1.8, -8.0],  shift: 0.0 },
  { p: 0.199, off: [-2.0, 2.8, 9.0],   look: [0.3, 1.8, -8.0],   shift: 0.0 },
  { p: 0.238, off: [2.0, 2.8, 9.0],    look: [-0.3, 1.8, -8.0],  shift: 0.0 },
  { p: 0.277, off: [-2.0, 2.8, 9.0],   look: [0.3, 1.8, -8.0],   shift: 0.0 },
  { p: 0.316, off: [2.0, 2.7, 9.0],    look: [-0.3, 1.8, -8.0],  shift: 0.0 },
  // numbers: low and centred, looking up through the gates
  { p: 0.385, off: [0.0, 1.75, 8.4],   look: [0.0, 3.4, -10.0],  shift: 0.0 },
  { p: 0.555, off: [0.0, 2.0, 8.8],    look: [0.0, 3.4, -10.0],  shift: 0.0 },
  // method: higher, weaving past the consoles
  { p: 0.598, off: [2.0, 3.2, 8.6],    look: [-0.3, 1.9, -9.0],  shift: 0.0 },
  { p: 0.642, off: [-2.0, 3.2, 8.6],   look: [0.3, 1.9, -9.0],   shift: 0.0 },
  { p: 0.682, off: [2.0, 3.2, 8.6],    look: [-0.3, 1.9, -9.0],  shift: 0.0 },
  { p: 0.722, off: [-2.0, 3.2, 8.6],   look: [0.3, 1.9, -9.0],   shift: 0.0 },
  // route: closer in, a gentler weave between the panes
  { p: 0.772, off: [-1.3, 2.4, 8.0],   look: [0.2, 2.0, -9.0],   shift: 0.0 },
  { p: 0.81,  off: [1.3, 2.4, 8.0],    look: [-0.2, 2.0, -9.0],  shift: 0.0 },
  { p: 0.843, off: [-1.3, 2.4, 8.0],   look: [0.2, 2.0, -9.0],   shift: 0.0 },
  { p: 0.875, off: [1.3, 2.4, 8.0],    look: [-0.2, 2.0, -9.0],  shift: 0.0 },
  { p: 0.907, off: [-1.3, 2.4, 8.0],   look: [0.2, 2.0, -9.0],   shift: 0.0 },
  // finish: pull back and tilt up to the wall of letters
  { p: 0.965, off: [0.0, 2.7, 11.5],   look: [0.0, 4.8, -30.0],  shift: 0.0 },
  { p: 1.0,   off: [0.0, 2.3, 14.0],   look: [0.0, 6.0, -40.0],  shift: 0.0 }
];

const ease = (t) => t * t * t * (t * (t * 6 - 15) + 10);

export function createRig(camera) {
  const pos = new THREE.Vector3();
  const aim = new THREE.Vector3();
  const sway = new THREE.Vector2();
  let w = 1;
  let h = 1;
  let portrait = false;

  function resize(width, height) {
    w = width;
    h = height;
    const aspect = width / height;
    portrait = aspect < 0.9;
    camera.aspect = aspect;
    // keep a useful horizontal field on tall screens
    const vfov = (2 * Math.atan(Math.tan((21 * Math.PI) / 180) / Math.min(aspect, 1.9)) * 180) / Math.PI;
    camera.fov = Math.min(80, Math.max(50, vfov));
    camera.updateProjectionMatrix();
  }

  function sample(p) {
    let i = 0;
    while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i++;
    const a = KEYS[i];
    const b = KEYS[i + 1];
    const t = ease(Math.min(1, Math.max(0, (p - a.p) / (b.p - a.p))));
    const mix = (x, y) => x + (y - x) * t;
    return {
      off: [mix(a.off[0], b.off[0]), mix(a.off[1], b.off[1]), mix(a.off[2], b.off[2])],
      look: [mix(a.look[0], b.look[0]), mix(a.look[1], b.look[1]), mix(a.look[2], b.look[2])],
      shift: mix(a.shift, b.shift)
    };
  }

  /* runner: world position of the mech. pointer: -1..1 on each axis. */
  function apply(p, runner, pointer, dt) {
    const k = sample(p);
    const f = 1 - Math.exp(-dt * 4);
    sway.x += (pointer.x - sway.x) * f;
    sway.y += (pointer.y - sway.y) * f;

    // on tall screens pull the hero seat back so the whole runner fits
    const back = portrait ? 1.0 + 0.5 * Math.max(0, 1 - p / 0.1) : 1.0;
    pos.set(runner.x + k.off[0] * back + sway.x * 0.5, runner.y + k.off[1] - sway.y * 0.25, runner.z + k.off[2] * back);
    aim.set(runner.x + k.look[0], runner.y + k.look[1], runner.z + k.look[2]);
    camera.position.copy(pos);
    camera.lookAt(aim);

    if (k.shift > 0.001) {
      if (portrait) camera.setViewOffset(w, h, 0, -k.shift * 1.15 * h, w, h);
      else camera.setViewOffset(w, h, -k.shift * w, 0, w, h);
    } else if (camera.view && camera.view.enabled) {
      camera.clearViewOffset();
    }
  }

  return { resize, apply, get portrait() { return portrait; } };
}
