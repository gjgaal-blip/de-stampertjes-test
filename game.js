const localStore=StampertjesRuntime.storage("localStorage");
const gameFetch=StampertjesRuntime.fetchWithTimeout;
const c=document.getElementById('game'),ctx=c.getContext('2d');
const overlay=document.getElementById("overlay");
const musicToggle=document.getElementById("musicToggle");
const menuMusicIcon=document.getElementById("menuMusicIcon");
const startBtn=document.getElementById("startBtn");
const introCanvas=document.getElementById("introCanvas");
const ictx=introCanvas.getContext("2d");
const introHdBg=new Image();
introHdBg.src="entrance-hall-empty-portrait@3x.jpg";
ictx.imageSmoothingEnabled=true;
ictx.imageSmoothingQuality="high";
const INTRO_LOGICAL_W=420,INTRO_LOGICAL_H=180;
const highscoreEntry=document.getElementById("highscoreEntry");
const nameInput=document.getElementById("nameInput");
const saveScoreBtn=document.getElementById("saveScoreBtn");
const shareScoreBox=document.getElementById("shareScoreBox"),shareScoreBtn=document.getElementById("shareScoreBtn"),shareScorePreview=document.getElementById("shareScorePreview");
const scoreList=document.getElementById("scoreList");
const introText=document.getElementById("introText");
const mainMenu=document.getElementById("mainMenu");
const scoresSection=document.getElementById("scoresSection");
const helpSection=document.getElementById("helpSection");
const historySection=document.getElementById("historySection");
const playMenuBtn=document.getElementById("playMenuBtn");
const scoresMenuBtn=document.getElementById("scoresMenuBtn");
const statsMenuBtn=document.getElementById("statsMenuBtn");
const statsSection=document.getElementById("statsSection");
const statsList=document.getElementById("statsList");
const resetStatsBtn=document.getElementById("resetStatsBtn");
const onlineStatsStatus=document.getElementById("onlineStatsStatus");
const onlineStatsList=document.getElementById("onlineStatsList");
const onlineStatsLeaders=document.getElementById("onlineStatsLeaders");
const helpMenuBtn=document.getElementById("helpMenuBtn");
const historyMenuBtn=document.getElementById("historyMenuBtn");
const newsMenuBtn=document.getElementById("newsMenuBtn");
const roadmapSection=document.getElementById("roadmapSection");
const chroniclePage=document.getElementById("chroniclePage");
const chroniclePageContent=document.getElementById("chroniclePageContent");
const chroniclePrev=document.getElementById("chroniclePrev");
const chronicleNext=document.getElementById("chronicleNext");
const chroniclePageNumber=document.getElementById("chroniclePageNumber");

const hallMenuBtn=document.getElementById("hallMenuBtn");
const hallSection=document.getElementById("hallSection");
const hallChampion=document.getElementById("hallChampion");
const hallChampionScore=document.getElementById("hallChampionScore");
const hallSecond=document.getElementById("hallSecond");
const hallSecondScore=document.getElementById("hallSecondScore");
const hallThird=document.getElementById("hallThird");
const hallThirdScore=document.getElementById("hallThirdScore");
const hallApples=document.getElementById("hallApples");
const hallGames=document.getElementById("hallGames");
const hallTeddyBadge=document.getElementById("hallTeddyBadge");
const hallHighestLevel=document.getElementById("hallHighestLevel");
const hallTeddyFinders=document.getElementById("hallTeddyFinders");
const hallStatus=document.getElementById("hallStatus");
const hallRecordGrid=document.getElementById("hallRecordGrid");
const hallRecordModal=document.getElementById("hallRecordModal");
const hallRecordModalCard=document.getElementById("hallRecordModalCard");
const hallModalTitle=document.getElementById("hallModalTitle");
const hallModalList=document.getElementById("hallModalList");
const hallModalClose=document.getElementById("hallModalClose");
const myHallRanks=document.getElementById("myHallRanks");
const firstTeddyFinder=document.getElementById("firstTeddyFinder");
const firstEasterFinder=document.getElementById("firstEasterFinder");
const recordApplesName=document.getElementById("recordApplesName"),recordApplesValue=document.getElementById("recordApplesValue");
const recordLevelName=document.getElementById("recordLevelName"),recordLevelValue=document.getElementById("recordLevelValue");
const recordGamesName=document.getElementById("recordGamesName"),recordGamesValue=document.getElementById("recordGamesValue");
const recordTeddyName=document.getElementById("recordTeddyName"),recordTeddyValue=document.getElementById("recordTeddyValue");
const recordBonusName=document.getElementById("recordBonusName"),recordBonusValue=document.getElementById("recordBonusValue");
const recordDeathsName=document.getElementById("recordDeathsName"),recordDeathsValue=document.getElementById("recordDeathsValue");
let hallDataCache=null;


const merchMenuBtn=document.getElementById("merchMenuBtn");
const merchSection=document.getElementById("merchSection");
const merchDesigns=document.getElementById("merchDesigns");
const merchSizes=document.getElementById("merchSizes");
const merchPersonalization=document.getElementById("merchPersonalization");
const merchPlayerName=document.getElementById("merchPlayerName");
const merchInterestBtn=document.getElementById("merchInterestBtn");
const merchLaterBtn=document.getElementById("merchLaterBtn");
const merchStatus=document.getElementById("merchStatus");
const wallpaperGrid=document.getElementById("wallpaperGrid");
const mediaViewer=document.getElementById("mediaViewer");
const mediaViewerTitle=document.getElementById("mediaViewerTitle");
const mediaViewerImage=document.getElementById("mediaViewerImage");
const mediaViewerClose=document.getElementById("mediaViewerClose");
const mediaViewerDownload=document.getElementById("mediaViewerDownload");
const mediaViewerHint=document.getElementById("mediaViewerHint");
let activeDownloadWallpaper=null;

let merchChoice={design:"classic",size:"L",personalized:false};
const cafeMenuBtn=document.getElementById("cafeMenuBtn");
const cafeSection=document.getElementById("cafeSection");
const cafeName=document.getElementById("cafeName");
const cafeNameHint=document.getElementById("cafeNameHint");
const cafeType=document.getElementById("cafeType");
const cafeMessage=document.getElementById("cafeMessage");
const cafeCounter=document.getElementById("cafeCounter");
const cafeSubmitBtn=document.getElementById("cafeSubmitBtn");
const cafeStatus=document.getElementById("cafeStatus");
const cafeAdminStatus=document.getElementById("cafeAdminStatus");
const cafeCancelEditBtn=document.getElementById("cafeCancelEditBtn");
const cafePosts=document.getElementById("cafePosts");
const cafeTotalCount=document.getElementById("cafeTotalCount");
const cafeIdeaCount=document.getElementById("cafeIdeaCount");
const cafeBugCount=document.getElementById("cafeBugCount");
const cafeHighscoreCount=document.getElementById("cafeHighscoreCount");
const updateOverlay=document.getElementById("updateOverlay");
const closeUpdateBtn=document.getElementById("closeUpdateBtn");
const gameTitle=document.getElementById("gameTitle");
const versionLabel=document.getElementById("versionLabel");
const studioLine=document.getElementById("studioLine");
const teddyEgg=document.getElementById("teddyEgg");
const attractPrompt=document.getElementById("attractPrompt");
const dailyCastleMessage=document.getElementById("dailyCastleMessage");
const levelOverlay=document.getElementById("levelOverlay");
const levelTitle=document.getElementById("levelTitle");
const levelSubtitle=document.getElementById("levelSubtitle");
let levelTransitioning=false;

function showLevelTransition(completedLevel,nextLevel){
  if(!devTestActive)logGameEvent("level_complete",{level:completedLevel,score});
  if(musicOn&&!menuSoundtrack.paused)menuSoundtrack.volume=.06;
  if(!devTestActive){
    const transitionStats=getStats();
    transitionStats.bestScore=Math.max(Number(transitionStats.bestScore)||0,Number(score)||0);
    transitionStats.highestLevel=Math.max(Number(transitionStats.highestLevel)||1,Number(nextLevel)||1);
    saveStats(transitionStats);
  }
  levelTransitioning=true;
  state="transition";
  document.body.classList.remove("gameplayActive");
  levelTitle.textContent=`LEVEL ${completedLevel} VOLTOOID`;
  levelSubtitle.textContent=`NIEUWE ZAAL — ${CASTLE_ROOM_THEMES[roomIndexForLevel(nextLevel)].name}`;
  levelOverlay.classList.remove("hidden");

  setTimeout(()=>{
    const nextRoom=CASTLE_ROOM_THEMES[roomIndexForLevel(nextLevel)];
    levelTitle.textContent=nextRoom.name;
    levelSubtitle.textContent=`LEVEL ${nextLevel} · MAAK JE KLAAR!`;
  },900);

  setTimeout(()=>{
    levelOverlay.classList.add("hidden");
    levelTransitioning=false;
    state="play";
    spawnLevel();
    if(!devTestActive)logGameEvent("level_start",{level:nextLevel,score});
    if(musicOn){
      if(menuSoundtrack.paused)startMusic();
      else applyMusicVolume();
    }
    document.body.classList.add("gameplayActive");
  },1900);
}


const DAILY_CASTLE_MESSAGES=[
  "💡 TIP · Blijf bewegen. Een ladder dichtbij is soms meer waard dan punten.",
  "🕯️ GERUCHT · In de westelijke toren brandde vannacht licht zonder dat iemand binnen was.",
  "🐈 TEDDY · Er zijn pootafdrukken gevonden bij een raam op de bovenste verdieping.",
  "☕ CAFÉ · Helden praten na. Kijk af en toe in het Stampertjes Café.",
  "🍏 WAARSCHUWING · Appelieten leren je routes kennen. Wissel lopen en klimmen af.",
  "🏰 KASTEELBERICHT · Niet ieder raam blijft de hele dag hetzelfde.",
  "👂 GERUCHT · Wachters zweren dat er iets langs de kantelen vloog.",
  "🎁 TIP · Een bonus kondigt zichzelf nu aan. Luister goed."
];
function seededDailyMessage(){
  const d=new Date();
  const seed=(d.getFullYear()*372+d.getMonth()*31+d.getDate());
  return DAILY_CASTLE_MESSAGES[seed%DAILY_CASTLE_MESSAGES.length];
}
function refreshDailyCastleMessage(){
  if(dailyCastleMessage)dailyCastleMessage.textContent=seededDailyMessage();
}
const GAME_MILESTONES=[10,50,100,250,500,1000];
function milestoneForGames(games){
  return GAME_MILESTONES.includes(Number(games))?Number(games):0;
}
function showMilestone(games){
  const mark=milestoneForGames(games);
  if(!mark)return;
  const key=`stampertjesMilestoneShown_${mark}`;
  if(localStore.getItem(key)==="1")return;
  localStore.setItem(key,"1");
  levelTransitioning=true;
  state="transition";
  levelTitle.textContent=`🏅 ${mark} POTJES`;
  levelSubtitle.textContent=mark>=500?"EEN LEGENDE VAN HET KASTEEL!":"MIJLPAAL BEREIKT!";
  levelOverlay.classList.remove("hidden");
  setTimeout(()=>{
    levelOverlay.classList.add("hidden");
    levelTransitioning=false;
    state="play";
    document.body.classList.add("gameplayActive");
  },1500);
}

let introFrame=0;
let introScenario=0;
let introScenarioSeed=Math.random()*1000;
let introScenarioStarted=performance.now();
let pendingScore=0;

function randomizeIntroScenario(){
  introScenario=Math.floor(Math.random()*5);
  introScenarioSeed=Math.random()*1000;
  introScenarioStarted=performance.now();
  // Start at a different moment in the choreography so repeats feel less scripted.
  introFrame=Math.floor(Math.random()*900);
}

const SUPABASE_URL=window.STAMPERTJES_CONFIG.supabaseUrl;
const SUPABASE_KEY=window.STAMPERTJES_CONFIG.supabaseKey;
let onlineScores=[];

function getLocalHighscores(){
  try{
    const data=JSON.parse(localStore.getItem("stampertjesHighscores")||"[]");
    return Array.isArray(data)?data:[];
  }catch{return []}
}
function saveLocalHighscores(scores){
  localStore.setItem("stampertjesHighscores",JSON.stringify(scores));
}
function normalizeScores(rows){
  return (rows||[])
    .map(row=>({
      name:String(row.name||"SPELER").toUpperCase().slice(0,20),
      score:Number(row.score)||0,
      level:Number(row.level)||1,
      created_at:row.created_at||null
    }))
    .sort((a,b)=>{
      if(b.score!==a.score)return b.score-a.score;
      return String(a.created_at||"").localeCompare(String(b.created_at||""));
    })
    .slice(0,20);
}
function hallValueLabel(type,value){
  const n=Number(value)||0;
  if(type==="level")return `LEVEL ${n}`;
  if(type==="teddy")return `${n} ontmoeting${n===1?"":"en"}`;
  if(type==="bonus")return `${n} bonus${n===1?"":"sen"}`;
  if(type==="deaths")return `${n} keer gevallen`;
  if(type==="games")return `${n} potje${n===1?"":"s"}`;
  if(type==="apples")return `${n} Appeliet${n===1?"":"en"}`;
  if(type==="score")return `${n.toLocaleString("nl-NL")} punten`;
  return String(n);
}

function setRecordPreview(list,nameEl,valueEl,type){
  const top=Array.isArray(list)&&list.length?list[0]:null;
  nameEl.textContent=top?String(top.player_name||"SPELER").toUpperCase():"NOG VRIJ";
  valueEl.textContent=top?hallValueLabel(type,top.value):"—";
}

function renderHallModal(type){
  if(!hallDataCache)return;
  const meta={
    apples:["🍎 APPELIETENJAGERS","apples"],
    level:["🏰 DIEPSTE AVONTURIERS","level"],
    games:["🎮 DOORZETTERS","games"],
    teddy:["🐈 TEDDY WHISPERERS","teddy"],
    bonus:["🎁 BONUSJAGERS","bonus"],
    deaths:["💀 EEUWIGE STAMPERS","deaths"]
  };
  const [title,valueType]=meta[type]||["KASTEELRECORD",type];
  const list=hallDataCache?.leaderboards?.[type]||[];
  hallModalTitle.textContent=title;
  hallModalList.innerHTML=list.length?list.map((p,i)=>`
    <div class="hallRankRow">
      <span>${i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}.`}</span>
      <strong>${escapeHtml(p.player_name||"SPELER")}</strong>
      <b>${hallValueLabel(valueType,p.value)}</b>
    </div>
  `).join(""):`<div class="small emptyBox">Nog geen records in deze categorie.</div>`;
  hallRecordModal.classList.remove("hidden");
  hallRecordModal.setAttribute("aria-hidden","false");
}

function closeHallModal(){
  hallRecordModal.classList.add("hidden");
  hallRecordModal.setAttribute("aria-hidden","true");
}

function renderMyHallRanks(ranks){
  const items=[
    ["🏆 Highscore","score"],
    ["🍎 Appelietenjager","apples"],
    ["🏰 Diepste avonturier","level"],
    ["🎮 Doorzetter","games"],
    ["🐈 Teddy Whisperer","teddy"],
    ["🎁 Bonusjager","bonus"]
  ];
  myHallRanks.innerHTML=items.map(([label,key])=>{
    const r=ranks?.[key];
    if(!r||!r.rank)return `<div class="myRankRow"><span>${label}</span><strong>—</strong><small>nog geen positie</small></div>`;
    return `<div class="myRankRow"><span>${label}</span><strong>#${Number(r.rank)}</strong><small>${hallValueLabel(key,Number(r.value)||0)}</small></div>`;
  }).join("");
}

async function loadHallOfFame(){
  hallStatus.textContent="Live gegevens worden uit het kasteel opgehaald…";
  try{
    const response=await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/get_hall_of_fame`,{
      method:"POST",
      headers:{
        "apikey":SUPABASE_KEY,
        "Authorization":`Bearer ${SUPABASE_KEY}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({p_device_id:getStatsDeviceId()})
    });
    if(!response.ok)throw new Error(`Hall ${response.status}: ${await response.text()}`);
    const data=await response.json();
    hallDataCache=data||{};
    // Zelfde bron als de publieke Top 20: ook Developer Portal-wijzigingen zijn direct zichtbaar.
    const scoreResponse=await gameFetch(
      `${SUPABASE_URL}/rest/v1/highscores?select=name,score,level,created_at&order=score.desc&limit=20`,
      {headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`}}
    );
    if(!scoreResponse.ok)throw new Error(`Hall scores ${scoreResponse.status}: ${await scoreResponse.text()}`);
    const hallScores=normalizeScores(await scoreResponse.json()).slice(0,3);
    const setPodium=(entry,nameEl,scoreEl)=>{
      nameEl.textContent=entry?String(entry.name||"SPELER").toUpperCase():"NOG VRIJ";
      scoreEl.textContent=entry?`${Number(entry.score)||0} punten`:"—";
    };
    setPodium(hallScores[0],hallChampion,hallChampionScore);
    setPodium(hallScores[1],hallSecond,hallSecondScore);
    setPodium(hallScores[2],hallThird,hallThirdScore);

    const lb=data?.leaderboards||{};
    setRecordPreview(lb.apples,recordApplesName,recordApplesValue,"apples");
    setRecordPreview(lb.level,recordLevelName,recordLevelValue,"level");
    setRecordPreview(lb.games,recordGamesName,recordGamesValue,"games");
    setRecordPreview(lb.teddy,recordTeddyName,recordTeddyValue,"teddy");
    setRecordPreview(lb.bonus,recordBonusName,recordBonusValue,"bonus");
    setRecordPreview(lb.deaths,recordDeathsName,recordDeathsValue,"deaths");

    renderMyHallRanks(data?.self_ranks||{});
    firstTeddyFinder.textContent=data?.firsts?.teddy_encounter?.player_name
      ? String(data.firsts.teddy_encounter.player_name).toUpperCase()
      : "NOG NIET VASTGELEGD";
    firstEasterFinder.textContent=data?.firsts?.teddy_easter?.player_name
      ? String(data.firsts.teddy_easter.player_name).toUpperCase()
      : "NOG NIET VASTGELEGD";

    hallStatus.textContent="Eregalerij live bijgewerkt vanuit de wereldstatistieken.";
  }catch(err){
    console.error("Hall of Fame laden mislukt:",err);
    hallStatus.textContent="Live Hall of Fame-gegevens zijn tijdelijk niet bereikbaar.";
    myHallRanks.innerHTML="<div class='small'>Jouw posities konden niet worden geladen.</div>";
  }
}

hallRecordGrid.addEventListener("click",e=>{
  const tile=e.target.closest("[data-record]");
  if(tile)renderHallModal(tile.dataset.record);
});
hallModalClose.addEventListener("click",closeHallModal);
hallRecordModal.addEventListener("pointerdown",e=>{
  if(e.target===hallRecordModal)closeHallModal();
});

async function loadOnlineHighscores(){
  scoreList.innerHTML="<div>Online scores laden…</div>";
  try{
    const response=await gameFetch(
      `${SUPABASE_URL}/rest/v1/highscores?select=name,score,level,created_at&order=score.desc&limit=200`,
      {
        headers:{
          "apikey":SUPABASE_KEY,
          "Authorization":`Bearer ${SUPABASE_KEY}`
        }
      }
    );
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    onlineScores=normalizeScores(await response.json());
    renderHighscores();
  }catch(err){
    console.warn("Online highscores niet bereikbaar:",err);
    onlineScores=[];
    renderHighscores(true);
  }
}
async function submitOnlineScore(name,value,reachedLevel){
  const body={name,score:value,level:reachedLevel};
  const response=await gameFetch(`${SUPABASE_URL}/rest/v1/highscores`,{
    method:"POST",
    headers:{
      "apikey":SUPABASE_KEY,
      "Authorization":`Bearer ${SUPABASE_KEY}`,
      "Content-Type":"application/json",
      "Prefer":"return=minimal"
    },
    body:JSON.stringify(body)
  });
  if(!response.ok){
    const text=await response.text();
    throw new Error(`Score opslaan mislukt (${response.status}): ${text}`);
  }
}
function renderHighscores(useLocalFallback=false){
  const scores=(useLocalFallback ? getLocalHighscores() : onlineScores).slice(0,20);
  const medals=["🥇","🥈","🥉"];

  const rows=Array.from({length:20},(_,i)=>{
    const s=scores[i];
    const rank=i<3?medals[i]:`${i+1}.`;

    if(!s){
      return `<div class="scoreRow emptyScore">
        <span>${rank}</span>
        <span>---</span>
        <span>-----</span>
        <span>Lv-</span>
      </div>`;
    }

    const name=escapeHtml(String(s.name||"---").toUpperCase().slice(0,20));
    const scoreText=String(Math.max(0,Number(s.score)||0)).padStart(5,"0");
    const levelText=`Lv${Number(s.level)||1}`;

    return `<div class="scoreRow">
      <span>${rank}</span>
      <span>${name}</span>
      <span>${scoreText}</span>
      <span>${levelText}</span>
    </div>`;
  });

  scoreList.innerHTML=(useLocalFallback?'<p class="small">Offline · lokale scores op dit apparaat</p>':'')+rows.join("");
}
function qualifiesForHighscore(value){
  const scores=onlineScores.slice(0,20);
  return value>0 && (scores.length<20 || value>scores[scores.length-1].score);
}

function updateMenuMusicIconVisibility(){
  const visible=state==="intro" &&
    !mainMenu.classList.contains("hidden") &&
    !overlay.classList.contains("hidden");
  menuMusicIcon.classList.toggle("hidden",!visible);
}

function showMainMenu(){
  document.body.classList.remove("submenu");
  document.getElementById("practiceEnd")?.remove();
  setMusicContext("menu",{playNow:true});
  document.body.classList.remove("scoreMode");
  document.body.classList.remove("gameplayActive");
  if(!attractActive){
    document.body.classList.remove("attractMode");
    attractPrompt.classList.add("hidden");
  }
  mainMenu.classList.remove("hidden");
  scoresSection.classList.add("hidden");
  helpSection.classList.add("hidden");
  historySection.classList.add("hidden");
  roadmapSection.classList.add("hidden");
  hallSection.classList.add("hidden");
  cafeSection.classList.add("hidden");
  merchSection.classList.add("hidden");
  statsSection.classList.add("hidden");
  highscoreEntry.classList.add("hidden");
  document.getElementById("highscoreBox").classList.add("hidden");
  introText.innerHTML="<strong>Het kasteel is gevallen...</strong><br>Alleen een echte Stampertjes-held kan de Appelieten nog stoppen.";
  if(musicOn&&state==="intro")startMusic();
  updateMenuMusicIconVisibility();
}
function showMenuSection(section){
  document.body.classList.add("submenu");
  if(section===cafeSection)setMusicContext("cafe",{playNow:true});
  else if(section===historySection)setMusicContext("chronicles",{playNow:true});
  else if(section===hallSection)setMusicContext("special",{playNow:true});
  else setMusicContext("menu",{playNow:true});
  mainMenu.classList.add("hidden");
  scoresSection.classList.add("hidden");
  helpSection.classList.add("hidden");
  historySection.classList.add("hidden");
  roadmapSection.classList.add("hidden");
  hallSection.classList.add("hidden");
  cafeSection.classList.add("hidden");
  merchSection.classList.add("hidden");
  statsSection.classList.add("hidden");
  section.classList.remove("hidden");
  updateMenuMusicIconVisibility();
}
let menuTouchScrollUntil=0;

function activateButton(button,handler){
  let locked=false;
  let touchStartX=0;
  let touchStartY=0;
  let touchMoved=false;
  let lastTouchEnd=0;

  const execute=e=>{
    if(e){
      e.preventDefault();
      e.stopPropagation();
    }
    if(locked)return;
    locked=true;
    handler();
    setTimeout(()=>{locked=false},220);
  };

  // Desktop/muis blijft een normale klik.
  button.addEventListener("click",e=>{
    // Safari genereert na touchend vaak nog een synthetische click.
    if(Date.now()-lastTouchEnd<700)return;
    execute(e);
  });

  button.addEventListener("touchstart",e=>{
    if(!e.touches||!e.touches.length)return;
    const t=e.touches[0];
    touchStartX=t.clientX;
    touchStartY=t.clientY;
    touchMoved=false;
  },{passive:true});

  button.addEventListener("touchmove",e=>{
    if(!e.touches||!e.touches.length)return;
    const t=e.touches[0];
    const dx=Math.abs(t.clientX-touchStartX);
    const dy=Math.abs(t.clientY-touchStartY);

    // Zodra de vinger duidelijk beweegt is dit scrollen, geen knopdruk.
    if(dx>10||dy>10){
      touchMoved=true;
      menuTouchScrollUntil=Date.now()+260;
    }
  },{passive:true});

  button.addEventListener("touchend",e=>{
    lastTouchEnd=Date.now();

    // Een swipe of loslaten vlak na scrollen opent niets.
    if(touchMoved||Date.now()<menuTouchScrollUntil){
      touchMoved=false;
      return;
    }

    execute(e);
  },{passive:false});

  button.addEventListener("touchcancel",()=>{
    touchMoved=true;
    menuTouchScrollUntil=Date.now()+260;
  },{passive:true});
}


let menuScrollStartY=0;
let menuScrollTracking=false;

document.addEventListener("touchstart",e=>{
  if(state!=="intro"||!e.touches||!e.touches.length)return;
  menuScrollStartY=e.touches[0].clientY;
  menuScrollTracking=true;
},{passive:true});

document.addEventListener("touchmove",e=>{
  if(!menuScrollTracking||state!=="intro"||!e.touches||!e.touches.length)return;
  if(Math.abs(e.touches[0].clientY-menuScrollStartY)>10){
    menuTouchScrollUntil=Date.now()+280;
  }
},{passive:true});

document.addEventListener("touchend",()=>{
  menuScrollTracking=false;
},{passive:true});

document.addEventListener("touchcancel",()=>{
  menuScrollTracking=false;
  menuTouchScrollUntil=Date.now()+280;
},{passive:true});


async function registerCoarseLocation(){
  try{
    if(sessionStorage.getItem("stampertjesGeoDone")==="1")return;
    const r=await gameFetch("https://ipapi.co/json/",{cache:"no-store"});
    if(!r.ok)return;
    const j=await r.json();
    const country=String(j.country_code||"").trim().toUpperCase().slice(0,2);
    const region=String(j.region||"").trim().slice(0,80);
    if(!country)return;
    const save=await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/register_player_location`,{
      method:"POST",
      headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json"},
      body:JSON.stringify({p_device_id:getStatsDeviceId(),p_country_code:country,p_region_name:region||null})
    });
    if(save.ok)sessionStorage.setItem("stampertjesGeoDone","1");
  }catch(_){}
}
setTimeout(registerCoarseLocation,1800);

