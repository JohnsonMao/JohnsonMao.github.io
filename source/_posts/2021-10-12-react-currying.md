---
title: React - 高階函數柯里化
date: 2021/10/12 15:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: 什麼是高階函數？函數只要符合其中一點，就是高階函數。
---

# React - 高階函數柯里化

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 什麼是高階函數？

函數只要符合下面其中一點，就是高階函數

- 如果函數接收的參數是一個函數
- 如果函數調用的返回值依然是一個函數

常見的高階函數：`Promise`、`setTimeout`、`Array.map`...

<!-- more -->

## 函數柯里化

通過函數調用，繼續返回函數的方式，實現多次接收參數，最後一起處理的函數形式

## 還沒優化受控組件的 `onChange`

以受控組件表單為例

- 有多少個輸入框，就有多少個方法
- 每個方法都是做重複的一件事情，把值存入狀態裡

```jsx
state = {
    username: '',
    password: '',
}
// #1 保存帳號到狀態裡
saveUsername = (event) => {
    this.setState({username: event.target.value})
}
// #2 保存密碼到狀態裡
savePassword = (event) => {
    this.setState({password: event.target.value})
}
handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state; // 從狀態取值
    alert(`你的帳號是 ${username} 密碼是 ${password}`);
}
render(){
    return(
      <form action="https://www.google.com.tw/" onSubmit={ this.handleSubmit }>
        <label for="username">帳號：</label>
        <input 
        onChange={this.saveUsername} 
        type="text" id="username" name="username"/><br/>
        <label for="password">密碼：</label>
        <input 
        onChange={this.savePassword} 
        type="password" id="password" name="password"/><br/>
        <button>登入</button>
      </form>
    )
}
```

## 使用柯里化方法

1. 優化`onChange`方法，將功能相同，參數不同的方法變成一個
    - 首先理解綁定事件的回調函數
        - 回調函數不加`()`是把函數做為回調函數
        - 回調函數若加`(參數)`則是把**返回值**做為回調

    ```jsx
    <label for="username">帳號：</label>
    
    // 把 onChange 的函數變成一樣的，並透過參數來區別
    <input 
    onChange={this.saveFormData('username')} 
    type="text" id="username" name="username"/><br/>
    <label for="password">密碼：</label>
    
    // 把 onChange 的函數變成一樣的，並透過參數來區別
    <input 
    onChange={this.saveFormData('password')} 
    type="password" id="password" name="password"/><br/>
    <button>登入</button>
    ```

2. 將原本的函數改成柯里化函數

    ```jsx
    saveFormData = (dataType) => {
        // 利用 return 回傳函數
        return (event) => {
          // 物件內接收變數需用 []
          this.setState({ [dataType] : event.target.value})
        }
    }
    ```

    ![畫面展示](https://i.imgur.com/ReVfD2Q.png)

## 不使用柯里化的優化方法

1. 將原本的柯里化函數改成普通回調函數

    ```jsx
    saveFormData = (dataType, event) => {
          // 嘗試直接取得值
          this.setState({ [dataType] : event.target.value})
        }
    }
    ```

2. 將`onChange`回調函數，改成回調箭頭函數

    ```jsx
    <label for="username">帳號：</label>
    
    // 把 onChange 的函數變成回調箭頭函數
    <input 
    onChange={(event)=>this.saveFormData('username', event)} 
    type="text" id="username" name="username"/><br/>
    <label for="password">密碼：</label>
    
    // 把 onChange 的函數變成回調箭頭函數
    <input 
    onChange={(event)=>this.saveFormData('password', event)} 
    type="password" id="password" name="password"/><br/>
    <button>登入</button>
    ```

### 參考資料

- [React 官網 - 高階組件](https://zh-hant.reactjs.org/docs/higher-order-components.html)
- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
