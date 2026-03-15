## Context

目前部落格的中英雙語內容管理分散在各個 Markdown 檔案的 frontmatter 中。這導致在更新標籤（Tags）時需要同步修改多個檔案，且系列文（Series）的順序與關聯性缺乏直覺的組織方式。

## Goals / Non-Goals

**Goals:**

- 實作以目錄結構定義系列文的機制。
- 透過 `_meta.ts` 實現單一來源（Single Source of Truth）的標籤管理。
- 支援各語系獨立的發布日期。
- 提供自動化的系列導航。

**Non-Goals:**

- 不實作多作者支援。
- 不改變現有的 Astro i18n 路由邏輯。

## Decisions

### 1. 多層級目錄結構解析 (Nested Directory Parsing)
- **決策**：採用 `[seriesId]/[slug]/[lang].md` 作為系列文路徑，`[slug]/[lang].md` 作為獨立文章路徑。
- **理由**：直接利用檔案系統建立層級關係，無需額外的 JSON 設定。
- **替代方案**：在 frontmatter 中手動填寫 `seriesId`。這在撰寫時容易遺漏或拼錯。

### 2. `_meta.ts` 作為共享元數據 (Shared Metadata)
- **決策**：在 `[slug]/` 目錄下放置 `_meta.ts` 定義標籤。
- **理由**：標籤在跨語系間通常是技術性的、一致的。改一次即可全語系生效。
- **替代方案**：使用 `_meta.yaml`。選用 `.ts` 是為了與專案整體技術棧保持一致，且未來可加入簡單的型別邏輯。

### 3. ID 與 Slug 的分離 (Slug Separation)
- **決策**：從路徑中解析 `seriesId`，並將文章目錄名（去掉數字前綴）作為 `slug`。
- **理由**：允許在目錄名中使用 `01-`, `02-` 控制撰寫順序，但不影響產出的 URL 美觀。

## Risks / Trade-offs

- **[Risk]**：Service Worker 或 Sitemap 需要更新路徑邏輯。 → **Mitigation**：確保 `src/utils/content.ts` 輸出的 ID 格式保持穩定。
- **[Risk]**：`_meta.ts` 的載入效能。 → **Mitigation**：使用 Vite 的 `import.meta.glob` 並在建置時快取結果。
