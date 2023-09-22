---
title:  Vue 3 Composition API
date: 2021/08/09 23:00:00
image: https://i.imgur.com/s0FUJXG.png
categories:
    - [程式語言, 社群, 六角學院]
    - [程式語言, 前端, Vue]
tags:
    - 六角學院
    - Vue 3 新手夏令營
excerpt: 這裡將會記錄參加 六角學院 Vue 3 新手夏令營（活動已結束） 課程筆記 與 每日任務紀錄，第四周介紹如何使用 Composition API 與 watch 功能，並了解 Vue 2 與 Vue 3 的差異。
---

#  Vue 3 Composition API    

[![第四週作業展示，運用了 Vue Composition API 與 watch 功能，點擊圖片可察看成果](https://i.imgur.com/s0FUJXG.png)](https://johnsonmao.github.io/summer-camp-vue3/week3/)

## 前言

這裡將會記錄參加 [六角學院 Vue 3 新手夏令營（活動已結束）](https://hackmd.io/@JohnsonMao/Front-end/%2F%40JohnsonMao%2FSummer-Camp-Vue3) 課程筆記 與 每日任務紀錄，第四周介紹如何使用 Composition API 與 watch 功能，並了解 Vue 2 與 Vue 3 的差異。
## 課堂重點

- Option API 與 Composition API 的差異
- 了解 Vue 裡面 this 的指向
- 生命週期的使用
- ref 與 reative 的差別 ( 略提 )

## Option API

- 所有功能被依據**程式邏輯**區分
- 對初學者來說相當**易學**
- 缺點：商業、功能邏輯被**拆分**到各處

![圖片取自六角學院 卡斯伯 的免費直播課程，展示 Option API 的程式邏輯](https://i.imgur.com/9UUufnj.png)

- 藍色代表程式邏輯
- 綠色與紅色分別為同一個功能所需要用的邏輯

## Option API 與 Composition API 的差異

- 而 Composition 改善其缺點，將同一個商業、功能邏輯寫在一起

![圖片取自六角學院 卡斯伯 的免費直播課程，展示 Composition 與 Option 的差別](https://i.imgur.com/mfIeYp4.png)

- 將分散在各處的功能邏輯集中在一起 (分散在各處的顏色集中在一起)

## Composition API

- 全部整合進`setup()`內
- 高度的彈性
- 基於既有的 JS 知識開發
- 方便引入函式庫
- 所有功能邏輯都各自寫好，不會分散各地

![圖片取自六角學院 卡斯伯 的免費直播課程，展示 Composition 的寫法](https://i.imgur.com/epx27MG.png)

## Vue 的 this 指向

- Proxy 是 Vue 在做雙向綁定的重要結構
- 在 Option API 可以不知道他
- 但在 Composition API 他還蠻重要的
- 資料都會放在 Target 裡面
![Vue 的 this 指向](https://i.imgur.com/ToIog5E.png)

## 複習 ESM

[CDN 連結](https://cdnjs.com/libraries/vue)
`https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.0-beta.7/vue.esm-browser.min.js`

![ESM 比較能依據自己需求來引入所需的功能](https://i.imgur.com/Rc0cV7M.png)

## Composition API 起手式

### 通常都是使用 ESModule 來操作

不轉ESM也行，但在composition API使用ESM更符合模組化概念

```html
<!-- HTML -->
<div id="app">
    {{ text }}
    <input type="text" v-model="text">
</div>
```

```javascript
// JS
<script type="module">
    // 引入 ESM，script 的 type 記得改成 module
    import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.0-beta.7/vue.esm-browser.min.js'
    // 用 ESM 就不用 Vue. 開頭
    const app = createApp({
        // Composition API 一定會有 setup
        setup() {
            const text = '卡斯伯棒棒';
            // 需要回傳值，才能在 HTML 使用
            return {
                text
            }
        }
    });
    app.mount('#app');
</script>
```

![圖片取自六角學院 卡斯伯 的免費直播課程，卡斯伯棒棒](https://i.imgur.com/DecnIjV.png)
### Composition API 裡雙向綁定，需要引入`ref`

```javascript
<script type="module">
    // 引入 ref
    import { createApp, ref } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.0-beta.7/vue.esm-browser.min.js'
    const app = createApp({
        setup() {
            // 使用 ref() 進行雙向綁定
            const text = ref('卡斯伯棒棒');
            // 需要回傳值，才能在 HTML 使用
            return {
                text
            }
        }
    });
    app.mount('#app');
</script>
```

### Composition API 使用函式

```javascript
<script type="module">
    import { createApp, ref } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.0-beta.7/vue.esm-browser.min.js'
    const app = createApp({
        setup() {
            const text = ref('卡斯伯棒棒');
            // 新增你需要的函式
            function getText() {
                console.log( text )
            }
            // 需要回傳值，才能在 HTML 使用
            return {
                text,
                getText,
            }
        }
    });
    app.mount('#app');
</script>
```

## Composition API 使用生命週期

### 引入 onMounted

```javascript
<script type="module">
    import { createApp, ref, onMounted } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.0-beta.7/vue.esm-browser.min.js'
    const app = createApp({
        setup() {
            const text = ref('卡斯伯棒棒');
            
            function getText() {
                console.log( text )
            }
            // 新增生命週期
            onMounted(()=>{
                getText()
            })
            // 需要回傳值，才能在 HTML 使用
            return {
                text,
                getText,
            }
        }
    });
    app.mount('#app');
</script>
```

### 引入 computed

```javascript
<script type="module">
    import { createApp, ref, onMounted, computed } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.0-beta.7/vue.esm-browser.min.js'
    const app = createApp({
        setup() {
            const num = ref(1);
            // 新增生命週期
            const doubleNum = computed(()=>{
                return num.value * 2
            })
            // 需要回傳值，才能在 HTML 使用
            return {
                num,
                doubleNum,
            }
        }
    });
    app.mount('#app');
</script>
```

![圖片取自六角學院 卡斯伯 的免費直播課程，computed](https://i.imgur.com/LdFcJrh.gif)

## reative 與 ref 的差別

![圖片取自六角學院 卡斯伯 的免費直播課程，ref & reative 的差別](https://i.imgur.com/5TW4tz8.png)

### reative

- 非常標準的 Proxy 物件
- 限制只能放物件
- 覆蓋後會出現不可預期的錯誤

### ref

- 沒有任何型別的限制
- 會依據放入的型別，而有不同的調整
- 一定要使用`.value`取值

### 參考資料

- [第四堂 - 共筆文件](https://hackmd.io/@dbFY0UD9SUeKmNXhWf01ew/BkJoW-hn_/%2FQsUHeIKiReaY-Znhe0UyvA)
- [六角學院 Vue 3 夏令營](https://www.hexschool.com/2021/07/07/2021-07-07-vue3-summer-camp/)
