import React, { useMemo, useState } from "react";
import { LINKS, PRESS, PROJECTS, SHORTS, VIDEOS } from "./data.js";
import { DSPLogos } from "./DSPLogos.jsx";

export function Tour() {
  return (
    <section className="section" id="tour" data-screen-label="03 Tour">
      <div className="section-head">
        <div className="num">03 / TOUR <span className="kanji">ツアー</span></div>
        <h2 className="title">No dates, <em>yet</em></h2>
        <div className="right">Check back soon<br/><span className="jp">近日公開</span></div>
      </div>
      <div className="tour-empty">
        <div className="te-frame">
          <div className="te-kanji">公演未定</div>
          <div className="te-sub">TOUR TBA</div>
        </div>
        <p className="te-msg">
          No shows on the books right now — the record comes first.
          Subscribe below and you'll hear about dates before anyone else.
        </p>
        <div className="row" style={{ justifyContent: "center" }}>
          <a className="btn btn-accent" href="#signup">Get notified →</a>
          <a className="btn btn-ghost" href={LINKS.instagram} target="_blank" rel="noopener">Follow on IG</a>
        </div>
      </div>
    </section>
  );
}

function VideoCard({ v, variant, onOpen }) {
  const thumb = v.ytId ? `https://i.ytimg.com/vi/${v.ytId}/maxresdefault.jpg` : null;
  const thumbFallback = v.ytId ? `https://i.ytimg.com/vi/${v.ytId}/hqdefault.jpg` : null;
  const onKey = (e) => {
    if ((e.key === "Enter" || e.key === " ") && v.ytId) { e.preventDefault(); onOpen(v.ytId); }
  };
  const parts = v.title.split(v.titleEm);
  return (
    <article
      className={`vcard vcard-${variant}`}
      onClick={() => v.ytId && onOpen(v.ytId)}
      role="button" tabIndex={0}
      onKeyDown={onKey}
      aria-label={`Play ${v.title} — ${v.tag}`}
    >
      <div className="vcard-thumb">
        {thumb
          ? <img
              src={thumb}
              onError={(e) => { if (thumbFallback && e.currentTarget.src !== thumbFallback) e.currentTarget.src = thumbFallback; }}
              alt=""
              loading="lazy"
            />
          : <div className="thumb thumb-1" />}
        <div className="vcard-play" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7L7 5z"/></svg>
        </div>
        <div className="vcard-scan" aria-hidden="true" />
      </div>
      <div className="vcard-caption">
        <div className="vcard-meta">
          <span className="vcard-tag">{v.tag}</span>
          {v.year && <span className="vcard-sep">·</span>}
          {v.year && <span className="vcard-year">{v.year}</span>}
          <span className="vcard-sep">·</span>
          <span className="vcard-len">{v.len}</span>
        </div>
        <div className="vcard-title">
          {parts[0]}<em>{v.titleEm}</em>{parts[1]}
          <span className="vcard-jp">{v.jp}</span>
        </div>
        <div className="vcard-credit">{v.dir}</div>
      </div>
    </article>
  );
}

