## 1. 基礎環境設定

- [x] 1.1 在本地 `.env` 檔案中新增分析服務相關環境變數範例（GA4, Clarity, Cloudflare）。
- [x] 1.2 在 `src/env.d.ts` 中新增環境變數型別定義（`PUBLIC_GA_MEASUREMENT_ID`, `PUBLIC_CLARITY_ID`, `PUBLIC_CLOUDFLARE_BEACON_TOKEN`）。

## 2. 佈局檔案修改

- [x] 2.1 在 `src/layouts/BaseLayout.astro` 的 `<head>` 區段新增 GA4, Clarity 與 Cloudflare Analytics 腳本。
- [x] 2.2 實作環境判斷邏輯，確保腳本僅在 `import.meta.env.PROD` 為 true 且對應變數存在時注入。

## 3. 驗證與測試

- [x] 3.1 在開發模式下啟動伺服器，檢查 HTML 原始碼確認腳本未被注入。
- [x] 3.2 手動檢查生產環境構建結果（`pnpm build`），確認所有腳本正確注入。
