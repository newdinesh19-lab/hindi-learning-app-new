// Gender reference — commonly used Hindi words and their gender (masculine = m, feminine = f),
// plus how adjectives and past-tense verbs change their ending to agree with gender.
// This is new material added on request (not from the original PDF), to help recall which
// common nouns are masculine vs feminine and how agreement works.

const NOUN_GENDER = [
  // People / family
  {hi:"Ladka", en:"boy", g:"m", ta:"பையன்", tanglish:"paiyan"}, {hi:"Ladki", en:"girl", g:"f", ta:"பொண்ணு", tanglish:"ponnu"},
  {hi:"Aadmi", en:"man", g:"m", ta:"ஆம்பளை", tanglish:"aambalai"}, {hi:"Aurat", en:"woman", g:"f", ta:"பொண்ணுங்க", tanglish:"pombalai"},
  {hi:"Beta", en:"son", g:"m", ta:"மகன்", tanglish:"magan"}, {hi:"Beti", en:"daughter", g:"f", ta:"மகள்", tanglish:"magal"},
  {hi:"Bhai", en:"brother", g:"m", ta:"அண்ணன் / தம்பி", tanglish:"annan / thambi"}, {hi:"Behen", en:"sister", g:"f", ta:"அக்கா / தங்கை", tanglish:"akka / thangai"},
  {hi:"Baap / Pita", en:"father", g:"m", ta:"அப்பா", tanglish:"appa"}, {hi:"Maa / Maata", en:"mother", g:"f", ta:"அம்மா", tanglish:"amma"},
  {hi:"Dost", en:"friend (m)", g:"m", ta:"நண்பன்", tanglish:"nanban"}, {hi:"Saheli", en:"friend (f, female's female friend)", g:"f", ta:"தோழி", tanglish:"thozhi"},
  // House / objects
  {hi:"Ghar", en:"house", g:"m", ta:"வீடு", tanglish:"veedu"}, {hi:"Kitaab", en:"book", g:"f", ta:"புத்தகம்", tanglish:"pusthagam"},
  {hi:"Kamra", en:"room", g:"m", ta:"ரூம்", tanglish:"room"}, {hi:"Mez", en:"table", g:"f", ta:"மேசை", tanglish:"mesai"},
  {hi:"Kursi", en:"chair", g:"f", ta:"நாற்காலி", tanglish:"naarkaali"}, {hi:"Darwaaza", en:"door", g:"m", ta:"கதவு", tanglish:"kadhavu"},
  {hi:"Khidki", en:"window", g:"f", ta:"ஜன்னல்", tanglish:"jannal"}, {hi:"Chhat", en:"roof/ceiling", g:"f", ta:"கூரை", tanglish:"koorai"},
  {hi:"Bartan", en:"utensil", g:"m", ta:"பாத்திரம்", tanglish:"paathiram"}, {hi:"Chaabi", en:"key", g:"f", ta:"சாவி", tanglish:"saavi"},
  {hi:"Bistar", en:"bed", g:"m", ta:"படுக்கை", tanglish:"padukkai"}, {hi:"Almari", en:"cupboard", g:"f", ta:"அலமாரி", tanglish:"almaari"},
  // Food
  {hi:"Khaana", en:"food", g:"m", ta:"சாப்பாடு", tanglish:"saapaadu"}, {hi:"Roti", en:"bread/flatbread", g:"f", ta:"ரொட்டி", tanglish:"rotti"},
  {hi:"Chai", en:"tea", g:"f", ta:"தேநீர்", tanglish:"theneer"}, {hi:"Paani", en:"water", g:"m", ta:"தண்ணி", tanglish:"thanni"},
  {hi:"Doodh", en:"milk", g:"m", ta:"பால்", tanglish:"paal"}, {hi:"Sabzi", en:"vegetable/curry", g:"f", ta:"காய்கறி", tanglish:"kaaikari"},
  {hi:"Chawal", en:"rice", g:"m", ta:"சோறு", tanglish:"soru"}, {hi:"Dal", en:"lentils", g:"f", ta:"பருப்பு", tanglish:"paruppu"},
  {hi:"Namak", en:"salt", g:"m", ta:"உப்பு", tanglish:"uppu"}, {hi:"Cheeni", en:"sugar", g:"f", ta:"சர்க்கரை", tanglish:"sarkkarai"},
  // Places / travel
  {hi:"Bazaar", en:"market", g:"m", ta:"மார்க்கெட்", tanglish:"market"}, {hi:"Dukaan", en:"shop", g:"f", ta:"கடை", tanglish:"kadai"},
  {hi:"Sadak", en:"road", g:"f", ta:"சாலை", tanglish:"saalai"}, {hi:"Raasta", en:"way/path", g:"m", ta:"வழி", tanglish:"vazhi"},
  {hi:"Station", en:"station", g:"m", ta:"ஸ்டேஷன்", tanglish:"station"}, {hi:"Gaadi", en:"vehicle/car/train", g:"f", ta:"வண்டி", tanglish:"vandi"},
  {hi:"Bus", en:"bus", g:"f", ta:"பஸ்", tanglish:"bus"}, {hi:"Hawai Jahaaz", en:"airplane", g:"m", ta:"விமானம்", tanglish:"vimaanam"},
  // Body / misc
  {hi:"Haath", en:"hand", g:"m", ta:"கை", tanglish:"kai"}, {hi:"Aankh", en:"eye", g:"f", ta:"கண்", tanglish:"kan"},
  {hi:"Sar", en:"head", g:"m", ta:"தலை", tanglish:"thalai"}, {hi:"Naak", en:"nose", g:"f", ta:"மூக்கு", tanglish:"mookku"},
  {hi:"Paisa", en:"money (coin)", g:"m", ta:"காசு", tanglish:"kaasu"}, {hi:"Zindagi", en:"life", g:"f", ta:"வாழ்க்கை", tanglish:"vaazhkkai"},
  {hi:"Samay / Waqt", en:"time", g:"m", ta:"நேரம்", tanglish:"neram"}, {hi:"Raat", en:"night", g:"f", ta:"இரவு", tanglish:"iravu"},
  {hi:"Din", en:"day", g:"m", ta:"நாள்", tanglish:"naal"}, {hi:"Subah", en:"morning", g:"f", ta:"காலை", tanglish:"kaalai"},
  // More nouns from the user's own "Hindi Nouns with Gender" course PDF (deduped against the
  // list above — a few, like Din/Paani/Bazaar, already appear so aren't repeated here).
  {hi:"Bageecha", en:"garden", g:"m", ta:"தோட்டம்", tanglish:"thottam"}, {hi:"Nadi", en:"river", g:"f", ta:"ஆறு", tanglish:"aaru"},
  {hi:"Phool", en:"flower", g:"m", ta:"பூ", tanglish:"poo"}, {hi:"Mitti", en:"soil", g:"f", ta:"மண்", tanglish:"man"},
  {hi:"Aam", en:"mango", g:"m", ta:"மாம்பழம்", tanglish:"maambazham"}, {hi:"Cycle", en:"bicycle", g:"f", ta:"சைக்கிள்", tanglish:"cycle"},
  {hi:"Talab", en:"pond", g:"m", ta:"குளம்", tanglish:"kulam"}, {hi:"Davai", en:"medicine", g:"f", ta:"மருந்து", tanglish:"marundhu"},
  {hi:"Sooraj", en:"sun", g:"m", ta:"சூரியன்", tanglish:"sooriyan"}, {hi:"Billi", en:"cat", g:"f", ta:"பூனை", tanglish:"poonai"},
  {hi:"Chashma", en:"glasses", g:"m", ta:"கண்ணாடி", tanglish:"kannaadi"}, {hi:"Rumaal", en:"handkerchief", g:"f", ta:"கைக்குட்டை", tanglish:"kaikkuttai"},
  {hi:"Pankha", en:"fan", g:"m", ta:"மின்விசிறி", tanglish:"min-visiri"}, {hi:"Bijli", en:"electricity", g:"f", ta:"மின்சாரம்", tanglish:"minsaaram"},
  {hi:"Bail", en:"bull", g:"m", ta:"காளை", tanglish:"kaalai"}, {hi:"Hawa", en:"air", g:"f", ta:"காற்று", tanglish:"kaatru"},
  {hi:"Kutta", en:"dog", g:"m", ta:"நாய்", tanglish:"naai"}, {hi:"Jhopdi", en:"hut", g:"f", ta:"குடிசை", tanglish:"kudisai"},
  {hi:"Raja", en:"king", g:"m", ta:"ராஜா", tanglish:"raajaa"}, {hi:"Ghadi", en:"clock / watch", g:"f", ta:"கடிகாரம்", tanglish:"kadikaaram"},
  {hi:"Chacha", en:"uncle (father's brother)", g:"m", ta:"சித்தப்பா / பெரியப்பா", tanglish:"sithappaa / periyappa"}, {hi:"Machhli", en:"fish", g:"f", ta:"மீன்", tanglish:"meen"},
  {hi:"Khel", en:"game", g:"m", ta:"விளையாட்டு", tanglish:"vilaiyaattu"}, {hi:"Shaadi", en:"wedding", g:"f", ta:"திருமணம்", tanglish:"thirumanam"},
  {hi:"Haathi", en:"elephant", g:"m", ta:"யானை", tanglish:"yaanai"}, {hi:"Mahila", en:"woman", g:"f", ta:"பெண்", tanglish:"pen"},
  {hi:"Teacher", en:"teacher", g:"m", ta:"ஆசிரியர்", tanglish:"aasiriyar"}, {hi:"Rasoi", en:"kitchen", g:"f", ta:"சமையலறை", tanglish:"samaiyalarai"},
  {hi:"Shahar", en:"city", g:"m", ta:"நகரம்", tanglish:"nagaram"}, {hi:"Tokri", en:"basket", g:"f", ta:"கூடை", tanglish:"koodai"},
  {hi:"Gaon", en:"village", g:"m", ta:"கிராமம்", tanglish:"graamam"}, {hi:"Chappal", en:"slipper", g:"f", ta:"செருப்பு", tanglish:"seruppu"},
  {hi:"Jawaab", en:"answer", g:"m", ta:"பதில்", tanglish:"pathil"}, {hi:"Topi", en:"cap", g:"f", ta:"தொப்பி", tanglish:"thoppi"},
  {hi:"Sawaal", en:"question", g:"m", ta:"கேள்வி", tanglish:"kelvi"}, {hi:"Dibba", en:"box / container", g:"f", ta:"டப்பா", tanglish:"dabba"},
  {hi:"Khet", en:"field", g:"m", ta:"வயல்", tanglish:"vayal"}, {hi:"Diary", en:"diary", g:"f", ta:"டைரி", tanglish:"diary"},
  {hi:"School", en:"school", g:"m", ta:"பள்ளி", tanglish:"palli"}, {hi:"Silai Machine", en:"sewing machine", g:"f", ta:"தையல் இயந்திரம்", tanglish:"thaiyal iyanthiram"},
  {hi:"College", en:"college", g:"m", ta:"கல்லூரி", tanglish:"kalloori"}, {hi:"Titli", en:"butterfly", g:"f", ta:"பட்டாம்பூச்சி", tanglish:"pattampoochi"},
  {hi:"Camera", en:"camera", g:"m", ta:"கேமரா", tanglish:"camera"}, {hi:"Chhadi", en:"stick", g:"f", ta:"தடி", tanglish:"thadi"},
  {hi:"Box", en:"box", g:"m", ta:"பெட்டி", tanglish:"petti"}, {hi:"Saree", en:"sari", g:"f", ta:"சேலை", tanglish:"saelai"},
  {hi:"Truck", en:"truck", g:"m", ta:"லாரி", tanglish:"lorry"}, {hi:"Chatai", en:"mat", g:"f", ta:"பாய்", tanglish:"paai"},
  {hi:"Bag", en:"bag", g:"m", ta:"பை", tanglish:"bai"}, {hi:"Kanghi", en:"comb", g:"f", ta:"சீப்பு", tanglish:"seeppu"},
  {hi:"Joota", en:"shoe", g:"m", ta:"காலணி", tanglish:"kaalani"}, {hi:"Kalam", en:"pen", g:"f", ta:"பேனா", tanglish:"penaa"},
  {hi:"Pair", en:"leg / foot", g:"m", ta:"கால்", tanglish:"kaal"}, {hi:"Botal", en:"bottle", g:"f", ta:"பாட்டில்", tanglish:"bottle"},
  {hi:"Samaan", en:"stuff / luggage", g:"m", ta:"சாமான்", tanglish:"saamaan"}, {hi:"Belan", en:"rolling pin", g:"m", ta:"சப்பாத்தி தட்டும் கருவி", tanglish:"chappathi thattum karuvi"},
  {hi:"Jhadu", en:"broom", g:"m", ta:"விளக்குமாறு", tanglish:"vilakkumaaru"}, {hi:"Ghoda", en:"horse", g:"m", ta:"குதிரை", tanglish:"kuthirai"},
  {hi:"Chaku", en:"knife", g:"m", ta:"கத்தி", tanglish:"kathi"}, {hi:"Insaan", en:"human", g:"m", ta:"மனிதன்", tanglish:"manithan"},
  {hi:"Gamla", en:"flower pot", g:"m", ta:"செடி தொட்டி", tanglish:"sedi thotti"}, {hi:"Motor", en:"motor", g:"m", ta:"மோட்டார்", tanglish:"motor"},
];

