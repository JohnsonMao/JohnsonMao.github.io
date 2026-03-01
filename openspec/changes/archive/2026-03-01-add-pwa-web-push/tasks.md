## 1. Setup

- [x] 1.1 Install `@vite-pwa/astro` and `workbox-window` dependencies
- [x] 1.2 Configure `astro.config.mjs` to use the PWA integration with `InjectManifest` strategy
- [x] 1.3 Create the custom service worker file `src/pwa-sw.ts` with basic precaching and push event handling logic

## 2. PWA Components

- [x] 2.1 Create `src/components/pwa/ReloadPrompt.astro` for update notifications
- [x] 2.2 Create `src/components/pwa/PushNotificationButton.astro` for user subscription
- [x] 2.3 Add PWA components (ReloadPrompt) and manifest link to `src/layouts/BaseLayout.astro` head and body

## 3. Web Push Logic

- [x] 3.1 Implement subscription logic in `PushNotificationButton.astro` (request permission, subscribe via PushManager)
- [x] 3.2 Update `src/pwa-sw.ts` to handle the `push` event and display notifications
- [x] 3.3 Update `src/pwa-sw.ts` to handle `notificationclick` event (focus or open window)

## 4. Verification

- [x] 4.1 Build the project and verify `dist/sw.js` and `dist/manifest.webmanifest` are generated
- [x] 4.2 Verify the site is installable (e.g., using Chrome DevTools "Application" tab)
- [x] 4.3 Verify offline access (disable network and reload page)
- [x] 4.4 Verify push subscription flow (click button, grant permission, log subscription object)
- [x] 4.5 Manually trigger a push notification (using DevTools or external tool) and verify it appears
