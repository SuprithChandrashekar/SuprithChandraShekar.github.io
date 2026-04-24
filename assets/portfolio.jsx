/* Operations Console Portfolio — components */
/* eslint-disable */

const { useState, useEffect, useMemo, useRef, useCallback } = React;

/* -------------------- BOOT SEQUENCE -------------------- */
const BOOT_LINES = [
  { t: 0,   html: '<span class="dim">[0.001]</span> portfolio.sys boot... <span class="ok">ok</span>' },
  { t: 90,  html: '<span class="dim">[0.089]</span> mounting /identity ................. <span class="ok">ok</span>' },
  { t: 180, html: '<span class="dim">[0.174]</span> resolving /projects (6) ............ <span class="ok">ok</span>' },
  { t: 260, html: '<span class="dim">[0.261]</span> loading claude_node.container ...... <span class="ok">ok</span>' },
  { t: 340, html: '<span class="dim">[0.338]</span> attaching mcp:// handlers .......... <span class="ok">ok</span>' },
  { t: 420, html: '<span class="dim">[0.402]</span> checking credentials ............... <span class="ok">ok</span>' },
  { t: 500, html: '<span class="dim">[0.487]</span> warming up /now feed ............... <span class="ok">ok</span>' },
  { t: 580, html: '<span class="dim">[0.562]</span> <span class="accent">suprith@portfolio</span>:~$ render <span class="accent">--mode=console</span> <span class="cursor"></span>' },
];

function Boot({ onDone }) {
  const [done, setDone] = useState(false);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('booted')) { setDone(true); onDone?.(); return; }
    const timers = BOOT_LINES.map((l, i) => setTimeout(() => {
      setLines(prev => [...prev, l]);
    }, l.t));
    const finalT = setTimeout(() => {
      sessionStorage.setItem('booted', '1');
      setDone(true);
      onDone?.();
    }, 1400);
    return () => { timers.forEach(clearTimeout); clearTimeout(finalT); };
  }, []);

  return (
    <div className={"boot" + (done ? " done" : "")}>
      <div className="boot-inner">
        {lines.map((l, i) => (
          <div key={i} className="boot-line" dangerouslySetInnerHTML={{ __html: l.html }} />
        ))}
      </div>
    </div>
  );
}

