## Why

To improve user engagement and accessibility, we want to transform the blog into a Progressive Web App (PWA). This will allow users to install the blog on their devices, access previously visited pages while offline, and receive notifications when new content is published.

## What Changes

- **PWA Integration**: Implement `@vite-pwa/astro` to generate a Service Worker and Web App Manifest.
- **Offline Support**: Configure the Service Worker to cache pages and assets for offline viewing.
- **Installability**: Add a Web App Manifest to enable "Add to Home Screen" functionality.
- **Web Push Foundation**: Add Service Worker logic to handle push events and a UI component to request notification permissions. (Note: A backend service is required to *send* notifications; this change sets up the client-side capability).

## Capabilities

### New Capabilities
- `pwa-offline`: Enables offline access to visited content and app installation.
- `web-push-client`: Client-side logic for subscribing to and receiving web push notifications.

### Modified Capabilities
- `build-deploy`: Update build process to generate PWA assets (sw.js, manifest.webmanifest).

## Impact

- **Affected Code**: `astro.config.mjs`, `src/layouts/BaseLayout.astro` (for PWA head tags).
- **New Components**: `src/components/pwa/ReloadPrompt.astro`, `src/components/pwa/PushNotificationButton.astro`.
- **Dependencies**: Add `@vite-pwa/astro`, `workbox-window`.
- **External Dependencies**: Web Push requires VAPID keys and a service to trigger notifications (out of scope for this code change, but infrastructure is prepared).
