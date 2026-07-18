# TODO

## 內容

- [ ] 填充 Notes 區塊（`src/content/notes/` 目前只有 `.gitkeep`）

## 功能

- [x] 動態 OG Image：用 Satori 為每篇文章自動產生社群預覽圖（目前降用靜態 `og-default.svg`）
- [x] 閱讀進度條：在文章頁頂部顯示捲動進度（GSAP 已有，適合長文）
- [ ] 豐富 Tags 統計頁：顯示各標籤文章數量（`tag/` 路由已存在）

## 技術

- [ ] Astro View Transitions：加上 `<ViewTransitions />` 讓頁面切換有動畫
- [ ] PWA Icon：補上 PNG 格式的 maskable icon（目前 manifest 只指向 SVG）
- [ ] Analytics：加上隱私友善的統計（Umami / Plausible）
- [ ] 圖片最佳化：文章內圖片改用 Astro `<Image>` 元件自動轉 WebP
- [x] E2E 測試：用 Playwright 補充關鍵頁面的端對端測試流程

## SEO / 可及性

- [x] Breadcrumb JSON-LD：`JsonLd.astro` 補上麵包屑結構化資料
- [x] Skip Link：加上頁首略過連結（WCAG 2.4.1）
- [x] `og:locale:alternate`：meta 標籤加上雙語 alternate，讓搜尋引擎識別 zh-TW / en 互為替代版本
