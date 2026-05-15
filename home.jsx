/* home.jsx — Homepage with all portfolio details */

function Home({ onNav, theme }) {
  return (
    <div style={{ padding: '0 clamp(20px, 4vw, 48px)', maxWidth: 1280, margin: '0 auto' }}>

      {/* ─────────── HERO ─────────── */}
      <section style={{ padding: '56px 0 28px' }}>
        <Reveal>
          <div className="z-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 36, alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--mute)', letterSpacing: 1.4, marginBottom: 18 }}>
                <span style={{ color: 'var(--green)' }}>$</span> whoami <span style={{ color: 'var(--mute)' }}>--verbose</span>
              </div>
              <div style={{ fontFamily: "'Departure Mono', 'JetBrains Mono', monospace",
                fontSize: 'clamp(64px, 11vw, 132px)', lineHeight: 0.95, letterSpacing: -3, color: 'var(--ink)' }}>
                <span>ZILU</span>
                <span style={{ color: 'var(--mute)' }}>.</span>
                <span style={{ color: 'var(--magenta)' }}>DEV</span>
                <span style={{ display: 'inline-block', width: 'clamp(14px, 2vw, 24px)', height: 'clamp(40px, 8vw, 92px)', background: 'var(--magenta)', verticalAlign: '-12%', marginLeft: 8, animation: 'zBlink 1.1s steps(1) infinite' }}/>
              </div>
              <div style={{ marginTop: 12, fontFamily: "'Geist', system-ui, sans-serif",
                fontSize: 'clamp(18px, 1.9vw, 22px)', lineHeight: 1.45, color: 'var(--ink2)', maxWidth: 600 }}>
                Technical Lead at <span style={{ color: 'var(--magenta)', fontFamily: "'JetBrains Mono', monospace" }}>e-Zest</span>, in Pune.
                Eight years building web and mobile apps with React, Node, and React&nbsp;Native — currently building with <span style={{ color: 'var(--magenta)', fontFamily: "'JetBrains Mono', monospace" }}>LangChain</span> and <span style={{ color: 'var(--magenta)', fontFamily: "'JetBrains Mono', monospace" }}>RAG</span>.
              </div>

              <div style={{ marginTop: 36, fontSize: 17, lineHeight: 1.65, color: 'var(--ink2)' }}>
                <div style={{ color: 'var(--mute)' }}>{'// react · node · react native · langchain · rag'}</div>
                <div>
                  <span style={{ color: 'var(--magenta)' }}>const </span>
                  <span style={{ color: 'var(--blue)' }}>zilu </span>= <span style={{ color: 'var(--green)' }}>{'{'}</span>
                </div>
                <div style={{ paddingLeft: 22 }}>
                  <span style={{ color: 'var(--cyan)' }}>name</span>: <Str>Zilu Rane</Str>,
                </div>
                <div style={{ paddingLeft: 22 }}>
                  <span style={{ color: 'var(--cyan)' }}>role</span>: <Str>technical lead @ e-Zest</Str>,
                </div>
                <div style={{ paddingLeft: 22 }}>
                  <span style={{ color: 'var(--cyan)' }}>stack</span>: [<Str>react</Str>, <Str>node</Str>, <Str>react-native</Str>, <Str>langchain</Str>, <Str>rag</Str>],
                </div>
                <div style={{ paddingLeft: 22 }}>
                  <span style={{ color: 'var(--cyan)' }}>experience</span>: <span style={{ color: 'var(--orange)' }}>"8+ years"</span>,
                </div>
                <div style={{ paddingLeft: 22 }}>
                  <span style={{ color: 'var(--cyan)' }}>based</span>: <Str>pune, maharashtra</Str>,
                </div>
                <div style={{ paddingLeft: 22 }}>
                  <span style={{ color: 'var(--cyan)' }}>open_to_chat</span>: <span style={{ color: 'var(--green)' }}>true</span>
                  &nbsp;<span style={{ color: 'var(--mute)' }}>{'// zilurrane@gmail.com'}</span>,
                </div>
                <div><span style={{ color: 'var(--green)' }}>{'}'}</span><span style={{ color: 'var(--mute)' }}>;</span></div>
              </div>
            </div>

            {/* status & commits side column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
              <Frame title="status.json" color="var(--green)"
                action={<span style={{ color: 'var(--green)' }}>● live</span>}>
                <div style={{ padding: '14px 18px', fontSize: 12.5, lineHeight: 1.85 }}>
                  <Row k="now_building"  v={<Str>linkedin-signal-agent on cloudflare workers ai</Str>} />
                  <Row k="now_leading"   v={<Str>e-Zest engineering team</Str>} />
                  <Row k="now_learning"  v={<Str>workers ai, edge inference, eval harnesses</Str>} />
                  <Row k="philosophy"    v={<Str>keep it simple stupid</Str>} />
                  <Row k="open_to_chat"  v={<span style={{ color: 'var(--green)' }}>true</span>} />
                  <Row k="location"      v={<Str>Pune, IN — UTC+5:30</Str>} last />
                </div>
              </Frame>

              <Frame title="commits.log" lang="git" color="var(--magenta)">
                <div style={{ padding: '14px 18px', fontSize: 12, lineHeight: 1.85 }}>
                  {[
                    ['a3f12c','2h','feat(rag): swap retrievers without re-indexing'],
                    ['f0e4ab','1d','fix(rn): amplify auth races on cold start'],
                    ['c81992','2d','refactor: extract prompt versioning into a hook'],
                    ['219bd0','4d','chore: bump node 20 lts, untangle docker'],
                    ['4e7cd1','1w','docs: write the readme i should have'],
                  ].map((c) => (
                    <div key={c[0]} style={{ display: 'grid', gridTemplateColumns: '64px 44px 1fr', gap: 8 }}>
                      <span style={{ color: 'var(--yellow)' }}>{c[0]}</span>
                      <span style={{ color: 'var(--mute)' }}>{c[1]}</span>
                      <span style={{ color: 'var(--ink)' }}>{c[2]}</span>
                    </div>
                  ))}
                </div>
              </Frame>

              <div className="z-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {[['8+','years', 'var(--magenta)'],['5','certs', 'var(--green)'],['2','papers', 'var(--orange)'],['5','langs', 'var(--blue)']].map((s) => (
                  <div key={s[1]} style={{ padding: '12px 8px', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 6, textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Departure Mono', monospace", fontSize: 22, color: s[2], lineHeight: 1 }}>{s[0]}</div>
                    <div style={{ fontSize: 10, color: 'var(--mute)', marginTop: 5, letterSpacing: 1, textTransform: 'uppercase' }}>{s[1]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─────────── ABOUT ─────────── */}
      <section style={{ padding: '40px 0 24px' }}>
        <SectionHead cmd="cat" arg="about.md" caption="the short version" />
        <Reveal>
          <div className="z-about-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 36, marginTop: 18 }}>
            <div style={{ fontFamily: "'Geist', system-ui, sans-serif", fontSize: 17, lineHeight: 1.7, color: 'var(--ink2)' }}>
              <p style={{ margin: '0 0 14px' }}>
                Hi — I&rsquo;m Zilu. I&rsquo;m a Technical Lead at e-Zest Solutions in Pune,
                with eight-plus years of full-stack experience across React, Node, .NET,
                and React Native. The last couple of years I&rsquo;ve been spending most of
                my time at the intersection of front-end engineering and Gen AI —
                LangChain, RAG, vector search, the lot.
              </p>
              <p style={{ margin: '0 0 14px' }}>
                Before e-Zest I was at LTI (Larsen &amp; Toubro Infotech) building enterprise
                web apps in Angular and .NET. Before that, my undergrad research turned
                into two published papers on sentiment analysis with Hadoop and ML —
                still proud of those. Somewhere along the way I founded{' '}
                <a href="https://github.com/lifecompilers" target="_blank" rel="noopener"
                  className="z-link" style={{ color: 'var(--magenta)', fontFamily: "'JetBrains Mono', monospace" }}>@lifecompilers</a>,
                a little corner for useful open-source tools, and my code ended up in
                the GitHub Arctic Code Vault (a small but cherished badge of nerd honor).
              </p>
              <p style={{ margin: 0 }}>
                I write here when I have something worth saying, mostly about React, Node,
                and building useful things with LLMs. If you&rsquo;re working on something in
                that space, I&rsquo;d love to chat — email is best.
              </p>
            </div>
            <div style={{ padding: '18px 20px', border: '1px dashed var(--rule)', borderRadius: 6, background: 'var(--paper)',
              fontSize: 13, lineHeight: 1.8 }}>
              <div style={{ color: 'var(--mute)' }}>{'/* available_for */'}</div>
              <div style={{ color: 'var(--green)' }}>+ consulting: React, Node, GenAI</div>
              <div style={{ color: 'var(--green)' }}>+ mentorship &amp; tech-lead coaching</div>
              <div style={{ color: 'var(--green)' }}>+ talks &amp; meetups (Pune / online)</div>
              <div style={{ color: 'var(--orange)' }}>± freelance (case-by-case)</div>
              <div style={{ color: 'var(--mute)' }}>− unpaid &ldquo;quick favours&rdquo;</div>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--rule)', color: 'var(--ink)' }}>
                <span style={{ color: 'var(--green)' }}>$</span> mailto:<span style={{ color: 'var(--orange)' }}>zilurrane@gmail.com</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─────────── PROJECTS ─────────── */}
      <section style={{ padding: '40px 0 24px' }}>
        <SectionHead cmd="ls" arg="~/projects" caption="five things worth talking about" />
        <div className="z-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14, marginTop: 18 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.dir} delay={i * 50}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
          <Reveal delay={PROJECTS.length * 50}>
            <div style={{
              border: '1px dashed var(--rule)', borderRadius: 6, padding: '20px 22px',
              minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--mute)', fontSize: 14, gap: 8,
            }}>
              <span style={{ color: 'var(--green)' }}>+</span>
              <span>something next — maybe yours?</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────── CERTIFICATIONS & RECOGNITION ─────────── */}
      <section style={{ padding: '40px 0 24px' }}>
        <SectionHead cmd="cat" arg="~/credentials" caption="certs, awards, papers" />
        <Reveal>
          <div className="z-credentials-grid" style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: 14 }}>
            {/* Certifications */}
            <Frame title="certifications.list" color="var(--green)">
              <div style={{ padding: '4px 0' }}>
                {[
                  ['Generative AI for JavaScript Developers',         'LangChain · RAG',                 'var(--magenta)'],
                  ['Microservices with NodeJS and React',             'Node · React · Docker',           'var(--green)'],
                  ['M220JS: MongoDB for JavaScript Developers',       'MongoDB University',              'var(--green)'],
                  ['Cloud Native Twelve-Factor Applications',         'Pivotal / Cloud Foundry',         'var(--blue)'],
                  ['.NET Framework',                                  'Microsoft',                       'var(--orange)'],
                ].map((c, i, a) => (
                  <div key={c[0]} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.7fr)',
                    gap: 14, padding: '11px 18px', borderBottom: i === a.length - 1 ? 'none' : '1px dashed var(--rule)',
                    alignItems: 'baseline', fontSize: 13 }}>
                    <span style={{ color: 'var(--ink)' }}>
                      <span style={{ color: c[2], marginRight: 8 }}>✓</span>{c[0]}
                    </span>
                    <span style={{ color: 'var(--mute)', fontSize: 12 }}>{c[1]}</span>
                  </div>
                ))}
              </div>
            </Frame>

            {/* Awards + Publications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
              <Frame title="awards.txt" color="var(--orange)">
                <div style={{ padding: '14px 18px', fontSize: 13, lineHeight: 1.6 }}>
                  <div style={{ paddingBottom: 8, borderBottom: '1px dashed var(--rule)' }}>
                    <span style={{ color: 'var(--orange)', marginRight: 8 }}>★</span>
                    <span style={{ color: 'var(--ink)' }}>Dewang Mehta Excellence Award</span>
                    <div style={{ fontSize: 11, color: 'var(--mute)', marginLeft: 22 }}>recognition for academic achievement</div>
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <span style={{ color: 'var(--orange)', marginRight: 8 }}>★</span>
                    <span style={{ color: 'var(--ink)' }}>Arctic Code Vault Contributor</span>
                    <div style={{ fontSize: 11, color: 'var(--mute)', marginLeft: 22 }}>code preserved by GitHub for 1000 years</div>
                  </div>
                </div>
              </Frame>

              <Frame title="publications.bib" color="var(--cyan)">
                <div style={{ padding: '14px 18px', fontSize: 12.5, lineHeight: 1.5 }}>
                  <div style={{ paddingBottom: 10, borderBottom: '1px dashed var(--rule)' }}>
                    <span style={{ color: 'var(--cyan)', fontFamily: "'JetBrains Mono', monospace" }}>@paper</span>
                    <span style={{ color: 'var(--mute)' }}>{'{'}</span>
                    <span style={{ color: 'var(--orange)' }}>rane2016hadoop</span>
                    <span style={{ color: 'var(--mute)' }}>{'}'}</span>
                    <div style={{ marginTop: 4, color: 'var(--ink)' }}>Use of Hadoop Framework for Web-Based Sentiment Analysis</div>
                  </div>
                  <div style={{ paddingTop: 10 }}>
                    <span style={{ color: 'var(--cyan)', fontFamily: "'JetBrains Mono', monospace" }}>@paper</span>
                    <span style={{ color: 'var(--mute)' }}>{'{'}</span>
                    <span style={{ color: 'var(--orange)' }}>rane2016twitter</span>
                    <span style={{ color: 'var(--mute)' }}>{'}'}</span>
                    <div style={{ marginTop: 4, color: 'var(--ink)' }}>ML Algorithm for Sentiment Analysis of Twitter Feeds</div>
                  </div>
                </div>
              </Frame>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─────────── RESUME / TIMELINE ─────────── */}
      <section style={{ padding: '40px 0 24px' }}>
        <SectionHead cmd="cat" arg="~/resume.txt" caption="the longer version, abbreviated" right={
          <a className="z-link" href="resume.html" target="_blank" rel="noopener" style={{ color: 'var(--orange)' }}>open resume ↗</a>
        }/>
        <div style={{ marginTop: 14, border: '1px solid var(--rule)', borderRadius: 6, overflow: 'hidden', background: 'var(--paper)' }}>
          {RESUME.map((r, i) => (
            <Reveal key={i} delay={i * 30}>
              <div className="z-resume-row" style={{ display: 'grid', gridTemplateColumns: '120px minmax(0, 1fr) minmax(0, 1.2fr) minmax(0, 1.5fr)', gap: 18,
                padding: '14px 18px', borderBottom: i === RESUME.length - 1 ? 'none' : '1px dashed var(--rule)',
                alignItems: 'baseline', fontSize: 13.5 }}>
                <span style={{ color: 'var(--mute)', fontVariantNumeric: 'tabular-nums' }}>{r.year}</span>
                <span style={{ color: 'var(--ink)' }}>{r.role}</span>
                <span style={{ color: 'var(--magenta)' }}>{r.where}</span>
                <span style={{ color: 'var(--mute)', fontStyle: 'italic' }}>{r.note}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────── WRITING preview ─────────── */}
      <section style={{ padding: '40px 0 56px' }}>
        <SectionHead cmd="head -5" arg="~/writing/" caption="recent essays"
          right={<button onClick={() => onNav('writing')} className="z-link"
            style={{ border: 'none', background: 'transparent', color: 'var(--orange)', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer' }}>
            all 28 →
          </button>} />
        <div style={{ marginTop: 14, border: '1px solid var(--rule)', borderRadius: 6, overflow: 'hidden', background: 'var(--paper)' }}>
          {POSTS.slice(0, 5).map((p, i) => (
            <Reveal key={p.slug} delay={i * 40}>
              <PostRow p={p} onNav={onNav} last={i === 4}/>
            </Reveal>
          ))}
        </div>
      </section>

    </div>
  );
}

// ─────────── helpers ───────────
function Str({ children }) {
  return <span style={{ color: 'var(--orange)' }}>"{children}"</span>;
}

function Row({ k, v, last }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 10, paddingBottom: last ? 0 : 1 }}>
      <span style={{ color: 'var(--cyan)' }}>{k}</span>
      <span>{v}</span>
    </div>
  );
}

