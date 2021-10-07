---
title: Day.27 「var 成為時代的眼淚！」 —— ES6 區塊作用域 與 提升
date: 2021/10/6 16:40:00
index_img: https://i.imgur.com/hAS4sZ7.png
banner_img: https://i.imgur.com/hAS4sZ7.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
excerpt: 之前已經介紹了 var 與函式作用域，今天來更仔細的介紹 ES6 新增的 let 、 const以及與它們相關的區塊作用域。
---

# Day.27 「var 成為時代的眼淚！」 —— ES6 區塊作用域 與 提升

![「var 成為時代的眼淚！」 —— ES6 區塊作用域 與 提升](https://i.imgur.com/hAS4sZ7.png)

之前已經介紹了 `var` 與**函式作用域**，今天來更仔細的介紹 ES6 新增的 `let` 、 `const`以及與它們相關的**區塊作用域**

## 區塊作用域

與**函式作用域**有點像，一樣都是作用域內沒有的變數可以**往外獲取**變數，不一樣的是更嚴格謹慎，不只限制在函式上了，連 `if else` 、 `while` 、 `for` 這些循環語句都有限制不能從外往內取，稱為**區塊作用域**（**Block Scope**）。

以常見的 `var` 全域汙染為例：

```javascript
for (var i = 0; i < 3; i++) {}
console.log( i );    // 3，成功在 for 迴圈外面獲取到 for 迴圈內的 i = 3

for (let a = 0; a < 3; a++) {}
console.log( a );    // 報錯， a is not defined
```

## let 的特性

`let` 跟我們常用的 `var` 用法非常相似，但也是有不同的地方！

- `let` 不可重複宣告

  - 使用 `var` 重複宣告不會報錯，只會覆蓋掉

    ```javascript
    var name = "毛毛";
    var name = "小黃";  // 使用 var 重複宣告不會報錯，只會覆蓋掉
    ```

  - 使用 `let` 重複宣告會報錯

    ```javascript
    let name = "毛毛";
    let name = "小黃";  // 使用 let 重複宣告會報錯
    ```

- 區塊作用域

  - 使用 `var` 容易汙染全域作用域

    ```javascript
    for (var i = 0; i < 3; i++) {}
    console.log( i );    // 成功在 for 迴圈外面獲取到 i = 3
    ```
  
  - 使用 `let` 則能讓變數限制在區塊內

    ```javascript
    for (let i = 0; i < 3; i++) {}
    console.log( i );    // 報錯， i is not defined
    ```

- 變數提升效果不同

  - 使用 `var` 會自動提升，並顯示**未定義** `undefined`

    ```javascript
    console.log(name);  // undefined
    var name = "毛毛";
    ```
  
  - 使用 `let` 宣告比較嚴謹，會直接報錯（也就是俗稱的死區），讓 debug 效率變高

    ```javascript
    console.log(name);  // 報錯
    let name = "毛毛";
    ```

## const 的特性

- 必須要賦初始值
  
  ```javascript
  const PI;  // 報錯
  ```

- 常數不能修改

  ```javascript
  const PI = 3.14159265;
  PI++  // 報錯
  ```

- 一樣也具有區塊作用域

- 對陣列或物件內的**屬性**做修改，並不會報錯
  - 因為我們知道物件型別存的是**參考（地址）**，只要 Stack 值不變就不會報錯
    ```javascript
    const person = { name: "毛毛", gender: "男" };
    person.name = "鮭魚";
    person.age = 27;
    console.log( person );  // { name: "鮭魚", gender: "男", age: 27 }
    ```

## 總結

會使用 `let` 與 `const` 後，就比較少使用到 `var` 了，在宣告**物件型別**或**不會主動修改值**得變數都會建議使用 `const` 來宣告！這樣比較不容易變動到變數而出現意想不到的 bug。
