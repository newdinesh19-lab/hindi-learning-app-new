// Grammar reference — merged from the Master Notes ("Quick grammar patterns", "Question words",
// "Possession patterns", "Commands & negative commands") and the Personal Teaching Instructions
// (ko/ke/se, yeh/ise/yahi/isi, doon/loon, gender agreement, postpositions).
const QUICK_PATTERNS = [
  {name:"Order / informal command", formula:"Verb + o", example:"Dekho = look/see · Rakho = keep · Chalo = go/come along · Karo = do · Bhejo = send"},
  {name:"Polite request", formula:"Verb + i(y)e", example:"Dekhiye = please look · Rakhiye = please keep · Chaliye = please come/go · Kijiye/Karo (context-dependent) = please do"},
  {name:"Don't do it", formula:"Verb + mat", example:"Mat dekho = don't look · Mat rakho = don't keep · Mat karo = don't do · Mat bhejo = don't send"},
  {name:"Need / obligation", formula:"Verb-na + hai", example:"Dekhna hai = have to see/watch · Karna hai = have to do · Padhna hai = have to study",
   tamilCue:"Tamil cue: the matching Tamil verb almost always ends in the '-num' sound (வேண்டும்) — e.g. 'Sivaji Nagar jaana hai' = 'Sivaji Nagar poganum' (சிவாஜி நகர் போகணும்)."},
  {name:"Present habitual", formula:"Verb + ta/ti/te + hoon/hai", example:"Main roz dekhta hoon = I see/watch every day"},
  {name:"Present continuous", formula:"Verb + raha/rahi/rahe + hoon/hai", example:"Main dekh raha hoon = I am watching/looking"},
  {name:"Future — main", formula:"Verb + oonga/oongi", example:"Main dekhoonga/dekhoongi = I will see"},
  {name:"Future — tum", formula:"Verb + oge/ogi", example:"Tum dekhoge/dekhogi = you will see"},
  {name:"Future — aap/hum/ve (polite/plural)", formula:"Verb + enge/engi", example:"Aap dekhenge/dekhengi = you will see"},
  {name:"After doing X", formula:"Verb + ne ke baad", example:"Kaam karne ke baad = after doing the work"},
  {name:"While doing X", formula:"Verb + te samay", example:"Kaam karte samay = while doing the work"},
  {name:"Can / cannot", formula:"Verb + sakta/sakti hai", example:"Main kar sakta hoon = I can do it"},
  {name:"Have to / must", formula:"Verb + na padega", example:"Karna padega = will have to do"},
  {name:"Completed action", formula:"Verb + liya/diya/gaya etc.", example:"Maine kha liya = I have eaten / I finished eating"},
  {name:"Past habitual (used to)", formula:"Verb + ta/ti/te + tha/thi/the", example:"Main dekhta tha = I used to see/watch · Main aata tha = I used to come"},
  {name:"Sequential actions (do X, then Y)", formula:"V1 + kar + V2", example:"Nahaa kar khao = bathe, then eat · Likh kar bhejo = write it, then send it"},
  {name:"Thinking of doing X", formula:"Verb-ne + ki soch raha/rahi hoon", example:"Job badalne ki soch raha/rahi hoon = I'm thinking of changing my job · Ghar jaane ki soch raha hoon = I'm thinking of going home",
   tamilCue:"Soch = think. This is the ongoing/continuous form (soch raha/rahi hoon = 'am thinking'), built the same way as any other -raha/-rahi hoon continuous verb."},
  {name:"How someone feels — \"X ko + feeling + lagna/hona/aana\"", formula:"[Person]-ko + feeling/problem + lagna/hona/aana", example:"Mujhe bhookh lagi hai = I'm hungry · Mujhe dard ho raha hai = I'm in pain · Bachche ko chot lag sakti hai = the child might get hurt",
   tamilCue:"The feeling is the grammatical subject, not the person — literally \"to me, hunger is striking\". See the formulas above for 10 worked examples, including clinically useful ones like chakkar aana (feel dizzy) and ulti aana (feel nauseous)."},
];

// Full future-tense paradigm, built on one sample verb ("aana" = to come), showing how the
// ending changes by person AND by gender. This is the "V+o / V+ea / mat+V / V1+kar+V2" style
// formula table plus the future-tense person/gender table from class notes.
const COMMAND_FORMULA_TABLE = [
  {formula:"V + o", use:"Informal order (to tum)", example:"Aao = come (informal order)"},
  {formula:"V + iye", use:"Polite request (to aap)", example:"Aaiye = please come (polite)"},
  {formula:"Mat + V + o/iye", use:"Don't do it (informal/polite)", example:"Mat aao = don't come · Mat aaiye = please don't come"},
  {formula:"V1 + kar + V2 + o/iye", use:"Do V1, then V2, as an order/request", example:"Aakar baitho = come and (then) sit · Nahaakar aaiye = please bathe and (then) come"},
];

const FUTURE_PARADIGM = [
  {person:"Main (I)", m:"Aaunga", f:"Aaungi", note:"1st person singular"},
  {person:"Tum (you, informal)", m:"Aaoge", f:"Aaogi", note:"2nd person informal"},
  {person:"Aap / Ve (you polite / they, respectful)", m:"Aayenge", f:"Aayengi", note:"2nd/3rd person polite or plural"},
  {person:"Woh (he/she, plain)", m:"Aayega", f:"Aayegi", note:"3rd person singular"},
  {person:"Hum (we)", m:"Aayenge", f:"Aayengi", note:"1st person plural"},
];

// Irregular futures: "lena" (to take) and "dena" (to give) double the vowel instead of
// following the regular V+oonga pattern (it is NOT "leunga"/"deunga").
const FUTURE_IRREGULARS = [
  {root:"Le (take)", main_m:"Loonga", main_f:"Loongi", woh_m:"Lega", woh_f:"Legi", note:"Not 'leunga' — the e doubles into 'oo'"},
  {root:"De (give)", main_m:"Doonga", main_f:"Doongi", woh_m:"Dega", woh_f:"Degi", note:"Not 'deunga' — same doubling pattern as 'lena'"},
];

// SUBJUNCTIVE ("should I / let's / may") — the mood behind forms like "karoon" in "Main kya
// karoon?" (What should I do?). Grammatically it's a separate mood from the future, not literally
// the future with a bit cut off — but as a genuinely useful shortcut, the subjunctive form for
// EVERY person happens to look exactly like that person's future form with the gendered ending
// (-ga/-gi/-ge) trimmed off. That's why "karoon" looks like it came from "karoonga".
const SUBJUNCTIVE_SHORTCUT_NOTE = "Shortcut: take any future-tense form and drop the trailing -ga/-gi/-ge (keep the rest) — what's left is the subjunctive ('should/let's/may') form. Karoonga → karoon. Karega → kare. Karoge → karo. Karenge → karein. This works across every person, not just 'main'.";

const SUBJUNCTIVE_PARADIGM = [
  {person:"Main (I)", future:"karoonga / karoongi", subjunctive:"karoon", note:"No gender split, unlike the future (karoonga vs karoongi) — 'karoon' covers everyone. Used for 'should I ___?' / 'let me ___'."},
  {person:"Tu (you, intimate)", future:"karega / karegi", subjunctive:"kare", note:"Rare in polite speech — 'tu' itself is intimate/rough."},
  {person:"Tum (you, informal)", future:"karoge / karogi", subjunctive:"karo", note:"Same shape as the informal imperative 'karo' (do it!) — tone and context tell them apart, not spelling."},
  {person:"Yeh / Woh (he/she/it/this/that)", future:"karega / karegi", subjunctive:"kare", note:"Used for 'should he/she/it ___?' and in purpose/conditional clauses."},
  {person:"Hum (we)", future:"karenge / karengi", subjunctive:"karein", note:"The 'let's ___' / 'shall we ___?' form — very high-frequency in daily speech."},
  {person:"Aap / Ve (you-polite / they)", future:"karenge / karengi", subjunctive:"karein", note:"Same ending as hum — used for soft, polite suggestions ('you should ___')."},
];

