---
title: TypeScript 實戰：後端裝飾器生成路由
date: 2024/09/26 22:57:25
image: https://ithelp.ithome.com.tw/upload/images/20240926/20140224XWJRhYkiia.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 在這篇文章中，我們將介紹如何使用 TypeScript 的裝飾器來生成 Express 路由，從而讓程式碼更加簡潔。過去，由於 TypeScript 的裝飾器功能尚未完善，我們通常需要使用 reflect-metadata 這樣的套件來擴展裝飾器對 metadata 的支援。然而，隨著 TypeScript 5.2 的推出，裝飾器已經原生支援 metadata，因此不需要再依賴外部套件。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240926/20140224XWJRhYkiia.png)

## 前言

在這篇文章中，我們將介紹如何使用 TypeScript 的裝飾器來生成 Express 路由，從而讓程式碼更加簡潔。過去，由於 TypeScript 的裝飾器功能尚未完善，我們通常需要使用 `reflect-metadata` 這樣的套件來擴展裝飾器對 `metadata` 的支援。然而，隨著 TypeScript 5.2 的推出，裝飾器已經原生支援 `metadata`，因此不需要再依賴外部套件。

不過，請注意，目前 JavaScript 還沒有完全支援 `Symbol.metadata`，所以在 TypeScript 中使用這些功能時仍然需要一些注意。建議在等 JavaScript 完全支援後再使用這些功能到正式的產品環境中。

