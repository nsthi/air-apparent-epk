import React, { useEffect } from "react";
import EPK from "../air_apparent_epk.jsx";
import useCursorRing from "./air-apparent/useCursorRing.js";
import "./air-apparent/styles.css";
import "./air-apparent/polish.css";
import "./epk-skin.css";

function EPKNav() {
  return (
    <header className="epk-nav unified-nav" role="navigation">
      <div className="left">
        <a href="#/" className="nav-brand" aria-label="AIR APPARENT home">
          <span className="en">AIR APPARENT</span>
          <em className="jp">エア・アパレント</em>
        </a>
      </div>
      <nav className="center">
        <a href="#/">← Main site</a>
        <a href="#/epk" aria-current="page">EPK</a>
        <a href="mailto:mgmt@airapparentmusic.com">Contact</a>
      </nav>
      <div className="right">
        <span className="nav-kit">Electronic Press Kit</span>
      </div>
    </header>
  );
}

function EPKFooterHome() {
  return (
    <div className="epk-footer-home">
      <a href="#/">← Back to AIR APPARENT</a>
      <span className="jp">未来をみたい</span>
    </div>
  );
}

export default function EPKPage() {
  useCursorRing();
  useEffect(() => {
    document.title = "AIR APPARENT — EPK";
    const body = document.body;
    body.classList.add("epk-root");
    return () => { body.classList.remove("epk-root"); };
  }, []);

  return (
    <>
      <EPKNav />
      <EPK />
      <EPKFooterHome />
    </>
  );
}
