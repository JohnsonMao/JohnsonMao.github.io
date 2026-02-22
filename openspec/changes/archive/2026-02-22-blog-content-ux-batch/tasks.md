# blog-content-ux-batch — Tasks

完成一項即勾選 `[x]`。全部完成後可於 `docs/blog-extension-ideas.md` 勾選對應待辦，並依流程 archive 此 change。

## 1. OG / Twitter Card（blog-seo-social）

- [x] 1.1 在 BaseLayout 或共用 head 元件接收 props：title、description、image、canonical；未傳則用站點預設
- [x] 1.2 輸出 og:title、og:description、og:image、og:url、og:type 與 twitter:card、twitter:title、twitter:description、twitter:image；image/url 使用絕對 URL（site + 路徑）
- [x] 1.3 首頁、部落格列表、單篇文章頁傳入對應 meta（單篇可從 frontmatter 覆寫 description/image）
- [x] 1.4 新增預設 OG 圖至 public/（如 og-default.png）並在預設未指定時使用
- [x] 1.5 以分享除錯工具或檢視 HTML head 驗證至少首頁與一篇文章的 OG/Twitter meta 正確

## 2. 閱讀時間與修正日期（blog-content 顯示）

- [x] 2.1 新增共用 util：依 body 字數計算閱讀分鐘數（可接 lang 參數），回傳數字或 { minutes, label }
- [x] 2.2 PostLayout：傳入 body（或算好的閱讀時間），顯示「約 N 分鐘」或等效文案
- [x] 2.3 PostCard：傳入 body 或閱讀時間，在卡片上顯示閱讀時間
- [x] 2.4 PostLayout：若有 frontmatter.updated，顯示「更新於 YYYY-MM-DD」（可依 locale 切換文案）；無 updated 則不顯示
- [x] 2.5 驗證單篇與列表頁閱讀時間、以及有/無 updated 的文章顯示正確

## 3. Tag 頁與導覽（blog-tags）

- [x] 3.1 決定 tag URL 格式（如 slugify 或 encodeURIComponent）並在 design 或註解中記錄
- [x] 3.2 新增預設語系 tag 頁：`src/pages/blog/tag/[tag].astro`（或等效），getStaticPaths 從 collection 蒐集該語系所有 tag
- [x] 3.3 新增英文 tag 頁：`src/pages/en/blog/tag/[tag].astro`（或 [locale] 動態），同上依 locale 產 path
- [x] 3.4 頁面內容：getCollection 過濾 lang + tags.includes(tag)，排除 draft，排序同列表；標題顯示當前 tag
- [x] 3.5 PostLayout：文章若有 tags，顯示 tag 連結至對應語系 tag 頁
- [x] 3.6 部落格列表頁：在 PostCard 或列表區顯示每篇的 tag 連結（可選：加「依 tag 篩選」UI）
- [x] 3.7 驗證造訪 `/blog/tag/某tag`、`/en/blog/tag/某tag` 僅顯示該語系且含該 tag 的文章

## 4. Dark/Light 主題（theme-toggle）

- [x] 4.1 定義亮/暗兩套 CSS 變數或 Tailwind dark 主題（背景、文字、邊框等），根節點以 class 或 data-theme 切換
- [x] 4.2 新增 ThemeToggle 元件（client:load）：讀寫 localStorage（如 key `theme`，值 light/dark），切換時更新根 class/attribute
- [x] 4.3 BaseLayout 內嵌 inline script（在 body 開頭）：頁載入時讀取 localStorage 並套用 theme，減少 FOUC
- [x] 4.4 在 Header 或適當位置放入 ThemeToggle，確保全站可切換
- [x] 4.5 驗證切換後重新整理仍保持所選主題；無儲存時預設為 light 或 prefers-color-scheme（依設計決定）

## 5. 驗證與文件

- [x] 5.1 執行 `pnpm run check`（typecheck、lint）通過
- [x] 5.2 執行 `pnpm run test` 通過（若有相關測試可補）
- [x] 5.3 更新 `docs/blog-extension-ideas.md`：勾選 OG/Twitter、Tag 頁、閱讀時間、修正日期、Dark 切換完成
