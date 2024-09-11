---
title: TypeScript 進階：條件型別與靜態分析
date: 2024/09/09 22:59:52
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 前面的文章已經有稍微介紹了介面（interface）的用法，介面能夠幫助我們定義物件應該有哪些屬性和方法，從而提供一種強型別的約束機制，讓開發者更容易組織代碼並進行程式設計。
---

## 條件型別（Conditional Type）

條件型別允許我們根據某些條件，動態地生成不同的型別。語法和三元運算符非常相似。條件型別的基本語法如下：

```ts
T extends U ? X : Y
```
如果型別 T 可以分配給型別 U，那麼結果是型別 X，否則為型別 Y。

### 實際案例

例如之前有介紹過 Readonly 只能設定第一層唯讀，假如想要深度 Readonly ，無論屬性位於多深的巢狀結構中都可以設為唯讀，就可以運用條件型別實作：

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};
```
語法解析
- `[P in keyof T]`：這是映射型別的基本語法，遍歷型別 T 中的每個屬性 P。
- `readonly`：將屬性 P 設為 readonly，這樣它就不能被重新賦值。
- `T[P] extends object ? DeepReadonly<T[P]> : T[P]`：這是條件型別，用來檢查屬性 T[P] 是否是物件。如果是物件，則遞迴應用 DeepReadonly，否則保持原樣。

## 常數（as const）

既然都說明到深度唯讀，就剛好介紹很常使用到的語法， `const` 這個關鍵字是用來宣告不可重新賦值的變數。但在 TypeScript 中，`as const` 更進一步，將**物件**型別的所有屬性標記為 readonly，並將值的型別轉化為更具體的字面型別。

![image](https://hackmd.io/_uploads/rkKQ_NyTR.png)

使用 as const 後，person 的屬性成為不可變的，並且型別是具體的字面型別，而非一般的 string 或 number。

### 實際案例：常數定義中的應用

當處理一些不希望被修改的固定值，如常量、選項列表等，可以使用 `as const` 提升型別安全性。

```ts
const COLORS = ['red', 'green', 'blue'] as const;

function getColor(color: typeof COLORS[number]) {
  return color;
}

getColor('red');  // OK
getColor('yellow');  // Error: 'yellow' 不在 COLORS 內
```

這樣做可以確保我們在程式碼中只使用固定集合內的值。

## 唯讀（readonly）vs 常數（as const）

const 和 readonly 雖然都有 "不可變" 的概念，但它們的作用範圍不同。const 是針對變數本身，而 readonly 則是針對物件的屬性。

- const 保證變數不可重新賦值。
- readonly 保證物件屬性不能被修改。

## 列舉（enum）vs 常數列舉（const enum）

之前有稍微介紹了 enum 是 TypeScript 提供的枚舉型別，用來定義一組有名稱的常數。const enum 是一個優化版本，它會在編譯過程中被內嵌到程式碼中，從而減少額外的編譯代碼。

- enum 編譯後的程式碼
    ![image](https://hackmd.io/_uploads/rkKQ_NyTR.png)

- const enum 編譯後的程式碼
    ![image](https://hackmd.io/_uploads/rkKQ_NyTR.png)

## 參考文獻

https://ithelp.ithome.com.tw/articles/10226311

https://www.youtube.com/watch?v=MGbi5J7AQ0U&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=7

https://www.webdong.dev/post/enum-const-enum-and-as-const/#%E4%BD%BF%E7%94%A8-const-enum

https://ithelp.ithome.com.tw/articles/10221542?sc=rss.iron
