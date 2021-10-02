---
title: Day.23 「更加認識 DOM，並初次了解事件綁定」 —— JavaScript DOM
date: 2021/10/2 17:30:00
index_img: https://i.imgur.com/slZvdj6.png
banner_img: https://i.imgur.com/slZvdj6.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
excerpt: 我們之前在 HTML 篇章有介紹 DOM，是 Document Object Model 的縮寫！我們主要操作 DOM 來控制網頁內容～
---

# Day.23 「更加認識 DOM，並初次了解事件綁定」 —— JavaScript DOM

![「更加認識 DOM，並初次了解事件綁定」 —— JavaScript DOM](https://i.imgur.com/slZvdj6.png)

我們之前在 HTML 篇章有介紹 DOM，是 Document Object Model 的縮寫！
我們主要操作 DOM 來控制網頁內容

- Document 代表了**整個 HTML 網頁**
- Object 代表把網頁中每個部分節點都轉變成**物件**
- Model 代表用來表示物件之間的關係，形成容易理解的樹狀圖，也就是 **DOM Tree**

![DOM tree](https://i.imgur.com/zWx3NJn.png)

還記得它吧～

## 利用 DOM 取得文本內容

之前已經認識了網頁標籤，而現在我們要透過 JavaScript 來獲取我們的網頁節點！
假設我們要獲取 `button` 內的文本內容

```html
<button class="btn" id="btn">我是按鈕</button>
```

### 獲取文本內容

- 可以使用 `textContent` 來獲取文本內容**字**的部分，同時也能依靠它來變更文本內容
- 可以使用 `innerHTML` 來獲取文本內容，與 `textContent` 相比更方便常用，除了獲取到文本內容的字，連文本內容的標籤也會獲取，同時也能依靠它來變更文本內容與標籤

### 獲取節點

而獲取節點的方法也很多，我來講幾個比較常用的獲取方法～

- 透過 `id` 來獲取 `document.getElementById("");`，因為 `id` 單一的特性，所以只會獲取到一個節點

```javascript
const btn = document.getElementById("btn");
console.log( btn.innerHTML );  // "我是按鈕"
```

- 透過 元素節點 來獲取 `document.getElementsByTagName("");` ，需注意因為 元素節點 是**複數**，所以會獲得一個類似陣列的**物件**，並以索引值代表順序

```javascript
const btn = document.getElementsByTagName("button");
console.log( btn[0].innerHTML );  // "我是按鈕"
```

- 透過 `class` 來獲取 `document.getElementsByClassName("");` ，需注意 `class` 選擇器是**複數**，所以會獲得一個類似陣列的**物件**，並以索引值代表順序

```javascript
const btn = document.getElementsByClassName("btn");
console.log( btn[0].innerHTML );  // "我是按鈕"
```

- 與 jQuery 一樣方便的節點選擇器 `document.querySelector("")` 和 ``document.querySelectorAll("")``，前面的是只會**回傳第一個**，後面的是只要符合條件的**都會回傳**，而這個回傳的是比較像陣列的 **NodeList**。**需注意** 的是，它的條件可以是 元素、`id`、`class`，所以跟 CSS 選擇器一樣，元素不需要前贅詞，`id` 需要前贅詞 `#`，`class` 需要前贅詞 `.`

```javascript
const btn = document.querySelectorAll("#btn");
console.log( btn.innerHTML );  // "我是按鈕"
const btnAll = document.querySelectorAll(".btn");
console.log( btnAll[0].innerHTML );  // "我是按鈕"
```

## 事件

事件就是使用者與瀏覽器互動的行為，如：點擊按鈕、滑鼠移動、控制視窗...等

我們可以事先在網頁內寫好 JavaScript 程式碼，當這些事件觸發時，就會執行程式碼，這也就是 JavaScript 負責互動的部分！

同樣的事件綁定也有很多種方法

### 寫在 HTML 內

這方法其實不太好，因為 **HTML 結構**與 **JavaScript 行為**牽連在一起，會比較不方便維護，但還是認識一下！

```html
<button id="btn" onclick="alert("你點到按鈕了！");">我是按鈕</button>
<!--  這樣點擊按鈕就會跳出視窗顯示「你點到按鈕了！」  -->
```

### 綁定事件

這是常用的方法，結構與行為分開

```html
<!-- HTML -->
<button id="btn">我是按鈕</button>
```

獲取到節點後綁定 `onclick` 點擊事件

```javascript
const btn = document.getElementById("btn");  // 獲取 btn 節點
/*  綁定 onclick 事件  */
btn.onclick = function() {
  alert("你又點到按鈕了！");
}
```

## 瀏覽器執行順序

之前第二天有介紹 `script` 標籤通常都放在最下面，而不會放在 `head` 標籤內，是因為瀏覽器在執行的時候，是**由上而下**執行下來。

```html
<html>
  <head>
    <title>Document</title>
    <script>
      const btn = document.getElementById("btn");
      console.log(btn);  // null
    </script>
  </head>
  <body>
    <button id="btn">我是按鈕</button>
  </body>
</html>
```

這時 `btn` 獲取到的物件節點就會回傳 `null`，因為它找不到節點！

而寫在下面 `</body>` 標籤前時

```html
<html>
  <head>
    <title>Document</title>
  </head>
  <body>
    <button id="btn">我是按鈕</button>
    
    <script>
      const btn = document.getElementById("btn");
      console.log(btn);  // <button id="btn">我是按鈕</button>
    </script>
  </body>
</html>
```

就能正常回傳 `<button id="btn">我是按鈕</button>` 節點了

### onload 事件

如果我一定要寫在上面呢？其實可以使用 `onload` 事件綁定，等**網頁畫面執行完（DOM 已經完成）**了，才執行程式碼

```html
<html>
  <head>
    <title>Document</title>
    
    <script>
      /*  事件綁定在 window 上  */
      window.onload = function(){
      
        const btn = document.getElementById("btn");
        console.log(btn);  // <button id="btn">我是按鈕</button>
        
      }
    </script>
  </head>
  <body>
    <button id="btn">我是按鈕</button>
  </body>
</html>
```

## 總結

終於要開始為我們網頁添加互動元素了！今天的 DOM 對於互動頁面非常重要，而我們還有 BOM 還沒介紹！

## 參考資料

- [008 天 重新認識 JavaScript](https://www.tenlong.com.tw/products/9789864344130)
