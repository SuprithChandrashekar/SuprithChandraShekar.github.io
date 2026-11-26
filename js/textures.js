/* Canvas painters for everything typographic in the 3D scene.
   All output is black, white or grey. Plates with a transparent ground are
   painted white and tinted by their material, so they follow the ink colour. */

import * as THREE from "three";

const X = '"Archivo Expanded", "Arial Black", sans-serif';
const C = '"Archivo Condensed", "Arial Narrow", sans-serif';
const T = '"Archivo", system-ui, sans-serif';

let maxAniso = 4;
let scale = 1;
export function setAnisotropy(n) { maxAniso = n; }
/* Painters work in fixed logical sizes. Small screens bake them at a lower resolution to save memory. */
export function setTextureScale(s) { scale = s; }

function canvas(w, h) {
  const c = document.createElement("canvas");
  c.width = Math.round(w * scale);
  c.height = Math.round(h * scale);
  const ctx = c.getContext("2d");
  ctx.scale(scale, scale);
  return [c, ctx];
}

function texture(c) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = maxAniso;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}

function track(ctx, px) {
  if ("letterSpacing" in ctx) ctx.letterSpacing = `${px}px`;
}

function wrap(ctx, text, maxW) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

function para(ctx, text, x, y, maxW, lh, maxLines = 99) {
  const lines = wrap(ctx, text, maxW).slice(0, maxLines);
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lh));
  return y + lines.length * lh;
}

/* Largest size at which `text` fits in maxW on at most maxLines lines. */
function fitTitle(ctx, text, maxW, maxLines, maxPx, minPx, weight = 900, family = X) {
  for (let px = maxPx; px >= minPx; px -= 4) {
    ctx.font = `${weight} ${px}px ${family}`;
    const lines = wrap(ctx, text, maxW);
    const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
    if (lines.length <= maxLines && widest <= maxW) return { px, lines };
  }
  ctx.font = `${weight} ${minPx}px ${family}`;
  return { px: minPx, lines: wrap(ctx, text, maxW).slice(0, maxLines) };
}

/* A patch of halftone dots that grow along x. Used as a printer's mark on cards. */
function dotRamp(ctx, x, y, w, h, color) {
  const step = 13;
  ctx.fillStyle = color;
  ctx.beginPath();
  let row = 0;
  for (let yy = y + step / 2; yy < y + h; yy += step * 0.866, row++) {
    for (let xx = x + step / 2 + (row & 1) * step * 0.5; xx < x + w; xx += step) {
      const t = (xx - x) / w;
      const r = step * 0.5 * (0.12 + 0.86 * t);
      ctx.moveTo(xx + r, yy);
      ctx.arc(xx, yy, r, 0, Math.PI * 2);
    }
  }
  ctx.fill();
}

/* ---------- Card stacks: three cards per build ---------- */

export function cardFront(b, index, total) {
  const [c, x] = canvas(1024, 640);
  const m = 46;
  x.fillStyle = "#fff";
  x.fillRect(0, 0, 1024, 640);
  x.fillStyle = "#000";

  x.font = `600 30px ${C}`;
  track(x, 2.2);
  x.textBaseline = "alphabetic";
  x.fillText(b.kicker.toUpperCase(), m, m + 28);
  track(x, 0);
  x.font = `800 30px ${C}`;
  x.textAlign = "right";
  x.fillText(`${index + 1} / ${total}`, 1024 - m, m + 28);
  x.textAlign = "left";
  x.fillRect(m, m + 48, 1024 - 2 * m, 8);

  const fit = fitTitle(x, b.title.toUpperCase(), 1024 - 2 * m, 2, 148, 64);
  const lh = fit.px * 0.9;
  let y = m + 80 + fit.px * 0.74;
  fit.lines.forEach((l, i) => x.fillText(l, m - 3, y + i * lh));
  y += (fit.lines.length - 1) * lh;

  x.font = `600 35px ${T}`;
  para(x, b.tagline, m, y + 62, 1024 - 2 * m, 42, 2);

  // meta row along the bottom
  const rowY = 640 - m - 70;
  x.fillRect(m, rowY, 1024 - 2 * m, 3);
  const cellW = (1024 - 2 * m) / 3;
  b.meta.forEach(([k, v], i) => {
    const cx = m + i * cellW;
    if (i) x.fillRect(cx - 14, rowY + 14, 2, 56);
    x.fillStyle = "#6b6b6b";
    x.font = `600 22px ${C}`;
    track(x, 1.8);
    x.fillText(k.toUpperCase(), cx, rowY + 34);
    track(x, 0);
    x.fillStyle = "#000";
    x.font = `750 29px ${T}`;
    x.fillText(v, cx, rowY + 70);
  });
  return texture(c);
}

