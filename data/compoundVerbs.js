/* compoundVerbs.js — "Friend Verbs" / Hindi compound (conjunct) verbs: V1 (main action) + V2
   (a "light/vector" verb that adds aspect — completion, direction, suddenness, compulsion,
   benefit, continuation...). Built from the user's own detailed breakdown of each V2 family,
   with original Tamil translations added to match the app's existing schema. */

const COMPOUND_VERB_INTRO =
  "Verb 1 = the main action/meaning. Verb 2 = adds aspect, direction, completion, suddenness, " +
  "benefit, or continuation — it usually loses most of its own dictionary meaning. E.g. 'kha lo' " +
  "doesn't mean 'eat + take' — khaana is the real action, and lena (normally 'to take') just adds " +
  "the sense of doing it for yourself / finishing it. Don't memorise V1+V2 pairs as separate " +
  "vocabulary — learn what each V2 contributes, and you can build hundreds of combinations yourself.";

const COMPOUND_VERB_GROUPS = [
  {
    v2:"Lena", dev:"लेना", meaningAdded:"Completion / doing something for oneself / advantage",
    formula:"V1 (stem) + lena",
    examples: [
      {v1:"khaana", compound:"kha lena", en:"eat it / have it"},
      {v1:"peena", compound:"pee lena", en:"drink it"},
      {v1:"dekhna", compound:"dekh lena", en:"have a look / check it"},
      {v1:"karna", compound:"kar lena", en:"get it done"},
      {v1:"padhna", compound:"padh lena", en:"read/study it"},
      {v1:"likhna", compound:"likh lena", en:"write it down"},
      {v1:"rakhna", compound:"rakh lena", en:"keep it"},
      {v1:"bolna", compound:"bol lena", en:"say it"},
      {v1:"poochhna", compound:"poochh lena", en:"ask"},
      {v1:"sunna", compound:"sun lena", en:"listen/hear it"},
      {v1:"samajhna", compound:"samajh lena", en:"understand/grasp"},
      {v1:"seekhna", compound:"seekh lena", en:"learn it"},
    ],
    sentences: [
      {hi:"Aap kha lijiye.", ta:"நீங்க சாப்பிடுங்க.", en:"Please have/eat it."},
      {hi:"Aap dekh lijiye.", ta:"நீங்க பாத்துக்குங்க.", en:"Please have a look."},
      {hi:"Ye likh lijiye.", ta:"இதை எழுதி வெச்சுக்குங்க.", en:"Please write this down."},
    ],
  },
  {
    v2:"Dena", dev:"देना", meaningAdded:"Doing something for someone / letting go / forcefully or completely",
    formula:"V1 (stem) + dena",
    examples: [
      {v1:"dekhna", compound:"dekh dena", en:"check/do a look"},
      {v1:"bataana", compound:"bata dena", en:"tell/inform"},
      {v1:"karna", compound:"kar dena", en:"get it done / do it"},
      {v1:"bhejna", compound:"bhej dena", en:"send it"},
      {v1:"likhna", compound:"likh dena", en:"write it"},
      {v1:"rakhna", compound:"rakh dena", en:"put/keep it there"},
      {v1:"todna", compound:"tod dena", en:"break it"},
      {v1:"chhodna", compound:"chhod dena", en:"leave it"},
      {v1:"maarna", compound:"maar dena", en:"kill/hit completely"},
      {v1:"phenkna", compound:"phenk dena", en:"throw away"},
      {v1:"phailaana", compound:"phaila dena", en:"spread it out (and get it fully done)"},
    ],
    sentences: [
      {hi:"Mujhe bata dena.", ta:"எனக்கு சொல்லிடு.", en:"Make sure you tell me."},
      {hi:"Ye bhej dena.", ta:"இதை அனுப்பிடு.", en:"Send this."},
      {hi:"Woh rakh dena.", ta:"அதை வெச்சிடு.", en:"Put that down/there."},
      {hi:"Thoda aur phaila dijiye.", ta:"இன்னும் கொஞ்சம் spread பண்ணி விடுங்க.", en:"Please spread it out a bit more (and make sure it's done)."},
    ],
    contrastNote: "Kha lena = eat it for yourself. Kha dena = eat it up / consume it (context-dependent). Kar lena = do it/get it done for yourself. Kar dena = do it / get it done (for someone, or just decisively).",
  },
  {
    v2:"Jaana", dev:"जाना", meaningAdded:"Completion / change of state / becoming — extremely common",
    formula:"V1 (stem) + jaana",
    examples: [
      {v1:"bhoolna", compound:"bhool jaana", en:"forget"},
      {v1:"sona", compound:"so jaana", en:"fall asleep"},
      {v1:"marna", compound:"mar jaana", en:"die"},
      {v1:"girna", compound:"gir jaana", en:"fall"},
      {v1:"tootna", compound:"toot jaana", en:"break"},
      {v1:"khatam hona", compound:"khatam ho jaana", en:"get finished"},
      {v1:"badalna", compound:"badal jaana", en:"change"},
      {v1:"nikalna", compound:"nikal jaana", en:"leave/go out"},
      {v1:"chhootna", compound:"chhoot jaana", en:"get left behind / be missed"},
      {v1:"jalna", compound:"jal jaana", en:"get burnt"},
    ],
    sentences: [
      {hi:"Woh so gaya.", ta:"அவன் தூங்கிப்போச்சு.", en:"He fell asleep. (Not just 'he went' — 'gaya' here marks the resulting state with 'so'.)"},
      {hi:"Glass toot gaya.", ta:"கிளாஸ் உடைஞ்சுப்போச்சு.", en:"The glass broke."},
      {hi:"Main bhool gaya.", ta:"நான் மறந்துப்போனேன்.", en:"I forgot."},
    ],
  },
  {
    v2:"Aana", dev:"आना", meaningAdded:"Movement toward the speaker / resulting ability / occurrence",
    formula:"V1 (stem) + aana",
    examples: [
      {v1:"yaad", compound:"yaad aana", en:"remember / come to mind"},
      {v1:"samajh", compound:"samajh aana", en:"understand / become understandable"},
      {v1:"pasand", compound:"pasand aana", en:"like / appeal to"},
      {v1:"nazar", compound:"nazar aana", en:"become visible"},
      {v1:"kaam", compound:"kaam aana", en:"be useful"},
      {v1:"seekhna", compound:"seekh aana", en:"learn / come to learn (context-dependent)"},
    ],
    sentences: [
      {hi:"Mujhe samajh aaya.", ta:"எனக்கு புரிஞ்சுது.", en:"I understood. (Literally: 'Understanding came to me.')"},
      {hi:"Mujhe yaad aaya.", ta:"எனக்கு ஞாபகம் வந்துச்சு.", en:"I remembered."},
      {hi:"Mujhe ye pasand aaya.", ta:"எனக்கு இது பிடிச்சிருக்கு.", en:"I liked this."},
    ],
  },
  {
    v2:"Baithna", dev:"बैठना", meaningAdded:"Suddenly / unintentionally ending up doing something",
    formula:"V1 (stem) + baithna",
    examples: [
      {v1:"rona", compound:"ro baithna", en:"suddenly start crying"},
      {v1:"hansna", compound:"hans baithna", en:"suddenly start laughing"},
      {v1:"likhna", compound:"likh baithna", en:"end up writing"},
      {v1:"kehna", compound:"keh baithna", en:"blurt out / accidentally say"},
    ],
    sentences: [
      {hi:"Woh gussa mein kuch keh baitha.", ta:"அவன் கோவத்துல ஏதோ சொல்லிட்டான்.", en:"He ended up saying something in anger."},
    ],
  },
  {
    v2:"Uthna", dev:"उठना", meaningAdded:"Suddenly / abruptly / energetically starting an action",
    formula:"V1 (stem) + uthna",
    examples: [
      {v1:"rona", compound:"ro uthna", en:"suddenly burst into tears"},
      {v1:"hansna", compound:"hans uthna", en:"suddenly start laughing"},
      {v1:"chillaana", compound:"chillaa uthna", en:"suddenly cry out/shout"},
      {v1:"bolna", compound:"bol uthna", en:"suddenly speak out"},
    ],
    sentences: [
      {hi:"Bachcha ro utha.", ta:"குழந்தை திடீர்னு அழ ஆரம்பிச்சுது.", en:"The child suddenly started crying."},
    ],
    distinctFrom: "Baithna and Uthna both add suddenness — Uthna leans more \"burst out\" (energetic, outward), Baithna leans more \"ended up / regrettably\" (an unintended lapse).",
  },
  {
    v2:"Padna", dev:"पड़ना", meaningAdded:"Unintended occurrence / compulsion / having to do something — VERY important",
    formula:"V1 (stem) + padna  (past: V1 + pada/padi/pade)",
    examples: [
      {v1:"jaana", compound:"jaana pada", en:"had to go"},
      {v1:"rukna", compound:"rukna pada", en:"had to stay/wait"},
      {v1:"bolna", compound:"bolna pada", en:"had to speak"},
    ],
    sentences: [
      {hi:"Mujhe jaana pada.", ta:"நான் போக வேண்டியதாயிருந்தது.", en:"I had to go."},
      {hi:"Mujhe rukna pada.", ta:"நான் காத்திருக்க வேண்டியதாயிருந்தது.", en:"I had to stay/wait."},
      {hi:"Mujhe bolna pada.", ta:"நான் பேச வேண்டியதாயிருந்தது.", en:"I had to speak."},
    ],
    note: "'Pada' here isn't 'fell' — it creates the idea of 'had to / was forced to'.",
  },
  {
    v2:"Rakhna", dev:"रखना", meaningAdded:"Keeping the resulting state / maintaining something — very common in instructions",
    formula:"V1 (stem, often +e/ke) + rakhna",
    examples: [
      {v1:"likhna", compound:"likhe rakhna", en:"keep it written / write it down and keep it"},
      {v1:"bachaana", compound:"bacha ke rakhna", en:"keep it safely"},
      {v1:"sambhaalna", compound:"sambhal ke rakhna", en:"keep it carefully"},
      {v1:"yaad", compound:"yaad rakhna", en:"remember / keep in mind"},
      {v1:"chhupaana", compound:"chhupa ke rakhna", en:"keep hidden"},
    ],
    sentences: [
      {hi:"Ye yaad rakhna.", ta:"இதை ஞாபகம் வெச்சுக்கோ.", en:"Remember this / keep this in mind."},
      {hi:"Isse sambhal ke rakhna.", ta:"இதை கவனமா வெச்சுக்கோ.", en:"Keep this carefully."},
    ],
  },
  {
    v2:"Rehna", dev:"रहना", meaningAdded:"Continuation / remaining in a state",
    formula:"V1 (-e/-te form) + rehna",
    examples: [
      {v1:"baithna", compound:"baithe rehna", en:"remain sitting"},
      {v1:"khadna", compound:"khade rehna", en:"remain standing"},
      {v1:"chup", compound:"chup rehna", en:"remain silent"},
      {v1:"sona", compound:"sote rehna", en:"keep sleeping"},
      {v1:"karna", compound:"karte rehna", en:"keep doing"},
    ],
    sentences: [
      {hi:"Aap yahin baithe rahiye.", ta:"நீங்க இங்கயே உக்காந்திருங்க.", en:"Please remain seated here."},
      {hi:"Karte rehna.", ta:"பண்ணிண்டே இரு.", en:"Keep doing it."},
    ],
  },
  {
    v2:"Lagna", dev:"लगना", meaningAdded:"Starting/beginning an action — a bigger pattern, slightly different formula",
    formula:"V1 + ne + lagna",
    examples: [
      {v1:"rona", compound:"rone lagna", en:"start crying"},
      {v1:"hansna", compound:"hansne lagna", en:"start laughing"},
      {v1:"hona", compound:"hone lagna", en:"start happening/becoming"},
      {v1:"padhna", compound:"padhne lagna", en:"start studying"},
    ],
    sentences: [
      {hi:"Baarish hone lagi.", ta:"மழை பெய்ய ஆரம்பிச்சுது.", en:"It started raining."},
      {hi:"Woh padhne laga.", ta:"அவன் படிக்க ஆரம்பிச்சான்.", en:"He started studying."},
    ],
    note: "Different formula from the rest of this list — it's V1 + ne + lagna, not a plain stem + V2.",
  },
  {
    v2:"Chukna", dev:"चुकना", meaningAdded:"Already completed / finished — extremely useful for conversation",
    formula:"V1 (stem) + chuka/chuki/chuke + hoon/ho/hai",
    examples: [
      {v1:"karna", compound:"kar chukna", en:"have already done"},
      {v1:"jaana", compound:"ja chukna", en:"have already left"},
      {v1:"khaana", compound:"kha chukna", en:"have already eaten"},
    ],
    sentences: [
      {hi:"Kar chuka hoon.", ta:"நான் ஏற்கனவே பண்ணிட்டேன்.", en:"I have already done it."},
      {hi:"Woh ja chuka hai.", ta:"அவன் ஏற்கனவே போயிட்டான்.", en:"He has already left."},
      {hi:"Main kha chuka hoon.", ta:"நான் ஏற்கனவே சாப்பிட்டாச்சு.", en:"I have already eaten."},
    ],
  },
  {
    v2:"Sakna", dev:"सकना", meaningAdded:"Ability / possibility — \"can\". Keeps a strong grammatical meaning, so it's really a modal/helper verb rather than a pure 'friend verb'.",
    formula:"V1 (stem) + sakta/sakti/sakte + hoon/ho/hai/hain",
    examples: [
      {v1:"karna", compound:"kar sakna", en:"can do"},
      {v1:"jaana", compound:"ja sakna", en:"can go"},
      {v1:"bolna", compound:"bol sakna", en:"can speak"},
    ],
    sentences: [
      {hi:"Kar sakta hoon.", ta:"என்னால முடியும்.", en:"I can do (it)."},
      {hi:"Ja sakte hain.", ta:"போகலாம்.", en:"They/we can go."},
    ],
  },
];

// "Do" vs "V+lena/dena" — the same base verb, two nuances (bare command vs. a reminder/emphasis)
const DO_VS_LO_CONTRASTS = [
  {a:"Dekh lo", aEn:"Have a look / check it.", b:"Dekh lena", bEn:"Remember to check it / make sure you check it."},
  {a:"Bata do", aEn:"Tell me.", b:"Bata dena", bEn:"Make sure you tell me."},
  {a:"Kar lo", aEn:"Do it.", b:"Kar lena", bEn:"Make sure you do it."},
  {a:"Le lo", aEn:"Take it.", b:"Le lena", bEn:"Remember to take it."},
  {a:"Rakh do", aEn:"Put it down/there.", b:"Rakh dena", bEn:"Make sure you put it there."},
  {a:"Chhod do", aEn:"Leave it.", b:"Chhod dena", bEn:"Leave it / make sure to leave it."},
];

if (typeof module !== "undefined") module.exports = { COMPOUND_VERB_INTRO, COMPOUND_VERB_GROUPS, DO_VS_LO_CONTRASTS };
