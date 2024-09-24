---
title: TypeScript 實戰：後端資料持久化
date: 2024/09/24 22:45:07
image: https://ithelp.ithome.com.tw/upload/images/20240924/20140224s4nBksOoQS.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 在這篇文章中，我們將學習如何在 TypeScript 後端應用中實現資料持久化。因為本系列的主要目的是學習 TypeScript，我們會採用最簡單的方式來處理資料持久化。我們將使用原生 Node.js API 來讀寫 JSON 檔案，達到資料持久化的效果，這對於我們學習專案來說是一個簡單又實用的方式。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240924/20140224s4nBksOoQS.png)

## 前言

在這篇文章中，我們將學習如何在 TypeScript 後端應用中實現資料持久化。因為本系列的主要目的是學習 TypeScript，我們會採用最簡單的方式來處理資料持久化。我們將使用原生 Node.js API 來讀寫 JSON 檔案，達到資料持久化的效果，這對於我們學習專案來說是一個簡單又實用的方式。

## 資料持久化

我們將使用 Node.js 的 `fs` 模組來實現資料讀寫，並將這些操作封裝在一個資料庫類別中，確保資料的讀取和寫入過程整潔且易於管理。

### 建立資料庫類別

首先，我們需要在 src/database 目錄下新增 index.ts 檔案。我們會使用單例模式來確保資料庫類別在整個應用中只被實例化一次。

```ts
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export interface Data { id: string };
export type DB = Record<string, Data[] | undefined>;


export default class Database {
    private static instance: Database;
    private rootDir = process.cwd();
    private folderPath = path.resolve(this.rootDir, 'data');
    private dbPath = path.resolve(this.folderPath, 'db.json');
    private constructor() {}

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
    // ...
}
```

> 單例模式介紹：單例模式是一種設計模式，確保一個類別在應用中只能被實例化一次，並且所有的其他模組都共用這個實例。這有助於管理全局的資料或狀態。

### 實作資料讀寫功能

接下來，我們來實作讀取和寫入 JSON 檔案的功能。這些方法將幫助我們從 JSON 檔案中讀取資料，並在操作後將資料寫入檔案中。

```ts
export default class Database {
    // ...
    private async writeDB(db: DB) {
        await fs.stat(this.folderPath).catch(() => fs.mkdir(this.folderPath));
        await fs.writeFile(this.dbPath, JSON.stringify(db, null, 2));
    }
    
    private async readDB(): Promise<DB> {
        try {
            const data = await fs.readFile(this.dbPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            const initialDB: DB = {};
            await this.writeDB(initialDB);
            return initialDB;
        }
    }
    // ...
}
```

### CRUD 功能

接下來，我們會實作典型的 CRUD 功能，分別處理資料的新增、讀取、更新與刪除。

#### 新增（create）

我們將使用 `crypto.randomUUID()` 來為每一筆資料生成唯一的 ID，並將新的資料寫入到對應的資料集合中，回傳此次新增的 ID。

```ts
export default class Database {
    // ...
    public async create<T extends Data>(
        module: string,
        data: T
    ): Promise<string> {
        const db = await this.readDB();
        const _id = crypto.randomUUID();
        if (!Array.isArray(db[module])) db[module] = [];
        db[module].push({ _id, ...data });
        await this.writeDB(db);
        return _id;
    }
}
```

#### 讀取（read）

`read` 方法將讀取指定集合中的所有資料，並將其返回。

```ts
export default class Database {
    // ...
    public async read<T extends Data>(module: string): Promise<T[]> {
        try {
            const db = await this.readDB();
            if (!Array.isArray(db[module])) return [];
            return db[module] as T[];
        } catch (error) {
            return [];
        }
    }
}
```

#### 更新（update）

`update` 方法會根據資料的 ID 更新指定的資料，如果找不到該資料，則會回傳錯誤。

