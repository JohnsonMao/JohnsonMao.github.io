## 1. 基礎架構建立

- [x] 1.1 建立 `src/data/tags.ts` 並註冊現有的所有標籤 ID 與翻譯
- [x] 1.2 在 `src/utils/content.ts` 中實作 Master Tag Registry 的驗證邏輯
- [x] 1.3 確保 Build-time Tag Validation 會在偵測到無效標籤時中止建置

## 2. 內容與型別重構

- [x] 2.1 更新所有文章目錄下的 `_meta.ts`，引入 `TagId` 型別做強制約束
- [x] 2.2 修正所有拼寫不一致或未註冊的標籤 ID

## 3. UI 渲染優化

- [x] 3.1 在 `src/utils/content.ts` 或 `src/data/tags.ts` 實作 `getTagDisplay` 輔助函式
- [x] 3.2 更新 `PostCard.astro` 與 `PostLayout.astro`，使用 localized tag 名稱取代 ID
- [x] 3.3 更新標籤頁面 (`[tagId].astro`) 的標題，顯示翻譯後的名稱

## 4. 驗證

- [x] 4.1 執行 `pnpm run build` 驗證所有標籤是否都能正確解析
- [x] 4.2 刻意在某個 `_meta.ts` 加入未註冊標籤，驗證建置是否會正確失敗
