/* Boot, scroll and the render loop. */

import * as THREE from "three";
import { SITE } from "./content.js";
import { HeroTitle } from "./halftone.js";
import { createMech } from "./mech.js";
import { createWorld, LENGTH } from "./world.js";
import { createRig } from "./rig.js";
import { createFx } from "./fx.js";
import { createUI } from "./ui.js";
import { setAnisotropy, setTextureScale } from "./textures.js";

const root = document.documentElement;
const params = new URLSearchParams(location.search);
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const still = params.has("still"); // no easing and no start sequence, for screenshots and tests
const finePointer = matchMedia("(pointer: fine)").matches;
const lite = params.has("lite") || matchMedia("(max-width: 860px)").matches || (navigator.hardwareConcurrency || 8) <= 4;

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
const scrollP = () => Math.min(1, Math.max(0, window.scrollY / maxScroll()));

async function fontsReady() {
  if (!document.fonts || !document.fonts.load) return;
  const faces = ['900 40px "Archivo Expanded"', '600 40px "Archivo Expanded"', '600 40px "Archivo Condensed"', '800 40px "Archivo Condensed"', '500 40px "Archivo"', '700 40px "Archivo"'];
  await Promise.race([Promise.all(faces.map((f) => document.fonts.load(f))), new Promise((r) => setTimeout(r, 3000))]);
}

