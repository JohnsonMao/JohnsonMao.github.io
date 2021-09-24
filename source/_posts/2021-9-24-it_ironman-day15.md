---
title: Day.15 「條件設定好～讓程式判斷！」 —— JavaScript 條件判斷式
date: 2021/9/24 16:00:00
index_img: https://i.imgur.com/Zso8daX.png
banner_img: https://i.imgur.com/Zso8daX.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
excerpt: 前面學習了基礎的變數與運算子的使用，這些基礎往往是非常枯燥乏味的，還沒有與電腦有更進一步的互動，所以感受不到程式語言的魅力，而今天學習的條件判斷式就可以開始與電腦進行些微的互動！
---

# Day.15 「條件設定好～讓程式判斷！」 —— JavaScript 條件判斷式

![「條件設定好～讓程式判斷！」 —— JavaScript 條件判斷式](https://i.imgur.com/Zso8daX.png)

前面學習了基礎的變數與運算子的使用，這些基礎往往是非常枯燥乏味的，還沒有與電腦有更進一步的互動，所以感受不到程式語言的魅力，而今天學習的條件判斷式就可以開始與電腦進行些微的互動！

## 什麼是條件判斷式？

就「條件判斷」字面上的意思，由我們設定**條件**，讓電腦幫我們判斷是否執行後續程式碼。

## 判斷流程圖

在寫條件判斷式之前，通常會先思考這個條件設下的流程圖要怎麼規劃！

例如，判斷用戶資料是否有成年如下：
![判斷流程圖](https://i.imgur.com/8MzkGYV.png)

有的人喜歡在腦中規劃，有的人喜歡著手畫出來，也有的人喜歡利用線上軟體進行規劃，只要能讓自己規劃出流程、整理出思緒的都是好方法。

通常為了讓**大家**都能一下就看得懂，流程圖的形狀也都有定義，當然如果只有你自己看，你想要什麼形狀就什麼形狀。
![流程圖形狀表](https://i.imgur.com/3Dy8YqY.png)

我在這裡推薦一個可以製作流程圖的線上網站 [Whimsical](https://whimsical.com/)，至於如何使用，就自己好好摸索一下就懂了，我就不再這多加著墨了。

## if 條件判斷式結構

想好流程圖後，接著就是實踐了！
if 條件判斷式結構 `if ( 條件 ) { 達成條件執行這段程式碼 } else { 否則執行 else 後的程式碼 }` 就如上面例子：

```javascript
const age = 27;

if (age >= 18 /* () 內寫判斷條件 */) {
  /* 當符合條件就會執行這段 {} 內的程式碼 */
  console.log('你成年了！享受吧～')
} else {
  /* 否則就會執行 else 後，這段 {} 內的程式碼 */
  console.log('你未成年不能進入！')
}
```

### 簡化方式

當你的判斷條件執行的結構非常簡單，執行程式只有單純的一行，可以省略 `{}`
以上面作為範例：

```javascript
const age = 27;

if (age >= 18)
  console.log('你成年了！享受吧～') // 只有單純一行可以省略 {}
else
  console.log('你未成年不能進入！') // 只有單純一行可以省略 {}
  
/* 甚至更簡化 */

if (age >= 18) console.log('你成年了！享受吧～') // 只有單純一行可以省略 {}
else console.log('你未成年不能進入！') // 只有單純一行可以省略 {}
```

當然不推薦貿然使用，一切依照**可讀性**為準！

### 多個條件判斷式

除了判斷是否成年外，也能使用 `else if ()` 來達成多個條件來判斷處在哪個年齡階段：

```javascript
const age = 27;
let ageGrades = '';

if (age >= 65 /* () 內寫判斷條件 */) {
  ageGrades = '老年';
} else if (age < 65 && age >= 18) {
  ageGrades = '青壯年';
} else {
  ageGrades = '幼年';
}

console.log( ageGrades ) // "青壯年"
```

#### 此外不一定要寫 else

有時候條件判斷式只是想判斷是否有達成條件，沒達成條件不會執行程式碼，就可以省略 else 後面這段，如：

```javascript
if (ageGrades === '青壯年') alert('你現在正處在人生最顛峰的階段～加油！') 
```

## 三元運算子（條件運算子）

這個跟 if 條件判斷式非常相似，三元運算子結構 `( 條件 ) ? 達成條件回傳這段 : 未達成回傳這段`，**需注意** 它是運算子！表達式會回傳值！所以很常直接進行判斷賦值。如下：

> 什麼是表達式？ 表達式會自動回傳結果，最常見的就是運算子
> 除了表達式還有別的嗎？ 還有陳述式，與表達式相反，不會回傳結果，主要是執行程式碼的片段，例如：if 條件判斷式

```javascript
const age = 27;

let adult = (age >= 18) ? true : false; // 這是為了展示條件判斷後直接賦值

adult ? console.log('你成年了！享受吧～') : console.log('你未成年不能進入！'); // "你成年了！享受吧～"

/*  當然這段其實可以直接簡化成  */
(age >= 18) ? console.log('你成年了！享受吧～') : console.log('你未成年不能進入！'); // "你成年了！享受吧～"
```

## switch 條件判斷式

switch 條件判斷式，非常適合處理條件明確，判斷流程長的條件判斷式了，這邊就使用 [008 天 重新認識 JavaScript](https://www.tenlong.com.tw/products/9789864344130) 所舉的例子吧！
一年有 12 個月，4個季節，從我們熟知的 if 慢慢優化到 switch：

### 使用 if 條件判斷式

這是個非常直覺的用法！

```javascript
if ( month >= 1 && month <=3 ) {
  console.log('春天');
} else if ( month >= 4 && month <=6 ) {
  console.log('夏天');
} else if ( month >= 7 && month <=9 ) {
  console.log('秋天');
} else if ( month >= 10 && month <=12 ) {
  console.log('冬天');
} else {
  console.log('月份錯誤');
}
```

但會發現判斷條件有點長，容易寫錯不好維護，
於是簡化條件，先定義季節代號的變數，並利用 `Math.ceil()` 小數點無條件進位的方法簡化。
這樣利用變數管理，更易於維護，也比較**不容易寫錯**條件導致 bug。

```javascript
const seasonType = Math.ceil( month / 3 );

if ( seasonType === 1) {
  console.log('春天');
} else if ( seasonType === 2) {
  console.log('夏天');
} else if ( seasonType === 3) {
  console.log('秋天');
} else if ( seasonType === 4) {
  console.log('冬天');
} else {
  console.log('月份錯誤');
}
```

但這也是有缺點，判斷式寫太長，效率會不太好，還有更好的優化方法，那就是使用我們的 switch 條件判斷

### 使用 switch 優化

switch 的語法是：

```javascript
/* switch 是關鍵詞 */
switch ( Math.ceil( month / 3 ) /* 輸入值 */ ) {
  case 1: // 比對值
    console.log('春天'); // 輸入值 與 比對值 "全等"才會執行這段
    break; // 中斷判斷跳出
  case 2:
    console.log('夏天');
    break;
  case 3:
    console.log('秋天');
    break;
  case 4:
    console.log('冬天');
    break;
  default:
    console.log('月份錯誤');
    break;
}
```

是不是更簡單清楚明瞭了呢！

switch 重點：

1. **輸入值**可以是變數，也可以是表達式，只要得出的值有辦法對應比對值就可以了
2. **輸入值** 與 **比對值**必須**全等**才行，屬於嚴格比對！
3. `break` 通常情況下會加上去，不然判斷不會自己中斷，會從比對成功的程式碼一路執行下去，直到碰到 `break`
4. `default` 主要功能是，當條件都沒辦法達成時，會執行這段，與 `else` 一樣不一定要添加，一個 switch 只能使用**一個**

## 總結

人是有惰性的，不常使用的語法有時候會忘記！
以前的我就不常使用 switch，心想反正 if 就能用了，~~我就懶~~，後來仔細想想，既然處理的事情差不多，那它存在一定有它的意義在，在好奇心驅使下，去查閱了 if 與 switch 有什麼不同！查了才發現～原來在判斷流程長的時候，使用 switch 的效能會比使用 if 還來的好，也更容易維護，於是能使用 switch 的時候，我都盡量使用，能簡化不失閱讀性，就盡量簡化，把工程師的懶，發揮到極致！

## 參考資料

- [008 天 重新認識 JavaScript](https://www.tenlong.com.tw/products/9789864344130)
