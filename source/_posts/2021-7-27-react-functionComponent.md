---
title: React - 函數式組件
date: 2021/7/27 21:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
tags:
    - React
    - 學習
excerpt: 介紹 function component 最基礎的起手式，這裡還不會介紹到 Hook 的運用。
---

# ⚛️ React - 函數式組件

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 前言

介紹 function component 最基礎的起手式，這裡還不會介紹到 Hook 的運用。

<!-- more -->

## React 起手式

1. 老規矩，先建立一個 HTML，並搭建好環境

    [還不知道 HTML 起手式請點我](/2021/07/26/2021-7-26-react-base/#React-起手式)

## 創建函數式組件

1. 在 script 中，創建函數式組件

    ```jsx
    // 1. 創建函數式組件，定義組件首字母要大寫
    function Demo(){
        // 此處 this 是 undefined，因為 Babel 編譯後開啟嚴格模式
        console.log( this )
        // 必須要有 return 返回值
        return <h2>我是函數式組件</h2>
    }
    // 2.讓 React 自動渲染組件到頁面，需注意組件首字母大寫且閉合
    ReactDOM.render( <Demo/>, document.getElementById( 'container' ) )
    
    ```

2. 畫面呈現
    ![function component](https://i.imgur.com/RZeT2Df.png)

3. 打開開發人員工具的 Components 頁面可以看到組件、屬性與版本
    ![開發人員工具](https://i.imgur.com/roztIxH.png)

## 執行組件後 React 做了什麼?

1. React 解析組件標籤，找到了 Demo 組件。
2. 發現組件是使用函數定義的，隨後調用該函數，將返回的虛擬 DOM 轉為真實 DOM，隨後呈現在頁面中。

## 函數式組件 3 大重點須知

1. 組件首字母必須大寫
2. 必須要 return 返回值
3. 讓 ReactDOM 渲染必須使用閉合標籤

### 參考資料

- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
- [React 官網 - Components & Props](https://zh-hant.reactjs.org/docs/components-and-props.html)
