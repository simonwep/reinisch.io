// eslint-disable @typescript-eslint/no-misused-promises
// See https://github.com/Microsoft/TypeScript/issues/11781
declare let self: ServiceWorkerGlobalScope;
export {};

const CACHE_NAME = 'cache-v1';
self.addEventListener('install', event => {

    // Ensure that the service worker gets updated immediately for all (active) clients
    event.waitUntil(async () => {
        await self.skipWaiting();
        await self.clients.claim();
    });

    // Clear caches
    void caches.keys().then(
        cacheNames => Promise.all(cacheNames.map(name => caches.delete(name)))
    );
});

self.addEventListener('fetch', ev => {

    // Let the browser to its own thing for non-get requests
    if (ev.request.method !== 'GET' ||
        process.env.NODE_ENV === 'development') {
        return;
    }

    ev.respondWith(Promise.resolve().then(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(ev.request);

        // Found cached response
        if (cachedResponse) {
            ev.waitUntil(cache.add(ev.request));
            return cachedResponse;
        }

        // Not cached yet
        return fetch(ev.request);
    }));
});