// Adjectives that change their ending: -aa (masculine) / -ii (feminine). Adjectives ending in
// a consonant (like "sundar", "achha" is the -aa type, "theek") often stay the same for both.
const ADJECTIVE_GENDER = [
  {m:"Achha", f:"Achhi", en:"good", ta:"நல்லது", tanglish:"nallathu"},
  {m:"Bura", f:"Buri", en:"bad", ta:"கெட்டது", tanglish:"kettathu"},
  {m:"Bada", f:"Badi", en:"big", ta:"பெரிசு", tanglish:"perisu"},
  {m:"Chota", f:"Choti", en:"small", ta:"சின்னது", tanglish:"sinnathu"},
  {m:"Naya", f:"Nayi", en:"new", ta:"புதுசு", tanglish:"pudhusu"},
  {m:"Purana", f:"Purani", en:"old (things)", ta:"பழசு", tanglish:"pazhasu"},
  {m:"Sasta", f:"Sasti", en:"cheap", ta:"விலை குறைவு", tanglish:"vilai kuraivu"},
  {m:"Mehnga", f:"Mehngi", en:"expensive", ta:"விலை அதிகம்", tanglish:"vilai adhigam"},
  {m:"Thanda", f:"Thandi", en:"cold", ta:"குளிர்", tanglish:"kulir"},
  {m:"Garam", f:"Garam", en:"hot (same for both)", ta:"சூடு", tanglish:"soodu"},
  {m:"Sundar", f:"Sundar", en:"beautiful (same for both)", ta:"அழகு", tanglish:"azhagu"},
  {m:"Lamba", f:"Lambi", en:"tall / long", ta:"நீளம்", tanglish:"neelam"},
];

