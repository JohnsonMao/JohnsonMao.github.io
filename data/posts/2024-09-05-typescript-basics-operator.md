---
title: TypeScript 基礎：進階型別與操作符
date: 2024/09/05 23:32:15
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 在前幾篇中，我們介紹了 TypeScript 的基本型別與物件型別。在本篇中，將深入探討進階的型別系統，包括聯合型別、交集型別、型別斷言、索引型別、非空斷言操作符等。
---

## 前言

在前幾篇中，我們介紹了 TypeScript 的基本型別與物件型別。在本篇中，將深入探討進階的型別系統，包括聯合型別、交集型別、型別斷言、索引型別、非空斷言操作符等。

## 聯合型別 (Union Types)

聯合型別 `|` ，允許一個值是多種型別之一。這讓我們可以靈活地接受不同的型別輸入，而不用強制規範為單一型別。

```ts
// 利用 | 將不同型別聯合在一起，允許 id 是數字或字串
let id: number | string;
id = 123;
id = 'abc123';
// id = false; // Error: 類型 'boolean' 不可指派給類型 'string | number'。

function printId(id: number | string) {
    // 用判斷的方式來推斷型別
    if (typeof id === 'string') {
        // TypeScript 推斷 id 是 string 型別
        console.log(id.toUpperCase());
    } else {
        // TypeScript 推斷 id 是 number 型別
        console.log(id);
    }
}

printId(123); // 123
printId('abc123'); // ABC123
```

## 交集型別 (Intersection Types)

交集型別 `&` ，允許將多種型別合併，從而要求值同時符合多個型別。這在需要融合不同物件的屬性時非常有用。

```ts
type Person = {
    name: string;
}

interface Employee {
  position: string;
}

// 利用 & 將不同物件融合，同時會有 Person 與 Employee 的屬性
type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
    name: 'Johnson Mao',
    position: 'Frontend',
};

console.log(employee.name); // Johnson Mao
console.log(employee.position); // Frontend
```

> 注意：
> 當兩個都是原始類型（例如：`string & number`）進行交集操作時，結果會是 `never` 類型，表示沒有任何值能同時是這兩個原始類型。這一點需要特別注意，因為它會導致變數無法賦值任何值。

## 型別斷言 (type assertion)

型別斷言允許開發者手動告訴 TypeScript 某個值的具體型別。這在 TypeScript 無法正確推斷型別時特別有用，但需小心使用以避免出錯。

```ts
// TypeScript 會推斷 inputElement 的類型是 HTMLElement | null
// 我們知道它實際上是 HTMLInputElement，所以需要型別斷言
const inputElement1 = document.getElementById("username") as HTMLInputElement;
inputElement1.value = "New Username";

// 另一種寫法，使用尖括號型別斷言（僅在 .tsx 以外的檔案中可用）
const inputElement2 = <HTMLInputElement>document.getElementById("username");
inputElement2.value = "Another Username";
```

> 備註：HTMLInputElement 是 DOM 的類別

## 可選操作符 (optional operator)

可選操作符 `?` 用來表示一個屬性或參數是可選的，即這個屬性或參數可以存在，也可以不傳遞。這為處理物件屬性或函式參數提供了更大的靈活性。

```ts
// 物件的可選屬性
interface Person {
    name: string;
    age?: number; // 可選屬性，不一定要有這個屬性
}

const person2: Person = { name: "Mao", age: 18 };
const person1: Person = { name: "Lily" };

// 函式的可選參數，不一定要傳這個參數
function calculateDiscountedPrice(price: number, discount?: number): number {
    let finalPrice = price;

    if (discount) {
        finalPrice -= price * (discount / 100);
    }

    return finalPrice;
}
```

## 索引型別（Indexable Type）

允許你定義可以用索引存取的物件型別。這意味著你可以使用索引（通常是字串或數字）來存取物件的屬性，並且可以為這些屬性指定特定的型別。這對於需要動態存取或編寫動態屬性的物件非常有用。

```ts
interface StringIndexable {
    [key: string]: number;  // 索引簽名，字串索引對應數字型別
}

const scores: StringIndexable = {
    math: 95,
    english: 88,
    science: 92
};

console.log(scores.math); // 95
```

> 此外 PropertyKey 是常規物件可以使用的索引型別，他同時聯集了 `string | number | symbol`

## 非空斷言操作符 non-null assertion operator

非空斷言操作符 `!` 用來告訴 TypeScript 編譯器，某個值不會是 null 或 undefined，即使編譯器推斷它可能是。這個操作符允許我們在不進行明確檢查的情況下，繼續操作這個值。

```ts
// TypeScript 認為 element 可能是 `HTMLElement | null`
const element = document.getElementById("myElement");

// 非空斷言操作符告訴編譯器，element 不會是 `null`
element!.className = "active";

// 但更好的做法會是用判斷的方式推斷
if (element) element.className = "active";
```

## 參考文獻

- [Day 16. 機動藍圖・介面與型別 X 混用與比較 - TypeScript Interface V.S. Type](https://ithelp.ithome.com.tw/articles/10216626)
- [TypeScript 5 Masterclass: Working with types basics - Build a Full-Stack App !](https://www.youtube.com/watch?v=qkvitUo50UU&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=4)
- [Union(聯合型別) 與 Intersection(交叉型別)](https://notes.boshkuo.com/docs/TypeScript/Union-Intersection)
- [TypeScript 新手指南](https://willh.gitbook.io/typescript-tutorial)
