## 1. 建立 SharePanel 元件

- [x] [P] 1.1 在 `src/components/blog/SharePanel.astro` 建立「Social Sharing Links on Posts」（SharePanel 為單一 Astro 元件，不拆分）：使用內聯 SVG + 原生連結，不引入第三方 SDK，陣列包含 Twitter/X、Threads、Facebook、LinkedIn、LINE 五個平台的分享 URL（所有參數以 `encodeURIComponent` 編碼），每個連結以 `target="_blank" rel="noopener noreferrer"` 開啟新分頁；驗證方法：用瀏覽器開啟任一文章頁面，確認五個平台圖示連結存在，點擊後各自開啟對應平台的正確分享 URL

- [x] [P] 1.2 在 `src/components/blog/SharePanel.astro` 加入「Copy Link in Share Panel」功能：元件接受 `copyLabel: string` 與 `copiedLabel: string` props，渲染 id 為 `share-panel-copy-btn` 的按鈕，並預先顯示 `copyLabel` 文字；驗證方法：確認元件 HTML 含有 `id="share-panel-copy-btn"` 的按鈕且顯示 `copyLabel` 文字

- [x] 1.3 在 `SharePanel.astro` 加入 `<script>` 實作「複製連結邏輯使用 client-side script」：選取 `#share-panel-copy-btn`，點擊時呼叫 `navigator.clipboard.writeText(window.location.href)`；成功時切換按鈕文字為 `copiedLabel`（從 `data-copied` attribute 讀取）並套用綠色樣式，2000ms 後恢復；失敗時 `console.error` 靜默處理；同時監聽 `astro:after-swap` 重新初始化；驗證方法：點擊按鈕確認按鈕文字 2 秒內切換為「已複製！」後恢復，並在 View Transitions 換頁後重新點擊仍正常運作

## 2. 更新 PostLayout

- [x] 2.1 更新 `src/layouts/PostLayout.astro` 實現「Share Button Placement」（SharePanel 放置於文章底部，移除頂部 CopyLink）：移除對 `CopyLink` 的 import 與 JSX 使用，移除對 `ShareButtons` 的 import 與 JSX 使用，在文章底部原 `ShareButtons` 位置改用 `SharePanel`（傳入 `title`、`url`、`copyLabel={t(locale, 'blog.copyLink')}`、`copiedLabel={t(locale, 'blog.copied')}`）；驗證方法：啟動 dev server，確認文章頁面底部只有一個分享區塊，頂部標題區不再有複製連結按鈕

## 3. 移除舊元件

- [x] [P] 3.1 刪除 `src/components/blog/CopyLink.astro`，確保「Copy Link functionality」不再由獨立元件提供；驗證方法：執行 `pnpm build`，確認無 import 錯誤，且建置成功

- [x] [P] 3.2 刪除 `src/components/blog/ShareButtons.astro`，確保舊的三平台分享按鈕元件不再存在；驗證方法：執行 `pnpm build`，確認無 import 錯誤，且建置成功

## 4. 建置驗證

- [x] 4.1 執行 `pnpm build` 並確認零錯誤；驗證方法：檢視建置後的文章頁面 HTML，確認包含五個平台的分享連結（包含 LinkedIn 與 LINE）、一個 `id="share-panel-copy-btn"` 的複製按鈕，且不含舊的 `id="copy-link-button"` 元素
