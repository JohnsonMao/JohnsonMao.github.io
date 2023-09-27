---
title: Day.22 「讓我們在更深入函式～」 —— JavaScript call & apply & arguments
date: 2021/10/01 17:30:00
image: https://i.imgur.com/ejWtzFz.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
description: 之前我們有說過，再調用函式的時候，瀏覽器會傳遞隱藏的參數給我們函式，一個是「this」，除了 this 還有另一個參數是「arguments」！
---

![「讓我們在更深入函式～」 —— JavaScript call & apply & arguments](https://i.imgur.com/ejWtzFz.png)

之前我們有說過，再調用函式的時候，瀏覽器會傳遞隱藏的參數給我們函式
一個是「this」，除了 this 還有另一個參數是「arguments」！

我們都知道全域函式直接調用的話，this 會指向 `window`。
但其實函式有方法給我們綁定 JavaScript 中的「this」

## Arrow function

這是 ES6 新增的函式，叫做「箭頭函式表達式」，看到表達式就知道可以直接賦值。
用法其實跟用宣告的函式很像！

```javascript
const normal = function(){}  // 普通宣告函式
const echo = () => {}        // 箭頭函式
```

箭頭函式的優點

- 更簡短的函式寫法
- this 變數強制綁定

以加法為例子

```javascript
const plus = (a, b) => {
  return a+b;
}
console.log( plus(1, 2) );  // 3
```

當執行程式碼只有一行時，可以**省略**大括號與 `return`

```javascript
const plus = (a, b) => a + b;
console.log( plus(1, 2) );  // 3
```

是不是覺得很精簡，跟魔法一樣！

## call & apply

平常直接調用函式，this 的指向會朝 window 這個物件

```javascript
function echo () {
  console.log( this );  
}

echo() // window
```

但當我們利用 `call()` 或 `apply()` 方法，第一個參數設為物件，就可以把 this 指向該物件

```javascript
const obj = {};
echo.call(obj);    // {}
echo.apply(obj);   // {}
```

除了第一個要傳遞物件外，也能正常的傳遞參數，只是傳遞參數的型別不太一樣。

- `call`，第一個參數為 this 指向，後面參數正常帶入就可以了
- `apply`，第一個參數為 this 指向，第二個參數必須使用陣列，參數放在**陣列內**

```javascript
function echo (a, b) {
  console.log("a = "+ a);
  console.log("b = "+ b);
}

echo.call(null, 1, '我是 b');    // "a = 1" "b = 我是 b" 
echo.apply(null, [1, '我是 b']); // "a = 1" "b = 我是 b" 
```

## 判斷 this 的情況

加上之前所認識的，我們更加能掌控我們的 this 了

- 以函式**直接調用**的 this 會指向 window
- 以**物件方法**的方式調用，this 會指向該物件
- 以**構造函式**的方式調用，this 會指向新增的物件
- 使用 `call` 或 `apply` 方法調用時，this 會指向指定的物件

## arguments

如何知道有這個參數，很簡單，直接 `console.log()` 看看。

```javascript
function echo () {
  console.log(arguments);
}

echo();  // Argument {}
```

argument 是一個類似陣列的**物件**，會把我們函式內的參數傳遞到 arguments 裡面保存。

```javascript
function echo () {
  console.log(arguments);
  console.log("參數有 "+ arguments.length +"個");
}

echo("a", 1);  // { 0: "a", 1: 1 }  "參數有 2 個"
```

這樣即使我們函式本身不使用參數，也能透過物件取值的方式 `argument[index]` 來獲取參數

很常使用在參數不確定有幾個的時候。

像是把函式內的參數總和取平均值

```javascript
function average () {
  let total = 0;
  
  for(let i = 0; i < arguments.length; i++) {
    total += +arguments[i];
  }
  console.log(total / arguments.length);
}

average(1, 2, 3, 4, 5);  // 3
```

也能使用 `callee` 來獲取執行的**函式本身**，在配合匿名立即執行函式使用時非常方便。

```javascript
(function() {
  console.log(arguments.callee);
})();  
/*
  function() {
    console.log(arguments.callee);
  }
*/
```

## 總結

今天又更認識函式的操作方法了，函式是 JavaScript 的精隨之一，也更了解如何操控 this 了～

## 參考資料

- [008 天 重新認識 JavaScript](https://www.tenlong.com.tw/products/9789864344130)
