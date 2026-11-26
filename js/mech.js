/* The runner. An original sprinter mech built from superellipsoids and drawn
   like a frame of colour manga: flat colour, a hard light/shadow split,
   screentone dots in the shadow, solid ink in the deepest shadow, and an ink
   outline whose weight grows on the side away from the light.
   The sprint is an eight-drawing cycle, held the way hand-drawn animation is. */

import * as THREE from "three";

const celVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalMatrix * normal;
    vV = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const celFrag = /* glsl */ `
  uniform vec3 uBase;   // lit colour
  uniform vec3 uShade;  // shadow colour
  uniform vec3 uTone;   // screentone dot colour inside the shadow
  uniform vec3 uCore;   // deepest shadow, spotted in as solid ink
  uniform vec3 uLine;   // panel line colour
  uniform vec3 uSpec;   // highlight colour
  uniform vec3 uLight;  // key light, view space
  uniform float uLineAlpha;
  uniform float uGloss;
  uniform float uFlat;  // 1 for lamps: flat colour, no shading
  uniform float uWidth; // panel line weight in pixels
  uniform float uCell;  // screentone cell in pixels
  uniform float uGrain;
  uniform float uGrainPx;
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vV;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec3 N = normalize(vN);
    vec3 V = normalize(vV);
    float ndl = dot(N, uLight);
    float aa = fwidth(ndl) * 1.25 + 1e-4;
    float lit = smoothstep(0.16 - aa, 0.16 + aa, ndl);
    float core = 1.0 - smoothstep(-0.5 - aa, -0.5 + aa, ndl);

    // screentone at 45 degrees. Dots grow as the surface turns away from the light.
    vec2 sp = mat2(0.7071, -0.7071, 0.7071, 0.7071) * (gl_FragCoord.xy / uCell);
    float depth = clamp((0.16 - ndl) / 0.66, 0.0, 1.0);
    float r = mix(0.15, 0.5, depth);
    float dots = 1.0 - smoothstep(r - 0.07, r + 0.07, length(fract(sp) - 0.5));
    vec3 shadow = mix(mix(uShade, uTone, dots), uCore, core);
    vec3 col = mix(shadow, uBase, lit);

    // one hard highlight
    vec3 H = normalize(uLight + V);
    float s = dot(N, H);
    float sa = fwidth(s) * 1.5 + 1e-4;
    col = mix(col, uSpec, smoothstep(0.972 - sa, 0.972 + sa, s) * lit * uGloss);

    // panel lines along latitude and longitude. uv arrives multiplied by the grid counts.
    vec2 fw = max(fwidth(vUv), vec2(1e-5));
    vec2 d = abs(fract(vUv - 0.5) - 0.5) / fw;
    vec2 l = 1.0 - smoothstep(vec2(uWidth * 0.5 - 0.6), vec2(uWidth * 0.5 + 0.6), d);
    l *= 1.0 - smoothstep(vec2(0.2), vec2(0.45), fw);
    col = mix(col, uLine, max(l.x, l.y) * uLineAlpha);

    col = mix(col, uBase, uFlat);
    // a little paper grain
    col += (hash(floor(gl_FragCoord.xy / uGrainPx)) - 0.5) * uGrain;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const inkVert = /* glsl */ `
  uniform vec3 uLight;
  uniform float uThick;   // outline thickness in world units
  uniform float uPx;      // pixels per world unit at distance 1
  uniform vec2 uClamp;    // min and max thickness in pixels
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize(normalMatrix * normal);
    // line weight: heavier on the side away from the light
    float away = clamp(-dot(n, uLight), 0.0, 1.0);
    float w = uThick * (0.8 + 0.9 * away);
    float px = w * uPx / max(0.1, -mv.z);
    w *= clamp(px, uClamp.x, uClamp.y) / max(px, 1e-4);
    mv.xyz += n * w;
    gl_Position = projectionMatrix * mv;
  }
`;

const inkFrag = /* glsl */ `
  uniform vec3 uInk;
  void main() { gl_FragColor = vec4(uInk, 1.0); }
