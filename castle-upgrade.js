/* HD beta additions. Existing rooms, stories and collections stay in the base game. */
(function(){
'use strict';
const E=CastleBossEngine;
const $=id=>document.getElementById(id);
const panel=$('panel');
const hero=document.createElement('section');hero.id='adventureHub';
hero.innerHTML=`<div class="chapterLine">HET KASTEEL ONTWAAKT <span>HD BÈTA · 2.5</span></div>
<h2>Een kroon.<br>Tien kamers.<br><em>Eén Appelbaas.</em></h2>
<p>Verken jouw kasteel. Leer de kamers kennen.<br>Daag daarna de koning van de Appelieten uit.</p>
<div class="adventureCards"><button id="bossPracticeBtn"><span>♛</span><strong>DE APPELBAAS</strong><small>Oefen het eindgevecht →</small></button><button id="atlasOpenBtn"><span>⌘</span><strong>KAMERATLAS</strong><small>Kies jouw oefenkamer →</small></button></div>
<div id="bossPersonalBest" class="personalBest"></div>`;
mainMenu.prepend(hero);
const atlas=document.createElement('section');atlas.id='castleAtlas';atlas.className='menuSection hidden';
atlas.innerHTML='<div class="chapterLine">VERKEN HET KASTEEL</div><h2>Jouw kameratlas</h2><p>Oefen vrij, zonder je records of online scores te wijzigen.</p><div class="atlasGrid"></div><button id="atlasBack">← TERUG</button>';
panel.appendChild(atlas);
CASTLE_ROOM_THEMES.forEach((room,i)=>{
 const b=document.createElement('button');b.className='atlasRoom';b.innerHTML=`<span>${String(i+1).padStart(2,'0')}</span><strong>${room.name}</strong><small>OEFEN DEZE KAMER ↗</small>`;
 b.addEventListener('click',()=>{atlas.classList.add('hidden');startGame(i+1);});atlas.querySelector('.atlasGrid').appendChild(b);
});
$('atlasOpenBtn').onclick=()=>{stopAttractMode();showMenuSection(atlas);};
$('atlasBack').onclick=()=>{atlas.classList.add('hidden');showMainMenu();};
const oldMain=showMainMenu;showMainMenu=function(){atlas.classList.add('hidden');oldMain();};
const bestLabel=()=>{$('bossPersonalBest').textContent=localStore.getItem('stampertjesBossWins')?`♛ ${Number(localStore.getItem('stampertjesBossWins'))||0}× de Appelbaas verslagen op dit apparaat`:'NIEUW · Eindgevecht na kamer 10 · Ook direct te oefenen';};bestLabel();

// Tap-to-route shares the same floor/ladder topology as the original movement code.
let target=null,owned=false;
let touchMode=localStore.getItem('stampertjesTouchMode')||((matchMedia('(pointer:coarse)').matches)?'tap':'arrows');
const modeButton=document.createElement('button');modeButton.id='touchMode';$('gameOptions').appendChild(modeButton);
const hint=document.createElement('div');hint.id='touchHint';hint.textContent='Tik je bestemming · Tik op jezelf om te stampen';$('wrap').appendChild(hint);
function modeUI(){document.body.classList.toggle('tapMovement',touchMode==='tap');modeButton.textContent=touchMode==='tap'?'☝ TIKBEDIENING':'✥ PIJLTJES';modeButton.setAttribute('aria-label','Bediening wisselen, nu '+(touchMode==='tap'?'tikken op het speelveld':'pijltjes'));}
function cancel(){target=null;if(owned)keys.left=keys.right=keys.up=keys.down=false;owned=false;}
modeButton.onclick=()=>{cancel();touchMode=touchMode==='tap'?'arrows':'tap';localStore.setItem('stampertjesTouchMode',touchMode);modeUI();};modeUI();
function canvasPoint(canvas,event,w,h){const r=canvas.getBoundingClientRect();return {x:(event.clientX-r.left)/r.width*w,y:(event.clientY-r.top)/r.height*h};}
c.addEventListener('pointerdown',event=>{
 if(touchMode!=='tap'||state!=='play')return;
 event.preventDefault();audio();const p=canvasPoint(c,event,W,H);
 if(Math.hypot(p.x-player.x-12,p.y-player.y-14)<34){cancel();stamp();return;}
 target={x:Math.max(10,Math.min(W-player.w-10,p.x-12)),floor:floorIndex(p.y+14)};owned=true;
});
window.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key))cancel();},true);
for(const id of ['left','right','up','down','stamp'])$(id).addEventListener('pointerdown',cancel,{capture:true});
for(const id of ['pauseToggle','pauseRestartBtn','pauseConfirmStopBtn','pauseResumeBtn'])$(id).addEventListener('click',cancel,{capture:true});
window.CastleTouch={cancel,update(){if(!target)return;if(player.fallingThroughHole){keys.left=keys.right=keys.up=keys.down=false;return;}const r=E.route(player,target,floors,ladders);Object.assign(keys,r.keys);if(r.done)cancel();},draw(context){if(!target)return;context.save();context.strokeStyle='#8fe5ed';context.lineWidth=3;context.beginPath();context.ellipse(target.x+12,floors[target.floor]-5,15,6,0,0,Math.PI*2);context.stroke();context.restore();}};

