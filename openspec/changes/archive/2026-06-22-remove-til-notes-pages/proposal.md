## Why

`til` collection 在討論後確認與 `notes` 的定位重疊（兩者皆用於記錄筆記、學習與想法），且 `til` 唯一的獨特欄位 `source` 不需要 schema 層支援。同時 `notes` collection 雖已定義 schema，但缺少頁面路由，讀者無法瀏覽筆記內容。

## What Changes

- **BREAKING**：移除 `til` collection（從 `src/content.config.ts` 刪除定義與 `collections` 匯出）
- 刪除 `src/content/til/` 目錄（含 `.gitkeep`）
- `notes` collection 移除 `source` 欄位（不需 schema 層定義）
- 新增 `src/pages/[...lang]/notes/index.astro`：筆記列表頁，依 pubDate 降序顯示，支援雙語
- 新增 `src/pages/[...lang]/notes/[...slug].astro`：筆記詳細頁，使用 `PostLayout` 或相近版型

## Non-Goals

- TIL 內容的遷移（目前 `src/content/til/` 為空，無需遷移）
- Notes 的分頁功能（列表頁目前不分頁，內容量小時不必要）
- Notes 加入 RSS feed（可於日後獨立處理）
- Notes 的搜尋與篩選功能（屬於 site-search capability 範疇）

## Capabilities

### New Capabilities

- `notes-pages`：Notes listing page（`/notes/`）與 detail page（`/notes/<slug>`），雙語靜態路由，依 pubDate 降序排列

### Modified Capabilities

- `notes-collection`：移除 `source` 欄位需求；schema 僅保留 `title`、`pubDate`、`description?`、`updated?`、`lang`、`tags`、`status`、`related?`
- `til-collection`：標記為 deprecated，collection 從 codebase 移除

## Impact

- Affected specs: notes-pages (new), notes-collection (modified), til-collection (deprecated/modified)
- Affected code:
  - New:
    - src/pages/[...lang]/notes/index.astro
    - src/pages/[...lang]/notes/[...slug].astro
  - Modified:
    - src/content.config.ts
  - Removed:
    - src/content/til/.gitkeep
