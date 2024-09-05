---
title: TypeScript 型別 Part 3
date: 2024/09/04 23:46:11
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 在前幾篇中，我們介紹了 TypeScript 的基本型別與物件型別。在本篇中，將深入探討進階的型別系統，包括聯合型別、交集型別、型別斷言等，並討論 type 與 interface 的相似與不同之處。
---

## 前言

在前幾篇中，我們介紹了 TypeScript 的基本型別與物件型別。在本篇中，將深入探討進階的型別系統，包括聯合型別、交集型別、型別斷言等，並討論 type 與 interface 的相似與不同之處。


## 聯合型別 (Union Types)

聯合型別允許一個值是多種型別之一。這讓我們可以靈活地接受不同的型別輸入，而不用強制規範為單一型別。

```ts
let id: number | string;
id = 123;       // 合法
id = 'abc123';  // 也合法
id = false;     // 這樣就不合法

function printId(id: number | string) {
    // 用判斷的方式來推斷型別
    if (typeof id === 'string') {
        console.log(id.toUpperCase());
    } else {
        console.log(id);
    }
}

printId(123);       // 123
printId('abc123');  // ABC123
```

## 交集型別 (Intersection Types)

交集型別允許將多種型別合併，從而要求值同時符合多個型別。這在需要混合不同物件的屬性時非常有用。

```ts
interface Person {
    name: string;
}

interface Employee {
    position: string;
}

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
    name: 'Johnson Mao',
    position: 'Frontend',
};

console.log(employee.name);        // Johnson Mao
console.log(employee.position);    // Frontend
```

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

## 可選操作符 (optional operator)

可選操作符 `?` 用來表示一個屬性或參數是可選的，即這個屬性或參數可以存在，也可以不傳遞。這為處理物件屬性或函式參數提供了更大的靈活性。

```ts
// 物件的可選屬性
interface Person {
    name: string;
    age?: number; // 可選屬性
}

const person2: Person = { name: "Mao", age: 18 };
const person1: Person = { name: "Lily" };

// 函式的可選參數
function calculateDiscountedPrice(price: number, discount?: number): number {
    let finalPrice = price;

    if (discount) {
        finalPrice -= price * (discount / 100);
    }

    return finalPrice;
}
```

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

## type 與 interface 的相同與不同點

在 TypeScript 中，`type` 和 `interface` 都用於定義型別，但它們有一些相同點和不同點。了解這些異同可以幫助你在不同情況下選擇最合適的工具來定義型別。

### 相同的地方

都可以定義物件型別

```ts
// 使用 interface 定義物件型別
interface Person1 {
  name: string;
  age: number;
}

// 使用 type 定義物件型別
type Person2 = {
  name: string;
  age: number;
};
```

都可以擴展型別

```ts
// 擴展 interface
interface Employee1 extends Person1 {
    position: string;
}

// 擴展 type
type Employee2 = Person2 & {
    position: string;
};

```

### 不同的地方

interface 不能直接定義原始型別。
```ts
type Name = string;

// interface 就不能定義原始型別
```

interface 聲明同名會自動合併，type 不能聲明同名

```ts
// 可以多次聲明同名的 interface，TypeScript 會自動合併這些聲明。
// type 不能這樣重複聲明同名
interface Person {
    name: string;
}

interface Person {
    age: number;
}

// 最終等同於
interface Person {
    name: string;
    age: number;
}
```

### 綜合比較

在實際使用中，`type` 和 `interface` 都有其優勢，選擇哪一個主要取決於具體需求和團隊偏好。
不過 type 在編輯器中會顯示結構還蠻方便的。
![image](https://hackmd.io/_uploads/HyzJgLPh0.png)

## 參考文獻

- [Day 16. 機動藍圖・介面與型別 X 混用與比較 - TypeScript Interface V.S. Type](https://ithelp.ithome.com.tw/articles/10216626)