activateButton(playMenuBtn,()=>{ensurePlayerName();startGame();});
activateButton(statsMenuBtn,async()=>{
  stopAttractMode();
  showMenuSection(statsSection);
  renderStats();
  await loadOnlineStats();
});
activateButton(resetStatsBtn,async()=>{
  localStore.removeItem("stampertjesStats");
  const reset={...DEFAULT_STATS};
  saveStats(reset);
  renderStats();
  await loadOnlineStats();
});

activateButton(scoresMenuBtn,async()=>{
  stopAttractMode();
  document.body.classList.add("scoreMode");
  showMenuSection(scoresSection);
  await loadOnlineHighscores();
});
activateButton(helpMenuBtn,()=>{
  stopAttractMode();
  showMenuSection(helpSection);
});
activateButton(historyMenuBtn,()=>{
  stopAttractMode();
  chronicleIndex=0;
  renderChroniclePage();
  showMenuSection(historySection);
});
activateButton(newsMenuBtn,()=>{
  stopAttractMode();
  showMenuSection(roadmapSection);
});
activateButton(hallMenuBtn,async()=>{
  stopAttractMode();
  showMenuSection(hallSection);
  await loadOnlineHighscores();
  await loadHallOfFame();
});


function updateMerchUI(){
  
function openMediaViewer({src,title,downloadKey=null}){
  activeDownloadWallpaper=downloadKey;
  mediaViewerTitle.textContent=title||"BEKIJK GROOT";
  mediaViewerImage.src=src;
  mediaViewerDownload.classList.toggle("hidden",!downloadKey);
  mediaViewerHint.classList.toggle("hidden",!downloadKey);
  if(downloadKey){mediaViewerDownload.href=src;mediaViewerDownload.download=`de-stampertjes-${downloadKey}.png`;}
  else{mediaViewerDownload.removeAttribute("href");mediaViewerDownload.removeAttribute("download");}
  mediaViewer.classList.remove("hidden");mediaViewer.setAttribute("aria-hidden","false");
}
function closeMediaViewer(){mediaViewer.classList.add("hidden");mediaViewer.setAttribute("aria-hidden","true");activeDownloadWallpaper=null;}
async function registerWallpaperDownload(){if(!activeDownloadWallpaper)return;try{await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/register_wallpaper_download`,{method:"POST",headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({p_device_id:getStatsDeviceId(),p_wallpaper_key:activeDownloadWallpaper})});}catch(_){}}
mediaViewerClose.addEventListener("click",e=>{e.preventDefault();closeMediaViewer()});
mediaViewer.addEventListener("click",e=>{if(e.target===mediaViewer)closeMediaViewer()});
mediaViewerDownload.addEventListener("click",registerWallpaperDownload);
merchDesigns.querySelectorAll(".merchDesign img").forEach(img=>{
  const open=e=>{e.preventDefault();e.stopPropagation();const card=img.closest(".merchDesign");const label=card?.querySelector(".merchDesignLabel")?.textContent||"STAMPERTJES SHIRT";openMediaViewer({src:img.getAttribute("src"),title:label});};
  img.addEventListener("click",open);img.addEventListener("touchend",open,{passive:false});
});
wallpaperGrid.querySelectorAll("[data-wallpaper]").forEach(card=>activateButton(card,()=>openMediaViewer({src:card.dataset.src,title:card.dataset.title,downloadKey:card.dataset.wallpaper})));

merchDesigns.querySelectorAll("[data-design]").forEach(btn=>btn.classList.toggle("selected",btn.dataset.design===merchChoice.design));
  merchSizes.querySelectorAll("[data-size]").forEach(btn=>btn.classList.toggle("selected",btn.dataset.size===merchChoice.size));
  merchPersonalization.querySelectorAll("[data-personalized]").forEach(btn=>btn.classList.toggle("selected",String(merchChoice.personalized)===btn.dataset.personalized));
  const existing=getPlayerName();
  if(!merchPlayerName.value || merchPlayerName.value==="SPELER")merchPlayerName.value=existing==="SPELER"?"":existing;
  merchPlayerName.disabled=!merchChoice.personalized;
  merchPlayerName.closest(".merchNameLabel")?.classList.toggle("disabled",!merchChoice.personalized);
}

async function submitMerchInterest(interested){
  merchStatus.textContent=interested?"Interesse wordt genoteerd…":"Prima — misschien later!";
  if(!interested){
    try{
      await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/register_merch_interest`,{
        method:"POST",
        headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json"},
        body:JSON.stringify({
          p_device_id:getStatsDeviceId(),
          p_interested:false,
          p_personalized:false,
          p_shirt_size:null,
          p_player_name:getPlayerName()
        })
      });
    }catch(_){}
    setTimeout(()=>showMainMenu(),500);
    return;
  }

  const chosenName=merchChoice.personalized
    ? String(merchPlayerName.value||getPlayerName()).trim().toUpperCase().slice(0,12)
    : getPlayerName();

  try{
    const response=await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/register_merch_interest`,{
      method:"POST",
      headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json"},
      body:JSON.stringify({
        p_device_id:getStatsDeviceId(),
        p_interested:true,
        p_personalized:merchChoice.personalized,
        p_shirt_size:merchChoice.size,
        p_player_name:chosenName,
          p_shirt_design:merchChoice.design
      })
    });
    if(!response.ok)throw new Error(`${response.status}: ${await response.text()}`);
    localStore.setItem("stampertjesMerchDesign",merchChoice.design);
    localStore.setItem("stampertjesMerchSize",merchChoice.size);
    localStore.setItem("stampertjesMerchPersonalized",String(merchChoice.personalized));
    merchStatus.innerHTML=`✓ INTERESSE GENOTEERD<br><small>${merchChoice.design.toUpperCase()} · ${merchChoice.size}${merchChoice.personalized?` · ${escapeHtml(chosenName)}`:""}</small>`;
    tone(440,.07,"square",.025,660);
    setTimeout(()=>tone(660,.1,"square",.025,880),90);
  }catch(err){
    console.error("Merchandise interesse opslaan mislukt:",err);
    merchStatus.textContent="Opslaan lukt nog niet. Controleer of SQL 008 actief is.";
  }
}

merchDesigns.querySelectorAll("[data-design]").forEach(btn=>activateButton(btn,()=>{
  merchChoice.design=btn.dataset.design;
  if(merchChoice.design==="held")merchChoice.personalized=true;
  updateMerchUI();
}));
merchSizes.querySelectorAll("[data-size]").forEach(btn=>activateButton(btn,()=>{merchChoice.size=btn.dataset.size;updateMerchUI();}));
merchPersonalization.querySelectorAll("[data-personalized]").forEach(btn=>activateButton(btn,()=>{
  merchChoice.personalized=btn.dataset.personalized==="true";
  updateMerchUI();
}));
activateButton(merchInterestBtn,()=>submitMerchInterest(true));
activateButton(merchLaterBtn,()=>submitMerchInterest(false));

activateButton(merchMenuBtn,()=>{
  stopAttractMode();
  merchChoice.design=localStore.getItem("stampertjesMerchDesign")||"classic";
  merchChoice.size=localStore.getItem("stampertjesMerchSize")||"L";
  merchChoice.personalized=localStore.getItem("stampertjesMerchPersonalized")==="true";
  merchStatus.textContent="";
  updateMerchUI();
  showMenuSection(merchSection);
});

activateButton(cafeMenuBtn,async()=>{
  stopAttractMode();
  showMenuSection(cafeSection);
  await refreshCafe();
});




const DEFAULT_STATS={
  gamesPlayed:0,
  bestScore:0,
  highestLevel:1,
  applesDefeated:0,
  deaths:0,
  longestCombo:0,
  teddyFound:false,
  achievements:[]
};

let statsSyncTimer=null;

function getStats(){
  try{
    const saved=JSON.parse(localStore.getItem("stampertjesStats")||"{}");
    return {...DEFAULT_STATS,...saved};
  }catch{
    return {...DEFAULT_STATS};
  }
}

function getStatsDeviceId(){
  let id=localStore.getItem("stampertjesDeviceId");
  if(!id){
    if(window.crypto&&crypto.randomUUID){
      id=crypto.randomUUID();
    }else{
      id="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,c=>{
        const r=Math.random()*16|0;
        const v=c==="x"?r:(r&3|8);
        return v.toString(16);
      });
    }
    localStore.setItem("stampertjesDeviceId",id);
  }
  return id;
}

function rememberPlayerName(value){
  const clean=String(value||"").trim().toUpperCase().slice(0,20);
  if(clean)localStore.setItem("stampertjesPlayerName",clean);
  return clean;
}

function getPlayerName(){
  return (
    localStore.getItem("stampertjesPlayerName") ||
    rememberPlayerName(nameInput?.value) ||
    rememberPlayerName(cafeName?.value) ||
    "SPELER"
  );
}

function ensurePlayerName(){
  const existing=String(localStore.getItem("stampertjesPlayerName")||"").trim();
  if(existing && existing!=="SPELER")return existing;

  // Ask once on this device. Cancelling keeps the anonymous fallback.
  if(localStore.getItem("stampertjesNameAsked")==="1")return "SPELER";
  localStore.setItem("stampertjesNameAsked","1");

  const entered=window.prompt("HOE MOGEN WE JE NOEMEN?\\n(maximaal 10 tekens — overslaan mag)");
  const clean=rememberPlayerName(entered);
  if(clean){
    if(nameInput)nameInput.value=clean;
    if(cafeName && !getLockedCafeName())cafeName.value=clean;
    queueStatsSync(getStats());
    updatePlayerContextOnline();
    return clean;
  }
  return "SPELER";
}

function updateProgressStats(){
  if(devTestActive)return;
  const s=getStats();
  s.bestScore=Math.max(Number(s.bestScore)||0,Number(score)||0);
  s.highestLevel=Math.max(Number(s.highestLevel)||1,Number(level)||1);
  saveStats(s);
  return s;
}

function saveStats(stats){
  if(devTestActive)return;
  const clean={
    ...DEFAULT_STATS,
    ...stats,
    gamesPlayed:Math.max(0,Number(stats.gamesPlayed)||0),
    bestScore:Math.max(0,Number(stats.bestScore)||0),
    highestLevel:Math.max(1,Number(stats.highestLevel)||1),
    applesDefeated:Math.max(0,Number(stats.applesDefeated)||0),
    deaths:Math.max(0,Number(stats.deaths)||0),
    longestCombo:Math.max(0,Number(stats.longestCombo)||0),
    teddyFound:Boolean(stats.teddyFound),
    achievements:Array.isArray(stats.achievements)?stats.achievements:[]
  };
  localStore.setItem("stampertjesStats",JSON.stringify(clean));
  queueStatsSync(clean);
}

function queueStatsSync(stats=getStats()){
  clearTimeout(statsSyncTimer);
  statsSyncTimer=setTimeout(()=>{
    syncOnlineStats(stats).catch(err=>console.warn("Statistieken synchroniseren mislukt:",err));
  },250);
}

async function syncOnlineStats(stats=getStats()){
  const payload={
    p_device_id:getStatsDeviceId(),
    p_player_name:getPlayerName(),
    p_games_played:Number(stats.gamesPlayed)||0,
    p_best_score:Number(stats.bestScore)||0,
    p_highest_level:Number(stats.highestLevel)||1,
    p_apples_defeated:Number(stats.applesDefeated)||0,
    p_deaths:Number(stats.deaths)||0,
    p_longest_combo:Number(stats.longestCombo)||0,
    p_teddy_found:Boolean(stats.teddyFound)
  };

  const response=await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/submit_player_stats`,{
    method:"POST",
    headers:{
      "apikey":SUPABASE_KEY,
      "Authorization":`Bearer ${SUPABASE_KEY}`,
      "Content-Type":"application/json"
    },
    body:JSON.stringify(payload)
  });

  if(!response.ok){
    const text=await response.text();
    throw new Error(`${response.status}: ${text}`);
  }
}

function detectGamePlatform(){
  const ua=navigator.userAgent||"";
  if(/iPhone/i.test(ua))return "iPhone";
  if(/iPad/i.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1))return "iPad";
  if(/Android/i.test(ua))return "Android";
  if(navigator.maxTouchPoints>1&&innerWidth<800)return "Mobile";
  return "Desktop";
}

async function updatePlayerContextOnline(){
  try{
    const payload={
      p_device_id:getStatsDeviceId(),
      p_player_name:getPlayerName(),
      p_platform:detectGamePlatform(),
      p_audio_mode:audioMode,
      p_game_version:CURRENT_VERSION
    };
    const response=await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/update_player_context`,{
      method:"POST",
      headers:{
        "apikey":SUPABASE_KEY,
        "Authorization":`Bearer ${SUPABASE_KEY}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    });
    if(!response.ok)throw new Error(`${response.status}: ${await response.text()}`);
  }catch(err){
    console.warn("Spelercontext synchroniseren mislukt:",err);
  }
}

async function logGameEvent(eventType,extra={}){
  if(devTestActive)return;
  try{
    const payload={
      p_device_id:getStatsDeviceId(),
      p_event_type:eventType,
      p_level:extra.level??level??null,
      p_score:extra.score??score??null,
      p_bonus_type:extra.bonusType??null,
      p_room:extra.room??(typeof currentCastleTheme==="function"?currentCastleTheme().name:null),
      p_platform:detectGamePlatform(),
      p_game_version:CURRENT_VERSION
    };
    const response=await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/log_stampertjes_event`,{
      method:"POST",
      headers:{
        "apikey":SUPABASE_KEY,
        "Authorization":`Bearer ${SUPABASE_KEY}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    });
    if(!response.ok)throw new Error(`${response.status}: ${await response.text()}`);
  }catch(err){
    // Analytics must never interrupt gameplay.
    console.warn("Game-event kon niet worden geregistreerd:",eventType,err);
  }
}

async function registerTeddyDiscovery(discoveryType){
  try{
    const response=await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/register_teddy_discovery`,{
      method:"POST",
      headers:{
        "apikey":SUPABASE_KEY,
        "Authorization":`Bearer ${SUPABASE_KEY}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        p_device_id:getStatsDeviceId(),
        p_player_name:getPlayerName(),
        p_discovery_type:discoveryType,
        p_level:state==="play"||state==="teddy"?level:null,
        p_score:state==="play"||state==="teddy"?score:null,
        p_platform:detectGamePlatform(),
        p_game_version:CURRENT_VERSION
      })
    });
    if(!response.ok)throw new Error(`${response.status}: ${await response.text()}`);
  }catch(err){
    console.warn("Teddy-ontdekking kon niet apart worden geregistreerd:",err);
  }
}

function renderStats(){
  updateProgressStats();
  const s=getStats();
  const achievements=Array.isArray(s.achievements)?s.achievements:[];
  statsList.innerHTML=`
    <div class="statRow"><span>Spelersnaam</span><strong>${escapeHtml(getPlayerName())}</strong></div>
    <div class="statRow"><span>Gespeelde potjes</span><strong>${Number(s.gamesPlayed)||0}</strong></div>
    <div class="statRow"><span>Beste score</span><strong>${Number(s.bestScore)||0}</strong></div>
    <div class="statRow"><span>Hoogste level</span><strong>${Number(s.highestLevel)||1}</strong></div>
    <div class="statRow"><span>Verslagen Appelieten</span><strong>${Number(s.applesDefeated)||0}</strong></div>
    <div class="statRow"><span>Gevallen</span><strong>${Number(s.deaths)||0}</strong></div>
    <div class="statRow"><span>Langste combo</span><strong>${Number(s.longestCombo)||0}</strong></div>
    <div class="statRow"><span>Teddy gevonden</span><strong>${s.teddyFound?"JA":"NEE"}</strong></div>
    <div class="statRow"><span>Achievements</span><strong>${achievements.length}</strong></div>
  `;
}

async function loadOnlineStats(){
  onlineStatsStatus.textContent="Online statistieken laden…";
  onlineStatsList.innerHTML="";
  onlineStatsLeaders.innerHTML="";

  try{
    await syncOnlineStats(getStats());

    const [response,highscoreResponse]=await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/rpc/get_public_stats`,{
        method:"POST",
        headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json"},
        body:"{}"
      }),
      fetch(`${SUPABASE_URL}/rest/v1/highscores?select=name,score,level,created_at&order=score.desc&limit=200`,{
        headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`}
      })
    ]);
    if(!response.ok)throw new Error(`${response.status}: ${await response.text()}`);
    if(!highscoreResponse.ok)throw new Error(`${highscoreResponse.status}: ${await highscoreResponse.text()}`);
    const data=await response.json();
    const highscoreRows=normalizeScores(await highscoreResponse.json());
    const totals=data?.totals||{};
    const leaders=highscoreRows.slice(0,10).map(s=>({player_name:s.name,best_score:s.score,highest_level:s.level}));
    const highscoreHighestLevel=highscoreRows.reduce((m,s)=>Math.max(m,Number(s.level)||1),1);

    onlineStatsStatus.textContent="Bijgewerkt vanuit het Stampertjes-kasteel";
    onlineStatsList.innerHTML=`
      <div class="statRow"><span>Spelers</span><strong>${Number(totals.players)||0}</strong></div>
      <div class="statRow"><span>Gespeelde potjes</span><strong>${Number(totals.games_played)||0}</strong></div>
      <div class="statRow"><span>Appelieten verslagen</span><strong>${Number(totals.apples_defeated)||0}</strong></div>
      <div class="statRow"><span>Totaal gevallen</span><strong>${Number(totals.deaths)||0}</strong></div>
      <div class="statRow"><span>Teddy gevonden</span><strong>${Number(totals.teddy_finders)||0} spelers</strong></div>
      <div class="statRow"><span>Hoogste level wereldwijd</span><strong>${Math.max(Number(totals.highest_level)||1,highscoreHighestLevel)}</strong></div>
    `;

    if(leaders.length){
      onlineStatsLeaders.innerHTML=`
        <h3>BESTE AVONTURIERS</h3>
        ${leaders.map((p,i)=>`
          <div class="onlineLeader">
            <span>${i+1}.</span>
            <span>${escapeHtml(p.player_name||"SPELER")}</span>
            <span>${Number(p.best_score)||0}</span>
            <span>Lv${Number(p.highest_level)||1}</span>
          </div>
        `).join("")}
      `;
    }
  }catch(err){
    console.error(err);
    onlineStatsStatus.textContent="Online statistieken zijn nog niet beschikbaar. Voer eerst de nieuwe Supabase-SQL uit.";
  }
}

