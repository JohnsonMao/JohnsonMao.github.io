---
title: React - Route 基礎路由
date: 2021/10/18 15:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: 為什麼要使用路由？使用路由實作 SPA 網頁，可以減少頻寬浪費，提高使用體驗！那什麼是 SPA？是單頁網路應用，全名是 Single-Page Application...
---

# React - Route 基礎路由

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 為什麼要使用路由？

- 使用路由實作 SPA 網頁，可以減少頻寬浪費，提高使用體驗

### 什麼是 SPA？

在講 Route 之前，要先介紹一下什麼是 SPA

- SPA 是單頁網路應用，全名是 Single-Page Application
- 整個應用只有一個完整頁面
- 點擊頁面中的導航連結**不會刷新整個頁面**，只會頁面**局部刷新**
- 資料都透過 AJAX 請求獲取，並在前端異步展現

<!-- more -->

### 什麼是 Route 路由？

- 路由就是網站的**中間站** ( key: value )
- key 為路徑**path**，value 可能是後端的**function**或前端的**component**

## 如何使用路由？

### 安裝 React-Router-DOM 套件

1. 終端機輸入`npm i react-router-dom`

### 引用並使用 React-Router-DOM 套件

- #### 導覽連結（導航區） - 編寫路由連結

  1. 在需使用**導覽連結**的檔案上面引入

      ```jsx
      import { NavLink } from 'react-router-dom';
      ```

  2. **導覽連結**的`<a href='./your_path'>`標籤
      換成`<NavLink to='/your_path'>`
      - 需注意大小寫，`href`換成`to`，且路徑前面**不要**加`.`

- #### 引入路由組件（展示） - 註冊路由

  1. 在需使用**引入路由組件**的檔案上面引入

      ```jsx
      import { Route } from 'react-router-dom';
      ```

  2. **引入路由組件**原本的`<Your_component />`標籤
      換成`<Route path="/your_path" component={Your_component}/>`
      - 需注意大小寫

- #### 渲染畫面

  1. 在共同**渲染畫面**的檔案上面引入

      ```jsx
      import { BrowserRouter } from 'react-router-dom';
      ```

      或

      ```jsx
      import { HashRouter } from 'react-router-dom';
      ```

  2. **渲染畫面**原本的`<App />`標籤
      要被`<BrowserRouter>`標籤包住，表示同一個路由
      (此範例為引入`BrowserRouter`)

      ```jsx
      <BrowserRouter>
        <App />
      </BrowserRouter>    
      ```

      - 需注意大小寫

### BrowserRouter 與 HashRouter 有什麼不同？

- 底層原理不一樣
  - BrowserRouter 使用的是 HTML5 的 history API，不兼容 IE9 及以下的版本
  - HashRouter url 的哈希值
- path 表現形式不一樣
  - BrowserRouter 的路徑中沒有`#`，例如：`localhost:3000/demo`
  - HashRouter 的路徑包含`#`，例如：`localhost:3000/#/demo`
- 刷新後，對路由 state 參數的影響
  - BrowserRouter 沒有任何影響，因為 state 保存在 history 物件中
  - HashRouter 刷新後會導致，路由 state 參數的丟失
- **備註** HashRouter 可以解決一些路徑錯誤相關的問題
- **BrowserRouter 比較常用**

### 路由組件與一般組件有什麼不同？

- #### 一般組件

  - 通常放在 components 資料夾
  - 直接使用標籤`<Your_component />`
  - 接收父組件的**props**

- #### 路由組件

  - 通常放在 pages 資料夾
  - 使用路由標籤`<Route path="/your_path" component={Your_component}/>`
  - 接收路由器傳遞的固定三個屬性(下面為比較常用的)
    - history
      - go: ƒ go(n)  📝 前進 n 頁 API， n 可以正或負整數 
      - goBack: ƒ goBack()  📝 瀏覽器上一頁 API
      - goForward: ƒ goForward()  📝 瀏覽器下一頁 API
      - push: ƒ push(path, state)  📝 路由跳轉留下紀錄 API
      - replace: ƒ replace(path, state)  📝 路由跳轉不留下紀錄 API
    - location
      - pathname: "/your_path"  📝 獲取當前路徑
      - search: ""  📝 傳遞 search 參數用
      - state: undefined  📝 傳遞 state 參數用
    - match
      - params: {}  📝 傳遞 params 參數用
      - path: "/your_path"  📝 獲取當前路徑
      - url: "/your_path"  📝 獲取當前路徑

