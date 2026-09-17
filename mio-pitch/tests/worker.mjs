import worker from '../worker.js';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const sqlite=new DatabaseSync(':memory:');
sqlite.exec(readFileSync('migrations/0001_plays.sql','utf8'));
const DB={prepare(sql){let values=[];return {bind(...args){values=args;return this;},async run(){return sqlite.prepare(sql).run(...values);},async all(){return {results:sqlite.prepare(sql).all(...values)};}};},async batch(statements){return Promise.all(statements.map(s=>s.all()));}};
const env={DB,ADMIN_PASSWORD:'isolated-test-password',ASSETS:{fetch:async request=>new Response(new URL(request.url).pathname)}};
const mf={async dispatchFetch(url,options={}){const request=new Request(url,options);Object.defineProperty(request,'cf',{value:options.cf});return worker.fetch(request,env);}};
const db=DB;
try {
const base='https://airapparentmusic.com/private/mio-pitch';
let r=await mf.dispatchFetch(base+'/admin');assert.equal(r.status,401);
r=await mf.dispatchFetch(base+'/admin',{headers:{Authorization:'Basic '+btoa('neil:wrong')}});assert.equal(r.status,401);
const auth={Authorization:'Basic '+btoa('neil:isolated-test-password')};
r=await mf.dispatchFetch(base+'/admin',{headers:auth});assert.equal(r.status,200);assert.match(await r.text(),/Total plays/);
const headers={'Origin':'https://airapparentmusic.com','Content-Type':'application/json'};
const body=JSON.stringify({eventId:'6216a904-202e-47f1-9bf5-3ff8a1188011',trackId:'picky-kitty'});
for(let i=0;i<2;i++){r=await mf.dispatchFetch(base+'/api/plays',{method:'POST',headers,body,cf:{city:'Seoul',region:'Seoul',country:'KR'}});assert.equal(r.status,200);}
const rows=await db.prepare('SELECT * FROM play_events').all();assert.equal(rows.results.length,1);assert.equal(rows.results[0].city,'Seoul');
r=await mf.dispatchFetch(base+'/api/plays',{method:'POST',headers:{...headers,Origin:'https://example.com'},body});assert.equal(r.status,403);
r=await mf.dispatchFetch(base+'/audio/picky-kitty.mp3');assert.equal(await r.text(),'/audio/picky-kitty.mp3');
r=await mf.dispatchFetch('https://airapparentmusic.com/');assert.equal(r.status,404);
console.log('PASS: owner auth, wrong password rejection, playback persistence and deduplication, trusted city capture, origin protection, asset paths, route isolation.');
}finally{sqlite.close();}
