---
title: TypeScript 進階：泛型入門與核心概念
date: 2024/09/10 15:16:19
image: https://ithelp.ithome.com.tw/upload/images/20240929/20140224VmIGct2k3v.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 本文將深入探討泛型在進階應用中的強大能力，包括預設泛型型別、泛型約束、工具型別等，展示如何利用泛型來處理更複雜的型別操作。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240929/20140224VmIGct2k3v.png)

## 前言

前一篇介紹了泛型的基本用法與核心概念。本文將深入探討泛型在進階應用中的強大能力，包括預設泛型型別、泛型約束、工具型別等，展示如何利用泛型來處理更複雜的型別操作。

## 泛型的預設型別

當你希望使用泛型時，有預設的型別，來增加程式的使用便利性，可以在泛型後面用 `=` 操作符來賦予型別給這個泛型。

```ts
class DataStorage<T = string> {
  private data: T[] = [];

  addItem(item: T): void {
    this.data.push(item);
  }

  getItems(): T[] {
    return this.data;
  }
}

const textStorage = new DataStorage(); // 預設型別為 string
textStorage.addItem('Hello');
console.log(textStorage.getItems()); // ['Hello']

const numberStorage = new DataStorage<number>();
numberStorage.addItem(0);
console.log(numberStorage.getItems()); // [0]
```

這裡的 `DataStorage` 類別提供了一個預設泛型型別 string，如果在實例化時未指定型別，則會使用預設型別，這提升了使用的方便性。當然，你也可以在實例化時，指定具體的泛型型別。

### 如果沒預設泛型會怎樣

當這個例子如果沒有預設型別時，會因為在我們實例化類別時，TypeScript 沒辦法根據實例化的當下自動推斷這個泛型的型別，此時這個泛型就會是 `unknown`。

所以通常不預設泛型，就需要強迫使用這個類別的人，具體指定一個型別。

![https://ithelp.ithome.com.tw/upload/images/20240910/20140224lMGOaKHSVN.png](https://ithelp.ithome.com.tw/upload/images/20240910/20140224lMGOaKHSVN.png)

## 泛型約束

泛型約束允許你對泛型參數施加一定的限制，讓泛型變得更加精確可控。

在某些情況下，我們不僅需要泛型能接受多種型別，還希望限制泛型需要符合某些特定條件，可以使用 `extends` 來約束泛型的型別。

### keyof 獲取物件屬性

keyof 關鍵字能讓我們獲取型別的屬性，搭配泛型約束，可以讓參數限制到只能選該型別的屬性。

```ts
function getProperty<
    T extends Record<string, unknown>,
    K extends keyof T
>(obj: T, key: K) {
  return obj[key];
}

const person = { name: 'Johnson Mao', age: 18 };
constage name = getProperty(person, 'name'));
// name 是 string 型別
```
在這裡，K 被限制為 T 物件的屬性鍵，保證在使用時，只能存取合法的屬性。這種模式經常用於需要動態存取物件屬性的函式中。

### 泛型約束的其他應用

你可以將泛型參數限制為實現特定屬性或方法的型別，例如：要求傳入的參數具有 `length` 屬性

```ts
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(item: T): void {
  console.log(item.length);
}

logLength([1, 2, 3]); // 3
logLength('Hello'); // 5
// logLength(10); // Error: 類型 'number' 的引數不可指派給類型 'Lengthwise' 的參數。
```

這種泛型約束在處理陣列、字串等具備 length 屬性的型別時非常有用。

## 利用泛型的實用工具型別

在前面幾篇文章中，有介紹了 `Record` 與 `Array`，這些利用泛型來回傳型別的工具，
在實際開發中，還有很多好用的內建工具型別，這些工具型別利用了泛型的特性來簡化常見的型別操作。

## Partial

將傳入的型別**第一層**屬性都改成可選的狀態，需注意嵌套的深層物件並不會變動唷！

```ts
type PersonType = {
  name: string;
  box: {
    height: number;
    width: number;
  };
};

/**
 * Partial<PersonType> 回傳的型別等同於
 * 
 *  type PersonType = {
 *    name?: string;
 *    box?: {
 *      height: number;
 *      width: number;
 *    };
 *  };
 */
 
function updateObject<T>(obj: T, partialObj: Partial<T>): T {
  return { ...obj, ...partialObj };
}

const person: PersonType = {
  name: 'Johnson Mao',
  box: {
    height: 100,
    width: 100,
  },
};
updatePerson(person, { name: 'Mao' }); // 這樣就可以傳想修改的屬性了
```

## Required

是 Partial 的反向操作，適合用在需要確保物件完整性的場景，將傳入的型別**第一層**屬性都改成必有的狀態，同樣的需注意嵌套的深層物件並不會變動唷！

```ts
type PersonType = {
  name?: string;
  box?: {
    height?: number;
    width?: number;
  };
};

const person: Required<PersonType> = {
  name: 'John', 
  box: {} // Required 只有第一層會改成必有的狀態，嵌套的則保持原狀
};
```

## Readonly

將傳入的型別**第一層**屬性設為唯讀，防止資料被意外修改，適合不可變資料結構的場景，同樣的需注意嵌套的深層物件並不會變動唷！

```ts
interface Ironman {
  title: string;
  posts: { title: string, content: string }[]
}

const ironman: Readonly<Ironman> = {
  title: 'TypeScript 完全指南：從語法基礎到高級功能的系統學習',
  posts: []
}

// 因為 'title' 為唯讀屬性，所以無法指派至 'title'。
// ironman.title = '我想變更標題';

// 嵌套的物件屬性可以修改
ironman.posts[0] = {
  title: 'TypeScript 進階：靈活應用泛型',
  content: ''
}
```

## 參考文獻

- [Day 43. 通用武裝・泛型註記 X 推論未來 - TypeScript Generic Declaration & Annotation](https://ithelp.ithome.com.tw/articles/10226311)
- [到底是什麼意思？Typescript Partial<Type>](https://ithelp.ithome.com.tw/m/articles/10273198)
- [TypeScript 5 Masterclass: TypeScript Generics - Build a Full-Stack App !](https://www.youtube.com/watch?v=pFmdH-9e0i8&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=5)