若在使用裝飾器的 `metadata` 時遇到以下錯誤：
![metadata not found](https://ithelp.ithome.com.tw/upload/images/20240926/20140224d2zcE1nNSv.png)

你需要在 tsconfig 中加入如下配置，以支援最新的裝飾器功能：

```json
{
    compilerOptions: {
        "lib": ["ESNext.Decorators"],
    }
}
```

## 實作裝飾器

### 實作 Controller 的裝飾器

我們首先實作一個 Controller 裝飾器，來指定每個 Controller 的基礎路徑（basePath），並儲存在 `metadata` 中供之後的路由註冊使用。

```ts
enum MetadataKeys {
    BASE_PATH = 'basePath',
    ROUTERS = 'routers'
}

export const Controller = (basePath: string) => {
    return (_: new (...args: any[]) => {}, ctx: ClassDecoratorContext) => {
        ctx.metadata[MetadataKeys.BASE_PATH] = basePath;
    };
};
```

### 實作 Method 的裝飾器

接下來，我們將為常見的 HTTP 方法（如：`GET`、`POST`、`PUT`、`DELETE`）實作對應的裝飾器，這些裝飾器會將每個路由的資訊存入 `metadata`，以便後續自動生成 Express 路由。

我們首先定義常見的 HTTP 方法：

```ts
enum Method {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}
```

接著，我們使用 zod 套件來定義路由配置的資料結構，確保所有保存至 `metadata` 中的資料符合預期的格式。

```ts
import { z } from 'zod';

// ...

const routerConfigSchema = z.object({
    method: z.enum([Method.GET, Method.POST, Method.PUT, Method.DELETE]),
    path: z.string(),
    handlerName: z.string().or(z.symbol()),
});

const metadataSchema = z.object({
    [MetadataKeys.BASE_PATH]: z.string(),
    [MetadataKeys.ROUTERS]: z.array(routerConfigSchema),
});
```

為了在註冊路由前驗證 `metadata`，我們可以定義一個 validateMetadata 函式來解析目標類別的 `metadata`，並使用 zod 進行資料驗證。

```ts
export const validateMetadata = <T extends new (...args: any[]) => {}>(target: T) => {
    return metadataSchema.parse(target[Symbol.metadata]);
};
```

接下來，我們實作一個工廠函式的 `methodDecoratorFactory`，透過此函式生成不同 HTTP 方法對應的裝飾器。這些裝飾器會將**方法**、**路徑**和**處理函數名稱**一併儲存到 metadata 中。

```ts
const methodDecoratorFactory = (method: Method) => {
    return (path: string = '') => {
        return (_: Function, ctx: ClassMethodDecoratorContext) => {
            const metadataRouters = ctx.metadata[MetadataKeys.ROUTERS];
            const routers: z.infer<typeof routerConfigSchema>[] = Array.isArray(metadataRouters)
                ? metadataRouters
                : [];

            routers.push({
                method,
                path,
                handlerName: ctx.name,
            });

            ctx.metadata[MetadataKeys.ROUTERS] = routers;
        };
    };
};
```

最後，我們使用 `methodDecoratorFactory` 生成對應的 HTTP 方法裝飾器：

```ts
export const Get = methodDecoratorFactory(Method.GET);
export const Post = methodDecoratorFactory(Method.POST);
export const Put = methodDecoratorFactory(Method.PUT);
export const Delete = methodDecoratorFactory(Method.DELETE);
```

## 重構 Controller

接下來，我們將實際使用這些裝飾器，來重構 Controller。以往，我們使用函式式的方式來撰寫路由定義，現在可以將它重構為類別，並使用裝飾器。

```ts
import { NextFunction, Request, Response } from 'express';
import TaskModel, { TaskType } from '../models/task.model';
import { Controller, Delete, Get, Post, Put } from '../utils/decorators/controller.decorator';

@Controller('/task')
export default class TaskController {
    private taskModel = new TaskModel();

    @Get()
    async getAllTask(req: Request, res: Response<TaskType[]>, next: NextFunction) {
        // ...
    }

    @Get('/:id')
    async getTaskById(
        req: Request<{ id: string }>,
        res: Response<TaskType | null>,
        next: NextFunction
    ) {
        // ...
    }

    @Post()
    async createTask(
        req: Request<{}, {}, TaskType>,
        res: Response<{ id: string }>,
        next: NextFunction
    ) {
        // ...
    }

    @Put('/:id')
    async updateTask(
        req: Request<{ id: string }, {}, TaskType>,
        res: Response,
        next: NextFunction
    ) {
        // ...
    }

    @Delete('/:id')
    async deleteTask(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        // ...
    }
}
```

### 收攏 Controller

接著我們將所有 Controller 都引入到 `src/controllers/index.ts`。

```ts
import TaskController from './task.controller';

export const controllers = [TaskController];
```

未來我們新增新的 Controller 後，只需將它們加入 controllers 陣列，就會自動生成對應的 Router。

## 重構 Routes

我們可以刪除之前手動撰寫的 Routes，並在主程式 `main.ts` 中動態註冊 Controller 的路由。

以下是在 `main.ts` 中的註冊方式：

```ts
import express, { NextFunction, Request, Response, Router } from 'express';
import { ZodError } from 'zod';
import { controllers } from './controllers';
import { validateMetadata } from './utils/decorators/controller.decorator';

// ...
class Server {
    private app = express();

    private registerRoutes() {
        controllers.forEach(Controller => {
            const controller = new Controller();
            const { basePath, routers } = validateMetadata(Controller);
            const router = Router();

            routers.forEach(({ method, path, handlerName }) => {
                router[method](
                    path,
                    controller[handlerName as keyof typeof controller].bind(controller)
                );
            });

            this.app.use(basePath, router);
        });
    }

    private errorMiddleware() {
        // ...
    }

    start() {
        this.app.use(express.json());

        this.registerRoutes();

        this.errorMiddleware();

        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
```

這樣一來，我們就可以動態註冊所有 Controller 的路由，並在主程式中統一處理錯誤，使程式碼更加模組化。

## 添加 Polyfill

如果當初設定 tsconfig 有設定 `ESNext.Decorators` 的話，如果打包成 JavaScript 會因為沒有 `Symbol.metadata` 而導致伺服器無法啟動，這時我們要自己寫 Polyfill 來支援 `Symbol.metadata` 如下：

```ts
(Symbol as { metadata: symbol }).metadata ??= Symbol("Symbol.metadata");
```

[解法來源](https://github.com/microsoft/TypeScript/issues/53461#issuecomment-1606684134)

並在有實作 `metadata` 的裝飾器檔案引入這個 polyfill 檔案

```ts
// ./controller.decorator.ts 檔案

import './symbol.polyfill';
```

## 總結

在這篇文章中，我們使用了 TypeScript 的裝飾器來自動生成路由，大幅簡化了手動設定路由的繁瑣步驟。通過使用裝飾器，我們可以讓每個 Controller 的定義更加清晰，未來想新增 API 就只要新增對應的 Model 和 Controller，Router 會自動根據裝飾器生成，那這系列後端實戰的部分就到這裡，下一篇會介紹如何在前端 React 中使用 TypeScript，並串接我們實作的後端！

> 本篇程式碼變更可以看此 [PR](https://github.com/JohnsonMao/2024ironman-typescript/pull/5)
