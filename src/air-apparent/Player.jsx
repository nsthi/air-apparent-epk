import React, { useContext, useEffect, useRef, useState } from "react";
import { PlayerCtx } from "./PlayerContext.jsx";
import { TRACKS, LINKS, EMBEDS } from "./data.js";

// The widget loads the public "our june" SoundCloud set.
const SC_WIDGET_URL = EMBEDS.soundcloudSet;

function useSCWidget(iframeRef) {
  const [widget, setWidget] = useState(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [scTrack, setScTrack] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!iframeRef.current) return;
    let cancelled = false;
    const load = () => {
      if (!window.SC || !iframeRef.current) return;
      const w = window.SC.Widget(iframeRef.current);
      if (cancelled) return;
      setWidget(w);
      const snapshot = () => {
        w.getCurrentSound((s) => {
          if (s) setScTrack({
            title: s.title, artist: s.user?.username,
            artwork: (s.artwork_url || s.user?.avatar_url || "").replace("-large", "-t500x500"),
            permalink: s.permalink_url,
          });
          w.getDuration((d) => setDuration(d));
        });
        w.getCurrentSoundIndex((i) => setActiveIdx(i));
      };
      w.bind(window.SC.Widget.Events.READY, () => {
        setReady(true);
        snapshot();
      });
      w.bind(window.SC.Widget.Events.PLAY, () => { setPlaying(true); snapshot(); });
      w.bind(window.SC.Widget.Events.PAUSE, () => setPlaying(false));
      w.bind(window.SC.Widget.Events.FINISH, () => setPlaying(false));
      w.bind(window.SC.Widget.Events.PLAY_PROGRESS, (e) => {
        setProgress(e.relativePosition);
        setPosition(e.currentPosition);
        if (e.loadedProgress > 0) w.getDuration((d) => setDuration(d));
      });
    };
    if (window.SC) load();
    else {
      const existing = document.querySelector('script[data-sc-api="1"]');
      if (existing) existing.addEventListener("load", load);
      else {
        const s = document.createElement("script");
        s.src = "https://w.soundcloud.com/player/api.js";
        s.async = true;
        s.dataset.scApi = "1";
        s.onload = load;
        document.head.appendChild(s);
      }
    }
    return () => { cancelled = true; };
  }, []);

  const togglePlay = React.useCallback(() => {
    if (!widget) return;
    widget.isPaused((paused) => { paused ? widget.play() : widget.pause(); });
  }, [widget]);

  const skipTo = React.useCallback((i) => {
    if (!widget) return;
    widget.skip(i);
    widget.play();
    setActiveIdx(i);
  }, [widget]);

  const next = React.useCallback(() => widget && widget.next(), [widget]);
  const prev = React.useCallback(() => widget && widget.prev(), [widget]);
  const seekRatio = React.useCallback((r) => {
    if (!widget || !duration) return;
    widget.seekTo(Math.max(0, Math.min(1, r)) * duration);
  }, [widget, duration]);

  return { ready, playing, progress, duration, position, scTrack, activeIdx,
           togglePlay, skipTo, next, prev, seekRatio };
}

const fmtMs = (ms) => {
  if (!ms || !isFinite(ms)) return "00:00";
  const s = Math.floor(ms / 1000);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
};

