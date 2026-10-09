/* extraVocab.js — new reference material added from the user's own course PDFs/photos:
   1. NUMBERS_TABLE      — Hindi numbers 0–100 (+1000), Tanglish + Tamil-script pronunciation,
                            from "Hindi_1_-_100.pdf".
   2. VOCAB_WORDS        — ~50 everyday nouns (Devanagari, Tanglish, Tamil, English), from a
                            photographed course-book page ("Part-4", p.487).
   3. PRONOUN_POSTPOSITION_TABLE — the full oblique-pronoun + postposition grid (ka/ki/ke, ko,
                            ne, se, mein) for every pronoun, from a photographed class-note table.
                            The handwritten photo had some noisy spellings; this reconstructs the
                            standard correct forms so it's reliable to learn from. */

// ---- 1. Numbers 0–100 (+1000) ----
const NUM_ONES = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
  "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
const NUM_TENS = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
function numWord(n){
  if (n < 20) return NUM_ONES[n];
  if (n < 100){ const t = Math.floor(n/10), o = n%10; return NUM_TENS[t] + (o ? "-" + NUM_ONES[o].toLowerCase() : ""); }
  if (n === 100) return "Hundred";
  return String(n);
}
const NUMBERS_RAW = [
  [0,"Shuniye","சூன்ய"],[1,"Ek","ஏக்"],[2,"Do","தோ"],[3,"Teen","தீன்"],[4,"Char","ச்சார்"],
  [5,"Panch","பாஞ்ச்"],[6,"Cheh","ச்சே"],[7,"Saat","சாத்"],[8,"Aath","ஆட்"],[9,"Nao","நோ"],
  [10,"Das","தஸ்"],[11,"Gyaarah","க்யாரா"],[12,"Baarah","பாராஹ்"],[13,"Tehrah","தேராஹ்"],[14,"Chaudah","ச்சோதாஹ்"],
  [15,"Pandrah","பந்ராஹ்"],[16,"Saulah","சோலாஹ்"],[17,"Satrah","சத்ராஹ்"],[18,"Atharah","அட்டாராஹ்"],[19,"Unnis","உன்னீஸ்"],
  [20,"Bees","பீஸ்"],[21,"Ikis","இக்கீஸ்"],[22,"Bais","பாயீஸ்"],[23,"Teis","தேயீஸ்"],[24,"Chaubis","சவ்பீஸ்"],
  [25,"Pachis","பச்சீஸ்"],[26,"Chabis","ச்சப்பீஸ்"],[27,"Satais","சத்தாயீஸ்"],[28,"Athais","அட்டாயீஸ்"],[29,"Unatis","உந்தீஸ்"],
  [30,"Tis","தீஸ்"],[31,"Ikatis","இக்தீஸ்"],[32,"Batis","பத்தீஸ்"],[33,"Tentis","தைந்தீஸ்"],[34,"Chautis","ச்சவுந்தீஸ்"],
  [35,"Pentis","பைந்தீஸ்"],[36,"Chatis","ச்சத்தீஸ்"],[37,"Setis","சைந்தீஸ்"],[38,"Adhtis","அட்தீஸ்"],[39,"Untaalis","உந்தாலீஸ்"],
  [40,"Chalis","ச்சாலீஸ்"],[41,"Iktalis","இக்தாலீஸ்"],[42,"Byalis","பயாலீஸ்"],[43,"Tetalis","தைதாலீஸ்"],[44,"Chavalis","சவாலீஸ்"],
  [45,"Pentalis","பேந்தாலீஸ்"],[46,"Chyalis","ச்சியாலீஸ்"],[47,"Setalis","சைந்தாலீஸ்"],[48,"Adtalis","அட்தாலீஸ்"],[49,"Unachas","உன்ச்சாஸ்"],
  [50,"Pachas","பச்சாஸ்"],[51,"Ikyavan","இக்யாவன்"],[52,"Baavan","பாவன்"],[53,"Tirepan","திரப்பன்"],[54,"Chauvan","சவ்வன்"],
  [55,"Pachpan","பச்பன்"],[56,"Chappan","ச்சப்பன்"],[57,"Satavan","சதாவன்"],[58,"Athaavan","அட்டாவன்"],[59,"Unsadh","உன்சட்"],
  [60,"Saadh","சாட்"],[61,"Iksadh","இக்சட்"],[62,"Baasad","பாசட்"],[63,"Tirsadh","திர்சட்"],[64,"Chausadh","ச்சவ்சட்"],
  [65,"Pensadh","பைன்சட்"],[66,"Chiyasadh","ச்சியாசட்"],[67,"Sadhsadh","சட்சட்"],[68,"Asdhsadh","அட்சட்"],[69,"Unahtar","உன்ஹதர்"],
  [70,"Sattar","சத்தர்"],[71,"Ikhatar","இக்ஹதர்"],[72,"Bahatar","பஹாத்தர்"],[73,"Tihatar","திஹத்தர்"],[74,"Chauhatar","சவ்ஹத்தர்"],
  [75,"Pachhatar","பச்ஹத்தர்"],[76,"Chiyahatar","ச்சியஹத்தர்"],[77,"Satahatar","சத்ஹத்தர்"],[78,"Adhahatar","அட்ஹத்தர்"],[79,"Unnasi","உன்னாசி"],
  [80,"Assi","ஆஸ்ஸி"],[81,"Ikyasi","இக்யாசி"],[82,"Byaasi","பயாசி"],[83,"Tirasi","திராசி"],[84,"Chaurasi","சவ்ராசி"],
  [85,"Pachasi","பச்சாசி"],[86,"Chiyaasi","ச்சியாசி"],[87,"Sataasi","சத்தாசி"],[88,"Athasi","அட்டாசி"],[89,"Nauasi","நவாசி"],
  [90,"Nabbe","நப்பே"],[91,"Ikyaanave","இக்யான்வே"],[92,"Baanave","பானவே"],[93,"Tiranave","திரான்வே"],[94,"Chauraanave","சவ்ரான்வே"],
  [95,"Pachaanave","பச்சான்வே"],[96,"Chiyaanave","ச்சியான்வே"],[97,"Sataanave","சத்தான்வே"],[98,"Adhaanave","அட்டான்வே"],[99,"Ninyaanave","நின்யான்வே"],
  [100,"Ek Sau","எக் சோ"]
];
const NUMBERS_TABLE = NUMBERS_RAW.map(([n,hi,ta]) => ({ n, hi, ta, en: n<=100 ? numWord(n) : String(n) }));
NUMBERS_TABLE.push({ n:1000, hi:"Ek Hajaar", ta:"ஏக் ஹஜார்", en:"Thousand" });

