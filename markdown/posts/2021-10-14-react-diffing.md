---
title: React - DOM 的 diffing 算法
date: 2021/10/14 17:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: React 最核心的思想就是 Virtual DOM 與 Diff 演算法，來實現部分變化頁面 SPA 效果。
---

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 前言

React 最核心的思想就是 Virtual DOM 與 Diff 演算法，來實現部分變化頁面 SPA 效果。

## 虛擬 DOM 中，key 的作用範例

![key 使用 index 的影響](https://i.imgur.com/Aht0ETZ.gif)

- 會發現`key`設`index`的`input`框的內容並不會隨著資料綁定

## 經典面試題，虛擬 DOM 中 key 的作用

### React / Vue 中的`key`有什麼作用？

1. 簡單的說：`key`在虛擬 DOM 物件中作用於標記，在更新渲染畫面時，`key`扮演著重要的角色
2. 詳細的說：當狀態中的資料發生變化，React 會根據**新資料**，生成新的**虛擬 DOM**，接著 React 進行**新虛擬 DOM** 和 **舊虛擬 DOM** 的 diff 比較
    - 舊虛擬 DOM 中，找到和新虛擬 DOM 相同的`key`：
        - 若舊虛擬 DOM 資料沒變，直接使用之前真實 DOM
        - 若舊虛擬 DOM 資料改變，就生成新的真實 DOM，取代之前真實 DOM
    - 舊虛擬 DOM 中，沒找到與新虛擬 DOM 同樣的`key`：
        - 根據資料創建新的真實 DOM，渲染到畫面上

### 為什麼遍歷列表時，`key`最好不要用`index`?

1. 用`index`作為`key`可能會引發的問題
    - 若對資料進行逆序添加，逆序刪除等**破壞順序**的操作
        - 會產生沒有必要的真實 DOM 更新，效率低
    - 結構中有包含**輸入類**的 DOM
        - 會產生錯誤 DOM 更新，畫面出現問題
    - 若沒有使用逆序添加，逆序刪除等破壞順序的操作
        - 則不會產生問題

### 參考資料

- [深入理解React：diff 演算法](https://iter01.com/514750.html)
- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
