---
title: TypeScript 實戰：前端表單與串接 API
date: 2024/09/29 21:40:26
image: https://ithelp.ithome.com.tw/upload/images/20240929/20140224JpN4JMd4rj.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 在現代前端開發中，與後端進行資料交換是常見的需求。透過 HTTP 請求，我們可以將資料送出並取得結果。這篇文章將介紹如何使用 TypeScript 實作前端表單與串接 API，並展示如何將這些功能結合到 React 應用中。同時，文章還會介紹如何解決跨域問題（CORS），以便讓前後端能順利溝通。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240929/20140224JpN4JMd4rj.png)

## 前言

在現代前端開發中，與後端進行資料交換是常見的需求。透過 HTTP 請求，我們可以將資料送出並取得結果。這篇文章將介紹如何使用 TypeScript 實作前端表單與串接 API，並展示如何將這些功能結合到 React 應用中。同時，文章還會介紹如何解決跨域問題（CORS），以便讓前後端能順利溝通。

## 製作表單元件

首先，我們需要一個基本的表單元件來接收使用者的輸入。這裡的目標是實作一個能夠新增任務的表單元件，並將資料送出至後端。因為前一篇已經說明元件實作了，這邊可以按照自己的想法實作，或著參考 PR，這邊只呈現 `CreateTaskForm.tsx` ，避免整個文章太長。

```ts
import Form from '@/components/Form';
import useForm from '@/hooks/useForm';
import type { TaskType } from '@/services/task.service';

type CreateTaskFormProps = {
    errors?: Record<string, string>;
    onSubmit: (task: Omit<TaskType, 'id'>) => void;
    onCancel?: () => void;
};

const initialValues = {
    title: '',
    status: 'new',
    description: '',
} as const;

export default function CreateTaskForm({ errors, onCancel, onSubmit }: CreateTaskFormProps) {
    const { values, register } = useForm<Omit<TaskType, 'id'>>({
        initialValues,
        errors,
    });

    const handleSubmit = () => {
        onSubmit(values);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="task-form">
                <Form.Input label="標題" {...register('title')} />
                <Form.Select
                    label="狀態"
                    options={['new', 'active', 'completed']}
                    {...register('status')}
                />
                <Form.Input label="描述" as="textarea" rows={3} {...register('description')} />
                <div className="task-form__actions">
                    <button type="submit">新增</button>
                    <button type="button" onClick={onCancel}>
                        取消
                    </button>
                </div>
            </div>
        </Form>
    );
}
```

## 實作 HTTP 請求函式

在前端與後端交互時，我們經常需要重複進行 HTTP 請求操作。為了避免重複的程式碼，可以實作一個通用的 HTTP 請求函式，將各種請求邏輯進行封裝。

### 實作共用函式

首先，我們定義一個 createHttp 函式，用來支援 `GET`、`POST`、`PUT` 和 `DELETE` 等不同的請求方法，並且允許我們傳遞不同的請求參數。這裡我們還加入了錯誤處理邏輯，確保請求失敗時能正確拋出錯誤。

#### 定義型別

首先我們定義了四種常見的 HTTP 請求方法，並定義我們後端的基礎 URL。

```ts
type Source = Record<string, unknown>;

export enum Method {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

export const ROOT_URL = 'http://localhost:9453';
```

#### 動態生成 query 參數

接下來，我們定義了一個 `createUrl` 函數，負責根據請求方法來生成 URL query。

```ts
const createUrl = <S extends Source>(pathname: string, method: Method, source?: S) => {
    const url = `${ROOT_URL}${pathname}`;

    if (method !== Method.GET) return url;

    const urlSearchParams = new URLSearchParams();

    Object.entries(source || {}).forEach(([key, value]) => {
        if (typeof value === 'string' && value !== '') {
            urlSearchParams.append(key, value);
        } else if (typeof value === 'number' || typeof value === 'boolean') {
            urlSearchParams.append(key, value.toString());
        }
    });

    return `${url}?${urlSearchParams.toString()}`;
};
```

#### 封裝請求邏輯

最後，我們使用 `createHttp` 函式來封裝 HTTP 請求邏輯，並且根據不同的請求方法動態產生請求配置。

