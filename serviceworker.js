const version = "V3.02",
  staticCacheName = `${version}staticfiles`;

addEventListener("install", (installEvent) => {
  skipWaiting();
  installEvent.waitUntil(
    caches.open(staticCacheName).then((staticCache) => {
      // Nice to Cache
      staticCache.addAll([
        "404.html",
        "index.html",
        "about/index.html",
        "portfolio/index.html",
        "blog/index.html",
        "contact/index.html",
        "/assets/images/global/favicon.ico",
        "/assets/images/global/profile-2.jpg",
        "/assets/images/icons/icon-192.png",
        "/assets/images/icons/icon-512.png",
      ]);

      // Need to Cache
      return staticCache.addAll([
        "/assets/css/main.css",
        "/assets/javascript/main.js",
      ]);
    })
  );
});

// For clearing out old caches
addEventListener("activate", (activateEvent) => {
  activateEvent.waitUntil(
    // Clean the old caches up
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
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

addEventListener("fetch", (fetchEvent) => {
  const request = fetchEvent.request;
  fetchEvent.respondWith(
    caches.match(request).then((responseFromCache) => {
      return responseFromCache || fetch(request);
    })
  );
});
