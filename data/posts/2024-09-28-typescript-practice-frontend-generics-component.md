---
title: TypeScript 實戰：前端泛型元件
date: 2024/09/28 23:17:57
image: https://ithelp.ithome.com.tw/upload/images/20240928/20140224Dk9o03NNtW.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 今天我們將實作一個任務清單元件，並一步步重構它，使原本無法複用的元件，利用泛型變成更通用、更彈性的元件。這章節會著重在如何運用 TypeScript，不會過多討論 React 的原理。如果對 React 還不太熟悉，可以先參考官方[快速上手文件](https://react.dev/learn)。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240928/20140224Dk9o03NNtW.png)

## 前言

昨天我們已經了解如何實作出一個元件，今天我們將實作一個任務清單元件，並一步步重構它，使原本無法複用的元件，利用泛型變成更通用、更彈性的元件。這章節會著重在如何運用 TypeScript，不會過多討論 React 的原理。如果對 React 還不太熟悉，可以先參考官方[快速上手文件](https://react.dev/learn)。

## 模擬資料

由於我們最終要串接後端 API 並取得 Task 資料，而前端開發通常不會等後端完成才開始。因此，在 API 規格確認後，前後端同步實作，最後再進行串接。這裡我們可以利用後端已定義好的型別，先定義模擬資料，並在下一章節實作 API 串接。

### 模擬非同步取得資料

我們首先新增 `services` 資料夾，用來存放相關的資料獲取邏輯。以下是模擬 API 回應的 `getTasks` 函式：

```ts
import type { TaskType } from '@models/task.model';

export const getTasks = async (): Promise<TaskType[]> => {
    return [
        {
            id: '1',
            title: '鐵人賽 Day 27',
            description: 'TypeScript 實戰：前端表單與串接 API',
            status: 'new',
        },
        {
            id: '2',
            title: '鐵人賽 Day 26',
            description: 'TypeScript 實戰：前端泛型元件',
            status: 'active',
        },
        {
            id: '3',
            title: '鐵人賽 Day 25',
            description: 'TypeScript 實戰：前端 React Setup',
            status: 'completed',
        },
    ];
};
```

## 任務清單元件

接下來，我們將實作任務清單元件。首先，新增 `features/task` 資料夾，用來放置與任務相關的元件，並開始構建我們的 `TaskList` 元件。

`useState` Hook 支援泛型，我們可以用來定義狀態的型別。

```ts
import { useEffect, useState } from 'react';
import { TaskType } from '@models/task.model';
import { getTasks } from '@/services/task.service';

export default function TaskList() {
    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        getTasks().then(setTasks);
    }, []);

    return (
        <ul className="list">
            {tasks.map((task) => (
                <li key={task.id} className="list__item">
                    <div className="task-card">
                        <div className="task-card__header">
                            <div>{task.title}</div>
                            <div>{task.status}</div>
                        </div>
                        <div>{task.description}</div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
```

### 調整樣式

我們可以將預設樣式做一些調整。為了讓重點集中在 TypeScript 的應用上，CSS 的部分不多加說明。如果想查看具體樣式變更，可以參考文章 PR 或自行設計。

如果未來有機會的話，會在介紹與 TypeScript 整合非常好的原子化 CSS-in-JS 解決方案 [StyleX](https://stylexjs.com/)。

### 調整 App.tsx

我們將 `TaskList` 元件引入到 `App.tsx` 中，並進行簡單展示：

```ts
import TaskList from './features/task/TaskList';
import './App.css';

function App() {
    return (
        <div className="container">
            <h1>Task Board</h1>
            <TaskList />
        </div>
    );
}

export default App;
```

效果如下：

![畫面](https://ithelp.ithome.com.tw/upload/images/20240928/20140224SKxb9UeILz.png)

## 抽共用元件

現在我們已經完成了任務清單的元件，未來若需要實作其他清單功能，我們可以利用泛型來讓元件更具彈性，並進行重構。

### 實作 List 元件

在 `components` 資料夾下新增一個通用元件 `List.tsx`，它利用泛型實現可複用的清單渲染邏輯：

```ts
import { Fragment } from 'react';

type ListProps<TItem> = {
    as?: React.ElementType;
    className?: string;
    items: TItem[];
    renderKey: (item: TItem) => string | number;
    renderItem: (item: TItem) => React.ReactNode;
};

export default function List<TItem>({
    as,
    className,
    items,
    renderKey,
    renderItem,
}: ListProps<TItem>) {
    const Wrapper = as || 'div';

    return (
        <Wrapper className={className}>
            {items.map((item) => (
                <Fragment key={renderKey(item)}>{renderItem(item)}</Fragment>
            ))}
        </Wrapper>
    );
}
```

### 使用共用元件

接下來我們將 TaskList 重構，將之前的清單邏輯改為使用泛型的 List 元件：

```ts
// ...
import List from '@/components/List';

function TaskItem({ title, description, status }: TaskType) {
    return (
        <li className="list__item">
            <div className="task-card">
                <div className="task-card__header">
                    <div>{title}</div>
                    <div>{status}</div>
                </div>
                <div>{description}</div>
            </div>
        </li>
    );
}

export default function TaskList() {
    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        getTasks().then(setTasks);
    }, []);

    return (
        <List
            as="ul"
            className="list"
            items={tasks}
            renderKey={(task) => task.id}
            renderItem={TaskItem}
        />
    );
}
```

這邊我們透過泛型的類型推斷，自動根據傳遞給參數 `items` 來推斷 `renderKey` 與 `renderItem` 的參數，但如果想限制的更嚴謹的話，可以在 `List` 後面傳遞泛型，這樣就會嚴格限制 `items` 傳遞的型別。

```ts
<List<TaskType>
    as="ul"
    className="list"
    items={tasks}
    renderKey={(task) => task.id}
    renderItem={TaskItem}
/>
```

這樣一來，我們就有了一個更加通用的清單元件，無論是未來實作不同類型的清單還是其他需要泛型支持的元件，我們都可以很輕鬆地擴展。

## 總結

這篇文章展示了如何使用 TypeScript 的泛型來實作一個可重用的清單元件，並將其應用於任務清單的展示。我們從單一用途的元件開始，最終將其重構成更具彈性的泛型元件。接下來的章節，我們會介紹表單元件、React 提供的其他型別與 API 串接。

> 本篇程式碼變更可以看此 [PR](https://github.com/JohnsonMao/2024ironman-typescript/pull/7)
