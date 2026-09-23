const {test}=require('node:test');const a=require('node:assert/strict');const E=require('../boss-engine.js');
const run=(s,n,input={})=>{for(let i=0;i<n;i++)E.step(s,input)};
function trap(s){s.player.x=238;s.player.y=222;s.boss.x=234;s.boss.dir=1;s.boss.timer=0;for(let n=0;n<3;n++){s.cool=0;E.stamp(s)}run(s,40);}
test('three stamps create one trap; cooldown prevents repeat damage',()=>{const s=E.create();s.player.x=238;E.stamp(s);E.stamp(s);a.equal(s.cracks[0].hits,1);s.cool=0;E.stamp(s);s.cool=0;E.stamp(s);a.equal(s.holes.length,1);a.equal(s.cracks.length,0)});
test('boss falls exactly one floor and stays stunned until hit',()=>{const s=E.create();trap(s);a.equal(s.boss.floor,1);a.equal(s.boss.mode,'stunned');run(s,1000);a.equal(s.boss.floor,1);a.equal(s.boss.mode,'stunned');a.equal(s.hp,5)});
test('five earned hits win; each phase clears old traps',()=>{const s=E.create();for(let n=0;n<5;n++){trap(s);s.player.x=s.boss.x;s.player.y=E.floors[s.boss.floor]-28;s.cool=0;a.equal(E.stamp(s),true);a.equal(s.hp,4-n);a.equal(s.holes.length,0);if(n<4){run(s,80);a.equal(s.boss.floor,0);a.equal(s.boss.mode,'walk');}}a.equal(s.status,'won');a.equal(s.hits,5);const old=s.ticks;run(s,100);a.equal(s.ticks,old)});
test('stamp cannot hurt boss from another floor or while walking',()=>{const s=E.create();s.player.x=s.boss.x;E.stamp(s);a.equal(s.hp,5);trap(s);s.cool=0;s.player.y=222;E.stamp(s);a.equal(s.hp,5)});
test('pause freezes player, attacks and cooldown',()=>{const s=E.create();s.status='paused';const before=JSON.stringify(s);run(s,200,{right:true});a.equal(JSON.stringify(s),before);a.equal(E.stamp(s),false)});
test('telegraphed hazard grants invulnerability and can end a battle',()=>{const s=E.create();s.boss.mode='stunned';for(let i=0;i<3;i++){s.invulnerable=0;s.hazards=[{x:s.player.x+12,t:45}];run(s,1);a.equal(s.lives,2-i);run(s,10);a.equal(s.lives,2-i);}a.equal(s.status,'lost')});
test('tap destination reaches another floor through a ladder',()=>{const s=E.create();s.boss.mode='stunned';s.target={x:320,floor:2};run(s,600);a.equal(s.player.y,702);a.ok(Math.abs(s.player.x-320)<=4);a.equal(s.target,null)});
test('tap destination can reverse direction halfway up a ladder',()=>{const s=E.create();s.boss.mode='stunned';s.player.x=90;s.player.y=420;s.target={x:180,floor:0};run(s,300);a.equal(s.player.y,222);a.ok(Math.abs(s.player.x-180)<=4)});
test('bottom floor and ladder cannot be broken',()=>{const s=E.create();s.player.y=702;E.stamp(s);a.equal(s.cracks.length,0);s.cool=0;s.player.y=222;s.player.x=90;E.stamp(s);a.equal(s.cracks.length,0)});

test('opening gives two seconds to prepare before boss patrol starts',()=>{const s=E.create();const x=s.boss.x;run(s,120);a.equal(s.boss.x,x);run(s,1);a.notEqual(s.boss.x,x);});
