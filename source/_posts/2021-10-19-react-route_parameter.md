---
title: React - Route 路由 與 參數
date: 2021/10/19 14:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: 學會 Route 後，路由也可以帶有參數！並藉由參數傳遞資料～而有三種參數傳遞的方法，下面我們一一介紹！
---

# React - Route 路由 與 參數

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 前言

學會 Route 後，路由也可以帶有參數！並藉由參數傳遞資料～而有三種參數傳遞的方法，下面我們一一介紹！

<!-- more -->

## 傳遞 params 參數

1. 首先為路由組件，傳遞 params 參數

    ```jsx
    // 先初始化 state
    state = {
      msgArr : [
        {id:'01', title:'消息1'},
        {id:'02', title:'消息2'},
        {id:'03', title:'消息3'},
      ]
    }
    render(){
      const {msgArr} = this.state
      return(
        <div>
          <ul>
            {
              msgArr.map((msgObj)=>{
                return (
                  <li key={msgObj.id}>
                    {/* 向路由組件傳遞 params 參數，需注意反斜線是 JS 表達是要用{}包起來，多個參數用 / 分隔 */}
                    <Link to={`/home/about/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>}
                  </li>
                )
              })
            }
          </ul>
          {/* 接收 params 參數要用 : 來接收，參數名稱( key )取決於 : 後面的值 */}
          <Route path="/home/about/:id/:title" component={Message}/>
        </div>
      )
    }
    ```

2. 負責接收 params 參數的路由組件，利用`console.log`來看傳遞的參數

    ```jsx
    render(){
      console.log(this.props)
      return(
        ...
      )
    }
    ```

    ![可以看到 match 裡面的 params 有攜帶物件參數](https://i.imgur.com/vFzvGyd.png)

3. 此時 url 後面會攜帶參數，如：`.../home/about/01/消息1`

4. 如果要使用 params 參數，就可以利用`this.props.match.params`來獲取參數

### params 參數總結

- 路由連結，需攜帶參數，多個參數用`/`分隔
- 註冊路由，需接收參數，使用`:`來接收參數
- 利用`this.props.match.params`來獲取參數

## 傳遞 search 參數

1. 首先為路由組件，傳遞 search 參數

    ```jsx
    // 先初始化 state
    state = {
      msgArr : [
        {id:'01', title:'消息1'},
        {id:'02', title:'消息2'},
        {id:'03', title:'消息3'},
      ]
    }
    render(){
      const {msgArr} = this.state
      return(
        <div>
          <ul>
            {
              msgArr.map((msgObj)=>{
                return (
                  <li key={msgObj.id}>
                    {/* 向路由組件傳遞 search 參數，在 ? 後面寫 key=value，多個參數用 & 連接 */}
                    <Link to={`/home/about/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>}
                  </li>
                )
              })
            }
          </ul>
          {/* search 參數不需聲明接收 */}
          <Route path="/home/about/" component={Message}/>
        </div>
      )
    }
    ```

2. 負責接收 search 參數的路由組件，利用`console.log`來看傳遞的參數

    ```jsx
    render(){
      console.log(this.props)
      return(
        ...
      )
    }
    ```

    ![可以看到 location 裡面的 search 有攜帶 urlencoded 編碼](https://i.imgur.com/b9pUaBz.png)

3. 在接收 search 參數的組件內使用 React 內建的 JS 庫 - QueryString

    ```jsx
    import qs from 'querystring'
    
    export default class Message extends Component {
      render(){
        console.log(this.props)
        const {search} = this.props.location
        {/* 需把第一個問號給刪掉，可以使用 slide 來去除第一個問號 */}
        const result = qs.parse(search.slide(1))
        console.log(result)
      }
    }
    ```

    ![藉由 querystring 庫裡的 parse 方法，把 urlencoded 轉成物件型態](https://i.imgur.com/zzehsYm.png)

4. 此時 url 後面會攜帶參數，如：`.../home/about/?id=01&title=消息1`

5. 接著就可以利用`result`的參數，來繼續後面的操作

### search 參數總結

- 路由連結，需攜帶參數，在`?`後面寫`key=value`，多個參數用`&`連接
- 正常註冊路由
- 利用`this.props.location.search`來獲取`unlencoded`
- **注意** 獲取到的`unlencoded`需透過 QueryString 進行解析

## 傳遞 state 參數

**注意**：此 state 參數，與組件裡的 state 沒有關係

1. 首先為路由組件，傳遞 state 參數

    ```jsx
    // 先初始化 state
    state = {
      msgArr : [
        {id:'01', title:'消息1'},
        {id:'02', title:'消息2'},
        {id:'03', title:'消息3'},
      ]
    }
    render(){
      const {msgArr} = this.state
      return(
        <div>
          <ul>
            {
              msgArr.map((msgObj)=>{
                return (
                  <li key={msgObj.id}>
                    {/* 向路由組件傳遞 state 參數，在 JS 表達式內傳遞物件，物件內要有 pathname, state */}
                    <Link to={{
                      pathname:'/home/about/message', 
                      state: {
                        id: msgObj.id,
                        title: msgObj.title
                      }
                    }}>{msgObj.title}</Link>}
                  </li>
                )
              })
            }
          </ul>
          {/* state 參數不需聲明接收 */}
          <Route path="/home/about/" component={Message}/>
        </div>
      )
    }
    ```

2. 負責接收 state 參數的路由組件，利用`console.log`來看傳遞的參數

    ```jsx
    render(){
      console.log(this.props)
      return(
        ...
      )
    }
    ```

    ![可以看到 location 裡面的 state 有攜帶物件參數](https://i.imgur.com/xvAYTv8.png)

3. 此時 url 後面並不會攜帶參數，如：`.../home/about`

    **注意**
      - 因為沒攜帶參數，所以是藉由`history`內的`location`來獲取參數
      - 如果`history`清除紀錄，`location`裡的`state`會變成`undefined`
      - 所以要使用判斷表達式，如果是`undefined`就傳遞空物件，來避免無法預期的出錯

4. 如果要使用 state 參數，就可以利用`this.props.location.state`來獲取參數

### state 參數總結

- 路由連結，需攜帶參數，在`to`裡面新增物件`{{}}`，最外層的`{}`是 JS 表達式，物件內需有 path 字串 與 state 物件
- 正常註冊路由
- 利用`this.props.location.state`來獲取物件參數
- **備註** 畫面刷新也可以保留參數

## 路由參數總結

- params 參數，最常用

  - 路由連結，需攜帶參數，多個參數用`/`分隔
  - 註冊路由，需接收參數，使用`:`來接收參數
  - 利用`this.props.match.params`來獲取參數

- search 參數，也是有使用，但比較麻煩

  - 路由連結，需攜帶參數，在`?`後面寫`key=value`，多個參數用`&`連接
  - 正常註冊路由
  - 利用`this.props.location.search`來獲取`unlencoded`
  - **注意** 獲取到的`unlencoded`需透過 QueryString 進行解析


- state 參數，在比較需要隱私的地方會使用

  - 路由連結，需攜帶參數，在`to`裡面新增物件`{{}}`，最外層的`{}`是 JS 表達式，物件內需有 path 字串 與 state 物件
  - 正常註冊路由
  - 利用`this.props.location.state`來獲取物件參數
  - **備註** 畫面刷新也可以保留參數

### 參考資料

- [React 中優雅使用網址參數 QueryString](https://medium.com/itsoktomakemistakes/react-%E4%B8%AD%E5%84%AA%E9%9B%85%E4%BD%BF%E7%94%A8%E7%B6%B2%E5%9D%80%E5%8F%83%E6%95%B8-query-string-540bacd08486)
- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
