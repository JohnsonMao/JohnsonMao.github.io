## Context

Blog 的 i18n 模式是「filename-based locale」：一篇文章可有 `post.zh-TW.md` 與 `post.en.md` 兩個檔案，`parseEntryId` 從檔名解析 locale，`getSortedCollectionList` 做跨語言 fallback。Notes 採「frontmatter-based locale」：每個檔案有 `lang` 欄位，一個 slug 對應一個語言，不需要跨語言 fallback。

`src/utils/content.ts` 目前 `selectedCollections = ['blog'] as const`，`getSortedCollectionList`、`getGroupedCollection`、`parseEntryId` 全部針對 blog 的 filename-based 模式設計。

## Goals / Non-Goals

**Goals:**

- Notes listing page（`/notes/`）與 detail page（`/notes/<slug>`）雙語靜態路由
- 移除 `til` collection 及相關定義
- 保持 blog i18n 邏輯不變

**Non-Goals:**

- Notes 跨語言 fallback（一個 slug 不存在多語言版本，不需 fallback）
- Notes 分頁（列表頁一次顯示全部，無 InfiniteScrollUI）
- Notes 的 RSS / sitemap 擴充

## Decisions

### Notes 使用獨立工具函式，不套用 blog 的 getSortedCollectionList

Blog 的 `getSortedCollectionList` 依賴 `parseEntryId`（從檔名取 locale）。Notes 的 locale 在 frontmatter，套用同一函式需要破壞性重構 `getGroupedCollection`。

決策：在 `src/utils/content.ts` 新增 `getNotesForLocale(locale)` 工具函式，直接 `getCollection('notes')` 後以 `data.lang` 過濾，依 `pubDate` 降序排序，不做 fallback。

替代方案：擴充 `selectedCollections` 支援 notes → 需要重構 `parseEntryId` 與 `LocalizedCollection` 泛型，影響範圍大，列為 future work。

### Notes detail page 使用 PostLayout

Notes 文章與 blog 文章結構相近（標題、日期、tags、markdown body）。直接使用現有 `PostLayout` 可複用 TOC、AuthorBio、SharePanel 等元件。`PostLayout.description` 為 optional，可對應 notes 的 optional `description` 欄位。

唯一差異：`PostLayout` 目前有 `RelatedPosts` 與 `SeriesNav`，notes 不需要這兩個元件。做法：傳入 `seriesId={undefined}` 讓 `SeriesNav` 自動跳過，`RelatedPosts` 暫時傳入空 tags（`[]`）以抑制推薦，或日後再為 notes 實作 `related` 交叉連結。

### Notes listing page 使用 BaseLayout + 簡單列表

Notes 無分頁需求，直接以 `ul` 列出，每項顯示 title、pubDate、description（若有）、tags。不使用 `PostCard`（其 `description` 為必填但 notes 為 optional）；直接在頁面內 inline 渲染。

## Implementation Contract

**新增 `getNotesForLocale(locale: Locale)` in `src/utils/content.ts`**：
- 呼叫 `getCollection('notes')`，過濾 `data.lang === locale`（DEV 模式包含 draft；PROD 排除 `status === 'stub'`（可見性規則：stub 僅開發時可見）
- 依 `data.pubDate` 降序排序後回傳 `CollectionEntry<'notes'>[]`
- 若 `locale` 無任何 notes，回傳空陣列（不報錯）

**`src/pages/[...lang]/notes/index.astro`**：
- `getStaticPaths` 同 `blog/index.astro`：預設 locale 無前綴、其他 locale 有前綴
- 呼叫 `getNotesForLocale(locale)` 取得當前 locale 的 notes
- 使用 `BaseLayout`，title 使用 `t(locale, 'notes.listTitle')` i18n key
- 列表每項顯示：title（連結至 detail）、pubDate、description（若有）、tags（若有）

**`src/pages/[...lang]/notes/[...slug].astro`**：
- `getStaticPaths`：對每個 locale 呼叫 `getNotesForLocale(locale)`，產生 `{ lang, slug: entry.id }` 路由
- 使用 `PostLayout` 傳入 title、pubDate、description、tags、headings
- `seriesId` 不傳（undefined）；`RelatedPosts` 以空 tags 傳入（`[]`）
- `render(entry)` 取得 Content 與 headings

**i18n keys 新增（`src/i18n/messages/zh-TW/` 與 `en/`）**：
- `notes.listTitle`：「筆記」/ "Notes"
- `notes.listDescription`：副標題（SEO 用）

**驗收條件**：
- `pnpm build` 無 TypeScript 錯誤
- `/notes/` 頁面可正常存取（即使 notes 目錄為空也不報錯）
- `/notes/<slug>` 對存在的 notes 可正常渲染
- `pnpm check` 全鏈通過（含 check-registries）

## Risks / Trade-offs

- [`PostLayout` 包含 `RelatedPosts` 與 `SeriesNav`] → 傳入空/undefined 值讓元件靜默略過；若日後 notes 需要自己的 layout，可再拆分
- [Notes stub 文章的可見性] → PROD 排除 `status === 'stub'`，與 blog 的 `draft` 行為對稱；DEV 全部可見以利撰寫
