/// <reference lib="webworker" />
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute, setCatchHandler } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

// Skip waiting for new service worker and claim clients
self.skipWaiting()
self.clients.claim()

// 1. Runtime Caching Strategy for Pages (MPA)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new StaleWhileRevalidate({
    cacheName: 'pages-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 50, // Keep last 50 visited pages
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
)

// 2. Cache-First Strategy for Static Assets (Images & Fonts)
registerRoute(
  ({ request }) =>
    request.destination === 'image' || request.destination === 'font' || request.url.includes('/_astro/'),
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 24 * 60 * 60, // 60 Days
      }),
    ],
  }),
)

// 3. Offline Fallback Integration
setCatchHandler(async ({ event }) => {
  const fetchEvent = event as FetchEvent
  if (fetchEvent.request.mode === 'navigate') {
    // Detect language from path and return corresponding offline page
    const url = new URL(fetchEvent.request.url)
    const isEn = url.pathname.startsWith('/en/')
    const offlinePath = isEn ? '/en/offline/index.html' : '/offline/index.html'

    const cachedResponse = await caches.match(offlinePath)
    if (cachedResponse) return cachedResponse
  }
  return Response.error()
})