## 與路由相關的問題與功能

### NavLink 與 封裝 NavLink

- NavLink 能夠實現路由連結的 active 效果，可以透過`activeClassName`指定樣式名稱
- **標籤體內容**是一個特殊的標籤屬性
- 透過`this.props.children`可以獲取標籤體內容

### Switch

一般情況如果沒有使用`<Switch>`，程式會一路把`<Route>`符合路徑的都渲染出來。

使用`<Switch>`產生斷點，程式尋找`<Route>`一旦找到與`<NavLink>`相同路徑，就會終止繼續尋找後面的`<Route>`。

進而提升程式運行效率

#### 如何使用 Switch

1. 在要使用 Switch 的檔案引入`import { Switch } from 'react-router-dom'`

2. 把`<Route>`用`<Switch>`包起來

    ```jsx
    <Switch>
      <Route path="/hello" component={Hello}/>
      <Route path="/other" component={Other}/>
    </Switch>
    ```

### 樣式丟失問題？

#### 為什麼會丟失

當`url`路徑為多層路徑時，例如：`http://localhost:3000/mao/about`

這時按重新整理(F5)，會因為當前路徑的關係，就有可能會丟失樣式。

#### 有 3 個解決辦法

- `index.html`引入的 CSS 使用絕對路徑，把`./`改成`/`，
  例如：`<link rel="stylesheet" href="/your_css.css" />`
- `index.html`引入的 CSS `./`改成`%PUBLIC_URL%/`，
  例如：`<link rel="stylesheet" href="%PUBLIC_URL%/your_css.css" />`
- 原本引入`<BrowserRouter>`的檔案改使用`<HashRouter>`

### Redirect

當路由都沒辦法配對時，跳轉到 Redirect 所指定的路由

1. 要使用的檔案引入`import { Route, Switch, Redirect } from 'react-router-dom'`

2. 把`<Redirect>`放在`<Route>`最下面，`</Switch>`上面

    ```jsx
    <Switch>
      <Route path="/hello" component={Hello}/>
      <Route path="/other" component={Other}/>
      <Redirect to="/hello" />
    </Switch>
    ```

### 嵌套路由

路由裡面還能在套路由，這時路由又叫**嵌套路由**或**多級路由**
實作方法與普通路由一樣，只有兩點要**注意**

- 路由的配對是按照註冊路由的順序進行配對。
- 註冊子路由時，要寫上父路由的`path`值。

    ```jsx
    // 父路由 path="/home"
    // 子路由 path="/home/about"
    ```

### 路由的模糊配對與嚴格配對

#### 模糊配對

路由默認的情況是**模糊配對**

- 當`<NavLink to="/home/a/b">`能配對上`<Route path="/home">`
  - 需注意是按照順序配對，`NavLink`會拆解出`home` `a` `b`，然後按順序配對
  - 如果第一個沒配對上，後面就不會接續配對

#### 嚴格配對

- 當要使用**嚴格配對**時，在`Route`裡添加`exact`，如：`<Route exact path="/home">`
  - 這時要完全一模一樣才能配對
  - **注意**如果專案沒有因為模糊匹配出現問題，就沒必要使用嚴格配對

### 路由歷史紀錄的 push 與 replace

#### 歷史紀錄 push

路由默認的情況是**push**

- 當進行操作時，會留下歷史紀錄痕跡
  - 例如這時再按`.../other/message/02`會繼續疊上去
  - 按返回則會退回`.../other/message/01`
  ![歷史紀錄一層一層疊上去](https://i.imgur.com/UwNAlbV.png)

#### 歷史紀錄 replace

- 當要使用 replace 時，在`Route`裡添加`replace`，如：如：`<Route replace path="/home">`
- 這樣進行操作時，不會留下歷史紀錄痕跡
  - 例如這時再按`.../other/message/02`會取代`.../other/message/01`的紀錄，
  - 按返回則會退回`.../other/message`
  ![歷史紀錄再有設置 replace 組件那層會一直替換取代，只到按下沒有設置 replace 的組件](https://i.imgur.com/OnQCnLu.png)

### 參考資料

- [單頁應用 - 維基百科](https://zh.wikipedia.org/wiki/%E5%8D%95%E9%A1%B5%E5%BA%94%E7%94%A8)
- [React Router 官方網站](https://reactrouter.com/)
- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
