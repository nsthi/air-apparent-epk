// Inline DSP logo marks. Paint via currentColor.
import React from "react";

export const DSPLogos = {
  spotify: (s = 14) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.586 14.42a.62.62 0 0 1-.857.208c-2.35-1.435-5.308-1.76-8.79-.965a.622.622 0 1 1-.277-1.213c3.808-.87 7.077-.494 9.715 1.116a.62.62 0 0 1 .209.854zm1.224-2.723a.777.777 0 0 1-1.07.256c-2.687-1.652-6.785-2.13-9.965-1.166a.778.778 0 1 1-.45-1.49c3.632-1.1 8.147-.568 11.232 1.33a.778.778 0 0 1 .253 1.07zm.105-2.835c-3.223-1.913-8.54-2.09-11.618-1.156a.933.933 0 1 1-.54-1.786C9.285 7.003 15.154 7.21 18.86 9.412a.933.933 0 0 1-.945 1.61z"/></svg>
  ),
  apple: (s = 14) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M17.6 10.35c-.03-2.92 2.38-4.32 2.49-4.39-1.36-1.99-3.48-2.26-4.23-2.29-1.8-.18-3.51 1.06-4.43 1.06-.93 0-2.33-1.04-3.83-1.01-1.97.03-3.79 1.15-4.8 2.9-2.05 3.55-.52 8.8 1.47 11.69.98 1.42 2.13 3.01 3.63 2.95 1.46-.06 2.01-.94 3.78-.94 1.77 0 2.26.94 3.8.91 1.57-.03 2.56-1.44 3.52-2.87 1.11-1.65 1.57-3.25 1.59-3.33-.03-.01-3.05-1.17-3.08-4.65-.02-2.9 2.37-4.29 2.49-4.37zM14.77 3c.82-.99 1.37-2.36 1.21-3.73-1.17.05-2.59.77-3.44 1.75-.76.87-1.43 2.27-1.25 3.61 1.3.1 2.64-.66 3.48-1.63z"/></svg>
  ),
  youtubemusic: (s = 14) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M10 8.5v7l6-3.5-6-3.5z"/></svg>
  ),
  youtube: (s = 14) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M22 12c0-2.3-.3-3.8-.3-3.8-.3-1-.9-1.8-1.8-2-1.6-.4-8-.4-8-.4s-6.3 0-7.9.4c-.9.2-1.6 1-1.8 2-.3 1.5-.3 3.8-.3 3.8s0 2.3.3 3.8c.2 1 .9 1.8 1.8 2 1.6.4 7.9.4 7.9.4s6.4 0 8-.4c.9-.2 1.6-1 1.8-2 .3-1.5.3-3.8.3-3.8zm-12 3V9l5.2 3-5.2 3z"/></svg>
  ),
  amazonmusic: (s = 14) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M8 15a6 6 0 0 1 8 0M9 11a3 3 0 0 1 3-3M15 13a2 2 0 0 1-3 0" fill="none" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="8" r="0.9"/></svg>
  ),
  soundcloud: (s = 14) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M2 14c0-1 .4-1.8 1-1.8.5 0 1 .8 1 1.8s-.5 1.8-1 1.8C2.4 15.8 2 15 2 14zm2.8-2.6c0-1 .4-1.8.9-1.8s.9.8.9 1.8v5.2c0 1-.4 1.8-.9 1.8s-.9-.8-.9-1.8v-5.2zM7.5 10c0-1 .4-1.8.9-1.8s.9.8.9 1.8v7.6c0 1-.4 1.8-.9 1.8s-.9-.8-.9-1.8V10zm2.8-1.5c0-1 .4-1.8.9-1.8s.9.8.9 1.8v9.1c0 1-.4 1.8-.9 1.8s-.9-.8-.9-1.8V8.5zm2.8 10.6V7.8c.3-.2.7-.3 1-.3V19c-.3 0-.7-.1-1 .1zm2-11.8c.3-.1.7-.2 1-.2V19c-.3 0-.7-.1-1-.2V7.3zm2-.2c.3 0 .7 0 1 .1V19h-1V7.1zm5.4 9.5c0-.7-.3-1.4-.8-1.8.1-.4.2-.7.2-1.1 0-2-1.5-3.7-3.4-4V19h4.5c1 0 1.9-.9 1.9-2 0-.2 0-.3-.1-.4h-.1c-.6 0-1.1.3-1.4.7.8-.7 1.3-1.7 1.3-2.8 0-.5-.1-.9-.2-1.4.7.3 1.2 1.1 1.2 2.1z"/></svg>
  ),
  tidal: (s = 14) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M6 7l3 3-3 3-3-3 3-3zm6 0l3 3-3 3-3-3 3-3zm6 0l3 3-3 3-3-3 3-3zm-6 6l3 3-3 3-3-3 3-3z"/></svg>
  ),
  deezer: (s = 14) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><rect x="3" y="14" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/><rect x="11" y="14" width="3" height="3"/><rect x="15" y="14" width="3" height="3"/><rect x="19" y="14" width="3" height="3"/><rect x="15" y="10" width="3" height="3"/><rect x="19" y="10" width="3" height="3"/><rect x="19" y="6" width="3" height="3"/><rect x="11" y="10" width="3" height="3"/></svg>
  ),
  anghami: (s = 14) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M8 17l4-10 4 10M9.5 13h5" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg>
  ),
  bandcamp: (s = 14) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M2 18l6-12h14l-6 12H2z"/></svg>
  ),
};
