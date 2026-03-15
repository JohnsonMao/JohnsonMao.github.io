## Why

為了確保專案代碼風格的一致性、提高可維護性並減少潛在的程式碼錯誤，我們需要引入自動化的代碼檢查工具。目前的專案缺乏統一的 Linting 規範，這可能導致多人協作或長期維護時的風格衝突。

## What Changes

- **新增 ESLint 配置**：引入 `@antfu/eslint-config` 作為基礎配置，並針對 Astro 和 TypeScript 進行優化。
- **自動化格式化**：整合代碼格式化功能（Formatters），一鍵修復排版問題。
- **腳本整合**：在 `package.json` 中新增 `lint` 與 `lint:fix` 指令。
- **文件規範**：建立專案專屬的代碼風格規範文件。

## Capabilities

### New Capabilities

- `code-quality`: 定義專案的代碼品質與風格檢查規範，包含 ESLint 配置與執行流程。

### Modified Capabilities

(none)

## Impact

- **Affected code**: `package.json`, `pnpm-lock.yaml`, 以及所有 `.ts`, `.astro`, `.md` 檔案（執行 lint:fix 後）。
- **New files**: `eslint.config.mjs`, `openspec/specs/code-quality/spec.md`。
- **Dependencies**: 新增 `eslint`, `@antfu/eslint-config` 開發依賴。
