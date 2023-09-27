---
title: Day.6 「只要我想，我也能把 div 變 table！」 —— CSS display 屬性
date: 2021/09/15 22:00:00
image: https://i.imgur.com/ofgbXuv.png
categories:
    - [程式語言, 前端, CSS]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - CSS
description: 如同前面章節所說，一開始的標籤元素，很單調只有一行並沒有各式各樣的元素，是瀏覽器內建的樣式表賦予它該展示的樣子。所以我們可以把任何標籤變成任何你愛的樣子，當然不希望如此瞎搞！
---

![「只要我想，我也能把 div 變 table！」 —— CSS display 屬性](https://i.imgur.com/ofgbXuv.png)

如同前面章節所說，一開始的標籤元素，很單調只有一行並沒有各式各樣的元素，是瀏覽器內建的樣式表賦予它該展示的樣子。

![圖中，瀏覽器為 table 標籤賦予為 表格屬性](https://i.imgur.com/A0uiSrM.png)

所以我們可以把任何標籤變成任何你愛的樣子，當然不希望如此瞎搞！

能用標籤本身取代的冷門 display 屬性值暫且就不會介紹了，只介紹大家最常用的 display 屬性值。

## 常用的 display 屬性值

### inline & block 行內元素 與 區塊元素

這是大家最熟悉的屬性值了，相信不必我多說，你們也已經知道它的作用了

**值得**注意的是，HTML 標籤換行，在渲染的時候會自動變成一個空白，如下圖
![最基礎的 區塊元素 與 行內元素](https://i.imgur.com/mO39ScR.png)

### inline-block 行內區塊元素

上上篇盒模型中，有發現 inline 元素的垂直方向都無法推擠，這時 inline-block 出現了
![同時具有 inline 並排的特性，還擁有 block 垂直推擠的特性。](https://i.imgur.com/TI35bGk.png)
同時具有 inline 並排的特性，還擁有 block 垂直推擠的特性。

### none 隱藏

none 屬性，也是很常使用的屬性，它的作用就是把元素整個隱藏消失，常見的範例就是，關掉廣告的這個動作。

與它非常相似的屬性還有一個，很常被提起討論的是`visibility: hidden;`這個屬性，與`display: none;`相似，但它只是單純的隱藏，高度位置還是在那裡
![表面上隱藏，高度位置還是有占用](https://i.imgur.com/oQbYhBT.png)

### flex 彈性盒模型

**彈性盒模型**，目前最多人使用的屬性，方便易學的基礎排版，具有**一維**的概念，依靠父元素設定影響子元素**一個方向**的**排列對齊**。

![依照主軸進行布局](https://i.imgur.com/WcmxB4K.png)
*依照主軸進行布局*

### grid 網格模型

**網格模型**，近年來興起，許多瀏覽器開始慢慢支援，很多人想嘗試的屬性，與 flex 彈性盒模型有點像，不過是採取**二維**的概念，依靠父元素設定**表格般**影響子元素的布局。

現今也有很多 **CSS 框架**都有使用**格線系統**來進行排版，與網格模型個概念非常相近。

![個平面上，隨意布局盒模型](https://i.imgur.com/X9VTWRV.png)
*一個平面上，隨意布局盒模型。[Codepen 範例](https://codepen.io/vsfvjiuv-the-typescripter/pen/RwgjGWL)*

## 總結

光是 flex 彈性盒模型就有很多細節可以講， grid 網格模型更是複雜，預計是不會講 grid 網格模型，如果有多餘時間再考慮補充，明天將介紹最受大家喜愛的 flex 彈性盒模型。
