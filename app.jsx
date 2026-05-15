/* app.jsx — App shell, router, theme, view transitions */

function App() {
  // theme
  const [theme, setTheme] = React.useState(() => {
    try { return localStorage.getItem('zilu-theme') || 'light'; } catch { return 'light'; }
  });
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('zilu-theme', theme); } catch {}
  }, [theme]);

  // route from hash
  const [route, setRoute] = React.useState(() => parseRoute(location.hash));
  React.useEffect(() => {
    const onHash = () => {
      const next = parseRoute(location.hash);
      setRoute(next);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // transition overlay (typewriter)
  const [tx, setTx] = React.useState(null);

  const navigate = React.useCallback((next) => {
    // next forms: '' or '/' (home), 'writing', 'writing/<slug>'
    const target = (!next || next === '/') ? '' : String(next).replace(/^\/+/, '');
    const nextRoute = parseRoute('#/' + target);
    if (route.key === nextRoute.key) return;

    // overlay command
    let cmd = 'cd', arg = '~';
    if (nextRoute.name === 'writing')  { cmd = 'cd';  arg = '~/writing'; }
    if (nextRoute.name === 'post')     { cmd = 'cat'; arg = `~/writing/${nextRoute.slug}.md`; }
    if (nextRoute.name === 'home')     { cmd = 'cd';  arg = '~'; }

    setTx({ cmd, arg, full: '' });
    const fullCmd = `$ ${cmd} ${arg}`;
    let i = 0;
    const step = () => {
      i += 1;
      setTx({ cmd, arg, full: fullCmd.slice(0, i) });
      if (i < fullCmd.length) setTimeout(step, 14);
      else {
        setTimeout(() => {
          location.hash = '#/' + target;
          setTimeout(() => setTx(null), 160);
        }, 220);
      }
    };
    setTimeout(step, 20);
  }, [route]);

  return (
    <React.Fragment>
      <GhostCursor />
      <Nav route={route.name} theme={theme}
        onTheme={() => setTheme((t) => t === 'light' ? 'dark' : 'light')}
        onNav={navigate} />
      <main>
        {route.name === 'home'    && <Home onNav={navigate} theme={theme}/>}
        {route.name === 'writing' && <Writing onNav={navigate} />}
        {route.name === 'post'    && <Post slug={route.slug} onNav={navigate} />}
        {route.name === 'notfound'&& <NotFound onNav={navigate}/>}
      </main>
      <Footer />
      <TransitionOverlay tx={tx} />
    </React.Fragment>
  );
}

function parseRoute(hash) {
  const h = (hash || '').replace(/^#\/?/, '');
  if (!h) return { name: 'home', key: 'home' };
  const parts = h.split('/').filter(Boolean);
  if (parts[0] === 'writing') {
    if (parts[1]) return { name: 'post', slug: parts[1], key: 'post:' + parts[1] };
    return { name: 'writing', key: 'writing' };
  }
  return { name: 'notfound', key: 'notfound' };
}

function TransitionOverlay({ tx }) {
  return (
    <div className={`z-transition ${tx ? 'show' : ''}`}>
      <div className="z-transition-inner">
        {tx && (() => {
          const parts = (tx.full || '').match(/^(\$)?(\s*\w+)?(\s*\S+)?/);
          // simpler: split by spaces
          const m = tx.full.split(' ');
          return (
            <>
              <span className="z-tx-prompt">{m[0] || ''}</span>{' '}
              <span style={{ color: 'var(--ink)' }}>{m[1] || ''}</span>{' '}
              <span className="z-tx-arg">{m[2] || ''}</span>
              <span style={{ display: 'inline-block', width: 14, height: 26, background: 'var(--magenta)', verticalAlign: -3, marginLeft: 4, animation: 'zBlink 1s steps(1) infinite' }}/>
            </>
          );
        })()}
      </div>
    </div>
  );
}

function NotFound({ onNav }) {
  return (
    <div style={{ padding: '120px clamp(20px, 4vw, 48px)', maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
      <pre style={{ fontFamily: "'Departure Mono', monospace", fontSize: 64, color: 'var(--magenta)', margin: 0 }}>
        404
      </pre>
      <div style={{ fontSize: 14, color: 'var(--mute)', marginTop: 12 }}>
        <span style={{ color: 'var(--green)' }}>$</span> ls: no such file or directory
      </div>
      <button onClick={() => onNav('')} className="z-link"
        style={{ marginTop: 28, border: '1px solid var(--rule)', padding: '8px 16px',
          background: 'transparent', color: 'var(--ink)', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', borderRadius: 4 }}>
        <span style={{ color: 'var(--green)' }}>$</span> cd ~
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
