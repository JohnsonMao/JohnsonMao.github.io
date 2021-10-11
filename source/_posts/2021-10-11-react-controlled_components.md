---
title: React - 受控組件 與 非受控組件
date: 2021/10/11 14:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: 介紹受控組件與非受控組件的差異～
---

# React - 受控組件 與 非受控組件

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 前言

介紹**受控組件**與**非受控組件**的差異～

<!-- more -->

## 非受控組件

### 以表單為範例

1. 環境架設起手式不變
2. 使用類式組件

    ```jsx
    render(){
      return(
        <form action="https://www.google.com.tw/">
          <label for="username">帳號：</label>
          <input type="text" id="username" name="username"/><br/>
          <label for="password">密碼：</label>
          <input type="password" id="password" name="password"/><br/>
          <button>登入</button>
        </form>
      )
    }
    ```

    ![畫面呈現](https://i.imgur.com/Axl2Jci.png)

3. 測試輸入帳號`123`密碼`456`，確實發送數值
    ![url](https://i.imgur.com/4s2xAdz.png)

4. 幫`form`綁函式，並為`input`綁定`ref`，需注意`ref`獲取的是節點，要用`value`取值

    ```jsx
    handleSubmit = () => {
        const { username, password } = this;
        // ref 獲取的是節點，要用 value 取值
        alert(`你的帳號是 ${username.value} 密碼是 ${password.value}`);
    }

    render(){
        return(
          <form action="https://www.google.com.tw/" onSubmit={ this.handleSubmit }>
            <label for="username">帳號：</label>
            <input ref={ c => this.username = c } type="text" id="username" name="username"/><br/>
            <label for="password">密碼：</label>
            <input ref={ c => this.password = c } type="password" id="password" name="password"/><br/>
            <button>登入</button>
          </form>
        )
    }
    ```

    ![資料成功獲取，但網頁發生跳轉](https://i.imgur.com/2PhKSi9.png)

5. 添加`event.preventDefault()`阻止表單的默認行為

    ```jsx
    handleSubmit = (event) => {
        event.preventDefault(); // 阻止默認行為
        const { username, password } = this;
        alert(`你的帳號是 ${username.value} 密碼是 ${password.value}`);
    }
    ```

### 非受控組件定義

- 所有輸入類的`DOM`，只要是依靠`ref`現取現用，就是非受控的組件

## 受控組件

### 一樣的範例

1. 捨棄`ref`，改成用`onChange`取值

    ```jsx
    render(){
        return(
          <form action="https://www.google.com.tw/" onSubmit={ this.handleSubmit }>
            <label for="username">帳號：</label>
            <input onChange={this.saveUsername} type="text" id="username" name="username"/><br/>
            <label for="password">密碼：</label>
            <input onChange={this.savePassword} type="password" id="password" name="password"/><br/>
            <button>登入</button>
          </form>
        )
    }
    ```

2. 將獲取到的值存到狀態內

    ```jsx
    // 初始化狀態
    state = {
        username: '',
        password: '',
    }
    // 保存帳號到狀態裡
    saveUsername = (event) => {
        this.setState({username: event.target.value})
    }
    // 保存密碼到狀態裡
    savePassword = (event) => {
        this.setState({password: event.target.value})
    }
    ```

3. 回調函數改成從狀態裡取值

    ```jsx
    // 表單提交的回調函數
    handleSubmit = (event) => {
      event.preventDefault();
      const { username, password } = this.state; // 從狀態取值
      alert(`你的帳號是 ${username} 密碼是 ${password}`);
    }
    ```

    ![受控組件](https://i.imgur.com/ReVfD2Q.png)

### 受控組件定義

- 所有輸入類的`DOM`，隨著資料的輸入，把資料傳入狀態內，等需要使用時，再從狀態取出來，就是受控的組件
- 這跟 Vue 裡面的雙向綁定效果一樣

## 受控組件 與 非受控組件 的差異

- 非受控組件依靠`ref`取值，有多少個輸入框，就有多少個`ref` :-1: ([官方不建議過度使用`Refs`](https://zh-hant.reactjs.org/docs/refs-and-the-dom.html#dont-overuse-refs))
- 受控組件依靠狀態來存取值，有需要使用時再調出來 :+1:。

### 參考資料

- [React 官網 - 表單](https://zh-hant.reactjs.org/docs/forms.html)
- [React 官網 - Refs & DOM](https://zh-hant.reactjs.org/docs/refs-and-the-dom.html)
- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