const chroniclePages=[
  {
    title:"🌩️ De Eerste Scheur",
    art:"🏰  ⚡  🪨",
    body:`<p><span class="chapterDrop">L</span>ang voordat iemand het woord Appeliet kende, was het kasteel een rustige plek. De vloeren kraakten, de torens piepten in de wind en 's nachts sloeg alleen de oude klok.</p>
    <p>Tot een storm boven het dal bleef hangen. Bij de laatste donderslag trilde de grote zaal en verscheen midden in de stenen vloer een haarfijne scheur.</p>
    <p>De volgende ochtend was de scheur breder. En vanuit de diepte klonk iets dat verdacht veel leek op... gelach.</p>
    <p class="chronicleCliff">Die nacht rolde er iets groens uit de opening.</p>`
  },
  {
    title:"🍏 De Eerste Appeliet",
    art:"🕳️  🍏  ❓",
    body:`<p>Het wezen was rond, groen en opvallend eigenwijs. Het wandelde door de gangen alsof het kasteel altijd al van hem was geweest.</p>
    <p>De bewoners probeerden hem weg te jagen met bezems, emmers en een bijzonder slechte vioolspeler. Niets hielp.</p>
    <p>Toen verschenen er twee. Daarna vijf. Binnen enkele dagen krioelde het op de onderste verdieping van de Appelieten.</p>
    <p class="chronicleCliff">En precies toen begaf de eerste vloerplaat het.</p>`
  },
  {
    title:"👣 De Eerste Stampertjes",
    art:"👢  💥  🍏",
    body:`<p><span class="chapterDrop">N</span>iemand weet meer wie de eerste was. Volgens de ene legende was het een bewaker, volgens de andere een kok die zijn soeppan liet vallen.</p>
    <p>Wat wel vaststaat: drie harde stampen maakten de verzwakte vloer open. Een Appeliet viel erin en zat muurvast.</p>
    <p>De bewoners begrepen het principe al snel: lokken, stampen, vangen en op het juiste moment toeslaan.</p>
    <p>De dappersten onder hen kregen al snel een naam: <strong>De Stampertjes</strong>.</p>
    <p class="chronicleCliff">Maar de Appelieten leerden sneller dan iemand had verwacht.</p>`
  },
  {
    title:"🏰 Het Kasteel Groeit",
    art:"🪜  🏰  🪜",
    body:`<p>Nieuwe zalen werden geopend en oude trappen hersteld. Waar eerst één verdieping was, ontstond een doolhof van ladders, balkons en gangen.</p>
    <p>De Appelieten pasten zich aan. De Appelieten leerden nieuwe routes kennen. Ze gebruikten ladders en wachtten soms precies naast de plek waar een Stampertje wilde landen.</p>
    <p>Voor iedere nieuwe zaal ontstonden nieuwe trucs, nieuwe helden en nieuwe verhalen.</p>
    <p class="chronicleCliff">Tot iemand achter een dichtgemetselde muur een deur vond zonder klink.</p>`
  },
  {
    title:"📚 De Verborgen Bibliotheek",
    art:"📚  🗝️  🗺️",
    body:`<p>Achter de deur lag een bibliotheek die op geen enkele plattegrond stond. Het stof was dik, maar één boek lag open alsof iemand het zojuist had neergelegd.</p>
    <p>Op de tafel lag een kaart van het kasteel. Alleen... de kaart toonde veel meer verdiepingen dan er volgens de bouwmeester bestonden.</p>
    <p>Sommige routes eindigden bij zwarte inktvlekken. Eén route liep recht naar beneden en eindigde bij een klein kroontje.</p>
    <p class="chronicleCliff">In de marge stond slechts één woord: <strong>KONING</strong>.</p>`
  },
  {
    title:"🐈 Teddy, de Wachter",
    art:"🌙  🐈  🔑",
    body:`<p><span class="chapterDrop">V</span>anaf die dag begonnen avonturiers een grote kat in de gangen te zien. Hij verscheen nooit lang en zat vaak op plekken waar kort daarna iets bijzonders werd ontdekt.</p>
    <p>Zijn naam was Teddy. Niemand wist waar hij vandaan kwam. Sommige Stampertjes beweerden dat hij ouder was dan het kasteel zelf.</p>
    <p>Wie hem volgde, vond soms een verborgen doorgang. Wie hem probeerde te vangen, vond meestal alleen een lege gang en een paar haren op de vloer.</p>
    <p class="chronicleCliff">Op een nacht bleef Teddy voor het eerst staan... voor de trap naar de kelder.</p>`
  },
  {
    title:"⚔️ De Verdwenen Held",
    art:"🛡️  🕯️  ?",
    body:`<p>Een beroemde Stampertjes-held besloot de waarschuwingen te negeren en alleen af te dalen. Hij nam een lamp, een hamer en de kaart uit de bibliotheek mee.</p>
    <p>Drie dagen later werd de lamp teruggevonden. De kaart was verdwenen. Van de held zelf ontbrak ieder spoor.</p>
    <p>Alleen twee afdrukken van laarzen stonden in het stof. Ze wezen niet naar de uitgang, maar naar een muur.</p>
    <p class="chronicleCliff">Achter die muur klonk heel zacht: drie stampen.</p>`
  },
  {
    title:"🕯️ De Donkere Kerkers",
    art:"🕯️  🌫️  🚪",
    body:`<p>De oude kerkers werden afgesloten. Toch hoorden wachters 's nachts kettingen, druppelend water en voetstappen onder de stenen.</p>
    <p>Soms waaide er koude mist omhoog door scheuren in de vloer. Andere keren doofden alle fakkels tegelijk.</p>
    <p>De meest ervaren Stampertjes zeiden dat de Appelieten daar beneden anders bewogen. Alsof ze bevelen ontvingen.</p>
    <p class="chronicleCliff">En toen werd er voor het eerst een gouden glans in het donker gezien.</p>`
  },
  {
    title:"🌍 De Wereld Ontdekt het Kasteel",
    art:"🌍  🏆  🏰",
    body:`<p>Verhalen over het kasteel verspreidden zich tot ver buiten het dal. Nieuwe avonturiers kwamen hun geluk beproeven.</p>
    <p>Scores verschenen op een wereldwijde ranglijst. In het Stampertjes Café werden tactieken gedeeld, bugs gemeld en wilde theorieën besproken.</p>
    <p>Sommige spelers kwamen voor de punten. Anderen zochten Teddy. Een enkeling zocht vooral naar de deur uit de oude kaart.</p>
    <p class="chronicleCliff">Toen plaatste iemand in het Café een bericht: “Ik heb de kroon gezien.”</p>`
  },
  {
    title:"☕ Geruchten uit het Café",
    art:"☕  💬  👑",
    body:`<p>Niet ieder verhaal in het Café is waar. Waarschijnlijk.</p>
    <p>Er wordt gesproken over vreemde voetstappen achter muren, een kamer waarin de tijd anders lijkt te lopen en een melodie die alleen klinkt als alle lichten uit zijn.</p>
    <p>Ook zou er ergens een sleutel bestaan die niet op een deur past, maar op een hoofdstuk.</p>
    <p class="chronicleCliff">Opvallend genoeg verdween het bericht over die sleutel dezelfde nacht.</p>`
  },
  {
    title:"👑 De Schaduw van de Appelkoning",
    art:"🚪  👁️👁️  👑",
    body:`<p><span class="chapterDrop">O</span>nder het oudste deel van het kasteel staat een poort die geen enkele smid heeft kunnen openen.</p>
    <p>Op de steen erboven staat een kroon. Soms trilt de poort als een Appeliet wordt verslagen. Soms klinkt er aan de andere kant iets dat op applaus lijkt.</p>
    <p>Niemand weet wie of wat er wacht. Maar één ding wordt steeds duidelijker: de Appelieten kwamen niet zomaar naar boven.</p>
    <p class="chronicleCliff">Iemand heeft ze gestuurd.</p>`
  },
  {
    title:"✍️ Jouw Hoofdstuk",
    art:"📜  ✍️  💡",
    body:`<p>De Kronieken zijn nog niet af. Nieuwe zalen worden ontdekt, nieuwe Appelieten verschijnen en iedere speler schrijft een klein stukje geschiedenis.</p>
    <p>Heb jij een idee voor een level, vijand, geheim, power-up of eindbaas? Laat het achter in het <strong>Stampertjes Café</strong>.</p>
    <p>Misschien wordt jouw idee ooit onderdeel van het kasteel.</p>
    <p style="text-align:center;margin-top:24px"><strong>🙏 Speciale dank aan Vera voor het bugtesten.</strong></p>
    <p style="text-align:center"><strong>Ontwikkeld door GJ Studios</strong></p>`
  },
  {
    title:"❓ Hoofdstuk XIII",
    art:"🔒  ?  🔒",
    locked:true,
    body:`<div class="chronicleLocked">
      <div class="lock">🔒</div>
      <p><strong>DIT HOOFDSTUK IS NOG NIET ONTDEKT...</strong></p>
      <p>Ergens in een toekomstige versie verandert deze bladzijde.</p>
      <p>Tot die tijd blijft de laatste pagina van de Kronieken verzegeld.</p>
    </div>`
  }
];

let chronicleIndex=0;
let chronicleTurning=false;

async function sfxPageTurn(){
  if(!fxOn)return;
  const ready=await audio();
  if(!ready||!audioCtx)return;
  const now=audioCtx.currentTime;
  const buffer=audioCtx.createBuffer(1,Math.floor(audioCtx.sampleRate*.11),audioCtx.sampleRate);
  const data=buffer.getChannelData(0);
  for(let i=0;i<data.length;i++){
    const fade=1-(i/data.length);
    data[i]=(Math.random()*2-1)*fade*.06;
  }
  const source=audioCtx.createBufferSource();
  const filter=audioCtx.createBiquadFilter();
  const gain=audioCtx.createGain();
  filter.type="highpass";
  filter.frequency.value=650;
  gain.gain.value=.20;
  source.buffer=buffer;
  source.connect(filter);filter.connect(gain);gain.connect(audioCtx.destination);
  source.start(now);
}

function renderChroniclePage(direction=0){
  const page=chroniclePages[chronicleIndex];
  chroniclePageContent.innerHTML=`
    <div class="chronicleChapter">HOOFDSTUK ${String(chronicleIndex+1).padStart(2,"0")}</div>
    <h3>${page.title}</h3>
    <div class="chronicleArt">${page.art||"🏰"}</div>
    ${page.body}
  `;
  chroniclePageNumber.textContent=`Pagina ${chronicleIndex+1} van ${chroniclePages.length}`;
  chroniclePrev.disabled=chronicleIndex===0;
  chronicleNext.disabled=chronicleIndex===chroniclePages.length-1;

  if(direction!==0){
    const cls=direction>0?"turningNext":"turningPrev";
    chroniclePage.classList.remove("turningNext","turningPrev");
    void chroniclePage.offsetWidth;
    chroniclePage.classList.add(cls);
    setTimeout(()=>chroniclePage.classList.remove(cls),360);
  }
}

activateButton(chroniclePrev,()=>{
  if(chronicleTurning||chronicleIndex===0)return;
  chronicleTurning=true;
  chronicleIndex--;
  sfxPageTurn();
  renderChroniclePage(-1);
  setTimeout(()=>{chronicleTurning=false},380);
});

activateButton(chronicleNext,()=>{
  if(chronicleTurning||chronicleIndex===chroniclePages.length-1)return;
  chronicleTurning=true;
  chronicleIndex++;
  sfxPageTurn();
  renderChroniclePage(1);
  setTimeout(()=>{chronicleTurning=false},380);
});

renderChroniclePage();
initCafeName();


function getCafeDeviceId(){
  let id=localStore.getItem("stampertjesCafeDeviceId");
  if(!id){
    if(window.crypto&&crypto.randomUUID){
      id=crypto.randomUUID();
    }else{
      id="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,c=>{
        const r=Math.random()*16|0;
        const v=c==="x"?r:(r&3|8);
        return v.toString(16);
      });
    }
    localStore.setItem("stampertjesCafeDeviceId",id);
  }
  return id;
}

let cafeAdminCode=sessionStorage.getItem("stampertjesCafeAdminCode")||"";
let cafeEditingPostId=null;

function isCafeAdmin(){
  return Boolean(cafeAdminCode);
}


async function verifyCafeAdminCode(code){
  try{
    const response=await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/verify_stampertjes_admin`,{
      method:"POST",
      headers:{
        "apikey":SUPABASE_KEY,
        "Authorization":`Bearer ${SUPABASE_KEY}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({p_admin_code:String(code||"")})
    });
    if(!response.ok)return false;
    const result=await response.json();
    return result===true;
  }catch(err){
    console.error("Admincode controleren mislukt:",err);
    return false;
  }
}

function setCafeAdminMode(on,code=""){
  cafeAdminCode=on?String(code||""):"";
  if(cafeAdminCode){
    sessionStorage.setItem("stampertjesCafeAdminCode",cafeAdminCode);
    cafeAdminStatus.classList.remove("hidden");
  }else{
    sessionStorage.removeItem("stampertjesCafeAdminCode");
    cafeAdminStatus.classList.add("hidden");
  }
}

function isValidCafeName(value){
  return String(value||"").trim().length>=2;
}

function updateCafeSubmitState(){
  if(cafeSubmitBtn.dataset.saving==="1")return;
  cafeSubmitBtn.disabled=!isValidCafeName(cafeName.value);
}

function getLockedCafeName(){
  return String(localStore.getItem("stampertjesCafeLockedName")||"").trim();
}

function lockCafeName(name){
  const clean=String(name||"").trim().toUpperCase().slice(0,20);
  if(!clean)return "";
  localStore.setItem("stampertjesCafeLockedName",clean);
  localStore.setItem("stampertjesPlayerName",clean);
  cafeName.value=clean;
  cafeName.readOnly=true;
  cafeName.classList.add("lockedName");
  cafeNameHint.textContent=`Vaste Café-naam: ${clean}`;
  return clean;
}

function initCafeName(){
  let locked=getLockedCafeName();
  let saved=String(localStore.getItem("stampertjesPlayerName")||"").trim();

  // Oude hardcoded standaardnaam uit eerdere testversies opruimen.
  if(saved.toUpperCase()==="GERT JAN"){
    localStore.removeItem("stampertjesPlayerName");
    saved="";
  }

  if(locked){
    cafeName.value=locked;
    cafeName.readOnly=true;
    cafeName.classList.add("lockedName");
    cafeNameHint.textContent=`Vaste Café-naam: ${locked}`;
  }else{
    cafeName.value=saved && saved.toUpperCase()!=="GERT JAN" ? saved : "";
    cafeName.readOnly=false;
    cafeName.classList.remove("lockedName");
    cafeNameHint.textContent="Je kiest je Café-naam één keer. Na je eerste bericht wordt hij vastgezet.";
  }

  updateCafeSubmitState();
}

function resetCafeEdit(){
  cafeEditingPostId=null;
  cafeSubmitBtn.textContent="BERICHT PLAATSEN";
  cafeCancelEditBtn.classList.add("hidden");
  cafeMessage.value="";
  cafeCounter.textContent="0 / 240";
  updateCafeSubmitState();
}

function escapeHtml(value){
  return String(value??"")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function cafeTypeLabel(type){
  const labels={
    "Algemeen":"💬 Algemeen",
    "Idee":"💡 Idee",
    "Bug":"🐞 Bug",
    "Highscore":"🎉 Highscore",
    "GJ Studios":"📢 GJ Studios"
  };
  return labels[type]||"💬 Algemeen";
}

function cafeMessageNotice(type){
  if(type==="Idee")return "⭐ Dit idee kan in een toekomstige update worden opgenomen.";
  if(type==="Bug")return "🔧 Bedankt! Deze melding helpt ons het spel te verbeteren.";
  if(type==="Highscore")return "🏆 Mooie prestatie! Kun jij de wereldwijde Top 10 halen?";
  return "";
}

function formatCafeDate(value){
  try{
    return new Intl.DateTimeFormat("nl-NL",{
      day:"2-digit",month:"2-digit",year:"numeric",
      hour:"2-digit",minute:"2-digit"
    }).format(new Date(value));
  }catch{return ""}
}

async function fetchCafeCount(type=null){
  const filter=type?`&type=eq.${encodeURIComponent(type)}`:"";
  const response=await gameFetch(
    `${SUPABASE_URL}/rest/v1/community_posts?select=id${filter}`,
    {
      headers:{
        "apikey":SUPABASE_KEY,
        "Authorization":`Bearer ${SUPABASE_KEY}`,
        "Prefer":"count=exact",
        "Range":"0-0"
      }
    }
  );
  if(!response.ok)throw new Error(`HTTP ${response.status}`);
  const range=response.headers.get("content-range")||"0-0/0";
  return Number(range.split("/")[1])||0;
}

async function loadCafeStats(){
  try{
    const [total,ideas,bugs,highscores]=await Promise.all([
      fetchCafeCount(),fetchCafeCount("Idee"),fetchCafeCount("Bug"),fetchCafeCount("Highscore")
    ]);
    cafeTotalCount.textContent=total;
    cafeIdeaCount.textContent=ideas;
    cafeBugCount.textContent=bugs;
    cafeHighscoreCount.textContent=highscores;
  }catch(err){
    console.warn("Caféstatistieken niet bereikbaar",err);
    cafeTotalCount.textContent=cafeIdeaCount.textContent=cafeBugCount.textContent=cafeHighscoreCount.textContent="—";
  }
}

async function refreshCafe(){
  await loadCafePosts();
}

async function loadCafePosts(){
  cafePosts.innerHTML="<div>Berichten laden…</div>";

  // Tellers altijd opnieuw ophalen. Dit gebeurt onafhankelijk van de berichtenlijst:
  // een probleem met één van beide mag de andere niet blokkeren.
  const statsPromise=loadCafeStats();

  try{
    const response=await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/get_community_posts`,{
      method:"POST",
      headers:{
        "apikey":SUPABASE_KEY,
        "Authorization":`Bearer ${SUPABASE_KEY}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({p_device_id:getCafeDeviceId()})
    });
    if(!response.ok)throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    const posts=await response.json();
    renderCafePosts(posts);
  }catch(err){
    console.error(err);
    cafePosts.innerHTML="<div>Het Café is tijdelijk niet bereikbaar. Probeer het later opnieuw.</div>";
  }

  await statsPromise;
}

function renderCafePosts(posts){
  if(!posts.length){
    cafePosts.innerHTML="<div>Nog geen berichten. Plaats de eerste!</div>";
    return;
  }

  cafePosts.innerHTML=posts.map(post=>{
    const own=Boolean(post.is_own);
    const canDelete=own||isCafeAdmin();
    const canEdit=own;
    const actions=(canEdit||canDelete)?`
      <div class="cafePostActions">
        ${canEdit?`<button class="cafeActionBtn cafeEditBtn" data-edit-id="${Number(post.id)}">✏️ BEWERK</button>`:""}
        ${canDelete?`<button class="cafeActionBtn cafeDeleteBtn" data-delete-id="${Number(post.id)}">🗑️ VERWIJDER</button>`:""}
      </div>`:"";

    return `
      <article class="cafePost">
        <div class="cafePostHeader">
          <div>
            <div class="cafePostName">${escapeHtml(post.name)}</div>
            <div class="cafePostType">${cafeTypeLabel(post.type)}</div>
          </div>
          <div>${formatCafeDate(post.created_at)}</div>
        </div>
        <div class="cafePostMessage">${escapeHtml(post.message)}</div>
        ${post.type==="Idee"?`<div class="cafeEditBadge">⭐ Dit idee kan terugkomen in een toekomstige update.</div>`:""}
        ${post.type==="Bug"?`<div class="cafeEditBadge">🔧 Bedankt! Deze melding helpt het spel verbeteren.</div>`:""}
        ${post.type==="Highscore"?`<div class="cafeEditBadge">🏆 Mooie prestatie!</div>`:""}
        <div class="cafePostFooter">
          <span>${Number(post.likes)||0} ${Number(post.likes)===1?"like":"likes"}</span>
          <div class="cafePostActions">
            <button class="likeBtn" data-like-id="${Number(post.id)}">👍 LIKE</button>
            ${actions}
          </div>
        </div>
      </article>
    `;
  }).join("");

  cafePosts.querySelectorAll("[data-like-id]").forEach(btn=>{
    activateButton(btn,async()=>{
      const id=Number(btn.dataset.likeId);
      btn.disabled=true;
      try{
        const response=await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/like_community_post`,{
          method:"POST",
          headers:{
            "apikey":SUPABASE_KEY,
            "Authorization":`Bearer ${SUPABASE_KEY}`,
            "Content-Type":"application/json"
          },
          body:JSON.stringify({p_post_id:id})
        });
        if(!response.ok)throw new Error(`HTTP ${response.status}`);
        await refreshCafe();
      }catch(err){
        console.error(err);
        cafeStatus.textContent="Liken lukte niet.";
      }finally{
        btn.disabled=false;
      }
    });
  });

  cafePosts.querySelectorAll("[data-delete-id]").forEach(btn=>{
    activateButton(btn,async()=>{
      const id=Number(btn.dataset.deleteId);
      if(!confirm("Weet je zeker dat je dit bericht wilt verwijderen?"))return;
      btn.disabled=true;
      try{
        const rpc=isCafeAdmin()?"admin_delete_community_post":"delete_own_community_post";
        const body=isCafeAdmin()
          ? {p_post_id:id,p_admin_code:cafeAdminCode}
          : {p_post_id:id,p_device_id:getCafeDeviceId()};

        const response=await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/${rpc}`,{
          method:"POST",
          headers:{
            "apikey":SUPABASE_KEY,
            "Authorization":`Bearer ${SUPABASE_KEY}`,
            "Content-Type":"application/json"
          },
          body:JSON.stringify(body)
        });
        if(!response.ok)throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        const deleted=await response.json();
        if(deleted!==true){
          throw new Error("Supabase heeft het bericht niet verwijderd.");
        }
        cafeStatus.textContent="Bericht verwijderd.";
        await refreshCafe();
      }catch(err){
        console.error(err);
        cafeStatus.textContent=isCafeAdmin()
          ?"Verwijderen mislukt. Controleer je beheercode."
          :"Je kunt alleen je eigen berichten verwijderen.";
      }finally{
        btn.disabled=false;
      }
    });
  });

  cafePosts.querySelectorAll("[data-edit-id]").forEach(btn=>{
    activateButton(btn,()=>{
      const id=Number(btn.dataset.editId);
      const post=posts.find(p=>Number(p.id)===id);
      if(!post)return;
      cafeEditingPostId=id;
      const lockedName=getLockedCafeName();
      cafeName.value=lockedName||post.name||"";
      cafeName.readOnly=Boolean(lockedName);
      updateCafeSubmitState();
      cafeType.value=post.type||"Algemeen";
      cafeMessage.value=post.message||"";
      cafeCounter.textContent=`${cafeMessage.value.length} / 240`;
      cafeSubmitBtn.textContent="WIJZIGING OPSLAAN";
      cafeCancelEditBtn.classList.remove("hidden");
      cafeMessage.focus();
      cafeMessage.scrollIntoView({behavior:"smooth",block:"center"});
    });
  });
}

nameInput.addEventListener("input",()=>{
  rememberPlayerName(nameInput.value);
  queueStatsSync(getStats());
});

cafeName.addEventListener("input",()=>{
  const locked=getLockedCafeName();
  if(locked){
    cafeName.value=locked;
    cafeName.readOnly=true;
    updateCafeSubmitState();
    return;
  }

  updateCafeSubmitState();
  if(isValidCafeName(cafeName.value) && cafeStatus.textContent.includes("naam")){
    cafeStatus.textContent="";
  }
});

cafeMessage.addEventListener("input",()=>{
  cafeCounter.textContent=`${cafeMessage.value.length} / 240`;
});

activateButton(cafeSubmitBtn,async()=>{
  const lockedName=getLockedCafeName();
  const rawName=(lockedName||cafeName.value).trim();

  if(!isValidCafeName(rawName)){
    cafeStatus.textContent="Vul eerst je naam in voordat je een bericht plaatst.";
    updateCafeSubmitState();
    cafeName.focus();
    return;
  }

  const name=rawName.toUpperCase().slice(0,20);

  if(lockedName && name!==lockedName){
    cafeStatus.textContent="Je Café-naam staat vast op dit apparaat.";
    cafeName.value=lockedName;
    cafeName.readOnly=true;
    updateCafeSubmitState();
    return;
  }
  const type=cafeType.value;
  const message=cafeMessage.value.trim().slice(0,240);

  if(message.length<2){
    cafeStatus.textContent="Typ eerst een bericht.";
    return;
  }

  cafeSubmitBtn.dataset.saving="1";
  cafeSubmitBtn.disabled=true;
  cafeStatus.textContent="";

  try{
    const editing=Number.isFinite(cafeEditingPostId);
    const rpc=editing?"update_own_community_post":"create_community_post";
    const payload=editing
      ? {
          p_post_id:cafeEditingPostId,
          p_device_id:getCafeDeviceId(),
          p_player_name:name,
          p_type:type,
          p_message:message
        }
      : {
          p_device_id:getCafeDeviceId(),
          p_player_name:name,
          p_type:type,
          p_message:message
        };

    const response=await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/${rpc}`,{
      method:"POST",
      headers:{
        "apikey":SUPABASE_KEY,
        "Authorization":`Bearer ${SUPABASE_KEY}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    });
    if(!response.ok)throw new Error(`${response.status}: ${await response.text()}`);

    if(!getLockedCafeName()){
      lockCafeName(name);
    }else{
      rememberPlayerName(name);
    }
    cafeStatus.textContent=editing?"Bericht aangepast!":"Bericht geplaatst!";
    resetCafeEdit();
    await refreshCafe();
  }catch(err){
    console.error(err);
    cafeStatus.textContent="Opslaan lukte niet. Probeer het later opnieuw.";
  }finally{
    delete cafeSubmitBtn.dataset.saving;
    if(!cafeEditingPostId)cafeSubmitBtn.textContent="BERICHT PLAATSEN";
    updateCafeSubmitState();
  }
});

const CURRENT_VERSION = "2.5-beta";

// v2.22 richer analytics — failures never interrupt gameplay.
const V222_SESSION_KEY="stampertjes_v222_session";
let v222Session={startedAt:0,levelStartedAt:0,level:1,stamps:0,holes:0,apples:0,bonuses:0};
function v222BeginSession(){
  v222Session={startedAt:Date.now(),levelStartedAt:Date.now(),level:1,stamps:0,holes:0,apples:0,bonuses:0};
}
async function v222Metric(metric,value=1,extra={}){
  try{
    await gameFetch(`${SUPABASE_URL}/rest/v1/rpc/record_game_metric`,{
      method:"POST",
      headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json"},
      body:JSON.stringify({p_device_id:getStatsDeviceId(),p_metric:String(metric),p_value:Number(value)||0,p_extra:extra||{}})
    });
  }catch(_){}
}
function v222LevelStart(levelNo){
  v222Session.level=Number(levelNo)||1; v222Session.levelStartedAt=Date.now();
  v222Metric("level_start",1,{level:v222Session.level});
}
function v222LevelComplete(levelNo){
  const seconds=Math.max(0,Math.round((Date.now()-v222Session.levelStartedAt)/1000));
  v222Metric("level_complete",seconds,{level:Number(levelNo)||v222Session.level});
}
function showUpdateOnce(){ return; }
activateButton(closeUpdateBtn,()=>{
  localStore.setItem("stampertjesSeenVersion",CURRENT_VERSION);
  updateOverlay.classList.add("hidden");
  armAttractMode();
});


activateButton(cafeCancelEditBtn,()=>{
  resetCafeEdit();
  cafeStatus.textContent="Bewerken geannuleerd.";
});



let studioAdminTapCount=0;
let studioAdminTapTimer=null;
activateButton(studioLine,()=>{
  studioAdminTapCount++;
  clearTimeout(studioAdminTapTimer);
  studioAdminTapTimer=setTimeout(()=>{studioAdminTapCount=0},1800);
  if(studioAdminTapCount>=5){
    studioAdminTapCount=0;
    window.location.href="./admin.html";
  }
});

