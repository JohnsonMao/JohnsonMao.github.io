## Context

專案為 Astro 靜態部落格，雙語（en / zh-TW），預設 zh-TW，根路徑不帶 prefix；`site` 已設為 `https://johnsonmao.github.io`。build-deploy spec 要求 sitemap 與 canonical 使用該 URL；i18n-content spec 要求 hreflang。設計討論中曾提及 RSS。此 change 將三者一併實作。

## Goals / Non-Goals

**Goals:**

- 建置時產出 sitemap.xml，涵蓋首頁、部落格列表、各語系文章等靜態 URL。
- 提供每語系一個 RSS（或 Atom）feed，僅包含該語系文章，依 pubDate 排序。
- 每個頁面在 `<head>` 中輸出正確的 hreflang alternate link（含 x-default）。

**Non-Goals:**

- 不實作 OG/Twitter meta、JSON-LD、Analytics（可後續 change）。
- 不改變現有路由或版面結構；僅新增輸出與 meta。

## Decisions

### 1. Sitemap：@astrojs/sitemap

- **選擇**：使用 Astro 官方 sitemap 整合（若存在且與 Astro 5 相容）。
- **理由**：與 `site` 設定一致，自動涵蓋靜態路由；維護成本低。
- **實作要點**：在 `astro.config.mjs` 中 `integrations: [sitemap()]`；確認 `i18n` 與 `[locale]` 路由會被納入。

### 2. RSS：每語系一個 endpoint

- **選擇**：預設語系（zh-TW）於根路徑提供 feed（如 `/feed.xml`）；英文於 `/en/feed.xml`。內容來自 `getCollection('blog')`，依 `data.lang` 過濾，排除 draft，依 `pubDate` 降序，取前 N 筆（例如 20）。
- **理由**：與現有語系路由一致；訂閱器與搜尋引擎可依語系訂閱。
- **實作要點**：可採用 `src/pages/feed.xml.ts` 與 `src/pages/en/feed.xml.ts`（或 `[locale]/feed.xml.xml.ts` 等）回傳 `Content-Type: application/rss+xml` 或 `application/atom+xml`；或使用社群/官方 RSS 整合若可用。

### 3. hreflang：在 BaseLayout 的 head 輸出

- **選擇**：在 BaseLayout（或共用的 head 元件）中，根據當前頁面 path 與 `Astro.url`、`getRelativeLocaleUrl`（或等效）產生各 locale 的絕對 URL，輸出 `<link rel="alternate" hreflang="en" href="..." />`、`hreflang="zh-TW"`、`hreflang="x-default"`（x-default 通常指向預設語系）。
- **理由**：i18n-content spec 要求；單一 layout 可確保所有頁面一致。
- **實作要點**：需處理首頁、部落格列表、文章詳情等 path；排除非內容頁（如 feed、sitemap）或為其提供合理 alternate（可選）。

## Risks / Trade-offs

- **Sitemap 與 i18n**：需確認整合是否正確列出 `[locale]` 動態路由。若否，可查文件或改為自訂 sitemap 產出。
- **RSS 與 draft**：feed 僅包含非 draft 文章，與列表頁邏輯一致。
- **hreflang 與動態 path**：文章頁需能還原「同一篇文章在另一語系」的 URL（若同一 slug 有雙語則需對應；若依 lang 分 collection 則依 routing 規則組 URL）。

## Reference

- `docs/blog-extension-ideas.md` — 優先一組。
- `openspec/specs/build-deploy/spec.md` — site / sitemap。
- `openspec/specs/i18n-content/spec.md` — hreflang。
