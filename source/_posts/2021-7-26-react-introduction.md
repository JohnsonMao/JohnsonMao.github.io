---
title: React - 簡介
tags: React
date: 2021/7/26 21:00:00
---

# ⚛️ React - 簡介

## React 是什麼 ?

- React 是一個實作使用者介面的 JavaScript 函式庫。

## 誰開發的 ?

- 由 Facebook 開發，並且開源。

## 為什麼要學 ?

1. 原生 Javascript 操作 DOM 繁瑣，效率**低** ( DOM-API 操作 UI )。
2. 使用 Javascript 直接操作 DOM，瀏覽器會**大量重新**繪製畫面。

    ![原生 JS 渲染畫面流程，每次新增資料，都會重新渲染畫面](https://i.imgur.com/MAar8Vs.png)

3. 原生 Javascript 沒有**組件化**程式碼功能，程式碼重複利用率低。

## React 的優點

1. 採用**組件化**模式，**聲明式編碼**，提高開發效率及組件複用率。
    - 聲明式編碼 與 命令式編碼 的差別
        - 命令式編碼: 透過 Javascript 或 JQuery 拿到要操作的 DOM，並命令它改樣式。
            生活中的例子：
            > 老師口渴想喝水，命令同學去哪個地方裝水。
            > 這就是命令式編碼，其中少做任何步驟，老師都會喝不到水
        - 聲明式編碼: 透過一些特殊的語法，表達它是甚麼樣式，然後 React 自動幫你改了。
            生活中的例子：
            > 老師說喉嚨有點乾，同學自動站起來遞水過來。
            > 這就是聲明式編碼
  
2. React Native 中可以使用 React 語法進行**移動端開發**。

3. 使用**虛擬 DOM** + 優秀的 **Diffing 算法**，盡量減少與真實 DOM 的直接作用。

    ![React 渲染畫面流程，每次新增資料，都會比對虛擬 DOM，不一樣的 DOM 才渲染上去](https://i.imgur.com/3ibcbkp.png)

### 學習 React 所需要的 Javascript 知識

- [x] 判斷 this 指向
- [x] class 的概念
- [x] Javascript ES6 的語法規範
- [x] npm 套件管理工具
- [x] 繼承與原型鏈
- [x] 數列常用方法
- [x] 模組化

### 參考資料

- [React 官網](https://reactjs.org/)
- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