// Boss is a separate arena with its own practice records, never a public highscore.
const arena=document.createElement('div');arena.id='bossArena';arena.className='hidden';arena.setAttribute('role','dialog');arena.setAttribute('aria-modal','true');arena.setAttribute('aria-label','De Appelbaas');
arena.innerHTML=`<div class="bossShell"><header class="bossHeader"><div><small>DE LAATSTE WACHTER</small><h2>De Appelbaas <span id="bossPracticeTag">OEFENEN</span></h2></div><button id="bossExit" aria-label="Bossgevecht verlaten">✕</button></header>
<div class="bossMeters"><span id="bossLife"></span><span id="bossHealth"></span></div>
<canvas id="bossCanvas" width="600" height="800" tabindex="0" aria-label="Bossarena: tik om te bewegen, pijltjestoetsen werken ook"></canvas>
<p id="bossInstruction" role="status" aria-live="polite"></p>
<div class="bossControls"><button data-boss-key="left" aria-label="Links">◀</button><button data-boss-key="right" aria-label="Rechts">▶</button><button id="bossStamp">STAMP</button><button data-boss-key="up" aria-label="Omhoog">▲</button><button data-boss-key="down" aria-label="Omlaag">▼</button></div>
<div class="bossFooter"><span>Tik je bestemming · Spatie = stamp · Esc = pauze</span><button id="bossPause">PAUZE</button></div>
<div id="bossCurtain"><div class="bossDialog"><div id="bossDialogIcon">♛</div><h2 id="bossDialogTitle">De kroon wacht op jou</h2><p id="bossDialogText"></p><button id="bossContinue">BEGIN HET GEVECHT</button><button id="bossQuit">TERUG NAAR MENU</button></div></div></div>`;
document.body.appendChild(arena);
let model=null,active=false,practice=true,continuation=null,reported=false;
const bc=$('bossCanvas'),bx=bc.getContext('2d'),bossKeys={};
const throne=new Image();throne.src='throne-room-empty-portrait@3x.jpg';
function clearBossKeys(){for(const k of Object.keys(bossKeys))delete bossKeys[k];if(model)model.target=null;}
function curtain(title,text,button){$('bossDialogTitle').textContent=title;$('bossDialogText').textContent=text;$('bossContinue').textContent=button;$('bossCurtain').classList.remove('hidden');$('bossContinue').focus();}
function open(practiceMode,onComplete){
 cancel();keys.left=keys.right=keys.up=keys.down=false;stopAttractMode();state='boss';document.body.classList.remove('gameplayActive');
 practice=practiceMode;continuation=onComplete;active=true;reported=false;model=E.create();model.status='ready';clearBossKeys();
 overlay.inert=true;$('wrap').inert=true;arena.classList.remove('hidden');document.body.classList.add('bossActive');$('bossPracticeTag').textContent=practice?'OEFENEN':'NA KAMER 10';
 setMusicContext('special',{playNow:true});
 curtain('De kroon wacht op jou','Maak met 3 stamps een valvloer in zijn looproute. De zware baas zakt erdoor; jij blijft veilig staan. Volg hem via de ladder en stamp dichtbij terwijl hij versuft is. Vijf treffers winnen de kroon. Stap uit de gouden waarschuwingslijn!','BEGIN HET GEVECHT');render();
}
function close(completed=false){active=false;clearBossKeys();arena.classList.add('hidden');overlay.inert=false;$('wrap').inert=false;document.body.classList.remove('bossActive');if(completed&&continuation){state='transition';continuation();}else {openIntro();$('bossPracticeBtn').focus();}}
function pause(){if(!active||!model)return;if(model.status==='play'){model.status='paused';clearBossKeys();curtain('Even op adem komen','Het gevecht staat stil. Je kunt straks verder waar je was.','VERDER SPELEN');}else if(model.status==='paused')resume();}
function resume(){if(!model)return;if(model.status==='won'){close(!practice);return;}if(model.status==='lost'){model=E.create();reported=false;}model.status='play';$('bossCurtain').classList.add('hidden');bc.focus();}
$('bossPracticeBtn').onclick=()=>open(true,null);
$('bossContinue').onclick=resume;
$('bossPause').onclick=pause;
$('bossExit').onclick=()=>{if(model.status==='play')pause();else close();};
$('bossQuit').onclick=()=>close();
$('bossStamp').onclick=()=>{if(!model)return;model.target=null;if(E.stamp(model))tone(220,.06,'square',.03,330);};
for(const b of arena.querySelectorAll('[data-boss-key]')){
 b.addEventListener('pointerdown',e=>{e.preventDefault();model.target=null;bossKeys[b.dataset.bossKey]=true;b.setPointerCapture(e.pointerId);});
 for(const type of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(type,()=>{bossKeys[b.dataset.bossKey]=false;});
}
bc.addEventListener('pointerdown',e=>{if(model.status!=='play')return;e.preventDefault();const p=canvasPoint(bc,e,600,800);if(Math.hypot(p.x-model.player.x-12,p.y-model.player.y-14)<38){model.target=null;E.stamp(model);}else model.target={x:Math.max(24,Math.min(552,p.x-12)),floor:E.floors.reduce((best,y,i)=>Math.abs(y-p.y-14)<Math.abs(E.floors[best]-p.y-14)?i:best,0)};});
window.addEventListener('keydown',e=>{
 if(!active)return;
 if(e.key==='Tab'){const buttons=[...arena.querySelectorAll('button,canvas[tabindex]')].filter(b=>b.getClientRects().length&&(!$('bossCurtain').classList.contains('hidden')?$('bossCurtain').contains(b):true));const first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}return;}
 const map={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};
 if(map[e.key]){e.preventDefault();e.stopImmediatePropagation();model.target=null;bossKeys[map[e.key]]=true;}
 if(e.key===' '){e.preventDefault();e.stopImmediatePropagation();if(!e.repeat)E.stamp(model);}
 if(e.key==='Escape'||e.key.toLowerCase()==='p'){e.preventDefault();e.stopImmediatePropagation();if(!e.repeat)pause();}
},true);
window.addEventListener('keyup',e=>{const map={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};if(map[e.key])bossKeys[map[e.key]]=false;});
window.addEventListener('blur',()=>{if(active&&model.status==='play')pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&active&&model.status==='play')pause();});
function render(){
 if(!active)return;
 bx.clearRect(0,0,600,800);bx.fillStyle='#171c27';bx.fillRect(0,0,600,800);
 if(throne.complete&&throne.naturalWidth)bx.drawImage(throne,0,0,600,800);
 bx.fillStyle='rgba(9,15,25,.60)';bx.fillRect(0,0,600,800);
 const s=model,b=s.boss,p=s.player;
 for(const y of E.floors){bx.fillStyle='#b99253';bx.fillRect(24,y,552,5);bx.fillStyle='#352d26';bx.fillRect(24,y+5,552,12);}
 for(const l of E.ladders){bx.strokeStyle='#e2bf78';bx.lineWidth=5;bx.beginPath();bx.moveTo(l.x,l.top);bx.lineTo(l.x,l.bottom);bx.moveTo(l.x+24,l.top);bx.lineTo(l.x+24,l.bottom);for(let y=l.top+12;y<l.bottom;y+=18){bx.moveTo(l.x,y);bx.lineTo(l.x+24,y);}bx.stroke();}
 for(const h of s.holes){bx.fillStyle='#8ce4ed';bx.fillRect(h.x-24,E.floors[h.floor]-3,48,8);bx.fillStyle='#081821';bx.fillRect(h.x-19,E.floors[h.floor],38,6);}
 for(const q of s.cracks){bx.strokeStyle='#f0c97a';bx.lineWidth=3;bx.beginPath();bx.moveTo(q.x-20,E.floors[q.floor]);bx.lineTo(q.x,E.floors[q.floor]+8);bx.lineTo(q.x+20,E.floors[q.floor]);bx.stroke();bx.font='18px sans-serif';bx.fillStyle='#fff';bx.fillText(q.hits+'/3',q.x-15,E.floors[q.floor]-14);}
 for(const h of s.hazards){bx.fillStyle=h.t>45?'rgba(249,198,95,.2)':'rgba(244,105,71,.6)';bx.fillRect(h.x-22,90,44,660);bx.fillStyle='#ffd88c';bx.font='bold 30px sans-serif';bx.fillText('!',h.x-5,120);}
 if(s.target){bx.strokeStyle='#8fe5ed';bx.lineWidth=3;bx.beginPath();bx.ellipse(s.target.x+12,E.floors[s.target.floor]-6,17,6,0,0,Math.PI*2);bx.stroke();}
 // Gold crown and red apple silhouette stay legible over the HD room.
 bx.save();bx.translate(b.x+16,b.y+8);bx.shadowColor='#fa775e';bx.shadowBlur=20;bx.fillStyle=b.mode==='stunned'?'#9bafd6':'#c74747';bx.beginPath();bx.ellipse(0,0,31,28,0,0,Math.PI*2);bx.fill();bx.shadowBlur=0;bx.fillStyle='#f7cd70';bx.beginPath();bx.moveTo(-25,-25);bx.lineTo(-29,-49);bx.lineTo(-10,-36);bx.lineTo(0,-54);bx.lineTo(10,-36);bx.lineTo(29,-49);bx.lineTo(25,-25);bx.closePath();bx.fill();bx.fillStyle='#fff3de';bx.fillRect(-14,-6,7,8);bx.fillRect(7,-6,7,8);bx.fillStyle='#311c28';bx.fillRect(-11,-3,4,5);bx.fillRect(7,-3,4,5);bx.fillRect(-8,11,16,4);if(b.mode==='stunned'){bx.fillStyle='#ffe79c';bx.font='bold 18px sans-serif';bx.fillText('VERSUFT',-42,-66);}bx.restore();
 if(s.invulnerable===0||Math.floor(s.ticks/6)%2===0){bx.fillStyle='#82d8ec';bx.fillRect(p.x,p.y+8,24,19);bx.fillStyle='#ffe0a3';bx.fillRect(p.x+2,p.y-5,20,17);bx.fillStyle='#111b29';bx.fillRect(p.x+6,p.y+1,3,4);bx.fillRect(p.x+15,p.y+1,3,4);bx.fillStyle='#e8bd74';bx.fillRect(p.x,p.y+27,8,5);bx.fillRect(p.x+16,p.y+27,8,5);}
 bx.font='bold 17px sans-serif';bx.fillStyle='#f6e5bf';bx.fillText('DE TROON VAN DE APPELBAAS',32,46);bx.font='15px sans-serif';bx.fillText(`FASE ${Math.min(5,6-s.hp)} / 5`,32,72);
 $('bossHealth').textContent=`BAAS ${'◆'.repeat(s.hp)}${'◇'.repeat(5-s.hp)}`;$('bossLife').textContent=`JIJ ${'♥'.repeat(s.lives)}${'♡'.repeat(3-s.lives)}`;
 if($('bossInstruction').textContent!==s.message)$('bossInstruction').textContent=s.message;
}
$('stamp').addEventListener('click',e=>{if(e.detail===0)stamp();});
const tick=StampertjesRuntime.fixedStep(()=>{
 if(!active)return;E.step(model,bossKeys);
 if((model.status==='won'||model.status==='lost')&&!reported){reported=true;clearBossKeys();if(model.status==='won'){localStore.setItem('stampertjesBossWins',(Number(localStore.getItem('stampertjesBossWins'))||0)+1);bestLabel();curtain('De kroon is van jou!',practice?'Je hebt de vijf fases overwonnen. Je overwinning is op dit apparaat bewaard.':'Het kasteel is bevrijd. Je gewone avontuur gaat verder in kamer 11.',practice?'TERUG NAAR MENU':'VERDER NAAR KAMER 11');}else curtain('Nog één poging?','Je kunt de timing opnieuw oefenen. Maak een valvloer, lok de baas en volg hem zodra hij versuft is.','OPNIEUW PROBEREN');}
});
function loop(t){tick(t);if(active)render();requestAnimationFrame(loop);}requestAnimationFrame(loop);
window.CastleBoss={open};
})();
