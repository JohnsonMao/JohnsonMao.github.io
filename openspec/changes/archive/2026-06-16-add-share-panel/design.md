## Context

目前 PostLayout 同時使用兩個功能重疊的分享元件：
- `CopyLink.astro`：位於文章標題區，複製目前頁面 URL 至剪貼簿，帶有「Copied!」視覺回饋
- `ShareButtons.astro`：位於文章底部，提供 Twitter/X、Threads、Facebook 三個社群分享連結

兩元件各自獨立、佈局分散，且缺少 LinkedIn（專業社群）與 LINE（台灣主流通訊平台）支援。統一為 `SharePanel` 元件後，使用者只需在一個位置找到所有分享選項。

## Goals / Non-Goals

**Goals:**

- 新增 `SharePanel.astro` 元件，整合社群分享連結與複製連結按鈕
- 支援五個平台：Twitter/X、Threads、Facebook、LinkedIn、LINE
- 移除 `CopyLink.astro` 與 `ShareButtons.astro`
- 更新 `PostLayout.astro` 只使用 `SharePanel`
- i18n 對應：`SharePanel` 透過 `blog.copyLink` 與 `blog.copied` 提供可翻譯的複製按鈕文案與成功回饋

**Non-Goals:**

- 不支援 Web Share API（`navigator.share`）作為主要入口，保持靜態 HTML 為主的互動設計
- 不新增社群帳號 @ 提及功能
- 不追蹤分享點擊事件（Analytics 屬於 blog-analytics 範疇）

## Decisions

### SharePanel 為單一 Astro 元件，不拆分

**決定**：`SharePanel.astro` 是單一 `.astro` 檔案，包含平台連結陣列與複製連結按鈕，所有邏輯集中管理。

**理由**：元件體積小，拆分反而增加維護成本。現有 `ShareButtons.astro` 與 `CopyLink.astro` 的合計代碼量約 80 行，合併後約 70 行。

**替代方案**：拆成 `ShareLinks.astro` + `CopyButton.astro` → 不採用，增加 import 複雜度。

### SharePanel 放置於文章底部，移除頂部 CopyLink

**決定**：`SharePanel` 取代底部 `ShareButtons` 位置，同時移除 `PostLayout` 頂部的 `CopyLink`。

**理由**：讀者在閱讀完文章後才會想分享，底部位置符合閱讀流程；頂部保留過多 UI 元素會干擾標題閱讀體驗。

**替代方案**：在頂部保留單獨複製連結按鈕 → 不採用，分散使用者注意力。

### 使用內聯 SVG + 原生連結，不引入第三方 SDK

**決定**：平台分享 URL 使用各平台公開的 Web Intent URL 格式，圖示使用內聯 SVG（與現有 `ShareButtons.astro` 一致），不引入任何第三方分享 SDK。

**理由**：靜態網站不需要 SDK；內聯 SVG 零依賴、零網路請求、完全可控。

**替代方案**：使用 `astro-icon` 從 iconify 載入圖示 → 不採用，部分平台（如 Threads）圖示在 iconify 集合中不穩定。

### 複製連結邏輯使用 client-side script

**決定**：`<script>` 標籤使用 `navigator.clipboard.writeText`，與 Astro View Transitions 相容（監聽 `astro:after-swap`）。

**理由**：與現有 `CopyLink.astro` 相同模式，已驗證可行。Button ID 需唯一以避免多個元件衝突（使用 `share-panel-copy-btn`）。

## Implementation Contract

**元件介面**（`SharePanel.astro` Props）：
- `title: string` — 文章標題，用於組成社群分享文字
- `url: string` — 文章完整 URL（絕對路徑）
- `copyLabel: string` — 複製按鈕預設文字（由 `t(locale, 'blog.copyLink')` 提供）
- `copiedLabel: string` — 複製成功後顯示文字（由 `t(locale, 'blog.copied')` 提供）

**平台分享 URL 格式**：
| 平台 | URL 格式 |
|------|---------|
| Twitter/X | `https://twitter.com/intent/tweet?text={title}&url={url}` |
| Threads | `https://www.threads.net/intent/post?text={title} {url}` |
| Facebook | `https://www.facebook.com/sharer/sharer.php?u={url}` |
| LinkedIn | `https://www.linkedin.com/sharing/share-offsite/?url={url}` |
| LINE | `https://social-plugins.line.me/lineit/share?url={url}` |

所有 URL 參數使用 `encodeURIComponent` 編碼。

**複製連結行為**：
- 點擊後呼叫 `navigator.clipboard.writeText(url)`
- 成功：按鈕文字切換為 `copiedLabel`，加上綠色樣式，2 秒後恢復
- 失敗：`console.error` 記錄錯誤，無 UI 變化（靜默失敗）

**驗收標準**：
1. `PostLayout.astro` 不再 import `CopyLink` 或 `ShareButtons`
2. 文章頁面顯示包含 5 個平台圖示連結 + 1 個複製連結按鈕的分享區塊
3. 點擊各平台連結在新視窗開啟對應分享頁面，URL 正確包含文章 title 與 url
4. 點擊複製連結按鈕，按鈕文字切換為翻譯後的「已複製」文字，2 秒後恢復
5. `CopyLink.astro` 與 `ShareButtons.astro` 檔案不存在於 `src/components/blog/`
6. 切換 Astro View Transitions 後，複製功能仍正常運作

**範疇邊界**：
- 在範疇內：`src/components/blog/SharePanel.astro`、`src/layouts/PostLayout.astro`、`blog.copyLink` / `blog.copied` i18n 文案對應
- 在範疇外：其他使用 `CopyLink` 或 `ShareButtons` 的頁面（目前僅 PostLayout 使用）、Analytics 事件追蹤

## Risks / Trade-offs

- [LINE 分享 URL 格式變動] → LINE 官方 SDK 較穩定，但為避免引入外部腳本，使用 URL 格式；若格式失效，僅該平台連結失效，不影響其他功能
- [clipboard API 在部分舊瀏覽器不支援] → 靜默失敗（console.error），不影響主要閱讀體驗；與現有 CopyLink 行為一致，風險不變
