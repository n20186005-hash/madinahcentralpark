// Service Worker لدليل حديقة الملك فهد المركزية
// استراتيجية: ملاحة network-first مع بديل من الكاش، وأصول أخرى cache-first.
const VERSION = 'kfcp-cache-v1';
const PRECACHE = [
  '/',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/favicon-32.png',
  '/favicon-16.png',
  '/apple-touch-icon.png',
  '/logo.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/images/king-fahd-central-park-hero.jpg',
  '/images/king-fahd-central-park-evening.jpg',
  '/images/king-fahd-central-park-fountain.jpg',
  '/images/king-fahd-central-park-entrance.jpg',
  '/images/king-fahd-central-park-playground.jpg',
  '/images/king-fahd-central-park-walkway.jpg',
  '/privacy-policy/',
  '/terms/',
  '/cookie-settings/'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(VERSION)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(VERSION).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then((hit) => hit || caches.match('/'))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      (hit) =>
        hit ||
        fetch(request).then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
    )
  );
});
