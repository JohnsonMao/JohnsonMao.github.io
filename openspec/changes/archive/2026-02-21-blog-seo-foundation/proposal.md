## Why

build-deploy 與 i18n-content 的 spec 已要求 sitemap、canonical 與 hreflang；設計討論中也提到 RSS。目前站點已設定 `site`，但尚未產出 sitemap、RSS 與 hreflang。先補齊這三項可讓搜尋引擎與訂閱器正確發現各語系內容，且不需第三方服務，適合作為第一個擴展 change。

## What Changes

- **Sitemap**：使用 `@astrojs/sitemap` 在 build 時產生 sitemap.xml，涵蓋各語系頁面。
- **RSS feed**：為預設語系與英文各產出一個 feed（如 `/feed.xml`、`/en/feed.xml`），內容來自 blog collection，依 `lang` 過濾。
- **hreflang**：在 BaseLayout（或共用 head）中輸出各語系與 x-default 的 `<link rel="alternate" hreflang="..." href="..." />`，讓搜尋引擎正確對應多語版本。

## Capabilities

### New Capabilities

- 無（此變更為實作既有 spec 提到或設計討論中的項目）。

### Modified Capabilities

- **build-deploy**：實作 sitemap 產出（spec 已要求 `site` 用於 sitemap/canonical）。
- **i18n-content**：實作 hreflang（spec 已要求 alternate + x-default）。
- 部落格內容/路由：新增 RSS 端點（設計曾提及，未在既有 spec 中具名；可視為 blog 能力延伸）。

## Impact

- **程式**：astro.config 加入 sitemap 整合；新增 feed 端點（例如 `src/pages/feed.xml.ts` 與 `src/pages/[locale]/feed.xml.ts` 或等效）；BaseLayout 或 head 元件輸出 hreflang。
- **依賴**：新增 `@astrojs/sitemap`（若 Astro 官方整合存在且相容）。
- **既有程式**：不預期破壞既有路由或版面；hreflang 需取得當前頁在各語系的 URL（可依現有 i18n 與 routing 邏輯）。

## Reference

- 擴展清單：`docs/blog-extension-ideas.md` — 優先一組（Sitemap、RSS、hreflang）。
