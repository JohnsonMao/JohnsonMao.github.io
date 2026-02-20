## Context

- 現有部落格為 Astro 靜態站，單一語系（繁體中文），路由為 `/`、`/blog/`、`/blog/[...slug]`，內容在 `src/content/blog/`，UI 文案寫死在 layout 與頁面。
- 部署目標為 GitHub Pages，無 server 可讀 `Accept-Language`；語系判斷僅能依 URL 或 client-side 邏輯。
- 需求：支援英文（en）與繁體中文（zh-TW）、預設語系除 URL 外也希望「首次造訪時依使用者設備語系」導向對應語系。

## Goals / Non-Goals

**Goals:**

- 支援語系 `en`、`zh-TW`，URL 具語系前綴（或預設語系對應根路徑）。
- 首訪時依使用者設備語系（`navigator.language` / `navigator.languages`）導向對應語系頁面；可選將偏好存於 localStorage 供之後造訪使用。
- 部落格內容依語系區分，列表與單篇僅顯示當前語系。
- 介面文案由翻譯檔提供（如 `src/i18n/en.json`、`src/i18n/zh-TW.json`）。
- Header 提供語系切換，可切到當前頁面的另一語系版。
- 可選：在 layout 輸出 `hreflang` 以利 SEO。

**Non-Goals:**

- 不引入重型 i18n 套件；以 Astro 內建 i18n + 自訂翻譯檔與少量 client script 為限。
- 不做 server-side 語系偵測（靜態站無法讀 Request headers）。

## Decisions

### 1. 預設語系與 URL 結構

- **決策**：`defaultLocale: 'zh-TW'`，`prefixDefaultLocale: false`。即根路徑 `/`、`/blog/`、`/blog/...` 為繁體中文，英文為 `/en/`、`/en/blog/`、`/en/blog/...`。
- **理由**：與現有內容一致，既有連結可繼續指向根路徑；英文讀者由語系切換或首次導向進入 `/en/`。
- **替代**：defaultLocale 為 `en`、根路徑給英文 — 若目標讀者以英文為主可改為此方案。

### 2. 路由實作方式

- **決策**：**手動維護兩套頁面**。根路徑 `src/pages/index.astro`、`src/pages/blog/index.astro`、`src/pages/blog/[...slug].astro` 對應 zh-TW（`/`、`/blog/`、`/blog/...`）；`src/pages/[locale]/index.astro`、`[locale]/blog/index.astro`、`[locale]/blog/[...slug].astro` 對應 en（`/en/`、`/en/blog/`、`/en/blog/...`），`getStaticPaths` 僅產出 `locale: 'en'`。根路徑入口負責預設語系內容與設備語系導向（見下方）。
- **理由**：預設語系保留根路徑 URL，不需 codegen；兩套模板邏輯類似，改版時兩邊同步即可。
- **替代**：以腳本從根頁面產生 [locale] 頁面 — 已評估後改為手動維護，避免新增頁面時需改腳本或設定。

### 2b. Path alias

- **決策**：在 `tsconfig.json` 與 `astro.config.mjs`（vite.resolve.alias）設定 `@/` → `src/`，import 使用 `@/layouts/...`、`@/components/...`、`@/i18n`，兩套頁面共用相同 import 路徑。
- **理由**：避免相對路徑 `../../../` 因目錄深度不同而混亂，兩邊程式碼結構一致。

### 3. 根路徑 `/` 與「首次造訪依設備語系」

- **決策**：根路徑 `/` 提供一個輕量頁面（或 redirect 用頁面），內含一小段 inline script（或極小 island）：
  - 若 localStorage 已有語系偏好 → 若偏好非 defaultLocale 則 `location.href = '/en/'`（或對應語系前綴），否則不導向。
  - 若無偏好 → 讀 `navigator.language` / `navigator.languages`，對應到支援的 `en` 或 `zh-TW`；若為英文則導向 `/en/`，否則留在 `/`（zh-TW）；可選寫入 localStorage 供下次使用。
- **理由**：靜態站無法用 server 讀 Accept-Language，僅能 client-side 偵測；一次導向即可讓「預設」貼近設備語系。
- **替代**：根路徑一律顯示 zh-TW，不自動導向 — 實作最簡單，但無法滿足「預設吃設備語系」。

