import { timingSafeEqual } from 'node:crypto';
import { tracks } from './src/lib/tracks.ts';

const base = '/private/mio-pitch';
const excluded = '6b0cd9f3-2046-4261-bdb3-193f154cbf11';
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = (data, status = 200) => Response.json(data, {status, headers:{'Cache-Control':'no-store'}});
async function owner(request, env) {
 if (!env.ADMIN_PASSWORD) return false;
 let decoded;
 try {const h=request.headers.get('Authorization') || ''; if(!h.startsWith('Basic ')) return false; decoded=atob(h.slice(6));} catch {return false;}
 const encoder=new TextEncoder();
 const [a,b]=await Promise.all([decoded,`neil:${env.ADMIN_PASSWORD}`].map(s=>crypto.subtle.digest('SHA-256',encoder.encode(s))));
 return timingSafeEqual(new Uint8Array(a),new Uint8Array(b));
}
async function admin(request,env) {
 if(!await owner(request,env)) return new Response('Owner sign-in required.',{status:401,headers:{'WWW-Authenticate':'Basic realm="AIR APPARENT listening activity", charset="UTF-8"','Cache-Control':'no-store'}});
 const [totals, recent, locations]=await env.DB.batch([
  env.DB.prepare('SELECT track_id,COUNT(*) plays FROM play_events WHERE event_id != ? GROUP BY track_id').bind(excluded),
  env.DB.prepare('SELECT * FROM play_events WHERE event_id != ? ORDER BY played_at DESC,rowid DESC LIMIT 100').bind(excluded),
  env.DB.prepare('SELECT city,region,country,COUNT(*) plays FROM play_events WHERE event_id != ? GROUP BY city,region,country ORDER BY plays DESC LIMIT 30').bind(excluded)
 ]);
 const total=totals.results.reduce((sum,r)=>sum+r.plays,0), max=Math.max(1,...totals.results.map(r=>r.plays));
 const loc=r=>escape([...new Set([r.city,r.region,r.country].filter(Boolean))].join(', ') || 'Location unavailable');
 const title=id=>escape(tracks.find(t=>t.id===id)?.title || id);
 const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Listening activity — AIR APPARENT</title><style>body{margin:0;background:#e1ff45;color:#171817;font:16px Arial,sans-serif}main{max-width:940px;margin:auto;padding:35px 24px}a{color:inherit}h1{font-size:clamp(34px,6vw,60px);letter-spacing:-.05em}h2{margin-top:40px}p{line-height:1.6}nav,.row{display:flex;justify-content:space-between;gap:20px}.total{background:#171817;color:#e1ff45;padding:24px;margin:25px 0}.total b{font-size:64px;display:block}.bar{height:16px;background:#c4da43;border:1px solid;margin:8px 0 20px}.bar i{display:block;background:#171817;height:100%}.table{overflow-x:auto}table{border-collapse:collapse;width:100%;background:#f7f7ef}th,td{text-align:left;padding:14px;border-bottom:1px solid #aaa;font-size:14px}th{background:#171817;color:#e1ff45}small{display:block;margin-top:30px;line-height:1.6}</style></head><body><main><nav><a href="${base}/">← Back to pitch</a><a href="${base}/admin">Refresh ↻</a></nav><h1>Listening activity</h1><p>Owner-only statistics</p><div class="total"><b>${total}</b>Total plays</div><h2>Plays by song</h2>${tracks.map(t=>{const n=totals.results.find(r=>r.track_id===t.id)?.plays||0;return `<div class="row"><span>${escape(t.title)}</span><b>${n}</b></div><div class="bar"><i style="width:${n/max*100}%"></i></div>`;}).join('')}<h2>Where plays happened</h2><p>Approximate network location. Older plays and unavailable locations are marked below.</p><div class="table"><table><thead><tr><th>Location</th><th>Plays</th></tr></thead><tbody>${locations.results.map(r=>`<tr><td>${loc(r)}</td><td>${r.plays}</td></tr>`).join('') || '<tr><td colspan="2">No plays yet.</td></tr>'}</tbody></table></div><h2>Latest 100 plays</h2><div class="table"><table><thead><tr><th>Song</th><th>Time (UTC)</th><th>Approximate location</th></tr></thead><tbody>${recent.results.map(r=>`<tr><td>${title(r.track_id)}</td><td>${escape(r.played_at)}</td><td>${loc(r)}</td></tr>`).join('') || '<tr><td colspan="3">No plays yet.</td></tr>'}</tbody></table></div><small>Plays include starts, resumes and repeat listens. Network retries count once. IP addresses and listener identities are not stored.</small></main></body></html>`;
 return new Response(html,{headers:{'Content-Type':'text/html;charset=utf-8','Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow','X-Frame-Options':'DENY','Referrer-Policy':'no-referrer'}});
}
async function record(request,env) {
 if(request.method!=='POST') return json({error:'Method not allowed'},405);
 if(request.headers.get('Origin')!==new URL(request.url).origin) return json({error:'Origin not allowed'},403);
 if(!request.headers.get('Content-Type')?.startsWith('application/json')) return json({error:'JSON required'},415);
 const reader=request.body?.getReader();if(!reader)return json({error:'Body required'},400);
 let text='',size=0;const decoder=new TextDecoder();
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>512){await reader.cancel();return json({error:'Too large'},413);}text+=decoder.decode(value,{stream:true});}
 let value;try{value=JSON.parse(text+decoder.decode());}catch{return json({error:'Invalid JSON'},400);}
 if(!value || !tracks.some(t=>t.id===value.trackId) || typeof value.eventId!=='string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value.eventId))return json({error:'Invalid event'},400);
 const clean=x=>typeof x==='string'?x.slice(0,120):null;
 await env.DB.prepare('INSERT INTO play_events(event_id,track_id,city,region,country) VALUES(?,?,?,?,?) ON CONFLICT(event_id) DO NOTHING').bind(value.eventId,value.trackId,clean(request.cf?.city),clean(request.cf?.region),clean(request.cf?.country)).run();
 return json({ok:true});
}
export default {
 async fetch(request,env) {
  const url=new URL(request.url);
  if(url.pathname===base) return Response.redirect(url.origin+base+'/',308);
  if(!url.pathname.startsWith(base+'/')) return new Response('Not found',{status:404});
  try {
   if(url.pathname===base+'/admin' || url.pathname===base+'/admin/') return await admin(request,env);
   if(url.pathname===base+'/api/plays') return await record(request,env);
   if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
   url.pathname=url.pathname.slice(base.length);
   const response=await env.ASSETS.fetch(new Request(url,request));
   const headers=new Headers(response.headers);headers.set('X-Robots-Tag','noindex, nofollow');headers.set('X-Content-Type-Options','nosniff');
   return new Response(response.body,{status:response.status,headers});
  } catch {console.error('mio_request_failed');return json({error:'Temporarily unavailable'},503);}
 }
};
