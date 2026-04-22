import React, { useContext, useEffect, useState } from "react";
import { PlayerCtx } from "./PlayerContext.jsx";
import { TRACKS, LINKS, DSPS, DSPS_MORE } from "./data.js";
import { DSPLogos } from "./DSPLogos.jsx";

// ============================================================
// OBI — LIVE PLAYBACK CONSOLE (fixed left rail)
// ============================================================
export function Obi() {
  const ctx = useContext(PlayerCtx);
  const { playing, progress, activeIdx, togglePlay, skipTo, everPlayed } = ctx;
  const handlePlay = React.useCallback(() => {
    if (!everPlayed && skipTo) skipTo(0);
    else togglePlay && togglePlay();
  }, [everPlayed, skipTo, togglePlay]);
  const goPrev = React.useCallback(() => {
    const base = Math.max(0, activeIdx ?? 0);
    const next = (base - 1 + TRACKS.length) % TRACKS.length;
    skipTo && skipTo(next);
  }, [activeIdx, skipTo]);
  const goNext = React.useCallback(() => {
    const base = Math.max(0, activeIdx ?? 0);
    const next = (base + 1) % TRACKS.length;
    skipTo && skipTo(next);
  }, [activeIdx, skipTo]);
  const track = TRACKS[Math.max(0, Math.min(activeIdx ?? 0, TRACKS.length - 1))];
  const [section, setSection] = useState("01 / HERO");
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const sectionMap = [
      ["signup",   "08 / SUBSCRIBE"],
      ["about",    "07 / ABOUT"],
      ["press",    "06 / PRESS"],
      ["projects", "05 / PROJECTS"],
      ["videos",   "04 / VIDEO"],
      ["tour",     "03 / TOUR"],
      ["listen",   "02 / LISTEN"],
    ];
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      setScrollPct(Math.min(1, Math.max(0, pct)));
      const mid = window.innerHeight * 0.4;
      let active = "01 / HERO";
      for (const [id, label] of sectionMap) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < mid) { active = label; break; }
      }
      setSection(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const R = 42;
  const CIRC = 2 * Math.PI * R;
  const dashOffset = CIRC * (1 - (progress || 0));
  const titleParts = track.title.split(track.titleEm);

  return (
    <aside className="obi obi-v2" aria-label="Playback console">
      <div className="obi-head">
        <div className="obi-mark">AA</div>
        <div className="obi-scroll-rail" aria-hidden="true">
          <div className="obi-scroll-fill" style={{ height: `${scrollPct * 100}%` }} />
        </div>
      </div>

      <div className="obi-mid">
        <div className="obi-section-v">
          <span className="dotm" /> {section}
        </div>
      </div>

      <div className={`obi-console ${playing ? "is-playing" : ""}`}>
        <div className="obi-console-art" aria-hidden="true">
          <div className={`obi-disc-big ${playing ? "spin" : ""}`} />
          <svg className="obi-ring" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(242,236,222,0.15)" strokeWidth="2" />
            <circle cx="50" cy="50" r={R} fill="none" stroke="var(--magenta)"
              strokeWidth="2.5" strokeLinecap="round"
              strokeDasharray={CIRC} strokeDashoffset={dashOffset}
              transform="rotate(-90 50 50)"
              style={{ transition: "stroke-dashoffset 0.15s linear", filter: "drop-shadow(0 0 6px var(--magenta))" }}
            />
          </svg>
          <button className="obi-play-btn" onClick={handlePlay} aria-label="Play/Pause">
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M7 5v14l12-7L7 5z"/></svg>
            )}
          </button>
        </div>
        <div className="obi-np-title">
          {titleParts[0]}<em>{track.titleEm}</em>{titleParts[1]}
        </div>
        <div className="obi-np-jp">{track.jp}</div>
        <div className="obi-np-status">
          <span className={`obi-dot ${playing ? "on" : ""}`} /> {playing ? "Playing" : "Paused"}
        </div>
        {/* Transport controls — skip through the 5-track Our June album.
            Title + count shown on a separate line to fit the 72px rail. */}
        <div className="obi-track-pos">
          {String(Math.max(0, activeIdx ?? 0) + 1).padStart(2, "0")} / {String(TRACKS.length).padStart(2, "0")}
        </div>
        <div className="obi-transport" role="group" aria-label="Track controls">
          <button className="obi-skip" onClick={goPrev} aria-label="Previous track">
            <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11"><path d="M6 5v14M19 5l-10 7 10 7V5z"/></svg>
          </button>
          <button className="obi-skip" onClick={goNext} aria-label="Next track">
            <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11"><path d="M18 5v14M5 5l10 7L5 19V5z"/></svg>
          </button>
        </div>
      </div>

      <div className="obi-foot">
        <div className="obi-cat">AA·005 · '25</div>
        <div className="obi-kanji-small">未来をみたい</div>
      </div>
    </aside>
  );
}

