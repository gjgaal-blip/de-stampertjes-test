/* Deterministic boss simulation, shared by the game and regression tests. */
(function(root){
'use strict';
const floors=[250,490,730];
const ladders=[{x:90,top:250,bottom:490},{x:470,top:250,bottom:490},{x:90,top:490,bottom:730},{x:470,top:490,bottom:730}];
function route(player,target,levels,stairs){
  const keys={left:false,right:false,up:false,down:false};
  if(!target)return {keys,done:true};
  const foot=player.y+player.h;
  const fi=levels.reduce((best,y,i)=>Math.abs(y-foot)<Math.abs(levels[best]-foot)?i:best,0);
  const tf=Math.max(0,Math.min(levels.length-1,target.floor));
  // Continue a ladder journey even after the nearest-floor midpoint changes.
  const ongoing=stairs.find(l=>Math.abs(player.x-l.x)<14&&foot>l.top+.01&&foot<l.bottom-.01);
  if(ongoing){keys[levels[tf]<foot?'up':'down']=true;return {keys,done:false};}
  if(fi!==tf){
    const edge=tf<fi?fi-1:fi;
    const options=stairs.filter(l=>l.top===levels[edge]&&l.bottom===levels[edge+1]);
    const ladder=options.sort((a,b)=>Math.abs(a.x-player.x)+Math.abs(a.x-target.x)-Math.abs(b.x-player.x)-Math.abs(b.x-target.x))[0];
    if(!ladder)return {keys,done:true};
    if(Math.abs(ladder.x-player.x)>5)keys[ladder.x>player.x?'right':'left']=true;
    else keys[tf<fi?'up':'down']=true;
    return {keys,done:false};
  }
  if(Math.abs(target.x-player.x)>4){keys[target.x>player.x?'right':'left']=true;return {keys,done:false};}
  return {keys,done:true};
}
function create(){return {status:'play',ticks:0,hp:5,lives:3,cool:0,invulnerable:100,attackTimer:240,hazards:[],cracks:[],holes:[],target:null,message:'Maak 3× een gat op de vloer van de baas.',player:{x:90,y:222,w:24,h:28},boss:{x:380,floor:0,y:218,dir:-1,mode:'walk',timer:0},hits:0};}
function hurt(s){if(s.invulnerable>0||s.status!=='play')return;s.lives--;s.invulnerable=100;s.target=null;if(s.lives<=0){s.status='lost';s.message='De Appelbaas wint deze ronde. Probeer het opnieuw!';}}
function stamp(s){
  if(s.status!=='play'||s.cool>0)return false;
  const p=s.player,b=s.boss,fi=floors.findIndex(y=>Math.abs(y-(p.y+p.h))<6);
  if(fi<0)return false;
  s.cool=18;
  if(b.mode==='stunned'&&fi===b.floor&&Math.abs(p.x-b.x)<62){
    s.hp--;s.hits++;s.target=null;s.holes=[];s.cracks=[];
    if(s.hp===0){s.status='won';s.message='Kroon veroverd! De Appelbaas is verslagen.';return true;}
    b.mode='returning';b.timer=80;s.invulnerable=Math.max(s.invulnerable,100);s.hazards=[];
    s.message='Raak! De baas keert terug naar boven. Nieuwe gaten, nieuwe kans.';return true;
  }
  if(fi===floors.length-1){s.message='Klim omhoog om een gat te maken.';return false;}
  const x=Math.max(30,Math.min(530,Math.round((p.x+12)/50)*50));
  if(ladders.some(l=>(l.top===floors[fi]||l.bottom===floors[fi])&&Math.abs(l.x+12-x)<38)){s.message='Een stukje naast de ladder kun je stampen.';return false;}
  if(s.holes.some(h=>h.floor===fi&&h.x===x))return false;
  let q=s.cracks.find(q=>q.floor===fi&&q.x===x);if(!q){q={x,floor:fi,hits:0};s.cracks.push(q);}q.hits++;
  s.message=`Scheur ${q.hits}/3 · lok de baas over je gat.`;
  if(q.hits===3){s.holes.push({x,floor:fi});s.cracks=s.cracks.filter(c=>c!==q);s.message='Gat klaar! Wacht op de baas en daal dan af.';}
  return true;
}
function step(s,input={}){
  if(s.status!=='play')return;
  s.ticks++;s.cool=Math.max(0,s.cool-1);s.invulnerable=Math.max(0,s.invulnerable-1);
  const p=s.player,b=s.boss;
  let keys=input;
  if(s.target){const r=route(p,s.target,floors,ladders);keys=r.keys;if(r.done)s.target=null;}
  const foot=p.y+p.h;
  const ladder=ladders.find(l=>Math.abs(p.x-l.x)<14&&foot>=l.top-3&&foot<=l.bottom+3&&((keys.up&&foot>l.top)||(keys.down&&foot<l.bottom)));
  if(ladder&&(keys.up||keys.down)){p.x=ladder.x;p.y=Math.max(ladder.top-p.h,Math.min(ladder.bottom-p.h,p.y+(keys.up?-3:3)));}
  else if(!ladders.some(l=>Math.abs(p.x-l.x)<14&&foot>l.top+.01&&foot<l.bottom-.01)){
    p.x=Math.max(24,Math.min(552,p.x+(keys.left?-3:0)+(keys.right?3:0)));
  }
  if(b.mode==='walk'){
    b.x+=b.dir*(1.25+(5-s.hp)*.32);
    if(b.x<35||b.x>525){b.x=Math.max(35,Math.min(525,b.x));b.dir*=-1;}
    const h=s.holes.find(h=>h.floor===b.floor&&Math.abs(h.x-(b.x+16))<24);
    if(h&&b.floor<2){b.mode='falling';b.floor++;s.message='De baas valt! Volg hem via de ladder.';}
  }else if(b.mode==='falling'){
    b.y=Math.min(floors[b.floor]-32,b.y+7);
    if(b.y===floors[b.floor]-32){b.mode='stunned';s.message='VERSUFT! Ga naar hem toe en druk STAMP.';}
  }else if(b.mode==='returning'){
    b.timer--;b.y+=(218-b.y)*.06;
    if(b.timer<=0){b.floor=0;b.y=218;b.x=p.x<300?480:60;b.mode='walk';s.attackTimer=180;}
  }
  if(b.mode==='walk'){
    s.attackTimer--;
    if(s.attackTimer<=0){s.hazards.push({x:p.x+12,t:120});s.attackTimer=Math.max(130,260-(5-s.hp)*25);s.message='Let op de gouden lijn: stap opzij!';}
    if(Math.abs((p.y+p.h)-floors[b.floor])<25&&Math.abs(p.x-b.x)<40)hurt(s);
  }
  for(const h of s.hazards){h.t--;if(h.t<=45&&h.t>0&&Math.abs(p.x+12-h.x)<24)hurt(s);}
  s.hazards=s.hazards.filter(h=>h.t>0);
}
const api={create,step,stamp,route,floors,ladders};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CastleBossEngine=api;
})(typeof window!=='undefined'?window:globalThis);
