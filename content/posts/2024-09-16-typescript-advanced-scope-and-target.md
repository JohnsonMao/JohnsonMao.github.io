---
title: TypeScript 進階：編譯範圍與版本
date: 2024/09/16 23:41:51
image: https://ithelp.ithome.com.tw/upload/images/20240916/20140224iThCEbocms.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 在 TypeScript 中，編譯的靈活性與可控性是其強大的特點之一。通過 tsconfig.json 文件，我們可以對 TypeScript 編譯器進行全面的配置，可以控制哪些檔案應該被編譯或排除，以及目標 JavaScript 版本和編譯兼容用的函式庫選擇，都是我們經常面對的問題。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240916/20140224iThCEbocms.png)

## 前言

在 TypeScript 中，編譯的靈活性與可控性是其強大的特點之一。通過 tsconfig.json 文件，我們可以對 TypeScript 編譯器進行全面的配置，可以控制哪些檔案應該被編譯或排除，以及目標 JavaScript 版本和編譯兼容用的函式庫選擇，都是我們經常面對的問題。

因為配置細節有很多，將拆分成兩個部分來撰寫，這篇文章將介紹如何有效地使用這些配置選項，並提供實際範例來幫助你更好地掌控 TypeScript 專案的編譯行為。

## include 與 exclude

開發的專案中，並非所有的檔案都需要被 TypeScript 編譯器處理。有時我們可能需要限制編譯範圍以提高編譯速度，或是排除某些不需要編譯的檔案，例如：第三方套件或測試的檔案。這時 `include` 和 `exclude` 是我們最常用的選項。

### 如何使用 exclude

`exclude` 是用來排除不需要編譯的檔案或目錄。通常，我們會排除某些編譯後的輸出文件、第三方依賴包（如 node_modules）以及測試檔案等。

最典型的案例

- 排除第三方套件，例如： node_modules。
- 排除編譯輸出的檔案，例如： dist 或 build 文件夾。
- 排除我們撰寫的測試檔案或工具腳本。

```json
{
    // ...other config
    "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

其中支援萬用字元
- `*`： 表示匹配0至多個字元(不包含分隔符號)
- `?`： 匹配一個相符字元(不包含分隔符號)
- `**/`： 表示匹配所有子資料夾

### 如何使用 include

相對於 `exclude`，`include` 是明確指定要被編譯的檔案或目錄，這使得我們可以更精確地控制編譯範圍。如果沒有設置 `include`，TypeScript 預設會根據 `rootDir` 的設定編譯所有的 `.ts` 和 `.tsx` 文件，但有時我們需要更細緻的控制。

```json
{
    // ...other config
    "include": ["src/**/*"]
}
```

## 指定目標版本（target）

`target` 用來設定 TypeScript 編譯器將 TypeScript 代碼轉譯為哪個版本的 JavaScript，這對於項目的兼容性和性能有著重大影響。不同的 JavaScript 版本（例如： ES5、ES6、ESNext）提供了不同的語法特性和 API，因此選擇合適的 `target` 是確保應用能夠在目標環境中正確運行的關鍵。

### 如何使用 target

現代 JavaScript 語言標準，提供了許多強大的語法特性，但並不是所有執行環境都支持這些新特性。每個瀏覽器支持的版本都不太一致（例如已經停止支援的 IE），你可能需要將 `target` 設置為 ES5。但如果你的目標只需要支援現代瀏覽器或 Node.js 環境中運行，則可以選擇更新的標準。

```json
{
    "compilerOptions": {
        // ...other config
        "target": "ES6"
    }
}
```

### target 對應的轉譯差異

例如把 `target` 設置成 ES5 的話，因為 `class` 是 ES6 的語法糖，所以看到 `class` 被轉成 ES5 支援的語法了。

![目標版本](https://ithelp.ithome.com.tw/upload/images/20240916/201402247CEonhEROA.png)

## 編譯函式庫（lib）

TypeScript 的 `lib` 設置允許我們指定編譯時使用的標準函式庫。這些函式庫定義了全域物件和函數（例如： Array、Promise、Document），並提供對特定 API 的類型定義支援（例如： DOM 或 ES6 的功能）。

### 如何使用 lib

這邊舉個例子，如果你想要使用 `Promise`，但目標版本想打包到 ES5，這時你會發現它出現錯誤訊息。

![錯誤訊息](https://ithelp.ithome.com.tw/upload/images/20240916/20140224g8ak2BgyZW.png)

錯誤訊息也很明確的表示需要添加 `lib` 到設定檔內

```json
{
    // ...other config
    "lib": ["ES6"],
}
```

這時候 TypeScript 就會理解你之後打包時，會將 ES6 的兼容函式庫一起打包，例如：polyfill，但目前大多數的情況，已經比較少使用這個設定，通常設定 `target` 就夠滿足開發需求。

## 總結

理解並合理配置 TypeScript 的 `include`、`exclude`、`target` 和 `lib` 選項，能夠幫助開發者靈活掌控專案的編譯行為，提升編譯效能，確保應用程式在不同執行環境中的兼容性。這些選項提供了精細的控制手段，是專案開發中不可或缺的部分。下一篇文章將介紹 TypeScript 中的其他配置。

## 參考資料

- [TypeScript 初學者也能看的學習指南 03 - tsconfig.json 的配置](https://ithelp.ithome.com.tw/articles/10349895)
- [TypeScript 5 Masterclass: Tuning the TypeScript compiler - Build a Full-Stack App !](https://www.youtube.com/watch?v=sP6hH4Gha7M&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=9)
- [Need clarification of the target and lib compiler options](https://stackoverflow.com/questions/42093758/need-clarification-of-the-target-and-lib-compiler-options)