export function cardBlurb(b) {
  const [c, x] = canvas(1024, 640);
  const m = 52;
  x.fillStyle = "#000";
  x.fillRect(0, 0, 1024, 640);
  x.fillStyle = "#fff";
  x.font = `800 30px ${C}`;
  track(x, 2.2);
  x.fillText(b.title.toUpperCase(), m, m + 28);
  track(x, 0);
  x.fillRect(m, m + 48, 1024 - 2 * m, 3);
  let px = 44;
  x.font = `550 ${px}px ${T}`;
  while (wrap(x, b.blurb, 1024 - 2 * m).length * px * 1.26 > 420 && px > 30) {
    px -= 2;
    x.font = `550 ${px}px ${T}`;
  }
  para(x, b.blurb, m, m + 112, 1024 - 2 * m, px * 1.26);
  dotRamp(x, 1024 - m - 230, 640 - m - 44, 230, 46, "#fff");
  return texture(c);
}

export function cardTools(b) {
  const [c, x] = canvas(1024, 640);
  const m = 52;
  x.fillStyle = "#c9c9c9";
  x.fillRect(0, 0, 1024, 640);
  x.fillStyle = "#000";
  x.font = `800 30px ${C}`;
  track(x, 2.2);
  x.fillText("BUILT WITH", m, m + 28);
  track(x, 0);
  x.fillRect(m, m + 48, 1024 - 2 * m, 3);
  x.font = `800 76px ${C}`;
  const text = b.stack.join("  /  ").toUpperCase();
  para(x, text, m, m + 140, 1024 - 2 * m, 84, 5);
  x.font = `600 30px ${T}`;
  x.fillText("Full write-up in INFO", m, 640 - m);
  return texture(c);
}

/* ---------- HUD plates ---------- */

export function hudPlate(n, index) {
  const [c, x] = canvas(900, 560);
  x.fillStyle = "#fff";
  x.strokeStyle = "#fff";
  x.lineWidth = 4;

  // corner brackets
  const b = 46;
  x.beginPath();
  x.moveTo(8, 8 + b); x.lineTo(8, 8); x.lineTo(8 + b, 8);
  x.moveTo(892 - b, 552); x.lineTo(892, 552); x.lineTo(892, 552 - b);
  x.stroke();

  // channel tag
  x.font = `800 30px ${C}`;
  track(x, 2.6);
  x.fillText(`CH ${String(index + 1).padStart(2, "0")}`, 34, 56);
  const tagX = 34 + x.measureText(`CH ${String(index + 1).padStart(2, "0")}`).width + 22;
  x.fillRect(tagX, 34, 3, 26);
  x.font = `600 30px ${C}`;
  x.fillText(n.source.toUpperCase(), tagX + 20, 56);
  track(x, 0);

  // value
  x.font = `900 212px ${X}`;
  const vw = x.measureText(n.value).width;
  x.fillText(n.value, 26, 262);
  if (n.unit) {
    x.font = `600 62px ${X}`;
    x.fillText(n.unit, 26 + vw + 16, 262);
  }

  // ruler
  const ry = 304;
  x.fillRect(34, ry, 832, 3);
  for (let i = 0; i <= 52; i++) {
    const tx = 34 + i * 16;
    x.fillRect(tx, ry, 2, i % 13 === 0 ? 26 : i % 2 ? 9 : 15);
  }
  const mk = 34 + 832 * (0.18 + 0.13 * index);
  x.beginPath();
  x.moveTo(mk, ry - 4); x.lineTo(mk - 11, ry - 22); x.lineTo(mk + 11, ry - 22);
  x.closePath();
  x.fill();

  // label, with its context
  x.font = `600 46px ${T}`;
  para(x, n.label, 34, 388, 830, 56, 3);
  return texture(c);
}

