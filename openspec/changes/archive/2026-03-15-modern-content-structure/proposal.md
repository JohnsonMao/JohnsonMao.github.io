## Summary

實作以目錄為基礎的系列文管理結構與 `_meta.ts` 共享標籤機制。

## Motivation

目前的中英雙語部落格在管理「標籤（Tags）」與「系列（Series）」時，存在重複勞動與資料不同步的風險。透過 `[serie]/[slug]/[lang].md` 目錄結構與同層級的 `_meta.ts` 共享設定，可以確保標籤在各語系間永遠一致，並讓系列文的撰寫流程更符合直覺。

## Proposed Solution

- **目錄結構重構**：將內容路徑調整為 `src/content/blog/[serieId]/[slug]/[lang].md`（獨立文章則為 `[slug]/[lang].md`）。
- **標籤同步機制**：在文章目錄下建立 `_meta.ts` 存放共享標籤。標籤不再存在於 Markdown 檔案中。
- **日期獨立管理**：`pubDate` 保留在各語系的 Markdown 檔案中，以支援獨立的發布排程。
- **路由與解析邏輯更新**：修改 `src/utils/content.ts` 的 ID 解析與標籤合併邏輯，自動抓取系列 ID 與目錄下的共享元數據。

## Alternatives Considered (optional)

- **自動同步腳本**：透過 Pre-commit hook 同步所有語系的 Markdown tags，但這增加了維護負擔且容易出錯。
- **獨立 Series JSON**：需要額外維護 JSON，且撰寫新文章時需離開當前目錄，不如目錄結構直覺。

## Impact

- Affected specs: `blog-content`, `i18n-routing`
- Affected code: `src/utils/content.ts`, `src/content.config.ts`, `src/layouts/PostLayout.astro`
