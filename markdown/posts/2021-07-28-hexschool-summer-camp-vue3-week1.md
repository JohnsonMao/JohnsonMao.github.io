---
title: Vue 3 起步走
date: 2021/07/28 23:00:00
index_img: https://i.imgur.com/E48VuxQ.jpg
banner_img: https://i.imgur.com/E48VuxQ.jpg
categories:
    - [程式語言, 社群, 六角學院]
    - [程式語言, 前端, Vue]
tags:
    - 六角學院
    - Vue 3 新手夏令營
excerpt: 這裡將會記錄參加 六角學院 Vue 3 新手夏令營（活動已結束） 課程筆記 與 每日任務紀錄，第一周主要是介紹用最簡單方法帶初學者學習 Vue。
---

[![第一週作業展示，運用了 Vue 指令與 Ajax，點擊圖片可察看成果](https://i.imgur.com/E48VuxQ.jpg)](https://johnsonmao.github.io/summer-camp-vue3/week1/)

## 前言

這裡將會記錄參加 [六角學院 Vue 3 新手夏令營（活動已結束）](https://hackmd.io/@JohnsonMao/Front-end/%2F%40JohnsonMao%2FSummer-Camp-Vue3) 課程筆記 與 每日任務紀錄，第一周主要是介紹用最簡單方法帶初學者學習 Vue。

## 課堂重點

- 初學 Vue 起手式常用的三個值 `data` `methods` `mounted`
- 關注點分離，避免大雜燴
- Vue 常用指令，詳情請往下閱讀
- ESModule 使用

## Vue 起手式

[CDN 連結](https://v3.vuejs.org/guide/installation.HTML#vue-devtools)
語法：`<script src="https://unpkg.com/vue@next"></script>`

1. 使用 createApp 建立起始元件

2. 元件內使用最常用的 3 個值

    - ```js
      data(){
          return{} // 資料
      }
      ```

    - ```js
      methods: {} // 方法
      ```

    - ```js
      mounted(){} // 初始化
      ```

3. 使用 mount 決定 Vue 的應用程式生成位置

## 關注點分離

![圖片取自六角學院 卡斯伯 的免費直播課程，介紹 Vue 的運作邏輯](https://i.imgur.com/zMu6v5x.png)
重要觀念：先定義資料 ( data )，才能在 HTML 中使用

HTML 要讀取 data 資料有以下幾種方法

1. 直接用雙大括號 `{{}}` 包住要讀取的資料

    ```HTML
    <!-- 這裡是 HTML -->
    <div id="app">
        {{ title }}
    </div>
    ```

    ```JS
    // Vue 起手式
    Vue.createApp({
      // data 資料
      data() {
        // 一定要用 return
        return {
          title: '六角學院 Vue 3 夏令營',
          text: '六角學院佛心來的'
        }
      },
      // methods 方法
      methods: {},
      // mounted 生命週期，初始化
      mounted() {},
    }).mount('#app'); // 渲染到 HTML 的 app
    ```

2. 使用`v-text`or`v-model`直接傳入資料 ( JS 同上)

    ```HTML
    <!-- 這裡是 HTML -->
    <div id="app">
        <h1 v-text="title"></h1>
        <input v-model="text">
    </div>
    ```

## 指令

### v-model

- 和 HTML **雙向**綁定 data 資料（會同步兩邊資料）

  ```HTML
  <input type="number" v-model="num">
  ```

### v-bind

- 在 HTML 標籤上進行屬性綁定
  - 省略語法：直接在屬性前加上 `:` 省略 `v-bind`

  ```HTML
  <img :src="person.image" :alt="person.name" width="100">
  ```

### v-if ( 需與下面的 v-else 搭配 )

- 將判斷式寫入 `""` 或 `''` 中，若是 true 則會顯示，false 則不會顯示

### v-else

- 不用加判斷式，但需要搭配 v-if 一起使用（若要還需要判斷，則使用 v-else-if）

  :warning: `v-if` `v-else` 要搭配一起使用才會有效果

  ```HTML
  <i v-if="person.gender === 'male'"></i>
  <i v-else-if="person.gender === 'female'"></i>
  <i v-else></i>
  ```

### v-for

- 多筆資料透過迴圈方式將資料迭代出來

  - people 是 data 中的陣列
  - item 代表 people 中，每一個獨立的物件， item 可自定義名稱
  - v-for 必須帶 key

  ```HTML
  <ul>
    <li v-for="item in people">
      {{ item.name }}
      <button type="button">增加</button>
      <img :src="item.image" :alt="item.name">
      <i v-if="item.gender === 'male'"
          class="bi bi-gender-male"></i>
      <i v-else
          class="bi bi-gender-male"></i>
      {{ item.name }}
    </li>
  </ul>
  ```

  示意圖：
    ![圖片取自六角學院 卡斯伯 的免費直播課程，介紹 v-for 迴圈的操作](https://i.imgur.com/EHNwlax.png)
    

### @click

- 在 DOM 元素上加入監聽事件，下方示範 vue 監聽事件以及 jQuery 監聽事件差異

    ```js
    // 這是 jQuery 的寫法
    $(`#button`).on('click', function(){

    });
    ```
    ```HTML
    <!--  這是 Vue 在 HTML 上綁定事件的做法  -->
    <button type="button" @click="item.cash++">
      增加
    </button>
    ```

### methods 方法

```JS
// 這是 Vue 透過 methods 給函式
methods: {
    clickAlert() { // 建議可以縮寫就縮寫（提升程式碼閱讀性）
        alert('我被觸發了');
    }
}
```

### mounted 生命週期，初始化

- 使用 this 方式取 data 的值

    ```JS
    mounted() {
      // this 本身是個很複雜的知識，但在 Vue 中把它簡單化了。    
      console.log(this.title);
      // 修改資料範例    
      this.text = '我叫小賀'
      // Ajax 取的的資料放在這邊初始化渲染
    }
    ```

- 網頁載入後只會執行一次，適合做初始化

#### 延伸知識

![圖片取自六角學院 卡斯伯 的免費直播課程，介紹 ESM 的差別](https://i.imgur.com/pzMahpd.png)

我們今天所學的：

- 整包載入

業界推薦使用的 ESModule： Vue-cli也是使用 ESM （優）

- 單一模組
- 是分別獨立的一個一個方法，ex：createApp、ref、reactive

擇一使用，不會同時使用兩種載入方法，建議使用 ESModule 的載入方法。

  ```HTML
  <script type="module">
  imoport { createApp } from 'url';

  </script>
  ```

注意：ESM 如果沒有加 type = "module" 使用 import / export 會報錯

### 參考資料

- [第一堂 - 共筆文件](https://hackmd.io/@dbFY0UD9SUeKmNXhWf01ew/BkJoW-hn_/%2FBF-LiS7iQvebt7XMn_ruzg)
- [Vue 3 起手式直播教學](https://www.youtube.com/watch?v=gCd8Kg7avc0&t=2682s)
- [六角學院 Vue 3 夏令營](https://www.hexschool.com/2021/07/07/2021-07-07-vue3-summer-camp/)
