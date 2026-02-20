## Why

部落格目前僅支援單一語系，希望同時服務英文與繁體中文讀者，並維持靜態站與 SEO 友善。現在擴充多語系可先確立路由、內容與 UI 的規格，再依 artifact 實作，避免日後重構。

## What Changes

- 在 Astro 設定中啟用 i18n，支援語系 `en`、`zh-TW`，並決定預設語系與 URL 前綴策略。
- 路由改為依語系產出（預設語系可對應根路徑，其餘為 `/en/`、`/zh-TW/` 等）；首頁、部落格列表、單篇文章皆具各語系版本。
- 部落格內容依語系管理：frontmatter 或目錄結構能區分語系，列表與單篇僅顯示當前語系文章。
- 介面文案（導覽、首頁、列表標題等）改由依語系載入的翻譯檔提供，不再寫死在元件內。
- 在 Header（或等同區塊）提供語系切換連結，可切換至當前頁面的另一語系版本。
- 可選：在 layout 輸出 `hreflang` 以利搜尋引擎辨識多語系。

## Capabilities

### New Capabilities

- `i18n-routing`: 語系與路由 — Astro i18n 設定（locales、defaultLocale、prefixDefaultLocale）、依語系產出頁面（首頁、部落格列表、單篇）、站內連結使用 locale-aware API（如 getRelativeLocaleUrl）、語系切換器行為。
- `i18n-content`: 多語系內容 — 部落格內容依語系區分（frontmatter `lang` 或依語系目錄/collection），列表與動態路由僅取當前語系；可選 hreflang 輸出。
- `i18n-ui`: 介面多語系 — 依語系載入 UI 字串（如 JSON 翻譯檔），layout 與頁面使用翻譯 key 取代硬編碼文案。

### Modified Capabilities

- `site-structure`: 站點結構與路由改為依語系產出，URL 具語系前綴（或預設語系對應根路徑），各頁面皆有 per-locale 版本。
- `blog-content`: 內容模型支援語系（必填或可辨識之 `lang`，或依語系分 collection/目錄），建置時能依語系過濾文章。

## Impact

- 受影響檔案：`astro.config.mjs`（新增 i18n、path alias）、`tsconfig.json`（path alias）、`src/pages/**`（根路徑 + `src/pages/[locale]/` 兩套頁面）、`src/layouts/BaseLayout.astro`、`src/components/Header.astro` 等使用文案的元件、`src/content.config.ts` 與 `src/content/blog/`（schema 或目錄結構）。
- 新增：`src/i18n/` 翻譯檔、`src/pages/[locale]/` 語系頁面（與根目錄頁面手動同步維護）。
- 依賴：沿用 Astro 內建 i18n，不預設新增 i18n 套件；若採用 JSON 翻譯檔則無額外依賴。
- 既有文章需遷移或標註語系（例如補上 `lang: zh-TW` 或移至語系子目錄），否則需在 spec/design 定義預設語系對應。
