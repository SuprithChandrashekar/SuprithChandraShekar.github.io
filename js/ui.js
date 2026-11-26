/* Interface layer: timing tower, start lights, INFO sheet, telemetry,
   background colour picker and the finish block. */

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = (id) => document.getElementById(id);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const external = (href) => /^https?:/.test(href);
const linkAttrs = (href) => (external(href) ? ' target="_blank" rel="noopener"' : "");

const DEFAULT_BG = "#2260d9";

function infoHTML(c) {
  const route = [...c.route].reverse();
  return `
    <h2 id="info-title">${esc(c.identity.name)}</h2>
    <p class="lead">${esc(c.hero.tagline)}</p>
    <p class="status">${esc(c.identity.status)}</p>

    <h3>The short version</h3>
    ${c.about.map((p) => `<p>${esc(p)}</p>`).join("")}

    <h3>Route</h3>
    ${route.map((r) => `
      <article class="entry">
        <p class="when">${esc(r.period)}</p>
        <h4>${esc(r.org)}</h4>
        <p class="sub">${esc(r.role)}</p>
        <p>${esc(r.body)}</p>
        <p class="thread">${esc(r.thread)}</p>
      </article>`).join("")}

    <h3>Builds</h3>
    ${[...c.builds].reverse().map((b) => `
      <article class="entry">
        <p class="when">${esc(b.kicker)}</p>
        <h4>${esc(b.title)}</h4>
        <p class="sub">${esc(b.tagline)}</p>
        <p>${esc(b.blurb)}</p>
        <p class="tools">${b.stack.map(esc).join(", ")}</p>
        <p class="links">${b.links.map((l) => `<a href="${esc(l.href)}"${linkAttrs(l.href)}>${esc(l.label)}</a>`).join("")}</p>
      </article>`).join("")}

    <h3>Method</h3>
    ${c.method.map((m) => `
      <article class="entry">
        <h4>${esc(m.title)}</h4>
        <div class="dial-row" aria-hidden="true">
          <span>${esc(m.poles[0])}</span>
          <span class="dial-bar"><i style="left:${Math.round(m.set * 100)}%"></i></span>
          <span>${esc(m.poles[1])}</span>
        </div>
        <p>${esc(m.body)}</p>
      </article>`).join("")}

    <h3>Numbers</h3>
    <div class="num-grid">
      ${c.numbers.map((n) => `
        <div class="num">
          <b>${esc(n.value)}${n.unit ? `<small>${esc(n.unit)}</small>` : ""}</b>
          <span>${esc(n.label)}</span>
          <em>${esc(n.source)}</em>
        </div>`).join("")}
    </div>

    <h3>Credentials</h3>
    <ul class="plain">${c.credentials.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>

    <h3>Contact</h3>
    <div class="contact">
      ${c.identity.links.map((l) => `<a href="${esc(l.href)}"${linkAttrs(l.href)}>${esc(l.label)}</a>`).join("")}
    </div>
  `;
}