// ---- 2. Vocabulary words (Devanagari / Tanglish / Tamil / English) ----
const VOCAB_WORDS = [
  {dev:"छुरा", hi:"Chchuraa", ta:"பெரிய வாள்", en:"big dagger"},
  {dev:"तालाब", hi:"Thalab", ta:"குளம்", en:"pond"},
  {dev:"दफ़्तर", hi:"Dhaphthar", ta:"அலுவலகம்", en:"office"},
  {dev:"दाम", hi:"Dhaam", ta:"விலை", en:"cost"},
  {dev:"दिन", hi:"Dhin", ta:"நாள்", en:"day"},
  {dev:"दूध", hi:"Dhoodhh", ta:"பால்", en:"milk"},
  {dev:"देश", hi:"Dhes", ta:"நாடு", en:"nation"},
  {dev:"नाटक", hi:"Naatak", ta:"நாடகம்", en:"drama"},
  {dev:"नाम", hi:"Naam", ta:"பெயர்", en:"name"},
  {dev:"पता", hi:"Pathaa", ta:"முகவரி", en:"address"},
  {dev:"पहाड़", hi:"Pahaad", ta:"மலை", en:"mountain"},
  {dev:"पाठ", hi:"Paatt", ta:"பாடம்", en:"lesson"},
  {dev:"पानी", hi:"Paanee", ta:"தண்ணீர்", en:"water"},
  {dev:"पेड़", hi:"Ped", ta:"மரம்", en:"tree"},
  {dev:"सेब", hi:"Seb", ta:"ஆப்பிள்", en:"apple"},
  {dev:"पैसा", hi:"Paisaa", ta:"காசு", en:"coin"},
  {dev:"मंदिर", hi:"Mandhir", ta:"கோயில்", en:"temple"},
  {dev:"मकान", hi:"Makaan", ta:"வீடு / கட்டிடம்", en:"house"},
  {dev:"महीना", hi:"Maheenaa", ta:"மாதம்", en:"month"},
  {dev:"फल", hi:"Phal", ta:"பழம்", en:"fruit"},
  {dev:"रास्ता", hi:"Raasthaa", ta:"வழி", en:"way"},
  {dev:"रुपया", hi:"Rupyaa", ta:"ரூபாய்", en:"rupee"},
  {dev:"लिफाफा", hi:"Liphaaphaa", ta:"உறை", en:"envelope"},
  {dev:"शहर", hi:"Sahar", ta:"நகரம்", en:"town"},
  {dev:"समय", hi:"Samay", ta:"நேரம்", en:"time"},
  {dev:"साल", hi:"Saal", ta:"வருடம்", en:"year"},
  {dev:"सिर", hi:"Sir", ta:"தலை", en:"head"},
  {dev:"भूदान", hi:"Bhoodhaan", ta:"பூமிதானம்", en:"gift of land"},
  {dev:"कान", hi:"Kaan", ta:"காது", en:"ear"},
  {dev:"चावल", hi:"Chaaval", ta:"அரிசி", en:"rice"},
  {dev:"हवाई अड्डा", hi:"Havaaee Addaa", ta:"விமான நிலையம்", en:"airport, aerodrome"},
  {dev:"अस्पताल", hi:"Aspathaal", ta:"மருத்துவமனை", en:"hospital"},
  {dev:"आकाश", hi:"Aakaash", ta:"ஆகாயம்", en:"sky"},
  {dev:"विदेशी", hi:"Vidhesee", ta:"வெளிநாட்டவர்", en:"foreigner"},
  {dev:"विश्वविद्यालय", hi:"Vishvavidhyaalay", ta:"பல்கலைக்கழகம்", en:"university"},
  {dev:"गुलाब", hi:"Gulaab", ta:"ரோஜா", en:"rose"},
  {dev:"धोबी", hi:"Dhhobee", ta:"துணிகளைத் துவைத்து தருபவர்", en:"washerman"},
  {dev:"सप्ताह", hi:"Sapthaah", ta:"வாரம்", en:"week"},
  {dev:"परिवार", hi:"Parivaar", ta:"குடும்பம்", en:"family"},
  {dev:"मेहमान", hi:"Mehmaan", ta:"விருந்தினர்", en:"guest"},
  {dev:"बाग", hi:"Baag", ta:"தோட்டம்", en:"garden"},
  {dev:"रसोईघर", hi:"Rasooeeghar", ta:"சமையலறை", en:"kitchen"},
  {dev:"फूल", hi:"Phool", ta:"பூக்கள்", en:"flowers"},
  {dev:"ढक्कन", hi:"Dakkan", ta:"மூடி", en:"lid"},
  {dev:"झंडा", hi:"Jahnda", ta:"கொடி", en:"flag"},
  {dev:"इनाम", hi:"Enaam", ta:"அன்பளிப்பு", en:"gift"},
  {dev:"जहाज़", hi:"Jahaaj", ta:"கப்பல்", en:"ship"},
  {dev:"पत्थर", hi:"Paththar", ta:"கல்", en:"stone"},
  {dev:"दल", hi:"Dhal", ta:"குழு", en:"committee"},
  {dev:"झुंड", hi:"Junnd", ta:"கூட்டம்", en:"group"},
  {dev:"पहिया", hi:"Pahiyaa", ta:"சக்கரம்", en:"wheel"},
  /* 7 more everyday words, from a class session on work/stress talk and multipliers */
  {dev:"परेशान", hi:"Pareshaan", ta:"கஷ்டம் / கவலை", en:"worried / troubled"},
  {dev:"सफ़र", hi:"Safar", ta:"பயணம்", en:"journey / travel"},
  {dev:"सिरदर्द", hi:"Sirdard", ta:"தலைவலி", en:"headache"},
  {dev:"कमर", hi:"Kamar", ta:"இடுப்பு / முதுகு", en:"waist / lower back"},
  {dev:"गुना", hi:"Gunaa", ta:"மடங்கு", en:"times (multiplier — do gunaa = double, paanch gunaa = five times)"},
  {dev:"लाभ", hi:"Laabh", ta:"லாபம்", en:"profit / benefit"},
  {dev:"पसंदीदा", hi:"Pasandeeda", ta:"பிடித்த / விருப்பமான", en:"favorite"},
  {dev:"लेकिन", hi:"Lekin", ta:"ஆனா / ஆனால்", en:"but"},
  {dev:"मिलेगा", hi:"Milega", ta:"கிடைக்கும்", en:"will get / will be available"},
];