async function boot() {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  let bgHex = "#2260d9";
  let onBgChange = null;
  let jump = () => {};
  let restart = () => {};

  const ui = createUI({
    content: SITE,
    onJump: (s) => jump(s),
    onRestart: () => restart(),
    onBg: (hex, ink) => {
      bgHex = hex;
      if (onBgChange) onBgChange(hex, ink);
    }
  });

  await fontsReady();

  /* Hero title, behind the scene canvas */
  const title = new HeroTitle(document.getElementById("title"), SITE.hero.titleLines);
  const layoutTitle = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const navH = parseFloat(getComputedStyle(root).getPropertyValue("--nav-h")) || 52;
    const pad = Math.min(48, Math.max(16, vw * 0.032));
    const narrow = vw < 860;
    const box = title.layout({
      left: pad,
      top: navH + Math.min(38, Math.max(16, vh * 0.035)),
      maxWidth: narrow ? vw - 2 * pad : vw * 0.5,
      maxHeight: narrow ? vh * 0.3 : vh * 0.54
    });
    root.style.setProperty("--title-bottom", `${Math.round(box.top + box.height)}px`);
  };
  layoutTitle();

  /* Renderer */
  const canvas = document.getElementById("scene");
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (err) {
    root.classList.add("no-gl");
    onBgChange = (hex, ink) => { title.ink = ink; title.draw({ reveal: 1 }); };
    ui.initBg();
    title.draw({ reveal: 1 });
    ui.inlineInfo();
    window.addEventListener("resize", () => { layoutTitle(); title.draw({ reveal: 1 }); });
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.75 : 2));
  setAnisotropy(Math.min(8, renderer.capabilities.getMaxAnisotropy()));
  setTextureScale(lite ? 0.62 : 1);

  const scene = new THREE.Scene();
  const bg = new THREE.Color(bgHex);
  scene.fog = new THREE.Fog(bg.clone(), 44, 150);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 400);
  const rig = createRig(camera);

  const mech = createMech();
  scene.add(mech.root);
  const fx = createFx({ scene });
  const world = createWorld({ scene, renderer, content: SITE, lite });

  let transparent = null;
  onBgChange = (hex, ink) => {
    bg.set(hex);
    scene.fog.color.copy(bg);
    world.setInk(ink);
    fx.setInk(ink);
    title.ink = ink;
    transparent = null;
  };
  ui.initBg();

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    rig.resize(w, h);
    mech.setView(renderer.domElement.height / (2 * Math.tan((camera.fov * Math.PI) / 360)), renderer.getPixelRatio());
    world.layoutFinale(camera);
    layoutTitle();
  };
  resize();
  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  });

  /* State */
  let p = 0;
  let prevP = 0;
  let speed = 0;
  let launch = 0;
  let reveal = 0;
  let lapStart = null;
  let lapEnd = null;
  let kmh = 0;
  const runner = new THREE.Vector3();
  const footPos = new THREE.Vector3();
  const centre = new THREE.Vector3();
  const pointer = new THREE.Vector2();
  const mouse = { x: -1e5, y: -1e5, live: false };

  if (finePointer && !reduced) {
    window.addEventListener("pointermove", (e) => {
      pointer.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.live = true;
    });
    document.addEventListener("pointerleave", () => { mouse.live = false; });
  }

  jump = (s) => {
    window.scrollTo({ top: s.at * maxScroll(), behavior: reduced || still ? "auto" : "smooth" });
    history.replaceState(null, "", s.id === "start" ? location.pathname + location.search : `#${s.id}`);
  };

  const go = () => {
    if (launch === 0 && !reduced && !still) fx.launch();
    launch = 1;
    lapStart = performance.now();
    lapEnd = null;
  };

  const startSequence = async () => {
    launch = 0;
    reveal = 0;
    lapStart = null;
    lapEnd = null;
    mech.reset();
    if (reduced || still) {
      reveal = 1;
      go();
      return;
    }
    if (await ui.lights()) go();
  };

  restart = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    history.replaceState(null, "", location.pathname + location.search);
    p = prevP = 0;
    startSequence();
  };

  /* Deep links: #builds, #numbers, #method, #route, #finish. ?p=0.5 also works.
     The older case-study pages still link to #work, #arc, #how and #contact, so those map across. */
  const legacy = { work: "builds", arc: "route", how: "method", credentials: "numbers", contact: "finish" };
  const sectorFromHash = () => {
    const id = location.hash.slice(1);
    return SITE.sectors.find((s) => s.id === id || s.id === legacy[id]);
  };
  const hashSector = sectorFromHash();
  const startAt = params.has("p") ? parseFloat(params.get("p")) || 0 : hashSector ? hashSector.at : 0;
  window.scrollTo({ top: startAt * maxScroll(), behavior: "auto" });
  if (startAt > 0) {
    p = prevP = startAt;
    reveal = 1;
    go();
  } else {
    startSequence();
  }
  window.addEventListener("hashchange", () => {
    const s = sectorFromHash();
    if (s) window.scrollTo({ top: s.at * maxScroll(), behavior: reduced || still ? "auto" : "smooth" });
  });

  const setTransparent = (on) => {
    if (on === transparent) return;
    transparent = on;
    scene.background = on ? null : bg;
    renderer.setClearColor(bg, on ? 0 : 1);
  };

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
    last = now;

    const target = scrollP();
    if (still || reduced) p = target;
    else {
      p += (target - p) * (1 - Math.exp(-dt * 5.5));
      if (Math.abs(target - p) < 0.00002) p = target;
    }
    const vel = Math.abs(p - prevP) / dt;
    prevP = p;
    speed += (Math.min(1.4, vel * 9) - speed) * (1 - Math.exp(-dt * 6));

    // if someone scrolls before the lights go out, the lights give way
    if (launch === 0 && target > 0.004) {
      ui.cancelLights();
      reveal = Math.max(reveal, 0.001);
      go();
    }
    if (launch > 0 && reveal < 1) reveal = Math.min(1, reveal + dt / 0.9);

    runner.set(0, 0, -p * LENGTH);
    mech.root.position.copy(runner);
    const landed = mech.update(dt, {
      cadence: 1 + speed * 0.4,
      launch,
      phase: reduced ? p * LENGTH * 0.9 + 1.2 : null
    });
    if (landed && !reduced && p < 0.985) fx.strike(mech.foot(landed, footPos));

    rig.apply(p, runner, pointer, dt);
    world.update({ p, camera, runner, time: now / 1000, dt, speed, launch, reduced });

    // focus lines gather on the runner, wherever the camera has put it
    centre.set(runner.x, runner.y + 1.7, runner.z).project(camera);
    fx.update(dt, { speed: reduced ? 0 : speed, centre, aspect: camera.aspect, belt: reduced ? 0 : 24 * launch });

    setTransparent(p < 0.09);
    renderer.render(scene, camera);
    fx.render(renderer);

    title.draw({
      reveal,
      out: smooth(0.006, 0.062, p),
      pointer: mouse.live && p < 0.01 ? mouse : null
    });

    if (lapStart !== null && lapEnd === null && p >= 0.9995) lapEnd = now;
    if (lapEnd !== null && p < 0.99) lapEnd = null;
    const lapMs = lapStart === null ? 0 : (lapEnd ?? now) - lapStart;
    const wantKmh = launch * (96 + speed * 240);
    kmh += (wantKmh - kmh) * (1 - Math.exp(-dt * 4));
    ui.update({
      p,
      lapMs,
      kmh,
      metres: p * LENGTH,
      heroAlpha: smooth(0.35, 1, reveal) * (1 - smooth(0.004, 0.04, p))
    });

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // small handle for debugging from the console
  window.__run = { get p() { return p; }, renderer, scene, camera, mech };
}

boot();
