/* Hindi Tutor — app logic (vanilla JS, no build step) */
(function(){
"use strict";

/* ---------- tiny helpers ---------- */
const $ = (sel, root) => (root||document).querySelector(sel);
const $$ = (sel, root) => Array.from((root||document).querySelectorAll(sel));
const esc = (s) => String(s==null?"":s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const uid = () => Math.random().toString(36).slice(2,9);
// Built from char codes (not a literal escape) to avoid any script-encoding pitfalls.
const DEVANAGARI_RE = new RegExp("[" + String.fromCharCode(0x0900) + "-" + String.fromCharCode(0x097F) + "]");
function el(html){ const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function todayStr(){ return new Date().toISOString().slice(0,10); }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function shuffle(arr){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }

/* ---------- text-to-speech (best-effort; silently no-ops if unsupported) ---------- */
let hiVoiceCache = null, voicesReady = false;
function primeVoices(){
  try{
    if (!("speechSynthesis" in window)) return;
    const grab = () => { const v = speechSynthesis.getVoices(); if (v && v.length){ hiVoiceCache = v.find(x=>/^hi(-|_|$)/i.test(x.lang)) || null; voicesReady = true; } };
    grab();
    speechSynthesis.onvoiceschanged = grab;
  }catch(e){}
}
function speak(text){
  try{
    if (!("speechSynthesis" in window) || !text) return false;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (hiVoiceCache) u.voice = hiVoiceCache;
    u.lang = hiVoiceCache ? hiVoiceCache.lang : "hi-IN";
    u.rate = 0.88;
    speechSynthesis.speak(u);
    return true;
  }catch(e){ return false; }
}

/* ---------- owner contact ---------- */
// Where "Contact us" and (optionally) a review get emailed. The app is static/client-only,
// so there's no server to receive these — a mailto: link is the only way a page with no
// backend can hand a message to the visitor's own mail app, pre-addressed and pre-filled.
const OWNER_EMAIL = "newdinesh19@yahoo.com";
function mailtoLink(subject, body){
  return `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* ---------- storage ---------- */
const STORE_KEY = "hindiTutor.v2";
function defaultStore(){
  return { srs:{}, stats:{reviewed:0, correct:0, total:0, touchedCats:{}}, activity:{}, streak:0, lastActive:null, tutorHistory:[], favorites:{}, lastLib:null, lastPracticeMode:null,
    level:null, pathDone:{}, mistakes:{}, reviews:[], sawAppGuide:false, sawDisclaimer:false, hideStart:false };
}
function loadStore(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(raw){
      const parsed = JSON.parse(raw);
      return Object.assign(defaultStore(), parsed);
    }
  }catch(e){}
  return defaultStore();
}
function saveStore(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(DB)); }catch(e){} }
let DB = loadStore();

function bumpActivity(){
  const t = todayStr();
  DB.activity[t] = (DB.activity[t]||0) + 1;
  if (DB.lastActive !== t){
    const y = new Date(Date.now()-86400000).toISOString().slice(0,10);
    DB.streak = (DB.lastActive === y) ? (DB.streak||0) + 1 : 1;
    DB.lastActive = t;
  }
  saveStore();
  renderStreak();
}
function renderStreak(){ const c = $("#streakCount"); if(c) c.textContent = DB.streak||0; }

/* ---------- SRS (simple Leitner) ---------- */
const BOX_DAYS = [0, 1, 3, 7, 14, 30];
function srsFor(id){ return DB.srs[id] || { box:0, due:0 }; }
function srsRate(id, cat, rating){
  const s = srsFor(id);
  if (rating === "again") s.box = 0;
  else if (rating === "good") s.box = Math.min(s.box+1, BOX_DAYS.length-1);
  else s.box = Math.min(s.box+2, BOX_DAYS.length-1);
  s.due = Date.now() + BOX_DAYS[s.box]*86400000;
  DB.srs[id] = s;
  DB.stats.reviewed = (DB.stats.reviewed||0) + 1;
  DB.stats.touchedCats[cat] = true;
  // Tracks a running streak of "Easy" ratings (any other rating resets it) — the signal
  // the Home screen uses to nudge a level-up suggestion when things are consistently easy,
  // the "increase difficulty on repeated success" half of the adaptive-recommendation idea.
  DB.stats.easyStreak = rating === "easy" ? (DB.stats.easyStreak||0) + 1 : 0;
  bumpActivity();
}
function dueSentences(){
  const now = Date.now();
  return SENTENCES_300.filter(s => { const r = DB.srs[s.n]; return !r || r.due <= now; });
}

/* ---------- level & onboarding ---------- */
function levelLabel(code){ const l = LEVELS.find(x=>x.code===code); return l ? l.label : "Not set"; }
function levelRank(code){ const i = LEVELS.findIndex(x=>x.code===code); return i<0 ? 0 : i; }
function determineLevelFromScore(score){
  if (score <= 1) return "complete_beginner";
  if (score <= 3) return "beginner";
  if (score <= 5) return "intermediate";
  return "advanced";
}
// How far into the 13-step beginner path each self-reported level starts —
// so "Continue learning" doesn't force already-known material on everyone alike.
// Kept as a dynamic threshold (not baked into DB.pathDone) so changing your level later —
// including trying a level and then switching to a different one — always re-evaluates
// cleanly, without ever erasing steps you've actually marked done yourself.
const LEVEL_SKIP_TO = { complete_beginner:1, beginner:5, intermediate:10, advanced:14 };
function setLevel(code){ DB.level = code; saveStore(); }
const EASY_STREAK_LEVEL_UP_THRESHOLD = 12;
// "Increase difficulty on repeated success": once a run of consecutive "Easy" ratings gets
// long enough, suggest moving up a level (never past "advanced", and never suggesting the
// level you're already on).
function levelUpSuggestion(){
  const rank = levelRank(DB.level);
  if (rank >= LEVELS.length-1) return null;
  if ((DB.stats.easyStreak||0) < EASY_STREAK_LEVEL_UP_THRESHOLD) return null;
  return LEVELS[rank+1];
}
// What to show in "Continue learning" once the beginner path is done (or skipped) for this level.
function pathFallback(){
  const rank = levelRank(DB.level);
  if (rank >= 3) return {icon:"🎯", title:"Sharpen natural Hindi", blurb:"You've got the basics. Focus on compound verbs, sentence formulas, and idiom-level detail — the things that make Hindi sound native rather than textbook.", goto:{tab:"library", sub:"grammar"}, gotoLabel:"Open Grammar reference"};
  if (rank === 2) return {icon:"💬", title:"Build fluency through conversation", blurb:"Grammar basics are behind you — now drill real exchanges and compound verbs until they're automatic.", goto:{tab:"library", sub:"convos"}, gotoLabel:"Open Conversations"};
  return {icon:"🎉", title:"Beginner path complete!", blurb:"Nice work — you've been through every step. Keep sharpening with daily sessions, or revisit anything from Grammar reference.", goto:{tab:"library", sub:"grammar"}, gotoLabel:"Open Grammar reference"};
}
function showOnboarding(){
  const overlay = el(`<div id="onboardOverlay" style="position:fixed;inset:0;z-index:999;background:var(--bg,#0b1120);overflow-y:auto;padding:24px 16px 40px;"></div>`);
  document.body.appendChild(overlay);
  let testAnswers = [], testIdx = 0;

  function renderLevelScreen(){
    overlay.innerHTML = "";
    overlay.appendChild(el(`
      <div style="max-width:480px;margin:0 auto;text-align:center;">
        <div style="font-size:38px;">ह</div>
        <h2 style="margin-top:6px;">What is your Hindi level?</h2>
        <p style="color:var(--muted);font-size:13px;margin-top:4px;">Not sure? Pick the first one — you can change it anytime from Home.</p>
      </div>
    `));
    const list = el(`<div class="stack" style="max-width:480px;margin:16px auto 0;"></div>`);
    LEVELS.forEach(l=>{
      list.appendChild(el(`
        <button class="card card-tight row-between" data-level="${esc(l.code)}" style="text-align:left;width:100%;border:1px solid var(--line);cursor:pointer;">
          <span><b>${esc(l.letter)}. ${esc(l.label)}</b><br><span style="color:var(--muted);font-size:12.5px;">${esc(l.blurb)}</span></span>
          <span style="color:var(--indigo);">→</span>
        </button>`));
    });
    list.appendChild(el(`
      <button class="card card-tight row-between" data-level="test" style="text-align:left;width:100%;border:1px solid var(--line);cursor:pointer;">
        <span><b>E. Test my level</b><br><span style="color:var(--muted);font-size:12.5px;">Answer 6 quick questions and I'll place you.</span></span>
        <span style="color:var(--indigo);">→</span>
      </button>`));
    overlay.appendChild(list);
    list.addEventListener("click", (e)=>{
      const b = e.target.closest("[data-level]"); if(!b) return;
      if (b.dataset.level === "test"){ testIdx=0; testAnswers=[]; renderTestScreen(); }
      else { setLevel(b.dataset.level); finishOnboarding(); }
    });
  }

  function renderTestScreen(){
    overlay.innerHTML = "";
    const q = PLACEMENT_QUESTIONS[testIdx];
    // Shuffle option order per question so the correct answer isn't guessable by position
    // (e.g. always index 1) — track correctness by value, not by the original index.
    const shuffled = shuffle(q.options.map((o,i)=>({text:o, correct:i===q.correct})));
    const wrap = el(`<div style="max-width:480px;margin:18px auto 0;"></div>`);
    wrap.appendChild(el(`<p style="color:var(--muted);font-size:12.5px;text-align:center;">Question ${testIdx+1} of ${PLACEMENT_QUESTIONS.length}</p>`));
    wrap.appendChild(el(`<div class="card" style="margin-top:8px;"><p class="section-title" style="font-size:16px;">${esc(q.q)}</p></div>`));
    const opts = el(`<div class="stack" style="margin-top:10px;"></div>`);
    shuffled.forEach((o,i)=>{ opts.appendChild(el(`<button class="btn" data-opt="${i}" style="text-align:left;width:100%;">${esc(o.text)}</button>`)); });
    wrap.appendChild(opts);
    overlay.appendChild(wrap);
    opts.addEventListener("click", (e)=>{
      const b = e.target.closest("[data-opt]"); if(!b) return;
      testAnswers.push(shuffled[Number(b.dataset.opt)].correct ? 1 : 0);
      testIdx++;
      if (testIdx < PLACEMENT_QUESTIONS.length) renderTestScreen();
      else { setLevel(determineLevelFromScore(testAnswers.reduce((a,c)=>a+c,0))); finishOnboarding(); }
    });
  }

  function finishOnboarding(){ overlay.remove(); render(); if (!DB.sawAppGuide) openAppGuide(); }
  renderLevelScreen();
}

/* ---------- app guide ("how this app works" map) ---------- */
// Shown automatically right after onboarding (first-ever launch) and, once, to anyone who
// already had a level set before this guide existed (so returning users get the map too —
// see boot()). Always reachable afterward via the "?" button in the header.
const APP_GUIDE_SECTIONS = [
  {icon:"🏠", name:"Home", blurb:"Start every day here.",
   bullets:["Pick 5, 10, 20 or 30 minutes — it walks you through Learn → Practice → Speak → Review","\"Continue learning\" — a simple step-by-step path for beginners","One suggested conversation to speak out loud each day"]},
  {icon:"📖", name:"Library", blurb:"Look things up. Eight sections, each with one job:",
   bullets:[
    "<b>💬 Phrases</b> — ready-to-say sentences, grouped by situation",
    "<b>🗣️ Conversations</b> — full back-and-forth dialogues: hospital scripts &amp; everyday life",
    "<b>🔤 Words &amp; Basics</b> — vocabulary, numbers, gender, question words",
    "<b>📏 Grammar</b> — the rules: commands, ko/ke/se, postpositions, ne, \"-wala\"",
    "<b>🏃 Verbs &amp; Tenses</b> — verb bank, every tense, compound verbs, exceptions",
    "<b>📐 Formula Lab</b> — build your own sentences: 28 formulas × 10 examples + quick patterns",
    "<b>🧩 Mix-ups</b> — look-alike words and verbs that get confused",
    "<b>⭐ Saved</b> — sentences you starred"]},
  {icon:"🎯", name:"Practice", blurb:"Flashcard drills for what you've already seen.",
   bullets:["Quick Review — a short daily batch","Deep Review, Mistakes, Due Reviews, Verb Practice and more"]},
  {icon:"🎓", name:"Tutor", blurb:"Ask about any word or sentence.",
   bullets:["Type in English, Hindi or Tamil — you get the meaning and the grammar behind it"]},
  {icon:"🗂️", name:"Tasks", blurb:"Your class tasks.",
   bullets:["71 flip-card decks to practise, plus the full class-task list to read through"]},
  {icon:"📊", name:"Progress", blurb:"Streak, stats, backup — and how to reach the developer.",
   bullets:["Export / restore your data","⭐ Leave a review &nbsp;·&nbsp; ✉️ Contact us &nbsp;·&nbsp; ℹ️ Disclaimer"]},
];
function renderAppGuideInto(overlay, closeLabel, onClose){
  overlay.innerHTML = "";
  const wrap = el(`<div style="max-width:560px;margin:0 auto;"></div>`);
  wrap.appendChild(el(`
    <div style="text-align:center;">
      <div style="font-size:34px;">🗺️</div>
      <h2 style="margin-top:6px;">New here? Start like this</h2>
      <p style="color:var(--muted);font-size:13px;margin-top:4px;max-width:420px;margin-left:auto;margin-right:auto;">Four small steps. Nothing to memorise today. Reopen this anytime with the <b>?</b> button at the top.</p>
    </div>
  `));
  wrap.appendChild(el(`
    <div class="card" style="margin-top:16px;border:1px solid var(--line);">
      <p class="section-title">✅ Your first day</p>
      <ol class="start-steps">
        <li><b>Tap Home</b>, then <b>5 min</b>. The app teaches you in order — just follow it.</li>
        <li><b>Tap 🔊</b> on any Hindi line to hear it, then say it out loud once.</li>
        <li><b>Stuck on a word?</b> Open <b>Tutor</b> and ask in English or Tamil.</li>
        <li><b>Come back tomorrow</b> — even 5 minutes keeps your 🔥 streak alive.</li>
      </ol>
    </div>
  `));
  const grid = el(`<div class="stack" style="margin-top:14px;gap:10px;"></div>`);
  grid.appendChild(el(`<p style="color:var(--muted);font-size:12.5px;margin:2px 2px 0;">Later, when you're curious — here's where everything lives:</p>`));
  APP_GUIDE_SECTIONS.forEach(t=>{
    grid.appendChild(el(`
      <div class="card card-tight" style="border:1px solid var(--line);">
        <p style="font-weight:700;font-size:14.5px;">${t.icon} ${esc(t.name)}</p>
        <p style="color:var(--muted);font-size:12.5px;margin-top:2px;">${esc(t.blurb)}</p>
        <ul style="margin-top:6px;padding-left:18px;font-size:12.5px;color:var(--ink);line-height:1.65;">
          ${t.bullets.map(b=>`<li>${b}</li>`).join("")}
        </ul>
      </div>
    `));
  });
  wrap.appendChild(grid);
  const btn = el(`<button class="btn btn-primary" style="width:100%;margin-top:18px;">${esc(closeLabel)}</button>`);
  wrap.appendChild(btn);
  overlay.appendChild(wrap);
  btn.addEventListener("click", onClose);
}
function openAppGuide(){
  const overlay = el(`<div id="appGuideOverlay" style="position:fixed;inset:0;z-index:999;background:var(--bg,#0b1120);overflow-y:auto;padding:24px 16px 40px;"></div>`);
  document.body.appendChild(overlay);
  renderAppGuideInto(overlay, DB.sawAppGuide ? "Close" : "Got it — let's start →", ()=>{ DB.sawAppGuide = true; saveStore(); overlay.remove(); });
}

/* ---------- disclaimer pop-up ---------- */
// Shown exactly once, the very first time the app is opened on a device. The "seen" flag is
// written the moment it appears (not when it's closed), so it can never come back on its own —
// not after a reload, not after "Reset progress". It stays reachable on purpose from
// Progress → ℹ️ Disclaimer, but that's a tap the learner chooses to make.
function openDisclaimer(){
  if (document.getElementById("disclaimerModal")) return;
  const modal = el(`
    <div id="disclaimerModal" class="disc-backdrop" role="dialog" aria-modal="true" aria-labelledby="discTitle">
      <div class="disc-card">
        <button type="button" class="disc-close" id="discClose" aria-label="Close disclaimer">✕</button>
        <div style="font-size:30px;line-height:1;">📘</div>
        <h2 id="discTitle" style="margin-top:8px;font-size:18px;">Before you begin</h2>
        <ul class="disc-list">
          <li><b>For learning only.</b> This is a personal study app — not an official or certified source. It can contain mistakes.</li>
          <li><b>Medical phrases are practice scripts.</b> They don't replace a qualified interpreter, especially for consent or emergencies.</li>
          <li><b>Pronunciation</b> is shown in English letters and Tamil. Tap 🔊 to hear it — voice quality depends on your device.</li>
          <li><b>Your progress is saved on this device only.</b> Use Progress → Export backup to keep a copy.</li>
          <li><b>Spotted a mistake?</b> Progress → ✉️ Contact us.</li>
        </ul>
        <button type="button" class="btn btn-primary" id="discOk" style="width:100%;margin-top:14px;">I understand</button>
      </div>
    </div>`);
  document.body.appendChild(modal);
  DB.sawDisclaimer = true; saveStore();
  const close = ()=>{ modal.remove(); document.removeEventListener("keydown", onKey); };
  function onKey(e){ if (e.key === "Escape") close(); }
  document.addEventListener("keydown", onKey);
  $("#discClose", modal).addEventListener("click", close);
  $("#discOk", modal).addEventListener("click", close);
  modal.addEventListener("click", (e)=>{ if (e.target === modal) close(); });
  try{ $("#discClose", modal).focus(); }catch(e){}
}

/* ---------- daily session engine ---------- */
const SESSION_TEMPLATES = {
  5:  {learn:3,  review:5,  speak:1},
  10: {learn:5,  review:8,  speak:1},
  20: {learn:10, review:10, speak:2},
  30: {learn:15, review:15, speak:3},
};
function nextPathStep(){
  const skipTo = LEVEL_SKIP_TO[DB.level] || 1;
  return LEARNING_PATH.find(s=>s.id>=skipTo && !DB.pathDone[s.id]) || null;
}
function speakPoolForLevel(){
  const rank = levelRank(DB.level);
  const maxLevel = rank<=0 ? 2 : rank===1 ? 3 : rank===2 ? 4 : 5;
  const pool = [];
  LIFE_SCENARIOS.forEach(sc=>{ sc.convos.forEach(c=>{ if ((c.level||1) <= maxLevel) pool.push({scenario:sc, convo:c}); }); });
  return pool;
}
// The 600 sentences carry no explicit difficulty field, so word count of the Hindi line is
// used as a stand-in: short lines ("Kitna huaa?") skew simple/beginner, longer ones
// (full clauses with postpositions, "/"-alternates, subordinate phrasing) skew harder.
// Rough but far better than ignoring level entirely.
function sentenceTier(s){
  const main = (s.hi||"").split("/")[0].trim();
  const wc = main ? main.split(/\s+/).length : 0;
  if (wc <= 3) return 1;
  if (wc <= 5) return 2;
  if (wc <= 7) return 3;
  return 4;
}
// Which difficulty tiers a level's "Learn" step should draw brand-new sentences from —
// complete beginners stay in the simplest tiers, advanced learners get pushed toward the
// harder ones instead of recycling the same easy opening lines everyone sees first.
const LEVEL_TIERS = {
  complete_beginner: [1, 2],
  beginner: [1, 2, 3],
  intermediate: [2, 3, 4],
  advanced: [3, 4],
};
function levelAppropriatePool(pool, level){
  const tiers = LEVEL_TIERS[level] || [1, 2, 3, 4];
  const matched = pool.filter(s => tiers.includes(sentenceTier(s)));
  return matched.length ? matched : pool; // never leave a session short just to stay on-tier
}
function buildSession(minutes){
  const tpl = SESSION_TEMPLATES[minutes] || SESSION_TEMPLATES[10];
  const unstudied = SENTENCES_300.filter(s=>!DB.srs[s.n]);
  const learnPool = shuffle(levelAppropriatePool(unstudied.length ? unstudied : SENTENCES_300, DB.level));
  const learnItems = learnPool.slice(0, tpl.learn);
  const due = shuffle(dueSentences().filter(s=>!learnItems.some(l=>l.n===s.n)));
  const reviewItems = due.slice(0, tpl.review);
  const speakItems = shuffle(speakPoolForLevel()).slice(0, Math.max(1, tpl.speak));
  return { minutes, tpl, learnItems, reviewItems, speakItems };
}
function renderSession(){
  const s = APP.home.session;
  const wrap = el(`<div class="stack"></div>`);
  const stepOrder = ["learn","practice","speak","review"];
  const stepLabels = {learn:"LEARN", practice:"PRACTICE", speak:"SPEAK", review:"REVIEW"};
  wrap.appendChild(el(`
    <div class="row" style="gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:4px;">
      ${stepOrder.map((st,i)=>`<span class="tag ${s.step===st?'tag-good':''}" style="opacity:${stepOrder.indexOf(s.step)>=i?1:0.45};">${stepLabels[st]}</span>${i<3?'<span style="color:var(--muted);">→</span>':''}`).join("")}
    </div>`));
  if (s.step === "learn") wrap.appendChild(renderSessionLearn(s));
  else if (s.step === "practice") wrap.appendChild(renderSessionPractice(s));
  else if (s.step === "speak") wrap.appendChild(renderSessionSpeak(s));
  else wrap.appendChild(renderSessionReview(s));
  wrap.appendChild(el(`<button class="btn btn-ghost" data-session-exit style="margin-top:6px;">✕ End session</button>`));
  wrap.addEventListener("click", (e)=>{
    if (e.target.closest("[data-session-exit]")){ APP.home = {mode:"dashboard", session:null}; render(); return; }
    handleSessionClick(e, s);
  });
  return wrap;
}
function renderSessionLearn(s){
  if (!s.learnItems.length || s.learnIdx >= s.learnItems.length){
    return el(`<div class="card"><p>Nothing new to learn right now.</p><button class="btn btn-primary" data-session-to-practice style="margin-top:8px;">Continue →</button></div>`);
  }
  const item = s.learnItems[s.learnIdx];
  return el(`
    <div class="card phrase-card">
      <p class="section-title">Learn · ${s.learnIdx+1} of ${s.learnItems.length}</p>
      <div class="row-between" style="margin-top:8px;"><p class="hi-line hi" style="font-size:19px;font-weight:600;color:var(--indigo);">${esc(item.hi)}</p><button class="icon-btn speak-glow" data-speak="${esc(item.hi)}" title="Listen">🔊</button></div>
      ${item.ta?`<p class="ta" style="color:var(--muted);margin-top:2px;">${esc(item.ta)}</p>`:""}
      <p style="margin-top:2px;">${esc(item.en)}</p>
      <button class="btn btn-primary" data-session-learn-next style="margin-top:12px;width:100%;">${s.learnIdx+1<s.learnItems.length?"Next →":"Start practice →"}</button>
    </div>`);
}
function renderSessionPractice(s){
  if (!s.reviewQueue.length){
    return el(`<div class="card"><p>Nothing to practice right now.</p><button class="btn btn-primary" data-session-to-speak style="margin-top:8px;">Continue →</button></div>`);
  }
  if (s.reviewIdx >= s.reviewQueue.length){
    return el(`<div class="card"><p class="section-title">Practice complete ✓</p><p style="color:var(--muted);font-size:13px;margin-top:4px;">${s.doneReview} reviewed${s.mistakes?`, ${s.mistakes} to revisit`:""}.</p><button class="btn btn-primary" data-session-to-speak style="margin-top:10px;width:100%;">Continue to speaking →</button></div>`);
  }
  const item = s.reviewQueue[s.reviewIdx];
  return el(`
    <div class="card flash">
      <div class="sub">Practice · ${s.reviewIdx+1} of ${s.reviewQueue.length}</div>
      ${!s.reviewFlipped
        ? `<div class="prompt">${esc(item.en)}</div><div class="prompt ta" style="font-size:14px;margin-top:4px;">${esc(item.ta||"")}</div>
           <button class="btn btn-primary btn-sm" data-session-reveal style="margin-top:10px;">Show Hindi</button>`
        : `<div class="prompt" style="font-size:13.5px;color:var(--muted);">${esc(item.en)}</div>
           <div class="answer hi" style="font-size:19px;margin-top:8px;">${esc(item.hi)}</div>
           <button class="icon-btn speak-glow" data-speak="${esc(item.hi)}" title="Listen" style="margin-top:6px;">🔊</button>
           <div class="row" style="gap:8px;margin-top:12px;">
             <button class="btn" data-session-rate="again" style="flex:1;">Again</button>
             <button class="btn" data-session-rate="good" style="flex:1;">Good</button>
             <button class="btn btn-primary" data-session-rate="easy" style="flex:1;">Easy</button>
           </div>`}
    </div>`);
}
function renderSessionSpeak(s){
  if (!s.speakItems.length || s.speakIdx >= s.speakItems.length){
    return el(`<div class="card"><p>No conversation available right now.</p><button class="btn btn-primary" data-session-to-review style="margin-top:8px;">Continue →</button></div>`);
  }
  const pair = s.speakItems[s.speakIdx], scenario = pair.scenario, convo = pair.convo;
  return el(`
    <div class="card">
      <p class="section-title">${esc(scenario.icon||"💬")} ${esc(scenario.title)} — ${esc(convo.title)}</p>
      <div style="margin-top:8px;">
        ${convo.turns.map(t=>`
          <div class="convo-turn ${t.sp!=="other"?"you":"other"}">
            <div class="who">${t.sp!=="other"?"You":esc(scenario.otherRole||"Other")}</div>
            <div class="ct-en">${esc(t.en)}</div>
            <div class="ct-hi hi-line">${esc(t.hi)}</div>
            ${t.ta?`<div class="ct-ta">${esc(t.ta)}</div>`:""}
          </div>`).join("")}
      </div>
      <button class="btn btn-primary" data-session-speak-next style="margin-top:12px;width:100%;">${s.speakIdx+1<s.speakItems.length?"Next conversation →":"Finish session →"}</button>
    </div>`);
}
function renderSessionReview(s){
  return el(`
    <div class="card">
      <p class="section-title">Lesson complete ✓</p>
      <div class="stack" style="gap:6px;margin-top:10px;">
        <div class="row-between"><span>📘 Sentences learned</span><b>${s.learnItems.length}</b></div>
        <div class="row-between"><span>🔁 Reviews done</span><b>${s.doneReview}</b></div>
        <div class="row-between"><span>💬 Conversations</span><b>${s.speakItems.length}</b></div>
        ${s.mistakes?`<div class="row-between"><span>⚠️ To revisit</span><b>${s.mistakes}</b></div>`:""}
      </div>
      <p style="color:var(--muted);font-size:12.5px;margin-top:12px;"><b style="color:var(--indigo);">Next:</b> ${s.mistakes? "Review your mistakes tomorrow — they'll show up as due again." : "Come back tomorrow to keep your streak going."}</p>
      <button class="btn btn-primary" data-session-finish style="margin-top:12px;width:100%;">Back to Home</button>
    </div>`);
}
function handleSessionClick(e, s){
  const sp = e.target.closest("[data-speak]"); if (sp){ speak(sp.dataset.speak); return; }
  if (e.target.closest("[data-session-learn-next]")){
    s.learnIdx++;
    if (s.learnIdx >= s.learnItems.length){ s.step="practice"; s.reviewQueue = shuffle(s.learnItems.concat(s.reviewItems)); s.reviewIdx=0; s.reviewFlipped=false; }
    render(); return;
  }
  if (e.target.closest("[data-session-to-practice]")){ s.step="practice"; s.reviewQueue = shuffle(s.learnItems.concat(s.reviewItems)); s.reviewIdx=0; s.reviewFlipped=false; render(); return; }
  if (e.target.closest("[data-session-reveal]")){ s.reviewFlipped = true; render(); return; }
  if (e.target.closest("[data-session-rate]")){
    const rating = e.target.closest("[data-session-rate]").dataset.sessionRate;
    const item = s.reviewQueue[s.reviewIdx];
    srsRate(item.n, item.c, rating);
    if (rating === "again") s.mistakes++;
    s.doneReview++; s.reviewIdx++; s.reviewFlipped=false;
    render(); return;
  }
  if (e.target.closest("[data-session-to-speak]")){ s.step="speak"; s.speakIdx=0; render(); return; }
  if (e.target.closest("[data-session-speak-next]")){
    s.speakIdx++;
    if (s.speakIdx >= s.speakItems.length) s.step="review";
    render(); return;
  }
  if (e.target.closest("[data-session-to-review]")){ s.step="review"; render(); return; }
  if (e.target.closest("[data-session-finish]")){ APP.home = {mode:"dashboard", session:null}; render(); return; }
}

/* ---------- markdown-lite renderer for tutor answers ---------- */
function renderMD(src){
  const lines = String(src||"").replace(/\r/g,"").split("\n");
  let html = ""; let inList = false;
  const inlineFmt = (t) => esc(t)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
  for (let raw of lines){
    const line = raw.trim();
    if (!line){ if(inList){html+="</ul>"; inList=false;} continue; }
    let m;
    // Safety net: if a markdown pipe-table sneaks through anyway, don't render raw "|" text —
    // skip separator rows (|---|---|) and turn data rows into a readable bullet line instead.
    if (/^\|[\s\-:|]+\|$/.test(line)) { continue; }
    if (/^\|.*\|$/.test(line)){
      const cells = line.split("|").map(c=>c.trim()).filter(c=>c.length);
      if (!inList){ html+="<ul>"; inList=true; }
      html += `<li>${cells.map(inlineFmt).join(" &nbsp;→&nbsp; ")}</li>`;
      continue;
    }
    if ((m = line.match(/^#{2,4}\s*(.+)$/))){
      if(inList){html+="</ul>"; inList=false;}
      html += `<h4>${inlineFmt(m[1])}</h4>`;
    } else if ((m = line.match(/^[-*]\s+(.+)$/))){
      if(!inList){html+="<ul>"; inList=true;}
      html += `<li>${inlineFmt(m[1])}</li>`;
    } else {
      if(inList){html+="</ul>"; inList=false;}
      html += `<p>${inlineFmt(line)}</p>`;
    }
  }
  if(inList) html += "</ul>";
  return html;
}

/* ---------- Personal Teaching Instructions (verbatim, condensed formatting kept) ---------- */
const TEACHING_INSTRUCTIONS = `You are my personal Hindi teacher. I am a Tamil-speaking adult learning Hindi mainly for real-life spoken communication. I CANNOT READ DEVANAGARI SCRIPT AT ALL — I only read English letters (Tanglish/Latin script). My primary goal is NOT literary Hindi — I want to understand how native Hindi speakers naturally FRAME sentences in everyday conversation. I often type Tamil in English letters (Tanglish), sometimes mixed with English. Convert my sentence into natural, commonly spoken Hindi — do not merely translate word-for-word: first understand the intended Tamil meaning and situation, then produce the most natural spoken Hindi a Hindi speaker would actually use.

CRITICAL SCRIPT RULE (read this first, applies to EVERY line of the answer, not just the headline sentence): every single Hindi word or phrase, wherever it appears — inside formulas, inside tables/bullet lists, inside "why this form is used" explanations, inside examples, inside corrections — must show its Tanglish (Latin-script) transliteration right next to it, e.g. "khaata hai (खाता है)". Never write a bare Devanagari word/phrase with no Tanglish beside it, even in a table row or a one-line formula. You may include the Devanagari alongside for reference, but Tanglish is the primary, load-bearing script and must never be missing. Likewise, write Tamil in Tanglish (Latin letters) too, not Tamil script, since I read Tamil in English letters, e.g. "evlo aagum (எவ்வளவு ஆகும்)" — Tanglish first, Tamil script optional alongside.

FORMATTING RULE: do not use markdown pipe-table syntax (lines with "|" and "---"), since the app that displays your answer cannot render markdown tables — they show up as broken text with stray "|" characters. Instead present any tabular/paradigm information as a bullet list, one row per bullet, e.g. "- main (m) → -taa → hoon  (main khaata hoon)". Use #### headings and -/* bullet lists (both supported) freely.

For the sentence/task I give you, provide, using markdown headings (####) for each section:
1. Natural spoken Hindi — Tanglish transliteration first, Devanagari alongside in parentheses if you like
2. Tamil meaning (natural spoken Tamil, written in Tanglish/English letters, not Tamil script)
3. Tense / grammar type or construction (be precise; if it's a construction rather than a classic tense, say so)
4. Root verb(s), explained (if compound verb, explain both parts, e.g. "le aana = lena + aana = take + come = bring")
5. Grammar rule / formula (a reusable pattern, e.g. "mujhe + V-na + hai") — written in Tanglish
6. Why this form is used (explain the reasoning, not just the translation)
7. Word-by-word breakdown when it helps — each Hindi word in Tanglish
8. Gender/number agreement notes when relevant (e.g. main gaya vs main gayi) — as a bullet list, each row/pronoun spelled out in Tanglish, never a pipe table
9. Postposition notes when relevant (ko/ke/se, mein/par, etc.) with the Tamil shortcut cue written in Tanglish (e.g. "KO = yaarukku?/yaarai?", "SE = yaaridamirundhu?/edhan moolam?")
10. 2-4 similar examples using the same grammar rule, each in Tanglish
11. Important alternative natural phrasing if one exists, and whether it's spoken vs formal
12. If my attempt has an error, say so plainly, give the natural corrected version in Tanglish, explain what was wrong, and give 1-2 more examples of the same rule — do not just say "correct."

Rules: do not invent nonstandard grammar — if a form is dialectal or uncertain, say so. Do not force every sentence into a classic tense label if it's really a different construction (obligation, ability, compound verb, relative construction, etc.). Prioritize natural spoken Hindi over textbook-formal Hindi, and note which is more common in daily conversation when both exist. If my Tanglish is ambiguous between two real meanings, say so and ask rather than guessing. Assume I am beginner-to-intermediate: I already know basic verbs but still struggle with tense choice, verb endings, gender agreement, ko/ke/se, mein/par, yeh/ise/yahi/isi, aana/jaana nuances, gaya/gayi/gaye, raha/rahi/rahe, doon/loon, compound verbs, and word order — explain these clearly whenever they appear. Do not over-praise; teach me to build the sentence myself next time. Keep the answer readable — enough grammar to understand the pattern, not a linguistics lecture. Above all: never leave me staring at Devanagari or Tamil script with no Tanglish next to it.`;

/* ---------- sample() capability (live tutor) ---------- */
let sampleAPI = null, sampleChecked = false;
async function getSample(){
  if (sampleChecked) return sampleAPI;
  sampleChecked = true;
  try{
    if (window.claude && window.claude.use){
      sampleAPI = await window.claude.use("sample");
    }
  }catch(e){ sampleAPI = null; }
  return sampleAPI;
}

/* ---------- library sections ---------- */
// Eight sections, each with one distinct job. Older saved/linked section names are mapped
// forward so nothing a returning user had bookmarked points at a section that no longer exists.
const LIB_SECTIONS = [
  ["sentences","💬 Phrases",      "What to say — ready-made sentences, grouped by real-life situation."],
  ["convos",   "🗣️ Conversations","How a whole exchange goes — full back-and-forth dialogues, hospital and everyday."],
  ["words",    "🔤 Words & Basics","The building blocks — question words, numbers, vocabulary, gender, pronoun family."],
  ["grammar",  "📏 Grammar",      "Why it's said that way — commands, postpositions, ne, -wala, talking about others."],
  ["verbs",    "🏃 Verbs & Tenses","Every action word and tense — verb bank, tense family, compound verbs, exceptions."],
  ["formulas", "📐 Formula Lab",  "Build your own sentences — 28 formulas × 10 examples, plus one-line quick patterns."],
  ["confuse",  "🧩 Mix-ups",      "Look-alikes — word pairs and verb pairs that get confused, side by side."],
  ["saved",    "⭐ Saved",        "Sentences you starred."],
];
const LIB_SUB_ALIASES = { scenarios:"convos", life:"convos", tasks:"sentences" };
function normalizeSub(sub){
  if (!sub) return "sentences";
  if (LIB_SUB_ALIASES[sub]) return LIB_SUB_ALIASES[sub];
  return LIB_SECTIONS.some(x=>x[0]===sub) ? sub : "sentences";
}

/* ---------- app state ---------- */
const APP = {
  tab:"home",
  lib:{ sub:normalizeSub(DB.lastLib && DB.lastLib.sub), q:"", cat:(DB.lastLib && DB.lastLib.cat) || "all", tier:"all", convoKind:(DB.lastLib && DB.lastLib.sub==="scenarios") ? "hospital" : "life" },
  practice:{
    // Old saved mode values (from before the Quick/Deep/Verb/Mistakes/Due redesign) still
    // need to resolve to something valid for returning users.
    mode: ({flash:"quick", imp:"verb"})[DB.lastPracticeMode] || DB.lastPracticeMode || "quick",
    verbSub: DB.lastPracticeMode === "imp" ? "commands" : "forms",
    card:null, mcq:null,
  },
  tutor:{busy:false},
  tasks:{ deckId:null, index:0, flipped:false, q:"", view:"decks" },
  home:{ mode:"dashboard", session:null },
  progress:{ mode:"main", reviewStars:5, reviewName:"", reviewText:"", contactName:"", contactEmail:"", contactMsg:"" },
};

/* ---------- tabs ---------- */
let tabHistory = [];
function switchTab(tab, isBack){
  if (!isBack && tab !== APP.tab){ tabHistory.push(APP.tab); if (tabHistory.length > 20) tabHistory.shift(); }
  if (tab === "progress" && tab !== APP.tab) APP.progress.mode = "main";
  APP.tab = tab;
  $$(".tab").forEach(b => b.toggleAttribute && b.setAttribute("aria-current", b.dataset.tab===tab ? "page":"false"));
  $("#topbarSub").textContent = {
    home:"Spoken Hindi for Tamil speakers", library:"Phrasebook & grammar reference",
    practice:"Drill what you've learned", tutor:"Ask the tutor anything", progress:"Your learning stats",
    tasks:"Class tasks & flashcard sets"
  }[tab];
  const back = $("#backBtn"); if (back) back.style.display = (tab==="home") ? "none" : "";
  window.scrollTo(0,0);
  render();
}
function goBack(){
  const prev = tabHistory.pop();
  switchTab(prev || "home", true);
}
$("#tabbar").addEventListener("click", (e)=>{
  const b = e.target.closest(".tab"); if(!b) return; switchTab(b.dataset.tab);
});
$("#streakChip").addEventListener("click", ()=> switchTab("progress"));
const backBtnEl = $("#backBtn");
if (backBtnEl) backBtnEl.addEventListener("click", goBack);
const helpBtnEl = $("#helpBtn");
if (helpBtnEl) helpBtnEl.addEventListener("click", openAppGuide);

/* ---------- floating scroll button ---------- */
const scrollFab = $("#scrollFab");
function updateScrollFab(){
  if (!scrollFab) return;
  const scrollable = document.documentElement.scrollHeight > window.innerHeight + 60;
  if (!scrollable){ scrollFab.style.display = "none"; return; }
  const nearBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 40);
  scrollFab.style.display = "";
  scrollFab.setAttribute("aria-label", nearBottom ? "Scroll to top" : "Scroll down");
  scrollFab.dataset.dir = nearBottom ? "up" : "down";
  scrollFab.innerHTML = nearBottom
    ? `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    : `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
if (scrollFab){
  scrollFab.addEventListener("click", ()=>{
    if (scrollFab.dataset.dir === "up") window.scrollTo({top:0, behavior:"smooth"});
    else window.scrollBy({top: Math.round(window.innerHeight*0.75), behavior:"smooth"});
  });
  window.addEventListener("scroll", updateScrollFab, {passive:true});
  window.addEventListener("resize", updateScrollFab);
}

const HERO_BANNERS = {
  home:     { eyebrow:"Welcome", title:"Namaste! Let's learn Hindi" },
  practice: { eyebrow:"Drill", title:"Sharpen what you know" },
  tutor:    { eyebrow:"Ask away", title:"Your live Hindi tutor" },
  tasks:    { eyebrow:"Class work", title:"Tasks & flashcard decks" },
  progress: { eyebrow:"Your climb", title:"Track your progress" },
  "library:sentences": { eyebrow:"Phrasebook", title:`${SENTENCES_300.length} handy sentences` },
  "library:convos":     { eyebrow:"Conversations", title:"Real exchanges, start to end" },
  "library:words":      { eyebrow:"Building blocks", title:"Words & basics" },
  "library:grammar":    { eyebrow:"Rules & patterns", title:"Grammar, with the why" },
  "library:verbs":      { eyebrow:"Action words", title:"Verbs & tenses" },
  "library:formulas":   { eyebrow:"Formula Lab", title:"Every formula, 10 examples deep" },
  "library:confuse":    { eyebrow:"Look-alikes", title:"Similar & confusing Hindi" },
  "library:saved":      { eyebrow:"Your picks", title:"Saved for later" },
};
function heroKey(){
  return APP.tab === "library" ? `library:${APP.lib.sub}` : APP.tab;
}
function heroBanner(key){
  const b = HERO_BANNERS[key]; if (!b) return null;
  const cssKey = key.replace(":", "-");
  return el(`
    <div class="hero-banner hero-banner--${cssKey}">
      <p class="hb-eyebrow">${esc(b.eyebrow)}</p>
      <h2 class="hb-title">${esc(b.title)}</h2>
      <div class="hb-art" aria-hidden="true"></div>
    </div>
  `);
}
function render(){
  const view = $("#view");
  view.innerHTML = "";
  const banner = heroBanner(heroKey());
  if (banner) view.appendChild(banner);
  if (APP.tab === "home") view.appendChild(renderHome());
  else if (APP.tab === "library") view.appendChild(renderLibrary());
  else if (APP.tab === "practice") view.appendChild(renderPractice());
  else if (APP.tab === "tutor") view.appendChild(renderTutor());
  else if (APP.tab === "tasks") view.appendChild(renderTasksTab());
  else if (APP.tab === "progress") view.appendChild(renderProgress());
  if (typeof updateScrollFab === "function") setTimeout(updateScrollFab, 0);
}

/* ================= HOME ================= */
function renderHome(){
  if (APP.home && APP.home.mode === "session" && APP.home.session) return renderSession();

  const hour = new Date().getHours();
  const greet = hour<12 ? "Good morning" : hour<17 ? "Good afternoon" : "Good evening";
  const due = dueSentences().length;
  const step = nextPathStep();
  const speakPool = speakPoolForLevel();
  const speakPick = speakPool.length ? pick(speakPool) : null;
  const weak = weakCategories();
  const focus = weak.length && weak[0].count >= 2 ? weak[0] : null;
  const levelUp = levelUpSuggestion();
  const wrap = el(`<div class="stack"></div>`);

  wrap.appendChild(el(`
    <div class="card hero-card">
      <div class="row-between">
        <div>
          <p class="section-title">${greet}</p>
          <h2 class="hero-greet" style="font-size:20px;margin-top:6px;">Namaste 🙏</h2>
        </div>
        <button class="chip" data-open-level style="align-self:flex-start;white-space:nowrap;">Level: ${esc(levelLabel(DB.level))} ✎</button>
      </div>
    </div>
  `));

  if (!DB.hideStart && (DB.stats.reviewed||0) < 5){
    wrap.appendChild(el(`
      <div class="card start-card">
        <div class="row-between">
          <p class="section-title">👋 New here? Do this first</p>
          <button class="chip" data-hide-start type="button">Hide</button>
        </div>
        <ol class="start-steps">
          <li>Tap <b>5 min</b> in "Today's mission" just below.</li>
          <li>Tap <b>🔊</b> on any Hindi line and say it out loud.</li>
          <li>Stuck on something? Ask the <b>Tutor</b> tab.</li>
        </ol>
        <button class="btn btn-sm" data-open-guide type="button">🗺️ Show me around the app</button>
      </div>
    `));
  }

  if (levelUp){
    wrap.appendChild(el(`
      <div class="card" style="border:1px solid var(--marigold);">
        <p class="section-title">🚀 On a roll</p>
        <p style="margin-top:6px;">${DB.stats.easyStreak} "Easy" ratings in a row — ${esc(levelLabel(DB.level))} might be too easy now. Try <b>${esc(levelUp.label)}</b>?</p>
        <button class="btn btn-marigold" data-levelup="${esc(levelUp.code)}" style="margin-top:8px;width:100%;">Switch to ${esc(levelUp.label)}</button>
      </div>
    `));
  }

  wrap.appendChild(el(`
    <div class="card">
      <p class="section-title">Today's mission</p>
      <p style="color:var(--muted);font-size:13px;margin-top:4px;">How much time do you have?</p>
      <div class="chip-row" style="margin-top:10px;flex-wrap:wrap;gap:8px;display:flex;">
        <button class="btn btn-primary" data-start-session="5">5 min</button>
        <button class="btn btn-primary" data-start-session="10">10 min</button>
        <button class="btn btn-primary" data-start-session="20">20 min</button>
        <button class="btn btn-primary" data-start-session="30">30 min</button>
      </div>
      <div class="row" style="gap:6px;justify-content:center;margin-top:14px;flex-wrap:wrap;">
        <span class="tag">LEARN</span><span style="color:var(--muted);">→</span>
        <span class="tag">PRACTICE</span><span style="color:var(--muted);">→</span>
        <span class="tag">SPEAK</span><span style="color:var(--muted);">→</span>
        <span class="tag">REVIEW</span>
      </div>
    </div>
  `));

  if (step){
    wrap.appendChild(el(`
      <div class="card">
        <p class="section-title">Continue learning</p>
        <p style="margin-top:8px;"><b>${esc(step.icon)} ${esc(step.title)}</b></p>
        <p style="color:var(--muted);font-size:12.5px;margin-top:4px;">${esc(step.blurb)}</p>
        <div class="row" style="gap:8px;margin-top:10px;">
          <button class="btn btn-primary" data-path-goto='${esc(JSON.stringify(step.goto))}' style="flex:1;">${esc(step.gotoLabel)}</button>
          <button class="btn" data-path-done="${step.id}">Mark done ✓</button>
        </div>
      </div>
    `));
  } else {
    const fb = pathFallback();
    wrap.appendChild(el(`
      <div class="card">
        <p class="section-title">Continue learning</p>
        <p style="margin-top:8px;"><b>${esc(fb.icon)} ${esc(fb.title)}</b></p>
        <p style="color:var(--muted);font-size:12.5px;margin-top:4px;">${esc(fb.blurb)}</p>
        <button class="btn btn-primary" data-path-goto='${esc(JSON.stringify(fb.goto))}' style="margin-top:10px;width:100%;">${esc(fb.gotoLabel)}</button>
      </div>
    `));
  }

  if (focus){
    wrap.appendChild(el(`
      <div class="card">
        <p class="section-title">🎯 Focus area</p>
        <p style="margin-top:6px;">You've missed <b>${focus.count}</b> sentence${focus.count>1?"s":""} in <b>${esc(focus.label)}</b> recently — worth a quick re-drill while it's fresh.</p>
        <button class="btn btn-primary" data-focus-cat="${esc(focus.code)}" style="margin-top:8px;width:100%;">Practice ${esc(focus.label)} →</button>
      </div>
    `));
  }

  if (speakPick){
    wrap.appendChild(el(`
      <div class="card">
        <div class="row-between"><p class="section-title">Today's speaking</p><span class="tag tag-marigold">${esc(tierForLevel(speakPick.convo.level).label)}</span></div>
        <p style="margin-top:6px;"><b>${esc(speakPick.scenario.icon||"💬")} ${esc(speakPick.scenario.title)}</b> — ${esc(speakPick.convo.title)}</p>
        <button class="btn btn-marigold" data-goto="library" data-goto-sub="life" style="margin-top:8px;">Open Conversations →</button>
      </div>
    `));
  }

  const recommended = Math.min(due, 10);
  wrap.appendChild(el(`
    <button class="card card-tight row-between" data-goto="practice" style="text-align:left;width:100%;border:1px solid var(--line);cursor:pointer;">
      <span><span style="color:var(--muted);font-size:12px;">Review</span><br><b>${recommended}${due>recommended?"+":""} recommended today</b></span>
      <span style="color:var(--indigo);">→</span>
    </button>
  `));

  wrap.appendChild(el(`
    <div class="grid3">
      <div class="stat stat-reviewed"><b>${DB.stats.reviewed||0}</b><span>Reviewed</span></div>
      <div class="stat stat-due"><b>${due}</b><span>Due now</span></div>
      <div class="stat stat-streak"><b>${DB.streak||0}</b><span>Day streak</span></div>
    </div>
  `));

  wrap.addEventListener("click", (e)=>{
    const startBtn = e.target.closest("[data-start-session]");
    if (startBtn){
      const minutes = Number(startBtn.dataset.startSession);
      const built = buildSession(minutes);
      APP.home = { mode:"session", session: Object.assign(built, {
        step:"learn", learnIdx:0, reviewQueue:[], reviewIdx:0, reviewFlipped:false,
        doneReview:0, mistakes:0, speakIdx:0,
      })};
      render(); return;
    }
    if (e.target.closest("[data-hide-start]")){ DB.hideStart = true; saveStore(); render(); return; }
    if (e.target.closest("[data-open-guide]")){ openAppGuide(); return; }
    const lvl = e.target.closest("[data-open-level]"); if (lvl){ showOnboarding(); return; }
    const lu = e.target.closest("[data-levelup]");
    if (lu){ setLevel(lu.dataset.levelup); DB.stats.easyStreak = 0; saveStore(); render(); return; }
    const pd = e.target.closest("[data-path-done]");
    if (pd){ DB.pathDone[Number(pd.dataset.pathDone)] = true; saveStore(); render(); return; }
    const pg = e.target.closest("[data-path-goto]");
    if (pg){
      try {
        const goto = JSON.parse(pg.dataset.pathGoto);
        if (goto.sub) { APP.lib.sub = normalizeSub(goto.sub); if (goto.sub==="scenarios") APP.lib.convoKind="hospital"; if (goto.sub==="life") APP.lib.convoKind="life"; if (goto.cat) APP.lib.cat = goto.cat; persistLastLib(); }
        switchTab(goto.tab);
      } catch(err){}
      return;
    }
    const g = e.target.closest("[data-goto]");
    if (g){
      if (g.dataset.gotoSub) { const gs = g.dataset.gotoSub; APP.lib.sub = normalizeSub(gs); if (gs==="life") APP.lib.convoKind="life"; if (gs==="scenarios") APP.lib.convoKind="hospital"; persistLastLib(); }
      switchTab(g.dataset.goto); return;
    }
    const fc = e.target.closest("[data-focus-cat]");
    if (fc){ APP.lib.sub = "sentences"; APP.lib.cat = fc.dataset.focusCat; persistLastLib(); switchTab("library"); return; }
    const x = e.target.closest("[data-explain]"); if(x){ openTutorWith(x.dataset.explain); return; }
    const sp = e.target.closest("[data-speak]"); if(sp){ speak(sp.dataset.speak); return; }
  });
  return wrap;
}

/* ================= LIBRARY ================= */
function renderLibBody(){
  const sub = APP.lib.sub;
  if (sub === "sentences") return renderSentenceList();
  if (sub === "convos") return renderConversations();
  if (sub === "words") return renderGrammarRef("words");
  if (sub === "grammar") return renderGrammarRef("grammar");
  if (sub === "verbs") return renderVerbsAndTenses();
  if (sub === "formulas") return renderFormulaLab();
  if (sub === "confuse") return renderSimilarWords();
  if (sub === "saved") return renderSavedList();
  return renderSentenceList();
}
function renderLibrary(){
  APP.lib.sub = normalizeSub(APP.lib.sub);
  const wrap = el(`<div class="stack"></div>`);
  const subtabs = el(`<div class="subtabs">${LIB_SECTIONS.map(([k,l])=>`<button class="chip ${APP.lib.sub===k?"active":""}" data-sub="${k}">${l}</button>`).join("")}</div>`);
  wrap.appendChild(subtabs);
  const cur = LIB_SECTIONS.find(x=>x[0]===APP.lib.sub);
  wrap.appendChild(el(`<p class="lib-purpose"><b>${esc(cur[1])}</b> — ${esc(cur[2])}</p>`));

  const searchLabel = {sentences:SENTENCES_300.length+" sentences", saved:"saved sentences", convos:"conversations", words:"words & basics", verbs:"verbs & tenses", confuse:"similar/confusing pairs", formulas:"sentence formulas", grammar:"grammar"}[APP.lib.sub] || "this section";
  wrap.appendChild(el(`
    <div class="search"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>
      <input id="libSearch" type="text" placeholder="Search ${searchLabel}..." value="${esc(APP.lib.q)}"></div>
  `));

  const body = el(`<div id="libBody"></div>`);
  body.appendChild(renderLibBody());
  wrap.appendChild(body);

  wrap.addEventListener("click", (e)=>{
    const s = e.target.closest("[data-sub]"); if(s){ APP.lib.sub = s.dataset.sub; APP.lib.q=""; persistLastLib(); render(); return; }
    const kind = e.target.closest("[data-convokind]"); if(kind){ APP.lib.convoKind = kind.dataset.convokind; renderLibraryBodyOnly(); return; }
    const cat = e.target.closest("[data-cat]"); if(cat){ APP.lib.cat = cat.dataset.cat; persistLastLib(); render(); return; }
    const tier = e.target.closest("[data-tier]"); if(tier){ APP.lib.tier = tier.dataset.tier; renderLibraryBodyOnly(); return; }
    const x = e.target.closest("[data-explain]"); if(x){ openTutorWith(x.dataset.explain); return; }
    const sp = e.target.closest("[data-speak]"); if(sp){ speak(sp.dataset.speak); return; }
    const f = e.target.closest("[data-fav]"); if(f){ toggleFavorite(Number(f.dataset.fav)); renderLibraryBodyOnly(); return; }
  });
  wrap.addEventListener("input", (e)=>{
    if (e.target.id === "libSearch"){ APP.lib.q = e.target.value; renderLibraryBodyOnly(); }
  });
  return wrap;
}
function persistLastLib(){ DB.lastLib = { sub: APP.lib.sub, cat: APP.lib.cat }; saveStore(); }
function toggleFavorite(n){
  DB.favorites = DB.favorites || {};
  if (DB.favorites[n]) delete DB.favorites[n]; else DB.favorites[n] = true;
  saveStore();
}
function renderLibraryBodyOnly(){
  // re-render only the list body to avoid losing input focus
  const body = $("#libBody");
  if (!body) return;
  body.innerHTML = "";
  body.appendChild(renderLibBody());
}

// One home for every back-and-forth dialogue. Two kinds, switched with a small toggle:
// the 8 hospital scripts (the old "Scenarios") and the everyday-life situations (the old
// "250 Convos"). Nothing was dropped — only the duplicate top-level section was folded in.
function renderConversations(){
  const kind = APP.lib.convoKind === "hospital" ? "hospital" : "life";
  const wrap = el(`<div class="stack"></div>`);
  wrap.appendChild(el(`<div class="chip-row" style="flex-wrap:wrap;gap:6px;">
    <button class="chip ${kind==='life'?'active':''}" data-convokind="life">🌍 Everyday life (${LIFE_SCENARIOS.length})</button>
    <button class="chip ${kind==='hospital'?'active':''}" data-convokind="hospital">🩺 Hospital scripts (${SCENARIOS.length})</button>
  </div>`));
  wrap.appendChild(kind === "life" ? renderLifeScenarios() : renderScenarioList());
  return wrap;
}
// Buckets the existing 1-5 difficulty scale into the spec's 3-tier framing
// (Essential / Natural / Challenge) so learners can pick conversations by difficulty
// rather than wading through all 10 per situation regardless of level.
const CONVO_TIERS = [
  {code:"essential", label:"Essential", max:1},
  {code:"natural",   label:"Natural",   max:3},
  {code:"challenge", label:"Challenge", max:5},
];
function tierForLevel(level){ return CONVO_TIERS.find(t=>(level||1)<=t.max) || CONVO_TIERS[CONVO_TIERS.length-1]; }
function renderLifeScenarios(){
  const q = APP.lib.q.trim().toLowerCase();
  const tier = APP.lib.tier || "all";
  const wrap = el(`<div class="stack"></div>`);
  const match = (...vals) => !q || vals.some(v => (v||"").toLowerCase().includes(q));

  const tierBar = el(`<div class="chip-row" style="flex-wrap:wrap;gap:6px;margin-bottom:2px;">
    <button class="chip ${tier==='all'?'active':''}" data-tier="all">All</button>
    ${CONVO_TIERS.map(t=>`<button class="chip ${tier===t.code?'active':''}" data-tier="${t.code}">${esc(t.label)}</button>`).join("")}
  </div>`);
  wrap.appendChild(tierBar);

  let anyScenario = false;
  LIFE_SCENARIOS.forEach(sc => {
    const convos = sc.convos.filter(c => {
      const tc = tierForLevel(c.level);
      if (tier !== "all" && tc.code !== tier) return false;
      if (!q) return true;
      if (match(sc.title, c.title)) return true;
      return c.turns.some(t => match(t.en, t.hi, t.ta)) || (c.key||[]).some(k=>match(k.hi,k.en));
    });
    if (!convos.length) return;
    anyScenario = true;
    const details = el(`<details class="acc card" ${q||tier!=="all"?"open":""}><summary>${sc.icon||"💬"} ${esc(sc.title)} <span class="tag">${convos.length}</span></summary>
      <div class="lc-scenario-body"></div></details>`);
    const holder = $(".lc-scenario-body", details);
    convos.forEach(c => {
      const tc = tierForLevel(c.level);
      const convoEl = el(`<div class="lc-convo">
        <div class="lc-convo-head"><b>${c.n}. ${esc(c.title)}</b><span class="tag tag-marigold">${esc(tc.label)} · L${c.level}</span></div>
        <div class="lc-turns"></div>
        ${c.key && c.key.length ? `<div class="convo-key">🔑 ${c.key.map(k=>`<b>${esc(k.hi)}</b> = ${esc(k.en)}`).join(" &nbsp;·&nbsp; ")}</div>` : ""}
      </div>`);
      const turnsHolder = $(".lc-turns", convoEl);
      c.turns.forEach(t => {
        const label = t.sp === "you" ? "You" : (sc.otherRole || "Other");
        turnsHolder.appendChild(el(`
          <div class="convo-turn ${t.sp==="you"?"you":"other"}">
            <div class="who">${esc(label)}</div>
            <div class="ct-en">${esc(t.en)}</div>
            <div class="ct-hi hi-line">${esc(t.hi)}</div>
            ${t.ta? `<div class="ct-ta">${esc(t.ta)}</div>`:""}
          </div>
        `));
      });
      holder.appendChild(convoEl);
    });
    wrap.appendChild(details);
  });
  if (!anyScenario) wrap.appendChild(el(`<p class="empty">No conversations match${q?` "${esc(q)}"`:""}${tier!=="all"?` in ${esc(CONVO_TIERS.find(t=>t.code===tier).label)}`:""}.</p>`));
  return wrap;
}

/* "Similar & Confusing Hindi" — pairs of words/phrases that look alike but mean different
   things (kuch vs koi, mujhe vs mujhse, yahan vs wahan...), grouped by type, each with a
   one-line meaning contrast plus a worked example sentence for each side. */
function renderSimilarWords(){
  const q = APP.lib.q.trim().toLowerCase();
  const wrap = el(`<div class="stack"></div>`);
  const match = (...vals) => !q || vals.some(v => (v||"").toLowerCase().includes(q));

  wrap.appendChild(el(`
    <div class="card card-tight" style="margin-bottom:4px;">
      <div style="font-weight:700;color:var(--ink);font-size:14.5px;">🧩 Mix-ups — Similar &amp; Confusing Hindi</div>
      <div style="color:var(--muted);font-size:12.5px;margin-top:4px;">Word pairs and verb pairs that look alike but work differently — the small distinctions that make spoken Hindi sound natural once you know them.</div>
    </div>
  `));

  const groupsOrder = [];
  SIMILAR_WORDS.forEach(x=>{ if (groupsOrder.indexOf(x.group)===-1) groupsOrder.push(x.group); });
  let any = false;
  groupsOrder.forEach(g=>{
    const pairs = SIMILAR_WORDS.filter(x=>x.group===g && (!q || match(x.a.hi,x.a.en,x.a.ta,x.b.hi,x.b.en,x.b.ta,x.exA.hi,x.exA.en,x.exB.hi,x.exB.en)));
    if (!pairs.length) return;
    any = true;
    const details = el(`<details class="acc card" ${q?"open":""}><summary>${esc(g)} <span class="tag">${pairs.length}</span></summary>
      <div class="list-flat"></div></details>`);
    const holder = $(".list-flat", details);
    pairs.forEach(p=>{
      holder.appendChild(el(`
        <div class="sentence-item">
          <div class="row-between" style="align-items:flex-start;">
            <span class="hi hi-line" style="font-size:15px;">${esc(p.a.hi)}</span>
            <span style="color:var(--muted);font-size:12px;">vs</span>
            <span class="hi hi-line" style="font-size:15px;">${esc(p.b.hi)}</span>
          </div>
          <div style="margin-top:6px;display:grid;grid-template-columns:1fr 1fr;gap:4px 10px;">
            <div><div class="ta" style="font-size:12.5px;">${esc(p.a.ta)}</div><div style="color:var(--muted);font-size:12px;">${esc(p.a.en)}</div></div>
            <div><div class="ta" style="font-size:12.5px;">${esc(p.b.ta)}</div><div style="color:var(--muted);font-size:12px;">${esc(p.b.en)}</div></div>
          </div>
          <div style="margin-top:10px;border-top:1px dashed var(--line);padding-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:4px 10px;">
            <div><div class="hi" style="font-size:13px;">${esc(p.exA.hi)}</div><div class="ta" style="font-size:11.5px;margin-top:1px;">${esc(p.exA.ta)}</div><div style="color:var(--muted);font-size:11.5px;">${esc(p.exA.en)}</div></div>
            <div><div class="hi" style="font-size:13px;">${esc(p.exB.hi)}</div><div class="ta" style="font-size:11.5px;margin-top:1px;">${esc(p.exB.ta)}</div><div style="color:var(--muted);font-size:11.5px;">${esc(p.exB.en)}</div></div>
          </div>
        </div>
      `));
    });
    wrap.appendChild(details);
  });
  const verbPairs = renderGrammarRef("lookalikes");
  if (verbPairs.children.length){
    any = true;
    wrap.appendChild(el(`<div style="color:var(--indigo);font-size:13px;font-weight:700;margin:14px 2px 6px;">Verbs that look alike</div>`));
    Array.from(verbPairs.childNodes).forEach(ch=>wrap.appendChild(ch));
  }
  if (!any) wrap.appendChild(el(`<p class="empty">No pairs match${q?` "${esc(q)}"`:""}.</p>`));
  return wrap;
}

/* "Formula Lab" — the one home for every sentence formula in the app (the old compact
   "20 sentence formulas" accordion in Grammar was folded in here: its Devanagari form, its
   course-note comment and its 📓 class-note examples all show below).
   Every formula gets 10 worked examples, graded 🟢 easy → 🟡 medium → 🔴 hard/natural, plus a
   one-line real-life note on when you'd actually reach for it. */
function renderFormulaLab(){
  const q = APP.lib.q.trim().toLowerCase();
  const wrap = el(`<div class="stack"></div>`);
  const match = (...vals) => !q || vals.some(v => (v||"").toLowerCase().includes(q));
  const levelTag = {easy:"🟢", medium:"🟡", hard:"🔴"};
  // Course-note extras (Devanagari form, the teacher's comment, which examples were written in class)
  const orig = {};
  SENTENCE_FORMULA_CATEGORIES.forEach(c=>c.formulas.forEach(f=>{ orig[f.num] = f; }));

  wrap.appendChild(el(`
    <div class="card card-tight" style="margin-bottom:4px;">
      <div style="color:var(--muted);font-size:12.5px;">Every sentence formula, worked all the way through — 10 examples each (🟢 easy → 🟡 medium → 🔴 natural/difficult), plus a note on when you'd actually use it. Formulas 1–20 are from your course notes (📓 = written in class); 21–28 are extras, several built from a real class conversation. Quick one-line patterns are at the bottom.</div>
    </div>
  `));

  let any = false;
  FORMULA_LAB.forEach(c=>{
    const formulas = c.formulas.filter(f=>{ const o = orig[f.num] || {}; return match(f.title, f.formula, f.realLife, o.dev, o.note, ...f.examples.flatMap(e=>[e.hi,e.ta,e.en])); });
    if (!formulas.length) return;
    any = true;
    const catHeader = el(`<div style="color:var(--indigo);font-size:13px;font-weight:700;margin:14px 2px 6px;">${esc(c.cat)}</div>`);
    wrap.appendChild(catHeader);
    formulas.forEach(f=>{
      const details = el(`<details class="acc card" ${q?"open":""}><summary>${f.num}. ${esc(f.title)} <span class="tag">${f.examples.length}</span></summary>
        <div class="hi hi-line" style="font-size:14px;margin-top:2px;">${esc(f.formula)}</div>
        ${orig[f.num] ? `<div style="color:var(--muted);font-size:11.5px;margin-top:2px;">${esc(orig[f.num].dev)}</div><div style="color:var(--muted);font-size:12px;margin-top:5px;">📓 ${esc(orig[f.num].note)}</div>` : ""}
        <div style="color:var(--muted);font-size:12px;margin-top:6px;background:var(--surface2,rgba(0,0,0,.03));border-radius:8px;padding:6px 8px;">💡 <b>Real-life use:</b> ${esc(f.realLife)}</div>
        <div class="formula-ex-list" style="margin-top:10px;"></div>
      </details>`);
      const holder = $(".formula-ex-list", details);
      const classHi = new Set(((orig[f.num]||{}).examples||[]).filter(x=>x.source).map(x=>x.hi));
      f.examples.forEach(e=>{
        holder.appendChild(el(`
          <div class="sentence-item" style="margin-bottom:6px;">
            <div class="row-between" style="align-items:flex-start;">
              <div class="hi" style="font-size:13.5px;">${classHi.has(e.hi)?"📓 ":""}${esc(e.hi)}</div>
              <span class="tag" style="flex-shrink:0;" title="${esc(e.level)}">${levelTag[e.level]||""}</span>
            </div>
            <div class="ta" style="font-size:12.5px;margin-top:1px;">${esc(e.ta)}</div>
            <div style="color:var(--muted);font-size:12px;">${esc(e.en)}</div>
          </div>
        `));
      });
      wrap.appendChild(details);
    });
  });
  const quick = renderGrammarRef("patterns");
  if (quick.children.length){
    any = true;
    wrap.appendChild(el(`<div style="color:var(--indigo);font-size:13px;font-weight:700;margin:14px 2px 6px;">⚡ Quick patterns — one-line cheat sheet</div>`));
    Array.from(quick.childNodes).forEach(ch=>wrap.appendChild(ch));
  }
  if (!any) wrap.appendChild(el(`<p class="empty">No formulas match${q?` "${esc(q)}"`:""}.</p>`));
  return wrap;
}

function renderScenarioList(){
  const q = APP.lib.q.trim().toLowerCase();
  const wrap = el(`<div class="stack"></div>`);
  const match = (...vals) => !q || vals.some(v => (v||"").toLowerCase().includes(q));
  let any = false;
  SCENARIOS.forEach(sc => {
    const hit = match(sc.title, sc.context) || sc.lines.some(l => match(l.en, l.hi, l.ta));
    if (!hit) return;
    any = true;
    const details = el(`<details class="acc card" ${q?"open":""}><summary>${sc.icon||"💬"} ${esc(sc.title)} <span class="tag">${sc.lines.length}</span></summary>
      <div style="color:var(--muted);font-size:12.5px;margin-bottom:10px;">${esc(sc.context)}</div>
      <div class="lc-turns"></div></details>`);
    const holder = $(".lc-turns", details);
    sc.lines.forEach(l => {
      const isYou = l.sp !== "other";
      const label = isYou ? "You" : (sc.otherRole || "Other");
      holder.appendChild(el(`
        <div class="convo-turn ${isYou?"you":"other"}">
          <div class="row-between">
            <div class="who">${esc(label)}</div>
            <span class="row" style="gap:2px;">
              <button class="icon-btn" data-speak="${esc(l.hi)}" title="Listen">🔊</button>
              <button class="icon-btn" data-explain="${esc(l.hi)}" title="Explain">🎓</button>
            </span>
          </div>
          <div class="ct-en">${esc(l.en)}</div>
          <div class="ct-hi hi-line">${esc(l.hi)}</div>
          ${l.ta? `<div class="ct-ta">${esc(l.ta)}</div>`:""}
          ${l.note? `<div style="color:var(--muted);font-size:11.5px;margin-top:3px;">${esc(l.note)}</div>`:""}
        </div>
      `));
    });
    wrap.appendChild(details);
  });
  if (!any) wrap.appendChild(el(`<p class="empty">No scenarios match "${esc(q)}".</p>`));
  return wrap;
}

function renderSentenceList(){
  const q = APP.lib.q.trim().toLowerCase();
  let list = SENTENCES_300;
  if (APP.lib.cat !== "all") list = list.filter(s=>s.c===APP.lib.cat);
  if (q) list = list.filter(s => s.en.toLowerCase().includes(q) || s.hi.toLowerCase().includes(q) || (s.ta||"").toLowerCase().includes(q));

  const cats = el(`<div class="chip-row" style="margin-bottom:12px;">
    <button class="chip ${APP.lib.cat==='all'?'active':''}" data-cat="all">All (${SENTENCES_300.length})</button>
    ${CATEGORIES_300.map(c=>`<button class="chip ${APP.lib.cat===c.code?'active':''}" data-cat="${c.code}">${esc(c.label)}</button>`).join("")}
  </div>`);

  const wrap = el(`<div></div>`);
  wrap.appendChild(cats);
  if (!list.length){ wrap.appendChild(el(`<p class="empty">No sentences match "${esc(q)}".</p>`)); return wrap; }

  const card = el(`<div class="card"><div class="list-flat"></div></div>`);
  const holder = $(".list-flat", card);
  list.slice(0,120).forEach(s => {
    const fav = !!(DB.favorites && DB.favorites[s.n]);
    holder.appendChild(el(`
      <div class="sentence-item">
        <div class="row-between"><span class="en">#${s.n} ${esc(s.en)}</span>
          <span class="row" style="gap:2px;">
            <button class="icon-btn" data-fav="${s.n}" title="${fav?'Remove from saved':'Save'}" style="${fav?'color:var(--marigold);':''}">${fav?'★':'☆'}</button>
            <button class="icon-btn" data-speak="${esc(s.hi)}" title="Listen">🔊</button>
            <button class="icon-btn" data-explain="${esc(s.hi)}" title="Explain">🎓</button>
          </span>
        </div>
        ${s.ta? `<div class="ta">${esc(s.ta)}</div>`:""}
        <div class="hi hi-line">${esc(s.hi)}</div>
      </div>
    `));
  });
  wrap.appendChild(card);
  if (list.length>120) wrap.appendChild(el(`<p class="empty">Showing first 120 of ${list.length} — narrow your search to see more.</p>`));
  return wrap;
}

function renderSavedList(){
  const q = APP.lib.q.trim().toLowerCase();
  const favIds = Object.keys(DB.favorites||{}).map(Number);
  let list = SENTENCES_300.filter(s => favIds.includes(s.n));
  if (q) list = list.filter(s => s.en.toLowerCase().includes(q) || s.hi.toLowerCase().includes(q) || (s.ta||"").toLowerCase().includes(q));
  const wrap = el(`<div></div>`);
  if (!list.length){
    wrap.appendChild(el(`<p class="empty">${favIds.length? 'No saved sentences match your search.' : 'Nothing saved yet — tap ☆ next to any sentence to add it here.'}</p>`));
    return wrap;
  }
  const card = el(`<div class="card"><div class="list-flat"></div></div>`);
  const holder = $(".list-flat", card);
  list.forEach(s => {
    holder.appendChild(el(`
      <div class="sentence-item">
        <div class="row-between"><span class="en">#${s.n} ${esc(s.en)}</span>
          <span class="row" style="gap:2px;">
            <button class="icon-btn" data-fav="${s.n}" title="Remove from saved" style="color:var(--marigold);">★</button>
            <button class="icon-btn" data-speak="${esc(s.hi)}" title="Listen">🔊</button>
            <button class="icon-btn" data-explain="${esc(s.hi)}" title="Explain">🎓</button>
          </span>
        </div>
        ${s.ta? `<div class="ta">${esc(s.ta)}</div>`:""}
        <div class="hi hi-line">${esc(s.hi)}</div>
      </div>
    `));
  });
  wrap.appendChild(card);
  return wrap;
}

function renderTasksList(qIn){
  const q = (qIn !== undefined ? qIn : APP.lib.q).trim().toLowerCase();
  const wrap = el(`<div class="stack"></div>`);
  TASKS.forEach(t => {
    let items = t.items;
    if (q) items = items.filter(it => (it.en||"").toLowerCase().includes(q) || (it.ta||"").toLowerCase().includes(q) || (it.hi||"").toLowerCase().includes(q));
    if (!items.length) return;
    const details = el(`<details class="acc card"><summary>Task ${t.id} — ${esc(t.title)} <span class="tag">${items.length}</span></summary><div class="list-flat"></div></details>`);
    const holder = $(".list-flat", details);
    items.forEach(it => {
      const explainVal = esc(it.hi || it.en);
      holder.appendChild(el(`
        <div class="sentence-item">
          ${it.ta? `<div class="ta">${esc(it.ta)}</div>`:""}
          ${it.hi? `<div class="hi hi-line">${esc(it.hi)}</div>`:""}
          <div class="row-between" style="margin-top:2px;"><span style="color:var(--muted);font-size:13px;">${esc(it.en)}</span><button class="icon-btn" data-explain="${explainVal}" title="Explain">🎓</button></div>
        </div>
      `));
    });
    wrap.appendChild(details);
  });
  if (!wrap.children.length) wrap.appendChild(el(`<p class="empty">No tasks match "${esc(q)}".</p>`));
  return wrap;
}

function renderVerbList(){
  const q = APP.lib.q.trim().toLowerCase();
  let list = VERB_BANK;
  if (q) list = list.filter(v => v.en.toLowerCase().includes(q) || v.root.toLowerCase().includes(q)
    || (v.habitual||"").toLowerCase().includes(q) || (v.future||"").toLowerCase().includes(q) || (v.past||"").toLowerCase().includes(q));
  const card = el(`<div class="card"><div class="list-flat"></div></div>`);
  const holder = $(".list-flat", card);
  list.forEach(v => {
    holder.appendChild(el(`
      <div class="sentence-item">
        <div class="row-between"><span class="en" style="text-transform:capitalize;">${esc(v.en)}</span>
          <span class="row" style="gap:2px;">
            <button class="icon-btn" data-speak="${esc(v.request)}" title="Listen">🔊</button>
            <button class="icon-btn" data-explain="${esc(v.request)} (${esc(v.root)})" title="Explain">🎓</button>
          </span>
        </div>
        <div class="row" style="margin-top:6px;gap:14px;flex-wrap:wrap;">
          <span class="tag">root: <b class="hi" style="text-transform:none;">${esc(v.root)}</b></span>
          <span class="tag tag-marigold">order: ${esc(v.order)}</span>
          <span class="tag tag-good">request: ${esc(v.request)}</span>
        </div>
        ${v.habitual? `
        <div class="row" style="margin-top:6px;gap:10px;flex-wrap:wrap;font-size:12.5px;">
          <span style="color:var(--muted);">general: <b class="hi" style="text-transform:none;color:var(--ink);">${esc(v.habitual)}</b></span>
          <span style="color:var(--muted);">now: <b class="hi" style="text-transform:none;color:var(--ink);">${esc(v.continuous)}</b></span>
          <span style="color:var(--muted);">future: <b class="hi" style="text-transform:none;color:var(--ink);">${esc(v.future)}</b></span>
          <span style="color:var(--muted);">past: <b class="hi" style="text-transform:none;color:var(--ink);">${esc(v.past)}</b></span>
          <span style="color:var(--muted);">should/let's: <b class="hi" style="text-transform:none;color:var(--ink);">${esc(v.subjunctive)}</b></span>
        </div>`:""}
        ${v.note? `<div style="color:var(--muted);font-size:12px;margin-top:4px;">${esc(v.note)}</div>`:""}
      </div>
    `));
  });
  const wrap = el(`<div></div>`);
  wrap.appendChild(el(`<div class="card" style="border:1px solid var(--line);margin-bottom:10px;">
    <p style="color:var(--muted);font-size:12.5px;margin:0;">${list.length} verbs · order = informal (tum), request = polite (aap). Each verb also shows its core tenses (3rd person "woh" form — he/she/it): <b>general</b> (habitual/routine), <b>now</b> (present continuous), <b>future</b>, <b>past</b>, and <b>should/let's</b> (subjunctive). To see the same forms across all 6 persons, open the <b>Tense family</b> table just below.</p>
  </div>`));
  wrap.appendChild(card);
  return wrap;
}

function renderGrammarRef(part){
  part = part || "grammar";
  const q = APP.lib.q.trim().toLowerCase();
  const wrap = el(`<div class="stack"></div>`);
  function match(...vals){ return !q || vals.some(v => (v||"").toLowerCase().includes(q)); }

  // Short orientation note (only when not searching, so it doesn't clutter filtered results)
  const PART_INTRO = {
    words:   "The smallest pieces. Start with <b>Question words</b> and <b>Numbers</b> — nearly every sentence leans on them. The rest you can dip into as you meet the words.",
    grammar: "The <i>why</i> behind sentences. <span style=\"color:var(--good);\">🟢 Start here</span> = commands and the little linking words (postpositions). <span style=\"color:var(--marigold);\">🟡 Building sentences</span> = patterns once the basics feel natural. <span style=\"color:var(--violet);\">🔴 Advanced</span> = nuance to check back on later — no need to memorise up front.",
    verbs:   "Open the <b>Verb bank</b> first for a verb's five core forms. Then use <b>Tenses</b> to see how the shapes work for every person, and <b>Exceptions</b> when a verb refuses to follow the pattern.",
  };
  if (!q && PART_INTRO[part]) wrap.appendChild(el(`
    <div class="card" style="border:1px solid var(--line);">
      <p style="font-size:12.5px;color:var(--muted);">${PART_INTRO[part]}</p>
    </div>`));

  function taLine(x){ return x.ta ? `<div class="ta" style="margin-top:2px;font-size:12.5px;">${esc(x.ta)}${x.tanglish?` <span style="color:var(--muted);">(${esc(x.tanglish)})</span>`:""}</div>` : ""; }

  const qw = QUESTION_WORDS.filter(q2=>match(q2.hi,q2.en,q2.ta,q2.tanglish));
  const accQw = qw.length ? el(`
    <details class="acc card" open><summary>Question words <span class="tag">${qw.length}</span></summary>
      <div class="list-flat">${qw.map(p=>`<div class="sentence-item"><div class="row-between"><span class="hi hi-line">${esc(p.hi)}</span><span style="color:var(--muted);">${esc(p.en)}</span></div>${taLine(p)}</div>`).join("")}</div>
    </details>`) : null;

  const nouns = NOUN_GENDER.filter(w=>match(w.hi,w.en,w.ta,w.tanglish));
  const adjs = ADJECTIVE_GENDER.filter(a=>match(a.m,a.f,a.en,a.ta,a.tanglish));
  const verbGender = VERB_GENDER_EXAMPLES.filter(v=>match(v.pattern,v.m,v.f));
  const accGender = (nouns.length || adjs.length || verbGender.length) ? el(`
    <details class="acc card"><summary>Gender table — masculine / feminine <span class="tag">${nouns.length+adjs.length}</span></summary>
      <div style="color:var(--muted);font-size:12px;margin-bottom:6px;">Common words</div>
      <div class="list-flat">${nouns.map(w=>`<div class="sentence-item"><div class="row-between"><span class="hi hi-line">${esc(w.hi)}</span><span style="color:var(--muted);">${esc(w.en)} <span class="tag ${w.g==='m'?'tag-marigold':'tag-good'}">${w.g==='m'?'M':'F'}</span></span></div>${taLine(w)}</div>`).join("")}</div>
      ${adjs.length?`<div style="color:var(--muted);font-size:12px;margin:12px 0 6px;">Adjectives (change ending by gender)</div>
      <div class="list-flat">${adjs.map(a=>`<div class="sentence-item"><div class="en">${esc(a.en)}</div><div class="hi" style="font-size:14px;margin-top:2px;">${esc(a.m)} <span class="tag tag-marigold">M</span> &nbsp;/&nbsp; ${esc(a.f)} <span class="tag tag-good">F</span></div>${taLine(a)}</div>`).join("")}</div>`:""}
      ${verbGender.length?`<div style="color:var(--muted);font-size:12px;margin:12px 0 6px;">Verb forms agree with gender too</div>
      <div class="list-flat">${verbGender.map(v=>`<div class="sentence-item"><div class="en">${esc(v.pattern)}</div><div class="hi" style="font-size:13.5px;margin-top:3px;">${esc(v.m)}</div><div class="hi" style="font-size:13.5px;">${esc(v.f)}</div></div>`).join("")}</div>`:""}
    </details>`) : null;

  const poss = POSSESSION_PATTERNS.filter(p=>match(p.hi,p.en,p.ta,p.tanglish));
  const accPoss = poss.length ? el(`
    <details class="acc card"><summary>Possession &amp; "have/need" <span class="tag">${poss.length}</span></summary>
      <div class="list-flat">${poss.map(p=>`<div class="sentence-item"><div class="row-between"><span class="hi hi-line">${esc(p.hi)}</span><span style="color:var(--muted);">${esc(p.en)}</span></div>${taLine(p)}</div>`).join("")}
      <div class="sentence-item"><div style="color:var(--muted);font-size:12.5px;">Examples</div>${POSSESSION_EXAMPLES.map(e=>`<div class="hi" style="font-size:13.5px;margin-top:4px;">${esc(e.hi)} <span style="color:var(--muted);font-family:'Noto Sans';">— ${esc(e.en)}</span></div>`).join("")}</div>
      </div>
    </details>`) : null;

  const cmd = COMMANDS_TABLE.filter(c=>match(c.en,c.tum,c.aap,c.ta,c.tanglish));
  const accCmd = cmd.length ? el(`
    <details class="acc card"><summary>Commands: informal vs polite <span class="tag">${cmd.length}</span></summary>
      <div class="list-flat">${cmd.map(c=>`<div class="sentence-item"><div class="row-between"><span>${esc(c.en)}</span><span class="hi">${esc(c.tum)} <span style="color:var(--muted);">/</span> ${esc(c.aap)}</span></div>${taLine(c)}</div>`).join("")}
      <div class="sentence-item"><div style="color:var(--muted);font-size:12.5px;margin-bottom:4px;">Softer polite ("-gaa", for gentle instructions)</div>${SOFT_POLITE.map(s=>`<div style="margin-top:4px;"><div class="hi" style="font-size:13.5px;">${esc(s.hi)} <span style="color:var(--muted);font-family:'Noto Sans';">— ${esc(s.en)}</span></div>${taLine(s)}</div>`).join("")}</div>
      </div>
    </details>`) : null;

  const dems = DEMONSTRATIVES.filter(d=>match(d.hi,d.en,d.ta,d.tanglish));
  const accDems = dems.length ? el(`
    <details class="acc card"><summary>Yeh / Woh family <span class="tag">${dems.length}</span></summary>
      <div class="list-flat">${dems.map(d=>`<div class="sentence-item"><div class="row-between"><span class="hi hi-line">${esc(d.hi)}</span><span style="color:var(--muted);">${esc(d.en)}</span></div>${taLine(d)}</div>`).join("")}</div>
    </details>`) : null;

  const ready = READY_PHRASES.filter(r=>match(r.hi,r.en,r.ta));
  const accReady = ready.length ? el(`
    <details class="acc card"><summary>Ready-made spoken phrases <span class="tag">${ready.length}</span></summary>
      <div class="list-flat">${ready.map(r=>`<div class="sentence-item"><div class="hi hi-line" style="font-size:15px;">${esc(r.hi)}</div><div class="ta" style="margin-top:2px;">${esc(r.ta)}</div><div style="color:var(--muted);font-size:12.5px;">${esc(r.en)}</div></div>`).join("")}</div>
    </details>`) : null;

  const post = POSTPOSITIONS.filter(p=>match(p.hi,p.en,p.ta,p.tanglish));
  const accPost = post.length ? el(`
    <details class="acc card"><summary>Postpositions <span class="tag">${post.length}</span></summary>
      <div class="list-flat">${post.map(p=>`<div class="sentence-item"><div class="row-between"><span class="hi hi-line">${esc(p.hi)}</span><span style="color:var(--muted);">${esc(p.en)}</span></div>${taLine(p)}</div>`).join("")}</div>
    </details>`) : null;

  const nums = NUMBERS_TABLE.filter(x=>match(String(x.n),x.hi,x.ta,x.en));
  const accNumbers = nums.length ? el(`
    <details class="acc card"><summary>Numbers 0–100 <span class="tag">${nums.length}</span></summary>
      <div class="list-flat" style="max-height:420px;overflow-y:auto;">${nums.map(x=>`
        <div class="sentence-item row-between"><span style="color:var(--muted);width:34px;display:inline-block;">${x.n}</span><span class="hi hi-line">${esc(x.hi)}</span><span class="ta" style="text-align:right;">${esc(x.ta)}</span></div>`).join("")}</div>
    </details>`) : null;

  const vocab = VOCAB_WORDS.filter(v=>match(v.hi,v.dev,v.ta,v.en));
  const accVocab = vocab.length ? el(`
    <details class="acc card"><summary>Vocabulary — everyday words <span class="tag">${vocab.length}</span></summary>
      <div class="list-flat">${vocab.map(v=>`
        <div class="sentence-item"><div class="row-between"><span class="hi hi-line">${esc(v.hi)}</span><span style="color:var(--muted);">${esc(v.en)}</span></div>
          <div style="color:var(--muted);font-size:12px;margin-top:2px;">${esc(v.dev)}</div>
          <div class="ta" style="margin-top:2px;">${esc(v.ta)}</div>
        </div>`).join("")}</div>
    </details>`) : null;

  // ---------------- Tier 2: building sentences ----------------
  const patterns = QUICK_PATTERNS.filter(p=>match(p.name,p.formula,p.example));
  const accPatterns = patterns.length ? el(`
    <details class="acc card"><summary>Quick grammar patterns <span class="tag">${patterns.length}</span></summary>
      <div class="list-flat">${patterns.map(p=>`
        <div class="sentence-item"><div class="en">${esc(p.name)}</div>
          <div class="hi hi-line" style="font-size:14px;">${esc(p.formula)}</div>
          <div style="color:var(--muted);font-size:12.5px;margin-top:3px;">${esc(p.example)}</div>
          ${p.tamilCue?`<div class="ta" style="margin-top:4px;font-size:12.5px;">${esc(p.tamilCue)}</div>`:""}
        </div>`).join("")}</div>
    </details>`) : null;

  const koks = KO_KE_SE.filter(k=>match(k.word,k.desc));
  const accKoks = koks.length ? el(`
    <details class="acc card"><summary>Ko vs Ke vs Se <span class="tag">3</span></summary>
      <div class="list-flat">${koks.map(k=>`
        <div class="sentence-item"><div class="en"><b>${esc(k.word)}</b> — ${esc(k.desc)}</div>
          <div class="ta" style="margin-top:2px;">Tamil cue: ${esc(k.tamilCue)}</div>
          <div style="margin-top:6px;">${k.examples.map(ex=>`<div class="hi" style="font-size:13.5px;">${esc(ex.hi)} <span style="color:var(--muted);font-family:'Noto Sans';">— ${esc(ex.en)}${ex.ta?` (${esc(ex.ta)})`:""}</span></div>`).join("")}</div>
        </div>`).join("")}</div>
    </details>`) : null;

  const hindiTamilCues = HINDI_TAMIL_CUES.filter(c=>match(c.hindi,c.tamilSound,c.meaning,c.example,c.note));
  const cheatsheet = TAMIL_ENDING_CHEATSHEET.filter(c=>match(c.tamilEnding,c.tense,c.hindiFormula,c.example));
  const accCues = (hindiTamilCues.length || cheatsheet.length) ? el(`
    <details class="acc card"><summary>Hindi ↔ Tamil sound cues <span class="tag">${hindiTamilCues.length}</span></summary>
      <div style="color:var(--muted);font-size:12px;margin-bottom:8px;">Straight from class notes: how a Tamil verb's ending sound tells you which Hindi construction to use.</div>
      ${cheatsheet.length?`
      <div style="color:var(--muted);font-size:12px;font-weight:700;margin-bottom:6px;">Cheat sheet — match the ending sound</div>
      <div class="list-flat" style="margin-bottom:14px;">${cheatsheet.map(c=>`
        <div class="sentence-item row-between"><span class="ta" style="font-size:13.5px;">${esc(c.tamilEnding)}</span><span style="color:var(--muted);font-size:12px;text-align:right;">${esc(c.tense)}</span></div>
        <div style="font-size:12px;color:var(--muted);margin:-2px 0 6px;">${esc(c.hindiFormula)} &nbsp;·&nbsp; <span style="color:var(--ink);">${esc(c.example)}</span></div>`).join("")}</div>`:""}
      <div class="list-flat">${hindiTamilCues.map(c=>`
        <div class="sentence-item"><div class="en"><b>${esc(c.hindi)}</b> — ${esc(c.meaning)}</div>
          <div class="ta" style="margin-top:3px;">Tamil sound: ${esc(c.tamilSound)}</div>
          <div class="hi" style="font-size:13.5px;margin-top:5px;">${esc(c.example)}</div>
          <div style="color:var(--muted);font-size:12px;margin-top:4px;">${esc(c.note)}</div>
        </div>`).join("")}</div>
    </details>`) : null;

  const cmdFormula = COMMAND_FORMULA_TABLE.filter(c=>match(c.formula,c.use,c.example));
  const accCmdFormula = cmdFormula.length ? el(`
    <details class="acc card"><summary>Rule formulas — command family <span class="tag">${cmdFormula.length}</span></summary>
      <div class="list-flat">${cmdFormula.map(c=>`
        <div class="sentence-item"><div class="hi hi-line" style="font-size:15px;">${esc(c.formula)}</div>
          <div style="color:var(--muted);font-size:12.5px;margin-top:2px;">${esc(c.use)}</div>
          <div style="font-size:13px;margin-top:4px;">${esc(c.example)}</div>
        </div>`).join("")}</div>
    </details>`) : null;

  const futPara = FUTURE_PARADIGM.filter(p=>match(p.person,p.m,p.f,p.note));
  const accFutPara = futPara.length ? el(`
    <details class="acc card"><summary>Future tense — full table (root: aana) <span class="tag">${futPara.length}</span></summary>
      <div class="list-flat">${futPara.map(p=>`
        <div class="sentence-item"><div class="en">${esc(p.person)}</div>
          <div class="hi" style="font-size:14.5px;margin-top:3px;">${esc(p.m)} <span style="color:var(--muted);">(m)</span> &nbsp;/&nbsp; ${esc(p.f)} <span style="color:var(--muted);">(f)</span></div>
          <div style="color:var(--muted);font-size:12px;margin-top:2px;">${esc(p.note)}</div>
        </div>`).join("")}</div>
    </details>`) : null;

  const subjPara = SUBJUNCTIVE_PARADIGM.filter(p=>match(p.person,p.future,p.subjunctive,p.note));
  const subjEx = SUBJUNCTIVE_EXAMPLES.filter(e=>match(e.cat,e.hi,e.ta,e.tanglish,e.en));
  const subjCatOrder = [];
  subjEx.forEach(e=>{ if (subjCatOrder.indexOf(e.cat)===-1) subjCatOrder.push(e.cat); });
  const accSubjunctive = (subjPara.length || subjEx.length) ? el(`
    <details class="acc card"><summary>"Should I / let's" — subjunctive (karoon-type) <span class="tag">${subjEx.length}</span></summary>
      <div style="color:var(--muted);font-size:12px;margin-bottom:8px;">${esc(SUBJUNCTIVE_SHORTCUT_NOTE)}</div>
      ${subjPara.length?`
      <div class="list-flat" style="margin-bottom:6px;">${subjPara.map(p=>`
        <div class="sentence-item"><div class="en">${esc(p.person)}</div>
          <div class="row-between" style="margin-top:3px;"><span style="color:var(--muted);font-size:12px;">Future: ${esc(p.future)}</span><span class="hi" style="font-size:14.5px;">→ ${esc(p.subjunctive)}</span></div>
          <div style="color:var(--muted);font-size:12px;margin-top:3px;">${esc(p.note)}</div>
        </div>`).join("")}</div>`:""}
      ${subjCatOrder.map(cat=>`
        <div style="color:var(--muted);font-size:12.5px;font-weight:700;margin:14px 0 6px;">${esc(cat)}</div>
        <div class="list-flat">${subjEx.filter(e=>e.cat===cat).map(e=>`
          <div class="sentence-item"><div class="hi hi-line" style="font-size:14px;">${esc(e.hi)}</div>
            <div class="ta" style="font-size:12.5px;margin-top:2px;">${esc(e.ta)} <span style="color:var(--muted);">(${esc(e.tanglish)})</span></div>
            <div style="color:var(--muted);font-size:12px;margin-top:2px;">${esc(e.en)}</div>
          </div>`).join("")}</div>`).join("")}
    </details>`) : null;

  const wala = WALA_SUFFIX.filter(w=>match(w.formula,w.use,w.examples));
  const accWala = wala.length ? el(`
    <details class="acc card"><summary>"-wala / -wali / -wale" suffix <span class="tag">${wala.length}</span></summary>
      <div class="list-flat">${wala.map(w=>`
        <div class="sentence-item"><div class="hi hi-line" style="font-size:15px;">${esc(w.formula)}</div>
          <div style="color:var(--muted);font-size:12.5px;margin-top:2px;">${esc(w.use)}</div>
          <div style="font-size:13px;margin-top:4px;">${esc(w.examples)}</div>
        </div>`).join("")}</div>
    </details>`) : null;

  const compGroups = COMPOUND_VERB_GROUPS.filter(g=>match(g.v2,g.dev,g.meaningAdded,g.formula,g.note,g.contrastNote,g.distinctFrom,
    ...g.examples.flatMap(e=>[e.v1,e.compound,e.en]), ...g.sentences.flatMap(s=>[s.hi,s.ta,s.en])));
  const compContrasts = DO_VS_LO_CONTRASTS.filter(c=>match(c.a,c.aEn,c.b,c.bEn));
  const accCompound = (compGroups.length || compContrasts.length) ? el(`
    <details class="acc card"><summary>Compound / "friend" verbs — V1 + V2 <span class="tag">${compGroups.length}</span></summary>
      <div style="color:var(--muted);font-size:12px;margin-bottom:8px;">${esc(COMPOUND_VERB_INTRO)}</div>
      ${compGroups.map(g=>`
        <div style="color:var(--ink);font-size:14px;font-weight:700;margin:14px 0 2px;">${esc(g.v2)} <span style="color:var(--muted);font-weight:400;">(${esc(g.dev)})</span></div>
        <div style="color:var(--muted);font-size:12.5px;margin-bottom:6px;">${esc(g.meaningAdded)}</div>
        <div class="hi hi-line" style="font-size:13.5px;margin-bottom:8px;">${esc(g.formula)}</div>
        <div class="list-flat" style="margin-bottom:6px;">${g.examples.map(e=>`
          <div class="sentence-item row-between"><span style="color:var(--muted);">${esc(e.v1)}</span><span class="hi" style="font-size:14px;">${esc(e.compound)}</span><span style="color:var(--muted);text-align:right;">${esc(e.en)}</span></div>`).join("")}</div>
        ${g.sentences.length?`<div class="sentence-item" style="margin-bottom:6px;">${g.sentences.map(s=>`
          <div style="margin-top:6px;"><div class="hi" style="font-size:13.5px;">${esc(s.hi)}</div><div class="ta" style="font-size:12.5px;margin-top:1px;">${esc(s.ta)}</div><div style="color:var(--muted);font-size:12px;">${esc(s.en)}</div></div>`).join("")}</div>`:""}
        ${g.note?`<div class="sentence-item" style="margin-bottom:6px;"><div style="color:var(--muted);font-size:12px;"><b style="color:var(--indigo);">Note:</b> ${esc(g.note)}</div></div>`:""}
        ${g.contrastNote?`<div class="sentence-item" style="margin-bottom:6px;"><div style="color:var(--muted);font-size:12px;"><b style="color:var(--indigo);">Compare:</b> ${esc(g.contrastNote)}</div></div>`:""}
        ${g.distinctFrom?`<div class="sentence-item" style="margin-bottom:6px;"><div style="color:var(--muted);font-size:12px;"><b style="color:var(--indigo);">Distinction:</b> ${esc(g.distinctFrom)}</div></div>`:""}
      `).join("")}
      ${compContrasts.length?`<div style="color:var(--muted);font-size:12.5px;font-weight:700;margin:16px 0 6px;">"Do" vs "V+lena/dena" — bare command vs. a reminder/emphasis</div>
      <div class="list-flat">${compContrasts.map(c=>`
        <div class="sentence-item"><div class="row-between"><span class="hi" style="font-size:14px;">${esc(c.a)}</span><span style="color:var(--muted);font-size:12px;">${esc(c.aEn)}</span></div>
          <div class="row-between" style="margin-top:4px;"><span class="hi" style="font-size:14px;">${esc(c.b)}</span><span style="color:var(--muted);font-size:12px;">${esc(c.bEn)}</span></div>
        </div>`).join("")}</div>`:""}
    </details>`) : null;

  // ---------------- Tier 3: advanced reference ----------------
  const snapshots = VERB_TENSE_SNAPSHOTS.filter(v=>match(v.verb, ...v.rows.flatMap(r=>[r.hi,r.ta,r.tanglish,r.note])));
  const accSnapshots = snapshots.length ? el(`
    <details class="acc card"><summary>Verb tense snapshots — Hindi / Tamil / Tanglish <span class="tag">${snapshots.length}</span></summary>
      <div style="color:var(--muted);font-size:12px;margin-bottom:8px;">Same 6-box grid as the class-note picture: General → Present → Future (plain &amp; completive) → Past (plain &amp; completive), for two different verbs so the pattern generalizes.</div>
      ${snapshots.map(v=>`
        <div style="color:var(--ink);font-size:13.5px;font-weight:700;margin:14px 0 6px;">${esc(v.verb)}</div>
        <div class="list-flat">${v.rows.map(r=>`
          <div class="sentence-item" style="${r.tenseGroup.indexOf('Future')===0?'border-left:3px solid var(--violet);':r.tenseGroup.indexOf('Past')===0?'border-left:3px solid var(--saffron);':''}">
            <div class="row-between"><span class="hi hi-line" style="font-size:14.5px;">${esc(r.hi)}</span><span style="color:var(--muted);font-size:11.5px;">${esc(r.tenseGroup)}</span></div>
            <div class="ta" style="margin-top:3px;">${esc(r.ta)} <span style="color:var(--muted);">(${esc(r.tanglish)})</span></div>
            <div style="color:var(--muted);font-size:12px;margin-top:3px;">${esc(r.note)}</div>
          </div>`).join("")}</div>`).join("")}
      <div class="sentence-item" style="margin-top:6px;"><div style="color:var(--muted);font-size:12px;"><b style="color:var(--indigo);">The general rule:</b> ${esc(COMPLETIVE_RULE_NOTE)}</div></div>
    </details>`) : null;

  const lookalikes = LOOKALIKE_VERB_PAIRS.filter(p=>match(p.pair,p.root1,p.root2,p.distinction,p.memoryTrick, ...p.examples.flatMap(e=>[e.hi,e.ta,e.tanglish,e.en])));
  const accLookalikes = lookalikes.length ? el(`
    <details class="acc card"><summary>Look-alike verb pairs — don't mix these up <span class="tag">${lookalikes.length}</span></summary>
      <div style="color:var(--muted);font-size:12px;margin-bottom:8px;">Verbs that both gloss as the same English word but work differently — with the distinction, a memory trick, and worked examples.</div>
      ${lookalikes.map(p=>`
        <div class="sentence-item"><div class="en" style="font-size:14.5px;"><b>${esc(p.pair)}</b></div>
          <div style="font-size:12.5px;margin-top:4px;"><b>${esc(p.root1)}</b><br>${esc(p.root2)}</div>
          <div style="font-size:12.5px;margin-top:6px;">${esc(p.distinction)}</div>
          <div style="color:var(--indigo);font-size:12.5px;font-weight:700;margin-top:6px;">${esc(p.memoryTrick)}</div>
          <div style="margin-top:8px;">${p.examples.map(e=>`
            <div style="margin-top:6px;">
              <div class="hi" style="font-size:13.5px;">${esc(e.hi)}</div>
              <div class="ta" style="font-size:12.5px;margin-top:1px;">${esc(e.ta)} <span style="color:var(--muted);">(${esc(e.tanglish)})</span></div>
              <div style="color:var(--muted);font-size:12px;">${esc(e.en)}</div>
            </div>`).join("")}</div>
        </div>`).join("")}
    </details>`) : null;

  const tenseGroups = {};
  TENSE_FAMILY.filter(t=>match(t.group,t.subtype,t.formula,t.hi,t.en,t.use,t.trigger)).forEach(t=>{
    (tenseGroups[t.group] = tenseGroups[t.group] || []).push(t);
  });
  const tenseOrder = ["Present","Past","Future"].filter(g=>tenseGroups[g]);
  const tenseCount = tenseOrder.reduce((n,g)=>n+tenseGroups[g].length,0);
  const accTenseFamily = tenseOrder.length ? el(`
    <details class="acc card"><summary>Full tense family — present / past / future, with WHY <span class="tag">${tenseCount}</span></summary>
      <div style="color:var(--muted);font-size:12px;margin-bottom:8px;">Every form uses one sample verb (peena = to drink) so the patterns line up. Each card explains WHY you'd pick that tense in a sentence, plus the trigger words that usually signal it.</div>
      ${tenseOrder.map(g=>`
        <div style="color:var(--muted);font-size:12.5px;font-weight:700;margin:14px 0 6px;">${esc(g)} tense</div>
        <div class="list-flat">${tenseGroups[g].map(t=>`
          <div class="sentence-item"><div class="en"><b>${esc(t.subtype)}</b></div>
            <div class="hi hi-line" style="font-size:14px;margin-top:3px;">${esc(t.formula)}</div>
            <div class="hi" style="font-size:14px;margin-top:6px;">${esc(t.hi)}</div>
            <div style="color:var(--muted);font-size:12.5px;margin-top:1px;">${esc(t.en)}</div>
            <div style="font-size:12.5px;margin-top:6px;"><b style="color:var(--indigo);">Why:</b> ${esc(t.use)}</div>
            <div style="color:var(--muted);font-size:12px;margin-top:3px;"><b>Trigger words:</b> ${esc(t.trigger)}</div>
          </div>`).join("")}</div>`).join("")}
      ${TENSE_TRAPS.length?`<div style="color:var(--muted);font-size:12.5px;font-weight:700;margin:16px 0 6px;">Common mix-ups (examiner traps)</div>
      <div class="list-flat">${TENSE_TRAPS.map(x=>`<div class="sentence-item"><div class="en"><b>${esc(x.mixup)}</b></div><div style="color:var(--muted);font-size:12.5px;margin-top:3px;">${esc(x.note)}</div></div>`).join("")}</div>`:""}
    </details>`) : null;

  const futIrr = FUTURE_IRREGULARS.filter(x=>match(x.root,x.main_m,x.main_f,x.woh_m,x.woh_f,x.note));
  const accFutIrr = futIrr.length ? el(`
    <details class="acc card"><summary>Future tense exceptions — lena &amp; dena <span class="tag">${futIrr.length}</span></summary>
      <div class="list-flat">${futIrr.map(x=>`
        <div class="sentence-item"><div class="en">${esc(x.root)}</div>
          <div class="hi" style="font-size:14px;margin-top:3px;">Main: ${esc(x.main_m)} / ${esc(x.main_f)} &nbsp;·&nbsp; Woh: ${esc(x.woh_m)} / ${esc(x.woh_f)}</div>
          <div style="color:var(--muted);font-size:12px;margin-top:2px;">${esc(x.note)}</div>
        </div>`).join("")}</div>
    </details>`) : null;

  const exGroups = {};
  EXCEPTIONS_TABLE.filter(x=>match(x.tense,x.verb,x.m,x.f,x.pl,x.note,x.regularPattern)).forEach(x=>{
    (exGroups[x.tense] = exGroups[x.tense] || []).push(x);
  });
  const exTenses = Object.keys(exGroups);
  const accExceptions = exTenses.length ? el(`
    <details class="acc card"><summary>Exceptions — irregular verbs by tense <span class="tag">${EXCEPTIONS_TABLE.filter(x=>match(x.tense,x.verb,x.m,x.f,x.pl,x.note,x.regularPattern)).length}</span></summary>
      ${exTenses.map(t=>`
        <div style="color:var(--muted);font-size:12px;margin:12px 0 6px;">${esc(t)} — ${esc(exGroups[t][0].regularPattern)}</div>
        <div class="list-flat">${exGroups[t].map(x=>`
          <div class="sentence-item"><div class="en">${esc(x.verb)}</div>
            <div class="hi" style="font-size:14px;margin-top:3px;">${esc(x.m)} <span style="color:var(--muted);">(m)</span> &nbsp;/&nbsp; ${esc(x.f)} <span style="color:var(--muted);">(f)</span> &nbsp;/&nbsp; ${esc(x.pl)} <span style="color:var(--muted);">(pl)</span></div>
            <div style="color:${x.note&&x.note.indexOf('EXCEPTION')===0?'var(--bad)':'var(--muted)'};font-size:12px;margin-top:3px;">${esc(x.note)}</div>
          </div>`).join("")}</div>`).join("")}
    </details>`) : null;

  const neTable = ERGATIVE_NE_TABLE.filter(x=>match(x.pronoun,x.withNe,x.note));
  const neExamples = ERGATIVE_NE_EXAMPLES.filter(e=>match(e.hi,e.ta,e.tanglish,e.en));
  const accErgativeNe = (neTable.length || neExamples.length) ? el(`
    <details class="acc card"><summary>The "ne" marker — who did it (ergative past) <span class="tag">${neTable.length}</span></summary>
      <div style="color:var(--muted);font-size:12px;margin-bottom:8px;">${esc(ERGATIVE_NE_NOTE)}</div>
      ${neTable.length?`<div class="list-flat" style="margin-bottom:6px;">${neTable.map(x=>`
        <div class="sentence-item row-between"><span class="en">${esc(x.pronoun)}</span><span class="hi" style="font-size:14.5px;">${esc(x.withNe)}</span></div>
        <div style="color:var(--muted);font-size:12px;margin-top:-4px;margin-bottom:6px;">${esc(x.note)}</div>`).join("")}</div>`:""}
      ${neExamples.length?`<div style="color:var(--muted);font-size:12.5px;font-weight:700;margin:12px 0 6px;">Examples</div>
      <div class="list-flat">${neExamples.map(e=>`
        <div class="sentence-item"><div class="hi hi-line" style="font-size:14px;">${esc(e.hi)}</div>
          <div class="ta" style="font-size:12.5px;margin-top:2px;">${esc(e.ta)} <span style="color:var(--muted);">(${esc(e.tanglish)})</span></div>
          <div style="color:var(--muted);font-size:12px;margin-top:2px;">${esc(e.en)}</div>
        </div>`).join("")}</div>`:""}
    </details>`) : null;

  const pastPractice = PAST_PRACTICE_EXAMPLES.filter(e=>match(e.cat,e.hi,e.ta,e.tanglish,e.en));
  const pastCatOrder = [];
  pastPractice.forEach(e=>{ if (pastCatOrder.indexOf(e.cat)===-1) pastCatOrder.push(e.cat); });
  const accPastPractice = pastPractice.length ? el(`
    <details class="acc card"><summary>Past-tense practice — facts, hai→tha, simple past <span class="tag">${pastPractice.length}</span></summary>
      <div style="color:var(--muted);font-size:12px;margin-bottom:8px;">More worked sentences for the past tense: recounting what happened, switching "is" to "was", and plain simple-past verbs.</div>
      ${pastCatOrder.map(cat=>`
        <div style="color:var(--muted);font-size:12.5px;font-weight:700;margin:14px 0 6px;">${esc(cat)}</div>
        <div class="list-flat">${pastPractice.filter(e=>e.cat===cat).map(e=>`
          <div class="sentence-item"><div class="hi hi-line" style="font-size:14px;">${esc(e.hi)}</div>
            <div class="ta" style="font-size:12.5px;margin-top:2px;">${esc(e.ta)} <span style="color:var(--muted);">(${esc(e.tanglish)})</span></div>
            <div style="color:var(--muted);font-size:12px;margin-top:2px;">${esc(e.en)}</div>
          </div>`).join("")}</div>`).join("")}
    </details>`) : null;

  const tpFormulas = THIRD_PERSON_FORMULAS.filter(f=>match(f.formula,f.dev,f.en,f.example.hi,f.example.dev,f.example.ta,f.example.en));
  const tpExamples = THIRD_PERSON_EXAMPLES.filter(e=>match(e.cat,e.hi,e.dev,e.ta,e.en));
  const tpDialogues = THIRD_PERSON_DIALOGUES.filter(d=>match(d.title, ...d.lines.flatMap(l=>[l.hi,l.dev,l.ta,l.en])));
  const tpDistinction = THIRD_PERSON_DISTINCTION.lines.some(l=>match(l.hi,l.dev,l.ta,l.en)) ? THIRD_PERSON_DISTINCTION : null;
  const tpCatOrder = [];
  tpExamples.forEach(e=>{ if (tpCatOrder.indexOf(e.cat)===-1) tpCatOrder.push(e.cat); });
  const tpTotal = tpFormulas.length + tpExamples.length;
  const accThirdPerson = (tpFormulas.length || tpExamples.length || tpDialogues.length || tpDistinction) ? el(`
    <details class="acc card"><summary>Talking about someone else — jab bhi / woh hamesha... <span class="tag">${tpTotal}</span></summary>
      <div style="color:var(--muted);font-size:12px;margin-bottom:8px;">Natural spoken-Hindi patterns for describing a third person — habits, what they said, and speculating about them. Memorize the 8 formulas below; you can build hundreds of sentences from them.</div>
      ${tpFormulas.length?`
      <div style="color:var(--muted);font-size:12.5px;font-weight:700;margin:4px 0 6px;">The 8 reusable formulas</div>
      <div class="list-flat" style="margin-bottom:14px;">${tpFormulas.map(f=>`
        <div class="sentence-item"><div class="row-between"><span class="hi hi-line" style="font-size:15px;">${esc(f.formula)}</span><span style="color:var(--muted);">${esc(f.en)}</span></div>
          <div class="ta" style="margin-top:2px;font-size:12px;">${esc(f.dev)}</div>
          <div class="hi" style="font-size:13.5px;margin-top:6px;">${esc(f.example.hi)}</div>
          <div class="ta" style="font-size:12.5px;margin-top:1px;">${esc(f.example.ta)}</div>
          <div style="color:var(--muted);font-size:12px;">${esc(f.example.en)}</div>
        </div>`).join("")}</div>`:""}
      ${tpCatOrder.map(cat=>`
        <div style="color:var(--muted);font-size:12.5px;font-weight:700;margin:14px 0 6px;">${esc(cat)}</div>
        <div class="list-flat">${tpExamples.filter(e=>e.cat===cat).map(e=>`
          <div class="sentence-item"><div class="hi hi-line" style="font-size:14px;">${esc(e.hi)}</div>
            <div class="ta" style="font-size:12.5px;margin-top:2px;">${esc(e.ta)}</div>
            <div style="color:var(--muted);font-size:12px;margin-top:2px;">${esc(e.en)}</div>
          </div>`).join("")}</div>`).join("")}
      ${tpDialogues.length?`
      <div style="color:var(--muted);font-size:12.5px;font-weight:700;margin:14px 0 6px;">"Whenever she..." mini-dialogues</div>
      <div class="list-flat">${tpDialogues.map(d=>`
        <div class="sentence-item"><div class="en" style="margin-bottom:6px;"><b>${esc(d.title)}</b></div>
          ${d.lines.map(l=>`
          <div style="margin-top:6px;"><span class="tag" style="margin-right:6px;">${esc(l.sp)}</span><span class="hi" style="font-size:13.5px;">${esc(l.hi)}</span>
            <div class="ta" style="font-size:12px;margin-top:2px;margin-left:28px;">${esc(l.ta)}</div>
            <div style="color:var(--muted);font-size:12px;margin-left:28px;">${esc(l.en)}</div>
          </div>`).join("")}
        </div>`).join("")}</div>`:""}
      ${tpDistinction?`
      <div style="color:var(--muted);font-size:12.5px;font-weight:700;margin:14px 0 6px;">A useful distinction</div>
      <div class="sentence-item"><div style="color:var(--muted);font-size:12px;margin-bottom:6px;">${esc(tpDistinction.note)}</div>
        ${tpDistinction.lines.map(l=>`
        <div style="margin-top:6px;"><div class="hi" style="font-size:13.5px;">${esc(l.hi)}</div>
          <div class="ta" style="font-size:12px;margin-top:1px;">${esc(l.ta)}</div>
          <div style="color:var(--muted);font-size:12px;">${esc(l.en)}</div>
        </div>`).join("")}
      </div>`:""}
    </details>`) : null;

  const pronounPost = PRONOUN_POSTPOSITION_TABLE.filter(p=>match(p.pronoun,p.en,p.ta,p.ka,p.ki,p.ke,p.ko,p.ne,p.se,p.mein));
  const accPronounPost = pronounPost.length ? el(`
    <details class="acc card"><summary>Pronoun + postposition table — ka/ki/ke, ko, ne, se, mein <span class="tag">${pronounPost.length}</span></summary>
      <div style="color:var(--muted);font-size:12px;margin-bottom:8px;">Every pronoun's full set of oblique/possessive forms in one place — my/your/his (ka·ki·ke), to/for (ko), the ergative "did it" marker (ne), from/by/with (se), and in (mein).</div>
      <div class="list-flat">${pronounPost.map(p=>`
        <div class="sentence-item"><div class="row-between"><span class="en"><b>${esc(p.pronoun)}</b> — ${esc(p.en)}</span>${p.ta?`<span class="ta">${esc(p.ta)}</span>`:""}</div>
          <div style="margin-top:6px;font-size:13px;display:grid;grid-template-columns:1fr 1fr;gap:3px 10px;">
            <div><span style="color:var(--muted);">ka/ki/ke:</span> <span class="hi">${esc(p.ka)} / ${esc(p.ki)} / ${esc(p.ke)}</span></div>
            <div><span style="color:var(--muted);">ko:</span> <span class="hi">${esc(p.ko)}</span></div>
            <div><span style="color:var(--muted);">ne:</span> <span class="hi">${esc(p.ne)}</span></div>
            <div><span style="color:var(--muted);">se:</span> <span class="hi">${esc(p.se)}</span></div>
            <div><span style="color:var(--muted);">mein:</span> <span class="hi">${esc(p.mein)}</span></div>
          </div>
        </div>`).join("")}</div>
    </details>`) : null;

  // ---------------- Merge accordions that were covering the same ground ----------------
  // Several of the old accordions were slices of one topic (commands, postpositions, tense
  // tables, irregulars). Each group below becomes ONE accordion with labelled sub-headings:
  // every row of every original table is still there, just no longer scattered.
  function mergeAccs(title, parts, intro){
    const live = parts.filter(x=>x && x.node);
    if (!live.length) return null;
    const d = el(`<details class="acc card"><summary>${esc(title)} <span class="tag"></span></summary></details>`);
    if (intro) d.appendChild(el(`<div style="color:var(--muted);font-size:12px;margin-bottom:8px;">${esc(intro)}</div>`));
    let total = 0;
    live.forEach(x=>{
      const t = $(".tag", $("summary", x.node)); total += parseInt(t ? t.textContent : "0", 10) || 0;
      d.appendChild(el(`<div class="merge-head">${esc(x.label)}</div>`));
      Array.from(x.node.childNodes).forEach(ch=>{ if (ch.nodeName !== "SUMMARY") d.appendChild(ch); });
    });
    $(".tag", d).textContent = total;
    if (q) d.open = true;
    return d;
  }
  const accCommands = mergeAccs("Commands — informal, polite & soft", [
    {label:"Informal vs polite", node:accCmd},
    {label:"Rule formulas — the command family", node:accCmdFormula},
  ]);
  const accPostAll = mergeAccs("Postpositions — ko / ke / se, ka·ki·ke, ne, mein", [
    {label:"The basic postpositions", node:accPost},
    {label:"Ko vs Ke vs Se", node:accKoks},
    {label:"Every pronoun + postposition", node:accPronounPost},
  ]);
  const accTenses = mergeAccs("Tense family — present / past / future, with WHY", [
    {label:"The full family (sample verb: peena)", node:accTenseFamily},
    {label:"Future tense — full table (root: aana)", node:accFutPara},
  ]);
  const accIrregulars = mergeAccs("Exceptions — irregular verbs", [
    {label:"Irregular verbs by tense", node:accExceptions},
    {label:"Future exceptions — lena & dena", node:accFutIrr},
  ]);

  // ---------------- Assemble: each section shows only its own accordions ----------------
  let added = 0;
  function addTier(cls, label, items){
    const present = items.filter(Boolean);
    if (!present.length) return;
    if (cls) wrap.appendChild(el(`<div class="tier-label ${cls}"><span class="dot"></span>${esc(label)}</div>`));
    present.forEach(node=>{ wrap.appendChild(node); added++; });
  }
  if (part === "words"){
    addTier("tier-beginner", "🟢 Start here — the basics", [accQw, accNumbers, accVocab, accGender, accDems, accPoss, accReady]);
  } else if (part === "verbs"){
    addTier("tier-mid", "🟡 Tenses & compound verbs", [accTenses, accSnapshots, accPastPractice, accCompound]);
    addTier("tier-adv", "🔴 Advanced reference", [accIrregulars]);
  } else if (part === "patterns"){
    addTier(null, "", [accPatterns]);
  } else if (part === "lookalikes"){
    addTier(null, "", [accLookalikes]);
  } else {
    addTier("tier-beginner", "🟢 Start here — the basics", [accCommands, accPostAll]);
    addTier("tier-mid", "🟡 Building sentences", [accCues, accSubjunctive, accWala, accThirdPerson]);
    addTier("tier-adv", "🔴 Advanced reference", [accErgativeNe]);
  }

  if (!added && part !== "patterns" && part !== "lookalikes") wrap.appendChild(el(`<p class="empty">No entries match "${esc(q)}".</p>`));
  return wrap;
}

// "Verbs & Tenses": the verb bank on top (every verb, five core forms), then the tense tables.
function renderVerbsAndTenses(){
  const q = APP.lib.q.trim().toLowerCase();
  const wrap = el(`<div class="stack"></div>`);
  const rest = renderGrammarRef("verbs");
  if (!q && rest.firstChild) wrap.appendChild(rest.firstChild); // the short orientation note goes first
  const bank = renderVerbList();
  const n = bank.querySelectorAll(".sentence-item").length;
  if (n){
    const d = el(`<details class="acc card" open><summary>Verb bank — everyday verbs, five core forms each <span class="tag">${n}</span></summary></details>`);
    d.appendChild(bank);
    wrap.appendChild(d);
  }
  Array.from(rest.childNodes).forEach(ch=>{
    if (n && ch.classList && ch.classList.contains("empty")) return; // verb bank already matched
    wrap.appendChild(ch);
  });
  if (!wrap.children.length) wrap.appendChild(el(`<p class="empty">No verbs or tenses match "${esc(q)}".</p>`));
  return wrap;
}

/* ================= PRACTICE ================= */
// Which sentences a given flashcard mode draws from. "quick" blends due + a few new
// sentences up to a small daily-feeling batch (mirrors the Home "recommended today" idea,
// instead of ever surfacing the full raw due-count as a wall of cards). "mistakes" is
// literally box:0 sentences that have already been reviewed at least once (rated "Again"),
// so it empties out as they're re-rated "Good"/"Easy" — nothing else marks it done.
function mistakeSentences(){ return SENTENCES_300.filter(s=>{ const r=DB.srs[s.n]; return r && r.box===0; }); }
// First slice of an adaptive "weak area" recommender: groups current mistakes by the
// sentence's real-life category (the only dimension the data actually carries — there's no
// per-sentence grammar tagging like "gender" or "ko/ke" yet, so a true "Gender Booster"/
// "KO Booster" engine per the original spec isn't buildable without adding that schema).
// This still delivers the core idea — notice where mistakes cluster and point at more practice.
function weakCategories(){
  const counts = {};
  mistakeSentences().forEach(s=>{ counts[s.c] = (counts[s.c]||0) + 1; });
  return Object.entries(counts)
    .map(([code,count])=>({ code, count, label:(CATEGORIES_300.find(c=>c.code===code)||{}).label || code }))
    .sort((a,b)=>b.count-a.count);
}
function flashPool(mode){
  if (mode === "quick"){
    const due = dueSentences();
    if (due.length >= 10) return shuffle(due).slice(0,10);
    const unstudied = SENTENCES_300.filter(s=>!DB.srs[s.n]);
    const fill = shuffle(unstudied).slice(0, 10-due.length);
    return shuffle(due.concat(fill));
  }
  if (mode === "due") { const due = dueSentences(); return due.length ? due : SENTENCES_300; }
  if (mode === "mistakes") return mistakeSentences();
  return SENTENCES_300; // "deep"
}
const PRACTICE_MODE_LABEL = { quick:"Quick Review", deep:"Deep Review", due:"Due Reviews", mistakes:"Mistakes" };
function renderPractice(){
  const wrap = el(`<div class="stack"></div>`);
  const dueCount = dueSentences().length;
  const mistakeCount = mistakeSentences().length;
  const recommended = Math.min(dueCount, 10);

  wrap.appendChild(el(`
    <div class="card">
      <p class="section-title">Recommended today</p>
      <p style="margin-top:6px;"><b>${recommended}${dueCount>recommended?"+":""} cards</b> <span style="color:var(--muted);">· about ${Math.max(2, Math.round(recommended*0.5))} minutes</span></p>
    </div>
  `));

  const primaryModes = [["quick","Quick Review"],["deep","Deep Review"],["verb","Verb Practice"],["mistakes","Mistakes"],["due","Due Reviews"]];
  wrap.appendChild(el(`<div class="chip-row" style="flex-wrap:wrap;gap:8px;">${primaryModes.map(([k,l])=>{
    let badge = "";
    if (k==="due" && dueCount) badge = ` <span class="tag">${dueCount}</span>`;
    if (k==="mistakes" && mistakeCount) badge = ` <span class="tag" style="background:var(--bad);color:#fff;">${mistakeCount}</span>`;
    return `<button class="chip ${APP.practice.mode===k?'active':''}" data-mode="${k}">${l}${badge}</button>`;
  }).join("")}</div>`));

  const holder = el(`<div style="margin-top:10px;"></div>`);
  if (APP.practice.mode === "verb") holder.appendChild(renderVerbPractice());
  else if (PRACTICE_MODE_LABEL[APP.practice.mode]) holder.appendChild(renderFlash(APP.practice.mode));
  else holder.appendChild(renderMCQ(APP.practice.mode));
  wrap.appendChild(holder);

  wrap.appendChild(el(`
    <details class="acc card" style="margin-top:4px;">
      <summary>More practice modes</summary>
      <div class="chip-row" style="flex-wrap:wrap;gap:8px;margin-top:10px;">
        <button class="chip ${APP.practice.mode==='meaning'?'active':''}" data-mode="meaning">Meaning Match</button>
        <button class="chip ${APP.practice.mode==='pattern'?'active':''}" data-mode="pattern">Grammar Patterns</button>
      </div>
    </details>
  `));

  wrap.addEventListener("click", (e)=>{
    const m = e.target.closest("[data-mode]");
    if (m){ APP.practice.mode = m.dataset.mode; APP.practice.card=null; APP.practice.mcq=null; DB.lastPracticeMode = m.dataset.mode; saveStore(); render(); return; }
    const vs = e.target.closest("[data-verbsub]");
    if (vs){ APP.practice.verbSub = vs.dataset.verbsub; APP.practice.mcq=null; saveStore(); render(); return; }
  });
  return wrap;
}
function renderVerbPractice(){
  const sub = APP.practice.verbSub || "forms";
  const wrap = el(`<div class="stack"></div>`);
  wrap.appendChild(el(`<div class="chip-row">
    <button class="chip ${sub==='forms'?'active':''}" data-verbsub="forms">Verb Forms</button>
    <button class="chip ${sub==='commands'?'active':''}" data-verbsub="commands">Commands</button>
  </div>`));
  wrap.appendChild(renderMCQ(sub==="forms"?"verb":"imp"));
  return wrap;
}

function newFlashCard(mode){
  const pool = flashPool(mode).slice().sort((a,b)=>a.n-b.n);
  const idx = pool.length ? Math.floor(Math.random()*pool.length) : 0;
  APP.practice.card = { pool, idx, s: pool[idx], revealed:false, mode };
}
function gotoFlash(delta){
  const c = APP.practice.card;
  if (!c || !c.pool || !c.pool.length) return;
  c.idx = (c.idx + delta + c.pool.length) % c.pool.length;
  c.s = c.pool[c.idx];
  c.revealed = false;
}
function renderFlash(mode){
  if (!APP.practice.card || APP.practice.card.mode !== mode) newFlashCard(mode);
  const cardState = APP.practice.card;
  if (!cardState.pool.length){
    return el(`<div class="card"><p class="section-title">🎉 No mistakes right now</p><p style="color:var(--muted);font-size:13px;margin-top:6px;">Anything you rate "Again" in another mode will show up here to revisit.</p></div>`);
  }
  const { s, revealed, pool, idx } = cardState;
  const box = el(`<div class="stack"></div>`);
  box.appendChild(el(`<p style="color:var(--muted);font-size:12.5px;">${esc(PRACTICE_MODE_LABEL[mode]||"")} · card ${idx+1} of ${pool.length} · showing #${s.n}</p>`));
  box.appendChild(el(`
    <div class="row" style="justify-content:space-between;align-items:center;gap:10px;">
      <button class="btn" id="prevFlashBtn" title="Previous card">◀ Previous</button>
      <button class="btn" id="nextFlashBtn" title="Next card">Next ▶</button>
    </div>`));
  const flash = el(`<div class="flash">
      <div class="sub">${esc(CATEGORIES_300.find(c=>c.code===s.c).label)}</div>
      <div class="prompt">${esc(s.en)}</div>
      ${s.ta?`<div class="sub ta">${esc(s.ta)}</div>`:""}
      ${revealed ? `<div class="answer hi">${esc(s.hi)}</div>` : `<button class="btn btn-primary btn-sm" id="revealBtn" style="margin-top:10px;">Show Hindi</button>`}
    </div>`);
  box.appendChild(flash);
  if (revealed){
    // NOTE: el() only returns the template's first top-level element, so each of these
    // must be its own appendChild call — combining the icon row and .rate-row into one
    // template (as this used to do) silently dropped the rate-row and its Again/Good/Easy
    // buttons, meaning ratings never fired in this classic Flashcards view.
    box.appendChild(el(`
      <div class="row" style="justify-content:center;gap:14px;">
        <button class="icon-btn" data-speak="${esc(s.hi)}" title="Listen">🔊</button>
        <button class="icon-btn" data-fav="${s.n}" title="${DB.favorites&&DB.favorites[s.n]?'Remove from saved':'Save'}" style="${DB.favorites&&DB.favorites[s.n]?'color:var(--marigold);':''}">${DB.favorites&&DB.favorites[s.n]?'★':'☆'}</button>
      </div>`));
    box.appendChild(el(`
      <div class="rate-row">
        <button class="btn" data-rate="again" style="border-color:var(--bad);color:var(--bad);">Again</button>
        <button class="btn" data-rate="good" style="border-color:var(--indigo);color:var(--indigo);">Good</button>
        <button class="btn" data-rate="easy" style="border-color:var(--good);color:var(--good);">Easy</button>
      </div>`));
    box.appendChild(el(`<button class="btn btn-ghost btn-block" data-explain="${esc(s.hi)}">Ask the tutor to explain this sentence →</button>`));
  }
  box.addEventListener("click", (e)=>{
    if (e.target.id === "revealBtn"){ APP.practice.card.revealed = true; render(); return; }
    if (e.target.closest("#prevFlashBtn")){ gotoFlash(-1); render(); return; }
    if (e.target.closest("#nextFlashBtn")){ gotoFlash(1); render(); return; }
    const r = e.target.closest("[data-rate]");
    if (r){ srsRate(s.n, s.c, r.dataset.rate); newFlashCard(mode); render(); return; }
    const x = e.target.closest("[data-explain]"); if (x){ openTutorWith(x.dataset.explain); return; }
    const sp = e.target.closest("[data-speak]"); if (sp){ speak(sp.dataset.speak); return; }
    const f = e.target.closest("[data-fav]"); if (f){ toggleFavorite(Number(f.dataset.fav)); render(); return; }
  });
  return box;
}

function newMCQ(mode){
  let prompt, correct, options, onAnswer;
  if (mode === "verb"){
    const v = pick(VERB_BANK);
    const askRequest = Math.random() < 0.5;
    prompt = `${askRequest?"Polite request":"Informal order"} form of "${v.en}" (${v.root})?`;
    correct = askRequest ? v.request : v.order;
    const distract = shuffle(VERB_BANK.filter(x=>x.n!==v.n)).slice(0,3).map(x=> askRequest? x.request : x.order);
    options = shuffle([correct, ...distract]);
  } else if (mode === "imp"){
    const c = pick(COMMANDS_TABLE);
    const askAap = Math.random() < 0.5;
    prompt = `"${c.en}" — ${askAap?"polite (aap)":"informal (tum)"} form?`;
    correct = askAap ? c.aap : c.tum;
    const distract = shuffle(COMMANDS_TABLE.filter(x=>x!==c)).slice(0,3).map(x=> askAap? x.aap : x.tum);
    options = shuffle([correct, ...distract]);
  } else if (mode === "meaning"){
    const s = pick(SENTENCES_300);
    const hiToEn = Math.random() < 0.5;
    prompt = hiToEn ? s.hi : s.en;
    correct = hiToEn ? s.en : s.hi;
    const pool = shuffle(SENTENCES_300.filter(x=>x.n!==s.n)).slice(0,3);
    const distract = pool.map(x => hiToEn ? x.en : x.hi);
    options = shuffle([correct, ...distract]);
    APP.practice.mcq = { prompt, correct, options, answered:false, explainHi:s.hi };
    return;
  } else { // pattern
    const p = pick(QUICK_PATTERNS);
    prompt = p.example;
    correct = p.name;
    const distract = shuffle(QUICK_PATTERNS.filter(x=>x.name!==p.name)).slice(0,3).map(x=>x.name);
    options = shuffle([correct, ...distract]);
    APP.practice.mcq = { prompt, correct, options, answered:false, explainHi: p.formula };
    return;
  }
  APP.practice.mcq = { prompt, correct, options, answered:false, explainHi: correct };
}
function renderMCQ(mode){
  if (!APP.practice.mcq) newMCQ(mode);
  const q = APP.practice.mcq;
  const box = el(`<div class="stack"></div>`);
  box.appendChild(el(`<div class="card"><p class="section-title">Question</p><p style="font-size:16px;font-weight:700;margin-top:8px;" class="${/[a-zA-Z]/.test(q.prompt) && !DEVANAGARI_RE.test(q.prompt) ? '' : 'hi'}">${esc(q.prompt)}</p></div>`));
  const optsWrap = el(`<div class="stack"></div>`);
  q.options.forEach(opt => {
    // Options are romanized/Devanagari Hindi in every mode except "meaning" answered en->hi or "pattern" (plain English pattern names).
    const useHiFont = mode !== "meaning" && mode !== "pattern" || DEVANAGARI_RE.test(opt);
    const b = el(`<button class="mcq-opt ${useHiFont?'hi':''}" data-opt="${esc(opt)}">${esc(opt)}</button>`);
    if (q.answered){
      if (opt === q.correct) b.classList.add("correct");
      else if (opt === q.picked) b.classList.add("wrong");
    }
    optsWrap.appendChild(b);
  });
  box.appendChild(optsWrap);
  if (q.answered){
    box.appendChild(el(`<button class="btn btn-primary btn-block" id="nextQ">Next question</button>`));
    box.appendChild(el(`<button class="btn btn-ghost btn-block" data-explain="${esc(q.explainHi)}">Ask the tutor to explain →</button>`));
  }
  box.addEventListener("click", (e)=>{
    const o = e.target.closest("[data-opt]");
    if (o && !q.answered){
      q.answered = true; q.picked = o.dataset.opt;
      DB.stats.total = (DB.stats.total||0)+1;
      if (o.dataset.opt === q.correct) DB.stats.correct = (DB.stats.correct||0)+1;
      bumpActivity();
      render();
      return;
    }
    if (e.target.id === "nextQ"){ APP.practice.mcq = null; render(); return; }
    const x = e.target.closest("[data-explain]"); if (x){ openTutorWith(x.dataset.explain); return; }
  });
  return box;
}

/* ================= TUTOR ================= */
const TUTOR_STARTERS = [
  "naan office poitu varen",
  "நாளைக்கு உன்னை பார்க்கலாமா?",
  "I have to finish this work today",
  "avan enna panran theriyala",
  "please send me the file by evening",
  "naan konjam late aaven",
  "can you help me with this?",
  "enakku indha vishayam puriyala",
];
let tutorPrefill = "";
function openTutorWith(text){
  tutorPrefill = text;
  switchTab("tutor");
  setTimeout(()=>{ const ta = $("#tutorInput"); if (ta){ ta.value = text; askTutor(text); } }, 0);
}

function renderTutor(){
  const wrap = el(`<div class="stack"></div>`);
  wrap.appendChild(el(`
    <div class="card">
      <p class="section-title">Ask the tutor</p>
      <p style="margin-top:6px;color:var(--muted);font-size:13.5px;">Type a sentence in Tamil, Tanglish, English or Hindi. You'll get the full breakdown — natural Hindi, Devanagari, tense, root verb, formula, why, and similar examples.</p>
      <textarea id="tutorInput" rows="3" placeholder="e.g. naan office poitu varen  /  I have to go to the office">${esc(tutorPrefill)}</textarea>
      <div class="row" style="margin-top:10px;gap:8px;">
        <button class="btn btn-primary" id="askBtn" style="flex:1;">Get the breakdown</button>
        <button class="btn btn-ghost btn-sm" id="surpriseBtn">🎲 Surprise me</button>
      </div>
      <div class="chip-row" style="margin-top:10px;">
        ${TUTOR_STARTERS.map(t=>`<button class="chip" data-starter="${esc(t)}">${esc(t.length>28? t.slice(0,26)+"…" : t)}</button>`).join("")}
      </div>
      <div id="tutorCap" style="margin-top:8px;"></div>
    </div>
  `));
  const answerHost = el(`<div id="tutorAnswerHost"></div>`);
  wrap.appendChild(answerHost);

  if (DB.tutorHistory && DB.tutorHistory.length){
    const hist = el(`<details class="acc card"><summary>Recent questions <span class="tag">${DB.tutorHistory.length}</span></summary><div class="list-flat" id="tutorHist"></div></details>`);
    const holder = $("#tutorHist", hist);
    DB.tutorHistory.slice(0,15).forEach(h => {
      holder.appendChild(el(`<div class="sentence-item row-between"><span style="font-size:13.5px;">${esc(h.q)}</span><button class="icon-btn" data-reopen="${h.id}" title="Reopen">↻</button></div>`));
    });
    wrap.appendChild(hist);
  }

  wrap.addEventListener("click", (e)=>{
    if (e.target.id === "askBtn"){ askTutor($("#tutorInput").value.trim()); return; }
    if (e.target.id === "surpriseBtn"){ const s = pick(SENTENCES_300); $("#tutorInput").value = s.hi; askTutor(s.hi); return; }
    const st = e.target.closest("[data-starter]"); if (st){ $("#tutorInput").value = st.dataset.starter; askTutor(st.dataset.starter); return; }
    const r = e.target.closest("[data-reopen]");
    if (r){ const item = DB.tutorHistory.find(h=>h.id===r.dataset.reopen); if(item){ showTutorAnswer(item.q, item.a); } return; }
  });

  getSample().then(api => {
    const capBox = $("#tutorCap");
    if (!capBox) return;
    if (!api){
      capBox.innerHTML = `<p style="color:var(--muted);font-size:12.5px;">Live tutor isn't available in this view of the page. Browse the ${SENTENCES_300.length}-sentence phrasebook and Grammar reference in the Library tab instead — every entry there already has the natural Hindi, Tamil meaning and English.</p>`;
      $("#askBtn").disabled = true;
    }
  });

  return wrap;
}

function showTutorAnswer(q, a){
  const host = $("#tutorAnswerHost");
  if (!host) return;
  host.innerHTML = "";
  host.appendChild(el(`<div class="card"><p class="section-title">For: <span style="color:var(--ink);text-transform:none;font-weight:600;">${esc(q)}</span></p><div class="tutor-answer" style="margin-top:8px;">${renderMD(a)}</div></div>`));
}

async function askTutor(text){
  if (!text) return;
  const api = await getSample();
  const host = $("#tutorAnswerHost");
  if (!host) return;
  if (!api){
    host.innerHTML = `<div class="card empty">Live tutor isn't available right now — use the Library's phrasebook and grammar reference for full natural-Hindi breakdowns of the course sentences.</div>`;
    return;
  }
  const askBtn = $("#askBtn"); if (askBtn) askBtn.disabled = true;
  host.innerHTML = `<div class="card"><div class="thinking"><span class="dot-pulse"></span> Thinking through the grammar…</div></div>`;
  try{
    const input = `${TEACHING_INSTRUCTIONS}\n\nNow apply the above instructions to this sentence/task from me:\n"${text}"`;
    const res = await api(input, {
      modelTier: "default",
      onText: ({text: partial}) => {
        host.innerHTML = `<div class="card"><p class="section-title">For: <span style="color:var(--ink);text-transform:none;font-weight:600;">${esc(text)}</span></p><div class="tutor-answer" style="margin-top:8px;">${renderMD(partial)}</div></div>`;
      }
    });
    const finalText = res && res.text ? res.text : "";
    showTutorAnswer(text, finalText);
    DB.tutorHistory = DB.tutorHistory || [];
    DB.tutorHistory.unshift({ id: uid(), q: text, a: finalText, t: Date.now() });
    DB.tutorHistory = DB.tutorHistory.slice(0, 30);
    bumpActivity();
    saveStore();
  }catch(err){
    const code = err && err.code;
    let msg = "Something went wrong asking the tutor. Please try again.";
    if (code === "not_granted") msg = "This view hasn't granted the live tutor. Use the Library's phrasebook and grammar reference instead.";
    if (code === "rate_limited") msg = "Too many questions in a row — wait a few seconds and try again.";
    if (code === "cancelled") msg = "Cancelled.";
    host.innerHTML = `<div class="card empty">${esc(msg)}</div>`;
  } finally {
    if (askBtn) askBtn.disabled = false;
  }
}

/* ================= PROGRESS ================= */
function renderProgress(){
  if (APP.progress.mode === "reviews") return renderReviews();
  if (APP.progress.mode === "contact") return renderContactUs();
  return renderProgressMain();
}
function renderProgressMain(){
  const wrap = el(`<div class="stack"></div>`);
  const acc = DB.stats.total ? Math.round(100*DB.stats.correct/DB.stats.total) : 0;
  wrap.appendChild(el(`
    <div class="card">
      <p class="section-title">Overview</p>
      <div class="grid3" style="margin-top:12px;">
        <div class="stat"><b>${DB.stats.reviewed||0}</b><span>Cards reviewed</span></div>
        <div class="stat"><b>${acc}%</b><span>Quiz accuracy</span></div>
        <div class="stat"><b>${DB.streak||0}</b><span>Day streak</span></div>
      </div>
    </div>
  `));

  const days = [];
  for (let i=6;i>=0;i--){ const d = new Date(Date.now()-i*86400000); days.push(d.toISOString().slice(0,10)); }
  const counts = days.map(d => DB.activity[d]||0);
  const max = Math.max(1, ...counts);
  const barsHtml = days.map((d,i)=>{
    const h = Math.round(4 + (counts[i]/max)*80);
    const lbl = ["S","M","T","W","T","F","S"][new Date(d).getDay()];
    return `<div class="col"><div class="bar" style="height:${h}px;"></div><div class="lbl">${lbl}</div></div>`;
  }).join("");
  wrap.appendChild(el(`<div class="card"><p class="section-title">Last 7 days</p><div class="bars" style="margin-top:14px;">${barsHtml}</div></div>`));

  const catsTouched = Object.keys(DB.stats.touchedCats||{}).length;
  wrap.appendChild(el(`
    <div class="card">
      <p class="section-title">Situation coverage</p>
      <p style="margin-top:6px;font-size:13.5px;color:var(--muted);">${catsTouched} of ${CATEGORIES_300.length} real-life situations practiced</p>
      <div class="progress-bar" style="margin-top:8px;"><div style="width:${Math.round(100*catsTouched/CATEGORIES_300.length)}%;"></div></div>
    </div>
  `));

  const favCount = Object.keys(DB.favorites||{}).length;
  wrap.appendChild(el(`
    <div class="card">
      <p class="section-title">Data</p>
      <p style="margin-top:6px;font-size:13px;color:var(--muted);">Progress is saved in this browser only (${favCount} saved sentence${favCount===1?"":"s"}). It won't follow you to another device unless you back it up.</p>
      <div class="row" style="margin-top:10px;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-sm" id="exportBtn">⬇ Export backup</button>
        <button class="btn btn-sm" id="importBtn">⬆ Restore backup</button>
        <button class="btn btn-sm" id="resetBtn" style="color:var(--bad);border-color:var(--bad);">Reset progress</button>
      </div>
      <input type="file" id="importFile" accept="application/json" style="display:none;">
      <p id="dataMsg" style="margin-top:8px;font-size:12.5px;color:var(--muted);"></p>
    </div>
  `));

  wrap.appendChild(el(`
    <div class="card">
      <p class="section-title">Feedback</p>
      <p style="margin-top:6px;font-size:13px;color:var(--muted);">This is a personal study app, made for learning — it can have mistakes. Spotted one, or just want to say hello?</p>
      <div class="row" style="margin-top:10px;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-sm" data-progress-goto="reviews">⭐ Leave a review</button>
        <button class="btn btn-sm" data-progress-goto="contact">✉️ Contact us</button>
        <button class="btn btn-sm" id="discReopen">ℹ️ Disclaimer</button>
      </div>
    </div>
  `));
  wrap.appendChild(el(`
    <p style="text-align:center;font-size:11.5px;color:var(--muted);padding:0 16px;line-height:1.5;">
      📘 For learning purposes only — content is not an official or certified source and may contain mistakes.
    </p>
  `));

  wrap.addEventListener("click", (e)=>{
    const pg = e.target.closest("[data-progress-goto]");
    if (pg){ APP.progress.mode = pg.dataset.progressGoto; render(); return; }
    if (e.target.id === "resetBtn"){
      const seenDisclaimer = DB.sawDisclaimer;
      DB = defaultStore();
      DB.sawDisclaimer = seenDisclaimer; // a reset clears progress, not the fact that they've read the disclaimer
      saveStore(); renderStreak();
      APP.tab = "home"; APP.home = { mode:"dashboard", session:null };
      showOnboarding();
      return;
    }
    if (e.target.id === "exportBtn"){
      try{
        const blob = new Blob([JSON.stringify(DB, null, 2)], {type:"application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = `hindi-tutor-backup-${todayStr()}.json`;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(()=>URL.revokeObjectURL(url), 2000);
        $("#dataMsg").textContent = "Backup downloaded.";
      }catch(err){ $("#dataMsg").textContent = "Couldn't create a backup file here."; }
      return;
    }
    if (e.target.id === "importBtn"){ $("#importFile").click(); return; }
    if (e.target.id === "discReopen"){ openDisclaimer(); return; }
  });
  wrap.addEventListener("change", (e)=>{
    if (e.target.id !== "importFile") return;
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try{
        const parsed = JSON.parse(reader.result);
        const seenDisclaimer = DB.sawDisclaimer;
        DB = Object.assign(defaultStore(), parsed);
        DB.sawDisclaimer = DB.sawDisclaimer || seenDisclaimer;
        saveStore(); renderStreak(); render();
      }catch(err){
        const msg = $("#dataMsg"); if (msg) msg.textContent = "That file doesn't look like a valid backup.";
      }
    };
    reader.readAsText(file);
  });
  return wrap;
}

/* ================= REVIEWS ================= */
function renderReviews(){
  const wrap = el(`<div class="stack"></div>`);
  const st = APP.progress;

  wrap.appendChild(el(`<button class="btn btn-ghost" data-progress-goto="main">← Back to Progress</button>`));
  wrap.appendChild(el(`
    <div class="card">
      <p class="section-title">⭐ Leave a review</p>
      <p style="margin-top:6px;font-size:13px;color:var(--muted);">This is a personal, self-made learning app — it may have mistakes. A quick rating or note helps, and it's genuinely appreciated.</p>
      <p style="margin-top:12px;font-size:12.5px;color:var(--muted);">Your rating</p>
      <div class="row" id="starRow" style="gap:4px;margin-top:4px;">
        ${[1,2,3,4,5].map(n=>`<button class="icon-btn" data-star="${n}" style="font-size:22px;color:${n<=st.reviewStars?"var(--marigold)":"var(--muted)"};">★</button>`).join("")}
      </div>
      <textarea id="reviewText" placeholder="What's working, what's not, anything you noticed..." style="margin-top:10px;width:100%;min-height:90px;">${esc(st.reviewText)}</textarea>
      <input id="reviewName" type="text" placeholder="Your name (optional)" value="${esc(st.reviewName)}" style="margin-top:8px;width:100%;">
      <button class="btn btn-primary" id="postReviewBtn" style="margin-top:12px;width:100%;">Post review</button>
      <p style="margin-top:8px;font-size:11.5px;color:var(--muted);">Posting also opens your email app with the review pre-filled, addressed to the developer — just hit send there to actually deliver it; posting alone only saves it on this device.</p>
      <p id="reviewMsg" style="margin-top:6px;font-size:12.5px;color:var(--good);"></p>
    </div>
  `));

  const reviews = DB.reviews || [];
  if (reviews.length){
    const list = el(`<div class="stack"></div>`);
    reviews.forEach(r=>{
      list.appendChild(el(`
        <div class="card card-tight">
          <div class="row-between">
            <span style="color:var(--marigold);font-size:14px;">${"★".repeat(r.stars)}${"☆".repeat(5-r.stars)}</span>
            <span style="color:var(--muted);font-size:11.5px;">${esc(r.date)}</span>
          </div>
          ${r.text ? `<p style="margin-top:6px;font-size:13.5px;">${esc(r.text)}</p>` : ""}
          <p style="margin-top:4px;font-size:12px;color:var(--muted);">— ${esc(r.name || "Anonymous")}</p>
        </div>
      `));
    });
    wrap.appendChild(el(`<p class="section-title" style="margin-top:4px;">Reviews on this device (${reviews.length})</p>`));
    wrap.appendChild(list);
  }

  wrap.addEventListener("click", (e)=>{
    const pg = e.target.closest("[data-progress-goto]");
    if (pg){ APP.progress.mode = pg.dataset.progressGoto; render(); return; }
    const star = e.target.closest("[data-star]");
    if (star){ st.reviewStars = Number(star.dataset.star); render(); return; }
    if (e.target.id === "postReviewBtn"){
      const text = ($("#reviewText") ? $("#reviewText").value : "").trim();
      const name = ($("#reviewName") ? $("#reviewName").value : "").trim();
      st.reviewText = text; st.reviewName = name;
      if (!text && !st.reviewStars){ return; }
      const entry = { stars: st.reviewStars||5, text, name, date: todayStr() };
      DB.reviews = DB.reviews || [];
      DB.reviews.unshift(entry);
      saveStore();
      const subject = `Hindi Tutor app review (${entry.stars}★)`;
      const body = `Rating: ${entry.stars}/5\nFrom: ${name || "Anonymous"}\n\n${text || "(no written comment)"}`;
      try{ window.location.href = mailtoLink(subject, body); }catch(err){}
      st.reviewStars = 5; st.reviewText = ""; st.reviewName = "";
      render();
      setTimeout(()=>{ const m = $("#reviewMsg"); if (m) m.textContent = "Thanks! Saved here, and your email app should have opened to send it too."; }, 50);
      return;
    }
  });
  wrap.addEventListener("input", (e)=>{
    if (e.target.id === "reviewText") st.reviewText = e.target.value;
    if (e.target.id === "reviewName") st.reviewName = e.target.value;
  });
  return wrap;
}

/* ================= CONTACT US ================= */
function renderContactUs(){
  const wrap = el(`<div class="stack"></div>`);
  const st = APP.progress;

  wrap.appendChild(el(`<button class="btn btn-ghost" data-progress-goto="main">← Back to Progress</button>`));
  wrap.appendChild(el(`
    <div class="card">
      <p class="section-title">✉️ Contact us</p>
      <p style="margin-top:6px;font-size:13px;color:var(--muted);">Found a mistake, have a suggestion, or just want to reach out? Send a message directly.</p>
      <input id="contactName" type="text" placeholder="Your name (optional)" value="${esc(st.contactName)}" style="margin-top:12px;width:100%;">
      <input id="contactEmail" type="text" placeholder="Your email, if you'd like a reply (optional)" value="${esc(st.contactEmail)}" style="margin-top:8px;width:100%;">
      <textarea id="contactMsg" placeholder="Your message..." style="margin-top:8px;width:100%;min-height:110px;">${esc(st.contactMsg)}</textarea>
      <button class="btn btn-primary" id="sendContactBtn" style="margin-top:12px;width:100%;">Send message</button>
      <p style="margin-top:8px;font-size:11.5px;color:var(--muted);">This opens your email app with the message ready, addressed to the developer — just hit send there.</p>
      <p id="contactMsgStatus" style="margin-top:6px;font-size:12.5px;color:var(--good);"></p>
    </div>
  `));

  wrap.addEventListener("click", (e)=>{
    const pg = e.target.closest("[data-progress-goto]");
    if (pg){ APP.progress.mode = pg.dataset.progressGoto; render(); return; }
    if (e.target.id === "sendContactBtn"){
      const name = ($("#contactName") ? $("#contactName").value : "").trim();
      const email = ($("#contactEmail") ? $("#contactEmail").value : "").trim();
      const msg = ($("#contactMsg") ? $("#contactMsg").value : "").trim();
      st.contactName = name; st.contactEmail = email; st.contactMsg = msg;
      if (!msg) return;
      const subject = `Hindi Tutor app — message from ${name || "a user"}`;
      const body = `${msg}\n\n${email ? "Reply to: " + email : "(no reply email given)"}`;
      try{ window.location.href = mailtoLink(subject, body); }catch(err){}
      const s = $("#contactMsgStatus"); if (s) s.textContent = "Your email app should have opened with the message ready — hit send there.";
      return;
    }
  });
  wrap.addEventListener("input", (e)=>{
    if (e.target.id === "contactName") st.contactName = e.target.value;
    if (e.target.id === "contactEmail") st.contactEmail = e.target.value;
    if (e.target.id === "contactMsg") st.contactMsg = e.target.value;
  });
  return wrap;
}

/* ================= TASKS (flashcard decks) ================= */
function renderTasksTab(){
  const wrap = el(`<div class="stack"></div>`);
  const st = APP.tasks;

  if (!st.deckId){
    const totalCards = TASK_DECKS.reduce((n,d)=>n+d.cards.length,0);
    const isList = st.view === "list";
    wrap.appendChild(el(`
      <div class="card">
        <p class="section-title">Class tasks</p>
        <p style="color:var(--muted);font-size:12.5px;margin-top:6px;">Two ways to work through your class tasks: <b>flip cards</b> to test yourself, or the <b>full list</b> to read every item.</p>
        <div class="chip-row" style="flex-wrap:wrap;gap:6px;margin-top:10px;">
          <button class="chip ${!isList?'active':''}" data-taskview="decks">🃏 Flip-card decks (${TASK_DECKS.length})</button>
          <button class="chip ${isList?'active':''}" data-taskview="list">📋 Full task list (${TASKS.length})</button>
        </div>
      </div>`));
    wrap.appendChild(el(`<div class="search"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>
      <input id="taskSearch" type="text" placeholder="${isList?"Search the task list...":"Search task decks..."}" value="${esc(st.q||"")}"></div>`));
    const q = (st.q||"").trim().toLowerCase();
    if (isList){
      wrap.appendChild(renderTasksList(st.q||""));
    } else {
      wrap.appendChild(el(`<p style="color:var(--muted);font-size:12.5px;margin:0 2px;">${TASK_DECKS.length} decks · ${totalCards} cards. Tap a deck to flip through prompt → Hindi answer.</p>`));
      const classDecks = TASK_DECKS.filter(d=>d.source==="class" && (!q || d.title.toLowerCase().includes(q)));
      const newDecks = TASK_DECKS.filter(d=>d.source==="new" && (!q || d.title.toLowerCase().includes(q)));
      function deckRow(d){
        return `<button class="sentence-item row-between" data-deck="${d.id}" style="width:100%;text-align:left;background:none;border:none;border-bottom:1px solid var(--line);cursor:pointer;">
          <span class="en">${esc(d.title)}</span>
          <span style="color:var(--muted);font-size:12.5px;">${d.cards.length} cards</span>
        </button>`;
      }
      if (classDecks.length) wrap.appendChild(el(`
        <details class="acc card" open><summary>From your class tasks <span class="tag">${classDecks.length}</span></summary>
          <div class="list-flat">${classDecks.map(deckRow).join("")}</div>
        </details>`));
      if (newDecks.length) wrap.appendChild(el(`
        <details class="acc card" open><summary>50 extra practice topics <span class="tag">${newDecks.length}</span></summary>
          <div class="list-flat">${newDecks.map(deckRow).join("")}</div>
        </details>`));
      if (!classDecks.length && !newDecks.length) wrap.appendChild(el(`<p class="empty">No decks match "${esc(q)}".</p>`));
    }

    wrap.addEventListener("input", (e)=>{
      if (e.target.id === "taskSearch"){
        st.q = e.target.value;
        // re-render, then put the caret back so typing isn't interrupted
        render(); const inp = $("#taskSearch"); if (inp){ inp.focus(); try{ inp.setSelectionRange(inp.value.length, inp.value.length); }catch(_){} }
      }
    });
    wrap.addEventListener("click", (e)=>{
      const tv = e.target.closest("[data-taskview]"); if (tv){ st.view = tv.dataset.taskview; st.q = ""; render(); return; }
      const x = e.target.closest("[data-explain]"); if (x){ openTutorWith(x.dataset.explain); return; }
      const b = e.target.closest("[data-deck]");
      if (b){ st.deckId = b.dataset.deck; st.index = 0; st.flipped = false; render(); }
    });
    return wrap;
  }

  const deck = TASK_DECKS.find(d=>d.id===st.deckId);
  if (!deck){ st.deckId = null; return renderTasksTab(); }
  const card = deck.cards[st.index];
  const isLast = st.index === deck.cards.length - 1;
  const isFirst = st.index === 0;

  wrap.appendChild(el(`<button class="btn btn-ghost" id="tasksBackToList">← All task decks</button>`));
  wrap.appendChild(el(`
    <div class="row-between">
      <p class="section-title">${esc(deck.title)}</p>
      <span style="color:var(--muted);font-size:12.5px;">${st.index+1} / ${deck.cards.length}</span>
    </div>`));

  const flash = el(`<div class="flash task-flip ${st.flipped?'is-flipped':''}" id="taskFlashCard">
      <div class="sub">${st.flipped ? "Hindi answer" : "Tap to reveal the Hindi"}</div>
      ${!st.flipped
        ? `<div class="prompt">${esc(card.en)}</div>
           <div class="prompt ta" style="font-size:15px;font-weight:600;margin-top:4px;">${esc(card.ta)}</div>
           <button class="btn btn-primary btn-sm" id="taskRevealBtn" style="margin-top:10px;">Show Hindi</button>`
        : `<div class="prompt" style="font-size:14.5px;color:var(--muted);">${esc(card.en)}</div>
           <div class="prompt ta" style="font-size:13px;color:var(--muted);margin-top:2px;">${esc(card.ta)}</div>
           <div class="answer hi" style="font-size:19px;margin-top:10px;">${esc(card.hi)}</div>
           <button class="icon-btn speak-glow" data-speak="${esc(card.hi)}" title="Listen" style="margin-top:8px;">🔊</button>`}
    </div>`);
  wrap.appendChild(flash);

  wrap.appendChild(el(`
    <div class="row" style="justify-content:space-between;gap:10px;">
      <button class="btn" id="taskPrevBtn" ${isFirst?"disabled":""}>← Prev</button>
      <button class="btn btn-primary" id="taskNextBtn">${isLast?"Finish":"Next →"}</button>
    </div>`));

  wrap.addEventListener("click", (e)=>{
    if (e.target.id === "tasksBackToList"){ st.deckId = null; render(); return; }
    if (e.target.id === "taskRevealBtn"){ st.flipped = true; render(); return; }
    const sp = e.target.closest("[data-speak]"); if (sp){ speak(sp.dataset.speak); return; }
    if (e.target.id === "taskPrevBtn" && !isFirst){ st.index--; st.flipped = false; render(); return; }
    if (e.target.id === "taskNextBtn"){
      if (isLast){ st.deckId = null; } else { st.index++; st.flipped = false; }
      render(); return;
    }
    const card2 = e.target.closest("#taskFlashCard");
    if (card2 && !st.flipped){ st.flipped = true; render(); return; }
  });
  return wrap;
}

/* ---------- boot ---------- */
function boot(){
  primeVoices();
  renderStreak();
  if (!DB.level) showOnboarding();
  else { render(); if (!DB.sawAppGuide) openAppGuide(); }
  if (!DB.sawDisclaimer) openDisclaimer(); // first-ever open only; sits on top of whatever else is showing
  updateScrollFab();
}
if (window.claude && window.claude.hot){
  window.claude.hot.ready ? window.claude.hot.ready(boot) : boot();
} else {
  boot();
}
})();