/* ---------- Knob console plates ---------- */

export const KNOB_PLATE = { w: 1024, h: 694, cx: 236, cy: 300, r: 214 };

export function knobPlate(mth) {
  const { w, h, cx, cy, r } = KNOB_PLATE;
  const [c, x] = canvas(w, h);
  x.fillStyle = "#000";
  x.fillRect(0, 0, w, h);
  x.strokeStyle = "#fff";
  x.fillStyle = "#fff";

  // dial scale, 270 degrees
  const a0 = -135, a1 = 135;
  for (let i = 0; i <= 54; i++) {
    const deg = a0 + ((a1 - a0) * i) / 54;
    const rad = (deg * Math.PI) / 180;
    const major = i % 9 === 0;
    const r0 = r - (major ? 34 : 18);
    x.lineWidth = major ? 5 : 2.5;
    x.beginPath();
    x.moveTo(cx + Math.sin(rad) * r0, cy - Math.cos(rad) * r0);
    x.lineTo(cx + Math.sin(rad) * r, cy - Math.cos(rad) * r);
    x.stroke();
  }
  // the set point, drawn as a solid block on the scale
  const setRad = ((a0 + (a1 - a0) * mth.set) * Math.PI) / 180;
  x.save();
  x.translate(cx + Math.sin(setRad) * (r + 14), cy - Math.cos(setRad) * (r + 14));
  x.rotate(setRad);
  x.fillRect(-9, -9, 18, 18);
  x.restore();

  // pole labels under the two ends of the scale
  x.font = `800 30px ${C}`;
  track(x, 2);
  x.textAlign = "center";
  x.fillStyle = "#9a9a9a";
  x.fillText(mth.poles[0].toUpperCase(), cx - 138, cy + r - 6);
  x.fillStyle = "#fff";
  x.fillText(mth.poles[1].toUpperCase(), cx + 138, cy + r - 6);
  x.textAlign = "left";
  track(x, 0);

  // copy, right column
  const tx = 500;
  const fit = fitTitle(x, mth.title.toUpperCase(), w - tx - 44, 2, 70, 44);
  fit.lines.forEach((l, i) => x.fillText(l, tx, 150 + i * fit.px * 0.94));
  const ty = 150 + (fit.lines.length - 1) * fit.px * 0.94 + 30;
  x.fillRect(tx, ty, w - tx - 44, 6);
  x.font = `500 35px ${T}`;
  para(x, mth.body, tx, ty + 62, w - tx - 44, 45, 8);
  return texture(c);
}

/* ---------- Glass panel plates ---------- */

