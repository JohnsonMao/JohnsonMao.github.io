---
title: TypeScript 必備：模組 Module
date: 2024/09/15 22:41:39
image: https://ithelp.ithome.com.tw/upload/images/20240914/20140224KKtpk0N1gP.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 模組化是現代程式開發中不可或缺的一部分。模組允許我們將程式碼拆分為更小的可重用單位，從而提高了程式碼的可維護性和可讀性。在 TypeScript 中，我們使用 import 和 export 關鍵字來實現模組的匯入與匯出，並透過 npm 來管理第三方套件和依賴。
---

![https://ithelp.ithome.com.tw/upload/images/20240915/20140224mTt4kTYO0D.png](https://ithelp.ithome.com.tw/upload/images/20240915/20140224mTt4kTYO0D.png)

## 前言

模組化是現代程式開發中不可或缺的一部分。模組允許我們將程式碼拆分為更小的可重用單位，從而提高了程式碼的可維護性和可讀性。在 TypeScript 中，我們使用 import 和 export 關鍵字來實現模組的匯入與匯出，並透過 npm 來管理第三方套件和依賴。

本篇將介紹如何從零開始建立一個 npm 專案，並使用 TypeScript 管理模組與依賴，確保專案結構清晰且高效，如果對 JavaScript 模組化已經很熟悉的人，可以跳過此章節。

## 建置專案模組

### 初始化 npm 專案

首先，在 TypeScript 專案中，使用 npm 初始化專案。可以透過指令 `npm init -y` 來生成 package.json

> npm init 是初始化專案的指令，後面的 -y 是指令參數

package.json 是管理專案的核心，負責追蹤套件依賴、腳本、版本等資訊。在大型專案中，package.json 有助於確保專案一致性。

### tsconfig.json 設定

接下來，如同第一篇一樣，設定 tsconfig.json，這是 TypeScript 編譯器的設定檔，控制編譯行為。可以使用指令 `npx tsc --init` 來生成預設的 tsconfig.json

> 第一篇我們使用的指令是 tsc --init，而前面的 npx 是當執行後面的的指令，會根據指令去安裝所需要的套件，執行完後就會立刻移除。

### 安裝開發用依賴

通常需要安裝一些開發用依賴，以輔助專案運行和編譯。雖然我們之前已經有全局安裝 TypeScript，但為了確保未來在不同的平台都能使用同一個版本的 TypeScript，建議還是安裝到開發用依賴，其中 `-D` 指令參數是用來指定安裝到開發用依賴，打包後並不會進到產品程式碼中。

```bash
npm install -D typescript @types/node
```

- typescript：TypeScript 編譯器。
- @types/node：Node.js 的型別定義，方便開發者使用 Node.js 內建的 API。

> 安裝完成後，會看到 package.json 內的 devDependencies 裡面多了 typescript @types/node 這兩個依賴套件

### 設定 npm script

為了簡化開發流程，並且可以使用開發用依賴的 TypeScript，我們可以在 package.json 中設定自訂腳本。

```json
"scripts": {
  "build": "tsc",
  "start": "node src/main.ts",
}
```

這些指令分別執行不同的任務：

- `build`：編譯 TypeScript 程式碼至指定目錄。
- `start`：運行打包好的應用程式。


## 匯出模組（export）

我們使用 `export` 關鍵字來將變數、函數或類別導出成模組的一部分。常見的匯出方式有以下兩種：

- 具名匯出（Named Export）
    ```ts
    export function sum(a: number, b: number) {
        return a + b;
    }

    export const minus = (a: number, b: number) => a - b;

    export interface IPerson {
        name: string;
        age: number;
    } 
    ```

- 預設匯出（Default Export）
    ```ts
    export default function multiply(a: number, b: number) {
        return a * b;
    }
    ```

這兩種方式可以依需求來選擇，具名匯出允許你在一個模組中匯出多個成員，而預設匯出則是用於匯出單一主要成員。

## 匯入模組 import

### 絕對路徑與相對路徑

我們使用 `import` 關鍵字來將模組內的變數、函數或類別匯入，而模組的匯入主要有兩種方式：絕對路徑 和 相對路徑。

- 絕對路徑：匯入瀏覽器、node.js 或安裝的套件模組
    ```ts
    import fs from 'fs';
    ```

- 相對路徑：匯入在專案內開發的模組
    ```ts
    import { sum } from "./utils";
    ```


### 路徑別名（alias）

在大型專案中，為了簡化匯入路徑，我們可以在 tsconfig.json 中使用路徑別名。設定路徑別名可以幫助我們避免繁瑣的相對路徑。

例如：我有個檔案放在很深的資料夾內，如下圖
![https://ithelp.ithome.com.tw/upload/images/20240915/20140224bl0zXHMcsh.png](https://ithelp.ithome.com.tw/upload/images/20240915/20140224bl0zXHMcsh.png)

那我們可以透過修改 tsconfig.json 中使用路徑別名，定義自己的別名與其對應的路徑

```json
"paths": {
    "@deepUtils": ["./src/super/deep/path/utils.ts"]
},
```

就能透過這個別名來匯入模組

```ts
import { divide } from "@deepUtils";
```


### 匯入型別（import type）

import type 是 TypeScript 中的一個語法，用於只匯入型別資訊，雖然 TypeScript 本身打包就會過濾掉型別，但如果有搭配其他打包編譯工具，如： Babel，可能會讓打包工具不知道這個匯入是型別還是具體功能，導致打包完成後，匯入的型別沒有移除，輕則多打包一點東西，嚴重會運行不起來。


使用方式如下：
```ts
import type multiply from './utils';
import { type IPerson }  from './utils';
```

## 總結

模組化是現代應用開發中至關重要的一部分，而 TypeScript 透過其強大的型別系統進一步提升了模組化的可讀性與安全性。在這篇文章中，我們介紹了如何初始化一個 TypeScript 專案，設定 tsconfig.json，並且學習了模組的匯入與匯出方式。隨著專案的複雜度增加，掌握絕對路徑與路徑別名的使用，將有助於更清晰地管理專案架構。

## 參考資料

- [TypeScript 5 Masterclass: Modules and module bundling - Build a Full-Stack App !](https://www.youtube.com/watch?v=Tabsz3bsq88&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=8)
- [[TS] Namespaces and Modules](https://pjchender.dev/typescript/ts-namespaces-modules/)
- [什麼是 JavaScript 模組？](https://www.explainthis.io/en/swe/what-is-frontend-module#java-script-modules-evolution)
