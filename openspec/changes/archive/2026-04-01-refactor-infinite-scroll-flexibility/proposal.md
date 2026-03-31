## 為什麼

InfiniteScrollUI 元件目前將樣板和資料獲取邏輯硬編碼在元件內部，使其只能用於特定的文章列表場景。為了提高元件的重用性和彈性，需要將樣板和資料獲取函數作為參數傳入，讓不同的使用情況能夠利用同一個元件。同時，需要將 i18n 標籤從 `@src/i18n/tags/` 遷移到 `@src/i18n/messages/` 以改進專案結構。

## 所有變更

- **遷移 i18n 標籤**：將 `@src/i18n/tags/` 目錄中的所有標籤定義移動到 `@src/i18n/messages/`，統一 i18n 資源的位置
- **參數化樣板**：InfiniteScrollUI 元件現在接受自訂樣板作為參數，而不是在元件內硬編碼
- **參數化資料獲取**：允許元件使用者傳入自訂的資料獲取函數，使元件能夠適應不同的資料源
- **增強彈性**：修改 InfiniteScrollUI 的 Props 介面，以支援更多元的使用場景

## 非目標（可選）

- 修改現有使用 InfiniteScrollUI 的頁面的功能行為
- 添加新的樣板類型或預設樣板
- 改變現有的 API 路由或資料格式

## 功能

### 新增功能

- `infinite-scroll-component-flexibility`: InfiniteScrollUI 元件現在支援通過 Props 傳遞自訂樣板和資料獲取函數，提高元件的重用性和彈性

### 修改的功能

- `i18n-tags-location`: 將 i18n 標籤位置從 `@src/i18n/tags/` 遷移到 `@src/i18n/messages/`

## 影響

- **受影響的程式碼**：
  - `src/components/InfiniteScrollUI.astro` - 主要元件檔案
  - `src/i18n/tags/` - 將被遷移
  - `src/i18n/messages/` - 接收遷移的標籤
  - 所有使用 InfiniteScrollUI 的頁面（需要更新導入路徑）