let teddyTapCount=0;
let teddyTapTimer=null;
let teddyEggActive=false;
activateButton(versionLabel,()=>{
  teddyTapCount++;
  clearTimeout(teddyTapTimer);
  teddyTapTimer=setTimeout(()=>{teddyTapCount=0},1800);
  if(teddyTapCount>=5){
    teddyTapCount=0;
    teddyEggActive=true;

    const teddyStats=getStats();
    teddyStats.teddyFound=true;
    if(!Array.isArray(teddyStats.achievements))teddyStats.achievements=[];
    if(!teddyStats.achievements.includes("teddy_easter"))teddyStats.achievements.push("teddy_easter");
    saveStats(teddyStats);

    // The hidden menu Easter egg is worth 1000 real points, once per device.
    // Because the Easter egg lives in the menu, the bonus is applied to the next game.
    if(localStore.getItem("stampertjesTeddyEasterRewarded")!=="1"){
      localStore.setItem("stampertjesTeddyEasterRewarded","1");
      localStore.setItem("stampertjesPendingTeddyBonus","1000");
    }

    updatePlayerContextOnline();
    registerTeddyDiscovery("easter");

    teddyEgg.classList.remove("hidden");
    duckMenuMusic(500);
    tone(330,.08,"square",.04,440);
    setTimeout(()=>tone(440,.08,"square",.04,660),90);
    setTimeout(()=>tone(660,.12,"square",.04,880),180);
    setTimeout(()=>{
      teddyEgg.classList.add("hidden");
      teddyEggActive=false;
    },5000);
  }
});
document.querySelectorAll("[data-back]").forEach(btn=>{
  activateButton(btn,()=>{
    stopAttractMode();
    showMainMenu();
    armAttractMode();
  });
});

let attractTimer=null;
let attractActive=false;
let attractCycleTimer=null;

function stopAttractMode(){
  clearTimeout(attractTimer);
  clearInterval(attractCycleTimer);
  attractActive=false;
  document.body.classList.remove("attractMode");
  attractPrompt.classList.add("hidden");
}

function startAttractMode(){ return; }

function armAttractMode(){ return; }

["pointerdown","touchstart","keydown"].forEach(ev=>{
  window.addEventListener(ev,()=>{
    if(state==="intro"){
      const wasAttractActive=attractActive;
      stopAttractMode();
      if(wasAttractActive)showMainMenu();
      armAttractMode();
    }
  },{passive:true,capture:false});
});

const DEV_TEST_PARAMS=new URLSearchParams(location.search);
const DEV_TEST_LEVEL=Math.max(1,Math.min(10,Number(DEV_TEST_PARAMS.get("devlevel"))||1));
const DEV_TEST_MODE=DEV_TEST_PARAMS.get("devtest")==="1" && DEV_TEST_PARAMS.has("devlevel");
let devTestActive=false;

function devTestRoomName(){
  return CASTLE_ROOM_THEMES[roomIndexForLevel(level)]?.name||`LEVEL ${level}`;
}
function devTestSwitchLevel(delta){
  if(!devTestActive)return;
  level=Math.max(1,Math.min(10,level+delta));
  score=0;lives=3;flawlessLevels=0;levelDeaths=0;state="play";
  pauseOverlay.classList.add("hidden");
  pauseConfirmStop.classList.add("hidden");
  pauseMain.classList.remove("hidden");
  pauseToggle.textContent="⏸ PAUZE";
  spawnLevel();clearStartZone();startFreeze=60;
  document.body.classList.add("gameplayActive");
}
function openIntro(){
  document.body.classList.remove("gameplayActive");
  state="intro";
  keys.left=keys.right=keys.up=keys.down=false;
  pauseOverlay.classList.add("hidden");
  pauseToggle.textContent="⏸ PAUZE";
  startBtn.classList.add("hidden");
  overlay.classList.remove("hidden");
  showMainMenu();
  armAttractMode();
}
let startingGame=false;
function startGame(practiceLevel){
  ensureGameplayControlsVisible();
  menuMusicIcon.classList.add("hidden");
  stopAttractMode();
  document.body.classList.remove("scoreMode");
  document.body.classList.add("gameplayActive");
  if(startingGame||state==="play")return;
  startingGame=true;
  playMenuBtn.textContent="SPELEN";
  audio();
  score=0;level=Number.isInteger(practiceLevel)?Math.max(1,Math.min(10,practiceLevel)):(DEV_TEST_MODE?DEV_TEST_LEVEL:1);lives=3;
  devTestActive=Number.isInteger(practiceLevel)||DEV_TEST_MODE;
  flawlessLevels=0;levelDeaths=0;state="play";
  const pendingTeddyBonus=Math.max(0,Number(localStore.getItem("stampertjesPendingTeddyBonus"))||0);
  if(pendingTeddyBonus&&!devTestActive){
    score+=pendingTeddyBonus;
    localStore.removeItem("stampertjesPendingTeddyBonus");
    effects.push({type:"score",x:145,y:90,t:120,text:`EASTER TEDDY +${pendingTeddyBonus}`});
  }
  if(!devTestActive)updateProgressStats();
  setMusicContext("gameplay",{playNow:true});
  if(musicOn&&menuSoundtrack.paused)startMusic();
  let reachedMilestone=0;
  if(!devTestActive){
    const gameStats=getStats();
    gameStats.gamesPlayed=(Number(gameStats.gamesPlayed)||0)+1;
    saveStats(gameStats);
    reachedMilestone=milestoneForGames(gameStats.gamesPlayed);
    updatePlayerContextOnline();
    logGameEvent("game_start",{level,score:0});
  }
  player.fastStamp=0;pauseOverlay.classList.add("hidden");pauseToggle.textContent="⏸ PAUZE";
  livingCastle.teddy=null;
  livingCastle.teddyCelebrating=false;
  livingCastle.teddyEligibleThisGame=Math.random()<0.30;
  livingCastle.teddyAttemptedThisGame=false;
  livingCastle.teddyFoundThisGame=false;
  livingCastle.gameStartedAt=performance.now();
  // Even eligible games wait at least 60 seconds; then one appearance only.
  livingCastle.nextTeddy=livingCastle.teddyEligibleThisGame
    ? livingCastle.gameStartedAt+60000+Math.random()*30000
    : Infinity;
  spawnLevel();
  if(!devTestActive)logGameEvent("level_start",{level,score:0});
  clearStartZone();
  startFreeze=90;
  overlay.classList.add("hidden");
  c.focus({preventScroll:true});
  shareScoreBox.classList.add("hidden");
  if(reachedMilestone)setTimeout(()=>showMilestone(reachedMilestone),320);
  setTimeout(()=>{startingGame=false},250);
}

function scoreShareText(){
  const name=(getPlayerName()||"EEN STAMPERTJE").toUpperCase();
  return `${name} bereikte level ${level} en scoorde ${score.toLocaleString("nl-NL")} punten in De Stampertjes. Kun jij deze score verslaan?`;
}
async function shareCurrentScore(){
  const text=scoreShareText(),url=location.href.split("#")[0];
  try{
    if(navigator.share){
      await navigator.share({title:"De Stampertjes · Score Challenge",text,url});
      logGameEvent("score_share",{level,score});
      return;
    }
  }catch(err){
    if(err&&err.name==="AbortError")return;
    console.warn("Native delen mislukt:",err);
  }
  try{
    await navigator.clipboard.writeText(`${text}\n${url}`);
    shareScoreBtn.textContent="✓ CHALLENGE GEKOPIEERD";
    setTimeout(()=>shareScoreBtn.textContent="📤 DEEL MIJN SCORE",1800);
    logGameEvent("score_share",{level,score});
  }catch(err){
    shareScoreBtn.textContent="DELEN NIET BESCHIKBAAR";
    setTimeout(()=>shareScoreBtn.textContent="📤 DEEL MIJN SCORE",1800);
  }
}
function showGameOverPanel(){
  if(devTestActive){
    state="gameover";
    document.body.classList.remove("gameplayActive");
    highscoreEntry.classList.add("hidden");
    shareScoreBox.classList.add("hidden");
    overlay.classList.remove("hidden");
    const practiceEnd=document.createElement("div");practiceEnd.id="practiceEnd";
    showMainMenu();mainMenu.classList.add("hidden");document.getElementById("panel").appendChild(practiceEnd);
    practiceEnd.innerHTML=`<div class="menuTitle">🛠️ TEST LEVEL ${level} KLAAR</div>
      <button id="devRetryBtn">↻ OPNIEUW</button>
      <button id="devPrevEndBtn">← VORIG LEVEL</button>
      <button id="devNextEndBtn">VOLGEND LEVEL →</button>
      <button id="devExitBtn">TERUG NAAR MENU</button>`;
    document.getElementById("devRetryBtn")?.addEventListener("click",()=>{state="play";score=0;lives=3;spawnLevel();overlay.classList.add("hidden");document.body.classList.add("gameplayActive")});
    document.getElementById("devPrevEndBtn")?.addEventListener("click",()=>{state="play";overlay.classList.add("hidden");devTestSwitchLevel(-1)});
    document.getElementById("devNextEndBtn")?.addEventListener("click",()=>{state="play";overlay.classList.add("hidden");devTestSwitchLevel(1)});
    document.getElementById("devExitBtn")?.addEventListener("click",()=>openIntro());
    return;
  }

  updateProgressStats();
  logGameEvent("game_over",{level,score});
  document.body.classList.remove("gameplayActive");
  setMusicContext("menu",{playNow:true});
  if(musicOn&&menuSoundtrack.paused)startMusic();
  pendingScore=score;
  overlay.classList.remove("hidden");
  mainMenu.classList.add("hidden");
  scoresSection.classList.add("hidden");
  helpSection.classList.add("hidden");
  historySection.classList.add("hidden");
  roadmapSection.classList.add("hidden");
  hallSection.classList.add("hidden");
  cafeSection.classList.add("hidden");
  merchSection.classList.add("hidden");
  statsSection.classList.add("hidden");
  startBtn.classList.add("hidden");
  document.getElementById("introText").textContent=`Je eindscore: ${score}`;
  shareScorePreview.textContent=scoreShareText();
  shareScoreBox.classList.remove("hidden");
  document.getElementById("highscoreBox").classList.toggle("hidden",qualifiesForHighscore(score));
  highscoreEntry.classList.toggle("hidden",!qualifiesForHighscore(score));
  if(qualifiesForHighscore(score)){
    nameInput.focus();
    nameInput.select();
  }else{
    mainMenu.classList.remove("hidden");
    playMenuBtn.textContent="OPNIEUW SPELEN";
  }
}
shareScoreBtn.addEventListener("click",e=>{e.preventDefault();shareCurrentScore();});
startBtn.addEventListener("click",e=>{
  e.preventDefault();
  startBtn.textContent="START SPEL";
  startGame();
});
saveScoreBtn.addEventListener("click",async e=>{
  e.preventDefault();
  const name=(nameInput.value.trim()||"SPELER").toUpperCase().slice(0,20);
  rememberPlayerName(name);
  saveScoreBtn.disabled=true;
  saveScoreBtn.textContent="OPSLAAN…";

  // Lokale reservekopie
  const local=getLocalHighscores();
  local.push({name,score:pendingScore,level});
  local.sort((a,b)=>b.score-a.score);
  saveLocalHighscores(normalizeScores(local));

  try{
    await submitOnlineScore(name,pendingScore,level);
    highscoreEntry.classList.add("hidden");
    document.getElementById("highscoreBox").classList.remove("hidden");
    await loadOnlineHighscores();
    document.getElementById("introText").textContent="Je score staat online!";
  }catch(err){
    console.error(err);
    highscoreEntry.classList.add("hidden");
    document.getElementById("highscoreBox").classList.remove("hidden");
    renderHighscores(true);
    document.getElementById("introText").textContent=
      "Online opslaan lukte niet. De score is wel lokaal bewaard.";
  }finally{
    saveScoreBtn.disabled=false;
    saveScoreBtn.textContent="SCORE OPSLAAN";
    mainMenu.classList.remove("hidden");
    playMenuBtn.textContent="OPNIEUW SPELEN";
  }
});

function drawIntroCastleBackdrop(){
  if(introHdBg.complete&&introHdBg.naturalWidth){
    const sw=introHdBg.naturalWidth;
    const sh=Math.min(introHdBg.naturalHeight,Math.round(sw*(INTRO_LOGICAL_H/INTRO_LOGICAL_W)));
    const sy=Math.max(0,Math.round((introHdBg.naturalHeight-sh)*0.43));
    ictx.drawImage(introHdBg,0,sy,sw,sh,0,0,INTRO_LOGICAL_W,INTRO_LOGICAL_H);
    const grad=ictx.createLinearGradient(0,0,0,INTRO_LOGICAL_H);
    grad.addColorStop(0,"rgba(15,10,7,.08)");grad.addColorStop(1,"rgba(15,10,7,.34)");
    ictx.fillStyle=grad;ictx.fillRect(0,0,INTRO_LOGICAL_W,INTRO_LOGICAL_H);
  }else{ictx.fillStyle="#2c241d";ictx.fillRect(0,0,INTRO_LOGICAL_W,INTRO_LOGICAL_H);}
}
function drawIntroCastleLadder(x,y1,y2){ictx.fillStyle="#444";ictx.fillRect(x-2,y1,4,y2-y1);ictx.fillRect(x+19,y1,4,y2-y1);ictx.fillStyle="#777";for(let y=y1+7;y<y2;y+=10)ictx.fillRect(x,y,21,3)}
function drawIntroCastleFloor(y,holeX=null,crackStage=0){ictx.fillStyle="#333";if(holeX===null)ictx.fillRect(12,y-5,396,10);else{ictx.fillRect(12,y-5,holeX-12,10);ictx.fillRect(holeX+42,y-5,408-(holeX+42),10)}ictx.fillStyle="#eee";ictx.fillRect(12,y-5,396,2);ictx.strokeStyle="#999";for(let x=14;x<407;x+=22){if(holeX!==null&&x>holeX-8&&x<holeX+45)continue;ictx.strokeRect(x,y-3,20,7)}ictx.fillStyle="#111";ictx.strokeStyle="#111";if(crackStage>0){ictx.lineWidth=2;ictx.beginPath();ictx.moveTo(holeX+10,y-7);ictx.lineTo(holeX+20,y);ictx.lineTo(holeX+13,y+7);if(crackStage>1){ictx.moveTo(holeX+32,y-7);ictx.lineTo(holeX+23,y);ictx.lineTo(holeX+31,y+7)}ictx.stroke()}}

function drawStampertjeSprite(targetCtx,x,y,{dir=1,step=0,climbing=false,stamping=false,bodyColor="#111",limbColor="#182532",eyeColor="#f5e7c6"}={}){
  targetCtx.save();
  targetCtx.fillStyle=bodyColor;
  const headY=y+(stamping?3:0);

  targetCtx.fillRect(x+7,headY,10,2);
  targetCtx.fillRect(x+5,headY+2,14,7);
  targetCtx.fillRect(x+7,headY+9,10,2);
  targetCtx.fillRect(x+4,y+10,16,4);
  targetCtx.fillRect(x+6,y+14,12,8);

  targetCtx.fillStyle=eyeColor;
  const eyeShift=dir>0?1:0;
  targetCtx.fillRect(x+8+eyeShift,headY+5,2,2);
  targetCtx.fillRect(x+14+eyeShift,headY+5,2,2);
  targetCtx.fillStyle=limbColor;

  if(climbing){
    if(step%2===0){
      targetCtx.fillRect(x+1,y+11,5,4);targetCtx.fillRect(x+18,y+17,5,4);
      targetCtx.fillRect(x+5,y+21,5,7);targetCtx.fillRect(x+15,y+19,5,7);
    }else{
      targetCtx.fillRect(x+1,y+17,5,4);targetCtx.fillRect(x+18,y+11,5,4);
      targetCtx.fillRect(x+5,y+19,5,7);targetCtx.fillRect(x+15,y+21,5,7);
    }
  }else if(stamping){
    targetCtx.fillRect(x+1,y+14,5,5);targetCtx.fillRect(x+18,y+14,5,5);
    targetCtx.fillRect(x+3,y+21,8,6);targetCtx.fillRect(x+14,y+21,8,6);
  }else if(step%2===0){
    targetCtx.fillRect(x+1,y+11,4,8);targetCtx.fillRect(x+20,y+14,4,7);
    targetCtx.fillRect(x+4,y+21,7,7);targetCtx.fillRect(x+15,y+22,6,6);
  }else{
    targetCtx.fillRect(x+1,y+14,4,7);targetCtx.fillRect(x+20,y+11,4,8);
    targetCtx.fillRect(x+5,y+22,6,6);targetCtx.fillRect(x+14,y+21,7,7);
  }
  targetCtx.restore();
}

function drawIntroPlayer(x,y,pose="walk"){
  drawStampertjeSprite(ictx,x,y,{
    dir:1,
    step:Math.floor(introFrame/7)%2,
    stamping:pose==="stamp"
  });
}
function drawIntroApple(x,y,trapped=false,panic=false){
  ictx.fillStyle="#34191b";
  ictx.beginPath();
  ictx.arc(x+14,y+11,13,0,Math.PI*2);
  ictx.fill();
  ictx.fillRect(x+12,y-5,4,7);
  ictx.fillRect(x+3,y+21,6,5);
  ictx.fillRect(x+19,y+21,6,5);

  ictx.fillStyle="#f4dfbd";
  if(panic){
    ictx.fillRect(x+5,y+6,5,5);
    ictx.fillRect(x+18,y+6,5,5);
  }else{
    ictx.fillRect(x+7,y+7,3,3);
    ictx.fillRect(x+18,y+7,3,3);
  }
  ictx.fillStyle="#111";

  if(trapped){
    ictx.fillRect(x+1,y+24,26,3);
  }
}
function drawIntroLadder(x,y1,y2){
  ictx.fillStyle="#553720";ictx.fillRect(x,y1,3,y2-y1);ictx.fillRect(x+20,y1,3,y2-y1);
  ictx.fillStyle="#b07b43";for(let y=y1+8;y<y2;y+=10)ictx.fillRect(x,y,23,2);
}
function drawIntroFloor(y,holeX=null,crackStage=0){
  ictx.fillStyle="#51351f";
  if(holeX===null){
    ictx.fillRect(12,y-4,396,8);
  }else{
    ictx.fillRect(12,y-4,holeX-12,8);
    ictx.fillRect(holeX+42,y-4,408-(holeX+42),8);
  }

  ictx.fillStyle="#b9864c";
  for(let x=20;x<400;x+=22){
    if(holeX!==null && x>holeX-8 && x<holeX+45)continue;
    ictx.fillRect(x,y-1,10,2);
  }
  ictx.fillStyle="#111";

  if(crackStage>0){
    ictx.lineWidth=2;
    ictx.beginPath();
    ictx.moveTo(holeX+10,y-7);ictx.lineTo(holeX+20,y);ictx.lineTo(holeX+13,y+7);
    if(crackStage>1){
      ictx.moveTo(holeX+32,y-7);ictx.lineTo(holeX+23,y);ictx.lineTo(holeX+31,y+7);
    }
    ictx.stroke();
  }
}
function drawIntroDust(x,y,size){
  ictx.beginPath();ictx.arc(x-size,y,size*.45,0,Math.PI*2);ictx.fill();
  ictx.beginPath();ictx.arc(x+size,y,size*.45,0,Math.PI*2);ictx.fill();
  ictx.beginPath();ictx.arc(x,y-size*.35,size*.55,0,Math.PI*2);ictx.fill();
}
function drawIntro(){
  if(!introCanvas.getClientRects().length){requestAnimationFrame(drawIntro);return;}
  ictx.save();
  ictx.setTransform(introCanvas.width/INTRO_LOGICAL_W,0,0,introCanvas.height/INTRO_LOGICAL_H,0,0);
  introFrame++;

  const scenarioOffset=(introScenario*173+Math.floor(introScenarioSeed))%1080;
  const macroPhase=(introFrame+scenarioOffset)%3600;
  const attractSegment=Math.floor(macroPhase/600);
  const segmentOffsets=[0,520,180,760,340,900];
  const phase=(macroPhase+segmentOffsets[(attractSegment+introScenario)%segmentOffsets.length])%1080;

  ictx.fillStyle="#26303b";
  ictx.fillRect(0,0,420,180);
  drawIntroCastleBackdrop();
  ictx.fillStyle="#111";
  ictx.strokeStyle="#111";
  ictx.lineWidth=4;
  ictx.strokeRect(6,6,408,168);

  // Four visible demo floors, matching the taller main game.
  const introFloors=[38,78,118,158];

  // Two connecting ladders; positions vary by attract scenario.
  const ladderA=55+(introScenario*31)%100;
  const ladderB=245+(introScenario*37)%100;
  const ladderC=145+(introScenario*43)%115;
  drawIntroCastleLadder(ladderA,introFloors[0],introFloors[1]);
  drawIntroCastleLadder(ladderB,introFloors[1],introFloors[2]);
  drawIntroCastleLadder(ladderC,introFloors[2],introFloors[3]);

  let crackStage=0,holeOpen=false;
  if(phase>=430&&phase<475)crackStage=1;
  if(phase>=475&&phase<520)crackStage=2;
  if(phase>=520)holeOpen=true;

  drawIntroCastleFloor(introFloors[0]);
  drawIntroCastleFloor(introFloors[1]);
  drawIntroCastleFloor(introFloors[2],holeOpen?274:null,crackStage);
  drawIntroCastleFloor(introFloors[3]);

  // Appeliet on upper floors / ladder.
  if(phase<220){
    drawIntroApple(330-phase*.7,introFloors[0]-26,false,false);
  }else if(phase<360){
    const p=(phase-220)/140;
    drawIntroApple(ladderA-4,(introFloors[1]-26)-p*(introFloors[1]-introFloors[0]),false,false);
  }

  // Player starts on the third floor, demonstrates a trap, then climbs.
  let px=28,py=introFloors[2]-28,pose="walk";
  if(phase<260)px=28+(phase/260)*178;
  else if(phase<390)px=206;
  else if(phase<430)px=206+((phase-390)/40)*38;
  else if(phase<520){px=244;pose="stamp"}
  else if(phase<670)px=244;
  else if(phase<790){px=270;pose=(Math.floor((phase-670)/20)%2===0)?"stamp":"walk"}
  else if(phase<900)px=270+((phase-790)/110)*Math.max(0,ladderB-270);
  else if(phase<1010){
    const p=(phase-900)/110;
    px=ladderB;
    py=(introFloors[2]-28)-p*(introFloors[2]-introFloors[1]);
  }else{
    px=ladderB+((phase-1010)/70)*70;
    py=introFloors[1]-28;
  }

  let ax=365,ay=introFloors[2]-28,trapped=false,panic=false,visible=true;
  if(phase<390)visible=false;
  else if(phase<520)ax=365-((phase-390)/130)*58;
  else if(phase<650)ax=307-((phase-520)/130)*20;
  else if(phase<790){
    ax=287;
    ay=introFloors[2]-16;
    trapped=true;
    panic=true;
  }else visible=false;

  drawIntroPlayer(px,py,pose);
  if(visible)drawIntroApple(ax,ay,trapped,panic);

  // Extra Appeliet on the bottom floor makes all four levels feel active.
  if(phase>=760){
    const bx=35+((phase-760)*.43)%210;
    drawIntroApple(bx,introFloors[3]-26,false,false);
  }

  ictx.font="bold 10px monospace";
  if(phase<90)ictx.fillText("VIER VERDIEPINGEN · BLIJF BEWEGEN",103,173);
  if(phase>=430&&phase<460)ictx.fillText("STAMP 1 — KRAK!",210,106);
  if(phase>=460&&phase<490)ictx.fillText("STAMP 2 — KRAK!!",198,106);
  if(phase>=490&&phase<530)ictx.fillText("STAMP 3 — GAT!",205,106);
  if(phase>=640&&phase<690)ictx.fillText("GEVANGEN!",266,101);
  if(phase>=690&&phase<730)ictx.fillText("BAM!",258,100);
  if(phase>=730&&phase<770)ictx.fillText("BAM!!",254,100);
  if(phase>=770&&phase<820){
    drawIntroDust(292,introFloors[2]-8,Math.min((phase-770)*.35,13));
    ictx.fillText("+300",278,99);
  }
  if(phase>=895&&phase<980)ictx.fillText("KLIM NAAR DE VOLGENDE VERDIEPING",102,173);
  if(phase>=1010)ictx.fillText("KLAAR VOOR HET KASTEEL?",127,173);

  ictx.font="8px monospace";
  if(phase>=350&&phase<600)ictx.fillText("3× STAMPEN MAAKT EEN GAT",128,15);
  else if(phase>=600&&phase<840)ictx.fillText("VANG · STAMP · SCOOR",151,15);
  else if(phase>=840)ictx.fillText("GEBRUIK LADDERS OM TE ONTSNAPPEN",113,15);

  if(teddyEggActive){
    const tx=20+((introFrame*1.1)%360);
    ictx.font="20px monospace";
    ictx.fillText("ᓚᘏᗢ",tx,31);
  }

  ictx.restore();
  requestAnimationFrame(drawIntro);
}

