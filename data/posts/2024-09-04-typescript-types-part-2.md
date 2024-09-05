---
title: TypeScript 型別 Part 2
date: 2024/09/04 22:39:22
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 物件型別在 TypeScript 中非常重要，因為它們允許我們定義複雜的資料結構，包括陣列、函式、列舉...等。這些型別幫助我們在開發中建立更嚴謹且易於維護的程式碼。
---

## 前言

上一篇的文章中，我們介紹了 TypeScript 的基本型別，如 string、number、boolean ...等。這一部分將進一步探討 TypeScript 中的物件型別，這些型別允許我們更靈活地描述和操作複雜的資料結構。

物件型別在 TypeScript 中非常重要，因為它們允許我們定義複雜的資料結構，包括陣列、函式、列舉...等。這些型別幫助我們在開發中建立更嚴謹且易於維護的程式碼。

## 物件型別 (Object)

Object 物件是一種鍵值對（key-value pairs）的集合，每個鍵（key）對應一個值（value）。

```ts
// 可以直接用 {} 方式的使用
const person1: { name: string } = {
    name: 'Johnson Mao',
};

// 也可以用 Record 的方式定義
const person2: Record<'name', string> = {
    name: 'Johnson Mao',
};

// 也可以用 type 的方式自定義型別
type Person3 = {
    name: string;
}

// 也可以用 interface 的方式自定義型別
interface Person4 {
    name: string;
}
```

看到這裡，你應該對 `type` 與 `interface` 定義物件的差異在哪感到好奇，這裡先賣個關子，後續介紹更多後再來說明。

## 陣列型別 (Array)

Array 型別用來表示一組相同型別的元素集合。

```ts
// 可以在型別後面加上 [] 代表陣列
const stringArray1: string[] = ['1', '2', '3'];

// 也可以用 Array 的方式定義
const stringArray2: Array<string> = ['1', '2', '3'];

// 也可以用 type 的方式自定義型別
type StringArray3 = string[];

// 也可以用 interface 的方式自定義型別
interface StringArray4 {
    [index: number]: string;
}

// 如果確定陣列的長度固定型別的話，可以使用上一篇 tuple 的形式
const tuple1: [string, number] = ['one', 2];

// 如果確定陣列前面的型別，後面參數不固定數量的話
// 可以用剩餘參數的運算符收整成一個陣列
const tuple2: [string, ...number[]] = ['one', 2, 3, 4];
```

## 函式型別 (Function)

上一篇的文章中，在演示 `void` 就有稍微看到函式的寫法了，我們可以為函式定義型別，包括函式參數和返回值的型別。

```ts
// 如果參數固定的話，可以直接這樣定義參數型別
function formatCurrency(amount: number, prefix = '$'): string {
    return prefix + amount;
}

// 如果參數不固定的話，可以直接用剩餘參數的運算符收整成一個陣列
function sum(...numbers: number[]): number {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

// 也可以用 type 的方式自定義型別
type SumFn1 = (...numbers: number[]) => number;

// 也可以用 interface 的方式自定義型別
interface SumFn2 {
    (...numbers: number[]): number;
}
```

## 列舉型別 (Enum)

上一篇有稍微提到，`enum`（列舉型別）是一個特別的型別，用來定義一組命名常數。
這些常數可以是數字或字串，並且 enum 型別的值是唯一的，這讓代碼更具可讀性和可維護性。

```ts
// 數字型別枚舉
enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

// 字串型別枚舉
enum Status {
    Success = 'SUCCESS',
    Error = 'ERROR',
    Pending = 'PENDING',
}

// 通常都這樣搭配以提高可讀性
function handle(direction: Direction) {
    switch (direction) {
        case Direction.Up:
            console.log('up');
            break;
        case Direction.Down:
            console.log('down');
            break;
        case Direction.Left:
            console.log('left');
            break;
        case Direction.Right:
            console.log('right');
            break;
    }
}
```

enum 比較特別，編譯打包時，也會跟的編譯到 JavaScript 中，犧牲一點程式碼體積，提升可讀性與維護性。

![image](https://hackmd.io/_uploads/HkrnxlUhC.png)

## 參考文獻

- [Day 03. 前線維護・物件型別 X 完整性理論 - Object Types Basics](https://ithelp.ithome.com.tw/articles/10214840)
