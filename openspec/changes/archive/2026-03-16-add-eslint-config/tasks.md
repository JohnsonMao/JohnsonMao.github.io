## 1. 專案初始化與配置

- [ ] 1.1 安裝 ESLint 相關依賴 (`eslint`, `@antfu/eslint-config`)。
- [ ] 1.2 創建 `eslint.config.mjs` 配置文件，並加入基本配置 (astro: true, typescript: true, formatters: true)。
- [ ] 1.3 創建 `.eslintignore` 檔案（如果需要）或更新現有 `.gitignore` 排除 ESLint 緩存目錄（例如 `.eslintcache`）。

## 2. 腳本整合

- [ ] 2.1 更新 `package.json`，添加 `lint` (`eslint .`) 和 `lint:fix` (`eslint . --fix`) 腳本。

## 3. 基礎檢查與調整

- [ ] 3.1 執行 `pnpm run lint:fix` 進行首次自動化代碼風格修復。
- [ ] 3.2 審查 `pnpm-lock.yaml` 中的新依賴。
- [ ] 3.3 手動檢查並微調 `eslint.config.mjs` 及其他檔案中 ESLint 發現但未自動修復的潛在問題，確保其符合 `code-quality` 規格。

## 4. (選配) Git Hooks 設定

- [ ] 4.1 安裝 `simple-git-hooks` 和 `lint-staged`。
- [ ] 4.2 配置 `package.json` 以啟用 `pre-commit` hook，運行 `eslint --fix`。