/* -------------------- TOP BAR -------------------- */
function TopBar({ onOpenCmd }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="topbar-brand">
          <span className="dot"></span>
          <span>suprith.ops</span>
          <span style={{color:'var(--ink-dimmer)', marginLeft:8}}>v2.4.1</span>
        </div>
        <nav className="topbar-nav">
          <a href="#identity">identity</a>
          <a href="#projects">projects</a>
          <a href="#arc">arc</a>
          <a href="#credentials">credentials</a>
          <a href="#now">now</a>
          <a href="#contact">contact</a>
        </nav>
        <div className="topbar-right">
          <span className="kbd kbd-trigger" onClick={onOpenCmd}>
            <span>⌘</span><span>K</span>
          </span>
        </div>
      </div>
    </header>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  const d = window.PORTFOLIO_DATA.identity;
  return (
    <section className="hero" id="identity">
      <div className="panel hero-main">
        <div className="panel-header">
          <span>/ identity · overview</span>
          <span className="tag">● live</span>
        </div>
        <div className="panel-body">
          <h1 className="name-block">
            Engineering <em>agent systems</em><br/>
            to production<br/>standards.
          </h1>
          <p className="role-line">
            <span className="hl">Suprith Chandra Shekar</span> — M.S. Industrial Engineering candidate at <span className="hl">UIUC</span>; formerly Consultant at <span className="hl">Deloitte</span> (ServiceNow ITSM / ITOM). Currently developing <span className="hl">Claude Node</span>, a containerized workspace for persistent AI agents. Seeking applied ML and AI agent roles for Spring 2027.
          </p>
          <div className="identity-grid">
            <div className="identity-cell"><span className="k">role</span><span className="v">{d.role}</span></div>
            <div className="identity-cell"><span className="k">status</span><span className="v" style={{color:'var(--accent)'}}>{d.status}</span></div>
            <div className="identity-cell"><span className="k">location</span><span className="v">{d.location}</span></div>
          </div>
          <div className="cta-row">
            <a className="btn btn-primary btn-arrow" href="#projects">view projects</a>
            <a className="btn btn-arrow" href="#contact">get in touch</a>
            <a className="btn" href="https://github.com/SuprithChandrashekar" target="_blank" rel="noreferrer">github ↗</a>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <span>/ system · topology</span>
          <span className="tag">claude-node</span>
        </div>
        <div className="sys-diagram panel-body">
          <div className="sys-diagram-title">active architecture</div>
          <pre className="sys-tree" style={{margin:0, whiteSpace:'pre'}}>
{`claude-node/
├─ `}<span className="node">agent-overworld</span>{`        `}<span className="status-ok"></span><span className="meta">persistent agents</span>{`
│  ├─ whatsapp-bridge      `}<span className="status-ok"></span><span className="meta">live</span>{`
│  └─ docker-compose.yml   `}<span className="status-ok"></span><span className="meta">12 services</span>{`
├─ `}<span className="node">everything-claude</span>{`      `}<span className="status-ok"></span><span className="meta">mcp + skills</span>{`
├─ `}<span className="node">career-ops</span>{`             `}<span className="status-ok"></span><span className="meta">ci pipeline</span>{`
├─ `}<span className="node">claude-arena</span>{`           `}<span className="status-wip"></span><span className="meta">eval harness</span>{`
└─ `}<span className="node">vibevoice</span>{`              `}<span className="status-wip"></span><span className="meta">audio ft</span>{`
`}
          </pre>
          <div className="sys-stats">
            <div><div className="sys-stat-k">services</div><div className="sys-stat-v">12+</div></div>
            <div><div className="sys-stat-k">languages</div><div className="sys-stat-v">5</div></div>
            <div><div className="sys-stat-k">uptime</div><div className="sys-stat-v">99.1%</div></div>
            <div><div className="sys-stat-k">since</div><div className="sys-stat-v">'24</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- SECTION HEAD -------------------- */
function SectionHead({ num, title, em, meta }) {
  return (
    <div className="section-head">
      <span className="section-num">§ {num}</span>
      <h2 className="section-title">{title} {em && <em>{em}</em>}</h2>
      {meta && <span className="section-meta">{meta}</span>}
    </div>
  );
}

/* -------------------- PROJECTS -------------------- */
function Projects() {
  const projects = window.PORTFOLIO_DATA.projects;
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  // Keyboard nav when focused
  useEffect(() => {
    const onKey = (e) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowDown') { setActive(a => Math.min(projects.length - 1, a + 1)); e.preventDefault(); }
      if (e.key === 'ArrowUp')   { setActive(a => Math.max(0, a - 1)); e.preventDefault(); }
    };
    const list = listRef.current;
    list?.addEventListener('keydown', onKey);
    return () => list?.removeEventListener('keydown', onKey);
  }, [projects.length]);

  const p = projects[active];

  return (
    <section className="content-block" id="projects">
      <SectionHead num="01" title="selected" em="work" meta={`${projects.length} projects · use arrow keys to navigate`} />
      <div className="projects">
        <div className="proj-list" ref={listRef} tabIndex={0}>
          <div className="proj-list-head"><span>projects</span><span>↑ ↓</span></div>
          {projects.map((pr, i) => (
            <div key={pr.id} className={"proj-item" + (i === active ? " active" : "")} onClick={() => setActive(i)}>
              <div className="proj-item-id">{pr.id} · {pr.kicker}</div>
              <div className="proj-item-title">{pr.title}</div>
              <div className="proj-item-blurb">{pr.blurb}</div>
            </div>
          ))}
        </div>
        <div className="proj-detail" key={p.slug}>
          <div className="proj-detail-header">
            <div className="proj-detail-kicker">{p.kicker} · {p.id}</div>
            <h3 className="proj-detail-title">
              {p.title.replace(p.emTitle, '')}<em>{p.emTitle}</em>
            </h3>
            <p className="proj-detail-blurb">{p.blurb}</p>
          </div>

          {p.sub.map((s, i) => (
            <div key={i} className="proj-section">
              <div className="proj-section-label">{s.label}</div>
              {s.type === 'para' && <p>{s.text}</p>}
              {s.type === 'list' && (
                <ul>{s.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
              )}
              {s.type === 'stack' && (
                <div className="stack-row">{s.items.map((it, j) => <span key={j} className="chip">{it}</span>)}</div>
              )}
            </div>
          ))}

          {p.metrics?.length > 0 && (
            <div className="proj-section">
              <div className="proj-section-label">metrics</div>
              <div className="metric-grid">
                {p.metrics.map((m, i) => (
                  <div key={i} className="metric">
                    <div className="metric-k">{m.k}</div>
                    <div className="metric-v">{m.v}</div>
                    <div className="metric-sub">{m.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {p.links?.length > 0 && (
            <div className="proj-links">
              {p.links.map((l, i) => (
                <a key={i} className="btn" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------- ARC -------------------- */
function Arc() {
  const arc = window.PORTFOLIO_DATA.arc;
  return (
    <section className="content-block" id="arc">
      <SectionHead num="02" title="professional" em="trajectory" meta="consulting → engineering → agent systems" />
      <div className="arc">
        {arc.map((r, i) => (
          <div key={i} className="arc-row">
            <div className="arc-period">{r.period}</div>
            <div className="arc-title">{r.title}<span className="sub">{r.sub}</span></div>
            <div className="arc-body">{r.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- CREDENTIALS -------------------- */
function Credentials() {
  const cred = window.PORTFOLIO_DATA.credentials;
  return (
    <section className="content-block" id="credentials">
      <SectionHead num="03" title="credentials" em="& outcomes" meta="verified academic and professional record" />
      <div className="cred-grid">
        {cred.map((c, i) => (
          <div key={i} className="cred">
            <div className="cred-k">{c.k}</div>
            <div className="cred-v">{c.v}</div>
            <div className="cred-sub">{c.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- NOW + ASK -------------------- */
function NowAndAsk() {
  const now = window.PORTFOLIO_DATA.now;
  const [q, setQ] = useState('');
  const [a, setA] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = useCallback(async (prompt) => {
    const p = prompt ?? q;
    if (!p || loading) return;
    setA('');
    setLoading(true);
    try {
      const resp = await fetch('https://ask-suprith.suprithchandrashekar.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: p }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setA(data.error || `Request failed (${resp.status}).`);
      } else {
        setA((data.answer || '').trim() || '(no response)');
      }
    } catch (err) {
      setA('Could not reach the assistant right now. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  }, [q, loading]);

  return (
    <section className="content-block" id="now">
      <SectionHead num="04" title="current" em="focus" meta={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />
      <div className="now-wrap">
        <div className="now-feed">
          <div className="panel-header">
            <span>/ activity · last 30d</span>
            <span className="tag">streaming</span>
          </div>
          {now.map((n, i) => (
            <div key={i} className="now-entry">
              <div className="now-ts">{n.ts}</div>
              <div className="now-body">
                <span className="tag">{n.tag}</span>
                {n.text}
              </div>
            </div>
          ))}
        </div>

        <div className="ask">
          <h3 className="ask-title">ask <em>claude</em> about me</h3>
          <p className="ask-sub">A minimal agent wired to my background. Pick a prompt or write your own.</p>
          <div className="ask-prompts">
            <button className="ask-prompt" onClick={() => ask('What makes Suprith unusual compared to other AI candidates?')}>what makes suprith unusual?</button>
            <button className="ask-prompt" onClick={() => ask('What would Suprith bring to an applied ML team?')}>what would he bring to an ML team?</button>
            <button className="ask-prompt" onClick={() => ask('Tell me about Claude Node in one paragraph.')}>explain claude node</button>
          </div>
          <div className="ask-input-row">
            <input
              className="ask-input"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="ask something..."
              onKeyDown={e => { if (e.key === 'Enter') ask(); }}
              disabled={loading}
            />
            <button className="ask-send" onClick={() => ask()} disabled={loading || !q}>{loading ? '...' : 'ask →'}</button>
          </div>
          <div className={"ask-response" + (!a ? " empty" : "")}>
            {a || 'response will appear here'}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- SKILLS -------------------- */
function Skills() {
  const skills = window.PORTFOLIO_DATA.skills;
  return (
    <section className="content-block" id="skills">
      <SectionHead num="05" title="technical" em="competencies" meta="tools and methods in active use" />
      <div className="skills">
        {skills.map((g, i) => (
          <div key={i} className="skill-group">
            <div className="skill-group-title">{g.group}</div>
            <ul className="skill-list">
              {g.items.map((s, j) => <li key={j}>{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- CONTACT -------------------- */
function Contact() {
  return (
    <section className="content-block" id="contact">
      <SectionHead num="06" title="get in" em="touch" />
      <div className="contact">
        <div>
          <h3 className="contact-lead">
            I'm looking for <em>applied ML / AI agent</em> roles starting <em>Spring 2027</em>.
          </h3>
          <p className="contact-sub">
            If you're building agent systems, shipping LLM infrastructure, or need someone who can translate between consulting delivery and engineering depth — I'd love to talk.
          </p>
        </div>
        <div className="contact-links">
          <a className="contact-link" href="mailto:hello@suprith.dev">
            <span className="k">email</span><span className="v">hello@suprith.dev →</span>
          </a>
          <a className="contact-link" href="https://linkedin.com/in/suprithchandrashekar" target="_blank" rel="noreferrer">
            <span className="k">linkedin</span><span className="v">in/suprithchandrashekar →</span>
          </a>
          <a className="contact-link" href="https://github.com/SuprithChandrashekar" target="_blank" rel="noreferrer">
            <span className="k">github</span><span className="v">SuprithChandrashekar →</span>
          </a>
          <a className="contact-link" href="#">
            <span className="k">resume</span><span className="v">resume.pdf →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------- COMMAND PALETTE -------------------- */
function CmdK({ open, onClose }) {
  const projects = window.PORTFOLIO_DATA.projects;
  const items = useMemo(() => [
    { group: 'navigate', label: 'go to identity', href: '#identity' },
    { group: 'navigate', label: 'go to projects', href: '#projects' },
    { group: 'navigate', label: 'go to arc', href: '#arc' },
    { group: 'navigate', label: 'go to credentials', href: '#credentials' },
    { group: 'navigate', label: 'go to now', href: '#now' },
    { group: 'navigate', label: 'go to contact', href: '#contact' },
    ...projects.map(p => ({ group: 'projects', label: `open: ${p.title}`, href: '#projects', slug: p.slug })),
    { group: 'external', label: 'github ↗', href: 'https://github.com/SuprithChandrashekar', external: true },
    { group: 'external', label: 'linkedin ↗', href: 'https://linkedin.com/in/suprithchandrashekar', external: true },
    { group: 'external', label: 'email →', href: 'mailto:hello@suprith.dev', external: true },
  ], [projects]);

  const [query, setQuery] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) { setQuery(''); setIdx(0); setTimeout(() => inputRef.current?.focus(), 20); }
  }, [open]);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(it => it.label.toLowerCase().includes(q) || it.group.includes(q));
  }, [query, items]);

  useEffect(() => { setIdx(0); }, [query]);

  const pick = (it) => {
    if (it.external) window.open(it.href, '_blank');
    else window.location.href = it.href;
    onClose();
  };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { setIdx(i => Math.min(filtered.length - 1, i + 1)); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { setIdx(i => Math.max(0, i - 1)); e.preventDefault(); }
    else if (e.key === 'Enter' && filtered[idx]) { pick(filtered[idx]); }
    else if (e.key === 'Escape') onClose();
  };

  if (!open) return null;

  return (
    <div className="cmdk-overlay" onClick={onClose}>
      <div className="cmdk" onClick={e => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdk-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={onKey}
          placeholder="type a command or search..."
        />
        <div className="cmdk-list">
          {filtered.length === 0 && <div className="cmdk-item"><span>no matches</span></div>}
          {filtered.map((it, i) => (
            <div
              key={i}
              className={"cmdk-item" + (i === idx ? " active" : "")}
              onMouseEnter={() => setIdx(i)}
              onClick={() => pick(it)}
            >
              <span>{it.label}</span>
              <span className="group">{it.group}</span>
            </div>
          ))}
        </div>
        <div className="cmdk-foot">
          <span><span className="kbd">↑↓</span> navigate</span>
          <span><span className="kbd">↵</span> select</span>
          <span><span className="kbd">esc</span> close</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------- TWEAKS -------------------- */
const THEMES = {
  terracotta: { accent: '#E76F51', accentDim: '#c85a3a', accentGhost: 'rgba(231, 111, 81, 0.12)' },
  emerald:    { accent: '#A8D5BA', accentDim: '#8BB89E', accentGhost: 'rgba(168, 213, 186, 0.12)' },
  lime:       { accent: '#c4e86b', accentDim: '#a4c947', accentGhost: 'rgba(196, 232, 107, 0.12)' },
  amber:      { accent: '#e8b546', accentDim: '#c49a35', accentGhost: 'rgba(232, 181, 70, 0.12)' },
  blue:       { accent: '#6bb6ff', accentDim: '#4a95de', accentGhost: 'rgba(107, 182, 255, 0.12)' },
};

function Tweaks() {
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState('terracotta');
  const [density, setDensity] = useState('comfortable');

  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setVisible(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  useEffect(() => {
    const t = THEMES[theme];
    document.documentElement.style.setProperty('--accent', t.accent);
    document.documentElement.style.setProperty('--accent-dim', t.accentDim);
    document.documentElement.style.setProperty('--accent-ghost', t.accentGhost);
  }, [theme]);

  useEffect(() => {
    if (density === 'compact') {
      document.documentElement.style.setProperty('--grid-unit', '6px');
    } else {
      document.documentElement.style.setProperty('--grid-unit', '8px');
    }
  }, [density]);

  const close = () => {
    setVisible(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  if (!visible) return null;

  return (
    <div className="tweaks">
      <div className="tweaks-head">
        <h3>Tweaks</h3>
        <button className="tweaks-close" onClick={close}>×</button>
      </div>
      <div className="tweak-row">
        <label>accent color</label>
        <div className="tweak-swatches">
          {Object.entries(THEMES).map(([k, v]) => (
            <div
              key={k}
              className={"swatch" + (theme === k ? " active" : "")}
              style={{ background: v.accent }}
              onClick={() => setTheme(k)}
              title={k}
            />
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <label>density</label>
        <select value={density} onChange={e => setDensity(e.target.value)}>
          <option value="comfortable">comfortable</option>
          <option value="compact">compact</option>
        </select>
      </div>
    </div>
  );
}

/* -------------------- APP -------------------- */
function App() {
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen(o => !o);
      }
      if (e.key === 'Escape') setCmdOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Boot />
      <TopBar onOpenCmd={() => setCmdOpen(true)} />
      <main className="stage">
        <Hero />
        <Projects />
        <Arc />
        <Credentials />
        <NowAndAsk />
        <Skills />
        <Contact />
      </main>
      <footer>
        <div className="inner">
          <span>© 2026 SUPRITH CHANDRA SHEKAR · BUILT WITH CLAUDE</span>
          <span>UTC−06 · CHAMPAIGN, IL</span>
        </div>
      </footer>
      <CmdK open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <Tweaks />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
