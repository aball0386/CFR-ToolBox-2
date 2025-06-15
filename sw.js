const CACHE_NAME = 'cfr-toolbox-cache-v2'; // update version on new releases
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './nhs.png',
  './secamb.png',
  './cfr_toolbox_icon_192.png',
  './cfr_toolbox_icon_512.png'
];

// Install service worker and cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate service worker and clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch handler: serve cached assets if available, else network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
