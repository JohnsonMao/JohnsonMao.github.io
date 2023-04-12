---
title: Day.19 「認識 JavaScript 記憶體堆疊、傳值 與 傳址」 —— JavaScript 物件 與 記憶體
date: 2021/09/28 16:00:00
index_img: https://i.imgur.com/PQ6GCWn.png
banner_img: https://i.imgur.com/PQ6GCWn.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
excerpt: 我們的變數在我們開啟網站時，都會存放在記憶體內，當我們關閉網站時，記憶體也會將這些變數釋放。
---

![「認識 JavaScript 記憶體堆疊、傳值 與 傳址」 —— JavaScript 物件 與 記憶體](https://i.imgur.com/PQ6GCWn.png)

我們的變數在我們開啟網站時，都會存放在記憶體內，當我們關閉網站時，記憶體也會將這些變數釋放。

## 記憶體的堆疊

JavaScript 變數都是保存在 Stack 中

### Stack

而基本型別的值會直接儲存在 Stack 中，值與值之間獨立存在。

```javascript
var a = 1;
var b = a;  // b = 1
a++;        // a = 2
console.log("a = " + a + ", b = " + b);  // "a = 2, b = 1"
```

![Stack 示意圖](https://i.imgur.com/2H1GS2f.png)

### Heap

物件型別的**值**會保存在 Heap 中
每新增一個新物件（new Object），都會在 Heap 中開闢一個新空間。
而物件變數**保存**的會是指向新空間的**地址**（物件的引用複製），
如果新變數**複製**的是同一個物件，當一個**物件屬性修改**，另一個也會受到影響！

```javascript
var obj = new Object;   // 開闢新地址
obj.name = "毛毛";       // { name: "毛毛" }
var obj2 = obj;         // 複製地址
obj2.name = "鮭魚";      // 更改 obj2 { name: "鮭魚" }
console.log( obj.name );// 因為參考地址一樣，obj 也被修改 { name: "鮭魚" }
```

![Heap 示意圖](https://i.imgur.com/7kEpVvp.png)

## 傳值（Pass by value）

所以根據上面的記憶裡內存，可以瞭解到單純的基本型別存入的就是單純的值。
而**基本型別複製**到別的變數，這個過程稱為**傳值**，複製過去後就是**獨立**的變數。
而變數的比較就是 **Stack 值**的比較，這比較簡單好懂。

```javascript
var a = 1;
var b = 1;
console.log( a === b );  // true
```

## 傳址（Pass by reference）

而比較複雜的物件呢？上面也有看到物件存在 Stack 中的是 Heap 地址。
而**物件型別複製**到別的變數，這個過程稱為**傳址**，複製過去後，使用的都是同一個**物件**（地址）
而變數的比較是 Stack 值得比較，如果是新增物件的話，Stack 存入的地址會不一樣，所以會回傳 `false`

```javascript
var obj = new Object;        // 開闢新物件地址
obj.name = "毛毛";            // { name: "毛毛" }
var obj2 = obj;              // 直接複製地址引用同個物件 { name: "毛毛" }
var obj3 = { name: "毛毛" };  // 開闢新物件地址 { name: "毛毛" }
console.log( obj === obj2 ); // true   引用同一個物件
console.log( obj === obj3 ); // false  雖然物件看起來一樣，但引用地址不一樣
```

![Pass by reference 示意圖](https://i.imgur.com/n5yyTMD.png)

## 共享（Pass by sharing）

來囉！讓人頭昏昏眼花花的概念，物件遇上函式作用域就更加曖昧更加複雜了，上一篇認識了函式中的**函式作用域**，所以我們知道

### 當 參數 是 基本型別

傳**基本型別**的參數，其實就等於在函式作用域宣告**變數**並**傳值**，傳值**獨立**的關係，自然影響不到外面的變數，除非使用 `return` 回傳。

```javascript
function change (a, b) {
  var c = b;
  b = a;
  a = c;
  console.log( "a = "+ a, "b = "+b);
}
var x = 1;
var y = 2;
change(x, y);  // "a = 2" "b = 1"
console.log( "x = "+ x, "y = "+ y ); // "x = 1" "y = 2"
```

### 當 參數 是 物件型別

傳**物件型別**的參數，就變成在函式作用域宣告變數並**傳址**，傳址因為是引用**同一個物件**，所以對屬性更動時，就會影響到外面的物件變數！

```javascript
function rename(obj) {
  obj.name = "鮭魚";  // 修改物件內的"屬性"
}

var person = { name: "毛毛" }
console.log( person.name ); // "毛毛"
rename( person );
console.log( person.name ); // "鮭魚"
```

沒錯！竟然修改了函式作用域外的東西了，因為指向的是同一個物件！

```javascript
function rename(obj) {
  obj = { name = "鮭魚" } // 在作用域裡面新增物件地址
}

var person = { name: "毛毛" }
console.log( person.name ); // "毛毛"
rename( person );
console.log( person.name ); // "毛毛"
```

但如果是直接對**整個物件**修改，就會發現作用域外面不會被影響了，因為它等同於**物件實字**新增了一個**新物件地址**，這個值無法傳遞到外面。

## 總結

以上物件可以套用到陣列，這樣我們就認識物件型別與基本型別不同的地方了，有點抽象！**傳值**與**傳址**的概念在寫 JavaScript 邏輯時，**非常重要**，未來在學框架時，這些基礎越扎實，框架就學的越快越輕鬆！

## 參考資料

- [008 天 重新認識 JavaScript](https://www.tenlong.com.tw/products/9789864344130)
- [你不可不知的 JavaScript 二三事](https://ithelp.ithome.com.tw/articles/10209104)
