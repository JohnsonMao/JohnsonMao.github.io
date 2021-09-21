---
title: Day.2 「歡迎來到網頁這個世界！」 —— 認識網頁架構
date: 2021/9/11 22:00:00
index_img: https://i.imgur.com/xadMCtM.png
banner_img: https://i.imgur.com/xadMCtM.png
categories:
    - [程式語言, 前端, HTML]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - HTML
excerpt: 上一篇有講到網頁三兄弟，其中有一個老大哥負責撐起這個世界，那就是 HTML ，少了 HTML 這個根基，就不會有網頁。只有 HTML 的世界是非常無聊的，這時 CSS 和 Javascript 接連出現，為網頁世界創造更多的可能！
---

# Day.2 「歡迎來到網頁這個世界！」 —— 認識網頁架構

![「歡迎來到網頁這個世界！」 —— 認識網頁架構](https://i.imgur.com/xadMCtM.png)

## 網頁世界是由什麼組成？

上一篇有講到網頁三兄弟，其中有一個老大哥負責撐起這個世界，那就是 HTML ，少了 HTML 這個根基，就不會有網頁。
只有 HTML 的世界是非常無聊的，這時 CSS 和 Javascript 接連出現，為網頁世界創造更多的可能！

<!-- more -->

- HTML 負責撐起網頁
- CSS 負責為網頁增添色彩
- Javascript 負責為網頁增加互動性

## 認識 HTML

### HTML 是什麼？

HTML 是 Hyper Text Markup Language 的縮寫，中文翻譯為**超文本標示語言**，是樣板語言。

> 什麼是樣板語言？ 主要給樣板處理器（瀏覽器）產生畫面的語言

### 架構

HTML 的世界是由上往下建構的，最後會變成一個 DOM tree 樹狀圖。

> 什麼是 DOM？　DOM 是 Document Object Model 的縮寫，中文翻譯為**文件物件模型**

![HTML](https://i.imgur.com/pkhQ83z.png)
轉換成 樹狀圖架構
![DOM tree](https://i.imgur.com/zWx3NJn.png)

- 紅色框是 HTML5 的檔案聲明，用來告訴瀏覽器這個文件是什麼類型。
- 橙色框是最根部的標籤，用來標記網頁所使用的語言，如：`en` 為英文，`zh-TW` 為繁體中文。
- 黃色框是要給瀏覽器看的設定，不會顯示在網頁上。
  - `<meta>`是給瀏覽器看的設定值，如：字元編碼、RWD、網頁 icon 、網頁描述...等。
  - `<title>`是給網頁的標題。
  - `<link>`是用來引入 CSS 的。
  - `<script>`用來引入 Javascript 使用的，但大多數人會設在網頁尾端，之後再講為什麼。
- 綠色框是網頁的主要內容呈現。
- 藍色框是標籤的屬性。
- 樹狀圖具有上下關係，如：`<body>`子元素為`<h1>`、`<h1>`父元素為`<body>`。
- 父元素可以有多個子元素，子元素只有一個父元素。

### 標籤

![h1 tag](https://i.imgur.com/AS6R8dd.png)

- 深藍色字是標籤名稱
- 淺藍色字是屬性名稱
- 橘色字是屬性值
- 白色字是文本
- 大多數標籤都要使用結束標籤做結尾，如：`</h1>`

## HTML 是怎麼呈現的？

最原始的 HTML 是沒有所謂的區塊元素，而是各家的瀏覽器自己設定預設的樣式，讓 HTML 更加容易閱讀。

![h1 tag](https://i.imgur.com/PnXC70n.png)
*如圖 `<h1>` Google Chrome 內建樣式*

雖然各家瀏覽器的樣式都不太一樣，但整體大方向還是一樣的，都有區分出區塊元素與行內元素。
多數情況下，會用區塊元素劃分位置，行內元素會放在區塊元素內。

- 區塊元素（block）：在沒有使用 CSS ，會包覆著子元素蓋一整行，如：`div`、`h1`、`ul`...等。
- 行內元素（inline）：可以多個行內並排，直到排不下就會往下推擠，如：`span`、`img`、`input`...等。

<iframe height="300" style="width: 100%;" scrolling="no" title="HTML - block &amp; inline" src="https://codepen.io/vsfvjiuv-the-typescripter/embed/PojpZzZ?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/vsfvjiuv-the-typescripter/pen/PojpZzZ">
  HTML - block &amp; inline</a> by Johnson Mao (<a href="https://codepen.io/vsfvjiuv-the-typescripter">@vsfvjiuv-the-typescripter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
*為了更好的呈現效果，所以有稍微添加一些 CSS*

## 總結

現在已經初步認識網頁的架構了，明天將會深入了解各個標籤的用法與注意事項。
如果想自己做出樹狀圖，可以玩玩看，只是架構有點麻煩。

<iframe height="300" style="width: 100%;" scrolling="no" title="DOM tree" src="https://codepen.io/vsfvjiuv-the-typescripter/embed/PojpLeg?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/vsfvjiuv-the-typescripter/pen/PojpLeg">
  DOM tree</a> by Johnson Mao (<a href="https://codepen.io/vsfvjiuv-the-typescripter">@vsfvjiuv-the-typescripter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
