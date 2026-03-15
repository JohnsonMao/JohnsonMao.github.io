## Summary

實作中央標籤註冊表（Master Tag Registry）以統一管理多語系標籤與強化型別安全。

## Motivation

目前文章標籤以字串陣列形式散落在各個 `_meta.ts` 中，缺乏統一管理機制。這導致以下問題：
1. **多語系不一致**：無法統一翻譯標籤在不同語系下的顯示名稱。
2. **容易拼錯**：字串形式缺乏編譯時檢查，容易產生重複或錯誤的標籤 ID。
3. **維護困難**：修改標籤名稱時需要掃描所有文章。

透過中央註冊表，可以確保標籤的一致性、型別安全，並簡化多語系渲染邏輯。

## Proposed Solution

- **建立標籤註冊表**：新增 `src/data/tags.ts` 定義標籤 ID 及其各語系顯示名稱。
- **實作型別約束**：匯出 `TagId` 型別，並要求 `_meta.ts` 使用此型別。
- **加強建置驗證**：在內容解析邏輯中加入檢查，若使用未註冊的標籤 ID 則中止建置。
- **翻譯渲染機制**：提供 `getTagDisplay` 輔助函式，根據當前語系自動顯示正確的標籤名稱。

## Alternatives Considered (optional)

- **直接在 i18n JSON 定義**：雖然可以處理翻譯，但缺乏 TypeScript 型別保護，且 ID 依然散落在各處。
- **自動產出標籤清單**：雖然能減少手動註冊，但無法解決多語系顯示名稱的需求。

## Impact

- Affected specs: `blog-tags`, `i18n-ui`, `blog-content`
- Affected code: `src/data/tags.ts`, `src/utils/content.ts`, `src/components/blog/TagLink.astro`, `_meta.ts` files
