## Context

個人部落格（JohnsonMao.github.io）使用 Astro Content Collections 管理文章。目前只有 `blog` 與 `about` 兩個 collection，且兩者的 locale 處理方式不一致（`blog` 從檔名推斷，`about` 從 frontmatter `lang` 欄位讀取）。`blog` collection 沒有 `series`/`seriesOrder` 欄位（系列關係藉由資料夾結構隱式推斷），缺少 `til` 與 `notes` 兩個新 collection，tag 驗證邏輯散落在 `content.ts` runtime 函式（`validateTags`）而非 build 階段工具。

## Goals / Non-Goals

**Goals:**

- 新增 `SERIES_IDS` 常數與對應 schema 欄位，讓系列關係可從 frontmatter 顯式宣告
- 新增 `til` 與 `notes` 兩個 content collection
- 統一 `about` 的 locale 處理（改由檔名推斷，與 `blog` 一致）
- 將 tag 與 series 的 registry 驗證提升為 CLI 工具（`check-registries`）
- 移除 `validateTags` runtime 函式（schema 層已完整驗證）

**Non-Goals:**

- Blog 文章的資料夾與檔案結構調整（Phase 2）
- 現有系列文加入 `series`/`seriesOrder` frontmatter（Phase 2）
- `parseEntryId` 的結構重構（Phase 2）
- `til` 與 `notes` 頁面路由建立（Phase 4）

## Decisions

### SERIES_IDS 作為嚴格 enum（而非 free-form string 或資料夾推斷）

使用與 `TAG_IDS` 完全對稱的 `SERIES_IDS` 常數。`series: z.enum(SERIES_IDS).optional()` 在 schema 層提供 build-time 型別驗證，避免 typo 導致文章靜默地脫離系列。

替代方案：
- **Free-form string**：無維護成本，但 typo 不會被 build 攔截，系列頁面少一篇文章才會發現
- **資料夾推斷（現行）**：零 frontmatter 負擔，但資料夾名稱成為語意契約，重組檔案時必須同步更新邏輯

選擇 `SERIES_IDS` enum 的理由：系列數量少（目前 4 個）、幾乎不需要頻繁新增、錯誤代價高（系列頁面缺篇）。

### about locale 從檔名推斷（移除 frontmatter lang）

`blog` 已透過 `parseEntryId` 從檔名（`zh-TW.md`、`en.md`）推斷 locale，`about` 改為相同做法。原有 `lang: z.enum(['en', 'zh-TW'])` 從 schema 中移除。

替代方案：blog 改為 frontmatter lang —— 需要修改 84 篇文章，改動範圍過大。

### check-registries 合併 tags 與 series 驗證

一個 CLI script 同時驗證 frontmatter 中使用的所有 tags 與 series 值都在對應的 `tags.json`/`series.json` registry 中有翻譯條目。這比兩個獨立 script 更容易維護。

### gray-matter 作為 check-registries 的 frontmatter 解析工具

`gray-matter` 是業界標準的 YAML frontmatter 解析套件，避免手動寫正規表達式。加入 devDependency。

## Implementation Contract

### content.config.ts

- 匯出 `SERIES_IDS` 常數（`as const`）與 `SeriesId` 型別
- `blog` collection schema 新增：
  - `series: z.enum(SERIES_IDS).optional()`
  - `seriesOrder: z.number().int().positive().optional()`
- `about` collection schema 移除 `lang` 欄位（BREAKING：現有 frontmatter `lang` 欄位將被 schema 拒絕）
- `til` collection：`loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/til' })`，schema 含 `title`、`pubDate`、`lang: z.enum(['zh-TW', 'en']).default('zh-TW')`、`tags: z.array(z.enum(TAG_IDS)).optional()`、`source: z.string().url().optional()`
- `notes` collection：`loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' })`，schema 含 `title`、`description?: z.string()`、`pubDate`、`updated?: z.coerce.date()`、`lang: z.enum(['zh-TW', 'en']).default('zh-TW')`、`tags: z.array(z.enum(TAG_IDS)).optional()`、`status: z.enum(['stub', 'draft', 'complete']).default('stub')`、`related?: z.array(z.string())`

### scripts/check-registries.mjs

- 執行：`node scripts/check-registries.mjs`
- 掃描目錄：`src/content/blog`、`src/content/til`、`src/content/notes`
- 對照來源：
  - tags → `src/i18n/messages/zh-TW/tags.json` 的 `registry` 物件
  - series → `src/i18n/messages/zh-TW/series.json` 的 `registry` 物件
- 成功（exit 0）：印出 `✓ {N} tags, {M} series — all registry entries present.`
- 失敗（exit 1）：印出所有缺少的 tag/series 名稱及其出現的檔案路徑

### series.json（zh-TW 與 en）

結構與 `tags.json` 完全對稱：
```json
{
  "title": "系列文章",
  "description": "探索所有系列文章。",
  "registry": {
    "<series-id>": { "name": "...", "description": "..." }
  }
}
```

### package.json

- 新增 `"check-registries": "node scripts/check-registries.mjs"`
- 修改 `"check"` script，加入 `pnpm check-registries`（在現有指令之後）

### about frontmatter 移轉

`src/content/about/zh-TW.md` 與 `src/content/about/en.md` 移除 `lang:` 這一行。build 後 about collection 不再包含 `lang` 欄位。

### 驗收條件

1. `pnpm build` 成功完成，無 TypeScript 或 schema 錯誤
2. `pnpm check-registries` exit 0（現有所有 tags 皆有 registry 條目）
3. `pnpm check` 成功執行（check-registries 已加入執行鏈）
4. TypeScript：`SeriesId` 與 `TagId` 型別可正確推斷

## Risks / Trade-offs

- **[Risk] about BREAKING change** → 若有其他程式碼讀取 `about` entry 的 `data.lang`，需一併更新。需在 migration 前 grep 確認所有用到 `about` collection `lang` 的地方。
- **[Risk] gray-matter 版本相容** → `gray-matter` 為成熟套件（v4），版本衝突風險低；加入 devDependency 不影響 production bundle。
- **[Risk] til/notes 目錄為空** → Astro glob loader 掃描空目錄不會報錯，但需至少放一個 placeholder 或確認 loader 行為。
