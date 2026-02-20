## 1. Astro i18n 設定

- [x] 1.1 在 `astro.config.mjs` 加入 `i18n`：`locales: ['en', 'zh-TW']`、`defaultLocale: 'zh-TW'`、`prefixDefaultLocale: false`
- [x] 1.2 確認建置與開發環境能正確解析語系路徑

## 2. 路由與頁面結構

- [x] 2.1 新增 `src/pages/[locale]/index.astro`（首頁）、`src/pages/[locale]/blog/index.astro`（列表）、`src/pages/[locale]/blog/[...slug].astro`（單篇），在 `getStaticPaths` 產出 `en`、`zh-TW` 兩組
- [x] 2.2 將現有首頁、部落格列表、單篇的渲染邏輯遷入上述 `[locale]` 頁面，並依 `locale` 過濾內容與傳入 layout
- [x] 2.3 根路徑 `src/pages/index.astro` 改為「預設語系入口」：內含 client-side script 讀取 localStorage 與 `navigator.language`，必要時導向 `/en/`，否則顯示預設語系內容或 redirect 至預設語系首頁
- [x] 2.4 站內連結（導覽、PostCard、Footer 等）改用 `getRelativeLocaleUrl()` 或等同邏輯，使連結維持當前語系
- [x] 2.5 設定 path alias `@/` → `src/`（tsconfig + astro.config），並將兩套頁面與元件 import 改為 `@/`

## 3. 內容與 Content Collections

- [x] 3.1 在 `src/content.config.ts` 的 blog schema 新增必填 `lang: z.enum(['en', 'zh-TW'])`，loader 涵蓋 `src/content/blog/` 下語系子目錄（如 `zh-TW/`、`en/`）
- [x] 3.2 建立 `src/content/blog/zh-TW/`、`src/content/blog/en/`，將既有文章移至 `zh-TW/` 並在 frontmatter 補上 `lang: zh-TW`
- [x] 3.3 部落格列表與單篇頁面僅從 `getCollection('blog', ...)` 取 `data.lang === currentLocale` 的項目；單篇 404 時回傳 404 或 not-found

## 4. UI 翻譯

- [x] 4.1 新增 `src/i18n/en.json`、`src/i18n/zh-TW.json`，以巢狀 key 定義 nav、home、blog 等文案
- [x] 4.2 實作依 `locale` 取得翻譯的 helper（或動態 import），供 layout 與頁面使用
- [x] 4.3 將 BaseLayout、Header、Footer、首頁、部落格列表頁的硬編碼文案改為使用翻譯 key

## 5. 語系切換與 SEO

- [x] 5.1 在 Header 加入語系切換（EN | 繁體中文），連結使用 `getRelativeLocaleUrl()` 指向當前頁面的另一語系版；若為文章頁且無對應語系文章則 fallback 至該語系首頁或列表
- [x] 5.2 在 BaseLayout（或共用 head）依 `i18n.locales` 與當前頁 URL 輸出 `<link rel="alternate" hreflang="..." />` 與 `hreflang="x-default"`
- [x] 5.3 將 `<html lang="...">` 設為當前 locale（如 `zh-TW`、`en`）

## 6. 驗證與部署

- [x] 6.1 執行 `pnpm run check`（typecheck、lint、test）並通過
- [x] 6.2 執行 `astro build` 確認各語系路由皆有產出（`/`、`/en/`、`/blog/`、`/en/blog/`、各文章 URL）
- [x] 6.3 手動或自動測試：根路徑設備語系導向、語系切換、列表與單篇僅顯示該語系內容、無對應文章時 404