### 4. 部落格內容結構

- **決策**：**單一 blog collection**，frontmatter 新增必填 `lang: z.enum(['en', 'zh-TW'])`。文章依語系放子目錄（如 `src/content/blog/zh-TW/*.md`、`src/content/blog/en/*.md`），loader 的 `base` 或 pattern 涵蓋兩目錄；`getCollection('blog', ({ id, data }) => data.lang === currentLocale)` 或等效過濾。
- **理由**：一個 schema、一組型別，建置時依 locale 過濾即可；目錄分語系利於撰寫與審閱。
- **替代**：兩個 collection（blogEn、blogZhTw）— 重複 schema 與路由邏輯，不採用。

### 5. UI 翻譯檔

- **決策**：`src/i18n/en.json`、`src/i18n/zh-TW.json`，key 為巢狀（如 `nav.blog`、`home.welcome`）。Layout 與頁面依當前 `locale` 動態 import 或從預先建好的 map 取字串。
- **理由**：無額外依賴、靜態建置可內聯或預載，利於 tree-shaking；巢狀 key 可讀性佳。
- **替代**：TS/JS 模組匯出物件 — 可接受，若偏好型別約束可改用。

### 6. 語系切換器

- **決策**：Header 內顯示「EN | 繁體中文」（或對應翻譯），連結使用 Astro `getRelativeLocaleUrl()`（或等同邏輯）指向當前頁面的另一語系版；若為部落格文章則需對應到同 slug 的該語系文章（若有）。
- **理由**：使用者可隨時切語系且停留在對應頁面；靜態站僅能依 URL 區分語系，故連結須 locale-aware。

### 7. hreflang

- **決策**：在 BaseLayout（或共用 head）依 `i18n.locales` 與當前頁面 URL 產出 `<link rel="alternate" hreflang="x-default" href="..." />` 與各語系 `hreflang`。
- **理由**：有助搜尋引擎辨識多語系版本，屬建議做法；實作成本低。

## Risks / Trade-offs

- **[首次造訪需執行 JS 才能導向]** → 無 JS 或爬蟲可能不會被導向，會留在根路徑（zh-TW）。 mitigation：根路徑仍提供完整 zh-TW 內容，SEO 與無 JS 使用者仍可用；僅「自動導向至 en」依賴 JS。
- **[同一篇文章可能無雙語版本]** → 某語系可能無對應文章。mitigation：列表與單篇僅顯示該語系有內容的項目；語系切換若無對應文章可連到該語系首頁或列表。
- **[建置時需為每個 locale 產出靜態頁]** → 頁數與建置時間略增。mitigation：僅兩個語系，影響可接受。

## Migration Plan

1. 在 `astro.config.mjs` 加入 `i18n` 設定；設定 path alias `@/` → `src/`。
2. 新增 `src/pages/[locale]/` 下首頁、blog 列表、blog 單篇，`getStaticPaths` 產出 `en`；根路徑頁面保留並改為「預設語系 + 設備語系偵測」入口。
3. `src/content.config.ts` 為 blog schema 新增 `lang`，既有文章移至 `src/content/blog/zh-TW/` 並補上 `lang: zh-TW`（或等效）。
4. 新增 `src/i18n/en.json`、`src/i18n/zh-TW.json`，layout 與頁面改為依 locale 讀取；import 統一使用 `@/`。
5. Header 加入語系切換與 locale-aware 連結；BaseLayout 加入 hreflang。
6. 驗證 `astro build` 與各語系 URL 正常，部署後確認根路徑導向與語系切換行為。

**實作備註**：根目錄頁與 [locale] 頁為兩套獨立檔案，需手動同步；未使用 codegen 腳本。

無需特別 rollback 策略；若需回退可還原路由與 content schema 並保留單一語系內容。

## Open Questions

- 若未來新增第三語系，是否一律以「新 locale + 新翻譯檔 + content 子目錄」擴充即可（本設計預留此擴充方式）。
- 根路徑 `/` 在「無偏好且設備為 en」時是否要寫入 localStorage 再導向，以避免每次造訪都重導一次 — 建議寫入，實作時可一併決定。
