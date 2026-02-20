## 1. 專案初始化

- [x] 1.1 使用 pnpm 建立 Astro 專案（TypeScript、strict、optional integrations 依需求選擇）
- [x] 1.2 設定 `astro.config`（site URL、output: static）
- [x] 1.3 加入 Tailwind CSS 整合（Astro add tailwind 或 Tailwind v4 設定）
- [x] 1.4 確認 `tsconfig.json` 與專案根目錄結構（src/, public/）

## 2. 內容與 Content Collections

- [x] 2.1 建立 `src/content/config.ts`，以 `defineCollection` + Zod 定義 blog schema（title, description, pubDate 必填；可選 draft/tags/updated）
- [x] 2.2 建立 `src/content/blog/` 目錄並新增至少一則範例 .md 文章
- [x] 2.3 驗證 build 時 frontmatter 驗證正常（缺欄位時 build 失敗）

## 3. 站點結構與版面

- [x] 3.1 建立 BaseLayout（Header + Footer 佔位或簡易內容），放在 `src/layouts/`
- [x] 3.2 建立 PostLayout（用於單篇文章），可組合 BaseLayout 或共用 chrome
- [x] 3.3 實作首頁 `src/pages/index.astro`，使用 BaseLayout
- [x] 3.4 實作部落格列表頁 `src/pages/blog/index.astro`，從 blog collection 取資料、依 pubDate 排序並使用 BaseLayout
- [x] 3.5 實作單篇文章動態路由（如 `src/pages/blog/[...slug].astro`），使用 PostLayout、依 slug 取單篇並處理 404
- [x] 3.6 建立 Header、Footer、PostCard 元件於 `src/components/`（或子目錄），並在對應 layout/page 使用

## 4. 樣式

- [x] 4.1 確認 Tailwind 在元件中可用，為首頁與部落格列表加上基本版型與間距
- [x] 4.2 （可選）加入 @tailwindcss/typography，在 PostLayout 中為文章內文套用 prose 樣式
- [x] 4.3 （可選）設定簡單的 theme/tokens（如 @theme 或 CSS 變數）供全站一致使用

## 5. 建置與部署

- [x] 5.1 執行 `astro build`（或 `pnpm build`）確認產出為靜態檔案於 dist/
- [x] 5.2 確認 `astro.config` 的 `site` 已設為最終網址（如 https://johnsonmao.github.io）
- [x] 5.3 設定 GitHub Actions 或手動流程：build 後將 dist/ 部署至 GitHub Pages（或同類靜態託管）
