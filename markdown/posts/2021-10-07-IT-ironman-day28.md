---
title: Day.28 「Promise 初體驗～」 —— ES6 Promise
date: 2021/10/07 14:30:00
index_img: https://i.imgur.com/BnUYCE5.png
banner_img: https://i.imgur.com/BnUYCE5.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
excerpt: 我們前面已經學習了回調函式（Callback Function）與構造函式（Constrcutor），而 Promise 是 ES6 新增用來解決非同步回調地域的新語法，同時也是一個構造函式！
---

![「Promise 初體驗～」 —— ES6 Promise](https://i.imgur.com/BnUYCE5.png)

我們前面已經學習了**回調函式**（**Callback Function**）與**構造函式**（**Constrcutor**），而 Promise 是 ES6 新增用來解決**非同步回調地域**的新語法，同時也是一個構造函式！

## 非同步

在這裡我們要先了解到什麼是非同步！相信大家應該都聽過最好理解的範例，那就是用餐廳來做範例！

同步的概念就像是：服務生接收點餐 → 通知廚房有餐 → 廚房完成餐點 → 結帳 → 接下一位客人
一步一步做下去，優點是不易出錯，但缺點也非常明顯，效率非常差。

而非同步的概念：服務生接收點餐 → 通知廚房有餐 → 結帳 → 接下一位客人 → ... → 廚房完成餐點一起給客人
能夠把需要先執行的優先執行，優點就是效率好，但缺點就是跟同步比起來，維護比較麻煩。

而在我們介紹定時器時，就有體現出**非同步**的狀態。

```javascript
function order() {
    console.log("點餐");
  
    (function making() {
        console.log("開始製作");

        (function checkout() {
            console.log("結帳");
        })();
        setTimeout(()=>{
            console.log("餐點完成");
        }, 1000)
    })();
}

order();
order();

/*
    "點餐"
    "開始製作"
    "結帳"
    "點餐"
    "開始製作"
    "結帳"
    "餐點完成"
    "餐點完成"
*/
```

這時就有點看到**回調地獄**（**Callback Hell**）的影子了！這就是它**不容易維護**的部分

- 不易閱讀
- 處理異常處理不方便

而 Promise 改善了回調地獄的問題。

## ES6 以前

在還沒有 ES6 前，處理 AJAX 與 計時器的時候，都是直接使用回調函式來處理**非同步事件**
這裡用抽獎為例

```html
<!-- HTML -->
<button id="btn">點我抽獎</button>
```

```javascript
const btn = document.getElementById("btn");  // 獲取按鈕 DOM

/*  隨機數函式  */
function randomNum (m, n) {
  return Math.ceil( Math.random() * (n - m + 1)) + m - 1;
}

btn.addEventListener("click", function(){
  // 設定按按鈕後一秒後抽獎
  setTimeout( function () {
    let n = randomNum(1, 100);  // 1~100 隨機數
    if ( n <= 30 ) {
      console.log("恭喜你中獎了！你的中獎數字是" + n);  // 30% 中獎率
    } else {
      console.error("銘謝惠顧～你的數字是" + n)
    }
  }, 1000)
})
```

## Promise

在 ES6 之後，可以透過 Promise 來包裝程式碼，
而使用 Promise 的方式，與構造函式的使用方式類同，而參數帶入的是**函式**，帶入的函式內會有**兩個參數** `resolve` 、 `reject`。

```javascript
const p = new Promise( (resolve, reject) => {
  // ...
})
```

這兩個參數本身也是函式，一個代表**解決**，一個代表**拒絕**，函式的參數可以進行傳遞。

```javascript
const p = new Promise( (resolve, reject) => {
  if ("成功") {
    resolve( "成功" );  // 成功使用 resolve 函式，代表這個 Promise 物件的狀態是成功的
  } else {
    reject( "失敗" );    // 失敗使用 reject 函式，代表這個 Promise 物件的狀態是失敗的
  }
})
```

以上面的抽獎例子做修改。

```javascript
/* 修改事件監聽，進行 Promise 包裝 */

btn.addEventListener("click", function(){

  const p = new Promise((resolve, reject) => {  // Promise 包裝
    
    setTimeout(() => {
      let n = randomNum(1, 100);  // 1~100 隨機數
      if ( n <= 30 ) {
        resolve(n);  // 將 Promise 物件設定為"成功" n 作為資料參數傳遞出去
      } else {
        reject(n);   // 將 Promise 物件設定為"失敗" n 作為資料參數傳遞出去
      }
    }, 1000)
    
  });
})
```

這樣就包裝好了，但你會發現，奇怪怎麼沒有效果了？
那是因為還要調用 `then` 方法，來接收成功或失敗的資料，一樣可以接收兩個參數，兩個參數分別代表**成功**與**失敗**的函式，而成功與失敗的函式可以靠參數傳遞資料。

### then

```javascript
p.then((data)=>{
  console.log("恭喜你中獎了！你的中獎數字是" + data);
},(err)=>{
  console.error("銘謝惠顧～你的數字是" + err)
})
```

你可能覺得，好像沒有方便到哪裡呀～還要另外用 `then` 來調用！
那是因為我們這個範例還很簡單，沒有到 Callback Hell 的程度，當資料越來越複雜，就會形成 Callback Hell。

```javascript
// node.js 資料串接
data.readFile('./data/a.text', (err, data1) => {
    data.readFile('./data/b.text', (err, data2) => {
        data.readFile('./data/c.text', (err, data3) => {
            data.readFile('./data/d.text', (err, data4) => {
                let result = data1 + data2 + data3 + data4;
                console.log(result)
            })
        })
    })
})
```

### catch

而 `Promise` 只要包裝好了，接下來只要使用 `then` 來進行連續調用串接，不會讓程式碼越來越往右推移。
此外大多數情況，也不會刻意接失敗的資料，可以依靠 `catch` 來進行最後**失敗**時的處理

```javascript
// 先在最外層進行 Promise 包裝
const p = new Promise((res,rej) => {
  data.readFile('./data/a.text', (err, data) => {
    res(data);
  })
})
// 使用 then 串接
p.then( val => {
  return new Promise((res, rej) => {
    data.readFile('./data/b.text', (err, data) => {
      res([val, data]);
    })
  })
}).then( val => {
  return new Promise((res, rej) => {
    data.readFile('./data/c.text', (err, data) => {
      val.push(data);
      res(val)
    })
  })
}).then( val => {
  console.log(val)  // 成功使用 then
}).catch( err => {
  console.error("串接失敗！")  // 失敗使用 catch
})
```

## 總結

雖然**短期**這樣看，Promise 寫起來好像沒有 Callback 快，但它**解決了長期的資料變龐大**的時候，所產生的**回調地獄**，Promise 只是**向下**添加程式碼，而 Callback Hell 則是一直**往右**推移程式碼，Promise 還有很多方法還沒講到，目前只是初體驗！

## 參考資料

- [008 天 重新認識 JavaScript](https://www.tenlong.com.tw/products/9789864344130)
- [JavaScript Promise 全介紹](https://wcc723.github.io/development/2020/02/16/all-new-promise/)
