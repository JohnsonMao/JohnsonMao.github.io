---
title: TypeScript 實戰：製作 npm Package
date: 2024/09/30 23:47:46
image: https://ithelp.ithome.com.tw/upload/images/20240930/20140224i5FsBAAWrP.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 在開發專案時，經常會遇到跨專案共用邏輯或工具的情況，例如常用的 logger 或驗證工具。如果每次都從一個專案複製貼上到另一個專案，難免會出現版本不同步或維護困難的問題。為了解決這類問題，我們可以將這些共用邏輯獨立成為 npm 套件，以便在多個專案中重複使用。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240930/20140224i5FsBAAWrP.png)

## 前言

在開發專案時，經常會遇到跨專案共用邏輯或工具的情況，例如常用的 logger 或驗證工具。如果每次都從一個專案複製貼上到另一個專案，難免會出現版本不同步或維護困難的問題。為了解決這類問題，我們可以將這些共用邏輯獨立成為 npm 套件，以便在多個專案中重複使用。

以我們之前實作的前後端範例為例，後端已經實作了驗證 Task 資料的 schema。如果我們希望在前端發送請求前，也對使用者的輸入進行驗證，有許多解決方案，其中一個做法是將這些驗證邏輯封裝成 npm 套件，並且支援 CommonJS (CJS) 和 ECMAScript 模組 (ESM) 兩種格式，以確保前後端都能使用相同的工具。

## 初始化專案

首先初始專案起手式

```bash
npm init -y
```

接著，安裝我們這次開發目標所需要的依賴套件。

```bash
npm i -D @types/node typescript rimraf
npm i --save-peer zod
```

在這裡，我們安裝了 `rimraf` 作為開發依賴，用來在不同平台上統一刪除檔案或資料夾。此外，我們還將 `zod` 加入 peerDependencies，這表示我們預期使用這個套件的開發者自己會安裝 `zod`，並直接使用他們項目中的 `zod` 版本。

這樣的設置非常常見，例如當我們開發與 `React` 相關的套件時，我們也會將 `React` 安裝到 peerDependencies，讓使用者能自行管理 `React` 版本，而不會與我們的套件發生衝突。

## TypeScript 配置

因為執行 TypeScript 編譯時，一次只能產生一個輸出。要產生 CommonJS 和 ESM 程式碼，就會需要設定針對這兩個的設定檔。

### 共用配置

首先，我們先配置共用的基本配置：

```json
{
    "compilerOptions": {
        "lib": ["ESNext"],
        "declaration": true,
        "declarationDir": "./dist/types",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "moduleResolution": "node",
        "baseUrl": ".",
        "rootDir": "./src"
    },
    "include": ["src"],
    "exclude": ["dist", "node_modules"]
}
```

該檔案指定了程式碼的位置、要排除的資料夾以及類型定義的輸出目錄等。

### CommonJS 配置

針對 CommonJS，我們將輸出位置配置如下：

```json
{
    "extends": "./tsconfig.base.json",
    "compilerOptions": {
        "module": "CommonJS",
        "outDir": "./dist/cjs",
        "target": "ES2020"
    }
}
```

### ESM 配置

針對 ESM，我們將輸出位置配置如下：

```json
{
    "extends": "./tsconfig.base.json",
    "compilerOptions": {
        "module": "ES6",
        "outDir": "./dist/esm",
        "target": "ES2016"
    }
}
```

## Package 配置

設定完 TypeScript 後，我們來配置 `package.json`。

`name`：用來定義我們套件產生出來的名稱
`main`：我們 Node.js 主要執行的入口點
`types`：我們 Node.js 主要定義型別的檔案
`files`：選擇我們打包好的套件根資料夾

### 配置入口點

```json
{
  "name": "validator",
  "version": "1.0.0",
  "description": "",
  "main": "./dist/cjs/index.js",
  "types": "./dist/types/index.d.ts",
  "files": [
    "dist"
  ],
  // ...
}
```

### 配置模組匯出

由於我們要同時支援 CommonJS 和 ESM，所以需要設定模組的匯出方式：

```json
{
  // ...
  "exports": {
    ".": {
      "require": "./dist/cjs/index.js",
      "import": "./dist/esm/index.mjs",
      "types": "./dist/types/index.d.ts"
    }
  },
  // ...
}
```

這裡我們為 ESM 模組使用 `.mjs` 副檔名，稍後將會撰寫腳本來替換編譯後的 `.js` 改為 `.mjs`。

### 撰寫 Scripts

接著，我們撰寫打包與建置的 scripts。特別說明一下，`npm pack` 可以將專案壓縮成 npm 套件，而 `prepack` 會在執行 `pack` 之前自動執行。

```json
{
  // ...
  "scripts": {
    "build:cjs": "tsc -p tsconfig.cjs.json",
    "build:esm": "tsc -p tsconfig.esm.json && npm run rename:esm",
    "build": "npm run build:cjs && npm run build:esm",
    "clean": "rimraf dist",
    "rename:esm": "/bin/zsh ./scripts/fix-mjs.sh",
    "prepack": "npm run clean && npm run build"
  },
}
```

### 撰寫轉檔名腳本

新增一個檔案 `fix-mjs.sh` 並撰寫替換 `.js` 到 `.mjs` 的腳本

```shell
for file in ./dist/esm/*.js; do
    echo "Updating $file contents..."
    sed -i '' "s/\.js'/\.mjs'/g" "$file"
    echo "Renaming $file to ${file%.js}.mjs..."
    mv "$file" "${file%.js}.mjs"
done
```

## 撰寫功能並打包

這邊就把原本寫在後端的驗證 schema 複製過來

```ts
import { z } from 'zod';

export const inputTaskSchema = z.object({
    title: z.string().min(1, '請輸入任務標題'),
    description: z.string().optional(),
    status: z.enum(['new', 'active', 'completed']).default('new'),
    storyPoint: z.number().optional(),
});
```

完成後，執行打包指令

```bash
npm pack
```

這時會看到專案內生成出一個 `validator-1.0.0.tgz`，結構上就是 `<package.name>-<package.version>.tgz`

接著，到前後端專案中，安裝本地套件

```bash
npm i ../package/validator-1.0.0.tgz
```

這樣，前後端都可以使用同一套驗證邏輯了。

## 總結

通過這個文章，我們學習了如何：

- 設置 TypeScript 專案以支援 CJS 和 ESM。
- 配置 package.json 以支援多模組輸出。
- 使用腳本自動化構建過程。
- 打包並在其他專案中使用自製的 npm package。

這個方法允許我們創建可在前端和後端共用的模組，提高代碼重用性和一致性。

> 本篇程式碼變更可以看此 [PR](https://github.com/JohnsonMao/2024ironman-typescript/pull/9)
