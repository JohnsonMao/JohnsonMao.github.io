---
title: Day.10 「沒有 RWD 的網站 === 沒有未來」 —— RWD　響應式網頁設計
date: 2021/09/19 22:00:00
image: https://i.imgur.com/tJZ3MrQ.png
categories:
    - [程式語言, 前端, CSS]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - CSS
description: 雖然標題有點聳動，但在這個行動裝置越來越多的現在，如果沒有手機版的網頁，SEO 排名會大受影響，也等同於宣告死刑了。
---

![「沒有 RWD 的網站 === 沒有未來」 —— RWD　響應式網頁設計](https://i.imgur.com/tJZ3MrQ.png)

雖然標題有點聳動，但在這個行動裝置越來越多的現在，如果沒有**手機版的網頁**，**SEO** 排名會大受影響，也等同於宣告死刑了。

![沒有手機版網頁，使用者體感差，字小按鈕也很難點](https://i.imgur.com/ruLsPM4.png)

## 什麼是 RWD？

是 Responsive Web Design 的簡稱 RWD，中文翻譯為**響應式網頁設計**，主要是針對不同裝置，網頁透過裝置寬度來決定排版的方式。

![隨著裝置不同，布局也不同](https://i.imgur.com/Uyp0Xl3.gif)

## RWD 要如何開始？

### 1. 在 HTML 添加 viewport 的 meta 標籤

首先要在 HTML 檔案 `<head>` 標籤內添加 `<meta name="viewport" content="width=device-width, initial-scale=1">`，通常使用 emmet 會自動設定。
viewport 屬性值：

- width=device-width：寬度等於當前裝置的寬度
- height=device-height：高度等於當前裝置的高度
- initial-scale：初始的縮放比例
- minimum-scale：允許使用者縮放到的最小比例
- maximum-scale：允許使用者縮放到的最大比例
- user-scalable：使用者是否可以手動縮放

### 2. 決定設計模式

- 局部流動 (mostly fluid)，隨著螢幕寬度斷點，主體像流體般依序往下排列。
- 欄內容下排 (column drop)，最大寬度時呈現橫向排列，隨著螢幕斷點往下推擠排列。
- 版面配置位移 (layout shifter)，隨著螢幕寬度斷點，進行版面大幅配置改變。
- 細微調整 (tiny tweaks)，隨著螢幕寬度，微小調整字體大小與按鈕大小 。
- 畫布外空間利用 (off canvas)，以橫向卷軸來操作，在小螢幕時顯示滿版，大螢幕時會排進更多畫面，有點像**簡報**。

想更詳細的介紹可以看[回應式網頁設計模式](https://developers.google.com/web/fundamentals/design-and-ux/responsive/patterns?hl=zh-tw)

### 3. 使用 CSS media query 設定

使用方法在 CSS 檔案內需用`@media (條件) {樣式}`來設定，需要**注意**要寫在下方

例如想設定當視窗**寬度小於** 768px，改變背景顏色，語法範例：

```css
@media (max-width: 768px) {
  /*  當視窗寬度 大於 768px 省略這段 CSS  */
  body {
    background: #88f;
  }
}
```

![RWD 效果](https://i.imgur.com/i7aU70Q.gif)
![開發者工具可以看出，當螢幕小於 768px 原本樣式被覆蓋](https://i.imgur.com/zxzxCoj.png)

如果要改成**大於** 768px，才觸發樣式，就把條件設成`(min-width: 768px)`

### 4. 使用相對單位設定大小

此外會建議多使用相對單位設定樣式（%），比較不會出現字太小或按鈕太小的問題。

## 總結

我們已經大致上了解了 RWD 的設置，接著就是持續的實作才能掌握它，想了解更詳細的設定模式，可以看[回應式網頁設計模式](https://developers.google.com/web/fundamentals/design-and-ux/responsive/patterns?hl=zh-tw)，下一個章節將會介紹 CSS transform。

## 參考資料

- [回應式網頁設計模式](https://developers.google.com/web/fundamentals/design-and-ux/responsive/patterns?hl=zh-tw)
