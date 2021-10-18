---
title: React - 用 Hello 認識框架組件
date: 2021/10/16 16:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: 透過 Hello World 來認識我們的組件與 CSS 模組化，以及使用 React 好用的 VS Code 套件。
---

# React - 用 Hello 認識框架組件

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 前言

透過 Hello World 來認識我們的組件與 CSS 模組化，以及使用 React 好用的 VS Code 套件。

<!-- more -->

## 使用 create-react-app 起手式

[如果還不知道怎麼起手式，點我](/2021/10/15/2021-10-15-create-react-app/#%E5%89%B5%E5%BB%BA%E4%B8%A6%E9%96%8B%E5%95%9F-%E4%BB%A5-NPM-%E7%82%BA%E4%BE%8B)

## 創建 Hello.js 組件

1. 在`src`資料夾內新增`Hello.js`，並使用類式組件

    ```jsx
    import React from 'react';
    import './Hello.css';

    class Hello extends React.Component {
      render() {
        return (
          <div>
            <h2>Hello world</h2>
          </div>
        )
      }
    }
    // 重點：預設輸出 Hello 組件
    export default Hello;
    ```

2. 把`index.js`入口文件，引入`Hello.js`組件

    ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom';
    // 引入 Hello 組件
    import Hello from './Hello';
    
    // 記得 render 內要加入 Hello 組件
    ReactDOM.render(
      <React.StrictMode>
        <Hello />
      </React.StrictMode>,
      document.getElementById('root')
    );
    ```

    ![Hello World](https://i.imgur.com/U7pVDP5.png)

3. 簡寫框架中類式組件

    ```jsx
    // 利用 React 框架的分別輸出接收 Component
    import React,{Component} from 'react';
    import './Hello.css';
    
    // 重點：創建同時回傳 Hello 組件
    export default class Hello extends Component {
      render() {
        return (
          <div>
            <h2>Hello world</h2>
          </div>
        )
      }
    }
    ```

### 幫組件分類

1. 在`src`資料夾中新增`components`資料夾，專門放組件
2. 在`components`資料夾中新增`Hello`資料夾，專門放`Hello`組件的東西
![Hello.js](https://i.imgur.com/gN6McwV.png)
3. 這時`index.js`引入的`Hello.js`位置就要修改

    ```jsx
    import Hello from './component/Hello/Hello';
    ```

4. 把剛剛的`Hello.js`改名成`index.jsx`
    > 會用`jsx`是用來區分組建和一般 JS 功能用的

    ![index](https://i.imgur.com/bGVuQYo.png)

5. 這時`index.js`引入的`Hello組件`就可以寫到資料夾，它會自動找`index`文件

    ```jsx
    import Hello from './component/Hello';
    ```

## 樣式模組化

有時候組件一多，樣式名稱不小心重疊，又因為後面的樣式會覆蓋前面的樣式，導致樣式跑掉。
如下圖第一個`Hello world`原本是設定紅色背景，被第二個樣式蓋過去
![CSS 模組化](https://i.imgur.com/HGHpf1O.png)

這時候有很多解決方法

- 如果是使用類似`SASS`技術，可以為每個組件樣式最外面多套一個 class
  - 把 SCSS 檔外層多套一個 class

    ```scss
    // 多套一層 hello
    .hello {
      .title {
        ...
      }
    }
    ```

- 幫 CSS 樣式模塊化
  1. 把檔名中間多加`.module`變成`Hello.module.css`
    ![module](https://i.imgur.com/HwKey3v.png)
  2. 把`Hello 組件`中的`index.jdx`
      ```jsx
      import React,{Component} from 'react';
      // 模塊化的引入法
      import hello from './Hello.module.css';

      // className 內使用 {} 包住引入
      export default class Hello extends Component {
        render() {
          return (
            <div>
              <h2 className={ hello.title }>Hello world</h2>
            </div>
          )
        }
      }
      ```

      ![效果展示](https://i.imgur.com/OTfqbwo.png)

## 推薦使用 VScode 套件

[ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

這個套件有提供程式模板

- ES6~ES7 emmet 語法
- React emmet 語法
- Redux emmet 語法

### 參考資料

- [React 官網](https://reactjs.org/)
- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
- [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