export function createUI({ content, onJump, onRestart, onBg }) {
  const root = document.documentElement;
  const sectors = content.sectors;

  /* Hero copy */
  $("tagline").textContent = content.hero.tagline;
  $("byline").textContent = content.hero.byline;
  $("cue-text").textContent = content.hero.cue;
  const heroCopy = $("hero-copy");
  heroCopy.style.opacity = "0";

  /* Sector buttons */
  const nav = $("sectors");
  nav.innerHTML = sectors
    .map((s, i) => `<button class="sector" type="button" data-i="${i}" data-id="${s.id}"><b>S${i + 1}</b><span>${esc(s.label)}</span>${s.id === "finish" ? "<i></i>" : ""}</button>`)
    .join("");
  const buttons = [...nav.querySelectorAll(".sector")];
  nav.addEventListener("click", (e) => {
    const b = e.target.closest(".sector");
    if (b) onJump(sectors[+b.dataset.i]);
  });
  $("home").addEventListener("click", (e) => {
    e.preventDefault();
    onJump(sectors[0]);
  });

  /* INFO sheet */
  const sheet = $("info");
  $("info-body").innerHTML = infoHTML(content);
  let openInfo = () => { if (!sheet.open) sheet.showModal(); };
  $("info-open").addEventListener("click", () => openInfo());
  $("info-close").addEventListener("click", () => sheet.close());
  sheet.addEventListener("click", (e) => { if (e.target === sheet) sheet.close(); });

  /* Finish block */
  $("finish-line").textContent = content.finale.linesWide.join(" ");
  $("finish-sub").textContent = content.finale.sub;
  const fin = $("finish");
  $("finish-links").innerHTML =
    content.identity.links.map((l) => `<a href="${esc(l.href)}"${linkAttrs(l.href)} tabindex="-1">${esc(l.label)}</a>`).join("") +
    `<button type="button" id="finish-info" tabindex="-1">Full info</button>`;
  $("finish-info").addEventListener("click", () => openInfo());
  const finishFocusables = [...fin.querySelectorAll("a, button")];

  /* Restart */
  $("restart").addEventListener("click", onRestart);

  /* Background colour */
  const picker = $("bg");
  const hexOut = $("bg-hex");
  const applyBg = (hex, save) => {
    const h = /^#[0-9a-f]{6}$/i.test(hex) ? hex.toLowerCase() : DEFAULT_BG;
    const n = parseInt(h.slice(1), 16);
    const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    const lum = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
    const dark = lum > 0.42;
    root.style.setProperty("--bg", h);
    root.dataset.ink = dark ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]').setAttribute("content", h);
    picker.value = h;
    hexOut.textContent = h.toUpperCase();
    onBg(h, dark ? "#000000" : "#ffffff");
    if (save) { try { localStorage.setItem("run-bg", h); } catch (e) { /* storage unavailable, the colour just won't persist */ } }
  };
  picker.addEventListener("input", () => applyBg(picker.value, true));
  // double click the label to return to the house blue
  picker.closest("label").addEventListener("dblclick", (e) => { e.preventDefault(); applyBg(DEFAULT_BG, true); });
  let saved = DEFAULT_BG;
  try { saved = localStorage.getItem("run-bg") || DEFAULT_BG; } catch (e) { /* ignore */ }

  /* Start lights */
  const lamps = [...document.querySelectorAll(".lights i")];
  let lightsRun = 0;
  async function lights() {
    const run = ++lightsRun;
    lamps.forEach((l) => l.classList.remove("on"));
    await wait(260);
    for (const l of lamps) {
      if (run !== lightsRun) return false;
      l.classList.add("on");
      await wait(300);
    }
    await wait(380 + Math.random() * 420);
    if (run !== lightsRun) return false;
    lamps.forEach((l) => l.classList.remove("on"));
    return true;
  }

  /* Per-frame readouts. Only touch the DOM when a value changes. */
  const lapOut = $("lap");
  const spdOut = $("spd");
  const distOut = $("dist");
  const caption = $("caption");
  const cue = $("cue");
  let current = -1;
  let lastLap = "";
  let lastSpd = "";
  let lastDist = "";
  let finishShown = false;
  const fills = buttons.map(() => -1);

  function update({ p, lapMs, kmh, metres, heroAlpha }) {
    let idx = 0;
    for (let i = 0; i < sectors.length; i++) if (p >= sectors[i].from - 1e-6) idx = i;

    buttons.forEach((b, i) => {
      const from = sectors[i].from;
      const to = i + 1 < sectors.length ? sectors[i + 1].from : 1;
      const f = Math.round(clamp01((p - from) / (to - from)) * 200) / 200;
      if (f !== fills[i]) { fills[i] = f; b.style.setProperty("--fill", f); }
    });

    if (idx !== current) {
      current = idx;
      buttons.forEach((b, i) => (i === idx ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current")));
      const s = sectors[idx];
      if (s.caption) {
        caption.innerHTML = `<small>Sector ${idx + 1}, ${esc(s.label)}</small>${esc(s.caption)}`;
        caption.classList.add("show");
      } else caption.classList.remove("show");
    }

    const total = Math.max(0, lapMs);
    const lap = `${Math.floor(total / 60000)}:${String(Math.floor(total / 1000) % 60).padStart(2, "0")}.${String(Math.floor(total % 1000)).padStart(3, "0")}`;
    if (lap !== lastLap) { lastLap = lap; lapOut.textContent = lap; }
    const spd = String(Math.round(kmh)).padStart(3, "0");
    if (spd !== lastSpd) { lastSpd = spd; spdOut.textContent = spd; }
    const dist = String(Math.round(metres)).padStart(3, "0");
    if (dist !== lastDist) { lastDist = dist; distOut.textContent = dist; }

    heroCopy.style.opacity = heroAlpha.toFixed(3);
    heroCopy.style.pointerEvents = heroAlpha < 0.5 ? "none" : "";
    cue.classList.toggle("gone", p > 0.012);

    const showFinish = p > 0.984;
    if (showFinish !== finishShown) {
      finishShown = showFinish;
      fin.classList.toggle("show", showFinish);
      fin.setAttribute("aria-hidden", String(!showFinish));
      finishFocusables.forEach((el) => (showFinish ? el.removeAttribute("tabindex") : el.setAttribute("tabindex", "-1")));
    }
  }

  /* Without WebGL the sheet is laid out as an ordinary section under the title. */
  function inlineInfo() {
    const body = $("info-body");
    const sec = document.createElement("section");
    sec.className = "sheet-body inline-info";
    sec.setAttribute("aria-labelledby", "info-title");
    sec.innerHTML = body.innerHTML;
    body.innerHTML = "";
    document.querySelector("main").appendChild(sec);
    openInfo = () => sec.scrollIntoView({ behavior: "smooth", block: "start" });
    heroCopy.style.opacity = "1";
  }

  return { update, lights, inlineInfo, initBg: () => applyBg(saved, false), cancelLights: () => { lightsRun++; lamps.forEach((l) => l.classList.remove("on")); } };
}