export function Player() {
  const iframeRef = useRef(null);
  const ctx = useContext(PlayerCtx);
  const sc = useSCWidget(iframeRef);

  // When a SoundCloud-less track (Long Distance / Time Heals) is selected,
  // we swap the SC custom player for an inline Spotify embed. We still need
  // to track which album row is "active" so the tracklist highlights it.
  const [spotifyTrackIdx, setSpotifyTrackIdx] = useState(null);

  // Album-track index (0..4). If a Spotify track is selected, that wins.
  // Otherwise map the SC widget's current index back to an Our June track.
  const scAlbumIdx = TRACKS.findIndex((t) => t.scIdx === sc.activeIdx);
  const albumIdx = spotifyTrackIdx != null ? spotifyTrackIdx : scAlbumIdx;

  useEffect(() => { ctx.setActive(Math.max(0, albumIdx)); }, [albumIdx]);
  useEffect(() => {
    // If Spotify is in control, SC isn't playing. Treat spotify-mode as
    // "not playing" for external context consumers (mini bar, obi).
    const playing = spotifyTrackIdx == null && sc.playing;
    ctx.__setPlaying?.(playing);
    ctx.__setProgress?.(spotifyTrackIdx == null ? sc.progress : 0);
    if (playing && !ctx.everPlayed) ctx.__setEverPlayed?.(true);
  }, [sc.playing, sc.progress, spotifyTrackIdx]);

  // Pause SC when switching to a Spotify track so audio doesn't stack.
  useEffect(() => {
    if (spotifyTrackIdx != null && sc.playing) sc.togglePlay();
  }, [spotifyTrackIdx]);

  useEffect(() => {
    ctx.__attachControls?.({
      togglePlay: sc.togglePlay, next: sc.next, prev: sc.prev,
      // Expose an album-indexed skipTo to the rest of the app (mini bar, obi).
      skipTo: (albumI) => {
        const t = TRACKS[albumI];
        if (!t) return;
        if (t.scIdx >= 0) {
          setSpotifyTrackIdx(null);
          sc.skipTo(t.scIdx);
        } else {
          setSpotifyTrackIdx(albumI);
        }
      },
      seekRatio: sc.seekRatio,
    });
  }, [sc.togglePlay, sc.next, sc.prev, sc.skipTo, sc.seekRatio]);

  // Pick the track shown in the "now playing" hero area.
  const shownIdx = albumIdx >= 0 ? albumIdx : 0;
  const track = TRACKS[shownIdx];
  const titleParts = track.title.split(track.titleEm);
  const isArchive = spotifyTrackIdx == null && scAlbumIdx < 0 && sc.playing;
  const isSpotify = spotifyTrackIdx != null;
  const displayTitle = isSpotify ? track.title : (sc.scTrack?.title || track.title);
  const displayArtwork = isSpotify ? null : sc.scTrack?.artwork;

  const onProgressClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    sc.seekRatio((e.clientX - r.left) / r.width);
  };

  const onTrackClick = (albumI) => {
    const t = TRACKS[albumI];
    if (!t) return;
    if (t.scIdx >= 0) {
      if (!sc.ready) return;
      setSpotifyTrackIdx(null);
      sc.skipTo(t.scIdx);
    } else {
      setSpotifyTrackIdx(albumI);
    }
  };

  // Relative album-track skip. Wraps 0..4 and routes each step to the
  // correct player (SC or Spotify) based on the target track's scIdx.
  const goToAlbum = (delta) => {
    const base = albumIdx >= 0 ? albumIdx : 0;
    const next = (base + delta + TRACKS.length) % TRACKS.length;
    onTrackClick(next);
  };
  const albumNext = () => goToAlbum(1);
  const albumPrev = () => goToAlbum(-1);

  return (
    <section className="section" id="listen" data-screen-label="02 Listen">
      <div className="section-head">
        <div className="num">02 / LISTEN <span className="kanji">聴く</span></div>
        <h2 className="title">The record, <em>playing</em></h2>
        <div className="right">Drop the needle<br/><span className="jp">針を落とす</span></div>
      </div>

      <div className="deck">
        <div className="deck-wrap">
          <div className={`now-playing ${sc.playing ? "is-playing" : ""}`}>
            <div className="np-head">
              <div className="badge"><span className="rec" /> {sc.playing ? "Now Playing" : (sc.ready ? "Cued Up" : "Loading SoundCloud…")}</div>
              <div>
                AIR APPARENT · SoundCloud
                <span className="jp-sub" style={{ marginLeft: 14 }}>公式</span>
              </div>
            </div>

            <div className="np-body">
              <div className="np-track-num">
                Track № {String(shownIdx + 1).padStart(2, "0")}
                {displayArtwork && <img src={displayArtwork} alt="" className="np-art-inline" />}
              </div>
              <div className="np-title-wrap">
                <div className="np-title">
                  {isArchive
                    ? <span>{displayTitle}</span>
                    : <>{titleParts[0]}<span className="accent">{track.titleEm}</span>{titleParts[1]}</>}
                </div>
                <div className="np-jp-title">{isArchive ? "過去作より" : track.jp}</div>
                <div className="np-sc-actual" title={displayTitle}>
                  <span className="mono-label" style={{ color: "var(--magenta)", opacity: 0.8 }}>
                    {isArchive ? "From the archive · SC ↗" : "SC ↗"}
                  </span>{" "}
                  <span style={{ opacity: 0.85 }}>{displayTitle}</span>
                </div>
              </div>
            </div>

            <div className="np-player">
              {isSpotify ? (
                /* Spotify inline embed — used for tracks not on the public
                   SC profile (Long Distance, Time Heals). Users get a real
                   player without leaving the page. */
                <div className="np-spotify-wrap">
                  <iframe
                    className="np-spotify"
                    src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`}
                    title={`${track.title} — Spotify player`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="np-controls">
                  <button className="np-btn" aria-label="Previous track" onClick={albumPrev} disabled={!sc.ready}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5v14M19 5l-10 7 10 7V5z"/></svg>
                  </button>
                  <button className="np-btn play" aria-label="Play/Pause" onClick={sc.togglePlay} disabled={!sc.ready}>
                    {sc.playing ? (
                      <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7L7 5z"/></svg>
                    )}
                  </button>
                  <button className="np-btn" aria-label="Next track" onClick={albumNext} disabled={!sc.ready}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 5v14M5 5l10 7L5 19V5z"/></svg>
                  </button>

                  <div className="np-progress" onClick={onProgressClick}>
                    <div className="np-progress-fill" style={{ width: `${sc.progress * 100}%` }} />
                  </div>

                  <div className="np-time">
                    <span className="cur">{fmtMs(sc.position)}</span>
                    <span style={{ opacity: 0.4 }}>/</span>
                    <span>{fmtMs(sc.duration)}</span>
                  </div>
                </div>
              )}

              <div className="np-links" style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                <a className="btn btn-ghost" href={LINKS.bandcampAlbum} target="_blank" rel="noopener">Buy on Bandcamp ↗</a>
                <a className="btn btn-ghost" href={LINKS.spotifyAlbum} target="_blank" rel="noopener">Spotify</a>
                <a className="btn btn-ghost" href={LINKS.appleAlbum} target="_blank" rel="noopener">Apple Music</a>
                <a className="btn btn-ghost" href={LINKS.soundcloudSet} target="_blank" rel="noopener">SoundCloud ↗</a>
              </div>
            </div>

            {/* SoundCloud widget — audio engine. CSS moves this off-screen
                so only the custom UI is visible. Must stay in the DOM for
                Widget API postMessage. */}
            <iframe
              ref={iframeRef}
              title="AIR APPARENT SoundCloud player"
              src={SC_WIDGET_URL}
              width="100%"
              height="120"
              frameBorder="0"
              allow="autoplay"
              className="sc-iframe"
            />
          </div>

          <div className="track-dial">
            <div className="dial-head">
              <span><span className="kanji-label">曲目</span> — Tracklist</span>
              <span className="count">{String(Math.max(1, shownIdx + 1)).padStart(2, "0")} / {String(TRACKS.length).padStart(2, "0")}</span>
            </div>
            <div className="track-list">
              {TRACKS.map((t, i) => {
                const parts = t.title.split(t.titleEm);
                const isActive = i === albumIdx;
                const playable = t.scIdx >= 0;
                return (
                  <div key={t.n}
                    className={`track-row ${isActive ? "active" : ""} ${!sc.ready ? "is-disabled" : ""} ${!playable ? "is-linkout" : ""}`}
                    onClick={() => onTrackClick(i)}
                    role="button" tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onTrackClick(i); } }}
                  >
                    <div className="tr-num">{t.n}</div>
                    <div>
                      <div className="tr-title">
                        {isActive && sc.playing && (
                          <span className="tr-eq"><span/><span/><span/><span/></span>
                        )}
                        <span>{parts[0]}<em>{t.titleEm}</em>{parts[1]}</span>
                      </div>
                      <div className="tr-jp">{t.jp}</div>
                    </div>
                    <div className="tr-meta">
                      {playable ? t.mood : <span style={{ color: "var(--magenta)" }}>Spotify ↗</span>}
                    </div>
                    <div className="tr-dur">{t.dur}</div>
                  </div>
                );
              })}
            </div>
            <div className="dial-foot">
              <span className="mono-label" style={{ opacity: 0.6 }}>
                3 of 5 play here via SoundCloud. 2 tracks stream only on the full EP — tap to open Spotify.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MiniBar() {
  const ctx = useContext(PlayerCtx);
  const { activeIdx, playing, progress, togglePlay, next, prev, seekRatio, everPlayed } = ctx;
  const track = TRACKS[Math.max(0, Math.min(activeIdx ?? 0, TRACKS.length - 1))];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const deck = document.getElementById("listen");
      if (!deck) return;
      const r = deck.getBoundingClientRect();
      const pastDeck = r.bottom < window.innerHeight * 0.3;
      setVisible(everPlayed && pastDeck);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [everPlayed]);

  if (!visible) return null;

  const titleText = track.title.split(track.titleEm);
  const onProgressClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    seekRatio && seekRatio((e.clientX - r.left) / r.width);
  };

  return (
    <div className="mini-bar" role="complementary" aria-label="Now playing">
      <div className="mb-art" aria-hidden="true">
        <div className={`mb-disc ${playing ? "spin" : ""}`} />
      </div>
      <div className="mb-info">
        <div className="mb-title">
          {titleText[0]}<em>{track.titleEm}</em>{titleText[1]}
        </div>
        <div className="mb-sub">{track.jp} · {playing ? "Now playing" : "Paused"}</div>
      </div>
      <div className="mb-controls">
        <button className="mb-btn" onClick={prev} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M6 5v14M19 5l-10 7 10 7V5z"/></svg>
        </button>
        <button className="mb-btn play" onClick={togglePlay} aria-label="Play/Pause">
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M7 5v14l12-7L7 5z"/></svg>
          )}
        </button>
        <button className="mb-btn" onClick={next} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18 5v14M5 5l10 7L5 19V5z"/></svg>
        </button>
      </div>
      <div className="mb-progress" onClick={onProgressClick}>
        <div className="mb-fill" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}
