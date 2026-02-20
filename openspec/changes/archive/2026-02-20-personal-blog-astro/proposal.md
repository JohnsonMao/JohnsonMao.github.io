## Why

需要一個以內容為主的個人部落格站台，方便撰寫與發布文章，並能部署到 GitHub Pages（JohnsonMao.github.io）。選用 Astro 可達成靜態為主的架構、良好的效能與 SEO，並透過 Content Collections 做型別安全的文章管理；現在建立可先確立架構與規格，再依 artifact 順序實作。

## What Changes

- 以 Astro 為框架建立新專案，採用 TypeScript、Tailwind CSS v4、Content Collections。
- 新增站點結構：首頁、文章列表頁、單篇文章頁；共用 BaseLayout（Header/Footer）與文章用 PostLayout。
- 新增 `src/content/blog` 與 content schema，支援 Markdown（可選 MDX）與 frontmatter 驗證。
- 新增建置與靜態輸出設定，以利部署至 GitHub Pages（或同類靜態託管）。
- 不預設引入 UI 框架；僅在需要互動的區塊（如主題切換）再考慮 islands。

## Capabilities

### New Capabilities

- `blog-content`: 文章內容管理 — Content Collections 設定、blog collection、frontmatter schema（標題、描述、日期等）與 Markdown/MDX 來源。
- `site-structure`: 站點結構與路由 — 首頁、部落格列表、單篇文章動態路由；BaseLayout、PostLayout；核心元件（如 Header、Footer、PostCard）。
- `styling`: 樣式與主題 — Tailwind v4 整合、必要時 @tailwindcss/typography、基礎設計 token 或主題變數。
- `build-deploy`: 建置與部署 — Astro 建置設定、靜態輸出、部署流程（含 GitHub Pages 或選用 adapter）。

### Modified Capabilities

<!-- 無既有 spec，此處留空 -->

## Impact

- 專案根目錄將新增 Astro 專案檔案：`astro.config.*`、`tsconfig.json`、`src/`、`public/`；若使用 pnpm，會新增或更新 `package.json` 與 lockfile。
- 依賴：Astro、Tailwind CSS、TypeScript、Content Collections 相關型別；無額外 UI 框架依賴。
- 若 repo 目前為空或與現有架構並存，需約定目錄與部署流程，避免與既有靜態資源衝突。
