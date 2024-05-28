const cacheName = "jonathontoon-1.1.3";

self.addEventListener("install", function (event) {
    event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll([
        "./",
        "./index.html",
        "./bundle.min.js",
        "./bundle.min.css",
        "./browserconfig.xml",
        "./humans.txt",
        "./images/favicon-16.png",
        "./images/favicon-32.png",
        "./images/favicon-48.png",
        "./images/favicon-57.png",
        "./images/favicon-72.png",
        "./images/favicon-76.png",
        "./images/favicon-96.png",
        "./images/favicon-120.png",
        "./images/favicon-128.png",
        "./images/favicon-144.png",
        "./images/favicon-152.png",
        "./images/favicon-167.png",
        "./images/favicon-180.png",
        "./images/favicon-192.png",
        "./images/favicon-192-maskable.png",
        "./images/favicon-228.png",
        "./images/favicon-384.png",
        "./images/favicon-512.png",
        "./images/favicon-512-maskable.png",
        "./images/favicon.ico"
      ]).then(function () { self.skipWaiting(); });
    })
  );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.open(cacheName)
        .then(function (cache) { return cache.match(event.request, { ignoreSearch: true }); })
        .then(function (response) { return response || fetch(event.request); })
    );
});
