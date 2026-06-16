## Why

目前部落格有兩個功能相關卻分散的元件：`CopyLink`（位於文章頂部的複製連結按鈕）與 `ShareButtons`（位於文章底部的社群分享連結），分享支援平台也僅限 Twitter、Threads、Facebook，缺少 LinkedIn 與 LINE。整合為統一的 `SharePanel` 元件，並補充主流平台，能提升一致性與傳播效率。

## What Changes

- 新增 `SharePanel` 元件，整合現有 `ShareButtons` 的社群分享連結（Twitter/X、Threads、Facebook）及複製連結功能，並新增 LinkedIn 與 LINE 分享；複製按鈕文案透過 `copyLabel` / `copiedLabel` props 接收 `blog.copyLink` / `blog.copied` 翻譯值
- 移除獨立的 `CopyLink.astro` 與 `ShareButtons.astro`，由 `SharePanel.astro` 統一取代
- 更新 `PostLayout.astro`，改用單一 `SharePanel` 元件取代原先分散使用

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `social-share-buttons`：新增 LinkedIn 與 LINE 分享平台需求；整合複製連結功能至分享面板，並明確定義分享面板為單一元件
- `blog-post-ux`：將獨立的「Copy Link」按鈕需求改為由統一分享面板（`SharePanel`）提供，`CopyLink` 元件移除

## Impact

- Affected specs: social-share-buttons, blog-post-ux
- Affected code:
  - New: `src/components/blog/SharePanel.astro`
  - Modified: `src/layouts/PostLayout.astro`
  - Modified: blog i18n resources providing `blog.copyLink` and `blog.copied`
  - Removed: `src/components/blog/CopyLink.astro`, `src/components/blog/ShareButtons.astro`
