## 1. 建立離線頁面組件

- [x] 1.1 建立 `src/pages/offline.astro` (對應：使用 Astro Page 組件開發離線頁面)
- [x] 1.2 建立 `src/pages/en/offline.astro` (對應：使用 Astro Page 組件開發離線頁面)

## 2. 更新 Service Worker 與配置

- [x] 2.1 修改 `src/sw.ts` 實作「基於 URL 路徑的語系偵測邏輯」以滿足「Language-Aware Offline Routing」要求
- [x] 2.2 更新 `astro.config.mjs` 實作「配置 Workbox 顯式預快取路徑」以滿足「Precaching of Multi-Language Offline Pages」要求

## 3. 驗證與測試

- [x] 3.1 執行 `pnpm build` 並檢查產出的 `dist/` 目錄，確認包含 `offline/index.html` 與 `en/offline/index.html`
- [x] 3.2 於瀏覽器開發者工具中切換至離線模式，驗證中文路徑與 `/en/` 路徑下導向對應的離線頁面
