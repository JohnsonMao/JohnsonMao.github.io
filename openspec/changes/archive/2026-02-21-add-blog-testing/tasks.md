## 1. Setup

- [x] 1.1 新增 Vitest 為 devDependency（pnpm add -D vitest）
- [x] 1.2 新增 vitest.config.ts（或 .mjs）並設定 test 檔 glob（例如 src/**/*.test.ts）
- [x] 1.3 在 package.json 新增 script：`"test": "vitest run"`
- [x] 1.4 約定測試檔命名與位置（例如 src/**/*.test.ts）並在 config 或 README 中註明

## 2. Build verification

- [x] 2.1 撰寫測試或腳本：執行 `astro build` 並斷言 exit code 為 0（可為 Vitest 內執行 child_process 或單獨 script）
- [x] 2.2 確保 `pnpm run test` 會執行 build 驗證，失敗時整體 test 失敗

## 3. Content and schema validation

- [x] 3.1 撰寫測試或檢查：能載入 blog content collection 或 schema 且不拋錯（依專案可測方式：例如 build 時驗證、或 Vitest 載入有限模組）
- [x] 3.2 內容／schema 錯誤時能由 test 或 check 偵測並回報失敗

## 4. CI integration

- [x] 4.1 在 GitHub Actions workflow 中新增步驟：install 依賴後執行 `pnpm run test`
- [x] 4.2 確保 CI 在 test 失敗時 fail（與現有 check 步驟並列或合併為同一 job）

## 5. Optional E2E or smoke (optional)

- [ ] 5.1 （可選）新增 E2E 或 smoke 測試：build 後驗證首頁或關鍵路由可達（例如 Playwright 或簡單 HTTP 請求 dist/）
- [ ] 5.2 （可選）若實作 E2E，將之納入 `pnpm run test` 或提供 `pnpm run test:e2e` 並在 README/CI 中說明
