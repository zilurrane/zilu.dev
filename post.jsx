/* post.jsx — Individual blog post page + sample content */

// ─────────── Sample post content ───────────
// Only one is fully written ("taste-gap"); others show a friendly stub.
const POST_CONTENT = {
  'taste-gap': {
    title: 'The taste gap in AI-generated UIs',
    subtitle: 'A model can produce a plausible interface in seconds. The hard part — the part that still belongs to you — is knowing which of those interfaces is good.',
    words: 1847,
    updated: '2025-11-18',
    toc: [
      { id: 'demo-trap',  label: '01 the demo trap', color: 'var(--magenta)' },
      { id: 'taste',      label: '02 what taste is' },
      { id: 'keep-it',    label: '03 how to keep it' },
      { id: 'further',    label: '04 further reading' },
    ],
    body: PostBodyTasteGap,
  },
};

function PostBodyTasteGap() {
  return (
    <React.Fragment>
      <p style={postP}>
        <span style={dropCap}>I</span>
        t took me about a week of using a frontier model to ship throwaway UIs
        before I started to feel the gap. The first feeling was relief — here,
        finally, was the tireless intern. The second feeling, slower to arrive,
        was a low static of wrongness.
      </p>
      <p style={postP}>
        The buttons were the right size. The spacing made sense. Nothing,
        and I mean nothing, was <em>good</em>. What was missing wasn&rsquo;t skill —
        the model could ape any visual language I named. What was missing was
        the choice that comes <em>before</em> the skill: the decision about which
        of a thousand competent interfaces is the one we should ship.
      </p>
      <p style={postP}>
        That is taste, and taste is currently very expensive.
      </p>

      <PullQuote>
        the model produced a hundred competent interfaces and could not tell me which one mattered.
      </PullQuote>

      <H2 id="demo-trap" color="var(--magenta)">the demo trap</H2>
      <p style={postP}>
        A demo is an interface in its first five minutes of life. The model is
        exceptionally good at the first five minutes. That&rsquo;s a problem,
        because the next five years are where everything that matters happens —
        the edges, the misuses, the moment when the &ldquo;helpful&rdquo; ghost text
        shows up at the worst possible time.
      </p>
      <p style={postP}>
        I started keeping a list of demo-trap heuristics. They&rsquo;re embarrassingly
        obvious in hindsight: <code style={inlineCode}>does it scroll past 200 items?</code>,
        <code style={inlineCode}>what does the empty state say?</code>,
        <code style={inlineCode}>does the error toast suggest the user is stupid?</code>.
        Roughly half my reviews now consist of asking these questions to an
        interface that hasn&rsquo;t had to answer them yet.
      </p>

      <CodeBlock filename="prompt.txt">
{`# the exchange that got me thinking
`}<S c="var(--magenta)">system</S>{`: `}<S c="var(--orange)">"generate a settings page"</S>{`
`}<S c="var(--magenta)">model </S>{`: `}<S c="var(--orange)">&lt;200 perfectly average settings pages&gt;</S>{`
`}<S c="var(--magenta)">me    </S>{`: `}<S c="var(--orange)">&lt;cries softly&gt;</S>
      </CodeBlock>

      <p style={postP}>
        The way out is to put taste at the front of the loop, not the end.
        Specify the texture you want before you specify the shape. Tell the
        model what kind of <em>silence</em> the interface should hold.
        That, it turns out, is something models can do — but only if you ask.
      </p>

      <H2 id="taste" color="var(--magenta)">what taste is</H2>
      <p style={postP}>
        Taste is the accumulation of <em>noticed</em> rejections. Every &ldquo;not&nbsp;quite&rdquo;
        you ever felt and could explain. It is a database of small refusals, and
        the only way to populate it is to look at a lot of things, on purpose,
        with friends who will argue with you about them.
      </p>
      <p style={postP}>
        It is also slow. There&rsquo;s no shortcut to having seen a thousand
        bad sidebars and being able to describe, in a sentence, why the
        thousand-and-first is bad too. The model can&rsquo;t do this part for you,
        and probably shouldn&rsquo;t.
      </p>

      <Aside icon="↳" color="var(--cyan)">
        Related: <Link slug="reading-code">reading code is the actual skill</Link>.
        Same shape of argument, different domain.
      </Aside>

      <H2 id="keep-it" color="var(--green)">how to keep it</H2>
      <p style={postP}>
        First, look at a lot of stuff. Look at it on purpose, not while
        you&rsquo;re building. Take screenshots. Write down a sentence about each
        one. The act of writing it down is the work.
      </p>
      <p style={postP}>
        Second, <em>stop showing the model your bad first ideas.</em> Once you start
        feeding it your own slop, the next round of slop wears your face. Pull
        from a reference, not from yesterday&rsquo;s output.
      </p>
      <p style={postP}>
        Third, find one or two people whose taste you trust and ask them
        before you ask the model. They&rsquo;ll be slower and more annoying. They
        also won&rsquo;t agree with everything you say, which is the entire point.
      </p>

      <H2 id="further" color="var(--cyan)">further reading</H2>
      <ul style={postUl}>
        <li><a href="#" onClick={(e) => e.preventDefault()} style={postLink}>Ira Glass on the taste gap</a> — the original, still the best framing</li>
        <li><a href="#" onClick={(e) => e.preventDefault()} style={postLink}>Maggie Appleton — squish meets structure</a></li>
        <li><a href="#" onClick={(e) => e.preventDefault()} style={postLink}>Frank Chimero — The Web&rsquo;s Grain</a></li>
      </ul>
    </React.Fragment>
  );
}

