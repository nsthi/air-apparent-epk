import React, { useEffect } from "react";
import { PlayerProvider } from "./PlayerContext.jsx";
import { Hero, Obi, Topbar, Marquee, LinerNotes, IntroOverlay } from "./Hero.jsx";
import { Player, MiniBar } from "./Player.jsx";
import { Tour, Videos, Projects, Press, About, Signup, Footer } from "./Sections.jsx";
import useCursorRing from "./useCursorRing.js";

import "./styles.css";
import "./components.css";
import "./styles-v2.css";
import "./polish.css";

export default function AirApparentSite() {
  useCursorRing();

  useEffect(() => {
    document.title = "AIR APPARENT — 未来をみたい";
    const body = document.body;
    body.classList.add("aa-root");
    return () => { body.classList.remove("aa-root"); };
  }, []);

  return (
    <PlayerProvider>
      <Obi />
      <div className="page">
        <Topbar />
        <Hero />
        <Marquee />
        <Player />
        <LinerNotes />
        <Tour />
        <Videos />
        <Projects />
        <Press />
        <About />
        <Signup />
        <Footer />
      </div>
      <MiniBar />
      <IntroOverlay />
    </PlayerProvider>
  );
}
