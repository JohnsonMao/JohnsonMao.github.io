---
title: Day.17 「如果基本型別是商品，那物件型別就是購物袋」 —— JavaScript 物件型別
date: 2021/09/26 15:00:00
index_img: https://i.imgur.com/6P86wxa.png
banner_img: https://i.imgur.com/6P86wxa.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
excerpt: 前面有介紹了基本型別，基本型別有 string、number、boolean、null、undefined 這五個型別，剩下的可以都歸類於物件型別。
---

![「如果基本型別是商品，那物件型別就是購物袋」 —— JavaScript 物件型別](https://i.imgur.com/6P86wxa.png)

前面有介紹了基本型別，基本型別有 `string`、`number`、`boolean`、`null`、`undefined` 這五個型別，剩下的可以都歸類於物件型別。

## 什麼是物件型別？

如同標題所說，基本型別所存入的值比較單純簡單，每個值都沒有關連，如同一個商店賣的商品一樣。

```javascript
let coffee = 45;
let sandwich = 30;
```

而現在要來介紹的**物件型別**，就是由 **0 個到多個**的資料屬性所組合而成的，讓資料有**關連性**！就像我要購買咖啡與三明治一樣，讓這兩個商品裝進我的購物袋。

```javascript
const shopping_bag = {
  coffee: 45,
  sandwich: 30
};
```

當然這只是簡單的比喻，實際並沒那麼簡單。

## 物件（object）

先來介紹最基礎的**物件（object）**

物件可以**多個屬性值**組合而成，屬於**無序**集合體，每個屬性都會有一個對應值，特色是由`{}`包起來。

就像一個人有名字（string）、性別（string）、年齡（number），就很適合用物件來新增。

### 宣告物件的方法

#### 利用 new Object() 新增物件

這是以前新增物件的方法，利用 `new Object()` 幫變數新增 `{}` 空物件，再由賦值語句 `物件名.屬性名 = 屬性值`，進行**新增物件屬性**。

```javascript
const person = new Object();
person.name = "毛毛";
person.gender = "男";
```

#### 利用空物件 {} 新增物件

這是現在大多數人都使用的方法，更簡單直觀，直接宣告物件並在裡面定義屬性 `{ key: value, key2: value }`。
物件結構：

- 使用 `{}` 包住
- key 命名，盡量具有語意，**盡量避免**使用 數字、數字英文混和 與 空白鍵，如果 數字**開頭**與英文混和 或 含有空白鍵，需使用引號 `''` 包起來，而單純數字就不需要引號包起來。
- value 值可以是**任何型別**，只要遵守型別規則就可以了。
- 多個屬性值用 `,` 做區隔。

```javascript
const person = {
  name : "毛毛",
  gender : "男"
}
```

##### 當然也可以先宣告空物件

也可以透過宣告空物件，再看需要新增進去。

```javascript
const person = {};
person.name = "毛毛";
person.gender = "男";
```

### 如何存取物件的 value 值

就跟前面新增屬性值的方法一樣

- 使用 `.` 取值，通常都使用這個方式取值，比較直觀

  ```javascript
  const person = {
    name : "毛毛",
    gender : "男"
  }
  
  console.log( person.name );  // "毛毛"
  ```

- 使用 `[""]` 取值，通常使用在 key 的命名法**不符合**常規變數命名時（如：**數字開頭** 或 **字串中間有空格**），藉由自動轉型使用中括號框起字串取值，如果 key 命名是**純數字**，可以不使用引號取值。

  ```javascript
  const obj = {
    1 : "我是 1",
    "2a" : "我是 2a",
    'my name': "毛毛"
  }
  
  console.log( obj.1 );          // 報錯
  console.log( obj[1] );         // "我是 1"
  console.log( obj["1"] );       // "我是 1"
  console.log( obj[2a] );        // 報錯
  console.log( obj["2a"] );      // "我是 2a"
  console.log( obj[my name] );   // 報錯
  console.log( obj["my name"] ); // "毛毛"
  ```

### 如何新增物件屬性

眼尖的人應該已經有發現，其實前面介紹如何新增物件時，就有新增物件屬性。
**需注意** 物件的 `key` 會**自動轉型成字串型別**，而 `value` 可以存任何型別。

而新增方法其實就跟存取方法幾乎一模一樣，使用賦值語句直接賦值即可！如：`person.name = "毛毛";`
注意的要點也差不多，盡量使用有語意的字串來命名 key。

### 如何刪除物件屬性

這就要使用到一元運算子 `delete`，在要刪除的屬性前面使用 `delete` 就會刪除屬性。

```javascript
const wallet = {};   // 設一個錢包
wallet.money = 1000; // 錢包內多了 1000 元
console.log( wallet.money );  // 1000

delete wallet.money; // 錢包內移除了 1000 元
console.log( wallet.money );  // undefined
```

## 陣列（array）

跟物件（object）有點相似，陣列也是**多個值**組合而成。
與物件不一樣的是，屬於**有序**集合體，陣列的屬性名為數字索引，陣列**索引**號碼由 **0** 開始。
雖然可以有很多不同的值組合，但通常都會放同類型、具有關聯性的值統合成陣列。

就像一個班級有你（string）、我（string）、他（string），都是班級裡的學生，就很適合用陣列。

### 宣告陣列的方法

其實跟宣告物件的方法差不多，你會覺得似曾相似。
就想像原本的所有屬性值，變成**有序**的索引值就好。

#### 利用 new Array() 新增陣列

這是以前新增陣列的方法，利用 `new Array()` 幫變數新增 `[]` 空物件，再由賦值語句 `陣列名[ 索引號碼 ] = 屬性值`，進行**新增陣列內容**。
因為**索引號碼**一定是有序數字，所以只能使用 `陣列名[ 索引號碼 ]` 來新增存取。

```javascript
const person = new Array();
person[0] = "花花";
person[1] = "泡泡";
person[2] = "毛毛";
```

#### 利用空陣列 [] 新增物件

這是現在大多數人都使用的方法，更簡單直觀，直接宣告陣列並在裡面定義屬性 `[ value, value ]`。
陣列結構：

- 使用 `[]` 包住
- value 值可以是**任何型別**，但通常使用陣列的 value 值會具有相關性。
- 多個 value 值用 `,` 做區隔。

```javascript
const person = [ "花花", "泡泡", "毛毛" ];
```

##### 當然也可以先宣告空陣列

也可以透過宣告空物件，再看需要新增進去。

```javascript
const person = [];
person[0] = "花花";
person[1] = "泡泡";
person[2] = "毛毛";
```

### 如何 新增 與 刪除 陣列索引

這聰明的你應該馬上就猜到！沒錯～跟物件使用的方法非常像，因為索引值都是數字，所以直接用 `[]` 來存取陣列索引值就可以了！
但是陣列還有更好的新增刪除方法。

如果是用索引直接新增，會產生一個問題。如下：

```javascript
const person = [ "花花", "泡泡", "毛毛" ];

/* 這時一個手殘，把索引值案到 9 */
person[9] = "尤教授";
console.log( person );  // [ "花花", "泡泡", "毛毛", , , , , , , "尤教授" ]
```

你會發現索引值打錯，會多很多個還沒定義的索引值先占位子！
每次新增刪除都還要小心翼翼地計算索引值。

#### 在陣列最末端新增索引值 push()

這時候使用 `push()` 這個方法就能無後顧之憂的在陣列最後面新增索引值了！

```javascript
const person = [ "花花", "泡泡", "毛毛" ];

person.push("尤教授");
console.log( person );  // [ "花花", "泡泡", "毛毛", "尤教授" ]
```

#### 刪除陣列最末端的索引值 pop()

有新增就會有刪除！使用 `pop()` 這個方法就能毫無顧忌地刪除陣列最後的索引值了！

```javascript
const person = [ "花花", "泡泡", "毛毛", "尤教授", "魔鞋啾啾" ];

person.pop();
console.log( person );  // [ "花花", "泡泡", "毛毛", "尤教授" ]
```

#### 刪除 與 新增 最前頭的索引值 shift() 與 unshift()

既然有處理陣列最末端的，當然也有處理陣列最前頭的索引值！

```javascript
const person = [ "魔鞋啾啾", "花花", "泡泡", "毛毛", "尤教授" ];

person.shift();
console.log( person );    // [ "花花", "泡泡", "毛毛", "尤教授" ]
person.unshift("魔人啾啾");
console.log( person );    // [ "魔人啾啾", "花花", "泡泡", "毛毛", "尤教授" ]
```

#### 如何獲取陣列的長度 length

有時候陣列很長時，可以依靠 `length` 語法來獲取陣列的長度！

```javascript
const person = [ "花花", "泡泡", "毛毛", "尤教授", "魔人啾啾" ];

console.log( person.length );  // 5
```

##### 甚至修改陣列長度

利用 `length` 修改陣列，讓陣列直接刪除多餘的值 或 添加未定義的值！

```javascript
const person = [ "花花", "泡泡", "毛毛", "尤教授", "魔人啾啾" ];
person.length = 3; // 把陣列長度修改為 3
console.log( person );  // [ "花花", "泡泡", "毛毛" ]
person.length = 5; // 在修改回 5
console.log( person );  // [ "花花", "泡泡", "毛毛", , ]
```

##### 除了用在陣列也能用在字串

`length` 除了可以用在察看陣列的長度，也能用來查看字串的字數，不過跟陣列不同的是不能修改字串的長度！

```javascript
const name = "Mao";
console.log( name.length );  // 3
```

#### 還有更多方法

還有很多陣列方法可以使用，有興趣的可以再去看 [JavaScript Array 陣列操作方法](https://www.oxxostudio.tw/articles/201908/js-array.html)

## 如何透過程式碼判斷 陣列 和 物件

前面我們有教過一元運算子的 `typeof` 可以用來判斷型別，但會發現判斷陣列與物件時，回傳的都是 `"object"`！
這時候 JavaScript 有新增一個判斷陣列的方法 `Array.isArray()`。

```javascript
const arr = [];
const person = [ "花花", "泡泡", "毛毛" ];
const obj = {};

console.log( Array.isArray(arr) );      // true
console.log( Array.isArray(person) );   // true
console.log( Array.isArray(obj) );      // false
```

## 總結

這邊先大概瞭解了物件型別的基礎了～至少會定義與增刪改查，物件型別這個坑還很深，我們現在才剛踏進去，明天先介紹函式（function），介紹完函式，我們再繼續把物件型別這個坑挖深！

## 參考資料

- [008 天 重新認識 JavaScript](https://www.tenlong.com.tw/products/9789864344130)
- [JavaScript Array 陣列操作方法](https://www.oxxostudio.tw/articles/201908/js-array.html)
