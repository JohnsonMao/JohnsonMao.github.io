## 1. 資料層與基礎建設 (Data & Foundation)

- [x] 1.1 實作 擴充 `src/data/tags.ts` 資料結構，修改 Master Tag Registry 支援名稱與描述的物件格式。
- [x] 1.2 實作 Tag Description Support，新增 `getTagDescription` 函式並更新 `getTagDisplay` 以適應新結構。
- [x] 1.3 在 `src/i18n/*.json` 中新增標籤總覽頁（Tag Index Page）所需的翻譯字串與 SEO metadata。

## 2. 標籤總覽頁面 (Tag Index Page)

- [x] 2.1 實作 標籤總覽頁路徑 (`src/pages/[...lang]/tag/index.astro`)，列出所有註冊標籤。
- [x] 2.2 在標籤總覽頁中實作「標籤文章計數邏輯」，顯示每個標籤關聯的非草稿文章數。
- [x] 2.3 為標籤總覽頁實作 Tag Index SEO，配置正確的標題與描述。

## 3. 標籤細節頁優化 (Tag Detail Page Optimization)

- [x] 3.1 修改 `src/pages/[...lang]/tag/[tagId].astro` 以實作 Tag Page Displays Description，在頁首呈現標籤描述。
- [x] 3.2 實作 Tag SEO metadata optimization，將標籤描述應用於個別標籤頁的 Meta Description。

## 4. 驗證與清理 (Validation & Cleanup)

- [x] 4.1 驗證所有標籤連結（包括 PostCard.astro）在結構變更後依然運作正常。
- [x] 4.2 執行測試以確保 `getTagDisplay` 與新結構的相容性。
