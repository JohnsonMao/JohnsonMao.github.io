---
title: React - 框架
date: 2021/10/15 15:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: 框架是用來幫助工程師更快速創建模板所需要的配置，讓開發者能更快更工程化的建構出基本的網頁。
---

# React - 框架

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 前言

框架是用來幫助工程師更快速創建模板所需要的配置，讓開發者能更快更工程化的建構出基本的網頁。

<!-- more -->

## React 框架

1. 框架：用來幫助工程師快速創建模板
    - 包含了所需要的配置
    - 下載了所有相關的依賴
    - 可以直接運行簡單的效果
2. React 提供了一個創建 React 框架庫：`create-react-app`
3. 技術架構核心為：React + Webpack + ES6 + ESLink
4. 使用框架開發的特點：模組化、組件化、工程化

## 創建並開啟 ( 以 NPM 為例 )

注意：需對 NPM 或 Yarm 有基礎知識

1. 全局安裝：`npm i -g create-react-app`
2. 切換到想創建的目錄，使用：`create-react-app your_project_name`
3. 進入項目文件夾：`cd your_project_name`
4. 啟動項目：`npm start`
![React 畫面展示](https://i.imgur.com/Z3Qc3La.png)
5. 取消伺服器：按鍵盤上的`Ctrl`+`C`

## 架構

![React App 架構](https://i.imgur.com/7Lp43DB.png)

1. 紅色：框架所需用的依賴包
2. 藍色：靜態資源文件夾
    - `favicon.ico` 網頁圖標
    - **[`index.html` 主頁面，只會有一個， SPA 的概念](#indexhtml)**
    - `manifest.json` 應用程式加殼技術
    - `robots.txt` 爬蟲協議文件
3. 綠色：原始碼文件夾
    - `App.css` App 組件的樣式
    - **[`App.js` App 組件](#Appjs)**
    - `App.test.js` 用於給 App 做測試
    - `index.css` 主樣式
    - **[`index.js` 入口文件](#indexjs)**
    - `reportWebVitals.js` 是用來效能檢測用的
    - `setupTests.js` 是用來單元測試用的
4. `.gitignore` 是 Git 文件
5. `package-lock.json` NPM 的緩存文件
6. `package.json` 是套件說明文件
7. `README.md` 是說明文檔

### index.html

打開`public`內的`index.html`，可以發現他有一個`root`節點，負責展示出組件頁面的，只會有一個，節點也只會有一個

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

```

### App.js

打開`src`裡的`App.js`，可以發現它是一個函數式組件

```jsx
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

```

### index.js

打開`src`裡的`index.js`，會發現他有引入`React`、`ReactDOM`、`App`組件

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

```

### 參考資料

- [建立全新的 React 應用程式](https://zh-hant.reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains)
- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