window.addEventListener("load",()=>{
  refreshDailyCastleMessage();
  openIntro();
  drawIntro();
  setTimeout(tryImmediateMenuAutoplay,200);
  setTimeout(showUpdateOnce,250);
});
// v2.26-beta.3.2: true HiDPI backing store, stable logical gameplay coordinates.
const DEFAULT_LOGICAL_W=480,DEFAULT_LOGICAL_H=382;
const THRONE_LOGICAL_W=600,THRONE_LOGICAL_H=840;
const HALL_LOGICAL_W=600,HALL_LOGICAL_H=840;
const ARMORY_LOGICAL_W=600,ARMORY_LOGICAL_H=840;
const DUNGEON_LOGICAL_W=600,DUNGEON_LOGICAL_H=840;
const DUNGEON_FLOORS=[130,295,460,625,800];
const ARMORY_FLOORS=[130,295,460,625,800];
const HALL_FLOORS=[130,295,460,625,800];
const entranceHallBg=new Image();
entranceHallBg.src="entrance-hall-empty-portrait@3x.jpg";
const deathDungeonBg=new Image();
deathDungeonBg.src="dungeon-death-hd@3x.jpg";

const GAME_DPR=Math.min(Math.max(window.devicePixelRatio||1,1),3);
let W=DEFAULT_LOGICAL_W,H=DEFAULT_LOGICAL_H;
function setLogicalGameSize(w,h){
  W=w;H=h;
  c.width=Math.round(W*GAME_DPR);
  c.height=Math.round(H*GAME_DPR);
  c.style.aspectRatio=`${W}/${H}`;
  ctx.setTransform(GAME_DPR,0,0,GAME_DPR,0,0);
  ctx.imageSmoothingEnabled=true;
  ctx.imageSmoothingQuality="high";
}
setLogicalGameSize(W,H);
const DEFAULT_FLOORS=[64,126,188,250,312,372];
const THRONE_FLOORS=[145,305,465,625,800];
const throneHybridBg=new Image();
throneHybridBg.src="throne-room-empty-portrait@3x.jpg";
throneHybridBg.onload=()=>console.info("[B3.6.1 SAFE ACTORS] concept throne background loaded",throneHybridBg.naturalWidth,throneHybridBg.naturalHeight);

let floors=DEFAULT_FLOORS.slice();
const FLOOR_HITS=3;
const ladderLayouts=[
  // 1 Entreehal — beginner friendly, alternating routes and two safe exits at the start floor.
  [
    {x:72,top:64,bottom:126},{x:310,top:64,bottom:126},
    {x:176,top:126,bottom:188},{x:402,top:126,bottom:188},
    {x:68,top:188,bottom:250},{x:286,top:188,bottom:250},
    {x:190,top:250,bottom:312},{x:405,top:250,bottom:312},
    {x:92,top:312,bottom:372},{x:335,top:312,bottom:372}
  ],
  // 2 Wapenzaal — fixed: no ladder stack between the two lowest bands.
  [
    {x:145,top:64,bottom:126},{x:386,top:64,bottom:126},
    {x:52,top:126,bottom:188},{x:265,top:126,bottom:188},
    {x:160,top:188,bottom:250},{x:400,top:188,bottom:250},
    {x:80,top:250,bottom:312},{x:310,top:250,bottom:312},
    {x:150,top:312,bottom:372},{x:390,top:312,bottom:372}
  ],
  // 3 Bibliotheek — clear zig-zag routes without vertical ladder stacks.
  [
    {x:64,top:64,bottom:126},{x:275,top:64,bottom:126},
    {x:170,top:126,bottom:188},{x:405,top:126,bottom:188},
    {x:55,top:188,bottom:250},{x:285,top:188,bottom:250},
    {x:170,top:250,bottom:312},{x:395,top:250,bottom:312},
    {x:70,top:312,bottom:372},{x:285,top:312,bottom:372}
  ],
  // 4 Kerkers — alternating left/right paths, checked for minimum spacing.
  [
    {x:120,top:64,bottom:126},{x:365,top:64,bottom:126},
    {x:48,top:126,bottom:188},{x:245,top:126,bottom:188},
    {x:145,top:188,bottom:250},{x:390,top:188,bottom:250},
    {x:65,top:250,bottom:312},{x:285,top:250,bottom:312},
    {x:160,top:312,bottom:372},{x:400,top:312,bottom:372}
  ],
  // 5 Troonzaal — broad alternating routes and two reachable bottom exits.
  [
    {x:82,top:64,bottom:126},{x:330,top:64,bottom:126},
    {x:190,top:126,bottom:188},{x:405,top:126,bottom:188},
    {x:60,top:188,bottom:250},{x:260,top:188,bottom:250},
    {x:155,top:250,bottom:312},{x:390,top:250,bottom:312},
    {x:65,top:312,bottom:372},{x:290,top:312,bottom:372}
  ],
  // 6 Wijnkelder — brede keldergangen, routes wisselen links/rechts.
  [
    {x:58,top:64,bottom:126},{x:250,top:64,bottom:126},
    {x:155,top:126,bottom:188},{x:390,top:126,bottom:188},
    {x:78,top:188,bottom:250},{x:318,top:188,bottom:250},
    {x:205,top:250,bottom:312},{x:420,top:250,bottom:312},
    {x:105,top:312,bottom:372},{x:350,top:312,bottom:372}
  ],
  // 7 Alchemistenkamer — grillige routes alsof de kamer rond werktafels is gebouwd.
  [
    {x:110,top:64,bottom:126},{x:405,top:64,bottom:126},
    {x:35,top:126,bottom:188},{x:235,top:126,bottom:188},
    {x:145,top:188,bottom:250},{x:365,top:188,bottom:250},
    {x:55,top:250,bottom:312},{x:275,top:250,bottom:312},
    {x:180,top:312,bottom:372},{x:415,top:312,bottom:372}
  ],
  // 8 Schatkamer — lange diagonale jachtroutes.
  [
    {x:45,top:64,bottom:126},{x:300,top:64,bottom:126},
    {x:185,top:126,bottom:188},{x:425,top:126,bottom:188},
    {x:95,top:188,bottom:250},{x:335,top:188,bottom:250},
    {x:225,top:250,bottom:312},{x:405,top:250,bottom:312},
    {x:75,top:312,bottom:372},{x:300,top:312,bottom:372}
  ],
  // 9 Catacomben — smallere, onheilspellende zigzag.
  [
    {x:135,top:64,bottom:126},{x:360,top:64,bottom:126},
    {x:50,top:126,bottom:188},{x:275,top:126,bottom:188},
    {x:175,top:188,bottom:250},{x:415,top:188,bottom:250},
    {x:70,top:250,bottom:312},{x:315,top:250,bottom:312},
    {x:155,top:312,bottom:372},{x:380,top:312,bottom:372}
  ],
  // 10 Kasteeltoren — snelle verticale wissels richting de top.
  [
    {x:70,top:64,bottom:126},{x:350,top:64,bottom:126},
    {x:215,top:126,bottom:188},{x:420,top:126,bottom:188},
    {x:50,top:188,bottom:250},{x:285,top:188,bottom:250},
    {x:175,top:250,bottom:312},{x:390,top:250,bottom:312},
    {x:85,top:312,bottom:372},{x:255,top:312,bottom:372}
  ]
]
let ladders=ladderLayouts[0];
let currentLayoutIndex=0;
const armoryHdBg=new Image();
armoryHdBg.src="armory-room-hd-portrait@3x.jpg";
const dungeonHdBg=new Image();
dungeonHdBg.src="dungeon-room-hd-portrait@3x.jpg";
const libraryHdBg=new Image(); libraryHdBg.src="library-room-hd-portrait@3x.jpg";
const wineHdBg=new Image(); wineHdBg.src="wine-cellar-hd-portrait@3x.jpg";
const alchemyHdBg=new Image(); alchemyHdBg.src="alchemy-room-hd-portrait@3x.jpg";
const treasureHdBg=new Image(); treasureHdBg.src="treasure-room-hd-portrait@3x.jpg";
const catacombsHdBg=new Image(); catacombsHdBg.src="catacombs-room-hd-portrait@3x.jpg";
const towerHdBg=new Image(); towerHdBg.src="tower-room-hd-portrait@3x.jpg";

const CASTLE_ROOM_THEMES=[
  {name:"ENTREEHAL",kind:"hall"},
  {name:"WAPENZAAL",kind:"arms"},
  {name:"KERKERS",kind:"cells"},
  {name:"BIBLIOTHEEK",kind:"books"},
  {name:"TROONZAAL",kind:"throne"},
  {name:"WIJNKELDER",kind:"wine"},
  {name:"ALCHEMISTENKAMER",kind:"alchemy"},
  {name:"SCHATKAMER",kind:"treasure"},
  {name:"CATACOMBEN",kind:"catacombs"},
  {name:"KASTEELTOREN",kind:"tower"}
];
function currentCastleTheme(){return CASTLE_ROOM_THEMES[currentLayoutIndex%CASTLE_ROOM_THEMES.length]}


let keys={left:false,right:false,up:false,down:false};
let frame=0,score=0,level=1,lives=3,state="intro",shake=0,startFreeze=0,deathAnimating=false,deathFrame=0;
let holes=[],cracks=[],enemies=[],effects=[],bonus=null,bonusSpawnTimer=420,combo=0,comboTimer=0,enemyIdCounter=1;
let flawlessLevels=0,levelDeaths=0; const MAX_LIVES=5;
let player={x:30,y:344,w:24,h:28,onLadder:false,cool:0,dir:1,invulnerable:0};

let audioCtx=null;
let audioUnlocked=false;
let lastTrapSound=0;

async function audio(){
  try{
    if(!audioCtx){
      audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    }
    if(audioCtx.state==="suspended"){
      await audioCtx.resume();
    }

    // Een vrijwel onhoorbaar tikje ontgrendelt WebAudio op iPhone.
    if(!audioUnlocked){
      const buffer=audioCtx.createBuffer(1,1,22050);
      const source=audioCtx.createBufferSource();
      source.buffer=buffer;
      source.connect(audioCtx.destination);
      source.start(0);
      audioUnlocked=true;
    }
    return true;
  }catch(err){
    console.warn("Audio kon niet worden gestart:",err);
    return false;
  }
}
async function tone(f,d=.08,t="square",v=.05,end=f){
  const ready=await audio();
  if(!ready||!audioCtx)return;
  const now=audioCtx.currentTime;
  const o=audioCtx.createOscillator(),g=audioCtx.createGain();
  o.type=t;
  o.frequency.setValueAtTime(f,now);
  o.frequency.linearRampToValueAtTime(end,now+d);
  g.gain.setValueAtTime(Math.max(v,.001),now);
  g.gain.exponentialRampToValueAtTime(.001,now+d);
  o.connect(g);g.connect(audioCtx.destination);
  o.start(now);o.stop(now+d);
}
const sfxCrack=()=>tone(140,.09,"square",.06,95);
const sfxBreak=()=>tone(85,.18,"sawtooth",.09,45);
const sfxTrap=()=>tone(360,.09,"square",.05,210);
const sfxHit=()=>tone(240,.09,"square",.07,120);
const sfxKill=()=>{tone(120,.2,"sawtooth",.08,45);setTimeout(()=>tone(520,.1,"square",.05,720),100)};
const sfxHurt=()=>tone(170,.22,"sawtooth",.08,70);

const menuSoundtrack=document.getElementById("menuSoundtrack");
const MUSIC_TRACKS=window.STAMPERTJES_CONFIG.musicTracks||{
  menu:"music-menu.mp3",gameplay:"music-gameplay.mp3",cafe:"music-cafe.mp3",
  chronicles:"music-chronicles.mp3",special:"music-special.mp3",reserve:"music-reserve.mp3"
};
let currentMusicContext="menu";
let musicContextFadeTimer=null;
function musicTrackForContext(context){return MUSIC_TRACKS[context]||MUSIC_TRACKS.menu}
function fadeMusicTo(target,duration=400){
  clearInterval(musicContextFadeTimer);
  const start=menuSoundtrack.volume||0,steps=Math.max(1,Math.round(duration/40)),diff=target-start;let n=0;
  musicContextFadeTimer=setInterval(()=>{n++;const p=Math.min(1,n/steps);menuSoundtrack.volume=Math.max(0,Math.min(1,start+diff*p));if(p>=1){clearInterval(musicContextFadeTimer);musicContextFadeTimer=null}},40);
}
async function setMusicContext(context,{playNow=true}={}){
  const next=MUSIC_TRACKS[context]?context:"menu";
  const file=musicTrackForContext(next);
  currentMusicContext=next;
  const current=decodeURIComponent((menuSoundtrack.currentSrc||menuSoundtrack.src||"").split("/").pop()||"");
  if(current!==file){menuSoundtrack.pause();menuSoundtrack.src=file;menuSoundtrack.load();menuSoundtrack.volume=0}
  if(playNow&&musicOn){try{await menuSoundtrack.play();fadeMusicTo(targetMusicVolume(),480)}catch(err){console.warn("Muziek wacht op gebruikersactie",err)}}
}

const MUSIC_VOLUME=.16;
const GAMEPLAY_MUSIC_VOLUME=.11;
let musicOn=true;
let audioMode=localStore.getItem("stampertjesAudioMode")||"all";
let fxOn=audioMode!=="off";
let musicFadeFrame=null;
let musicTimer=null;

if(localStore.getItem("stampertjesAudioMigration")!=="2.12"){
  localStore.setItem("stampertjesMusic","1");
  localStore.setItem("stampertjesAudioMigration","2.12");
}
musicOn=audioMode==="all";

function setMusicButton(){
  const labels={all:"🎵 ALLES AAN",fx:"🔊 ALLEEN FX",off:"🔇 ALLES UIT"};
  musicToggle.textContent=labels[audioMode]||labels.all;
  menuMusicIcon.textContent=audioMode==="all"?"🎵":audioMode==="fx"?"🔊":"🔇";
  menuMusicIcon.classList.toggle("musicOff",audioMode==="off");
  menuMusicIcon.setAttribute("aria-label",labels[audioMode]||labels.all);
}

function isMenuState(){
  return state==="intro"||state==="gameover";
}
function isGameplayState(){
  return state==="play"||state==="paused"||state==="transition"||state==="dying"||state==="teddy";
}
function targetMusicVolume(){
  if(state==="dying")return .05;
  return isGameplayState()?GAMEPLAY_MUSIC_VOLUME:MUSIC_VOLUME;
}

function applyMusicVolume(){
  menuSoundtrack.volume=targetMusicVolume();
}

async function startMusic(){
  if(!musicOn)return false;
  try{
    applyMusicVolume();
    await menuSoundtrack.play();
    musicTimer=true;
    return true;
  }catch(err){
    console.warn("Muziek kon niet starten:",err);
    return false;
  }
}

function stopMusic(){
  musicTimer=null;
  menuSoundtrack.pause();
}

function setMusic(on){
  musicOn=Boolean(on);
  localStore.setItem("stampertjesMusic",musicOn?"1":"0");
  setMusicButton();

  if(musicOn){
    return startMusic();
  }

  stopMusic();
  return Promise.resolve(false);
}

// Compatibiliteit met bestaande menu/game code.
function playMenuMusic(){return startMusic();}
function startMenuMusic(){return startMusic();}
function playMusicStep(){return startMusic();}
function stopMenuMusic(){stopMusic();}
function fadeSoundtrack(target,duration=0,pauseAfter=false){
  // v2.13.2: bewust eenvoudig en betrouwbaar.
  menuSoundtrack.volume=Math.max(0,Math.min(1,target));
  if(pauseAfter&&target<=.001)menuSoundtrack.pause();
}
function duckMenuMusic(duration=400){
  if(menuSoundtrack.paused||!musicOn)return;
  const original=targetMusicVolume();
  menuSoundtrack.volume=Math.min(original,.06);
  setTimeout(()=>{
    if(musicOn&&!menuSoundtrack.paused)menuSoundtrack.volume=targetMusicVolume();
  },duration);
}

async function tryImmediateMenuAutoplay(){
  if(musicOn&&state==="intro")await startMusic();
}

function handleFirstAudioGesture(){
  if(musicOn&&menuSoundtrack.paused){
    // Direct in dezelfde gebruikersactie proberen te starten.
    startMusic();
  }
  audio();
}
["pointerdown","touchstart","mousedown","keydown"].forEach(eventName=>{
  window.addEventListener(eventName,handleFirstAudioGesture,{
    passive:true,
    capture:true
  });
});

function toggleMusicFromUser(){
  audioMode=audioMode==="all"?"fx":audioMode==="fx"?"off":"all";
  fxOn=audioMode!=="off";
  musicOn=audioMode==="all";
  localStore.setItem("stampertjesAudioMode",audioMode);
  localStore.setItem("stampertjesMusic",musicOn?"1":"0");
  setMusicButton();
  if(musicOn)startMusic(); else stopMusic();
  updatePlayerContextOnline();
  audio();
}

musicToggle.addEventListener("pointerdown",e=>{
  e.preventDefault();
  e.stopPropagation();
  toggleMusicFromUser();
});

musicToggle.addEventListener("click",e=>{
  // Desktop fallback als pointerdown niet geleverd wordt.
  if(e.detail===0){
    e.preventDefault();
    e.stopPropagation();
    toggleMusicFromUser();
  }
});

menuMusicIcon.addEventListener("pointerdown",e=>{
  e.preventDefault();
  e.stopPropagation();
  menuMusicIcon.classList.add("musicPulse");
  setTimeout(()=>menuMusicIcon.classList.remove("musicPulse"),160);
  toggleMusicFromUser();
});

menuSoundtrack.addEventListener("error",()=>{
  console.error("The Castle Awakens kon niet worden geladen.",menuSoundtrack.error);
  musicToggle.textContent="MUZIEK: FOUT";
  menuMusicIcon.textContent="⚠️";
  menuMusicIcon.title="Muziekbestand niet gevonden";
});

document.addEventListener("visibilitychange",()=>{
  if(document.hidden){
    menuSoundtrack.pause();
  }else if(musicOn){
    startMusic();
  }
});

setMusicButton();

const pauseToggle=document.getElementById("pauseToggle");
const deathOverlay=document.getElementById("deathOverlay");
const deathTitle=document.getElementById("deathTitle");
const deathText=document.getElementById("deathText");
const deathCanvas=document.getElementById("deathCanvas");
const dctx=deathCanvas.getContext("2d");
dctx.imageSmoothingEnabled=false;
const pauseOverlay=document.getElementById("pauseOverlay");
const pauseMain=document.getElementById("pauseMain");
const pauseConfirmStop=document.getElementById("pauseConfirmStop");
const pauseResumeBtn=document.getElementById("pauseResumeBtn");
const pauseRestartBtn=document.getElementById("pauseRestartBtn");
const pauseStopBtn=document.getElementById("pauseStopBtn");
const pauseCancelStopBtn=document.getElementById("pauseCancelStopBtn");
const pauseConfirmStopBtn=document.getElementById("pauseConfirmStopBtn");
let levelStartScore=0,levelStartLives=3;
let previousState="play";
let pauseLocked=false;

function togglePause(){
  if(musicOn&&!menuSoundtrack.paused)applyMusicVolume();
  if(pauseLocked)return;
  if(state!=="play"&&state!=="paused")return;

  pauseLocked=true;

  if(state==="paused"){
    state=(previousState&&previousState!=="paused")?previousState:"play";
    pauseOverlay.classList.add("hidden");
    c.focus({preventScroll:true});
    pauseToggle.textContent="⏸ PAUZE";
    // Gameplaymuziek is bewust uitgeschakeld; alleen geluidseffecten blijven actief.
  }else{
    previousState=state;
    state="paused";
    pauseConfirmStop.classList.add("hidden");
    pauseMain.classList.remove("hidden");
    let devNav=document.getElementById("devPauseNav");
    if(devTestActive){
      if(!devNav){
        devNav=document.createElement("div");devNav.id="devPauseNav";
        devNav.innerHTML='<div class="devTestBadge">🛠️ TESTMODUS</div><button id="devPrevLevelBtn">← VORIG LEVEL</button><button id="devNextLevelBtn">VOLGEND LEVEL →</button><button id="devPortalBtn">DEVELOPER PORTAL</button>';
        pauseMain.appendChild(devNav);
        document.getElementById("devPrevLevelBtn").onclick=()=>devTestSwitchLevel(-1);
        document.getElementById("devNextLevelBtn").onclick=()=>devTestSwitchLevel(1);
        document.getElementById("devPortalBtn").onclick=()=>openIntro();
      }
      devNav.classList.remove("hidden");
    }else if(devNav)devNav.classList.add("hidden");
    pauseOverlay.classList.remove("hidden");
    pauseToggle.textContent="▶ VERDER";
    musicTimer=null;
  }

  setTimeout(()=>{pauseLocked=false},180);
}

pauseToggle.addEventListener("click",e=>{
  e.preventDefault();
  e.stopPropagation();
  togglePause();
});
pauseResumeBtn.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();togglePause();});

pauseRestartBtn.addEventListener("click",e=>{
  e.preventDefault();e.stopPropagation();
  score=levelStartScore;
  lives=levelStartLives;
  levelDeaths=0;
  state="play";
  pauseOverlay.classList.add("hidden");
  pauseConfirmStop.classList.add("hidden");
  pauseMain.classList.remove("hidden");
  pauseToggle.textContent="⏸ PAUZE";
  spawnLevel();
  startFreeze=75;
  document.body.classList.add("gameplayActive");
  logGameEvent("level_restart",{level,score});
});

pauseStopBtn.addEventListener("click",e=>{
  e.preventDefault();e.stopPropagation();
  pauseMain.classList.add("hidden");
  pauseConfirmStop.classList.remove("hidden");
});

pauseCancelStopBtn.addEventListener("click",e=>{
  e.preventDefault();e.stopPropagation();
  pauseConfirmStop.classList.add("hidden");
  pauseMain.classList.remove("hidden");
});

pauseConfirmStopBtn.addEventListener("click",e=>{
  e.preventDefault();e.stopPropagation();
  const stoppedLevel=level,stoppedScore=score;
  keys.left=keys.right=keys.up=keys.down=false;
  pauseOverlay.classList.add("hidden");
  pauseConfirmStop.classList.add("hidden");
  pauseMain.classList.remove("hidden");
  pauseToggle.textContent="⏸ PAUZE";
  if(devTestActive){openIntro();return;}
  logGameEvent("game_abort",{level:stoppedLevel,score:stoppedScore});
  openIntro();
});

pauseOverlay.addEventListener("pointerdown",e=>{
  // Alleen tikken op de donkere achtergrond hervat; knoppen handelen zichzelf af.
  if(e.target!==pauseOverlay)return;
  e.preventDefault();
  togglePause();
});

function floorIndex(y){
  let bi=0,bd=999;
  floors.forEach((fy,i)=>{const d=Math.abs(y-fy);if(d<bd){bd=d;bi=i}});
  return bi;
}
function tileX(x){return Math.max(18,Math.min(W-58,Math.floor((x+12)/40)*40))}
function ladderNear(x,y){
  return ladders.find(l=>x+12>l.x-12&&x+12<l.x+30&&y+28>=l.top-5&&y<=l.bottom+5);
}
function roomIndexForLevel(levelNumber){
  // Exact mapping: 1 Entreehal, 2 Wapenzaal, 3 Kerkers, 4 Bibliotheek, etc.
  // Only after level 10 does the ten-room cycle restart.
  const n=Math.max(1,Math.floor(Number(levelNumber)||1));
  return (n-1)%CASTLE_ROOM_THEMES.length;
}

