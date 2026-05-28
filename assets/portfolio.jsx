/* eslint-disable */
/* Portfolio — VoltBroker × Apple home page */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* -------------------- Reveal-on-scroll hook -------------------- */
function useReveal() {
  useEffect(() => {
    // Tag the doc once JS has hydrated — CSS uses .js-loaded to opt-in to
    // the opacity:0 starting state so the no-JS / pre-hydration view is
    // still readable.
    document.documentElement.classList.add('js-loaded');

    // Hero entrance — staggered class toggles instead of CSS @keyframes
    // (CSS animations can stall in some rendering contexts).
    requestAnimationFrame(() => {
      const lns = document.querySelectorAll('.hero-h1 .ln');
      const heroSub = document.querySelector('.hero-sub');
      const ctaRow = document.querySelector('.hero .cta-row');
      const heroBot = document.querySelector('.hero-bottom');
      lns.forEach((el, i) => setTimeout(() => el.classList.add('in'), 60 + i * 120));
      if (heroSub) setTimeout(() => heroSub.classList.add('in'), 560);
      if (ctaRow)  setTimeout(() => ctaRow.classList.add('in'), 720);
      if (heroBot) setTimeout(() => heroBot.classList.add('in'), 880);
    });

    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(e => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
}

/* -------------------- Boot overlay -------------------- */
const BOOT_LINES = [
  { t: 0,    html: '<span class="dim">[0.001]</span> portfolio.sys boot <span class="ok">ok</span>' },
  { t: 90,   html: '<span class="dim">[0.089]</span> mounting /identity ............... <span class="ok">ok</span>' },
  { t: 200,  html: '<span class="dim">[0.174]</span> resolving /projects (6) .......... <span class="ok">ok</span>' },
  { t: 320,  html: '<span class="dim">[0.261]</span> loading design.tokens ............ <span class="ok">ok</span>' },
  { t: 430,  html: '<span class="dim">[0.338]</span> attaching voltbroker.vercel ...... <span class="ok">ok</span>' },
  { t: 540,  html: '<span class="dim">[0.412]</span> warming /now ..................... <span class="ok">ok</span>' },
  { t: 650,  html: '<span class="dim">[0.487]</span> <span class="accent">suprith@portfolio</span>:~$ render <span class="accent">--edition=2026</span> <span class="cursor"></span>' },
];

function Boot() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('booted')) { setDone(true); setHidden(true); return; }
    const timers = BOOT_LINES.map(l => setTimeout(() => {
      setLines(prev => [...prev, l]);
    }, l.t));
    const finalT = setTimeout(() => {
      sessionStorage.setItem('booted', '1');
      setDone(true);
      setTimeout(() => setHidden(true), 600);
    }, 1500);
    return () => { timers.forEach(clearTimeout); clearTimeout(finalT); };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="boot"
      style={done ? { opacity: 0, pointerEvents: 'none' } : undefined}
      aria-hidden={done ? 'true' : 'false'}
    >
      <div className="boot-inner">
        {lines.map((l, i) => (
          <div key={i} className="boot-line" dangerouslySetInnerHTML={{ __html: l.html }} />
        ))}
      </div>
    </div>
  );
}

/* -------------------- Topbar -------------------- */
function Topbar() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    // Toggle light/dark style based on the section currently under the bar.
    const onScroll = () => {
      const y = 24;
      const el = document.elementFromPoint(window.innerWidth / 2, y);
      const surf = el?.closest('.surf-cream, .surf-paper, .surf-dark, .hero');
      if (!surf) return;
      const isLight = surf.classList.contains('surf-cream') || surf.classList.contains('surf-paper');
      setLight(isLight);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header className={'topbar' + (light ? ' is-light' : '')}>
      <div className="topbar-inner">
        <a href="#top" className="topbar-brand">
          <span className="mark">V</span>
          <span>SUPRITH.OPS</span>
          <span className="ver">/ 2026</span>
        </a>
        <nav className="topbar-nav">
          <a href="#work">work</a>
          <a href="#arc">arc</a>
          <a href="#how">approach</a>
          <a href="#credentials">credentials</a>
          <a href="#contact">contact</a>
        </nav>
        <div className="topbar-right">
          <span><span className="live-dot"></span>online</span>
        </div>
      </div>
    </header>
  );
}

