---
title: React - 類式組件
date: 2021/07/28 22:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: 介紹 class component 最基礎的起手式。
---

# ⚛️ React - 類式組件

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 前言

介紹 class component 最基礎的起手式。

## React 起手式

1. 老規矩，先建立一個 HTML，並搭建好環境

    [還不知道 HTML 起手式請點我](/2021/07/26/2021-7-26-react-base/#React-起手式)

## 創建類式組件

1. 在 script 中，創建類式組件

    ```jsx
    // 1. 創建類式組件，必須繼承 React 中 Component 這個組件
    class Demo extends React.Component {
        // 類式組件必須要有 render
        render(){
            // render 中的實例變數是 Demo
            console.log('render 中的 this:', this)
            // 必須要有 return 返回值
            return <h2>我是類式組件</h2>
        }
    }
    // 2.讓 React 自動渲染組件到頁面，需注意組件首字母大寫且閉合
    ReactDOM.render( <Demo/>, document.getElementById( 'container' ) )
    
    ```

2. 畫面呈現
    ![class component](https://i.imgur.com/UiHFfl6.png)

3. 打開開發人員工具的 Console，可以看到類的實例變數 和 組件三大屬性
    ![開發人員工具](https://i.imgur.com/CWy1XsS.png)

## 執行組件後 React 做了什麼?

1. React 解析組件標籤，找到了 Demo 組件。
2. 發現組件是使用類定義的，隨後 new 出來該類的實例，並通過該實例調用到原型上的 render 方法。
3. 將返回的虛擬 DOM 轉為真實 DOM，隨後呈現在頁面中。

## 類式組件 5 大重點須知

1. 組件首字母必須大寫
2. 必須輸入`extends React.Component`繼承 React 中 Component 這個組件
3. 類式組件內必須要有 render 渲染
4. 必須要 return 返回值
5. 讓 ReactDOM 渲染必須使用閉合標籤

### 參考資料

- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
- [React 官網 - Components & Props](https://zh-hant.reactjs.org/docs/components-and-props.html)