// 50 worked examples across the 5 everyday subjunctive patterns, in Hindi / Tamil / Tanglish /
// English — direct answer to "build at least 50 examples of similar sentences" for the
// karoon-type pattern the user pointed out.
const SUBJUNCTIVE_EXAMPLES = [
  // ---- A: "Main kya + V-oon?" — What should I ___? (15) ----
  {cat:"What should I ___?", hi:"Main kya karoon?", ta:"நான் என்ன பண்ணட்டும்?", tanglish:"naan enna pannattum?", en:"What should I do?"},
  {cat:"What should I ___?", hi:"Main kya khaoon?", ta:"நான் என்ன சாப்பிடட்டும்?", tanglish:"naan enna saapidattum?", en:"What should I eat?"},
  {cat:"What should I ___?", hi:"Main kya piyoon?", ta:"நான் என்ன குடிக்கட்டும்?", tanglish:"naan enna kudikkattum?", en:"What should I drink?"},
  {cat:"What should I ___?", hi:"Main kya kahoon?", ta:"நான் என்ன சொல்லட்டும்?", tanglish:"naan enna sollattum?", en:"What should I say?"},
  {cat:"What should I ___?", hi:"Main kya likhoon?", ta:"நான் என்ன எழுதட்டும்?", tanglish:"naan enna ezhudhattum?", en:"What should I write?"},
  {cat:"What should I ___?", hi:"Main kya poochoon?", ta:"நான் என்ன கேட்கட்டும்?", tanglish:"naan enna ketkattum?", en:"What should I ask?"},
  {cat:"What should I ___?", hi:"Main kya dekhoon?", ta:"நான் என்ன பார்க்கட்டும்?", tanglish:"naan enna paarkkattum?", en:"What should I watch/see?"},
  {cat:"What should I ___?", hi:"Main kya banaoon?", ta:"நான் என்ன தயார் பண்ணட்டும்?", tanglish:"naan enna thayaar pannattum?", en:"What should I make?"},
  {cat:"What should I ___?", hi:"Main kya padhoon?", ta:"நான் என்ன படிக்கட்டும்?", tanglish:"naan enna padikkattum?", en:"What should I read/study?"},
  {cat:"What should I ___?", hi:"Main kya sochoon?", ta:"நான் என்ன யோசிக்கட்டும்?", tanglish:"naan enna yosikkattum?", en:"What should I think (about)?"},
  {cat:"What should I ___?", hi:"Main kya pehnoon?", ta:"நான் என்ன போடட்டும்?", tanglish:"naan enna podattum?", en:"What should I wear?"},
  {cat:"What should I ___?", hi:"Main kya gaoon?", ta:"நான் என்ன பாடட்டும்?", tanglish:"naan enna paadattum?", en:"What should I sing?"},
  {cat:"What should I ___?", hi:"Main kya khareedoon?", ta:"நான் என்ன வாங்கட்டும்?", tanglish:"naan enna vaangattum?", en:"What should I buy?"},
  {cat:"What should I ___?", hi:"Main kya seekhoon?", ta:"நான் என்ன கத்துக்கட்டும்?", tanglish:"naan enna kathukkattum?", en:"What should I learn?"},
  {cat:"What should I ___?", hi:"Main kya kheloon?", ta:"நான் என்ன விளையாடட்டும்?", tanglish:"naan enna vilaiyaadattum?", en:"What should I play?"},

  // ---- B: "Main + [where/when/how/whom/how-much] + V-oon?" (10) ----
  {cat:"Where/when/how should I ___?", hi:"Main kahan jaoon?", ta:"நான் எங்க போகட்டும்?", tanglish:"naan enga pogattum?", en:"Where should I go?"},
  {cat:"Where/when/how should I ___?", hi:"Main kab aaoon?", ta:"நான் எப்போ வரட்டும்?", tanglish:"naan eppo varattum?", en:"When should I come?"},
  {cat:"Where/when/how should I ___?", hi:"Main kaise jaoon?", ta:"நான் எப்படி போகட்டும்?", tanglish:"naan eppadi pogattum?", en:"How should I go?"},
  {cat:"Where/when/how should I ___?", hi:"Main kitna doon?", ta:"நான் எவ்வளவு கொடுக்கட்டும்?", tanglish:"naan evvalavu kodukkattum?", en:"How much should I give?"},
  {cat:"Where/when/how should I ___?", hi:"Main kise bulaoon?", ta:"நான் யாரை கூப்பிடட்டும்?", tanglish:"naan yaarai kooppidattum?", en:"Whom should I call?"},
  {cat:"Where/when/how should I ___?", hi:"Main kahan baithoon?", ta:"நான் எங்க உட்காரட்டும்?", tanglish:"naan enga utkaarattum?", en:"Where should I sit?"},
  {cat:"Where/when/how should I ___?", hi:"Main kya lekar aaoon?", ta:"நான் என்ன எடுத்துக்கிட்டு வரட்டும்?", tanglish:"naan enna eduthukittu varattum?", en:"What should I bring (with me)?"},
  {cat:"Where/when/how should I ___?", hi:"Main kise bhejoon?", ta:"நான் யாருக்கு அனுப்பட்டும்?", tanglish:"naan yaarukku anuppattum?", en:"Whom should I send (it to)?"},
  {cat:"Where/when/how should I ___?", hi:"Main kab shuru karoon?", ta:"நான் எப்போ ஆரம்பிக்கட்டும்?", tanglish:"naan eppo aarambikkattum?", en:"When should I start?"},
  {cat:"Where/when/how should I ___?", hi:"Main kahan rakhoon?", ta:"நான் எங்க வைக்கட்டும்?", tanglish:"naan enga vaikkattum?", en:"Where should I keep (it)?"},

  // ---- C: "Hum + V-ein" statements — Let's ___ (10) ----
  {cat:"Let's ___ (hum, statement)", hi:"Chalein, khaana khaayein.", ta:"வாங்க, சாப்பாடு சாப்பிடலாம்.", tanglish:"vaanga, saapaadu saapidalaam.", en:"Come on, let's eat."},
  {cat:"Let's ___ (hum, statement)", hi:"Chalein, movie dekhein.", ta:"வாங்க, படம் பார்க்கலாம்.", tanglish:"vaanga, padam paarkkalaam.", en:"Let's watch a movie."},
  {cat:"Let's ___ (hum, statement)", hi:"Hum kal milein.", ta:"நாம நாளைக்கு சந்திக்கலாம்.", tanglish:"naama naalaikku sandhikkalaam.", en:"Let's meet tomorrow."},
  {cat:"Let's ___ (hum, statement)", hi:"Hum yahan rukein.", ta:"நாம இங்க நிக்கலாம்.", tanglish:"naama inga nikkalaam.", en:"Let's stop here."},
  {cat:"Let's ___ (hum, statement)", hi:"Hum jaldi nikalein.", ta:"நாம சீக்கிரம் கிளம்பலாம்.", tanglish:"naama seekkiram kilambalaam.", en:"Let's leave early."},
  {cat:"Let's ___ (hum, statement)", hi:"Hum saath mein chalein.", ta:"நாம ஒன்னாக போகலாம்.", tanglish:"naama onnaaga pogalaam.", en:"Let's go together."},
  {cat:"Let's ___ (hum, statement)", hi:"Hum thoda ruk jaayein.", ta:"நாம கொஞ்சம் காத்திருக்கலாம்.", tanglish:"naama konjam kaathirukkalaam.", en:"Let's wait a bit."},
  {cat:"Let's ___ (hum, statement)", hi:"Hum yeh plan badal dein.", ta:"நாம இந்த plan-ஐ மாத்தலாம்.", tanglish:"naama intha plan-ai maathalaam.", en:"Let's change this plan."},
  {cat:"Let's ___ (hum, statement)", hi:"Hum ab shuru karein.", ta:"நாம இப்போ ஆரம்பிக்கலாம்.", tanglish:"naama ippo aarambikkalaam.", en:"Let's start now."},
  {cat:"Let's ___ (hum, statement)", hi:"Hum thoda aaram karein.", ta:"நாம கொஞ்சம் ஓய்வெடுக்கலாம்.", tanglish:"naama konjam oivedukkalaam.", en:"Let's rest a bit."},

  // ---- D: "Hum + [Q-word] + V-ein?" — Shall we ___? (10) ----
  {cat:"Shall we ___? (hum, question)", hi:"Hum kab milein?", ta:"நாம எப்போ சந்திக்கலாம்?", tanglish:"naama eppo sandhikkalaam?", en:"When shall we meet?"},
  {cat:"Shall we ___? (hum, question)", hi:"Hum kahan chalein?", ta:"நாம எங்க போகலாம்?", tanglish:"naama enga pogalaam?", en:"Where shall we go?"},
  {cat:"Shall we ___? (hum, question)", hi:"Hum kya order karein?", ta:"நாம என்ன order பண்ணலாம்?", tanglish:"naama enna order pannalaam?", en:"What shall we order?"},
  {cat:"Shall we ___? (hum, question)", hi:"Hum kaise shuru karein?", ta:"நாம எப்படி ஆரம்பிக்கலாம்?", tanglish:"naama eppadi aarambikkalaam?", en:"How shall we start?"},
  {cat:"Shall we ___? (hum, question)", hi:"Hum kya khaayein?", ta:"நாம என்ன சாப்பிடலாம்?", tanglish:"naama enna saapidalaam?", en:"What shall we eat?"},
  {cat:"Shall we ___? (hum, question)", hi:"Hum kitna waqt dein?", ta:"நாம எவ்வளவு நேரம் கொடுக்கலாம்?", tanglish:"naama evvalavu neram kodukkalaam?", en:"How much time shall we give (it)?"},
  {cat:"Shall we ___? (hum, question)", hi:"Hum kis se poochein?", ta:"நாம யாரிடம் கேக்கலாம்?", tanglish:"naama yaaridam kekkalaam?", en:"Whom shall we ask?"},
  {cat:"Shall we ___? (hum, question)", hi:"Hum kya khareedein?", ta:"நாம என்ன வாங்கலாம்?", tanglish:"naama enna vaangalaam?", en:"What shall we buy?"},
  {cat:"Shall we ___? (hum, question)", hi:"Hum kaunsi film dekhein?", ta:"நாம எந்த படம் பார்க்கலாம்?", tanglish:"naama endha padam paarkkalaam?", en:"Which movie shall we watch?"},
  {cat:"Shall we ___? (hum, question)", hi:"Hum kab tak intezaar karein?", ta:"நாம எப்போ வரைக்கும் காத்திருக்கலாம்?", tanglish:"naama eppo varaikkum kaathirukkalaam?", en:"Until when shall we wait?"},

  // ---- E: Polite "Aap + V-ein" — soft suggestions (5) ----
  {cat:"Polite suggestion (aap)", hi:"Aap thoda aaram karein.", ta:"நீங்க கொஞ்சம் ஓய்வெடுங்க.", tanglish:"neenga konjam oiveduunga.", en:"You should rest a bit."},
  {cat:"Polite suggestion (aap)", hi:"Aap doctor se milein.", ta:"நீங்க doctor-ஐ பாருங்க.", tanglish:"neenga doctor-ai paarunga.", en:"You should see a doctor."},
  {cat:"Polite suggestion (aap)", hi:"Aap yeh form bharein.", ta:"நீங்க இந்த form-ஐ நிரப்புங்க.", tanglish:"neenga intha form-ai nirappunga.", en:"You should fill this form."},
  {cat:"Polite suggestion (aap)", hi:"Aap zara dhyaan rakhein.", ta:"நீங்க கொஞ்சம் கவனமா இருங்க.", tanglish:"neenga konjam kavanamaa irunga.", en:"You should be a little careful."},
  {cat:"Polite suggestion (aap)", hi:"Aap seedhe jaayein, phir daayen mudein.", ta:"நீங்க நேரா போங்க, அப்புறம் வலது பக்கம் திரும்புங்க.", tanglish:"neenga neraa poonga, appuram valadhu pakkam thirumbunga.", en:"Go straight, then turn right."},

  // ---- F: "Main ___ doon/karoon?" — Shall I ___? (offering help, 10) ----
  {cat:"Shall I ___? (offering help)", hi:"Isse utha doon?", ta:"இதை தூக்கி வைக்கட்டுமா?", tanglish:"idhai thooki vaikkattumaa?", en:"Shall I pick this up?"},
  {cat:"Shall I ___? (offering help)", hi:"Isse le aaoon?", ta:"இதை எடுத்துட்டு வரட்டுமா?", tanglish:"idhai eduthittu varattumaa?", en:"Shall I bring this?"},
  {cat:"Shall I ___? (offering help)", hi:"Isse le jaaoon?", ta:"இதை எடுத்துட்டு போகட்டுமா?", tanglish:"idhai eduthittu pogattumaa?", en:"Shall I take this away?"},
  {cat:"Shall I ___? (offering help)", hi:"Darwaaza khol doon?", ta:"கதவை திறக்கட்டுமா?", tanglish:"kadhavai thirakkattumaa?", en:"Shall I open the door?"},
  {cat:"Shall I ___? (offering help)", hi:"Darwaaza band kar doon?", ta:"கதவை மூடட்டுமா?", tanglish:"kadhavai moodattumaa?", en:"Shall I close the door?"},
  {cat:"Shall I ___? (offering help)", hi:"Paani le aaoon?", ta:"தண்ணி எடுத்துட்டு வரட்டுமா?", tanglish:"thanni eduthittu varattumaa?", en:"Shall I bring water?"},
  {cat:"Shall I ___? (offering help)", hi:"Main madad kar doon?", ta:"நான் உதவி பண்ணட்டுமா?", tanglish:"naan udhavi pannattumaa?", en:"Shall I help?"},
  {cat:"Shall I ___? (offering help)", hi:"Main aapko bata doon?", ta:"நான் உங்களுக்கு சொல்லட்டுமா?", tanglish:"naan ungalukku sollattumaa?", en:"Shall I tell you?"},
  {cat:"Shall I ___? (offering help)", hi:"Isse yahaan rakh doon?", ta:"இதை இங்க வைக்கட்டுமா?", tanglish:"idhai inga vaikkattumaa?", en:"Shall I keep this here?"},
  {cat:"Shall I ___? (offering help)", hi:"Main ye kaam kar loon?", ta:"நான் இந்த வேலையை பண்ணிக்கிட்டுமா?", tanglish:"naan intha velaiyai pannikittumaa?", en:"Shall I do this work?"},
];

