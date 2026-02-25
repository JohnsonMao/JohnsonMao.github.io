## Why

目前部落格缺乏讀者數據分析工具，無法得知熱門文章、讀者來源或行為路徑。為了優化內容方向並了解讀者需求，需要整合輕量、隱私友善且符合 GDPR 規範的分析系統。

## What Changes

- 整合第三方分析服務（Google Analytics 4, Microsoft Clarity 與 Cloudflare Analytics）。
- 在網站全站（透過 `BaseLayout.astro`）注入分析追蹤腳本。
- 支援環境變數控制，確保追蹤代碼僅在生產環境（Production）生效，避免開發數據污染。
- **BREAKING**: 無。

## Capabilities

### New Capabilities
- `blog-analytics`: 負責網站流量統計、頁面瀏覽（Page Views）追蹤、基本事件監控以及相關隱私政策聲明（如需要）。

### Modified Capabilities
- `site-structure`: 修改全站佈局以包含分析腳本。
- `build-deploy`: 新增分析服務所需的環境變數（如 `GA_MEASUREMENT_ID` 等）。

## Impact

- **Affected Code**: `src/layouts/BaseLayout.astro`。
- **Dependencies**: 視選用方案而定，可能需引入 `npm` 套件或外部 JS 腳本。
- **Environment**: 需要在部署平台（GitHub Actions / Pages）設定環境變數。
