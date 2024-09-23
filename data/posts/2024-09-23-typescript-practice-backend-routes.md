---
title: TypeScript 實戰：後端路由 Routes
date: 2024/09/23 23:19:47
image: https://ithelp.ithome.com.tw/upload/images/20240923/20140224V7yim5t1rD.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 在前一篇文章中，我們介紹了如何使用 TypeScript 與 Express 搭建一個基礎的後端應用，並實現了最簡單的 `Hello World` 功能。本篇將進一步介紹如何設計 Express 路由，並透過 MVC 架構來實現簡單的 CRUD 功能。路由是 RESTful API 的核心之一，它負責將 HTTP 請求轉發到對應的控制器。接下來，我們將建立一個簡單的任務管理 (Task) 系統，模擬基本的任務資料操作。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240923/20140224V7yim5t1rD.png)

## 前言

在前一篇文章中，我們介紹了如何使用 TypeScript 與 Express 搭建一個基礎的後端應用，並實現了最簡單的 `Hello World` 功能。本篇將進一步介紹如何設計 Express 路由，並透過 MVC 架構來實現簡單的 CRUD 功能。路由是 RESTful API 的核心之一，它負責將 HTTP 請求轉發到對應的控制器。接下來，我們將建立一個簡單的任務管理 (Task) 系統，模擬基本的任務資料操作。

## 建立路由

首先，我們先建立一個基礎路由。路由會處理各種請求，如 GET、POST 等等，並將請求轉發給對應的控制器。

在 `src/routes/` 目錄下建立 `task.route.ts` 檔案：

```ts
import { Router } from 'express';

const taskRouter = Router();

taskRouter.get('/', (req, res) => {
    res.send('Get All Task!');
});

// ...

export default taskRouter;
```

## 使用 REST Client 測試 API

為了測試 API，我們可以使用 REST Client、Thunder Client 或 Postman 等測試 API 的工具，本系列的範例都會使用 REST Client 來測。

[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) 是一個 VSCode 插件，可以用來發送 HTTP 請求，並顯示 Response 回傳結果的工具。

我們先建立一個 `thunder-client.http` 的檔案來模擬 HTTP 請求並測試 API：

```
@url = http://localhost:9453

GET {{url}}/task
```

案下 `Send Request` 就可以方便地在開發過程中檢查 API 是否正確回傳資料。

![驗證API](https://ithelp.ithome.com.tw/upload/images/20240923/201402247eQuHKeoPT.png)

## 模擬資料 Models

接下來，我們會先建立一個臨時開發用的 Task Model，並定義 Task 資料結構，下一篇會再透過檔案的方式來記錄。在 `src/models/` 目錄下新增 `task.model.ts` 檔案：

```ts
async function getTasks() {
    return [
        {
            id: 1,
            title: 'Task 1',
            description: 'Description 1',
            completed: false,
        },
    ];
}

export type Task = Awaited<ReturnType<typeof getTasks>>[number];

export default getTasks;
```

這個 getTasks 函式會模擬一個異步操作，回傳一個任務列表，並定義了 Task 型別來描述任務物件的結構。這個型別會被用於後續的 API 回傳值。

## 建立 Controllers

控制器（Controllers）負責處理業務邏輯，並將結果回傳給路由。在 `src/controllers/` 目錄下新增 `task.controller.ts` 檔案，並實作取得所有任務的功能：

```ts
import { NextFunction, Request, Response } from 'express';
import getTasks, { Task } from '../models/task.model';

export const getAllTask = async (
    req: Request,
    res: Response<Task[]>,
    next: NextFunction
) => {
    try {
        const tasks = await getTasks();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

// ...
```

### 更新取得全部任務路由

`getAllTask` 函式會從 Model 取得任務列表，並將結果以 JSON 格式回傳給用戶端。此處的 `Response<Task[]>` 型別定義了回傳的資料型態，確保我們的 API 回應符合預期。

這樣就可以將原本 Route 的函式替換成我們 Controller 的函式

```ts
import { Router } from 'express';
import * as taskController from '../controllers/task.controller';

const taskRouter = Router();

taskRouter.get('/', taskController.getAllTask);

// ...

export default taskRouter;
```

### 驗證取得全部任務

並驗證確定資料符合預期

![取得全部任務驗證](https://ithelp.ithome.com.tw/upload/images/20240923/20140224UMZWpJwyUD.png)

### 實作取得單一任務控制器

接著，我們實作取得單一任務的控制器：

```ts
// task.controller.ts

export const getTaskById = async (
    req: Request<{ id: string }>,
    res: Response<Task>,
    next: NextFunction
) => {
    try {
        const tasks = await getTasks();
        const task = tasks.find((task) => task.id === req.params.id);
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};
```

在這段程式中，我們使用 `Request<{ id: string }>` 來定義請求參數的型別，這樣可以定義預期 `id` 是字串，不會有其他參數，並使用 find 函式來尋找符合的任務。

### 更新取得單一任務路由

在 `task.route.ts` 中，新增對應的路由以支援透過 ID 取得任務的 API：

```ts
// task.route.ts

taskRouter.get('/:id', taskController.getTaskById);
```

這樣，當用戶端發送 GET `/tasks/:id` 的請求時，伺服器會回傳指定 ID 的任務。

### 驗證取得單一任務

![取得單一任務驗證](https://ithelp.ithome.com.tw/upload/images/20240923/20140224SzR8v5QjMr.png)

## 總結

在這篇文章中，我們學習了如何在 Express 中使用 TypeScript 建立路由，並設計 API 來取得任務資料。我們介紹了如何如何撰寫控制器來處理請求邏輯，並通過路由將請求導向到相應的控制器。此外，使用 REST Client 測試 API 讓開發過程更加順暢。

在後續文章中，我們將深入實作更多 CRUD 功能、介紹我們儲存資料的解決方案、驗證資料，並討論如何使用 TypeScript 強化後端應用的穩定性與可維護性。

> 本篇程式碼變更可以看此 [PR](https://github.com/JohnsonMao/2024ironman-typescript/pull/2)