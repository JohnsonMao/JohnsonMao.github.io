---
title: Day.25 「從 事件綁定 與 定時器 認識回調函式！」 —— JavaScript 定時器 & Callback
date: 2021/10/04 16:00:00
index_img: https://i.imgur.com/oqXdlun.png
banner_img: https://i.imgur.com/oqXdlun.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
excerpt: 我們前面已經瞭解了事件綁定與事件冒泡了，但是使用物件元素直接綁定事件有不方便的地方，1. 只能同時為一個元素的一個事件綁定一個響應函式，2. 不能綁定多個，如果綁定多個，後面會覆蓋前面的。
---

![「從 事件綁定 與 定時器 認識回調函式！」 —— JavaScript 定時器 & Callback](https://i.imgur.com/oqXdlun.png)

我們前面已經瞭解了事件綁定與事件冒泡了，但是使用 `物件元素.綁定事件` 有不方便的地方

- 只能同時為一個元素的一個事件綁定**一個響應函式**
- 不能綁定多個，如果綁定多個，後面會覆蓋前面的

```javascript
btn.onclick = function () {
  console.log("我是第一個綁定事件");
}

btn.onclick = function () {
  console.log("我是第二個綁定事件");  // 這個綁定事件會覆蓋前面的綁定事件
}

/*
 "我是第二個綁定事件"
*/
```

## addEventListener()

這時可以使用最廣泛使用的**事件監聽**
事件監聽的參數

- 第一個參數：要觸發的**事件的字串**，注意不要添加 `on`，例如：要綁定 `onclick` 事件，參數就寫 `"click"`
- 第二個參數：觸發事件時的**回調函式**
- 第三個參數：是否再**捕獲階段**觸發，布林值，通常情況下都是 `false`

```javascript
btn.addEventListener("click", function(){
  console.log("我是第一個綁定事件");
}, false);

btn.addEventListener("click", function(){
  console.log("我是第二個綁定事件");    // 這樣就會直接"添加"綁定事件，而不會覆蓋
}, false);

/*
 "我是第一個綁定事件"
 "我是第二個綁定事件"
*/
```

與普通的事件綁定不一樣，事件監聽是用**添加**事件來綁定的，所以就不會覆蓋前面綁定的事件

## 定時器

而有時候我們並不想透過事件監聽來觸發事件，而是設定時間，在開啟網頁後，一段時間觸發函式。
這時就要利用 JavaScript 定時器，就可以達到效果。

```javascript
setTimeout(function(){
  console.log("時間到！")
}, 2000)
```

而除了 `setTimeout` 時間到只**觸發一次**的定時器，還有持續一段時間的 `setInterval` 定時器可以用。

## 回調函式（Callback Function）

而我們在**綁定事件**和**定時器**所使用的匿名函式就是所謂的**回調函式**

```javascript
btn.addEventListener("click", function(){
  console.log("我是 DOM 事件的回調函式");
}, false);

setTimeout(function(){
  console.log("我是定時器的回調函式")
}, 2000)
```

### 回調函式的特點

- 我們自己**設置**的，~~這好像廢話~~
- 我們**沒有主動調用**，讓函式變成另一個函式的**參數**
- 但它自己會**自動調用**，讓**函式控制**參數函式的執行時機

所以上面看到的 `addEventListener()` 與 `setTimeout()` ，顯而易見的都是函式！
而我們自己定義的函式就做為參數，等時機到了執行。

### 常見的回調函式？

常見的回調函式有四個

- DOM 事件回調函式
- 定時器回調函式
- AJAX 請求回調函式
- 生命週期回調函式

### 用函式控制執行函式的時機

首先我們先用定時器，計 **0 秒**馬上 `console`

```javascript
function A () {
  setTimeout(function(){
    console.log("我是函式 A");
  }, 0)
}

function B () {
  console.log("我是函式 B");
}
function C () {
  console.log("我是函式 C，最後一個函式");
}

A();
B();
C();

/*
  "我是函式 B"
  "我是函式 C，最後一個函式"
  "我是函式 A"
*/
```

結果很神奇，沒想到 **0 秒**馬上 `console` 的函式，竟然最後才出現！
那是因為 JavaScript 在遇到**定時器**的時候，會先跳過這段函式，先繼續執行後面的程式碼，在執行定時器（此時已經有毫秒的延遲），這樣的好處當然就是不用苦苦地等**計時器**結束，讓可以先運作的運作完，讓使用者不會有等待的感覺，而這個現象稱作**非同步**！

而後面的函式又與計時器的這個函式有關的話！就會使用 Callback Function 來處理～

```javascript
function A (FnB, FnC) {
  setTimeout(function(){
    console.log("我是函式 A");
    FnB( FnC );
  }, 0)
}

function B (Fn) {
  console.log("我是函式 B");
  Fn();
}
function C () {
  console.log("我是函式 C，最後一個函式");
}

A(B, C);

/*
  "我是函式 A"
  "我是函式 B"
  "我是函式 C，最後一個函式"
*/
```

這時在確定執行完 `A` 後，才會接續執行 `B` 與 `C`

## 回調函式的優缺點

### 優點

- 能夠確保執行的時機
- 更好維護

例如要添加 D 函式就可以直接使用參數帶入

```javascript
function A (FnB, FnC) {
  setTimeout(function(){
    console.log("我是函式 A");
    FnB( FnC );
  }, 0)
}

function B (Fn) {
  console.log("我是函式 B");
  Fn();
}
function C () {
  console.log("我是函式 C，最後一個函式");
}
function D (Fn) {
  console.log("我是函式 D")
  Fn;
}

D( A(B, C));

/*
  "我是函式 D"
  "我是函式 A"
  "我是函式 B"
  "我是函式 C，最後一個函式"
*/
```

### 缺點

相信學程式到一定程度的人，多少都有聽過宛如波動拳的 Callback Hell 吧！

```javascript
function (n, fnA, fnB, fnC, fnD, fnE) {
    if (fnA(n)) {
        if (fnB(n)) {
            if (fnC(n)) {
                if (fnD(n)) {
                    if (fnE(n)) {
                      console.log("fnE");
                    } else {
                      console.log("fnD");
                    }
                } else {
                  console.log("fnC");
                }
            } else {
              console.log("fnB");
            }
        } else {
          console.log("fnA");
        }
    } else {
      console.log("null");
    }
}
```

## 總結

回調函式（Callback Function）是個很常見的寫法，但要小心使用，使用不當後續會很痛苦，而後面又有推出 `Promise` 與 `Async / Await` ，就解決了同步與非同步的問題！

## 參考資料

- [008 天 重新認識 JavaScript](https://www.tenlong.com.tw/products/9789864344130)
- [什麼是 Callback 函式](https://medium.com/appxtech/%E4%BB%80%E9%BA%BC%E6%98%AFcallback%E5%87%BD%E5%BC%8F-callback-function-3a0a972d5f82)

