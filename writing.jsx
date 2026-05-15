/* writing.jsx — blog index, with live filter & search */

function Writing({ onNav }) {
  const [tag, setTag] = React.useState('all');
  const [query, setQuery] = React.useState('');
  const [sort, setSort] = React.useState('newest');

  const tagCounts = React.useMemo(() => {
    const c = { all: POSTS.length };
    POSTS.forEach((p) => { c[p.tag] = (c[p.tag] || 0) + 1; });
    return c;
  }, []);

  const filtered = React.useMemo(() => {
    let out = POSTS.slice();
    if (tag !== 'all') out = out.filter((p) => p.tag === tag);
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((p) => p.title.toLowerCase().includes(q) || p.tag.includes(q));
    }
    if (sort === 'oldest') out.reverse();
    return out;
  }, [tag, query, sort]);

  // group by year
  const byYear = React.useMemo(() => {
    const m = {};
    filtered.forEach((p) => { const y = p.date.slice(0, 4); (m[y] = m[y] || []).push(p); });
    return Object.entries(m).sort((a, b) => sort === 'oldest' ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0]));
  }, [filtered, sort]);

  return (
    <div style={{ padding: '0 clamp(20px, 4vw, 48px)', maxWidth: 1200, margin: '0 auto' }}>

      {/* ─────────── MASTHEAD ─────────── */}
      <section style={{ padding: '56px 0 24px' }}>
        <Reveal>
          <div style={{ fontSize: 13, color: 'var(--mute)', marginBottom: 18 }}>
            <span style={{ color: 'var(--green)' }}>$</span> ls -la <span style={{ color: 'var(--blue)' }}>./writing/</span>
          </div>
          <pre style={{ margin: 0, fontFamily: "'Departure Mono', monospace",
            fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 0.95, color: 'var(--ink)', letterSpacing: -1 }}>
{`writing.log`}<span style={{ color: 'var(--magenta)' }}>{` // ${POSTS.length} entries`}</span>
          </pre>
          <div style={{ marginTop: 18, maxWidth: 720, fontFamily: "'Geist', system-ui, sans-serif",
            fontSize: 17, lineHeight: 1.65, color: 'var(--ink2)' }}>
            <span style={{ color: 'var(--mute)', fontFamily: "'JetBrains Mono', monospace" }}>{'/* '}</span>
            Essays on building things with language models, on taste, and on the
            unglamorous work that sits between them. Most are short, a few are too long.
            Updated whenever I have something worth saying — usually monthly.
            <span style={{ color: 'var(--mute)', fontFamily: "'JetBrains Mono', monospace" }}>{' */'}</span>
          </div>
          <div style={{ marginTop: 18, display: 'flex', gap: 18, flexWrap: 'wrap',
            fontSize: 13, color: 'var(--mute)' }}>
            <span><span style={{ color: 'var(--ink)' }}>{POSTS.length}</span> essays</span>
            <span><span style={{ color: 'var(--ink)' }}>~94k</span> words total</span>
            <span><span style={{ color: 'var(--ink)' }}>since</span> 2022</span>
            <span><span style={{ color: 'var(--orange)' }}>subscribe →</span> /feed.rss</span>
          </div>
        </Reveal>
      </section>

      {/* ─────────── FILTER BAR ─────────── */}
      <Reveal>
        <div style={{ position: 'sticky', top: 56, zIndex: 40,
          background: 'color-mix(in oklab, var(--bg) 92%, transparent)',
          backdropFilter: 'blur(8px)',
          padding: '12px 0', marginBottom: 24,
          borderTop: '1px dashed var(--rule)', borderBottom: '1px dashed var(--rule)' }}>
          <div className="z-filter-bar" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', fontSize: 13 }}>
            <span style={{ color: 'var(--mute)', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--green)' }}>$</span> grep
            </span>
            {Object.keys(tagCounts).map((t) => {
              const active = tag === t;
              const c = TAG_COLORS[t] || 'var(--ink)';
              return (
                <button key={t} onClick={() => setTag(t)}
                  style={{ border: `1px solid ${active ? c : 'var(--rule)'}`,
                    background: active ? c : 'transparent',
                    color: active ? 'var(--paper)' : c,
                    fontFamily: 'inherit', fontSize: 13, cursor: 'pointer',
                    padding: '4px 12px', borderRadius: 4, whiteSpace: 'nowrap',
                    transition: 'background .15s, color .15s, border-color .15s' }}>
                  {t} <span style={{ opacity: 0.7, marginLeft: 4 }}>{tagCounts[t]}</span>
                </button>
              );
            })}
            <span style={{ flex: 1, minWidth: 12 }}/>
            <div className="z-filter-search" style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--rule)', borderRadius: 4,
              padding: '4px 10px', background: 'var(--paper)', minWidth: 200 }}>
              <span style={{ color: 'var(--green)' }}>/</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="search..."
                style={{ border: 'none', outline: 'none', background: 'transparent',
                  fontFamily: 'inherit', fontSize: 13, color: 'var(--ink)', flex: 1, padding: 0, minWidth: 0 }}/>
              {query && <button onClick={() => setQuery('')}
                style={{ border: 'none', background: 'transparent', color: 'var(--mute)', cursor: 'pointer', fontFamily: 'inherit' }}>×</button>}
            </div>
            <button onClick={() => setSort((s) => s === 'newest' ? 'oldest' : 'newest')}
              style={{ border: '1px solid var(--rule)', background: 'transparent',
                color: 'var(--mute)', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer',
                padding: '4px 12px', borderRadius: 4, whiteSpace: 'nowrap' }}>
              sort: <span style={{ color: 'var(--ink)' }}>--{sort}</span>
            </button>
          </div>
        </div>
      </Reveal>

      {/* ─────────── LIST ─────────── */}
      {filtered.length === 0 ? (
        <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--mute)' }}>
          <div style={{ fontFamily: "'Departure Mono', monospace", fontSize: 22, color: 'var(--ink)', marginBottom: 8 }}>
            no matches.
          </div>
          <div style={{ fontSize: 13 }}>
            <span style={{ color: 'var(--green)' }}>$</span> grep "<span style={{ color: 'var(--orange)' }}>{query || tag}</span>" writing.log
            &nbsp;<span style={{ color: 'var(--mute)' }}>→ exit 1</span>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {byYear.map(([year, posts]) => (
            <YearBlock key={year} year={year} posts={posts} onNav={onNav} />
          ))}
        </div>
      )}

      {/* ─────────── FOOTER STRIP ─────────── */}
      <div style={{ marginTop: 56, paddingTop: 20, paddingBottom: 8,
        borderTop: '1px dashed var(--rule)', fontSize: 13, color: 'var(--mute)',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <span>
          <span style={{ color: 'var(--green)' }}>$</span> wc -l writing.log &nbsp;
          <span style={{ color: 'var(--ink)' }}>→ {filtered.length} of {POSTS.length} entries</span>
        </span>
        <span>
          <span style={{ color: 'var(--orange)' }}>subscribe ↗</span> /feed.rss
          &nbsp;·&nbsp; <span style={{ color: 'var(--cyan)' }}>email me ↗</span>
        </span>
      </div>
    </div>
  );
}

function YearBlock({ year, posts, onNav }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'Departure Mono', monospace", fontSize: 32, color: 'var(--ink)', letterSpacing: -0.5, whiteSpace: 'nowrap' }}>
          <span style={{ color: 'var(--mute)' }}>{'# '}</span>{year}
        </span>
        <span style={{ fontSize: 12, color: 'var(--mute)', whiteSpace: 'nowrap' }}>· {posts.length} entries</span>
        <span style={{ flex: 1, height: 1, background: 'var(--rule)', marginLeft: 6 }}/>
      </div>
      <div style={{ border: '1px solid var(--rule)', borderRadius: 6, overflow: 'hidden', background: 'var(--paper)' }}>
        {posts.map((p, i) => (
          <PostRow key={p.slug} p={p} onNav={onNav} last={i === posts.length - 1}/>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Writing });
