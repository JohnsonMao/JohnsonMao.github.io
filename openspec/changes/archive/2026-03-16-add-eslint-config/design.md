## Context

目前專案缺少統一的程式碼檢查 (Linting) 工具，這可能導致代碼風格不一致，增加多人協作和長期維護的難度。本次設計旨在引入 ESLint，以標準化代碼品質和風格。

## Goals / Non-Goals

**Goals:**

- 引入 ESLint 作為專案的代碼檢查工具。
- 採用 `@antfu/eslint-config` 配置，支援 Astro、TypeScript 和通用 JavaScript 風格。
- 配置 ESLint 以自動修復常見的代碼風格問題。
- 整合 ESLint 到 `package.json` 的腳本中，方便執行。

**Non-Goals:**

- 不進行大規模的現有代碼重構，僅處理 ESLint 發現的格式問題。
- 不設定自定義的 ESLint 規則，除非基於 `@antfu/eslint-config` 的擴展。

## Decisions

### 1. ESLint 配置與基礎套件

- **選擇**: 使用 `@antfu/eslint-config` 搭配 `eslint`。
- **理由**: `@antfu/eslint-config` 提供了對現代 JavaScript、TypeScript、Astro、Vue、React 等框架的良好支援，且涵蓋了常見的程式碼風格和最佳實踐，能快速建立一套高品質的 Linting 環境。
- **替代方案**: 手動配置 ESLint 規則集，但這將耗費更多時間且容易出錯。

### 2. 配置文件名

- **選擇**: `eslint.config.mjs`
- **理由**: 這是 ESLint v8+ 推薦的現代配置格式，使用 ECMAScript Modules。
- **替代方案**: `.eslintrc.js` 或 `.eslintrc.json`，但這屬於較舊的配置方式。

### 3. 支援的檔案類型

- **選擇**: `.astro`, `.ts`, `.js`, `.mjs`, `.json`, `.md` (透過 formatters)
- **理由**: 涵蓋了專案中主要的開發和內容檔案類型。
- **替代方案**: 僅限 `.ts` 和 `.astro`，但這會忽略其他重要檔案的檢查。

### 4. 腳本整合

- **選擇**: 在 `package.json` 中新增 `lint` 和 `lint:fix` 指令。
- **理由**: 方便開發者快速執行代碼檢查和自動修復。
- **替代方案**: 不整合腳本，需要開發者手動執行 ESLint 命令，降低使用率。

## Risks / Trade-offs

- **[Risk]** 首次引入 ESLint 可能會發現大量現有代碼風格問題，影響初始提交。
  - **Mitigation**: 逐步引入，或先用 `lint:fix` 批量修復，再進行手動微調。
- **[Risk]** `_meta.ts` 檔案中的 TypeScript 類型與 ESLint 預期不符。
  - **Mitigation**: 確保 `eslint.config.mjs` 正確配置了 TypeScript 支援 (`typescript: true`)。
- **[Risk]** Astro 檔案的 Linting 可能需要額外配置。
  - **Mitigation**: `@antfu/eslint-config` 已內建 Astro 支援，但需確保 `astro: true` 已啟用。

## Migration Plan

1.  安裝 `eslint` 和 `@antfu/eslint-config`。
2.  建立 `eslint.config.mjs` 配置文件。
3.  更新 `package.json` 中的 `scripts`，新增 `lint` 和 `lint:fix`。
4.  執行 `pnpm run lint:fix` 進行首次自動修復。
5.  手動檢查並微調仍有問題的代碼。
6.  （選配）設定 Git Hooks，確保提交前的代碼品質。

## Open Questions

- 是否需要導入 `simple-git-hooks` 和 `lint-staged` 來自動化提交前的檢查？
