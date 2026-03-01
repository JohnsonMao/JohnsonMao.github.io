## Context

The blog is currently a static Astro site. To improve offline accessibility and engagement, we are transforming it into a PWA with Web Push capabilities.

## Goals / Non-Goals

**Goals:**
- Implement offline caching for pages and assets using `@vite-pwa/astro`.
- Generate a compliant `manifest.webmanifest` for app installation.
- Provide a UI for users to subscribe to push notifications.
- Implement Service Worker logic to handle incoming push messages.

**Non-Goals:**
- **Push Notification Backend**: We will NOT implement the backend service to trigger notifications in this change. We are only building the client-side capability (subscription and receiving).
- **Complex Offline Sync**: No background sync for form submissions (e.g., comments) while offline.

## Decisions

### 1. Library: `@vite-pwa/astro`
We will use `@vite-pwa/astro` as it integrates seamlessly with Astro and Vite, handling the generation of the service worker and manifest automatically based on configuration.

### 2. Caching Strategy: `GenerateSW` vs `InjectManifest`
We will use `GenerateSW` initially for simplicity as it covers standard offline caching needs (Cache First for assets, Network First/Stale-While-Revalidate for content). If custom push handling requires more control, we might switch to `InjectManifest` later, but `GenerateSW` with `importScripts` or custom service worker code injection is often sufficient for basic push handling.
*Correction*: To handle **Web Push** (`push` event), we effectively need custom code in the service worker. `@vite-pwa` allows this via `InjectManifest` or by appending code. **Decision**: Use `GenerateSW` with a custom service worker file if possible, or `InjectManifest` if `GenerateSW` is too limiting for push listeners.
*Refined Decision*: We will use **`InjectManifest`** pattern. This gives us full control over the service worker file (`src/pwa-sw.ts`), allowing us to write the `push` event listener explicitly while still letting Workbox handle the precaching manifest injection.

### 3. Web Push Client Logic
We will create a `PushNotificationButton.astro` component.
- **Logic**:
  - Check for service worker and `PushManager` support.
  - Request notification permission.
  - Subscribe via `registration.pushManager.subscribe`.
  - Log the subscription object to the console (since we don't have a backend to save it to yet). This allows manual testing.

## Risks / Trade-offs

- [Risk] **Cache Invalidation**: Users might see stale content.
  - [Mitigation] Use `Stale-While-Revalidate` for HTML content and configure `@vite-pwa` to prompt for updates (`ReloadPrompt` component).
- [Risk] **Push Support**: Not all browsers support Web Push (e.g., iOS Safari requires "Add to Home Screen" first for some features, though this is changing).
  - [Mitigation] Progressive enhancement: The button will only appear if the API is supported.
- [Risk] **Missing Backend**: Push feature is "incomplete" without a sender.
  - [Mitigation] Clearly document that this is client-side prep. The subscription JSON can be manually used with tools like web-push-libs/web-push for testing.

## Migration Plan

1.  Install `@vite-pwa/astro`.
2.  Create `src/pwa-sw.ts` (or similar) for custom SW logic including push.
3.  Update `astro.config.mjs` to use the PWA integration with `InjectManifest`.
4.  Add `ReloadPrompt` and `PushNotificationButton` to the layout.
