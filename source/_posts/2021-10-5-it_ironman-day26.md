---
title: Day.26 「閉包要謹慎使用！」 —— JavaScript 閉包（Closure）
date: 2021/10/5 16:40:00
index_img: https://i.imgur.com/2KRYZOP.png
banner_img: https://i.imgur.com/2KRYZOP.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
excerpt: 我們前面已經認識了函式作用域，也瞭解了回調函式，但有時候會產生意想不到的事情，造成內存問題，其中一個是閉包。
---

# Day.26 「閉包要謹慎使用！」 —— JavaScript 閉包（Closure）

![「閉包要謹慎使用！」 —— JavaScript 閉包（Closure）](https://i.imgur.com/2KRYZOP.png)

我們前面已經認識了**函式作用域**，也瞭解了**回調函式**，但有時候會產生意想不到的事情，造成內存問題，其中一個是**閉包**

## 認識閉包

### 閉包是如何產生的？

閉包通常出現在**巢狀函式**中，是**內部函式**使用了**外部函式**的**變數**時，產生**閉包**！

### 閉包是什麼？

首先我們用簡單的範例

```javascript
function fn() {
  var a = 1;
  function plus1() {
    a++
    console.log(a);
  }
  return plus1;
}

var f = fn();
f();
```

我們透過 Google Chrome 的開發人員工具查看執行過程

![Google Chrome 的開發人員工具](https://i.imgur.com/nzgr4g1.png)

可以看到在執行到第 8 行的時候，產生了閉包，也就是紅框處！

由此可見～閉包是在我們**內部函式**使用到了**外部函式的變數**時產生出來。
你可能想說第 9 行函式還沒執行呀！？
那是因為，函式的**提升**，所以導致執行到函式變數的時候就產生閉包。
而這時有被**內部函式**使用的**變數**，就會存在閉包之中！

## 常見的閉包

### 內部函式 為 外部函式 的返回值

就是我們上面的範例

```javascript
function fn() {
  var a = 1;
  function plus1() {
    a++
    console.log(a);
  }
  return plus1;
}

var f = fn();

f();  // 2
f();  // 3
```

你會發現！函式內的變數 `a` 還存在可以累加並**沒有消失**，而這個值就存在 `f` 函式的閉包中！

### 回調函式

沒錯！回調函式也會產生閉包～如下面範例

```javascript
function consoleDelay (msg, time) {
  setTimeout( function() {
    console.log(msg)
  }, time)
}

consoleDelay("我也是閉包", 2000);
```

一樣有形成閉包的條件！內部函式引用了外部函式的變數！

![我也是閉包](https://i.imgur.com/QToOFcL.png)

## 閉包的作用

1. 一般函式執行完畢後，就會從內存釋放，而閉包則是把函式內的變數，繼續**保留**在內存中（延長了局部變數的生命週期）。

2. 一般函式內的變數無法從外部操作，但閉包可以**間接操控**函式內部的變數值。

## 閉包的優點與缺點

### 閉包的優點同時也是缺點

- 函式執行完後，函式內的局部變數不會釋放，如果這個局部變數還會使用，那就是優點，如果不會使用了，那就變成缺點，因為佔用內存的時間會變長。

  ```javascript
  function fn() {
    var arr = new Array(10000);
    function arrLength() {
      console.log( "內存有 " + arr.length + " 長度的陣列" );
    }
    return arrLength;
  }

  var f = fn();
  f();  // 內存有 10000 長度的陣列
  ```

- 容易造成內存**溢出**與**洩漏**
  - **內存溢出**比較簡單理解，就是內存不夠跑程式而報錯
    ![內存溢出](https://i.imgur.com/VyTDNpk.png)
  - **內存洩漏**平常還可以正常執行，但每天洩漏一點，會把內存空間壓縮，更容易導致**內存溢出**，常見的內存洩漏
    - 意外使用了**全局變數**（宣告習慣很重要），如：函式內忘記使用宣告，直接使用變數
    - 沒有及時清理的**計時器**或**回調函式**
    - **閉包**

### 如何解決

- 盡量避免濫用閉包
- 及時釋放

  ```javascript
  f = null;  // 讓內部函式變成「垃圾物件」，瀏覽器會自動清除
  ```

## 總結

我們已經逐步學習 JavaScript 的核心精隨了！也是面試很長考的觀念～