`;

const spow = (x, e) => Math.sign(x) * Math.pow(Math.abs(x), e);
const even = (n) => Math.max(2, Math.round(n / 2) * 2);
const rgb = (hex) => new THREE.Vector3(((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255);

/* Superellipsoid with semi-axes a, b, c. e1 and e2 below 1 square the shape off.
   taper widens (+) or narrows (-) the top relative to the bottom. */
function shell(a, b, c, { e1 = 1, e2 = 1, taper = 0, cell = 0.2 } = {}) {
  const r = Math.sqrt((a * a + c * c) / 2);
  const nLon = even(Math.min(18, Math.max(6, (2 * Math.PI * r) / cell)));
  const nLat = Math.min(10, Math.max(3, Math.round((Math.PI * Math.sqrt((b * b + r * r) / 2)) / cell)));
  const nu = Math.max(20, nLat * 5);
  const nv = Math.max(32, nLon * 3);

  const pos = [];
  const uv = [];
  const idx = [];
  for (let i = 0; i <= nu; i++) {
    const u = -Math.PI / 2 + (Math.PI * i) / nu;
    const cu = spow(Math.cos(u), e1);
    const su = spow(Math.sin(u), e1);
    const k = 1 + taper * su;
    for (let j = 0; j <= nv; j++) {
      const v = -Math.PI + (2 * Math.PI * j) / nv;
      pos.push(a * cu * spow(Math.cos(v), e2) * k, b * su, c * cu * spow(Math.sin(v), e2) * k);
      uv.push((j / nv) * nLon, (i / nu) * nLat);
    }
  }
  for (let i = 0; i < nu; i++) {
    for (let j = 0; j < nv; j++) {
      const p = i * (nv + 1) + j;
      idx.push(p, p + nv + 1, p + 1, p + 1, p + nv + 1, p + nv + 2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();

  // Weld normals across the longitude seam and at both poles so the ink outline closes cleanly.
  const nrm = g.attributes.normal;
  const row = nv + 1;
  const tmp = new THREE.Vector3();
  for (let i = 0; i <= nu; i++) {
    if (i === 0 || i === nu) {
      tmp.set(0, 0, 0);
      for (let j = 0; j <= nv; j++) {
        tmp.x += nrm.getX(i * row + j);
        tmp.y += nrm.getY(i * row + j);
        tmp.z += nrm.getZ(i * row + j);
      }
      tmp.normalize();
      for (let j = 0; j <= nv; j++) nrm.setXYZ(i * row + j, tmp.x, tmp.y, tmp.z);
    } else {
      const p0 = i * row;
      const p1 = i * row + nv;
      tmp.set(nrm.getX(p0) + nrm.getX(p1), nrm.getY(p0) + nrm.getY(p1), nrm.getZ(p0) + nrm.getZ(p1)).normalize();
      nrm.setXYZ(p0, tmp.x, tmp.y, tmp.z);
      nrm.setXYZ(p1, tmp.x, tmp.y, tmp.z);
    }
  }
  return g;
}

const lerp = (a, b, t) => a + (b - a) * t;
const bump = (s, centre, width) => {
  let d = Math.abs(((s - centre + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI);
  d /= width;
  return Math.exp(-d * d);
};

const DRAWINGS = 8;                     // drawings in one stride cycle
const STEP = (Math.PI * 2) / DRAWINGS;
const RATE = STEP * 12;                 // twelve drawings a second at base cadence

export function createMech() {
  const light = new THREE.Vector3(-0.62, 0.58, 0.5).normalize();
  const shared = {
    uLight: { value: light },
    uWidth: { value: 1.1 },
    uCell: { value: 5 },
    uGrain: { value: 0.035 },
    uGrainPx: { value: 1 }
  };

  const paint = ({ base, shade, tone, core, line = 0x000000, lineAlpha = 0, spec = 0xffffff, gloss = 1, flat = 0 }) =>
    new THREE.ShaderMaterial({
      vertexShader: celVert,
      fragmentShader: celFrag,
      uniforms: {
        ...shared,
        uBase: { value: rgb(base) },
        uShade: { value: rgb(shade ?? base) },
        uTone: { value: rgb(tone ?? base) },
        uCore: { value: rgb(core ?? base) },
        uLine: { value: rgb(line) },
        uSpec: { value: rgb(spec) },
        uLineAlpha: { value: lineAlpha },
        uGloss: { value: gloss },
        uFlat: { value: flat }
      }
    });

  // Off-white armour over a graphite frame with orange plates. Shadows lean blue-violet.
  const P = {
    armour: paint({ base: 0xf4f0e6, shade: 0xb6bcd6, tone: 0x8a92bb, core: 0x14151b, line: 0x2b2d36, lineAlpha: 0.5 }),
    frame: paint({ base: 0x3d404a, shade: 0x25272f, tone: 0x15161b, core: 0x070709, line: 0x858a95, lineAlpha: 0.32, spec: 0xa3a9b6, gloss: 0.8 }),
    orange: paint({ base: 0xe8551c, shade: 0xb1380f, tone: 0x872808, core: 0x2a0c03, line: 0x5e1b05, lineAlpha: 0.5, spec: 0xffdcc0 }),
    joint: paint({ base: 0x212329, shade: 0x131419, tone: 0x0b0b0e, core: 0x050506, spec: 0x5c606a, gloss: 0.5 }),
    // lamps: a red tail bar and brake strips, a green sensor band
    red: paint({ base: 0xff2a2a, flat: 1 }),
    green: paint({ base: 0xa6e23a, flat: 1 })
  };

  const ink = new THREE.ShaderMaterial({
    vertexShader: inkVert,
    fragmentShader: inkFrag,
    uniforms: {
      uLight: { value: light },
      uInk: { value: rgb(0x08080a) },
      uThick: { value: 0.031 },
      uPx: { value: 900 },
      uClamp: { value: new THREE.Vector2(1.4, 5.5) }
    },
    side: THREE.BackSide
  });

  const node = (parent, x = 0, y = 0, z = 0) => {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    parent.add(g);
    return g;
  };
  const part = (parent, mat, dims, opts = {}, at = [0, 0, 0]) => {
    const geo = shell(dims[0], dims[1], dims[2], opts);
    const m = new THREE.Mesh(geo, mat);
    m.position.set(at[0], at[1], at[2]);
    parent.add(m);
    const outline = new THREE.Mesh(geo, ink);
    outline.position.copy(m.position);
    parent.add(outline);
    return m;
  };

  // The runner faces -Z. Its right side is +X.
  const root = new THREE.Group();
  const hips = node(root, 0, 2.1, 0);
  const pelvis = node(hips);
  part(pelvis, P.armour, [0.4, 0.23, 0.3], { e1: 0.42, e2: 0.5 });
  part(pelvis, P.frame, [0.2, 0.2, 0.26], { e1: 0.7, e2: 0.7 }, [0, -0.2, 0.02]);

  const spine = node(pelvis, 0, 0.2, 0);
  part(spine, P.frame, [0.26, 0.3, 0.22], { e1: 0.85, e2: 0.8 }, [0, 0.24, 0]);

  const chest = node(spine, 0, 0.58, 0);
  part(chest, P.armour, [0.56, 0.4, 0.36], { e1: 0.36, e2: 0.44, taper: 0.24 }, [0, 0.3, 0]);
  // intake block on the upper back, two short ducts, and a tail-light bar across it
  part(chest, P.frame, [0.33, 0.33, 0.17], { e1: 0.42, e2: 0.45 }, [0, 0.34, 0.44]);
  part(chest, P.orange, [0.1, 0.24, 0.1], { e1: 0.7, e2: 1 }, [-0.17, 0.1, 0.6]);
  part(chest, P.orange, [0.1, 0.24, 0.1], { e1: 0.7, e2: 1 }, [0.17, 0.1, 0.6]);
  part(chest, P.red, [0.27, 0.035, 0.04], { e1: 0.5, e2: 0.4 }, [0, 0.52, 0.595]);

  const neck = node(chest, 0, 0.72, -0.02);
  part(neck, P.joint, [0.13, 0.13, 0.13], {}, [0, 0.02, 0]);
  const head = node(neck, 0, 0.14, 0);
  // smooth aero helmet, longer behind than in front, with one sensor band
  part(head, P.armour, [0.21, 0.25, 0.3], { e1: 0.95, e2: 0.9, taper: -0.08 }, [0, 0.2, 0.05]);
  part(head, P.frame, [0.15, 0.1, 0.15], { e1: 0.7, e2: 0.75 }, [0, 0.02, -0.1]);
  part(head, P.green, [0.178, 0.052, 0.13], { e1: 0.5, e2: 0.8 }, [0, 0.2, -0.14]);

  const makeArm = (sx) => {
    const shoulder = node(chest, sx * 0.68, 0.46, 0);
    part(shoulder, P.orange, [0.27, 0.23, 0.3], { e1: 0.36, e2: 0.44, taper: -0.12 }, [sx * 0.05, 0.04, 0]);
    const upper = node(shoulder, sx * 0.05, -0.05, 0);
    part(upper, P.frame, [0.14, 0.36, 0.15], { e1: 0.85, e2: 0.9 }, [0, -0.38, 0]);
    const elbow = node(upper, 0, -0.74, 0);
    part(elbow, P.joint, [0.13, 0.13, 0.13]);
    part(elbow, P.armour, [0.16, 0.37, 0.17], { e1: 0.4, e2: 0.48, taper: -0.2 }, [0, -0.38, 0]);
    part(elbow, P.green, [0.03, 0.1, 0.045], { e1: 0.6, e2: 0.6 }, [sx * 0.155, -0.3, 0]);
    part(elbow, P.frame, [0.11, 0.14, 0.12], { e1: 0.65, e2: 0.7 }, [0, -0.84, 0]);
    return { upper, elbow };
  };
  const armL = makeArm(-1);
  const armR = makeArm(1);

  const makeLeg = (sx) => {
    const hip = node(hips, sx * 0.27, -0.12, 0);
    part(hip, P.joint, [0.19, 0.19, 0.19]);
    part(hip, P.armour, [0.22, 0.5, 0.24], { e1: 0.46, e2: 0.52, taper: 0.22 }, [0, -0.5, 0]);
    const knee = node(hip, 0, -0.98, 0);
    part(knee, P.joint, [0.17, 0.17, 0.17]);
    part(knee, P.orange, [0.13, 0.15, 0.1], { e1: 0.4, e2: 0.5 }, [0, 0.02, -0.14]);
    part(knee, P.armour, [0.2, 0.52, 0.23], { e1: 0.4, e2: 0.48, taper: -0.28 }, [0, -0.52, 0.01]);
    // brake strip down the back of the calf
    part(knee, P.red, [0.035, 0.2, 0.04], { e1: 0.5, e2: 0.5 }, [0, -0.62, 0.262]);
    const ankle = node(knee, 0, -1.02, 0);
    part(ankle, P.joint, [0.12, 0.12, 0.12]);
    part(ankle, P.frame, [0.15, 0.1, 0.36], { e1: 0.42, e2: 0.6 }, [0, -0.12, -0.14]);
    const toe = node(ankle, 0, -0.22, -0.5);
    const heel = node(ankle, 0, -0.22, 0.22);
    return { hip, knee, ankle, toe, heel };
  };
  const legL = makeLeg(-1);
  const legR = makeLeg(1);

  const SCALE = 0.9;
  root.scale.setScalar(SCALE);

  const v = new THREE.Vector3();
  let s = 1.2;          // stride phase, 2*PI per two steps
  let go = 0;           // 0 on the blocks, 1 at full sprint
  let drawn = null;     // key of the drawing currently on screen
  let drawnIndex = 0;

  const kneeAt = (ph) => 0.28 + 1.8 * Math.pow(0.5 + 0.5 * Math.cos(ph - 0.15), 2.2);
  const hipAt = (ph) => 0.1 + 1.02 * Math.sin(ph);

  function poseLeg(leg, ph, set, g) {
    const th = hipAt(ph);
    const kn = kneeAt(ph);
    const want = 0.25 * bump(ph, 2.0, 0.5) - 0.95 * bump(ph, 4.5, 0.7);
    const an = Math.min(0.6, Math.max(-1.0, want - (th - kn)));
    leg.hip.rotation.x = lerp(set.hip, th, g);
    leg.knee.rotation.x = -lerp(set.knee, kn, g);
    leg.ankle.rotation.x = lerp(set.ankle, an, g);
  }

  /* Hip height that puts the lowest foot marker exactly on the floor in the current pose. */
  function hipHeightFor() {
    hips.position.y = 2.1;
    root.updateMatrixWorld(true);
    let low = Infinity;
    for (const m of [legL.toe, legL.heel, legR.toe, legR.heel]) low = Math.min(low, m.getWorldPosition(v).y);
    return 2.1 - (low - root.position.y) / SCALE;
  }

  const stride = { height: 2.0 };

  /* Set every joint for stride phase ph and launch blend g. */
  function pose(ph, g) {
    const sl = ph;
    const sr = ph + Math.PI;

    // crouch on the blocks, left leg forward
    poseLeg(legL, sl, { hip: 1.25, knee: 1.95, ankle: 0.1 }, g);
    poseLeg(legR, sr, { hip: 0.25, knee: 1.5, ankle: -0.35 }, g);

    pelvis.rotation.x = -lerp(0.62, 0.2, g);
    pelvis.rotation.y = -0.12 * Math.sin(sl) * g;
    spine.rotation.x = -lerp(0.32, 0.2, g);
    chest.rotation.y = 0.24 * Math.sin(sl) * g;
    hips.rotation.z = 0.045 * Math.sin(sl) * g;
    neck.rotation.x = lerp(0.72, 0.34, g);
    head.rotation.y = -0.16 * Math.sin(sl) * g;

    armL.upper.rotation.x = lerp(-0.7, 0.22 + 0.82 * Math.sin(sr), g);
    armR.upper.rotation.x = lerp(0.95, 0.22 + 0.82 * Math.sin(sl), g);
    armL.upper.rotation.z = -0.13;
    armR.upper.rotation.z = 0.13;
    armL.elbow.rotation.x = lerp(0.7, 1.18 + 0.34 * Math.sin(sr + 0.4), g);
    armR.elbow.rotation.x = lerp(1.3, 1.18 + 0.34 * Math.sin(sl + 0.4), g);

    // In the sprint the hips hold a near-constant height, set so the feet meet the floor
    // only at full reach. On the blocks the feet are planted.
    const needed = hipHeightFor();
    const cruise = stride.height - 0.02 - 0.035 * Math.cos(2 * ph + 0.5);
    hips.position.y = Math.max(needed, lerp(0, cruise, g));
  }

  // Measure the stride once: the tallest hip height any drawing needs.
  {
    let top = 0;
    for (let i = 0; i < 64; i++) {
      pose((i / 64) * Math.PI * 2, 1);
      top = Math.max(top, hipHeightFor());
    }
    stride.height = top;
  }

  /* Advance the cycle. dt in seconds. cadence scales stride rate. launch is the target
     for the blend from the blocks to the sprint. Pass phase to drive the cycle by hand.
     A new drawing is posed only when the cycle reaches the next of its eight positions,
     so the figure holds each drawing the way cel animation does.
     Returns "L" or "R" on the drawing where that foot lands, otherwise null. */
  function update(dt, { cadence = 1, launch = 1, phase = null } = {}) {
    go += (launch - go) * (1 - Math.exp(-dt * (launch > go ? 5.5 : 9)));
    if (Math.abs(launch - go) < 0.004) go = launch;
    const g = go * go * (3 - 2 * go);
    if (phase !== null) s = phase;
    else s += dt * RATE * cadence * g;

    const index = Math.floor(s / STEP);
    const blend = Math.round(g * 5) / 5;
    const key = `${index}|${blend}`;
    if (key === drawn) return null;
    const stepped = drawn !== null && index !== drawnIndex;
    drawn = key;
    drawnIndex = index;
    pose(index * STEP, blend);
    if (!stepped || blend < 0.8) return null;
    const k = ((index % DRAWINGS) + DRAWINGS) % DRAWINGS;
    return k === 4 ? "L" : k === 0 ? "R" : null;
  }

  /* World position of a foot, for dust. */
  function foot(side, target) {
    root.updateMatrixWorld(true);
    return (side === "L" ? legL : legR).toe.getWorldPosition(target);
  }

  /* pxPerUnit: pixels one world unit covers at distance 1. dpr: device pixel ratio. */
  function setView(pxPerUnit, dpr) {
    ink.uniforms.uPx.value = pxPerUnit;
    ink.uniforms.uClamp.value.set(1.4 * dpr, 5.5 * dpr);
    shared.uWidth.value = 1.1 * dpr;
    shared.uCell.value = 5 * dpr;
    shared.uGrainPx.value = dpr;
  }

  function reset() {
    go = 0;
    s = 1.2;
    drawn = null;
    drawnIndex = Math.floor(s / STEP);
    pose(drawnIndex * STEP, 0);
  }

  reset();
  return { root, update, foot, setView, reset };
}
