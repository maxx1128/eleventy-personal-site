const version         = 'V1.15',
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
          'writing/index.html'
        ]);

        // Need to Cache
        return staticCache.addAll([
          '/assets/type/work-sans/WorkSans-Light.otf',
          '/assets/type/work-sans/WorkSans-Medium.otf',
          '/assets/type/work-sans/WorkSans-LightItalic.otf',
          '/assets/type/aller/Aller_Bd.ttf',
          '/assets/images/global/header-default.jpg',
          '/assets/images/global/header-dark.jpg',
          '/assets/images/global/favicon.ico',
          '/assets/images/global/profile.jpg',
          '/assets/images/icons/192.png',
          '/assets/images/icons/512.png',
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
