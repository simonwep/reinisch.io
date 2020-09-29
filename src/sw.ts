// eslint-disable @typescript-eslint/no-misused-promises
// See https://github.com/Microsoft/TypeScript/issues/11781
declare let self: ServiceWorkerGlobalScope;
export {};

const CACHE_NAME = `cache-${env.BUILD_TIME}`;
self.addEventListener('install', event => {

    // Ensure that the service worker gets updated immediately for all (active) clients
    event.waitUntil(async () => {
        await self.skipWaiting();
        await self.clients.claim();
    });
});

self.addEventListener('activate', event => {

    // Clear caches
    event.waitUntil(
        caches.keys()
            .then(names => Promise.all(names.map(name => caches.delete(name))))
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

        // Return cached response
        if (cachedResponse) {
            return cachedResponse.clone();
        }

        const response = await fetch(ev.request);
        await cache.put(ev.request, response.clone());
        return response;
    }));
});
