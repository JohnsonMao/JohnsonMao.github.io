---
title: TypeScript 進階：tsconfig 細節配置
date: 2024/09/17 17:16:25
image: https://ithelp.ithome.com.tw/upload/images/20240917/20140224CPxg8ZsWp0.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 在上一篇文章中，我們介紹了如何設定 TypeScript 的編譯範圍與目標版本。而這一篇文章將進一步介紹 tsconfig.json 的其他細節配置，包括類型檢查、編譯輸出設定，以及常見的 CLI 指令參數，這些設定不僅會影響編譯結果，還會對你的開發體驗產生直接的影響。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240917/20140224CPxg8ZsWp0.png)

## 前言

在上一篇文章中，我們介紹了如何設定 TypeScript 的編譯範圍與目標版本。而這一篇文章將進一步介紹 tsconfig.json 的其他細節配置，包括類型檢查、編譯輸出設定，以及常見的 CLI 指令參數，這些設定不僅會影響編譯結果，還會對你的開發體驗產生直接的影響。

## 設定檔

TypeScript 官方很貼心，在我們透過 `tsc --init` 生成出設定檔時，已經幫我們將設定檔的細節分類好並有提供完整的註釋。

### tsconfig 設定分類說明

- Projects（專案）
    主要用於管理 TypeScript 專案的建置方式，特別是在大型專案中，遇到編譯效能瓶頸時，可以透過設定這邊的細節來做取捨，但大多數情況下，直接使用預設值就可以了。
- Language and Environment（語言與環境）
    用於配置 TypeScript 語言本身的行為，編譯目標版本相關選項，以及兼容 Babel 的一些設定。前面幾篇都有介紹到，最常用的設定就是 `target` 編譯版本，以及如果有使用到 React 之類的框架，也會很常設定。
- Modules（模組）
    用於配置 TypeScript 如何處理模組的載入和解析。前面幾篇都有介紹到，也是我們前面最常用的設定
    - `module` 編譯成什麼模組的程式碼，例如：`CommonJS`、`ES6`
    - `rootDir` 程式碼的根目錄，例如：`./src`
    - `paths` 路徑別名的設定，例如：`{ "@deepUtils": ["./src/deep/path/utils.ts"] }`
- JavaScript Support（JavaScript 支援）
    用於配置 TypeScript 如何處理 JavaScript 檔案，適合用在 JavaScript 專案要逐步移轉成 TypeScript 專案時，啟用的設定。
- Emit（輸出）
    用於配置 TypeScript 編譯器的輸出行為，例如輸出檔案的路徑、檔案命名規則、是否生成 Source Map ...等，稍後會再多做說明。
- Interop Constraints （互通性約束）
    用於配置 TypeScript 如何與 JavaScript 程式碼互動，例如設定如何檢查 JavaScript 檔案的類型等等，通常也都直接使用預設值即可。
- Type Checking（類型檢查）
    用於配置 TypeScript 類型檢查器的行為，例如設定類型檢查的嚴格程度、是否開啟嚴格的 Null 檢查，稍後會再稍微說明。
8. Completeness（檢查完整性）
    用於配置 TypeScript 編譯器如何檢查程式碼的完整性，例如是否跳過第三方套件檔案的型別檢查，通常情況都是跳過第三方函式庫的類型檢查，除非想要嚴謹到連第三方函式庫的型別你都想檢查再調整。

## 類型檢查（Type Checking）

TypeScript 以其強大的靜態類型檢查功能而聞名。藉由 tsconfig 中的類型檢查設置，我們可以靈活地控制代碼的型別檢查嚴格程度。

### 嚴格模式 strict

`strict` 是最常用的類型檢查設置，它會將所有的型別檢查都啟用了。這使得代碼的型別檢查更加嚴格，有助於防止潛在的型別錯誤。

其他類型檢查通常都不太會調整，畢竟調整了就喪失了一部份的嚴謹性，但這邊再稍微介紹 TypeScript 4.0 時，有將 `try catch` 的 error 從 `any` 改成 `unknown`。

