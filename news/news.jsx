/* news.jsx — shares the main site's Nav, Footer, themes and content primitives. */
function News() {
  const [editions, setEditions] = React.useState([]);
  const [state, setState] = React.useState('loading');
  React.useEffect(() => {
    let active = true;
    fetch('/news/briefings.json', { cache: 'no-cache' })
      .then(r => { if (!r.ok) throw Error('Unable to load news'); return r.json(); })
      .then(data => {
        if (!active) return;
        const valid = Array.isArray(data) ? data.filter(x =>
          x && /^\d{4}-\d{2}-\d{2}$/.test(x.date) &&
          Array.isArray(x.stories) && x.stories.length === 5
        ).sort((a,b) => b.date.localeCompare(a.date)) : [];
        setEditions(valid);
        setState('ready');
      })
      .catch(() => { if (active) setState('error'); });
    return () => { active = false; };
  }, []);

  return (
    <div style={{ padding: '0 clamp(20px, 4vw, 48px)', maxWidth: 1200, margin: '0 auto' }}>
      <section style={{ padding: '56px 0 24px' }}>
        <Reveal>
          <div style={{ fontSize: 13, color: 'var(--mute)', marginBottom: 18 }}>
            <span style={{ color: 'var(--green)' }}>$</span> ls -la <span style={{ color: 'var(--blue)' }}>./news/</span>
          </div>
          <h1 style={{ margin: 0, fontFamily: "'Departure Mono', monospace",
            fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: .95, letterSpacing: -1 }}>
            news.log<span style={{ color: 'var(--magenta)' }}>_</span>
          </h1>
          <p style={{ marginTop: 18, maxWidth: 760, fontFamily: "'Geist', system-ui, sans-serif",
            fontSize: 17, lineHeight: 1.65, color: 'var(--ink2)' }}>
            Five useful stories each day about AI, developer tools, SaaS, cybersecurity and markets.
            Original summaries, practical takeaways, and citations.
          </p>
          <div style={{ fontSize: 13, color: 'var(--mute)', marginTop: 16 }}>
            <span style={{ color: 'var(--green)' }}>$</span> wc -l news.log &nbsp;→ {editions.length} editions
          </div>
        </Reveal>
      </section>
      <div style={{ borderTop: '1px dashed var(--rule)', paddingTop: 24 }}>
        {state === 'loading' && <p style={{ color: 'var(--mute)' }}>Loading daily news...</p>}
        {state === 'error' && <p role="alert">The news feed is unavailable right now.</p>}
        {state === 'ready' && !editions.length && <Frame title="news.log" lang="empty">
          <p style={{ padding: 24, color: 'var(--mute)' }}>No briefing published yet.</p>
        </Frame>}
        {editions.map(edition => (
          <section key={edition.date} id={edition.date} style={{ marginBottom: 52 }}>
            <h2 style={{ fontFamily: "'Departure Mono', monospace", fontSize: 28, margin: '20px 0' }}>
              <span style={{ color: 'var(--mute)' }}># </span>{edition.date}
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                color: 'var(--mute)', marginLeft: 16 }}>5 stories</span>
            </h2>
            {edition.stories.map((s,i) => (
              <Frame key={i} title={String(i+1).padStart(2,'0') + ' / ' + (s.category || 'news')}
                lang={edition.date} style={{ marginBottom: 16 }}>
                <div className="z-news-story" style={{ padding: 24, display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) 220px', gap: 24, alignItems: 'start' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Geist', system-ui, sans-serif",
                      fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.3,
                      margin: '0 0 14px', color: 'var(--ink)' }}>{s.headline}</h3>
                    <p style={{ fontFamily: "'Geist', system-ui, sans-serif",
                      fontSize: 16, lineHeight: 1.7, color: 'var(--ink2)' }}>{s.summary}</p>
                    <p style={{ marginTop: 16, borderLeft: '2px solid var(--green)',
                      paddingLeft: 12, fontFamily: "'Geist', system-ui, sans-serif",
                      fontSize: 15, color: 'var(--ink2)' }}>
                      <strong>Why it matters:</strong> {s.why_it_matters}
                    </p>
                  </div>
                  <div>
                    {s.image_url && /^https:\/\//i.test(s.image_url) ?
                      <img src={s.image_url} alt={s.image_alt || s.headline} loading="lazy"
                        style={{ width: '100%', borderRadius: 4, objectFit: 'cover' }} /> :
                      <div style={{ padding: 16, minHeight: 110, background: 'var(--panel)',
                        border: '1px dashed var(--rule)', borderRadius: 4,
                        color: 'var(--mute)', fontSize: 12, display: 'grid',
                        placeItems: 'center', textAlign: 'center' }}>
                        {s.category || 'Daily tech news'}
                      </div>}
                  </div>
                </div>
              </Frame>
            ))}
            <Frame title="sources.md" lang={edition.date}>
              <div style={{ padding: '18px 24px' }}>
                <h3 style={{ marginTop: 0, fontSize: 15 }}>Sources &amp; citations</h3>
                <ol style={{ paddingLeft: 24, marginBottom: 0, overflowWrap: 'anywhere' }}>
                  {edition.stories.map((s,i) => (
                    <li key={i} style={{ marginBottom: 10, fontSize: 13 }}>
                      {s.source_url && /^https:\/\//i.test(s.source_url) ?
                        <a href={s.source_url} target="_blank" rel="noopener noreferrer"
                          className="z-link" style={{ color: 'var(--blue)' }}>{s.headline} ↗</a> :
                        <span>{s.headline} (source unavailable)</span>}
                    </li>
                  ))}
                </ol>
              </div>
            </Frame>
          </section>
        ))}
      </div>
    </div>
  );
}
Object.assign(window, { News });
