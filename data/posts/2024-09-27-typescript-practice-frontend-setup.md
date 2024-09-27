---
title: TypeScript 實戰：前端 React Setup
date: 2024/09/27 23:28:33
image: https://ithelp.ithome.com.tw/upload/images/20240927/201402241d8G0mpfAq.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 介紹前端如何搭配 TypeScript 來開發，這個章節我們會使用 React 來實作簡單的任務管理網站，並串接我們寫好的後端，而會選擇使用 React 的原因也是非常簡單。1. React 函式庫撰寫方式與原生 JavaScript 接近。2. 目前職缺數量是三大框架最多的。3. 最重要的是，是我最熟的框架。本篇會先介紹如何初始化一個 React + TypeScript 專案。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240927/201402241d8G0mpfAq.png)

## 前言

後端完成後，就要來介紹前端如何搭配 TypeScript 來開發，這個章節我們會使用 React 來實作簡單的任務管理網站，並串接我們寫好的後端，而會選擇使用 React 的原因也是非常簡單。

1. React 函式庫撰寫方式與原生 JavaScript 接近。
2. 目前職缺數量是三大框架最多的。
3. 最重要的是，是我最熟的框架。

本篇會先介紹如何初始化一個 React + TypeScript 專案。

## 建置前端專案

目前 React 專案有很多建置方式，官網推薦使用成熟的框架來建立 React，例如：Next.js、Remix、Gatsby，但我們只是要實作小專案，所以我們採用 `Vite` 來建立前端專案模板，這樣做的好處是，我們前期不用花太多心力在設定模組打包工具。

### 初始化專案

首先我們先輸入指令來初始化專案，其中 `frontend` 可以改成你要的專案名稱

```bash
npm create vite@latest frontend -- --template react-ts
```

### 安裝相關依賴

接著輸入指令來安裝依賴套件

```bash
npm install
npm i react-router-dom zod
npm i -D @types/node
```

而我們有另外安裝 `react-router-dom` ，是讓 React 可以更方便的實作路由的套件。

### TypeScript 設定

可以看到這個模板生成了三個 tsconfig 的設定檔（之前只有生成兩個檔案，未來不確定會不會有變動）

![tsconfig](https://ithelp.ithome.com.tw/upload/images/20240927/20140224G8HFSACenC.png)

我們在 `tsconfig.app.json` 內多增加一些設定，讓我們之後串接 API 時，可以更方便的拿到後端定義好的型別。

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["./src/*"],
            "@models/*": ["../backend/src/models/*"],
        },   
    }
}
```

### Vite 設定

因為我們是使用 `Vite` 來做我們的模組打包工具，所以除了 tsconfig 要設定別名路徑外，`vite.config.ts` 也要設定別名路徑，才能在專案中使用。

```ts
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@models': path.resolve(__dirname, '../backend/src/models'),
    },
  },
})
```

（後來想了一下，後端那個專案也可以設定別名路徑，可以更優雅的引入檔案）

## 啟動前端

當我們已經安裝好相關的依賴後，接下來只要輸入指令就可以直接啟動專案。

```ts
npm run dev
```

![react and vite template](https://ithelp.ithome.com.tw/upload/images/20240927/201402244PjUqZVwhI.png)

是不是很快就啟好這個範例專案了！同時還可以按中間的按鈕一直增加數字。

## 簡單的 React 元件介紹

在 React 中，元件是構建 UI 的核心單位。每個元件可以是一個獨立的模組，負責處理頁面中的一個小部分。接下來我們來實作一個簡單的 React 元件範例。

首先我們先新增一個 `components` 資料夾，用來放所有元件，並新增一個 `Counter.tsx`，可以注意到副檔名是 `tsx`，它跟 `js` 與 `jsx` 的關係一樣，原本是為了讓編譯器可以知道這個檔案 TypeScript + HTML 標籤的程式碼，同時也可以讓人更快速的知道這個檔案是做什麼的。

### 定義 Props

關於 React Component Props 的定義，大多數都會習慣定義成 `XXXProps` 算是不成文但大家都同意的規定，但 `type` 與 `interface` 的選擇就有各自的想法，只要專案統一就可以了。

```ts
// Counter.tsx
type CounterProps = {
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
};
```

### 實作 Component

目前 React 的版本，新的元件通常都會是用 `function` 的方式實作，而 `function` 的撰寫方式又很多種，我個人是習慣使用 `function` 的方式撰寫，因為如果元件要使用泛型時，這種撰寫方式會更加統一。

```ts
// Counter.tsx
// ...

export default function Counter({ count, onIncrement, onDecrement }: CounterProps) {
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={onIncrement}>Increment</button>
            <button onClick={onDecrement}>Decrement</button>
        </div>
    );
}
```

這邊也展示其他元件的撰寫方式：

1. 箭頭函式撰寫：因為 `tsx` 同時有 TypeScript + HTML，所以編譯器在遇到泛型時，會不知道是泛型還是 HTML，所以需要添加一個 `,` 來告訴編譯器這個不是 HTML。
    ```ts
    const Component = <T,>(props: ComponentProps<T>) => // ...

    export default Component
    ```
2. 使用 React 提供的 FC：原本是可以優雅的定義 `Component Type`，但卻犧牲了泛型的彈性，所以被很多開發者吐槽不好使用。
    ```ts
    import { FC } from 'react';

    const Component: FC<ComponentProps> = (props) => // ...

    export default Component
    ```
3. 普通函式撰寫：因為普通函式的泛型編譯器知道，所以撰寫起來就更優雅統一。
    ```ts
    export default function Component<T>(props: ComponentProps<T>) => // ...
    ```
    
### 在 App.tsx 使用

為了更方便的觀察我們實作的 Component，所以把一些多餘的程式碼移除。

```ts
import { useState } from 'react';
import Counter from './components/Counter';
import './App.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="card">
            <Counter
                count={count}
                onIncrement={() => setCount((count) => count + 1)}
                onDecrement={() => setCount((count) => count - 1)}
            />
        </div>
    );
}

export default App;
```

並可以看到畫面也跟著變成我們所寫的元件，並且能操作數字加減了！

![counter component](https://ithelp.ithome.com.tw/upload/images/20240927/20140224JP2ld6kQWT.png)

## 總結

這篇文章介紹了如何用 Vite 建立 React + TypeScript 專案，調整別名路徑設定，並讓它運作起來。並實作了一個最簡單的 Component。

接下來幾篇，我們可以開始實作前端，包含如何利用泛型來製作清單元件、表單元件串接 API、路由規劃與錯誤處理。

> 本篇程式碼變更可以看此 [PR](https://github.com/JohnsonMao/2024ironman-typescript/pull/6)
