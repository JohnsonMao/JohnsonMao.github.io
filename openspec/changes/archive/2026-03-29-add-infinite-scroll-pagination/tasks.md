## 1. 建立資料生成基礎設施

- [x] 1.1 在 `src/utils/content.ts` 新增 `getPaginatedArticles()` 函式，按每頁 10 篇分組文章
- [x] 1.2 新增 `generatePaginatedArticles()` 函式以生成靜態 JSON 分頁檔案
- [x] 1.3 建立 `src/pages/api/articles/[lang]/page-[page].json.ts` 動態路由來生成 JSON 檔案

## 2. 實現 JSON 檔案生成機制

- [x] 2.1 在構建流程中整合 `generatePaginatedArticles()`，確保 `articles-data` 目錄被建立
- [x] 2.2 驗證每個 JSON 檔案包含 `page`, `locale`, `articles`, `hasMore` 欄位
- [x] 2.3 確保文章在 JSON 中按發布日期降序排列（最新優先）

## 3. 實現無限下拉 UI 元件

- [x] 3.1 建立 `src/components/InfiniteScrollUI.astro` 元件作為 Astro Island
- [x] 3.2 在元件中實現 Intersection Observer 以偵測頁面底部
- [x] 3.3 新增客戶端指令碼處理無限下拉邏輯（Fetch → Parse → Append）

## 4. 修改文章列表頁面

- [x] 4.1 修改 `src/pages/[...lang]/blog/index.astro`，僅靜態渲染前 10 篇文章
- [x] 4.2 將 InfiniteScrollUI 元件集成到頁面中
- [x] 4.3 確保首頁仍保有 SEO 友善性（靜態 HTML 包含前 10 篇文章）

## 5. 實現 Fetch 和資料解析

- [x] 5.1 實現 Fetch 邏輯，根據當前語言和頁碼構建 JSON URL
- [x] 5.2 新增錯誤處理機制，網路錯誤時允許用戶重試
- [x] 5.3 驗證 JSON 資料格式，確保所需欄位存在

## 6. 實現 DOM 插入和視覺一致性

- [x] 6.1 使用 `PostCard` 元件或相同樣式建立動態文章卡片
- [x] 6.2 確保動態文章卡片與靜態文章視覺一致
- [x] 6.3 實現防止重複載入的邏輯（同時只有一個 Fetch 在進行）

## 7. 測試和最佳化

- [x] 7.1 測試無限下拉功能是否正常運作
- [x] 7.2 驗證 JavaScript 禁用時仍能顯示首 10 篇文章
- [x] 7.3 測試不同語言的文章分頁是否正確
- [x] 7.4 驗證 SEO（檢查 HTML 中是否包含首 10 篇文章）

## 8. 整合和部署

- [x] 8.1 執行 `pnpm build` 驗證構建成功
- [x] 8.2 在本地開發環境測試無限下拉
- [x] 8.3 確保沒有遺留的 console 錯誤或警告
