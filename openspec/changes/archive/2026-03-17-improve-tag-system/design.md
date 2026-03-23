## Context

目前部落格已有標籤功能，但僅限於 `src/data/tags.ts` 中的簡單鍵值對對應，且缺乏全站標籤總覽頁面。

## Goals / Non-Goals

**Goals:**
- 提供全站標籤總覽功能。
- 支援標籤描述，提升 SEO 與內容豐富度。
- 顯示各標籤關聯的文章數量。

**Non-Goals:**
- 不涉及標籤的分層或關聯（如父子標籤）。
- 不涉及自動生成標籤（仍維持手動註冊）。

## Decisions

### 擴充 `src/data/tags.ts` 資料結構
目前的結構是 `id: { lang: name }`。
**決定：** 修改為 `id: { name: { lang: string }, description?: { lang: string } }`。
**理由：** 為了容納更多中繼資料（描述），需要更完整的物件結構，同時保持多語系支援。

### 標籤文章計數邏輯
**決定：** 在 `tag/index.astro` 的 `getStaticPaths` 或頁面邏輯中，利用 `getCollection('blog')` 獲取所有文章，並根據當前語系進行分組計數。
**理由：** 靜態生成時計算可確保數據準確，且不影響客戶端性能。

### 標籤總覽頁路徑
**決定：** 使用 `/src/pages/[...lang]/tag/index.astro`。
**理由：** 符合現有的多語系路徑慣例（如 `/zh-TW/tag` 或 `/tag`）。

## Risks / Trade-offs

- **[Risk] 註冊表變更導致類型錯誤** → **Mitigation:** 同步更新 `TagId` 類型與所有引用 `getTagDisplay` 的地方（如 `PostCard.astro`）。
- **[Trade-off] 靜態計算計數** → 當文章量極大時會增加建置時間，但以目前個人部落格規模，影響微乎其微。
