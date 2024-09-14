---
title: TypeScript 必備：非同步與 Promise
date: 2024/09/14 21:07:31
image: https://ithelp.ithome.com.tw/upload/images/20240914/20140224KKtpk0N1gP.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 雖然 TypeScript 並沒有針對非同步與 Promise 做特別的處理，但所有程式語言，都會遇到非同步處理的挑戰，這一篇會稍微說明為何在現代應用中，需要使用 Promise、async/await 等非同步的技術，並說明 TypeScript 在這些情境中提供哪些型別來幫助我們更好的處理非同步的型別處理。
---

![https://ithelp.ithome.com.tw/upload/images/20240914/20140224KKtpk0N1gP.png](https://ithelp.ithome.com.tw/upload/images/20240914/20140224KKtpk0N1gP.png)

## 前言

雖然 TypeScript 並沒有針對非同步與 Promise 做特別的處理，但所有程式語言，都會遇到非同步處理的挑戰，這一篇會稍微說明為何在現代應用中，需要使用 Promise、async/await 等非同步的技術，並說明 TypeScript 在這些情境中提供哪些型別來幫助我們更好的處理非同步的型別處理。

如果你對 JavaScript 的非同步處理與 `Promise` 已經非常熟悉了，可以跳過本章節。

## JavaScript 中的非同步處理

JavaScript 本身是單線程的，意味著它一次只能執行一個操作。

然而，許多操作，例如：計時器或網路請求，都需要時間來完成，如果 JavaScript 同步地等待這些操作完成，就會導致整個程序阻塞，使用者介面會變得遲鈍卡住。

為了處理這種情況，JavaScript 使用非同步處理，允許程序在等待耗時操作完成的同時繼續執行其他任務。

- 計時器 setTimeout：執行`setTimeout` 後，Web API 會處理計時器，計時到了就會放到 Macrotask 中等待 Stack 空了才執行。
    ```ts
    console.log('global hello start');

    // 執行 Web API，計時器處理完後把這 callback 放到 Macrotask
    setTimeout(() => {
        console.log('setTimeout hello');
    }, 0)

    console.log('global hello end');
    /**
     * 執行順序
     * global hello start
     * global hello end
     * setTimeout hello
     */ 
    ```
- 非同步 Promise：執行 `Promise` 後，Web API 會處理 `Promise`，收到 `resolve` 或 `reject` 後，就會放到 Microtask 中等待 Stack 空了才執行。
    ```ts

    let data: unknown = null;

    // ES6 出的 Promise 讓我們可以透過 then 鏈式調用
    Promise.resolve({ user: 'Johnson Mao' })
        // 執行 Web API，收到狀態完成後，把 callback 放入 Microtask
        .then((result) => data = result)
        .then(() => {
            console.log(data); // 這時就會拿到資料
        })

    // 這時 Promise resolve 後的函式還在 Microtask 未執行
    console.log(data); // null 這時候因為非同步所以還沒拿到資料
    ```

想了解更多 Event loop 、 Macrotask 、 Microtask 可以到「[請說明瀏覽器中的事件循環 (Event Loop)](https://www.explainthis.io/zh-hant/swe/what-is-event-loop)」瞭解更多，此篇不會特別詳細說明。

## Promise

`Promise` 是 JavaScript 中用於處理非同步操作的一個重要概念，它代表一個未來可能完成的操作及其結果，可能會成功（resolve）或失敗（reject）。

我們可以透過以下兩種方式來限定函式回傳的型別，如果沒有限定的話，resolve 參數會沒有約束而自動推斷為 `unknown`。
- 限定函數回傳 `getData(): Promise<'data'>` 
- Promise 泛型約束 `new Promise<'data'>` 來自動推斷返回值


同時記得要使用 `try catch` 來捕獲 `Promise` 失敗的情況。

```ts
async function getData(): Promise<'data'> {
    return new Promise((resolve, reject) => {
        switch (true) {
            case true:
                resolve('data');
                break;
            default:
                reject('error');
        }
    });
}

// ES7 出的 async/await 讓我們達到類似同步撰寫方式的非同步操作
async function main() {
    try {
        const data = await getData();
        console.log(data);
    } catch (error) { // 如果沒用 catch 會捕獲不到失敗的情況
        if (error === 'error') {
            console.log('reject error');
        } else {
            console.log('other error');
        }
    }
}

main();
```

## ReturnType 與 Awaited

在 TypeScript 中，當我們處理非同步函式時，通常會遇到需要推斷 Promise 或 async 函式的回傳型別。這時，ReturnType 和 Awaited 這兩個內建型別工具可以幫助我們解決複雜的型別推斷問題。

### ReturnType 型別

`ReturnType<T>` 是另一個實用的 TypeScript 型別，它可以幫助我們推斷一個函式的回傳值型別。

```ts
async function getPost() {
    return Promise.resolve({
        title: 'TypeScript 核心：非同步處理與 Promise',
        content: 'content',
    });
}

/**
 *  這時 PromiseData 的型別如下
 *  Promise<{
 *     title: string;
 *     content: string;
 *  }>
 */ 
type PromiseData = ReturnType<typeof getPost>;
```

就可以輕鬆地取出函式的回傳型別，而這些 TypeScript 內建的工具型別本身也是透過泛型與 `infer` 進行型別推斷的，我們可以透過 `cmd/control` + 滑鼠左鍵點進去查看 TypeScript 是怎麼實作這些工具型別的。

![https://ithelp.ithome.com.tw/upload/images/20240914/20140224Yo74B0RGdZ.png](https://ithelp.ithome.com.tw/upload/images/20240914/20140224Yo74B0RGdZ.png)

### Awaited 型別

`Awaited<T>` 是 TypeScript 提供的一個實用型別，用來提取 `Promise` 的解包（unwrapped）型別。當我們有一個回傳 `Promise` 的函式時，使用 `Awaited` 可以直接推斷出最終的結果型別，一樣利用上方的 `getPost` 做案例。


```ts
/**
 *  這時 Data 的型別如下
 *  {
 *     title: string;
 *     content: string;
 *  }
 */ 
type Data = Awaited<ReturnType<typeof getPost>>;
```

而且 `Awaited` 還支持嵌套 `Promise` 型別推斷。

```ts
// 即使嵌套了多層 Promise，也依然能夠推斷出所要的型別
type StringType = Awaited<Promise<Promise<Promise<string>>>>;
```

## 總結

無論是在處理非同步 API 請求、並行執行多個非同步任務，還是編寫返回 Promise 的函式，這些 TypeScript 提供的工具都能極大提升程式碼的開發體驗和安全性。希望這篇文章讓你對 JavaScript 的非同步處理有了更深入的理解，並且能夠靈活運用 TypeScript 來提升你的開發效率！

## 參考資料

- [TypeScript 5 Masterclass: Functions and asynchronous programming](https://www.youtube.com/watch?v=xtYMxyBc8O0&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=7&t=922s)
- [[JavaScript] 一次搞懂同步與非同步的一切：一次做幾件事情 — 同步(Sync)與非同步(Async)](https://medium.com/itsems-frontend/javascript-sync-async-22e75e1ca1dc)
- [Promise 是什麼？有什麼用途？](https://www.explainthis.io/zh-hant/swe/what-is-promise)
- [請說明瀏覽器中的事件循環 (Event Loop)](https://www.explainthis.io/zh-hant/swe/what-is-event-loop)

