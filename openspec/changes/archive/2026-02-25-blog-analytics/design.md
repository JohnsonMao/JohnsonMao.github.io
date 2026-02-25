## Context

目前部落格需要數據分析功能來了解讀者行為。由於此專案是靜態網站（Astro），且追求效能與隱私，選擇方案時需考量載入速度、GDPR 規範以及整合難易度。

## Goals / Non-Goals

**Goals:**
- 在生產環境中追蹤全站頁面瀏覽量。
- 使用多維度的分析解決方案（GA4, Clarity, Cloudflare）。
- 支援透過環境變數動態配置分析 ID。

**Non-Goals:**
- 不追蹤個人識別資訊（PII）。
- 不在開發環境（Development）啟動追蹤。
- 暫不實作複雜的自定義事件追蹤（初期僅需基本追蹤）。

## Decisions

- **選擇分析服務：Google Analytics 4 (GA4) + Microsoft Clarity + Cloudflare Analytics**
  - **GA4 理由**: 行業標準，提供強大的流量來源與轉換分析。
  - **Clarity 理由**: 提供熱圖（Heatmaps）與工作階段錄影，幫助了解使用者實際操作行為。
  - **Cloudflare 理由**: 隱私友善且無 Cookie 的 Web Analytics，與現有託管環境整合良好。
- **腳本注入位置：BaseLayout.astro**
  - **理由**: `BaseLayout` 是所有頁面的基底，在 `<head>` 中注入可確保追蹤代碼覆蓋全站。
- **配置方式：環境變數 (`import.meta.env`)**
  - **理由**: 使用 `PUBLIC_GA_MEASUREMENT_ID`、`PUBLIC_CLARITY_ID` 與 `PUBLIC_CLOUDFLARE_BEACON_TOKEN`，方便在不同環境中設定。

## Risks / Trade-offs

- **[Risk] 多個分析腳本影響頁面載入速度** → **Mitigation**: 使用 `async` 與 `defer` 載入，並確保僅在生產環境載入。
- **[Risk] 隱私與合規性** → **Mitigation**: 配置 GA4 匿名化 IP，Clarity 預設會遮罩敏感資訊。
- **[Risk] 廣告攔截器（Ad Blockers）阻擋** → **Mitigation**: Cloudflare Analytics 較不易被攔截，且對於個人部落格而言，接受部分數據遺失。
