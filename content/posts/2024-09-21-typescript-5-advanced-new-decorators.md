---
title: TypeScript 5 進階：新版裝飾器詳解
date: 2024/09/21 22:42:59
image: https://ithelp.ithome.com.tw/upload/images/20240921/20140224vCLgWeVmup.png
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 在上一篇文章中，我們介紹了新版裝飾器與舊版裝飾器的差異。這一篇將更深入探討新版裝飾器的實際應用。要運行本文範例，請確保 TypeScript 版本為 5 以上，並且 `experimentalDecorators` 與 `emitDecoratorMetadata` 均未啟用或設為 `false`。TypeScript 5 除了不再支援舊版的參數裝飾器（Parameter Decorator）外，還多增加了更多細節的裝飾器。
---

![cover](https://ithelp.ithome.com.tw/upload/images/20240921/20140224vCLgWeVmup.png)

## 前言

在上一篇文章中，我們介紹了新版裝飾器與舊版裝飾器的差異。這一篇將更深入探討新版裝飾器的實際應用。要運行本文範例，請確保 TypeScript 版本為 5 以上，並且 `experimentalDecorators` 與 `emitDecoratorMetadata` 均未啟用或設為 `false`。

TypeScript 5 除了不再支援舊版的參數裝飾器（Parameter Decorator）外，還多增加了更多細節的裝飾器，目前裝飾器的種類有：

- `Class Decorator`：類別裝飾器
- `Method Decorator`：方法裝飾器
- `Field Decorator`：屬性裝飾器
- `Accessor Decorator`：存取器裝飾器
- `Getter Decorator`：取值裝飾器
- `Setter Decorator`：設值裝飾器

## 類別裝飾器（Class Decorator）

TypeScript 5 類別裝飾器用法跟舊版來比較相差不多，只是多了一個 `context` 參數，並有提供 `ClassDecoratorContext<T>` 型別來定義 `context`。

下面的範例是使用裝飾器注入 `createTime`，並利用 `interface` 的自動型別合併功能擴充 `createTime` 型別。

```ts
function withCreateTime<T extends new (...args: any[]) => {}>(
    baseClass: T,
    context: ClassDecoratorContext<T>
) {
    return class extends baseClass {
        createTime: Date = new Date();

        constructor(...args: any[]) {
            super(...args);
        }
    };
}

@withCreateTime
class Person {
    name: string = '阿毛';
}

interface Person {
    createTime: Date;
}

const person = new Person();

console.log(person.createTime); // Sat Sep 21 2024 19:24:58 GMT+0800 (台北標準時間)
```

## 方法裝飾器（Method Decorator）

TypeScript 5 方法裝飾器用法跟舊版差很多，舊版的 `target` 會提供被裝飾類別的建構子，新版的 `target` 則是傳遞被裝飾的函式，且 `propertyKey` 與 `descriptor` 也移除了，改成使用型別 `ClassMethodDecoratorContext<T, V>` 定義的 `context`。

下面的範例我們使用的裝飾器工廠實作，並裝飾 `addTodo` 限制新增代辦事項的條件，就能在不改動類別的情況下，注入新的邏輯進去。

```ts
function limitTodo(limit: number) {
    return function <
        T extends { todos: Todo[] },
        V extends (this: T, ...args: any) => any
    >(target: Function, context: ClassMethodDecoratorContext<T, V>) {
        return function (this: T, ...args: any[]) {
            const unfinishedTodos = this.todos.filter((todo) => !todo.finished);
            if (unfinishedTodos.length < limit) {
                return target.apply(this, args);
            }
            console.log("請先完成其他待辦事項");
        };
    };
}

interface Todo {
    name: string;
    finished: boolean;
}

class TodoList {
    todos: Todo[] = [];

    @limitTodo(2)
    addTodo(name: string) {
        this.todos.push({ name, finished: false });
    }
}
const todoList = new TodoList();
todoList.addTodo("吃飯");
todoList.addTodo("睡覺");
todoList.addTodo("打東東"); // 請先完成其他待辦事項
```

## 屬性裝飾器（Field Decorator）

TypeScript 5 屬性裝飾器就跟舊版的寫法差很多，舊版的 `target` 會提供被裝飾類別的建構子，新版的 `target` 則是傳遞 `undefined`，且新版可以回傳一個函式，這個函式會收到類別裝飾的屬性。

需注意此時的 `this` 會因為類別是在初始化的狀態下，所以當下有些值會是 `undefined`，不建議在裡面使用 `this`。

```ts
function initExampleTodos<T, V extends Todo[]>(
    target: undefined,
    context: ClassFieldDecoratorContext<T, V>
) {
    return function (todos: V) {
        todos.push({ name: "完成寫鐵人賽文章", finished: false });
        return todos;
    };
}

interface Todo {
    name: string;
    finished: boolean;
}

class TodoList {
    @initExampleTodos
    todos: Todo[] = [];
}

const todoList = new TodoList();
console.log(todoList.todos); // [{ name: "完成寫鐵人賽文章", finished: false }]
```

## 存取器裝飾器（Accessor Decorator）

TypeScript 5 存取器裝飾器是新出的裝飾器，同時提供了三個型別讓我們可以定義，分別是 `ClassAccessorDecoratorTarget`、`ClassAccessorDecoratorContext`、`ClassAccessorDecoratorResult`，`accessor` 關鍵字是用來幫屬性自動設定存取器的，也就是會自動編譯成 `getter` 與 `setter`，而存取器裝飾器讓我們能用更細緻的方式去對屬性做裝飾。

下面的範例就是過去幾篇我們用屬性裝飾器來實作的範例，使用存取器裝飾器可以讓我們更快速優雅地做到這件事。

```ts
class Person {
    @watchValue
    accessor name: string = "阿毛";
}

function watchValue<T, V>(
    target: ClassAccessorDecoratorTarget<T, V>,
    context: ClassAccessorDecoratorContext<T, V>
): ClassAccessorDecoratorResult<T, V> {
    return {
        get(this: T) {
            return target.get.call(this);
        },
        set(this: T, value: V) {
            console.log(`設置 ${context.name.toString()} 屬性值從 ${target.get.call(this)} 改為 ${value}`)
            target.set.call(this, value);
        }
    }
}

const person = new Person();
person.name = "Mao"; // 設置 name 屬性值從 阿毛 改為 Mao
```

## Getter Decorator 與 Setter Decorator

TypeScript 5 還有針對 Getter 與 Setter 做出新的裝飾器，用法也非常簡單，所以將這兩個裝飾器一起說明，`target` 都是各自的 `getter` 或 `setter` 函式，需要注意的是，因為都是對物件操作，所以要透過 `call`、`apply` 或 `bind` 的方式來綁定 `this` 來執行。

```ts
class Person {
    private _name: string = "阿毛";

    @greet
    get name() {
        return this._name;
    }

    @logSetter
    set name(value) {
        this._name = value;
    }
}

function greet<T, V>(
    target: () => V,
    context: ClassGetterDecoratorContext<T, V>
) {
    return function (this: T) {
        return `我的名字是 ${target.call(this)}`;
    };
}

function logSetter<T, V>(
    target: (value: V) => void,
    context: ClassSetterDecoratorContext<T, V>
) {
    return function (this: T, value: V) {
        console.log(`名字改成 ${value}`);
        target.call(this, value);
    };
}

const person = new Person();
console.log(person.name); // 我的名字是 阿毛
person.name = "Mao";      // 名字改成 Mao
console.log(person.name); // 我的名字是 Mao

```

## 總結

在這篇文章中，我們詳細介紹了新版 TypeScript 5 裝飾器的實際應用，包括類別、方法、屬性、存取器及其細化的 getter 和 setter 裝飾器。

## 參考資料

- [TypeScript 5 Masterclass: TypeScript Decorators - Build a Full-Stack App !](https://www.youtube.com/watch?v=h_f8e246YgQ&t=3396s)
- [All you need to know about Typescript Decorators (as introduced in 5.0)](https://medium.com/@templum.dev/all-you-need-to-know-about-typescript-decorators-as-introduced-in-5-0-b03866a8b213)
- [A Quick Guide to TypeScript 5.0 Decorators](https://medium.com/@hizacharylee/a-quick-guide-to-typescript-5-0-decorators-d06cabe09e8c)
- [【Day 23】TypeScript - 類別存取器（Accessors）](https://ithelp.ithome.com.tw/articles/10226091)
