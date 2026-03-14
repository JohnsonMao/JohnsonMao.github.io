## Why

目前 PWA 離線頁面僅支援單一 `/offline/index.html`，無法根據使用者當前的語系（繁體中文或英文）提供對應的離線提示，降低了多語系網站的體驗一致性。

## What Changes

- **新增多語系離線頁面**：建立 `src/pages/offline.astro` (zh-TW) 與 `src/pages/en/offline.astro` (en)，產出對應的實體 HTML。
- **更新 Service Worker 路由邏輯**：修改 `src/sw.ts` 的 `setCatchHandler`，偵測 `/en/` 路徑前綴以回傳正確語系的離線頁面。
- **更新 PWA 預快取配置**：調整 `astro.config.mjs`，確保所有語系的離線頁面皆被納入 Workbox 的預快取清單。

## Capabilities

### New Capabilities

- `i18n-offline-fallback`: 實作基於 URL 路徑偵測的語系感知離線回退機制。

### Modified Capabilities

- `pwa-offline`: 擴充離線支援要求，納入多語系資源的預快取與動態路由處理。

## Impact

- **受影響程式碼**：`src/sw.ts`, `astro.config.mjs`。
- **新增檔案**：`src/pages/offline.astro`, `src/pages/en/offline.astro`。
- **開發相依性**：`vite-plugin-pwa` 配置。
