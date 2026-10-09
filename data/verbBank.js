// Verb bank — merged from Spoken Hindi Master Notes appendix (113-verb numbered worksheet,
// the course's own root/order/request table) plus root verbs named explicitly in the
// Personal Teaching Instructions (kehna, etc.) that weren't in the worksheet.
// One obvious worksheet typo silently corrected: #111 "disturb" listed root as "peshavar kar"
// (not a real Hindi word for disturb) -> corrected to "pareshaan kar", matching the same
// course's own sentence "Pareshaan mat karo/keejiye" (Do not disturb) elsewhere in the notes.
// order = informal imperative (tum), request = polite imperative (aap)
const VERB_BANK = [
{n:1,en:"come",root:"aana",order:"aao",request:"aaiye"},
{n:2,en:"go",root:"jaana",order:"jaao",request:"jaaiye"},
{n:3,en:"walk / go along",root:"chalna",order:"chalo",request:"chaliye"},
{n:4,en:"sit",root:"baithna",order:"baitho",request:"baithiye"},
{n:5,en:"get up",root:"uthna",order:"utho",request:"uthiye"},
{n:6,en:"see / look / watch",root:"dekhna",order:"dekho",request:"dekhiye"},
{n:7,en:"show",root:"dikhaana",order:"dikhaao",request:"dikhaiye"},
{n:8,en:"hear / listen",root:"sunna",order:"suno",request:"suniye"},
{n:9,en:"study / read",root:"padhna",order:"padho",request:"padhiye"},
{n:10,en:"teach (also: padhaana)",root:"padhaana",order:"padhaao",request:"padhaiye"},
{n:11,en:"write",root:"likhna",order:"likho",request:"likhiye"},
{n:12,en:"eat",root:"khaana",order:"khao",request:"khaiye"},
{n:13,en:"sing",root:"gaana",order:"gao",request:"gaiye"},
{n:14,en:"drink",root:"peena",order:"piyo",request:"peejiye"},
{n:15,en:"bring",root:"laana",order:"laao",request:"laiye"},
{n:16,en:"take",root:"lena",order:"lelo",request:"lijiye"},
{n:17,en:"give",root:"dena",order:"dedo",request:"dijiye"},
{n:18,en:"do",root:"karna",order:"karo",request:"kijiye"},
{n:19,en:"think",root:"sochna",order:"socho",request:"sochiye"},
{n:20,en:"keep / put",root:"rakhna",order:"rakho",request:"rakhiye"},
{n:21,en:"stay / live",root:"rehna",order:"raho",request:"rahiye"},
{n:22,en:"put / add",root:"daalna",order:"daalo",request:"daaliye"},
{n:23,en:"ask",root:"poochhna",order:"poochho",request:"poochhiye",note:"order corrected from worksheet's \"poocho\" (missing an h) to match the root/request spelling"},
{n:24,en:"ask for / demand",root:"maangna",order:"maango",request:"maangiye"},
{n:25,en:"run",root:"daudna",order:"daudo",request:"daudiye"},
{n:26,en:"buy",root:"khareedna",order:"khareedo",request:"khareediye"},
{n:27,en:"sell",root:"bechna",order:"becho",request:"bechiye"},
{n:28,en:"stop",root:"rukna",order:"ruko",request:"rukiye",note:"order/request corrected from worksheet's \"rukho/rukhiye\" (extra h not in the root \"rukna\") to \"ruko/rukiye\""},
{n:29,en:"catch / hold",root:"pakadna",order:"pakado",request:"pakadiye"},
{n:30,en:"leave / let go",root:"chhodna",order:"chhodo",request:"chhodiye"},
{n:31,en:"break",root:"todna",order:"todo",request:"todiye"},
{n:32,en:"cut",root:"kaatna",order:"kaato",request:"kaatiye"},
{n:33,en:"drive",root:"chalaana",order:"chalaao",request:"chalaiye"},
{n:34,en:"learn",root:"seekhna",order:"seekho",request:"seekhiye"},
{n:35,en:"teach (train)",root:"sikhaana",order:"sikhaao",request:"sikhaiye"},
{n:36,en:"switch on",root:"chaalu karna",order:"chaalu karo",request:"chaalu kijiye"},
{n:37,en:"switch off / close",root:"band karna",order:"band karo",request:"band kijiye"},
{n:38,en:"open",root:"kholna",order:"kholo",request:"kholiye"},
{n:39,en:"say",root:"bolna",order:"bolo",request:"boliye"},
{n:40,en:"say / tell (bataana)",root:"bataana",order:"bataao",request:"bataiye"},
{n:41,en:"speak / talk",root:"baat karna",order:"baat karo",request:"baat kijiye"},
{n:42,en:"play",root:"khelna",order:"khelo",request:"kheliye"},
{n:43,en:"wait",root:"intezaar karna",order:"intezaar karo",request:"intezaar kijiye"},
{n:44,en:"call / invite",root:"bulaana",order:"bulaao",request:"bulaiye"},
{n:45,en:"earn",root:"kamaana",order:"kamaao",request:"kamaiye"},
{n:46,en:"fear",root:"darna",order:"daro",request:"dariye"},
{n:47,en:"fight",root:"ladna",order:"lado",request:"ladiye"},
{n:48,en:"sleep",root:"sona",order:"so jao",request:"so jaiye"},
{n:49,en:"dance",root:"naachna",order:"naacho",request:"naachiye"},
{n:50,en:"laugh",root:"hasna",order:"haso",request:"hasiye"},
{n:51,en:"cry",root:"rona",order:"ro jao",request:"ro jaiye"},
{n:52,en:"throw",root:"phenkna",order:"phenko",request:"phenkiye"},
{n:53,en:"spread",root:"failaana",order:"failao",request:"failaiye"},
{n:54,en:"bathe",root:"nahaana",order:"nahao",request:"nahaiye"},
{n:55,en:"swim",root:"tairna",order:"tairo",request:"tairiye"},
{n:56,en:"stay / wait",root:"theharna",order:"thehro",request:"thehriye"},
{n:57,en:"fall",root:"girna",order:"giro",request:"giriye"},
{n:58,en:"send",root:"bhejna",order:"bhejo",request:"bhejiye"},
{n:59,en:"fly",root:"udna",order:"udo",request:"udiye"},
{n:60,en:"roam",root:"ghoomna",order:"ghoomo",request:"ghoomiye"},
{n:61,en:"count",root:"ginna",order:"gino",request:"giniye"},
{n:62,en:"wear",root:"pehanna",order:"pehno",request:"pehniye"},
{n:63,en:"remove / take out",root:"nikaalna",order:"nikaalo",request:"nikaaliye"},
{n:64,en:"change",root:"badalna",order:"badlo",request:"badaliye"},
{n:65,en:"understand",root:"samajhna",order:"samjho",request:"samjhiye"},
{n:66,en:"meet",root:"milna",order:"milo",request:"miliye"},
{n:67,en:"climb",root:"chadhna",order:"chadho",request:"chadhiye"},
{n:68,en:"get down",root:"utarna",order:"utaro",request:"utariye"},
{n:69,en:"press",root:"dabaana",order:"dabao",request:"dabaiye"},
{n:70,en:"cook",root:"pakaana",order:"pakao",request:"pakaiye"},
{n:71,en:"paste / stick",root:"chipkaana",order:"chipkao",request:"chipkaiye"},
{n:72,en:"hit / beat",root:"maarna",order:"maaro",request:"maariye"},
{n:73,en:"die",root:"marna",order:"maro",request:"mariye"},
{n:74,en:"shout",root:"chillaana",order:"chillao",request:"chillaiye"},
{n:75,en:"wake up",root:"jaagna",order:"jaago",request:"jaagiye"},
{n:76,en:"accept",root:"maanna",order:"maano",request:"maaniye"},
{n:77,en:"wash",root:"dhona",order:"dho lo",request:"dho lijiye"},
{n:78,en:"touch",root:"chhoona",order:"chhuo",request:"chhuiye"},
{n:79,en:"burn / be on fire",root:"jalna",order:"jalo",request:"jaliye"},
{n:80,en:"light / burn (something)",root:"jalaana",order:"jalao",request:"jalaiye"},
{n:81,en:"know",root:"jaanna",order:"jaano",request:"jaaniye"},
{n:82,en:"stare",root:"ghoorna",order:"ghooro",request:"ghooriye"},
{n:83,en:"chew",root:"chabaana",order:"chabao",request:"chabaiye"},
{n:84,en:"taste",root:"chakhna",order:"chakho",request:"chakhiye"},
{n:85,en:"swallow",root:"nigalna",order:"nigalo",request:"nigaliye"},
{n:86,en:"win",root:"jeetna",order:"jeeto",request:"jeetiye"},
{n:87,en:"lose",root:"haarna",order:"haaro",request:"haariye"},
{n:88,en:"grind",root:"peesna",order:"peeso",request:"peesiye"},
{n:89,en:"pull",root:"kheenchna",order:"kheencho",request:"kheenchiye"},
{n:90,en:"push",root:"dhakelna",order:"dhakelo",request:"dhakeliye"},
{n:91,en:"live",root:"jeena",order:"jiyo",request:"jiye"},
{n:92,en:"search",root:"dhoondhna",order:"dhoondho",request:"dhoondhiye"},
{n:93,en:"build / make",root:"banaana",order:"banao",request:"banaiye"},
{n:94,en:"turn / rotate",root:"ghumaana",order:"ghumao",request:"ghumaiye"},
{n:95,en:"reach",root:"pahunchna",order:"pahuncho",request:"pahunchiye"},
{n:96,en:"move away",root:"hatna",order:"hato",request:"hatiye"},
{n:97,en:"happen / become",root:"hona",order:"ho jao",request:"ho jaiye"},
{n:98,en:"dry",root:"sookhna",order:"sookho",request:"sookhiye"},
{n:99,en:"pick up",root:"uthaana",order:"uthao",request:"uthaiye"},
{n:100,en:"smell",root:"soonghna",order:"soongho",request:"soonghiye"},
{n:101,en:"bark",root:"bhaunkna",order:"bhaunko",request:"bhaunkiye"},
{n:102,en:"steal",root:"churaana",order:"churao",request:"churaiye"},
{n:103,en:"dress up / decorate",root:"sajaana",order:"sajao",request:"sajaiye"},
{n:104,en:"sneeze",root:"cheenkna",order:"cheenko",request:"cheenkiye"},
{n:105,en:"lie down",root:"letna",order:"leto",request:"letiye"},
{n:106,en:"jump",root:"koodna",order:"koodo",request:"koodiye"},
{n:107,en:"marry",root:"shaadi karna",order:"shaadi karo",request:"shaadi kijiye"},
{n:108,en:"follow",root:"peechha karna",order:"peechha karo",request:"peechha kijiye"},
{n:109,en:"use",root:"istemaal karna",order:"istemaal karo",request:"istemaal kijiye"},
{n:110,en:"try",root:"koshish karna",order:"koshish karo",request:"koshish kijiye"},
{n:111,en:"finish",root:"khatam karna",order:"khatam karo",request:"khatam kijiye"},
{n:112,en:"act / pretend",root:"naatak karna",order:"naatak karo",request:"naatak kijiye"},
{n:113,en:"believe",root:"vishwaas karna",order:"vishwaas karo",request:"vishwaas kijiye"},
{n:114,en:"disturb (corrected — see note above)",root:"pareshaan karna",order:"pareshaan karo",request:"pareshaan kijiye"},
{n:115,en:"fill",root:"bharna",order:"bharo",request:"bhariye"},
{n:116,en:"lose / misplace",root:"khona",order:"kho lo",request:"kho lijiye"},
// From the Personal Teaching Instructions doc — named root verbs not in the worksheet:
{n:117,en:"say (kehna — distinct from bolna 'to speak')",root:"kehna",order:"kaho",request:"kahiye"},
{n:118,en:"wear (pehenna — teaching-doc spelling)",root:"pehenna",order:"pehno",request:"pehniye",note:"same verb as #62 pehanna; both spellings are heard"},
];