function applyAdvancedPortraitLayout(kind){
 const P={
 books:[[95,130,295],[430,130,295],[220,295,460],[505,295,460],[85,460,625],[360,460,625],[210,625,800],[485,625,800]],
 wine:[[75,130,295],[350,130,295],[205,295,460],[485,295,460],[95,460,625],[405,460,625],[255,625,800]],
 alchemy:[[115,130,295],[475,130,295],[275,295,460],[70,460,625],[390,460,625],[190,625,800],[500,625,800]],
 treasure:[[70,130,295],[310,130,295],[505,295,460],[175,295,460],[80,460,625],[335,460,625],[235,625,800],[510,625,800]],
 catacombs:[[105,130,295],[465,130,295],[250,295,460],[75,460,625],[420,460,625],[170,625,800],[505,625,800]],
 tower:[[85,130,295],[360,130,295],[510,295,460],[190,295,460],[65,460,625],[335,460,625],[225,625,800],[500,625,800]]
 };
 if(!P[kind])return false;
 setLogicalGameSize(600,840);document.body.classList.add("portraitThroneMode");
 floors=[130,295,460,625,800];ladders=P[kind].map(a=>({x:a[0],top:a[1],bottom:a[2]}));return true;
}
function chooseLayoutForLevel(levelNumber){
  currentLayoutIndex=roomIndexForLevel(levelNumber);
  if(applyAdvancedPortraitLayout(currentCastleTheme().kind)) return;

  // HD portrait rooms own their geometry.
  if(currentCastleTheme().kind==="hall"){
    setLogicalGameSize(HALL_LOGICAL_W,HALL_LOGICAL_H);
    document.body.classList.add("portraitThroneMode");
    floors=HALL_FLOORS.slice();
    ladders=[
      {x:105,top:130,bottom:295},{x:475,top:130,bottom:295},
      {x:215,top:295,bottom:460},{x:390,top:295,bottom:460},
      {x:105,top:460,bottom:625},{x:475,top:460,bottom:625},
      {x:215,top:625,bottom:800},{x:390,top:625,bottom:800}
    ];
    console.info("[BETA 3.6.4] Entreehal geometry:",floors,ladders);
    return;
  }
  if(currentCastleTheme().kind==="arms"){
    setLogicalGameSize(ARMORY_LOGICAL_W,ARMORY_LOGICAL_H);
    document.body.classList.add("portraitThroneMode");
    floors=ARMORY_FLOORS.slice();
    ladders=[
      {x:105,top:130,bottom:295},{x:475,top:130,bottom:295},
      {x:215,top:295,bottom:460},{x:390,top:295,bottom:460},
      {x:105,top:460,bottom:625},{x:475,top:460,bottom:625},
      {x:215,top:625,bottom:800},{x:390,top:625,bottom:800}
    ];
    console.info("[v2.3.4] Wapenzaal portrait geometry:",floors,ladders);
    return;
  }
  if(currentCastleTheme().kind==="cells"){
    setLogicalGameSize(DUNGEON_LOGICAL_W,DUNGEON_LOGICAL_H);
    document.body.classList.add("portraitThroneMode");
    floors=DUNGEON_FLOORS.slice();
    ladders=[
      {x:82,top:130,bottom:295},{x:420,top:130,bottom:295},
      {x:185,top:295,bottom:460},{x:500,top:295,bottom:460},
      {x:78,top:460,bottom:625},{x:355,top:460,bottom:625},
      {x:235,top:625,bottom:800},{x:500,top:625,bottom:800}
    ];
    return;
  }
  if(currentCastleTheme().kind==="throne"){
    setLogicalGameSize(THRONE_LOGICAL_W,THRONE_LOGICAL_H);
    document.body.classList.add("portraitThroneMode");
    floors=THRONE_FLOORS.slice();
    ladders=[
      {x:105,top:145,bottom:305},{x:485,top:145,bottom:305},
      {x:185,top:305,bottom:465},{x:405,top:305,bottom:465},
      {x:105,top:465,bottom:625},{x:485,top:465,bottom:625},
      {x:185,top:625,bottom:800},{x:405,top:625,bottom:800}
    ];
    console.info("[BETA 3] Troonzaal geometry:",floors,ladders);
    return;
  }
  setLogicalGameSize(DEFAULT_LOGICAL_W,DEFAULT_LOGICAL_H);
  document.body.classList.remove("portraitThroneMode");
  floors=DEFAULT_FLOORS.slice();

  // The room theme and ladder layout always use the SAME index.
  // This prevents e.g. "LEVEL 2 WAPENZAAL" while the HUD says TROONZAAL.
  ladders=ladderLayouts[currentLayoutIndex].map(l=>({...l}));
}

function clearStartZone(){
  enemies.forEach((e,i)=>{
    if(e.floor===floors.length-1 && e.x<220){
      e.floor=i%4;
      e.x=260+(i%3)*58;
      e.y=floors[e.floor]-24;
      e.dir=-1;
      e.think=100+Math.random()*120;
      e.onLadder=false;
      e.ladder=null;
      e.ladderTargetFloor=null;
      e.trapped=0;
      e.ladderCooldown=150;
    }
  });
}

function ensureGameplayControlsVisible(){
  const controls=document.getElementById("controls");
  const gameOptions=document.getElementById("gameOptions");
  if(controls)controls.classList.remove("hidden");
  if(gameOptions)gameOptions.classList.remove("hidden");
}

function resetPlayerSafely(){
  player.fallingThroughHole=null;
  ensureGameplayControlsVisible();
  player.x=30;
  player.y=floors[floors.length-1]-player.h;
  player.onLadder=false;
  player.cool=0;
  player.invulnerable=210; // ongeveer 2,5 seconde bescherming
  clearStartZone();
}

function spawnLevel(){
  levelStartScore=score;
  levelStartLives=lives;
  chooseLayoutForLevel(level);

  // HD-room guards: ensure custom geometry survives every reset/spawn.
  if(currentCastleTheme().kind==="hall"){
    setLogicalGameSize(HALL_LOGICAL_W,HALL_LOGICAL_H);
    document.body.classList.add("portraitThroneMode");
    floors=HALL_FLOORS.slice();
    ladders=[
      {x:105,top:130,bottom:295},{x:475,top:130,bottom:295},
      {x:215,top:295,bottom:460},{x:390,top:295,bottom:460},
      {x:105,top:460,bottom:625},{x:475,top:460,bottom:625},
      {x:215,top:625,bottom:800},{x:390,top:625,bottom:800}
    ];
  }
  if(currentCastleTheme().kind==="arms"){
    setLogicalGameSize(ARMORY_LOGICAL_W,ARMORY_LOGICAL_H);
    document.body.classList.add("portraitThroneMode");
    floors=ARMORY_FLOORS.slice();
    ladders=[
      {x:105,top:130,bottom:295},{x:475,top:130,bottom:295},
      {x:215,top:295,bottom:460},{x:390,top:295,bottom:460},
      {x:105,top:460,bottom:625},{x:475,top:460,bottom:625},
      {x:215,top:625,bottom:800},{x:390,top:625,bottom:800}
    ];
  }
  if(currentCastleTheme().kind==="throne"){
    setLogicalGameSize(THRONE_LOGICAL_W,THRONE_LOGICAL_H);
    document.body.classList.add("portraitThroneMode");
    floors=THRONE_FLOORS.slice();
    ladders=[
      {x:105,top:145,bottom:305},{x:485,top:145,bottom:305},
      {x:185,top:305,bottom:465},{x:405,top:305,bottom:465},
      {x:105,top:465,bottom:625},{x:485,top:465,bottom:625},
      {x:185,top:625,bottom:800},{x:405,top:625,bottom:800}
    ];
  }
  if(livingCastle.teddy&&!livingCastle.teddy.dancing)livingCastle.teddy=null;
  keys.left=keys.right=keys.up=keys.down=false;
  pauseOverlay.classList.add("hidden");
  pauseToggle.textContent="⏸ PAUZE";
  holes=[];cracks=[];enemies=[];effects=[];bonus=null;bonusSpawnTimer=300+Math.random()*300;combo=0;comboTimer=0;
  player.x=30;player.y=floors[floors.length-1]-player.h;player.onLadder=false;player.cool=0;player.invulnerable=210;
  const count=Math.min(2+level,7);
  for(let i=0;i<count;i++){
    const fi=i%(floors.length-2);
    let type="green";
    if(level>=3 && i%4===1)type="red";
    if(level>=5 && i%5===2)type="black";
    if(level>=4 && i===count-1 && Math.random()<0.35)type="gold";

    const typeSpeed=type==="red"?.12:type==="gold"?.08:type==="black"?.03:0;
    const typeHits=type==="black"?3:(level>=4?3:2);

    enemies.push({
      id:enemyIdCounter++,
      type,
      x:410-(i*58)%330,y:floors[fi]-24,floor:fi,dir:i%2?1:-1,
      speed:.45+Math.min(level,12)*.045+(i%3)*.03+typeSpeed,trapped:0,hitsNeeded:typeHits,
      hitsLeft:typeHits,blink:0,dead:false,
      think:30+Math.random()*110,mood:Math.random(),ladderCooldown:0,
      onLadder:false,ladder:null,ladderTargetFloor:null,holeCooldown:0,slowTimer:0
    });
  }
  clearStartZone();
}

function trappedEnemyUnderPlayer(){
  const pc=player.x+player.w/2;
  return enemies.find(e=>e.trapped>0&&e.floor===floorIndex(player.y+player.h)&&Math.abs(pc-(e.x+14))<28);
}

function stamp(){
  audio();
  if(state!=="play"||player.cool>0||player.onLadder)return;

  const enemy=trappedEnemyUnderPlayer();
  if(enemy){
    enemy.hitsLeft--;
    player.cool=player.fastStamp>0?7:18;shake=7;sfxHit();
    effects.push({type:"hit",x:enemy.x+14,y:floors[enemy.floor]-18,t:24});
    if(enemy.hitsLeft<=0){
      enemy.dead=true;
      const occupiedHole=holes.find(h=>h.occupiedBy===enemy.id);
      if(occupiedHole)occupiedHole.occupiedBy=null;

      combo = comboTimer>0 ? combo+1 : 1;
      comboTimer=180;
      const base=enemy.type==="gold"?900:enemy.type==="red"?400:enemy.type==="black"?500:300;
      const comboBonus=combo>1?(combo-1)*200:0;
      const earned=base+comboBonus;
      score+=earned;
      const killStats=getStats();
      killStats.applesDefeated=(Number(killStats.applesDefeated)||0)+1;
      killStats.longestCombo=Math.max(Number(killStats.longestCombo)||0,combo);
      killStats.bestScore=Math.max(Number(killStats.bestScore)||0,score);
      killStats.highestLevel=Math.max(Number(killStats.highestLevel)||1,level);
      saveStats(killStats);

      shake=12;sfxKill();
      effects.push({type:"dust",x:enemy.x+14,y:floors[enemy.floor]-8,t:42});
      effects.push({type:"score",x:enemy.x-2,y:floors[enemy.floor]-34,t:70,text:`+${earned}`});
      if(combo>1)effects.push({type:"combo",x:enemy.x-10,y:floors[enemy.floor]-48,t:70,text:`COMBO x${combo}`});
    }
    return;
  }

  const fi=floorIndex(player.y+player.h);
  if(fi===floors.length-1)return;
  if(Math.abs((player.y+player.h)-floors[fi])>7)return;
  const gx=tileX(player.x);
  if(ladders.some(l=>{
    const sameFloor=(l.top===floors[fi]||l.bottom===floors[fi]);
    const ladderCenter=l.x+10;
    const holeCenter=gx+20;
    return sameFloor && Math.abs(ladderCenter-holeCenter)<9;
  }))return;
  if(holes.some(h=>h.floor===fi&&h.x===gx))return;

  let cr=cracks.find(q=>q.floor===fi&&q.x===gx);
  if(!cr){cr={x:gx,floor:fi,hits:0,timer:700};cracks.push(cr)}
  cr.hits++;cr.timer=700;player.cool=player.fastStamp>0?6:16;shake=3+cr.hits;sfxCrack();

  if(cr.hits>=FLOOR_HITS){
    holes.push({x:gx,floor:fi,timer:520,occupiedBy:null});
    cracks=cracks.filter(q=>q!==cr);
    shake=10;sfxBreak();
  }
}

function bind(id,key){
  const el=document.getElementById(id);
  ['pointerdown','touchstart'].forEach(ev=>el.addEventListener(ev,e=>{e.preventDefault();audio();keys[key]=true}));
  ['pointerup','pointercancel','pointerleave','touchend'].forEach(ev=>el.addEventListener(ev,e=>{e.preventDefault();keys[key]=false}));
}
bind("left","left");bind("right","right");bind("up","up");bind("down","down");
let keyboardDetected=false;

function isTypingTarget(target){
  if(!target)return false;
  const tag=String(target.tagName||"").toLowerCase();
  return tag==="input" || tag==="textarea" || tag==="select" || target.isContentEditable===true;
}

function enableKeyboardMode(){
  if(keyboardDetected)return;
  keyboardDetected=true;
  document.body.classList.add("keyboardMode");
}

window.addEventListener("keydown",e=>{
  if(isTypingTarget(e.target))return;
  enableKeyboardMode();

  const controlKeys=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"," ","Spacebar","p","P","m","M","Escape"];
  if(controlKeys.includes(e.key))e.preventDefault();

  if(e.key==="ArrowLeft")keys.left=true;
  if(e.key==="ArrowRight")keys.right=true;
  if(e.key==="ArrowUp")keys.up=true;
  if(e.key==="ArrowDown")keys.down=true;

  if((e.key===" "||e.key==="Spacebar")&&!e.repeat){
    stamp();
  }

  if((e.key==="p"||e.key==="P")&&!e.repeat){
    togglePause();
  }

  if((e.key==="m"||e.key==="M")&&!e.repeat){
    toggleMusicFromUser();
  }

  if(e.key==="Escape"&&!e.repeat){
    if(state==="play"||state==="paused")togglePause();
    else if(state==="intro")showMainMenu();
  }
});

window.addEventListener("keyup",e=>{
  if(e.key==="ArrowLeft")keys.left=false;
  if(e.key==="ArrowRight")keys.right=false;
  if(e.key==="ArrowUp")keys.up=false;
  if(e.key==="ArrowDown")keys.down=false;
});

// Als een fysiek toetsenbord aanwezig lijkt, schakel direct de ruimere desktopweergave in.
if(window.matchMedia("(pointer:fine)").matches && window.innerWidth>=700){
  document.body.classList.add("keyboardMode");
  keyboardDetected=true;
}
document.getElementById("stamp").addEventListener("pointerdown",e=>{e.preventDefault();stamp()});


function updatePlayer(){
  window.CastleTouch?.update();
  if(player.cool>0)player.cool--;
  if(player.invulnerable>0)player.invulnerable--;

  // Een val door een gat houdt één vaste doelverdieping vast.
  // Hierdoor kan floorIndex() de speler niet meer halverwege de val
  // naar de volgende vloer laten 'snappen'.
  if(player.fallingThroughHole){
    const fall=player.fallingThroughHole;
    const targetY=floors[fall.targetFloor]-player.h;

    // lichte versnelling: zichtbaar vloeiend, maar niet tergend langzaam
    fall.vy=Math.min((fall.vy||2.8)+0.16,6.0);
    player.y+=fall.vy;

    if(player.y>=targetY){
      player.y=targetY;
      player.fallingThroughHole=null;
    }
    return;
  }

  const lad=ladderNear(player.x,player.y);
  if(lad&&(keys.up||keys.down||player.onLadder)){
    player.onLadder=true;
    player.x+=(lad.x-player.x)*.38;
    if(keys.up)player.y-=2.3;
    if(keys.down)player.y+=2.3;
    if(player.y<lad.top-player.h){player.y=lad.top-player.h;player.onLadder=false}
    if(player.y>lad.bottom-player.h){player.y=lad.bottom-player.h;player.onLadder=false}
    return;
  }

  player.onLadder=false;
  if(keys.left){player.x-=2.25;player.dir=-1}
  if(keys.right){player.x+=2.25;player.dir=1}
  player.x=Math.max(10,Math.min(W-player.w-10,player.x));

  const fi=floorIndex(player.y+player.h);
  const fy=floors[fi];
  const center=player.x+player.w/2;
  const under=holes.find(h=>h.floor===fi&&center>h.x&&center<h.x+40);

  // Zodra een appel vastzit, wordt de HELE opening beloopbaar.
  const trappedInHole=enemies.find(e=>{
    if(e.trapped<=0||e.floor!==fi)return false;
    const hole=holes.find(h=>h.floor===fi&&h.occupiedBy===e.id);
    return !!hole;
  });

  let supported=false;
  if(under&&trappedInHole){
    const h=holes.find(h=>h.floor===fi&&h.occupiedBy===trappedInHole.id);
    supported = !!h && center>h.x-8 && center<h.x+48;
  }

  if(under&&!supported && fi<floors.length-1){
    // Start één echte val naar de eerstvolgende speelvloer.
    // De bronvloer verandert tijdens de val niet meer.
    player.onLadder=false;
    player.fallingThroughHole={
      sourceFloor:fi,
      targetFloor:fi+1,
      vy:2.8
    };
    player.y+=2.8;
  }else{
    player.y=fy-player.h;
  }
}
function startEnemyLadder(e,l,targetFloor){
  e.onLadder=true;
  e.ladder=l;
  e.ladderTargetFloor=targetFloor;
  e.x=l.x-4;
  e.ladderCooldown=120;
}


function drawDeathScene(progress){
  const w=deathCanvas.width;
  const h=deathCanvas.height;

  dctx.save();
  dctx.imageSmoothingEnabled=true;
  dctx.imageSmoothingQuality="high";

  if(deathDungeonBg.complete&&deathDungeonBg.naturalWidth){
    dctx.drawImage(deathDungeonBg,0,0,w,h);
  }else{
    dctx.fillStyle="#16110e";
    dctx.fillRect(0,0,w,h);
  }

  // Dark prison recess.
  dctx.fillStyle="rgba(4,5,6,.70)";
  dctx.fillRect(56,30,w-112,112);
  dctx.strokeStyle="#7a5933";
  dctx.lineWidth=3;
  dctx.strokeRect(56,30,w-112,112);

  // Warm torch pools.
  const glow=(x,y)=>{
    const gr=dctx.createRadialGradient(x,y,2,x,y,42);
    gr.addColorStop(0,"rgba(255,214,112,.72)");
    gr.addColorStop(.30,"rgba(230,126,39,.28)");
    gr.addColorStop(1,"rgba(60,25,8,0)");
    dctx.fillStyle=gr;
    dctx.beginPath();dctx.arc(x,y,42,0,Math.PI*2);dctx.fill();
  };
  glow(32,70); glow(w-32,70);

  // Mascot prisoner.
  const px=w/2-12,py=91;
  dctx.save();
  dctx.translate(px+12,py+14);
  dctx.scale(1.28,1.28);
  dctx.translate(-(px+12),-(py+14));
  drawStampertjeSprite(dctx,px,py,{
    dir:1,
    step:0,
    bodyColor:"#184f70",
    limbColor:"#d6a33f",
    eyeColor:"#effcff"
  });

  dctx.fillStyle="#f0c34e";
  dctx.strokeStyle="#7a4b10";
  dctx.lineWidth=1;
  dctx.beginPath();
  dctx.moveTo(px+4,py+1);dctx.lineTo(px+6,py-6);dctx.lineTo(px+10,py-2);
  dctx.lineTo(px+12,py-8);dctx.lineTo(px+15,py-2);dctx.lineTo(px+19,py-6);
  dctx.lineTo(px+21,py+1);dctx.closePath();dctx.fill();dctx.stroke();
  dctx.restore();

  // Prison bars close during the first half of the animation.
  const close=Math.min(1,progress/.48);
  dctx.strokeStyle="#151515";
  dctx.lineWidth=8;
  for(let i=0;i<6;i++){
    const base=67+i*((w-134)/5);
    const offset=(1-close)*(i%2===0?-30:30);
    dctx.beginPath();
    dctx.moveTo(base+offset,31);
    dctx.lineTo(base+offset,143);
    dctx.stroke();
  }
  dctx.strokeStyle="#4d3925";
  dctx.lineWidth=3;
  dctx.beginPath();dctx.moveTo(56,58);dctx.lineTo(w-56,58);dctx.stroke();
  dctx.beginPath();dctx.moveTo(56,120);dctx.lineTo(w-56,120);dctx.stroke();

  // Short impact flash.
  if(progress<.20){
    dctx.fillStyle=`rgba(255,222,145,${(.20-progress)*.65})`;
    dctx.fillRect(0,0,w,h);
  }

  dctx.textAlign="center";
  dctx.fillStyle="#f0c77a";
  dctx.font="bold 14px monospace";
  dctx.fillText("JE BENT GEVANGEN!",w/2,20);

  if(progress>.60){
    dctx.font="9px monospace";
    dctx.fillStyle="#d9b982";
    dctx.fillText("DE APPELIETEN HEBBEN JE TE PAKKEN...",w/2,h-8);
  }
  dctx.textAlign="left";
  dctx.restore();
}
function animateDeath(startTime,duration,isGameOver){
  const now=performance.now();
  const progress=Math.min((now-startTime)/duration,1);
  drawDeathScene(progress);

  if(progress<1){
    requestAnimationFrame(()=>animateDeath(startTime,duration,isGameOver));
  }
}

function showDeathSequence(isGameOver){
  if(musicOn&&!menuSoundtrack.paused){ menuSoundtrack.volume=.05; }
  if(deathAnimating)return;
  deathAnimating=true;
  state="dying";
  document.body.classList.remove("gameplayActive");
  keys.left=keys.right=keys.up=keys.down=false;
  pauseOverlay.classList.add("hidden");

  deathTitle.textContent=isGameOver?"GAME OVER":"AUW!";
  deathText.textContent=isGameOver
    ?"Je laatste leven is voorbij..."
    :"Even bijkomen...";

  deathOverlay.classList.remove("hidden");
  sfxHurt();
  animateDeath(performance.now(),1450,isGameOver);

  setTimeout(()=>{
    deathText.textContent=isGameOver?"Eindscore wordt klaargemaakt...":"Het kasteel zet je weer op de been...";
  },1450);

  setTimeout(()=>{
    deathOverlay.classList.add("hidden");
    deathAnimating=false;

    if(isGameOver){
      state="gameover";
      showGameOverPanel();
    }else{
      resetPlayerSafely();
      ensureGameplayControlsVisible();
      startFreeze=90;
      state="play";
      if(musicOn&&!menuSoundtrack.paused)applyMusicVolume();
      document.body.classList.add("gameplayActive");
    }
  },2450);
}

function enemyTouchesPlayer(e){
  if(!e||e.dead||e.trapped>0||player.invulnerable>0||state!=="play")return false;
  return (
    player.x-2 < e.x+30 &&
    player.x+player.w+2 > e.x-2 &&
    player.y-4 < e.y+29 &&
    player.y+player.h+4 > e.y-5
  );
}
function playerKilledByEnemy(){
  if(state!=="play"||player.invulnerable>0)return;
  lives--;levelDeaths++;flawlessLevels=0;
  shake=11;
  const deathStats=getStats();
  deathStats.deaths=(Number(deathStats.deaths)||0)+1;
  deathStats.bestScore=Math.max(Number(deathStats.bestScore)||0,score);
  deathStats.highestLevel=Math.max(Number(deathStats.highestLevel)||1,level);
  saveStats(deathStats);
  logGameEvent("death",{level,score});
  showDeathSequence(lives<=0);
}
function checkAllEnemyCollisions(){
  if(state!=="play"||player.invulnerable>0)return;
  for(const e of enemies){
    if(enemyTouchesPlayer(e)){playerKilledByEnemy();break;}
  }
}

