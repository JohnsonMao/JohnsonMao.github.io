---
title: TypeScript 5 進階：新版裝飾器入門
date: 2024/09/20 23:44:18
image: https://ithelp.ithome.com.tw/upload/images/20240920/20140224HtI3LyiPFm.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: TypeScript 5 裝飾器有重大的更新，這是因為裝飾器在 JavaScript 中首次提出於 ES2016 的草案中，並逐步經過 TC39 的標準化過程，最終在 TC39 Stage 3 中穩定下來，並在 TypeScript 5 中得到了實現。這使得裝飾器不再僅僅是一個實驗性特性，在未來也會是基於 JavaScript 標準的語法。裝飾器的演進不僅讓 TypeScript 開發者能夠更加一致地撰寫裝飾器，還提高了裝飾器的靈活性與可讀性。這一篇將探討新版裝飾器與舊版的差異，並介紹新版裝飾器的使用方法和特性。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240920/20140224HtI3LyiPFm.png)

## 前言

TypeScript 5 裝飾器有重大的更新，這是因為裝飾器在 JavaScript 中首次提出於 ES2016 的草案中，並逐步經過 TC39 的標準化過程，最終在 TC39 Stage 3 中穩定下來，並在 TypeScript 5 中得到了實現。這使得裝飾器不再僅僅是一個實驗性特性，在未來也會是基於 JavaScript 標準的語法。

裝飾器的演進不僅讓 TypeScript 開發者能夠更加一致地撰寫裝飾器，還提高了裝飾器的靈活性與可讀性。這一篇將探討新版裝飾器與舊版的差異，並介紹新版裝飾器的使用方法和特性。

## 新舊版的差異

在 TypeScript 5 之前，裝飾器被視為實驗性功能，需要透過 `experimentalDecorators` 來啟用，並且是基於 TypeScript 自己的實現。如果要使用新版的裝飾器，`experimentalDecorators` 的設定就要關閉。

而新版裝飾器也提供了一些新的種類可以使用，這部分我們下一篇文章在說明，同時也不再支援舊版的參數裝飾器（Parameter Decorator）。

使用方式也與舊版的方式一樣，有差別的地方是，舊版傳的參數與新版傳的參數不一樣。

舊版的型別定義比較簡單
![舊版裝飾器型別](https://ithelp.ithome.com.tw/upload/images/20240920/201402243quZdlZgir.png)

新版的型別定義的更加豐富且好用
![新版裝飾器型別](https://ithelp.ithome.com.tw/upload/images/20240920/201402245lsOEKaTzf.png)

可以到 `node_modules/typescript/lib/lib.decorators.d.ts` 查看。

### 新版裝飾器參數

新版裝飾器函式會提供兩個參數，分別為 target（被裝飾類別的建構子）與 context（執行的上下文）。

![context 參數](https://ithelp.ithome.com.tw/upload/images/20240920/20140224nTG8Bk0ihh.png)

可以看到 context 有提供更多上下文資訊可以做使用，同時 TypeScript 也有定義各裝飾器種類的上下文型別，這邊就先用最通用的裝飾器上下文型別 `DecoratorContext` 來說明。

- `addInitializer`：類別在定義完成後執行的回調函式
- `kind`：這個裝飾器的種類
- `metadata`：元資料
- `name`：套用裝飾器的類別名稱

而不同種類的裝飾器，還會支援不同的上下文方法，等到實作時在做介紹。

## 類別裝飾器

我們繼續用之前使用的範例，新版的類別裝飾器，除了 `baseClass` 這個參數外，還有 `context` 上下文這個參數，同時可以看到我們有使用 `ClassDecoratorContext<T>` 來進行裝飾器的約束，這樣就可以避免別人把這個裝飾器套用到類別以外的地方。

```ts
@withAge
class Person {
    name: string = "阿毛";
}

function withAge<T extends new (...args: any) => {}>(
    baseClass: T,
    context: ClassDecoratorContext<T>
) {
    console.log("套用年齡類別裝飾器");
    context.addInitializer(() => {
        console.log(`Class ${context.name} 的 addInitializer 執行`);
    });
    return class extends baseClass {
        age: number = 18;
        constructor(...args: any[]) {
            super(...args);
            console.log(`套用年齡到 ${baseClass.name} 類別`);
        }
    };
}

const person1 = new Person();
const person2 = new Person();
```

### 執行順序

可以看到我們在裝飾器內使用了 `context` 提供的方法，並觀察他的執行順序，可以發現 `addInitializer` 的執行時機是在類別在定義完成後執行的，可以利用這個特性做更多事情。

```ts
套用年齡類別裝飾器
Person Class 的 addInitializer 執行
套用年齡到 Person 類別
套用年齡到 Person 類別
```

## 總結

本文介紹了新版 TypeScript 5 的裝飾器，並比較了新舊版裝飾器的主要差異。在下一篇文章中，我們將更深入探討如何利用其他種類的新版裝飾器。

## 參考資料

- [TypeScript 5 Masterclass: TypeScript Decorators - Build a Full-Stack App !](https://www.youtube.com/watch?v=h_f8e246YgQ&t=3116s)
- [Announcing TypeScript 5.0](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#differences-with-experimental-legacy-decorators)
- [tc39 - proposal-decorators](https://github.com/tc39/proposal-decorators)