// THE "NE" MARKER (ergative construction) — the subject of a TRANSITIVE verb takes "ne" in the
// simple/perfective past. Two pronoun groups behave differently: main/tum/aap/hum simply add a
// separate "ne" (written as one word: maine, tumne, aapne, humne); the "this/that/these/those"
// pronouns take an irregular FUSED form instead of a plain "+ne" (isne, usne, inhone, unhone —
// NOT "yehne/wohne/yene/wene").
const ERGATIVE_NE_NOTE = "Rule: transitive verb + simple past (kiya, dekha, khaya, likha...) → the subject needs 'ne'. Intransitive verbs (aana, jaana, hona, sona...) never take 'ne' — 'Main aaya', not 'Mainne aaya'. And the trap that catches most learners: the verb then agrees with the OBJECT's gender/number, not the subject's — 'Maine kitab padhi' (I read the book) uses 'padhi' (feminine) because 'kitab' is feminine, even though 'main' could be a man.";

const ERGATIVE_NE_TABLE = [
  {pronoun:"Main (I)", withNe:"Maine", note:"Written as one fused word — not 'main ne' as two."},
  {pronoun:"Tum (you, informal)", withNe:"Tumne", note:"Fused, one word."},
  {pronoun:"Aap (you, polite)", withNe:"Aapne", note:"Fused, one word."},
  {pronoun:"Hum (we)", withNe:"Humne", note:"Fused, one word."},
  {pronoun:"Yeh / Ise (this / this one, as subject)", withNe:"Isne", note:"Irregular — built on the oblique 'is', not 'yehne'."},
  {pronoun:"Woh / Use (that / that one, as subject)", withNe:"Usne", note:"Irregular — built on the oblique 'us', not 'wohne'."},
  {pronoun:"Ye (these / they, polite or plural)", withNe:"Inhone", note:"Irregular — not 'inne'. Easy to mishear/misspell."},
  {pronoun:"Wo (those / they, polite or plural)", withNe:"Unhone", note:"Irregular — not 'unne'. Pairs with 'unhone' the way 'inhone' pairs with 'ye'."},
];

const ERGATIVE_NE_EXAMPLES = [
  {hi:"Maine kaam kiya.", ta:"நான் வேலை பண்ணினேன்.", tanglish:"naan velai pannien.", en:"I did the work."},
  {hi:"Maine kitab padhi.", ta:"நான் புத்தகத்தை படித்தேன்.", tanglish:"naan pusthagathai padithen.", en:"I read the book. ('padhi' agrees with feminine 'kitab', not with 'main')"},
  {hi:"Tumne khaana banaya.", ta:"நீ சாப்பாடு பண்ணினே.", tanglish:"nee saapaadu pannine.", en:"You made the food."},
  {hi:"Aapne yeh kyon kiya?", ta:"நீங்க ஏன் இதை பண்ணீங்க?", tanglish:"neenga yean idhai pannenga?", en:"Why did you do this?"},
  {hi:"Humne ticket khareeda.", ta:"நாங்க டிக்கெட் வாங்கினோம்.", tanglish:"naanga ticket vaanginom.", en:"We bought the ticket."},
  {hi:"Isne mujhe bataya.", ta:"இவன் என்கிட்ட சொன்னான்.", tanglish:"ivan enkitta sonnaan.", en:"This one (he) told me."},
  {hi:"Usne phone kiya.", ta:"அவன் போன் பண்ணினான்.", tanglish:"avan phone pannaan.", en:"He called (made a phone call)."},
  {hi:"Inhone sab kuch samjhaya.", ta:"இவங்க எல்லாத்தையும் விளக்கினாங்க.", tanglish:"ivanga ellaathaiyum vilakkinaanga.", en:"They (respectful) explained everything."},
  {hi:"Unhone gaadi bech di.", ta:"அவங்க வண்டியை வித்துட்டாங்க.", tanglish:"avanga vandiyai vitutaanga.", en:"They sold the car."},
  {hi:"Kisne yeh kiya?", ta:"யார் இதை பண்ணது?", tanglish:"yaar idhai pannathu?", en:"Who did this? ('kisne' = kis + ne, the question-word version of the same rule)"},
];

// Extra past-tense practice sentences, added from a real-life conversations workbook —
// grouped into three sets (recounting past facts, hai→tha pairs, and plain simple-past verbs).
const PAST_PRACTICE_EXAMPLES = [
  // ---- Recounting past facts (police/bank-style statements, 8) ----
  {cat:"Recounting past facts", hi:"Bachche baahar khel rahe the.", ta:"குழந்தைகள் வெளியில விளையாடிட்டு இருந்தாங்க.", tanglish:"kuzhandhaigal veliyila vilaiyaadittu irundhaanga.", en:"The children were playing outside."},
  {cat:"Recounting past facts", hi:"Us car ke andar koi tha.", ta:"அந்த காரு உள்ள யாரோ இருந்தாங்க.", tanglish:"andha car ulla yaaro irundhaanga.", en:"There was someone inside that car."},
  {cat:"Recounting past facts", hi:"Officer das baje se pehle aaye.", ta:"அதிகாரி பத்து மணிக்கு முன்னாடி வந்தாரு.", tanglish:"adhigaari pathu manikku munnaadi vandhaaru.", en:"The officer came before ten o'clock."},
  {cat:"Recounting past facts", hi:"Aap log das baje ke baad kaun-kaun aaye?", ta:"நீங்க பத்து மணிக்கு பிறகு யாரெல்லாம் வந்தீங்க?", tanglish:"neenga pathu manikku piragu yaarellaam vandheenga?", en:"Which of you came after ten o'clock?"},
  {cat:"Recounting past facts", hi:"Mere dost ne mujhe paanch sau rupaye diye.", ta:"என் நண்பன் எனக்கு ஐந்நூறு ரூபாய் கொடுத்தான்.", tanglish:"en nanban enakku ainnooru rupaai koduthaan.", en:"My friend gave me five hundred rupees."},
  {cat:"Recounting past facts", hi:"Woh post office ke paas tha.", ta:"அது post office பக்கத்துல இருந்துச்சு.", tanglish:"adhu post office pakkathula irundhuchu.", en:"It/He was near the post office."},
  {cat:"Recounting past facts", hi:"Main laptop ke saamne do ghante baitha tha.", ta:"நான் laptop முன்னாடி ரெண்டு மணி நேரம் உக்காந்திருந்தேன்.", tanglish:"naan laptop munnaadi rendu mani neram ukkaandhirundhen.", en:"I was sitting in front of the laptop for two hours."},
  {cat:"Recounting past facts", hi:"Usne mere baare mein kya kaha?", ta:"அவன் என்னைப் பத்தி என்ன சொன்னான்?", tanglish:"avan ennaip pathi enna sonnaan?", en:"What did he say about me?"},

  // ---- "Hai" → "tha" — is vs. was (13) ----
  {cat:"Is / was — hai → tha", hi:"Wahan log hain.", ta:"அங்க ஆக்கள் இருக்காங்க.", tanglish:"anga aakkal irukkaanga.", en:"There are people there."},
  {cat:"Is / was — hai → tha", hi:"Wahan log the.", ta:"அங்க ஆக்கள் இருந்தாங்க.", tanglish:"anga aakkal irundhaanga.", en:"There were people there."},
  {cat:"Is / was — hai → tha", hi:"Ghar mein bijli hai.", ta:"வீட்ல கரண்ட் இருக்கு.", tanglish:"veetla current irukku.", en:"There is electricity in the house."},
  {cat:"Is / was — hai → tha", hi:"Ghar mein bijli thi.", ta:"வீட்ல கரண்ட் இருந்துச்சு.", tanglish:"veetla current irundhuchu.", en:"There was electricity in the house."},
  {cat:"Is / was — hai → tha", hi:"Yeh aasaan hai.", ta:"இது easy-ஆ இருக்கு.", tanglish:"idhu easy-aa irukku.", en:"This is easy."},
  {cat:"Is / was — hai → tha", hi:"Yeh aasaan tha.", ta:"இது easy-ஆ இருந்துச்சு.", tanglish:"idhu easy-aa irundhuchu.", en:"This was easy."},
  {cat:"Is / was — hai → tha", hi:"Mausam bahut achha hai.", ta:"வானிலை ரொம்ப நல்லா இருக்கு.", tanglish:"vaanilai rompa nallaa irukku.", en:"The weather is very good."},
  {cat:"Is / was — hai → tha", hi:"Mausam bahut achha tha.", ta:"வானிலை ரொம்ப நல்லா இருந்துச்சு.", tanglish:"vaanilai rompa nallaa irundhuchu.", en:"The weather was very good."},
  {cat:"Is / was — hai → tha", hi:"Dukaan khuli hai.", ta:"கடை திறந்திருக்கு.", tanglish:"kadai thirandhirukku.", en:"The shop is open."},
  {cat:"Is / was — hai → tha", hi:"Dukaan khuli thi.", ta:"கடை திறந்திருந்துச்சு.", tanglish:"kadai thirandhirundhuchu.", en:"The shop was open."},
  {cat:"Is / was — hai → tha", hi:"Us dukaan mein sab kuch mehenga hai.", ta:"அந்த கடைல எல்லாமே expensive-ஆ இருக்கு.", tanglish:"andha kadaila ellaame expensive-aa irukku.", en:"Everything in that shop is expensive."},
  {cat:"Is / was — hai → tha", hi:"Is raaste par traffic hai.", ta:"இந்த வழில traffic இருக்கு.", tanglish:"indha vazhila traffic irukku.", en:"There is traffic on this road."},
  {cat:"Is / was — hai → tha", hi:"Yeh jagah saaf hai.", ta:"இந்த இடம் clean-ஆ இருக்கு.", tanglish:"indha idam clean-aa irukku.", en:"This place is clean."},

  // ---- Plain simple-past verbs (10) ----
  {cat:"Simple past verbs", hi:"Woh baahar gaya.", ta:"அவன் வெளியே போனான்.", tanglish:"avan veliye ponaan.", en:"He went outside."},
  {cat:"Simple past verbs", hi:"Woh dukaan gayi.", ta:"அவள் கடைக்கு போனாள்.", tanglish:"aval kadaikku ponaal.", en:"She went to the shop."},
  {cat:"Simple past verbs", hi:"Ve ghar aaye.", ta:"அவங்க வீட்டுக்கு வந்தாங்க.", tanglish:"avanga veettukku vandhaanga.", en:"They came home."},
  {cat:"Simple past verbs", hi:"Papa jaldi aaye.", ta:"அப்பா சீக்கிரமா வந்தாரு.", tanglish:"appa seekiramaa vandhaaru.", en:"Dad came early."},
  {cat:"Simple past verbs", hi:"Tum kal kahaan gaye?", ta:"நீ நேத்து எங்க போன?", tanglish:"nee nethu enga pona?", en:"Where did you go yesterday?"},
  {cat:"Simple past verbs", hi:"Ramu ne usse baat ki.", ta:"ராமு அவனோட பேசினான்.", tanglish:"raamu avanoda pesinaan.", en:"Ramu talked to him/her."},
  {cat:"Simple past verbs", hi:"Usne nayi dress khareedi.", ta:"அவள் புது dress வாங்கினாள்.", tanglish:"aval pudhu dress vaanginaal.", en:"She bought a new dress."},
  {cat:"Simple past verbs", hi:"Usne use dekha.", ta:"அவன் அதை பார்த்தான்.", tanglish:"avan adhai paarthaan.", en:"He saw it/him/her."},
  {cat:"Simple past verbs", hi:"Papa ne mujhe call kiya.", ta:"அப்பா என்னை call பண்ணாரு.", tanglish:"appa ennai call pannaaru.", en:"Dad called me."},
  {cat:"Simple past verbs", hi:"Humne saath mein khaana khaya.", ta:"நாங்க ஒன்னா சாப்பாடு சாப்பிட்டோம்.", tanglish:"naanga onnaa saapaadu saapittom.", en:"We ate food together."},
];

