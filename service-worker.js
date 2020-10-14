const CACHE_NAME = "subbmissio2pwa";
const urlsToCache = [
    "/",
    "/manifest.json",
    "icon.png",
    "/nav.html",
    "/index.html",
    '/service-worker.js',
    "/pages/home.html",
    "/pages/match.html",
    "/pages/favorite.html",
    "/css/materialize.min.css",
    "/js/idb.js",
    "/js/materialize.min.js",
    "/js/init.js",
    "/js/main.js",
    "js/helper.js",
    "/js/component.js",
    "/js/connection.js",
    "/js/nav.js",
    "/js/api.js",
    "/js/route.js",
    "/js/db_operation.js",
]

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    const base_url = "https://api.football-data.org/"

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});