function updateEnemies(){
  if(startFreeze>0){
    startFreeze--;
    return;
  }
  enemies.forEach(e=>{
    if(e.dead)return;

    if(e.trapped>0){
      e.trapped--;e.blink++;
      if(e.trapped<=0){
        const occupiedHole=holes.find(h=>h.occupiedBy===e.id);
        if(occupiedHole)occupiedHole.occupiedBy=null;

        e.trapped=0;
        e.y=floors[e.floor]-24;
        e.dir=(e.dir===0?1:e.dir);
        e.x=Math.max(14,Math.min(W-42,e.x+e.dir*30));
        e.hitsLeft=e.hitsNeeded;
        e.holeCooldown=120;
        e.think=70+Math.random()*100;

        effects.push({type:"escape",x:e.x,y:e.y-8,t:45,text:"ONTsnapt!"});
      }
      return;
    }

    // Soepel ladderklimmen: eerst naar het midden van de ladder,
    // daarna pixel voor pixel omhoog of omlaag.
    if(e.onLadder && e.ladder){
      const targetY=floors[e.ladderTargetFloor]-24;
      e.x+=(e.ladder.x-4-e.x)*.28;
      const dy=targetY-e.y;
      const climbSpeed=(1.25+Math.min(level*.03,.35))*(e.slowTimer>0?.5:1);

      if(Math.abs(dy)<=climbSpeed+1){
        e.y=targetY;
        e.floor=e.ladderTargetFloor;
        e.onLadder=false;
        e.ladder=null;
        e.ladderTargetFloor=null;
        e.think=70+Math.random()*90;e.ladderCooldown=120;e.holeCooldown=45;
      }else{
        e.y+=Math.sign(dy)*climbSpeed;
      }
      return;
    }

    const pc=player.x+12;
    if(e.ladderCooldown>0)e.ladderCooldown--; if(e.holeCooldown>0)e.holeCooldown--;
    e.think--;

    if(e.think<=0){
      const roll=Math.random();

      // v2.22.10: agressie loopt bewust op per level.
      const chaseChance=Math.min(.94,
        level<=2 ? .66+level*.03 :
        level<=5 ? .72+level*.02 :
        level<=9 ? .78+level*.015 :
        .91+Math.min(level-10,3)*.01
      );

      const wanderChance=Math.max(.05,.18-level*.008);

      if(roll<chaseChance){
        e.dir=pc>(e.x+14)?1:-1;
      }else if(roll<chaseChance+wanderChance){
        e.dir=Math.random()<.5?-1:1;
      }else{
        e.dir=pc>(e.x+14)?-1:1;
      }

      const minThink=Math.max(28,58-level*2);
      const maxThink=Math.max(72,138-level*4);
      e.think=minThink+Math.random()*(maxThink-minThink);
    }

    const randomTurnChance=Math.max(.00025,.0010-level*.00005);
    if(Math.random()<randomTurnChance)e.dir*=-1;

    // Kies alleen een ladder wanneer de appel er echt vlakbij staat.
    // De kans is hoger wanneer de speler op een andere verdieping staat.
    if(e.ladderCooldown===0){
      for(const l of ladders){
        const near=Math.abs((e.x+14)-(l.x+10))<8;
        if(!near)continue;

        const playerFloor=floorIndex(player.y+player.h);
        const wantsOtherFloor=playerFloor!==e.floor;

        // Als de speler op een andere verdieping staat, zoekt de appel
        // duidelijk vaker een ladder. Op dezelfde verdieping blijft hij rustiger.
        const floorDistance=Math.abs(playerFloor-e.floor);
        const chance=wantsOtherFloor
          ? 0.045 + Math.min(floorDistance*0.012,0.035)
          : 0.006;

        if(Math.random()<chance){
          if(l.top===floors[e.floor] && e.floor<floors.length-1){
            startEnemyLadder(e,l,e.floor+1);
            return;
          }
          if(l.bottom===floors[e.floor] && e.floor>0){
            startEnemyLadder(e,l,e.floor-1);
            return;
          }
        }
      }
    }

    if(e.type==="black"){
      const ahead=e.x+14+e.dir*22;
      const danger=holes.find(h=>h.floor===e.floor&&h.occupiedBy===null&&ahead>h.x&&ahead<h.x+40);
      if(danger && Math.random()<0.82)e.dir*=-1;
    }

    e.x+=e.dir*e.speed*(e.slowTimer>0?.5:1);
    if(e.x<14){e.x=14;e.dir=1}
    if(e.x>W-42){e.x=W-42;e.dir=-1}


    const occupiedBridge=holes.find(h=>
      h.floor===e.floor &&
      h.occupiedBy!==null &&
      e.x+14>h.x-4 &&
      e.x+14<h.x+44
    );
    if(occupiedBridge){
      e.y=floors[e.floor]-24;
    }

    const h=holes.find(h=>
      h.floor===e.floor &&
      h.occupiedBy===null &&
      e.holeCooldown<=0 &&
      e.x+14>h.x+2 &&
      e.x+14<h.x+38
    );
    if(h){
      h.occupiedBy=e.id;
      e.x=h.x+6;
      e.y=floors[e.floor]-9;
      e.trapped=300-Math.min(level*6,60);
      e.hitsLeft=e.hitsNeeded;
      if(performance.now()-lastTrapSound>100){
        sfxTrap();
        lastTrapSound=performance.now();
      }
    }else{
      e.y=floors[e.floor]-24;
    }

    if(enemyTouchesPlayer(e)){
      playerKilledByEnemy();
      return;
    }
  });

  enemies=enemies.filter(e=>!e.dead);
  if(enemies.length===0 && !levelTransitioning && state==="play"){
    score+=500;
    if(levelDeaths===0){
      flawlessLevels++;
      if(flawlessLevels>=3 && lives<MAX_LIVES){
        lives++; flawlessLevels=0;
        effects.push({type:"score",x:115,y:92,t:130,text:"♥ EXTRA LEVEN — 3 LEVELS FOUTLOOS!"});
        tone(660,.08,"square",.05,880);setTimeout(()=>tone(990,.12,"square",.05,1320),90);
        logGameEvent("extra_life",{level,score,bonusType:"flawless"});
      }
    }else flawlessLevels=0;
    levelDeaths=0;
    updateProgressStats();
    const completedLevel=level;
    const nextLevel=completedLevel+1;
    level=nextLevel;
    // Progression is deliberately exactly +1: 1→2→3→4 etc.
    if(completedLevel===10&&!devTestActive){
      state="boss";window.CastleBoss.open(false,()=>showLevelTransition(completedLevel,nextLevel));
    }else showLevelTransition(completedLevel,nextLevel);
  }
}


function sfxBonusAppear(type){
  // Short, recognisable arcade cue when a bonus enters the castle.
  // tone() already respects ALLES AAN / ALLEEN FX / ALLES UIT.
  if(type==="heart"){
    tone(620,.06,"square",.03,820);setTimeout(()=>tone(930,.09,"square",.026,1240),65);
  }else if(type==="clock"){
    tone(880,.055,"square",.028,1040);
    setTimeout(()=>tone(1175,.07,"square",.024,1320),65);
  }else if(type==="banana"){
    tone(420,.055,"square",.026,610);
    setTimeout(()=>tone(690,.06,"square",.022,820),55);
  }else if(type==="star"){
    tone(760,.05,"square",.025,1080);
    setTimeout(()=>tone(1280,.075,"square",.022,1500),50);
  }else{
    tone(560,.055,"square",.026,720);
    setTimeout(()=>tone(840,.06,"square",.022,940),55);
  }
}

function spawnBonus(){
  const types=["cherry","banana","star","clock"];
  const heartChance=(level>=3 && lives<MAX_LIVES)?Math.min(.12,.035+(level-3)*.006):0;
  const type=Math.random()<heartChance?"heart":types[Math.floor(Math.random()*types.length)];

  let floor=Math.floor(Math.random()*floors.length);
  let x=60+Math.random()*(W-120);

  for(let tries=0;tries<20;tries++){
    floor=Math.floor(Math.random()*floors.length);
    x=60+Math.random()*(W-120);

    const nearHole=holes.some(h=>h.floor===floor && Math.abs((h.x+20)-x)<55);
    const nearLadder=ladders.some(l=>
      (l.top===floors[floor]||l.bottom===floors[floor]) &&
      Math.abs((l.x+10)-x)<35
    );

    if(!nearHole&&!nearLadder)break;
  }

  bonus={type,floor,x,y:floors[floor]-18,timer:600};
  sfxBonusAppear(type);
  logGameEvent("bonus_spawn",{level,score,bonusType:type});
}
function collectBonus(){
  if(!bonus)return;
  const collectedBonusType=bonus.type;
  let earned=0;
  if(bonus.type==="cherry")earned=500;
  if(bonus.type==="banana")earned=1000;
  if(bonus.type==="star"){
    earned=250;
    player.fastStamp=420;
  }
  if(bonus.type==="clock"){
    earned=250;
    enemies.forEach(e=>e.slowTimer=300);
  }
  if(bonus.type==="heart" && lives<MAX_LIVES){
    lives++;
    effects.push({type:"score",x:bonus.x-42,y:bonus.y-18,t:115,text:"♥ EXTRA LEVEN!"});
    tone(660,.08,"square",.05,880);setTimeout(()=>tone(990,.12,"square",.05,1320),90);
    logGameEvent("extra_life",{level,score,bonusType:"heart"});
  }
  score+=earned;
      updateProgressStats();
  effects.push({type:"score",x:bonus.x,y:bonus.y-12,t:70,text:`+${earned}`});
  tone(520,.08,"square",.04,760);
  logGameEvent("bonus_collect",{level,score,bonusType:collectedBonusType});
  bonus=null;
  bonusSpawnTimer=500+Math.random()*500;
}
function updateBonus(){
  if(player.fastStamp>0)player.fastStamp--;
  enemies.forEach(e=>{if(e.slowTimer>0)e.slowTimer--});

  if(bonus){
    bonus.timer--;
    const sameFloor=Math.abs((player.y+player.h)-floors[bonus.floor])<7;
    if(sameFloor && Math.abs((player.x+12)-bonus.x)<22)collectBonus();
    if(bonus && bonus.timer<=0){
      bonus=null;
      bonusSpawnTimer=300+Math.random()*500;
    }
  }else{
    bonusSpawnTimer--;
    if(bonusSpawnTimer<=0)spawnBonus();
  }
}

function update(){
  if(state!=="play")return;
  frame++;
  updatePlayer();
  updateGameplayTeddy();
  if(state!=="play")return; // Teddy encounter freezes enemies/bonus immediately.
  updateEnemies();
  checkAllEnemyCollisions();
  if(state!=="play")return;
  updateBonus();
  holes.forEach(h=>{
    // Een bezet gat blijft bestaan zolang de appel erin zit.
    if(h.occupiedBy===null)h.timer--;
  });
  holes=holes.filter(h=>h.timer>0||h.occupiedBy!==null);
  cracks.forEach(q=>q.timer--);cracks=cracks.filter(q=>q.timer>0);
  effects.forEach(e=>e.t--);effects=effects.filter(e=>e.t>0);
  if(comboTimer>0){comboTimer--;}else{combo=0;comboTimer=0;}
  if(shake>0)shake--;
}

function drawPlayer(x,y){
  const walking=(keys.left||keys.right)&&!player.onLadder;
  const premiumRoom=["hall","arms","cells","books","throne","wine","alchemy","treasure","catacombs","tower"].includes(currentCastleTheme().kind);

  if(premiumRoom){
    ctx.save();
    const cx=x+12,cy=y+14;

    // soft readable halo
    const glow=ctx.createRadialGradient(cx,cy,3,cx,cy,22);
    glow.addColorStop(0,"rgba(255,215,105,.30)");
    glow.addColorStop(.6,"rgba(255,190,70,.11)");
    glow.addColorStop(1,"rgba(255,170,50,0)");
    ctx.fillStyle=glow;ctx.beginPath();ctx.arc(cx,cy,22,0,Math.PI*2);ctx.fill();

    // mascot body, visually larger than hitbox
    const bob=walking?(Math.floor(frame/6)%2?1:0):0;
    ctx.translate(cx,cy+bob);
    ctx.scale(1.34,1.34);
    ctx.translate(-cx,-cy);

    // hood/head
    ctx.fillStyle="#12344d";
    ctx.strokeStyle="#d3a13f";
    ctx.lineWidth=1.5;
    ctx.beginPath();ctx.arc(cx,y+9,10,Math.PI,0);ctx.lineTo(x+22,y+18);ctx.lineTo(x+2,y+18);ctx.closePath();ctx.fill();ctx.stroke();

    // face opening
    ctx.fillStyle="#071219";
    ctx.beginPath();ctx.ellipse(cx,y+10,7,5.5,0,0,Math.PI*2);ctx.fill();

    // eyes
    ctx.fillStyle="#e9fbff";
    const look=player.dir>0?1:-1;
    ctx.beginPath();ctx.ellipse(cx-3+look*.5,y+10,1.8,2.4,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.ellipse(cx+3+look*.5,y+10,1.8,2.4,0,0,Math.PI*2);ctx.fill();

    // tunic/body
    ctx.fillStyle="#184f70";
    ctx.beginPath();ctx.roundRect(x+5,y+17,14,10,3);ctx.fill();
    ctx.strokeStyle="#d3a13f";ctx.stroke();

    // gold belt/emblem
    ctx.fillStyle="#d3a13f";ctx.fillRect(x+6,y+21,12,2);
    ctx.beginPath();ctx.arc(cx,y+22,2.1,0,Math.PI*2);ctx.fill();

    // arms/feet
    ctx.fillStyle="#d3a13f";
    if(player.onLadder){
      ctx.fillRect(x+1,y+16,5,4);ctx.fillRect(x+18,y+12,5,4);
    }else{
      ctx.fillRect(x+2,y+18,4,5);ctx.fillRect(x+18,y+18,4,5);
    }
    ctx.fillStyle="#12344d";
    ctx.fillRect(x+5,y+26,6,3);ctx.fillRect(x+14,y+26,6,3);

    // crown
    ctx.fillStyle="#f0c34e";ctx.strokeStyle="#7a4b10";ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(x+4,y+1);ctx.lineTo(x+6,y-6);ctx.lineTo(x+10,y-2);
    ctx.lineTo(cx,y-8);ctx.lineTo(x+15,y-2);ctx.lineTo(x+19,y-6);
    ctx.lineTo(x+21,y+1);ctx.closePath();ctx.fill();ctx.stroke();

    ctx.restore();
    return;
  }

  drawStampertjeSprite(ctx,x,y,{
    dir:player.dir,
    step:walking?Math.floor(frame/6)%2:0,
    climbing:player.onLadder,
    stamping:player.cool>12&&!player.onLadder
  });
}
function drawApple(e){
  if(e.trapped>0&&e.trapped<90&&Math.floor(e.blink/6)%2===0)return;
  ctx.save();
  if(["hall","arms","cells","books","throne","wine","alchemy","treasure","catacombs","tower"].includes(currentCastleTheme().kind)){
    const cols=["#8e44ad","#2d9cdb","#7cb342","#eb5757","#f2994a"];
    ctx.fillStyle=cols[(e.id||0)%cols.length];
    ctx.strokeStyle="#f4dfbd";
    ctx.shadowColor="rgba(255,255,255,.55)";
    ctx.shadowBlur=4;
  }
  if(e.type==="red")ctx.setLineDash([3,2]);
  if(e.type==="gold")ctx.lineWidth=3;
  ctx.beginPath();ctx.arc(e.x+14,e.y+11,13,0,Math.PI*2);
  if(e.type==="red"){ctx.stroke();ctx.fill()}
  else ctx.fill();
  ctx.fillRect(e.x+12,e.y-5,4,7);
  ctx.fillRect(e.x+3,e.y+21,6,5);ctx.fillRect(e.x+19,e.y+21,6,5);
  ctx.fillStyle="#f4dfbd";
  ctx.fillRect(e.x+7,e.y+7,3,3);ctx.fillRect(e.x+18,e.y+7,3,3);
  ctx.fillStyle="#34191b";
  if(e.type==="black"){
    ctx.fillStyle="#fff";ctx.fillRect(e.x+3,e.y+12,22,3);ctx.fillStyle="#111";
  }
  if(e.type==="gold"){
    ctx.strokeRect(e.x-1,e.y-7,30,34);
  }
  if(e.trapped>0){
    for(let i=0;i<e.hitsLeft;i++)ctx.fillRect(e.x+3+i*8,e.y-10,6,4);
  }
  ctx.restore();
}
const livingCastle={
  fogOffset:0,
  dust:Array.from({length:14},()=>({x:Math.random()*W,y:35+Math.random()*(H-70),vx:(Math.random()-.5)*.05,vy:.02+Math.random()*.04,a:.15+Math.random()*.18})),
  pebble:null,nextPebble:performance.now()+5000,
  bat:null,nextBat:performance.now()+4500+Math.random()*7000,
  teddy:null,nextTeddy:Infinity,teddyCelebrating:false,teddyMusicWasPlaying:false,teddyEligibleThisGame:false,teddyAttemptedThisGame:false,teddyFoundThisGame:false,gameStartedAt:0,
  windowShift:Math.floor(Math.random()*4),
  flagPhase:Math.random()*6
};
function drawGothicWindow(x,y,closed=false){ctx.save();ctx.fillStyle=closed?"#555":"#777";ctx.fillRect(x,y+8,38,31);ctx.beginPath();ctx.arc(x+19,y+9,19,Math.PI,0);ctx.fill();ctx.strokeStyle="#ddd";ctx.lineWidth=2;ctx.strokeRect(x,y+9,38,30);ctx.beginPath();ctx.moveTo(x+19,y+1);ctx.lineTo(x+19,y+39);ctx.moveTo(x,y+24);ctx.lineTo(x+38,y+24);ctx.stroke();ctx.restore()}
function drawCastleTorch(x,y,phase,now=performance.now()){const f=.55+.45*Math.sin(now*.011+phase);ctx.save();ctx.fillStyle="#333";ctx.fillRect(x-2,y+5,4,10);ctx.fillRect(x-7,y+13,14,3);const h=12+Math.round(f*5);ctx.fillStyle="#555";ctx.beginPath();ctx.moveTo(x,y-h);ctx.lineTo(x-6,y+5);ctx.lineTo(x,y+1);ctx.lineTo(x+6,y+5);ctx.closePath();ctx.fill();ctx.fillStyle="#fff";ctx.beginPath();ctx.moveTo(x,y-h+4);ctx.lineTo(x-2,y+3);ctx.lineTo(x+2,y+3);ctx.closePath();ctx.fill();ctx.restore()}

function castleTorchPositionIsClear(x,y){
  const padX=30;
  const top=y-24;
  const bottom=y+18;
  return !ladders.some(l=>{
    const ladderCenter=l.x+10;
    const verticalOverlap=bottom>=l.top && top<=l.bottom;
    return verticalOverlap && Math.abs(x-ladderCenter)<padX;
  });
}

function drawSafeCastleTorch(preferredX,y,phase){
  // Keep torches between ladders instead of allowing ladders to cover them.
  const candidates=[
    preferredX,
    preferredX-42,
    preferredX+42,
    preferredX-74,
    preferredX+74,
    preferredX-105,
    preferredX+105
  ];

  let x=preferredX;
  for(const candidate of candidates){
    if(candidate<35||candidate>W-35)continue;
    if(castleTorchPositionIsClear(candidate,y)){
      x=candidate;
      break;
    }
  }

  drawCastleTorch(x,y,phase);
}



function roomHitsLadder(x,y,w,h,pad=8){
  return ladders.some(l=>x<l.x+24+pad&&x+w>l.x-pad&&y<l.bottom+pad&&y+h>l.top-pad);
}
function roomSafe(x,y,w,h,fn,pad=8){if(!roomHitsLadder(x,y,w,h,pad))fn();}
function roomBrickWall(bg,mortar){
  const top=30,bottom=H-14;
  ctx.fillStyle=bg;ctx.fillRect(10,top,W-20,bottom-top);
  ctx.strokeStyle=mortar;ctx.lineWidth=1;
  for(let y=top+15,row=0;y<bottom;y+=21,row++){
    ctx.beginPath();ctx.moveTo(12,y);ctx.lineTo(W-12,y);ctx.stroke();
    for(let x=12-(row%2?21:0);x<W-12;x+=42){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+21);ctx.stroke();}
  }
}
function roomWindow(x,y,w,h,sky="#6fa4bd",frame="#d5c7a1"){
  ctx.fillStyle="#1e252a";ctx.fillRect(x,y,w,h);ctx.fillStyle=sky;ctx.fillRect(x+5,y+8,w-10,h-13);
  ctx.strokeStyle=frame;ctx.lineWidth=2;ctx.strokeRect(x+5,y+8,w-10,h-13);
  ctx.beginPath();ctx.moveTo(x+w/2,y+8);ctx.lineTo(x+w/2,y+h-5);ctx.moveTo(x+5,y+h/2);ctx.lineTo(x+w-5,y+h/2);ctx.stroke();
}
function roomLamp(x,y){
  ctx.fillStyle="#73502d";ctx.fillRect(x-7,y,14,3);ctx.fillStyle="#ffcf61";ctx.fillRect(x-2,y-8,4,8);
  ctx.fillStyle="rgba(255,195,75,.13)";ctx.beginPath();ctx.arc(x,y-5,16,0,Math.PI*2);ctx.fill();
}
function roomClearLadders(color){ctx.fillStyle=color;ladders.forEach(l=>ctx.fillRect(l.x-7,l.top-2,34,l.bottom-l.top+4));}

function drawEntranceHallColor(){
  ctx.save();
  if(entranceHallBg.complete&&entranceHallBg.naturalWidth){
    ctx.imageSmoothingEnabled=true;
    ctx.imageSmoothingQuality="high";
    ctx.drawImage(entranceHallBg,0,0,W,H);
  }else{
    roomBrickWall("#2a2926","#554d42");
  }
  ctx.restore();
}
function drawArmoryColor(){
  ctx.save();
  if(armoryHdBg.complete&&armoryHdBg.naturalWidth){
    ctx.imageSmoothingEnabled=true;
    ctx.imageSmoothingQuality="high";
    ctx.drawImage(armoryHdBg,0,0,W,H);
  }else{
    roomBrickWall("#4b3b2b","#806b53");
  }
  ctx.restore();
}
function drawHdRoomImage(img){
 ctx.save();
 if(img.complete&&img.naturalWidth){ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";ctx.drawImage(img,0,0,W,H);}
 else roomBrickWall("#302820","#665748");
 ctx.restore();
}
function drawDungeonColor(){
  ctx.save();
  if(dungeonHdBg.complete&&dungeonHdBg.naturalWidth){
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";
    ctx.drawImage(dungeonHdBg,0,0,W,H);
  }else roomBrickWall("#302b2a","#665b55");
  ctx.restore();
}
function drawThroneRoomColor(){
  ctx.save();
  if(throneHybridBg.complete && throneHybridBg.naturalWidth){
    ctx.imageSmoothingEnabled=true;
    ctx.imageSmoothingQuality="high";
    ctx.drawImage(throneHybridBg,0,0,W,H);
  }else{
    roomBrickWall("#211818","#51372e");
  }
  ctx.restore();
}
function drawWineCellarColor(){drawHdRoomImage(wineHdBg);}
function drawAlchemyColor(){drawHdRoomImage(alchemyHdBg);}
function drawTreasureColor(){drawHdRoomImage(treasureHdBg);}
function drawCatacombsColor(){drawHdRoomImage(catacombsHdBg);}
function drawTowerColor(){drawHdRoomImage(towerHdBg);}
function drawLibraryBackdrop(){drawHdRoomImage(libraryHdBg);}
function drawWineCellarBackdrop(){
  const top=30,bottom=H-14;ctx.save();
  ctx.fillStyle="#b5b5b5";ctx.fillRect(10,top,W-20,bottom-top);
  ctx.strokeStyle="#888";ctx.lineWidth=1;
  for(let y=44,row=0;y<bottom;y+=24,row++){ctx.beginPath();ctx.moveTo(12,y);ctx.lineTo(W-12,y);ctx.stroke();for(let x=12-(row%2?24:0);x<W-12;x+=48){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+24);ctx.stroke();}}
  // Lage keldergewelven.
  ctx.strokeStyle="#666";ctx.lineWidth=6;[90,240,390].forEach(cx=>{ctx.beginPath();ctx.arc(cx,100,68,Math.PI,0);ctx.stroke();});
  // Vrije ladderzones vóór decoratie.
  ctx.fillStyle="#dcdcdc";ladders.forEach(l=>ctx.fillRect(l.x-12,l.top-3,44,l.bottom-l.top+6));
  // Wijnrekken alleen in gereserveerde vrije wandvakken.
  [[130,78,72,34],[275,78,70,34],[112,202,72,34],[300,202,72,34]].forEach(([x,y,w,h])=>{
    ctx.fillStyle="#555";ctx.fillRect(x,y,w,h);ctx.fillStyle="#ddd";
    for(let yy=y+9;yy<y+h-3;yy+=13)for(let xx=x+7;xx<x+w-5;xx+=12){ctx.fillRect(xx,yy,5,7);ctx.fillRect(xx+1,yy-3,3,3);}
  });
  const barrel=(x,floorY,r=15)=>{const cy=floorY-r-7;ctx.strokeStyle="#444";ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(x,cy,r,r-3,0,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(x-r,cy);ctx.lineTo(x+r,cy);ctx.stroke();ctx.beginPath();ctx.moveTo(x-r+3,cy-7);ctx.lineTo(x+r-3,cy-7);ctx.moveTo(x-r+3,cy+7);ctx.lineTo(x+r-3,cy+7);ctx.stroke();};
  // Elk vat rust aantoonbaar op een platform/floorY.
  [[45,126],[435,126],[112,250],[360,250],[48,372],[430,372]].forEach(([x,y])=>barrel(x,y));
  // Wijnpers op onderste vloer.
  ctx.fillStyle="#555";ctx.fillRect(205,328,70,36);ctx.strokeStyle="#333";ctx.lineWidth=3;ctx.strokeRect(205,328,70,36);ctx.fillRect(219,316,42,12);ctx.fillRect(237,294,6,22);ctx.beginPath();ctx.moveTo(221,302);ctx.lineTo(259,302);ctx.stroke();
  ctx.restore();
}
function drawArmoryBackdrop(){
  const top=30,bottom=H-14;ctx.save();
  ctx.fillStyle="#c4c4c4";ctx.fillRect(10,top,W-20,bottom-top);
  ctx.strokeStyle="#929292";ctx.lineWidth=1;
  for(let y=top+2,row=0;y<bottom;y+=20,row++){ctx.beginPath();ctx.moveTo(10,y);ctx.lineTo(W-10,y);ctx.stroke();for(let x=10-(row%2?20:0);x<W-10;x+=40){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+20);ctx.stroke();}}
  ctx.fillStyle="#e0e0e0";ladders.forEach(l=>ctx.fillRect(l.x-11,l.top-3,42,l.bottom-l.top+6));
  // Wapenrekken in eigen wandvlakken: geen ramen en geen losse projecties.
  const rack=(x,y,w)=>{ctx.fillStyle="#666";ctx.fillRect(x,y,w,5);ctx.fillRect(x,y+34,w,5);ctx.strokeStyle="#444";ctx.lineWidth=2;for(let sx=x+12;sx<x+w-8;sx+=22){ctx.beginPath();ctx.moveTo(sx,y+3);ctx.lineTo(sx+10,y+31);ctx.moveTo(sx+10,y+3);ctx.lineTo(sx,y+31);ctx.stroke();}};
  rack(30,76,72);rack(210,76,70);rack(365,76,78);rack(120,205,78);rack(300,205,80);
  // Twee harnassen staan op de onderste vloer.
  const armor=x=>{ctx.strokeStyle="#444";ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,326,8,0,Math.PI*2);ctx.stroke();ctx.strokeRect(x-11,334,22,22);ctx.beginPath();ctx.moveTo(x-11,338);ctx.lineTo(x-20,354);ctx.moveTo(x+11,338);ctx.lineTo(x+20,354);ctx.moveTo(x-7,356);ctx.lineTo(x-10,371);ctx.moveTo(x+7,356);ctx.lineTo(x+10,371);ctx.stroke();};
  armor(65);armor(415);
  // Schild op vrije centrale muur.
  ctx.strokeStyle="#444";ctx.lineWidth=3;ctx.beginPath();ctx.arc(240,268,18,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(228,268);ctx.lineTo(252,268);ctx.moveTo(240,256);ctx.lineTo(240,280);ctx.stroke();
  ctx.restore();
}

