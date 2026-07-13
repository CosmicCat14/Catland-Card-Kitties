const CACHE_NAME = 'offline';
const OFFLINE_PAGE = 'index.html';

// Install: Cache the offline page
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.add(OFFLINE_PAGE);
        })
    );
});

// Fetch: Serve cached page if network fails
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(OFFLINE_PAGE);
        })
    );
});   