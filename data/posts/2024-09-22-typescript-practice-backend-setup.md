---
title: TypeScript 實戰：後端 Express Setup
date: 2024/09/22 21:05:41
image: https://ithelp.ithome.com.tw/upload/images/20240922/20140224rgrw90UmGl.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: TypeScript 我們已經學的差不多了～接下來要進入實戰環節！這個章節我們會使用 Express 框架來實作簡單的 CRUD Web 後端應用程式，會選擇使用 Express 的原因也非常簡單。1. Express 足夠簡單、輕便、易於學習。2. 到現在都還在持續更新，是個成熟的後端框架。3. 最重要的是，也是我唯一會的後端框架。本篇會先介紹如何使用 TypeScript 與 Express 建置基礎的後端專案，並讓它運作起來。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240922/20140224rgrw90UmGl.png)

## 前言

TypeScript 我們已經學的差不多了～接下來要進入實戰環節！這個章節我們會使用 Express 框架來實作簡單的 CRUD Web 後端應用程式，會選擇使用 Express 的原因也非常簡單。

1. Express 足夠簡單、輕便、易於學習。
2. 到現在都還在持續更新，是個成熟的後端框架。
3. 最重要的是，也是我唯一會的後端框架。

本篇會先介紹如何使用 TypeScript 與 Express 建置基礎的後端專案，並讓它運作起來。

## 建置後端專案

### 初始化專案

首先我們先輸入指令來初始化專案

```bash
npm init -y
```

### 安裝相關依賴

接著輸入指令來安裝依賴

```bash
npm i express@5
npm i -D typescript ts-node nodemon @types/express @types/node
```

其中 `npm i express@5` 的意思是安裝 express 第 5 版本的意思，可以使用 `npm i <package>@<version>` 結構來安裝指定套件的版本。

而開發用依賴這邊也稍微介紹一下：

- [typescript](https://www.npmjs.com/package/typescript)：既然是 TypeScript 專案，就是要安裝 TypeScript
- [ts-node](https://www.npmjs.com/package/ts-node)：這個套件是可以直接在 Node.js 上執行 TypeScript
- [nodemon](https://www.npmjs.com/package/nodemon)：這個套件可以在編輯檔案時，自動重啟應用程式
- `@types/express`：可以擴展 Express 的型別定義
- `@types/node`：可以擴展 Node.js 的型別定義

### TypeScript 設定

接著我們輸入指令來生成 `tsconfig` 設定檔。

```bash
tsc --init
```

並記得把設定調整成適合自己的專案架構，可以參考下方設定

```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}

```

## 撰寫基礎後端

當我們已經安裝好相關的依賴後，接下來就要撰寫我們的基礎後端程式碼。首先，在專案的根目錄下新建一個 src 資料夾，並在其中創建一個名為 main.ts 的檔案。這個檔案將包含我們使用 Express 建立後端應用程式的基本邏輯。

### 撰寫 Express 後端應用程式

接下來，我們會使用 Express 建立一個簡單的後端應用程式，並提供根路由 (`/`) 的 GET 請求來回應 `Hello World`，以確保後端應用程式順利運行。我們會使用類別來封裝後端應用程式的初始化邏輯。

```ts
import express from 'express';

const port = process.env.PORT || 9453;

class Server {
    private app = express();

    start() {
        this.app.get('/', (req, res) => {
            res.send('Hello World');
        });

        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

const server = new Server();

server.start();
```

程式碼說明
- 引入 express：我們引入 express 框架，來建立後端應用程式。
- 定義監聽的 Port：使用環境變數中的 PORT，如果沒有指定，則預設為 9453。
- 封裝後端應用程式邏輯：我們使用一個 Server 類別來封裝後端應用程式的邏輯，使架構更加清晰。
- 設置根路由：在 start() 方法中，我們定義了根路由 `/` 的 GET 請求，當請求到來時，後端應用程式會回應 `Hello World`。
- 啟動後端應用程式：使用 `app.listen()` 方法讓後端應用程式開始在指定的 Port 上監聽請求，並在啟動後輸出一條確認訊息。

### 添加啟動用 scripts

為了啟動後端應用程式，我們在 `package.json` 撰寫啟動後端應用程式 `scripts` 如下：

```json
{
    // ...other
    "scripts": {
        "start": "ts-node ./src/main.ts"
    },
    // ...other
}
```

這時可以開啟 VSCode 內建的終端機輸入指令來啟用後端應用程式

```bash
npm start
```

此時應該會看到執行起來的結果如下：

![終端機執行畫面](https://ithelp.ithome.com.tw/upload/images/20240922/20140224Ro8Lnnm2Hz.png)

而開啟瀏覽器網址輸入 `http://localhost:9453/` 應該可以看到畫面顯示 `Hello World`

![瀏覽器畫面](https://ithelp.ithome.com.tw/upload/images/20240922/20140224glMmC9ByOG.png)

### 使用 nodemon 自動重啟

目前我們的後端專案已經可以啟動並回應基本的 `Hello World`，但是每次修改程式碼後，都需要手動重啟後端應用程式，這會相當麻煩。因此，我們可以利用 nodemon 這個套件來解決這個問題。

### 添加開發用 scripts

在 `package.json` 撰寫 `scripts` 如下：

```json
{
    // ...other
    "scripts": {
        "start": "ts-node ./src/main.ts",
        "dev": "nodemon ./src/main.ts"
    },
    // ...other
}
```

這時可以開啟 VSCode 內建的終端機輸入指令來啟用後端應用程式

```bash
npm run dev
```

這樣每當我們修改檔案時，後端應用程式都會自動重啟，讓開發過程更加順暢。

## 總結

這篇文章介紹了如何用 TypeScript 和 Express 建置一個簡單的後端專案，並讓它運作起來。從專案初始化、安裝相關依賴、設定 TypeScript，到撰寫簡單的 `Hello World`，我們逐步建立了一個可以執行的後端應用程式。

接下來幾篇，我們可以開始實作更多功能，包含 CRUD 操作、路由規劃、中間件的使用，以及驗證功能與自己實作存儲資料的解決方案。

> 本篇程式碼變更可以看此 [PR](https://github.com/JohnsonMao/2024ironman-typescript/pull/1)