// Full tense-family reference: every major present/past/future form, built on one sample verb
// ("peena" = to drink, "Main chai peeta hoon" = I drink tea) so the pattern is easy to compare
// across tenses. Each entry explains WHEN/WHY that specific form is used in a sentence (the
// semantic trigger for choosing it), not just how to conjugate it — this is what distinguishes
// it from FUTURE_PARADIGM (which only shows the future person/gender table).
const TENSE_FAMILY = [
  // ---------------- PRESENT ----------------
  {group:"Present", subtype:"Simple / Habitual Present", formula:"Verb + taa/tee/te + hoon/ho/hai",
   hi:"Main roz chai peeta hoon.", en:"I drink tea every day.",
   use:"Habits, routines, general facts, and repeated actions — not tied to 'right now'. This is the Hindi equivalent of English simple present.",
   trigger:"roz, hamesha, aksar, subah-subah (daily, always, usually, every morning)"},
  {group:"Present", subtype:"Present Continuous", formula:"Verb + rahaa/rahee/rahe + hoon/ho/hai",
   hi:"Main abhi chai pee raha hoon.", en:"I am drinking tea right now.",
   use:"An action happening at this exact moment of speaking, or a temporary situation that is true only around now.",
   trigger:"abhi, is waqt, is samay (now, at this moment)"},
  {group:"Present", subtype:"Present Perfect", formula:"Verb (past participle) + hoon/ho/hai  (often + chuka/chuki/chuke)",
   hi:"Maine chai pee li hai. / Main chai pee chuka hoon.", en:"I have drunk (the) tea.",
   use:"A past action whose result or relevance is felt right now — the action is finished, but Hindi treats it as still 'attached' to the present moment.",
   trigger:"abhi-abhi, pehle hi, ab tak (just now, already, so far)"},
  {group:"Present", subtype:"Present Perfect Continuous", formula:"Verb + rahaa/rahee/rahe + hoon/ho/hai + [duration] + se",
   hi:"Main subah se chai pee raha hoon.", en:"I have been drinking tea since morning.",
   use:"An action that started in the past and is STILL continuing right now — the whole point of this form is to highlight how long it has been going on.",
   trigger:"kab se? (since when), do ghante se, subah se (for 2 hours, since morning)"},

  // ---------------- PAST ----------------
  {group:"Past", subtype:"Simple Past", formula:"Verb (past participle); transitive verbs take 'ne'",
   hi:"Maine chai pee. / Woh aaya.", en:"I drank tea. / He came.",
   use:"A single completed action in the past, told as plain narration — no emphasis on duration, habit, or connection to now. This is the default 'what happened' tense.",
   trigger:"kal, pichhle hafte, 2020 mein (yesterday, last week, in 2020)"},
  {group:"Past", subtype:"Past Habitual", formula:"Verb + taa/tee/te + thaa/thee/the",
   hi:"Main roz chai peeta tha.", en:"I used to drink tea every day.",
   use:"A repeated/habitual action in the past that is no longer true today — Hindi's 'used to'.",
   trigger:"pehle, un dino, jab main chhota tha (earlier, in those days, when I was young)"},
  {group:"Past", subtype:"Past Continuous", formula:"Verb + rahaa/rahee/rahe + thaa/thee/the",
   hi:"Main chai pee raha tha (jab tum aaye).", en:"I was drinking tea (when you arrived).",
   use:"An action that was already in progress at a specific past moment — very often set up so a second, shorter past action interrupts it.",
   trigger:"jab...tab, us waqt (when...then, at that time)"},
  {group:"Past", subtype:"Past Perfect", formula:"Verb (past participle) + thaa/thee/the  (often + chuka/chuki/chuke)",
   hi:"Maine chai pee li thi (uske aane se pehle).", en:"I had drunk tea (before he arrived).",
   use:"An action completed BEFORE another past action or point in time — used only when you are comparing two past events and this one happened first.",
   trigger:"...se pehle, jab tak, uske aane se pehle (before..., by the time, before he came)"},
  {group:"Past", subtype:"Past Perfect Continuous", formula:"Verb + rahaa/rahee/rahe + thaa/thee/the + [duration] + se",
   hi:"Main do ghante se chai pee raha tha (jab bijli gayi).", en:"I had been drinking tea for two hours (when the power went out).",
   use:"An ongoing action that had already been continuing for some time before another past event interrupted it — duration + interruption together.",
   trigger:"kitni der se? (for how long), do ghante se, kaafi der se"},

  // ---------------- FUTURE ----------------
  {group:"Future", subtype:"Simple / Indefinite Future", formula:"Verb + oonga/oongi / oge/ogi / enge/engi",
   hi:"Main chai piyoonga.", en:"I will drink tea.",
   use:"Plans, predictions, promises, or decisions made at the moment of speaking — the plain 'will do' future. See the full person/gender table below.",
   trigger:"kal, agle hafte, shaayad (tomorrow, next week, maybe)"},
  {group:"Future", subtype:"Future Continuous", formula:"Verb + rahaa/rahee/rahe + hoonga/hogi / hoge/hogi / honge/hongi",
   hi:"Main us waqt chai pee raha hoonga.", en:"I will be drinking tea at that time.",
   use:"An action that will already be in progress at a specific future point — 'picture the scene at that future moment'.",
   trigger:"jab tum aaoge, us waqt, kal is waqt (when you arrive, at that time, tomorrow at this time)"},
  {group:"Future", subtype:"Future Perfect", formula:"Verb (past participle) + chuka/chuki/chuke + hoonga/hogi/honge",
   hi:"Main chai pee chuka hoonga (uske aane tak).", en:"I will have drunk tea (by the time he arrives).",
   use:"An action expected to be COMPLETED before a specific future point — 'will have done by then', comparing two future points.",
   trigger:"...tak, uske aane se pehle (by..., before he arrives)"},
  {group:"Future", subtype:"Future Perfect Continuous", formula:"Verb + rahaa/rahee/rahe + hoonga/hogi/honge + [duration] + se",
   hi:"Main teen saal se yahan kaam kar raha hoonga.", en:"I will have been working here for three years (by then).",
   use:"Emphasizes the DURATION of an action that will still be continuing up to a future point.",
   trigger:"examiner trap: this form is rare in everyday spoken Hindi — people usually simplify it to Future Continuous ('kaam kar raha hoonga') and let context carry the duration."},
];

// Quick side-by-side notes for the tense pairs learners mix up most often.
const TENSE_TRAPS = [
  {mixup:"Simple Past vs Past Perfect", note:"Use Past Perfect only when comparing TWO past events and this one happened earlier. If there's just one past action, use Simple Past — don't add 'tha' out of habit."},
  {mixup:"Present Perfect vs Simple Past", note:"Hindi doesn't split these as sharply as English does. 'Maine khaana khaya' can mean both 'I ate' and 'I have eaten' — words like abhi-abhi/already/ab tak are the real signal for which one is meant."},
  {mixup:"Continuous vs Perfect Continuous", note:"Continuous = the action is happening right at that moment (now/then). Perfect Continuous = the action has been happening for a stretch of time leading up to that moment — look for a 'since/for' (se) phrase; if there's no duration word, it's just Continuous."},
  {mixup:"Future Simple vs Future Continuous", note:"Simple Future = 'I will do it' (a flat statement/decision). Future Continuous = 'I will be doing it (at that specific future moment)' — needs a future time anchor like 'kal is waqt' or 'jab tum aaoge'."},
];

