---
title: 多語系示範
description: 說明本站中英雙語與 fallback 行為。
pubDate: 2025-02-18
tags:
  - i18n
  - astro
---

本文介紹部落格的多語系設定。

## 行為說明

- 列表會顯示所有文章，同一 slug 只顯示一筆（依當前語系優先）
- 文章頁若該語系無內容，會 fallback 到其他語系並顯示「本頁內容尚未翻譯」
