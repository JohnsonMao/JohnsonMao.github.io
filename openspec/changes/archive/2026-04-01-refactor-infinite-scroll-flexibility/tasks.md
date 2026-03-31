## 1. 遷移 i18n 標籤，實現 i18n tags location at @src/i18n/messages/ 並確保 i18n 標籤遷移策略

- [x] 1.1 檢查 `@src/i18n/tags/` 目錄中的所有標籤定義
- [x] 1.2 實現 directory structure consolidation，將標籤文件複製到 `@src/i18n/messages/` 目錄
- [x] 1.3 更新所有導入路徑，從 `@src/i18n/tags/` 改為 `@src/i18n/messages/`
- [x] 1.4 驗證沒有剩餘的導入來自舊位置，確保 no breaking changes to tag access
- [x] 1.5 移除 `@src/i18n/tags/` 目錄

## 2. 重構 InfiniteScrollUI 元件架構 (支援自訂樣板和資料獲取函數)

- [x] 2.1 定義泛型類型參數 T 和 Props interface for InfiniteScrollUI，用於表示資料項類型
- [x] 2.2 實現 component supports TypeScript generics，定義新的 Props 介面，包含 `renderItem` 和 `fetchNextPage` 函數參數
- [x] 2.3 實現 InfiniteScrollUI accepts custom item renderer，移除硬編碼的樣板定義，改用傳入的 `renderItem` 函數來渲染項目
- [x] 2.4 實現 InfiniteScrollUI accepts custom data fetching function，移除硬編碼的資料獲取邏輯，改用傳入的 `fetchNextPage` 函數
- [x] 2.5 更新 `loadNextPage` 方法，使用新的 `fetchNextPage` 函數和 TypeScript 泛型支持

## 3. 實現向後相容性包裝器和 TypeScript 泛型支持 (Backward compatibility wrapper 和使用 TypeScript 泛型確保類型安全)

- [x] 3.1 建立新的文章特定版本元件（如 `InfiniteScrollArticles.astro`），實現向後相容性包裝器
- [x] 3.2 在包裝器中實現預定義的 `renderItem` 函數，支援文章樣板渲染
- [x] 3.3 在包裝器中實現預定義的 `fetchNextPage` 函數，支援文章資料獲取
- [x] 3.4 確保包裝器與原有的元件行為相同，驗證 TypeScript 泛型類型檢查

## 4. 測試與驗證

- [x] 4.1 編寫或更新測試，驗證新的 InfiniteScrollUI 元件支援自訂 `renderItem` 函數
- [x] 4.2 編寫或更新測試，驗證新的 InfiniteScrollUI 元件支援自訂 `fetchNextPage` 函數
- [x] 4.3 驗證 TypeScript 類型檢查正確
- [x] 4.4 在現有的文章頁面中使用包裝器元件進行集成測試
- [x] 4.5 驗證新的 i18n 標籤導入路徑在運行時正常工作

## 5. 文檔更新

- [x] 5.1 更新 InfiniteScrollUI 元件的使用文檔，說明新的 Props 和泛型參數
- [x] 5.2 提供示例代碼展示如何使用自訂 `renderItem` 和 `fetchNextPage` 函數
- [x] 5.3 記錄 i18n 標籤的新位置
