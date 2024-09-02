---
title: TypeScript 簡介
date: 2024/09/02 20:20:00
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 很高興你來到這裡，本次鐵人賽系列文章將會分享如何學習 TypeScript 以及實戰運用。目前從事前端已經有兩年，接觸 TypeScript 也只有一年多的經驗，以往有看過大神分享的 TypeScript 鐵人賽文章，時至今日，站在巨人肩膀上的我也想透過文章的方式輸出，讓我能更有效率地鞏固知識，如果有寫得不好或需要調整的地方也不吝賜教。
---

## 前言

很高興你來到這裡，本次鐵人賽系列文章將會分享如何學習 TypeScript 以及實戰運用。

目前從事前端已經有兩年，接觸 TypeScript 也只有一年多的經驗，以往有看過大神分享的 TypeScript 鐵人賽文章，時至今日，站在巨人肩膀上的我也想透過文章的方式輸出，讓我能更有效率地鞏固知識，如果有寫得不好或需要調整的地方也不吝賜教。

## 什麼是 TypeScript？

我想在 2024 年的前端工程師，應該沒有人不知道了吧，但還是不免俗的稍微介紹一下。

從[官網](https://www.typescriptlang.org/)的介紹，我們可以看到 TypeScript 是 JavaScript 的超集，添加了許多 JavaScript 沒有的語法，與編譯器更緊密的整合在一起，且可以轉換為 JavaScript 到各個地方中運行。

以下是 TypeScript 的工作方式，TypeScript 程式碼會被編譯為純 JavaScript 代碼，因此可以在任何支援 JavaScript 的環境中運行，如：瀏覽器或 Node.js。

![TypeScript 的工作方式](https://hackmd.io/_uploads/SJjtvy890.png)

## 能解決什麼問題？

既然最後都是 JavaScript 在運行，我們就要了解 TypeScript 是想解決哪些問題

- 增加了型別系統（Type System），可以在開發階段就檢查類型錯誤的問題
![image](https://hackmd.io/_uploads/HyPpnJU9R.png)

- 支援更多便於開發維護的語法特性，讓開發者體驗優化，如：枚舉、泛型、裝飾器
- 可以編譯出兼容各種版本的 JavaScript

## 開始前你會需要的工具

首先想要學習開發 TypeScript，會建議需要先安裝下面這些工具

- [Node.js](https://nodejs.org/en) 建議安裝 LTS 穩定版
- [TypeScript](https://www.typescriptlang.org/) 可以參考寶哥的 [安裝 TypeScript](https://willh.gitbook.io/typescript-tutorial/introduction/get-typescript)
- 程式碼編輯器，這裡我推薦使用 [VSCode](https://code.visualstudio.com/Download)

## 建立第一個 TypeScript

以上工具都安裝完了之後，我們先在專案資料夾中下

```bash
tsc --init
```

這時專案內會多一個 tsconfig.json 的檔案，且裡面會有很多設定可以調整，我們先關注幾個最常用的設定

- rootDir: 用來設定 TypeScript 的 source code 位置，通常都設定 `/src`
- outDir: 用來設定編譯過的程式碼放的位置，通常都設定 `/dist`
- target: 用來設定要編譯到哪個版本的 JavaScript，這裡我們先設定 `ES5`

接著我們先建立一個 ts 檔案在 `src` 目錄下

```ts
// /src/main.ts
interface IPerson {
  name: string;
}

const logName = (person: IPerson) => {
  console.log(person.name);
};

logName({ name: "Mao" });
```

這時你在終端機打 `tsc` (把 ts 檔案編譯成 js 的指令)，就會發現新增了一個 `dist` 的資料夾內有 main.js 的檔案，並且這個 js 已經轉換兼容 ES5 的語法

![tsc 編譯](https://hackmd.io/_uploads/Hk9KOgU9R.png)

恭喜你～已經開始在撰寫 TypeScript 程式碼了！

## 參考文獻

- [Day 01. 遠征 TypeScript・行前準備](https://ithelp.ithome.com.tw/articles/10214714)
- [TypeScript 5 Masterclass: Getting Started - Build a Full-Stack App !
](https://www.youtube.com/watch?v=bSfydFzrHlU)
- [TypeScript 新手指南](https://willh.gitbook.io/typescript-tutorial/introduction/get-typescript)
- [TypeScript 官方文件](https://www.typescriptlang.org/)
