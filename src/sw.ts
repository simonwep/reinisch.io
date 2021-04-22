// eslint-disable @typescript-eslint/no-misused-promises
// See https://github.com/Microsoft/TypeScript/issues/11781
declare let self: ServiceWorkerGlobalScope & {
    __WB_MANIFEST: {revision: string; url: string;}[];
};

const CACHE_NAME = `cache-${env.BUILD_TIME}`;
const PRECACHE_URLS = self.__WB_MANIFEST.map(v => v.url);

self.addEventListener('install', event => {

    // Ensure that the service worker gets updated immediately for all (active) clients
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(PRECACHE_URLS);
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', event => {
    event.waitUntil((async () => {

        // Clear caches
        await caches.keys()
            .then(names =>
                Promise.all(
                    names
                        .filter(name => name !== CACHE_NAME) // Keep current cache
                        .map(name => caches.delete(name))
                )
            );

        // Claim clients
        await self.clients.claim();
    })());
});

self.addEventListener('fetch', ev => {

    // Let the browser to its own thing for non-get requests or
    // the request is cross-origin, ignore that as well.
    if (
        ev.request.method !== 'GET' ||
        !ev.request.url.startsWith(self.location.origin) ||
        env.NODE_ENV === 'development'
    ) {
        return;
    }

    ev.respondWith(
        Promise.resolve().then(async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(ev.request);

            // Return cached response
            if (cachedResponse) {
                return cachedResponse.clone();
            }

            // TODO: Failed to fetch error?
            return fetch(ev.request).then(async res => {
                await cache.put(ev.request, res.clone());
                return res;
            }).catch(() => {
                return fetch('/');
            });
        })
    );
});

export {};
