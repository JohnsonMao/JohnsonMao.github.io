---
title: TypeScript 型別 Part 1
date: 2024/09/03 21:37:00
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 我們都知道 TypeScript 是 JavaScript 的超集，所以在介紹 TypeScript 的型別之前，我們先介紹一下 JavaScript 原本就有的型別。
---

## 基礎型別

我們都知道 TypeScript 是 JavaScript 的超集，所以在介紹 TypeScript 的型別之前，我們先介紹一下 JavaScript 原本就有的型別。

### JavaScript 有的型別

- `string`: 表示字串
    ```ts
    let myName: string = 'Johnson Mao';

    // 也可以寫成這樣，TypeScript 會自動推斷 myName2 是字串型別
    let myName2 = 'Johnson Mao';

    // 這時塞數字就會報錯
    myName = 404;
    ```
- `number`: 表示數字，包含整數、浮點數、無限大 Infinity、無限小 -Infinity、非數字 NaN
    ```ts
    let year: number = 2024;
    let infinity: number = Infinity;
    ```
- `boolean`: 只會有 true 和 false 兩個值
    ```ts
    let isCompleted: boolean = false;
    isCompleted = true;
    ```
- `null`: 表示空值
    ```ts
    let emptyValue: null = null;
    ```
- `undefined`: JavaScript 特有的型別，用來表示還沒有賦值的變數
    ```ts
    let notAssigned: undefined = undefined;
    ```
- `symbol`: ES2015 新出的型別，可以用來建創唯一識別符的值
    ```ts
    let uniqueKey: symbol = Symbol('key');
    ```
- `bigint`: ES2020 新出的型別，主要用來處理大數字
    ```ts
    // 需要把 tsconfig.json 的 "target" 設定 "es2020" 才有支援
    let bigNumber: bigint = 66666666666666666666n;
    ```
- `object`: 除了原始型別外，都是物件型別，包含但不限於 Array, Function, Date, Error 等，後續在詳細介紹

### TypeScript 擴充的型別

TypeScript 除了有以上的型別外，還擴充了以下這些型別：

- `any`: 表示任意型別。使用 any 可以跳過型別檢查，允許變數是任意型別的值，但會失去型別檢查的保護，因此也有人戲稱 AnyScript，盡量別使用
    ```ts
    let price: any = 1000;
    price = '$1,000';
    ```
- `unknown`: 與 any 類似，但更安全。使用 unknown 型別時，必須先進行型別檢查後才能對其進行操作，否則會報錯
    ```ts
    let something: unknown = 1000;
    // 需要型別檢查才能用那個型別的方法
    if (typeof something === 'string') {
        console.log(something.toUpperCase());
    }
    ```
- `never`: 表示永遠不會有值的型別。常見於不會正常結束的函式
    ```ts
    function throwError(message: string): never {
        throw new Error(message);
    }
    ```
- `void`: 表示沒有任何值的型別，通常用於不返回值的函式
    ```ts
    function logMessage(message: string): void {
        console.log(message);
    }

    // 跟返回 undefined 相比更嚴謹，例如：
    const result = logMessage('test');
    if (result) {} // 報錯：無法對 'void' 類型的運算式測試真實性
    ```
- `tuple`: 元組型別，表示一個已知數量和型別的元素數組
    ```ts
    let tuple: [string, number];
    tuple = ["one", 2];
    ```
- `enum`: 枚舉型別，用來定義一組命名常數，這些常數可以是數字或字串。enum 讓程式碼更具可讀性和可維護性
    ```ts
    enum Gender {
        Man,
        Woman,
        Other,
    }
    const myGender: Gender = Gender.Man;
    ```

### TypeScript 自定義型別的方式

就跟 JavaScript 可以宣告變數，為了方便複用型別，TypeScript 也有關鍵字是用來宣告型別，至於更進階的用法，我們後續揭曉，先知道這個方式可以定義自己要使用的型別

- `type`: 允許我們為一組型別賦予別名
    ```ts
    type Name = string

    const myName: Name = 'Johnson Mao'
    ```
- `interface`: 用來定義物件的結構
    ```ts
    interface IPerson {
        name: string;
        age: number;
    }

    const person: IPerson = {
        name: 'Johnson Mao',
        age: 18,
    };
    ```

## 參考文獻

這個大大真的寫得超詳細，推薦去看看

- [Day 02. 前線維護・型別推論 X 註記 - Type Inference & Annotation](https://ithelp.ithome.com.tw/articles/10214719)
