/* shared.jsx — chrome, data, helpers */

// ─────────── data ───────────
// Projects are seeded from real tech-stack themes (LangChain/RAG, React,
// React-Native, Node + microservices, MongoDB). Swap with real repos any time.
const PROJECTS = [
  {
    dir: 'rag-playground/',
    name: 'RAG Playground',
    role: 'side · genai',
    year: '2025 — present',
    color: 'var(--magenta)',
    lang: 'react · langchain · node',
    stars: '★ —',
    desc: 'A hands-on lab for retrieval-augmented chat: ingest docs, swap embeddings, compare retrievers, watch tokens stream. Built while certifying on LangChain + RAG.',
    status: 'active',
    links: ['github', 'demo', 'writeup'],
  },
  {
    dir: 'rn-amplify-starter/',
    name: 'RN-Amplify Starter',
    role: 'open source · mobile',
    year: '2024 — present',
    color: 'var(--green)',
    lang: 'react native · aws amplify',
    stars: '★ —',
    desc: 'A batteries-included React Native starter wired to AWS Amplify (auth, GraphQL, storage). The setup I wished existed when I first picked up Amplify.',
    status: 'active',
    links: ['github', 'readme'],
  },
  {
    dir: 'microservices-kit/',
    name: 'Microservices Kit',
    role: 'open source · node',
    year: '2023',
    color: 'var(--blue)',
    lang: 'node · react · docker',
    stars: '★ —',
    desc: 'A reference monorepo for Node + React microservices: docker-compose, GraphQL gateway, Jest tests, Jenkins pipeline. Built while certifying on microservices.',
    status: 'maintained',
    links: ['github', 'docs'],
  },
  {
    dir: 'twelve-factor-template/',
    name: 'Twelve-Factor Template',
    role: 'open source · cloud',
    year: '2022',
    color: 'var(--orange)',
    lang: 'node · pcf · docker',
    stars: '★ —',
    desc: 'A Node service skeleton that takes the twelve-factor principles seriously — config, logs, processes, all of it. Deploys cleanly to Pivotal Cloud Foundry.',
    status: 'stable',
    links: ['github'],
  },
  {
    dir: 'sentiment-hadoop/',
    name: 'Hadoop Sentiment Analysis',
    role: 'research · published',
    year: '2016',
    color: 'var(--cyan)',
    lang: 'java · hadoop · ml',
    stars: '★ —',
    desc: 'Undergrad research that became two published papers: web-based sentiment analysis on Twitter feeds, running on a Hadoop cluster. Still my favourite first-principles project.',
    status: 'archived',
    links: ['paper · ieee', 'github'],
  },
];

// Blog posts seeded from areas Zilu actually works in (React, Node, RAG,
// LangChain, React Native, microservices). Replace with real posts as they
// get written.
const POSTS = [
  { date: '2025-11-14', slug: 'taste-gap',           tag: 'craft',   read: '9m',  title: 'The taste gap in AI-generated UIs' },
  { date: '2025-10-02', slug: 'rag-eval-first',      tag: 'eng',     read: '11m', title: 'Evaluating RAG before you ship it (and why I keep getting it wrong)' },
  { date: '2025-09-09', slug: 'langchain-prod',      tag: 'eng',     read: '8m',  title: 'LangChain in production: the patterns that stuck' },
  { date: '2025-08-21', slug: 'react-native-amplify',tag: 'eng',     read: '12m', title: 'Twelve months of React Native + AWS Amplify, the honest review' },
  { date: '2025-07-03', slug: 'reading-code',        tag: 'craft',   read: '5m',  title: 'Reading code is the actual skill' },
  { date: '2025-06-12', slug: 'redux-2025',          tag: 'eng',     read: '7m',  title: 'Does React still need Redux in 2025? (a sober take)' },
  { date: '2025-05-04', slug: 'graphql-vs-rest',     tag: 'eng',     read: '9m',  title: 'GraphQL vs REST in legacy enterprise apps — five things I learned the hard way' },
  { date: '2025-03-22', slug: 'tech-lead-year',      tag: 'journal', read: '5m',  title: 'A year of being a Technical Lead: what nobody tells you' },
  { date: '2025-02-11', slug: 'mongodb-patterns',    tag: 'eng',     read: '10m', title: 'Five MongoDB schema patterns I keep reaching for' },
  { date: '2024-12-22', slug: 'year-in-rest',        tag: 'journal', read: '3m',  title: 'Year in code, year in rest' },
  { date: '2024-10-30', slug: 'safe-honest',         tag: 'journal', read: '4m',  title: 'SAFe in the real world — an honest sticky-note review' },
  { date: '2024-08-11', slug: 'jest-or-not',         tag: 'eng',     read: '6m',  title: 'When Jest is too much (and when it isn\u2019t)' },
  { date: '2024-05-17', slug: 'small-interfaces',    tag: 'craft',   read: '5m',  title: 'Small interfaces, fewer regrets' },
  { date: '2024-03-04', slug: 'naming-things',       tag: 'craft',   read: '6m',  title: 'Naming things, six years later' },
  { date: '2023-11-28', slug: 'reading-list-2023',   tag: 'reading', read: '2m',  title: 'A short reading list for senior engineers' },
];

