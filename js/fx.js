/* Manga effects around the runner: dust kicked up at each foot strike, and
   focus lines that crowd in from the edges of the frame when the page is
   scrolled hard or the runner leaves the blocks. Both are redrawn on twos. */

import * as THREE from "three";

const TWO = 1 / 12;

function puffTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 192;
  const x = c.getContext("2d");
  const lobes = [[72, 122, 46], [128, 92, 60], [186, 120, 44], [128, 134, 48]];
  x.fillStyle = "#08080a";
  for (const [cx, cy, r] of lobes) { x.beginPath(); x.arc(cx, cy, r + 7, 0, Math.PI * 2); x.fill(); }
  x.fillStyle = "#ffffff";
  for (const [cx, cy, r] of lobes) { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); }
  // two brush ticks inside the cloud
  x.strokeStyle = "#08080a";
  x.lineWidth = 6;
  x.lineCap = "round";
  x.beginPath(); x.arc(118, 100, 30, 3.5, 4.5); x.stroke();
  x.beginPath(); x.arc(176, 124, 22, 5.2, 6.1); x.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function createFx({ scene }) {
  /* Dust puffs */
  const tex = puffTexture();
  const puffs = [];
  for (let i = 0; i < 8; i++) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
    sprite.visible = false;
    sprite.renderOrder = 6;
    scene.add(sprite);
    puffs.push({ sprite, life: 1, size: 1 });
  }
  let nextPuff = 0;

  function strike(pos) {
    const p = puffs[nextPuff++ % puffs.length];
    p.life = 0;
    p.size = 0.42 + Math.random() * 0.22;
    p.sprite.position.set(pos.x + (Math.random() - 0.5) * 0.3, 0.22, pos.z + 0.35);
    p.sprite.material.rotation = (Math.random() - 0.5) * 0.5;
    p.sprite.visible = true;
  }

  /* Focus lines, drawn in screen space over the finished frame */
  const overlay = new THREE.Scene();
  const ocam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const N = 76;
  const verts = new Float32Array(N * 9);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
  const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthTest: false, depthWrite: false, side: THREE.DoubleSide });
  const lines = new THREE.Mesh(geo, lineMat);
  lines.frustumCulled = false;
  overlay.add(lines);

  function redraw(cx, cy, aspect, reach) {
    const far = Math.hypot(aspect, 1) * 2.4;
    const span = Math.hypot(aspect, 1);
    for (let i = 0; i < N; i++) {
      const a = ((i + Math.random() * 0.9) / N) * Math.PI * 2;
      const r0 = (reach + Math.random() * 0.34) * span;
      const w = 0.004 + Math.pow(Math.random(), 2) * 0.02;
      const o = i * 9;
      verts[o] = cx + Math.cos(a) * r0;
      verts[o + 1] = cy + Math.sin(a) * r0;
      verts[o + 3] = cx + Math.cos(a - w) * far;
      verts[o + 4] = cy + Math.sin(a - w) * far;
      verts[o + 6] = cx + Math.cos(a + w) * far;
      verts[o + 7] = cy + Math.sin(a + w) * far;
    }
    geo.attributes.position.needsUpdate = true;
  }

  let clock = 0;
  let burst = 0;

  /* speed: 0 at rest, about 1 in a hard scroll. centre: runner position in clip space.
     belt: how fast the runway surface is passing, units per second. */
  function update(dt, { speed, centre, aspect, belt }) {
    clock += dt;
    const tick = clock >= TWO;
    if (tick) clock %= TWO;

    for (const p of puffs) {
      if (!p.sprite.visible) continue;
      p.life += dt / 0.4;
      p.sprite.position.z += belt * dt * 0.14;
      if (p.life >= 1) { p.sprite.visible = false; continue; }
      if (!tick) continue;
      const q = Math.floor(p.life * 5) / 5;
      const s = p.size * (0.55 + 1.25 * q);
      p.sprite.scale.set(s * 1.33, s, 1);
      p.sprite.position.y = 0.22 + q * 0.4;
      p.sprite.material.opacity = q < 0.5 ? 1 : 1 - (q - 0.4) * 1.3;
    }

    burst = Math.max(0, burst - dt * 1.7);
    const want = Math.min(0.8, Math.max(0, speed * 0.85 - 0.14) + burst);
    lineMat.opacity += (want - lineMat.opacity) * (1 - Math.exp(-dt * 10));
    if (lineMat.opacity < 0.012) { lineMat.opacity = 0; return; }
    ocam.left = -aspect;
    ocam.right = aspect;
    ocam.updateProjectionMatrix();
    if (tick) redraw(centre.x * aspect, centre.y, aspect, burst > 0.2 ? 0.42 : 0.6);
  }

  function launch() { burst = 0.9; }

  function render(renderer) {
    if (lineMat.opacity <= 0) return;
    const auto = renderer.autoClear;
    renderer.autoClear = false;
    renderer.clearDepth();
    renderer.render(overlay, ocam);
    renderer.autoClear = auto;
  }

  function setInk(hex) { lineMat.color.set(hex); }

  redraw(0, 0, 1.6, 0.6);
  return { strike, update, launch, render, setInk };
}
