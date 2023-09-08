---
title: Day.24 「你點了按鈕～同時也點了網頁本身！」 —— JavaScript 事件冒泡（Event bubbling）
date: 2021/10/03 16:00:00
image: https://i.imgur.com/oHkbDov.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
excerpt: 我們上一個篇章認識了綁定事件，了解到不管是什麼節點，都可以綁定事件，那為什麼 JavaScript 會知道我們觸發事件？當我們點擊網頁中任何一個元素，是不是也等於點擊到網頁本身！而點擊元素與網頁本身這個過程是有順序的，稱為「事件流程」。
---

![「你點了按鈕～同時也點了網頁本身！」 —— JavaScript 事件冒泡（Event bubbling）](https://i.imgur.com/oHkbDov.png)

我們上一個篇章認識了綁定事件，了解到不管是什麼節點，都可以綁定事件

那為什麼 JavaScript 會知道我們觸發事件？

## 事件觸發流程

當我們點擊網頁中任何一個元素，是不是也等於點擊到網頁本身！
而點擊元素與網頁本身這個過程是有順序的，稱為**事件流程**，事件流程共有兩個機制：

- 事件捕獲
- 事件冒泡

### 事件捕獲（Event Capturing）

![事件捕獲](https://i.imgur.com/VOku3FJ.png)

當我們點擊藍色的 `div` 時，網頁會從根目錄開始往下找到我們點擊的元素，這個過程稱為**事件捕獲**

### 事件冒泡（Event Bubbling）

而事件冒泡則剛好反過來！

![事件冒泡](https://i.imgur.com/6cvkX39.png)

當我們點擊藍色的 `div` 時，會從我們點擊的元素往上傳遞到根目錄，這個過程稱為**事件捕獲**

而如何確認冒泡的情況是否發生？

就把每個元素都綁上 `onclick` 點擊事件，連 `body` 也綁定。

```html
<div class="box parent red" id="red">
  <div class="box child green" id="green">
  </div>
  <div class="box child blue" id="blue">
  </div>
</div>
```

```javascript
// 綁定元素
const body = document.body;
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
// 綁定監聽
body.onclick = function(){
  console.log("I'm body");
}
red.onclick = function(){
  console.log("I'm parent red");
}
green.onclick = function(){
  console.log("I'm child green");
}
blue.onclick = function(){
  console.log("I'm child blue");
}

```

這時點擊藍色 `div` 就會觸發事件冒泡，會看到先出現藍色依序往根標籤傳遞，而因為沒點擊綠色，所以綠色不會觸發！

```javascript
"I'm child blue"
"I'm parent red"
"I'm body"
```

在大部分情況下，冒泡事件都是有用的，例如：拖曳功能，如果不希望冒泡事件觸發，可以針對觸發事件元素取消冒泡事件

```javascript
blue.onclick = function(event){
  event = event || window.event;  // 避免找不到 event
  console.log("I'm child blue");
  
  event.cancelBubble = true;  // 取消冒泡事件
}
```

這樣點擊就只會觸發藍色的事件，不會往上觸發了！

## 總結

這也是 JavaScript 經常會接觸到的事件，只是平常我們都會需要冒泡事件，只有特定時候才會取消冒泡，算是前端基礎面試題

## 參考資料

- [008 天 重新認識 JavaScript](https://www.tenlong.com.tw/products/9789864344130)
