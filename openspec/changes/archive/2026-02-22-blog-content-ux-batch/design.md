# Design: Blog Content & UX Batch

## Context

專案為 Astro 靜態部落格，雙語（en / zh-TW），已有 BaseLayout、PostLayout、PostCard、blog collection（含 `tags`、`updated` 選用欄位）。此 change 補齊 OG/Twitter 分享預覽、tag 導覽、閱讀時間與修正日期顯示、以及亮／暗主題切換，皆為前端與靜態產出，無後端或新服務。

## Goals / Non-Goals

**Goals:**

- 每頁 `<head>` 輸出 OG 與 Twitter Card meta，分享時預覽正確；支援預設圖與 per-page 覆寫。
- 提供 tag 導覽：列表頁篩選和／或 per-locale tag 專頁（如 `/blog/tag/astro`、`/en/blog/tag/astro`）。
- 在 PostLayout 與 PostCard 顯示閱讀時間（依字數估算）；在單篇顯示「更新於 YYYY-MM-DD」（僅當有 `updated` 時）。
- 提供亮／暗主題切換，偏好持久化（localStorage），全站套用。

**Non-Goals:**

- 不實作 JSON-LD、留言、站內搜尋、Newsletter、PWA（見 `docs/blog-extension-ideas.md`）。
- 不變更 blog schema 必填欄位；不新增後端或第三方登入。

## Decisions

### 1. OG / Twitter Card：共用 head 元件 + 預設圖

- **選擇**：在 BaseLayout（或抽成共用 `HeadMeta`/`SeoHead`）依頁面型別（首頁、列表、單篇）傳入 `title`、`description`、`image`、`canonical`；單篇可從 frontmatter 覆寫。預設 OG 圖放 `public/`（如 `public/og-default.png`），單篇未指定則用預設。
- **理由**：靜態站無 runtime API，meta 須 build-time 決定；共用元件避免重複。
- **實作要點**：Astro 的 `Astro.props` 或 layout 傳入；輸出 `og:title`、`og:description`、`og:image`、`og:url`、`og:type`、`twitter:card`（summary_large_image）、`twitter:title`、`twitter:description`、`twitter:image`；image 用絕對 URL（`import.meta.env.SITE` + 路徑）。

### 2. Tag 頁：per-locale 動態路由 + 列表篩選可選

- **選擇**：每語系提供 tag 專頁，路徑如 `/blog/tag/[tag]`（預設語系）、`/en/blog/tag/[tag]`；同一語系下僅列出 `data.lang` 相符且 `data.tags` 含該 tag 的文章。列表頁（`/blog/`、`/en/blog/`）可選：加上依 tag 篩選 UI（query 或 client 篩選）或僅提供「所有 tag 連結」導向 tag 專頁。
- **理由**：tag 專頁利於 SEO 與書籤；與現有 i18n 路由一致；列表篩選為 UX 加分項，可本 change 一併做或後補。
- **實作要點**：`getStaticPaths` 從 collection 蒐集所有 tag（依 lang 分組），產出 `[tag]` 路由；頁面內 `getCollection('blog')` 過濾 `lang` + `tags.includes(tag)`，排序同列表頁。**Tag URL 格式**：使用 `encodeURIComponent(tag)` 作為 URL 區段，讀取時以 `decodeURIComponent(params.tag)` 還原，以支援含空格或特殊字元的 tag。

### 3. 閱讀時間：字數 ÷ 固定 WPM，共用 util

- **選擇**：依文章 body 字數（Markdown 轉成純文字後字數）除以固定每分鐘閱讀字數（如 200–250 中文、英文可略高），向上取整得到「約 N 分鐘」。在 PostLayout 與 PostCard 顯示；若為 0 或極短則顯示「少於 1 分鐘」或省略。
- **理由**：無需新依賴；演算法簡單、可測。
- **實作要點**：共用 `getReadingTimeMinutes(content: string, lang?: string): number`（或回傳 `{ minutes, label }`）；PostLayout/PostCard 傳入 `body` 或已算好的值。語系可選用於未來多語系字速差異，初期可統一係數。

### 4. 修正日期：僅有 `updated` 時顯示

- **選擇**：單篇文章頁在 pubDate 附近（或文末）顯示「更新於 YYYY-MM-DD」，僅當 frontmatter 有 `updated` 且與 `pubDate` 不同時顯示（若相同可選擇不顯示）。
- **理由**：schema 已支援；不強制每篇填寫。
- **實作要點**：PostLayout 讀取 `frontmatter.updated`，有值則渲染一區塊；格式依 i18n 可選（如「更新於」/ "Updated on"）。

### 5. Dark/Light：CSS 變數 + 切換島 + localStorage

- **選擇**：以 CSS 變數（或 Tailwind 的 dark 模式）定義亮／暗兩套 token（背景、文字、邊框等）；根節點（如 `<html>`）加上 `class="dark"` 或 `data-theme="dark"` 切換。切換按鈕為 client 島（如 `<ThemeToggle client:load />`），讀寫 `localStorage`（如 key `theme`，值 `light`|`dark`）；首次載入時由 script 在 FOUC 前讀取並套用 class。預設可為 `light` 或依 `prefers-color-scheme`。
- **理由**：靜態站無 server 端 session；localStorage 簡單且普遍支援；CSS 變數與現有 Tailwind 相容。
- **實作要點**：Tailwind 的 `dark:` 或自訂 `[data-theme=dark]` 選擇器；切換元件僅負責寫入 localStorage + 更新 DOM；可選在 BaseLayout 內嵌一小段 inline script 在 `<body>` 開頭執行以減少閃爍。

## Risks / Trade-offs

- **OG 圖**：若未提供 per-page 圖，預設圖可能與內文不符；建議至少設一個站點級預設圖。
- **Tag URL**：tag 含特殊字元或多語系時需一致編碼與大小寫策略，避免重複或 404。
- **主題閃爍**：首次載入若先亮後暗會閃一下；inline script 盡早執行可減輕，無法完全避免無 JS 情境。
- **閱讀時間**：僅為估計，不保證準確；標示「約」即可。

## Migration Plan

- 無資料遷移。部署為一般靜態 build；若先前無 OG meta，上線後分享預覽會更新；主題預設不影響既有 HTML，僅加上 class/attribute。
- Rollback：還原程式即可；無持久化資料在 server。

## Open Questions

- 列表頁是否本 change 一併做「依 tag 篩選」UI（可留 tasks 中決定）。
- 預設主題用 `light` 還是 `prefers-color-scheme`（可訂在 theme-toggle spec 或 tasks）。
