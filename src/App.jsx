import React, { useEffect, useState } from "react";
import AirApparentSite from "./air-apparent/index.jsx";
import EPKPage from "./EPKPage.jsx";

class ErrorBoundary extends React.Component {
  constructor(p) { super(p); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) {
    if (typeof console !== "undefined") console.error("App error:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, color: "#f2ecde", fontFamily: "JetBrains Mono, monospace", fontSize: 13, maxWidth: 640, margin: "80px auto" }}>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, marginBottom: 12 }}>Something broke.</h2>
          <p style={{ opacity: 0.7, marginBottom: 20 }}>Please reload. If it keeps happening, email <a href="mailto:neil@airapparentmusic.com" style={{ color: "#ff4fd8" }}>neil@airapparentmusic.com</a>.</p>
          <button onClick={() => { this.setState({ error: null }); window.location.reload(); }} style={{ background: "#ff4fd8", color: "#0b0514", border: 0, padding: "10px 16px", fontFamily: "inherit", cursor: "pointer", letterSpacing: "0.2em", textTransform: "uppercase" }}>Reload →</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Simple hash router: "#/epk" → EPK, anything else → artist site.
function useHashRoute() {
  const parse = () => {
    const h = (window.location.hash || "").replace(/^#/, "");
    if (h.startsWith("/epk")) return "epk";
    return "home";
  };
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const onHash = () => {
      setRoute(parse());
      // If the hash is just a section anchor (no slash), don't reset scroll — let the anchor work.
      // If it's a route change ("#/epk" vs "#/"), scroll to top.
      const h = (window.location.hash || "").replace(/^#/, "");
      if (h.startsWith("/")) window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export default function App() {
  const route = useHashRoute();
  return (
    <ErrorBoundary>
      {route === "epk" ? <EPKPage /> : <AirApparentSite />}
    </ErrorBoundary>
  );
}
