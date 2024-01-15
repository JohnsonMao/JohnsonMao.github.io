---
title: Day.4 「CSS 基礎中的基礎！」 —— CSS 盒模型 box-model & 距離單位
date: 2021/09/13 22:00:00
image: https://i.imgur.com/v6IIogk.png
categories:
    - [程式語言, 前端, HTML]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - HTML
description: 人是視覺動物，當網頁架構用得差不多了，想自己安排布局，會開始想辦法把網頁變得更漂亮。
---

![「CSS 基礎中的基礎！」 —— CSS 盒模型 box-model & 距離單位](https://i.imgur.com/v6IIogk.png)

## 人是視覺動物

當網頁架構用得差不多了，想自己安排布局，會開始想辦法把網頁變得更漂亮。
Google Chrome 很好用，有提供開發者工具給我們除錯，點開 elements 標籤最下面會有個方形的圖案。

![盒模型 box-model](https://i.imgur.com/JVqvJ0K.png)

這就是我們今天的主角 —— **CSS** 的基礎**盒模型 box-model**

## 什麼是 CSS？

CSS 是 Cascading Style Sheets 的簡寫，中文翻譯為階層式樣式表。
名字內有階層兩個字，顧名思義，他可以使用多個選擇器組合，來達到階層式的管理樣式。

### 如何使用 CSS？

先教兩個最**簡單**最**基本**的 CSS 使用方法。
![最簡單的 CSS 使用方法](https://i.imgur.com/mvfQaQr.png)

- 在 `<head>` 標籤內添加 `<style>` 標籤，如**紅色框**，標籤內使用你要套用 CSS 樣式的標籤名，如**橘色框**，在裡面撰寫屬性值，如**紅色框內的橘色框**。

- 或著直接在標籤內添加 `style` 屬性，並在裡面賦予屬性值，如**綠色框**。

## 盒模型

盒模型能幫助我們更加了解如何操控網頁並進行排版。
每個標籤都有獨立的盒模型，看盒模型我們可以觀察到有三個英文單字，四個顏色

- 紅色：`margin`，外邊距，可以想成與下一個標籤的距離
- 橘色：`border`，邊框，就是內容的外框
- 綠色：`padding`，內邊距，可以想成內容與外框的留白距離
- 藍色：內容

### 距離單位

在學習盒模型語法時，必須先了解 CSS 的距離單位。

#### 不管在哪都固定大小的單位

- px 是絕對單位，為螢幕中最基礎單位，1px 代表 1 個點，如下圖：字的大小 24px，固定在視窗內佔 24 位元的大小
- rem 是相對單位，每個**元素**都依據**根元素**的 px 值乘以**倍數**，如下圖：字的大小 1.5rem，固定比祖先大 1.5 倍的大小，瀏覽器內建字體原始大小為 16px。

#### 取決於父元素單位大小的單位

- em 是相對單位，每個**子元素**都依據**父元素**的 px 值乘以**倍數**，如下圖：字的大小 1.5em，比老爸大 1.5 倍。
- % 是相對單位，每個**子元素**都依據**父元素**的 px 值乘以**百分比**，如下圖：字的大小 150%，比老爸大 150 %。

#### 取決於視窗大小的單位

- vh 是相對單位，每個**元素**都依據**視窗**的（像素高度 / 100）乘以倍數，如下圖：字的大小 5vh，視窗的 1 / 20 **高**的大小。
- vw 是相對單位，每個**元素**都依據**視窗**的（像素寬度 / 100）乘以倍數，如下圖：字的大小 5vw，視窗的 1 / 20 **寬**的大小。

![圖片為各種單位的示意圖](https://i.imgur.com/YqTwWv1.png)

### 盒模型通用語法

可以看到盒模型在`margin`、`border`、`padding`，都可以在四個方位設定距離

而設定的語法也很簡單直白，在此用`margin`做示範：

- `margin-top: 上距`，上外邊距
- `margin-right: 右距`，右外邊距
- `margin-bottom: 下距`，下外邊距
- `margin-left: 左距`，左外邊距

#### 一行程式碼簡化的語法

- `margin: 上距 右距 下距 左距`，四個值的順序不能錯，分別設定**上**、**右**、**下**、**左**
- `margin: 上距 水平距 下距`，三個值的順序不能錯，分別設定**上**、**左右**、**下**
- `margin: 垂直距 水平距`，兩個值的順序不能錯，分別設定**上下** 與 **左右**
- `margin: 距離`，一個值你也很難錯，**四個方向一起設定**

> 以上 margin 也可以提替成 border 來設定 border 或 padding 來設定 padding

### Margin 的特色

因為 Margin 毛最多，所以先來說 Margin，搞定 Margin，後面就輕鬆了！

上下相隔的距離**會重疊**。
![上下相隔的距離會重疊](https://i.imgur.com/ChVScKT.png)

左右相隔的距離**不會重疊**。
![左右相隔的距離不會重疊](https://i.imgur.com/6MCayhD.png)

**行內元素**的垂直 margin 沒有效果。
![行內元素的垂直 margin 沒有效果](https://i.imgur.com/JzyzpcK.png)

可以使用**負值**，讓元素重疊，**注意** 在同個層級，右邊會壓過左邊，下面會壓過上面
![margin 負值，同層級下，右邊蓋住左邊](https://i.imgur.com/EKKPqUc.png)

#### 父子元素 Margin 外邊距重疊

當**父元素**包著**子元素**，同時都有使用 margin 時，**垂直** margin 會取**最大**的 margin 值
![垂直 margin 會重疊]](https://i.imgur.com/quUpAkb.png)

但當父元素有設定 padding 或 border 時，就不會重疊了。
![設定 padding 或 border ，margin 就不會重疊了](https://i.imgur.com/CYsrCCn.png)

還有屬於**不同**的 BFC 元素，如：子元素使用 float 浮動元素

> 什麼是 BFC？ BFC 是 Block formatting context 簡寫，簡單的說就是定位的方式改變。想更瞭解可以看[MDN 官方文件](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context)

這個部分要等到認識更多 CSS 才比較好解釋。
簡單說，就是脫離老爸的控制（脫離文檔流）

> 什麼是脫離文檔流？ 簡單說，原本每個元素都是一個個盒模型，依次排列在網頁上面，看起來像流水般由上而下依序排下來，稱之為「文檔流」。而脫離文檔流，顧名思義就是脫離出來的意思。

### Border 的特色

可以設定邊框的**寬度**、**樣式**與**顏色**
此外還可以使用 border-radius 來設定**外圍**的圓滑程度。

```css
border: 寬度 樣式 顏色;
border-radius: 圓滑程度;
```

寬度、樣式、顏色上網查，比較容易理解易學，就不多加琢磨了。

稍微介紹圓滑程度`border-radius`。

```css
/* 這個是沒有字母的最基本型態 */
.border { border: 10px solid #f88; }
/* 當設定一個值，四個角都會依據設定值為半徑做弧度 */
.a { border-radius: 20px; }
/* 當設定為 % 數，會依照內容寬度乘以百分比為半徑做弧度 */
.b { border-radius: 50%; } 
/* 當有兩個值，第一個值對應的是左上與右下，第二個值對應的是右上與左下 */
.c { border-radius: 0 50%; }
/* 當有三個值，第一個值對應左上，第二個值對應的是右上與左下，第三個值為右下 */
.d { border-radius: 0 100% 50%; }
/* 當有四個值，就順時針從右上開始分別對應值 */
.e { border-radius: 0 25% 50% 100%; }
/* 當要做特別形狀時，參數會更麻煩 */
.f { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
```

![上面的英文字母分別對應形狀](https://i.imgur.com/ElanoDL.png)

[想做特別的圓弧形？](https://9elements.github.io/fancy-border-radius/)

### Padding 的特色

Padding 就相對單純許多。
可以設定內容留白的寬度，與 margin 語法差不多，顏色則取自內容的背景色，背景顏色也是很簡單易學的語法，可以上網查，更進階的漸層背景顏色、多重背景、濾鏡背景，如果未來有時間會補充。
在行內元素狀態下，padding 水平會正常，但垂直就跟 margin 一樣會失效。如圖：
![行內元素 垂直 padding 失效](https://i.imgur.com/C7tugxA.png)
此外值得一提的是，margin 是元素之間的距離，所以不能算在元素內，padding 則是在元素內留白的距離，算是元素的一份子，常見的例子就是按鈕。

## 想要把元素推到中間置中？

### 盒模型還有 auto 這個值

除了寫數字值外，我們也可以請瀏覽器幫忙我們計算

- auto 是讓瀏覽器決定自動調整的距離單位，通常用在**水平置中**或**自動推移**

![添加 auto 的作用](https://i.imgur.com/WQmkumP.png)

## 怎麼設定的大小跟我想像的不一樣？

這裡要介紹一個現在很多人都會使用的盒模型語法`box-sizing: border-box`

以往的網頁切版充滿了數學計算，
因為 border 與 padding 要另外計算，如下圖`content-box`，
寬度總共 `border`10×2+`padding`10×2+`width`100 = 140px
想要把總寬度變 100px 就要往回扣 `width`。

但把 CSS 全域設成 `box-sizing: border-box;`，
就可以設定寬度 100px ，瀏覽器會幫我們計算， 
可以更**直覺性**的設定內容的寬高！
![content-box 與 border-box 的差異](https://i.imgur.com/qarkIjK.png)

至於 `width` 和 `height` 基礎語法，這個語法也很簡單，主要難是在判斷對的時機使用，這要多做才知道哪些情況要使用。

## 總結

沒想到如此基礎的 盒模型，也有很多重要觀念，明天將介紹 CSS 如何更精準的套用樣式。
