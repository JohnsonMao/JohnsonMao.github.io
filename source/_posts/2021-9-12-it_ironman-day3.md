---
title: Day.3 「建構網頁的基石！」 —— 使用網頁標籤
date: 2021/9/12 22:00:00
index_img: https://i.imgur.com/G3Fh3cl.jpg
banner_img: https://i.imgur.com/G3Fh3cl.jpg
categories:
    - [程式語言, 前端, HTML]
    - [iT 鐵人賽, 第 2021 年]
tags: 
    - iT 鐵人賽
    - HTML
excerpt: 雖然會最基礎的 div 和 span 標籤就能夠開始切版了，甚至只靠 div 搭配 CSS 就能做出各種 tag 的效果，但為了良好的 SEO 與 閱讀性，也為了以後不會把別人和自己逼瘋 (?，還是會建議用更適合的標籤來完成網頁。
---

# Day.3 「建構網頁的基石！」 —— 使用網頁標籤

![網頁就像樂高](https://i.imgur.com/G3Fh3cl.jpg)
Photo by [Alphacolor](https://unsplash.com/@duck58cth) on [Unsplash](https://unsplash.com/)

我們前面已經稍微認識了網頁的架構了，就像樂高一塊一塊堆疊起來，前一篇已經介紹的就不多贅述了。

雖然會最基礎的`<div>`和`<span>`標籤就能夠開始切版了，甚至只靠`<div>`搭配 CSS 就能做出各種 tag 的效果，但為了良好的 SEO 與 **閱讀性**，也為了以後不會把別人~~自己~~逼瘋 (?，還是會建議用更適合的標籤來完成網頁。

<!-- more -->

> 什麼是 SEO？ 是 Search Engine Optimization 的縮寫，中文翻譯為搜尋引擎最佳化。
> 簡單解釋就是，好的 SEO 等於讓搜尋引擎在茫茫網路大海中，讓你更容易被搜尋到。

根據 80/20 法則，其實學會 2 成的標籤，就已經能好好建構出不錯的網頁了，一些不常用的標籤，倒也不用硬是死記，需要用時再 Google 就好 (~~也許根本用不到~~。

## 常用的標籤

### 用來表示地盤的標籤

這種標籤最主要是用來劃分區域的標籤，通常會有子元素。

- `<div>` 沒有語意的標籤，也是最常使用的標籤

- `<header>` 代表容器的頭部

- `<main>` 代表容器主要內容

- `<footer>` 代表容器的底部

- `<section>` 代表一個段落

- `<nav>` 代表導航列

![iT ironman](https://i.imgur.com/HesZUPB.png)
*如圖紅色框使用的是 `<nav>`，黃色使用的是 `<header>`*

**注意** 這邊是用容器，代表`<header>`不一定要放在整個網頁的最上面
也可以用`<main>`包住，代表主要內容的頭部。

### 給文字（text）使用的標籤

- `<h1>` ~ `<h6>` 內文的標題，數字 1 代表第一重要標題，依序往下推，最小標題為`<h6>`，會**影響 SEO**，一個網頁建議只要有**一個**`<h1>`標籤
- `<p>` & `<pre>` 內文區塊標籤，`<pre>`會保留格式，`<p>`則不會
- `<span>` 同樣沒有語意，主要是要在區塊元素內套用不同 CSS 的標記標籤
- `<a>` 能夠超連結外部網站（href="網址"）、進行錨點傳送（href="#id_name"）、進行網路電話（href="tel:電話號碼"）或電子信箱（href="mailto:電子信箱"）
  **注意** `<a>`標籤內不能再嵌套`<a>`標籤。

  ```html
  <a href="https://www.google.com.tw/">Google 超連結</a>
  <a href="#">進行錨點傳送至頂</a>
  <a href="tel:+886-987654321">進行網路電話</a>
  <a href="mailto:email@gmail.com">寄信給電子信箱</a>
  ```

[Google 超連結](https://www.google.com.tw/)
[進行錨點傳送至頂](#)
[進行網路電話](tel:+886-987654321)
[寄信給電子信箱](mailto:email@gmail.com)

### 關於圖片（image）的標籤

- `<img>` 圖片標籤 `src="圖片網址" alt="圖片說明文字"`。
  **注意** `alt` 必須填寫，當圖片檔失效，會顯示說明文字，此外還會提供給視障人士聽到圖片說明。
- `<figure>` 這也算佔領地盤的標籤，代表放圖片的**區域**，子元素可以多個`<img>`
- `<figcaption>` 代表圖片區域的文字介紹，可以讓瀏覽器知道這段文字與這個圖片區域有關聯。

  ```html
  <figure>
      <img src="https://i.imgur.com/THgsIlG.jpg" alt="hello">
      <figcaption>Hello image</figcaption>
  </figure>
  ```
  
![hello](https://i.imgur.com/THgsIlG.jpg)
Hello image

### 好用的列表（list）標籤

- `<ul>` 用來設定**無序**列表

- `<ol>` 用來設定**有序**列表

- `<li>` 需與`<ul>`或`<ol>`搭配，用來設定列表項目

**常見** 的使用時機，像導航條那樣，同一個內容排列的時候就很適合使用！
![導航條](https://i.imgur.com/ll8OSOq.png)
*如圖綠色框為 `<ul>`，紅色框為 `<li>`*

```html
<ul>
  <li>我是無序列表 代號蘋果</li>
  <li>我是無序列表 代號橘子</li>
</ul>

<ol>
  <li>我是有序列表 代號小辣椒</li>
  <li>我是有序列表 代號老薑</li>
</ol>
```

- 我是無序列表 代號蘋果
- 我是無序列表 代號橘子

1. 我是有序列表 代號小辣椒
2. 我是有序列表 代號老薑

### 製作表格用的表格（table）標籤

- `<table>` 用來設定表格

- `<tr>` 用來設定一列（row）

- `<th>` 需與`<tr>`搭配，表示表格標題（column）

- `<td>` 需與`<tr>`搭配，表示表格內容（column）

```html
<table>
  <tr>
    <th>我是表格標題 報數 第一班 班頭</th>
    <th>我是表格標題 報數 第二班 班頭</th>
    <th>我是表格標題 報數 第三班 班頭</th>
  </tr>
  <tr>
    <td>我是表格內容 報數 第一班 2 號</td>
    <td>我是表格內容 報數 第二班 2 號</td>
    <td>我是表格內容 報數 第三班 2 號</td>
  </tr>
</table>
```

|我是表格標題 報數 第一班 班頭|我是表格標題 報數 第二班 班頭|我是表格標題 報數 第三班 班頭|
| --- | --- | --- |
|我是表格內容 報數 第一班 2 號|我是表格內容 報數 第二班 2 號|我是表格內容 報數 第三班 2 號|

### 必學的表單（form）標籤


- `<form>` 想要把資料傳給後端，就需要依靠`<form>`標籤

- `<label>` 表單說明標籤，這個是配合`<input>`標籤，利用屬性`for="id_name"`鎖定`<input id="id_name">`

- `<input>` 單行輸入標籤，這個標籤本身自閉合，本身`type`有很多屬性值。
  - `type = "text"`，輸入文字
  - `type = "password"`，輸入的文字會屏蔽
  - `type = "email"`，輸入信箱，會自動驗證格式是否正確
  - `type = "number"`，只能輸入數字
  - `type = "radio"`，只能單選，要添加`name`屬性，來判斷範圍
  - `type = "checkbox"`，可以複選，要添加`name`屬性，來判斷範圍
  - `type = "button"`，就普通的按鈕
  - `type = "submit"`，能發送表單的按鈕

```html
<form>
  <label for="name">名字</label>
  <input id="name" type="text">
  
  <div>
    <h4>請選擇性別</h4>
    <input id="male" name="gender" type="radio">
    <label for="male">男</label>
    <input id="female" name="gender" type="radio">
    <label for="female">女</label>
  </div>
  
  <div>
    <h4>請選擇你擁有的技能</h4>
    <input id="html" name="skill" type="checkbox">
    <label for="html">HTML</label>
    <input id="css" name="skill" type="checkbox">
    <label for="css">css</label>
    <input id="js" name="skill" type="checkbox">
    <label for="js">Javascript</label>
  </div>
</form>
```

![form - input](https://i.imgur.com/iijkuTY.png)

- `<textarea>`，多行輸入標籤，需要閉合標籤，需要使用`row`和`col`屬性，來決定大小

- `<select>`，下拉式選單
- `<option>`，下拉式選單的選項
- `<optgroup>`，下拉式選單的預設顯示

```html
<form>
  <label>請選擇疫苗</label>
  <select>
    <option>AZ 疫苗</option>
    <option>莫德納疫苗</option>
    <option>高端疫苗</option>
  </select>
</form>
```

![form - select](https://i.imgur.com/2a8naoL.png)

### 進階的嵌入用標籤

- `<ifram>` 用來內嵌網頁，如：Google 地圖、Code pen
- `<video>` 用來內嵌影片檔
- `<audio>` 用來內嵌音樂檔
- `<canvas>` 用來實現繪圖、遊戲具互動性的標籤

## 總結

雖然 HTML 很簡單，但標籤真的又臭又多，這只是冰山一角，還有很多屬性沒介紹，但前期這樣也很夠用了，下一篇將進入我們的 CSS 篇章！
