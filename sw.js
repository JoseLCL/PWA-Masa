
// sw.js

self.addEventListener('install', event => {
  event.waitUntil(
      caches.open('conversor-cache')
          .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});