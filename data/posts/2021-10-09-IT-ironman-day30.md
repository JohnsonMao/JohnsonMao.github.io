---
title: Day.30 「什麼！？ Promise 的語法糖？」 —— ES8 Async & Await
date: 2021/10/09 13:30:00
image: https://i.imgur.com/YhGvJWy.png
categories:
    - [程式語言, 前端, JavaScript]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - JavaScript
description: ES8 新增了 async 與 await 兩個語法，這兩個語法也是為了更方便解決非同步的語法，可以說是 Promise then 的語法糖。
---

![「什麼！？ Promise 的語法糖？」 —— ES8 Async & Await](https://i.imgur.com/YhGvJWy.png)

ES8 新增了 `async` 與 `await` 兩個語法，這兩個語法也是**為了更方便**解決非同步的語法，可以說是 Promise `then` 的語法糖。

## async

`async` 的使用方法，是在要使用的函式前面加上，如： `async function fn(){}`，而它的回傳值為 Promise 物件。

```javascript
async function fn() {
  return "我成功了！"
}
const result = fn();
console.log(result);
```

![Promise 物件](https://i.imgur.com/qF29dB2.png)

可以看的出來是 Promise 物件，`return` 的資料會在 `[[PromiseResult]]` 裡，而 `fulfilled` 代表正確執行完

但正常來說，我們不會把資料寫死，我們通常會 `return` 一個新的 Promise 用來判斷成功或失敗

同樣我們可以使用 `then` 與 `catch` 來抓成功或失敗的資料

```javascript
async function fn() {
  return new Promise((res, rej) => {
    if("達成條件") {
      res("成功")
    } else {
      rej("失敗")
    }
  })
}

const result = fn();

result.then( data => {
  console.log(data);
}).catch( err => {
  console.warn(err);
})
```

## await

光看 `async` 可能還感覺不優點，當學完 `await` 後，就會覺得原來還可以這麼簡單！

- `await` 必須要放在 `async` 函式內
- 通常右邊表達式會銜接 Promise 物件
- `await` 返回的是 Promise 成功的值
- `await` 的 Promise 失敗了，就會拋出異常，可以通過 `try{}catch(){}` 處理

獲取到成功的值

```javascript
const p = new Promise((res, rej) => {
  res("成功");
})

async function fn(){
  let result = await p;  // 接收 Promise 返回成功的值
  console.log(result);
}

fn();  // "成功"
```

通過 `try{}catch(){}` 獲取到失敗的值

```javascript
const p = new Promise((res, rej) => {
  rej("失敗");
})

async function fn(){
  try {
    let result = await p;  // 接收 Promise 返回成功的值
    console.log(result);
  } catch(err) {
    console.warn(err);
  }
}

fn();  // "失敗"
```

## 運用在 AJAX 上

AJAX 是 Asynchronous JavaScript and XML 的縮寫，也是前端必學的技能，由於 AJAX 技術比較複雜，沒辦法三言兩語的快速介紹，本篇會著重在 `async` 與 `await` 運用上。

先來包裝 AJAX 請求

```javascript
function sendAJAX (url) {
  return new Promise((res, rej) => {  // Promise 包裝
    const xml = new XMLHttpRequest();  // 創建 XML 物件
    xml.open("GET", url);  // GET 請求
    xml.send();  // 發送
    xml.onreadystatechange = function(){
      if( xml.readyState === 4 ) {  // 讀取處理階段
        if( xml.status >= 200 && xml.status < 300){  // 狀態碼
          res(xml.response);  // 成功
        } else {
          rej(xml.status);    // 失敗
        }
      }
    }
  })
}
```

包裝好了我們就可以使用 AJAX，這裡使用政府提供的 [動物認領養的 API](https://data.coa.gov.tw/api.aspx#operations-tag-%E5%AF%B5%E7%89%A9) 進行串接

先使用 `then` 方法來實作

```javascript
const ANIMAL_URL = "https://data.coa.gov.tw/api/v1/AnimalRecognition/"

sendAJAX( ANIMAL_URL ).then( data => {
  console.log(data);  // 可以獲取到 JSON 檔案
}, err => {
  console.warn(err);
})
```

在來使用 `async` 與 `await` 來實作看看

```javascript
async function fn(){
  try {
    let result = await sendAJAX( ANIMAL_URL );  // 接收 AJAX
    console.log(result);
  } catch(err) {
    console.warn(err);
  }
}
fn();    // 可以獲取到 JSON 檔案
```

一樣也能實現想要的效果，雖然這裡看不出來優勢，但如果是要接收**複數**的 AJAX，`async` 與 `await` 會更加方便一些

```javascript
async function fn(){
  try {
    let result = await sendAJAX( ANIMAL_URL );   // 接收領養動物 AJAX
    let weather = await sendAJAX( WEATHER_URL ); // 接收天氣預報 AJAX
    console.log(result);
  } catch(err) {
    console.warn(err);
  }
}
fn();    // 可以獲取到 JSON 檔案
```

## 總結

學會了 `async` 與 `await` 後，配合 axios 套件，簡直太方便了！

## 完賽心得

終於完賽 30 天鐵人賽了！一路下來有點抖，原本有預先囤兩篇文章做緩衝，結果中秋連假一個不小心把扣打消耗掉一篇，於是後面每天都在趕隔天的文章，想著如何介紹才能有趣易懂！

這次的文章安排，其實都是在補足我個人學習還不太了解或面試可能會問的地方，所以文章學的內容可能會跳太快～

果然 30 天要把前端技能塞好塞滿，還是有點心有餘而力不足呀，也很意外沒想到還有人會訂閱我的文章，真是**太感動**了！

很幸運的是能遇到願意跟我組隊的團隊，是在參加六角學院活動時，臨時起意組成的團隊，雖然沒有什麼交集，但有跟人一起參與鐵人賽就更有動力，夥伴都在努力撐了，我怎麼能輕言放棄呢！

在此謝謝各位觀看我的文章，我有利用 Hexo 套件新建自己的 [部落格](https://johnsonmao.github.io/)，歡迎大家來參觀，近期**可能**不會出新文章，不過應該會把 [舊筆記](https://hackmd.io/@JohnsonMao/Front-end/%2F1aO7EIBfRXeym0AisOMRmQ) 翻新後放在部落格上，而我要繼續趕我的 Side Project 了～

毛毛在此下台一鞠躬！我們明年鐵人賽見～