/* -------------------- Hero -------------------- */
function Hero() {
  const h = window.PORTFOLIO_DATA.hero;
  const d = window.PORTFOLIO_DATA.identity;
  const now = useMemo(() => {
    const dt = new Date();
    return dt.toLocaleString('en-US', {
      month: 'short', day: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC'
    }).toUpperCase() + ' UTC';
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-top">
          <div className="hero-top-l">
            <div><span className="accent">●</span> SUPRITH.OPS / {h.edition}</div>
            <div>FILED · {now}</div>
          </div>
          <div className="hero-top-r">
            <div><span className="live">●</span> AVAILABLE · {d.status.toUpperCase()}</div>
            <div>{d.locShort.toUpperCase()} · {d.tz}</div>
          </div>
        </div>

        <h1 className="hero-h1">
          <span className="ln">{h.line1}</span>
          <span className="ln"><span className="em">{h.line2}</span></span>
          <span className="ln">{h.line3}</span>
          <span className="ln">{h.line4}</span>
        </h1>

        <p className="hero-sub" dangerouslySetInnerHTML={{ __html: h.sub }} />

        <div className="cta-row">
          <a className="btn btn-primary" href="#work">
            <span>View selected work</span><span className="arrow">→</span>
          </a>
          <a className="btn" href="#contact">
            <span>Get in touch</span><span className="arrow">→</span>
          </a>
          <a className="btn" href={d.voltbroker} target="_blank" rel="noreferrer">
            <span>VoltBroker</span><span className="arrow">↗</span>
          </a>
        </div>

        <div className="hero-bottom">
          {h.stats.map((s, i) => (
            <div key={i} className="hero-stat">
              <div className="k">{s.k}</div>
              <div className="v">{s.v}</div>
              <div className="sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Telemetry strip -------------------- */
function Telemetry() {
  const t = window.PORTFOLIO_DATA.telemetry;
  return (
    <section className="telemetry">
      <div className="telemetry-inner">
        {t.map((c, i) => (
          <div key={i} className="tel-cell">
            <div className="k">{c.k}</div>
            <div className="v">{c.v}{c.u && <span className="u">{c.u}</span>}</div>
            <div className="sub">{c.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- Section head -------------------- */
function SecHead({ num, title, em, meta }) {
  return (
    <header className="sec-head reveal">
      <div>
        <div className="sec-head-eyebrow">§ {num} / {meta?.split('·')[0]?.trim()}</div>
        <h2 className="h2">{title}{em && <> <em>{em}</em></>}</h2>
      </div>
      <div className="sec-head-meta">{meta}</div>
    </header>
  );
}

/* -------------------- Project index (masthead list) -------------------- */
function ProjectIndex() {
  const projects = window.PORTFOLIO_DATA.projects;
  return (
    <section className="surf surf-dark index" id="work">
      <div className="surf-inner">
        <header className="sec-head reveal">
          <div>
            <div className="sec-head-eyebrow">§ 01 / SELECTED WORK</div>
            <h2 className="h2">Selected <em>work</em></h2>
          </div>
          <div className="sec-head-meta">06 PROJECTS · 2020 — 2026</div>
        </header>
        <div className="index-list reveal-stagger">
          {projects.map(p => (
            <a key={p.slug} href={`#p-${p.slug}`} className="index-row">
              <span className="ix-num">{p.id}</span>
              <span className="ix-title">{p.title}<em>{p.titleRest}</em></span>
              <span className="ix-kicker">{p.kicker}</span>
              <span className="ix-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- ProjectShow (theatrical block per project) -------------------- */
function ProjectShow({ p, idx }) {
  const dark = idx % 2 === 1; // alternate after the masthead
  const surfClass = dark ? 'surf surf-dark' : 'surf surf-cream';
  const reverse = idx % 2 === 0;
  const illusOpts = dark
    ? { fill: '#E8E3D0', accent: '#E8551C' }
    : { fill: '#2A2824', accent: '#E8551C' };
  const svg = window.getIllus(p.illus, illusOpts);

  return (
    <section className={surfClass + ' proj-show'} id={`p-${p.slug}`}>
      <div className={'surf-inner proj-show-inner' + (reverse ? ' reverse' : '')}>
        <div className="proj-body reveal">
          <div className="proj-eyebrow">
            <span>§ {p.id}</span>
            <span className="sep"></span>
            <span>{p.kicker}</span>
          </div>
          <h3 className="proj-title">{p.title}<em>{p.titleRest}</em></h3>
          <p className="proj-tagline">{p.tagline}</p>
          <p className="proj-blurb">{p.blurb}</p>

          {p.meta && (
            <div className="proj-meta">
              {p.meta.map((m, i) => (
                <div key={i} className="proj-meta-cell">
                  <span className="k">{m.k}</span>
                  <span className="v">{m.v}</span>
                </div>
              ))}
            </div>
          )}

          <div className="cta-row" style={{ margin: 0 }}>
            <a className="btn btn-primary" href={`projects/${p.slug}.html`}>
              <span>Read case</span><span className="arrow">→</span>
            </a>
            {p.links?.map((l, i) => (
              <a key={i} className="btn" href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                <span>{l.label}</span><span className="arrow">{l.href.startsWith('http') ? '↗' : '→'}</span>
              </a>
            ))}
          </div>
        </div>

        <div
          className="proj-art reveal"
          data-corner={`FIG. ${p.id} · ${p.illus.toUpperCase()}`}
          data-stamp={`PORTFOLIO/2026 · ${p.id}`}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    </section>
  );
}

/* -------------------- Professional Arc -------------------- */
function Arc() {
  const arc = window.PORTFOLIO_DATA.arc;
  return (
    <section className="surf surf-paper" id="arc">
      <div className="surf-inner">
        <SecHead num="02" title="Professional" em="arc" meta="CONSULTING · ENGINEERING · DESIGN · 2018—2026" />
        <div className="arc reveal-stagger">
          {arc.map((r, i) => (
            <div key={i} className="arc-row">
              <div className="arc-period">{r.period}</div>
              <div className="arc-title">{r.title}<span className="sub">{r.sub}</span></div>
              <div className="arc-body">{r.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- How I work -------------------- */
function HowIWork() {
  const how = window.PORTFOLIO_DATA.how_i_work;
  return (
    <section className="surf surf-dark" id="how">
      <div className="surf-inner">
        <SecHead num="03" title="How I" em="work" meta="FOUR PRINCIPLES · IN ACTIVE USE" />
        <div className="how reveal-stagger">
          {how.map((h, i) => (
            <div key={i} className="how-card">
              <div className="num">PRINCIPLE / 0{i + 1}</div>
              <div className="k">{h.k}</div>
              <div className="v">{h.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Credentials -------------------- */
function Credentials() {
  const cred = window.PORTFOLIO_DATA.credentials;
  return (
    <section className="surf surf-cream" id="credentials">
      <div className="surf-inner">
        <SecHead num="04" title="Credentials" em="& outcomes" meta="VERIFIED · ACADEMIC + PROFESSIONAL" />
        <div className="cred-grid reveal-stagger">
          {cred.map((c, i) => (
            <div key={i} className="cred-cell">
              <div className="k">{c.k}</div>
              <div className="v">{c.v}</div>
              <div className="sub">{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Contact -------------------- */
function Contact() {
  const d = window.PORTFOLIO_DATA.identity;
  return (
    <section className="surf surf-dark" id="contact">
      <div className="surf-inner">
        <div className="sec-head-eyebrow reveal">§ 05 / GET IN TOUCH</div>
        <h2 className="contact-h reveal">
          Looking for <em>product design</em> and <em>applied&nbsp;AI</em> roles starting Spring&nbsp;2027.
        </h2>
        <p className="lede reveal" style={{ marginTop: 16 }}>
          If you're building AI-driven products, designing conversational interfaces, or need someone who can own a product end-to-end from research to shipped pixels — I'd love to talk. I write back the same day.
        </p>

        <div className="contact-grid reveal">
          <a className="contact-row" href={d.linkedin} target="_blank" rel="noreferrer">
            <span className="k">LINKEDIN</span>
            <span className="v">in/suprith-c-shekar</span>
            <span className="arr">↗</span>
          </a>
          <a className="contact-row" href={d.github} target="_blank" rel="noreferrer">
            <span className="k">GITHUB</span>
            <span className="v">@SuprithChandrashekar</span>
            <span className="arr">↗</span>
          </a>
          <a className="contact-row" href={d.voltbroker} target="_blank" rel="noreferrer">
            <span className="k">VOLTBROKER</span>
            <span className="v">voltbroker.vercel.app</span>
            <span className="arr">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Footer -------------------- */
function Footer() {
  const d = window.PORTFOLIO_DATA.identity;
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-mark">Suprith / 2026</div>
            <p className="footer-quote">
              "Bring the rigour of engineering to the creative process of product design."
            </p>
          </div>
          <div className="footer-col">
            <h4>Work</h4>
            <ul>
              {window.PORTFOLIO_DATA.projects.map(p => (
                <li key={p.slug}><a href={`projects/${p.slug}.html`}>{p.title}{p.titleRest}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Elsewhere</h4>
            <ul>
              <li><a href={d.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
              <li><a href={d.github} target="_blank" rel="noreferrer">GitHub ↗</a></li>
              <li><a href={d.voltbroker} target="_blank" rel="noreferrer">VoltBroker ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} SUPRITH CHANDRA SHEKAR · BUILT WITH CLAUDE</span>
          <span>CHAMPAIGN, IL · UTC−06 · AVAILABLE SPRING 2027</span>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- App -------------------- */
function App() {
  useReveal();
  const projects = window.PORTFOLIO_DATA.projects;
  return (
    <>
      <Boot />
      <Topbar />
      <main>
        <Hero />
        <Telemetry />
        <ProjectIndex />
        {projects.map((p, i) => <ProjectShow key={p.slug} p={p} idx={i} />)}
        <Arc />
        <HowIWork />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
