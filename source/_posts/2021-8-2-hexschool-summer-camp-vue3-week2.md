---
title: Vue 3 與指令
date: 2021/8/2 23:00:00
index_img: https://i.imgur.com/Xd2g377.png
banner_img: https://i.imgur.com/Xd2g377.png
categories:
    - [程式語言, 社群, 六角學院]
    - [程式語言, 前端, Vue]
tags:
    - 六角學院
    - Vue 3 新手夏令營
excerpt: 這裡將會記錄參加 六角學院 Vue 3 新手夏令營（活動已結束） 課程筆記 與 每日任務紀錄，第二周介紹常用的語法學習 Vue。
---

# Vue 3 與指令

[![第二週作業展示，運用了 Vue 進階指令與 localStrage，同時也自我挑戰運用了鍵盤監聽，只使用鍵盤就能操控計算機功能，點擊圖片可察看成果](https://i.imgur.com/Xd2g377.png)](https://johnsonmao.github.io/summer-camp-vue3/week2/)

## 前言

這裡將會記錄參加 [六角學院 Vue 3 新手夏令營（活動已結束）](https://hackmd.io/@JohnsonMao/Front-end/%2F%40JohnsonMao%2FSummer-Camp-Vue3) 課程筆記 與 每日任務紀錄，第二周介紹常用的語法學習 Vue。

## 課堂重點

- 可以用修飾符取得自己想要的資料型態。
- 用`v-for`時，必須填入`key`，不然資料無法綁定。
- 用`:class`時，當判斷式為`true`時，會代入`class`。

## 課堂範例

### v-model 修飾符

- `.number`：限制只有數值型別的資料才能寫入
    `v-model` 預設是字串型別

  ```HTML
  <div id="app">
      <input type="text" v-model.number="number" >
      {{ number }} <!-- 顯示數字 -->
      {{ typeof( number ) }} <!-- 顯示 Number -->
      <input type="text" v-model="number" >
      {{ number }} <!-- 顯示數字 -->
      {{ typeof( number ) }} <!-- 顯示 String -->
  </div>
  ```

- `trim()`：去除字串前後多於的空白

    ```HTML
    const text = '   六角學院 Vue 3 夏令營   '
    console.log( text.trim() ) 
    <!--  顯示'六角學院 Vue 3 夏令營'  -->
    ```

### v-on：事件觸發器

- 最常用：`.prevent`（去除預設事件）

### v-bind

- 縮寫：`:`

### v-for

- **key 唯一且必填**

- 當 input 輸入內容後，按下反轉陣列時：
    1. 如果沒有`key`時，則`input`位置不會被同時更動
    2. 當有加上`key`時，`input`位置會與原本的資料內容位置一起變動
![有無添加 key 所影響的效果](https://i.imgur.com/Gbdl20j.gif)

        ```HTML
        <div id="app">
            <h4>缺少 key</h4>
                <ul>
                    <li v-for="( item, key ) in arrayData" 
                        class="pb-1">
                    {{ key }} - {{ item.name }} {{ item.age }} 歲 <input type="text" />
                    </li>
                </ul>

            <h4>加上 key</h4>
                <ul>
                    <li v-for="( item, key ) in arrayData" 
                        class="pb-1" :key="item.age">
                    {{ key }} - {{ item.name }} {{ item.age }} 歲 <input type="text" />
                    </li>
                </ul>
            <button class="btn btn-outline-primary" 
                @click="reverseArray">
                反轉陣列
            </button>
        </div>
        ```

        ```JS
        Vue.createApp({
            data(){
                return{
                    arrayData: [
                        { name:"魯夫", age: 19 },
                        { name:"索隆", age: 21 },
                        { name:"娜美", age: 20 },
                    ],
                }
            },
            methods: {
                reverseArray() {
                    this.arrayData.reverse()
                    console.log( this.arrayData )
                }
            },
        }).mount('#app')
        ```

### :class

- 範例一 按鈕樣式 - 按下去自動 active
    ![按下去自動 active](https://i.imgur.com/eo8pNrp.gif)

    ```HTML
    <button
        type="button"
        class="btn btn-outline-primary"
        :class="{active: isActive}"
        @click="isActive = !isActive"
    >
    Primary
    </button>
    ```

    ```JS
    const app = {
        data() {
            return {
                isActive: false,
            }
        },
        methods: {}
    }

    Vue.createApp(app).mount('#app')
    ```

- 範例二 頁籤切換 - 達到頁籤效果
    ![頁籤切換效果](https://i.imgur.com/O9kfLAx.gif)

    ```HTML
    <div id="app">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link"
                    :class="{active: isActive === 'Home'}"
                    @click="isActive = 'Home'">
                    Home
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link"
                    :class="{active: isActive === 'Profile'}"
                    @click="isActive = 'Profile'">
                    Profile
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link"
                    :class="{active: isActive === 'Casper'}"
                    @click="isActive = 'Casper'">
                    Casper
                </button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane" 
                :class="{active: isActive === 'Home'}">
            Home
            </div>
            <div class="tab-pane" 
                :class="{active: isActive === 'Profile'}">
            Profile
            </div>
            <div class="tab-pane" 
                :class="{active: isActive === 'Casper'}">
            Casper
            </div>
        </div>
    </div>
    ```

    ```JS
    const app = {
        data() {
            return {
                isActive: '',
            }
        },
        methods: {}
    }

    Vue.createApp(app).mount('#app')
    ```

## 雙向綁定

![圖片取自六角學院 卡斯伯 的免費直播課程，介紹 v-model 雙向綁定功能](https://i.imgur.com/ogKK8jt.png)

綠色：**只能讀出**資料渲染

紅色：**雙向**綁定可讀可寫

藍色：利用**事件觸發**調整 data，再利用渲染方法渲染到畫面上

黑色：**初始化**渲染畫面 ( 1 次 )

### 參考資料

- [第二堂 - 共筆文件](https://hackmd.io/@dbFY0UD9SUeKmNXhWf01ew/BkJoW-hn_/%2FbvLEkrTRRnWsImZ5-sWwRg)
- [六角學院 Vue 3 夏令營](https://www.hexschool.com/2021/07/07/2021-07-07-vue3-summer-camp/)
- [Vue 3 必學指令教學](https://www.youtube.com/watch?v=DUfmdaTj78k)
