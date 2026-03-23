## Why

目前部落格雖有標籤功能，但缺乏整體的標籤探索入口（標籤總覽頁），且標籤僅有名稱，缺乏描述與豐富的中繼資料，不利於使用者探索內容及 SEO 優化。

## What Changes

- **新增標籤總覽頁**：建立一個可以查看所有標籤及其文章數量的頁面。
- **擴充標籤中繼資料**：在 `src/data/tags.ts` 中增加標籤的描述 (Description) 欄位，支援多語系。
- **強化標籤頁面內容**：在各別標籤頁面顯示該標籤的描述，提升內容質量。
- **優化標籤 SEO**：為標籤總覽頁與各別標籤頁配置獨立的 Meta 資訊。

## Capabilities

### New Capabilities

- `tag-index`: 提供部落格標籤的全局總覽入口，列出所有可用標籤及其關聯的文章計數。

### Modified Capabilities

- `blog-tags`: 擴充標籤註冊表的定義，納入描述等中繼資料，並要求標籤頁面顯示這些資訊。

## Impact

- `src/data/tags.ts`: 標籤註冊表結構變更。
- `src/pages/[...lang]/tag/index.astro`: 新增標籤總覽頁。
- `src/pages/[...lang]/tag/[tagId].astro`: 修改以顯示標籤描述與優化 SEO。
- `src/i18n/*.json`: 新增相關翻譯字串。
