---
title: React - 組件 與 模組
date: 2021/7/27 20:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: 提升開發效率，就要了解組件與模組的概念，用簡單的言語解說，並了解開發 React 所需要的開發者工具
---

# React - 組件 與 模組

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 前言

提升開發效率，就要了解組件與模組的概念，用簡單的言語解說，並了解開發 React 所需要的開發者工具

<!-- more -->

## 模組

1. 什麼是模組? 向外提供特定功能的 JS 程序，一般就是一個 JS 文件。
2. 為什麼要拆成模組呢? 隨著業務邏輯增加，代碼越來越多且複雜。
3. 最終結果是更能重複利用 JS，簡化 JS 編寫，提高 JS 的效率。

### 模組化

當應用程式的 JS 都以模組來編寫，就是一個模組化的應用程式

## 組件

1. 什麼是組件? 用來實現局部功能效果的代碼和資源的集合體（HTML / CSS / JS / Image）。
2. 為什麼拆成組件呢? 一個頁面的功能更複雜。
3. 最終結果是重複利用代碼，簡化項目編寫，提高運行效率。
![React module](https://i.imgur.com/REJTFyp.png)
*此為 React 官網作為範例*
React 官網一看，大致上可以拆成三個組件（Header / Content / Menu），甚至還可以拆得更細。

### 組件化

當應用程式是以多組件的方式完成，就是一個組件化的應用程式

## React 開發人員工具

在正式開發組件之前，要先下載 React 開發人員工具

1. 打開 Chrome 線上應用程式商店
2. 搜尋 [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=zh-TW) 並下載。
3. 點擊瀏覽器右上方的 Google 擴充功能，把開發者工具釘選上去。
    ![Google 擴充功能](https://i.imgur.com/3Uz8xcM.png)
4. 開發者工具會有三種顏色呈現方式
    |圖案|解說|
    |:--:|:--:|
    |![Unused React](https://i.imgur.com/IlEAqv5.png)|  灰色，表示當前網頁不是用 React 開發的 |
    |![Developer React](https://i.imgur.com/H3FqcQp.png)|  紅色，表示當前網頁還處於開發者模式，未打包上線 |
    |![Go live](https://i.imgur.com/5M7z7Gc.png)|  藍色，表示當前網頁已打包上線 |
5. 按 F12 開發者工具內會新增兩個選項
    ![Tools](https://i.imgur.com/MemNL3r.png)
    - Components 用來觀察網頁內有多少個組件組成的。
    - Profiler 用來記錄網站的性能。

### 參考資料

- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
- [React 官網 - Components & Props](https://zh-hant.reactjs.org/docs/components-and-props.html)
