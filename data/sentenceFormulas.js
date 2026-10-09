/* sentenceFormulas.js — "20 Sentence Formulas" cheat-sheet from the user's own course PDF
   (formulas 1–20, "TAKKUNU HINDI"), organized into categories and expanded with extra
   worked examples (Hindi + Tamil + English) beyond what the source gave. Every example
   marked source:true is transcribed from the user's PDF (spelling kept close to the
   original, e.g. "kae"/"math"); source:false examples are new, added by Claude in the
   same style to give more practice material per formula. */

const SENTENCE_FORMULA_CATEGORIES = [
  {
    cat: "Commands & instructions",
    formulas: [
      {
        num:1, title:"Order — plain command", formula:"V (stem) + o", dev:"Order → V + O",
        note:"The everyday 'tum'-level instruction — bare stem + o. Same family as the informal column of the Commands table elsewhere in Grammar.",
        examples: [
          {hi:"Dekho.", ta:"பாரு.", en:"Look.", source:true},
          {hi:"Likho.", ta:"எழுது.", en:"Write.", source:true},
          {hi:"Jaao.", ta:"போ.", en:"Go.", source:true},
          {hi:"Baitho.", ta:"உக்காரு.", en:"Sit.", source:false},
          {hi:"Suno.", ta:"கேளு.", en:"Listen.", source:false},
        ],
      },
      {
        num:2, title:"Request — polite imperative", formula:"V (stem) + iye  (written \"ea\" for the same sound)", dev:"Request → v + ea",
        note:"The polite/'aap'-level version of Formula 1 — same verbs, softened with -iye. Use this with elders, strangers, or anyone you'd address as 'aap'.",
        examples: [
          {hi:"Dekhiye.", ta:"பாருங்க.", en:"Please look.", source:true},
          {hi:"Likhiye.", ta:"எழுதுங்க.", en:"Please write.", source:true},
          {hi:"Jaaiye.", ta:"போங்க.", en:"Please go.", source:true},
          {hi:"Baithiye.", ta:"உக்காருங்க.", en:"Please sit.", source:false},
          {hi:"Suniye.", ta:"கேளுங்க.", en:"Please listen.", source:false},
        ],
      },
      {
        num:3, title:"Don't do — prohibition", formula:"Mat + V (stem) + o/iye", dev:"Don't do → math + Verb + o/ea",
        note:"Just add 'mat' before the command form from Formula 1 or 2 — same o/iye ending either way.",
        examples: [
          {hi:"Mat dekhiye.", ta:"பார்க்காதீங்க.", en:"Please don't look.", source:true},
          {hi:"Mat likhiye.", ta:"எழுதாதீங்க.", en:"Please don't write.", source:true},
          {hi:"Mat jaaiye.", ta:"போகாதீங்க.", en:"Please don't go.", source:true},
          {hi:"Mat bolo.", ta:"பேசாதே.", en:"Don't speak.", source:false},
          {hi:"Chinta mat karo.", ta:"கவலைப்படாதே.", en:"Don't worry.", source:false},
        ],
      },
      {
        num:4, title:"Two verbs — do this, then that", formula:"V1 (stem) + ke + V2", dev:"2 verbs → v1 + கே + v2",
        note:"Chains two actions in sequence — V1 happens first, then V2. 'Ke' is the connector (from the same root as 'ke baad' in Formula 8, just shortened).",
        examples: [
          {hi:"Dekhke likho.", ta:"பாத்துட்டு எழுது.", en:"See it, then write.", source:true},
          {hi:"Likhke jaao.", ta:"எழுதிட்டு போ.", en:"Write it, then go.", source:true},
          {hi:"Jaake dekhiye.", ta:"போயிட்டு பாருங்க.", en:"Go, then have a look.", source:true},
          {hi:"Khaake so jaana.", ta:"சாப்பிட்டுட்டு தூங்கு.", en:"Eat, then go to sleep.", source:false},
        ],
      },
    ],
  },
  {
    cat: "Present tense",
    formulas: [
      {
        num:5, title:"\"To be\" — present copula", formula:"Main...hoon / Tum...ho / (everyone else)...hai", dev:"Present Conditions",
        note:"The basic 'am/is/are' pattern behind every simple present-state sentence — who you're talking about decides hoon/ho/hai/hain.",
        examples: [
          {hi:"Main bahar hoon.", ta:"நான் வெளியே இருக்கேன்.", en:"I am outside.", source:true},
          {hi:"Tum ghar par ho.", ta:"நீ வீட்ல இருக்க.", en:"You are at home.", source:false},
          {hi:"Woh doctor hai.", ta:"அவன் டாக்டர்.", en:"He is a doctor.", source:false},
          {hi:"Hum theek hain.", ta:"நாங்க நல்லா இருக்கோம்.", en:"We are fine.", source:false},
        ],
      },
      {
        num:6, title:"Present habitual / everyday routine", formula:"V + taa/tee/tae + hoon/ho/hai", dev:"Present Indefinite Tense (Regular Action / Immediate future)",
        note:"For things done regularly/by habit — 'I write', 'he goes every day' — not what's happening right this second (that's Formula 7).",
        examples: [
          {hi:"Main kahani likhta/likhti hoon.", ta:"நான் கதை எழுதுவேன்.", en:"I write a story (regularly).", source:true},
          {hi:"Raju roz mandir jaata hai.", ta:"ராஜு தினமும் கோயிலுக்குப் போவான்.", en:"Raju goes to the temple every day.", source:true},
          {hi:"Rani puja karti hai.", ta:"ரானி பூஜை பண்ணுவாள்.", en:"Rani does puja (daily).", source:true},
          {hi:"Hum Ravivaar bahar jaate hain.", ta:"நாங்க ஞாயிறு அன்னிக்கு வெளியே போவோம்.", en:"We go out on Sundays.", source:true},
          {hi:"Tum kahan rehte ho?", ta:"நீ எங்க இருக்க?", en:"Where do you live?", source:true},
        ],
      },
      {
        num:7, title:"Present continuous — happening right now", formula:"V + raha/rahi/rahe + hoon/ho/hai", dev:"Present Continuous Tense (Happening right now)",
        note:"For an action in progress at this exact moment — the direct contrast with Formula 6's habitual sense.",
        examples: [
          {hi:"Hum notes likh rahe hain.", ta:"நாங்க நோட்ஸ் எழுதிண்டு இருக்கோம்.", en:"We are writing notes.", source:true},
          {hi:"Raju ghar jaa raha hai.", ta:"ராஜு வீட்டுக்குப் போயிண்டு இருக்கான்.", en:"Raju is going home.", source:true},
          {hi:"Main board dekh raha/rahi hoon.", ta:"நான் போர்டை பாத்துண்டு இருக்கேன்.", en:"I am looking at the board.", source:true},
          {hi:"Tum kya kar rahe ho?", ta:"நீ என்ன பண்ணிண்டு இருக்க?", en:"What are you doing?", source:true},
        ],
      },
    ],
  },
  {
    cat: "Linking two actions — sequence, purpose, timing",
    formulas: [
      {
        num:8, title:"\"After doing X\"", formula:"V + ne + ke baad", dev:"v + பிறகு → Verb + கே + kae baadh",
        note:"Marks that the first action finishes before the second one starts.",
        examples: [
          {hi:"Likhne ke baad tumhara notes dikhaao.", ta:"எழுதின அப்புறம் உன் நோட்ஸை காமிச்சு.", en:"After writing, show me your notes.", source:true},
          {hi:"Ghar jaane ke baad mujhe call karo.", ta:"வீட்டுக்குப் போன அப்புறம் எனக்கு போன் பண்ணு.", en:"After going home, call me.", source:true},
          {hi:"Khaana khaane ke baad dawai lena.", ta:"சாப்பிட்ட அப்புறம் மருந்து சாப்பிடு.", en:"Take the medicine after eating.", source:false},
        ],
      },
      {
        num:9, title:"\"In order to / for the purpose of\"", formula:"V + ne + ke liye", dev:"v + காக → Verb + கே + kae Liyea",
        note:"Explains the reason/purpose behind another action — 'in order to V'.",
        examples: [
          {hi:"Movie dekhne ke liye hum jaa rahe hain.", ta:"படம் பார்க்கிறதுக்காக நாங்க போயிண்டு இருக்கோம்.", en:"We're going in order to watch a movie.", source:true},
          {hi:"Notes likhne ke liye ek pen dijiye.", ta:"நோட்ஸ் எழுதுறதுக்கு ஒரு பேனா குடுங்க.", en:"Give me a pen to write notes with.", source:true},
          {hi:"Sehat ke liye roz chalna chahiye.", ta:"ஆரோக்கியத்துக்காக தினமும் நடக்கணும்.", en:"You should walk daily for your health.", source:false},
        ],
      },
      {
        num:10, title:"\"While / during\"", formula:"V + te + samay / waqt", dev:"v + போது → v + கே + Samay / vakth",
        note:"Sets two things happening at the same time — 'while doing X, ...'.",
        examples: [
          {hi:"Likhte samay pareshaan mat karo.", ta:"எழுதுற நேரத்துல தொந்தரவு பண்ணாதே.", en:"Don't disturb (me) while (I'm) writing.", source:true},
          {hi:"Bahar jaate samay dhyaan se jaana.", ta:"வெளியே போற நேரத்துல கவனமா போ.", en:"Go carefully while going out.", source:true},
          {hi:"Khaana khaate waqt phone mat dekho.", ta:"சாப்பிடுற நேரத்துல போன் பாக்காதே.", en:"Don't look at your phone while eating.", source:false},
        ],
      },
    ],
  },
  {
    cat: "Future tense",
    formulas: [
      {
        num:11, title:"Future tense — full person table", formula:"Main: V+oonga/oongi · 3rd (no respect): V+ega/egi · 3rd (respect/plural): V+enge/engi · 2nd person: V+oge/ogi", dev:"Future Tense",
        note:"Same shape as the fuller Future tense table elsewhere in Grammar — this is the compact 4-row version from the course notes.",
        examples: [
          {hi:"Main dekhoonga / dekhoongi.", ta:"நான் பார்ப்பேன்.", en:"I will look/see.", source:true},
          {hi:"Raju dekhega.", ta:"ராஜு பார்ப்பான்.", en:"Raju will look/see.", source:true},
          {hi:"Papa dekhenge.", ta:"அப்பா பார்ப்பாரு.", en:"Papa will look/see. (respect)", source:true},
          {hi:"Rani dekhegi.", ta:"ரானி பார்ப்பாள்.", en:"Rani will look/see.", source:true},
          {hi:"Maa dekhengi.", ta:"அம்மா பார்ப்பாங்க.", en:"Maa will look/see. (respect)", source:true},
          {hi:"Tum dekhoge / dekhogi.", ta:"நீ பார்ப்ப.", en:"You will look/see.", source:true},
        ],
      },
      {
        num:12, title:"Future permission — \"may I\" / \"shall we\"", formula:"Main + V + oon? · Hum + V + yen?", dev:"Future Permission",
        note:"A question form of the future — asking for permission or suggesting a joint action.",
        examples: [
          {hi:"Main bahar jaaoon?", ta:"நான் வெளியே போகலாமா?", en:"May I go outside?", source:true},
          {hi:"Hum bahar jaayen?", ta:"நாங்க வெளியே போகலாமா?", en:"Shall we go outside?", source:true},
          {hi:"Main baithoon?", ta:"நான் உக்காரலாமா?", en:"May I sit?", source:false},
        ],
      },
    ],
  },
  {
    cat: "Past tense",
    formulas: [
      {
        num:13, title:"\"Was / were\" — past copula", formula:"tha / thee / thae", dev:"Past Tense (இரு → thha/thee/thae)",
        note:"The past version of Formula 5's 'to be' — attaches to the end of a sentence about a past state.",
        examples: [
          {hi:"Main bahar tha/thi.", ta:"நான் வெளியே இருந்தேன்.", en:"I was outside.", source:true},
          {hi:"Raju kahan tha?", ta:"ராஜு எங்க இருந்தான்?", en:"Where was Raju?", source:true},
          {hi:"Rani kahan thi?", ta:"ரானி எங்க இருந்தாள்?", en:"Where was Rani?", source:true},
        ],
      },
      {
        num:14, title:"Past continuous — was/were doing", formula:"V + raha/rahi/rahe + tha/thi/the", dev:"Past Continuous",
        note:"Formula 7 (present continuous) pushed into the past — an action that was in progress at some past moment.",
        examples: [
          {hi:"Hum notes likh rahe the.", ta:"நாங்க நோட்ஸ் எழுதிண்டு இருந்தோம்.", en:"We were writing notes.", source:true},
          {hi:"Raju ghar jaa raha tha.", ta:"ராஜு வீட்டுக்குப் போயிண்டு இருந்தான்.", en:"Raju was going home.", source:true},
          {hi:"Main so raha tha jab tum aaye.", ta:"நீ வந்தப்போ நான் தூங்கிண்டு இருந்தேன்.", en:"I was sleeping when you came.", source:false},
        ],
      },
      {
        num:15, title:"Simple past — verb changes to past", formula:"Type 1 (transitive, has an object): S + ne + V + aa/yaa.  Type 2 (intransitive, no object): S + V + aa/yaa/i/e", dev:"Verb changes into Past (எதை?/யாரை? → ne-type; எதை X யாரை X → no-ne type)",
        note:"This is exactly the ergative \"ne\" rule from Grammar's own dedicated section — Type 1 verbs (transitive: dekhna, likhna, khaana...) take 'ne' and the verb agrees with the object, not the subject. Type 2 verbs (intransitive: jaana, aana, sona...) never take 'ne'.",
        examples: [
          {hi:"Raju ghar gaya.", ta:"ராஜு வீட்டுக்குப் போனான்.", en:"Raju went home. (Type 2 — intransitive, no 'ne')", source:true},
          {hi:"Rani ne TV dekha.", ta:"ரானி டிவி பாத்தாள்.", en:"Rani watched TV. (Type 1 — transitive, takes 'ne')", source:true},
          {hi:"Humne notes likha.", ta:"நாங்க நோட்ஸ் எழுதினோம்.", en:"We wrote notes. (Type 1 — transitive, takes 'ne')", source:true},
        ],
      },
    ],
  },
  {
    cat: "Want to / have to / can",
    formulas: [
      {
        num:16, title:"\"Want to\" — desire", formula:"S + ko + V + naa + hai", dev:"v + ணும் → S + ko + v + na hei",
        note:"Says you want/need to do something — not yet an obligation (that's Formula 17).",
        examples: [
          {hi:"Mujhe jaana hai.", ta:"எனக்கு போகணும்.", en:"I want/need to go.", source:true},
          {hi:"Aapko likhna hai.", ta:"உங்களுக்கு எழுதணும்.", en:"You (polite) want/need to write.", source:true},
          {hi:"Tujhe dekhna hai.", ta:"உனக்கு பாக்கணும்.", en:"You (informal) want/need to see.", source:true},
        ],
      },
      {
        num:17, title:"\"Have to\" — obligation", formula:"S + ko + V + naa + padega", dev:"v + ஆகணும் → S + ko + v + Na + Padega",
        note:"A stronger version of Formula 16 — not just wanting to, but being compelled/forced to.",
        examples: [
          {hi:"Mujhe office jaana padega.", ta:"எனக்கு ஆபீஸ் போக வேண்டியிருக்கும்.", en:"I will have to go to the office.", source:true},
          {hi:"Usko notes likhna padega.", ta:"அவனுக்கு நோட்ஸ் எழுத வேண்டியிருக்கும்.", en:"He will have to write notes.", source:true},
          {hi:"Humein jaldi uthna padega.", ta:"நாங்க சீக்கிரம் எழுந்திருக்க வேண்டியிருக்கும்.", en:"We will have to wake up early.", source:false},
        ],
      },
      {
        num:18, title:"\"Can\" — ability", formula:"V + sakta/sakti/sakte + hoon/ho/hai", dev:"v + முடியும்",
        note:"Adds the sense of ability/possibility to any verb — the same 'sakna' helper verb covered in the Compound/friend-verbs section, listed there as a modal rather than a true friend-verb.",
        examples: [
          {hi:"Main aa sakta/sakti hoon.", ta:"என்னால வர முடியும்.", en:"I can come.", source:true},
          {hi:"Main nahi aa sakta/sakti hoon.", ta:"என்னால வர முடியாது.", en:"I cannot come.", source:true},
          {hi:"Kya aap madad kar sakte hain?", ta:"உங்களால உதவி பண்ண முடியுமா?", en:"Can you (polite) help?", source:false},
        ],
      },
    ],
  },
  {
    cat: "Completive past & about-to-do",
    formulas: [
      {
        num:19, title:"Completive past — common vector-verb pasts", formula:"Gaya-type (jaana→gaya) · Diya-type (dena→diya) · Liya-type (lena→liya)", dev:"Past Perfect",
        note:"These three irregular past forms (gaya/diya/liya) are exactly the V2s from the Compound/\"friend\" verbs section — pairing them with a V1 gives the completive past: 'dekh liya' (checked/saw — finished, for oneself), 'likh liya' (wrote — finished), 'chala gaya' (walked off/left).",
        examples: [
          {hi:"Maine dekh liya.", ta:"நான் பாத்துட்டேன்.", en:"I('ve) checked/seen it. (dekhna + liya)", source:true},
          {hi:"Maine likh liya.", ta:"நான் எழுதிட்டேன்.", en:"I('ve) written it. (likhna + liya)", source:true},
          {hi:"Woh chala gaya.", ta:"அவன் நடந்துட்டுப் போயிட்டான்.", en:"He walked off / left. (chalna + gaya)", source:true},
          {hi:"Maine usse bata diya.", ta:"நான் அவனுக்கு சொல்லிட்டேன்.", en:"I told him (already). (bataana + diya)", source:false},
        ],
      },
      {
        num:20, title:"\"About to do\" — imminent action", formula:"V + ne + wala/wali/wale", dev:"About to do",
        note:"Says an action is just about to happen — this is the same '-wala/-wali/-wale' suffix covered in its own Grammar section (which also shows the noun-forming use, e.g. 'doodh wala' = the milkman); here it's specifically the verb + ne + wala pattern for imminent future.",
        examples: [
          {hi:"Main movie dekhne wala/wali hoon.", ta:"நான் படம் பார்க்கப் போறேன்.", en:"I am about to watch a movie.", source:true},
          {hi:"Bus aane wali hai.", ta:"பஸ் வரப் போகுது.", en:"The bus is about to come.", source:false},
          {hi:"Baarish hone wali hai.", ta:"மழை பெய்யப் போகுது.", en:"It's about to rain.", source:false},
        ],
      },
    ],
  },
];

if (typeof module !== "undefined") module.exports = { SENTENCE_FORMULA_CATEGORIES };
