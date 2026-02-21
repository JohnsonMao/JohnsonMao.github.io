## Why

改動程式（例如多語系、版型、內容結構）時若沒有測試，容易在不知情下破壞既有行為；部落格雖以靜態內容為主，仍會因路由、i18n、build 與內容 schema 的改動而產生 regressions。現在引入測試可在專案規模尚小時建立習慣與 CI 防線，避免日後改壞才發現。

## What Changes

- 引入專案層級的測試策略與工具（單元／元件／E2E 依 design 決定）。
- 新增測試設定檔與必要 devDependencies。
- 為關鍵行為撰寫測試（例如：build 成功、關鍵頁面可達、i18n 切換或內容 schema 驗證等）。
- 在 CI（或 pre-push）中執行測試，確保變更不會破壞既有行為。

## Capabilities

### New Capabilities

- `blog-testing`: 定義部落格專案的測試範圍、測試類型（unit / component / e2e）、工具選型、以及哪些行為必須被測試（build、路由、i18n、內容等）。

### Modified Capabilities

- （無。此變更為新增測試能力，不改變既有 spec 對功能的需求。）

## Impact

- **程式**：新增測試檔（如 `src/**/*.test.ts`、`e2e/**` 等）、測試設定檔（如 Vitest / Playwright 等）。
- **依賴**：新增 devDependencies（測試框架、runner、必要時 E2E 工具）。
- **CI / 工作流程**：在 GitHub Actions（或既有 CI）中加入測試步驟；可選在 pre-push hook 執行測試。
- **既有程式**：若測試需掛接 build 或 content pipeline，可能需少量可測試的入口或 mock 策略，不預期大規模重構。
