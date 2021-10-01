---
title: Day.21 「物件也有繼承問題？」 —— JavaScript 繼承 與 原型鍊
date: 2021/9/30 22:00:00
index_img: https://i.imgur.com/k1U1ZAE.png
banner_img: https://i.imgur.com/k1U1ZAE.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
excerpt: 我們每新增一個函式，瀏覽器都會向函式內新增一個屬性叫「prototype」，如果是普通函式的直接調用，「prototype」不會有任何作用，當是以構造函式的方式調用，他所新增的物件會有一個隱藏的屬性，指向該構造函式的原型物件。
雖然「prototype」是隱藏屬性，但我們可以透過「__proto__」來查看該屬性
---

# Day.21 「物件也有繼承問題？」 —— JavaScript 繼承 與 原型鍊

![「物件也有繼承問題？」 —— JavaScript 繼承 與 原型鍊](https://i.imgur.com/k1U1ZAE.png)

我們每新增一個函式，瀏覽器都會向函式內新增一個屬性叫 `prototype`

```javascript
function Person () {};
console.log( Person.prototype );
```

![prototype](https://i.imgur.com/LYfSQkU.png)

## 原型鍊

如果是普通函式的直接調用，`prototype` 不會有任何作用

當是以構造函式的方式調用，他所新增的物件會有一個隱藏的屬性，指向該構造函式的原型物件。
雖然 `prototype` 是隱藏屬性，但我們可以透過 `__proto__` 來查看該屬性

```javascript
function Person () {};
const person = new Person;
console.log( person.__proto__ );
```

![__proto__](https://i.imgur.com/L81kh1u.png)
![原型鍊](https://i.imgur.com/BEzzYiZ.png)

也能發現 `prototype` 與 `__proto__` 是一樣的

```javascript
function Person () {};
const person = new Person;
console.log( Person.prototype === person.__proto__ ); // true
```

## 繼承

依照之前物件傳址的特性，可以了解到物件中，**共用的內容**，可以設置到 `prototype` 中，新增的屬性就會**繼承**原型物件

```javascript
function Person () {};
Person.prototype.a = "我是原型物件 a";  // 添加原型物件屬性 a
const person = new Person;
console.log( person.a );  // "我是原型物件 a"
```

![繼承原型物件 a 屬性](https://i.imgur.com/Bxdt1bV.png)

可以發現如果物件內沒有 `a` 屬性，它就會往原型物件中尋找 `a` 屬性，如果找到就會使用。

```javascript
function Person () {};
Person.prototype.a = "我是原型物件 a";  // 添加原型物件屬性 a
const person = new Person;
person.a = "我是 person 中的 a";
console.log( person.a );  // "我是 person 中的 a"
```

![從本身尋找 a 屬性](https://i.imgur.com/pmDy3um.png)

### 優化之前的 `sayName`

看到這裡是不是又發現可以更好優化自訂物件的方法了！

```javascript
function Person (name, gender) {
  this.name = name,
  this.gender = gender
}
Person.prototype.sayName = function(){
  console.log( "大家好！我是" + this.name );
}

const person = new Person("毛毛", "男");
person.sayName();  // "大家好！我是毛毛"
```

就往原型物件尋找 `sayName` 方法，同時也不會汙染到我們的全局作用域！

## 檢查物件屬性

有時候，我們會需要檢查物件內有沒有該屬性，可以使用 `in` 語法來檢查：`"屬性名" in 物件名`，需注意屬性名要用引號包起來。

```javascript
function Person (name, gender) {
  this.name = name,
  this.gender = gender
}
Person.prototype.sayName = function(){
  console.log( "大家好！我是" + this.name );
}

const person = new Person("毛毛", "男");
console.log("name" in person);    // true
console.log("sayName" in person); // true
```

但會發現，會連**原型物件**的屬性也判定為 `true`，
這時如果我們要更確實的判斷是不是該**物件內**的屬性，可以使用 `hasOwnProperty()` 語法來檢查 

```javascript
function Person (name, gender) {
  this.name = name,
  this.gender = gender
}
Person.prototype.sayName = function(){
  console.log( "大家好！我是" + this.name );
}

const person = new Person("毛毛", "男");
console.log( person.hasOwnProperty("name"));    // true
console.log( person.hasOwnProperty("sayName")); // false
```

### 這些「方法」都哪來的

沒錯！聰明的你應該已經更瞭解**繼承**與**原型鍊**，而我們常用的方法，其實都是在原型物件裡面！

```javascript
function Person () {}
const person = new Person();

console.log( "hasOwnProperty" in person);              // true
console.log( person.hasOwnProperty("hasOwnProperty")); // false
```

這時嘗試使用 `__proto__` 找出原型

```javascript
function Person () {}
const person = new Person();

console.log( person.__proto__.hasOwnProperty("hasOwnProperty")); // false
```

#### 原型物件中還有原型物件

你會發現，奇怪！怎麼還是 `false`，那是因為，原型物件也是**物件**，原型物件中還有原型物件！
當然！這不是無限套娃～會一路找到原型物件為 `null` 的值，代表該物件沒有原型物件了，而這個物件就是 Object 物件的**原型**！

![原型物件中還有原型物件](https://i.imgur.com/3xgR9DK.png)

```javascript
function Person () {}
const person = new Person();

console.log( person.__proto__.__proto__);           // Object
console.log( person.__proto__.__proto__.__proto__); // null
console.log( person.__proto__.__proto__.hasOwnProperty("hasOwnProperty"));  // true
```

## 總結

已經把我們的物件精隨學習的差不多了～也認識 JavaScript 中，我們常用的方法都藏在物件的隱藏屬性之中！