// ---- 3. Pronoun + postposition table (ka/ki/ke, ko, ne, se, mein for every pronoun) ----
// Reconstructed to the standard, grammatically correct forms from the class-note photo.
const PRONOUN_POSTPOSITION_TABLE = [
  {pronoun:"Main", en:"I", ta:"நான்", ka:"Mera", ki:"Meri", ke:"Mere", ko:"Mujhe / Mujhko", ne:"Maine", se:"Mujhse", mein:"Mujhmein"},
  {pronoun:"Tu", en:"you (very informal, singular)", ta:"நீ (romba close)", ka:"Tera", ki:"Teri", ke:"Tere", ko:"Tujhe / Tujhko", ne:"Tune", se:"Tujhse", mein:"Tujhmein"},
  {pronoun:"Tum", en:"you (informal)", ta:"நீ", ka:"Tumhara", ki:"Tumhari", ke:"Tumhare", ko:"Tumhe / Tumko", ne:"Tumne", se:"Tumse", mein:"Tummein"},
  {pronoun:"Aap", en:"you (polite)", ta:"நீங்க", ka:"Aapka", ki:"Aapki", ke:"Aapke", ko:"Aapko", ne:"Aapne", se:"Aapse", mein:"Aapmein"},
  {pronoun:"Yeh / Is-", en:"this (as subject / oblique)", ta:"இது", ka:"Iska", ki:"Iski", ke:"Iske", ko:"Ise / Isko", ne:"Isne", se:"Isse", mein:"Ismein"},
  {pronoun:"Voh / Us-", en:"that (as subject / oblique)", ta:"அது", ka:"Uska", ki:"Uski", ke:"Uske", ko:"Use / Usko", ne:"Usne", se:"Usse", mein:"Usmein"},
  {pronoun:"Ye / In-", en:"these / they (respectful or plural)", ta:"இவங்க", ka:"Inka", ki:"Inki", ke:"Inke", ko:"Inhe / Inko", ne:"Inhone", se:"Inse", mein:"Inmein"},
  {pronoun:"Ve / Un-", en:"those / they (respectful or plural)", ta:"அவங்க", ka:"Unka", ki:"Unki", ke:"Unke", ko:"Unhe / Unko", ne:"Unhone", se:"Unse", mein:"Unmein"},
  {pronoun:"Hum", en:"we", ta:"நாங்க / நாம", ka:"Hamara", ki:"Hamari", ke:"Hamare", ko:"Humein / Humko", ne:"Humne", se:"Humse", mein:"Hummein"},
  {pronoun:"Kaun / Kis-", en:"who (as subject / oblique)", ta:"யார்", ka:"Kiska", ki:"Kiski", ke:"Kiske", ko:"Kise / Kisko", ne:"Kisne", se:"Kisse", mein:"Kismein"},
];

if (typeof module !== "undefined") module.exports = { NUMBERS_TABLE, VOCAB_WORDS, PRONOUN_POSTPOSITION_TABLE };
