## Context

InfiniteScrollUI 元件是一個無限捲動的容器，用於載入和顯示分頁內容。目前，元件內部硬編碼了樣板結構（用於文章卡片、標籤等）和資料獲取邏輯（從 `/data/articles/{locale}/page-{number}.json` 獲取）。這使得元件只能用於特定的文章列表場景，無法在其他需要無限捲動功能的場景中重用。

同時，i18n 標籤目前位於 `@src/i18n/tags/` 目錄，但應該與其他 i18n 資源統一位於 `@src/i18n/messages/` 目錄下，以改進專案結構的一致性。

## Goals / Non-Goals

**Goals:**

- 使 InfiniteScrollUI 元件支援自訂樣板，允許使用者定義內容的渲染方式
- 使 InfiniteScrollUI 元件支援自訂資料獲取函數，允許使用者決定如何獲取資料
- 改進元件的類型安全，使用 TypeScript 泛型確保類型正確性
- 將 i18n 標籤從 `@src/i18n/tags/` 遷移到 `@src/i18n/messages/`，統一 i18n 資源位置
- 保持現有功能不變，向後相容性

**Non-Goals:**

- 修改或改進無限捲動的交互邏輯（如觀察器邏輯、加載狀態管理）
- 添加新的樣板類型或預設樣板集合
- 改變現有的路由或 URL 結構

## Decisions

### 支援自訂樣板和資料獲取函數

InfiniteScrollUI 將通過 Props 介面接收：
1. `renderItem(item: T): string` - 一個函數，用於將單個項目渲染為 HTML 字符串
2. `fetchNextPage(page: number, locale: string): Promise<PaginationResult<T>>` - 一個函數，用於獲取下一頁資料

**理由**：這種方法提供了最大的彈性，允許任何類型的內容和任何資料源。使用者可以完全控制樣板和資料獲取邏輯。

**考慮的替代方案**：
- 使用 Astro 插槽（slots）：無法充分支援複雜的樣板邏輯和狀態管理
- 使用配置對象：不如函數彈性，難以傳遞複雜的邏輯

### 使用 TypeScript 泛型確保類型安全

元件將接收一個泛型類型參數 `T`，表示資料項的類型。這確保了：
- `fetchNextPage` 返回 `Promise<PaginationResult<T>>`
- `renderItem` 接收 `item: T` 並返回 `string`
- 使用者的類型檢查能正確進行

**理由**：泛型提供了編譯時類型安全，減少運行時錯誤。

### i18n 標籤遷移策略

將 `@src/i18n/tags/` 中的所有標籤定義移動到 `@src/i18n/messages/`，並更新所有導入路徑。

**理由**：統一 i18n 資源的位置使專案結構更加一致，易於維護和查找資源。

## Risks / Trade-offs

**[Risk]** 將函數作為 Props 傳遞可能導致效能問題（例如，每次渲染都重新建立函數）
- **Mitigation**: 建議使用者使用 `useCallback` 或確保函數是穩定的引用。可以在文檔中提供最佳實踐指南。

**[Risk]** 使用 `renderItem` 返回 HTML 字符串可能增加 XSS 安全風險
- **Mitigation**: 記錄在文檔中，警告使用者應該對使用者輸入進行適當的轉義。如果需要，可以使用 TypeScript 中的標記類型來標記 HTML 字符串。

**[Risk]** 遷移 i18n 標籤可能導致導入路徑變更影響其他文件
- **Mitigation**: 進行全面的搜尋並更新所有相關的導入路徑。
