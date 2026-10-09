// Exceptions & irregular forms — from class notes (past tense stems, polite-imperative
// exceptions, future-tense stems) plus the "-wala/-wali/-wale" occupation suffix.
// Most Hindi verbs follow a regular pattern for a given tense; these are the common verbs
// that DON'T, and are worth memorizing separately.

const EXCEPTIONS_TABLE = [
  // ---- Simple past (perfective): regular pattern is root + aa/ii/e ----
  {tense:"Simple past", regularPattern:"Root + aa / ii / e", verb:"dekhna (see) — regular, for comparison",
   m:"Dekha", f:"Dekhi", pl:"Dekhe", note:"Regular verbs just add aa/ii/e to the root."},
  {tense:"Simple past", regularPattern:"Root + aa / ii / e", verb:"jaana (go)",
   m:"Gaya", f:"Gayi", pl:"Gaye", note:"EXCEPTION: stem changes completely to 'ga-', not 'jaaya'."},
  {tense:"Simple past", regularPattern:"Root + aa / ii / e", verb:"lena (take)",
   m:"Liya", f:"Li", pl:"Liye", note:"EXCEPTION: stem shortens to 'li-', not 'leya'."},
  {tense:"Simple past", regularPattern:"Root + aa / ii / e", verb:"dena (give)",
   m:"Diya", f:"Di", pl:"Diye", note:"EXCEPTION: stem shortens to 'di-', not 'deya'."},
  {tense:"Simple past", regularPattern:"Root + aa / ii / e", verb:"karna (do)",
   m:"Kiya", f:"Ki", pl:"Kiye", note:"EXCEPTION: stem changes to 'ki-', not 'karaa'."},
  {tense:"Simple past", regularPattern:"Root + aa / ii / e", verb:"hona (be / happen)",
   m:"Hua", f:"Hui", pl:"Hue", note:"EXCEPTION: irregular stem, not 'hoya'."},

  // ---- Polite imperative (aap form): regular pattern is root + iye ----
  {tense:"Polite imperative (aap)", regularPattern:"Root + iye", verb:"dekhna (see) — regular, for comparison",
   m:"Dekhiye", f:"Dekhiye", pl:"Dekhiye", note:"Regular verbs just add -iye to the root."},
  {tense:"Polite imperative (aap)", regularPattern:"Root + iye", verb:"karna (do)",
   m:"Kijiye", f:"Kijiye", pl:"Kijiye", note:"EXCEPTION: not 'kariye' — irregular polite form."},
  {tense:"Polite imperative (aap)", regularPattern:"Root + iye", verb:"lena (take)",
   m:"Lijiye", f:"Lijiye", pl:"Lijiye", note:"EXCEPTION: not 'leiye'."},
  {tense:"Polite imperative (aap)", regularPattern:"Root + iye", verb:"dena (give)",
   m:"Dijiye", f:"Dijiye", pl:"Dijiye", note:"EXCEPTION: not 'deiye'."},
  {tense:"Polite imperative (aap)", regularPattern:"Root + iye", verb:"peena (drink)",
   m:"Peejiye", f:"Peejiye", pl:"Peejiye", note:"EXCEPTION: not 'peeiye' — vowel-ending root doubles."},
  {tense:"Polite imperative (aap)", regularPattern:"Root + iye", verb:"hona (be)",
   m:"Hoiye", f:"Hoiye", pl:"Hoiye", note:"Mildly irregular — used rarely, mostly in set phrases."},

  // ---- Future tense: regular pattern is root + oonga/oongi (main), root + ega/egi (woh) ----
  {tense:"Future", regularPattern:"Root + oonga/oongi (main) · ega/egi (woh)", verb:"dekhna (see) — regular, for comparison",
   m:"Dekhoonga → Dekhega", f:"Dekhoongi → Dekhegi", pl:"Dekhenge/Dekhengi", note:"Regular pattern."},
  {tense:"Future", regularPattern:"Root + oonga/oongi (main) · ega/egi (woh)", verb:"lena (take)",
   m:"Loonga → Lega", f:"Loongi → Legi", pl:"Lenge/Lengi", note:"EXCEPTION: not 'leunga' — vowel doubles into 'oo'."},
  {tense:"Future", regularPattern:"Root + oonga/oongi (main) · ega/egi (woh)", verb:"dena (give)",
   m:"Doonga → Dega", f:"Doongi → Degi", pl:"Denge/Dengi", note:"EXCEPTION: not 'deunga' — same doubling as lena."},
  {tense:"Future", regularPattern:"Root + oonga/oongi (main) · ega/egi (woh)", verb:"hona (be)",
   m:"Hoonga → Hoga", f:"Hoongi → Hogi", pl:"Honge/Hongi", note:"EXCEPTION: irregular 'ho-' stem."},
  {tense:"Future", regularPattern:"Root + oonga/oongi (main) · ega/egi (woh)", verb:"jaana (go)",
   m:"Jaunga → Jayega", f:"Jaungi → Jayegi", pl:"Jayenge/Jayengi", note:"Mostly regular, but spelled 'jaunga' (one 'a'), not 'jaaunga'."},
  {tense:"Future", regularPattern:"Root + oonga/oongi (main) · ega/egi (woh)", verb:"karna (do)",
   m:"Karoonga → Karega", f:"Karoongi → Karegi", pl:"Karenge/Karengi", note:"Regular in future (unlike its past and imperative forms)."},
];

// The "-wala / -wali / -wale" suffix: not a tense at all, but a very common and easily
// confused pattern — it turns a noun (or a verb's -ne form) into "the person who does/sells/
// is about to do X". Gender/number agree with who is being described.
const WALA_SUFFIX = [
  {formula:"Noun + wala (m) / wali (f) / wale (pl./respect)", use:"Occupation — 'the person who deals in X'",
   examples:"Dukaanwala = shopkeeper · Chaiwala = tea-seller · Doodhwala = milkman · Sabziwali = (female) vegetable seller"},
  {formula:"Verb-ne + wala/wali/wale", use:"'About to do X' / 'the one who does X'",
   examples:"Aane wala hoon = I am about to come · Jaane wali hai = she is about to go · Padhne wala bachcha = the child who studies"},
];

if (typeof module !== "undefined") module.exports = { EXCEPTIONS_TABLE, WALA_SUFFIX };