const TAG_COLORS = {
  all:     'var(--ink)',
  craft:   'var(--magenta)',
  eng:     'var(--blue)',
  journal: 'var(--orange)',
  reading: 'var(--cyan)',
};

const RESUME = [
  { year: '2023 — now', role: 'Technical Lead',          where: 'e-Zest Solutions · Pune',     note: 'leading delivery on a React + Node + LangChain / RAG product line; design reviews, hiring, mentoring' },
  { year: '2019 — 23',  role: 'Software Engineer',       where: 'e-Zest Solutions',            note: 'full-stack across React, Node, .NET Core, MongoDB; SAFe agile delivery for enterprise clients' },
  { year: '2016 — 19',  role: 'Software Engineer',       where: 'LTI · Larsen & Toubro Infotech', note: 'web apps in Angular, C#/.NET, MSSQL; some early automation-testing leadership' },
  { year: '2015 — 16',  role: 'Web Developer',           where: 'LifeCOMPILERS · Ratnagiri',    note: 'first full-time gig — built the company\u2019s public site and a couple of small client projects' },
  { year: '2012 — 16',  role: 'B.E. Computer Engineering', where: 'RMCET · Mumbai University',  note: 'final-year research turned into two published papers on sentiment analysis' },
];

// ─────────── Navigation ───────────
function Nav({ route, theme, onTheme, onNav }) {
  const path = route === 'home' ? '~' : 'writing';
  const link = (href, label, key) => (
    <a href={`#/${href}`} onClick={(e) => { e.preventDefault(); onNav(href); }}
      className="z-link"
      style={{ color: route === key ? 'var(--ink)' : 'var(--mute)',
        textDecoration: route === key ? 'underline' : 'none',
        textUnderlineOffset: '4px', textDecorationColor: 'var(--magenta)',
        textDecorationThickness: '1.5px' }}>
      <span style={{ color: 'var(--mute)' }}>cd </span>{label}
    </a>
  );
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'color-mix(in oklab, var(--panel) 92%, transparent)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px dashed var(--rule)',
      padding: '12px clamp(20px, 4vw, 48px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
    }}>
      <a href="#/" onClick={(e) => { e.preventDefault(); onNav(''); }} style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
        <span style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 11, height: 11, borderRadius: 99, background: 'var(--orange)' }}/>
          <span style={{ width: 11, height: 11, borderRadius: 99, background: 'var(--yellow)' }}/>
          <span style={{ width: 11, height: 11, borderRadius: 99, background: 'var(--green)' }}/>
        </span>
        <span style={{ color: 'var(--mute)' }}>
          <span style={{ color: 'var(--magenta)' }}>zilu</span>
          <span>@</span>
          <span style={{ color: 'var(--blue)' }}>dev</span>
          <span>:</span>
          <span style={{ color: 'var(--green)' }}>/{path}</span>
          <span>$</span>
          <span style={{ color: 'var(--ink)', marginLeft: 4 }}>_</span>
        </span>
      </a>

      <div style={{ display: 'flex', gap: 'clamp(14px, 2vw, 28px)', alignItems: 'center' }}>
        {link('', '~', 'home')}
        {link('writing', '/writing', 'writing')}
        <a href="resume.html" target="_blank" rel="noopener" className="z-link" style={{ color: 'var(--mute)' }}>
          <span style={{ color: 'var(--mute)' }}>cat </span>/resume
        </a>
        <a href="/feed.rss" className="z-link" onClick={(e) => e.preventDefault()}
          style={{ color: 'var(--orange)', display: 'inline-flex', alignItems: 'center', gap: 4 }}
          title="RSS feed">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 8.5a1.5 1.5 0 1 1 0 0z" fill="currentColor" stroke="none"/><path d="M1 5a5 5 0 0 1 5 5M1 1a9 9 0 0 1 9 9"/></svg>
          rss
        </a>
        <button onClick={onTheme} title="toggle theme"
          style={{ border: '1px solid var(--rule)', background: 'transparent',
            color: 'var(--mute)', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer',
            padding: '4px 10px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: theme === 'light' ? 'var(--yellow)' : 'var(--mute)' }}>☀</span>
          <span style={{ color: 'var(--rule)' }}>/</span>
          <span style={{ color: theme === 'dark' ? 'var(--blue)' : 'var(--mute)' }}>☾</span>
        </button>
      </div>
    </div>
  );
}

