---
title: TypeScript 基礎：物件導向與類別基礎
date: 2024/09/06 23:35:42
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 類別是一個基礎的物件導向設計（Object-Oriented Programming, OOP），是一種以物件為中心的編程範式，強調模擬現實世界的實體與行為。類別將資料（屬性）和行為（方法）整合在一起，方便定義和操作不同的物件實例。
---

## 什麼是類別？

類別是一個基礎的物件導向設計（Object-Oriented Programming, OOP），是一種以物件為中心的編程範式，強調模擬現實世界的實體與行為。類別將資料（屬性）和行為（方法）整合在一起，方便定義和操作不同的物件實例。

## 類別（Class）

現在 ES6 標準化後，開發者可以使用更直觀的 class 語法來實現物件導向設計，簡化類別定義和繼承，提升程式結構性。

```ts
class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    speak() {
        console.log(`嗨！我的名字是${this.name}，我今年${this.age}歲。`);
    }
}

const person = new Person('阿毛', 18);
person.speak(); // 嗨！我的名字是阿毛，我今年18歲。
```

### 繼承（Inheritance）

類別的繼承，允許子類別（subclass）繼承父類別（superclass）的屬性和方法。子類別可以重寫父類別的方法，或是擴展新功能。

```ts
class Employee extends Person {
    position: string;

    constructor(name: string, age: number, position: string) {
        super(name, age); // 呼叫父類別的建構子
        this.position = position;
    }

    introduce() {
        console.log(`我是${this.name}，是${this.position}。`);
    }
}

const employee = new Employee('阿毛', 18, '前端工程師');
employee.speak(); // 嗨！我的名字是阿毛，我今年18歲。
employee.introduce(); // 我是阿毛，是前端工程師。
```

### 覆寫方法（Override method）

子類別中重新定義從父類繼承來的方法，取代父類的實現。雖然不寫 `override` 也不會有問題，但有寫的話，會幫你校正拼字錯誤。

```ts
class Ironman extends Person {
    override speak() {
        console.log(`${this.name}正在努力撰寫鐵人賽文章...`);
    }
}

const ironman = new Ironman('阿毛', 18);
ironman.speak(); // 阿毛正在努力撰寫鐵人賽文章...
```
### 簡寫形式

TypeScript 提供了一個建構子參數的簡寫形式來直接定義和初始化類別的屬性。只需在建構子的參數前加上下面的修飾詞，便可簡化屬性宣告和賦值的過程。

```ts
class Person {
    // 通過修飾詞簡化原本的寫法
    constructor(public name: string, public age: number) {}

    speak() {
        console.log(`嗨！我的名字是${this.name}，我今年${this.age}歲。`);
    }
}

const person = new Person('阿毛', 18);
person.speak(); // 嗨！我的名字是阿毛，我今年18歲。
```

## 屬性修飾詞

### 公開修飾詞（public）

`public` 修飾詞是 TypeScript 的預設設定，表示屬性或方法可以在任何地方被訪問，不寫的話預設就是 `public`。

```ts
class Person {
    constructor(public name: string, public age: number) {}

    public speak() {
        console.log(`嗨！我的名字是${this.name}，我今年${this.age}歲。`);
    }
}
```

### 受保護修飾詞（protected）

`protected` 修飾詞表示屬性或方法只能在類別內部及其子類別中被訪問，而不能在類別外部被訪問。

```ts
class Person {
    constructor(protected name: string, protected age: number) {}

    protected getInfo() {
        return `嗨！我的名字是${this.name}，我今年${this.age}歲。`;
    }
    speak() {
        console.log(this.getInfo());
    }
}

class Ironman extends Person {
    write() {
        // this.name 一樣可以正常使用
        console.log(`${this.name}正在努力撰寫鐵人賽文章...`);
    }
}

const ironman = new Ironman('阿毛', 18);
ironman.speak(); // 嗨！我的名字是阿毛，我今年18歲。
ironman.write(); // 阿毛正在努力撰寫鐵人賽文章...

// Error: 下面這三個都是受保護屬性，只可從類別 'Person' 及其子類別中存取。
// console.log(ironman.name);
// console.log(ironman.age);
// ironman.getInfo();
```

### 私有修飾詞（private）

`private` 修飾詞表示屬性或方法只能在類別內部訪問，無法在子類別或外部使用。

```ts
class Person {
    constructor(
        protected name: string,
        protected age: number,
        private idCard: string,
    ) {}
}

class Ironman extends Person {
    write() {
        // this.name 一樣可以正常使用
        console.log(`${this.name}正在努力撰寫鐵人賽文章...`);
    }
    getSuperclassPrivate() {
        // Error: 'idCard' 是私用屬性，只可從類別 'Person' 中存取。
        // return this.idCard;
    }
}
const ironman = new Ironman('阿毛', 18, 'A123456789');
ironman.write();    // 阿毛正在努力撰寫鐵人賽文章...。

// Error: 'idCard' 是私用屬性，只可從類別 'Person' 中存取。
// console.log(ironman.idCard);
```

### 只讀修飾詞（readonly）

`readonly` 修飾詞使屬性只能在初始化時賦值，之後不可更改。這提供了一種保護機制，防止屬性被意外修改。

```ts
class Ironman {
    constructor(public readonly title: string) {}

    showTitle() {
        console.log(`鐵人賽文章標題：「${this.title}」`);
    }
}

const ironman = new Ironman('TypeScript 完全指南：從語法基礎到高級功能的系統學習');
ironman.showTitle();  // 鐵人賽文章標題：「TypeScript 完全指南：從語法基礎到高級功能的系統學習」

// Error: 因為 'title' 為唯讀屬性，所以無法指派至 'title'。
// ironman.title = '我想變更標題';
```

## 參考文獻

- [Day 12. 機動藍圖・介面宣告 X 使用介面 - TypeScript Interface Intro.](https://ithelp.ithome.com.tw/articles/10215584)
- [TypeScript 5 Masterclass: OOP and classes - Build a Full-Stack App !](https://www.youtube.com/watch?v=k0Vjjcz-YK4&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=4&t=114s)