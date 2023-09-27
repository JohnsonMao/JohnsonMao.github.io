---
title: Day.29 「Class 語法糖～」 —— ES6 Class 構造函式
date: 2021/10/08 16:30:00
image: https://i.imgur.com/EOelHe0.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
description: ES6 新增了更接近傳統語言寫法的 Class 這個概念，基本上可以當作是一個**語法糖**，絕大部分的功能在 ES5 都可以做到，但 Class 可以讓構造函式的寫法更加清新！
---

![「Class 語法糖～」 —— ES6 Class 構造函式](https://i.imgur.com/EOelHe0.png)

ES6 新增了更接近傳統語言寫法的 Class 這個概念，基本上可以當作是一個**語法糖**，絕大部分的功能在 ES5 都可以做到，但 Class 可以讓構造函式的寫法更加清新！

> 什麼是語法糖？
> 就是新增的語法對原功能沒有什麼影響，主要是給程式開發者更方便的使用。

## class 初體驗

首先，我們先用之前的構造函式

```javascript
function Person (name, gender) {
  this.name = name,
  this.gender = gender
}
Person.prototype.sayName = function(){     // 構造函式方法傳給原型鍊
  console.log( "大家好！我是" + this.name );
}

const person = new Person("毛毛", "男");
person.sayName();  // "大家好！我是毛毛"
```

接著來使用 `class` 構造函式，來看看差異，可以發現**繼承方法**可以寫在構造函式內，它會**自動**幫我們傳給原型鍊上，而物件資料寫在 `constructor` 內

```javascript
class Person {
  // 構造函式方法，一定要使用 constructor 不能改名
  constructor (name, gender) {
    this.name = name;
    this.gender = gender;
  }
  
  sayName () {  // 添加方法必須使用這個語法
    console.log( "大家好！我是" + this.name ); 
  }
}

const person = new Person("毛毛", "男");
person.sayName();  // "大家好！我是毛毛"
console.log(person);
```

![自動傳給繼承鍊上](https://i.imgur.com/WRcvc2h.png)

## 靜態屬性

我們都知道構造函式也是物件，ES6 以前構造函式要添加靜態屬性，就是使用物件的方法來添加，因為沒有使用到原型鍊，所以這個屬性是 `Person` 內的屬性，也就是**靜態屬性**。

```javascript
function Person(){}
Person.type = "人類";

const mao = new Person();
console.log(mao.type);     // undefined
console.log(Person.type);  // "人類"
```

### static 靜態方法

而 class 有新增靜態方法 `static`，來實現靜態屬性。

```javascript
class Person(){
  static type = "人類";
}

const mao = new Person();
console.log(mao.type);     // undefined
console.log(Person.type);  // "人類"
```

## 構造函式繼承

ES6 以前要寫構造函式繼承構造函式時

```javascript
/*  父級構造函式，人  */
function Person (name, gender) {
  this.name = name,
  this.gender = gender
}
Person.prototype.sayName = function(){
  console.log( "大家好！我是" + this.name );
}

/*  子級構造函式，成年人  */
function AdultPerson (name, gender, age, married) {
  Person.call(this, name, gender);  // 透過 call 方法來繼承父級構造函式資料
  this.age = age;
  this.married = married;
}
/*  設定子級構造函式的原型  */
AdultPerson.prototype = new Person;
/*  校正子級構造函式的 constructor  */
AdultPerson.prototype.constructor = AdultPerson;

const mao = new AdultPerson("毛毛", "男", 27, "未婚");
mao.sayName(); // "大家好！我是毛毛"
console.log(mao);
```

![子級構造函式繼承父級構造函式](https://i.imgur.com/UIg96dj.png)

可以看到使用子級構造函式，可以繼承父級構造函式的方法 `sayName`。

### extends 繼承方法

而 class 有新增繼承方法 `extends` 與 `super`，來實現繼承父級構造函式。

```javascript
class Person {
  // 構造函式方法，一定要使用 constructor 不能改名
  constructor (name, gender) {
    this.name = name;
    this.gender = gender;
  }
  
  sayName () {  // 添加方法必須使用這個語法
    console.log( "大家好！我是" + this.name ); 
  }
}

class AdultPerson extends Person { // 使用 extends 繼承父級構造函式
  constructor (name, gender, age, married) {
    // 使用 super 調用父級構造函式的屬性方法
    super(name, gender);   // 與 Person.call(this, name, gender) 效果一樣
    this.age = age;
    this.married = married;
  }
  /*  可以自己新增方法  */
}

const mao = new AdultPerson("毛毛", "男", 27, "未婚");
mao.sayName(); // "大家好！我是毛毛"
console.log(mao);
```

![子級構造函式繼承父級構造函式](https://i.imgur.com/SQ5hL6e.png)

使用起來，更簡潔有利～也更加直覺可以判斷是兩個構造函式與之間的關係！

## getter 與 setter

class 的 `get` 與 `set` 方法，
在對某個屬性**讀取**時，會調用 `get` 對應的函式，
在對某個屬性**設置**時，會調用 `set` 對應的函式。

```javascript
class Person {
  // 構造函式方法，一定要使用 constructor 不能改名
  constructor (name) {
    this.name = name;
  }
  get name () {
    console.log("名字被讀取");
  }
  set name (newVal) {
    console.log("名字被修改為" + newVal);
  }
}

const mao = new Person("毛毛");  // 這時會自動調 set name 方法，"名字被修改為毛毛"
console.log(mao.name);    // 這時會自動調 get name 方法，"名字被讀取"
mao.name = "鮭魚";  // 這時會自動調 set name 方法，"名字被修改為鮭魚"
```

## 總結

Class 這個語法糖，讓我們寫構造函式會更加方便直觀，用過都說回不去了！
