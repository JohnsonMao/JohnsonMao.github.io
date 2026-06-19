## 1. 安裝依賴

- [x] 1.1 安裝 gray-matter 作為 check-registries 的 frontmatter 解析工具（`gray-matter` 套件）：執行 `pnpm add -D gray-matter`，確認 `package.json` 的 `devDependencies` 新增 `gray-matter` 條目，且 `pnpm install` 無錯誤完成

## 2. content.config.ts：Schema 定義

- [x] 2.0 確認 Blog content collection with schema：確認 `src/content.config.ts` 的 blog collection 使用 `defineCollection` 搭配 Zod schema，`tags` 欄位使用 `z.array(z.enum(TAG_IDS)).optional()`，不依賴外部 `_meta.ts` runtime 驗證；以 `pnpm build` 確認 blog collection schema 無錯誤

- [x] 2.1 實作 SERIES_IDS constant for series validation — SERIES_IDS 作為嚴格 enum（而非 free-form string 或資料夾推斷）：在 `src/content.config.ts` 新增 `export const SERIES_IDS = ['front-end-skills-journey', 'vue3-beginner-camp', 'react-guide', 'typescript-guide'] as const` 及 `export type SeriesId = typeof SERIES_IDS[number]`；以 TypeScript 型別檢查確認 `SeriesId` 可正確推斷，build 時未知 series 值被拒絕

- [x] 2.2 實作 Frontmatter fields for blog posts（series 欄位）：在 `src/content.config.ts` 的 blog schema 加入 `series: z.enum(SERIES_IDS).optional()` 與 `seriesOrder: z.number().int().positive().optional()`；以 `pnpm build` 確認未知 series 值或負數 seriesOrder 在 build 時報錯

- [x] 2.3 實作 about collection locale from filename — about locale 從檔名推斷（移除 frontmatter lang）：在 `src/content.config.ts` 的 about schema 移除 `lang: z.enum(['en', 'zh-TW'])` 欄位；build 後 about collection 的 `data` 型別不再含 `lang` 屬性，以 TypeScript 型別檢查確認

- [x] 2.4 實作 TIL content collection with schema：在 `src/content.config.ts` 新增 `til` collection，schema 含 `title`、`pubDate`、`lang: z.enum(['zh-TW', 'en']).default('zh-TW')`、`tags: z.array(z.enum(TAG_IDS)).optional()`、`source: z.string().url().optional()`；並加入 `collections` 匯出；以 `pnpm build` 確認無 TypeScript 或 schema 錯誤

- [x] 2.5 實作 Notes content collection with schema：在 `src/content.config.ts` 新增 `notes` collection，schema 含 `title`、`pubDate`、`description?: z.string()`、`updated?: z.coerce.date()`、`lang: z.enum(['zh-TW', 'en']).default('zh-TW')`、`tags: z.array(z.enum(TAG_IDS)).optional()`、`status: z.enum(['stub', 'draft', 'complete']).default('stub')`、`related?: z.array(z.string())`；並加入 `collections` 匯出；以 `pnpm build` 確認無錯誤，缺少 `pubDate` 或未知 `status` 值在 build 時報錯

## 3. i18n Registry 文件與 about 內容

- [x] [P] 3.1 建立 series.json（zh-TW 與 en）— zh-TW 版本：新增 `src/i18n/messages/zh-TW/series.json`，結構與 `tags.json` 對稱，`registry` 含全部 4 個 SERIES_IDS 條目（`front-end-skills-journey`、`vue3-beginner-camp`、`react-guide`、`typescript-guide`），每條目有 `name` 與 `description`；以 `pnpm check-registries` 確認 series 部分 exit 0

- [x] [P] 3.2 建立 Series i18n registry files（en）：新增 `src/i18n/messages/en/series.json`，結構與 `src/i18n/messages/zh-TW/series.json` 對稱，含全部 4 個 SERIES_IDS 的英文 `name` 與 `description`；以目視確認兩個語言的 series.json key 集合相同

- [x] [P] 3.3 實作 about frontmatter 移轉（locale 改由檔名推斷）：從 `src/content/about/zh-TW.md` 與 `src/content/about/en.md` 移除 `lang:` frontmatter 行；以 `pnpm build` 確認 about collection build 成功，不因多餘欄位報錯

## 4. check-registries Script

- [x] 4.1 實作 Registry validation CLI script（check-registries 合併 tags 與 series 驗證）：新增 `scripts/check-registries.mjs`，掃描 `src/content/blog/`、`src/content/til/`、`src/content/notes/` 的 frontmatter `tags` 與 `series`，對照 `zh-TW/tags.json` 與 `zh-TW/series.json` registry；全部覆蓋時 exit 0 並印出摘要，有缺漏時 exit 1 並列出缺漏項目與所在檔案路徑；以 `node scripts/check-registries.mjs` 確認 exit 0 且輸出摘要格式正確

- [x] [P] 4.2 在 package.json 新增 check-registries 並加入 check 鏈：在 `package.json` 的 `scripts` 新增 `"check-registries": "node scripts/check-registries.mjs"`，並將 `pnpm check-registries` 附加到現有 `check` script 的執行鏈末端；以 `pnpm check-registries` 確認 exit 0，以 `pnpm check` 確認全程通過

## 5. content.ts 清理

- [x] 5.1 移除 validateTags 函式（schema 驗證已取代 runtime 驗證）：從 `src/utils/content.ts` 移除 `validateTags` 函式、`TAG_IDS` import、以及所有對 `validateTags` 的呼叫；移除後 `LocalizedCollection` 的 `tags` 欄位型別從 `TagId[]` 改為 `string[]`；以 `pnpm build` 與 `pnpm test` 確認無型別錯誤且測試全部通過

## 6. 空目錄建立

- [x] 6.1 建立 til 與 notes 目錄佔位：在 `src/content/til/` 與 `src/content/notes/` 各建立一個 `.gitkeep` 檔案，確保目錄存在於版本控制中；glob loader 掃描空目錄時 `pnpm build` 不報錯

## 7. 驗收條件

- [x] 7.1 執行完整驗收確認：執行 `pnpm build`（無 schema 或 TypeScript 錯誤）、`pnpm check-registries`（exit 0，摘要顯示正確 tag 與 series 數量）、`pnpm check`（全鏈通過，含 check-registries）；三項全部成功方視為完成