// Past-tense and continuous verb forms agree with the gender (and number) of the subject.
const VERB_GENDER_EXAMPLES = [
  {pattern:"V + aa / ii / e (simple past)", m:"Woh gaya. = He went.", f:"Woh gayi. = She went."},
  {pattern:"V + yaa / ii (simple past, vowel-ending root)", m:"Main aaya. = I (m) came.", f:"Main aayi. = I (f) came."},
  {pattern:"Kiya / ki (did)", m:"Usne kaam kiya. = He did the work.", f:"Usne kaam kiya. (verb agrees with object 'kaam', m — stays kiya even for a female subject, when the object is masculine)"},
  {pattern:"Raha / rahi (continuous)", m:"Main kar raha hoon. = I (m) am doing.", f:"Main kar rahi hoon. = I (f) am doing."},
  {pattern:"Tha / thi (was / used to)", m:"Main jaata tha. = I (m) used to go.", f:"Main jaati thi. = I (f) used to go."},
  {pattern:"Saka / saki (could)", m:"Woh aa saka. = He was able to come.", f:"Woh aa saki. = She was able to come."},
  {pattern:"Milega / milegi (will be available) — agrees with the NOUN's gender, not the speaker's", m:"Idhar chai milega. (common in casual speech, but not strictly correct)", f:"Idhar chai milegi. (correct — 'chai' is feminine, so the verb should match it, same as any other future-tense agreement)"},
];

if (typeof module !== "undefined") module.exports = { NOUN_GENDER, ADJECTIVE_GENDER, VERB_GENDER_EXAMPLES };
