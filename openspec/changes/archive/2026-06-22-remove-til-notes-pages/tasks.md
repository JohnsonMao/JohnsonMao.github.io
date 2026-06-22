## 1. 移除 til collection

- [x] 1.1 實作 TIL content collection with schema 移除：從 `src/content.config.ts` 刪除 `const til = defineCollection({...})` 整個區塊，並從 `export const collections = { blog, about, til, notes }` 中移除 `til`；以 `pnpm build` 確認無 TypeScript 錯誤，且 build 時無 til collection 相關警告

- [x] 1.2 實作 source field in notes schema 移除：從 `src/content.config.ts` 的 `notes` collection schema 中刪除 `source: z.string().url().optional()` 這一行；以 `pnpm build` 確認 schema 更新後無錯誤

- [x] 1.3 從 check-registries.mjs 移除 til 掃描目錄：從 `scripts/check-registries.mjs` 的 `contentDirs` 陣列中刪除 `join(ROOT, 'src/content/til')` 這一行；以 `pnpm check-registries` 確認 exit 0 且輸出摘要不再提及 til 目錄

- [x] 1.4 刪除 src/content/til 目錄：刪除 `src/content/til/.gitkeep` 及 `src/content/til/` 目錄；以 `pnpm build` 確認刪除後 build 不報錯

## 2. 新增 notes i18n keys

- [x] 2.1 建立 zh-TW notes.json：新增 `src/i18n/messages/zh-TW/notes.json`，內容為 `{ "listTitle": "筆記", "listDescription": "學習筆記與想法" }`；以 `pnpm build` 確認 i18n 模組無型別錯誤

- [x] 2.2 建立 en notes.json：新增 `src/i18n/messages/en/notes.json`，內容為 `{ "listTitle": "Notes", "listDescription": "Learning notes and thoughts" }`；確認 zh-TW 與 en 的 key 集合相同

- [x] 2.3 新增 notes 導航連結至 nav.json：在 `src/i18n/messages/zh-TW/nav.json` 與 `src/i18n/messages/en/nav.json` 各新增 `"notes": "筆記"` / `"notes": "Notes"` 欄位；在 `src/components/Header.astro` 加入指向 `/notes/` 的導航連結，使用 `t(locale, 'nav.notes')` 作為文字

## 3. 新增 getNotesForLocale 工具函式

- [x] 3.1 實作 getNotesForLocale 函式（Notes 使用獨立工具函式，不套用 blog 的 getSortedCollectionList）：在 `src/utils/content.ts` 新增 `export async function getNotesForLocale(locale: Locale): Promise<CollectionEntry<'notes'>[]>`，呼叫 `getCollection('notes')`，在 production 模式（`!import.meta.env.DEV`）過濾 `data.status !== 'stub'`，以 `data.lang === locale` 過濾語言，依 `data.pubDate` 降序排序後回傳；以 TypeScript 型別檢查確認回傳型別正確，以 `pnpm build` 確認 notes 目錄為空時函式回傳空陣列且不報錯

## 4. 建立 notes 頁面路由

- [x] 4.1 建立 Notes listing page 使用 BaseLayout + 簡單列表：新增 `src/pages/[...lang]/notes/index.astro`，`getStaticPaths` 同 `blog/index.astro`（預設 locale 無前綴，其他 locale 有前綴），呼叫 `getNotesForLocale(locale)` 取得筆記清單，使用 `BaseLayout` 搭配 `t(locale, 'notes.listTitle')` 為頁面標題，以 `<ul>` 列出每篇筆記（每項含 title 超連結指向 `/notes/<entry.id>`、pubDate、description 若有、tags 若有）；以 `pnpm build` 確認路由生成且 listing 頁面可存取

- [x] 4.2 建立 Notes detail page 使用 PostLayout：新增 `src/pages/[...lang]/notes/[...slug].astro`，`getStaticPaths` 對每個 locale 呼叫 `getNotesForLocale(locale)` 並展開為 `{ lang, slug: entry.id }` 路由，使用 `render(entry)` 取得 `Content` 與 `headings`，以 `PostLayout` 渲染，傳入 `title`、`pubDate`、`description`（可選）、`tags`（可選）、`headings`，不傳 `seriesId`，`RelatedPosts` 以空 tags（`[]`）傳入；以 `pnpm build` 確認所有 notes 路由生成無誤

## 5. 驗收確認

- [x] 5.1 執行完整驗收：執行 `pnpm build`（無 TypeScript 或 schema 錯誤，notes listing 與 detail 路由生成成功）、`pnpm check-registries`（exit 0，不再掃描 til 目錄）、`pnpm check`（全鏈通過）；三項全部成功方視為完成
