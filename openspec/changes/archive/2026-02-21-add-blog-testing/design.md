## Context

專案為 Astro 靜態部落格，使用 TypeScript、Tailwind v4、Content Collections，部署至 GitHub Pages。目前無測試；僅有 `pnpm run check`（astro check）。引入測試可防止改動路由、i18n、內容 schema 或 build 設定時產生 regressions，且需與現有 pnpm / Astro 工作流整合。

## Goals / Non-Goals

**Goals:**

- 建立可重複執行的測試套件（單元／整合層級為主），能在 CI 與本地執行。
- 保護關鍵行為：build 成功、內容 schema 有效、關鍵頁面可達（可選 E2E）。
- 與現有 `pnpm run check` 並存，可一鍵執行檢查與測試。

**Non-Goals:**

- 不追求 100% 覆蓋率；優先覆蓋 build、content、關鍵路徑。
- 不在此變更內實作 pre-push hook（可後續加）。
- 不改變既有 build/deploy 流程的對外行為。

## Decisions

### 1. 單元／整合測試：Vitest

- **選擇**：使用 Vitest 作為測試 runner。
- **理由**：與 Vite/Astro 生態一致、設定簡單、ESM 原生、執行快，且專案已為 ESM。
- **替代**：Jest 需較多 ESM 設定；Node 內建 test runner 功能較少。選 Vitest 以減少設定與維護成本。

### 2. 測試範圍：Build + 內容 + 可選 E2E

- **選擇**：先做 (1) build 成功、(2) 內容 collection schema 與 loader 可測、(3) 必要時以簡單 E2E 驗證首頁/列表可達。
- **理由**：部落格以靜態內容與 build 為主，regression 多發生在 build 失敗或內容錯誤；E2E 成本高，先以 build + 內容測試為主，E2E 可後加。
- **替代**：全面 E2E 覆蓋 — 暫不採用，因維護成本高且靜態站可依 build 與內容測試涵蓋多數風險。

### 3. E2E 工具（可選／後續）

- **選擇**：若需 E2E，採用 Playwright 或 Astro 官方建議的 E2E 方式（如 `astro build` + `preview` 後用簡單 HTTP 檢查）。
- **理由**：Playwright 與現代 Astro 整合良好；若僅需「build 後有 HTML」可先用 Node 讀 `dist/` 或 curl preview。此變更可僅定義「E2E 可選」，實作留 tasks 決定。

### 4. CI 整合

- **選擇**：在現有或新建的 GitHub Actions workflow 中增加測試步驟（例如 `pnpm install`, `pnpm run test`）。
- **理由**：確保每次 push/PR 都跑測試，與 proposal 的「CI 防線」一致。

## Risks / Trade-offs

- **[Risk] 測試與 Astro content layer 的耦合**：Content collection 依賴 Astro 的 build 時環境。  
  **Mitigation**：以整合測試（build 或 `astro build` 後驗證）為主；必要時用 Vitest 載入有限模組（如 schema 或純 util）做單元測試，避免過度 mock Astro 內部。

- **[Risk] 維護成本**：過多或過脆的測試會拖慢迭代。  
  **Mitigation**：Non-goals 明確不追求全覆蓋；只測 build、內容、關鍵路徑；E2E 可選且範圍小。

## Migration Plan

1. 新增 devDependencies（Vitest 及必要設定）。
2. 新增 `vitest.config.*` 與測試腳本（如 `pnpm run test`）。
3. 撰寫首批測試（build、內容 schema/loader、可選 E2E）。
4. 在 CI 中加入 `pnpm run test`（與 `pnpm run check` 並列）。
5. 無需資料或部署流程變更；無 rollback 需求，僅可選擇暫時關閉 CI 中的 test 步驟。

## Open Questions

- E2E 是否在此 change 內實作，或僅在 spec/tasks 中預留「可選 E2E」項目，由後續 task 決定。
- 測試檔放置慣例：`src/**/*.test.ts` 與 `src/**/*.spec.ts` 二擇一，需在 tasks 中統一。
