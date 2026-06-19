## Why

目前的 `blog` collection schema 缺少 `series`/`seriesOrder` 欄位（系列關係隱式綁定在資料夾結構），`about` collection 的 locale 透過 frontmatter `lang` 欄位定義而 `blog` 卻靠檔名推斷（兩者不一致），且沒有 `til` 與 `notes` 兩個新 collection 支撐學習紀錄與知識庫功能，tag 驗證邏輯散落在 runtime code 而非 build 工具。本次重構統一 schema 設計、補齊缺失 collection，並將 tag/series 的 registry 驗證提升為 CLI 指令。

## What Changes

- `src/content.config.ts`：新增 `SERIES_IDS` 常數（與 `TAG_IDS` 同等嚴謹）；blog schema 新增可選欄位 `series: z.enum(SERIES_IDS)` 與 `seriesOrder: z.number().int().positive()`；about schema 移除 `lang`（改由檔名推斷，與 blog 一致）
- 新增 `til` collection（schema：`title`、`pubDate`、`lang`、`tags`、`source?`）
- 新增 `notes` collection（schema：`title`、`description?`、`pubDate`、`updated?`、`lang`、`tags`、`status`、`related?`）
- 新增 `src/i18n/messages/zh-TW/series.json` 與 `src/i18n/messages/en/series.json`（系列 i18n registry，結構與 `tags.json` 一致）
- 新增 `scripts/check-registries.mjs`：統一驗證 `tags` 與 `series` 的 frontmatter 用值皆有對應 i18n registry 條目；取代 `content.ts` 中的 `validateTags` runtime 函式
- `package.json`：新增 `check-registries` script，並加入 `check` 指令的執行鏈
- `src/content/about/zh-TW.md`、`src/content/about/en.md`：移除 frontmatter `lang` 欄位
- `src/utils/content.ts`：移除 `validateTags` 函式與 `TAG_IDS` import（schema 層已完整驗證）
- **BREAKING**：about frontmatter 不再接受 `lang` 欄位（改由 glob loader 從檔名解析）

## Non-Goals

- Blog 文章的資料夾結構調整（`{post}/zh-TW.md` → `{post}.zh-TW.md`）—— 屬於 Phase 2
- 現有 84 篇系列文加入 `series`/`seriesOrder` frontmatter —— 屬於 Phase 2
- `parseEntryId` 的簡化重構 —— 延至 Phase 2 與檔案結構同步進行
- `til`/`notes` 頁面路由建立 —— 屬於 Phase 4

## Capabilities

### New Capabilities

- `til-collection`：TIL（Today I Learned）content collection，定義 schema 與 glob loader
- `notes-collection`：知識庫 notes content collection，定義 schema（含 `status`、`related`）與 glob loader
- `series-registry`：`SERIES_IDS` 常數 + `series.json` i18n registry，提供系列名稱的型別安全驗證，結構與現有 `TAG_IDS` + `tags.json` 完全對稱

### Modified Capabilities

- `blog-content`：blog schema 新增 `series`/`seriesOrder` 欄位；about schema 移除 frontmatter `lang`（locale 從檔名推斷）
- `blog-tags`：`validateTags` runtime 函式由 `check-registries` CLI script 取代，且同時涵蓋 series 的 registry 驗證

## Impact

- Affected specs: blog-content, blog-tags, til-collection (new), notes-collection (new), series-registry (new)
- Affected code:
  - New:
    - `scripts/check-registries.mjs`
    - `src/content/til/` (directory placeholder)
    - `src/content/notes/` (directory placeholder)
    - `src/i18n/messages/zh-TW/series.json`
    - `src/i18n/messages/en/series.json`
  - Modified:
    - `src/content.config.ts`
    - `src/utils/content.ts`
    - `src/content/about/zh-TW.md`
    - `src/content/about/en.md`
    - `package.json`
  - Removed: (none — `validateTags` is an inline function removal within `src/utils/content.ts`)
