---
title: Day.18 「從函式物件認識 作用域 與 提升！」 —— JavaScript 函式 & 作用域 & 提升
date: 2021/09/27 16:00:00
image: https://i.imgur.com/dUL5Ryk.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
excerpt: 函數也是個物件型別，可以封裝一些功能（程式碼），在需要使用的時候執行功能（程式碼）。
---

![「從函式物件認識 作用域 與 提升！」 —— JavaScript 函式 & 作用域 & 提升](https://i.imgur.com/dUL5Ryk.png)

函數也是個物件型別，可以封裝一些功能（程式碼），在需要使用的時候執行功能（程式碼）。

例如我們需要把數字相加，在沒有函式的時候，需要用的時候就要重複打程式碼：

```javascript
let x = 1;
let y = 1;
let result = x + y;
console.log( result );  // 2
x = 3;
y = 2;
result = x + y;
console.log( result );  // 5
```

而我們學程式，講求的就是效率，所以自己定義一個函式封裝相加功能：

```javascript
function sum (x, y) {
  let result = x + y;
  console.log( result );
}
sum(1, 1);  // 2
sum(3, 2);  // 5
```

## 認識函式結構

![函式結構](https://i.imgur.com/JFEdr8A.png)

從上面的函式結構我們可以看到

- 函式名稱：這其實不一定會有，但我們先介紹基礎的方法，主要用處是在使用函式時需要使用名字來呼喚。
- 參數：這不一定要傳，主要是用來傳遞資料給函式內對應的變數，給功能程式碼運算。
- 功能程式碼：就是使用函式後，接收參數並進行功能運作的部分。

## 如何建創與調用函式

上面已經使用了一個建創方法

### 函式陳述式

```javascript
function 函式名 (參數) {
  /* 運作程式碼功能 */
}
函式名 (參數);
```

### 函式表達式，匿名函式

上面有說函式名稱不一定會有，匿名函式就是沒有自己的名稱，而是直接賦值給變數使用，又稱**函式表達式**。

```javascript
const 變數名 = function (參數) {
  /* 運作程式碼功能 */
}
變數名 (參數);
```

### new Function

跟物件與陣列一樣，使用 `new Function` 新增函式。
需注意：

- 大小寫不能拼錯
- 參數與運作程式碼皆需要用**字串型別**

```javascript
const 變數名 = new Function ("參數", "運作程式碼");
```

但這個方法並不好用，而且**效率低**，因為程式碼會先把**字串轉成它看得懂的程式碼**，才進行運算。

#### 更多更多的 new

看到這裡你會發現～是不是所有型別都可以 new 出來。
沒錯！其實還可以用 new 來新增字串、數字、布林...等，但因為 new 基礎型別非常不常用，這裡就不多介紹 new 基本型別了。

## 返回值（return）

我們會運用功能了，但不想一直使用 `console.log` 印出來，想要讓函式結果繼續在程式碼裡面運算。
可以利用 `return` 把運算結果返回並終止函式。

```javascript
function sum (x, y) {
  const res = x + y;
  return res;  // 使用 result 返回值，並終止函式
  console.log("測試有沒有執行")  // return 後的程式碼不會執行
}
const result = sum(1, 1);  // 返回的值 賦予到 result 變數上
console.log( result );  // 2
```

## 立即執行函式，IIFE（Immediately Invoked Function Expression）

有些時候，我們只想在一開始使用一次函式，後續不會調用函式，就像進入超商會聽到歡迎光臨一樣。
此時不想占用變數空間，就可以使用匿名函式立即執行，需注意：

- 匿名函式需要使用 `()` 包起來，不然 JavaScript 會認為你忘記為函式命名而報錯。
- 後面需像正常調用函式一樣，也可以和一般函式一樣帶入參數。

```javascript
( function(text) {
  console.log(text)
} )("歡迎光臨")
```

或

```javascript
( function(text) {
  console.log(text)
}("歡迎光臨") )
```

都可以使用，看個人（團體）習慣

## 作用域（Scope）與 提升（Hoisting）

在我們宣告變數那一篇有介紹，全局作用域 與 函數作用域。

### 全局作用域

- 直接編寫 script 標籤中 JavaScript 程式碼，都會在全局作用域。

  ```javascript
  var a = 1;
  console.log(a);        // 1
  ```

- 全局作用域在網頁打開時創建，在關閉網頁時清除。

- 在全局作用域有一個叫 `window` 的**物件**，代表瀏覽器的視窗，它由瀏覽器新增並供我們使用其內建的方法。

  ```javascript
  console.log(typeof window); // "object"
  ```

- 在全局作用域中
  - 宣告變數都會變成 window 的屬性保存
  
    ```javascript
    var a = 1;
    console.log(window.a); // 1
    ```
  
  - 新增的函式會變成 window 的方法保存

    ```javascript
    function sum (x,y) {
      return x + y;
    }
    console.log( window.sum ); 
    /*
       function sum (x,y) {
         return x + y;
       }
    */
    ```

### 變數提升

我們先從全局作用域看變數，會發現不管有沒有使用 `var` 宣告都會取得到值

```javascript
var a = 1;
x = 2;

console.log("a = "+ a);  // "a = 1"
console.log("x = "+ x);  // "x = 2"
```

這時候我們把變數往後移，因為 Javascript 是由上向下一行一行執行，會發現有沒有宣告的差別。

```javascript
console.log("a = "+ a);  // "a = undefined"
console.log("x = "+ x);  // 報錯 x is not defined 

var a = 1;
x = 2;
```

有先進行 `var` 聲明宣告的變數，在執行程式碼之前會先提升至全局作用域的開頭，才執行程式碼，相當於：

```javascript
var a  // var 聲明宣告會自動提升

console.log("a = "+ a);  // "a = undefined"
console.log("x = "+ x);  // 報錯 x is not defined 

a = 1;
x = 2;
```

### 函數提升

一樣的，函數也會在程式執行前，會先自行提升，但函式有兩個新增方法，一個是函式陳述式，一個是函式表達式。
與上面一樣正常使用的話是不會報錯，但如果反過來？

```javascript
fun()  // "我是一個 fun 函式"
fun2() // 報錯 fun2 is not a function

function fun () {
  console.log("我是一個 fun 函式")
}
var fun2 = function () {
  console.log("我是一個 fun2 函式")
}
```

我想聰明的你，應該馬上就猜想到，沒錯！就是宣告變數提前，但變數的函式要到後面才會賦值，`undefined`當函式使用當然會報錯！

而使用函式陳述式，會把整個函式提升，在執行程式碼！

```javascript
function fun () {    // 函式陳述式把整個函式提升
  console.log("我是一個 fun 函式")
}
var fun2;  // var 自動提升宣告 undefined

fun()  // "我是一個 fun 函式"
fun2() // 報錯 fun2 is not a function

fun2 = function () {  // 到這裡才賦值
  console.log("我是一個 fun2 函式")
}
```

### 函式作用域

- 編寫在函式**裡面**的 Javascript 程式碼，這個區域就稱**函式作用域**。
- 函式作用域只在函式被**調用**時創建，在函式執行結束時清除。
- 每調用一次函式會創建一個**新的函式作用域**，函式作用域彼此都是**獨立運作的**。
- 函式作用域**可以往外**查找全局作用域的變數，全域作用域**不能往內**查找函式作用域的變數。

  ```javascript
  var a = 1;

  function echo () {
    var b = 2;
    console.log("a = "+ a);  // "a = 1"，函式內沒有 a 變數，會往全域找 a 變數
  }

  echo();
  console.log("b = "+ b);  // 報錯 b is not defined，全域找不到 b 變數
  ```

- 函式作用域中操作變數時，會**先在自己的作用域**尋找，沒有則會**往上一層**去尋找變數，一路查到全局作用域，直到找到為止，如果找不到就會報錯。

  ```javascript
  var a = "我是全局的 a";
  var c = "我是全局的 c";
  function echo () {
    var a = "我是 echo 內的 a";
    var b = "我是 echo 內的 b";
    
    console.log("a = "+ a);  // "a = 我是 echo 內的 a"，函式內有 a 變數，優先使用
    console.log("a = "+ window.a);  // "a = 我是全局的 a"，利用 window 直接查找全局變數
    
    function inside () {
      console.log("b = "+b); // "b = 我是 echo 內的 b"，
        // 函式內沒有 b 變數，往上一層 echo 內查找到 b 變數
      console.log("c = "+c); // "c = 我是全局的 c"，
        // 函式內沒有 c 變數，往上一層 echo 內也查找不到變數，再往上一層查找。
    }
  }

  echo();
  console.log("a = "+ a);  // "a = 我是全局的 a"，不會查找函式內的值
  ```

- 定義**參數**，其實就等於在函式內**宣告變數**，所以就不會往外查找變數。

  ```javascript
  var e = 1;

  function echo (e) {
    console.log(e);
  }

  echo();    // undefined，因為 var e; 是 undefined
  echo(10);  // 10
  ```

## 總結

這邊已經先瞭解了基礎的函式，但函式的精隨 `this` 還沒介紹，介紹函式的同時也瞭解了宣告變數 `var` 的作用域與提升了～但宣告變數還有 `let` 與 `const` 的特性還沒有介紹！這等到後面要認識函式的精隨的時候，在一起解說～明天將先繼續挖深物件型別，加油！我們快脫離**基礎篇**了。

## 參考資料

- [008 天 重新認識 JavaScript](https://www.tenlong.com.tw/products/9789864344130)