export function glassPlate(rt, index, total) {
  const [c, x] = canvas(1024, 702);
  const m = 54;
  x.fillStyle = "#fff";
  x.font = `800 34px ${C}`;
  track(x, 2.4);
  x.fillText(rt.period.toUpperCase(), m, m + 30);
  x.textAlign = "right";
  x.fillText(`STOP ${index + 1} OF ${total}`, 1024 - m, m + 30);
  x.textAlign = "left";
  track(x, 0);
  x.fillRect(m, m + 52, 1024 - 2 * m, 5);

  // the thread that carried over sits on a solid bar at the foot, so measure it first
  x.font = `700 32px ${T}`;
  const threadLines = wrap(x, rt.thread, 1024 - 2 * m - 44);
  const barH = 36 + threadLines.length * 41;
  const by = 702 - m - barH + 14;

  const fit = fitTitle(x, rt.org.toUpperCase(), 1024 - 2 * m, 2, 104, 52);
  let y = m + 84 + fit.px * 0.74;
  fit.lines.forEach((l, i) => x.fillText(l, m - 2, y + i * fit.px * 0.92));
  y += (fit.lines.length - 1) * fit.px * 0.92;

  // role and body share the space that is left; shrink together until they fit
  const room = by - 22 - (y + 22);
  let px = 38;
  let roleLines, bodyLines;
  for (; px >= 26; px -= 1) {
    x.font = `700 ${px}px ${T}`;
    roleLines = wrap(x, rt.role, 1024 - 2 * m);
    x.font = `450 ${px}px ${T}`;
    bodyLines = wrap(x, rt.body, 1024 - 2 * m);
    if ((roleLines.length + bodyLines.length) * px * 1.26 + 16 <= room) break;
  }
  const lh = px * 1.26;
  y += 22 + px;
  x.font = `700 ${px}px ${T}`;
  roleLines.forEach((l, i) => x.fillText(l, m, y + i * lh));
  y += roleLines.length * lh + 16;
  x.font = `450 ${px}px ${T}`;
  bodyLines.forEach((l, i) => x.fillText(l, m, y + i * lh));

  x.font = `700 32px ${T}`;
  x.fillRect(m, by, 1024 - 2 * m, barH);
  x.globalCompositeOperation = "destination-out";
  threadLines.forEach((l, i) => x.fillText(l, m + 22, by + 48 + i * 41));
  x.globalCompositeOperation = "source-over";
  return texture(c);
}

export function glassSheen() {
  const [c, x] = canvas(256, 256);
  const g = x.createLinearGradient(0, 0, 256, 256);
  g.addColorStop(0, "rgba(255,255,255,0.34)");
  g.addColorStop(0.38, "rgba(255,255,255,0.1)");
  g.addColorStop(1, "rgba(255,255,255,0.02)");
  x.fillStyle = g;
  x.fillRect(0, 0, 256, 256);
  // a soft streak, as if a strip light sat off to one side
  x.save();
  x.translate(128, 128);
  x.rotate(-0.62);
  const s = x.createLinearGradient(0, -34, 0, 34);
  s.addColorStop(0, "rgba(255,255,255,0)");
  s.addColorStop(0.5, "rgba(255,255,255,0.1)");
  s.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = s;
  x.fillRect(-260, -100, 520, 68);
  x.restore();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ---------- Words painted on the runway ---------- */

export function groundWord(word) {
  const [c, x] = canvas(1536, 300);
  x.fillStyle = "#fff";
  const fit = fitTitle(x, word.toUpperCase(), 1500, 1, 260, 120);
  x.textAlign = "center";
  x.fillText(fit.lines[0], 768, 150 + fit.px * 0.36);
  return texture(c);
}

export function chequer() {
  const [c, x] = canvas(640, 128);
  const s = 32;
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 20; i++) {
      x.fillStyle = (i + j) % 2 ? "#000" : "#fff";
      x.fillRect(i * s, j * s, s, s);
    }
  }
  const t = texture(c);
  t.magFilter = THREE.NearestFilter;
  return t;
}

/* Vertical grooves for the knob skirt, used as a bump map. */
export function knurl() {
  const [c, x] = canvas(512, 8);
  const g = x.createLinearGradient(0, 0, 8, 0);
  g.addColorStop(0, "#000");
  g.addColorStop(0.5, "#fff");
  g.addColorStop(1, "#000");
  for (let i = 0; i < 64; i++) {
    x.save();
    x.translate(i * 8, 0);
    x.fillStyle = g;
    x.fillRect(0, 0, 8, 8);
    x.restore();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.repeat.set(1.5, 1);
  return t;
}