// Hindi construction → Tamil "sound cue" — from the user's own class notes/recordings, so that
// when translating a new sentence, the ending sound of the Tamil verb tells you which Hindi
// construction to reach for (and vice versa).
const HINDI_TAMIL_CUES = [
  {hindi:"Verb-na + hai", tamilSound:"ends in '-num' (வேண்டும்)", meaning:"need to / have to (obligation)",
   example:"Sivaji Nagar jaana hai = Sivaji Nagar poganum (சிவாஜி நகர் போகணும்) = 'need to go to Sivaji Nagar'.",
   note:"Whenever the Tamil sentence you're translating ends with '...num/...anum', that's your cue to build it in Hindi as Verb-na + hai, not a plain future or present tense."},
  {hindi:"Ho (bare form of hona)", tamilSound:"ஆவேது / ஆவது (aavathu)", meaning:"becomes / happens (general, not tied to right now)",
   example:"Aisa hota hai = Ippadi aavathu (இப்படி ஆவது) = 'that's how it happens/goes' (in general).",
   note:"This is the plain habitual sense of 'hona' — same family as the Present Habitual pattern above (Verb + ta/ti/te + hai), just for the verb 'to become/happen' itself."},
  {hindi:"Ho raha hai", tamilSound:"ஆகிறது (aakirathu)", meaning:"is happening (right now)",
   example:"Kya ho raha hai? = Enna aakirathu? (என்ன ஆகிறது?) = 'What is happening (right now)?'",
   note:"This is the Present Continuous of 'hona' — same family as 'Main dekh raha hoon' above, but for 'to happen/become'. The Tamil '-kirathu/-giradhu' ending is the giveaway for continuous, ongoing-right-now action."},
  {hindi:"Hoga / hogi / honge (future of hona)", tamilSound:"ends in '-um' (ஆகும்)", meaning:"will happen / will become / will cost (future)",
   example:"Kitna hoga? = Evlo aagum? (எவ்ளோ ஆகும்?) = 'How much will it be/cost?'",
   note:"Any Tamil verb ending in a plain '-um' sound (aagum, varum, pogum...) is future tense — build the Hindi with the future paradigm (V+ga/gi/enge), not V-na+hai and not simple past. See 'Verb tense snapshots' below for the stronger completive future 'ho jaayega'."},
  {hindi:"Hua / hui / hue (simple past of hona)", tamilSound:"ends in '-chu' (ஆச்சு)", meaning:"happened / became / came to (already completed)",
   example:"Kitna hua? = Evlo aachu? (எவ்ளோ ஆச்சு?) = 'How much did it come to?'",
   note:"A Tamil verb ending in '-chu/-duchu/-ndhuchu' (aachu, vandhuchu, pochu...) is simple past — build the Hindi with the past participle (V+aa/ii/e), never 'hoga'. This is the pair learners mix up most: 'hoga' (future, -um) vs 'hua' (past, -chu) — same question shape, opposite tense. See 'Verb tense snapshots' below for the stronger completive past 'ho gaya'."},
];

// One-glance cheat sheet: match the ENDING SOUND of the Tamil verb you're translating to the
// Hindi tense family to reach for. This generalizes the hona-specific cues above to any verb.
const TAMIL_ENDING_CHEATSHEET = [
  {tamilEnding:"-um (ஆகும் / வரும் / போகும்)", tense:"Future", hindiFormula:"Verb + ga/gi/enge (oonga/oongi family)", example:"Evlo aagum? = Kitna hoga?"},
  {tamilEnding:"-chu (ஆச்சு / வந்துச்சு / போச்சு)", tense:"Simple past", hindiFormula:"Verb (past participle): V+aa/ii/e", example:"Evlo aachu? = Kitna hua?"},
  {tamilEnding:"-num / -anum (வேண்டும்)", tense:"Need / obligation", hindiFormula:"Verb-na + hai", example:"Poganum = Jaana hai"},
  {tamilEnding:"-kirathu / -giradhu (ஆகிறது)", tense:"Present continuous", hindiFormula:"Verb + raha/rahi/rahe + hai", example:"Aakirathu = Ho raha hai"},
  {tamilEnding:"-vathu (ஆவது)", tense:"General / habitual", hindiFormula:"Verb + ta/ti/te + hai", example:"Aavathu = Hota hai"},
];

// Verb tense "snapshots" — the same 6-cell grid as the user's class-note picture (ho / ho raha
// hai / hoga / ho jaayega / hua / ho gaya), done for 'hona' plus a second verb ('karna') so the
// PATTERN generalizes: every Hindi verb has a plain future/past AND a stronger "completive"
// future/past (V + jaana/dena), and Tamil marks that same completive flavour with ஆகிவிடும்/
// விடு (vidu) endings — not just a plain tense change.
const VERB_TENSE_SNAPSHOTS = [
  {verb:"Hona — to be / become / happen", rows:[
    {tenseGroup:"General", hi:"ho", ta:"ஆவேது / ஆவது", tanglish:"aavathu", note:"General, not tied to any one time — 'that's how it becomes/goes'."},
    {tenseGroup:"Present", hi:"ho raha hai", ta:"ஆகிறது", tanglish:"aakirathu", note:"Happening right now."},
    {tenseGroup:"Future — plain", hi:"hoga / hogi / honge", ta:"ஆகும்", tanglish:"aagum", note:"Plain future — 'will be/happen'."},
    {tenseGroup:"Future — completive", hi:"ho jaayega", ta:"ஆகிவிடும்", tanglish:"aakividum", note:"Stronger future — 'it'll get fully done/settled by then', not just 'will be'."},
    {tenseGroup:"Past — plain", hi:"hua / hui / hue", ta:"ஆச்சு", tanglish:"aachu", note:"Plain past — 'happened'."},
    {tenseGroup:"Past — completive", hi:"ho gaya", ta:"ஆகிட்டுச்சு / ஆகிடுச்சு", tanglish:"aakiduchu", note:"Stronger past — 'it's (all) done now', emphasizes completion."},
  ]},
  {verb:"Karna — to do (subject: woh/avan = he, for comparison)", rows:[
    {tenseGroup:"General", hi:"karta hai", ta:"பண்ணுவான்", tanglish:"pannuvaan", note:"General/habitual — 'he does (it)' as a routine."},
    {tenseGroup:"Present", hi:"kar raha hai", ta:"பண்ணிக்கிட்டு இருக்கான்", tanglish:"pannikittu irukkaan", note:"Happening right now — 'he is doing (it)'."},
    {tenseGroup:"Future — plain", hi:"karega", ta:"பண்ணுவான்", tanglish:"pannuvaan", note:"Plain future — 'he will do (it)'. Note: spoken Tamil often reuses the SAME word for habitual present and simple future — only the time word in the sentence (roz vs kal) tells them apart, unlike Hindi which changes the verb ending."},
    {tenseGroup:"Future — completive", hi:"kar dega", ta:"பண்ணிடுவான்", tanglish:"panniduvaan", note:"Stronger future — 'he'll get it done (completely/for you)'."},
    {tenseGroup:"Past — plain", hi:"kiya", ta:"பண்ணினான்", tanglish:"pannanaan", note:"Plain past — 'he did (it)'."},
    {tenseGroup:"Past — completive", hi:"kar diya", ta:"பண்ணிட்டான்", tanglish:"pannittaan", note:"Stronger past — 'he got it done / finished it off'."},
  ]},
  {verb:"Aana — to come (subject: woh/train/bus = he/it, for comparison)", rows:[
    {tenseGroup:"General", hi:"aata hai", ta:"வருவான் / வருவது", tanglish:"varuvaan / varuvathu", note:"General/habitual — 'he comes' as a routine (e.g. 'roz aata hai' = comes every day)."},
    {tenseGroup:"Present", hi:"aa raha hai", ta:"வந்துகிட்டு இருக்கான்", tanglish:"vandhu kittu irukkaan", note:"Happening right now — 'he is coming' (on the way at this moment)."},
    {tenseGroup:"Future — plain", hi:"aayega", ta:"வரும்", tanglish:"varum", note:"Plain future — 'he/it will come'. This is the everyday impersonal form you'll hear for buses/trains/deliveries: 'Bus aayegi' = 'Bus varum'."},
    {tenseGroup:"Future — completive", hi:"aa jaayega", ta:"வந்துடும்", tanglish:"vandhudum", note:"Stronger future — 'it'll have arrived by then', emphasizing the arrival is fully done, not just underway."},
    {tenseGroup:"Past — plain", hi:"aaya", ta:"வந்தான் / வந்தது", tanglish:"vandhaan / vandhathu", note:"Plain past — 'he/it came', simple narration with no special emphasis."},
    {tenseGroup:"Past — completive", hi:"aa gaya", ta:"வந்துடுச்சு", tanglish:"vandhudhichu", note:"Stronger past — 'he's arrived / it's here now' — emphasizes the arrival is complete and the result (he's here) is what matters, e.g. announcing a bus/guest has shown up."},
  ]},
];

// General rule the two snapshots above are built to demonstrate:
const COMPLETIVE_RULE_NOTE = "Hindi has a built-in 'completive' add-on for almost any verb: V + jaana (ho jaana, kar jaana) or V + dena/lena (kar dena, kar lena) turns a plain future/past into a stronger 'it'll get fully done' / 'it got fully done'. Tamil marks this exact same idea with a விடு (vidu) ending on the verb (aaki-vidum, panni-duvaan, panni-ttaan) — so whenever you hear a Tamil verb with an extra '-du-/-tt-' bite to it beyond the plain aagum/pannuvaan, that's your cue to reach for the Hindi completive (jaayega/dega/gaya/diya), not the plain one.";