function SectionHead({ cmd, arg, caption, right }) {
  return (
    <div className="z-section-head" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      paddingBottom: 10, borderBottom: '1px dashed var(--rule)' }}>
      <div style={{ fontFamily: "'Departure Mono', monospace", fontSize: 26, color: 'var(--ink)', letterSpacing: 0.3 }}>
        <span style={{ color: 'var(--green)' }}>$</span> {cmd} <span style={{ color: 'var(--blue)' }}>{arg}</span>
        {caption && <span style={{ color: 'var(--mute)', fontSize: 12, marginLeft: 16, letterSpacing: 0 }}>// {caption}</span>}
      </div>
      {right}
    </div>
  );
}

function ProjectCard({ p }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{
      background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 6, overflow: 'hidden',
      transition: 'transform .2s, box-shadow .2s, border-color .2s', boxShadow: 'var(--shadow)',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = p.color; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--rule)'; }}
    >
      <div style={{ padding: '7px 14px', borderBottom: '1px solid var(--rule)', background: 'var(--panel)',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--mute)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
        <span><span style={{ color: p.color }}>●</span>&nbsp;&nbsp;{p.dir}</span>
        <span style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <span>{p.lang}</span>
          <span style={{ color: p.color }}>{p.stars}</span>
        </span>
      </div>
      <div style={{ padding: '18px 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontFamily: "'Departure Mono', monospace", fontSize: 30, color: 'var(--ink)', lineHeight: 1, letterSpacing: -0.5 }}>
              {p.name}
            </div>
            <div style={{ fontSize: 11, color: 'var(--mute)', marginTop: 4, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {p.role} · {p.year}
            </div>
          </div>
          <div style={{ fontSize: 11, color: p.color, padding: '3px 8px', border: `1px solid ${p.color}`, borderRadius: 4, whiteSpace: 'nowrap', flexShrink: 0 }}>
            ~ {p.status}
          </div>
        </div>
        <div style={{ marginTop: 12, fontSize: 14, color: 'var(--ink2)', lineHeight: 1.55 }}>
          {p.desc}
        </div>
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px dashed var(--rule)', fontSize: 12, color: 'var(--mute)',
          display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {p.links.map((l) => {
            const isExternal = !!p.href && (l === 'github' || l.includes('/'));
            return (
              <a key={l} href={isExternal ? p.href : '#'}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                onClick={isExternal ? undefined : (e) => e.preventDefault()}
                className="z-link"
                style={{ color: 'var(--ink2)', whiteSpace: 'nowrap' }}>
                <span style={{ color: 'var(--mute)' }}>{'> '}</span>{l}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PostRow({ p, onNav, last }) {
  return (
    <a href={`#/writing/${p.slug}`} onClick={(e) => { e.preventDefault(); onNav(`writing/${p.slug}`); }}
      className="z-postrow"
      style={{ display: 'grid', gridTemplateColumns: '120px 90px 50px minmax(0, 1fr) 24px', gap: 16,
      padding: '13px 18px', borderBottom: last ? 'none' : '1px dashed var(--rule)',
      fontSize: 14, alignItems: 'baseline', cursor: 'pointer', transition: 'background .15s' }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--panel)'}
      onMouseLeave={(e) => e.currentTarget.style.background = ''}
    >
      <span style={{ color: 'var(--mute)', fontVariantNumeric: 'tabular-nums' }}>{p.date}</span>
      <span style={{ color: TAG_COLORS[p.tag] }}>[{p.tag}]</span>
      <span className="z-postrow-read" style={{ color: 'var(--mute)', textAlign: 'right' }}>{p.read}</span>
      <span style={{ color: 'var(--ink)' }}>{p.title}</span>
      <span className="z-postrow-arrow" style={{ color: 'var(--mute)', textAlign: 'right' }}>→</span>
    </a>
  );
}

Object.assign(window, { Home, PostRow });
