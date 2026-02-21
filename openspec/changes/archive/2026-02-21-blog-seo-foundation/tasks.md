# blog-seo-foundation — Tasks

完成一項即勾選 `[x]`。三項皆完成後可於 `docs/blog-extension-ideas.md` 勾選對應待辦，並依流程 archive 此 change。

## 1. Sitemap

- [x] 1.1 安裝 `@astrojs/sitemap`（或當前 Astro 5 相容之 sitemap 整合）
- [x] 1.2 在 `astro.config.mjs` 加入 sitemap 整合並設定（含 `site`）
- [x] 1.3 執行 `astro build` 確認產出 `dist/sitemap-index.xml`（或等效），且涵蓋首頁、`/en/`、`/blog/`、`/en/blog/`、各文章 URL
- [x] 1.4 若整合不自動涵蓋 `[locale]` 路由，則在 design 中記錄並以自訂方式補齊（或確認文件後調整）

## 2. RSS feed

- [x] 2.1 新增 feed 端點：預設語系（zh-TW）`/feed.xml`、英文 `/en/feed.xml`（路徑與實作方式依 design，例如 `src/pages/feed.xml.ts`、`src/pages/en/feed.xml.ts` 或動態 `[locale]`）
- [x] 2.2 內容來源：`getCollection('blog')`，過濾 `draft !== true`、依 `data.lang` 對應語系，依 `pubDate` 降序，取前 N 筆（例如 20）
- [x] 2.3 回傳 `Content-Type: application/rss+xml` 或 `application/atom+xml`，項目含 title、description、link、pubDate（或等效）
- [x] 2.4 手動或自動測試：build 後請求 `/feed.xml`、`/en/feed.xml` 可取得合法 XML 且為該語系文章

## 3. hreflang

- [x] 3.1 在 BaseLayout（或共用 head）取得當前頁面在「各語系」下的絕對 URL（使用 `site` + path；path 依當前 route 與 locale 推算，或使用 `getRelativeLocaleUrl` + 絕對 base）
- [x] 3.2 輸出 `<link rel="alternate" hreflang="en" href="..." />`、`hreflang="zh-Hant"` 或 `zh-TW`（依 Google 建議）、`hreflang="x-default" href="..." />`（x-default 指向預設語系）
- [x] 3.3 涵蓋首頁、部落格列表、文章頁；若 feed/sitemap 不需 hreflang，可選擇不輸出或僅輸出當前頁
- [x] 3.4 以瀏覽器或 build 輸出檢查至少首頁與一篇文章的 `<head>` 含正確 hreflang

## 4. 驗證與文件

- [x] 4.1 執行 `pnpm run check`（含 typecheck、lint）通過
- [x] 4.2 執行 `pnpm run test` 通過（若有相關測試可補）
- [x] 4.3 更新 `docs/blog-extension-ideas.md`：在「優先一組」表格與各節對應項目勾選 Sitemap、RSS、hreflang 完成
