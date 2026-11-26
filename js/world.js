/* Everything the runner passes: the runway, the dust that becomes the finale
   letters, and the four stations (card stacks, HUD gates, metal dials, glass panels). */

import * as THREE from "three";
import { cardFront, cardBlurb, cardTools, hudPlate, knobPlate, KNOB_PLATE, glassPlate, glassSheen, groundWord, chequer, knurl } from "./textures.js";
import { rasterText, halftoneDots } from "./halftone.js";

export const LENGTH = 540; // runway units from the blocks to the finish

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* ---------- shaders ---------- */

const groundVert = /* glsl */ `
  varying vec3 vW;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vW = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const groundFrag = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uCam;
  uniform float uFlow;
  varying vec3 vW;

  float ln(float d, float w) {
    float fw = fwidth(d);
    float a = 1.0 - smoothstep(w, w + fw, abs(d));
    return a * clamp(2.0 * w / max(fw, 1e-4) + 0.2, 0.0, 1.0);
  }

  void main() {
    float ax = abs(vW.x);
    float z = vW.z;
    float a = 0.0;

    // lane edges
    a = max(a, ln(ax - 5.0, 0.05));
    a = max(a, ln(ax - 5.4, 0.018));
    a = max(a, 0.4 * ln(ax - 11.0, 0.02));
    a = max(a, 0.25 * ln(ax - 18.0, 0.02));

    // distance ticks on the shoulders, fixed to the ground
    float t5 = (fract(z / 5.0 + 0.5) - 0.5) * 5.0;
    float t25 = (fract(z / 25.0 + 0.5) - 0.5) * 25.0;
    float shoulder = step(5.4, ax);
    a = max(a, ln(t5, 0.035) * shoulder * step(ax, 6.1));
    a = max(a, ln(t25, 0.06) * shoulder * step(ax, 7.4));

    // chevrons streaming down the centre line at stride speed
    float f = fract((z - uFlow) / 7.0) * 7.0;
    a = max(a, ln(f - 1.2 - ax * 1.1, 0.07) * step(ax, 1.25));
    // lane dashes at a third of the width
    float dash = step(fract((z - uFlow) / 7.0), 0.4);
    a = max(a, 0.6 * ln(ax - 2.6, 0.025) * dash);

    float dist = length(vW.xz - uCam.xz);
    float fade = 1.0 - smoothstep(50.0, 140.0, dist);
    float line = a * fade;
    float shade = (1.0 - smoothstep(5.0, 5.03, ax)) * 0.2 * fade;
    float outA = line + shade * (1.0 - line);
    vec3 outC = uInk * line / max(outA, 1e-4);
    gl_FragColor = vec4(outC, outA);
  }
`;

const dustVert = /* glsl */ `
  attribute vec3 aTarget;
  attribute vec4 aInfo; // flow size, target size, delay, 1 if this point forms a letter
  uniform float uCamZ;
  uniform float uWind;
  uniform float uConverge;
  uniform float uScale;
  uniform float uDpr;
  varying float vAlpha;
  const float SPAN = 150.0;
  const float AHEAD = 112.0;
  void main() {
    float start = uCamZ - AHEAD;
    float rel = mod(position.z * SPAN + uWind - start, SPAN);
    vec3 flow = vec3(position.x, position.y, start + rel);
    float e = smoothstep(aInfo.z, aInfo.z + 0.45, uConverge) * aInfo.w;
    e = e * e * (3.0 - 2.0 * e);
    // swing wide on the way in so the letters gather rather than slide
    vec3 pos = mix(flow, aTarget, e);
    pos.y += sin(e * 3.14159) * 3.0 * (position.x > 0.0 ? 1.0 : -0.4);
    float size = mix(aInfo.x, aInfo.y, e);
    vec4 mv = viewMatrix * vec4(pos, 1.0);
    float px = size * uScale / max(0.1, -mv.z);
    // loose dust stays small even when it drifts right past the lens
    px = min(px, mix(7.0, 22.0, e) * uDpr);
    gl_PointSize = max(1.5, px);
    float edge = smoothstep(0.0, 14.0, rel) * (1.0 - smoothstep(SPAN - 12.0, SPAN, rel));
    float dim = mix(1.0, 0.22, uConverge * (1.0 - aInfo.w));
    vAlpha = mix(edge * 0.8 * dim, 1.0, e) * clamp(px / 1.5, 0.3, 1.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const dustFrag = /* glsl */ `
  uniform vec3 uInk;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = 1.0 - smoothstep(0.4, 0.5, d);
    if (a <= 0.0) discard;
    gl_FragColor = vec4(uInk, a * vAlpha);
  }
