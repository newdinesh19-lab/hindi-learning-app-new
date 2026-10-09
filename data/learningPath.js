/* learningPath.js — Phase 1 of the level-aware redesign: onboarding levels, a placement test,
   and the 13-step complete-beginner path. Each path step points into content that already
   exists in the app (Library sub-tab + optional category/filter) rather than duplicating it —
   the same database, presented progressively instead of all at once. */

const LEVELS = [
  {code:"complete_beginner", letter:"A", label:"Complete beginner", blurb:"I know almost no Hindi."},
  {code:"beginner",          letter:"B", label:"Beginner",          blurb:"I know some words and phrases."},
  {code:"intermediate",      letter:"C", label:"Intermediate",      blurb:"I can understand and speak basic Hindi but make mistakes."},
  {code:"advanced",          letter:"D", label:"Advanced",          blurb:"I can communicate comfortably and want more natural and accurate Hindi."},
];

// A short adaptive-feeling placement test — 6 questions, roughly increasing difficulty.
// Score 0-6 maps to a level in determineLevelFromScore() (app.js).
const PLACEMENT_QUESTIONS = [
  {
    q:"How do you say \"Thank you\" in Hindi?",
    options:["Namaste","Dhanyavaad","Theek hai","Achha"], correct:1,
  },
  {
    q:"What does \"Aap kaise hain?\" mean?",
    options:["What is your name?","Where are you going?","How are you? (polite)","Good morning"], correct:2,
  },
  {
    q:"Which is correct for \"I go to school every day\"?",
    options:["Main school jaata hoon.","Main school jaa raha hoon.","Main school gaya.","Main school jaana hai."], correct:0,
  },
  {
    q:"\"Kitab\" (book) is feminine. Which is correct: \"Rani ___ kitab padhi\"?",
    options:["Rani ne kitab padha.","Rani ne kitab padhi.","Rani ne kitab padhe.","Rani kitab padhega."], correct:1,
  },
  {
    q:"\"Maine kaam kar liya\" (vs. plain \"Maine kaam kiya\") emphasizes what?",
    options:["It's still in progress","It's now finished, for oneself","It will happen tomorrow","Someone else did it"], correct:1,
  },
  {
    q:"Which sentence correctly says \"I had to go\" (compulsion, not just desire)?",
    options:["Mujhe jaana hai.","Mujhe jaana tha.","Mujhe jaana pada.","Main gaya."], correct:2,
  },
];

// 13-step sequential path for a complete beginner. `goto` points at an existing Library
// sub-tab (and optional category code) rather than new content.
const LEARNING_PATH = [
  {id:1,  title:"Hindi sounds & pronunciation", icon:"🔊", blurb:"Hindi is spoken mostly the way it's spelled in Tanglish. Use the 🔊 speaker button on any Hindi line in this app to hear it, and start by listening to a few ready-made phrases.", goto:{tab:"library", sub:"words"}, gotoLabel:"Open Ready-made phrases"},
  {id:2,  title:"Essential greetings", icon:"🙏", blurb:"Namaste, how are you, what's your name — the handful of lines you'll use in every conversation.", goto:{tab:"library", sub:"sentences", cat:"intro"}, gotoLabel:"Open Greetings & family"},
  {id:3,  title:"Survival phrases", icon:"🆘", blurb:"Please, sorry, I don't understand, can you help me — the phrases that get you through any situation.", goto:{tab:"library", sub:"words"}, gotoLabel:"Open Ready-made phrases"},
  {id:4,  title:"Basic sentence structure", icon:"🧱", blurb:"Hindi word order and the simple 'to be' pattern (main...hoon / tum...ho / hai) behind every sentence.", goto:{tab:"library", sub:"formulas"}, gotoLabel:"Open sentence formulas"},
  {id:5,  title:"Question words", icon:"❓", blurb:"Kya, kaun, kahan, kab, kyun, kaise — how to ask anything.", goto:{tab:"library", sub:"words"}, gotoLabel:"Open Question words"},
  {id:6,  title:"Numbers, time & dates", icon:"🔢", blurb:"Counting 0–100, and the common time/date phrases you'll need constantly.", goto:{tab:"library", sub:"words"}, gotoLabel:"Open Numbers 0–100"},
  {id:7,  title:"Essential pronouns", icon:"👤", blurb:"Main/tum/aap/woh/hum and their possessive forms (mera/tumhara/aapka...).", goto:{tab:"library", sub:"grammar"}, gotoLabel:"Open Pronoun table"},
  {id:8,  title:"Gender", icon:"⚥", blurb:"Every Hindi noun is masculine or feminine, and it changes how adjectives and verbs end.", goto:{tab:"library", sub:"words"}, gotoLabel:"Open Gender table"},
  {id:9,  title:"Basic postpositions", icon:"🔗", blurb:"Ko, ke, se, mein, par — the small words that do the job of English prepositions.", goto:{tab:"library", sub:"grammar"}, gotoLabel:"Open Postpositions"},
  {id:10, title:"Essential verbs", icon:"🏃", blurb:"The verb bank — core action words, each with all 5 tense forms.", goto:{tab:"library", sub:"verbs"}, gotoLabel:"Open Verb Bank"},
  {id:11, title:"Present / past / future basics", icon:"⏳", blurb:"The three basic tense shapes, side by side.", goto:{tab:"library", sub:"verbs"}, gotoLabel:"Open Tenses"},
  {id:12, title:"Everyday conversations", icon:"💬", blurb:"Short back-and-forth exchanges for common daily situations.", goto:{tab:"library", sub:"convos"}, gotoLabel:"Open Conversations"},
  {id:13, title:"Real-life situations", icon:"🌍", blurb:"Longer real conversations, start to finish.", goto:{tab:"library", sub:"convos"}, gotoLabel:"Open Conversations"},
];

if (typeof module !== "undefined") module.exports = { LEVELS, PLACEMENT_QUESTIONS, LEARNING_PATH };
