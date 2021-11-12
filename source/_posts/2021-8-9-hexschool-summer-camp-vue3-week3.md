---
title: Vue 3 Options API
date: 2021/8/2 23:00:00
index_img: https://i.imgur.com/s0FUJXG.png
banner_img: https://i.imgur.com/s0FUJXG.png
categories:
    - [程式語言, 社群, 六角學院]
    - [程式語言, 前端, Vue]
tags:
    - 六角學院
    - Vue 3 新手夏令營
excerpt: 這裡將會記錄參加 六角學院 Vue 3 新手夏令營（活動已結束） 課程筆記 與 每日任務紀錄，第三周介紹如何使用語法進行資料的 CRUD 功能。
---

# Vue 3 Options API

[![第三週作業展示，運用了 Vue computed 與完整的 CRUD 功能，點擊圖片可察看成果](https://i.imgur.com/s0FUJXG.png)](https://johnsonmao.github.io/summer-camp-vue3/week3/)

## 前言

這裡將會記錄參加 [六角學院 Vue 3 新手夏令營（活動已結束）](https://hackmd.io/@JohnsonMao/Front-end/%2F%40JohnsonMao%2FSummer-Camp-Vue3) 課程筆記 與 每日任務紀錄，第三周介紹如何使用語法進行資料的 CRUD 功能。


## 課堂重點

- 了解 methods 與 computed 的差別與運用
- 稍微了解正則表達式，利用正則表達式增加千分點
- mounted 生命週期函數發生後就會被釋放

## 指令常見三大情境

- 透過指令，觸發特定事件
  - `@click="functionName()"`
- 透過其他 Option API，觸發特定事件
  - `this.functionName()`
- 作為畫面上的資料運算 (俗稱 filter)
  - 新版的 Vue 沒有 `filter`

### methods

1. 透過指令，透過點擊或`Enter`鍵，觸發特定事件，範例如下

    ```html
    <!-- 擷取片段程式碼 -->
    <input type="text" 
        class="form-control flex-fill" 
        @keyup.enter="addTodo"
        v-model="newTodo"
        placeholder="新增代辦事項"/>
    <button type="button" 
        class="btn btn-size-lg btn-dark rounded-1 m-1"
        @click="addTodo">
        <i class="fas fa-plus"></i>
    </button>
    ```

    ```javascript
    // 擷取片段程式碼
    Vue.createApp({
        data() {
        // ...
        },
        methods: {
            // 新增 todo
            addTodo() {
                // 添加的 todo 名字不能空白
                if( !this.newTodo.trim() ){
                    alert('請輸入代辦事項');
                    return
                }
                // 準備好一個 todo 物件
                const item = { id: Date.now(), name: this.newTodo, done: false };
                // 把 item 新增到 todos
                this.todos = [item,...this.todos];
                // 輸入完清空
                this.newTodo = '';
                // 刷新歷史紀錄
                this.pushHistory();
        }
    }).mount('#app');
    ```

### computed

- 不修改原始數值的情況渲染出新值

    ```html
    <!-- 擷取片段程式碼 -->
    <ul class="btn-group">
        <!-- filter todo -->
        <li class='col' :class=" filterType === 'all' ? 'active' : '' ">
            <button class="btn" 
            @click.prevent="filterType = 'all'">全部</button>
        </li>
        <li class='col' :class=" filterType === 'undone' ? 'active' : '' ">
            <button class="btn" 
            @click.prevent="filterType = 'undone'">待完成</button>
        </li>
        <li class='col' :class=" filterType === 'done' ? 'active' : '' ">
            <button class="btn" 
            @click.prevent="filterType = 'done'">已完成</button>
        </li>
    </ul>
    ```

    ```javascript
    // 解取片段程式碼
    Vue.createApp({
        data() {
            // ...
        },
        computed: {
            // 過濾分類清單
            filterTodos() {
                // 清單目前模式
                switch ( this.filterType ) {
                    case 'undone':
                        return this.todos.filter( item => !item.done);
                    case 'done':
                        return this.todos.filter( item => item.done);
                    default:
                        return this.todos;
            }
        }
    }).mount('#app');
    ```

## CRUD 資料處理發想

### 基本的 CRUD 包含了

- 新增資料
- 刪除資料
- 編輯資料
- 陳列資料
- 過濾資料
- 修改個別資料的完成度

```javascript
Vue.createApp({
    data() {
        // ...
    },
    methods: {
        // #1 如何新增資料
        addTodo() {},
        // #2 如何移除資料
        deleteTodo( id ) {
            // 找到當前按鈕那列的 index
            const index = this.todos.findIndex( item => item.id === id);
        },
        // ...
    }
})
```

## 運用這次直播，稍微修改了第一週的作業

1. 增加性別分類

    ```javascript
    // computed 不會改動原始值
    // watch 類似 methods, 會更動原始值
    // “不修改原始數值” 的情況產生 “新值” （此值只為了渲染使用）

    // 過濾列表
    filterPersons() {
        switch( this.genderFilter ){
            // 當性別選擇為'all'，直接回傳
            case 'all':
                return this.persons;
            // 當性別為'男'或'女'，自己對應
            case this.genderFilter:
                return this.persons.filter( item => 
                    // 判斷男女後回傳
                    item.gender === this.genderFilter );
        }
    }
    ```

2. 幫選賞金增加千分點

    ```javascript
    toCurrency(num) {
        // 把數字轉字串，利用小數點分割"整數"與"小數"
        const parts = num.toString().split('.');
        // 將整束用正則表達式每三個數字插入一個千分點
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // 將整數與小數合併後回傳
        return `${parts.join('.')}`;
    }
    ```

### 參考資料

- [第三堂 - 共筆文件](https://hackmd.io/@dbFY0UD9SUeKmNXhWf01ew/BkJoW-hn_/%2FsXrYN8LKRwmBOi-vA_pQRQ)
- [六角學院 Vue 3 夏令營](https://www.hexschool.com/2021/07/07/2021-07-07-vue3-summer-camp/)
- [Vue 3 Options API 實戰教學](https://www.youtube.com/watch?v=f3xwCDaN23I)