```ts
const createHttp =
    (method: Method) =>
    async <R, S extends Source = {}>(pathname: string, source?: S): Promise<R> => {
        const requestInit: RequestInit = { method };

        requestInit.headers = {
            'Content-Type': 'application/json',
        };

        if (method !== Method.GET) {
            requestInit.body = JSON.stringify(source);
        }

        try {
            const url = createUrl(pathname, method, source);
            const response = await fetch(url, requestInit);

            if (response.ok) return response.json();
            throw response;
        } catch (error) {
            if (error instanceof Response) {
                const errorResponse: { message?: unknown } = await error.json();
                throw errorResponse?.message || errorResponse;
            }
            throw error;
        }
    };

const http = {
    get: createHttp(Method.GET),
    post: createHttp(Method.POST),
    put: createHttp(Method.PUT),
    delete: createHttp(Method.DELETE),
};

export default http;
```

### 實作 Task API

接下來，我們利用剛才的共用 HTTP 請求函式來實作任務相關的 API 請求函式。這些函式負責與後端的 Task 資料表進行 CRUD 操作。

```ts
import type { TaskType as _TaskType } from '@models/task.model';
import http from '@/utils/createHttp';

export type TaskType = _TaskType;

const taskPath = '/task';

export const createTask = async (task: Omit<TaskType, 'id'>): Promise<string> => {
    const { id } = await http.post<{ id: string }>(taskPath, task);
    return id;
};

export const getTasks = async (): Promise<TaskType[]> => {
    return http.get<TaskType[]>(taskPath);
};

export const getTaskById = async (id: string): Promise<TaskType> => {
    return http.get<TaskType>(`${taskPath}/${id}`);
};

export const updateTask = async (task: TaskType): Promise<void> => {
    const { id, ...rest } = task;
    return http.put(`${taskPath}/${id}`, rest);
};

export const deleteTaskById = async (id: string): Promise<void> => {
    return http.delete(`${taskPath}/${id}`);
};
```

### 串接 API

現在，我們可以將表單元件和 HTTP 請求結合，實現任務的新增功能。這裡我們透過 `createTask` 將表單輸入的資料送往後端，並在成功後更新任務列表。

```ts
import { useEffect, useState } from 'react';
import CreateTaskForm from '@/features/task/CreateTaskForm';
import TaskList from '@/features/task/TaskList';
import Popup from '@/components/Popup';
import { type TaskType, getTasks, createTask } from '@/services/task.service';
import validateZodIssue from '@/utils/validateZodIssue';

function Task() {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<Record<string, string> | undefined>(undefined);
    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        getTasks().then(setTasks);
    }, []);

    const handleClose = () => {
        setError(undefined);
        setIsOpen(false);
    };

    const handleSubmit = async (task: Omit<TaskType, 'id'>) => {
        setError(undefined);
        try {
            const id = await createTask(task);
            setTasks((prev) => [...prev, { ...task, id }]);
            handleClose();
        } catch (err) {
            if (validateZodIssue(err)) {
                setError(Object.fromEntries(err.map((e) => [e.path[0], e.message])));
            }
        }
    };

    return (
        <div className="container">
            {/* ... */}
        </div>
    );
}

export default Task;
```

## 解決跨域問題

當前端與後端位於不同的域名下進行資料交換時，你會發現打 API 都沒有成功，那是因為如果後端沒有額外設定，瀏覽器會自動擋跨域請求（CORS）。解決這個問題的方法有很多，這邊舉一個能從最根本的方式解決問題的方法，我們可以在後端設置 CORS 請求頭資訊，允許來自我們前端的請求。

分別允許了我們前端的 URL、請求方法、與表頭設定。

```ts
// 後端 main.ts
// ...

class Server {
    private app = express();

    private corsMiddleware() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            next();
        })
    }

    // ...

    start() {
        this.corsMiddleware();

        // ...
    }
}
// ...
```

這樣，我們就成功解決了跨域問題，確保前後端能夠順利傳輸資料了。

![畫面](https://ithelp.ithome.com.tw/upload/images/20240929/20140224iHgtpdWLrL.png)

## 總結

在這篇文章中，我們學會了如何利用 TypeScript 和 React 實作前端表單元件，並與後端 API 進行資料交換。透過建立通用的 HTTP 請求函式，我們簡化了請求邏輯並加強了程式的可重用性。最後，我們也學習了如何解決跨域問題，確保前端與後端的順暢交互，前端的部分就先實作到這邊，原本的路由與錯誤處理思考後，在這個系列文章中，不是那麼的重要，會放到未來慢慢補齊。

> 本篇程式碼變更可以看此 [PR](https://github.com/JohnsonMao/2024ironman-typescript/pull/8)
