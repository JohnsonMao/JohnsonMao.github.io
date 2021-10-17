---
title: React - PubSubJS 實現兄弟組件之間傳遞資料
date: 2021/10/17 14:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: 元件間如果要傳遞資料，都會傳遞給共同的組父元件，進行傳遞，而使用 PubSubJS，可以實現『兄弟』元件間的資料傳遞！
---

# React - PubSubJS 實現兄弟組件之間傳遞資料

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 前言

元件間如果要傳遞資料，都會傳遞給共同的組父元件，進行傳遞，而使用 PubSubJS，可以實現『兄弟』元件間的資料傳遞！

<!-- more -->

## 為什麼要使用 PubSubJS 套件

- React 兄弟組件間想要傳遞資料，必須透過共同的父組件

  ![正常的傳遞資料](https://i.imgur.com/XIhyilX.png)
  
- PubSubJS 解決溝通橋梁的問題，可以直接子組件對話

  ![PubSubJS 兄弟元件傳遞資料](https://i.imgur.com/bxWluEE.png)
  
- 尤其子組件越多層沒套件會更麻煩，有套件以後維護也更方便

## 如何使用 PubSubJS 套件

### 安裝 PubSubJS 套件(NPM 為例)

1. 終端機輸入`npm i pubsub-js`

### 引用並使用 PubSubJS 套件

1. 在需要用的組件引入`import PubSub from 'pubsub-js'`

2. 官方給的簡單案例

    - 負責接收資料的組件

      ```jsx
      // 創造一個函式
      const mySubscriber = function (msg, data) {
          console.log( msg, data );
      };

      // 新增訂閱消息(消息關鍵字, 函式)，可以搭配生命週期
      const token = PubSub.subscribe('MY TOPIC', mySubscriber);

      // 取消訂閱消息，搭配生命週期取消
      PubSub.unsubscribe(mySubscriber);
      ```

    - 負責傳遞資料的組件

      ```jsx
      // 發布消息(消息關鍵字, 要傳遞的資料)
      PubSub.publish('MY TOPIC', 'hello world!');
      ```

### 參考資料

- [PubSubJS - mroderick](https://github.com/mroderick/PubSubJS)
- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
