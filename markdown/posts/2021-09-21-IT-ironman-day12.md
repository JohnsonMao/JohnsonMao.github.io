---
title: Day.12 「來為網頁添加動畫吧！」 —— CSS 動畫（animation）
date: 2021/09/21 22:00:00
index_img: https://i.imgur.com/Z0lYvKC.gif
banner_img: https://i.imgur.com/Z0lYvKC.gif
categories:
    - [程式語言, 前端, CSS]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - CSS
excerpt: 現在我們會使用具有互動性的簡單漸變效果了，接著要來試著讓網頁能增添更多活力，不需要我們操作，就會自動播放動畫效果。
---

![「來為網頁添加動畫吧！」 —— CSS 動畫（animation）](https://i.imgur.com/Z0lYvKC.gif)

現在我們會使用具有互動性的簡單漸變效果了，接著要來試著讓網頁能增添更多活力，不需要我們操作，就會自動播放動畫效果。

## 什麼是 animation？

animation 就如同字面上的意思，動畫賦予了 CSS 更多的可能性，讓畫面可以更加生動活潑，以往要透過 Javascript 才能完成的效果，如今 CSS 也能幫忙分擔一些畫面效果，記住一句話，能使用 CSS 完成效果，就盡量使用 CSS。

## CSS animation 起手式

### 關鍵影格 keyframes

一開始的起手式當然就是先定義一個動畫效果，使用方法為`@keyframes <name> { animation_css }`，有在製作動畫影片的應該對 keyframes（關鍵影格） 這個字非常熟悉，藉由著個語法，來讓瀏覽器運算產生動態畫面，其中`<name>`可以自定義動畫名稱，`{}`內為動畫執行過程，執行過程可以用 `0%` ～ `100%`，或使用關鍵字 `from` & `to`。

例如，想讓封面圖的方塊旋轉，可以使用上一章的 `transform: rotateY()` 依靠 Y 軸為軸心進行旋轉：

```css
@keyframes rotate {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(360deg);
  }
}
```

## 套用 CSS animation

### animation-name

動畫名稱，**注意** 這個一定要設置，不然瀏覽器不知道你要套用的動畫名稱是什麼，~~除非它會通靈~~，以上面關鍵影格為例`animation-name: rotate;`

### animation-duration

動畫動完一次所需時間，**注意** 這個也一定要設置，因為預設是 0，~~不會動的動畫還叫動畫~~？以上面關鍵影格為例`animation-duration: 5s;`，需 **注意** 單位名稱一定要打，s 代表 秒，ms 代表 毫秒。

### animation-delay

動畫延遲多久時間開始播放，這個看需求設置，與上面的設定方法雷同。

### animation-iteration-count

動畫循環幾次，這個也是看需求設置，預設是 1，執行 1 次的意思。

#### 想要無限循環多次？

想要無限循環多次，可以設定 `infinite`，以上面關鍵影格為例`animation-iteration-count: infinite;`

### animation-timing-function

動畫加速度的函式，預設是 `ease`

![animation-time-function](https://i.imgur.com/j0hxXeA.gif)
[animation-time-function Codepen](https://codepen.io/vsfvjiuv-the-typescripter/pen/vYZjYZQ?editors=0100)

#### 具有加減速的速度函式

這個動態效果比較流暢

- ease
- ease-in
- ease-out
- ease-in-out

![具有加減速的速度函式圖](https://www.oxxostudio.tw/img/articles/201803/css-animation-04.jpg)
（[圖片來源](https://www.oxxostudio.tw/articles/201803/css-animation.html)）

#### 線性速度函式

不具有加減速

- linear 線性，此封面範例就是使用這個 `animation-time-function: linear;`

![線性函式圖](https://www.oxxostudio.tw/img/articles/201803/css-animation-03.jpg)
（[圖片來源](https://www.oxxostudio.tw/articles/201803/css-animation.html)）

#### 影格速度函式

就像膠片影格一樣，一步一步展示變化過程，int 設置正整數，數字越大越流暢。
第二個參數，start 會忽略第 0 秒的開始動畫，end 會忽略最後一秒的結束動畫

- steps(int,start/end)

#### 自定義速度函式（貝茲曲線）

這就比較複雜了，由四個參數來設置貝茲曲線，設置的好會像皮球彈跳一樣自然來回，~~設置不好就會失控~~。

- cubic-bezier(n,n,n,n)

### animation-direction

控制動畫是否反轉播放，預設值為 `normal` 正常播放

- normal，正常播放
- reverse：反轉播放，從 100% 到 0% 反著播。
- alternate：上面兩個的結合，正反播放輪替，先正後反，如此循環，當播放次數設 1 時，就正常播放
- alternate-reverse：與 alternate 的相反，變成先反後正，當播放次數設 1 時，就反轉播放

![此圖範例為使用 animation-directon: alternate;](https://i.imgur.com/pBGvsjp.gif)
*此圖範例為使用 `animation-direction: alternate;`，[Codepen](https://codepen.io/vsfvjiuv-the-typescripter/pen/wvejaWj)*

## 簡寫方式

根據上面封面的動畫效果，原本是這樣使用

```css
animation-name: rotate;
animation-duration: 5s;
animation-iteration-count: infinite;
animation-time-function: linear;
```

可以看到一直反覆的寫 `animation-` 開頭，而簡寫方式非常簡單

```css
animation: rotate 5s infinite linear;
```

直接用 `animation` 就可以設定所有動畫設定了，需**注意** 動畫**名稱** 與 **時間** 是一定要寫的，如果要設置 delay，第一個時間參數會是 持續時間，第二個時間參數會是 延遲時間！

## 總結

平面動畫寫起來還算簡單，很有成就感，如果要涉及到 3D 層面的話，又會需要多設定一些東西，如同前一篇所講，視角與定位點，會更加抽象，現階段 CSS 已經告個段落了！明天就要進入我們的 Javascript 章節了！

## 參考資料

- [完整解析 CSS 動畫](https://www.oxxostudio.tw/articles/201803/css-animation.html)
