---
title: TypeScript 進階：舊版裝飾器
date: 2024/09/19 23:26:07
image: https://ithelp.ithome.com.tw/upload/images/20240919/20140224BMWkTkEKiF.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 在上一篇文章中，我們初步介紹了裝飾器的基本概念與應用方式。本篇將深入探討 TypeScript 5 之前的舊版裝飾器，並介紹其各種類型。在舊版裝飾器中，有些情況下需要在 tsconfig.json 中額外設定 emitDecoratorMetadata、experimentalDecorators 來啟用裝飾器元資料。請先將此設定加入，以便順利使用裝飾器功能。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240919/20140224BMWkTkEKiF.png)

## 前言

在上一篇文章中，我們初步介紹了裝飾器的基本概念與應用方式。本篇將深入探討 TypeScript 5 之前的舊版裝飾器，並介紹其各種類型。在舊版裝飾器中，有些情況下需要在 tsconfig.json 中額外設定 `emitDecoratorMetadata`、`experimentalDecorators` 來啟用裝飾器元資料。請先將此設定加入，以便順利使用裝飾器功能。

## 類別裝飾器（Class Decorator）

類別裝飾器可以用來修改或擴展類別的定義。它可以用來新增資料、修改原有的類定義或對類進行封裝處理。類別裝飾器會傳原本的類別為參數，並加在要使用此裝飾器的類別上方。

```ts
@sealed
@withAge
class Person {
    name: string = '阿毛';
}

function sealed<T extends new (...args: any[]) => {}>(baseClass: T) {
    console.log('阻止擴展類別裝飾器');
    Object.seal(baseClass);
    Object.seal(baseClass.prototype);
}

function withAge<T extends new (...args: any[]) => {}>(baseClass: T) {
    console.log('套用年齡類別裝飾器');
    return class extends baseClass {
        age: number = 18;
        constructor(...args: any[]) {
            super(...args);
            console.log(`套用年齡到 ${baseClass.name} 類別`);
        }
    };
}
```

如果泛型要約束可實例化類別，可以使用 `new (...args: any[]) => {}` 來進行約束。

### 多個裝飾器的執行順序

可以看到裝飾器可以套用多個，以上面那個案例，會先執行 `withAge` 在執行 `sealed`，裝飾器會按照從下到上的順序執行，這或許有些反直覺，但如果將裝飾器看作嵌套的函數調用，這個順序就變得合乎邏輯。例如：

```ts
// 以下只是幫助想像的範例
sealed(
    withAge(
        Person
    )
)
```

## 裝飾器工廠（Decorator Factory）

看到上方範例中使用的 `withAge`，是不是覺得寫死年齡是不是不夠彈性，這時候就可以使用裝飾器工廠的撰寫方式，裝飾器工廠允許我們動態生成裝飾器，通過傳遞參數來控制裝飾器的行為。而裝飾器工廠本質上，其實就是一個返回裝飾器函數的函數。

```ts
@withAge(18)
class Person {
    name: string = '阿毛';
}

function withAge(_age: number) {
    return function<T extends new (...args: any[]) => {}>(baseClass: T) {
        console.log('套用年齡類別裝飾器');
        return class extends baseClass {
            age: number = _age;
            constructor(...args: any[]) {
                super(...args);
                console.log(`套用年齡到 ${baseClass.name} 類別`);
            }
        };
    }
}
```

可以看到我們透過函數的方式更彈性的傳遞參數進去。

## 方法裝飾器（Method Decorator）

方法裝飾器用來修改方法的行為，例如在方法執行前後進行邏輯操作、修改方法的返回值或記錄方法的執行過程。方法裝飾器會傳三個參數，分別為 `target`（被裝飾類別的建構子） 、 `key`（被裝飾類別的方法名稱）與 `descriptor`（被裝飾類別的方法屬性），並加在要使用此裝飾器的類別方法上方。

```ts
class Wallet {
    private balance: number = 0;

    constructor(public limit: number) {}

    @limitDeposit
    addMoney(amount: number) {
        this.balance += amount;
        console.log(`已存入 ${amount} 元，目前餘額：${this.balance} 元`);
    }
}

// 方法裝飾器來限制單次存款上限
function limitDeposit<T extends { limit: number }>(target: T, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(this: T, amount: number) {
        if (amount > this.limit) {
            console.log(`存款失敗：單次存款不能超過 ${this.limit} 元`);
        } else {
            originalMethod.apply(this, [amount]);
        }
    };
}

const myWallet = new Wallet(500); // 設定單次存款上限為 500 元

myWallet.addMoney(100); // 已存入 100 元，目前餘額：100 元
myWallet.addMoney(600); // 存款失敗：單次存款不能超過 500 元
```

## 屬性裝飾器（Property Decorator）

屬性裝飾器可以用來修飾類別的屬性，可以攔截屬性的讀取（getter）和寫入（setter）行為。屬性裝飾器會傳兩個參數，分別為 `target`（被裝飾類別的建構子） 與 `key`（被裝飾類別的屬性名稱），並加在要使用此裝飾器的類別屬性上方。

```ts
class Person {
    @watchValue
    name: string = '阿毛';
}

function watchValue<T, K extends keyof T & string>(target: T, key: K) {
    console.log("屬性裝飾器");

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

## 參數裝飾器（Parameter Decorator）

參數裝飾器用於修飾方法的參數，這種裝飾器通常用來標註參數或進行參數的驗證。參數裝飾器會傳三個參數，分別為 `target`（被裝飾類別的建構子） 、 `key`（被裝飾類別的屬性名稱）與 `index`（參數的順序），並加在要使用此裝飾器的參數前方。

因為使用情境不多，且 TypeScript 5 把這個裝飾器移除了，所以這邊不用特別放在心上。

```ts
class Wallet {
    private balance: number = 0;

    addMoney(@logParameter amount: number) {
        this.balance += amount;
    }
}

function logParameter<T>(target: T, key: string, index: number) {
    console.log(`${key} 方法的第 ${index + 1} 個參數`);
}
```

## 總結

本文介紹了 TypeScript 5 之前的舊版裝飾器，包括類別裝飾器、方法裝飾器、屬性裝飾器、參數裝飾器、裝飾器工廠與裝飾器執行的順序。這些裝飾器提供了一種在不更改原始邏輯的前提下，對類及其成員進行修改和擴展的靈活方式。隨著 TypeScript 5 的更新，裝飾器功能得到了進一步加強，下一篇將介紹 TypeScript 5 的新版裝飾器的使用方式。

## 參考資料

- [十分鐘帶你了解 TypeScript Decorator](https://oldmo860617.medium.com/%E5%8D%81%E5%88%86%E9%90%98%E5%B8%B6%E4%BD%A0%E4%BA%86%E8%A7%A3-typescript-decorator-48c2ae9e246d)
- [TypeScript 5 Masterclass: TypeScript Decorators - Build a Full-Stack App !](https://www.youtube.com/watch?v=h_f8e246YgQ&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=13)
- [裝飾器 ( Decorators )](https://ithelp.ithome.com.tw/articles/10330160)