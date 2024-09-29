---
title: TypeScript 進階：條件型別與靜態分析
date: 2024/09/09 22:59:52
image: https://ithelp.ithome.com.tw/upload/images/20240929/20140224nPMxMxR6hp.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 在前面介紹完基礎泛型後，接下來要介紹的是 TypeScript 中一個強大且靈活的功能——條件型別（Conditional Types）。本篇將深入探討條件型別的應用，包括如何用它來實現型別的深度唯讀，並進一步說明 TypeScript 中的常數（const）怎麼定義與區別。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240929/20140224nPMxMxR6hp.png)

## 前言

在前面介紹完基礎泛型後，接下來要介紹的是 TypeScript 中一個強大且靈活的功能——條件型別（Conditional Types）。本篇將深入探討條件型別的應用，包括如何用它來實現型別的深度唯讀，並進一步說明 TypeScript 中的常數（const）怎麼定義與區別。

## 條件型別（Conditional Type）

條件型別允許我們根據某些條件，動態地生成不同的型別。語法和三元運算符不能說很像，只能說一模一樣。條件型別的基本語法如下：

```ts
T extends U ? X : Y
```

如果型別 T 是型別 U 的子集合，那麼結果是型別 X，否則為型別 Y。

### 實際案例：自訂判斷型別（If）

這是一個基於條件型別的簡單型別工具，用來模擬程式語言中的 if 條件判斷。If 根據布林值類型 C，返回型別 T 或型別 F。

```ts
type If<C extends boolean, T, F> = C extends true ? T : F;
```

語法解析：
- `C extends boolean`：約束泛型 C 是布林值型別。
- `C extends true ? T : F`：當泛型 C 為 `true` 時，返回泛型 T 的型別，否則返回泛型 F 的型別。

實際應用就會像下面範例這樣，是不是很簡單！

```ts
type A = If<true, 'Yes', 'No'>; // A 為 'Yes'
type B = If<false, 'Yes', 'No'>; // B 為 'No'
```

### 進階實際案例：自訂深度唯獨型別（DeepReadonly）

之前有介紹過 Readonly 只能設定第一層唯讀，但在處理巢狀物件時，我們可能希望每一層屬性都是唯讀。這時，可以運用條件型別來實現深度唯讀型別。

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};
```

語法解析
- `[K in keyof T]`：這是映射型別的基本語法，遍歷型別 T 中的每個屬性 K。
- `readonly`：將屬性 K 設為 readonly，這樣它就不能被重新賦值。
- `T[K] extends object ? DeepReadonly<T[K]> : T[K]`：這是條件型別，用來檢查屬性 `T[K]` 是否是物件。如果是物件，則遞迴 `DeepReadonly`，否則保持原本的型別。

但除了自訂深度唯獨型別，其實 TypeScript 也有斷言語法可以將變數斷言成常數。

## 常數斷言（as const）

`const` 這個關鍵字是用來宣告不可重新賦值的變數。但在 TypeScript 中，`as const` 更進一步的將**物件**型別的所有屬性標記為 readonly，並將值的型別轉化為更具體的字面型別（Literal types）。

![常數斷言](https://ithelp.ithome.com.tw/upload/images/20240912/20140224wmVbD3GVwc.png)

使用方式就是用類型斷言的方式 `as const` 後，person 的所有屬性都會設為唯讀，並且型別是具體的字面型別，而非一般的 `string` 或 `number`。

### 實際案例：常數定義中的應用

當處理一些不希望被修改的固定值，例如下面示範的顏色設定檔，就可以使用 `as const` 降低型別在開發階段誤改的可能性。

```ts
const COLORS = {
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
} as const;

function getColorHex(color: keyof typeof COLORS) {
    return COLORS[color];
}

getColorHex('red');
// Error: 類型 '"yellow"' 的引數不可指派給類型 '"red" | "green" | "blue"' 的參數。
// getColorHex('yellow');
```

### typeof 獲取變數型別

上面的範例中有使用到 `typeof` 這個運算子，`typeof` 除了在 JavaScript 中是用來獲取型別的字串外，也是 TypeScript 中用來將我們的變數轉換成對應型別，提升定義型別的方便性。

![取型別](https://ithelp.ithome.com.tw/upload/images/20240912/20140224WsuiQG0LV8.png)

## 常數泛型（const type parameters）

TypeScript 5 引入了一個名為 `const type parameters` 的新功能，允許我們在泛型函式中防止型別參數被推斷為更寬泛的類型，保持具體性。

拿官網的範例，原本用下方的範例會推斷 names 是 `string[]`

```ts
type HasNames = { readonly names: string[] };
function getNamesExactly<T extends HasNames>(arg: T): T["names"] {
  return arg.names;
}

// name 推斷為 string[]
const names1 = getNamesExactly({ names: ["Mao"] });

// 需要特地為參數加上 as const 才能推斷出 ["Mao"] 元組
const names2 = getNamesExactly({ names: ["Mao"] } as const);
```

現在可以在泛型前面加 `const`，就能夠自動推斷出元組

```ts
type HasNames = { readonly names: string[] };
function getNamesExactly<const T extends HasNames>(arg: T): T["names"] {
  return arg.names;
}

// names3 推斷為 ["Mao"]
const names3 = getNamesExactly({ names: ["Mao"] });
```

## 唯讀（readonly）vs 常數（as const）

看到這裡你可能有個想法，const 和 readonly 都涉及將型別變成唯讀的狀態，但它們的作用範圍不同。

- `const`：是針對變數本身，保證變數不可重新賦值。
- `readonly`：是針對物件的屬性，保證物件屬性不能被修改。

## 列舉（enum）vs 常數列舉（const enum）

之前有稍微介紹了 enum 是 TypeScript 提供的枚舉型別，用來定義一組有名稱的常數。const enum 是一個犧牲一些功能優化程式碼體積的版本，它會在編譯過程中被內嵌到程式碼中，從而減少額外的編譯代碼，但相對的也會少一些方便的功能。

- enum 編譯後的程式碼
    ![編譯後的程式碼](https://ithelp.ithome.com.tw/upload/images/20240912/20140224zPJuGMFJrz.png)

- const enum 編譯後的程式碼
    ![編譯後的程式碼](https://ithelp.ithome.com.tw/upload/images/20240912/20140224ferocDvMPX.png)

## 總結

條件型別與靜態分析是 TypeScript 中強大且靈活的功能。通過條件型別，我們可以根據動態條件生成複雜型別結構；而靜態分析功能則進一步加強了型別的精確性，特別是在處理常數與唯讀資料時。掌握這些工具，將幫助開發者在大型專案中實現更強的型別安全性與程式碼健壯性。

## 參考文獻

- [Day 43. 通用武裝・泛型註記 X 推論未來 - TypeScript Generic Declaration & Annotation](https://ithelp.ithome.com.tw/articles/10226311)
- [TypeScript 5 Masterclass: Working with types advanced - Build a Full-Stack App !](https://www.youtube.com/watch?v=MGbi5J7AQ0U&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=7)
- [enum、const enum 和 as const，應該如何列舉資料於 TypeScript 當中？](https://www.webdong.dev/post/enum-const-enum-and-as-const/#%E4%BD%BF%E7%94%A8-const-enum)
- [TypeScript 5.0 - const Type Parameters](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters)
- [Type Hero - Explore](https://typehero.dev/explore)
