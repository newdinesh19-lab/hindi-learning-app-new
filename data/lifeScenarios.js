/* LIFE_SCENARIOS — real-life situations × 10 short conversations each, modeled on the
   user's own outline: not single translated sentences but genuine short back-and-forth
   exchanges ("You" vs. the other person), roughly progressing from very basic (level 1)
   to natural/unexpected (level 5) within each scenario, each with a short "key vocab"
   callout. hi = Hindi (Roman/Tanglish), ta = Tamil (script), en = English.
   ls1–ls20 are the user's original 20-scenario outline (200 conversations). ls21–ls25 are
   5 more general everyday scenarios added afterward at the user's request (50 more
   conversations, 250 total): Barber/Salon, Gym, Post Office/Courier, Movie Theatre,
   Wedding/Function. */
const LIFE_SCENARIOS = [
{id:"ls1", icon:"🥕", title:"Vegetable / Fruit Seller", otherRole:"Seller", convos:[
  {n:1, level:1, title:"Asking the price", turns:[
    {sp:"you", en:"Brother, how much is this?", hi:"Bhaiya, ye kitne ka hai?", ta:"அண்ணா, இது எவ்ளோ?"},
    {sp:"other", en:"This is thirty rupees a kilo.", hi:"Ye tees rupaye kilo hai.", ta:"இது கிலோ முப்பது ரூபாய்."}],
   key:[{hi:"kitne ka hai?", en:"how much is it?"},{hi:"kilo", en:"kilogram"}]},
  {n:2, level:1, title:"Asking for 1 kg", turns:[
    {sp:"you", en:"Please give me one kilo.", hi:"Ek kilo de dijiye.", ta:"ஒரு கிலோ கொடுங்க."},
    {sp:"other", en:"Okay, one kilo.", hi:"Theek hai, ek kilo.", ta:"சரி, ஒரு கிலோ."}],
   key:[{hi:"de dijiye", en:"please give"},{hi:"ek kilo", en:"one kilo"}]},
  {n:3, level:2, title:"Asking for a smaller quantity", turns:[
    {sp:"you", en:"I only need half a kilo.", hi:"Sirf aadha kilo chahiye.", ta:"வெறும் அரை கிலோ போதும்."},
    {sp:"other", en:"Half a kilo? Okay.", hi:"Aadha kilo? Theek hai.", ta:"அரை கிலோவா? சரி."}],
   key:[{hi:"aadha kilo", en:"half a kilo"},{hi:"chahiye", en:"need / want"}]},
  {n:4, level:2, title:"Asking for fresh vegetables", turns:[
    {sp:"you", en:"Do you have fresh vegetables?", hi:"Taazi sabzi hai kya?", ta:"புதுசா காய்கறி இருக்கா?"},
    {sp:"other", en:"Yes, it came in just today.", hi:"Haan, aaj hi aayi hai.", ta:"ஆமா, இன்னிக்குதான் வந்துச்சு."}],
   key:[{hi:"taazi", en:"fresh"},{hi:"aaj hi", en:"just today"}]},
  {n:5, level:3, title:"Negotiating the price", turns:[
    {sp:"you", en:"Brother, please reduce it a bit.", hi:"Bhaiya, thoda kam kijiye.", ta:"அண்ணா, கொஞ்சம் குறைங்க."},
    {sp:"other", en:"No sir, can't go lower than this.", hi:"Nahi saab, isse kam nahi hoga.", ta:"இல்ல சார், இதுக்கு குறையாது."},
    {sp:"you", en:"Okay, I'll take two kilos — reduce it a little.", hi:"Achha, do kilo le loonga, thoda kam kar dijiye.", ta:"சரி, ரெண்டு கிலோ வாங்குறேன், கொஞ்சம் குறையுங்க."},
    {sp:"other", en:"Fine, I'll reduce it for you.", hi:"Theek hai, aapke liye kam kar deta hoon.", ta:"சரி, உங்களுக்காக குறைச்சு தர்றேன்."}],
   key:[{hi:"kam kijiye", en:"please reduce"},{hi:"isse kam", en:"lower than this"}]},
  {n:6, level:3, title:"Asking what is good today", turns:[
    {sp:"you", en:"What's good today?", hi:"Aaj kya achha hai?", ta:"இன்னிக்கு எது நல்லா இருக்கு?"},
    {sp:"other", en:"Tomatoes and brinjal are very good.", hi:"Tamatar aur baingan bahut achhe hain.", ta:"தக்காளியும் கத்தரிக்காயும் ரொம்ப நல்லா இருக்கு."}],
   key:[{hi:"achha hai", en:"is good"},{hi:"bahut achhe hain", en:"are very good"}]},
  {n:7, level:2, title:"Asking for coriander / chilli", turns:[
    {sp:"you", en:"Please also give some coriander and chilli.", hi:"Thoda dhaniya aur mirchi bhi de dijiye.", ta:"கொஞ்சம் கொத்தமல்லியும் மிளகாயும் கொடுங்க."},
    {sp:"other", en:"Here — free of charge.", hi:"Ye lijiye, muft mein.", ta:"இதோ, இலவசமா."}],
   key:[{hi:"dhaniya", en:"coriander"},{hi:"muft mein", en:"for free"}]},
  {n:8, level:3, title:"Weighing and checking quantity", turns:[
    {sp:"you", en:"Please weigh it and show me.", hi:"Zara tol ke dikhaiye.", ta:"கொஞ்சம் நிறுத்து காட்டுங்க."},
    {sp:"other", en:"Look, it's a full kilo.", hi:"Dekho, poora ek kilo hai.", ta:"பாருங்க, முழுசா ஒரு கிலோ இருக்கு."}],
   key:[{hi:"tol ke dikhaiye", en:"weigh and show"},{hi:"poora", en:"full / complete"}]},
  {n:9, level:4, title:"Paying by cash / UPI", turns:[
    {sp:"you", en:"Can I pay by UPI?", hi:"UPI se pay kar sakta hoon?", ta:"UPI ல pay பண்ணலாமா?"},
    {sp:"other", en:"Yes, here's the QR code.", hi:"Haan, ye raha QR code.", ta:"ஆமா, இதோ QR code."},
    {sp:"you", en:"Done — please check.", hi:"Ho gaya, dekh lijiye.", ta:"ஆயிடுச்சு, பாருங்க."}],
   key:[{hi:"pay kar sakta hoon", en:"can I pay"},{hi:"ho gaya", en:"it's done"}]},
  {n:10, level:5, title:"Asking for a carry bag", turns:[
    {sp:"you", en:"Can I get a bag?", hi:"Ek thaila mil sakta hai?", ta:"ஒரு பை கிடைக்குமா?"},
    {sp:"other", en:"No bags left — did you bring your own?", hi:"Thaila nahi hai, apna bag laaye the kya?", ta:"பை இல்ல, உங்க பை கொண்டு வந்தீங்களா?"},
    {sp:"you", en:"No, it's fine — I'll carry it in hand.", hi:"Nahi, koi baat nahi, haath mein le loonga.", ta:"இல்ல, பரவாயில்ல, கையில வெச்சுக்குறேன்."}],
   key:[{hi:"thaila", en:"bag"},{hi:"koi baat nahi", en:"no problem"}]}
]},

{id:"ls2", icon:"🚌", title:"Bus Travel", otherRole:"Conductor", convos:[
  {n:1, level:1, title:"Asking where the bus goes", turns:[
    {sp:"you", en:"Brother, where does this bus go?", hi:"Bhaiya, ye bus kahan jaati hai?", ta:"அண்ணா, இந்த பஸ் எங்க போகுது?"},
    {sp:"other", en:"This bus goes up to the station.", hi:"Ye bus station tak jaati hai.", ta:"இந்த பஸ் ஸ்டேஷன் வரைக்கும் போகுது."}],
   key:[{hi:"kahan jaati hai?", en:"where does it go?"}]},
  {n:2, level:1, title:"Asking the fare", turns:[
    {sp:"you", en:"How much is the ticket?", hi:"Ticket kitne ka hai?", ta:"டிக்கெட் எவ்ளோ?"},
    {sp:"other", en:"Ten rupees.", hi:"Das rupaye.", ta:"பத்து ரூபாய்."}],
   key:[{hi:"das rupaye", en:"ten rupees"}]},
  {n:3, level:2, title:"Asking whether this bus stops somewhere", turns:[
    {sp:"you", en:"Will this bus stop at Anna Nagar?", hi:"Ye bus Anna Nagar rukegi?", ta:"இந்த பஸ் அண்ணா நகர் நிக்குமா?"},
    {sp:"other", en:"Yes, it'll stop there.", hi:"Haan, wahan rukegi.", ta:"ஆமா, அங்க நிக்கும்."}],
   key:[{hi:"rukegi", en:"will stop"}]},
  {n:4, level:2, title:"Asking the conductor", turns:[
    {sp:"you", en:"Conductor sir, what's the next stop?", hi:"Conductor sahib, agla stop kaunsa hai?", ta:"கண்டக்டர் சார், அடுத்த ஸ்டாப் எது?"},
    {sp:"other", en:"The next stop is the market.", hi:"Agla stop market hai.", ta:"அடுத்த ஸ்டாப் மார்க்கெட்."}],
   key:[{hi:"agla stop", en:"next stop"}]},
  {n:5, level:3, title:"Asking for a ticket", turns:[
    {sp:"you", en:"One ticket for the station, please.", hi:"Ek ticket station ke liye dijiye.", ta:"ஸ்டேஷனுக்கு ஒரு டிக்கெட் கொடுங்க."},
    {sp:"other", en:"Here — ten rupees.", hi:"Ye lijiye, das rupaye.", ta:"இதோ, பத்து ரூபாய்."}],
   key:[{hi:"ke liye", en:"for"}]},
  {n:6, level:3, title:"Asking someone to move", turns:[
    {sp:"you", en:"Please move aside a little.", hi:"Zara side ho jaiye, please.", ta:"கொஞ்சம் ஒதுங்குங்க, ப்ளீஸ்."},
    {sp:"other", en:"Sure, come in.", hi:"Haan haan, aa jaiye.", ta:"சரி சரி, வாங்க."}],
   key:[{hi:"side ho jaiye", en:"please move aside"}]},
  {n:7, level:3, title:"Asking where to get down", turns:[
    {sp:"you", en:"Where should I get down?", hi:"Mujhe kahan utarna chahiye?", ta:"நான் எங்க இறங்கணும்?"},
    {sp:"other", en:"Get down at the next stop.", hi:"Agle stop pe utar jaiye.", ta:"அடுத்த ஸ்டாப்ல இறங்குங்க."}],
   key:[{hi:"utarna", en:"to get down"}]},
  {n:8, level:4, title:"Telling someone you're getting down", turns:[
    {sp:"you", en:"Brother, I'm getting down here.", hi:"Bhaiya, main yahan utar raha hoon.", ta:"அண்ணா, நான் இங்க இறங்குறேன்."},
    {sp:"other", en:"Okay, get down quickly.", hi:"Theek hai, jaldi utro.", ta:"சரி, சீக்கிரம் இறங்குங்க."}],
   key:[{hi:"utar raha hoon", en:"am getting down"}]},
  {n:9, level:4, title:"Asking about the next bus", turns:[
    {sp:"you", en:"When will the next bus come?", hi:"Agli bus kab aayegi?", ta:"அடுத்த பஸ் எப்போ வரும்?"},
    {sp:"other", en:"It'll come in ten minutes.", hi:"Das minute mein aayegi.", ta:"பத்து நிமிஷத்துல வரும்."}],
   key:[{hi:"kab aayegi?", en:"when will it come?"}]},
  {n:10, level:5, title:"Missing your stop", turns:[
    {sp:"you", en:"Brother, my stop went past!", hi:"Bhaiya, mera stop nikal gaya!", ta:"அண்ணா, என் ஸ்டாப் தாண்டிடுச்சு!"},
    {sp:"other", en:"No problem, get down at the next stop and come back.", hi:"Koi baat nahi, agle stop pe utar ke wapas aa jaiye.", ta:"பரவாயில்ல, அடுத்த ஸ்டாப்ல இறங்கி திரும்பி வாங்க."}],
   key:[{hi:"nikal gaya", en:"has passed / gone"},{hi:"wapas aa jaiye", en:"come back"}]}
]},

{id:"ls3", icon:"🚕", title:"Auto / Cab", otherRole:"Driver", convos:[
  {n:1, level:1, title:"Asking if they will go somewhere", turns:[
    {sp:"you", en:"Brother, will you go to the station?", hi:"Bhaiya, station jaoge?", ta:"அண்ணா, ஸ்டேஷன் போவீங்களா?"},
    {sp:"other", en:"Yes, I'll go.", hi:"Haan, chalega.", ta:"ஆமா, வரேன்."}],
   key:[{hi:"jaoge?", en:"will you go?"}]},
  {n:2, level:1, title:"Asking the fare", turns:[
    {sp:"you", en:"How much will it cost?", hi:"Kitna lagega?", ta:"எவ்ளோ ஆகும்?"},
    {sp:"other", en:"About one hundred rupees.", hi:"Karib sau rupaye.", ta:"கிட்டத்தட்ட நூறு ரூபாய்."}],
   key:[{hi:"kitna lagega?", en:"how much will it cost?"}]},
  {n:3, level:2, title:"Negotiating fare", turns:[
    {sp:"you", en:"That's too much — do eighty.", hi:"Bahut zyada hai, assi rupaye kar do.", ta:"ரொம்ப ஜாஸ்தி, எண்பது ரூபாய் ஆக்குங்க."},
    {sp:"other", en:"Okay, get in.", hi:"Theek hai, baith jaiye.", ta:"சரி, உட்காருங்க."}],
   key:[{hi:"zyada", en:"too much / more"}]},
  {n:4, level:2, title:"Giving the destination", turns:[
    {sp:"you", en:"Please take me to Anna Nagar.", hi:"Mujhe Anna Nagar le chaliye.", ta:"என்னை அண்ணா நகருக்கு அழைச்சுட்டு போங்க."},
    {sp:"other", en:"Okay, sit.", hi:"Theek hai, baithiye.", ta:"சரி, உட்காருங்க."}],
   key:[{hi:"le chaliye", en:"please take me"}]},
  {n:5, level:3, title:"Asking to use the meter", turns:[
    {sp:"you", en:"Please put the meter on.", hi:"Meter se chaliye.", ta:"மீட்டர் போடுங்க."},
    {sp:"other", en:"Okay, but there's a night charge extra.", hi:"Theek hai, par raat ka charge extra lagega.", ta:"சரி, ஆனா ராத்திரி சார்ஜ் extra ஆகும்."}],
   key:[{hi:"meter se chaliye", en:"please use the meter"}]},
  {n:6, level:3, title:"Asking them to stop", turns:[
    {sp:"you", en:"Brother, please stop here.", hi:"Bhaiya, yahin roki jiye.", ta:"அண்ணா, இங்கயே நிறுத்துங்க."},
    {sp:"other", en:"Okay, stopping.", hi:"Theek hai, rok raha hoon.", ta:"சரி, நிறுத்துறேன்."}],
   key:[{hi:"roki jiye", en:"please stop"}]},
  {n:7, level:3, title:"Asking them to drive slowly", turns:[
    {sp:"you", en:"Please drive a little slowly.", hi:"Thoda dheere chalaiye.", ta:"கொஞ்சம் மெதுவா ஓட்டுங்க."},
    {sp:"other", en:"Okay, no problem.", hi:"Theek hai, koi baat nahi.", ta:"சரி, பரவாயில்ல."}],
   key:[{hi:"dheere", en:"slowly"}]},
  {n:8, level:4, title:"Traffic conversation", turns:[
    {sp:"you", en:"There's a lot of traffic today.", hi:"Aaj bahut traffic hai.", ta:"இன்னிக்கு ரொம்ப traffic."},
    {sp:"other", en:"Yes sir, it'll take some more time.", hi:"Haan saab, thoda aur time lagega.", ta:"ஆமா சார், இன்னும் கொஞ்சம் time ஆகும்."}],
   key:[{hi:"time lagega", en:"it will take time"}]},
  {n:9, level:4, title:"Paying the driver", turns:[
    {sp:"you", en:"Here, keep the change.", hi:"Ye lijiye, baaki rakh lijiye.", ta:"இதோ, மீதி வெச்சுக்கோங்க."},
    {sp:"other", en:"Thank you sir.", hi:"Dhanyawaad saab.", ta:"நன்றி சார்."}],
   key:[{hi:"baaki rakh lijiye", en:"keep the change"}]},
  {n:10, level:5, title:"Finding the correct location", turns:[
    {sp:"you", en:"This isn't the right place.", hi:"Ye sahi jagah nahi hai.", ta:"இது சரியான இடம் இல்ல."},
    {sp:"other", en:"Then where exactly do you want to go?", hi:"Toh bilkul kahan jaana hai?", ta:"அப்போ சரியா எங்க போகணும்?"},
    {sp:"you", en:"A little further, near the big temple.", hi:"Thoda aage, bade mandir ke paas.", ta:"கொஞ்சம் தூரம், பெரிய கோவில் அருகில்."}],
   key:[{hi:"bilkul kahan", en:"exactly where"},{hi:"ke paas", en:"near"}]}
]},

{id:"ls4", icon:"🛒", title:"Supermarket / Grocery Shop", otherRole:"Staff", convos:[
  {n:1, level:1, title:"Asking where an item is", turns:[
    {sp:"you", en:"Where is the rice kept?", hi:"Chawal kahan rakha hai?", ta:"அரிசி எங்க வெச்சிருக்காங்க?"},
    {sp:"other", en:"It's in aisle number three.", hi:"Row number teen mein hai.", ta:"Row நம்பர் மூணுல இருக்கு."}],
   key:[{hi:"kahan rakha hai", en:"where is it kept"}]},
  {n:2, level:1, title:"Asking the price", turns:[
    {sp:"you", en:"How much does this cost?", hi:"Ye kitne ka hai?", ta:"இது எவ்ளோ?"},
    {sp:"other", en:"This is sixty rupees.", hi:"Ye saath rupaye hai.", ta:"இது அறுபது ரூபாய்."}],
   key:[{hi:"kitne ka hai", en:"how much is it"}]},
  {n:3, level:2, title:"Comparing products", turns:[
    {sp:"you", en:"Which of these two is better?", hi:"In dono mein kaunsa achha hai?", ta:"இந்த ரெண்டுல எது நல்லது?"},
    {sp:"other", en:"This one is better quality.", hi:"Ye wala quality mein achha hai.", ta:"இது quality-ல நல்லது."}],
   key:[{hi:"kaunsa achha hai", en:"which is better"}]},
  {n:4, level:2, title:"Asking for another brand", turns:[
    {sp:"you", en:"Do you have another brand?", hi:"Koi aur company ka hai kya?", ta:"வேற company-து இருக்கா?"},
    {sp:"other", en:"Yes, this brand is also available.", hi:"Haan, ye brand bhi hai.", ta:"ஆமா, இந்த brand-உம் இருக்கு."}],
   key:[{hi:"koi aur", en:"any other"}]},
  {n:5, level:3, title:"Asking about discounts", turns:[
    {sp:"you", en:"Is there any discount on this?", hi:"Isme koi discount hai?", ta:"இதுல discount ஏதாவது இருக்கா?"},
    {sp:"other", en:"Yes, ten percent off today.", hi:"Haan, aaj das percent chhoot hai.", ta:"ஆமா, இன்னிக்கு பத்து percent தள்ளுபடி."}],
   key:[{hi:"chhoot", en:"discount"}]},
  {n:6, level:3, title:"Asking for a particular size", turns:[
    {sp:"you", en:"Do you have the one-liter pack?", hi:"Ek litre wala packet hai?", ta:"ஒரு லிட்டர் packet இருக்கா?"},
    {sp:"other", en:"No, only half-liter is left.", hi:"Nahi, sirf aadha litre bacha hai.", ta:"இல்ல, அரை லிட்டர் மட்டும் இருக்கு."}],
   key:[{hi:"litre wala", en:"the ...-litre one"}]},
  {n:7, level:3, title:"Asking whether something is available", turns:[
    {sp:"you", en:"Is fresh bread available?", hi:"Taaza bread available hai?", ta:"Fresh bread இருக்கா?"},
    {sp:"other", en:"It'll come in the evening.", hi:"Shaam ko aayega.", ta:"மாலைல வரும்."}],
   key:[{hi:"available hai?", en:"is it available?"}]},
  {n:8, level:4, title:"Returning an item", turns:[
    {sp:"you", en:"I want to return this — it's damaged.", hi:"Ye return karna hai, kharab hai.", ta:"இதை return பண்ணணும், கெட்டு போச்சு."},
    {sp:"other", en:"Okay, show me the bill.", hi:"Theek hai, bill dikhaiye.", ta:"சரி, bill காட்டுங்க."}],
   key:[{hi:"kharab hai", en:"is damaged / spoiled"}]},
  {n:9, level:4, title:"Billing", turns:[
    {sp:"you", en:"Please add this to the bill too.", hi:"Isse bhi bill mein daal dijiye.", ta:"இதையும் bill-ல சேருங்க."},
    {sp:"other", en:"Total is four hundred and fifty.", hi:"Total chaar sau pachaas hai.", ta:"மொத்தம் நானூற்று ஐம்பது."}],
   key:[{hi:"total kitna", en:"how much is the total"}]},
  {n:10, level:5, title:"Payment problem", turns:[
    {sp:"you", en:"My card isn't working.", hi:"Mera card kaam nahi kar raha.", ta:"என் card வேலை செய்யலை."},
    {sp:"other", en:"No problem, do you have cash?", hi:"Koi baat nahi, cash hai kya?", ta:"பரவாயில்ல, cash இருக்கா?"},
    {sp:"you", en:"Yes, I'll pay cash.", hi:"Haan, cash mein de deta hoon.", ta:"ஆமா, cash-ல தர்றேன்."}],
   key:[{hi:"kaam nahi kar raha", en:"isn't working"}]}
]},

{id:"ls5", icon:"☕", title:"Tea Shop / Restaurant", otherRole:"Staff", convos:[
  {n:1, level:1, title:"Ordering tea", turns:[
    {sp:"you", en:"One tea, please.", hi:"Ek chai dijiye.", ta:"ஒரு tea குடுங்க."},
    {sp:"other", en:"Okay, coming up.", hi:"Theek hai, aa raha hai.", ta:"சரி, வர்றது."}],
   key:[{hi:"ek chai", en:"one tea"}]},
  {n:2, level:1, title:"Ordering breakfast", turns:[
    {sp:"you", en:"One plate idli, please.", hi:"Ek plate idli dijiye.", ta:"ஒரு plate idli குடுங்க."},
    {sp:"other", en:"Only idli, or with chutney too?", hi:"Sirf idli, ya chutney ke saath bhi?", ta:"idli மட்டுமா, chutney-யோட வேணுமா?"}],
   key:[{hi:"ke saath", en:"along with"}]},
  {n:3, level:2, title:"Asking what's available", turns:[
    {sp:"you", en:"What's there today?", hi:"Aaj kya kya hai?", ta:"இன்னிக்கு என்ன இருக்கு?"},
    {sp:"other", en:"Idli, dosa, and pongal are there.", hi:"Idli, dosa aur pongal hai.", ta:"idli, dosa, pongal இருக்கு."}],
   key:[{hi:"kya kya hai", en:"what all is there"}]},
  {n:4, level:2, title:"Asking for less spicy food", turns:[
    {sp:"you", en:"Please make it less spicy.", hi:"Kam mirchi wala banaiye.", ta:"கொஞ்சம் காரம் குறைவா பண்ணுங்க."},
    {sp:"other", en:"Okay, I'll make it mild.", hi:"Theek hai, halka banata hoon.", ta:"சரி, லேசா பண்றேன்."}],
   key:[{hi:"kam mirchi", en:"less spicy"}]},
  {n:5, level:2, title:"Asking for water", turns:[
    {sp:"you", en:"Please give some water.", hi:"Thoda paani dijiye.", ta:"கொஞ்சம் தண்ணி கொடுங்க."},
    {sp:"other", en:"Here you go.", hi:"Ye lijiye.", ta:"இதோ."}],
   key:[{hi:"paani", en:"water"}]},
  {n:6, level:3, title:"Asking for another item", turns:[
    {sp:"you", en:"One more vada, please.", hi:"Ek aur vada dijiye.", ta:"இன்னொரு vada குடுங்க."},
    {sp:"other", en:"Okay, coming right away.", hi:"Theek hai, abhi laata hoon.", ta:"சரி, இப்போவே கொண்டு வர்றேன்."}],
   key:[{hi:"ek aur", en:"one more"}]},
  {n:7, level:3, title:"Asking the price", turns:[
    {sp:"you", en:"How much for all this?", hi:"Ye sab kitne ka hua?", ta:"இதெல்லாம் எவ்ளோ ஆச்சு?"},
    {sp:"other", en:"It's one hundred and twenty in total.", hi:"Total ek sau bees hua.", ta:"மொத்தம் நூத்தி இருபது ஆச்சு."}],
   key:[{hi:"kitne ka hua", en:"how much did it come to"}]},
  {n:8, level:3, title:"Asking for the bill", turns:[
    {sp:"you", en:"Please bring the bill.", hi:"Bill laiye.", ta:"Bill கொண்டு வாங்க."},
    {sp:"other", en:"Here's the bill sir.", hi:"Ye lijiye bill saab.", ta:"இதோ bill சார்."}],
   key:[{hi:"bill laiye", en:"please bring the bill"}]},
  {n:9, level:4, title:"Complaining politely", turns:[
    {sp:"you", en:"The food is a bit cold, please heat it up.", hi:"Khaana thoda thanda hai, garam kar dijiye.", ta:"சாப்பாடு கொஞ்சம் ஆறிடுச்சு, சூடு பண்ணுங்க."},
    {sp:"other", en:"Sorry sir, I'll get it heated right away.", hi:"Sorry saab, abhi garam karwaata hoon.", ta:"Sorry சார், இப்போவே சூடு பண்ணித் தர்றேன்."}],
   key:[{hi:"thanda hai", en:"is cold"},{hi:"garam kar dijiye", en:"please heat it up"}]},
  {n:10, level:5, title:"Paying", turns:[
    {sp:"you", en:"Can I pay by phone?", hi:"Phone se pay kar doon?", ta:"Phone-ல pay பண்ணலாமா?"},
    {sp:"other", en:"Yes sir, scan this code.", hi:"Haan saab, ye code scan kijiye.", ta:"ஆமா சார், இந்த code scan பண்ணுங்க."},
    {sp:"you", en:"Done, thank you.", hi:"Ho gaya, dhanyawaad.", ta:"ஆயிடுச்சு, நன்றி."}],
   key:[{hi:"scan kijiye", en:"please scan"}]}
]},

{id:"ls6", icon:"🏠", title:"At Home", otherRole:"Family", convos:[
  {n:1, level:1, title:"Asking someone to come inside", turns:[
    {sp:"you", en:"Come in, come in.", hi:"Andar aa jaiye, aa jaiye.", ta:"உள்ள வாங்க, வாங்க."},
    {sp:"other", en:"Thank you.", hi:"Dhanyawaad.", ta:"நன்றி."}],
   key:[{hi:"andar aa jaiye", en:"please come inside"}]},
  {n:2, level:1, title:"Asking someone to sit", turns:[
    {sp:"you", en:"Please sit down.", hi:"Baith jaiye.", ta:"உட்காருங்க."},
    {sp:"other", en:"Okay, thank you.", hi:"Theek hai, shukriya.", ta:"சரி, நன்றி."}],
   key:[{hi:"baith jaiye", en:"please sit"}]},
  {n:3, level:2, title:"Asking someone to eat", turns:[
    {sp:"you", en:"Come, eat something.", hi:"Aaiye, kuch khaiye.", ta:"வாங்க, ஏதாவது சாப்பிடுங்க."},
    {sp:"other", en:"No thanks, I've already eaten.", hi:"Nahi shukriya, khaana kha liya hai.", ta:"வேண்டாம், சாப்பிட்டாச்சு."}],
   key:[{hi:"khaiye", en:"please eat"}]},
  {n:4, level:2, title:"Asking someone to bring something", turns:[
    {sp:"you", en:"Please bring the water bottle.", hi:"Paani ki bottle le aaiye.", ta:"தண்ணி bottle கொண்டு வாங்க."},
    {sp:"other", en:"Okay, one minute.", hi:"Theek hai, ek minute.", ta:"சரி, ஒரு நிமிஷம்."}],
   key:[{hi:"le aaiye", en:"please bring"}]},
  {n:5, level:2, title:"Asking where something is", turns:[
    {sp:"you", en:"Where are the keys?", hi:"Chaabi kahan hai?", ta:"சாவி எங்க இருக்கு?"},
    {sp:"other", en:"It's on the table.", hi:"Table par hai.", ta:"table மேல இருக்கு."}],
   key:[{hi:"kahan hai", en:"where is it"}]},
  {n:6, level:3, title:"Asking someone to wait", turns:[
    {sp:"you", en:"Please wait a little.", hi:"Thoda ruk jaiye.", ta:"கொஞ்சம் நில்லுங்க."},
    {sp:"other", en:"Okay, I'll wait.", hi:"Theek hai, rukta hoon.", ta:"சரி, நிக்குறேன்."}],
   key:[{hi:"ruk jaiye", en:"please wait"}]},
  {n:7, level:3, title:"Asking someone to switch something on/off", turns:[
    {sp:"you", en:"Please switch off the fan.", hi:"Pankha band kar dijiye.", ta:"Fan-ஐ அணைச்சிடுங்க."},
    {sp:"other", en:"Okay, done.", hi:"Theek hai, kar diya.", ta:"சரி, ஆயிடுச்சு."}],
   key:[{hi:"band kar dijiye", en:"please switch off"}]},
  {n:8, level:3, title:"Asking someone to clean", turns:[
    {sp:"you", en:"Please clean this room a little.", hi:"Ye kamra thoda saaf kar dijiye.", ta:"இந்த room-ஐ கொஞ்சம் சுத்தம் பண்ணுங்க."},
    {sp:"other", en:"Okay, I'll clean it now.", hi:"Theek hai, abhi karti hoon.", ta:"சரி, இப்போ பண்றேன்."}],
   key:[{hi:"saaf kar dijiye", en:"please clean"}]},
  {n:9, level:4, title:"Asking someone to keep something somewhere", turns:[
    {sp:"you", en:"Please keep this in the cupboard.", hi:"Ise almari mein rakh dijiye.", ta:"இதை cupboard-ல வெச்சிடுங்க."},
    {sp:"other", en:"Okay, I've kept it.", hi:"Theek hai, rakh diya.", ta:"சரி, வெச்சாச்சு."}],
   key:[{hi:"rakh dijiye", en:"please keep"}]},
  {n:10, level:5, title:"Asking someone to leave / go", turns:[
    {sp:"you", en:"It's getting late — you should go now.", hi:"Der ho rahi hai, ab aap chaliye.", ta:"நேரமாகுது, இப்போ கிளம்புங்க."},
    {sp:"other", en:"Okay, I'll leave now — see you.", hi:"Theek hai, ab chalta hoon, milte hain.", ta:"சரி, இப்போ கிளம்புறேன், பாக்கலாம்."}],
   key:[{hi:"der ho rahi hai", en:"it's getting late"},{hi:"chaliye", en:"please go / let's go"}]}
]},

{id:"ls7", icon:"👨‍👩‍👦", title:"Talking to Family", otherRole:"Family", convos:[
  {n:1, level:1, title:"Where are you going?", turns:[
    {sp:"you", en:"Where are you going?", hi:"Kahan ja rahe ho?", ta:"எங்க போறீங்க?"},
    {sp:"other", en:"I'm going to the market.", hi:"Market ja raha hoon.", ta:"Market போறேன்."}],
   key:[{hi:"kahan ja rahe ho", en:"where are you going"}]},
  {n:2, level:1, title:"When will you come?", turns:[
    {sp:"you", en:"When will you come back?", hi:"Kab wapas aaoge?", ta:"எப்போ திரும்பி வருவீங்க?"},
    {sp:"other", en:"I'll come back by evening.", hi:"Shaam tak aa jaunga.", ta:"மாலைக்குள்ள வந்துடுவேன்."}],
   key:[{hi:"kab aaoge", en:"when will you come"}]},
  {n:3, level:2, title:"Have you eaten?", turns:[
    {sp:"you", en:"Have you eaten?", hi:"Khaana kha liya?", ta:"சாப்பிட்டாச்சா?"},
    {sp:"other", en:"Not yet, I'll eat now.", hi:"Nahi, abhi khaata hoon.", ta:"இல்ல, இப்போ சாப்பிடுறேன்."}],
   key:[{hi:"kha liya?", en:"have (you) eaten?"}]},
  {n:4, level:2, title:"What are you doing?", turns:[
    {sp:"you", en:"What are you doing?", hi:"Kya kar rahe ho?", ta:"என்ன பண்றீங்க?"},
    {sp:"other", en:"I'm just resting.", hi:"Bas aaram kar raha hoon.", ta:"வெறுமனே ஓய்வெடுக்குறேன்."}],
   key:[{hi:"kya kar rahe ho", en:"what are you doing"}]},
  {n:5, level:2, title:"Did you sleep?", turns:[
    {sp:"you", en:"Did you sleep well?", hi:"Achhe se so gaye?", ta:"நல்லா தூங்கினீங்களா?"},
    {sp:"other", en:"Yes, I slept well.", hi:"Haan, achhi neend aayi.", ta:"ஆமா, நல்லா தூக்கம் வந்துச்சு."}],
   key:[{hi:"so gaye?", en:"did (you) sleep?"}]},
  {n:6, level:3, title:"What happened?", turns:[
    {sp:"you", en:"What happened? You look worried.", hi:"Kya hua? Pareshan lag rahe ho.", ta:"என்ன ஆச்சு? கவலையா இருக்கீங்க."},
    {sp:"other", en:"Nothing much, just a bit tired.", hi:"Kuch nahi, bas thoda thaka hua hoon.", ta:"ஒண்ணும் இல்ல, கொஞ்சம் களைப்பா இருக்கு."}],
   key:[{hi:"kya hua?", en:"what happened?"}]},
  {n:7, level:3, title:"Where is the child?", turns:[
    {sp:"you", en:"Where is the child?", hi:"Bachcha kahan hai?", ta:"பையன் எங்க இருக்கான்?"},
    {sp:"other", en:"He's playing outside.", hi:"Bahar khel raha hai.", ta:"வெளிய விளையாடிட்டிருக்கான்."}],
   key:[{hi:"bachcha", en:"child"}]},
  {n:8, level:4, title:"What should we buy?", turns:[
    {sp:"you", en:"What should we buy for tomorrow?", hi:"Kal ke liye kya lena hai?", ta:"நாளைக்கு என்ன வாங்கணும்?"},
    {sp:"other", en:"We need milk and bread.", hi:"Doodh aur bread chahiye.", ta:"பால் இன்னும் bread வேணும்."}],
   key:[{hi:"kya lena hai", en:"what do we need to get"}]},
  {n:9, level:4, title:"What are we doing tomorrow?", turns:[
    {sp:"you", en:"What are we doing tomorrow?", hi:"Kal hum kya karenge?", ta:"நாளைக்கு நாம என்ன பண்றோம்?"},
    {sp:"other", en:"Let's go to grandmother's house.", hi:"Dadi ke ghar chalte hain.", ta:"பாட்டி வீட்டுக்கு போலாம்."}],
   key:[{hi:"kal karenge", en:"will do tomorrow"}]},
  {n:10, level:5, title:"Making plans", turns:[
    {sp:"you", en:"Let's plan a trip this weekend.", hi:"Is weekend ek trip plan karte hain.", ta:"இந்த weekend ஒரு trip plan பண்ணலாம்."},
    {sp:"other", en:"Good idea — where should we go?", hi:"Achha idea hai, kahan chalein?", ta:"நல்ல idea, எங்க போலாம்?"},
    {sp:"you", en:"Let's decide together in the evening.", hi:"Shaam ko milkar tay karte hain.", ta:"மாலைல சேர்ந்து முடிவு பண்ணலாம்."}],
   key:[{hi:"plan karte hain", en:"let's plan"},{hi:"tay karte hain", en:"let's decide"}]}
]},

{id:"ls8", icon:"🏪", title:"Pharmacy / Medical Shop", otherRole:"Pharmacist", convos:[
  {n:1, level:1, title:"Asking for a medicine", turns:[
    {sp:"you", en:"Do you have paracetamol?", hi:"Paracetamol hai kya?", ta:"Paracetamol இருக்கா?"},
    {sp:"other", en:"Yes, it's there.", hi:"Haan, hai.", ta:"ஆமா, இருக்கு."}],
   key:[{hi:"hai kya?", en:"is it there / do you have?"}]},
  {n:2, level:1, title:"Saying the symptoms", turns:[
    {sp:"you", en:"I have a fever and headache.", hi:"Mujhe bukhaar aur sar dard hai.", ta:"எனக்கு காய்ச்சலும் தலைவலியும் இருக்கு."},
    {sp:"other", en:"Take this tablet.", hi:"Ye tablet le lijiye.", ta:"இந்த tablet வாங்குங்க."}],
   key:[{hi:"bukhaar", en:"fever"},{hi:"sar dard", en:"headache"}]},
  {n:3, level:2, title:"Asking whether medicine is available", turns:[
    {sp:"you", en:"Is cough syrup available?", hi:"Khaansi ki dawai hai?", ta:"இருமலுக்கு மருந்து இருக்கா?"},
    {sp:"other", en:"Yes, it's available.", hi:"Haan, available hai.", ta:"ஆமா, இருக்கு."}],
   key:[{hi:"khaansi ki dawai", en:"cough medicine"}]},
  {n:4, level:2, title:"Asking the price", turns:[
    {sp:"you", en:"How much for this strip?", hi:"Ye strip kitne ki hai?", ta:"இந்த strip எவ்ளோ?"},
    {sp:"other", en:"This is forty rupees.", hi:"Ye chaalis rupaye ki hai.", ta:"இது நாற்பது ரூபாய்."}],
   key:[{hi:"strip", en:"strip (of tablets)"}]},
  {n:5, level:3, title:"Asking how to take it", turns:[
    {sp:"you", en:"How should I take this medicine?", hi:"Ye dawai kaise leni hai?", ta:"இந்த மருந்து எப்படி எடுக்கணும்?"},
    {sp:"other", en:"Take it after food, twice a day.", hi:"Khaane ke baad, din mein do baar lijiye.", ta:"சாப்பிட்ட பிறகு, நாளைக்கு ரெண்டு தடவை எடுங்க."}],
   key:[{hi:"khaane ke baad", en:"after food"}]},
  {n:6, level:3, title:"Asking about dosage timing", turns:[
    {sp:"you", en:"Should I take it in the morning or at night?", hi:"Subah lein ya raat ko?", ta:"காலைலயா ராத்திரியா எடுக்கணும்?"},
    {sp:"other", en:"Take it at night, before sleeping.", hi:"Raat ko, sone se pehle lijiye.", ta:"ராத்திரி, தூங்குறதுக்கு முன்னாடி எடுங்க."}],
   key:[{hi:"sone se pehle", en:"before sleeping"}]},
  {n:7, level:4, title:"Asking whether a prescription is required", turns:[
    {sp:"you", en:"Do I need a prescription for this?", hi:"Isके liye prescription chahiye?", ta:"இதுக்கு prescription வேணுமா?"},
    {sp:"other", en:"Yes, this needs a doctor's prescription.", hi:"Haan, isके liye doctor ka prescription chahiye.", ta:"ஆமா, இதுக்கு doctor prescription வேணும்."}],
   key:[{hi:"prescription chahiye", en:"need a prescription"}]},
  {n:8, level:3, title:"Asking for another brand", turns:[
    {sp:"you", en:"Is there a cheaper brand?", hi:"Isse sasta koi brand hai?", ta:"இதைவிட மலிவான brand இருக்கா?"},
    {sp:"other", en:"Yes, this generic one is cheaper.", hi:"Haan, ye generic wala sasta hai.", ta:"ஆமா, இந்த generic-து மலிவு."}],
   key:[{hi:"sasta", en:"cheaper"}]},
  {n:9, level:2, title:"Asking for a smaller quantity", turns:[
    {sp:"you", en:"Give me just a strip of five tablets.", hi:"Sirf paanch tablet ki strip de dijiye.", ta:"வெறும் ஐந்து tablet strip குடுங்க."},
    {sp:"other", en:"Okay, here you go.", hi:"Theek hai, ye lijiye.", ta:"சரி, இதோ."}],
   key:[{hi:"sirf", en:"only / just"}]},
  {n:10, level:5, title:"Paying", turns:[
    {sp:"you", en:"How much in total, and can I pay by card?", hi:"Total kitna hua, aur card se ho jaayega?", ta:"மொத்தம் எவ்ளோ, card-ல ஆகுமா?"},
    {sp:"other", en:"One hundred and fifty — yes, card works.", hi:"Ek sau pachaas, haan card chalega.", ta:"நூத்தி ஐம்பது, ஆமா card ஆகும்."}],
   key:[{hi:"total kitna hua", en:"how much in total"}]}
]},

{id:"ls9", icon:"🏥", title:"Hospital — Patient Interaction", otherRole:"Patient", convos:[
  {n:1, level:1, title:"Calling the patient", turns:[
    {sp:"you", en:"Mr. Sharma, please come in.", hi:"Sharma ji, andar aa jaiye.", ta:"சர்மா அவர்களே, உள்ள வாங்க."},
    {sp:"other", en:"Yes doctor, coming.", hi:"Haan doctor saab, aa raha hoon.", ta:"ஆமா டாக்டர், வர்றேன்."}],
   key:[{hi:"andar aa jaiye", en:"please come in"}]},
  {n:2, level:1, title:"Asking them to sit", turns:[
    {sp:"you", en:"Please sit here.", hi:"Yahan baith jaiye.", ta:"இங்க உட்காருங்க."},
    {sp:"other", en:"Okay, thank you.", hi:"Theek hai, shukriya.", ta:"சரி, நன்றி."}],
   key:[{hi:"yahan baithiye", en:"please sit here"}]},
  {n:3, level:2, title:"Asking about symptoms", turns:[
    {sp:"you", en:"What problem are you having?", hi:"Aapko kya takleef hai?", ta:"உங்களுக்கு என்ன பிரச்சனை?"},
    {sp:"other", en:"I have stomach pain since yesterday.", hi:"Kal se pet mein dard hai.", ta:"நேத்திலிருந்து வயிற்றுவலி இருக்கு."}],
   key:[{hi:"takleef", en:"problem / trouble"},{hi:"pet dard", en:"stomach pain"}]},
  {n:4, level:2, title:"Asking about previous illness", turns:[
    {sp:"you", en:"Have you had this problem before?", hi:"Pehle bhi ye takleef hui thi?", ta:"முன்னாடியும் இந்த பிரச்சனை வந்ததா?"},
    {sp:"other", en:"Yes, two years back.", hi:"Haan, do saal pehle.", ta:"ஆமா, ரெண்டு வருஷம் முன்னாடி."}],
   key:[{hi:"pehle bhi", en:"before too"}]},
  {n:5, level:3, title:"Asking about medications", turns:[
    {sp:"you", en:"Are you taking any medicines currently?", hi:"Abhi koi dawai le rahe hain?", ta:"இப்போ ஏதாவது மருந்து எடுத்துக்கிட்டு இருக்கீங்களா?"},
    {sp:"other", en:"Yes, blood pressure tablets.", hi:"Haan, BP ki tablet.", ta:"ஆமா, BP tablet."}],
   key:[{hi:"dawai le rahe hain", en:"are taking medicine"}]},
  {n:6, level:3, title:"Asking about allergies", turns:[
    {sp:"you", en:"Do you have any allergy to any medicine?", hi:"Kisi dawai se allergy hai kya?", ta:"எந்த மருந்துக்காவது allergy இருக்கா?"},
    {sp:"other", en:"No, I don't have any allergy.", hi:"Nahi, koi allergy nahi hai.", ta:"இல்ல, allergy ஒண்ணும் இல்ல."}],
   key:[{hi:"allergy hai kya?", en:"is there an allergy?"}]},
  {n:7, level:4, title:"Giving instructions", turns:[
    {sp:"you", en:"Take this medicine twice a day and drink plenty of water.", hi:"Ye dawai din mein do baar lijiye aur zyada paani piyo.", ta:"இந்த மருந்தை நாளைக்கு ரெண்டு தடவை எடுங்க, தண்ணி அதிகமா குடிங்க."},
    {sp:"other", en:"Okay doctor, I'll do that.", hi:"Theek hai doctor, waisa hi karunga.", ta:"சரி டாக்டர், அப்படியே பண்றேன்."}],
   key:[{hi:"din mein do baar", en:"twice a day"}]},
  {n:8, level:4, title:"Reassuring the patient", turns:[
    {sp:"you", en:"Don't worry, this is normal — you'll get better soon.", hi:"Chinta mat kijiye, ye normal hai, jaldi theek ho jaayenge.", ta:"கவலைப்படாதீங்க, இது சாதாரணம், சீக்கிரம் சரியாகிடுவீங்க."},
    {sp:"other", en:"Thank you doctor, that's a relief.", hi:"Dhanyawaad doctor, ab thoda araam mila.", ta:"நன்றி டாக்டர், கொஞ்சம் நிம்மதியா இருக்கு."}],
   key:[{hi:"chinta mat kijiye", en:"don't worry"}]},
  {n:9, level:3, title:"Asking them to wait", turns:[
    {sp:"you", en:"Please wait outside — the report will come in ten minutes.", hi:"Bahar ruk jaiye, report das minute mein aayegi.", ta:"வெளியில நில்லுங்க, report பத்து நிமிஷத்துல வரும்."},
    {sp:"other", en:"Okay, I'll wait.", hi:"Theek hai, rukta hoon.", ta:"சரி, நிக்குறேன்."}],
   key:[{hi:"report aayegi", en:"the report will come"}]},
  {n:10, level:5, title:"Explaining what happens next", turns:[
    {sp:"you", en:"We'll admit you for one day and run a few tests.", hi:"Hum aapko ek din admit karenge aur kuch tests karenge.", ta:"நாங்க உங்களை ஒரு நாள் admit பண்ணி சில tests பண்ணுவோம்."},
    {sp:"other", en:"Okay doctor, is it something serious?", hi:"Theek hai doctor, kuch serious to nahi hai?", ta:"சரி டாக்டர், ஏதாவது serious ஆ?"},
    {sp:"you", en:"No, just a precaution — don't worry.", hi:"Nahi, bas ehtiyaat ke liye, chinta mat kijiye.", ta:"இல்ல, வெறும் ஜாக்கிரதைக்காக, கவலைப்படாதீங்க."}],
   key:[{hi:"ehtiyaat ke liye", en:"as a precaution"}]}
]},

{id:"ls10", icon:"🏨", title:"Hotel", otherRole:"Receptionist", convos:[
  {n:1, level:1, title:"Checking in", turns:[
    {sp:"you", en:"I have a booking under this name.", hi:"Is naam se booking hai.", ta:"இந்த பேருல booking இருக்கு."},
    {sp:"other", en:"Yes sir, one moment please.", hi:"Haan saab, ek minute.", ta:"ஆமா சார், ஒரு நிமிஷம்."}],
   key:[{hi:"booking hai", en:"have a booking"}]},
  {n:2, level:1, title:"Showing ID", turns:[
    {sp:"you", en:"Here's my ID card.", hi:"Ye mera ID card hai.", ta:"இதோ என் ID card."},
    {sp:"other", en:"Thank you, one minute.", hi:"Dhanyawaad, ek minute.", ta:"நன்றி, ஒரு நிமிஷம்."}],
   key:[{hi:"ID card", en:"ID card"}]},
  {n:3, level:2, title:"Asking about the room", turns:[
    {sp:"you", en:"Is the room on a high floor?", hi:"Room upar wale floor pe hai?", ta:"Room மேல floor-ல இருக்கா?"},
    {sp:"other", en:"Yes, it's on the fifth floor.", hi:"Haan, paanchvi manzil pe hai.", ta:"ஆமா, ஐந்தாவது floor-ல இருக்கு."}],
   key:[{hi:"manzil", en:"floor"}]},
  {n:4, level:2, title:"Asking about breakfast", turns:[
    {sp:"you", en:"What time is breakfast?", hi:"Breakfast kitne baje hai?", ta:"Breakfast எத்தனை மணிக்கு?"},
    {sp:"other", en:"From seven to ten in the morning.", hi:"Subah saat se das baje tak.", ta:"காலை ஏழு முதல் பத்து மணி வரைக்கும்."}],
   key:[{hi:"kitne baje", en:"at what time"}]},
  {n:5, level:2, title:"Asking for Wi-Fi", turns:[
    {sp:"you", en:"What's the wifi password?", hi:"Wifi ka password kya hai?", ta:"Wifi password என்ன?"},
    {sp:"other", en:"It's written on the card in the room.", hi:"Room mein card pe likha hai.", ta:"Room-ல card-ல எழுதி இருக்கு."}],
   key:[{hi:"password kya hai", en:"what is the password"}]},
  {n:6, level:3, title:"Asking for towels", turns:[
    {sp:"you", en:"Please send two more towels.", hi:"Do aur towel bhej dijiye.", ta:"இன்னும் ரெண்டு towel அனுப்புங்க."},
    {sp:"other", en:"Okay sir, sending right away.", hi:"Theek hai saab, abhi bhejte hain.", ta:"சரி சார், இப்போவே அனுப்புறோம்."}],
   key:[{hi:"bhej dijiye", en:"please send"}]},
  {n:7, level:4, title:"Reporting a problem", turns:[
    {sp:"you", en:"The AC in the room isn't working.", hi:"Room ka AC kaam nahi kar raha.", ta:"Room-ல AC வேலை செய்யலை."},
    {sp:"other", en:"Sorry sir, we'll send someone right away.", hi:"Sorry saab, abhi kisi ko bhejte hain.", ta:"Sorry சார், இப்போவே ஆளை அனுப்புறோம்."}],
   key:[{hi:"kaam nahi kar raha", en:"isn't working"}]},
  {n:8, level:3, title:"Asking for directions", turns:[
    {sp:"you", en:"Where is the swimming pool?", hi:"Swimming pool kahan hai?", ta:"Swimming pool எங்க இருக்கு?"},
    {sp:"other", en:"It's on the ground floor, to the right.", hi:"Ground floor pe, right side mein hai.", ta:"Ground floor-ல, வலது பக்கம் இருக்கு."}],
   key:[{hi:"right side", en:"right side"}]},
  {n:9, level:4, title:"Asking for checkout time", turns:[
    {sp:"you", en:"What time is checkout?", hi:"Checkout kitne baje hai?", ta:"Checkout எத்தனை மணிக்கு?"},
    {sp:"other", en:"Checkout is at noon.", hi:"Checkout dopeher barah baje hai.", ta:"Checkout மதியம் பன்னிரெண்டு மணிக்கு."}],
   key:[{hi:"dopeher barah baje", en:"twelve noon"}]},
  {n:10, level:5, title:"Checking out", turns:[
    {sp:"you", en:"I want to check out — please prepare the bill.", hi:"Checkout karna hai, bill ready kar dijiye.", ta:"Checkout பண்ணணும், bill ready பண்ணுங்க."},
    {sp:"other", en:"Okay sir, one moment — was everything okay?", hi:"Theek hai saab, ek minute, sab theek tha?", ta:"சரி சார், ஒரு நிமிஷம், எல்லாம் நல்லா இருந்துச்சா?"},
    {sp:"you", en:"Yes, everything was good, thank you.", hi:"Haan, sab achha tha, dhanyawaad.", ta:"ஆமா, எல்லாம் நல்லா இருந்துச்சு, நன்றி."}],
   key:[{hi:"bill ready", en:"bill ready"}]}
]},

{id:"ls11", icon:"🚆", title:"Train Station / Train Travel", otherRole:"Passenger", convos:[
  {n:1, level:1, title:"Asking where the platform is", turns:[
    {sp:"you", en:"Which platform does the Chennai train come on?", hi:"Chennai wali train kaunsi platform pe aayegi?", ta:"சென்னை train எந்த platform-ல வரும்?"},
    {sp:"other", en:"Platform number two.", hi:"Platform number do.", ta:"Platform நம்பர் ரெண்டு."}],
   key:[{hi:"kaunsi platform", en:"which platform"}]},
  {n:2, level:1, title:"Asking about the train", turns:[
    {sp:"you", en:"Is this the Chennai Express?", hi:"Ye Chennai Express hai?", ta:"இது சென்னை Express-ஆ?"},
    {sp:"other", en:"Yes, this is the right one.", hi:"Haan, yahi hai.", ta:"ஆமா, இதுதான்."}],
   key:[{hi:"yahi hai", en:"this is the (right) one"}]},
  {n:3, level:2, title:"Asking departure time", turns:[
    {sp:"you", en:"What time does the train leave?", hi:"Train kitne baje chhutegi?", ta:"Train எத்தனை மணிக்கு கிளம்பும்?"},
    {sp:"other", en:"It leaves at six in the evening.", hi:"Shaam ke chhe baje chhutegi.", ta:"மாலை ஆறு மணிக்கு கிளம்பும்."}],
   key:[{hi:"chhutegi", en:"will leave"}]},
  {n:4, level:2, title:"Asking arrival time", turns:[
    {sp:"you", en:"When will it reach Chennai?", hi:"Chennai kab pahunchegi?", ta:"சென்னை எப்போ போய் சேரும்?"},
    {sp:"other", en:"It'll reach by morning.", hi:"Subah tak pahunch jaayegi.", ta:"காலைக்குள்ள போய் சேரும்."}],
   key:[{hi:"pahunchegi", en:"will reach"}]},
  {n:5, level:2, title:"Asking for a ticket", turns:[
    {sp:"you", en:"One ticket to Chennai, please.", hi:"Ek ticket Chennai ke liye dijiye.", ta:"சென்னைக்கு ஒரு டிக்கெட் குடுங்க."},
    {sp:"other", en:"General or sleeper?", hi:"General ya sleeper?", ta:"General-ஆ sleeper-ஆ?"}],
   key:[{hi:"ke liye", en:"for"}]},
  {n:6, level:3, title:"Finding your seat", turns:[
    {sp:"you", en:"Which is seat number twelve?", hi:"Seat number barah kahan hai?", ta:"Seat நம்பர் பன்னிரெண்டு எங்க இருக்கு?"},
    {sp:"other", en:"It's this one, near the window.", hi:"Ye rahi, khidki ke paas.", ta:"இதோ, ஜன்னல் பக்கம்."}],
   key:[{hi:"khidki ke paas", en:"near the window"}]},
  {n:7, level:3, title:"Asking another passenger", turns:[
    {sp:"you", en:"Excuse me, is this seat free?", hi:"Suniye, ye seat khaali hai?", ta:"கேளுங்க, இந்த seat காலியா இருக்கா?"},
    {sp:"other", en:"Yes, it's free — you can sit.", hi:"Haan, khaali hai, baith jaiye.", ta:"ஆமா, காலி, உட்காருங்க."}],
   key:[{hi:"khaali hai", en:"is free / empty"}]},
  {n:8, level:3, title:"Asking where to get down", turns:[
    {sp:"you", en:"Which station do I get down at for the city center?", hi:"Shahar ke liye kaunse station pe utarna hai?", ta:"நகர மையத்துக்கு எந்த station-ல இறங்கணும்?"},
    {sp:"other", en:"Get down at the central station.", hi:"Central station pe utar jaiye.", ta:"Central station-ல இறங்குங்க."}],
   key:[{hi:"utarna hai", en:"need to get down"}]},
  {n:9, level:4, title:"Asking about food", turns:[
    {sp:"you", en:"Will food be available on the train?", hi:"Train mein khaana milega?", ta:"Train-ல சாப்பாடு கிடைக்குமா?"},
    {sp:"other", en:"Yes, the pantry car will come around.", hi:"Haan, pantry wala aayega.", ta:"ஆமா, pantry ஆள் வருவான்."}],
   key:[{hi:"khaana milega", en:"will food be available"}]},
  {n:10, level:5, title:"Getting off the train", turns:[
    {sp:"you", en:"Is this Chennai already? I fell asleep.", hi:"Kya ye Chennai aa gaya? Neend aa gayi thi.", ta:"இது சென்னையா வந்துடுச்சா? தூக்கம் வந்துச்சு."},
    {sp:"other", en:"Yes, this is Chennai — get down quickly!", hi:"Haan, Chennai hi hai, jaldi utro!", ta:"ஆமா, சென்னைதான், சீக்கிரம் இறங்குங்க!"}],
   key:[{hi:"neend aa gayi", en:"fell asleep"},{hi:"jaldi utro", en:"get down quickly"}]},
  {n:11, level:3, title:"Asking about the next station", turns:[
    {sp:"you", en:"Which is the next station?", hi:"Agla station kaun-sa hai?", ta:"அடுத்த station எது?"},
    {sp:"other", en:"When will the next station come?", hi:"Agla station kab aayega?", ta:"அடுத்த station எப்போ வரும்?"}],
   key:[{hi:"agla station", en:"next station"},{hi:"kab aayega", en:"when will it come"}]},
  {n:12, level:2, title:"Getting down at the next station", turns:[
    {sp:"you", en:"I need to get down at the next station.", hi:"Mujhe agle station par utarna hai.", ta:"நான் அடுத்த station-ல இறங்கணும்."},
    {sp:"other", en:"Okay, we'll reach there soon — we go to Delhi the next day.", hi:"Theek hai, bas pahunchte hain — agle din Delhi jaayenge.", ta:"சரி, இப்பவே வந்துடும் — அடுத்த நாள் டெல்லி போவோம்."}],
   key:[{hi:"utarna hai", en:"need to get down"},{hi:"agle din", en:"the next day"}]}
]},

{id:"ls12", icon:"✈️", title:"Airport", otherRole:"Staff", convos:[
  {n:1, level:1, title:"Asking where check-in is", turns:[
    {sp:"you", en:"Where is the check-in counter?", hi:"Check-in counter kahan hai?", ta:"Check-in counter எங்க இருக்கு?"},
    {sp:"other", en:"It's straight ahead.", hi:"Seedhe aage hai.", ta:"நேரா முன்னாடி இருக்கு."}],
   key:[{hi:"seedhe aage", en:"straight ahead"}]},
  {n:2, level:1, title:"Checking baggage", turns:[
    {sp:"you", en:"I have one bag to check in.", hi:"Mera ek bag check-in karna hai.", ta:"என் ஒரு bag check-in பண்ணணும்."},
    {sp:"other", en:"Please put it on the belt.", hi:"Belt par rakh dijiye.", ta:"Belt மேல வெச்சுடுங்க."}],
   key:[{hi:"check-in karna", en:"to check in"}]},
  {n:3, level:2, title:"Asking about boarding", turns:[
    {sp:"you", en:"When does boarding start?", hi:"Boarding kab shuru hogi?", ta:"Boarding எப்போ ஆரம்பிக்கும்?"},
    {sp:"other", en:"It'll start in thirty minutes.", hi:"Tees minute mein shuru hogi.", ta:"முப்பது நிமிஷத்துல ஆரம்பிக்கும்."}],
   key:[{hi:"shuru hogi", en:"will start"}]},
  {n:4, level:2, title:"Security instructions", turns:[
    {sp:"you", en:"Should I remove my shoes?", hi:"Jute nikalne hain kya?", ta:"காலணி கழட்டணுமா?"},
    {sp:"other", en:"Yes, please put them in the tray.", hi:"Haan, tray mein rakh dijiye.", ta:"ஆமா, tray-ல வெச்சிடுங்க."}],
   key:[{hi:"nikalne hain", en:"need to remove"}]},
  {n:5, level:2, title:"Finding the gate", turns:[
    {sp:"you", en:"Which gate is for this flight?", hi:"Is flight ke liye kaunsa gate hai?", ta:"இந்த flight-க்கு எந்த gate?"},
    {sp:"other", en:"Gate number seven.", hi:"Gate number saat.", ta:"Gate நம்பர் ஏழு."}],
   key:[{hi:"kaunsa gate", en:"which gate"}]},
  {n:6, level:3, title:"Asking about a flight delay", turns:[
    {sp:"you", en:"Is the flight delayed?", hi:"Flight late hai kya?", ta:"Flight late-ஆ?"},
    {sp:"other", en:"Yes, it's delayed by one hour.", hi:"Haan, ek ghanta late hai.", ta:"ஆமா, ஒரு மணி நேரம் late."}],
   key:[{hi:"late hai", en:"is late / delayed"}]},
  {n:7, level:3, title:"Asking for directions", turns:[
    {sp:"you", en:"Where is the washroom?", hi:"Washroom kahan hai?", ta:"Washroom எங்க?"},
    {sp:"other", en:"It's next to gate five.", hi:"Gate paanch ke paas hai.", ta:"Gate ஐந்து அருகில் இருக்கு."}],
   key:[{hi:"ke paas", en:"near"}]},
  {n:8, level:4, title:"Immigration conversation", turns:[
    {sp:"you", en:"Here's my passport and ticket.", hi:"Ye mera passport aur ticket hai.", ta:"இதோ என் passport, ticket."},
    {sp:"other", en:"How many days will you stay?", hi:"Kitne din rukenge?", ta:"எத்தனை நாள் இருப்பீங்க?"}],
   key:[{hi:"kitne din", en:"how many days"}]},
  {n:9, level:4, title:"Collecting baggage", turns:[
    {sp:"you", en:"Which belt is our baggage on?", hi:"Hamara saamaan kaunse belt pe hai?", ta:"எங்க பொருள் எந்த belt-ல இருக்கு?"},
    {sp:"other", en:"It's belt number four.", hi:"Belt number chaar hai.", ta:"Belt நம்பர் நாலு."}],
   key:[{hi:"saamaan", en:"luggage"}]},
  {n:10, level:5, title:"Finding a taxi", turns:[
    {sp:"you", en:"Where do I get a prepaid taxi?", hi:"Prepaid taxi kahan milegi?", ta:"Prepaid taxi எங்க கிடைக்கும்?"},
    {sp:"other", en:"Go outside and to the right — the counter is there.", hi:"Bahar jaakar right mein, counter wahan hai.", ta:"வெளிய போய் வலது பக்கம், counter அங்க இருக்கு."}],
   key:[{hi:"milegi", en:"will get / be available"}]}
]},

{id:"ls13", icon:"🏦", title:"Bank / ATM", otherRole:"Staff", convos:[
  {n:1, level:1, title:"Asking where the ATM is", turns:[
    {sp:"you", en:"Where is the nearest ATM?", hi:"Sabse najdeek ATM kahan hai?", ta:"அருகாமையில் ATM எங்க இருக்கு?"},
    {sp:"other", en:"It's just outside, to the left.", hi:"Bahar hi hai, left mein.", ta:"வெளியிலயே இருக்கு, இடது பக்கம்."}],
   key:[{hi:"najdeek", en:"nearest"}]},
  {n:2, level:2, title:"Asking account-related information", turns:[
    {sp:"you", en:"I want to know my account balance.", hi:"Mujhe apna account balance jaanna hai.", ta:"என் account balance தெரிஞ்சுக்கணும்."},
    {sp:"other", en:"Please show your passbook.", hi:"Apni passbook dikhaiye.", ta:"உங்க passbook காட்டுங்க."}],
   key:[{hi:"balance jaanna", en:"to know the balance"}]},
  {n:3, level:2, title:"Depositing money", turns:[
    {sp:"you", en:"I want to deposit this money.", hi:"Mujhe ye paise jama karne hain.", ta:"இந்த பணத்தை போட வேணும்."},
    {sp:"other", en:"Please fill this form.", hi:"Ye form bhar dijiye.", ta:"இந்த form நிரப்புங்க."}],
   key:[{hi:"jama karna", en:"to deposit"}]},
  {n:4, level:2, title:"Withdrawing money", turns:[
    {sp:"you", en:"I want to withdraw five thousand rupees.", hi:"Mujhe paanch hazaar rupaye nikalne hain.", ta:"ஐயாயிரம் ரூபாய் எடுக்கணும்."},
    {sp:"other", en:"Okay, please sign here.", hi:"Theek hai, yahan sign kijiye.", ta:"சரி, இங்க கையெழுத்து போடுங்க."}],
   key:[{hi:"nikalna", en:"to withdraw"}]},
  {n:5, level:3, title:"ATM not working", turns:[
    {sp:"you", en:"This ATM isn't giving cash.", hi:"Ye ATM cash nahi de raha.", ta:"இந்த ATM cash தரலை."},
    {sp:"other", en:"Please try the next one — this one has a problem.", hi:"Agla try kijiye, isme problem hai.", ta:"அடுத்தத்தை try பண்ணுங்க, இதுல problem இருக்கு."}],
   key:[{hi:"cash nahi de raha", en:"isn't giving cash"}]},
  {n:6, level:3, title:"Asking about a transaction", turns:[
    {sp:"you", en:"This transaction shows failed, but money was deducted.", hi:"Ye transaction fail dikha raha hai, par paise kat gaye.", ta:"இந்த transaction fail-ன்னு காட்டுது, ஆனா பணம் போச்சு."},
    {sp:"other", en:"Don't worry, it will be refunded in two days.", hi:"Chinta mat kijiye, do din mein wapas aa jaayega.", ta:"கவலைப்படாதீங்க, ரெண்டு நாளுல திரும்பி வரும்."}],
   key:[{hi:"paise kat gaye", en:"money got deducted"}]},
  {n:7, level:3, title:"Asking for help", turns:[
    {sp:"you", en:"Can you help me fill this form?", hi:"Ye form bharne mein madad kar sakte hain?", ta:"இந்த form நிரப்ப உதவி பண்ணுவீங்களா?"},
    {sp:"other", en:"Yes, sure — sit here.", hi:"Haan, zaroor, yahan baithiye.", ta:"ஆமா, நிச்சயமா, இங்க உட்காருங்க."}],
   key:[{hi:"madad", en:"help"}]},
  {n:8, level:4, title:"Asking about charges", turns:[
    {sp:"you", en:"Why was this charge deducted?", hi:"Ye charge kyun kata?", ta:"இந்த charge ஏன் போச்சு?"},
    {sp:"other", en:"That's the annual maintenance charge.", hi:"Ye annual maintenance charge hai.", ta:"இது annual maintenance charge."}],
   key:[{hi:"kyun kata", en:"why was it deducted"}]},
  {n:9, level:4, title:"Updating information", turns:[
    {sp:"you", en:"I need to update my phone number.", hi:"Mujhe apna phone number update karna hai.", ta:"என் phone number update பண்ணணும்."},
    {sp:"other", en:"Please bring an ID proof.", hi:"ID proof le aaiye.", ta:"ID proof கொண்டு வாங்க."}],
   key:[{hi:"update karna", en:"to update"}]},
  {n:10, level:5, title:"Leaving the bank", turns:[
    {sp:"you", en:"Is my work done? Can I leave now?", hi:"Mera kaam ho gaya? Ab ja sakta hoon?", ta:"என் வேலை முடிஞ்சுதா? இப்போ போகலாமா?"},
    {sp:"other", en:"Yes, it's done — here's your receipt.", hi:"Haan, ho gaya, ye receipt lijiye.", ta:"ஆமா, முடிஞ்சுது, இதோ receipt."}],
   key:[{hi:"kaam ho gaya", en:"work is done"}]}
]},

{id:"ls14", icon:"📱", title:"Mobile / Electronics Shop", otherRole:"Staff", convos:[
  {n:1, level:1, title:"Asking the price", turns:[
    {sp:"you", en:"How much is this phone?", hi:"Ye phone kitne ka hai?", ta:"இந்த phone எவ்ளோ?"},
    {sp:"other", en:"This is fifteen thousand.", hi:"Ye pandrah hazaar ka hai.", ta:"இது பதினைந்தாயிரம்."}],
   key:[{hi:"kitne ka hai", en:"how much is it"}]},
  {n:2, level:2, title:"Asking about models", turns:[
    {sp:"you", en:"What are the latest models?", hi:"Latest models kaunse hain?", ta:"Latest models எவை?"},
    {sp:"other", en:"These three just came in.", hi:"Ye teen abhi aaye hain.", ta:"இந்த மூணு இப்போதான் வந்துச்சு."}],
   key:[{hi:"latest models", en:"latest models"}]},
  {n:3, level:2, title:"Comparing two phones", turns:[
    {sp:"you", en:"Which is better between these two?", hi:"In dono mein kaunsa behtar hai?", ta:"இந்த ரெண்டுல எது நல்லது?"},
    {sp:"other", en:"This one has a better camera.", hi:"Isका camera achha hai.", ta:"இதோட camera நல்லது."}],
   key:[{hi:"behtar", en:"better"}]},
  {n:4, level:3, title:"Asking about warranty", turns:[
    {sp:"you", en:"How much warranty does it have?", hi:"Isme kitni warranty hai?", ta:"இதுல எவ்ளோ warranty?"},
    {sp:"other", en:"One year warranty.", hi:"Ek saal ki warranty hai.", ta:"ஒரு வருஷ warranty."}],
   key:[{hi:"warranty", en:"warranty"}]},
  {n:5, level:2, title:"Asking about accessories", turns:[
    {sp:"you", en:"Does a charger come with it?", hi:"Isके saath charger milega?", ta:"இதோட charger கிடைக்குமா?"},
    {sp:"other", en:"No, you'll have to buy it separately.", hi:"Nahi, alag se lena padega.", ta:"இல்ல, தனியா வாங்கணும்."}],
   key:[{hi:"alag se", en:"separately"}]},
  {n:6, level:3, title:"Asking for a discount", turns:[
    {sp:"you", en:"Is there any discount?", hi:"Koi discount hai kya?", ta:"Discount ஏதாவது இருக்கா?"},
    {sp:"other", en:"Yes, five hundred off today.", hi:"Haan, aaj paanch sau kam.", ta:"ஆமா, இன்னிக்கு ஐநூறு குறைவு."}],
   key:[{hi:"discount", en:"discount"}]},
  {n:7, level:4, title:"Asking about EMI", turns:[
    {sp:"you", en:"Is EMI available for this?", hi:"Isके liye EMI hai kya?", ta:"இதுக்கு EMI இருக்கா?"},
    {sp:"other", en:"Yes, three, six, or twelve months.", hi:"Haan, teen, chhe ya barah mahine.", ta:"ஆமா, மூணு, ஆறு, பன்னிரெண்டு மாசம்."}],
   key:[{hi:"EMI", en:"EMI / installment"}]},
  {n:8, level:4, title:"Returning / exchanging an item", turns:[
    {sp:"you", en:"I want to exchange this phone — it has a problem.", hi:"Ye phone exchange karna hai, isme problem hai.", ta:"இந்த phone exchange பண்ணணும், இதுல problem இருக்கு."},
    {sp:"other", en:"Okay, do you have the bill?", hi:"Theek hai, bill hai aapke paas?", ta:"சரி, bill இருக்கா உங்ககிட்ட?"}],
   key:[{hi:"exchange karna", en:"to exchange"}]},
  {n:9, level:3, title:"Reporting a problem", turns:[
    {sp:"you", en:"The battery drains very fast.", hi:"Battery bahut jaldi khatam ho jaati hai.", ta:"Battery ரொம்ப சீக்கிரம் தீர்ந்துடுது."},
    {sp:"other", en:"Let us check it in the service center.", hi:"Service center mein check karwaate hain.", ta:"Service center-ல check பண்ணலாம்."}],
   key:[{hi:"khatam ho jaati hai", en:"runs out / gets over"}]},
  {n:10, level:5, title:"Making payment", turns:[
    {sp:"you", en:"I'll pay half now and half next month — is that okay?", hi:"Aadha abhi aur aadha agle mahine, chalega kya?", ta:"பாதி இப்போ, பாதி அடுத்த மாசம், ஆகுமா?"},
    {sp:"other", en:"No sir, full payment is needed today.", hi:"Nahi saab, aaj poora payment chahiye.", ta:"இல்ல சார், இன்னிக்கே முழுசா payment வேணும்."}],
   key:[{hi:"poora payment", en:"full payment"}]}
]},

{id:"ls15", icon:"👕", title:"Clothes / Shopping", otherRole:"Staff", convos:[
  {n:1, level:1, title:"Asking for a shirt", turns:[
    {sp:"you", en:"Show me some shirts.", hi:"Kuch shirt dikhaiye.", ta:"கொஞ்சம் shirt காட்டுங்க."},
    {sp:"other", en:"Sure, what color?", hi:"Zaroor, kaunsa color chahiye?", ta:"நிச்சயமா, என்ன color வேணும்?"}],
   key:[{hi:"dikhaiye", en:"please show"}]},
  {n:2, level:1, title:"Asking for size", turns:[
    {sp:"you", en:"Do you have this in a large size?", hi:"Ye large size mein hai?", ta:"இது large size-ல இருக்கா?"},
    {sp:"other", en:"Yes, here it is.", hi:"Haan, ye rahi.", ta:"ஆமா, இதோ."}],
   key:[{hi:"size mein hai?", en:"is it in this size?"}]},
  {n:3, level:2, title:"Asking for another colour", turns:[
    {sp:"you", en:"Is it available in blue?", hi:"Blue color mein hai kya?", ta:"Blue color-ல இருக்கா?"},
    {sp:"other", en:"No, only black and white.", hi:"Nahi, sirf black aur white hai.", ta:"இல்ல, black, white மட்டும் இருக்கு."}],
   key:[{hi:"color mein", en:"in ...-colour"}]},
  {n:4, level:2, title:"Trying something on", turns:[
    {sp:"you", en:"Can I try this on?", hi:"Ye try kar sakta hoon?", ta:"இதை try பண்ணலாமா?"},
    {sp:"other", en:"Yes, the trial room is over there.", hi:"Haan, trial room udhar hai.", ta:"ஆமா, trial room அங்க இருக்கு."}],
   key:[{hi:"try kar sakta hoon", en:"can I try"}]},
  {n:5, level:2, title:"Asking the price", turns:[
    {sp:"you", en:"How much is this shirt?", hi:"Ye shirt kitne ki hai?", ta:"இந்த shirt எவ்ளோ?"},
    {sp:"other", en:"This is eight hundred rupees.", hi:"Ye aath sau rupaye ki hai.", ta:"இது எண்ணூறு ரூபாய்."}],
   key:[{hi:"kitne ki hai", en:"how much is it"}]},
  {n:6, level:3, title:"Asking for a discount", turns:[
    {sp:"you", en:"Any discount on two pieces?", hi:"Do piece pe discount hai kya?", ta:"ரெண்டு piece-க்கு discount இருக்கா?"},
    {sp:"other", en:"Yes, ten percent off.", hi:"Haan, das percent kam.", ta:"ஆமா, பத்து percent குறைவு."}],
   key:[{hi:"das percent kam", en:"ten percent less"}]},
  {n:7, level:3, title:"Asking for another design", turns:[
    {sp:"you", en:"Do you have this in a different design?", hi:"Ye alag design mein hai?", ta:"இது வேற design-ல இருக்கா?"},
    {sp:"other", en:"Yes, we have a few more patterns.", hi:"Haan, kuch aur pattern hain.", ta:"ஆமா, இன்னும் சில pattern இருக்கு."}],
   key:[{hi:"alag design", en:"different design"}]},
  {n:8, level:3, title:"Checking quality", turns:[
    {sp:"you", en:"Is this good quality cloth?", hi:"Ye achhe quality ka kapda hai?", ta:"இது நல்ல quality துணியா?"},
    {sp:"other", en:"Yes, it's pure cotton.", hi:"Haan, pure cotton hai.", ta:"ஆமா, pure cotton."}],
   key:[{hi:"kapda", en:"cloth / fabric"}]},
  {n:9, level:4, title:"Exchange", turns:[
    {sp:"you", en:"Can I exchange this if the size doesn't fit?", hi:"Size theek na aaye to exchange ho sakta hai?", ta:"Size சரியா வராம போனா exchange ஆகுமா?"},
    {sp:"other", en:"Yes, within seven days with the bill.", hi:"Haan, saat din ke andar bill ke saath.", ta:"ஆமா, ஏழு நாளுக்குள்ள bill-உடன்."}],
   key:[{hi:"saat din ke andar", en:"within seven days"}]},
  {n:10, level:5, title:"Payment", turns:[
    {sp:"you", en:"Do you have any offer if I pay by card?", hi:"Card se pay karoon to koi offer hai?", ta:"Card-ல pay பண்ணா offer ஏதாவது இருக்கா?"},
    {sp:"other", en:"No offer right now, sorry.", hi:"Abhi koi offer nahi hai, sorry.", ta:"இப்போ offer ஒண்ணும் இல்ல, sorry."}],
   key:[{hi:"koi offer", en:"any offer"}]}
]},

{id:"ls16", icon:"🏘️", title:"Neighbour / Apartment", otherRole:"Neighbour", convos:[
  {n:1, level:1, title:"Introducing yourself", turns:[
    {sp:"you", en:"Hello, I've just moved in next door.", hi:"Namaste, main abhi bagal mein rehne aaya hoon.", ta:"வணக்கம், நான் இப்போதான் பக்கத்துல குடியேறினேன்."},
    {sp:"other", en:"Welcome, nice to meet you.", hi:"Swagat hai, aapse milkar khushi hui.", ta:"வரவேற்கிறேன், உங்களை சந்தித்ததில் சந்தோஷம்."}],
   key:[{hi:"rehne aaya", en:"have come to live"}]},
  {n:2, level:2, title:"Asking about the neighbourhood", turns:[
    {sp:"you", en:"How is this neighbourhood?", hi:"Ye ilaka kaisa hai?", ta:"இந்த பகுதி எப்படி இருக்கு?"},
    {sp:"other", en:"It's quite good and quiet.", hi:"Kaafi achha aur shaant hai.", ta:"ரொம்ப நல்லா, அமைதியா இருக்கு."}],
   key:[{hi:"ilaka", en:"neighbourhood / area"}]},
  {n:3, level:2, title:"Asking about water", turns:[
    {sp:"you", en:"What time does the water come?", hi:"Paani kitne baje aata hai?", ta:"தண்ணி எத்தனை மணிக்கு வரும்?"},
    {sp:"other", en:"It comes in the morning around six.", hi:"Subah karib chhe baje aata hai.", ta:"காலை ஆறு மணிக்கு வரும்."}],
   key:[{hi:"paani aata hai", en:"water comes"}]},
  {n:4, level:2, title:"Asking about electricity", turns:[
    {sp:"you", en:"Does the power go out often here?", hi:"Yahan bijli baar baar jaati hai kya?", ta:"இங்க மின்சாரம் அடிக்கடி போகுமா?"},
    {sp:"other", en:"No, it's usually fine.", hi:"Nahi, aam taur pe theek rehti hai.", ta:"இல்ல, பொதுவா நல்லா இருக்கும்."}],
   key:[{hi:"baar baar", en:"again and again"}]},
  {n:5, level:3, title:"Asking about maintenance", turns:[
    {sp:"you", en:"How much is the monthly maintenance?", hi:"Mahine ka maintenance kitna hai?", ta:"மாசத்துக்கு maintenance எவ்ளோ?"},
    {sp:"other", en:"It's two thousand rupees.", hi:"Do hazaar rupaye hai.", ta:"ரெண்டாயிரம் ரூபாய்."}],
   key:[{hi:"mahine ka", en:"monthly"}]},
  {n:6, level:3, title:"Asking about parking", turns:[
    {sp:"you", en:"Where should I park my car?", hi:"Gaadi kahan park karoon?", ta:"காரை எங்க park பண்ணணும்?"},
    {sp:"other", en:"Park it in the basement.", hi:"Basement mein park kijiye.", ta:"Basement-ல park பண்ணுங்க."}],
   key:[{hi:"park karoon", en:"should I park"}]},
  {n:7, level:3, title:"Asking about security", turns:[
    {sp:"you", en:"Is there a security guard here?", hi:"Yahan security guard hai kya?", ta:"இங்க security guard இருக்காரா?"},
    {sp:"other", en:"Yes, twenty-four hours.", hi:"Haan, chaubis ghante.", ta:"ஆமா, இருபத்தி நான்கு மணி நேரமும்."}],
   key:[{hi:"chaubis ghante", en:"twenty-four hours"}]},
  {n:8, level:4, title:"Asking about nearby shops", turns:[
    {sp:"you", en:"Is there a good vegetable shop nearby?", hi:"Yahan paas mein achhi sabzi ki dukan hai?", ta:"இங்க அருகில் நல்ல காய்கறி கடை இருக்கா?"},
    {sp:"other", en:"Yes, just around the corner.", hi:"Haan, bilkul corner pe hai.", ta:"ஆமா, corner-ல்லயே இருக்கு."}],
   key:[{hi:"paas mein", en:"nearby"}]},
  {n:9, level:4, title:"Asking for help", turns:[
    {sp:"you", en:"Can you help me carry this upstairs?", hi:"Ise upar le jaane mein madad karoge?", ta:"இதை மேலே கொண்டு போக உதவி பண்ணுவீங்களா?"},
    {sp:"other", en:"Sure, no problem.", hi:"Zaroor, koi baat nahi.", ta:"நிச்சயமா, பரவாயில்ல."}],
   key:[{hi:"madad karoge?", en:"will you help?"}]},
  {n:10, level:5, title:"Casual conversation", turns:[
    {sp:"you", en:"How's everyone at home doing?", hi:"Ghar mein sab kaise hain?", ta:"வீட்டுல எல்லாரும் எப்படி இருக்காங்க?"},
    {sp:"other", en:"Everyone's fine, thanks for asking.", hi:"Sab theek hain, poochne ke liye shukriya.", ta:"எல்லாரும் நல்லா இருக்காங்க, கேட்டதுக்கு நன்றி."},
    {sp:"you", en:"Do come over sometime for tea.", hi:"Kabhi chai peene aa jaiyega.", ta:"எப்போவாவது tea குடிக்க வாங்க."}],
   key:[{hi:"kaise hain", en:"how are (they)"}]}
]},

{id:"ls17", icon:"👨‍🔧", title:"Plumber / Electrician / Repair Person", otherRole:"Worker", convos:[
  {n:1, level:1, title:"Calling the worker", turns:[
    {sp:"you", en:"Can you come to my house today?", hi:"Aap aaj mere ghar aa sakte hain?", ta:"நீங்க இன்னிக்கு என் வீட்டுக்கு வரமுடியுமா?"},
    {sp:"other", en:"Yes, I'll come by evening.", hi:"Haan, shaam tak aa jaunga.", ta:"ஆமா, மாலைக்குள்ள வந்துடுவேன்."}],
   key:[{hi:"aa sakte hain?", en:"can you come?"}]},
  {n:2, level:2, title:"Explaining the problem", turns:[
    {sp:"you", en:"The tap is leaking continuously.", hi:"Tap se lagataar paani tapak raha hai.", ta:"Tap-ல தண்ணி தொடர்ந்து விழுது."},
    {sp:"other", en:"Okay, I'll take a look.", hi:"Theek hai, dekhta hoon.", ta:"சரி, பாக்குறேன்."}],
   key:[{hi:"tapak raha hai", en:"is dripping"}]},
  {n:3, level:2, title:"Asking when they can come", turns:[
    {sp:"you", en:"When can you come?", hi:"Aap kab aa sakte hain?", ta:"நீங்க எப்போ வரமுடியும்?"},
    {sp:"other", en:"I can come tomorrow morning.", hi:"Kal subah aa sakta hoon.", ta:"நாளைக்கு காலை வரமுடியும்."}],
   key:[{hi:"kab aa sakte hain", en:"when can you come"}]},
  {n:4, level:2, title:"Showing the problem", turns:[
    {sp:"you", en:"Look, the light isn't turning on.", hi:"Dekhiye, light on nahi ho rahi.", ta:"பாருங்க, light on ஆகலை."},
    {sp:"other", en:"Let me check the switch.", hi:"Switch check karta hoon.", ta:"Switch-ஐ check பண்றேன்."}],
   key:[{hi:"on nahi ho rahi", en:"isn't turning on"}]},
  {n:5, level:3, title:"Asking what happened", turns:[
    {sp:"you", en:"What's wrong with it?", hi:"Isme kya kharabi hai?", ta:"இதுல என்ன கெட்டு போச்சு?"},
    {sp:"other", en:"The wire has come loose.", hi:"Taar dheela ho gaya hai.", ta:"கம்பி தளர்ந்துடுச்சு."}],
   key:[{hi:"kharabi", en:"fault / problem"}]},
  {n:6, level:3, title:"Asking how much it costs", turns:[
    {sp:"you", en:"How much will this cost?", hi:"Isme kitna kharch aayega?", ta:"இதுக்கு எவ்ளோ செலவாகும்?"},
    {sp:"other", en:"Around three hundred rupees.", hi:"Karib teen sau rupaye.", ta:"கிட்டத்தட்ட முந்நூறு ரூபாய்."}],
   key:[{hi:"kharch aayega", en:"cost will come to"}]},
  {n:7, level:3, title:"Asking how long it will take", turns:[
    {sp:"you", en:"How long will this take?", hi:"Isme kitna time lagega?", ta:"இதுக்கு எவ்ளோ time ஆகும்?"},
    {sp:"other", en:"About half an hour.", hi:"Karib aadha ghanta.", ta:"கிட்டத்தட்ட அரை மணி நேரம்."}],
   key:[{hi:"time lagega", en:"will take time"}]},
  {n:8, level:4, title:"Asking them to fix something else", turns:[
    {sp:"you", en:"Can you also look at this fan while you're here?", hi:"Ye fan bhi dekh dijiye, aap yahin hain.", ta:"நீங்க இருக்கும்போதே இந்த fan-ஐயும் பாருங்க."},
    {sp:"other", en:"Sure, let me check that too.", hi:"Zaroor, ise bhi check karta hoon.", ta:"நிச்சயமா, இதையும் check பண்றேன்."}],
   key:[{hi:"bhi dekh dijiye", en:"please look at this too"}]},
  {n:9, level:4, title:"Checking the repair", turns:[
    {sp:"you", en:"Is it working properly now?", hi:"Ab theek se kaam kar raha hai?", ta:"இப்போ சரியா வேலை செய்யுதா?"},
    {sp:"other", en:"Yes, try it and check.", hi:"Haan, chala ke dekh lijiye.", ta:"ஆமா, ஓட்டி பாருங்க."}],
   key:[{hi:"theek se", en:"properly"}]},
  {n:10, level:5, title:"Paying", turns:[
    {sp:"you", en:"Here's your money — thank you for coming quickly.", hi:"Ye lijiye paise, jaldi aane ke liye shukriya.", ta:"இதோ பணம், சீக்கிரம் வந்ததுக்கு நன்றி."},
    {sp:"other", en:"Thank you sir, call me anytime.", hi:"Dhanyawaad saab, kabhi bhi bulaiye.", ta:"நன்றி சார், எப்போ வேணும்னாலும் அழையுங்க."}],
   key:[{hi:"kabhi bhi bulaiye", en:"call anytime"}]}
]},

{id:"ls18", icon:"🏫", title:"School / Child", otherRole:"Teacher", convos:[
  {n:1, level:1, title:"Talking to teacher", turns:[
    {sp:"you", en:"Good morning teacher, how is my child doing?", hi:"Namaste teacher, mera bachcha kaisa kar raha hai?", ta:"வணக்கம் டீச்சர், என் பையன் எப்படி இருக்கான்?"},
    {sp:"other", en:"He's doing well, quite attentive in class.", hi:"Achha kar raha hai, class mein dhyaan se sunta hai.", ta:"நல்லா இருக்கான், class-ல கவனமா கேக்குறான்."}],
   key:[{hi:"kaisa kar raha hai", en:"how is (he) doing"}]},
  {n:2, level:2, title:"Asking about homework", turns:[
    {sp:"you", en:"What homework does he have today?", hi:"Aaj uska kya homework hai?", ta:"இன்னிக்கு அவனுக்கு என்ன homework?"},
    {sp:"other", en:"Math and English homework.", hi:"Math aur English ka homework hai.", ta:"Math, English homework இருக்கு."}],
   key:[{hi:"homework", en:"homework"}]},
  {n:3, level:2, title:"Asking about attendance", turns:[
    {sp:"you", en:"Was he present yesterday?", hi:"Kal wo school aaya tha?", ta:"நேத்து school வந்தானா?"},
    {sp:"other", en:"Yes, he was present.", hi:"Haan, aaya tha.", ta:"ஆமா, வந்தான்."}],
   key:[{hi:"aaya tha?", en:"had (he) come?"}]},
  {n:4, level:3, title:"Asking about child's health", turns:[
    {sp:"you", en:"He had a slight fever yesterday, please keep an eye on him.", hi:"Kal use halka bukhaar tha, dhyaan rakhiyega.", ta:"நேத்து அவனுக்கு லேசான காய்ச்சல் இருந்துச்சு, கவனிச்சுக்கோங்க."},
    {sp:"other", en:"Okay, I'll keep an eye on him.", hi:"Theek hai, dhyaan rakhungi.", ta:"சரி, கவனிச்சுக்குறேன்."}],
   key:[{hi:"dhyaan rakhiyega", en:"please keep an eye"}]},
  {n:5, level:2, title:"Asking about school timing", turns:[
    {sp:"you", en:"What time does school end today?", hi:"Aaj school kitne baje khatam hoga?", ta:"இன்னிக்கு school எத்தனை மணிக்கு முடியும்?"},
    {sp:"other", en:"It ends at three today.", hi:"Aaj teen baje khatam hoga.", ta:"இன்னிக்கு மூணு மணிக்கு முடியும்."}],
   key:[{hi:"khatam hoga", en:"will end"}]},
  {n:6, level:3, title:"Asking about fees", turns:[
    {sp:"you", en:"When is the next fee due?", hi:"Agli fees kab deni hai?", ta:"அடுத்த fees எப்போ கட்டணும்?"},
    {sp:"other", en:"By the end of this month.", hi:"Is mahine ke aakhir tak.", ta:"இந்த மாசம் முடியுறதுக்குள்ள."}],
   key:[{hi:"fees deni hai", en:"fees need to be paid"}]},
  {n:7, level:3, title:"Asking about an event", turns:[
    {sp:"you", en:"When is the annual day function?", hi:"Annual day function kab hai?", ta:"Annual day function எப்போ?"},
    {sp:"other", en:"It's next month, on the tenth.", hi:"Agle mahine, das taarikh ko hai.", ta:"அடுத்த மாசம், பத்தாம் தேதி."}],
   key:[{hi:"agle mahine", en:"next month"}]},
  {n:8, level:4, title:"Asking about a problem", turns:[
    {sp:"you", en:"I heard he had a fight with a friend — what happened?", hi:"Suna hai uski dost se ladai hui, kya hua tha?", ta:"அவனுக்கு நண்பனோட சண்டை போட்டதா கேள்விப்பட்டேன், என்ன ஆச்சு?"},
    {sp:"other", en:"Just a small argument, it's fine now.", hi:"Bas chhoti si baat thi, ab theek hai.", ta:"சின்ன விஷயம்தான், இப்போ சரியாகிடுச்சு."}],
   key:[{hi:"ladai hui", en:"had a fight"}]},
  {n:9, level:3, title:"Talking to another parent", turns:[
    {sp:"you", en:"Does your child also have this much homework?", hi:"Aapke bachche ko bhi itna homework milta hai?", ta:"உங்க பையனுக்கும் இவ்ளோ homework கிடைக்குதா?"},
    {sp:"other", en:"Yes, quite a lot these days.", hi:"Haan, aajkal kaafi milta hai.", ta:"ஆமா, இப்போ ரொம்ப கிடைக்குது."}],
   key:[{hi:"itna", en:"this much"}]},
  {n:10, level:5, title:"Picking up the child", turns:[
    {sp:"you", en:"I'm here to pick up my child, sorry I'm a bit late.", hi:"Main bachche ko lene aaya hoon, thoda late ho gaya, sorry.", ta:"நான் பையனை அழைச்சுக்க வந்தேன், கொஞ்சம் late ஆயிடுச்சு, sorry."},
    {sp:"other", en:"No problem, he's waiting inside.", hi:"Koi baat nahi, wo andar wait kar raha hai.", ta:"பரவாயில்ல, அவன் உள்ள wait பண்றான்."}],
   key:[{hi:"lene aaya hoon", en:"have come to pick up"}]}
]},

{id:"ls19", icon:"🛣️", title:"Asking for Directions", otherRole:"Stranger", convos:[
  {n:1, level:1, title:"Where is this place?", turns:[
    {sp:"you", en:"Excuse me, where is the post office?", hi:"Suniye, post office kahan hai?", ta:"கேளுங்க, post office எங்க இருக்கு?"},
    {sp:"other", en:"It's straight ahead, on the left.", hi:"Seedhe jaaiye, left mein hai.", ta:"நேரா போங்க, இடது பக்கம் இருக்கு."}],
   key:[{hi:"kahan hai", en:"where is it"}]},
  {n:2, level:1, title:"Is it far?", turns:[
    {sp:"you", en:"Is it far from here?", hi:"Yahan se door hai kya?", ta:"இங்கிருந்து தூரமா?"},
    {sp:"other", en:"No, it's quite close.", hi:"Nahi, kaafi paas hai.", ta:"இல்ல, ரொம்ப அருகில்தான்."}],
   key:[{hi:"door hai?", en:"is it far?"}]},
  {n:3, level:2, title:"How do I go there?", turns:[
    {sp:"you", en:"How do I get there?", hi:"Wahan kaise jaaoon?", ta:"அங்க எப்படி போவது?"},
    {sp:"other", en:"Go straight and then turn right.", hi:"Seedhe jaiye phir right mudiye.", ta:"நேரா போங்க, அப்புறம் வலது பக்கம் திரும்புங்க."}],
   key:[{hi:"kaise jaaoon", en:"how should I go"}]},
  {n:4, level:2, title:"Should I walk?", turns:[
    {sp:"you", en:"Can I walk there, or should I take an auto?", hi:"Wahan paidal ja sakta hoon, ya auto loon?", ta:"நடந்தே போகலாமா, இல்ல auto வாங்கணுமா?"},
    {sp:"other", en:"It's close, you can walk.", hi:"Paas hi hai, paidal ja sakte hain.", ta:"அருகில்தான், நடந்தே போகலாம்."}],
   key:[{hi:"paidal", en:"on foot"}]},
  {n:5, level:2, title:"Which road?", turns:[
    {sp:"you", en:"Which road should I take?", hi:"Kaunsi sadak se jaana hai?", ta:"எந்த சாலை வழியா போகணும்?"},
    {sp:"other", en:"Take this main road.", hi:"Is main road se jaiye.", ta:"இந்த main road-ல போங்க."}],
   key:[{hi:"kaunsi sadak", en:"which road"}]},
  {n:6, level:3, title:"Left or right?", turns:[
    {sp:"you", en:"Should I go left or right from here?", hi:"Yahan se left jaaoon ya right?", ta:"இங்கிருந்து இடதுபக்கமா வலதுபக்கமா?"},
    {sp:"other", en:"Turn left here.", hi:"Yahan se left mudiye.", ta:"இங்கிருந்து இடது பக்கம் திரும்புங்க."}],
   key:[{hi:"left mudiye", en:"turn left"}]},
  {n:7, level:3, title:"Where should I turn?", turns:[
    {sp:"you", en:"Where should I turn from here?", hi:"Yahan se kahan mudna hai?", ta:"இங்கிருந்து எங்க திரும்பணும்?"},
    {sp:"other", en:"Turn at the second signal.", hi:"Doosre signal pe mudiye.", ta:"ரெண்டாவது signal-ல திரும்புங்க."}],
   key:[{hi:"doosre signal", en:"second signal"}]},
  {n:8, level:3, title:"How long will it take?", turns:[
    {sp:"you", en:"How long will it take to reach?", hi:"Pahunchne mein kitna time lagega?", ta:"போய் சேர எவ்ளோ time ஆகும்?"},
    {sp:"other", en:"About ten minutes.", hi:"Karib das minute.", ta:"கிட்டத்தட்ட பத்து நிமிஷம்."}],
   key:[{hi:"kitna time lagega", en:"how long will it take"}]},
  {n:9, level:4, title:"Is there a landmark?", turns:[
    {sp:"you", en:"Is there any landmark near it?", hi:"Iske paas koi landmark hai?", ta:"அதுக்கு அருகில் ஏதாவது landmark இருக்கா?"},
    {sp:"other", en:"Yes, there's a big temple next to it.", hi:"Haan, ek bada mandir hai bagal mein.", ta:"ஆமா, பக்கத்துல ஒரு பெரிய கோவில் இருக்கு."}],
   key:[{hi:"landmark", en:"landmark"}]},
  {n:10, level:5, title:"Confirming you've reached", turns:[
    {sp:"you", en:"Excuse me, is this the post office?", hi:"Suniye, ye post office hai?", ta:"கேளுங்க, இது post office-தானே?"},
    {sp:"other", en:"Yes, this is it — you've reached.", hi:"Haan, yahi hai, pahunch gaye aap.", ta:"ஆமா, இதுதான், வந்துடீங்க."}],
   key:[{hi:"pahunch gaye", en:"have reached"}]}
]},

{id:"ls20", icon:"🤝", title:"Everyday Social Conversation", otherRole:"Friend", convos:[
  {n:1, level:1, title:"How are you?", turns:[
    {sp:"you", en:"How are you?", hi:"Aap kaise hain?", ta:"நீங்க எப்படி இருக்கீங்க?"},
    {sp:"other", en:"I'm fine, and you?", hi:"Main theek hoon, aap batayiye?", ta:"நான் நல்லா இருக்கேன், நீங்க?"}],
   key:[{hi:"kaise hain?", en:"how are you?"}]},
  {n:2, level:1, title:"Where are you from?", turns:[
    {sp:"you", en:"Where are you from?", hi:"Aap kahan se hain?", ta:"நீங்க எங்கிருந்து?"},
    {sp:"other", en:"I'm from Chennai.", hi:"Main Chennai se hoon.", ta:"நான் சென்னையிலிருந்து."}],
   key:[{hi:"kahan se hain", en:"where are you from"}]},
  {n:3, level:2, title:"What do you do?", turns:[
    {sp:"you", en:"What do you do?", hi:"Aap kya karte hain?", ta:"நீங்க என்ன பண்றீங்க?"},
    {sp:"other", en:"I'm a doctor.", hi:"Main doctor hoon.", ta:"நான் doctor."}],
   key:[{hi:"kya karte hain", en:"what do you do (for work)"}]},
  {n:4, level:2, title:"Where do you work?", turns:[
    {sp:"you", en:"Where do you work?", hi:"Aap kahan kaam karte hain?", ta:"நீங்க எங்க வேலை பாக்குறீங்க?"},
    {sp:"other", en:"I work at a hospital.", hi:"Main ek hospital mein kaam karta hoon.", ta:"நான் ஒரு hospital-ல வேலை பாக்குறேன்."}],
   key:[{hi:"kaam karte hain", en:"do work"}]},
  {n:5, level:2, title:"How long have you been here?", turns:[
    {sp:"you", en:"How long have you been here?", hi:"Aap kitne samay se yahan hain?", ta:"நீங்க எவ்ளோ காலமா இங்க இருக்கீங்க?"},
    {sp:"other", en:"About two years.", hi:"Karib do saal se.", ta:"கிட்டத்தட்ட ரெண்டு வருஷமா."}],
   key:[{hi:"kitne samay se", en:"since how long"}]},
  {n:6, level:3, title:"What did you do today?", turns:[
    {sp:"you", en:"What did you do today?", hi:"Aaj aapne kya kiya?", ta:"இன்னிக்கு நீங்க என்ன பண்ணீங்க?"},
    {sp:"other", en:"I just went to work and came back.", hi:"Bas kaam pe gaya aur wapas aa gaya.", ta:"வெறுமனே வேலைக்கு போய் திரும்பி வந்தேன்."}],
   key:[{hi:"kya kiya", en:"what did (you) do"}]},
  {n:7, level:3, title:"What are you doing tomorrow?", turns:[
    {sp:"you", en:"What are you doing tomorrow?", hi:"Kal aap kya kar rahe hain?", ta:"நாளைக்கு நீங்க என்ன பண்றீங்க?"},
    {sp:"other", en:"I'm meeting a friend tomorrow.", hi:"Kal ek dost se milna hai.", ta:"நாளைக்கு ஒரு நண்பரை பாக்கணும்."}],
   key:[{hi:"milna hai", en:"have to meet"}]},
  {n:8, level:3, title:"Talking about weather", turns:[
    {sp:"you", en:"It's so hot today.", hi:"Aaj bahut garmi hai.", ta:"இன்னிக்கு ரொம்ப சூடா இருக்கு."},
    {sp:"other", en:"Yes, unbearable heat.", hi:"Haan, garmi bardaasht nahi ho rahi.", ta:"ஆமா, வெயிலை தாங்கவே முடியலை."}],
   key:[{hi:"garmi", en:"heat"}]},
  {n:9, level:4, title:"Talking about food", turns:[
    {sp:"you", en:"What's your favorite food?", hi:"Aapko sabse zyada kya khaana pasand hai?", ta:"உங்களுக்கு எந்த சாப்பாடு ரொம்ப பிடிக்கும்?"},
    {sp:"other", en:"I really like biryani.", hi:"Mujhe biryani bahut pasand hai.", ta:"எனக்கு biryani ரொம்ப பிடிக்கும்."}],
   key:[{hi:"pasand hai", en:"like / is liked"}]},
  {n:10, level:5, title:"Saying goodbye / see you later", turns:[
    {sp:"you", en:"Alright, I should get going now — good to see you.", hi:"Achha, ab main chalta hoon, aapse milkar achha laga.", ta:"சரி, நான் இப்போ கிளம்புறேன், உங்களை பார்த்தது சந்தோஷமா இருந்துச்சு."},
    {sp:"other", en:"Same here, see you soon.", hi:"Mujhe bhi, jaldi milte hain.", ta:"எனக்கும் தான், சீக்கிரம் பாக்கலாம்."}],
   key:[{hi:"jaldi milte hain", en:"see you soon"}]}
]},

{id:"ls21", icon:"💈", title:"Barber / Salon", otherRole:"Barber", convos:[
  {n:1, level:1, title:"Asking for a haircut", turns:[
    {sp:"you", en:"Brother, I want a haircut.", hi:"Bhaiya, baal katwane hain.", ta:"அண்ணா, முடி வெட்டணும்."},
    {sp:"other", en:"Sure, please sit.", hi:"Theek hai, baithiye.", ta:"சரி, உட்காருங்க."}],
   key:[{hi:"baal katwane hain", en:"want a haircut"}]},
  {n:2, level:1, title:"Saying how much to cut", turns:[
    {sp:"you", en:"Cut it short on the sides.", hi:"Side se chhote kar dijiye.", ta:"பக்கவாட்டா சின்னதா வெட்டுங்க."},
    {sp:"other", en:"Okay, and on top?", hi:"Theek hai, aur upar se?", ta:"சரி, மேலயும்?"}],
   key:[{hi:"chhote kar dijiye", en:"cut it short"}]},
  {n:3, level:2, title:"Asking for a trim only", turns:[
    {sp:"you", en:"Just a trim, not too short.", hi:"Bas thoda trim kar dijiye, zyada chhota mat kijiye.", ta:"கொஞ்சம் trim மட்டும், ரொம்ப சின்னதா வேண்டாம்."},
    {sp:"other", en:"Okay, I'll just trim it.", hi:"Theek hai, bas trim karta hoon.", ta:"சரி, trim மட்டும் பண்றேன்."}],
   key:[{hi:"trim kar dijiye", en:"please trim"}]},
  {n:4, level:2, title:"Asking for a shave", turns:[
    {sp:"you", en:"Please do a shave too.", hi:"Shave bhi kar dijiye.", ta:"Shave-உம் பண்ணுங்க."},
    {sp:"other", en:"Okay, lean back a little.", hi:"Theek hai, thoda peeche jaiye.", ta:"சரி, கொஞ்சம் பின்னால போங்க."}],
   key:[{hi:"shave kar dijiye", en:"please shave"}]},
  {n:5, level:3, title:"Asking for a specific style", turns:[
    {sp:"you", en:"Can you cut it like this photo?", hi:"Is photo jaisa kaat sakte hain?", ta:"இந்த photo மாதிரி வெட்ட முடியுமா?"},
    {sp:"other", en:"Yes, I'll try to cut it the same way.", hi:"Haan, waise hi kaatne ki koshish karta hoon.", ta:"ஆமா, அதே மாதிரி வெட்ட முயற்சி பண்றேன்."}],
   key:[{hi:"jaisa kaat sakte hain", en:"can you cut like"}]},
  {n:6, level:3, title:"Asking for head massage", turns:[
    {sp:"you", en:"Give a head massage too, please.", hi:"Sar ki massage bhi kar dijiye.", ta:"தலை massage-உம் பண்ணுங்க."},
    {sp:"other", en:"Okay, oil or without oil?", hi:"Theek hai, tel se ya bina tel?", ta:"சரி, எண்ணெய்ல ஆகணுமா இல்லாமலா?"}],
   key:[{hi:"sar ki massage", en:"head massage"}]},
  {n:7, level:3, title:"Saying it's uneven", turns:[
    {sp:"you", en:"This side looks longer than the other.", hi:"Ye side doosri se lambi lag rahi hai.", ta:"இந்த பக்கம் மறு பக்கத்தை விட நீளமா இருக்கு."},
    {sp:"other", en:"Sorry, let me fix it.", hi:"Sorry, abhi theek karta hoon.", ta:"Sorry, இப்போவே சரி பண்றேன்."}],
   key:[{hi:"lambi lag rahi hai", en:"looks longer"}]},
  {n:8, level:4, title:"Asking the price", turns:[
    {sp:"you", en:"How much for haircut and shave together?", hi:"Haircut aur shave dono ka kitna hua?", ta:"Haircut-உம் shave-உம் சேர்த்து எவ்ளோ?"},
    {sp:"other", en:"Together it's two hundred rupees.", hi:"Dono saath mein do sau rupaye.", ta:"ரெண்டும் சேர்த்து இருநூறு ரூபாய்."}],
   key:[{hi:"dono saath mein", en:"both together"}]},
  {n:9, level:4, title:"Asking for a recommendation", turns:[
    {sp:"you", en:"Which style would suit my face?", hi:"Mere chehre pe kaunsa style achha lagega?", ta:"என் முகத்துக்கு எந்த style நல்லா இருக்கும்?"},
    {sp:"other", en:"This style will suit you well.", hi:"Ye style aap par achha lagega.", ta:"இந்த style உங்களுக்கு நல்லா இருக்கும்."}],
   key:[{hi:"achha lagega", en:"will suit / look good"}]},
  {n:10, level:5, title:"Paying and leaving", turns:[
    {sp:"you", en:"Here you go — that was a good haircut, thank you.", hi:"Ye lijiye, bahut achha haircut kiya, dhanyavaad.", ta:"இதோ, ரொம்ப நல்லா haircut பண்ணீங்க, நன்றி."},
    {sp:"other", en:"Thank you sir, do come again.", hi:"Dhanyavaad saab, phir aaiyega.", ta:"நன்றி சார், திரும்பவும் வாங்க."}],
   key:[{hi:"phir aaiyega", en:"do come again"}]}
]},

{id:"ls22", icon:"🏋️", title:"Gym", otherRole:"Trainer", convos:[
  {n:1, level:1, title:"Asking about membership", turns:[
    {sp:"you", en:"How much is the monthly membership?", hi:"Mahine ki membership kitne ki hai?", ta:"மாசத்துக்கு membership எவ்ளோ?"},
    {sp:"other", en:"It's one thousand five hundred a month.", hi:"Mahine ka pandrah sau rupaye hai.", ta:"மாசத்துக்கு பதினைந்நூறு ரூபாய்."}],
   key:[{hi:"mahine ki", en:"monthly"}]},
  {n:2, level:1, title:"Asking about timings", turns:[
    {sp:"you", en:"What time does the gym open?", hi:"Gym kitne baje khulta hai?", ta:"Gym எத்தனை மணிக்கு திறக்கும்?"},
    {sp:"other", en:"It opens at six in the morning.", hi:"Subah chhe baje khulta hai.", ta:"காலை ஆறு மணிக்கு திறக்கும்."}],
   key:[{hi:"kitne baje khulta hai", en:"what time does it open"}]},
  {n:3, level:2, title:"Asking for a trainer", turns:[
    {sp:"you", en:"Can I get a personal trainer?", hi:"Mujhe personal trainer mil sakta hai?", ta:"எனக்கு personal trainer கிடைக்குமா?"},
    {sp:"other", en:"Yes, that costs extra.", hi:"Haan, uska alag charge hai.", ta:"ஆமா, அதுக்கு தனி charge இருக்கு."}],
   key:[{hi:"alag charge", en:"separate charge"}]},
  {n:4, level:2, title:"Asking how to use a machine", turns:[
    {sp:"you", en:"How do I use this machine?", hi:"Ye machine kaise use karte hain?", ta:"இந்த machine-ஐ எப்படி use பண்றது?"},
    {sp:"other", en:"Sit like this and pull the handle.", hi:"Aise baithiye aur handle kheechiye.", ta:"இப்படி உட்கார்ந்து handle-ஐ இழுங்க."}],
   key:[{hi:"kaise use karte hain", en:"how do you use it"}]},
  {n:5, level:3, title:"Asking for a diet plan", turns:[
    {sp:"you", en:"Can you also suggest a diet plan?", hi:"Diet plan bhi bata sakte hain?", ta:"Diet plan-உம் சொல்ல முடியுமா?"},
    {sp:"other", en:"Sure, eat more protein.", hi:"Zaroor, zyada protein khaiye.", ta:"நிச்சயமா, அதிகமா protein சாப்பிடுங்க."}],
   key:[{hi:"diet plan", en:"diet plan"}]},
  {n:6, level:3, title:"Saying you're feeling pain", turns:[
    {sp:"you", en:"My shoulder is paining after that exercise.", hi:"Us exercise ke baad mera kandha dard kar raha hai.", ta:"அந்த exercise-க்கு பிறகு தோள் வலிக்குது."},
    {sp:"other", en:"Stop that exercise for today, rest it.", hi:"Aaj ke liye wo exercise band kijiye, aaraam dijiye.", ta:"இன்னிக்கு அந்த exercise நிறுத்துங்க, ரெஸ்ட் கொடுங்க."}],
   key:[{hi:"dard kar raha hai", en:"is hurting"}]},
  {n:7, level:3, title:"Asking for a change in routine", turns:[
    {sp:"you", en:"Can we change today's routine?", hi:"Aaj ka routine badal sakte hain?", ta:"இன்னிக்கு routine மாத்தலாமா?"},
    {sp:"other", en:"Sure, let's focus on legs today.", hi:"Zaroor, aaj legs pe focus karte hain.", ta:"நிச்சயமா, இன்னிக்கு legs-ல focus பண்ணலாம்."}],
   key:[{hi:"badal sakte hain", en:"can we change"}]},
  {n:8, level:4, title:"Asking about supplements", turns:[
    {sp:"you", en:"Should I take any supplement?", hi:"Koi supplement lena chahiye?", ta:"ஏதாவது supplement எடுக்கணுமா?"},
    {sp:"other", en:"Not necessary right now — your diet is enough.", hi:"Abhi zaroori nahi, aapka khaana kaafi hai.", ta:"இப்போ தேவையில்ல, உங்க சாப்பாடே போதும்."}],
   key:[{hi:"zaroori nahi", en:"not necessary"}]},
  {n:9, level:4, title:"Asking about progress", turns:[
    {sp:"you", en:"Am I making good progress?", hi:"Kya mera achha progress ho raha hai?", ta:"நல்லா progress ஆகுதா?"},
    {sp:"other", en:"Yes, you've improved a lot in a month.", hi:"Haan, ek mahine mein bahut sudhaar aaya hai.", ta:"ஆமா, ஒரு மாசத்துல ரொம்ப முன்னேற்றம் வந்துச்சு."}],
   key:[{hi:"sudhaar aaya hai", en:"has improved"}]},
  {n:10, level:5, title:"Cancelling membership", turns:[
    {sp:"you", en:"I want to cancel my membership — I'm shifting to another city.", hi:"Meri membership cancel karni hai, main doosre shahar shift ho raha hoon.", ta:"என் membership cancel பண்ணணும், நான் வேற ஊருக்கு shift ஆகுறேன்."},
    {sp:"other", en:"Okay, sorry to hear that — all the best.", hi:"Theek hai, sunke bura laga, all the best.", ta:"சரி, கேட்டு வருத்தமா இருக்கு, all the best."}],
   key:[{hi:"cancel karni hai", en:"want to cancel"}]}
]},

{id:"ls23", icon:"📦", title:"Post Office / Courier", otherRole:"Staff", convos:[
  {n:1, level:1, title:"Sending a letter", turns:[
    {sp:"you", en:"I want to send this letter.", hi:"Ye chitthi bhejni hai.", ta:"இந்த கடிதத்தை அனுப்பணும்."},
    {sp:"other", en:"Okay, put it on the scale.", hi:"Theek hai, scale par rakhiye.", ta:"சரி, scale மேல வெச்சுடுங்க."}],
   key:[{hi:"bhejni hai", en:"need to send"}]},
  {n:2, level:1, title:"Asking the cost", turns:[
    {sp:"you", en:"How much will it cost to send this?", hi:"Ise bhejne mein kitna kharcha aayega?", ta:"இதை அனுப்ப எவ்ளோ செலவாகும்?"},
    {sp:"other", en:"This will cost fifty rupees.", hi:"Ismein pachaas rupaye lagenge.", ta:"இதுக்கு ஐம்பது ரூபாய் ஆகும்."}],
   key:[{hi:"kharcha aayega", en:"cost will come to"}]},
  {n:3, level:2, title:"Sending a parcel", turns:[
    {sp:"you", en:"I want to send this parcel to Delhi.", hi:"Ye parcel Delhi bhejna hai.", ta:"இந்த parcel-ஐ டெல்லிக்கு அனுப்பணும்."},
    {sp:"other", en:"Okay, please fill this form.", hi:"Theek hai, ye form bhar dijiye.", ta:"சரி, இந்த form நிரப்புங்க."}],
   key:[{hi:"parcel bhejna hai", en:"need to send a parcel"}]},
  {n:4, level:2, title:"Asking how many days it will take", turns:[
    {sp:"you", en:"How many days will it take to reach?", hi:"Pahunchne mein kitne din lagenge?", ta:"போய் சேர எத்தனை நாள் ஆகும்?"},
    {sp:"other", en:"It'll reach in three to four days.", hi:"Teen se chaar din mein pahunch jaayega.", ta:"மூணு நாலு நாளுக்குள்ள போய் சேரும்."}],
   key:[{hi:"kitne din lagenge", en:"how many days will it take"}]},
  {n:5, level:2, title:"Asking for tracking", turns:[
    {sp:"you", en:"Can I track this parcel?", hi:"Ye parcel track kar sakta hoon?", ta:"இந்த parcel-ஐ track பண்ண முடியுமா?"},
    {sp:"other", en:"Yes, here's your tracking number.", hi:"Haan, ye lijiye tracking number.", ta:"ஆமா, இதோ tracking number."}],
   key:[{hi:"track kar sakta hoon", en:"can I track"}]},
  {n:6, level:3, title:"Asking about speed post", turns:[
    {sp:"you", en:"Is speed post faster?", hi:"Speed post jaldi pahunchta hai kya?", ta:"Speed post சீக்கிரம் போய் சேருமா?"},
    {sp:"other", en:"Yes, it'll reach in one day.", hi:"Haan, ek din mein pahunch jaayega.", ta:"ஆமா, ஒரு நாளுக்குள்ள போய் சேரும்."}],
   key:[{hi:"jaldi pahunchta hai", en:"reaches quickly"}]},
  {n:7, level:3, title:"Collecting a parcel", turns:[
    {sp:"you", en:"I've come to collect my parcel.", hi:"Main apna parcel lene aaya hoon.", ta:"நான் என் parcel வாங்க வந்தேன்."},
    {sp:"other", en:"Please show your ID.", hi:"Apna ID dikhaiye.", ta:"உங்க ID காட்டுங்க."}],
   key:[{hi:"lene aaya hoon", en:"have come to collect"}]},
  {n:8, level:4, title:"Reporting a lost parcel", turns:[
    {sp:"you", en:"My parcel hasn't arrived — it's been a week.", hi:"Mera parcel nahi aaya, ek hafta ho gaya.", ta:"என் parcel வரலை, ஒரு வாரம் ஆயிடுச்சு."},
    {sp:"other", en:"Let me check with this tracking number.", hi:"Is tracking number se check karta hoon.", ta:"இந்த tracking number-ல check பண்றேன்."}],
   key:[{hi:"ek hafta ho gaya", en:"it's been a week"}]},
  {n:9, level:4, title:"Asking about insurance", turns:[
    {sp:"you", en:"Is there insurance for this parcel?", hi:"Is parcel ke liye insurance hai?", ta:"இந்த parcel-க்கு insurance இருக்கா?"},
    {sp:"other", en:"Yes, but it costs extra.", hi:"Haan, lekin uska alag paisa lagta hai.", ta:"ஆமா, ஆனா அதுக்கு தனி பணம் ஆகும்."}],
   key:[{hi:"alag paisa", en:"separate money / extra cost"}]},
  {n:10, level:5, title:"Handling a damaged parcel", turns:[
    {sp:"you", en:"This parcel arrived damaged — I want to file a complaint.", hi:"Ye parcel kharab hokar aaya hai, complaint darj karni hai.", ta:"இந்த parcel கெட்டு வந்துருக்கு, complaint பண்ணணும்."},
    {sp:"other", en:"I'm sorry sir, let me take down the details.", hi:"Sorry saab, main details le leta hoon.", ta:"Sorry சார், நான் details வாங்கிக்கிறேன்."}],
   key:[{hi:"complaint darj karni hai", en:"want to file a complaint"}]}
]},

{id:"ls24", icon:"🎬", title:"Movie Theatre", otherRole:"Staff", convos:[
  {n:1, level:1, title:"Buying tickets", turns:[
    {sp:"you", en:"Two tickets for the six o'clock show, please.", hi:"Chhe baje ke show ke do ticket dijiye.", ta:"ஆறு மணி show-க்கு ரெண்டு டிக்கெட் குடுங்க."},
    {sp:"other", en:"Okay, that's four hundred rupees.", hi:"Theek hai, chaar sau rupaye hue.", ta:"சரி, நானூறு ரூபாய் ஆச்சு."}],
   key:[{hi:"ke liye ticket", en:"tickets for"}]},
  {n:2, level:1, title:"Asking for seats", turns:[
    {sp:"you", en:"Do you have seats in the middle?", hi:"Beech mein seat hai kya?", ta:"நடுவுல seat இருக்கா?"},
    {sp:"other", en:"Yes, row F is available.", hi:"Haan, row F khaali hai.", ta:"ஆமா, row F காலி இருக்கு."}],
   key:[{hi:"khaali hai", en:"is free / empty"}]},
  {n:3, level:2, title:"Asking about the movie", turns:[
    {sp:"you", en:"What time does the movie start?", hi:"Movie kitne baje shuru hogi?", ta:"Movie எத்தனை மணிக்கு ஆரம்பிக்கும்?"},
    {sp:"other", en:"It starts at six fifteen.", hi:"Chhe pandrah baje shuru hogi.", ta:"ஆறு பதினைந்து மணிக்கு ஆரம்பிக்கும்."}],
   key:[{hi:"shuru hogi", en:"will start"}]},
  {n:4, level:2, title:"Buying snacks", turns:[
    {sp:"you", en:"One large popcorn and two colas, please.", hi:"Ek bada popcorn aur do cola dijiye.", ta:"ஒரு பெரிய popcorn, ரெண்டு cola குடுங்க."},
    {sp:"other", en:"Sweet or salty popcorn?", hi:"Meetha popcorn ya namkeen?", ta:"Sweet popcorn-ஆ salty-ஆ?"}],
   key:[{hi:"meetha ya namkeen", en:"sweet or salty"}]},
  {n:5, level:2, title:"Asking where the screen is", turns:[
    {sp:"you", en:"Which way is screen number three?", hi:"Screen number teen kis taraf hai?", ta:"Screen நம்பர் மூணு எந்த பக்கம்?"},
    {sp:"other", en:"Go upstairs, it's on the right.", hi:"Upar jaiye, right mein hai.", ta:"மேல போங்க, வலது பக்கம் இருக்கு."}],
   key:[{hi:"kis taraf", en:"which direction"}]},
  {n:6, level:3, title:"Asking to change seats", turns:[
    {sp:"you", en:"Can we change our seats? The screen is too close.", hi:"Hum apni seat badal sakte hain? Screen bahut paas hai.", ta:"Seat மாத்திக்கலாமா? Screen ரொம்ப அருகில் இருக்கு."},
    {sp:"other", en:"Let me check if back seats are free.", hi:"Peeche ki seat khaali hai ya nahi check karta hoon.", ta:"பின்னாடி seat காலியா இருக்கா check பண்றேன்."}],
   key:[{hi:"seat badal sakte hain", en:"can we change seats"}]},
  {n:7, level:3, title:"Complaining about noise", turns:[
    {sp:"you", en:"Can you please ask them to keep quiet?", hi:"Unse thoda shaant rehne ke liye keh sakte hain?", ta:"அவங்ககிட்ட கொஞ்சம் அமைதியா இருக்க சொல்ல முடியுமா?"},
    {sp:"other", en:"Sure, I'll go tell them.", hi:"Zaroor, main jaakar bolta hoon.", ta:"நிச்சயமா, நான் போய் சொல்றேன்."}],
   key:[{hi:"shaant rehna", en:"to stay quiet"}]},
  {n:8, level:3, title:"Asking about interval", turns:[
    {sp:"you", en:"How long is the interval?", hi:"Interval kitni der ka hai?", ta:"Interval எவ்ளோ நேரம்?"},
    {sp:"other", en:"About fifteen minutes.", hi:"Karib pandrah minute.", ta:"கிட்டத்தட்ட பதினைந்து நிமிஷம்."}],
   key:[{hi:"kitni der ka", en:"how long"}]},
  {n:9, level:4, title:"Asking about a refund", turns:[
    {sp:"you", en:"The show got cancelled — can I get a refund?", hi:"Show cancel ho gaya, mujhe refund mil sakta hai?", ta:"Show cancel ஆயிடுச்சு, refund கிடைக்குமா?"},
    {sp:"other", en:"Yes, it'll be refunded to your card.", hi:"Haan, aapke card mein refund ho jaayega.", ta:"ஆமா, உங்க card-ல refund ஆகிடும்."}],
   key:[{hi:"refund mil sakta hai", en:"can I get a refund"}]},
  {n:10, level:5, title:"Leaving after the movie", turns:[
    {sp:"you", en:"That was a great movie! Should we watch the sequel too?", hi:"Kya zabardast movie thi! Sequel bhi dekhein kya?", ta:"என்ன அருமையான movie! Sequel-உம் பார்க்கலாமா?"},
    {sp:"other", en:"Yes, let's watch it next week.", hi:"Haan, agle hafte dekhte hain.", ta:"ஆமா, அடுத்த வாரம் பார்க்கலாம்."}],
   key:[{hi:"zabardast", en:"excellent / great"}]}
]},

{id:"ls25", icon:"💒", title:"Wedding / Function", otherRole:"Host", convos:[
  {n:1, level:1, title:"Greeting the host", turns:[
    {sp:"you", en:"Congratulations! The wedding looks beautiful.", hi:"Badhai ho! Shaadi bahut sundar lag rahi hai.", ta:"வாழ்த்துக்கள்! கல்யாணம் ரொம்ப அழகா இருக்கு."},
    {sp:"other", en:"Thank you so much for coming.", hi:"Aane ke liye bahut bahut dhanyavaad.", ta:"வந்ததுக்கு ரொம்ப நன்றி."}],
   key:[{hi:"badhai ho", en:"congratulations"}]},
  {n:2, level:1, title:"Asking where to sit", turns:[
    {sp:"you", en:"Where should we sit?", hi:"Hum kahan baithein?", ta:"நாங்க எங்க உட்காரணும்?"},
    {sp:"other", en:"Please sit over there, in the front.", hi:"Udhar aage baith jaiye.", ta:"அங்க முன்னாடி உட்காருங்க."}],
   key:[{hi:"kahan baithein", en:"where should we sit"}]},
  {n:3, level:2, title:"Asking about the ceremony timing", turns:[
    {sp:"you", en:"What time is the main ceremony?", hi:"Asli rasm kitne baje hai?", ta:"முக்கிய சடங்கு எத்தனை மணிக்கு?"},
    {sp:"other", en:"It starts at seven in the evening.", hi:"Shaam saat baje shuru hogi.", ta:"மாலை ஏழு மணிக்கு ஆரம்பிக்கும்."}],
   key:[{hi:"asli rasm", en:"the main ceremony"}]},
  {n:4, level:2, title:"Asking about food", turns:[
    {sp:"you", en:"Where is the food being served?", hi:"Khaana kahan par mil raha hai?", ta:"சாப்பாடு எங்க கொடுக்குறாங்க?"},
    {sp:"other", en:"On the right side, please go there.", hi:"Right side mein, udhar chaliye.", ta:"வலது பக்கம், அங்க போங்க."}],
   key:[{hi:"khaana mil raha hai", en:"food is being served"}]},
  {n:5, level:2, title:"Meeting other guests", turns:[
    {sp:"you", en:"Hello, how do you know the family?", hi:"Namaste, aap parivaar ko kaise jaante hain?", ta:"வணக்கம், நீங்க குடும்பத்தை எப்படி தெரியும்?"},
    {sp:"other", en:"I'm the groom's colleague.", hi:"Main dulhe ka colleague hoon.", ta:"நான் மணமகன் colleague."}],
   key:[{hi:"kaise jaante hain", en:"how do you know"}]},
  {n:6, level:3, title:"Giving a gift", turns:[
    {sp:"you", en:"This gift is for the new couple.", hi:"Ye tohfa nayi jodi ke liye hai.", ta:"இந்த பரிசு புதிய ஜோடிக்கு."},
    {sp:"other", en:"Thank you, that's very kind of you.", hi:"Dhanyavaad, aap bahut achhe hain.", ta:"நன்றி, நீங்க ரொம்ப நல்லவங்க."}],
   key:[{hi:"tohfa", en:"gift"}]},
  {n:7, level:3, title:"Asking about photos", turns:[
    {sp:"you", en:"Can we take a photo with the couple?", hi:"Kya hum couple ke saath photo le sakte hain?", ta:"நாங்க couple-உடன் photo எடுக்கலாமா?"},
    {sp:"other", en:"Yes, please come this way.", hi:"Haan, is taraf aaiye.", ta:"ஆமா, இந்த பக்கம் வாங்க."}],
   key:[{hi:"photo le sakte hain", en:"can we take a photo"}]},
  {n:8, level:4, title:"Asking about the schedule", turns:[
    {sp:"you", en:"What's next after the main ceremony?", hi:"Asli rasm ke baad kya hoga?", ta:"முக்கிய சடங்குக்கு பிறகு என்ன நடக்கும்?"},
    {sp:"other", en:"After that, there's dinner and music.", hi:"Uske baad khaana aur music hoga.", ta:"அதுக்கு பிறகு சாப்பாடும் music-உம் இருக்கும்."}],
   key:[{hi:"uske baad", en:"after that"}]},
  {n:9, level:4, title:"Complimenting the arrangements", turns:[
    {sp:"you", en:"Everything is so well arranged, congratulations to the family.", hi:"Sab kuch itna achhe se arrange kiya hai, parivaar ko badhai.", ta:"எல்லாம் இவ்ளோ நல்லா arrange பண்ணிருக்காங்க, குடும்பத்துக்கு வாழ்த்து."},
    {sp:"other", en:"Thank you, it means a lot.", hi:"Dhanyavaad, ye sunke bahut achha laga.", ta:"நன்றி, இது கேட்டு ரொம்ப சந்தோஷம்."}],
   key:[{hi:"itna achhe se", en:"so well"}]},
  {n:10, level:5, title:"Saying goodbye and leaving", turns:[
    {sp:"you", en:"We have to leave now — it was a lovely function, thank you for inviting us.", hi:"Hume ab chalna hoga, bahut achha function tha, bulane ke liye dhanyavaad.", ta:"நாங்க இப்போ கிளம்பணும், ரொம்ப நல்ல function, அழைச்சதுக்கு நன்றி."},
    {sp:"other", en:"Thank you for coming, take care.", hi:"Aane ke liye dhanyavaad, khayal rakhiye.", ta:"வந்ததுக்கு நன்றி, கவனமா போங்க."}],
   key:[{hi:"bulane ke liye dhanyavaad", en:"thank you for inviting"}]}
]},

/* ls26–ls34: 9 more scenarios (27 conversations) added at the user's request, based on a
   real-life conversations workbook they shared. The workbook's own Tamil/English lines
   could not be recovered from the file (no Tamil font was embedded in it), so those are
   original translations in the app's usual colloquial style; the Hindi lines follow the
   workbook closely. */
{id:"ls26", icon:"🔧", title:"Tyre / Vehicle Shop", otherRole:"Mechanic", convos:[
  {n:1, level:2, title:"Asking to change tyres", turns:[
    {sp:"you", en:"I need my tyres changed — I want to fit new tyres.", hi:"Mujhe tyre badalwane hain. Naye tyre lagwane hain.", ta:"எனக்கு டயர் மாத்தணும். புது டயர் போடணும்."},
    {sp:"other", en:"Go over there, sir.", hi:"Udhar jaiye.", ta:"அந்த பக்கம் போங்க சார்."}],
   key:[{hi:"badalwane hain", en:"need (to get) changed"},{hi:"lagwane hain", en:"need (to get) fitted"}]},
  {n:2, level:3, title:"All four tyres, and the price", turns:[
    {sp:"you", en:"I need all four tyres changed.", hi:"Chaaron tyre badalwane hain.", ta:"நாலு டயரும் மாத்தணும்."},
    {sp:"other", en:"Okay sir, come in — I'll show you all the options. It's nine thousand rupees, sir.", hi:"Theek hai sir, andar aaiye. Saare plan dikhata hoon. Nau hazaar rupaye hain, sir.", ta:"சரி சார், உள்ள வாங்க. எல்லா plan-உம் காட்றேன். ஒன்பதாயிரம் ரூபாய் சார்."}],
   key:[{hi:"chaaron", en:"all four"},{hi:"nau hazaar", en:"nine thousand"}]},
  {n:3, level:4, title:"Asking about warranty and waiting", turns:[
    {sp:"you", en:"Okay. Will I get a warranty?", hi:"Theek hai. Warranty milegi?", ta:"சரி. Warranty கிடைக்குமா?"},
    {sp:"other", en:"Yes sir, there's a five-year warranty — if there's any problem, you'll get a replacement.", hi:"Jee sir, paanch saal ki warranty hai. Kuch bhi problem hui to replacement milega.", ta:"ஆமா சார், ஐஞ்சு வருஷ warranty இருக்கு. என்ன problem வந்தாலும் replacement கிடைக்கும்."},
    {sp:"you", en:"Okay, go ahead and change all four tyres.", hi:"Theek hai, chaaron tyre badalwa dijiye.", ta:"சரி, நாலு டயரும் மாத்துங்க."},
    {sp:"other", en:"Sir, it'll take half an hour to an hour. Can you wait a bit?", hi:"Sir, aadhe ghante se ek ghante tak lagega. Thoda intezaar karenge?", ta:"சார், அரை மணி நேரத்துல இருந்து ஒரு மணி நேரம் ஆகும். கொஞ்சம் காத்துருக்கறீங்களா?"}],
   key:[{hi:"warranty milegi?", en:"will I get a warranty?"},{hi:"intezaar karenge?", en:"will you wait?"}]}
]},

{id:"ls27", icon:"⛽", title:"Petrol Pump", otherRole:"Attendant", convos:[
  {n:1, level:1, title:"Asking to fill petrol", turns:[
    {sp:"you", en:"Brother, fill it up with petrol.", hi:"Bhaiya, petrol daal dijiye.", ta:"அண்ணா, பெட்ரோல் ஊத்துங்க."},
    {sp:"other", en:"Sir, please open the fuel lid.", hi:"Sir, fuel lid khol dijiye.", ta:"சார், fuel lid-ஐ திறங்க."},
    {sp:"you", en:"One minute, I'll open it.", hi:"Ek minute, main kholta hoon.", ta:"ஒரு நிமிஷம், நான் திறக்குறேன்."}],
   key:[{hi:"petrol daal dijiye", en:"fill it with petrol"},{hi:"fuel lid", en:"fuel lid / cap"}]},
  {n:2, level:2, title:"Telling how much petrol", turns:[
    {sp:"other", en:"How much petrol?", hi:"Kitne ka petrol?", ta:"எவ்ளோ பெட்ரோல்?"},
    {sp:"you", en:"Twenty-five hundred rupees' worth.", hi:"Dhaai hazaar ka.", ta:"இரண்டாயிரத்து ஐநூறு ரூபாய்க்கு."}],
   key:[{hi:"kitne ka?", en:"how much (worth)?"},{hi:"dhaai hazaar", en:"twenty-five hundred"}]},
  {n:3, level:3, title:"Paying by UPI", turns:[
    {sp:"other", en:"How will you pay?", hi:"Kaise payment karenge?", ta:"எப்படி payment பண்றீங்க?"},
    {sp:"you", en:"I'll pay by UPI. Bring the scanner.", hi:"UPI se karunga. Scanner le aaiye.", ta:"UPI-ல பண்றேன். Scanner கொண்டு வாங்க."}],
   key:[{hi:"UPI se karunga", en:"I'll pay by UPI"},{hi:"scanner le aaiye", en:"bring the scanner"}]}
]},

{id:"ls28", icon:"🏠", title:"Morning at Home", otherRole:"Spouse", convos:[
  {n:1, level:2, title:"Asking what happened", turns:[
    {sp:"you", en:"Hey, what happened?", hi:"Hi, kya hua?", ta:"ஏய், என்ன ஆச்சு?"},
    {sp:"other", en:"I woke up early. I didn't sleep at all — I got an allergy early in the morning.", hi:"Main jaldi uth gayi. Main soyi hi nahi. Subah-subah hi allergy ho gayi.", ta:"நான் சீக்கிரம் எழுந்துட்டேன். சரியா தூங்கவே இல்ல. காலைல allergy வந்துடுச்சு."}],
   key:[{hi:"jaldi uth gayi", en:"woke up early"},{hi:"allergy ho gayi", en:"got an allergy"}]},
  {n:2, level:2, title:"Cleaning the AC filter", turns:[
    {sp:"you", en:"Okay, alright — let me clean today's filter.", hi:"Achha, theek hai. Aaj ka filter hi saaf kar deta hoon.", ta:"சரி, பரவாயில்ல. இன்னிக்கு filter-ஐ சுத்தம் பண்ணிடுறேன்."}],
   key:[{hi:"saaf kar deta hoon", en:"I'll clean it"}]},
  {n:3, level:3, title:"Telling about Sunday duty and the way back", turns:[
    {sp:"you", en:"This week I have duty on Sunday too — there's a case at Apollo Hospital at seven in the morning.", hi:"Is hafte Sunday ko bhi meri duty hai. Subah saat baje Apollo Hospital mein ek case hai.", ta:"இந்த வாரம் ஞாயிறு அன்னிக்கும் எனக்கு duty இருக்கு. காலை ஏழு மணிக்கு அப்போலோ மருத்துவமனையில் ஒரு case இருக்கு."},
    {sp:"other", en:"On the way back, bring some fish from the market.", hi:"Wapas aate samay market se machhli le aaunga.", ta:"திரும்பி வரும்போது market-ல இருந்து மீன் வாங்கிட்டு வாரேன்."}],
   key:[{hi:"is hafte", en:"this week"},{hi:"wapas aate samay", en:"on the way back"}]}
]},

{id:"ls29", icon:"🏥", title:"Hospital — Talking to a Colleague", otherRole:"Colleague", convos:[
  {n:1, level:2, title:"Checking in before the day starts", turns:[
    {sp:"you", en:"Did you sleep well? There are many cases today.", hi:"Achhe se soye? Aaj kai case hain.", ta:"நல்லா தூங்கினீங்களா? இன்னிக்கு ரொம்ப case இருக்கு."},
    {sp:"other", en:"Everything has to be prepared properly.", hi:"Sab kuch theek se taiyaar karna hai.", ta:"எல்லாமே சரியா ready பண்ணணும்."}],
   key:[{hi:"achhe se soye?", en:"did you sleep well?"},{hi:"taiyaar karna hai", en:"has to be prepared"}]},
  {n:2, level:3, title:"Saying you're tired", turns:[
    {sp:"you", en:"I'm a little tired.", hi:"Main thoda thak gaya hoon.", ta:"நான் கொஞ்சம் தளர்ந்து போயிருக்கேன்."},
    {sp:"other", en:"If we work together, everything will get done quickly.", hi:"Hum milkar karenge to sab kuch jaldi ho jaayega.", ta:"நாங்க சேர்ந்து பண்ணினா எல்லாமே சீக்கிரம் முடிஞ்சிடும்."}],
   key:[{hi:"thak gaya hoon", en:"have become tired"},{hi:"milkar karenge", en:"will do together"}]},
  {n:3, level:3, title:"Two cases at the same time", turns:[
    {sp:"you", en:"Okay sir, but there are cases in two (rooms), right?", hi:"Theek hai sir, lekin do mein case hain na?", ta:"சரி சார், ஆனா ரெண்டு இடத்துலயும் case இருக்கில்லையா?"},
    {sp:"other", en:"We'll see, we'll manage somehow.", hi:"Dekh lenge, kisi tarah manage kar lenge.", ta:"பார்ப்போம், எப்படியோ manage பண்ணிடுவோம்."}],
   key:[{hi:"kisi tarah", en:"somehow"},{hi:"manage kar lenge", en:"will manage"}]}
]},

{id:"ls30", icon:"📞", title:"Phone Call — Giving Directions / Pickup", otherRole:"Friend", convos:[
  {n:1, level:1, title:"Telling where you are", turns:[
    {sp:"other", en:"Brother, have you come?", hi:"Bhaiya, aa gaye?", ta:"அண்ணா, வந்துட்டீங்களா?"},
    {sp:"you", en:"I'm behind the tree. I'll come in two minutes.", hi:"Ped ke peeche hoon. Main do minute mein aa jaunga.", ta:"மரத்துக்கு பின்னாடி இருக்கேன். ரெண்டு நிமிஷத்துல வந்துடுறேன்."}],
   key:[{hi:"ped ke peeche", en:"behind the tree"}]},
  {n:2, level:3, title:"Asking the way back", turns:[
    {sp:"other", en:"How do we need to go?", hi:"Kaise jaana hai?", ta:"எப்படி போகணும்?"},
    {sp:"you", en:"We need to go back by this same road — the map is showing this same way.", hi:"Isi raaste se wapas jaana hai. Map mein yahi raasta dikha raha hai.", ta:"இதே வழியா திரும்பி போகணும். Map-ல இதேதான் வழி காட்றது."}],
   key:[{hi:"isi raaste se", en:"by this same road"}]},
  {n:4, level:4, title:"Comparing routes on the map", turns:[
    {sp:"other", en:"Oh, okay — we can go this way too.", hi:"Oh, theek hai. Aise bhi ja sakte hain.", ta:"ஓ, சரி. இப்படியும் போகலாம்."},
    {sp:"you", en:"The map is showing a faster route.", hi:"Map mein jaldi jaane wala raasta dikha raha hai.", ta:"Map-ல சீக்கிரம் போகிற வழி காட்றது."}],
   key:[{hi:"jaldi jaane wala raasta", en:"faster route"}]}
]},

{id:"ls31", icon:"🥬", title:"Chatting with a Friend at the Market", otherRole:"Friend", convos:[
  {n:1, level:1, title:"Asking where someone is going", turns:[
    {sp:"you", en:"Where are you going?", hi:"Tum kahan ja rahe ho?", ta:"நீ எங்க போற?"},
    {sp:"other", en:"I'm going to the market.", hi:"Main market ja raha hoon.", ta:"நான் market போறேன்."}],
   key:[{hi:"kahan ja rahe ho?", en:"where are you going?"}]},
  {n:2, level:2, title:"Asking what they'll buy", turns:[
    {sp:"you", en:"What will you buy?", hi:"Tum kya khareedoge?", ta:"நீ என்ன வாங்குவ?"},
    {sp:"other", en:"I'll buy some vegetables. I'll buy fruit too.", hi:"Main kuch sabziyaan khareedunga. Haan, main phal bhi khareedunga.", ta:"நான் கொஞ்சம் காய்கறி வாங்குவேன். ஆமா, பழமும் வாங்குவேன்."}],
   key:[{hi:"khareedunga", en:"I will buy"}]},
  {n:3, level:2, title:"Asking when they'll be back", turns:[
    {sp:"you", en:"When will you come back?", hi:"Tum kab wapas aaoge?", ta:"நீ எப்போ திரும்பி வருவ?"},
    {sp:"other", en:"I'll be back in an hour.", hi:"Main ek ghante mein wapas aa jaunga.", ta:"நான் ஒரு மணி நேரத்துல திரும்பி வந்துடுவேன்."}],
   key:[{hi:"ek ghante mein", en:"in an hour"}]}
]},

{id:"ls32", icon:"📱", title:"Phone Call Home", otherRole:"Spouse", convos:[
  {n:1, level:1, title:"Asking where someone is", turns:[
    {sp:"you", en:"Hi, where are you right now?", hi:"Hi, tum abhi kahan ho?", ta:"ஏய், நீ இப்போ எங்க இருக்க?"},
    {sp:"other", en:"I'm coming home.", hi:"Main ghar aa raha hoon.", ta:"நான் வீடு வரேன்."}],
   key:[{hi:"abhi kahan ho?", en:"where are you right now?"}]},
  {n:2, level:2, title:"Asking how long it'll take", turns:[
    {sp:"you", en:"How long will you take to come?", hi:"Kitni der mein aaoge?", ta:"எவ்ளோ நேரத்துல வருவ?"},
    {sp:"other", en:"It'll take ten more minutes.", hi:"Abhi das minute aur lagenge.", ta:"இன்னும் பத்து நிமிஷம் ஆகும்."}],
   key:[{hi:"das minute aur", en:"ten more minutes"}]},
  {n:3, level:3, title:"A caring reminder", turns:[
    {sp:"you", en:"I called just to ask this. Come carefully.", hi:"Bas yahi poochhne ke liye phone kiya tha. Tum dhyaan se aana.", ta:"இதை கேக்கத்தான் போன் பண்ணேன். கவனமா வந்துடு."}],
   key:[{hi:"dhyaan se aana", en:"come carefully"}]}
]},

{id:"ls33", icon:"🥤", title:"Juice Shop", otherRole:"Shopkeeper", convos:[
  {n:1, level:1, title:"Ordering mango juice", turns:[
    {sp:"you", en:"Brother, one juice please. Give me mango juice.", hi:"Bhaiya, ek juice dijiye. Aam ka juice dijiye.", ta:"அண்ணா, ஒரு juice கொடுங்க. மாம்பழ juice கொடுங்க."}],
   key:[{hi:"aam ka juice", en:"mango juice"}]},
  {n:2, level:2, title:"Asking about sugar", turns:[
    {sp:"you", en:"What all do you put in this? Is there sugar in it?", hi:"Ismein kya-kya daalte hain? Ismein cheeni hai?", ta:"இதுல என்னென்ன போடுறீங்க? இதுல சர்க்கரை இருக்கா?"},
    {sp:"other", en:"Don't you want sugar at all?", hi:"Cheeni mat daaliye.", ta:"சர்க்கரை போடாதீங்க."}],
   key:[{hi:"kya-kya daalte hain?", en:"what all do you put in?"},{hi:"cheeni", en:"sugar"}]},
  {n:3, level:3, title:"Less ice, no sugar, packed", turns:[
    {sp:"you", en:"Put a little less ice too. Can you make it without sugar? Pack it, please.", hi:"Barf bhi thodi kam daaliye. Bina cheeni ke bana sakte hain? Pack kar dijiye.", ta:"பனிக்கட்டியும் கொஞ்சம் குறைவா போடுங்க. சர்க்கரை இல்லாம செய்ய முடியுமா? Pack பண்ணுங்க."}],
   key:[{hi:"bina cheeni ke", en:"without sugar"},{hi:"pack kar dijiye", en:"please pack it"}]}
]},

{id:"ls34", icon:"💭", title:"A Friend Thinking About a Career Change", otherRole:"Friend", convos:[
  {n:1, level:2, title:"Noticing something is wrong", turns:[
    {sp:"you", en:"You look worried. What happened?", hi:"Tum pareshaan lag rahi ho. Kya hua?", ta:"நீ கஷ்டப்பட்டா மாதிரி இருக்க. என்ன ஆச்சு?"},
    {sp:"other", en:"These days I'm thinking of changing my job.", hi:"Main aajkal job badalne ki soch rahi hoon.", ta:"நான் இப்போதெல்லாம் job மாத்தனும்னு நினைக்கிறேன்."}],
   key:[{hi:"pareshaan lag rahi ho", en:"look worried"},{hi:"job badalne ki soch rahi hoon", en:"am thinking of changing job"}]},
  {n:2, level:2, title:"Wanting to try something new", turns:[
    {sp:"you", en:"Really? Why?", hi:"Achha? Kyun?", ta:"ஆமாவா? ஏன்?"},
    {sp:"other", en:"I feel like I should try something new.", hi:"Mujhe lag raha hai ki mujhe kuch naya try karna chahiye.", ta:"எனக்கு ஏதோ புதுசா ஒன்னு try பண்ணனும் போல இருக்கு."}],
   key:[{hi:"kuch naya try karna chahiye", en:"should try something new"}]},
  {n:3, level:3, title:"Offering support", turns:[
    {sp:"you", en:"Whatever feels right to you, do that — I'll support you.", hi:"Tumhe jo sahi lagta hai wahi karo, main tumhara saath doonga.", ta:"உனக்கு எது சரியா தோணுதோ அதை செய், நான் உன் கூட இருக்கேன்."},
    {sp:"other", en:"Thank you — that means a lot.", hi:"Dhanyavaad, ye sunke bahut achha laga.", ta:"நன்றி, இது கேட்டு ரொம்ப சந்தோஷம்."}],
   key:[{hi:"tumhara saath doonga", en:"I'll support you"}]},
  /* 2 more convos (n:4-5), from a class session's own handwritten dialogues about work
     pressure and a stressful daily commute — kept in this scenario since they're the same
     "friend noticing job/work stress" register as convos 1-3. */
  {n:4, level:3, title:"Talking about work pressure", turns:[
    {sp:"you", en:"But how's work?", hi:"Lekin kaam kaisa hai?", ta:"ஆனா வேலை எப்படி இருக்கு?"},
    {sp:"other", en:"The pressure of work is breaking my back.", hi:"Kaam ka pressure kamar thod raha hai.", ta:"வேலையோட pressure என் முதுகை முறிச்சிடுது."},
    {sp:"you", en:"The company takes ten times what it gives, doesn't it?", hi:"Company jitna deti hai, uska das gunaa leti hai na.", ta:"Company எவ்ளோ தருதோ, அதோட பத்து மடங்கு எடுத்துக்குது இல்லையா."}],
   key:[{hi:"kamar thod raha hai", en:"is breaking my back (figurative)"},{hi:"das gunaa", en:"ten times"}]},
  {n:5, level:3, title:"A stressful daily commute", turns:[
    {sp:"you", en:"What happened? Any trouble?", hi:"Kya hua? Koi pareshani?", ta:"என்ன ஆச்சு? ஏதாவது பிரச்சனையா?"},
    {sp:"other", en:"My office is fifteen km far from home. Traveling every single day gives me a headache. That too, by bus.", hi:"Mera office ghar se pandhra km door hai. Roz-roz safar karne mein sirdard ho jaata hai. Woh bhi bus se.", ta:"என் office வீட்டுலேர்ந்து பதினஞ்சு கிலோமீட்டர் தூரம். தினம் தினம் பயணம் பண்ணுறதுல தலைவலி வந்துடுது. அதுவும் bus-ல."}],
   key:[{hi:"pandhra km door", en:"fifteen km far"},{hi:"safar karne mein sirdard ho jaata hai", en:"traveling gives (me) a headache"}]}
]},

/* ls35–ls39: 5 more scenarios (50 conversations) added at the user's request, in the
   natural-spoken-Hindi style of talking ABOUT a third person (gossip/complaint/speculation
   patterns: jab bhi, har baar, woh hamesha, woh kabhi... nahi, kehti rehti hai ki, mujhe
   lagta hai ki, shaayad, pata nahi) that a second shared write-up walked through. All
   Tamil translations here are original (the source gave only Hindi + English). */
{id:"ls35", icon:"😤", title:"Complaining About a Friend's Habits", otherRole:"Friend", convos:[
  {n:1, level:2, title:"Always late", turns:[
    {sp:"you", en:"She always comes late.", hi:"Woh hamesha der se aati hai.", ta:"அவள் எப்பவுமே தாமதமா வரும்."},
    {sp:"other", en:"Yeah, I know — watch, it'll happen today too.", hi:"Haan, mujhe pata hai, aaj bhi dekhna.", ta:"ஆமா, எனக்குத் தெரியும், இன்னிக்கும் பார்த்துக்கோ."}],
   key:[{hi:"hamesha", en:"always"}]},
  {n:2, level:2, title:"Making excuses every time", turns:[
    {sp:"you", en:"Every time, she makes some excuse or another.", hi:"Har baar woh koi na koi bahaana banaati hai.", ta:"ஒவ்வொரு தடவையும் அவள் ஏதோ ஒரு காரணம் சொல்லுவா."},
    {sp:"other", en:"True, I feel the same.", hi:"Sach mein, mujhe bhi yahi lagta hai.", ta:"உண்மைதான், எனக்கும் அப்படித்தான் தோணுது."}],
   key:[{hi:"bahaana banaana", en:"to make an excuse"}]},
  {n:3, level:3, title:"Sitting too long when she visits", turns:[
    {sp:"you", en:"Whenever she comes here, she sits for a long time.", hi:"Jab bhi woh yahaan aati hai, bahut der tak baithti hai.", ta:"அவள் இங்க வரும்போதெல்லாம், ரொம்ப நேரம் உக்காந்திருப்பா."},
    {sp:"other", en:"Yeah, yesterday too she sat for three hours.", hi:"Haan, kal bhi teen ghante baithi thi.", ta:"ஆமா, நேத்தும் மூணு மணி நேரம் உக்காந்திருந்தா."}],
   key:[{hi:"jab bhi", en:"whenever"}]},
  {n:4, level:2, title:"Finding fault with everything", turns:[
    {sp:"you", en:"She has a habit of finding fault with everything.", hi:"Use har cheez mein kami nikaalne ki aadat hai.", ta:"அவளுக்கு எல்லாத்துலையும் குறை கண்டுபிடிக்கிற பழக்கம் இருக்கு."},
    {sp:"other", en:"Yeah, whatever you do, she doesn't like it.", hi:"Haan, kuch bhi karo, usko pasand nahi aata.", ta:"ஆமா, என்ன பண்ணாலும், அவளுக்குப் பிடிக்காது."}],
   key:[{hi:"aadat hai", en:"has a habit"}]},
  {n:5, level:3, title:"Habit of asking for money", turns:[
    {sp:"you", en:"Whenever she comes, she wants money.", hi:"Use paise chahiye hote hain, jab bhi woh aati hai.", ta:"அவள் வரும்போதெல்லாம், அவளுக்கு காசு வேணும்."},
    {sp:"other", en:"I don't know, whenever she comes, she talks about money.", hi:"Pata nahi, jab bhi aati hai, paise ki baat karti hai.", ta:"தெரியாது, எப்போ வந்தாலும், காசைப் பத்தித்தான் பேசுவா."}],
   key:[{hi:"chahiye hote hain", en:"tends to need/want"}]},
  {n:6, level:3, title:"Never listens to advice", turns:[
    {sp:"you", en:"She doesn't listen to anyone.", hi:"Woh kisi ki baat nahi sunti.", ta:"அவள் யாரு சொன்னதையும் கேக்க மாட்டா."},
    {sp:"other", en:"Yeah, however many times we've explained, she still doesn't listen.", hi:"Haan, kitni baar samjhaya, phir bhi nahi sunti.", ta:"ஆமா, எவ்வளவு தடவை சொல்லியும், கேக்கவே மாட்டா."}],
   key:[{hi:"kisi ki baat nahi sunti", en:"doesn't listen to anyone"}]},
  {n:7, level:2, title:"Always talks about the same topic", turns:[
    {sp:"you", en:"She always talks about the same thing again and again.", hi:"Woh hamesha wahi baat baar-baar karti hai.", ta:"அவள் எப்பவுமே அதே விஷயத்தை திரும்பத் திரும்ப பேசுவா."},
    {sp:"other", en:"Yeah, I get bored hearing it too.", hi:"Haan, mujhe bhi bore ho jaata hai sunke.", ta:"ஆமா, எனக்கும் கேட்டுக் கேட்டு போர் அடிக்குது."}],
   key:[{hi:"baar-baar", en:"again and again"}]},
  {n:8, level:3, title:"Comes without calling first", turns:[
    {sp:"you", en:"She never comes without calling — but today she came without telling.", hi:"Woh kabhi phone kiye bina nahi aati — magar aaj bina bataaye aa gayi.", ta:"அவள் போன் பண்ணாம வராதவள் — ஆனா இன்னிக்கு சொல்லாம வந்துட்டா."},
    {sp:"other", en:"Really? Then there must be something going on.", hi:"Sach? Toh zaroor kuch baat hogi.", ta:"உண்மையா? அப்போ நிச்சயமா ஏதோ விஷயம் இருக்கும்."}],
   key:[{hi:"bina bataaye", en:"without telling"}]},
  {n:9, level:3, title:"Forgets promises", turns:[
    {sp:"you", en:"She makes a promise and then forgets it.", hi:"Woh vaada karke bhool jaati hai.", ta:"அவள் வாக்குறுதி கொடுத்துட்டு மறந்துடுவா."},
    {sp:"other", en:"Yeah, that's why I don't expect anything from her anymore.", hi:"Haan, isliye ab main usse koi umeed nahi rakhta.", ta:"ஆமா, அதனால இப்போ நான் அவள்மேல எதிர்பார்ப்பே வெச்சுக்கறதில்ல."}],
   key:[{hi:"vaada", en:"promise"}]},
  {n:10, level:4, title:"Changes plans at the last minute", turns:[
    {sp:"you", en:"She changes the plan at the last minute, every time.", hi:"Woh aakhri waqt mein plan badal deti hai, har baar.", ta:"அவள் கடைசி நேரத்துல plan-ஐ மாத்திடுவா, ஒவ்வொரு தடவையும்."},
    {sp:"other", en:"That's why I ask her beforehand now.", hi:"Isi liye main ab usse pehle se poochh leta hoon.", ta:"அதனால தான் நான் இப்போ அவளைக் கேட்டுட்டே முன்னாடியே plan பண்றேன்."}],
   key:[{hi:"aakhri waqt mein", en:"at the last minute"}]}
]},

{id:"ls36", icon:"❓", title:"Wondering Why Someone Does Something", otherRole:"Friend", convos:[
  {n:1, level:2, title:"Why does she ask for money every time?", turns:[
    {sp:"you", en:"Why does she ask for money every time?", hi:"Woh har baar paise kyun maangti hai?", ta:"அவள் ஏன் ஒவ்வொரு தடவையும் காசு கேட்குறா?"},
    {sp:"other", en:"I don't know, whenever she comes, she talks about money.", hi:"Pata nahi, jab bhi aati hai, paise ki baat karti hai.", ta:"தெரியாது, எப்போ வந்தாலும், காசைப் பத்தித்தான் பேசுவா."}],
   key:[{hi:"kyun", en:"why"}]},
  {n:2, level:2, title:"Why doesn't she come here nowadays?", turns:[
    {sp:"you", en:"Why doesn't she come here nowadays?", hi:"Woh aajkal yahaan kyun nahi aati?", ta:"அவள் இப்போதெல்லாம் ஏன் இங்க வரமாட்டேங்குறா?"},
    {sp:"other", en:"I don't know, maybe she's busy.", hi:"Pata nahi, shaayad woh vyast rehti hai.", ta:"தெரியாது, ஒரு வேளை அவள் busy-ஆ இருக்காளோ."}],
   key:[{hi:"aajkal", en:"nowadays"}]},
  {n:3, level:3, title:"Why is she always in a hurry?", turns:[
    {sp:"you", en:"Why is she always in a hurry?", hi:"Woh hamesha jaldi mein kyun rehti hai?", ta:"அவள் எப்பவுமே ஏன் அவசரமா இருக்கா?"},
    {sp:"other", en:"Maybe there's some work at home.", hi:"Shaayad uske ghar mein kuch kaam hoga.", ta:"ஒரு வேளை வீட்ல ஏதோ வேலை இருக்குமோ."}],
   key:[{hi:"jaldi mein", en:"in a hurry"}]},
  {n:4, level:3, title:"Why does he never answer calls?", turns:[
    {sp:"you", en:"Why does he never pick up the phone?", hi:"Woh kabhi phone kyun nahi uthaata?", ta:"அவன் ஏன் ஒரு நாளும் போனை எடுக்க மாட்டான்?"},
    {sp:"other", en:"I think he's busy at the office.", hi:"Mujhe lagta hai woh busy rehta hai office mein.", ta:"எனக்குத் தோணுது அவன் office-ல busy-ஆ இருப்பான்."}],
   key:[{hi:"kabhi... nahi", en:"never"}]},
  {n:5, level:3, title:"Why does she get angry over small things?", turns:[
    {sp:"you", en:"Why does she get angry over small things?", hi:"Woh chhoti-chhoti baaton par gussa kyun ho jaati hai?", ta:"அவளுக்கு சின்ன சின்ன விஷயத்துக்கே ஏன் கோபம் வருது?"},
    {sp:"other", en:"I don't know, maybe there's some trouble.", hi:"Pata nahi, shaayad kuch pareshaani hogi.", ta:"தெரியாது, ஒரு வேளை ஏதோ பிரச்சனை இருக்குமோ."}],
   key:[{hi:"chhoti-chhoti baaton par", en:"over small things"}]},
  {n:6, level:3, title:"Why does he always arrive without notice?", turns:[
    {sp:"you", en:"Why does he always come without telling?", hi:"Woh hamesha bina bataaye kyun aa jaata hai?", ta:"அவன் ஏன் எப்பவுமே சொல்லாம வந்துடுறான்?"},
    {sp:"other", en:"Maybe he feels he doesn't need to tell.", hi:"Shaayad usse lagta hai bataane ki zaroorat nahi.", ta:"ஒரு வேளை அவனுக்கு தோணுமோ சொல்ல வேணாம்னு."}],
   key:[{hi:"bina bataaye", en:"without telling"}]},
  {n:7, level:4, title:"Why doesn't she ever say thank you?", turns:[
    {sp:"you", en:"Why does she never say thank you?", hi:"Woh kabhi dhanyavaad kyun nahi kehti?", ta:"அவள் ஏன் ஒரு நாளும் நன்றி சொல்ல மாட்டா?"},
    {sp:"other", en:"I think she doesn't feel it's necessary.", hi:"Mujhe lagta hai use yeh sab zaroori nahi lagta.", ta:"எனக்குத் தோணுது அவளுக்கு இதெல்லாம் அவசியம் இல்லன்னு தோணும்."}],
   key:[{hi:"kabhi... nahi kehti", en:"never says"}]},
  {n:8, level:4, title:"Why does she talk differently in front of him?", turns:[
    {sp:"you", en:"Why does she talk one way to his face and another behind his back?", hi:"Woh uske saamne alag aur peechhe alag kyun baat karti hai?", ta:"அவள் ஏன் அவன் முன்னாடி வேற மாதிரியும் பின்னாடி வேற மாதிரியும் பேசுறா?"},
    {sp:"other", en:"That's her old habit, everyone knows.", hi:"Yeh uski purani aadat hai, sabko pata hai.", ta:"இது அவள் பழைய பழக்கம், எல்லாருக்கும் தெரியும்."}],
   key:[{hi:"saamne... peechhe", en:"to one's face... behind one's back"}]},
  {n:9, level:4, title:"Why does he always cancel plans?", turns:[
    {sp:"you", en:"Why does he always cancel plans at the last minute?", hi:"Woh hamesha aakhri waqt pe plan kyun cancel karta hai?", ta:"அவன் ஏன் எப்பவுமே கடைசி நேரத்துல plan-ஐ cancel பண்றான்?"},
    {sp:"other", en:"Maybe he doesn't trust himself.", hi:"Shaayad use bharosa nahi hota khud par.", ta:"ஒரு வேளை அவனுக்கு தன்மேல நம்பிக்கை இல்லையோ."}],
   key:[{hi:"aakhri waqt pe", en:"at the last minute"}]},
  {n:10, level:4, title:"Why does she avoid talking about it?", turns:[
    {sp:"you", en:"Why doesn't she talk about that matter?", hi:"Woh us baat ke baare mein kyun nahi bolti?", ta:"அவள் ஏன் அந்த விஷயத்தைப் பத்தி பேச மாட்டேங்குறா?"},
    {sp:"other", en:"I think it hurts her to remember it.", hi:"Mujhe lagta hai use dard hota hai yaad karke.", ta:"எனக்குத் தோணுது அவளுக்கு அதை நினைச்சா வலி இருக்குமோ."}],
   key:[{hi:"ke baare mein", en:"about"}]}
]},

{id:"ls37", icon:"🗣️", title:"Reporting What Someone Said", otherRole:"Friend", convos:[
  {n:1, level:2, title:"She said she'd come tomorrow", turns:[
    {sp:"you", en:"She said she would come tomorrow.", hi:"Usne kaha tha ki woh kal aayegi.", ta:"அவள் சொன்னா நாளைக்கு வருவேன்னு."},
    {sp:"other", en:"Let's see if she comes or not.", hi:"Dekhte hain, aati hai ya nahi.", ta:"பார்க்கலாம், வருவாளா இல்லையான்னு."}],
   key:[{hi:"kaha tha ki", en:"had said that"}]},
  {n:2, level:2, title:"She said she has no money", turns:[
    {sp:"you", en:"She was saying that she doesn't have money.", hi:"Woh keh rahi thi ki uske paas paise nahi hain.", ta:"அவள் சொல்லிக்கிட்டிருந்தா, அவள்கிட்ட காசு இல்லைன்னு."},
    {sp:"other", en:"She said the same thing last time too.", hi:"Pichli baar bhi yahi kaha tha usne.", ta:"முந்தைய தடவையும் இதே சொன்னா அவள்."}],
   key:[{hi:"keh rahi thi ki", en:"was saying that"}]},
  {n:3, level:3, title:"She told me she went out", turns:[
    {sp:"you", en:"She told me that she has gone out.", hi:"Usne mujhe bataaya ki woh baahar gayi hai.", ta:"அவள் என்கிட்ட சொன்னா, வெளியில போயிருக்கேன்னு."},
    {sp:"other", en:"Where did she go, did she say?", hi:"Kahan gayi, usne bataaya?", ta:"எங்க போனா, அவள் சொன்னாளா?"}],
   key:[{hi:"bataaya ki", en:"told that"}]},
  {n:4, level:3, title:"I don't know why she said that", turns:[
    {sp:"you", en:"I don't know why she said that.", hi:"Mujhe nahi pata usne aisa kyun kaha.", ta:"எனக்குத் தெரியாது அவள் ஏன் அப்படி சொன்னான்னு."},
    {sp:"other", en:"Maybe she got angry.", hi:"Shaayad use gussa aa gaya hoga.", ta:"ஒரு வேளை அவளுக்கு கோபம் வந்திருக்குமோ."}],
   key:[{hi:"mujhe nahi pata", en:"I don't know"}]},
  {n:5, level:3, title:"She keeps saying she has no time", turns:[
    {sp:"you", en:"She keeps saying that she doesn't have time.", hi:"Woh kehti rehti hai ki uske paas samay nahi hai.", ta:"அவள் சொல்லிக்கிட்டே இருக்கா, அவள்கிட்ட நேரம் இல்லைன்னு."},
    {sp:"other", en:"But she still finds time for other people.", hi:"Phir bhi auron ke liye waqt nikaal leti hai.", ta:"ஆனாலும் மத்தவங்களுக்கு நேரம் ஒதுக்குவா."}],
   key:[{hi:"kehti rehti hai ki", en:"keeps saying that"}]},
  {n:6, level:3, title:"He said he'd call back", turns:[
    {sp:"you", en:"He said he would call back.", hi:"Usne kaha tha ki woh phir call karega.", ta:"அவன் சொன்னான் திரும்பி call பண்றேன்னு."},
    {sp:"other", en:"The call still hasn't come.", hi:"Abhi tak call nahi aaya.", ta:"இன்னைக்கும் call வரவே இல்ல."}],
   key:[{hi:"phir call karega", en:"will call back"}]},
  {n:7, level:3, title:"He told everyone he was busy", turns:[
    {sp:"you", en:"He told everyone that he's very busy.", hi:"Usne sabko bataaya ki woh bahut busy hai.", ta:"அவன் எல்லாருக்கும் சொன்னான், ரொம்ப busy-ன்னு."},
    {sp:"other", en:"But we saw him out wandering around yesterday.", hi:"Lekin humne use kal ghoomte dekha.", ta:"ஆனா நேத்து அவன் சுத்துறதை நாங்க பார்த்தோம்."}],
   key:[{hi:"sabko bataaya ki", en:"told everyone that"}]},
  {n:8, level:4, title:"She said one thing and did another", turns:[
    {sp:"you", en:"She said one thing and did another.", hi:"Usne kaha kuch aur, aur kiya kuch aur.", ta:"அவள் சொன்னது வேற, செய்தது வேற."},
    {sp:"other", en:"That's why no one relies on her anymore.", hi:"Isi liye ab koi usse umeed nahi rakhta.", ta:"அதனால தான் இப்போ யாரும் அவள்மேல நம்பிக்கை வெச்சுக்கறதில்ல."}],
   key:[{hi:"kuch aur... kuch aur", en:"one thing... another thing"}]},
  {n:9, level:4, title:"He said he didn't know anything about it", turns:[
    {sp:"you", en:"He said that he doesn't know anything about this matter.", hi:"Usne kaha ki use is baare mein kuch nahi pata.", ta:"அவன் சொன்னான், இந்த விஷயம் பத்தி எனக்கு எதுவும் தெரியாதுன்னு."},
    {sp:"other", en:"I just can't believe what he says.", hi:"Mujhe toh yakeen nahi hota uski baat pe.", ta:"எனக்கு அவன் சொல்றதை நம்பவே முடியல."}],
   key:[{hi:"is baare mein kuch nahi pata", en:"doesn't know anything about this"}]},
  {n:10, level:4, title:"She told me not to tell anyone", turns:[
    {sp:"you", en:"She told me not to tell anyone.", hi:"Usne mujhse kaha ki kisi ko mat batana.", ta:"அவள் என்கிட்ட சொன்னா யாருக்கும் சொல்லாதேன்னு."},
    {sp:"other", en:"Then why are you telling me?", hi:"Toh phir tum mujhe kyun bata rahe ho?", ta:"அப்போ நீ ஏன் எனக்கு சொல்றே?"}],
   key:[{hi:"kisi ko mat batana", en:"don't tell anyone"}]}
]},

{id:"ls38", icon:"🙄", title:"Talking About Someone's Behaviour", otherRole:"Friend", convos:[
  {n:1, level:2, title:"She doesn't listen to anyone", turns:[
    {sp:"you", en:"She doesn't listen to anyone.", hi:"Woh kisi ki baat nahi sunti.", ta:"அவள் யாரு சொன்னதையும் கேக்க மாட்டா."},
    {sp:"other", en:"Yeah, she only does what she wants.", hi:"Haan, apni hi marzi karti hai.", ta:"ஆமா, அவளுக்கு பிடிச்சதைத்தான் செய்வா."}],
   key:[{hi:"apni marzi", en:"one's own will"}]},
  {n:2, level:3, title:"She wants things her way", turns:[
    {sp:"you", en:"She wants to have things her way.", hi:"Woh apni baat manwaana chahti hai.", ta:"அவளுக்கு தன் பேச்சை எல்லாரும் கேக்கணும்னு வேணும்."},
    {sp:"other", en:"That's why it's hard to work with her.", hi:"Isi liye uske saath kaam karna mushkil hai.", ta:"அதனால தான் அவளோட வேலை செய்யறது கஷ்டம்."}],
   key:[{hi:"manwaana chahti hai", en:"wants (people) to agree with her"}]},
  {n:3, level:2, title:"She gets angry over small things", turns:[
    {sp:"you", en:"She gets angry over small things.", hi:"Woh chhoti-chhoti baaton par gussa ho jaati hai.", ta:"அவளுக்கு சின்ன சின்ன விஷயத்துக்கே கோபம் வருது."},
    {sp:"other", en:"Yeah, that's why everyone talks to her carefully.", hi:"Haan, isliye sab usse dar ke baat karte hain.", ta:"ஆமா, அதனால தான் எல்லாரும் பயந்து பேசுவாங்க அவளோட."}],
   key:[{hi:"gussa ho jaati hai", en:"gets angry"}]},
  {n:4, level:4, title:"Two-faced behavior", turns:[
    {sp:"you", en:"She says one thing to someone's face and another behind their back.", hi:"Woh saamne kuch aur bolti hai aur peechhe kuch aur.", ta:"அவள் முன்னாடி ஒன்னு பேசுவா, பின்னாடி வேறொன்னு பேசுவா."},
    {sp:"other", en:"Yeah, I don't like that either.", hi:"Haan, mujhe bhi yeh baat pasand nahi.", ta:"ஆமா, எனக்கும் இது பிடிக்காது."}],
   key:[{hi:"saamne... peechhe", en:"to the face... behind the back"}]},
  {n:5, level:4, title:"Does things deliberately", turns:[
    {sp:"you", en:"She does that deliberately.", hi:"Woh jaanboojhkar aisa karti hai.", ta:"அவள் வேணும்னே அப்படி செய்வா."},
    {sp:"other", en:"Yeah, not by mistake — she knows exactly what she's doing.", hi:"Haan, galti se nahi, usse theek pata hota hai.", ta:"ஆமா, தப்பா இல்ல, அவளுக்கு நல்லா தெரியும்."}],
   key:[{hi:"jaanboojhkar", en:"deliberately"}]},
  {n:6, level:4, title:"Left without telling anyone", turns:[
    {sp:"you", en:"She left without telling anyone.", hi:"Woh bina bataaye chali gayi.", ta:"அவள் யாருக்கும் சொல்லாம போயிட்டா."},
    {sp:"other", en:"We found out only much later.", hi:"Hamein toh bahut der baad pata chala.", ta:"எங்களுக்கு ரொம்ப நேரம் கழித்துதான் தெரிஞ்சது."}],
   key:[{hi:"bina bataaye", en:"without telling"}]},
  {n:7, level:4, title:"Never admits mistakes", turns:[
    {sp:"you", en:"She never admits her own mistake.", hi:"Woh kabhi apni galti nahi maanti.", ta:"அவள் ஒரு நாளும் தன் தப்பை ஒத்துக்க மாட்டா."},
    {sp:"other", en:"Yeah, she always blames others instead.", hi:"Haan, hamesha doosron ko hi zimmedar thehraati hai.", ta:"ஆமா, எப்பவும் மத்தவங்களையே குற்றம் சொல்லுவா."}],
   key:[{hi:"galti nahi maanti", en:"doesn't admit the mistake"}]},
  {n:8, level:4, title:"Always blames others", turns:[
    {sp:"you", en:"She always blames others.", hi:"Woh hamesha doosron ko zimmedar thehraati hai.", ta:"அவள் எப்பவும் மத்தவங்களையே குற்றம் சொல்லுவா."},
    {sp:"other", en:"Yeah, she never looks at her own mistake.", hi:"Haan, apni galti kabhi nahi dekhti.", ta:"ஆமா, தன் தப்பை ஒரு நாளும் பார்க்க மாட்டா."}],
   key:[{hi:"zimmedar thehraana", en:"to blame"}]},
  {n:9, level:4, title:"Talks behind people's backs", turns:[
    {sp:"you", en:"She talks about everyone behind their backs.", hi:"Woh sabke peechhe baat karti hai.", ta:"அவள் எல்லாரையும் பின்னாடி பேசுவா."},
    {sp:"other", en:"That's why people now keep their distance from her.", hi:"Isi liye log usse ab door rehte hain.", ta:"அதனால தான் எல்லாரும் இப்போ அவளை தள்ளி இருப்பாங்க."}],
   key:[{hi:"peechhe baat karna", en:"to talk behind someone's back"}]},
  {n:10, level:4, title:"Never keeps promises", turns:[
    {sp:"you", en:"She never keeps her promise.", hi:"Woh kabhi apna vaada nahi rakhti.", ta:"அவள் ஒரு நாளும் தன் வாக்குறுதியை காப்பாத்த மாட்டா."},
    {sp:"other", en:"That's why no one expects anything from her anymore.", hi:"Isi liye ab koi usse umeed nahi rakhta.", ta:"அதனால தான் இப்போ யாரும் அவள்மேல நம்பிக்கை வெச்சுக்கறதில்ல."}],
   key:[{hi:"vaada nahi rakhti", en:"doesn't keep the promise"}]}
]},

{id:"ls39", icon:"🤔", title:"Guessing and Wondering About Someone", otherRole:"Friend", convos:[
  {n:1, level:2, title:"Maybe she's at home", turns:[
    {sp:"you", en:"I don't know where she is.", hi:"Woh kahan hai, pata nahi.", ta:"அவள் எங்க இருக்காளோ, தெரியாது."},
    {sp:"other", en:"Maybe she's at home.", hi:"Shaayad woh ghar par hai.", ta:"ஒரு வேளை அவள் வீட்ல இருப்பாளோ."}],
   key:[{hi:"shaayad", en:"maybe"}]},
  {n:2, level:2, title:"I don't know where she went", turns:[
    {sp:"you", en:"I don't know where she went.", hi:"Pata nahi woh kahaan gayi.", ta:"தெரியாது அவள் எங்க போனான்னு."},
    {sp:"other", en:"Maybe she went to the market.", hi:"Shaayad market gayi hogi.", ta:"ஒரு வேளை market போயிருப்பாளோ."}],
   key:[{hi:"pata nahi", en:"I don't know"}]},
  {n:3, level:3, title:"I think she's upset", turns:[
    {sp:"you", en:"I think she's upset.", hi:"Mujhe lagta hai ki woh naaraaz hai.", ta:"எனக்குத் தோணுது அவள் கோபமா இருக்காள்னு."},
    {sp:"other", en:"Yeah, I feel the same.", hi:"Haan, mujhe bhi aisa hi lag raha hai.", ta:"ஆமா, எனக்கும் அப்படித்தான் தோணுது."}],
   key:[{hi:"mujhe lagta hai ki", en:"I think that"}]},
  {n:4, level:3, title:"Maybe he forgot", turns:[
    {sp:"you", en:"Maybe he forgot.", hi:"Shaayad woh bhool gaya.", ta:"ஒரு வேளை அவன் மறந்திருப்பானோ."},
    {sp:"other", en:"Could be, remind him.", hi:"Ho sakta hai, usse yaad dila do.", ta:"ஆகலாம், அவனுக்கு ஞாபகப்படுத்திடு."}],
   key:[{hi:"bhool gaya", en:"forgot"}]},
  {n:5, level:3, title:"I don't know why he's not answering", turns:[
    {sp:"you", en:"I don't know why he's not picking up the phone.", hi:"Pata nahi woh phone kyun nahi utha raha.", ta:"தெரியாது அவன் ஏன் போன் எடுக்க மாட்டேங்குறான்னு."},
    {sp:"other", en:"Maybe there's no network there.", hi:"Shaayad network nahi hoga wahan.", ta:"ஒரு வேளை அங்க network இல்லையோ."}],
   key:[{hi:"phone utha raha", en:"picking up the phone"}]},
  {n:6, level:3, title:"Maybe she's busy", turns:[
    {sp:"you", en:"Why doesn't she come here these days?", hi:"Woh aajkal yahaan kyun nahi aati?", ta:"அவள் இப்போதெல்லாம் ஏன் இங்க வரமாட்டேங்குறா?"},
    {sp:"other", en:"I don't know, maybe she's busy.", hi:"Pata nahi, shaayad woh vyast rehti hai.", ta:"தெரியாது, ஒரு வேளை busy-ஆ இருக்காளோ."}],
   key:[{hi:"vyast rehti hai", en:"stays busy"}]},
  {n:7, level:4, title:"I think she's lying", turns:[
    {sp:"you", en:"I think she's not telling the truth.", hi:"Mujhe lagta hai woh sach nahi bol rahi.", ta:"எனக்குத் தோணுது அவள் உண்மை சொல்லல்லன்னு."},
    {sp:"other", en:"Maybe, but we can't say anything without proof.", hi:"Shaayad, lekin saboot ke bina kuch nahi kaha ja sakta.", ta:"ஒரு வேளை, ஆனா ஆதாரம் இல்லாம எதையும் சொல்ல முடியாது."}],
   key:[{hi:"sach nahi bol rahi", en:"isn't telling the truth"}]},
  {n:8, level:4, title:"Maybe he's angry with us", turns:[
    {sp:"you", en:"Maybe he's upset with us.", hi:"Shaayad woh humse naaraaz hai.", ta:"ஒரு வேளை அவன் எங்களோட கோபமா இருக்காரோ."},
    {sp:"other", en:"Why, what did we do?", hi:"Kyun, humne kya kiya?", ta:"ஏன், நாங்க என்ன செஞ்சோம்?"}],
   key:[{hi:"humse naaraaz", en:"upset with us"}]},
  {n:9, level:4, title:"I don't know what happened to her", turns:[
    {sp:"you", en:"I don't know what happened to her.", hi:"Mujhe nahi pata usse kya hua.", ta:"எனக்குத் தெரியாது அவளுக்கு என்ன ஆச்சுன்னு."},
    {sp:"other", en:"Come on, let's call and ask her.", hi:"Chalo, usse call karke poochh lete hain.", ta:"சரி, அவளை call பண்ணி கேட்டுடலாம்."}],
   key:[{hi:"kya hua", en:"what happened"}]},
  {n:10, level:4, title:"Maybe she'll come later", turns:[
    {sp:"you", en:"She hasn't come yet, but maybe she'll come later.", hi:"Abhi toh nahi aayi, lekin shaayad baad mein aa jaaye.", ta:"இப்போ வரவேயில்ல, ஆனா ஒரு வேளை பிறகு வரலாம்."},
    {sp:"other", en:"Okay, let's wait a bit.", hi:"Theek hai, hum thoda intezaar kar lete hain.", ta:"சரி, நாங்க கொஞ்சம் காத்துருப்போம்."}],
   key:[{hi:"baad mein aa jaaye", en:"might come later"}]}
]},
/* ls40 — from a real conversation at a kids' trampoline/soft-play park (a parent asking
   staff to fix a safety issue, then sliding into friendly small talk) — Version 41 */
{id:"ls40", icon:"🤸", title:"Trampoline Park / Soft-Play Area", otherRole:"Staff", convos:[
  {n:1, level:3, title:"Asking staff to fix the ball pit", turns:[
    {sp:"you", en:"The balls over there aren't covering the whole floor. Please spread them out a bit more.", hi:"Wahan jo balls hain, woh poora floor cover nahi kar rahi hain. Thoda aur phaila dijiye.", ta:"அங்கே இருக்கிற balls முழு floor-ஐ cover பண்ணல. கொஞ்சம் இன்னும் spread பண்ணி விடுங்க."},
    {sp:"other", en:"Sure, I'll do it right now.", hi:"Theek hai, abhi karti hoon.", ta:"சரி, இப்போவே பண்றேன்."},
    {sp:"you", en:"Children might fall while playing, so please spread them a bit more.", hi:"Bachche khelte waqt gir sakte hain, isliye thoda aur phaila dijiye.", ta:"பிள்ளைங்க விளையாடும்போது விழலாம், அதனால இன்னும் கொஞ்சம் spread பண்ணுங்க."},
    {sp:"other", en:"Yes, of course, don't worry.", hi:"Haan bilkul, chinta mat kijiye.", ta:"சரி நிச்சயமா, கவலைப்படாதீங்க."}],
   key:[{hi:"phaila dijiye", en:"please spread it out"},{hi:"gir sakte hain", en:"might fall"}]},
  {n:2, level:2, title:"Closing the request, then friendly small talk", turns:[
    {sp:"you", en:"Yes, okay. Thank you.", hi:"Haan, theek hai. Dhanyavaad.", ta:"சரி, நன்றி."},
    {sp:"other", en:"No problem!", hi:"Koi baat nahi!", ta:"பரவாயில்ல!"},
    {sp:"you", en:"Does your daughter also play here?", hi:"Aapki beti bhi yahan khelti hai?", ta:"உங்க மகளும் இங்க விளையாடுவாளா?"},
    {sp:"other", en:"Yes, she comes here too.", hi:"Haan, woh bhi yahan aati hai.", ta:"ஆமா, அவளும் இங்க வருவாள்."},
    {sp:"you", en:"How old is she?", hi:"Kitne saal ki hai?", ta:"எத்தனை வயசு?"},
    {sp:"other", en:"She's five years old.", hi:"Woh paanch saal ki hai.", ta:"அவளுக்கு ஐஞ்சு வயசு."},
    {sp:"you", en:"Does she like the trampoline too?", hi:"Usko bhi trampoline pasand hai?", ta:"அவளுக்கும் trampoline பிடிக்குமா?"},
    {sp:"other", en:"Yes, she likes it a lot!", hi:"Haan, usko bahut pasand hai!", ta:"ஆமா, அவளுக்கு ரொம்ப பிடிக்கும்!"}],
   key:[{hi:"Kitne saal ki hai?", en:"How old is she?"},{hi:"bahut pasand hai", en:"likes it a lot"}]},
  {n:3, level:3, title:"Pointing out another small safety issue", turns:[
    {sp:"you", en:"This table's corner is a bit sharp. Children might get hurt.", hi:"Yeh table ka corner thoda sharp hai. Bachchon ko chot lag sakti hai.", ta:"இந்த table-ஓட corner கொஞ்சம் sharp-ஆ இருக்கு. பிள்ளைங்களுக்கு அடி படலாம்."},
    {sp:"other", en:"Yes, we'll get it covered.", hi:"Haan, hum isko cover kar denge.", ta:"சரி, நாங்க இதை cover பண்ணிடுறோம்."},
    {sp:"you", en:"Thank you, that would be great.", hi:"Dhanyavaad, bahut accha hoga.", ta:"நன்றி, ரொம்ப நல்லா இருக்கும்."}],
   key:[{hi:"chot lag sakti hai", en:"might get hurt"}]}
]}
];
if (typeof module !== "undefined") module.exports = { LIFE_SCENARIOS };
