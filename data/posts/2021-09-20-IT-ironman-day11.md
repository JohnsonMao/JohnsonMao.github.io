---
title: Day.11 「利用漸變效果，讓網頁不再死板！」 —— CSS Transform & CSS Transition
date: 2021/09/20 22:00:00
index_img: https://i.imgur.com/VoFpU6Q.png
banner_img: https://i.imgur.com/VoFpU6Q.png
categories:
    - [程式語言, 前端, CSS]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - CSS
excerpt: 現在我們會使用基本的偽類選擇器做效果了，但看到變化過程一閃而過、冷冰冰的，想增添更多漸變效果，讓動態效果可以更多變化、更平滑動感，就要使用我們的 transform 與 transition 這兩個屬性。
---

![「利用漸變效果，讓網頁不再死板！」 —— CSS Transform & CSS Transition](https://i.imgur.com/VoFpU6Q.png)

現在我們會使用基本的偽類選擇器做效果了，但看到變化過程一閃而過、冷冰冰的，想增添更多漸變效果，讓動態效果可以更多變化、更平滑動感，就要使用我們的 transform 與 transition 這兩個屬性。

## transform 是做什麼的？

transform 屬性是依靠 **GPU** 控制，修改 CSS 視覺模型的**空間維度**。

大多數的屬性值預設都是操控平面維度的 **X 軸** 與 **Y 軸**，如果要再加上第三維度 **Z 軸**，需要額外添加。

使用方法為`transform: 想進行控制的屬性值方法`，有多個屬性值可以用空白鍵或換行做區隔。

以下的動態圖，只是要區分元素與原本的差異，並不會有動態效果

### 進行平移的屬性值 translate

你會發現跟 **Position 定位元素**很相似，同樣都是移動元素，但他們不同的地方是，% 數參考的對象 與 GPU 的參與。**注意** 適當使用 GPU 可以減輕渲染負擔，過度使用 GPU 容易消耗過多記憶體。
![translate](https://i.imgur.com/nRz9ajW.gif)

- 在執行**動畫效果**時，Position 定位會觸發瀏覽器的 reflow 和 repaint，讓瀏覽器一直重新渲染畫面，動畫效果也因為最小單位 1px，感覺有一點卡卡的感覺。
  ![瀏覽器一直頻繁的 reflow 和 repaint](https://i.imgur.com/DadHR9C.gif)
  *瀏覽器一直頻繁的 reflow 和 repaint*
- 而使用 translate 平移執行動畫，則是透過 GPU 來控制，使用硬體加速，動畫效果也比較平順。
  ![依靠 GPU 不會觸發瀏覽器的 reflow 和 repaint](https://i.imgur.com/sVx7wS3.gif)
  *依靠 GPU 不會觸發瀏覽器的 reflow 和 repaint*

使用方法`transform: translate( X 軸, Y 軸 )`，當只有使用一個值，該值代表 X 軸，如果想使用 Z 軸，就要改用`translate3d(X 軸, Y 軸, Z 軸 )` 或 `translateZ( Z 軸 )`。

使用的值需要單位（px, %, em...），% 數是依照**自身長寬**當作參考，**Z 軸只能使用長度單位**（px, em...），因為深度沒有 % 數。

### 進行縮放的屬性值 scale

同樣會發現與 **寬高元素（height、width）** 很相似，而不同的地方也如同上面的例子。
![scale](https://i.imgur.com/mj3YMpu.gif)

使用方法`transform: scale( X 軸, Y 軸 )`，當只有使用一個值，該值代表整體的放大縮小，如果想使用 Z 軸，就要改用`scale3d(X 軸, Y 軸, Z 軸 )` 或 `scaleZ( Z 軸 )`。

使用的值為數字，`1` 為 1 倍大小，`.8` 為 0.8 倍大小

### 進行旋轉的屬性值 rotate

讓元素進行旋轉
![rotate](https://i.imgur.com/tJtkM2T.gif)

使用方法`transform: rotate( Z 軸 )`，依靠 **Z 軸**旋轉，如果想依靠 X 軸 或 y 軸，就要改用`rotateX( X 軸 )` 或 `rotateY( Y 軸 )`。

使用的值需要單位

- deg（一個圓有 360 度），應該是最多人用的
- gard（一個圓有 400 個梯度）
- rad（一個圓有 2π 弧度）
- turn（一個圓）

另外也可以使用 `rotate3d( X 軸, Y 軸, Z 軸, 角度)`，其中 XYZ 軸為**倍數**，每個倍數乘以角度來呈現。

### 進行傾斜的屬性值 skew

讓元素沿著軸線傾斜
![skew](https://i.imgur.com/AOmufkr.gif)

使用方法`transform: skew( X 軸, Y 軸 )`，當只有使用一個值，該值代表 X 軸，傾斜沒有 Z 值。

### 變形矩陣的屬性值 matrix

算是綜合了上面的平移、縮放與傾斜的語法。
語法：`matrix(X 軸縮放, X 軸平移, X 軸傾斜, Y 軸縮放, Y 軸平移, Y 軸傾斜)`
我個人是不常用，參數太多容易搞混。

## 恭喜你又學會新的置中方法了

前面在 Position 定位章節有提到，用 Position 定位置中 `top: 50%; left: 50%;` 會因為元素基準點是在左上角，導致左上角定位在中心，元素整體會呈現偏右下方。

這時藉由 `transform: translate(-50%, -50%);`，因為 % 數是參考自身長寬，藉由 `-50%` 來矯正偏移問題，讓元素呈現完美的置中。

## 總結

其實 transform 還有很多屬性方法還沒介紹，像是設定**基準點**、**定位視角**，這類更為抽象進階的語法，也許會放到之後補充的地方，今天就先介紹簡單常用入門的部分就好，下一個章節算是大家學 CSS 最想達成的**動畫**章節。

## 參考資料

- [淺析 CSS 的效能優化](https://www.796t.com/article.php?id=313455)
