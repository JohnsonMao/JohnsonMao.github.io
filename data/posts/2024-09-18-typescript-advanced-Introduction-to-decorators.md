---
title: TypeScript 進階：初識裝飾器
date: 2024/09/18 23:34:05
image: https://ithelp.ithome.com.tw/upload/images/20240918/20140224vbe9TdorME.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 在上一篇文章中，我們介紹了如何設定 TypeScript 的編譯範圍與目標版本。而這一篇文章將進一步介紹 tsconfig.json 的其他細節配置，包括類型檢查、編譯輸出設定，以及常見的 CLI 指令參數，這些設定不僅會影響編譯結果，還會對你的開發體驗產生直接的影響。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240918/20140224vbe9TdorME.png)

## 前言

裝飾器（Decorators）是一個強大且靈活的 TypeScript 特性，它允許我們在類別和類別成員的定義上進行修飾、擴展和修改。這個功能在許多框架中廣泛應用，尤其是在 Angular、NestJS 等依賴裝飾器進行依賴注入的框架中。

在 TypeScript 5 之前，裝飾器還是一個實驗性功能，與現在 TypeScript 5 的裝飾器撰寫方式差異很大，這一篇會先介紹舊版的裝飾器基本使用方式。

## 什麼是裝飾器？

裝飾器是一種用來修飾類別、屬性或方法的特殊語法。裝飾器本質上是一個函數，允許我們在類別層級或成員層級上執行某些邏輯，例如記錄操作、修改屬性值，甚至動態添加功能。

在使用裝飾器之前，必須在 `tsconfig.json` 中啟用它。裝飾器是 TypeScript 的一個實驗性語法，啟用方法如下：

```json
{
    "compilerOptions": {
        // ...other config
        "experimentalDecorators": true
    }
}
```

這段設定會允許 TypeScript 編譯器理解並編譯裝飾器語法。

如果沒設定，除了編譯器裝飾器的地方可能會飄紅毛毛蟲外，在執行編譯時，也會有錯誤訊息顯示出來，如下圖。

![錯誤訊息](https://ithelp.ithome.com.tw/upload/images/20240918/20140224QSGBTnXHqP.png)

## 裝飾器的基本結構

前面有提到，裝飾器是要使用在類別或類別的成員上，所以我們先實作一個簡單的類別，而裝飾器本質上是一個高階函數，它接收目標類別、屬性或方法上的資料，並可以進行更多操作。最基本的裝飾器範例如下：

```ts
class Person {
    @watchValue
    name: string = '阿毛';

    constructor() {
        console.log('初始化 Person');
    }
}

function watchValue(target: any, key: string) {
    console.log('調用 watchValue 裝飾器');
}

const person = new Person();
```

### 執行順序

進行編譯過後執行，會發現當裝飾器會先被執行過一次，接著實例化才會執行 `constructor` 的部分。

```bash
調用 watchValue 裝飾器
初始化 Person
```

## 實作裝飾器功能

我們已經知道了如何使用裝飾器了，接下來要介紹如何實作裝飾器的功能，我們可以利用泛型的方式來定義參數的型別，屬性裝飾器會傳兩個參數，分別為 `target`（被裝飾類別的建構子） 與 `key`（被裝飾類別的屬性名稱）

```ts
function watchValue<T, K extends keyof T & string>(target: T, key: K) {
    console.log("調用 watchValue 裝飾器");

    let value = target[key];
    const getter = () => value;
    const setter = (newValue: T[K]) => {
        console.log(`設置 ${key} 屬性值從 ${value} 改為 ${newValue}`);
        value = newValue;
    };

    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        configurable: true,
        enumerable: true,
    });
}

const person = new Person();
person.name = "Mao";
```

在這個範例中，`watchValue` 裝飾器透過 `Object.defineProperty` 改變屬性的行為，使我們能夠監聽並記錄屬性值的變化。當執行這段代碼時，控制台會輸出：

```bash
調用 watchValue 裝飾器
設置 name 屬性值從 undefined 改為 阿毛
初始化 Person
設置 name 屬性值從 阿毛 改為 Mao
```

## 總結

本文介紹了如何使用 TypeScript 5 之前的裝飾器，在實際應用中，裝飾器能幫助我們在框架開發、資料管理和依賴注入等多種情境中實現高效的功能擴展。未來進一步探討類別裝飾器、方法裝飾器、參數裝飾器...等其他的裝飾器，以及如何運用 TypeScript 5 新的裝飾器標準來進行更靈活的開發。

## 參考資料

- [十分鐘帶你了解 TypeScript Decorator](https://oldmo860617.medium.com/%E5%8D%81%E5%88%86%E9%90%98%E5%B8%B6%E4%BD%A0%E4%BA%86%E8%A7%A3-typescript-decorator-48c2ae9e246d)
- [TypeScript 5 Masterclass: TypeScript Decorators - Build a Full-Stack App !](https://www.youtube.com/watch?v=h_f8e246YgQ&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=13)
- [裝飾器 ( Decorators )](https://ithelp.ithome.com.tw/articles/10330160)
