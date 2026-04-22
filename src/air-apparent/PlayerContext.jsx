import React, { createContext, useCallback, useContext, useRef, useState } from "react";

export const PlayerCtx = createContext(null);

export function PlayerProvider({ children }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [everPlayed, setEverPlayed] = useState(false);
  const controlsRef = useRef({});

  const setActive = useCallback((i) => setActiveIdx(i), []);
  const togglePlay = useCallback(() => controlsRef.current.togglePlay?.(), []);
  const next = useCallback(() => controlsRef.current.next?.(), []);
  const prev = useCallback(() => controlsRef.current.prev?.(), []);
  const skipTo = useCallback((i) => controlsRef.current.skipTo?.(i), []);
  const seekRatio = useCallback((r) => controlsRef.current.seekRatio?.(r), []);

  return (
    <PlayerCtx.Provider
      value={{
        activeIdx, playing, progress, everPlayed,
        setActive, togglePlay, next, prev, skipTo, seekRatio,
        __setPlaying: setPlaying,
        __setProgress: setProgress,
        __setEverPlayed: setEverPlayed,
        __attachControls: (c) => { controlsRef.current = c; },
      }}
    >
      {children}
    </PlayerCtx.Provider>
  );
}

export const usePlayer = () => useContext(PlayerCtx);
