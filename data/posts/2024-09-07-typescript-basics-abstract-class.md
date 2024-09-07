---
title: TypeScript 基礎：抽象類別
date: 2024/09/07 17:48:01
categories:
    - [程式語言, 前端, TypeScript]
    - [iT 鐵人賽, 第 2024 年]
tags: 
    - iT 鐵人賽
    - TypeScript
description: 抽象類別（Abstract Class）是物件導向設計中的一種類別，它是用來作為其他類別的基礎，無法直接實例化。抽象類別通常會有抽象方法（未實作的方法），子類必須覆寫這些抽象方法，並根據具體需求提供實作。
---

## 什麼是抽象類別？

抽象類別（Abstract Class）是物件導向設計中的一種類別，它是用來作為其他類別的基礎，無法直接實例化。抽象類別通常會有抽象方法（未實作的方法），子類必須覆寫這些抽象方法，並根據具體需求提供實作。

抽象類別的目的是提供通用的藍圖，讓不同的子類能共用相同的結構和行為，同時允許每個子類根據自身特性實現具體細節。

### 主要特性

- **無法實例化**：抽象類別只能被繼承，不能被直接用來創建物件。
- **抽象方法**：抽象類別中可以定義不具體實作的抽象方法，這些方法需要由子類提供具體實現。
- **具體方法**：除了抽象方法，抽象類別也可以有具體實作的方法，這些方法可以直接被子類繼承使用。
- **強制子類實作**：當子類繼承了抽象類別，必須實作所有的抽象方法，否則子類也必須被聲明為抽象類別。

## 抽象類別的應用場景

抽象類別最常用於需要一個通用藍圖來約束子類，但同時希望不同子類能有各自的具體實作。這可以防止子類偏離共同結構，也可以減少重複程式碼。常見的應用場景包括：

1. **動物類別**：定義通用的屬性和行為（例如： 名字和移動），但具體動作由不同動物（子類）決定。
2. **交通工具類別**：定義通用的操作功能（例如：啟動和停止），但具體的實作由不同交通工具（例如：汽車、飛機等）決定，例如：汽車需要加油，飛機則需要加燃料。
3. **通知系統類別**：定義通用的通知方法（例如：發送通知），但具體的實作則由不同通知方式（例如：電子郵件、簡訊、推送通知）決定，各自負責發送具體類型的通知。

## 如何定義與使用抽象類別？

在 TypeScript 中，我們使用 abstract 關鍵字來定義抽象類別與方法。以下是定義抽象類別與抽象方法的基本語法：

### 定義抽象類別

員工 Employee 是抽象類別，定義了所有員工共有的行為（如顯示員工資訊的 showInfo() 方法），以及一個抽象的 calculateSalary() 方法。

```ts
// 定義抽象類別 Employee
abstract class Employee {
    constructor(public name: string) {}

    // 抽象方法：每種員工都有不同的薪資計算方式
    abstract calculateSalary(): number;

    // 具體方法：顯示員工資訊
    showInfo(): void {
        console.log(`員工：${this.name}`);
    }
}

// new Employee('阿毛');  // Error: 無法建立抽象類別的執行個體。
```

### 定義子類

全職員工 FullTimeEmployee 實作了薪資固定的計算方式，
兼職員工 PartTimeEmployee 根據時薪和工時計算薪資。

```ts
class FullTimeEmployee extends Employee {
    constructor(name: string, private salary: number) {
        super(name);
    }

    // 實作薪資計算方法，固定薪資
    calculateSalary(): number {
        return this.salary;
    }
}

class PartTimeEmployee extends Employee {
    constructor(
        name: string,
        private hourlyRate: number,
        private hoursWorked: number,
    ) {
        super(name);
    }

    // 實作薪資計算方法，按時薪計算
    calculateSalary(): number {
        return this.hourlyRate * this.hoursWorked;
    }
}
```

### 創建定義好的子類

每種員工類型都有自己特定的薪資計算邏輯，但可以共用 showInfo() 這樣的通用方法。

```ts
const mao = new FullTimeEmployee('阿毛', 81000);
mao.showInfo(); // 員工：阿毛
console.log(mao.calculateSalary()); // 81000

const jason = new PartTimeEmployee('傑森', 200, 240);
jason.showInfo(); // 員工：傑森
console.log(jason.calculateSalary()); // 48000
```

## 抽象類別的具體實用性

抽象類別的存在解決了程式設計中許多重複性工作。當多個類別需要共用相同邏輯或結構時，抽象類別能夠為它們提供一個統一的藍圖，讓子類共享通用方法的同時，保留各自的特殊實作。這種方式可以大大提高程式碼的可讀性和可維護性。

## 參考文獻

- [Day 28. 機動藍圖・抽象類別 X 藍圖基底 - TypeScript Abstract Class](https://ithelp.ithome.com.tw/articles/10219198)
- [TypeScript 5 Masterclass: OOP and classes - Build a Full-Stack App !](https://www.youtube.com/watch?v=k0Vjjcz-YK4&list=PLzb46hGUzitC1kGzPcy8tlQNxYbFsuqMO&index=4&t=965s)