// Closely related Hindi verb PAIRS that learners mix up because both can gloss as the same
// English word — with a side-by-side distinction and worked example sentences (Hindi / Tamil /
// Tanglish / English), in the same style as the "hoga vs lagega" class note.
const LOOKALIKE_VERB_PAIRS = [
  {pair:"Hona vs Lagna", root1:"Hona (to be / become / happen)", root2:"Lagna (to take/require — time, money, effort)",
   distinction:"Hona asks or states WHAT something will be. Lagna asks or states WHAT it will TAKE (time, money, effort) for something to happen.",
   memoryTrick:"HOGA → WHAT IT WILL BE. LAGEGA → WHAT IT WILL TAKE.",
   examples:[
     {hi:"Kitna hoga?", ta:"எவ்வளவு இருக்கும்?", tanglish:"evvalavu irukkum?", en:"How much will it be?"},
     {hi:"Kitna lagega?", ta:"எவ்வளவு செலவாகும் / எவ்வளவு நேரம் ஆகும்?", tanglish:"evvalavu selavaagum / evvalavu neram aagum?", en:"How much will it cost / take?"},
     {hi:"Kitni der hogi?", ta:"எவ்வளவு நேரம் இருக்கும்?", tanglish:"evvalavu neram irukkum?", en:"How long will it be (duration)?"},
     {hi:"Kitni der lagegi?", ta:"எவ்வளவு நேரம் ஆகும்?", tanglish:"evvalavu neram aagum?", en:"How long will it take?"},
     {hi:"Ek ghanta lagega.", ta:"1 மணி நேரம் ஆகும்.", tanglish:"oru mani neram aagum.", en:"It will take one hour."},
     {hi:"Kitne paise lagenge?", ta:"எவ்வளவு பணம் ஆகும்?", tanglish:"evvalavu panam aagum?", en:"How much money will it take?"},
     {hi:"Mere paas kitne paise honge?", ta:"என்னிடம் எவ்வளவு பணம் இருக்கும்?", tanglish:"ennidam evvalavu panam irukkum?", en:"How much money will I have?"},
     {hi:"Woh ghar par hoga.", ta:"அவன் வீட்டில் இருப்பான்.", tanglish:"avan veettil iruppaan.", en:"He will be at home (probably)."},
     {hi:"Sab log ghar par honge.", ta:"எல்லோரும் வீட்டில் இருப்பார்கள்.", tanglish:"ellorum veettil iruppaargal.", en:"Everyone will be at home."},
   ]},
  {pair:"Milna vs Paana", root1:"Milna (to meet / to be received or available)", root2:"Paana (to obtain by effort / '-manage to' after another verb)",
   distinction:"Milna is used when something or someone comes to you or is available to you — the thing behaves like the subject ('Mujhe X milta hai' = 'X is obtained by/available to me'). Paana is used when YOU actively obtain, achieve or succeed at something — and Verb + paana means 'manage to / be able to (do) Verb'.",
   memoryTrick:"MILNA → IT COMES TO ME. PAANA → I GET IT / MANAGE IT.",
   examples:[
     {hi:"Aap mujhe kal miloge?", ta:"நாளைக்கு நீங்க என்னை சந்திப்பீங்களா?", tanglish:"naalaikku neenga ennai sandhippeengala?", en:"Will you meet me tomorrow?"},
     {hi:"Mujhe yeh kitab mili.", ta:"எனக்கு இந்த புத்தகம் கிடைச்சுது.", tanglish:"enakku indha pusthagam kidaichuthu.", en:"I got/received this book."},
     {hi:"Maine paisa paaya.", ta:"நான் பணத்தை பெற்றேன்.", tanglish:"naan panathai petren.", en:"I obtained/received the money."},
     {hi:"Main yeh kaam nahi kar paaya.", ta:"என்னால் இந்த வேலையை செய்ய முடியலை.", tanglish:"ennaalae indha velaiyai seiya mudiyalai.", en:"I couldn't manage to do this work."},
   ]},
  {pair:"Aana (know-how) vs Sakna (can/able)", root1:"Verb-na + aana — a learned SKILL ('I know how to')", root2:"Verb-stem + sakna — general CAPABILITY/permission/possibility right now ('I can/am able to')",
   distinction:"Verb-na + aana states a skill you learned, true regardless of today's situation. Verb + sakna states whether you can do it right now — which depends on the present situation (health, time, permission).",
   memoryTrick:"AANA → I KNOW HOW (skill, always true). SAKNA → I CAN RIGHT NOW (situational).",
   examples:[
     {hi:"Mujhe Hindi aati hai.", ta:"எனக்கு ஹிந்தி தெரியும்.", tanglish:"enakku Hindi theriyum.", en:"I know Hindi."},
     {hi:"Mujhe gaadi chalaani aati hai.", ta:"எனக்கு வண்டி ஓட்ட தெரியும்.", tanglish:"enakku vandi otta theriyum.", en:"I know how to drive."},
     {hi:"Main kal aa sakta hoon.", ta:"நான் நாளைக்கு வர முடியும்.", tanglish:"naan naalaikku vara mudiyum.", en:"I can come tomorrow."},
     {hi:"Aaj main tair nahi sakta.", ta:"இன்னைக்கு என்னால் நீச்சல் அடிக்க முடியாது.", tanglish:"innaikku ennaalae neechal adikka mudiyaadhu.", en:"I can't swim today (e.g. injured — situational, not a skill gap)."},
   ]},
];

const QUESTION_WORDS = [
  {hi:"Kya", en:"what", ta:"என்ன", tanglish:"enna"},
  {hi:"Kaun", en:"who", ta:"யார்", tanglish:"yaar"},
  {hi:"Kahan / Kidhar", en:"where", ta:"எங்க", tanglish:"enga"},
  {hi:"Kab", en:"when", ta:"எப்போ", tanglish:"eppo"},
  {hi:"Kitna / Kitni / Kitne", en:"how much / how many", ta:"எவ்வளவு", tanglish:"evvalavu"},
  {hi:"Kyon", en:"why", ta:"ஏன்", tanglish:"yean"},
  {hi:"Kaunsa / Kaunsi", en:"which", ta:"எந்த", tanglish:"endha"},
  {hi:"Kaise", en:"how", ta:"எப்படி", tanglish:"eppadi"},
  {hi:"Kiska", en:"whose / belonging to whom", ta:"யாருடையது", tanglish:"yaarudaiyathu"},
  {hi:"Kisliye", en:"for what purpose / why", ta:"எதுக்காக", tanglish:"edhukkaaga"},
];

const POSSESSION_PATTERNS = [
  {hi:"Mera / meri / mere", en:"'my'", ta:"என்னுடைய / என்", tanglish:"ennudaiya / en"},
  {hi:"Tumhara / tumhari / tumhare", en:"'your' (informal)", ta:"உன்னுடைய / உன்", tanglish:"unnudaiya / un"},
  {hi:"Aapka / aapki / aapke", en:"'your' (polite)", ta:"உங்களுடைய / உங்க", tanglish:"ungaludaiya / unga"},
  {hi:"Uska / uski / uske", en:"'his/her/its'", ta:"அவனுடைய / அவளுடைய", tanglish:"avanudaiya / avaludaiya"},
  {hi:"Unka / unki / unke", en:"'their/his-her' (respectful)", ta:"அவர்களுடைய", tanglish:"avargaludaiya"},
  {hi:"Mujhe", en:"'to me / I need / I like', depending on sentence", ta:"எனக்கு", tanglish:"enakku"},
  {hi:"Tumhe / tumko", en:"'to you' (informal)", ta:"உனக்கு", tanglish:"unakku"},
  {hi:"Aapko", en:"'to you' (polite)", ta:"உங்களுக்கு", tanglish:"ungalukku"},
  {hi:"Mere paas", en:"'with me / I have'", ta:"என்னிடம்", tanglish:"ennidam"},
  {hi:"Tumhare paas", en:"'with you / you have'", ta:"உன்னிடம்", tanglish:"unnidam"},
  {hi:"Aapke paas", en:"'with you / you have' (polite)", ta:"உங்களிடம்", tanglish:"ungalidam"},
];

const POSSESSION_EXAMPLES = [
  {hi:"Mujhe Hindi maalum hai.", en:"I know Hindi."},
  {hi:"Mujhe paise chahiye.", en:"I need money."},
  {hi:"Aapke paas mera number hai kya?", en:"Do you have my number?"},
  {hi:"Mere paas change hai.", en:"I have change."},
];

const COMMANDS_TABLE = [
  {infoRoot:"dekh", tum:"dekho", aap:"dekhiye", en:"look", ta:"பாரு / பாருங்க", tanglish:"paaru / paarunga"},
  {infoRoot:"rakh", tum:"rakho", aap:"rakhiye", en:"keep/put", ta:"வை / வையுங்க", tanglish:"vai / vaiyunga"},
  {infoRoot:"chal", tum:"chalo", aap:"chaliye", en:"come/go along", ta:"வா / வாங்க", tanglish:"vaa / vaanga"},
  {infoRoot:"kar", tum:"karo", aap:"kijiye", en:"do", ta:"பண்ணு / பண்ணுங்க", tanglish:"pannu / pannunga"},
  {infoRoot:"bhej", tum:"bhejo", aap:"bhejiye", en:"send", ta:"அனுப்பு / அனுப்புங்க", tanglish:"anuppu / anuppunga"},
  {infoRoot:"aa", tum:"aao", aap:"aaiye", en:"come", ta:"வா / வாங்க", tanglish:"vaa / vaanga"},
  {infoRoot:"jaa", tum:"jaao", aap:"jaaiye", en:"go", ta:"போ / போங்க", tanglish:"po / poonga"},
  {infoRoot:"baith", tum:"baitho", aap:"baithiye", en:"sit", ta:"உட்காரு / உட்காருங்க", tanglish:"utkaaru / utkaarunga"},
  {infoRoot:"uth", tum:"utho", aap:"uthiye", en:"get up", ta:"எழுந்திரு / எழுந்திருங்க", tanglish:"ezhundhiru / ezhundhirunga"},
  {infoRoot:"piy", tum:"piyo", aap:"peejiye", en:"drink", ta:"குடி / குடியுங்க", tanglish:"kudi / kudiyunga"},
  {infoRoot:"kha", tum:"khao", aap:"khaiye", en:"eat", ta:"சாப்பிடு / சாப்பிடுங்க", tanglish:"saapidu / saapidunga"},
  {infoRoot:"sun", tum:"suno", aap:"suniye", en:"listen", ta:"கேளு / கேளுங்க", tanglish:"kelu / kelunga"},
  {infoRoot:"laa", tum:"laao", aap:"laaiye", en:"bring", ta:"கொண்டு வா / கொண்டு வாங்க", tanglish:"kondu vaa / kondu vaanga"},
  {infoRoot:"le", tum:"lo", aap:"lijiye", en:"take", ta:"எடு / எடுங்க", tanglish:"edu / edunga"},
  {infoRoot:"de", tum:"do", aap:"dijiye", en:"give", ta:"கொடு / கொடுங்க", tanglish:"kodu / kodunga"},
];

// Softer polite forms ("-gaa" suffix — used for gentle instructions, esp. to elders/customers)
const SOFT_POLITE = [
  {hi:"aaiyega", en:"please do come (softer than aaiye)", ta:"தயவுசெஞ்சு வாங்க", tanglish:"thayavu senju vaanga"},
  {hi:"jaiyega", en:"please do go", ta:"தயவுசெஞ்சு போங்க", tanglish:"thayavu senju poonga"},
  {hi:"dekhiyega", en:"please do look/take care", ta:"தயவுசெஞ்சு பாருங்க", tanglish:"thayavu senju paarunga"},
  {hi:"rakhiyega", en:"please do keep", ta:"தயவுசெஞ்சு வையுங்க", tanglish:"thayavu senju vaiyunga"},
  {hi:"kijiyega", en:"please do it", ta:"தயவுசெஞ்சு பண்ணுங்க", tanglish:"thayavu senju pannunga"},
];