// ---------------------------------------------------------------------------
// Tense-form generator — adds, to every verb above, the core tense set already
// taught elsewhere in the app (general/habitual, present continuous, future,
// past, and the "should/let's" subjunctive), all in 3rd-person singular ("woh")
// form for a clean one-line reference, exactly like the Hona/Karna/Aana
// snapshots in the Grammar tab. Completive (V+jaana) forms are NOT generated
// here for all 118 verbs, since which light verb (jaana/lena/dena) idiomatically
// completes a given verb is lexical, not a clean rule — that nuance stays in the
// dedicated Grammar → "Verb tense snapshots" section for the 3 model verbs.
//
// Method: classify each verb's stem (root minus trailing "na") by its final
// sound, then apply the matching regular pattern. A short override list covers
// the handful of genuinely irregular verbs (jaana, khaana, karna, hona, lena,
// dena, peena, jeena, chhoona) where the regular pattern doesn't hold — these
// are well-known, textbook-standard exceptions, not guesses.
// "X karna" compound verbs (chaalu karna, band karna, ...) conjugate only the
// "karna" part and keep the noun prefix unchanged, which is how compounds work
// in real Hindi (e.g. "chaalu karega", "chaalu kiya").
(function(){
  const IRREGULAR = {
    "jaana":  { habitual:"jaata hai",  continuous:"jaa raha hai",  future:"jaayega",  past:"gaya" },
    "khaana": { habitual:"khaata hai", continuous:"khaa raha hai", future:"khaayega", past:"khaya" },
    "karna":  { habitual:"karta hai",  continuous:"kar raha hai",  future:"karega",   past:"kiya" },
    "hona":   { habitual:"hota hai",   continuous:"ho raha hai",   future:"hoga",     past:"hua" },
    "lena":   { habitual:"leta hai",   continuous:"le raha hai",   future:"lega",     past:"liya" },
    "dena":   { habitual:"deta hai",   continuous:"de raha hai",   future:"dega",     past:"diya" },
    "peena":  { habitual:"peeta hai",  continuous:"pee raha hai",  future:"piyega",   past:"piya" },
    "jeena":  { habitual:"jeeta hai",  continuous:"jee raha hai",  future:"jiyega",   past:"jiya" },
    "chhoona":{ habitual:"chhoota hai",continuous:"chhoo raha hai",future:"chhuyega", past:"chhua" },
  };

  function subjFromFuture(future){
    // The validated "subjunctive shortcut": drop -ga/-gi/-ge from any future form
    // (already taught in Grammar → "Should I / let's"). Works even on irregular
    // futures like "hoga"→"ho".
    return future.replace(/g[aei]$/, "");
  }

  function conjugateSimple(root, order){
    const key = root.toLowerCase();
    if (IRREGULAR[key]){
      const f = IRREGULAR[key];
      return { habitual:f.habitual, continuous:f.continuous, future:f.future, past:f.past, subjunctive: subjFromFuture(f.future) };
    }
    const fullStem = root.replace(/na$/, "");
    let habitual, continuous, future, past;
    if (fullStem.endsWith("aa")){                 // e.g. dikhaana, banaana, gaana, aana
      habitual = fullStem + "ta hai";
      continuous = fullStem + " raha hai";
      future = fullStem + "yega";
      past = fullStem + "ya";
    } else if (fullStem.endsWith("ee")){           // peena/jeena-type (handled by IRREGULAR already, kept as fallback)
      const short = fullStem.slice(0, -2) + "i";
      habitual = fullStem + "ta hai";
      continuous = fullStem + " raha hai";
      future = short + "yega";
      past = short + "ya";
    } else if (/[^aeiou]o$/.test(fullStem)){       // so, ro, dho, kho — single vowel "o" ending
      habitual = fullStem + "ta hai";
      continuous = fullStem + " raha hai";
      future = fullStem + "yega";
      past = fullStem + "ya";
    } else if (/[^aeiou]e$/.test(fullStem)){       // le, de-type single vowel "e" ending (besides the irregular lena/dena)
      habitual = fullStem + "ta hai";
      continuous = fullStem + " raha hai";
      future = fullStem.slice(0, -1) + "ega";
      past = fullStem.slice(0, -1) + "iya";
    } else {                                        // regular consonant-final stem
      // Use the given informal "order" (tum-imperative) to recover whether this
      // stem elides a medial vowel before a vowel-suffix (e.g. "badalna" → order
      // "badlo" shows the past/future use "badl-", not "badal-"), matching real
      // Hindi schwa-deletion. Habitual/continuous always keep the full stem.
      let reduced = fullStem;
      if (order && /^[a-z]+o$/i.test(order) && !order.includes(" ")) reduced = order.slice(0, -1);
      habitual = fullStem + "ta hai";
      continuous = fullStem + " raha hai";
      future = reduced + "ega";
      past = reduced + "a";
    }
    return { habitual, continuous, future, past, subjunctive: subjFromFuture(future) };
  }

  VERB_BANK.forEach(v => {
    const m = v.root.match(/^(.*)\s+karna$/); // "X karna" compounds
    let forms;
    if (m){
      const prefix = m[1];
      const k = IRREGULAR["karna"];
      forms = {
        habitual: `${prefix} ${k.habitual}`,
        continuous: `${prefix} ${k.continuous}`,
        future: `${prefix} ${k.future}`,
        past: `${prefix} ${k.past}`,
        subjunctive: `${prefix} ${subjFromFuture(k.future)}`,
      };
    } else {
      forms = conjugateSimple(v.root, v.order);
    }
    v.habitual = forms.habitual;
    v.continuous = forms.continuous;
    v.future = forms.future;
    v.past = forms.past;
    v.subjunctive = forms.subjunctive;
  });
})();

if (typeof module !== "undefined") module.exports = { VERB_BANK };
