## Context

專案為個人部落格，部署於 GitHub Pages（JohnsonMao.github.io）。目前以 OpenSpec 驅動規格與任務；採用 Astro 作為靜態站框架，搭配 TypeScript、Tailwind CSS v4、Content Collections。無既有 Astro 程式碼，為從頭建立之新站。

## Goals / Non-Goals

**Goals:**
- 建立可撰寫、型別安全、靜態輸出的部落格站台。
- 首頁、文章列表、單篇文章頁與共用 layout 可正常運作。
- 文章以 Content Collections 管理，frontmatter 有 schema 驗證。
- 樣式以 Tailwind 為主，必要時使用 typography；建置產出靜態檔案以利部署。

**Non-Goals:**
- 不預設引入 React/Vue 等 UI 框架；僅在需要互動時使用 islands。
- 不實作後端 API、資料庫或使用者登入。
- 留言、搜尋、多語系等進階功能留待後續變更。

## Decisions

- **Astro + 靜態輸出**：部落格以內容為主，SSG 即可；`astro.config` 不啟用 adapter 或使用 `output: 'static'`。若日後要 SSR/edge，再改用對應 adapter。
- **Content Collections 單一 blog collection**：文章放在 `src/content/blog/`，於 `src/content/config.ts` 以 `defineCollection` + Zod 定義 frontmatter（title, description, pubDate 等），利於型別與驗證。
- **Markdown 為主、MDX 選用**：預設以 `.md` 撰寫；若需文中嵌入元件再啟用 `@astrojs/mdx` 與 `.mdx`。
- **Tailwind v4**：以官方 Astro 整合或 `@tailwindcss/vite` 引入，樣式集中於 utility；長文排版可加 `@tailwindcss/typography`。
- **目錄結構**：`src/pages`（index、blog/index、blog/[...slug] 或 [slug]）、`src/layouts`（BaseLayout、PostLayout）、`src/components`、`src/content/blog`、`public`，與 Astro 慣例一致。
- **套件管理**：使用 pnpm；Node 版本依專案規則（如 nvm use 20.19.4）。

## Risks / Trade-offs

- **Content schema 變更**：日後若新增/修改 frontmatter 欄位，需同步更新 Zod schema 與既有文章，否則 build 可能失敗。可透過 CI 的 `astro build` 及早發現。
- **GitHub Pages 路徑**：若 repo 為 `username.github.io` 則站根為 `/`；若為 project site 則需設定 `site` 與 `base`，避免資源路徑錯誤。
- **零 JS 與 islands**：預設不送 JS 有助效能；若之後加主題切換等互動，僅在對應頁引入 island，避免整站綁定框架。

## Migration Plan

- 無既有上線站台，無遷移步驟。部署流程：`pnpm build`（或 `astro build`）產出 `dist/`，由 GitHub Actions 或手動將 `dist/` 內容部署至 Pages。若有舊版靜態檔共存，需約定輸出目錄與 branch（如 `gh-pages` 或 `main` 的特定資料夾）。

## Open Questions

- 是否需 RSS feed（Astro 可透過整合或手寫產生）。
- 部署方式：僅 GitHub Actions 推 dist，或使用 Astro 官方/社群提供的 GitHub Pages 範例 workflow。