export function Videos() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section" id="videos" data-screen-label="04 Videos">
      <div className="section-head">
        <div className="num">04 / VIDEO <span className="kanji">映像</span></div>
        <h2 className="title">Moving <em>pictures</em></h2>
        <div className="right">Films &amp; sessions<br/><span className="jp">映像作品</span></div>
      </div>

      {(() => {
        const hero = VIDEOS.find((v) => v.size === "hero") || VIDEOS[0];
        const sides = VIDEOS.filter((v) => v !== hero).slice(0, 2);
        return (
          <div className="videos-grid videos-grid-v2">
            {hero && <VideoCard v={hero} variant="hero" onOpen={setOpen} />}
            <div className="videos-side-col">
              {sides.map((v, i) => (
                <VideoCard v={v} variant="side" onOpen={setOpen} key={v.ytId || i} />
              ))}
            </div>
          </div>
        );
      })()}

      <div className="shorts-head">
        <div className="mono-label" style={{ color: "var(--magenta)" }}>
          More from YouTube · <span className="jp" style={{ fontFamily: "var(--jp-serif)" }}>その他</span>
        </div>
        <a href={LINKS.youtube} target="_blank" rel="noopener" className="mono-label" style={{ opacity: 0.7 }}>
          View channel ↗
        </a>
      </div>
      <div className="shorts-grid">
        {SHORTS.map((s, i) => (
          <div
            key={i}
            className="short-card"
            onClick={() => s.ytId && setOpen(s.ytId)}
            role="button" tabIndex={0}
            onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && s.ytId) { e.preventDefault(); setOpen(s.ytId); } }}
          >
            <div className="short-frame">
              {s.ytId
                ? <img src={`https://i.ytimg.com/vi/${s.ytId}/hqdefault.jpg`} alt={`${s.title} — thumbnail`} loading="lazy" />
                : <div className={`short-placeholder tp-${(i % 4) + 1}`}><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7 5v14l12-7L7 5z"/></svg></div>
              }
              <div className="short-scan" />
            </div>
            <div className="short-title">{s.title}</div>
            <div className="short-jp">{s.jp}</div>
          </div>
        ))}
      </div>

      {open && (
        <div className="video-modal" onClick={() => setOpen(null)}>
          <div className="video-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setOpen(null)} aria-label="Close">✕</button>
            <div className="video-modal-frame">
              <iframe
                src={`https://www.youtube.com/embed/${open}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Past Lives archive — kind filter + year-jump + horizontally scrolling
// strip of year groups.
function classifyKind(p) {
  const k = (p.kind || "").toLowerCase();
  if (k.startsWith("ep") || k.includes("debut lp") || k.includes("lp ")) return "album";
  if (k.startsWith("remix") || k.includes("remix ep")) return "remix";
  return "single";
}

export function Projects() {
  const [filter, setFilter] = React.useState("all"); // 'all' | 'album' | 'single' | 'remix'
  const [activeYear, setActiveYear] = React.useState(null);

  // Tag every project with its kind (memoized).
  const tagged = useMemo(
    () => PROJECTS.map((p, idx) => ({ ...p, _kind: classifyKind(p), _idx: idx })),
    []
  );

  const filtered = useMemo(
    () => (filter === "all" ? tagged : tagged.filter((p) => p._kind === filter)),
    [tagged, filter]
  );

  const byYear = useMemo(() => {
    const map = {};
    filtered.forEach((p) => {
      const y = p.years;
      if (!map[y]) map[y] = [];
      map[y].push(p);
    });
    return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  const allYears = useMemo(() => {
    const set = new Set(tagged.map((p) => p.years));
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [tagged]);

  const totalYears = allYears.length;
  const totalReleases = PROJECTS.length;
  const firstYear = allYears[allYears.length - 1];
  const lastYear = allYears[0];

  const counts = useMemo(
    () => ({
      all: tagged.length,
      album: tagged.filter((p) => p._kind === "album").length,
      single: tagged.filter((p) => p._kind === "single").length,
      remix: tagged.filter((p) => p._kind === "remix").length,
    }),
    [tagged]
  );

  // Smooth-scroll the strip horizontally to a year group. NB: using
  // scrollIntoView here would also move the page vertically — we only want
  // to move the strip.
  const jumpToYear = React.useCallback((y) => {
    setActiveYear(y);
    const strip = document.getElementById("pl-strip");
    const el = document.getElementById(`pl-year-${y}`);
    if (!strip || !el) return;
    const stripRect = strip.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const currentScroll = strip.scrollLeft;
    const delta = elRect.left - stripRect.left;
    strip.scrollTo({ left: currentScroll + delta - 16, behavior: "smooth" });
  }, []);

  return (
    <section className="section catalog-section catalog-v3" id="projects" data-screen-label="05 Projects">
      <div className="section-head">
        <div className="num">05 / PROJECTS <span className="kanji">作品</span></div>
        <h2 className="title">Past <em>lives</em></h2>
        <div className="right">The archive<br/><span className="jp">過去作</span></div>
      </div>

      <div className="cat-stats">
        <div className="cat-stat"><div className="cs-num">{totalReleases}</div><div className="cs-lab">Releases<br/><span className="jp-sub">作品</span></div></div>
        <div className="cat-stat"><div className="cs-num">{totalYears}</div><div className="cs-lab">Years active<br/><span className="jp-sub">年間</span></div></div>
        <div className="cat-stat"><div className="cs-num">{firstYear}<span className="cs-dash">→</span>{lastYear}</div><div className="cs-lab">Era<br/><span className="jp-sub">年代</span></div></div>
        <div className="cat-stat"><div className="cs-num">∞</div><div className="cs-lab">Collaborators<br/><span className="jp-sub">共演者</span></div></div>
      </div>

      {/* Controls: kind filter + year jump nav */}
      <div className="pl-controls">
        <div className="pl-filters" role="tablist" aria-label="Filter by kind">
          {[
            { k: "all",    label: "All",        jp: "全部" },
            { k: "album",  label: "EPs & LPs",  jp: "EP / LP" },
            { k: "single", label: "Singles",    jp: "シングル" },
            { k: "remix",  label: "Remixes",    jp: "リミックス" },
          ].map(({ k, label, jp }) => (
            <button
              key={k}
              role="tab"
              aria-selected={filter === k}
              className={`pl-filter ${filter === k ? "on" : ""}`}
              onClick={() => setFilter(k)}
            >
              <span className="plf-label">{label}</span>
              <span className="plf-jp jp-sub">{jp}</span>
              <span className="plf-count">{counts[k]}</span>
            </button>
          ))}
        </div>

        <div className="pl-years" role="tablist" aria-label="Jump to year">
          <span className="ply-label">Jump · <span className="jp-sub">跳ぶ</span></span>
          <div className="ply-pills">
            {allYears.map((y) => {
              const hasResults = byYear.find(([yr]) => yr === y);
              return (
                <button
                  key={y}
                  className={`ply-pill ${activeYear === y ? "on" : ""} ${!hasResults ? "dim" : ""}`}
                  onClick={() => jumpToYear(y)}
                  disabled={!hasResults}
                >
                  {y}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {byYear.length === 0 && (
        <div className="pl-empty">
          Nothing matches that filter.<br/>
          <button className="pl-reset" onClick={() => setFilter("all")}>Show all releases ↻</button>
        </div>
      )}

      {/* Horizontal scrolling strip of year groups */}
      <div className="pl-strip-wrap">
        <div className="pl-strip" id="pl-strip">
          {byYear.map(([year, items], yi) => (
            <div className="pls-group" id={`pl-year-${year}`} key={year}>
              <div className="pls-year-header">
                <div className="pls-yn">{year}</div>
                <div className="pls-ycount">{items.length} release{items.length === 1 ? "" : "s"}</div>
                <div className="pls-yline" />
              </div>
              <div className="pls-cards">
                {items.map((p, i) => {
                  const parts = p.title.split(p.titleEm);
                  const isLatest = yi === 0 && i === 0 && filter === "all";
                  const hasLinks = !!(p.sp || p.sc || p.bc);
                  return (
                    <article
                      className={`pls-card kind-${p._kind} ${isLatest ? "is-latest" : ""}`}
                      key={p._idx}
                    >
                      <div className="plsc-top">
                        <span className={`plsc-badge b-${p._kind}`}>
                          {p._kind === "album" ? "EP / LP" : p._kind === "remix" ? "Remix" : "Single"}
                        </span>
                        {isLatest && <span className="plsc-new">NEW</span>}
                      </div>

                      <h3 className="plsc-title">
                        {parts[0]}<em>{p.titleEm}</em>{parts[1]}
                      </h3>

                      {p.jp && <div className="plsc-jp">{p.jp}</div>}

                      <p className="plsc-blurb">{p.blurb}</p>

                      {hasLinks && (
                        <div className="plsc-links">
                          {p.sp && <a href={p.sp} target="_blank" rel="noopener" className="plscl sp" aria-label="Spotify"><span className="plscl-ico">{DSPLogos.spotify(13)}</span></a>}
                          {p.sc && <a href={p.sc} target="_blank" rel="noopener" className="plscl sc" aria-label="SoundCloud"><span className="plscl-ico">{DSPLogos.soundcloud(13)}</span></a>}
                          {p.bc && <a href={p.bc} target="_blank" rel="noopener" className="plscl bc" aria-label="Bandcamp"><span className="plscl-ico">{DSPLogos.bandcamp(13)}</span></a>}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <button
          className="pls-nav pls-nav-left"
          aria-label="Scroll left"
          onClick={() => document.getElementById("pl-strip")?.scrollBy({ left: -420, behavior: "smooth" })}
        >
          ←
        </button>
        <button
          className="pls-nav pls-nav-right"
          aria-label="Scroll right"
          onClick={() => document.getElementById("pl-strip")?.scrollBy({ left: 420, behavior: "smooth" })}
        >
          →
        </button>
      </div>
    </section>
  );
}

export function Press() {
  const [open, setOpen] = useState(false);
  const all = PRESS || [];
  const shown = open ? all : all.slice(0, 6);
  const lead = all[0];
  const rest = shown.slice(1);

  return (
    <section className="section press-section" id="press" data-screen-label="06 Press">
      <div className="section-head">
        <div className="num">06 / PRESS <span className="kanji">プレス</span></div>
        <h2 className="title">What they <em>said</em></h2>
        <div className="right">Selected coverage<br/><span className="jp">取材実績</span></div>
      </div>

      <div className="press-masthead">
        <div className="mh-label">AS SEEN IN · <span className="jp-sub" style={{ fontFamily: "var(--jp-serif)" }}>掲載</span></div>
        <div className="mh-outlets">
          {[...new Set(all.map((p) => p.outlet))].map((o, i) => (
            <span key={i} className="mh-outlet">{o}</span>
          ))}
        </div>
      </div>

      {lead && (
        <a className="press-lead" href={lead.url} target="_blank" rel="noopener">
          <div className="pl-left">
            <div className="pl-outlet">
              <span className="pl-outlet-name">{lead.outlet}</span>
              <span className="pl-sep">·</span>
              <span className="pl-year">{lead.year}</span>
            </div>
            <blockquote className="pl-pull">
              <span className="pl-quote">&ldquo;</span>
              {lead.pull}
              <span className="pl-quote-c">&rdquo;</span>
            </blockquote>
            <div className="pl-headline">&ldquo;{lead.headline}&rdquo;</div>
            <div className="pl-read">Read full review <span className="arrow">↗</span></div>
          </div>
          <div className="pl-right">
            <div className="pl-stamp">
              <div className="pl-stamp-num">01</div>
              <div className="pl-stamp-lab">FEATURED<br/>REVIEW</div>
              <div className="pl-stamp-jp">注目</div>
            </div>
          </div>
        </a>
      )}

      <div className="press-rows">
        {rest.map((p, i) => (
          <a key={i} href={p.url} target="_blank" rel="noopener" className="press-row">
            <div className="pr-col-num">{String(i + 2).padStart(2, "0")}</div>
            <div className="pr-col-outlet">
              <div className="pr-outlet">{p.outlet}</div>
              <div className="pr-year">{p.year}</div>
            </div>
            <div className="pr-col-body">
              <blockquote className="pr-pull">&ldquo;{p.pull}&rdquo;</blockquote>
              <div className="pr-headline">{p.headline}</div>
            </div>
            <div className="pr-col-arrow">↗</div>
          </a>
        ))}
      </div>

      {all.length > 6 && (
        <button className="press-more" onClick={() => setOpen((o) => !o)}>
          {open ? "− Fewer · 縮小" : `+ Read ${all.length - 6} more · もっと読む`}
        </button>
      )}
    </section>
  );
}

export function About() {
  return (
    <section className="section" id="about" data-screen-label="07 About">
      <div className="section-head">
        <div className="num">07 / ABOUT <span className="kanji">紹介</span></div>
        <h2 className="title">The <em>notes</em></h2>
        <div className="right">Est. 2017<br/><span className="jp">ブルックリン</span></div>
      </div>
      <div className="about-grid">
        <div className="about-body">
          <div className="about-portrait" aria-hidden="true">
            <img src="/assets/press-1.jpg" alt="AIR APPARENT — Neil Sethi, portrait" loading="lazy" />
          </div>
          <span className="about-dropcap">A</span>
          <p>
            <em>AIR APPARENT</em> &mdash; exuberant electronic pop out of Brooklyn
            (by way of San Francisco). Synthwave, 80s funk, R&amp;B/pop hooks
            that invite escapism and self-discovery.
          </p>
          <p>
            Nearly a decade of releases&mdash;from 2017&rsquo;s <em>Imaginary</em> EP to the
            breakout single <em>three strikes</em> (119K+ Spotify streams), the
            2022 debut LP <em>Chromatic</em>, and the new EP <em>Our June</em>,
            written entirely during a solo trip through Japan.
          </p>
          <div className="about-tagline">
            <span className="jp">未来をみたい</span>
            <span className="tagline-en">&mdash; &ldquo;I want to see the future.&rdquo;</span>
          </div>
        </div>
        <div className="about-meta">
          <div className="cell"><div className="k">Project</div><div className="v">AIR <em>APPARENT</em></div></div>
          <div className="cell"><div className="k">Based</div><div className="v">Brooklyn, <em>NY</em></div></div>
          <div className="cell"><div className="k">Active since</div><div className="v"><em>2017</em></div></div>
          <div className="cell"><div className="k">Latest EP</div><div className="v">Our <em>June</em></div></div>
          <div className="cell"><div className="k">For business</div><div className="v"><a href={LINKS.epk}>EPK <em>↗</em></a></div></div>
          <div className="cell"><div className="k">Booking</div><div className="v"><a href={`mailto:${LINKS.bookingEmail}`}>{LINKS.bookingEmail}</a></div></div>
        </div>
      </div>
    </section>
  );
}

export function Signup() {
  const [email, setEmail] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    // Hand off to Symphony — the fan-collection landing accepts an `email`
    // query param and pre-fills its form so users only confirm one click.
    const url = trimmed
      ? `${LINKS.fanSignup}?email=${encodeURIComponent(trimmed)}`
      : LINKS.fanSignup;
    window.open(url, "_blank", "noopener");
  };
  return (
    <section className="signup-wrap" id="signup">
      <div className="signup">
        <div>
          <div className="signup-title">
            New music, <em>first.</em>
          </div>
          <div className="signup-jp">ニュースレター</div>
        </div>
        <form className="signup-form" onSubmit={onSubmit}>
          <div className="signup-input">
            <input
              type="email"
              placeholder="your@email.here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              required
            />
            <button type="submit">Subscribe →</button>
          </div>
          <div className="signup-note">Release news &amp; tour dates when they exist. Nothing else.</div>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <>
      <div className="colossal-wrap">
        <div className="colossal">AIR <span className="italic-swash" style={{ color: "var(--magenta)" }}>apparent</span></div>
      </div>
      <div className="colossal-jp-wrap">
        <div className="colossal-jp">未来をみたい</div>
      </div>
      <footer className="footer">
        <div className="col">
          <div className="col-title">Listen · 聴く</div>
          <a href={LINKS.smartlink} target="_blank" rel="noopener">All DSPs ↗</a>
          <a href={LINKS.spotify} target="_blank" rel="noopener">Spotify</a>
          <a href={LINKS.apple} target="_blank" rel="noopener">Apple Music</a>
          <a href={LINKS.soundcloud} target="_blank" rel="noopener">SoundCloud</a>
          <a href={LINKS.bandcamp} target="_blank" rel="noopener">Bandcamp</a>
          <a href={LINKS.youtube} target="_blank" rel="noopener">YouTube</a>
        </div>
        <div className="col">
          <div className="col-title">Follow · 追う</div>
          <a href={LINKS.instagram} target="_blank" rel="noopener">Instagram</a>
          <a href={LINKS.tiktok} target="_blank" rel="noopener">TikTok</a>
        </div>
        <div className="col">
          <div className="col-title">Business · 仕事</div>
          <a href={LINKS.epk}>EPK ↗</a>
          <a href={`mailto:${LINKS.bookingEmail}`}>Booking</a>
          <a href={`mailto:${LINKS.pressEmail}`}>Press</a>
        </div>
        <div className="col" style={{ textAlign: "right" }}>
          <div className="col-title">© '26</div>
          <div>AIR APPARENT</div>
          <div>Brooklyn, NY</div>
          <div style={{ opacity: 0.5 }}>All rights reserved</div>
        </div>
      </footer>
    </>
  );
}
