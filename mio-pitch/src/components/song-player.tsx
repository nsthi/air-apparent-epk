"use client";
import { useRef, useState } from "react";
import type { Track } from "@/lib/tracks";
export function SongPlayer({track}: {track:Track}) {
 const audio = useRef<HTMLAudioElement>(null);
 const eventId = useRef<string|null>(null);
 const counted = useRef(false);
 const [notice,setNotice] = useState("");
 async function recordStart() {
  if(counted.current || !eventId.current) return;
  counted.current=true;
  const body=JSON.stringify({trackId:track.id,eventId:eventId.current});
  for(let attempt=0;attempt<2;attempt++) {
   try {const r=await fetch("/private/mio-pitch/api/plays",{method:"POST",headers:{"Content-Type":"application/json"},body,keepalive:true});if(r.ok){setNotice("");return;} if(r.status<500)break;} catch {}
  }
  setNotice("Play count unavailable · 재생 수 기록 불가");
 }
 if(!track.audio) return <div className="audio-pending"><span className="pending-symbol">◌</span><div>Audio awaiting upload<span lang="ko">음원 업로드 대기 중</span></div></div>;
 return <div className="song-player"><audio ref={audio} controls preload="auto" src={track.audio} aria-label={`Listen to ${track.title}`} onPlay={()=>{eventId.current=crypto.randomUUID();counted.current=false;document.querySelectorAll("audio").forEach(a=>{if(a!==audio.current)a.pause();});}} onPlaying={()=>void recordStart()} onError={()=>setNotice("Audio could not load. Please try again. · 음원을 불러오지 못했어요. 다시 시도해 주세요.")} /><p role="status">{notice}</p></div>;
}
