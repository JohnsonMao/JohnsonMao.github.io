## 1. 基礎架構與目錄重構

- [x] 1.1 將現有內容移動至 `[slug]/[lang].md` 結構，並建立初始的 `_meta.ts`
- [x] 1.2 更新 `src/content.config.ts` 的 blog schema，移除 `lang` 和 `series` 欄位
- [x] 1.3 實作 Directory-based series grouping 的目錄掃描邏輯

## 2. 核心邏輯實作

- [x] 2.1 實作 Series path parsing 邏輯，從路徑中解析 `serieId` 與 `slug`
- [x] 2.2 實作 Shared metadata via _meta.ts 的載入與合併機制，將標籤同步至各語系
- [x] 2.3 更新 `src/utils/content.ts` 中的 `getSortedCollectionList` 與 `getCollectionEntry` 以支援新路徑

## 3. 組件與 UI 更新

- [x] 3.1 更新 `PostLayout.astro` 以獲取解析後的系列資訊
- [x] 3.2 確保 Independent Tag Module 能正確顯示合併後的共享標籤
- [x] 3.3 更新系列導航組件，根據目錄層級自動生成連結

## 4. 驗證與測試

- [x] 4.1 驗證 `src/content/blog/[seriesId]/[slug]/[lang].md` 的路徑解析正確
- [x] 4.2 驗證 `_meta.ts` 中的標籤已正確套用到所有語系文章
- [x] 4.3 執行 `pnpm run build` 確認靜態產出路徑無誤
