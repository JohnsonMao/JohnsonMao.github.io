---
title: React - 基礎
date: 2021/07/26 22:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: 學習 React 中最重要的角色「Babel」，Babel 是 Javascript 的編譯器，有了 Babel 就能更方便順暢的使用 React
---

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 前言

學習 React 中最重要的角色「Babel」，Babel 是 Javascript 的編譯器，有了 Babel 就能更方便順暢的使用 React

## React - 基礎環境引入

1. Babel
    - `<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>`
    1. 瀏覽器不認識 ES6，依靠 Babel 把 ES6 轉成 ES5
    2. 瀏覽器不認識 jsx，依靠 Babel 把 jsx 轉成 js
    3. 可以更流暢的編碼
2. React 核心庫
    - `<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>`
3. React 擴展庫（讓 React 幫你操作 DOM）
    - `<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>`

## React 起手式

1. 首先建立一個 HTML

    ```HTML
    <!-- 先準備一個容器 -->
    <div id="container"></div>

    <!-- 引入 React 核心庫 -->
    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <!-- 引入 React DOM，用來讓 React 操作 DOM -->
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <!-- 引入 Babel，用來將 jsx 轉成 js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>

    <!-- 這裡一定要寫 type="text/babel" -->
    <script type="text/babel">

    </script>
    ```

2. 並在 script 內編寫虛擬 DOM

    ```jsx
    // 1. 首先創建虛擬 DOM
    const VDOM = {
        <h1 id="test">Hello world</h1>
    }
    // 2. 渲染虛擬 DOM 到頁面
    ReactDOM.render( VDOM, document.getElementById('container') )
    ```

3. 畫面呈現
    ![Hello world](https://i.imgur.com/qh3CLyD.png)

## React - jsx 語法規則 與 必須知道的地方

1. 這時候 HTML 添加樣式

    ```HTML
    <style>
    .bg-hexschool {
        background: #69F0AE;
    }
    </style>
    ```

2. script 內將內容用變數的方式展現

    ```jsx
    // 1. 宣告變數    
    const myId = "test"
    const myData = "Hello world"
    
    // 2. 建創虛擬 DOM
    const VDOM = (
        // 虛擬 DOM 只能有一個根標籤
        <div>
        {/* jsx 語法範例如下 */}
        {/* class 要改成 className */}
        {/* style 要用 {{ key=value }} 包起來，並採用駝峰命名法 */}
        <h1 id={ myId } 
            className="bg-hexschool" 
            style={{ fontSize:'20px' }}>
                {/* JS 表達式都要用 {} 包起來，包含註解 */}
                { myData }
            </h1>
            <p>虛擬 DOM 只能用一個標籤包起來</p>
            {/* 標籤需要閉合，例如最後面加 "/" */}
            <input type="text"/>
        </div>
         // <p>這個沒有被包起來，會報錯</p>
    )
    // 3. 渲染虛擬 DOM 到頁面
    ReactDOM.render( VDOM, document.getElementById('container') )
    ```

3. 畫面呈現
    ![jsx 運用](https://i.imgur.com/1lrecAZ.png)

### 總結 jsx 語法規則

1. 定義虛擬 DOM 時，不要寫**引號**。
2. 標籤中混入 JS 表達式要用 `{}` 包起來。
3. 樣式的類名指定不要用 `class`，要用 `className`。
4. 內聯樣式，要用 `style={{ key=value }}`的形式去寫。
    1. key 如果像是 `font-size`，要改成**駝峰命名** `fontSize`。
    2. value 需要用**引號**包起來。
5. 虛擬 DOM 必須只有**一個根標籤**
6. 標籤必須**閉合**
7. 標籤首字母
    1. 如果小寫開頭，則將把標籤轉為 HTML 中同名元素，如果 HTML 中無該標籤同名元素，則報錯。
    2. 如果大寫開頭，React 就去渲染對應的組件，如果組件沒有定義，則報錯

### 參考資料

- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
- [React 官網 - CDN 連結](https://zh-hant.reactjs.org/docs/cdn-links.html)
- [React 官網 - JSX 介紹](https://zh-hant.reactjs.org/docs/introducing-jsx.html)
