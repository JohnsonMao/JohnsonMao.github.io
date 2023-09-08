---
title: Day.20 「初步認識 this，中央工廠式的自訂物件～」 —— JavaSript 構造函式
date: 2021/09/29 16:00:00
image: https://i.imgur.com/MowXDC1.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
excerpt: 如同學習函式一樣！有時候我們會一直重複地做一件事，當還是初學者的我們需要製作大量的個人資料物件時，通常第一個想法就是複製貼上～一直重複製作一樣的東西！我們要發揮工程師的精神～看到一直有重複的程式碼時，就要想辦法簡化它。在學習自訂物件之前，要先認識之前函式沒說到的「this」
---

![Day.20 「初步認識 this，中央工廠式的自訂物件～」 —— JavaSript 構造函式](https://i.imgur.com/MowXDC1.png)

如同**學習函式**一樣！有時候我們會一直重複地做一件事，
當還是初學者的我們需要製作大量的個人資料物件時，通常第一個想法就是複製貼上～

```javascript
const person = {
  name: "毛毛",
  gender: "男",
  sayName: function() {
    console.log( "大家好！我是" + person.name );
  }
}
const person2 = {
  name: "小黃",
  gender: "男",
  sayName: function() {
    console.log( "大家好！我是" + person2.name );
  }
}
/* ... */
```

一直重複製作一樣的東西！
我們要發揮工程師的精神～看到一直有重複的程式碼時，就要想辦法簡化它。
在學習自訂物件之前，要先認識之前函式沒說到的「**this**」

## this

瀏覽器在執行函式時，都會向函式傳遞一個**隱藏的參數**！

- 這個隱藏的參數就是今天的主角「this」，this 指向的是一個**物件**

  ```javascript
  function echo () {
    console.log(this);
  }
  echo ();  // this 指向 window 這個物件
  ```

- 隨著函式**執行的場合不同**，this 的指向也會不同。

  ```javascript
  function echoName () {
    console.log(this.name);
  }
  // 為 window 這個物件添加 name 屬性，也就是在全局作用域宣告 name 變數
  var name = "我是 window 的 name 屬性";  
  
  echoName ();  // "我是 window 的 name 屬性"
  
  var obj = {
    name: "毛毛",
    sayName: echoName  // 物件添加函式
  }
  
  console.log(obj.sayName === echoName);  // true 用來確認是不是同一個函式
  
  obj.sayName();  // "毛毛"
  ```
  
- 根據執行的場合不同，指向不同懶人包
  - 直接調用函式，this 的指向永遠在 **window**
  - 使用物件的函式，this 的指向會在使用的**那個物件**
  - 使用建構函式，this 會指向**新增建構函式的物件**

當然這只是稍微認識了我們的 this，不過以目前的知識量，就能夠的自訂物件了！

## 利用函式新增物件

我們前面有說過，函式非常方便，可以把功能都寫在函式裡，例如我們現在要來自定義物件

```javascript
function createPerson() {
  var obj = new Object;  // 新增一個物件
  obj.name = "毛毛",
  obj.gender = "男",
  obj.sayName = function() {
    console.log( "大家好！我是" + this.name );
  }
  return obj;
}
const person = createPerson();
console.log( person );
/*
   {
      name: "毛毛",
      gender: "男",
      sayName: function() {
        console.log( "大家好！我是" + this.name );
      }
   }
*/
```

但會發現這樣新增的物件的是固定的！
這時我們利用函式的**參數**，就可以簡化新增物件的步驟了。

```javascript
function createPerson (name, gender) {
  var obj = new Object;  // 新增一個物件
  obj.name = name,
  obj.gender = gender,
  obj.sayName = function() {
    console.log( "大家好！我是" + this.name );
  }
  return obj;
}
const person = createPerson("毛毛", "男");
const person2 = createPerson("小黃", "男");
person.sayName();  // "大家好！我是毛毛"
person2.sayName();  // "大家好！我是小黃"
```

但如果這個時候～還想要自訂一個寵物的物件，這樣直接看會覺得 人的物件 與 寵物的物件 差不多。

```javascript
function createPet (name, sex, animal) {
  var obj = new Object;  // 新增一個物件
  obj.name = name,
  obj.sex = sex,
  obj.animal = animal
  return obj;
}
const pet = createPet("小黃", "雄性", "小狗");
console.log( pet );   // {...}
console.log( person ) // {...} 
```

這時使用建構函式來真正意義上的自訂物件，更加方便快速簡單！

## 構造函式

自訂一個構造函式，用來專門新增人的物件

- 構造函式就是一個普通函式，新增的方法與普通的方法沒有不同
- 不同的是建構函式會習慣在**首字母大寫**

```javascript
function Person () {}
```

普通函式是直接調用，而構造函式是透過 `new` 關鍵字調用！

```javascript
const 直接調用 = Person()
const 構造函式 = new Person()
console.log( 直接調用 );  // undefined
console.log( 構造函式 );  // {}
```

直接調用的函式，因為沒有使用 `return` ，所以會自動返回 `undefined`

### 構造函式執行過程

1. 會立刻自動新增一個物件
2. 函式的 **this 會指向該物件**
3. 逐行執行程式碼（我們操作的部分）
4. 將新增的物件作為返回值返回

```javascript
function Person (name, gender) {
  this.name = name,
  this.gender = gender,
  this.sayName = function() {
    console.log( "大家好！我是" + this.name );
  }
}
const person = new Person("毛毛", "男");
console.log( person )  // Person {...}
```

這時你發現前面出現了 `Person`，再來用一個的寵物的構造函式。

```javascript
function Pet (name, sex, animal) {
  this.name = name,
  this.sex = sex,
  this.animal = animal
}
const pet = new Pet("小黃", "雄性", "小狗");
console.log( person )  // Person {...}
console.log( pet )     // Pet {...}
```

這樣就可以透過構造函式更直觀的看**同一類的物件**！

### 構造函式實例檢查

JavaScript 有個語法 `instanceof`，可以用來檢查，物件是否為該構造函式新增出來的實例。

```javascript
console.log(person instanceof Person); // true  代表是由這個構造函式創建出來的
console.log(person instanceof Pet);    // false 代表不是由這個構造函式創建出來的
```

## 優化構造函式

我們前面的構造函式中，有為物件添加函式 `sayName()`

```javascript
function Person (name, gender) {
  this.name = name,
  this.gender = gender,
  this.sayName = function() {
    console.log( "大家好！我是" + this.name );
  }
}
const person = new Person("毛毛", "男");
person.sayName();  // "大家好！我是毛毛"
```

而我們每新增一個物件，同時也跟著在物件內**新增**一個 `sayName` 函式

```javascript
function Person (name, gender) {
  this.name = name,
  this.gender = gender,
  this.sayName = function() {
    console.log( "大家好！我是" + this.name );
  }
}
const person = new Person("毛毛", "男");
const person2 = new Person("小黃", "男");
console.log( person.sayName === person2.sayName );  // false  兩個 sayName 不一樣
```

發現 `sayName` 函式，彼此不相同，當新增了 10000 個 Person 物件，也會同時新增 10000 個 `sayName` 函式！而這 10000 個 `sayName` 函式其實都是一模一樣的，會為了這一模一樣的函式浪費記憶體空間！

這想當然是沒有必要的事情，我們可以讓所有物件共同使用一個函式。
直接在全局作用域定義一個 `sayName` 函式，在構造函式內賦值 `sayName` 函式，這時構造函式內找不到 `sayName` 函式，就會往外找 `sayName` 函式

```javascript
function Person (name, gender) {
  this.name = name,
  this.gender = gender,
  this.sayName = sayName
}
function sayName() {
  console.log( "大家好！我是" + this.name );
}

const person = new Person("毛毛", "男");
const person2 = new Person("小黃", "男");
console.log( person.sayName === person2.sayName );  // true  兩個 sayName 引用同一個函式，所以一樣
```

當然這樣也是有缺點，就是把函式定義在全局作用域會壓縮到全局作用域的命名空間，而且多人協作的時候，也容易出問題

## 總結

今天稍微介紹了 JavaScript 的 「this」，它可是 JavaScript 的精隨，少了 `this` 會有很多事情不能做，昨天介紹的記憶體堆疊，在使用物件型別的東西要特別注意，不然一不小心會讓瀏覽器效能變低，網頁卡卡的！
