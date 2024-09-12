---
title: TypeScript 進階：型別推斷與映射
date: 2024/09/09 22:59:52
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 上一篇介紹了條件型別後，這次介紹的型別推斷會需要跟條件型別組合一起使用，型別推斷是利用條件型別來幫我們推斷出型別。本篇將深入介紹型別推斷（infer），並搭配字面型別（Literal Types）與映射型別（Mapped Types）來介紹。
---

## 前言

上一篇介紹了條件型別後，這次介紹的型別推斷會需要跟條件型別組合一起使用，型別推斷是利用條件型別來幫我們推斷出型別。本篇將深入介紹型別推斷（infer），並搭配字面型別（Literal Types）與映射型別（Mapped Types）來介紹。

## 型別推斷（Infer）

`infer` 是 TypeScript 中的一個特殊關鍵字，是使用在條件型別中，用於在型別上下文中“推斷”某一部分的型別。它讓我們能夠抽取或捕捉一個型別的某些部分，使得程式碼更加靈活。

### 實際案例：推斷函式的返回型別

我們經常需要自動推斷函式的返回值型別，而 infer 讓這個操作變得簡單直觀。以下範例展示如何推斷一個函式的返回型別：

```ts
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;

function getCurrentTime(): number {
  return Date.now();
}

type CurrentTime = ReturnType<typeof getCurrentTime>;
// 推斷出 CurrentTime 為 number
```

在這裡，`infer R` 被用來推斷出函式的返回型別，讓我們得知 `getCurrentTime` 的返回值是 `number`。

### 實際案例：推斷陣列元素型別

當我們處理陣列時，往往希望自動推斷出陣列內元素的型別。`infer` 同樣能派上用場：

```ts
type Item<T> = T extends (infer U)[] ? U : never;

const escapeRooms = [
  { name: '鎮魂曲', time: 100 },
  { name: '騎士詭途', time: 160 },
  { name: '冒險王', time: 150 },
  { name: '辛亥隧道', time: 100 },
];

type EscapeRoomType = Item<typeof escapeRooms>;
/**
 *  推斷出 EscapeRoomType = {
 *   name: string;
 *   time: number;
 *  }
 */
```

可以透過 `infer` 在需要處理不同型別的資料結構時，幫助我們動態地提取所需要的型別。

## 字面型別（Literal Types）

字面型別允許我們將變數限制為某些固定的具體值。字面型別可以是字串、數字或布林值，這讓我們能夠進一步限制變數的範圍。

### 字面型別的應用：樣板字串符

```ts
type Lateral = '東' | '西';
type Longitudinal = '南' | '北';
type Direction = Lateral | Longitudinal | `${Lateral}${Longitudinal}`;

function move(direction: Direction) {
    console.log(`往${direction}方移動`);
}

move('東北');

// Error: 類型 '"右上"' 的引數不可指派給類型 'Direction' 的參數。
move('右上');
```

字面型別有助於避免常見的輸入錯誤，並且可以透過樣板字串符串接型別。

### 樣板字串符的字面型別推斷

我們可以利用 `infer` 搭配字面型別來推斷函式參數的字面值型別。例如，提取一個函式參數的字面型別：

```ts
type EventType<T> = T extends `on${infer U}` ? U : never;

type MouseEvent = EventType<'onMouseUp' | 'onMouseDown'>;
// 'MouseUp' | 'MouseDown'
```

## 映射型別（Mapped Types）

映射型別允許我們基於現有型別，生成一個新的型別。這非常適合用來修改物件的屬性，例如將所有屬性設為可選、唯讀或是其他變形操作。

### 基本映射型別

最簡單的映射型別用法是遍歷一個型別的屬性，並對每個屬性進行操作：

```ts
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

const readonlyObj = {
  name: 'Johnson Mao',
  age: 18,
} as const;

const mutableObj: Mutable<typeof readonlyObj> = {
  name: 'Johnson Mao',
  age: 18,
};

mutableObj.name = 'Mao';
```

語法解析：
- `[P in keyof T]`：使用 `in` 關鍵字來遍歷 `keyof T` 的屬性 `key`。
- `-readonly`：使用 `-` 運算符，將 `readonly` 取消掉，最終回傳可編輯的物件型別。

### 結合 infer 與映射型別：推斷物件屬性型別

結合 infer 與映射型別，我們可以對物件內部的型別進行更加靈活的操作。以下範例展示如何推斷物件中所有方法的返回值型別：

```ts
type Methods<T> = {
    [K in keyof T]: T[K] extends (...args: any) => infer R ? R : never;
};

const api = {
    getAuthor: () => ({ name: 'Johnson Mao' }),
    getPosts: () => [
        {
          title: 'TypeScript 進階：型別推斷與映射',
          content: '我是內文'
        }
    ],
};

type ApiReturnTypes = Methods<typeof api>;
/**
 *  推斷出 ApiReturnTypes = {
 *   getAuthor: {
 *       name: string;
 *   };
 *   getPosts: {
 *       title: string;
 *       content: string;
 *   }[];
 *  }
 */
```

這樣的結合使我們能夠靈活地從一個物件中提取出每個方法的返回值型別。

## 總結

到目前這裡，你已經掌握了 TypeScript 中最常使用的語法了，接下來的文章，會先補充一些 TypeScript 與 JavaScript 都必須要會的先備知識。

## 參考文獻

- [[Day10] TS：什麼！Conditional Types 中還能建立型別？使用 infer 來實作 ReturnType 和 Parameters](https://pjchender.dev/ironman-2021/ironman-2021-day10/#infer-%EF%BF%BD%EF%BF%BD%E5%AD%B8%E7%BF%92%E9%87%8D%E9%BB%9E)
- [TypeScript：infer 的強大功用](https://chentsulin.medium.com/typescript-infer-%E7%9A%84%E5%BC%B7%E5%A4%A7%E5%8A%9F%E7%94%A8-9b43c4eac6fb)
- [TypeScript 5 Masterclass: Working with types advanced - Build a Full-Stack App !](https://www.youtube.com/watch?v=MGbi5J7AQ0U&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=7)
- [Type Hero - Explore](https://typehero.dev/explore)

