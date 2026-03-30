## Why

目前文章列表頁面會在靜態生成時直接載入所有文章，隨著文章數量增加會導致首頁 HTML 檔案過大，影響初始載入效能。需要實現無限下拉機制以改善使用者體驗和頁面效能，同時保持首頁對搜尋引擎友善（最新文章在首頁靜態展示）。

## What Changes

- 文章列表首頁靜態顯示最新的 10 篇文章（保留 SEO 友善性）
- 新增無限下拉功能，使用者捲動到頁面底部時動態載入下一批 10 篇文章
- 生成靜態 JSON 檔案作為資料來源，供客戶端無限下拉時呼叫
- 使用 Intersection Observer API 偵測使用者捲動到頁面底部的時機

## Capabilities

### New Capabilities

- `article-pagination-api`: 提供靜態 JSON 檔案形式的文章分頁 API，支援按頁碼獲取文章列表
- `infinite-scroll-ui`: 實現客戶端無限下拉的 UI 元件，使用 Intersection Observer 偵測並動態載入文章

### Modified Capabilities

- `blog-listing-page`: 修改文章列表頁以支援首頁靜態展示 + 動態載入的混合模式

## Impact

- 受影響的程式碼：
  - `src/pages/[...lang]/blog/index.astro` — 修改首頁邏輯，僅靜態載入前 10 篇文章
  - `src/components/blog/` — 新增無限下拉元件
  - `src/utils/content.ts` — 新增文章分頁邏輯
  - Astro 動態路由或 API 端點 — 生成靜態 JSON 分頁檔案