// ============================================================
// TOPBAR
// ============================================================
export function Topbar() {
  return (
    <header className="topbar unified-nav">
      <div className="left">
        <a href="#/" className="nav-brand" aria-label="AIR APPARENT home">
          <span className="en">AIR APPARENT</span>
          <em className="jp">エア・アパレント</em>
        </a>
      </div>
      <nav className="center">
        <a href="#listen">Listen</a>
        <a href="#videos">Video</a>
        <a href="#projects">Catalog</a>
        <a href="#press">Press</a>
        <a href="#about">About</a>
        <a href="#/epk">EPK ↗</a>
      </nav>
      <div className="right">
        <span className="live-dot" />
        Our June <em style={{ color: "var(--magenta)", fontStyle: "italic" }}>out now</em>
      </div>
    </header>
  );
}

// ============================================================
// HERO
// ============================================================
export function Hero() {
  return (
    <section className="hero hero-v2" data-screen-label="01 Hero">
      <div className="hero-orbs" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>

      <div className="hero-eyebrow">
        <span className="eyebrow-dot" />
        <span>New EP · <em>our june</em> · out now</span>
        <span className="eyebrow-spacer" />
        <span className="eyebrow-kanji">私たちの六月</span>
      </div>

      <h1 className="hero-big">
        <span className="line-1">
          <span className="outline-word" data-word="AIR">AIR</span>
        </span>
        <span className="line-2">
          <span className="swash-word">apparent</span>
        </span>
      </h1>

      <div className="hero-cover">
        <div className="cover-frame">
          <img src="/assets/our-june-cover.jpg" alt="Our June — 2025 EP cover art" />
          <div className="cover-obi">
            <div className="cover-obi-inner">
              <span className="cover-obi-cat">AA-005</span>
              <span className="cover-obi-title">OUR JUNE · 私たちの六月</span>
              <span className="cover-obi-year">2025</span>
            </div>
          </div>
          <div className="cover-scan" aria-hidden="true" />
          <div className="cover-tick tl" /><div className="cover-tick tr" />
          <div className="cover-tick bl" /><div className="cover-tick br" />
        </div>
        <div className="cover-meta">
          <div className="cover-meta-row"><span className="k">TRACKS</span><span className="v">5 · <em>19:33</em></span></div>
          <div className="cover-meta-row"><span className="k">FORMAT</span><span className="v">EP · digital</span></div>
          <div className="cover-meta-row"><span className="k">CATALOG</span><span className="v">AA-005 · 2025</span></div>
        </div>
      </div>

      <div className="hero-lede">
        <p className="lede-body">
          <span className="dropcap">A</span>IR APPARENT — <em>exuberant</em> electronic pop out of Brooklyn. The new EP <em>Our June</em> was written on a solo trip through Japan: five songs about time zones, memory, and the small futures we keep folded in our pockets.
        </p>
        <div className="lede-credits">
          <span>Written &amp; produced by AIR APPARENT</span>
          <span>Written in Tokyo · Mixed and mastered in LA, SF and NY</span>
        </div>
      </div>

      <div className="hero-smart">
        <div className="smart-head">
          <div className="smart-eyebrow">LISTEN · <em>聴く</em></div>
          <a className="smart-all" href={LINKS.smartlink} target="_blank" rel="noopener">All DSPs ↗</a>
        </div>
        <div className="smart-grid">
          {DSPS.map((d) => (
            <a key={d.key} href={LINKS[d.key]} target="_blank" rel="noopener"
               className="smart-row" style={{ "--dsp": d.color }}>
              <span className="smart-logo">{DSPLogos[d.key] && DSPLogos[d.key](18)}</span>
              <span className="smart-name">{d.name}</span>
              <span className="smart-action">{d.action} ↗</span>
            </a>
          ))}
        </div>
        <SmartMore />
      </div>
    </section>
  );
}

