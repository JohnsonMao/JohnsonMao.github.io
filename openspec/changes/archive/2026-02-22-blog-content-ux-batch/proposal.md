# Proposal: Blog Content & UX Batch

## Why

部落格已具備多語系、RSS、sitemap 與 hreflang；接下來補齊分享預覽（OG/Twitter）、依 tag 發現文章、閱讀體驗（閱讀時間、修正日期）與主題切換，可提升分享效果、導覽與閱讀舒適度，且多數為既有資料或樣式延伸，成本低。

## What Changes

- **Open Graph / Twitter Card**：在 layout `<head>` 為各頁輸出 `og:title`、`og:description`、`og:image`、`twitter:card` 等 meta，使分享至社群時顯示正確預覽。
- **Tag 頁 / tag 篩選**：提供依 tag 瀏覽的管道。實作方式二擇一或並存：部落格列表頁依 tag 篩選，和／或每語系 tag 專頁（如 `/blog/tag/astro`、`/en/blog/tag/astro`），僅列出該語系具該 tag 的文章。
- **閱讀時間估計**：依文章字數計算「約 N 分鐘」並在 PostLayout（單篇）與 PostCard（列表）顯示。
- **修正日期顯示**：文章 schema 已有選用欄位 `updated`；在單篇文章頁顯示「更新於 YYYY-MM-DD」（有 `updated` 時才顯示）。
- **Dark/Light 切換**：提供主題切換（亮／暗），並以 localStorage（或同等方式）記住使用者偏好，套用至全站。

## Capabilities

### New Capabilities

- **blog-seo-social**：每頁（含首頁、部落格列表、單篇）輸出 Open Graph 與 Twitter Card meta，支援預設圖與 per-page 覆寫。
- **blog-tags**：Tag 的導覽與呈現——含 tag 列表／篩選、tag 專頁路由（per-locale）、以及列表/文章頁的 tag 連結。
- **theme-toggle**：亮／暗主題切換、對應的設計 token 或 CSS 變數、以及偏好持久化（如 localStorage）。

### Modified Capabilities

- **blog-content**：在單篇與列表的呈現上，新增「閱讀時間」與「修正日期」的顯示需求（資料來源為既有 frontmatter 與內文字數，不變更 schema 必填欄位）。

## Impact

- **程式**：BaseLayout 或共用 head 元件輸出 OG/Twitter meta；新增或擴充 tag 相關頁（如 `src/pages/blog/tag/[...].astro` 與語系版）；PostLayout / PostCard 顯示閱讀時間與（若有）修正日期；主題切換元件與 CSS 變數／Tailwind 主題、偏好讀寫邏輯。
- **依賴**：無預期新增依賴；若有預設 OG 圖則需 `public/` 內靜態檔。
- **既有程式**：不預期破壞既有路由或版面；tag 頁為新增路由；主題預設需與現有樣式相容。

## Reference

- 擴展清單：`docs/blog-extension-ideas.md` — 內容與讀取體驗、發現與導覽、SEO 與多語、技術與營運（Dark 切換）。
