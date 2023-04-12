---
title: React - 生命週期
date: 2021/10/13 15:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: 什麼是生命週期？就如同人有生老病死，React 組件也有類似的概念！
---

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 前言

什麼是生命週期？就如同人有生老病死，React 組件也有類似的概念！

## 生命週期流程圖

[![React lefe cycle](https://i.imgur.com/mLgIOhx.png)](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
*圖片為 React 開發者製作，點擊圖片可以前往該網站*

## 初始化階段

**由`ReactDOM.render()`觸發，按順序初次渲染**

1. constructor()
    - 初始化
2. getDerivedStateFromProps
    - 需使用靜態方法 static
    - 可以接收參數`props`,`state`
    - 需返回一個狀態對象 或 `null`
3. render()
    - 渲染
4. componentDidMount()
    - DOM 掛載完成

## 更新階段

**由組件內部`this.setState()`或父組件，重新`render`渲染**

1. getDerivedStateFromProps
    - 需使用靜態方法 static
    - 可以接收參數`props`,`state`
    - 需返回一個狀態對象 或 `null`
2. shouldComponentUpdate()
    - 判斷是否繼續更新
3. render()
    - 渲染
4. getSnapshotBeforeUpdate
    - 更新前執行
    - 需返回一個值 或 `null`
    - 返回的快照值會給`componentDidUpdate()`
5. componentDidUpdate()
    - 更新完成
    - 有三個參數`prevProps`,`prevState`,`snapshotValue`

## 移除階段

**由`ReactDOM.unmountComponentAtNode()`觸發**

1. componentWillUnmount()
    - 即將卸載

## 常用的三個生命週期

1. render()
    - 初始化渲染
    - 更新渲染
2. componentDidMount()
    - 開啟監聽
    - 發送 Ajax 請求
3. componentWillUnmount()
    - 做一些收尾的工作，如：清空定時器

### 參考資料

- [React 生命週期流程圖](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
