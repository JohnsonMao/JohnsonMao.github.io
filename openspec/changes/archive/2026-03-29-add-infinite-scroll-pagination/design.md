## Context

目前文章列表頁面在構建時直接載入所有文章並渲染成 HTML。隨著文章數量增加，這會導致：
- 首頁 HTML 檔案變得過大
- 初始載入時間增長
- 不必要地渲染用戶可能不會看到的文章

現在需要實現一個混合方案：
- 首頁保持 SEO 友善，靜態展示最新的 10 篇文章
- 後續文章透過客戶端無限下拉動態載入

## Goals / Non-Goals

**Goals:**

- 改善首頁初始載入效能（只靜態生成前 10 篇文章的 HTML）
- 保持首頁 SEO 友善性（最新文章在首頁 HTML 中可被爬蟲索引）
- 提供無縫的無限下拉使用者體驗
- 使用靜態 JSON 檔案作為資料來源（符合靜態站點架構）

**Non-Goals:**

- 即時文章更新機制
- 複雜的排序和篩選功能（未來需求）
- 使用者自訂顯示欄位（未來需求）

## Decisions

### 使用靜態 JSON 分頁檔案替代 API 端點

**決策**: 在構建時生成靜態 JSON 檔案 (例如 `/api/articles/page-2.json`, `/api/articles/page-3.json`)，而不是動態 API 端點。

**原因**:
- 符合 Astro 靜態站點架構（無伺服器成本）
- 透過 CDN 快速分發，無需伺服器計算
- 構建時驗證資料完整性

**替代方案考量**:
- 動態 API 端點：需要部署伺服器，但檔案很大時建構時間會增加
- JavaScript 內嵌所有文章：違反初始效能目標

### 使用 Intersection Observer 偵測捲動

**決策**: 使用 Intersection Observer API 偵測使用者捲動到頁面底部的時機，而不是監聽 scroll 事件。

**原因**:
- 更高效能（無 scroll 事件的節流問題）
- 原生瀏覽器 API，無需外部依賴
- 自動適應不同視口高度

### 頁面大小設定為 10 篇文章

**決策**: 每個分頁（包括首頁和後續無限下拉）固定 10 篇文章。

**原因**:
- 平衡首頁 HTML 大小和使用者首屏體驗
- 無限下拉每次載入 10 篇文章，感受流暢但不過多

### 建構時生成所有頁面 JSON 檔案

**決策**: 在 Astro 構建時，預先生成所有分頁的 JSON 檔案，而不是按需生成。

**原因**:
- 靜態構建流程，構建時一次完成
- 執行時無需計算，只需 fetch JSON 和插入 DOM

## Risks / Trade-offs

**[風險] 文章數量爆炸性增長**
- миграция: 若未來文章超過 1000 篇，JSON 檔案數量會很多。可考慮分層目錄結構 (例如 `/api/articles/2024/page-1.json`) 或實施真正的 API 端點。

**[風險] 已載入內容不會自動更新**
- 説明: 用戶載入文章後，若有新文章發布，頁面上不會自動反映。用戶需要刷新頁面。
- 説明: 對於部落格這類內容無需即時更新的場景，這個 trade-off 可接受。

**[Trade-off] 構建時間增加**
- 説明: 生成更多 JSON 檔案會稍微增加構建時間，但相比產生整個 HTML 頁面仍微不足道。

## Implementation Architecture

### 資料流

```
Astro 構建時
├─ 讀取所有文章 (getSortedCollectionList)
├─ 按 10 篇一頁分組
├─ 生成靜態 JSON 檔案
│  ├─ /articles-data/zh-tw/page-1.json
│  ├─ /articles-data/zh-tw/page-2.json
│  └─ ...
└─ 首頁 HTML 嵌入前 10 篇文章

用戶端 (客戶端 Island)
├─ 初始渲染首頁 10 篇文章
├─ Intersection Observer 監聽"加載更多"元素
└─ 觸發時 fetch 下一頁 JSON + 插入 DOM
```

### 檔案結構

- `src/utils/content.ts` - 新增 `getPaginatedArticles()` 函式
- `src/pages/api/articles/[lang]/page-[page].json.ts` - 動態路由生成 JSON 檔案
- `src/components/InfiniteScroll.astro` - Astro 島嶼元件，帶 ClientScript
- `src/pages/[...lang]/blog/index.astro` - 修改首頁邏輯

### JSON 格式

```json
{
  "page": 2,
  "locale": "zh-tw",
  "articles": [
    {
      "id": "article-slug",
      "title": "文章標題",
      "description": "文章描述",
      "pubDate": "2025-01-15",
      "tags": ["React", "TypeScript"]
    }
  ],
  "hasMore": true
}
```