// ─────────── Post page ───────────
function Post({ slug, onNav }) {
  const post = POST_CONTENT[slug];
  const meta = POSTS.find((p) => p.slug === slug);

  // reading progress bar
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  // prev / next
  const idx = POSTS.findIndex((p) => p.slug === slug);
  const prev = idx >= 0 ? POSTS[idx + 1] : null; // older
  const next = idx > 0 ? POSTS[idx - 1] : null;  // newer

  if (!post) return <PostStub meta={meta} slug={slug} onNav={onNav} />;

  const Body = post.body;

  return (
    <div style={{ padding: '0 clamp(20px, 4vw, 48px)', maxWidth: 1200, margin: '0 auto' }}>
      {/* reading progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 60,
        background: 'transparent', pointerEvents: 'none' }}>
        <div style={{ height: '100%', background: 'var(--magenta)', width: `${progress * 100}%`, transition: 'width .1s linear' }}/>
      </div>

      {/* breadcrumb */}
      <div style={{ paddingTop: 36, fontSize: 13, color: 'var(--mute)' }}>
        <span style={{ color: 'var(--green)' }}>$</span> cat <span style={{ color: 'var(--blue)' }}>./writing/{meta.date}-{slug}.md</span>
      </div>

      {/* meta pills */}
      <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 12 }}>
        <span style={{ padding: '3px 10px', borderRadius: 4, background: TAG_COLORS[meta.tag], color: 'var(--paper)' }}>
          {meta.tag}
        </span>
        <span style={{ padding: '3px 10px', borderRadius: 4, border: '1px solid var(--rule)', color: 'var(--mute)' }}>
          essay · {String(POSTS.length - idx).padStart(3, '0')}
        </span>
        <span style={{ padding: '3px 10px', borderRadius: 4, border: '1px solid var(--rule)', color: 'var(--mute)' }}>
          {meta.date} · {meta.read}
        </span>
      </div>

      {/* title */}
      <h1 style={{ margin: '20px 0 0', fontFamily: "'Departure Mono', monospace",
        fontSize: 'clamp(36px, 6.6vw, 72px)', lineHeight: 0.95, letterSpacing: -1, color: 'var(--ink)',
        fontWeight: 400 }}>
        {(() => {
          const parts = post.title.split(' in ');
          if (parts.length < 2) return <><span style={{ color: 'var(--mute)' }}>#&nbsp;</span>{post.title}</>;
          return (
            <>
              <span style={{ color: 'var(--mute)' }}>#&nbsp;</span>{parts[0]}
              <br/>
              <span style={{ color: 'var(--magenta)', paddingLeft: '2ch' }}>{'in '}{parts.slice(1).join(' in ')}</span>
            </>
          );
        })()}
      </h1>

      {/* subtitle */}
      <div style={{ marginTop: 22, maxWidth: 760, fontFamily: "'JetBrains Mono', monospace", fontSize: 17, lineHeight: 1.55, color: 'var(--ink2)' }}>
        <span style={{ color: 'var(--mute)' }}>{'/* '}</span>
        {post.subtitle}
        <span style={{ color: 'var(--mute)' }}>{' */'}</span>
      </div>

      {/* author byline */}
      <div style={{ marginTop: 28, paddingTop: 18, borderTop: '1px dashed var(--rule)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, fontSize: 13 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 99, background: 'var(--magenta)', color: 'var(--paper)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: "'Departure Mono', monospace" }}>ZL</div>
          <div>
            <div style={{ color: 'var(--ink)' }}>Zilu Rane</div>
            <div style={{ fontSize: 11, color: 'var(--mute)', letterSpacing: 1, textTransform: 'uppercase' }}>technical lead · pune</div>
          </div>
        </div>
        <div style={{ color: 'var(--mute)', fontSize: 12, display: 'flex', gap: 14 }}>
          <span>{post.words.toLocaleString()} words</span>
          <span>updated {post.updated}</span>
        </div>
      </div>

      {/* TWO-COL: TOC + ARTICLE */}
      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'minmax(0, 180px) minmax(0, 1fr)', gap: 40 }}>
        {/* TOC */}
        <aside style={{ position: 'sticky', top: 72, alignSelf: 'start', fontSize: 12,
          color: 'var(--mute)', lineHeight: 2, fontFamily: "'JetBrains Mono', monospace" }}>
          <div style={{ color: 'var(--ink)', marginBottom: 6 }}>
            <span style={{ color: 'var(--green)' }}>#</span> contents
          </div>
          {post.toc.map((t, i) => (
            <a key={t.id} href={`#${t.id}`} className="z-link"
              style={{ display: 'block', color: t.color || 'var(--ink2)' }}>
              <span style={{ color: 'var(--mute)' }}>{i === post.toc.length - 1 ? '└ ' : '├ '}</span>{t.label}
            </a>
          ))}
          <div style={{ marginTop: 22, color: 'var(--ink)' }}>
            <span style={{ color: 'var(--green)' }}>#</span> meta
          </div>
          <div>words: {post.words.toLocaleString()}</div>
          <div>read&nbsp;: ~{meta.read}</div>
          <div>updated: {post.updated}</div>
          <div style={{ marginTop: 16, color: 'var(--ink)' }}>
            <span style={{ color: 'var(--green)' }}>#</span> share
          </div>
          <div><span style={{ color: 'var(--orange)' }}>↗</span> bluesky</div>
          <div><span style={{ color: 'var(--orange)' }}>↗</span> hackernews</div>
          <div><span style={{ color: 'var(--orange)' }}>↗</span> copy link</div>
        </aside>

        {/* ARTICLE */}
        <article style={{ minWidth: 0, maxWidth: 720, fontFamily: "'Geist', system-ui, sans-serif",
          fontSize: 18, lineHeight: 1.7, color: 'var(--ink2)' }}>
          <Body />

          {/* end-of-article tags + reactions */}
          <div style={{ marginTop: 56, paddingTop: 22, borderTop: '1px dashed var(--rule)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
            <div style={{ color: 'var(--mute)' }}>
              <span style={{ color: 'var(--green)' }}>$</span> echo <span style={{ color: 'var(--orange)' }}>"thanks for reading"</span>
            </div>
            <div style={{ display: 'flex', gap: 16, color: 'var(--mute)' }}>
              <span><span style={{ color: 'var(--magenta)' }}>♥</span> 248</span>
              <span><span style={{ color: 'var(--green)' }}>↻</span> 41</span>
              <a href="#" onClick={(e) => e.preventDefault()} className="z-link" style={{ color: 'var(--orange)' }}>subscribe ↗</a>
            </div>
          </div>
        </article>
      </div>

      {/* PREV / NEXT */}
      <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {prev ? (
          <a href={`#/writing/${prev.slug}`} onClick={(e) => { e.preventDefault(); onNav(`writing/${prev.slug}`); }}
            style={navCardStyle}>
            <div style={{ fontSize: 12, color: 'var(--mute)' }}>
              <span style={{ color: 'var(--green)' }}>$</span> cd ../prev <span style={{ color: 'var(--mute)' }}>// older</span>
            </div>
            <div style={{ marginTop: 8, fontFamily: "'Departure Mono', monospace", fontSize: 20, color: 'var(--ink)', lineHeight: 1.15 }}>
              {prev.title}
            </div>
          </a>
        ) : <div/>}
        {next ? (
          <a href={`#/writing/${next.slug}`} onClick={(e) => { e.preventDefault(); onNav(`writing/${next.slug}`); }}
            style={{ ...navCardStyle, textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: 'var(--mute)' }}>
              <span style={{ color: 'var(--green)' }}>$</span> cd ../next <span style={{ color: 'var(--mute)' }}>// newer</span>
            </div>
            <div style={{ marginTop: 8, fontFamily: "'Departure Mono', monospace", fontSize: 20, color: 'var(--ink)', lineHeight: 1.15 }}>
              {next.title}
            </div>
          </a>
        ) : <div/>}
      </div>

      {/* back to index */}
      <div style={{ marginTop: 32, paddingTop: 18, borderTop: '1px dashed var(--rule)',
        display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--mute)' }}>
        <a href="#/writing" onClick={(e) => { e.preventDefault(); onNav('writing'); }} className="z-link">
          <span style={{ color: 'var(--green)' }}>$</span> cd .. <span style={{ color: 'var(--mute)' }}>// back to writing</span>
        </a>
        <a href="/feed.rss" onClick={(e) => e.preventDefault()} className="z-link" style={{ color: 'var(--orange)' }}>
          subscribe via /feed.rss
        </a>
      </div>
    </div>
  );
}

// ─────────── stub for not-yet-written posts ───────────
function PostStub({ meta, slug, onNav }) {
  return (
    <div style={{ padding: '0 clamp(20px, 4vw, 48px)', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ paddingTop: 56, fontSize: 13, color: 'var(--mute)' }}>
        <span style={{ color: 'var(--green)' }}>$</span> cat <span style={{ color: 'var(--blue)' }}>./writing/{slug || 'unknown'}.md</span>
        <span style={{ color: 'var(--mute)', marginLeft: 8 }}>{'// status: draft'}</span>
      </div>
      <h1 style={{ marginTop: 18, fontFamily: "'Departure Mono', monospace",
        fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 0.95, color: 'var(--ink)', fontWeight: 400 }}>
        {meta ? meta.title : 'no such essay'}
      </h1>
      <div style={{ marginTop: 14, fontSize: 16, color: 'var(--ink2)', lineHeight: 1.65, maxWidth: 600 }}>
        <span style={{ color: 'var(--mute)', fontFamily: "'JetBrains Mono', monospace" }}>{'/* '}</span>
        This essay isn&rsquo;t fully written yet — the prototype only ships one full post
        (<a href="#/writing/taste-gap" onClick={(e) => { e.preventDefault(); onNav('writing/taste-gap'); }}
          className="z-link" style={{ color: 'var(--magenta)' }}>the taste gap</a>) as a template.
        The list, meta, and chrome are real;<br/>the body is a placeholder until I sit down and write it.
        <span style={{ color: 'var(--mute)', fontFamily: "'JetBrains Mono', monospace" }}>{' */'}</span>
      </div>
      <div style={{ marginTop: 28 }}>
        <button onClick={() => onNav('writing')} className="z-link"
          style={{ border: '1px solid var(--rule)', padding: '8px 16px',
            background: 'transparent', color: 'var(--ink)', fontFamily: 'inherit',
            fontSize: 14, cursor: 'pointer', borderRadius: 4 }}>
          <span style={{ color: 'var(--green)' }}>$</span> cd ../writing
        </button>
      </div>
    </div>
  );
}

// ─────────── small body primitives ───────────
const postP = { margin: '0 0 22px' };
const dropCap = { fontFamily: "'Departure Mono', monospace", fontSize: 72, float: 'left',
  lineHeight: 0.85, paddingRight: 12, paddingTop: 6, color: 'var(--magenta)' };
const inlineCode = { fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
  background: 'var(--panel)', padding: '1px 6px', borderRadius: 3, color: 'var(--ink)',
  border: '1px solid var(--rule)', margin: '0 2px' };
const postUl = { margin: '0 0 22px', padding: 0, listStyle: 'none',
  display: 'flex', flexDirection: 'column', gap: 8, fontSize: 16 };
const postLink = { color: 'var(--orange)', textDecoration: 'underline',
  textDecorationColor: 'var(--rule)', textUnderlineOffset: 3 };
const navCardStyle = { padding: '20px 22px', background: 'var(--paper)',
  border: '1px solid var(--rule)', borderRadius: 6, cursor: 'pointer',
  transition: 'border-color .15s, transform .15s', textDecoration: 'none', display: 'block' };

function H2({ id, prefix = '## ', color = 'var(--magenta)', children }) {
  return (
    <h2 id={id} style={{ fontFamily: "'Departure Mono', monospace", fontSize: 34, color: 'var(--ink)',
      fontWeight: 400, letterSpacing: -0.5, margin: '44px 0 16px', scrollMarginTop: 80 }}>
      <span style={{ color }}>{prefix.trim()}</span> {children}
    </h2>
  );
}
function PullQuote({ children }) {
  return (
    <div style={{ margin: '32px 0', padding: '20px 24px', background: 'var(--paper)',
      border: '1px solid var(--rule)', borderLeft: '3px solid var(--magenta)', borderRadius: 4,
      fontFamily: "'JetBrains Mono', monospace", fontSize: 17, lineHeight: 1.55, color: 'var(--ink)' }}>
      <span style={{ color: 'var(--mute)' }}>{'// '}</span>
      <span style={{ fontStyle: 'italic' }}>{children}</span>
    </div>
  );
}
function CodeBlock({ filename, children }) {
  return (
    <div style={{ margin: '0 0 24px', background: 'var(--panel)', border: '1px solid var(--rule)',
      borderRadius: 6, overflow: 'hidden' }}>
      <div style={{ padding: '7px 14px', borderBottom: '1px solid var(--rule)',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--mute)',
        background: 'var(--paper)', display: 'flex', justifyContent: 'space-between' }}>
        <span><span style={{ color: 'var(--green)' }}>●</span>&nbsp;&nbsp;{filename}</span>
        <span style={{ cursor: 'pointer' }}>copy ↗</span>
      </div>
      <pre style={{ margin: 0, padding: '14px 18px', fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13, lineHeight: 1.7, color: 'var(--ink2)', whiteSpace: 'pre-wrap' }}>{children}</pre>
    </div>
  );
}
function Aside({ icon, color = 'var(--cyan)', children }) {
  return (
    <div style={{ display: 'flex', gap: 12, margin: '16px 0 28px',
      fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: 'var(--mute)',
      lineHeight: 1.55, padding: '14px 16px', background: 'var(--paper)',
      border: '1px dashed var(--rule)', borderRadius: 4 }}>
      <span style={{ color, flexShrink: 0 }}>{icon}</span>
      <span>{children}</span>
    </div>
  );
}
function S({ c, children }) { return <span style={{ color: c }}>{children}</span>; }
function Link({ slug, children, onClick }) {
  return (
    <a href={`#/writing/${slug}`} onClick={(e) => { e.preventDefault(); location.hash = `#/writing/${slug}`; }}
      className="z-link" style={postLink}>{children}</a>
  );
}

Object.assign(window, { Post, POST_CONTENT });
