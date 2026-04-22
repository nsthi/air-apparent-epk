import { useEffect } from "react";

// Custom cursor ring — expands on interactive elements. Matches the hover
// target list from the original design prototype.
export default function useCursorRing() {
  useEffect(() => {
    if (document.querySelector(".cursor-ring")) return; // avoid double-mount
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.appendChild(ring);

    const onMove = (e) => {
      document.body.classList.add("has-cursor");
      ring.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };
    const selector = [
      "button", "a", "input", "textarea",
      ".track-row", ".video-card", ".short-card", ".project-row",
      ".tl-card", ".mb-btn", ".np-btn", ".smart-row", ".press-row",
      ".cell a",
      // EPK selectors
      ".pill-link", ".pill", ".vid", ".cta", ".social-btn", ".stat-num",
    ].join(", ");
    const onOver = (e) => {
      const t = e.target.closest(selector);
      ring.classList.toggle("expand", !!t);
    };
    const onTouch = () => { ring.style.display = "none"; };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    window.addEventListener("touchstart", onTouch, { once: true, passive: true });

    return () => {
      ring.remove();
      document.body.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);
}
