// Real spoken-conversation scenarios — full back-and-forth style dialogue for a given
// situation (not single isolated sentences, and not a one-sided monologue either — every
// scenario now has real Patient replies woven in, so it plays like an actual conversation
// with two speakers, same as the "200 Convos" life-scenario library). Written to match the
// "natural spoken Hindi, not literary" register the user asked for, in the same field style
// as the rest of the app: hi = Hindi written in Roman/Tanglish (so it's readable without
// knowing Devanagari), ta = natural spoken Tamil (script), en = English meaning, note =
// optional grammar point. sp = "you" (you, the clinician/user) or "other" (the Patient).
// Content and register modeled directly on the user's own pre-op/OT conversation example
// (an anaesthesia/patient-communication context), extended to cover the rest of a typical
// patient-care day. The Patient's replies are original lines written to fit naturally
// between the user's own material, not translations of anything the user supplied.

const SCENARIOS = [
  {
    id: "sc1", icon: "🏥", title: "Pre-op → OT: reassuring the patient", otherRole: "Patient",
    context: "Talking to a nervous patient just before shifting them into the operation theatre.",
    lines: [
      {sp:"you", en:"Don't worry, everything will be alright.", hi:"Chinta mat kijiye, sab theek ho jaayega.", ta:"கவலைப்படாதீங்க, எல்லாம் சரியாகிவிடும்.", note:"chinta mat kijiye = respectful negative command; ho jaayega = hona + jaana, future 'will become'"},
      {sp:"other", en:"Okay doctor, I'm a little scared.", hi:"Theek hai doctor, thoda dar lag raha hai.", ta:"சரி டாக்டர், கொஞ்சம் பயமா இருக்கு."},
      {sp:"you", en:"After the doctor comes, we'll take you inside.", hi:"Sir ke aane ke baad hum aapko andar le jaayenge.", ta:"சார் வந்த பிறகு உங்களை உள்ளே கூட்டிட்டுப் போவோம்.", note:"V + ne ke baad = 'after doing V'; andar le jaana = take inside (compound: lena + jaana)"},
      {sp:"you", en:"After going inside, first we'll numb your back with medicine, then give an injection.", hi:"Andar jaane ke baad pehle peeth mein dawa denge, phir ek injection denge.", ta:"உள்ளே சென்ற பிறகு முதலில் முதுகில் மருந்து கொடுப்போம், பிறகு ஒரு injection கொடுப்போம்."},
      {sp:"other", en:"Will it hurt a lot?", hi:"Bahut dard hoga kya?", ta:"ரொம்ப வலிக்குமா?"},
      {sp:"you", en:"There will be two injections in total.", hi:"Kul do injection honge.", ta:"மொத்தம் இரண்டு injection இருக்கும்.", note:"honge = hona, plural future — agrees with 'do injection' being plural"},
      {sp:"you", en:"The first injection will only numb that one area.", hi:"Pehle injection se sirf us jagah ka hissa sunn ho jaayega.", ta:"முதல் injection-ஆல் அந்த இடம் மட்டும் மரத்துப் போய்விடும்.", note:"se = by/through here; sunn ho jaana = 'become numb'"},
      {sp:"you", en:"The second injection will numb the stomach, waist and both legs.", hi:"Doosre injection se pet, kamar aur dono pair sunn ho jaayenge.", ta:"இரண்டாவது injection-ஆல் வயிறு, இடுப்பு மற்றும் இரண்டு கால்களும் மரத்துப் போய்விடும்.", note:"doosre injection se — 'doosre' (oblique) because it's followed by 'se'"},
      {sp:"other", en:"Will I be able to feel my legs again after that?", hi:"Uske baad mujhe pair phir se mehsoos honge?", ta:"அதற்குப் பிறகு காலு மறுபடியும் தெரியுமா?"},
      {sp:"you", en:"Don't worry, it'll stay like this for the first 4–6 hours.", hi:"Chinta mat kijiye. Pehle chaar se chhe ghante tak aisa hi rahega.", ta:"கவலைப்படாதீங்க. முதல் 4–6 மணி நேரம் இப்படித்தான் இருக்கும்.", note:"X se Y ghante tak = 'from X to Y hours'"},
      {sp:"you", en:"After that, it'll slowly become normal.", hi:"Uske baad dheere-dheere normal ho jaayega.", ta:"அதற்குப் பிறகு கொஞ்சம் கொஞ்சமா normal ஆகிவிடும்."},
      {sp:"you", en:"Slowly you'll be able to move your legs.", hi:"Dheere-dheere aap apne pair hila paayenge.", ta:"கொஞ்சம் கொஞ்சமா உங்கள் கால்களை அசைக்க முடியும்.", note:"V + paana = 'be able to'; hila paayenge = 'will be able to move'"},
      {sp:"other", en:"Okay doctor, thank you for explaining.", hi:"Theek hai doctor, samjhane ke liye dhanyavaad.", ta:"சரி டாக்டர், விளக்கினதுக்கு நன்றி."},
      {sp:"you", en:"Don't worry.", hi:"Chinta mat kijiye.", ta:"கவலைப்படாதீங்க."},
      {sp:"you", en:"This operation is only for your own good.", hi:"Hum ye operation aapke achhe ke liye hi kar rahe hain.", ta:"உங்கள் நலனுக்காகத்தான் இந்த operation செய்கிறோம்.", note:"ke liye = 'for'; hi = emphasis word, 'only/specifically'"},
      {sp:"you", en:"We'll do your operation well, and send you out safely afterward. Okay?", hi:"Hum aapka operation achhe se karenge. Operation ke baad aapko surakshit baahar le aayenge. Theek hai?", ta:"உங்கள் operation-ஐ நன்றாகச் செய்வோம். Operation முடிந்த பிறகு உங்களை பாதுகாப்பாக வெளியே கொண்டு வருவோம். சரியா?"},
      {sp:"other", en:"Okay doctor, I trust you.", hi:"Theek hai doctor, mujhe aap par bharosa hai.", ta:"சரி டாக்டர், உங்க மேல நம்பிக்கை இருக்கு."},
    ]
  },
  {
    id: "sc2", icon: "📝", title: "Informed consent before a procedure", otherRole: "Patient",
    context: "Explaining a procedure, checking allergies/fasting, and getting consent signed.",
    lines: [
      {sp:"you", en:"I want to explain today's procedure to you.", hi:"Aaj ka procedure main aapko samjhana chahta/chahti hoon.", ta:"இன்னைக்கு procedure-ஐ நான் உங்களுக்கு விளக்க விரும்புறேன்."},
      {sp:"other", en:"Yes doctor, please go ahead.", hi:"Haan doctor, bataiye.", ta:"சரி டாக்டர், சொல்லுங்க."},
      {sp:"you", en:"We will give you anesthesia so you don't feel any pain.", hi:"Hum aapko anesthesia denge taaki aapko dard na ho.", ta:"வலி வராம இருக்க நாங்க உங்களுக்கு anesthesia கொடுப்போம்.", note:"taaki ... na ho = 'so that ... doesn't happen' — purpose clause"},
      {sp:"you", en:"There is a small risk with this, but it's very rare.", hi:"Isme thoda risk hota hai, lekin bahut kam hota hai.", ta:"இதுல கொஞ்சம் risk இருக்கும், ஆனா அது ரொம்ப அரிதா தான் நடக்கும்."},
      {sp:"you", en:"Do you have an allergy to any medicine?", hi:"Kya aapko kisi dawa se allergy hai?", ta:"உங்களுக்கு எந்த மருந்துக்காவது allergy இருக்கா?", note:"kisi dawa se allergy = 'allergy to some medicine' (se = to/from here)"},
      {sp:"other", en:"No, I don't have any allergy.", hi:"Nahi, mujhe koi allergy nahi hai.", ta:"இல்ல, எனக்கு allergy ஒண்ணும் இல்ல."},
      {sp:"you", en:"Have you eaten or drunk anything since last night?", hi:"Kal raat se aapne kuch khaaya ya piya hai?", ta:"நேத்து ராத்திரி முதல் நீங்க ஏதாவது சாப்பிட்டீங்களா அல்லது குடிச்சீங்களா?"},
      {sp:"other", en:"No, I've had nothing since last night.", hi:"Nahi, kal raat se kuch nahi khaaya.", ta:"இல்ல, நேத்து ராத்திரியிலிருந்து ஒண்ணும் சாப்பிடலை."},
      {sp:"you", en:"You must not eat or drink anything before the operation.", hi:"Operation se pehle aapko kuch bhi khaana-peena nahi hai.", ta:"Operation-க்கு முன்னாடி நீங்க எதுவும் சாப்பிடவோ குடிக்கவோ கூடாது.", note:"se pehle = 'before'"},
      {sp:"you", en:"Please sign this consent form.", hi:"Kripya yeh consent form par sign kijiye.", ta:"தயவுசெய்து இந்த consent form-ல sign பண்ணுங்க."},
      {sp:"you", en:"If you have any doubt, please ask me now.", hi:"Agar aapko koi shak ho, toh abhi poochh lijiye.", ta:"உங்களுக்கு ஏதாவது சந்தேகம் இருந்தா, இப்பவே கேளுங்க.", note:"agar ... toh = 'if ... then'"},
      {sp:"you", en:"Is everything clear to you?", hi:"Kya aapko sab kuch samajh mein aaya?", ta:"உங்களுக்கு எல்லாம் புரிஞ்சதா?"},
      {sp:"other", en:"Yes, everything is clear — I have one small question.", hi:"Haan, sab samajh mein aaya, ek chhota sawaal hai.", ta:"ஆமா, எல்லாம் புரிஞ்சுது, ஒரு சின்ன கேள்வி இருக்கு."},
      {sp:"you", en:"Do you have any questions for me?", hi:"Kya aapke koi sawaal hain mere liye?", ta:"உங்களுக்கு என்கிட்ட ஏதாவது கேள்வி இருக்கா?"},
      {sp:"other", en:"How long will the whole procedure take?", hi:"Poora procedure kitni der lega?", ta:"முழு procedure-க்கும் எவ்ளோ நேரம் ஆகும்?"},
      {sp:"you", en:"Thank you, we will take good care of you.", hi:"Dhanyavaad, hum aapka poora khayal rakhenge.", ta:"நன்றி, நாங்க உங்களை நல்லா கவனிச்சுக்குவோம்."},
    ]
  },
  {
    id: "sc3", icon: "🛏️", title: "Post-op ward round: checking recovery", otherRole: "Patient",
    context: "First conversation with the patient after they wake up, checking pain and comfort.",
    lines: [
      {sp:"you", en:"How are you feeling now?", hi:"Ab aap kaisa mehsoos kar rahe hain?", ta:"இப்போ உங்களுக்கு எப்படி இருக்கு?"},
      {sp:"other", en:"A little groggy, but okay.", hi:"Thoda neend aa rahi hai, lekin theek hoon.", ta:"கொஞ்சம் தூக்கம் வருது, ஆனா நல்லா தான் இருக்கேன்."},
      {sp:"you", en:"Is there any pain?", hi:"Koi dard hai kya?", ta:"ஏதாவது வலி இருக்கா?"},
      {sp:"other", en:"Yes, a little pain near the wound.", hi:"Haan, ghaav ke paas thoda dard hai.", ta:"ஆமா, காயத்தை அருகில கொஞ்சம் வலி இருக்கு."},
      {sp:"you", en:"On a scale of 1 to 10, how much pain?", hi:"Ek se das mein, kitna dard hai?", ta:"ஒன்னு முதல் பத்து வரைக்கும், எவ்வளவு வலி இருக்கு?"},
      {sp:"other", en:"Around four or five.", hi:"Karib chaar ya paanch.", ta:"கிட்டத்தட்ட நாலு அல்லது ஐஞ்சு."},
      {sp:"you", en:"We will give you a painkiller.", hi:"Hum aapko dard ki dawa denge.", ta:"நாங்க உங்களுக்கு வலி நிவாரண மருந்து கொடுப்போம்."},
      {sp:"you", en:"Are you able to move your legs?", hi:"Kya aap apne pair hila pa rahe hain?", ta:"உங்க கால்களை அசைக்க முடியுதா?", note:"pa rahe hain = present continuous of paana ('be able to')"},
      {sp:"other", en:"Yes, a little bit.", hi:"Haan, thoda-thoda.", ta:"ஆமா, கொஞ்சம் கொஞ்சமா."},
      {sp:"you", en:"Do you feel nauseous, like you want to vomit?", hi:"Kya aapko jee michla raha hai ya ulti jaisa lag raha hai?", ta:"குமட்டல் மாதிரி இருக்கா, வாந்தி வரும் மாதிரி இருக்கா?"},
      {sp:"other", en:"A little nauseous, yes.", hi:"Thoda jee michla raha hai, haan.", ta:"கொஞ்சம் குமட்டல் மாதிரி இருக்கு, ஆமா."},
      {sp:"you", en:"Try to take deep breaths.", hi:"Gehri saans lene ki koshish kijiye.", ta:"ஆழமா மூச்சு எடுக்க முயற்சி பண்ணுங்க."},
      {sp:"you", en:"You can drink small sips of water now.", hi:"Ab aap thoda-thoda paani pee sakte hain.", ta:"இப்போ கொஞ்சம் கொஞ்சமா தண்ணி குடிக்கலாம்.", note:"V + sakte hain = 'can/be able to' (general ability)"},
      {sp:"you", en:"We will help you sit up slowly.", hi:"Hum aapko dheere-dheere baithne mein madad karenge.", ta:"நாங்க உங்களை மெதுவா உட்கார வைக்க உதவி பண்ணுவோம்."},
      {sp:"you", en:"Call the nurse if you need anything.", hi:"Agar kuch chahiye toh nurse ko bulaiye.", ta:"ஏதாவது வேணும்னா nurse-ஐ கூப்பிடுங்க."},
      {sp:"you", en:"You are recovering well.", hi:"Aap achhi tarah se theek ho rahe hain.", ta:"நீங்க நல்லா recover ஆகிட்டு இருக்கீங்க."},
      {sp:"other", en:"Thank you doctor, that's good to hear.", hi:"Dhanyavaad doctor, ye sunke achha laga.", ta:"நன்றி டாக்டர், கேட்டு சந்தோஷமா இருக்கு."},
    ]
  },
  {
    id: "sc4", icon: "👨‍👩‍👧", title: "ICU update to family members", otherRole: "Family member",
    context: "Speaking to worried relatives waiting outside after surgery.",
    lines: [
      {sp:"you", en:"Your patient's operation is over.", hi:"Aapke mareez ka operation ho gaya hai.", ta:"உங்க patient-ஓட operation முடிஞ்சுடுச்சு."},
      {sp:"other", en:"Thank god. Is everything okay?", hi:"Shukar hai. Sab theek hai na?", ta:"நல்லவேளை. எல்லாம் சரியா இருக்கா?"},
      {sp:"you", en:"He/she is stable right now.", hi:"Woh abhi stable hain.", ta:"அவங்க இப்போ stable ஆ இருக்காங்க."},
      {sp:"you", en:"He/she has been kept on the ventilator for observation.", hi:"Unhe observation ke liye ventilator par rakha gaya hai.", ta:"கவனிப்புக்காக அவங்களை ventilator-ல வச்சிருக்காங்க.", note:"unhe ... rakha gaya hai = passive construction, 'has been kept'"},
      {sp:"other", en:"Is the ventilator something serious?", hi:"Ventilator matlab kuch serious hai kya?", ta:"Ventilator-னா ஏதாவது serious-ஆ?"},
      {sp:"you", en:"No, it's just a precaution — we will shift him/her to the ward tomorrow.", hi:"Nahi, ye sirf ehtiyaat ke liye hai, hum unhe kal ward mein shift karenge.", ta:"இல்ல, இது வெறும் ஜாக்கிரதைக்காக, நாங்க அவங்களை நாளைக்கு ward-க்கு shift பண்ணுவோம்."},
      {sp:"you", en:"You can meet him/her for five minutes.", hi:"Aap unse paanch minute mil sakte hain.", ta:"நீங்க அவங்களை ஐஞ்சு நிமிஷம் பார்க்கலாம்.", note:"unse milna = 'meet with him/her' — milna takes 'se'"},
      {sp:"other", en:"Thank you, we'll go one at a time.", hi:"Dhanyavaad, hum ek-ek karke jaayenge.", ta:"நன்றி, நாங்க ஒவ்வொருத்தரா போறோம்."},
      {sp:"you", en:"Please don't worry too much.", hi:"Kripya zyada chinta mat kijiye.", ta:"தயவுசெய்து ரொம்ப கவலைப்படாதீங்க."},
      {sp:"you", en:"We will call you if there is any change.", hi:"Agar koi badlaav hoga toh hum aapko phone karenge.", ta:"ஏதாவது மாற்றம் இருந்தா நாங்க உங்களுக்கு phone பண்ணுவோம்."},
      {sp:"you", en:"Did he/she have any major illness before?", hi:"Kya unhe pehle koi badi bimari thi?", ta:"அவங்களுக்கு முன்னாடி ஏதாவது பெரிய நோய் இருந்ததா?"},
      {sp:"other", en:"No, only sugar and blood pressure.", hi:"Nahi, sirf sugar aur BP hai.", ta:"இல்ல, sugar-உம் BP-உம் மட்டும் தான்."},
      {sp:"you", en:"Please wait in the waiting area.", hi:"Kripya waiting area mein intezaar kijiye.", ta:"தயவுசெய்து waiting area-ல காத்திருங்க."},
      {sp:"you", en:"The doctor will speak with you shortly.", hi:"Doctor thodi der mein aapse baat karenge.", ta:"டாக்டர் கொஞ்ச நேரத்தில உங்களோட பேசுவாங்க."},
      {sp:"you", en:"Everything went well.", hi:"Sab kuch theek se hua.", ta:"எல்லாம் நல்லா நடந்துச்சு."},
      {sp:"other", en:"Thank you so much, doctor.", hi:"Bahut bahut dhanyavaad, doctor.", ta:"ரொம்ப ரொம்ப நன்றி, டாக்டர்."},
    ]
  },
  {
    id: "sc5", icon: "💊", title: "Assessing pain & adjusting medicine", otherRole: "Patient",
    context: "Checking a patient's pain in detail and deciding whether to change the dose.",
    lines: [
      {sp:"you", en:"Where exactly is the pain?", hi:"Dard bilkul kahan ho raha hai?", ta:"வலி சரியா எங்க இருக்கு?"},
      {sp:"other", en:"Near my stomach, on the right side.", hi:"Mere pet ke paas, right side mein.", ta:"என் வயிற்றுக்கு அருகில, வலது பக்கம்."},
      {sp:"you", en:"Is it constant, or does it come and go?", hi:"Yeh dard lagataar hai ya aata-jaata hai?", ta:"இந்த வலி தொடர்ந்து இருக்கா அல்லது வந்து போகுதா?"},
      {sp:"other", en:"It comes and goes.", hi:"Ye aata-jaata hai.", ta:"இது வந்து போகுது."},
      {sp:"you", en:"Does it get worse when you move?", hi:"Hilne se dard zyada hota hai kya?", ta:"அசஞ்சா வலி அதிகமாகுதா?"},
      {sp:"other", en:"Yes, it gets worse.", hi:"Haan, zyada ho jaata hai.", ta:"ஆமா, அதிகமாகிடுது."},
      {sp:"you", en:"Did the last injection help?", hi:"Pichhla injection se aaraam mila?", ta:"கடைசி injection-ல ஆறுதல் கிடைச்சதா?"},
      {sp:"other", en:"A little, but not fully.", hi:"Thoda, lekin poora nahi.", ta:"கொஞ்சம், ஆனா முழுசா இல்ல."},
      {sp:"you", en:"We will increase the dose a little.", hi:"Hum dose thoda badha denge.", ta:"நாங்க dose-ஐ கொஞ்சம் அதிகப்படுத்துவோம்."},
      {sp:"you", en:"This medicine may make you feel a little sleepy.", hi:"Is dawa se aapko thodi neend aa sakti hai.", ta:"இந்த மருந்துனால உங்களுக்கு கொஞ்சம் தூக்கம் வரலாம்.", note:"se ... aa sakti hai = 'may cause' (possibility)"},
      {sp:"you", en:"Tell us immediately if the pain doesn't reduce.", hi:"Agar dard kam na ho toh turant bataiye.", ta:"வலி குறையலைன்னா உடனே சொல்லுங்க."},
      {sp:"you", en:"We can also give you an ice pack.", hi:"Hum aapko ice pack bhi de sakte hain.", ta:"நாங்க உங்களுக்கு ice pack-உம் தரலாம்."},
      {sp:"other", en:"Yes, an ice pack would help.", hi:"Haan, ice pack se madad milegi.", ta:"ஆமா, ice pack இருந்தா உதவியா இருக்கும்."},
      {sp:"you", en:"Is the pain better than yesterday?", hi:"Kya dard kal se behtar hai?", ta:"நேத்தைக்கு விட வலி குறைஞ்சிருக்கா?"},
      {sp:"other", en:"Yes, a little better than yesterday.", hi:"Haan, kal se thoda behtar hai.", ta:"ஆமா, நேத்தைக்கு விட கொஞ்சம் நல்லா இருக்கு."},
      {sp:"you", en:"Try to rest as much as possible.", hi:"Jitna ho sake aaraam kijiye.", ta:"முடிந்தவரை ரெஸ்ட் எடுங்க."},
    ]
  },
  {
    id: "sc6", icon: "😟", title: "Calming a frightened patient mid-procedure", otherRole: "Patient",
    context: "A patient becomes scared during a procedure while under regional anesthesia (awake).",
    lines: [
      {sp:"other", en:"Doctor, I'm scared, please help.", hi:"Doctor, mujhe dar lag raha hai, please help kijiye.", ta:"டாக்டர், எனக்கு பயமா இருக்கு, please உதவுங்க."},
      {sp:"you", en:"Don't be scared, I am right here.", hi:"Dariye mat, main yahin hoon.", ta:"பயப்படாதீங்க, நான் இங்கேயே இருக்கேன்."},
      {sp:"you", en:"You will only feel a little pressure, not pain.", hi:"Aapko sirf thoda dabaav mehsoos hoga, dard nahi.", ta:"உங்களுக்கு கொஞ்சம் அழுத்தம் மட்டும் தெரியும், வலி இருக்காது."},
      {sp:"you", en:"It will be over in a few minutes.", hi:"Yeh bas kuch minute mein khatam ho jaayega.", ta:"இது கொஞ்ச நிமிஷத்துல முடிஞ்சிடும்."},
      {sp:"other", en:"Okay, please stay close to me.", hi:"Theek hai, mere paas hi rahiye.", ta:"சரி, என்கிட்டேயே இருங்க."},
      {sp:"you", en:"Try to breathe slowly and calmly.", hi:"Dheere aur shaant hokar saans lijiye.", ta:"மெதுவா, அமைதியா மூச்சு விடுங்க."},
      {sp:"you", en:"Squeeze my hand if you feel uncomfortable.", hi:"Agar aapko takleef ho toh mera haath pakad lijiye.", ta:"உங்களுக்கு கஷ்டமா இருந்தா என் கையை பிடிச்சுக்குங்க."},
      {sp:"you", en:"We are watching you very closely.", hi:"Hum aapko bahut dhyan se dekh rahe hain.", ta:"நாங்க உங்களை ரொம்ப கவனமா பார்த்துக்கிட்டு இருக்கோம்."},
      {sp:"other", en:"Okay, I feel a little better now.", hi:"Theek hai, ab thoda achha lag raha hai.", ta:"சரி, இப்போ கொஞ்சம் நல்லா இருக்கு."},
      {sp:"you", en:"You're doing very well.", hi:"Aap bahut achha kar rahe hain.", ta:"நீங்க ரொம்ப நல்லா செய்யறீங்க."},
      {sp:"you", en:"Just a little more time.", hi:"Bas thoda aur samay.", ta:"இன்னும் கொஞ்சம் நேரம் தான்."},
      {sp:"you", en:"It's almost done.", hi:"Lagbhag ho gaya hai.", ta:"கிட்டத்தட்ட முடிஞ்சிடுச்சு."},
      {sp:"you", en:"Well done, it's all over now.", hi:"Shaabaash, ab sab khatam ho gaya.", ta:"ஷபாஷ், இப்போ எல்லாம் முடிஞ்சிடுச்சு."},
      {sp:"other", en:"Thank you doctor, I feel much better.", hi:"Dhanyavaad doctor, ab bahut achha lag raha hai.", ta:"நன்றி டாக்டர், இப்போ ரொம்ப நல்லா இருக்கு."},
    ]
  },
  {
    id: "sc7", icon: "🌅", title: "Daily ward round check-in", otherRole: "Patient",
    context: "A routine morning round — sleep, food, bowel movement, wound, and plan for the day.",
    lines: [
      {sp:"you", en:"Good morning, how did you sleep last night?", hi:"Good morning, kal raat neend kaisi aayi?", ta:"காலை வணக்கம், நேத்து ராத்திரி தூக்கம் எப்படி வந்துச்சு?"},
      {sp:"other", en:"Good morning doctor, I slept well.", hi:"Good morning doctor, achhi neend aayi.", ta:"காலை வணக்கம் டாக்டர், நல்லா தூக்கம் வந்துச்சு."},
      {sp:"you", en:"Have you had your breakfast?", hi:"Kya aapne naashta kar liya?", ta:"காலை உணவு சாப்பிட்டாச்சா?"},
      {sp:"other", en:"Yes, I've eaten.", hi:"Haan, kha liya.", ta:"ஆமா, சாப்பிட்டாச்சு."},
      {sp:"you", en:"Are your bowels moving normally?", hi:"Kya potty normal ho rahi hai?", ta:"Toilet சரியா ஆகுதா?"},
      {sp:"other", en:"Yes, that's normal.", hi:"Haan, wo normal hai.", ta:"ஆமா, அது normal-ஆ தான் இருக்கு."},
      {sp:"you", en:"Let me check your wound/dressing.", hi:"Main aapki dressing check kar leta/leti hoon.", ta:"நான் உங்க dressing-ஐ check பண்றேன்."},
      {sp:"you", en:"Any fever or chills?", hi:"Koi bukhaar ya thand lagna hai kya?", ta:"ஏதாவது காய்ச்சல் அல்லது குளிர் இருக்கா?"},
      {sp:"other", en:"No, no fever.", hi:"Nahi, bukhaar nahi hai.", ta:"இல்ல, காய்ச்சல் இல்ல."},
      {sp:"you", en:"Try to walk a little today.", hi:"Aaj thoda chalne ki koshish kijiye.", ta:"இன்னைக்கு கொஞ்சம் நடக்க முயற்சி பண்ணுங்க."},
      {sp:"you", en:"We will remove the drip tomorrow.", hi:"Hum kal drip nikaal denge.", ta:"நாங்க நாளைக்கு drip-ஐ எடுத்துடுவோம்."},
      {sp:"you", en:"Your reports look good.", hi:"Aapki reports achhi lag rahi hain.", ta:"உங்க reports நல்லா இருக்கு."},
      {sp:"other", en:"That's a relief to hear, doctor.", hi:"Ye sunke araam mila, doctor.", ta:"இது கேட்டு நிம்மதியா இருக்கு, டாக்டர்."},
      {sp:"you", en:"Keep taking your medicines on time.", hi:"Apni dawaiyaan samay par lete rahiye.", ta:"உங்க மருந்துகளை நேரத்துக்கு தொடர்ந்து சாப்பிடுங்க."},
      {sp:"you", en:"If everything is fine, you can go home in two days.", hi:"Sab theek raha toh do din mein ghar ja sakte hain.", ta:"எல்லாம் சரியா இருந்தா, ரெண்டு நாளுக்குள்ள வீட்டுக்கு போகலாம்."},
      {sp:"other", en:"Thank you doctor, I'm looking forward to that.", hi:"Dhanyavaad doctor, uska intezaar hai.", ta:"நன்றி டாக்டர், அதுக்காக காத்துக்கிட்டு இருக்கேன்."},
      {sp:"you", en:"Any questions before I move to the next patient?", hi:"Agle patient ke paas jaane se pehle koi sawaal hai?", ta:"அடுத்த patient-கிட்ட போக முன்னாடி ஏதாவது கேள்வி இருக்கா?"},
    ]
  },
  {
    id: "sc8", icon: "🏠", title: "Discharge counselling", otherRole: "Patient",
    context: "Explaining medicines, precautions and follow-up before sending the patient home.",
    lines: [
      {sp:"you", en:"You are being discharged today.", hi:"Aaj aapko discharge kiya ja raha hai.", ta:"இன்னைக்கு உங்களை discharge பண்றோம்."},
      {sp:"other", en:"That's great news, doctor!", hi:"Ye bahut achhi khabar hai, doctor!", ta:"இது ரொம்ப நல்ல செய்தி, டாக்டர்!"},
      {sp:"you", en:"Take this medicine twice a day after food.", hi:"Yeh dawa din mein do baar, khaane ke baad lijiye.", ta:"இந்த மருந்த நாளைக்கு ரெண்டு தரம், சாப்பிட்ட பிறகு சாப்பிடுங்க."},
      {sp:"you", en:"Avoid heavy lifting for two weeks.", hi:"Do hafte tak bhaari saamaan mat uthaiye.", ta:"ரெண்டு வாரத்துக்கு கனமான பொருள் தூக்காதீங்க."},
      {sp:"other", en:"Okay, I'll be careful.", hi:"Theek hai, main dhyan rakhunga/rakhungi.", ta:"சரி, நான் கவனமா இருப்பேன்."},
      {sp:"you", en:"Keep the wound dry and clean.", hi:"Ghaav ko sookha aur saaf rakhiye.", ta:"காயத்த உலர்ந்ததா, சுத்தமா வச்சுக்குங்க."},
      {sp:"you", en:"Come for a follow-up after one week.", hi:"Ek hafte ke baad follow-up ke liye aaiye.", ta:"ஒரு வாரம் கழிச்சு follow-up-க்கு வாங்க."},
      {sp:"you", en:"If you get fever or too much pain, come to the emergency immediately.", hi:"Agar bukhaar ya bahut zyada dard ho toh turant emergency mein aaiye.", ta:"காய்ச்சல் அல்லது ரொம்ப வலி இருந்தா உடனே emergency-க்கு வாங்க."},
      {sp:"other", en:"Understood, doctor.", hi:"Samajh gaya/gayi, doctor.", ta:"புரிஞ்சுது, டாக்டர்."},
      {sp:"you", en:"Eat light, easily digestible food.", hi:"Halka aur aasani se pachne wala khaana khaiye.", ta:"இலகுவா, சீக்கிரம் ஜீரணமாகற உணவு சாப்பிடுங்க."},
      {sp:"you", en:"Rest well for the next few days.", hi:"Agle kuch dinon tak achhi tarah aaraam kijiye.", ta:"அடுத்த சில நாளைக்கு நல்லா ரெஸ்ட் எடுங்க."},
      {sp:"you", en:"Here is your discharge summary and medicine list.", hi:"Yeh lijiye aapki discharge summary aur dawaiyon ki list.", ta:"இதோ உங்க discharge summary மற்றும் மருந்து list."},
      {sp:"other", en:"Thank you for everything, doctor.", hi:"Sab ke liye dhanyavaad, doctor.", ta:"எல்லாத்துக்கும் நன்றி, டாக்டர்."},
      {sp:"you", en:"Take care, get well soon.", hi:"Khayal rakhiye, jaldi theek ho jaayiye.", ta:"கவனமா இருங்க, சீக்கிரம் நல்லா ஆயிடுங்க."},
    ]
  },
];

if (typeof module !== "undefined") module.exports = { SCENARIOS };