// KO vs KE vs SE — with the Tamil shortcuts from the Personal Teaching Instructions
const KO_KE_SE = [
  {word:"KO", tamilCue:"யாருக்கு? / யாரை?", desc:"Marks the recipient/object of an action, or 'to/for' someone.",
   examples:[
     {hi:"Mujhe", ta:"எனக்கு", en:"to me"},
     {hi:"Aapko", ta:"உங்களுக்கு", en:"to you"},
     {hi:"Usko", ta:"அவனுக்கு/அவளை", en:"to him/her"},
   ]},
  {word:"KE", tamilCue:"யாருடைய? / what construction?", desc:"Possessive linker, or part of a fixed grammatical construction (e.g. 'ke baad' = after).",
   examples:[
     {hi:"Mere dost ke ghar", ta:"என் நண்பனுடைய வீடு", en:"at my friend's house"},
     {hi:"V + ne + ke baad", ta:"", en:"after doing (V)"},
   ]},
  {word:"SE", tamilCue:"யாரிடமிருந்து? / எதன் மூலம்? / வழியாக?", desc:"'from / by / through / with' — source, means, or the person met with.",
   examples:[
     {hi:"Market se", ta:"market-லிருந்து", en:"from the market"},
     {hi:"Train se", ta:"train மூலம்", en:"by train"},
     {hi:"Aapse milna", ta:"", en:"to meet you"},
   ]},
];

const POSTPOSITIONS = [
  {hi:"mein", en:"in / at", ta:"-ல", tanglish:"-la"},
  {hi:"par", en:"on / at", ta:"மேல", tanglish:"mela"},
  {hi:"ko", en:"to / object marker", ta:"-க்கு", tanglish:"-kku"},
  {hi:"se", en:"from / by / through / with", ta:"-இருந்து / மூலம்", tanglish:"-irundhu / moolam"},
  {hi:"ka / ki / ke", en:"possessive", ta:"-உடைய", tanglish:"-udaiya"},
  {hi:"ke baad", en:"after", ta:"அப்புறம் / பிறகு", tanglish:"appuram / piragu"},
  {hi:"se pehle", en:"before", ta:"முன்னாடி", tanglish:"munnaadi"},
  {hi:"ke peeche", en:"behind", ta:"பின்னாடி", tanglish:"pinnaadi"},
  {hi:"ke saamne", en:"in front of", ta:"எதிர்ல", tanglish:"edhirla"},
  {hi:"ke paas", en:"near / with", ta:"கிட்ட", tanglish:"kitta"},
  {hi:"ke saath", en:"with", ta:"கூட", tanglish:"kooda"},
  {hi:"ke liye", en:"for", ta:"-க்காக", tanglish:"-kkaaga"},
  {hi:"ke baare mein", en:"about", ta:"பத்தி", tanglish:"paththi"},
  {hi:"ke andar", en:"inside", ta:"உள்ள", tanglish:"ulla"},
];

// YEH/ISE/YAHI/ISI vs WOH/USE/WAHI/USI
const DEMONSTRATIVES = [
  {hi:"yeh", ta:"இது", tanglish:"idhu", en:"this"},
  {hi:"ise", ta:"இதை", tanglish:"idhai", en:"this (as object)"},
  {hi:"yahi", ta:"இதேதான்", tanglish:"idhethaan", en:"this very one"},
  {hi:"isi", ta:"இதிலேயே / இதே", tanglish:"idhileyae / idhe", en:"this very one/place/route"},
  {hi:"woh", ta:"அது", tanglish:"adhu", en:"that"},
  {hi:"use", ta:"அதை", tanglish:"adhai", en:"that (as object)"},
  {hi:"wahi", ta:"அதேதான்", tanglish:"adhethaan", en:"that very one"},
  {hi:"usi", ta:"அதிலேயே / அதே", tanglish:"adhileyae / adhe", en:"that very one/place"},
];

const READY_PHRASES = [
  {hi:"Kya hua?", ta:"என்ன ஆச்சு?", en:"What happened?"},
  {hi:"Kya baat hai?", ta:"என்ன விஷயம்?", en:"What's the matter?"},
  {hi:"Mujhe nahi pata.", ta:"எனக்குத் தெரியாது.", en:"I don't know."},
  {hi:"Mujhe lagta hai.", ta:"எனக்குத் தோணுது.", en:"I feel/think."},
  {hi:"Koi baat nahi.", ta:"பரவாயில்லை.", en:"Never mind / it's ok."},
  {hi:"Thoda rukiye.", ta:"கொஞ்சம் காத்திருங்கள்.", en:"Please wait a bit."},
  {hi:"Abhi aata hoon.", ta:"இப்போ வந்துடுறேன்.", en:"Coming right now."},
  {hi:"Bas, aa raha hoon.", ta:"இதோ வரேன்.", en:"Just coming."},
  {hi:"Phir milte hain.", ta:"மறுபடியும் சந்திப்போம்.", en:"See you again."},
  /* 18 more everyday filler phrases, added from a real-life conversations workbook */
  {hi:"Chalein?", ta:"போலாமா?", en:"Shall we go?"},
  {hi:"Kya chahiye?", ta:"என்ன வேணும்?", en:"What do you need?"},
  {hi:"Bhookh lag rahi hai.", ta:"பசிக்குது.", en:"I'm feeling hungry."},
  {hi:"Kitna samay lagega?", ta:"எவ்ளோ நேரம் ஆகும்?", en:"How much time will it take?"},
  {hi:"Chalega.", ta:"சரியா இருக்கும் / ஓகே.", en:"That'll work / okay."},
  {hi:"Pata nahi.", ta:"தெரியாது.", en:"Don't know."},
  {hi:"Dekhte hain.", ta:"பார்க்கலாம்.", en:"Let's see."},
  {hi:"Koshish karte hain.", ta:"முயற்சி செய்யலாம்.", en:"Let's try."},
  {hi:"Abhi nahi.", ta:"இப்போ இல்ல.", en:"Not now."},
  {hi:"Ek minute.", ta:"ஒரு நிமிஷம்.", en:"One minute."},
  {hi:"Bahut der ho gayi.", ta:"ரொம்ப நேரம் ஆயிடுச்சு.", en:"It's gotten very late."},
  {hi:"Mujhe der ho rahi hai.", ta:"எனக்கு நேரம் ஆகுது.", en:"I'm getting late."},
  {hi:"Aisa kyun?", ta:"ஏன் இப்படி?", en:"Why like this?"},
  {hi:"Phir kya hua?", ta:"பிறகு என்ன ஆச்சு?", en:"Then what happened?"},
  {hi:"Kya kar rahe ho?", ta:"என்ன பண்றே?", en:"What are you doing?"},
  {hi:"Ek baar phir bataiye.", ta:"இன்னொரு தடவை சொல்லுங்க.", en:"Please tell me once more."},
  {hi:"Dheere boliye.", ta:"மெதுவா சொல்லுங்க.", en:"Please speak slowly."},
  {hi:"Aap kab aaye?", ta:"நீங்க எப்போ வந்தீங்க?", en:"When did you come?"},
  /* 13 clinical-exam / OT phrases, added for the user's own anaesthesia practice —
     the kind of short, reassuring instructions used while examining or monitoring a patient */
  {hi:"Chinta mat kijiye.", ta:"கவலைப்படாதீங்க.", en:"Don't worry."},
  {hi:"Thoda dard ho sakta hai.", ta:"கொஞ்சம் வலி இருக்கலாம்.", en:"There might be a little pain."},
  {hi:"Aaraam se.", ta:"மெதுவா / ரிலாக்ஸா இருங்க.", en:"Easy / gently — relax."},
  {hi:"Gehri saans lijiye.", ta:"ஆழமா மூச்சு எடுங்க.", en:"Take a deep breath."},
  {hi:"Muh kholiye.", ta:"வாயைத் திறங்க.", en:"Open your mouth."},
  {hi:"Muh band kijiye.", ta:"வாயை மூடுங்க.", en:"Close your mouth."},
  {hi:"Thoda idhar aaiye.", ta:"கொஞ்சம் இந்த பக்கம் வாங்க.", en:"Please come this side a bit."},
  {hi:"Wahin rukiye.", ta:"அங்கயே இருங்க.", en:"Stay right there."},
  {hi:"Hiliye mat.", ta:"அசையாதீங்க.", en:"Don't move."},
  {hi:"Sab theek hai.", ta:"எல்லாம் சரியா இருக்கு.", en:"Everything is fine."},
  {hi:"Koi dikkat nahi hai.", ta:"ஒரு பிரச்சனையும் இல்ல.", en:"There's no problem."},
  {hi:"Aapko kaisa lag raha hai?", ta:"உங்களுக்கு எப்படி இருக்கு?", en:"How are you feeling?"},
  {hi:"Kuch chahiye?", ta:"ஏதாவது வேணுமா?", en:"Need anything?"},
  {hi:"Chinta mat karo.", ta:"கவலைப்படாதே.", en:"Don't worry (informal — to tum/dost). The polite version, \"Chinta mat kijiye,\" is above."},
];