function SmartMore() {
  const [open, setOpen] = useState(false);
  return (
    <div className="smart-more">
      <button className="smart-more-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? "−" : "+"} {open ? "Fewer" : "More DSPs"} <span className="jp-sub">プラットフォーム</span>
      </button>
      {open && (
        <div className="smart-grid" style={{ marginTop: 6 }}>
          {DSPS_MORE.map((d) => (
            <a key={d.key} href={LINKS[d.key]} target="_blank" rel="noopener"
               className="smart-row" style={{ "--dsp": d.color }}>
              <span className="smart-logo">{DSPLogos[d.key] && DSPLogos[d.key](18)}</span>
              <span className="smart-name">{d.name}</span>
              <span className="smart-action">{d.action} ↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// MARQUEE
// ============================================================
export function Marquee() {
  const items = [
    "AIR APPARENT",
    "·",
    <span className="jp-inline" key="jp1">未来をみたい</span>,
    "·",
    "Brooklyn, NY",
    "·",
    "Our June — EP '25",
    "·",
    <span className="jp-inline" key="jp2">エア・アパレント</span>,
    "·",
    "Synthwave · R&B · 80s funk",
    "·",
  ];
  const content = [];
  for (let i = 0; i < 3; i++) {
    items.forEach((t, j) => {
      content.push(<span key={`${i}-${j}`}>{t === "·" ? <span className="dot" /> : t}</span>);
    });
  }
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{content}{content}</div>
    </div>
  );
}

// Liner notes
export function LinerNotes() {
  return (
    <section className="liner" aria-label="Liner notes">
      <div className="liner-head">
        <div className="liner-eyebrow">Liner notes · <span className="jp-sub">ライナーノーツ</span></div>
        <div className="liner-side">Side A · 2025</div>
      </div>
      <div className="liner-body">
        <p>
          I wrote most of this in rooms that <em>weren't mine.</em>
          {" "}Tokyo hotel carpets, the 5am train to Oakland, a kitchen in Atlanta
          with a pilot light that wouldn't stay lit.
        </p>
        <p>
          The songs are about <em>time zones</em> and how strange it is that love
          has to cross them. About the small futures we keep to ourselves, folded
          into pockets, taken out in elevators.
        </p>
        <p>
          If you're listening to this on wax — thank you.
          If you're listening on your phone at 1am — same.
        </p>
        <div className="liner-sig">— AA · <span className="jp-sub">未来をみたい</span></div>
      </div>
    </section>
  );
}

// Intro overlay. Blocks the page until the visitor explicitly "drops the
// needle" — clicking anywhere triggers playback of track 01 and then
// dismisses the curtain. Persists dismissal in localStorage so returning
// visitors don't have to re-enter.
export function IntroOverlay() {
  const ctx = useContext(PlayerCtx);
  const [gone, setGone] = useState(() => {
    try { return localStorage.getItem("aa-intro-seen") === "1"; } catch { return false; }
  });
  const [dropping, setDropping] = useState(false);  // needle animation in progress
  const [leaving, setLeaving] = useState(false);    // curtain fade out

  // Block page scroll while the overlay is up so the page behind feels
  // truly "locked" until the user interacts.
  useEffect(() => {
    if (gone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [gone]);

  const dropTheNeedle = () => {
    if (dropping || leaving) return;
    setDropping(true);
    // Let the needle animation land (~650ms) before kicking off playback
    // and fading out — feels like a real cue.
    setTimeout(() => {
      ctx && ctx.skipTo && ctx.skipTo(0);
      setLeaving(true);
      setTimeout(() => {
        setGone(true);
        try { localStorage.setItem("aa-intro-seen", "1"); } catch {}
      }, 700);
    }, 650);
  };

  if (gone) return null;

  return (
    <div
      className={`intro-overlay ${leaving ? "leaving" : ""} ${dropping ? "dropping" : ""}`}
      onClick={dropTheNeedle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); dropTheNeedle(); } }}
      aria-label="Drop the needle to enter the site"
    >
      <div className="intro-stage">
        <div className="intro-disc"><div className="intro-disc-inner" /></div>
        <div className="intro-needle" />
        <div className="intro-text">
          <div className="intro-brand">AIR APPARENT</div>
          <div className="intro-jp">未来をみたい</div>
          <div className="intro-caption">
            {dropping
              ? <><span>Cueing track 01 · <span className="jp-sub">再生中</span></span></>
              : <><span>Drop the needle · <span className="jp-sub">針を落とす</span></span></>}
          </div>
        </div>
        <div className="intro-skip">
          {dropping ? "" : "Click or press Enter to play"}
        </div>
      </div>
    </div>
  );
}