`;

const streakVert = /* glsl */ `
  attribute float aEnd;
  uniform float uCamZ;
  uniform float uWind;
  uniform float uLen;
  varying float vAlpha;
  const float SPAN = 130.0;
  const float AHEAD = 100.0;
  void main() {
    float start = uCamZ - AHEAD;
    float rel = mod(position.z * SPAN + uWind * 3.2 - start, SPAN);
    vec3 pos = vec3(position.x, position.y, start + rel - aEnd * uLen);
    vAlpha = (1.0 - aEnd) * smoothstep(0.0, 16.0, rel) * (1.0 - smoothstep(SPAN - 30.0, SPAN - 8.0, rel));
    gl_Position = projectionMatrix * viewMatrix * vec4(pos, 1.0);
  }
`;

const streakFrag = /* glsl */ `
  uniform vec3 uInk;
  uniform float uAlpha;
  varying float vAlpha;
  void main() { gl_FragColor = vec4(uInk, vAlpha * uAlpha); }
`;

/* ---------- helpers ---------- */

function roundedRect(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/* A small black studio with white softboxes, baked to a reflection map for the dials. */
function studio(renderer) {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x030303);
  const lamp = (w, h, pos, rot, v) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(v, v, v), side: THREE.DoubleSide })
    );
    m.position.set(...pos);
    m.rotation.set(...rot);
    env.add(m);
  };
  lamp(9, 9, [0, 7, 0], [Math.PI / 2, 0, 0], 5);
  lamp(2, 12, [-8, 1, 0], [0, Math.PI / 2, 0], 4);
  lamp(1, 12, [8, 2, -2], [0, -Math.PI / 2, 0], 6);
  lamp(14, 1.2, [0, 0.5, -8], [0, 0, 0], 3);
  lamp(14, 3, [0, 3, 8], [0, Math.PI, 0], 1.6);
  lamp(30, 30, [0, -5, 0], [-Math.PI / 2, 0, 0], 0.35);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(env, 0.02).texture;
  pmrem.dispose();
  env.traverse((o) => { if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); } });
  return tex;
}

/* ---------- world ---------- */

export function createWorld({ scene, renderer, content, lite = false }) {
  const ink = new THREE.Vector3(1, 1, 1);
  const inkMaterials = [];
  const tickers = [];
  const black = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const world = new THREE.Group();
  scene.add(world);

  const inkLine = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });
  const inkLineSoft = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
  inkMaterials.push(inkLine, inkLineSoft);

  /* Runway */
  const groundMat = new THREE.ShaderMaterial({
    vertexShader: groundVert,
    fragmentShader: groundFrag,
    uniforms: { uInk: { value: ink }, uCam: { value: new THREE.Vector3() }, uFlow: { value: 0 } },
    transparent: true,
    depthWrite: false
  });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.scale.set(90, 320, 1);
  ground.frustumCulled = false;
  ground.renderOrder = -3;
  world.add(ground);

  // contact shadow under the runner, laid in as screentone that thins toward its edge
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1, 48),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        varying vec3 vW;
        void main() {
          vUv = uv;
          vec4 w = modelMatrix * vec4(position, 1.0);
          vW = w.xyz;
          gl_Position = projectionMatrix * viewMatrix * w;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        varying vec3 vW;
        void main() {
          float d = length(vUv - 0.5) * 2.0;
          vec2 g = mat2(0.7071, -0.7071, 0.7071, 0.7071) * (vW.xz * 6.0);
          float r = mix(0.6, 0.08, smoothstep(0.2, 1.0, d));
          float fw = fwidth(g.x) * 1.2 + 1e-4;
          float a = 1.0 - smoothstep(r - fw, r + fw, length(fract(g) - 0.5));
          // far away the dots are finer than a pixel, so settle to their average tone
          a = mix(a, clamp(3.14159 * r * r, 0.0, 1.0), smoothstep(0.25, 0.6, fw));
          gl_FragColor = vec4(0.0, 0.0, 0.0, a * 0.6);
        }
      `
    })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.set(1.05, 1.9, 1);
  shadow.position.y = 0.015;
  shadow.renderOrder = -2;
  world.add(shadow);

  /* Words painted on the runway at the start of each sector */
  const paint = (word, d) => {
    const m = new THREE.MeshBasicMaterial({ map: groundWord(word), transparent: true, depthWrite: false, opacity: 0.92 });
    inkMaterials.push(m);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(9.2, 1.8), m);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(0, 0.02, -d);
    mesh.renderOrder = -2;
    world.add(mesh);
  };
  paint(content.sectors[1].label, 50);
  paint(content.sectors[2].label, 194);
  paint(content.sectors[3].label, 318);
  paint(content.sectors[4].label, 414);

  const flag = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 2),
    new THREE.MeshBasicMaterial({ map: chequer(), depthWrite: false, transparent: true })
  );
  flag.rotation.x = -Math.PI / 2;
  flag.position.set(0, 0.02, -(LENGTH - 4.5));
  flag.renderOrder = -2;
  world.add(flag);

  /* Dust, and the finale letters it turns into */
  const N = lite ? 4200 : 7000;
  const seeds = new Float32Array(N * 3);
  const targets = new Float32Array(N * 3);
  const info = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    const side = Math.random() < 0.5 ? -1 : 1;
    seeds[i * 3] = side * (1.5 + Math.pow(Math.random(), 0.8) * 26);
    seeds[i * 3 + 1] = 0.2 + Math.pow(Math.random(), 1.6) * 17;
    seeds[i * 3 + 2] = Math.random();
    info[i * 4] = 0.035 + Math.random() * 0.07;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(seeds, 3));
  dustGeo.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
  dustGeo.setAttribute("aInfo", new THREE.BufferAttribute(info, 4));
  const dustMat = new THREE.ShaderMaterial({
    vertexShader: dustVert,
    fragmentShader: dustFrag,
    uniforms: {
      uInk: { value: ink }, uCamZ: { value: 0 }, uWind: { value: 0 },
      uConverge: { value: 0 }, uScale: { value: 800 }, uDpr: { value: renderer.getPixelRatio() }
    },
    transparent: true,
    depthWrite: false
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  dust.frustumCulled = false;
  dust.renderOrder = 2;
  world.add(dust);

  /* Lay the finale line out on a wall beyond the finish, sized to fill the frame. */
  function layoutFinale(camera) {
    const tall = camera.aspect < 0.9;
    const lines = tall ? content.finale.linesTall : content.finale.linesWide;
    const D = 62; // camera to wall at the end of the run
    const half = (camera.fov * Math.PI) / 360;
    const visibleW = 2 * D * Math.tan(half) * camera.aspect;
    const wallW = visibleW * (tall ? 0.86 : 0.8);
    const pitch = Math.atan2(6.0 - 2.3, 54);
    const wallY = 2.3 + D * Math.tan(pitch + half * (tall ? 0.42 : 0.5));
    const wallZ = -LENGTH + 14 - D;

    const raster = rasterText({ lines, width: 1500, align: "center", leading: 1.2 });
    const step = raster.fontSize / (tall ? 12 : 15);
    const dots = halftoneDots(raster, step);
    const unit = wallW / raster.width;
    const count = Math.min(N, dots.length / 3);
    // if there are more dots than points, thin them evenly
    const stride = dots.length / 3 / count;

    for (let i = 0; i < N; i++) {
      if (i < count) {
        const k = Math.floor(i * stride) * 3;
        const gx = dots[k] / raster.width;
        const gy = dots[k + 1] / raster.height;
        targets[i * 3] = (gx - 0.5) * wallW;
        targets[i * 3 + 1] = wallY + (0.5 - gy) * raster.height * unit;
        targets[i * 3 + 2] = wallZ;
        const tone = 0.74 + 0.26 * smooth(0, 1, gx * 0.3 + gy * 0.7);
        info[i * 4 + 1] = step * unit * Math.sqrt(dots[k + 2]) * tone * 1.08;
        info[i * 4 + 2] = gx * 0.42 + Math.random() * 0.12;
        info[i * 4 + 3] = 1;
      } else {
        info[i * 4 + 1] = info[i * 4];
        info[i * 4 + 2] = 0;
        info[i * 4 + 3] = 0;
      }
    }
    dustGeo.attributes.aTarget.needsUpdate = true;
    dustGeo.attributes.aInfo.needsUpdate = true;
  }

  /* Speed streaks */
  const S = lite ? 50 : 90;
  const sp = new Float32Array(S * 6);
  const se = new Float32Array(S * 2);
  for (let i = 0; i < S; i++) {
    const side = Math.random() < 0.5 ? -1 : 1;
    const x = side * (6.5 + Math.random() * 16);
    const y = 0.3 + Math.random() * 9;
    const z = Math.random();
    sp.set([x, y, z, x, y, z], i * 6);
    se.set([0, 1], i * 2);
  }
  const streakGeo = new THREE.BufferGeometry();
  streakGeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
  streakGeo.setAttribute("aEnd", new THREE.BufferAttribute(se, 1));
  const streakMat = new THREE.ShaderMaterial({
    vertexShader: streakVert,
    fragmentShader: streakFrag,
    uniforms: { uInk: { value: ink }, uCamZ: { value: 0 }, uWind: { value: 0 }, uLen: { value: 3 }, uAlpha: { value: 0.6 } },
    transparent: true,
    depthWrite: false
  });
  const streaks = new THREE.LineSegments(streakGeo, streakMat);
  streaks.frustumCulled = false;
  world.add(streaks);

  /* Station 1: typographic card stacks, one per build */
  const cardGeo = new THREE.BoxGeometry(6.4, 4.0, 0.07);
  content.builds.forEach((b, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    const d = 76 + i * 21;
    const g = new THREE.Group();
    g.position.set(side * 7.4, 0, -d);
    g.rotation.y = -side * 0.52;
    world.add(g);
    const cards = [cardFront(b, i, content.builds.length), cardBlurb(b), cardTools(b)].map((tex, k) => {
      const face = new THREE.MeshBasicMaterial({ map: tex });
      const card = new THREE.Mesh(cardGeo, [black, black, black, black, face, black]);
      card.userData.rest = new THREE.Vector3(side * k * 1.0, 2.7 + k * 0.42, -k * 3.0);
      card.userData.tilt = (k ? (k === 1 ? -0.03 : 0.04) : 0) * side;
      g.add(card);
      return card;
    });
    // thin feet so the stack reads as standing on the ground
    cards.forEach((card) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1, 0.05), black);
      leg.userData.foot = true;
      card.add(leg);
    });
    tickers.push(({ runnerZ }) => {
      const dist = -d - runnerZ; // negative while the stack is still ahead of the runner
      const f = smooth(-64, -22, dist);
      cards.forEach((card, k) => {
        const r = card.userData.rest;
        const spread = 0.3 + 0.7 * f;
        card.position.set(r.x * spread, Math.max(2.05, r.y - (1 - f) * 0.6 * (k + 1)), r.z * spread);
        card.rotation.z = card.userData.tilt * f;
        const leg = card.children[0];
        leg.scale.y = Math.max(0.01, card.position.y - 2.0);
        leg.position.set(0, -2.0 - leg.scale.y / 2, 0);
      });
      g.visible = dist > -110 && dist < 30;
    });
  });

  /* Station 2: HUD gates, one number each */
  const R = 5.4;
  const CY = 5.6;
  const ringPts = [];
  for (let i = 0; i <= 128; i++) {
    const a = (i / 128) * Math.PI * 2;
    ringPts.push(new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * R, 0));
  }
  const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
  const tickPts = [];
  for (let i = 0; i < 120; i++) {
    const a = (i / 120) * Math.PI * 2;
    const len = i % 10 === 0 ? 0.55 : i % 5 === 0 ? 0.3 : 0.14;
    tickPts.push(new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * R, 0), new THREE.Vector3(Math.cos(a) * (R + len), Math.sin(a) * (R + len), 0));
  }
  const tickGeo = new THREE.BufferGeometry().setFromPoints(tickPts);
  const arcGeo = (r, from, to) => {
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const a = from + ((to - from) * i) / 40;
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  };
  const arcs = [arcGeo(R - 0.5, 0.2, 1.5), arcGeo(R - 0.5, 2.4, 3.3), arcGeo(R - 0.5, 4.2, 5.6), arcGeo(R - 0.9, 1.0, 2.6), arcGeo(R - 0.9, 3.8, 4.4)];

  content.numbers.forEach((n, i) => {
    const d = 212 + i * 18;
    const side = i % 2 === 0 ? -1 : 1;
    const g = new THREE.Group();
    g.position.set(0, CY, -d);
    world.add(g);
    g.add(new THREE.LineLoop(ringGeo, inkLine));
    const ticks = new THREE.LineSegments(tickGeo, inkLineSoft);
    g.add(ticks);
    const spin = new THREE.Group();
    arcs.forEach((geo) => spin.add(new THREE.Line(geo, inkLine)));
    g.add(spin);

    const plateMat = new THREE.MeshBasicMaterial({ map: hudPlate(n, i), transparent: true, depthWrite: false });
    inkMaterials.push(plateMat);
    const plate = new THREE.Mesh(new THREE.PlaneGeometry(4.9, 3.05), plateMat);
    plate.position.set(side * 2.6, 0.6, 0.05);
    plate.renderOrder = 3;
    g.add(plate);

    tickers.push(({ runnerZ, time }) => {
      const dist = -d - runnerZ;
      g.visible = dist > -150 && dist < 26;
      if (!g.visible) return;
      const dir = i % 2 ? -1 : 1;
      spin.rotation.z = dir * (time * 0.22 + runnerZ * 0.03) + i;
      ticks.rotation.z = -dir * runnerZ * 0.012;
      // the plate locks in as the gate comes up
      const f = smooth(-80, -34, dist);
      plate.scale.setScalar(0.82 + 0.18 * f);
      plateMat.opacity = f;
    });
  });

  /* Station 3: metal dials */
  const envMap = studio(renderer);
  const steel = new THREE.MeshStandardMaterial({ color: 0xd4d4d4, metalness: 1, roughness: 0.3, envMap, envMapIntensity: 1.1, bumpMap: knurl(), bumpScale: 2.2, side: THREE.DoubleSide });
  const polished = new THREE.MeshStandardMaterial({ color: 0xe6e6e6, metalness: 1, roughness: 0.12, envMap, envMapIntensity: 1.15, side: THREE.DoubleSide });
  const gunmetal = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, metalness: 1, roughness: 0.4, envMap, envMapIntensity: 1.0 });
  const whiteFlat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const KR = 0.95;
  const skirtGeo = new THREE.CylinderGeometry(KR, KR * 1.04, 0.52, 96, 1, true).translate(0, 0.3, 0).rotateX(Math.PI / 2);
  const capGeo = new THREE.LatheGeometry(
    [new THREE.Vector2(KR, 0.56), new THREE.Vector2(KR * 0.96, 0.63), new THREE.Vector2(KR * 0.84, 0.66), new THREE.Vector2(KR * 0.3, 0.64), new THREE.Vector2(0, 0.64)],
    96
  ).rotateX(Math.PI / 2);
  const flangeGeo = new THREE.CylinderGeometry(KR * 1.16, KR * 1.2, 0.06, 96).translate(0, 0.03, 0).rotateX(Math.PI / 2);
  const slabGeo = new THREE.BoxGeometry(6.2, 4.2, 0.24);
  const SLAB_W = 6.2;
  const SLAB_H = 4.2;

  content.method.forEach((mth, i) => {
    const side = i % 2 === 0 ? 1 : -1;
    const d = 338 + i * 21;
    const g = new THREE.Group();
    g.position.set(side * 6.6, 3.05, -d);
    g.rotation.set(0, -side * 0.6, 0);
    world.add(g);

    const face = new THREE.MeshBasicMaterial({ map: knobPlate(mth) });
    g.add(new THREE.Mesh(slabGeo, [black, black, black, black, face, black]));
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 0.2), black);
    post.position.set(0, -SLAB_H / 2 - 0.5, -0.05);
    g.add(post);

    const knob = new THREE.Group();
    knob.position.set((KNOB_PLATE.cx / KNOB_PLATE.w - 0.5) * SLAB_W, (0.5 - KNOB_PLATE.cy / KNOB_PLATE.h) * SLAB_H, 0.12);
    g.add(knob);
    knob.add(new THREE.Mesh(flangeGeo, gunmetal));
    const turn = new THREE.Group();
    knob.add(turn);
    turn.add(new THREE.Mesh(skirtGeo, steel));
    turn.add(new THREE.Mesh(capGeo, polished));
    const pointer = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.46, 0.03), whiteFlat);
    pointer.position.set(0, KR * 0.62, 0.665);
    turn.add(pointer);
    const notch = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.5), whiteFlat);
    notch.position.set(0, KR + 0.012, 0.31);
    turn.add(notch);

    const a0 = (-135 * Math.PI) / 180;
    const a1 = a0 + ((270 * Math.PI) / 180) * mth.set;
    tickers.push(({ runnerZ }) => {
      const dist = -d - runnerZ;
      g.visible = dist > -120 && dist < 26;
      if (!g.visible) return;
      // the dial turns up to its setting as the runner closes in, with a little overshoot
      const f = smooth(-46, -14, dist);
      const over = Math.sin(f * Math.PI) * 0.12;
      turn.rotation.z = -(a0 + (a1 - a0) * (f + over * (1 - f)));
    });
  });

  /* Station 4: glass panels, one per stop on the route */
  const GW = 7.0;
  const GH = 4.8;
  const glassShape = roundedRect(GW, GH, 0.3);
  const glassGeo = new THREE.ShapeGeometry(glassShape, 10);
  const edgeGeo = new THREE.BufferGeometry().setFromPoints(glassShape.getPoints(10));
  const glassMat = lite
    ? new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.38, depthWrite: false, side: THREE.DoubleSide })
    : new THREE.MeshPhysicalMaterial({
        color: 0xb4b8c0, metalness: 0, roughness: 0.55, transmission: 1, thickness: 0.6, ior: 1.22,
        envMap, envMapIntensity: 0.35, specularIntensity: 0.5
      });
  // light catching the pane: bright at the top left corner, clear by the bottom right
  const sheenGeo = glassGeo.clone();
  {
    const pos = sheenGeo.attributes.position;
    const uv = sheenGeo.attributes.uv;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / GW + 0.5, pos.getY(i) / GH + 0.5);
    uv.needsUpdate = true;
  }
  const sheen = new THREE.MeshBasicMaterial({ map: glassSheen(), transparent: true, depthWrite: false });
  const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
  const textGeo = new THREE.PlaneGeometry(GW, GH);

  content.route.forEach((rt, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    const d = 432 + i * 17;
    const g = new THREE.Group();
    g.position.set(side * 6.1, 3.15, -d);
    g.rotation.y = -side * 0.5;
    world.add(g);
    const pane = new THREE.Mesh(glassGeo, glassMat);
    g.add(pane);
    const shine = new THREE.Mesh(sheenGeo, sheen);
    shine.position.z = 0.012;
    shine.renderOrder = 3;
    g.add(shine);
    const edge = new THREE.LineLoop(edgeGeo, edgeMat);
    edge.position.z = 0.02;
    edge.renderOrder = 4;
    g.add(edge);
    const text = new THREE.Mesh(textGeo, new THREE.MeshBasicMaterial({ map: glassPlate(rt, i, content.route.length), transparent: true, depthWrite: false }));
    text.position.z = 0.03;
    text.renderOrder = 5;
    g.add(text);
    // slim post down to the ground
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.8, 0.06), black);
    post.position.set(0, -GH / 2 - 0.4, 0);
    g.add(post);

    tickers.push(({ runnerZ }) => {
      const dist = -d - runnerZ;
      g.visible = dist > -120 && dist < 26;
      if (!g.visible) return;
      const f = smooth(-70, -30, dist);
      g.position.y = 3.15 + (1 - f) * 1.2;
      text.material.opacity = f;
    });
  });

  /* ---------- per frame ---------- */

  let wind = 0;
  let flow = 0;
  function update({ p, camera, runner, time, dt, speed, launch, reduced }) {
    const move = reduced ? 0 : launch;
    flow += dt * 24 * move * (0.85 + speed * 0.5);
    wind += dt * (3.5 + speed * 22) * move;
    const z = camera.position.z;

    ground.position.set(0, 0, z - 100);
    groundMat.uniforms.uCam.value.copy(camera.position);
    groundMat.uniforms.uFlow.value = flow;

    shadow.position.x = runner.x;
    shadow.position.z = runner.z;

    dustMat.uniforms.uCamZ.value = z;
    dustMat.uniforms.uWind.value = wind;
    dustMat.uniforms.uConverge.value = smooth(0.943, 0.996, p);
    dustMat.uniforms.uScale.value = renderer.domElement.height / (2 * Math.tan((camera.fov * Math.PI) / 360));

    streakMat.uniforms.uCamZ.value = z;
    streakMat.uniforms.uWind.value = wind;
    streakMat.uniforms.uLen.value = 1.6 + speed * 9;
    streakMat.uniforms.uAlpha.value = (0.28 + Math.min(0.5, speed * 0.6)) * move * (1 - smooth(0.94, 0.99, p));

    // with reduced motion the clock is held, so the gates only turn when the page is scrolled
    const state = { runnerZ: runner.z, time: reduced ? 0 : time };
    for (const t of tickers) t(state);
  }

  function setInk(hex) {
    const c = new THREE.Color(hex);
    // shader uniforms take display values directly
    const s = c.clone().convertLinearToSRGB();
    ink.set(s.r, s.g, s.b);
    inkMaterials.forEach((m) => m.color.copy(c));
    // on a pale background the panes go smokier so their white type still reads
    if (glassMat.isMeshPhysicalMaterial) glassMat.color.set(s.r < 0.5 ? 0x62666d : 0xb4b8c0);
  }

  return { update, setInk, layoutFinale, length: LENGTH };
}
