---
title: Day.7 「伸縮自在的愛～」 —— CSS 彈性盒模型 Flexbox
date: 2021/9/16 22:00:00
index_img: https://i.imgur.com/lSYvVfi.png
banner_img: https://i.imgur.com/lSYvVfi.png
categories:
    - [程式語言, 前端, CSS]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - CSS
excerpt: 要來介紹大家最愛用的 Flexbox 了，Flexbox 之所以被稱之為彈性盒，是因為可以隨著視窗的尺寸，改變自己布局的方式，使用起來非常彈性，且易於使用，所以深受大家喜愛。
---

# Day.7 「伸縮自在的愛～」 —— CSS 彈性盒模型 Flexbox

![CSS Flexbox](https://i.imgur.com/lSYvVfi.png)

## 為何稱為彈性盒？

要來介紹大家最愛用的 Flexbox 了，Flexbox 之所以被稱之為彈性盒，是因為可以隨著視窗的尺寸，改變自己布局的方式，使用起來非常彈性，且易於使用，所以深受大家喜愛。
![隨著容器跟著伸縮](https://i.imgur.com/ImmG3lU.gif)

## Flexbox 規則

要了解 Flexbox ，就要先了解最基礎簡單的 Flexbox 父容器規則。
![Flexbox 規則](https://i.imgur.com/73CcPV8.png)

當我們為**父容器**（藍框）添加 `display: flex;` 屬性後，其內部的子元件（灰色方形）將會以**主軸**（紅色箭頭），依序**排列**（紅色數字）與**分布**，並以**交錯軸**（綠色箭頭）讓子元件**互相對齊基準線**（方形上的綠色線）。

- 由**父容器**設定 `display: flex;`，影響子元件布局
- 根據**主軸**方向安排子元件**排列**方向與分布
- 根據**交錯軸**設定**對齊基準線**。

## 父容器的設定

### 怎麼主導子元件排列方向（flex-direction）

看完上面的規則後，我們發現有一個**主軸**負責控制排列方向與佈局。

- `flex-direction`預設的值是`row`，指水平排列
  ![row](https://i.imgur.com/ZrzZq2K.png)

- 當`flex-direction`值設`row-reverse`，指水平翻轉排列
  ![row-reverse](https://i.imgur.com/Pzm3WO5.png)

- 當`flex-direction`值設`column`，指垂直排列

- 當`flex-direction`值設`column-reverse`，指垂直翻轉排列

![column & column-reverse](https://i.imgur.com/ifPAjvP.png)

### 控制主軸是否換行（flex-wrap）

Flexbox 彈性盒有個特性，當沒有特別設定要換行時，它預設是會想盡一切辦法把子元件都塞**一行**，如下圖，正方形因為彈性盒的緣故，被壓縮成長方形。

![nowrap](https://i.imgur.com/Igogdcq.png)

當你設定`flex-wrap: wrap;`，塞不下的時候，它就會自動**換行**了
![wrap](https://i.imgur.com/Cf06taa.png)

當你設定`flex-wrap: wrap-reverse`，除了會自動換行，而且是**反向換行**。
![wrap-reverse](https://i.imgur.com/oM9iITZ.png)

### 控制主軸的布局（justify-content）

使用屬性`justify-content`，設定主軸布局

- `flex-start`，預設是這個，往主軸起始點對齊
- `flex-end`，往主軸末端對齊
- `center`，往主軸中央對齊
- `space-between`，平均分配主軸位置，貼齊兩端
- `space-around`，平均分配主軸留白的部分（頭尾留白處相加會與中間留白處相等，就像跑馬燈元素間距離相等）

![justify-content](https://i.imgur.com/rT9lwvQ.png)

### 控制一行，交錯軸的對齊（align-items）

使用屬性`align-items`，設定主軸布局

- `flex-start`，預設是這個，往交錯軸起始點對齊
- `flex-end`，往交錯軸末端對齊
- `center`，往交錯軸中央對齊
- `baseline`，依照內容文本對齊
- `stretch`，在沒寫死子元件大小下，子元件自動撐滿交錯軸。

![align-items](https://i.imgur.com/4cBX9XS.png)
*上圖數字代表行高倍率`line-height`，用來撐高以好展示效果*

### 控制多行，交錯軸的對齊（align-content）

當彈性盒子元件有換行時，才有作用，在單行時無作用！

- `flex-start`，預設是這個，往交錯軸起始點開始排列
- `flex-end`，往交錯軸末端開始排列
- `center`，往交錯軸中央開始排列
- `space-between`，平均分配交錯軸位置，貼齊兩端
- `space-around`，平均分配交錯軸留白
- `stretch`，平均分配交錯籌位置

![align-content](https://i.imgur.com/JRKnhSB.png)

## 子元素設定

已經了解 Flexbox 最常用的部分了，再來就是控制子元件的 flex，也是比較困難難懂精隨的部分，搞懂了，成功就離你不遠了！

### 利用 flex 來自動幫你安排大小

flex 總共又有劃分三個屬性

- `flex-grow`，負責管理**放大**這個部分，預設是 0（不會放大），當有多個子元件設定時，數字代表比例
  ![flex-grow](https://i.imgur.com/OL9HOd2.gif)

- `flex-shrink`，負責管理**縮小**這個部分，預設是 1 （隨父容器壓縮），設定為 0 時，則不會壓縮
  ![flex-shrink](https://i.imgur.com/FPK0nG7.gif)


- `flex-basis`，負責管理**基礎大小**的部分，有壓縮，就會有設置**基礎大小**，避免被壓太小。

- `flex`的**簡寫**方式，`flex: <grow> <shrink> <basis>;`，當只有寫一個值時，那個值會代表 `grow 值`

### 想來點不一樣的對齊方式？（align-self）

有時候想對**子元件**個別設定對齊方式，就可以個別對子元件設定`align-self`。

設定與`align-items`相似。

![align-self](https://i.imgur.com/GrhCydD.png)

### 我任性！就想自訂順序（order）

用來設定**順序***，預設為 0 ，數字越**大**越靠近**主軸末端**，反之越靠近**起始點**。
![order](https://i.imgur.com/jL4XZFa.png)

## 恭喜你！又多認識了一個垂直置中的好方法

盒模型那一篇已經介紹了使用 `mragin: 0 auto;` 來把元素置中，現在又多認識了 Flexbox，恭喜你又多認識了一個把元素置中的好方法了，前面有介紹 DOM tree ，認識到**文本**也是單獨一個 DOM 節點，我們就可以利用 Flexbox 來達到**水平垂直置中**的效果了！

## 總結

當初在學 Flexbox，主要是透過 六角學院副校長——**卡斯伯**的 [圖解：CSS flex屬性一點也不難](https://wcc723.github.io/css/2017/07/21/css-flex/) 學習的，讓我受益良多，另外也推薦兩款 Flexbox 小遊戲， [Flexbox Froggy](https://flexboxfroggy.com/) 與 [flex Pirate 海盜船](https://hexschool.github.io/flexbox-pirate/index.html#/)，對認識 Flexbox 效果滿好的，下一篇將進入我們的定位（Position）與浮動（float）章節
