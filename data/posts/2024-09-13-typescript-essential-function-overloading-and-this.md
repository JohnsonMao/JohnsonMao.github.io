---
title: TypeScript 必備：函式重載與 this
date: 2024/09/13 23:52:40
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 在 JavaScript 裡，沒有內建的函式重載（Function Overloading）功能，但在 TypeScript 中，我們可以透過型別註解來模擬此功能。此外，this 是 JavaScript 中常見且具挑戰性的概念，透過 TypeScript 的類別與介面，可以更精確地控制 this 的行為。
---

## 前言

在 JavaScript 裡，沒有內建的函式重載（Function Overloading）功能，但在 TypeScript 中，我們可以透過型別註解來模擬此功能。此外，this 是 JavaScript 中常見且具挑戰性的概念，透過 TypeScript 可以更安全地控制 this 的行為。

## 什麼是函式重載？

函式重載（Function Overloading）是指在相同函式名稱下，可以定義多個具有不同參數組合的函式。利用函式簽名（function signatures）來模擬函式重載，並且在編譯時提供型別檢查，以確保函式在不同的參數組合下能夠正確運行。

## 為什麼需要函式重載？

函式重載允許我們針對不同的輸入提供不同的邏輯，提升函式的靈活性和可讀性。

如果沒有使用函式重載，就會自動推斷最兼容回傳的型別。

```ts
function getOneYearAgo(date: Date | string) {
    const _date = new Date(date);

    _date.setFullYear(_date.getFullYear() - 1);

    if (typeof date === "string") {
        return _date.toLocaleDateString();
    }
    return _date;
}

// date1 和 date2 都推斷為 string | Date
const date1 = getOneYearAgo(new Date());
const date2 = getOneYearAgo("2024-01-01");
```

但如果使用函式重載，就能根據傳遞的參數來進行匹配，就能更精準的回傳型別

```ts
function getOneYearAgo(date: string): string;
function getOneYearAgo(date: Date): Date;
function getOneYearAgo(date: Date | string) {
    const _date = new Date(date);

    _date.setFullYear(_date.getFullYear() - 1);

    if (typeof date === "string") {
        return _date.toLocaleDateString();
    }
    return _date;
}

const date1 = getOneYearAgo(new Date()); // date1 推斷為 Date
const date2 = getOneYearAgo("2024-01-01"); // date2 推斷為 string
```

## this

`this` 是 JavaScript 和 TypeScript 中非常核心且常見的概念，它代表函式執行時的上下文。理解 `this` 的行為對寫出正確的程式碼至關重要，而 TypeScript 提供了額外的提示來幫助我們避免開發時遇到的 `this` 錯誤。

this 的值取決於函式的呼叫方式。以下是常見的 this 綁定場景：

### 全域範圍/函式範圍中的普通函式

在非嚴格模式下，`this` 指向全域物件（window 在瀏覽器中，node 在後端環境）。在嚴格模式下，this 則為 undefined。

```ts
// 沒有嚴格模式瀏覽器中，在全域範圍中，指向 window
console.log(this); 
```

### 物件方法中的普通函式

當**普通函式**作為物件的方法被呼叫時，this 會指向該物件。

```ts
const person = {
    name: 'Johnson Mao',
    greet() {
        console.log(this.name);
    }
};

person.greet(); // "Johnson Mao" - this 指向 person 物件
```

### 構造函式/類別中的普通函式

當使用 new 關鍵字調用**普通函式**時，this 會指向新建的物件實例。

```ts
class Person {
    constructor(public name: string) {}

    greet() {
        console.log(this.name);
    }
}

const person = new Person('Alice');
person.greet(); // "Johnson Mao" - this 指向實例化的 person 物件
```

### 箭頭函式中

箭頭函式沒有自己的 `this`，它會捕捉並繼承定義時的上下文 `this`，這在處理回調或非同步操作中特別有用。

```ts
const person = {
    name: 'Johnson Mao',
    greet: () => {
        // 這裡的 this，是外部作用域的 this，而非 person 物件
        console.log(this.name);
    }
};

person.greet(); // undefined，因為 this 指向全域物件
```

### TypeScript 中的 this

在 TypeScript 中，this 的行為與 JavaScript 相同，但 TypeScript 提供了靜態型別檢查，使得我們使用 this 會更加安全。

以上面那個箭頭函式的案例來說，在 `this.name` 就會提示錯誤 `類型 'typeof globalThis' 沒有屬性 'name'`，這裡的 `globalThis` 就是全域物件。

## 總結

透過 TypeScript 的靜態檢查，我們可以在開發階段提早發現錯誤，並利用這些機制讓程式更為安全。

希望這篇文章幫助你在理解 TypeScript 的同時，也能熟悉 JavaScript 的這些重要機制，提升程式設計的穩定性和可讀性。

## 參考文件

- [TypeScript 5 Masterclass: Functions and asynchronous programming](https://www.youtube.com/watch?v=xtYMxyBc8O0&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=7)
- [TypeScript 函式重載 (function overload)](https://medium.com/@a0988426059/typescript-%E5%87%BD%E6%95%B8%E9%87%8D%E8%BC%89-function-overloading-72c7df9c45a)
- [淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂](https://blog.techbridge.cc/2019/02/23/javascript-this/)

