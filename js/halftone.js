/* Halftone type. Text is rasterised off screen, then resampled on a hex grid.
   Each cell that lands on ink becomes one dot, sized by how much ink it covers.
   The hero title draws these dots in 2D. The finale places the same dots in 3D. */

const TAU = Math.PI * 2;

/* Rasterise lines of capitals at one font size, widest line spanning `width` pixels. */
export function rasterText({ lines, width, weight = 900, family = '"Archivo Expanded"', leading = 1.17, align = "left", maxHeight = Infinity }) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const font = (px) => `${weight} ${px}px ${family}, "Arial Black", sans-serif`;

  ctx.font = font(100);
  const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
  const cap100 = ctx.measureText("H").actualBoundingBoxAscent || 69;
  const blockH100 = cap100 + (lines.length - 1) * cap100 * leading + 4;

  let fontSize = (100 * width) / widest;
  if ((blockH100 * fontSize) / 100 > maxHeight) fontSize = (100 * maxHeight) / blockH100;

  const cap = (cap100 * fontSize) / 100;
  const lineStep = cap * leading;
  const W = Math.ceil((widest * fontSize) / 100) + 4;
  const H = Math.ceil(cap + (lines.length - 1) * lineStep) + 6;

  canvas.width = W;
  canvas.height = H;
  ctx.font = font(fontSize);
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = align === "center" ? "center" : "left";
  const x = align === "center" ? W / 2 : 2;
  lines.forEach((line, i) => ctx.fillText(line, x, 2 + cap + i * lineStep));

  return { image: ctx.getImageData(0, 0, W, H), width: W, height: H, fontSize, cap };
}

/* Resample a raster on a hex grid. Returns a flat array of x, y, coverage. */
export function halftoneDots(raster, step) {
  const { data } = raster.image;
  const W = raster.width;
  const H = raster.height;
  const alpha = (x, y) => {
    const xi = x | 0;
    const yi = y | 0;
    if (xi < 0 || yi < 0 || xi >= W || yi >= H) return 0;
    return data[(yi * W + xi) * 4 + 3];
  };
  const rowH = step * 0.8660254;
  const q = step * 0.3;
  const out = [];
  let row = 0;
  for (let y = rowH * 0.5; y < H + rowH * 0.5; y += rowH, row++) {
    const shift = (row & 1) * step * 0.5;
    for (let x = step * 0.5 - shift; x < W + step * 0.5; x += step) {
      const c = (alpha(x, y) * 2 + alpha(x - q, y - q) + alpha(x + q, y - q) + alpha(x - q, y + q) + alpha(x + q, y + q)) / (6 * 255);
      if (c > 0.14) out.push(x, y, c);
    }
  }
  return new Float32Array(out);
}

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export class HeroTitle {
  constructor(canvas, lines) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.lines = lines;
    this.dots = new Float32Array(0);
    this.box = { left: 0, top: 0, width: 0, height: 0 };
    this.step = 8;
    this.dpr = 1;
    this.ink = "#fff";
    this.key = "";
  }

  /* Sizes are CSS pixels. Returns the box the title occupies. */
  layout({ left, top, maxWidth, maxHeight }) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    this.dpr = dpr;
    this.canvas.width = Math.round(vw * dpr);
    this.canvas.height = Math.round(vh * dpr);

    const raster = rasterText({ lines: this.lines, width: maxWidth * dpr, maxHeight: maxHeight * dpr });
    this.step = Math.max(4.5 * dpr, raster.fontSize / 19);
    this.dots = halftoneDots(raster, this.step);
    this.raster = { width: raster.width, height: raster.height };
    this.box = { left, top, width: raster.width / dpr, height: raster.height / dpr };
    this.key = "";
    return this.box;
  }

  /* reveal 0..1 prints the dots in, out 0..1 takes them away again.
     pointer is in CSS pixels or null. */
  draw({ reveal = 1, out = 0, pointer = null }) {
    const key = `${reveal.toFixed(3)}|${out.toFixed(3)}|${pointer ? (pointer.x | 0) + "," + (pointer.y | 0) : "-"}|${this.ink}`;
    if (key === this.key) return;
    this.key = key;

    const { ctx, dots, step, dpr } = this;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (reveal <= 0 || out >= 1 || !dots.length) return;

    const ox = this.box.left * dpr;
    const oy = this.box.top * dpr;
    const W = this.raster.width;
    const H = this.raster.height;
    const maxR = step * 0.5;
    const px = pointer ? pointer.x * dpr : -1e6;
    const py = pointer ? pointer.y * dpr : -1e6;
    const lens = 150 * dpr;
    const drift = out * out * 90 * dpr;

    ctx.fillStyle = this.ink;
    ctx.beginPath();
    for (let i = 0; i < dots.length; i += 3) {
      const gx = dots[i] / W;
      const gy = dots[i + 1] / H;
      // tone ramps from light at the top left to solid at the bottom right
      let tone = 0.6 + 0.4 * smooth(0.0, 0.92, gx * 0.34 + gy * 0.66);
      const x = ox + dots[i];
      const y = oy + dots[i + 1];
      const d = Math.hypot(x - px, y - py);
      if (d < lens) tone = Math.min(1.06, tone + (1 - d / lens) * 0.6);
      // printing sweep, left to right with a slight lean
      const on = smooth(0, 0.22, reveal * 1.3 - gx * 0.9 - gy * 0.18);
      // leaving sweep, right to left
      const off = 1 - smooth(0, 0.3, out * 1.4 - (1 - gx) * 0.9 - gy * 0.15);
      const r = maxR * Math.sqrt(dots[i + 2]) * tone * on * off;
      if (r < 0.35) continue;
      const xx = x - drift * (0.4 + gy);
      ctx.moveTo(xx + r, y);
      ctx.arc(xx, y, r, 0, TAU);
    }
    ctx.fill();
  }
}
