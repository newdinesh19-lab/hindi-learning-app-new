/* Hindi Tutor — service worker
   Caches the app shell (HTML/CSS/JS/data/icons) so the app opens and works
   fully offline once it's been loaded once, and installs as a standalone app.
   Only same-origin GET requests are cached; cross-origin requests (Google
   Fonts, the Tutor tab's AI calls) always go straight to the network. */

const CACHE_NAME = "hindi-tutor-v7";

const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./data/sentences300.js",
  "./data/verbBank.js",
  "./data/tasksMaterial.js",
  "./data/grammarPatterns.js",
  "./data/genderTable.js",
  "./data/exceptionsTable.js",
  "./data/taskDecks.js",
  "./data/scenarios.js",
  "./data/lifeScenarios.js",
  "./data/extraVocab.js",
  "./data/compoundVerbs.js",
  "./data/sentenceFormulas.js",
  "./data/learningPath.js",
  "./data/similarWords.js",
  "./data/formulaLab.js",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-192.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
      .catch(() => {}) // never block install on one missing/odd asset
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // let cross-origin requests pass through untouched

  // stale-while-revalidate: serve from cache instantly, refresh cache in the background
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((resp) => {
          if (resp && resp.status === 200) {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return resp;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