```ts
export default class Database {
    // ...
    public async update<T extends Data>(module: string, id: string, data: T) {
        const db = await this.readDB();
        const index = (db[module] ?? []).findIndex((row) => row.id === id);
        if (!db[module] || index === -1) throw new Error('Data not found');
        db[module][index] = { ...db[module][index], ...data, id };
        await this.writeDB(db);
    }
}
```

#### 刪除（delete）

`delete` 方法會根據資料 ID 刪除指定的資料，並在集合為空時，刪除整個集合。

```ts
export default class Database {
    // ...
    public async delete(module: string, id: string) {
        const db = await this.readDB();
        const index = (db[module] ?? []).findIndex((row) => row.id === id);
        if (!db[module] || index === -1) throw new Error('Data not found');
        db[module].splice(index, 1);
        if (db[module].length === 0) delete db[module];
        await this.writeDB(db);
    }
}
```

## 重構 Model

我們將之前臨時設計的資料存取方案進行重構，將資料存取邏輯抽象到一個基礎的 Model 類別中，並使用 TypeScript 強化資料模型。

### 抽象 Model 類別

在 `src/models/abstract` 目錄下，新增一個基礎的 `base.model.ts` 檔案，並定義一個抽象的資料操作類別。

```ts
import Database, { Data } from '../../database';

export interface IData extends Data {}

export default abstract class AbstractBaseModel<T extends IData> {
    abstract collection: string;
    private db: Database;
    constructor() {
        this.db = Database.getInstance();
    }

    async getAll() {
        return this.db.read<T>(this.collection);
    }
    
    async getById(id: string) {
        const tasks = await this.db.read<T>(this.collection);
        return tasks.find((task) => task.id === id) || null;
    }

    async create(data: T) {
        return this.db.create<T>(this.collection, data);
    }

    async update(id: string, data: T) {
        return this.db.update<T>(this.collection, id, data);
    }

    async delete(id: string) {
        return this.db.delete(this.collection, id);
    }
}
```

### 實作 Task Model

接下來，我們會使用這個抽象類別來實作 `TaskModel`。

```ts
import AbstractBaseModel, { IData } from './abstract/base.model';

export interface ITask extends IData {
    title: string;
    description: string;
    completed: boolean;
}

class TaskModel extends AbstractBaseModel<ITask> {
    collection = 'task';
}

export default TaskModel;
```

## 調整 Controller

我們將原本控制器中處理資料的邏輯改為使用實例化的 TaskModel，以便更方便地管理資料操作。

```ts
import { NextFunction, Request, Response } from 'express';
import TaskModel, { ITask } from '../models/task.model';

const taskModel = new TaskModel();

export const getAllTask = async (
    req: Request,
    res: Response<ITask[]>,
    next: NextFunction
) => {
    try {
        const tasks = await taskModel.getAll();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (
    req: Request<{ id: string }>,
    res: Response<ITask | null>,
    next: NextFunction
) => {
    try {
        const task = await taskModel.getById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

// ...
```

## 調整 nodemon 設定

為了避免在 JSON 檔案變動時重啟伺服器，我們可以調整 nodemon 的監聽範圍。

```json
// package.json

"scripts": {
    "start": "ts-node ./src/main.ts",
    "dev": "nodemon ./src/main.ts --watch 'src/**/*.ts'"
},
```

## 總結

在這篇文章中，我們完成了一個簡單的資料持久化解決方案，並使用 TypeScript 強化了後端的資料存取邏輯。我們透過 Node.js 的 `fs` 模組來實作資料讀寫，並採用了單例模式來管理資料庫的操作。隨後，我們將資料存取的 CRUD 功能抽象到 Model 中，並建立了 TaskModel 來處理任務相關的資料。

接下來，我們將會繼續實作剩餘的功能，包括資料的新增、更新與刪除，並探討如何使用 Express 中的中間件來進行資料驗證。

> 本篇程式碼變更可以看此 [PR](https://github.com/JohnsonMao/2024ironman-typescript/pull/3)