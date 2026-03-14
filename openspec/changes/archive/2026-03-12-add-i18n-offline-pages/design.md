## Context

目前網站已整合 PWA 並具備基本的離線回退機制。然而，對於採用 `/en/` 路徑前綴的多語系架構，現有的 Service Worker (`src/sw.ts`) 僅能回傳單一的 `/offline/index.html`，導致英文版使用者在離線時會看到中文的提示頁面。

## Goals / Non-Goals

**Goals:**

- 實作具備語系感知的離線回退路由。
- 確保各語系的離線頁面內容與網站 UI 風格一致。
- 自動化預快取所有相關離線資源。

**Non-Goals:**

- 不處理離線狀態下的 API 請求快取（維持現有的 `Response.error()`）。
- 不變更現有的靜態資產 (Images/Fonts) 快取策略。

## Decisions

### 1. 基於 URL 路徑的語系偵測邏輯
在 `src/sw.ts` 的 `setCatchHandler` 中，透過 `new URL(request.url).pathname.startsWith('/en/')` 來判斷請求是否屬於英文版區塊。
- **理由**：路徑偵測是最直覺且符合目前 Astro i18n 配置的方式，且不依賴外部狀態或 Header。

### 2. 使用 Astro Page 組件開發離線頁面
建立 `src/pages/offline.astro` 與 `src/pages/en/offline.astro`。
- **理由**：這讓離線頁面能直接引用 `BaseLayout.astro`，自動包含全站導覽列與 CSS 樣式，並由 Astro 自動產出最終的 HTML 檔案。

### 3. 配置 Workbox 顯式預快取路徑
在 `astro.config.mjs` 的 `vite-plugin-pwa` 插件配置中，將 `offline/index.html` 與 `en/offline/index.html` 加入 `globPatterns`。
- **理由**：這確保了 Service Worker 在安裝階段就會將這兩個關鍵檔案存入快取，保證離線時立即可用。

## Risks / Trade-offs

- **[Risk]**：若新增語系，需手動更新 SW 路由邏輯。 → **Mitigation**：目前僅有兩種語系，若未來語系增多，可改用動態正則表達式偵測。
- **[Risk]**：快取體積略微增加。 → **Mitigation**：離線頁面通常內容簡短，增加的體積可忽略不計。
