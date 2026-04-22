import React, { useContext, useEffect, useRef, useState } from "react";
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
  const [section, setSection] = useState("01 / HOME");
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
      let active = "01 / HOME";
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
        <div className="obi-cat">
          <span className="obi-cat-id">AA · 005</span>
          <span className="obi-cat-year">2025</span>
        </div>
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

// Intro overlay — curtain-drop metaphor.
//   phase 'ready'   → full-screen curtain (top+bottom panels meet at the seam)
//   phase 'lifting' → top slides up, bottom slides down, revealing the site
// Click anywhere, Enter, Space, or Escape to lift. Persists via localStorage.
export function IntroOverlay() {
  const [gone, setGone] = useState(() => {
    try { return localStorage.getItem("aa-intro-seen") === "1"; } catch { return false; }
  });
  const [phase, setPhase] = useState("ready");

  const lift = React.useCallback(() => {
    if (phase !== "ready") return;
    setPhase("lifting");
    setTimeout(() => {
      setGone(true);
      try { localStorage.setItem("aa-intro-seen", "1"); } catch {}
    }, 900);
  }, [phase]);

  useEffect(() => {
    if (gone) return;
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault();
        lift();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gone, lift]);

  // Block page scroll while the overlay is up.
  useEffect(() => {
    if (gone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [gone]);

  if (gone) return null;

  return (
    <div
      className={`intro-overlay p-${phase}`}
      role="dialog"
      aria-label="Welcome"
      onClick={lift}
    >
      {/* Top curtain panel */}
      <div className="curtain curtain-top">
        <div className="curtain-inner">
          <div className="intro-noise" />
          <div className="intro-grid" />

          <div className="intro-top">
            <div className="intro-meta">
              <span className="intro-cat">AA—005</span>
              <span className="intro-sep">·</span>
              <span>AIR APPARENT RECORDS</span>
              <span className="intro-sep">·</span>
              <span className="jp-sub">レコード</span>
            </div>
            <div className="intro-top-r">EST. 2017 · BROOKLYN</div>
          </div>

          <div className="intro-hero">
            <div className="intro-eyebrow">
              SIDE A · <span className="jp-sub">A面</span> · NEW RELEASE
            </div>
            <div className="intro-brand">AIR<br/>APPARENT</div>
            <div className="intro-jp">未来をみたい</div>
          </div>
        </div>
      </div>

      {/* Bottom curtain panel */}
      <div className="curtain curtain-bot">
        <div className="curtain-inner">
          <div className="intro-noise" />

          <TurntableArt phase={phase} />

          <div className="intro-bot">
            <div className="intro-bot-l">
              <span className="live-dot" /> NEW EP · <em>OUT NOW</em>
            </div>
            <div className="intro-enter-hint">
              <span className="enter-pulse" />
              <span className="enter-label">
                CLICK OR PRESS <kbd>ENTER</kbd> TO ENTER
              </span>
              <span className="enter-jp jp-sub">入場</span>
            </div>
            <div className="intro-bot-r">
              LIMITED EDITION · <span className="jp-sub">限定盤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seam glow at the middle — dramatic curtain crack of light */}
      <div className="curtain-seam" />
    </div>
  );
}

// Proper vinyl turntable: platter, disc with grooves, S-curve tonearm,
// counterweight, pivot, headshell, cueing lever. Rendered entirely in SVG
// so it crisp at any size.
function TurntableArt() {
  return (
    <svg className="tt-svg" viewBox="0 110 520 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="tt-platter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a0e2e"/>
          <stop offset="70%" stopColor="#0f0820"/>
          <stop offset="100%" stopColor="#050210"/>
        </radialGradient>
        <radialGradient id="tt-disc" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1b0f28"/>
          <stop offset="40%" stopColor="#0a0512"/>
          <stop offset="100%" stopColor="#040108"/>
        </radialGradient>
        <radialGradient id="tt-label" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6FDE"/>
          <stop offset="100%" stopColor="#D633B0"/>
        </radialGradient>
        <linearGradient id="tt-rim" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(242,236,222,0.25)"/>
          <stop offset="50%" stopColor="rgba(242,236,222,0)"/>
          <stop offset="100%" stopColor="rgba(242,236,222,0.15)"/>
        </linearGradient>
        <linearGradient id="tt-arm-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8e2cf"/>
          <stop offset="50%" stopColor="#b0a996"/>
          <stop offset="100%" stopColor="#6b6352"/>
        </linearGradient>
        <radialGradient id="tt-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.6)"/>
          <stop offset="70%" stopColor="rgba(0,0,0,0.15)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
      </defs>

      {/* Plinth */}
      <rect x="20" y="140" width="480" height="210" rx="14" fill="#0a0514" stroke="rgba(242,236,222,0.12)" strokeWidth="1"/>
      <rect x="20" y="140" width="480" height="210" rx="14" fill="url(#tt-rim)" opacity="0.35"/>
      <rect x="32" y="152" width="456" height="186" rx="8" fill="#06020f" stroke="rgba(154,91,255,0.15)" strokeWidth="1"/>

      {/* Pitch slider */}
      <g transform="translate(62, 280)">
        <rect x="0" y="0" width="90" height="6" rx="3" fill="#16092a" stroke="rgba(242,236,222,0.15)" strokeWidth="0.5"/>
        <rect x="40" y="-4" width="10" height="14" rx="2" fill="#c8c1ad"/>
      </g>
      <text x="62" y="306" fontFamily="ui-monospace, monospace" fontSize="7" letterSpacing="0.2em" fill="#887d68">PITCH −8 · 0 · +8</text>

      {/* Power + speed selector */}
      <g transform="translate(62, 178)">
        <circle cx="8" cy="8" r="6" fill="#1a0e2e" stroke="#FF4FD8" strokeWidth="1"/>
        <circle cx="8" cy="8" r="2.5" fill="#FF4FD8"/>
      </g>
      <text x="62" y="204" fontFamily="ui-monospace, monospace" fontSize="7" letterSpacing="0.2em" fill="#887d68">POWER</text>
      <g transform="translate(62, 220)">
        <rect x="0" y="0" width="18" height="10" rx="1" fill="#16092a" stroke="rgba(242,236,222,0.2)" strokeWidth="0.5"/>
        <text x="9" y="7.5" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6" fill="#F2ECDE">33</text>
        <rect x="22" y="0" width="18" height="10" rx="1" fill="#1a0e2e" stroke="rgba(242,236,222,0.08)" strokeWidth="0.5"/>
        <text x="31" y="7.5" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6" fill="#887d68">45</text>
      </g>

      {/* Strobe dots */}
      <g opacity="0.5">
        {Array.from({ length: 32 }).map((_, i) => {
          const a = (i / 32) * Math.PI * 2;
          const cx = 240 + Math.cos(a) * 126;
          const cy = 240 + Math.sin(a) * 126;
          return <circle key={i} cx={cx} cy={cy} r="1" fill="#887d68" />;
        })}
      </g>

      <ellipse cx="240" cy="248" rx="128" ry="18" fill="url(#tt-shadow)"/>

      {/* Platter */}
      <circle cx="240" cy="240" r="124" fill="url(#tt-platter)" stroke="rgba(242,236,222,0.18)" strokeWidth="1"/>
      <circle cx="240" cy="240" r="124" fill="url(#tt-rim)" opacity="0.3"/>
      <circle cx="240" cy="240" r="118" fill="#0a0414" opacity="0.85"/>

      {/* Spinning disc */}
      <g className="tt-disc-group">
        <circle cx="240" cy="240" r="112" fill="url(#tt-disc)"/>
        {[108, 100, 92, 84, 76, 68, 60, 52].map((r) => (
          <circle key={r} cx="240" cy="240" r={r} fill="none" stroke="rgba(242,236,222,0.05)" strokeWidth="0.5"/>
        ))}
        {Array.from({ length: 60 }).map((_, i) => (
          <circle key={"g" + i} cx="240" cy="240" r={50 + i * 1.05} fill="none" stroke="rgba(10,4,20,0.6)" strokeWidth="0.3" />
        ))}
        <ellipse cx="210" cy="210" rx="80" ry="30" fill="rgba(255,79,216,0.06)" transform="rotate(-30 210 210)"/>
        <circle cx="240" cy="240" r="40" fill="url(#tt-label)"/>
        <circle cx="240" cy="240" r="40" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5"/>
        <text x="240" y="222" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="6" fontWeight="700" letterSpacing="0.15em" fill="#0B0514">AIR APPARENT</text>
        <text x="240" y="243" textAnchor="middle" fontFamily="'Noto Serif JP', serif" fontSize="11" fontWeight="900" fill="#0B0514">未来をみたい</text>
        <text x="240" y="257" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="5" letterSpacing="0.3em" fill="rgba(11,5,20,0.7)">33⅓ RPM</text>
        <circle cx="240" cy="240" r="3" fill="#0B0514"/>
        <circle cx="240" cy="240" r="1.5" fill="#FF4FD8"/>
      </g>

      {/* Tonearm */}
      <g className="tt-arm-group">
        <circle cx="430" cy="180" r="22" fill="#0a0514" stroke="rgba(242,236,222,0.25)" strokeWidth="1"/>
        <circle cx="430" cy="180" r="18" fill="#16092a"/>
        <circle cx="430" cy="180" r="12" fill="url(#tt-arm-metal)"/>
        <circle cx="430" cy="180" r="6" fill="#2a1d40" stroke="rgba(242,236,222,0.3)" strokeWidth="0.5"/>
        <g opacity="0.9">
          <rect x="458" y="178" width="24" height="4" rx="1" fill="#0a0514" stroke="rgba(242,236,222,0.2)" strokeWidth="0.5"/>
          <rect x="478" y="172" width="4" height="16" rx="1" fill="#0a0514" stroke="rgba(242,236,222,0.2)" strokeWidth="0.5"/>
        </g>
        <g transform="translate(395, 195)">
          <rect x="0" y="0" width="4" height="14" rx="1" fill="#0a0514"/>
          <circle cx="2" cy="0" r="3" fill="#c8c1ad"/>
        </g>
        <rect x="448" y="176" width="34" height="4" rx="2" fill="url(#tt-arm-metal)" transform="rotate(-18 430 180)"/>
        <g transform="rotate(-18 430 180)">
          <ellipse cx="478" cy="178" rx="10" ry="9" fill="#1a1410" stroke="rgba(242,236,222,0.25)" strokeWidth="1"/>
          <ellipse cx="478" cy="178" rx="10" ry="9" fill="url(#tt-rim)" opacity="0.4"/>
          <line x1="473" y1="172" x2="473" y2="184" stroke="rgba(242,236,222,0.2)" strokeWidth="0.5"/>
          <line x1="478" y1="172" x2="478" y2="184" stroke="rgba(242,236,222,0.2)" strokeWidth="0.5"/>
          <line x1="483" y1="172" x2="483" y2="184" stroke="rgba(242,236,222,0.2)" strokeWidth="0.5"/>
        </g>
        <circle cx="410" cy="162" r="4" fill="#0a0514" stroke="rgba(242,236,222,0.25)" strokeWidth="0.5"/>
        <circle cx="410" cy="162" r="2" fill="#FF4FD8" opacity="0.7"/>
        <path d="M 430 180 C 400 170, 360 175, 320 200 C 290 218, 270 230, 258 240" fill="none" stroke="url(#tt-arm-metal)" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M 430 180 C 400 170, 360 175, 320 200 C 290 218, 270 230, 258 240" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round"/>
        <g transform="translate(258, 240) rotate(35)">
          <rect x="-4" y="-8" width="22" height="14" rx="2" fill="#0a0514" stroke="rgba(242,236,222,0.3)" strokeWidth="1"/>
          <rect x="-4" y="-8" width="22" height="14" rx="2" fill="url(#tt-rim)" opacity="0.4"/>
          <circle cx="0" cy="-4" r="1" fill="#c8c1ad"/>
          <circle cx="0" cy="4" r="1" fill="#c8c1ad"/>
          <rect x="4" y="-5" width="10" height="10" rx="1" fill="#FF4FD8" opacity="0.85"/>
          <rect x="14" y="-0.5" width="5" height="1" fill="#e8e2cf"/>
          <circle cx="19.5" cy="0" r="0.8" fill="#FFD700"/>
        </g>
      </g>
    </svg>
  );
}