// "Talking about someone else" — natural spoken-Hindi patterns for describing a third person's
// habits, reporting what they said, and speculating about them. Added from a shared write-up
// (jab bhi / har baar / woh hamesha / woh kabhi... nahi / woh kehti rehti hai ki / mujhe lagta
// hai ki / shaayad / pata nahi). Hindi given in Devanagari + Roman; Tamil translations are
// original (the source gave only Hindi + English).
const THIRD_PERSON_FORMULAS = [
  {formula:"Jab bhi...", dev:"जब भी...", en:"Whenever...",
   example:{hi:"Jab bhi woh aati hai...", dev:"जब भी वह आती है...", ta:"அவள் எப்போ வந்தாலும்...", en:"Whenever she comes..."}},
  {formula:"Har baar...", dev:"हर बार...", en:"Every time...",
   example:{hi:"Har baar woh yahi kehti hai.", dev:"हर बार वह यही कहती है।", ta:"ஒவ்வொரு தடவையும் அவள் இதையேதான் சொல்றா.", en:"Every time she says the same thing."}},
  {formula:"Woh hamesha...", dev:"वह हमेशा...", en:"She always...",
   example:{hi:"Woh hamesha der karti hai.", dev:"वह हमेशा देर करती है।", ta:"அவள் எப்பவுமே லேட்டா செய்வா.", en:"She is always late."}},
  {formula:"Woh kabhi... nahi...", dev:"वह कभी... नहीं...", en:"She never...",
   example:{hi:"Woh kabhi samay par nahi aati.", dev:"वह कभी समय पर नहीं आती।", ta:"அவள் ஒரு நாளும் நேரத்துக்கு வரமாட்டா.", en:"She never comes on time."}},
  {formula:"Woh kehti rehti hai ki...", dev:"वह कहती रहती है कि...", en:"She keeps saying that...",
   example:{hi:"Woh kehti rehti hai ki uske paas paise nahi hain.", dev:"वह कहती रहती है कि उसके पास पैसे नहीं हैं।", ta:"அவள் தன்கிட்ட காசு இல்லேன்னு சொல்லிட்டே இருப்பா.", en:"She keeps saying that she doesn't have money."}},
  {formula:"Mujhe lagta hai ki...", dev:"मुझे लगता है कि...", en:"I think that...",
   example:{hi:"Mujhe lagta hai ki woh naaraaz hai.", dev:"मुझे लगता है कि वह नाराज़ है।", ta:"அவள் கோபமா இருக்காள்னு எனக்குத் தோணுது.", en:"I think she's upset."}},
  {formula:"Shaayad...", dev:"शायद...", en:"Maybe...",
   example:{hi:"Shaayad woh ghar par hai.", dev:"शायद वह घर पर है।", ta:"ஒரு வேளை அவள் வீட்டுல இருப்பாளோ.", en:"Maybe she's at home."}},
  {formula:"Pata nahi...", dev:"पता नहीं...", en:"I don't know...",
   example:{hi:"Pata nahi woh kahaan gayi.", dev:"पता नहीं वह कहाँ गई।", ta:"அவள் எங்க போனாளோ, தெரியாது.", en:"I don't know where she went."}},
];

const THIRD_PERSON_EXAMPLES = [
  // 1. Talking about someone's habits (5)
  {cat:"Talking about someone's habits", hi:"Jab bhi woh aati hai, use paise chahiye hote hain.", dev:"जब भी वह आती है, उसे पैसे चाहिए होते हैं।", ta:"அவள் எப்போ வந்தாலும், அவளுக்கு காசு வேணும்.", en:"Whenever she comes, she wants money."},
  {cat:"Talking about someone's habits", hi:"Har baar woh koi na koi bahaana banaati hai.", dev:"हर बार वह कोई न कोई बहाना बनाती है।", ta:"ஒவ்வொரு தடவையும் அவள் ஏதோ ஒரு எக்ஸ்க்யூஸ் சொல்லுவா.", en:"Every time, she makes some excuse or another."},
  {cat:"Talking about someone's habits", hi:"Jab bhi woh yahaan aati hai, bahut der tak baithti hai.", dev:"जब भी वह यहाँ आती है, बहुत देर तक बैठती है।", ta:"அவள் இங்க வந்தா, ரொம்ப நேரம் உக்காந்திருப்பா.", en:"Whenever she comes here, she sits for a long time."},
  {cat:"Talking about someone's habits", hi:"Woh hamesha der se aati hai.", dev:"वह हमेशा देर से आती है।", ta:"அவள் எப்பவுமே லேட்டா வருவா.", en:"She always comes late."},
  {cat:"Talking about someone's habits", hi:"Use har cheez mein kami nikaalne ki aadat hai.", dev:"उसे हर चीज़ में कमी निकालने की आदत है।", ta:"அவளுக்கு எல்லாத்துலையும் குறை சொல்ற பழக்கம் இருக்கு.", en:"She has a habit of finding fault with everything."},
  // 3. Talking about what someone said (5)
  {cat:"Talking about what someone said", hi:"Usne kaha tha ki woh kal aayegi.", dev:"उसने कहा था कि वह कल आएगी।", ta:"அவள் நாளைக்கு வருவேன்னு சொன்னா.", en:"She said she would come tomorrow."},
  {cat:"Talking about what someone said", hi:"Woh keh rahi thi ki uske paas paise nahi hain.", dev:"वह कह रही थी कि उसके पास पैसे नहीं हैं।", ta:"தன்கிட்ட காசு இல்லேன்னு அவள் சொல்லிக்கிட்டிருந்தா.", en:"She was saying that she doesn't have money."},
  {cat:"Talking about what someone said", hi:"Usne mujhe bataaya ki woh baahar gayi hai.", dev:"उसने मुझे बताया कि वह बाहर गई है।", ta:"அவள் வெளியே போயிருக்காள்னு என்கிட்ட சொன்னா.", en:"She told me that she has gone out."},
  {cat:"Talking about what someone said", hi:"Mujhe nahi pata usne aisa kyun kaha.", dev:"मुझे नहीं पता उसने ऐसा क्यों कहा।", ta:"அவள் ஏன் இப்படி சொன்னான்னு எனக்குத் தெரியாது.", en:"I don't know why she said that."},
  {cat:"Talking about what someone said", hi:"Woh kehti rehti hai ki uske paas samay nahi hai.", dev:"वह कहती रहती है कि उसके पास समय नहीं है।", ta:"தன்கிட்ட நேரமே இல்லேன்னு அவள் சொல்லிட்டே இருப்பா.", en:"She keeps saying that she doesn't have time."},
  // 4. Talking about someone's behaviour (6)
  {cat:"Talking about someone's behaviour", hi:"Woh kisi ki baat nahi sunti.", dev:"वह किसी की बात नहीं सुनती।", ta:"அவள் யாரு சொன்னதையும் கேக்க மாட்டா.", en:"She doesn't listen to anyone."},
  {cat:"Talking about someone's behaviour", hi:"Woh apni baat manwaana chahti hai.", dev:"वह अपनी बात मनवाना चाहती है।", ta:"அவளுக்குப் பிடிச்சபடிதான் நடக்கணும்னு அவள் நினைப்பா.", en:"She wants to have things her way."},
  {cat:"Talking about someone's behaviour", hi:"Woh chhoti-chhoti baaton par gussa ho jaati hai.", dev:"वह छोटी-छोटी बातों पर गुस्सा हो जाती है।", ta:"அவள் சின்ன சின்ன விஷயத்துக்கே கோபப்படுவா.", en:"She gets angry over small things."},
  {cat:"Talking about someone's behaviour", hi:"Woh saamne kuch aur bolti hai aur peechhe kuch aur.", dev:"वह सामने कुछ और बोलती है और पीछे कुछ और।", ta:"முன்னாடி ஒன்னு சொல்லி, பின்னாடி வேற ஒன்னு பேசுவா.", en:"She says one thing to someone's face and another behind their back."},
  {cat:"Talking about someone's behaviour", hi:"Woh jaanboojhkar aisa karti hai.", dev:"वह जानबूझकर ऐसा करती है।", ta:"அவள் தெரிஞ்சே இப்படி செய்வா.", en:"She does that deliberately."},
  {cat:"Talking about someone's behaviour", hi:"Woh bina bataaye chali gayi.", dev:"वह बिना बताए चली गई।", ta:"அவள் யார்கிட்டயும் சொல்லாம போயிட்டா.", en:"She left without telling anyone."},
];

const THIRD_PERSON_DIALOGUES = [
  {title:"Why does she ask for money every time?",
   lines:[
     {sp:"A", hi:"Woh har baar paise kyun maangti hai?", dev:"वह हर बार पैसे क्यों माँगती है?", ta:"அவள் ஏன் ஒவ்வொரு தடவையும் காசு கேக்குறா?", en:"Why does she ask for money every time?"},
     {sp:"B", hi:"Pata nahi, jab bhi aati hai, paise ki baat karti hai.", dev:"पता नहीं, जब भी आती है, पैसे की बात करती है।", ta:"தெரியாது, எப்போ வந்தாலும் காசைப் பத்தித்தான் பேசுவா.", en:"I don't know. Whenever she comes, she talks about money."},
   ]},
  {title:"Why doesn't she come here nowadays?",
   lines:[
     {sp:"A", hi:"Woh aajkal yahaan kyun nahi aati?", dev:"वह आजकल यहाँ क्यों नहीं आती?", ta:"அவள் இப்போதெல்லாம் ஏன் இங்க வரமாட்டேங்குறா?", en:"Why doesn't she come here nowadays?"},
     {sp:"B", hi:"Pata nahi, shaayad woh vyast rehti hai.", dev:"पता नहीं, शायद वह व्यस्त रहती है।", ta:"தெரியாது, ஒரு வேளை அவள் பிஸியா இருக்காளோ.", en:"I don't know, maybe she's busy."},
   ]},
];

const THIRD_PERSON_DISTINCTION = {
  note:"A particularly useful distinction — three ways to talk about the same thing (asking vs. habitually wanting vs. expecting), each with a slightly different shade of meaning.",
  lines:[
    {hi:"Woh paise maangti hai.", dev:"वह पैसे माँगती है।", ta:"அவள் காசு கேக்குறா.", en:"She asks for money."},
    {hi:"Use paise chahiye hote hain.", dev:"उसे पैसे चाहिए होते हैं।", ta:"அவளுக்கு காசு வேணும்.", en:"She tends to need/want money."},
    {hi:"Use paise ki ummeed hoti hai.", dev:"उसे पैसे की उम्मीद होती है।", ta:"அவளுக்கு காசு கிடைக்கும்னு எதிர்பார்ப்பு இருக்கு.", en:"She expects money."},
  ],
};

if (typeof module !== "undefined") {
  module.exports = { QUICK_PATTERNS, QUESTION_WORDS, POSSESSION_PATTERNS, POSSESSION_EXAMPLES,
    COMMANDS_TABLE, SOFT_POLITE, KO_KE_SE, POSTPOSITIONS, DEMONSTRATIVES, READY_PHRASES,
    COMMAND_FORMULA_TABLE, FUTURE_PARADIGM, FUTURE_IRREGULARS, TENSE_FAMILY, TENSE_TRAPS, HINDI_TAMIL_CUES,
    TAMIL_ENDING_CHEATSHEET, VERB_TENSE_SNAPSHOTS, COMPLETIVE_RULE_NOTE, LOOKALIKE_VERB_PAIRS,
    SUBJUNCTIVE_SHORTCUT_NOTE, SUBJUNCTIVE_PARADIGM, SUBJUNCTIVE_EXAMPLES,
    ERGATIVE_NE_NOTE, ERGATIVE_NE_TABLE, ERGATIVE_NE_EXAMPLES, PAST_PRACTICE_EXAMPLES,
    THIRD_PERSON_FORMULAS, THIRD_PERSON_EXAMPLES, THIRD_PERSON_DIALOGUES, THIRD_PERSON_DISTINCTION };
}
