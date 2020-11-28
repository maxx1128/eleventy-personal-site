const version         = 'V1.08',
      staticCacheName = `${version}staticfiles`;

addEventListener('install', installEvent => {
  skipWaiting();
  installEvent.waitUntil(
    caches.open(staticCacheName)
      .then(staticCache => {
        // Nice to Cache
        staticCache.addAll([
          'about/index.html',
          '404.html',
          'index.html',
          'notes/index.html',
          'now/index.html',
          'writing/index.html',
          '/assets/images/global/profile.jpg'
        ]);

        // Need to Cache
        return staticCache.addAll([
          '/assets/images/global/header-default.jpg',
          '/assets/images/global/header-dark.jpg',
          '/assets/css/main.css',
          '/assets/js/main.js'
        ]);
      })
  );
});

// For clearing out old caches
addEventListener('activate', activateEvent => {
  activateEvent.waitUntil(
    // Clean the old caches up
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== staticCacheName) {
              // Time to kill!
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => clients.claim())
  );
});

addEventListener('fetch', fetchEvent => {
  const request = fetchEvent.request;
  fetchEvent.respondWith(
    caches.match(request)
      .then(responseFromCache => {
        return responseFromCache || fetch(request);
      })
  );
});