// ─────────── Footer ───────────
function Footer() {
  return (
    <div style={{
      borderTop: '1px dashed var(--rule)',
      background: 'var(--panel)',
      padding: '36px clamp(20px, 4vw, 48px) 28px',
      fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
      color: 'var(--mute)', marginTop: 80,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <div style={{ fontFamily: "'Departure Mono', monospace", fontSize: 32, color: 'var(--ink)', letterSpacing: -0.5 }}>
            <span style={{ color: 'var(--magenta)' }}>zilu</span>.<span style={{ color: 'var(--green)' }}>dev</span>
          </div>
          <div style={{ marginTop: 6 }}>
            <span style={{ color: 'var(--green)' }}>$</span> echo "<span style={{ color: 'var(--ink)' }}>thanks for stopping by — built in Pune</span>"
          </div>
          <div style={{ marginTop: 4, fontSize: 11 }}>
            <span style={{ color: 'var(--mute)' }}># last build: </span>
            <span suppressHydrationWarning>{new Date().toISOString().slice(0,16).replace('T',' ')}</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, textAlign: 'right' }}>
          <span><span style={{ color: 'var(--mute)' }}>linkedin/</span><a href="https://www.linkedin.com/in/zilurane" target="_blank" rel="noopener" className="z-link" style={{ color: 'var(--ink)' }}>zilurane</a></span>
          <span><span style={{ color: 'var(--mute)' }}>github/</span><a href="https://github.com/zilurane" target="_blank" rel="noopener" className="z-link" style={{ color: 'var(--ink)' }}>zilurane</a></span>
          <span><span style={{ color: 'var(--mute)' }}>mail/</span><a href="mailto:zilurrane@gmail.com" className="z-link" style={{ color: 'var(--ink)' }}>zilurrane@gmail.com</a></span>
          <a href="/feed.rss" onClick={(e) => e.preventDefault()} className="z-link" style={{ color: 'var(--orange)' }}>./feed.rss ↗</a>
        </div>
      </div>
      <div style={{ borderTop: '1px dashed var(--rule)', marginTop: 28, paddingTop: 14, fontSize: 11, display: 'flex', justifyContent: 'space-between' }}>
        <span>© 2026 · made with care · view-source friendly</span>
        <span>:wq</span>
      </div>
    </div>
  );
}

// ─────────── small primitives ───────────
function Frame({ title, lang, color = 'var(--green)', children, style = {}, action }) {
  return (
    <div style={{ border: '1px solid var(--rule)', background: 'var(--paper)', borderRadius: 6, overflow: 'hidden', boxShadow: 'var(--shadow)', ...style }}>
      <div style={{ borderBottom: '1px solid var(--rule)', padding: '7px 14px', fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
        background: 'var(--panel)', color: 'var(--mute)', letterSpacing: 0.4 }}>
        <span style={{ whiteSpace: 'nowrap' }}>
          <span style={{ color }}>●</span>&nbsp;&nbsp;{title}
        </span>
        <span style={{ display: 'flex', gap: 14, flexShrink: 0, whiteSpace: 'nowrap' }}>
          {lang && <span style={{ color: 'var(--mute)' }}>{lang}</span>}
          {action}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}

// reveal-on-scroll wrapper
function Reveal({ children, delay = 0, as: As = 'div', style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('in'), delay);
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '-40px' });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <As ref={ref} className="z-reveal" style={style}>{children}</As>;
}

// ghost cursor
function GhostCursor() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let tx = -100, ty = -100, x = -100, y = -100, raf = 0;
    const el = ref.current; if (!el) return;
    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate(${x - 7}px, ${y - 9}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const onOver = (e) => {
      const link = e.target.closest('a, button, [data-link], .z-link');
      const text = e.target.closest('input, textarea, [contenteditable="true"]');
      el.dataset.mode = text ? 'text' : (link ? 'link' : '');
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', onOver); };
  }, []);
  return <div ref={ref} className="z-ghost" />;
}

Object.assign(window, { PROJECTS, POSTS, TAG_COLORS, RESUME, Nav, Footer, Frame, Reveal, GhostCursor });
