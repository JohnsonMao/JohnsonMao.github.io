---
title: TypeScript 進階：泛型入門與核心概念
date: 2024/09/09 22:59:52
image: https://ithelp.ithome.com.tw/upload/images/20240929/20140224fGUlmQdkj4.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 前面的文章已經有稍微介紹了介面（interface）的用法，介面能夠幫助我們定義物件應該有哪些屬性和方法，從而提供一種強型別的約束機制，讓開發者更容易組織代碼並進行程式設計。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240929/20140224fGUlmQdkj4.png)

## 什麼是泛型？

泛型（Generics）是一種設計模式，允許開發者在撰寫程式時不必預先定義具體的型別，而是讓程式更具通用性與靈活性。這樣的設計可在函式、類別、介面中使用，實現不同型別的資料處理需求，並確保型別安全。

## 為何使用泛型？

泛型的核心價值在於提供「型別靈活性」與「型別安全」。當開發者需要撰寫能處理多種型別的邏輯時，泛型可以減少重複程式碼，避免為每個型別撰寫不同版本的函式或類別，同時還能維持程式的強型別特性，避免潛在的型別錯誤。

### 具體範例：沒有泛型的解法

假設我們有一個需求：將不同型別的資料轉換為陣列。如果不使用泛型，可能需要針對不同型別撰寫多個函式。

```ts
function toArrayFromNumber(num: number): number[] {
    return [num];
}

function toArrayFromString(str: string): string[] {
    return [str];
}
```

這種方法顯然不具備可擴展性，每增加一個型別，就需要新增一個函式版本。

## 泛型的基本使用

### 函式使用泛型

泛型最常見的使用場景是函式，可以透過 `toArrayByParam<T>` 裡面的 `T` 定義泛型參數，且可以取任意名稱，不一定要是 `T`，且可以定義多個泛型。

```ts
function toArrayByParam<T>(param: T): T[] {
    return [param];
}
```

在使用函式時，可以明確的傳入型別，就會根據泛型來限制你傳的參數

```ts
const str1 = toArrayByParam<string>('明確的表示要 string 的泛型');
// str1 是 string[] 型別

// Error: 類型 'number' 的引數不可指派給類型 'string' 的參數。
const str2 = toArrayByParam<string>(0);
```

也可以利用類型推斷，不明確傳入型別，TypeScript 也會自動根據你傳的參數推斷出型別

```ts
const str3 = toArrayByParam('利用類型推斷是 string 的泛型');
// str3 推斷為 string[] 型別

const num = toArrayByParam(0);
// num 推斷為 number[] 型別
```

### 類別使用泛型

泛型不僅可以應用在函式上，還可以應用在類別中。這讓類別可以在定義時保持靈活性，並在實例化時確定具體的型別。

```ts
class Box<T> {
    constructor(protected contents: T) {}

    getContents(): T {
        return this.contents;
    }
}

const stringBox = new Box('Hello');
const content = stringBox.getContents();
// content 是 string 型別

```

### 介面使用泛型

泛型也可以與介面結合，來定義具有靈活型別的物件結構。

```ts
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

const userResponse: ApiResponse<{ name: string; age: number }> = {
    data: { name: 'Johnson Mao', age: 18 },
    status: 200,
    message: 'Success'
};
```

## 總結
在前面的章節中，我們已經多次接觸到泛型的應用，例如：

- 物件型別中的 `Record<string, boolean>`，用來表示一個鍵為 `string`，值為 `boolean` 的物件。
- 陣列型別中的 `Array<number>`，用來表示一個數字型別的陣列。

泛型在 TypeScript 中隨處可見，不僅適用於自定義資料結構，還廣泛應用於許多內建的 TypeScript 與 JavaScript 方法中。例如：

- 在 DOM 操作中，我們可以使用泛型來指定元素的型別：`document.querySelector<HTMLInputElement>('#input-id');`
- JavaScript 常用的 `Object.fromEntries` 方法也可以透過泛型明確指定資料結構：`Object.fromEntries<number>([]);`

透過泛型，TypeScript 提供了極大的型別靈活性與安全性，讓開發者在實現強類型的同時，保持程式碼的靈活與可重用。

## 參考文獻

- [Day 42. 通用武裝・泛用型別 X 型別參數化 - TypeScript Generics Introduction](https://ithelp.ithome.com.tw/articles/10226113)
- [TypeScript 5 Masterclass: TypeScript Generics - Build a Full-Stack App !](https://www.youtube.com/watch?v=pFmdH-9e0i8&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=5)
