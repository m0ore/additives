const cacheName = 'additive-checker-cache-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/styles/styles.css',
    '/scripts/app.js',
    '/additives.csv',
    // '/icons/icon-192x192.png',
    // '/icons/icon-512x512.png'
];

// Install Service Worker and cache files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
    );
});

// Fetch resources from cache or network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