導致升級 TypeScript 版本時，所有 `try catch` 的地方都會出現報錯，於是乎 4.4 版本就推出新的設定參數 `useUnknownInCatchVariables`，方便未來升版本的人可以漸進式調整。

```ts
try {
    // ...
} catch (err) { // TypeScript 4.0 時，err 從 any 變成 unknown
    // 官方建議透過 instanceof 的方式判斷是否為 Error 類別或自定義錯誤
    if (err instanceof Error) {
        console.log(err.message);
    }
}
```

## 編譯輸出（Emit）

TypeScript 提供了多種選項來控制輸出的檔案。例如我們常用的 `outDir` 來控制輸出的資料夾，這邊就介紹 `declaration` 與 `sourceMap`，其他設定有需要再看就好。

### 輸出聲明文件（declaration）

啟用後，TypeScript 會生成 `.d.ts` 聲明文件，這些文件能讓其他 TypeScript 專案引用你的程式碼，通常用來生成函式庫給別人使用時會開啟。

![聲明文件](https://ithelp.ithome.com.tw/upload/images/20240917/20140224ETsr48lGMF.png)

### 輸出來源映射檔案（sourceMap）

`sourceMap` 設置讓 TypeScript 在編譯時生成 `.map` 文件，這些文件能夠幫助開發者在瀏覽器或其他開發工具中追溯到 TypeScript 原始碼執行位置，方便開發中調試程式碼。

![調試程式碼](https://ithelp.ithome.com.tw/upload/images/20240917/20140224OIDNgwvLA4.png)

## 繼承配置（extends）

假設你的專案很大，會需要依照不同的環境配置不同的設定檔時，就可以利用 `extends` 來繼承設定檔，可以使用字串來繼承一個檔案，也可以使用字串陣列來繼承多個檔案，再根據需求調整其他設定檔。

例如：專案除了開發用的配置外，還有測試環境與生產環境的配置，而在開發與測試環境要使用 `sourceMap`，就可以針對環境個別設定。

![繼承配置](https://ithelp.ithome.com.tw/upload/images/20240917/20140224c6CC7629z5.png)

## cli 指令參數

當你 tsconfig 不在你的根目錄時，你會發現輸入 `tsc` 指令時會報錯，而這邊就是要介紹，要如何透過 cli 參數來命令編譯器工作。

### 幫助資訊（help）

首先要知道最基本的 `tsc --help`，它會顯示出 `tsc` 所有可以輸入的參數。你會發現裡面有些參數跟 `tsconfig` 的設定檔是有重疊的，代表除了可以透過 `tsconfig` 設定外，也可以透過 cli 來命令。

### 指定設定檔路徑（p）

然後以上面的資料夾結構來示範的話，如果我們想要執行 `tsconfig.dev.json` 的話，就可以輸入 `tsc -p ./config/tsconfig.dev.json`，其中的 `-p` 參數後面的字串設定為要執行設定檔的路徑

### 監聽模式（watch）

而如果我們每次變更檔案都要重新執行指令，也是很麻煩，所以 cli 也有提供監聽模式，只要我們指令參數多加 `--watch` 或 `-w` 時，當我們修改檔案時，也會自動執行編譯。

## 總結

本文介紹了 TypeScript 中的類型檢查、編譯輸出設定，以及常見的 CLI 指令參數。通過合理配置這些選項，我們可以靈活掌控編譯器的行為，從而更好地應對不同的專案需求調整。

## 參考資料

- [TypeScript 5 Masterclass: Tuning the TypeScript compiler - Build a Full-Stack App !](https://www.youtube.com/watch?v=sP6hH4Gha7M&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=9&t=1237s)
- [TypeScript 初學者也能看的學習指南 03 - tsconfig.json 的配置](https://ithelp.ithome.com.tw/articles/10349895)
- [Intro to the TSConfig Reference](https://www.typescriptlang.org/tsconfig/)