function drawCastleBackdrop(){
  const kind=currentCastleTheme().kind;
  if(kind==="hall")return drawEntranceHallColor();
  if(kind==="arms")return drawArmoryColor();
  if(kind==="books")return drawLibraryBackdrop();
  if(kind==="cells")return drawDungeonColor();
  if(kind==="throne")return drawThroneRoomColor();
  if(kind==="wine")return drawWineCellarColor();
  if(kind==="alchemy")return drawAlchemyColor();
  if(kind==="treasure")return drawTreasureColor();
  if(kind==="catacombs")return drawCatacombsColor();
  if(kind==="tower")return drawTowerColor();
}
function safeTeddySpawnPosition(){
  // Teddy must always appear on a real, reachable floor and away from hazards.
  for(let attempt=0;attempt<60;attempt++){
    const floor=Math.floor(Math.random()*floors.length);
    const x=42+Math.random()*(W-84);
    const y=floors[floor]-24;

    const nearLadder=ladders.some(l=>
      (l.top===floors[floor]||l.bottom===floors[floor]) &&
      Math.abs((l.x+10)-x)<48
    );
    const nearHole=holes.some(h=>h.floor===floor&&Math.abs((h.x+20)-x)<65);
    const nearEnemy=enemies.some(e=>!e.dead&&e.floor===floor&&Math.abs((e.x+14)-x)<65);
    const nearBonus=bonus&&bonus.floor===floor&&Math.abs(bonus.x-x)<50;
    const nearPlayer=floorIndex(player.y+player.h)===floor&&Math.abs((player.x+12)-x)<95;

    if(!nearLadder&&!nearHole&&!nearEnemy&&!nearBonus&&!nearPlayer){
      return {floor,x,y};
    }
  }

  // Reliable fallback on the bottom floor if random placement cannot find a slot.
  return {floor:floors.length-1,x:W-70,y:floors[floors.length-1]-24};
}

function spawnGameplayTeddy(){
  if(state!=="play"||livingCastle.teddy||livingCastle.teddyCelebrating)return;
  const pos=safeTeddySpawnPosition();
  livingCastle.teddy={
    floor:pos.floor,
    x:pos.x,
    y:pos.y,
    spawnedAt:performance.now(),
    expiresAt:performance.now()+8000,
    dancing:false,
    danceStarted:0
  };
}

function drawGameplayTeddy(teddy){
  if(!teddy)return;
  const now=performance.now();
  let x=teddy.x,y=teddy.y;

  if(teddy.dancing){
    const elapsed=now-teddy.danceStarted;
    const beat=elapsed/115;
    x+=Math.sin(beat)*7;
    y-=Math.abs(Math.sin(beat*1.15))*10;
  }else{
    y-=Math.sin(now*.008)*1.5;
  }

  ctx.save();
  ctx.globalAlpha=1;
  ctx.fillStyle="#111";

  // Pixel-cat Teddy: ears, head, body, paws and tail.
  ctx.fillRect(Math.round(x-9),Math.round(y-17),18,12);
  ctx.fillRect(Math.round(x-10),Math.round(y-21),5,6);
  ctx.fillRect(Math.round(x+5),Math.round(y-21),5,6);
  ctx.fillRect(Math.round(x-8),Math.round(y-6),16,13);
  ctx.fillRect(Math.round(x-9),Math.round(y+6),5,5);
  ctx.fillRect(Math.round(x+4),Math.round(y+6),5,5);
  ctx.fillRect(Math.round(x+8),Math.round(y-4),8,4);
  ctx.fillRect(Math.round(x+13),Math.round(y-10),4,8);

  ctx.fillStyle="#eee";
  ctx.fillRect(Math.round(x-5),Math.round(y-14),3,3);
  ctx.fillRect(Math.round(x+3),Math.round(y-14),3,3);

  if(!teddy.dancing){
    ctx.fillStyle="#111";
    ctx.font="bold 8px monospace";
    ctx.textAlign="center";
    ctx.fillText("TEDDY",Math.round(x),Math.round(y-27));
  }
  ctx.restore();
}

function playTeddyJingle(){
  if(!fxOn)return;
  const notes=[
    [659,0],[784,170],[988,340],[784,520],
    [880,700],[1047,870],[1319,1040],[1047,1230],
    [988,1430],[1175,1600],[1319,1770],[1568,1960],
    [1319,2180],[1047,2380],[1319,2580]
  ];
  notes.forEach(([freq,delay],i)=>{
    setTimeout(()=>{
      if(audioMode==="off")return;
      tone(freq,i===notes.length-1?.24:.11,"square",.035,freq*(i%3===0?1.06:1));
    },delay);
  });
}

function finishTeddyMoment(){
  livingCastle.teddy=null;
  livingCastle.teddyCelebrating=false;
  livingCastle.teddyFoundThisGame=true;
  livingCastle.teddyAttemptedThisGame=true;
  livingCastle.nextTeddy=Infinity;

  if(state==="teddy"){
    state="play";
    startFreeze=45;
    document.body.classList.add("gameplayActive");
  }

  // Resume the exact gameplay soundtrack where it was paused.
  if(livingCastle.teddyMusicWasPlaying&&musicOn){
    applyMusicVolume();
    menuSoundtrack.play().catch(err=>console.warn("Muziek hervatten na Teddy lukte niet:",err));
  }
  livingCastle.teddyMusicWasPlaying=false;
}

function triggerTeddyMoment(){
  const teddy=livingCastle.teddy;
  if(!teddy||teddy.dancing||livingCastle.teddyCelebrating)return;

  livingCastle.teddyCelebrating=true;
  teddy.dancing=true;
  teddy.danceStarted=performance.now();

  // This is a special moment: gameplay and enemies freeze, normal music stops completely.
  keys.left=keys.right=keys.up=keys.down=false;
  state="teddy";
  livingCastle.teddyMusicWasPlaying=musicOn&&!menuSoundtrack.paused;
  if(!menuSoundtrack.paused)menuSoundtrack.pause();

  score+=2000;
  const teddyStats=getStats();
  teddyStats.teddyFound=true;
  teddyStats.bestScore=Math.max(Number(teddyStats.bestScore)||0,score);
  if(!Array.isArray(teddyStats.achievements))teddyStats.achievements=[];
  if(!teddyStats.achievements.includes("teddy_encounter"))teddyStats.achievements.push("teddy_encounter");
  saveStats(teddyStats);
  updatePlayerContextOnline();
  registerTeddyDiscovery("encounter");

  effects.push({type:"score",x:teddy.x-25,y:teddy.y-35,t:150,text:"TEDDY GEVONDEN! +2000"});
  playTeddyJingle();

  setTimeout(finishTeddyMoment,3000);
}

function updateGameplayTeddy(){
  const now=performance.now();

  if(!livingCastle.teddy){
    if(
      state==="play" &&
      !livingCastle.teddyCelebrating &&
      livingCastle.teddyEligibleThisGame &&
      !livingCastle.teddyAttemptedThisGame &&
      now>=livingCastle.nextTeddy
    ){
      livingCastle.teddyAttemptedThisGame=true;
      spawnGameplayTeddy();
    }
    return;
  }

  const teddy=livingCastle.teddy;
  if(teddy.dancing)return;

  if(now>=teddy.expiresAt){
    livingCastle.teddy=null;
    // Missing Teddy ends the single Teddy chance for this game.
    livingCastle.nextTeddy=Infinity;
    return;
  }

  // Physical encounter: the Stampertje must actually reach Teddy on the same floor.
  const playerFloor=floorIndex(player.y+player.h);
  const sameFloor=playerFloor===teddy.floor;
  const touching=sameFloor &&
    Math.abs((player.x+player.w/2)-teddy.x)<23 &&
    Math.abs((player.y+player.h)-(teddy.y+24))<10;

  if(touching)triggerTeddyMoment();
}

function drawLivingCastle(){
  if(state!=="play"&&state!=="paused"&&state!=="teddy")return;
  ctx.save();
  livingCastle.dust.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.y>H-20){p.y=38;p.x=Math.random()*W}
    ctx.globalAlpha=p.a;ctx.fillStyle="#555";ctx.fillRect(Math.round(p.x),Math.round(p.y),2,2)
  });
  const now=performance.now();

  if(!livingCastle.pebble&&now>livingCastle.nextPebble)livingCastle.pebble={x:40+Math.random()*(W-80),y:34,vy:.75};
  if(livingCastle.pebble){
    livingCastle.pebble.y+=livingCastle.pebble.vy;ctx.globalAlpha=.7;ctx.fillStyle="#444";
    ctx.fillRect(livingCastle.pebble.x,livingCastle.pebble.y,3,3);
    if(livingCastle.pebble.y>H-20){livingCastle.pebble=null;livingCastle.nextPebble=now+6000+Math.random()*9000}
  }

  // Rare bat crosses the upper castle.
  if(!livingCastle.bat&&now>livingCastle.nextBat)livingCastle.bat={x:-26,y:54+Math.random()*90,vx:1.15+Math.random()*.55};
  if(livingCastle.bat){
    const b=livingCastle.bat;b.x+=b.vx;
    const throneBat=["throne","hall"].includes(currentCastleTheme().kind);
    ctx.globalAlpha=throneBat?.96:.75;
    ctx.fillStyle=throneBat?"#713b91":"#222";
    ctx.strokeStyle=throneBat?"#f0bd55":"#222";
    ctx.lineWidth=throneBat?2:1;
    ctx.shadowColor=throneBat?"rgba(240,189,85,.55)":"transparent";
    ctx.shadowBlur=throneBat?6:0;
    const s=throneBat?1.65:1;
    const flap=Math.sin(now*.018)*4*s;
    ctx.beginPath();
    ctx.moveTo(b.x,b.y);
    ctx.lineTo(b.x-9*s,b.y-4*s-flap);
    ctx.lineTo(b.x-5*s,b.y+4*s);
    ctx.lineTo(b.x,b.y+1*s);
    ctx.lineTo(b.x+5*s,b.y+4*s);
    ctx.lineTo(b.x+9*s,b.y-4*s-flap);
    ctx.closePath();ctx.fill();ctx.stroke();
    // lichte ogen
    if(throneBat){
      ctx.shadowBlur=0;ctx.fillStyle="#fff3cf";
      ctx.fillRect(b.x-4,b.y-1,2,2);ctx.fillRect(b.x+2,b.y-1,2,2);
    }
    if(b.x>W+35){livingCastle.bat=null;livingCastle.nextBat=now+8000+Math.random()*15000}
  }

  // Gameplay Teddy is drawn on a reachable floor; the player must walk into him.
  if(livingCastle.teddy)drawGameplayTeddy(livingCastle.teddy);
  ctx.restore();
}
function drawCastleFloor(a,b,y){ctx.save();ctx.fillStyle="#333";ctx.fillRect(a,y-7,b-a,14);ctx.fillStyle="#eee";ctx.fillRect(a,y-7,b-a,2);ctx.strokeStyle="#999";for(let x=a+2;x<b;x+=22)ctx.strokeRect(x,y-5,20,10);ctx.restore();ctx.fillStyle="#111";ctx.strokeStyle="#111"}
function drawCastleLadder(l){
  const kind=currentCastleTheme().kind;
  const pal={
    hall:["#2b1a10","#f0c56d"],arms:["#24170f","#f4c86f"],books:["#28170d","#e8b966"],
    cells:["#202426","#d9c28d"],throne:["#28170d","#f1bf5c"],wine:["#291a10","#e4b66c"],
    alchemy:["#211c28","#c4a7d1"],treasure:["#281f12","#edc66f"],catacombs:["#18231d","#aec89f"],tower:["#22262b","#d0bea4"]
  };
  const c=pal[kind]||["#222","#ddd"];
  ctx.save();
  // broad dark rails act as outline against detailed photographic rooms
  ctx.fillStyle=c[0];
  ctx.fillRect(l.x-4,l.top,7,l.bottom-l.top);
  ctx.fillRect(l.x+17,l.top,7,l.bottom-l.top);
  ctx.fillStyle=c[1];
  ctx.fillRect(l.x-1,l.top,3,l.bottom-l.top);
  ctx.fillRect(l.x+20,l.top,3,l.bottom-l.top);
  for(let y=l.top+7;y<l.bottom;y+=10){
    ctx.fillStyle=c[0];ctx.fillRect(l.x-3,y-2,27,7);
    ctx.fillStyle=c[1];ctx.fillRect(l.x,y,21,3);
  }
  ctx.restore();
}
function drawFloor(a,b,y){
  const kind=currentCastleTheme().kind;
  const pal={
    hall:["#4b3527","#aa7d4e"],arms:["#46352c","#a27b52"],books:["#3a2418","#8b5b34"],
    cells:["#30383c","#737d81"],throne:["#3a251c","#c28a42"],wine:["#433026","#98704a"],
    alchemy:["#38323f","#7c668a"],treasure:["#3d3222","#b9954c"],catacombs:["#29362f","#57705e"],tower:["#343a42","#7e7365"]
  };
  const c=pal[kind]||["#444","#888"];
  ctx.save();ctx.fillStyle=c[0];ctx.fillRect(a,y-8,b-a,16);ctx.fillStyle=c[1];ctx.fillRect(a,y-8,b-a,3);
  ctx.strokeStyle="rgba(255,255,255,.12)";for(let x=a+8;x<b;x+=30){ctx.beginPath();ctx.moveTo(x,y-4);ctx.lineTo(x,y+4);ctx.stroke();}
  ctx.fillStyle="#1c1714";ctx.fillRect(a,y+4,b-a,4);ctx.restore();ctx.fillStyle="#111";ctx.strokeStyle="#111";
}
function drawEffects(){
  effects.forEach(e=>{
    if(e.type==="dust"){
      const r=(42-e.t)*.7;
      ctx.beginPath();ctx.arc(e.x-r,e.y,r*.45,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(e.x+r,e.y,r*.45,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(e.x,e.y-r*.35,r*.55,0,Math.PI*2);ctx.fill();
    }else if(e.type==="score"){
      const isTeddy=String(e.text||"").includes("TEDDY");
      ctx.font=isTeddy?"bold 14px monospace":"bold 12px monospace";
      if(isTeddy){
        ctx.save();
        ctx.fillStyle="#fff";
        ctx.strokeStyle="#111";
        ctx.lineWidth=4;
        ctx.strokeText(e.text,Math.max(18,e.x),Math.max(52,e.y-(150-e.t)*.15));
        ctx.fillStyle="#111";
        ctx.fillText(e.text,Math.max(18,e.x),Math.max(52,e.y-(150-e.t)*.15));
        ctx.restore();
      }else{
        ctx.fillText(e.text,e.x,e.y-(55-e.t)*.3);
      }
    }else if(e.type==="combo"){
      ctx.font="bold 11px monospace";ctx.fillText(e.text,e.x,e.y-(70-e.t)*.25);
    }else if(e.type==="escape"){
      ctx.font="bold 10px monospace";ctx.fillText("ONTSNAPT!",e.x,e.y-(45-e.t)*.2);
    }else{
      ctx.font="bold 12px monospace";ctx.fillText("BAM!",e.x-12,e.y);
    }
  });
}

function drawBonus(){
  if(!bonus)return;

  const x=bonus.x;
  const y=bonus.y+Math.sin(frame*.085)*2;

  ctx.save();
  ctx.globalAlpha=1;

  const throneBonus=["throne","hall"].includes(currentCastleTheme().kind);
  if(throneBonus){
    ctx.translate(x,y);
    ctx.scale(1.42,1.42);
    ctx.translate(-x,-y);
  }

  ctx.fillStyle="#111";
  ctx.globalAlpha=.18;
  ctx.beginPath();
  ctx.ellipse(x,y+9,14,3,0,0,Math.PI*2);
  ctx.fill();

  ctx.globalAlpha=1;
  ctx.fillStyle="#111";
  ctx.strokeStyle="#111";
  ctx.lineWidth=2;

  if(throneBonus){
    const bonusColors={
      heart:"#ff5a72",
      banana:"#ffd34f",
      cherry:"#e93f50",
      star:"#ffd447",
      clock:"#66d9ff"
    };
    const bc=bonusColors[bonus.type]||"#ffd447";
    ctx.fillStyle=bc;
    ctx.strokeStyle=bc;
    ctx.shadowColor=bc;
    ctx.shadowBlur=8;
  }

  if(bonus.type==="heart"){
    ctx.font="bold 28px monospace";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("♥",x,y-7);
  }else if(bonus.type==="banana"){
    ctx.lineWidth=6;
    ctx.beginPath();
    ctx.arc(x-2,y-7,13,-.38*Math.PI,.57*Math.PI);
    ctx.stroke();
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.moveTo(x+8,y-16);ctx.lineTo(x+13,y-20);
    ctx.stroke();
  }else if(bonus.type==="cherry"){
    ctx.beginPath();ctx.arc(x-8,y-4,8,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(x+8,y-3,8,0,Math.PI*2);ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x-6,y-11);ctx.lineTo(x+1,y-23);ctx.lineTo(x+8,y-10);
    ctx.stroke();
  }else if(bonus.type==="star"){
    ctx.font="bold 29px monospace";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.fillText("★",x,y-6);
  }else{
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.arc(x,y-7,13,0,Math.PI*2);
    ctx.stroke();
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.moveTo(x,y-7);ctx.lineTo(x,y-16);
    ctx.moveTo(x,y-7);ctx.lineTo(x+8,y-2);
    ctx.stroke();
    ctx.fillRect(x-2,y-23,4,4);
    ctx.fillRect(x-8,y-21,4,2);
    ctx.fillRect(x+4,y-21,4,2);
  }

  if(bonus.timer<120){
    const s=Math.floor(frame/10)%4;
    ctx.fillStyle=throneBonus?"#ffe7a3":"#555";
    const dots=[[x-18,y-19],[x+18,y-13],[x-16,y+5],[x+17,y+4]];
    for(let i=0;i<dots.length;i++){
      if((i+s)%2===0){
        const [dx,dy]=dots[i];
        ctx.fillRect(Math.round(dx),Math.round(dy),2,2);
      }
    }
  }

  ctx.restore();
}

function draw(){
  ctx.setTransform(GAME_DPR,0,0,GAME_DPR,0,0);
  ctx.save();
  if(shake>0)ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
  ctx.fillStyle="#fff";ctx.fillRect(-10,-10,W+20,H+20);
  drawCastleBackdrop();
  ctx.fillStyle="#111";ctx.strokeStyle="#111";
  ctx.fillStyle="#222";ctx.fillRect(8,6,W-16,20);ctx.strokeStyle="#888";ctx.strokeRect(8,6,W-16,20);ctx.fillStyle="#fff";ctx.font="11px monospace";
  ctx.fillText(`SCORE ${String(score).padStart(5,"0")}`,14,20);
  ctx.fillText(`LV ${level}`,180,20);
  ctx.fillText(currentCastleTheme().name,228,20);
  ctx.fillText(`♥ ${lives}`,425,20);
  if(["throne","hall"].includes(currentCastleTheme().kind)){
    ctx.fillStyle="#d9a746";
    ctx.font="8px monospace";
    const roomMark=currentCastleTheme().kind==="hall"
      ?"v2.3.4 · HD ROOMS"
      :"v2.3.4 · HD ROOMS";
    ctx.fillText(roomMark,300,36);
    ctx.font="11px monospace";
  }
  ctx.fillStyle="#111";ctx.strokeStyle="#111";
  if(player.invulnerable>0){
    ctx.font="10px monospace";
    ctx.fillText("VEILIGE START",14,H-18);
    ctx.font="12px monospace";
  }
  ctx.lineWidth=3;ctx.strokeRect(8,28,W-16,H-32);

  floors.forEach((fy,fi)=>{
    let segs=[[12,W-12]];
    holes.filter(h=>h.floor===fi).forEach(h=>{
      const n=[];
      segs.forEach(([a,b])=>{
        if(h.x>b||h.x+40<a)n.push([a,b]);
        else{if(a<h.x)n.push([a,h.x]);if(h.x+40<b)n.push([h.x+40,b])}
      });
      segs=n;
    });
    segs.forEach(([a,b])=>drawFloor(a,b,fy));
  });

  cracks.forEach(q=>{
    const y=floors[q.floor];
    ctx.lineWidth=2;ctx.beginPath();
    ctx.moveTo(q.x+8,y-7);ctx.lineTo(q.x+18,y);ctx.lineTo(q.x+12,y+7);
    if(q.hits>1){ctx.moveTo(q.x+31,y-7);ctx.lineTo(q.x+22,y);ctx.lineTo(q.x+30,y+7)}
    ctx.stroke();
  });

  ladders.forEach(drawCastleLadder);

  ctx.save();ctx.globalAlpha=.18;ctx.fillStyle="#111";ctx.beginPath();ctx.ellipse(player.x+player.w/2,player.y+player.h+2,10,2.5,0,0,Math.PI*2);ctx.fill();enemies.forEach(e=>{if(!e.dead){ctx.beginPath();ctx.ellipse(e.x+14,e.y+25,10,2.5,0,0,Math.PI*2);ctx.fill()}});ctx.restore();
  if(player.invulnerable<=0 || Math.floor(player.invulnerable/8)%2===0){
    drawPlayer(Math.round(player.x),Math.round(player.y));
  }
  enemies.forEach(drawApple);
  window.CastleTouch?.draw(ctx);
  drawBonus();
  drawEffects();
  drawLivingCastle();

  if(state==="gameover"){
    ctx.fillStyle="rgba(255,255,255,.95)";ctx.fillRect(70,108,340,92);
    ctx.fillStyle="#111";ctx.font="bold 22px monospace";ctx.fillText("GAME OVER",170,143);
    ctx.font="13px monospace";ctx.fillText("Tik STAMP om opnieuw te beginnen",110,173);
  }
  ctx.restore();
}
const fixedUpdate=StampertjesRuntime.fixedStep(update);
function loop(time){fixedUpdate(time);if(state!=="intro"&&state!=="boss")draw();requestAnimationFrame(loop)}
requestAnimationFrame(loop);

window.addEventListener("load",()=>{
  if(DEV_TEST_MODE)setTimeout(()=>startGame(),180);
});

function releaseGameInput(){keys.left=keys.right=keys.up=keys.down=false;window.CastleTouch?.cancel();if(state==="play")togglePause();}
window.addEventListener("blur",releaseGameInput);
document.addEventListener("visibilitychange",()=>{if(document.hidden)releaseGameInput();});
