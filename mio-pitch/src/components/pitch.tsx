"use client";
import { useState } from "react";
import { tracks } from "@/lib/tracks";
import { SongPlayer } from "@/components/song-player";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
export function Pitch({defaultLanguage="en"}: {defaultLanguage?:"en"|"ko"}) {
 const [lang,setLang]=useState<"en"|"ko">(defaultLanguage);
 const [selected,setSelected]=useState(tracks[0].id);
 const ko=lang==="ko";
 const current=tracks.find(t=>t.id===selected)!;
 return <main className="pitch" style={{"--track-color":current.color} as React.CSSProperties}>
 <header className="masthead"><span className="brand">AIR APPARENT</span><span className="edition">{ko?"MIO를 위한 선곡 / 2026":"PERSONALLY PICKED FOR MIO / 2026"}</span><div className="language" aria-label="Language"><button onClick={()=>setLang("en")} aria-pressed={!ko}>EN</button><button onClick={()=>setLang("ko")} aria-pressed={ko}>한국어</button></div></header>
 <section className="opening"><div className="poster-title"><span className="title-pre">PITCHES FOR</span><h1 aria-label="Pitches for Mio 2026">MIO<span className="year">20<br/>26</span><span className="period">.</span></h1></div><div className="opening-note" lang={lang}><p>{ko?"Mio 음악의 중심에는 R&B가 있다고 느껴요. 분위기는 조금씩 달라도 Mio의 사운드와 잘 어울리고, 어느 계절에 들어도 좋은 곡들을 몇 가지 골라봤어요.":"I wanted to give you some options for different moods that still feel like they could work for you and your R&B sound—songs that feel good in any season."}</p><span className="signoff">— AIR APPARENT</span></div><figure className="portrait"><img src="/private/mio-pitch/images/mio.webp" alt="Mio"/><figcaption>MIO / @miosaysmiao</figcaption></figure></section>
 <Tabs value={selected} onValueChange={setSelected} className="listening-room">
 <div className="selection-heading"><span>{ko?`${tracks.length}곡 / 골라서 들어보기`:`${String(tracks.length).padStart(2,"0")} TRACKS / TAKE YOUR PICK`}</span><a href="https://s.disco.ac/iukckhclkfkz" target="_blank" rel="noreferrer">{ko?"전체 플레이리스트 ↗":"Full Playlist ↗"}</a></div>
 <TabsList className="song-tabs" aria-label={ko?"곡 선택":"Choose a song"}>{tracks.map((t,i)=><TabsTrigger key={t.id} value={t.id}><span className="tab-number">0{i+1}</span>{t.title}</TabsTrigger>)}</TabsList>
 {tracks.map((t,i)=><TabsContent value={t.id} key={t.id} className="song-panel"><div className={`artwork artwork-${i}`}>
 {t.art&&<img src={t.art} alt={`${t.title} cover artwork`} width={1024} height={1024}/>}
 </div>
 <div className="song-copy" lang={lang}><div className="song-kicker"><span>{ko?t.mood.split(" / ")[1]:t.mood.split(" / ")[0]}</span><span>0{i+1}</span></div><h2>{t.title}</h2><p className="description">{ko?t.feelingKo:t.feeling}</p><div className="connection"><span className="connection-label">{ko?"이 곡을 고른 이유":"WHY THIS ONE"}</span>{t.reference && <a className="reference" href={t.referenceUrl} target="_blank" rel="noreferrer">{t.reference} ↗</a>}<p>{ko?t.fitKo:t.fit}</p></div><SongPlayer key={t.id} track={t}/></div></TabsContent>)}
 </Tabs>
 <footer><span>{ko?"어떤 곡이 마음에 드는지 궁금해요.":"Would love to know which ones you’re feeling."} <b>— AIR APPARENT</b></span><details><summary>{ko?"크레딧 및 안내":"Credits & notes"}</summary><p>{ko?"곡 소개와 기존 곡에 대한 생각은 AIR APPARENT의 개인적인 의견입니다. 가사를 인용한 것이 아닙니다.":"Song descriptions and connections to Mio’s catalogue are AIR APPARENT’s personal take, not lyric quotations."}</p><p>{ko?"사진: ":"Portrait: "}<a href="https://kpopping.com/profiles/idol/MIO2">Kpopping</a>. {ko?"아트워크: AIR APPARENT.":"Artwork supplied by AIR APPARENT."}</p></details></footer>
 </main>;
}
