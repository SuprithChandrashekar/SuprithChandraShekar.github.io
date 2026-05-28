/* eslint-disable */
/* Shared case-study page component.
   Each project's HTML sets window.PROJECT_SLUG before loading this file. */
const { useEffect, useMemo } = React;

function useCaseReveal() {
  useEffect(() => {
    document.documentElement.classList.add('js-loaded');
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
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
}

/* Topbar specific to case-study pages */
function CaseTopbar({ projectTitle }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="../index.html" className="topbar-brand">
          <span className="mark">V</span>
          <span>SUPRITH.OPS</span>
          <span className="ver">/ 2026</span>
        </a>
        <nav className="topbar-nav">
          <a href="../index.html#work">work</a>
          <a href="../index.html#arc">arc</a>
          <a href="../index.html#how">approach</a>
          <a href="../index.html#contact">contact</a>
        </nav>
        <div className="topbar-right">
          <span>{projectTitle}</span>
        </div>
      </div>
    </header>
  );
}

function CaseHero({ p, prev, next }) {
  const illusOpts = { fill: '#E8E3D0', accent: '#E8551C' };
  const svg = window.getIllus(p.illus, illusOpts);
  return (
    <section className="case-hero">
      <div className="case-hero-inner">
        <div>
          <a className="case-back" href="../index.html#work">← BACK TO INDEX</a>
          <div className="proj-eyebrow" style={{ marginTop: 40 }}>
            <span>§ {p.id}</span>
            <span className="sep"></span>
            <span>{p.kicker}</span>
          </div>
          <h1 className="case-h1">{p.title}<em>{p.titleRest}</em></h1>
          <p className="lede" style={{ maxWidth: 620 }}>{p.tagline}</p>
        </div>
        <div className="case-art" dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
    </section>
  );
}

function CaseMeta({ p }) {
  return (
    <section className="telemetry">
      <div className="telemetry-inner">
        {p.meta.map((m, i) => (
          <div key={i} className="tel-cell">
            <span className="k">{m.k}</span>
            <span className="v" style={{ fontSize: 20 }}>{m.v}</span>
          </div>
        ))}
        {(p.metrics || []).slice(0, 5 - (p.meta?.length || 0)).map((m, i) => (
          <div key={'m' + i} className="tel-cell">
            <span className="k">{m.k}</span>
            <span className="v" style={{ fontSize: 20 }}>{m.v}</span>
            <span className="sub">{m.sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CaseSection({ num, title, em, children, dark }) {
  return (
    <section className={'case-section ' + (dark ? 'surf-dark' : 'surf-cream')}>
      <div className="case-section-inner">
        <div className="case-section-eyebrow reveal">
          <span className="num">§ {num}</span>
          <span>{title}{em && <> {em}</>}</span>
        </div>
        <div className="case-prose reveal">{children}</div>
      </div>
    </section>
  );
}

function CaseFooter({ p, next }) {
  return (
    <section className="surf surf-dark">
      <div className="surf-inner">
        <header className="sec-head reveal">
          <div>
            <div className="sec-head-eyebrow">§ NEXT / KEEP READING</div>
            <h2 className="h2">More <em>work</em></h2>
          </div>
          <div className="sec-head-meta">→ {next.id} / {next.kicker.toUpperCase()}</div>
        </header>
        <a href={`${next.slug}.html`} className="index-row" style={{ display: 'grid', gridTemplateColumns: '60px minmax(0,1fr) 160px 56px', gap: 32, alignItems: 'center', padding: '32px 8px', borderTop: '1px solid var(--line-dk)', borderBottom: '1px solid var(--line-dk)' }}>
          <span className="ix-num">{next.id}</span>
          <span className="ix-title">{next.title}<em>{next.titleRest}</em></span>
          <span className="ix-kicker">{next.kicker}</span>
          <span className="ix-arrow">→</span>
        </a>

        <div style={{ marginTop: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <a className="btn" href="../index.html#work"><span>← All projects</span></a>
          <a className="btn btn-primary" href="../index.html#contact"><span>Get in touch</span><span className="arrow">→</span></a>
        </div>
      </div>
    </section>
  );
}

function CaseFooterBottom() {
  const d = window.PORTFOLIO_DATA.identity;
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-bottom">
          <span>© {year} SUPRITH CHANDRA SHEKAR · BUILT WITH CLAUDE</span>
          <span>CHAMPAIGN, IL · UTC−06 · AVAILABLE SPRING 2027</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useCaseReveal();
  const slug = window.PROJECT_SLUG;
  const projects = window.PORTFOLIO_DATA.projects;
  const p = projects.find(x => x.slug === slug);
  if (!p) return <div style={{ padding: 80 }}>Unknown project: {slug}</div>;
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <CaseTopbar projectTitle={`${p.title}${p.titleRest}`.toUpperCase()} />
      <CaseHero p={p} />
      <CaseMeta p={p} />

      {/* Long-form sections — varies based on case-study flag */}
      <CaseSection num="01" title="The" em="brief">
        <p className="lead">{p.blurb}</p>
      </CaseSection>

      {p.caseStudy && p.problem && (
        <CaseSection num="02" title="The" em="problem" dark>
          <p>{p.problem}</p>
        </CaseSection>
      )}

      {p.caseStudy && p.approach && (
        <CaseSection num={p.caseStudy ? '03' : '02'} title="The" em="approach">
          <p>{p.approach}</p>
        </CaseSection>
      )}

      {p.caseStudy && p.innovations && (
        <CaseSection num="04" title="What's" em="new" dark>
          <ul className="reveal-stagger">
            {p.innovations.map((it, i) => (
              <li key={i} data-n={`0${i + 1}`}>{it}</li>
            ))}
          </ul>
        </CaseSection>
      )}

      {p.scope && (
        <CaseSection num={p.caseStudy ? '05' : '02'} title="Design" em="scope">
          <ul className="reveal-stagger">
            {p.scope.map((it, i) => (
              <li key={i} data-n={`0${i + 1}`}>{it}</li>
            ))}
          </ul>
        </CaseSection>
      )}

      {p.findings && (
        <CaseSection num="06" title="Honest" em="findings" dark>
          <p>{p.findings}</p>
        </CaseSection>
      )}

      {p.sections && p.sections.map((s, i) => (
        <CaseSection key={i} num={`0${i + 2}`} title={s.label} dark={i % 2 === 0}>
          {s.body && <p>{s.body}</p>}
          {s.list && (
            <ul className="reveal-stagger">
              {s.list.map((it, j) => <li key={j} data-n={`0${j + 1}`}>{it}</li>)}
            </ul>
          )}
        </CaseSection>
      ))}

      {p.stack && (
        <CaseSection num="—" title="Tools &" em="stack">
          <div className="chip-row">
            {p.stack.map((s, i) => <span key={i} className="chip">{s}</span>)}
          </div>
        </CaseSection>
      )}

      <CaseFooter p={p} next={next} />
      <CaseFooterBottom />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
