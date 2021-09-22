---
title: Day.13 「初步學習 Javascript 基礎篇」 —— Javascript 宣告變數 與 基本型別
date: 2021/9/22 16:00:00
index_img: https://i.imgur.com/wh1ZT6h.png
banner_img: https://i.imgur.com/wh1ZT6h.png
categories:
    - [程式語言, 前端, Javascript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - Javascript
excerpt: Javascript 是個弱型別語言，在宣告變數時，不像其他語言需要先指定型別那麼嚴謹，宣告的變數名會對應記憶體位子，把其值存入記憶體中，之後要取出值，只要藉由變數名，就能找到對應的值。

---

# Day.13 「初步學習 Javascript 基礎篇」 —— Javascript 宣告變數 與 基本型別

![Javascript 宣告變數 與 基本型別](https://i.imgur.com/wh1ZT6h.png)

前面已經大略介紹了 HTML 和 CSS 的入門知識了，接著我們要來認識 Javascript，來為我們的網頁添加更多邏輯互動。

## 怎麼宣告變數？

Javascript 是個**弱型別**語言，在宣告變數時，不像其他語言需要先指定型別那麼嚴謹，宣告的**變數名**會對應**記憶體位子**，把其**值**存入**記憶體中**，之後要取出值，只要藉由變數名，就能找到對應的值。

![宣告變數](https://i.imgur.com/J6BjmqI.png)
![存入記憶體中](https://i.imgur.com/SAFuUzt.png)

要幫變數命名也是有規則的，首先**保留字**（如：`class`）與**關鍵字**（如：`var`），不能用於變數名，變數名**不能由數字作為開頭**，且變數名有**大小寫之分**，可以使用`$`、`_`在名稱中。常見的命名法為**駝峰命名法**，如：`petName`、`pet_name`。

目前宣告方式有 3 個（含 ES6）

> 什麼是 ES6？ ES6 正式名稱為 ECMAScript 2015，是第**六**版 ECMAScript，因此簡稱 ES6。
> ES6 增加了原本 Javascript 沒有的語法，能更加方便使用與維護，但有些瀏覽器兼容性可能不好（~~如：IE~~）

- `var`，Javascript 最原始的宣告方法，使用起來很簡單暴力，屬於**全域宣告**，因為容易汙染全域變數，所以目前比較少使用了。
- `let`，ES6 新增的宣告方法，`let` 與 `var` 最大的不同就是**區域作用域（block scope）**，比較不會有汙染問題。
- `const`，ES6 新增的宣告方法，`const` 最大的特色是屬於**常數宣告**，常數宣告的意思是不能隨意改值，降低不小心更改所導致的 bug，**需注意** 因為是常數宣告，無法隨意改值，所以使用常數宣告**一定要賦予值**，否則會報錯。

> 何謂常數？ 就像是圓周率 π 就是數學常數 3.14159，並不會隨意更改。

## 變數的基本型別

Javascript 的基本型別

- string 字串型別，這個型別很簡單，只要是使用 `"` 、 `'` 包起來的就是字串型別，另外 ES6 還新增了樣板字面值 `‵`，使用起來更加方便靈活，還能套用變數，**注意** 包起來的符號要一樣的才可以。
  - `"string"` 頭尾都是使用 `"`
  - `'string'` 頭尾都是使用 `'`
  - `'string"` 交錯使用會**報錯**。
  - 如果字串內要使用 `'` 則需要使用 `"` 來包，如：`"I'm Mao"`，反之亦然。
  - ES6 新增的樣板字面值，`‵string ${ 變數名 }‵` 頭尾都使用 `‵`，要使用變數可以在裡面使用 `${}` 來使用。

- number 數字型別，這個型別代表數字，以下這些都是數字型別
  - 不管是正負數、小數點都是。（如：0, 9, -8, 7.6）
  - `Infinity`（無限大）
  - `-Infinity`（無限小）
  - `NaN`（Not a Number，非數字）

- boolean 布林值，這個值就非常的單純許多，只有 true 與 false，這兩個值，主要是使用在判斷式中，在 Javascript 中，**任何值都能轉換成布林值**。

- undefined 未定義型別，只有一個值 undefined，代表這個變數**還沒定義型別**。

- null 空值，只有一個值 null ，代表這個變數**目前定義為沒有值**。

- object 以上基本型別以外的都是**Object 物件**，物件這個東西比較複雜，我們之後在細細品味。

## 如何知道變數的型別？

可以使用 Javascript 中用來判斷型別的運算符 `typeof`，使用方法如下

```javascript
var a;
let n = null;

typeof "I'm Mao"; // string
typeof NaN;       // number
typeof true;      // boolean
typeof a;         // undefined
typeof n;         // object
typeof {};        // object
typeof [];        // object
```

欸～這時會發現奇怪的事情，null 給出的型別怎麼是 object 呢？ 這其實是一開始 Javascript 設置實作時產生的 bug！

> Javascript 的值是由一個表示**型別**的標籤，與實際內容的**值**所組成。
> 由於物件型別標籤是 **0**，而 null 代表的是空值（通常以 0x00 表示），導致物件與空值的標籤搞混，而產生的結果。
> 內容取自 [008 天 重新認識 Javascript](https://www.tenlong.com.tw/products/9789864344130)

既然 Javascript 已經不打算修復這個 bug 了（應該說一改會牽動到很多東西，就乾脆不改了），我們就 ~~想像 null 是空物件吧~~，實際上並不是唷！

## 如何轉型別？

有的時候我們宣告變數使用`var a = "1"`，那麼 `a` 是的型別是什麼？ 聰明的你應該馬上就知道是字串（string）型別了吧！
那麼如果想要把 `a` 轉型成數字（number）型別，就可以使用轉換型別的語法，剛好來介紹一下轉換型別的語法吧！

轉換型別語法：

- 轉換成字串（string）型別：
  - `toString()`，使用方法`a.toString()`就能轉換成字串型別，但遇到 null 或 undefined **會報錯**
  - `String()`，使用方法`String(a)`就能轉換成字串型別，遇到 null 或 undefined **也不會報錯**
  - 變數直接加空字串，使用方法 `a + ''` 就能轉換成字串型別。
- 轉換成數字型別
  - `Number()`，任意資料型別轉換成數字型別。
  - `parseInt()`，將字串或數字轉成整數。
  - `parseFloat()`，將字串或數字轉成浮點數。
  - 變數前面使用 `+` 一元運算子，使用方法 `+a` 就能轉換成數字型別。
- 任何型別都可以轉換成 **布林值**
  - true
    - 任何非空字串的值
    - 任何非 0 的數字
    - 任何物件
  - false
    - 空字串（`''` 和 `""`）
    - 數字 0 和 NaN
    - null 和 undefined

## 總結

終於開始學習程式語言了，今天認識了基礎的宣告變數與型別判斷，蠻推薦 Kuro 大大寫的 [008 天 重新認識 Javascript](https://www.tenlong.com.tw/products/9789864344130)，寫得十分有趣清楚，下一篇章先進入我們的運算符篇。

## 參考資料

- [008 天 重新認識 Javascript](https://www.tenlong.com.tw/products/9789864344130)
