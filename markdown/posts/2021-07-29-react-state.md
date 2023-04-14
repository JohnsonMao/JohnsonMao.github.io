---
title: React - 三大屬性 State
date: 2021/07/29 21:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: 介紹組件 三大屬性中的 State 屬性，這裡還不會討論 Hook 運用。
---

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 前言

介紹組件 三大屬性中的 State 屬性，這裡還不會討論 Hook 運用。

## React 起手式

1. 老規矩，先建立一個 HTML，並搭建好環境

    [還不知道 HTML 起手式請點我](/2021/07/26/2021-7-26-react-base/#React-起手式)

## 創建組件，完成基礎頁面

1. 在 script 中，要引用 React 的三大屬性，若不考慮使用 Hook ，則需使用類式組件。

    ```jsx
    class Vaccine extends React.Component {
        render(){
            return <h2>你打疫苗了嗎? 還沒QQ</h2>
        }
    }
    ReactDOM.render( <Vaccine/>, document.getElementById( 'container' ) )
    ```

2. 畫面呈現

    ![你打疫苗了嗎? 還沒QQ](https://i.imgur.com/y2nKsGB.png)

## 創建建構子，初始化狀態

1. 在類式組件內添加建構子

    ```jsx
    class Vaccine extends React.Component {
    
        // 建構子，寫 props 傳遞參數
        constructor(props){
            // 建構子內要寫 super 接收 props，不然會報錯
            super(props)
            // 初始化狀態，官方規定要寫物件型式
            this.state = { vaccinated: true }
        }
    
    
        render(){
            // 這裡把回答變成 JS 表達式 {}，並使用用條件運算子
            return (
            <h2>你打疫苗了嗎? 
                { this.state.vaccinated ? ' 已經打了(．▽．) b' : ' 還沒(Q A Q)' }
            </h2>)
        }
    }
    ReactDOM.render( <Vaccine/>, document.getElementById( 'container' ) )
    ```

2. 因為我們把`vaccinated:`設為`true`，所以條件運算子就會選`:`前面的字串。

    ![true 畫面](https://i.imgur.com/Mn3nvCs.png)

3. 如果我們把`vaccinated:`改成`false`，那麼條件運算子就會選擇`:`後面的字串。

    ![false 畫面](https://i.imgur.com/y2nKsGB.png)

4. 這時打開開發者工具的 Component，可以看到`state`。

    ![State 狀態](https://i.imgur.com/tLQV8Op.png)

5. 最後再更進階一點，把代碼更加精簡，將`render`內提取狀態進行**解構賦值**，讓程式更容易閱讀。

    ```jsx
    render(){
        // 在這裡先進行解構賦值，讀取狀態
        const { vaccinated } = this.state
        // 這樣後面就可以直接利用變數，不用再加前墜
        return (
        <h2>你打疫苗了嗎? 
            { vaccinated ? ' 已經打了(．▽．) b' : ' 還沒(Q A Q)' }
        </h2>)
    }
    ```

## 嘗試為頁面新增互動

### 類式組件中方法的 this 指向?

1. 幫頁面中的`<h2>`新增`onClick`事件

    ```jsx
    class Vaccine extends React.Component {
    
        constructor(props){
            super(props)
            this.state = { vaccinated: false }
        }
    
    
        render(){
            const { vaccinated } = this.state
            // 用來測試作為實例調用是否正常
            this.changeVaccinated()
            
            // 幫 <h2> 新增 onClick 事件，
            // 需注意 React 的事件綁定改成用駝峰命名法，
            // 並且調用方法要用 {} 包起來，
            // 且要用 this 來調用函數，結尾不能加 ()
            // 有加 () 會變成一開頁面就立即執行
            return (
            <h2 onClick={ this.changeVaccinated }>你打疫苗了嗎? 
                { vaccinated ? ' 已經打了(．▽．) b' : ' 還沒(Q A Q)' }
            </h2>)
        }
        /* 接續下面 */
    ```

2. 並在類式組件內增加`onClick`所需調用的函數

    ```jsx
        /* 承接上面 */
        
        // 將 changeVaccinated 放進 Vaccine 的原型變數裡，供實例使用
        // 通過 Vaccine 實例調用 changeVaccinated 時
        
        // 由於 changeVaccinated 是作為 onClick 的'回調函數'
        // 所以不是通過'實例'調用，而是'直接'調用。
        
        // 類中的方法默認開啟了局部的嚴格模式，
        // 所以 changeVaccinated 中的 this 為 undefined
        changeVaccinated(){
            console.log(this)
        }
    }
    ReactDOM.render( <Vaccine/>, document.getElementById( 'container' ) )
    ```

3. 點擊`你打疫苗了嗎?`後，打開開發者工具 Console ，觀察 this 回傳值

    ![組件內 this 的指向](https://i.imgur.com/A6jSC6U.png)

4. 總結 this 指向結果，作為`onClick`直接調用函數會無法指向實例。

    ![this 調用](https://i.imgur.com/swv0Vza.png)

### 解決類式組件中方法 this 指向的問題

1. 只要在`constructor`中，多加一行程式碼就能解決 this 指向問題

    ```jsx
    class Vaccine extends React.Component {
    
        constructor(props){
            super(props)
            this.state = { vaccinated: false }
            
            // 增加這一行，解決 changeVaccinated 中的 this 指向
            // 右邊的 this.changeVaccinated 會先找到自身原型上的 changeVaccinated
            // 調用了 bind(this) 方法，並把 this 綁在實例身上
            // 然後將這個方法放到自身新增的 changeVaccinated (左邊)
            this.changeVaccinated = this.changeVaccinated.bind(this)
        }
    ```

2. 點擊`你打疫苗了嗎?`後，打開開發者頁面的 Console，就會看到 this 指向實例，並且添加了`changeVaccinated`方法

    ![bind(this) 解決指向問題]](https://i.imgur.com/jJl2WYw.png)

### 這段程式碼整個流程如下圖

![這段程式碼整個流程如下圖](https://i.imgur.com/rrBeuZ6.png)

#### bind() 方法做了什麼?

bind() 方法做了兩件事
    1. 會建立一個新的函數。
    2. 會幫你改函數裡面的 this

### 小測驗

```jsx
class Youtube extends React.Component {

    constructor(props){
        super(props)
        this.state = { 
            subscribed: false,
            youtube: 'https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA',
        }
        this.____A____ = this.____B____.bind(this)
    }

    render(){
        const { subscribed, youtube } = this.state

        return (
        <h2 onClick={ this.subscribe }>你訂閱六角學院的 Youtube 了嗎? 
            { subscribed ? ' σ`∀´)σ 訂閱了，哪次不訂閱' : 
            ' 我就幫到這了(ㆆᴗㆆ) ' + youtube }
        </h2>)
    }

    gogogo(){
        console('趕快去唄 =͟͟͞͞( •̀д•́)')
    }
}
ReactDOM.render( <Youtube/>, document.getElementById( 'container' ) )
```

A 和 B 答案分別是甚麼 [不知道的話請點我](#這段程式碼整個流程如下圖)
```
右邊有答案-----------------------------------------------------------------------------A: subscribe / B: gogogo！
```

### 嘗試新增互動，剛學 React 必踏入過一次的坑

1. 首先取得 state 裡面的`vaccinated`值

    ```jsx
    changeVaccinated(){
        const vaccinated = this.state.vaccinated
    }
    ```

2. 嘗試修改 state

    ```jsx
    changeVaccinated(){
        const vaccinated = this.state.vaccinated
        this.state.vaccinated = !vaccinated
        // 用來測試是否有更改值
        console.log(this.state.vaccinated)
    }
    ```

3. 你會發現值確實有修改，但畫面不會變

    ![你會發現值確實有修改，但畫面不會變](https://i.imgur.com/rA3Ja4C.png)

4. **注意**狀態( state )不可以直接修改
`this.state.vaccinated = !vaccinated` 這行就是直接修改

## 使用 setState 來修改狀態

1. 一樣先取得 state 裡面的`vaccinated`值

    ```jsx
    changeVaccinated(){
        const vaccinated = this.state.vaccinated
    }
    ```

2. 使用 setState() 方法，
    **注意**狀態( state )必須透過 setState 進行修改

    ```jsx
    changeVaccinated(){
        const vaccinated = this.state.vaccinated
        this.setState({ vaccinated: !vaccinated })
    }
    ```

3. 這時畫面就能點擊切換

    ![成功觸發切換](https://i.imgur.com/5igofn0.gif)

## state 的簡寫方式

使用**類的基礎知識**簡化 state

1. 這是原來的程式碼

    ```jsx
    class Vaccine extends React.Component {
    
        constructor(props){
            super(props)
            this.state = { vaccinated: false }
            this.changeVaccinated = this.changeVaccinated.bind(this)
        }
        render(){
            const { vaccinated } = this.state
            return (
            <h2 onClick={ this.changeVaccinated }>你打疫苗了嗎? 
                { vaccinated ? ' 已經打了(．▽．) b' : ' 還沒(Q A Q)' }
            </h2>)
        }
        
        changeVaccinated(){
            const vaccinated = this.state.vaccinated
            this.setState({ vaccinated: !vaccinated })
        }
    }
    ReactDOM.render( <Vaccine/>, document.getElementById( 'container' ) )
    ```

2. 將 constructor 中的 state 拉出來
    - 類中可以直接寫賦值語句 = 往實例裡面追加屬性

    ```jsx
    class Vaccine extends React.Component {
    
        constructor(props){
            super(props)
            // this.state = { vaccinated: false }
            this.changeVaccinated = this.changeVaccinated.bind(this)
        }
        
        // 使用賦值語句，拉出 constructor
        state = { vaccinated: false }

        /* 以下省略 */
    ```

3. 將函數改成**賦值語句** + **ES6 箭頭函數**的寫法，並省略 constructor 裡面的 bind()

    利用箭頭函數的特點
    - 沒有自己的 this
    - 使用 this 時，會找其外側函數的 this，作為箭頭函數 this 去使用

    ```jsx
        /* 以上省略 */
        
     // changeVaccinated(){
     //     const vaccinated = this.state.vaccinated
     //     this.setState({ vaccinated: !vaccinated })
     // }
        
        // 改成 ES6 箭頭函數
        changeVaccinated = () => {
            const vaccinated = this.state.vaccinated
            this.setState({ vaccinated: !vaccinated })
        }
    }
    ReactDOM.render( <Vaccine/>, document.getElementById( 'container' ) )
    ```

4. 省略整個 constructor，最後簡化結果

    ```jsx
    class Vaccine extends React.Component {
        // 初始化狀態
        state = { vaccinated: false }
        
        render(){
            const { vaccinated } = this.state
            return (
            <h2 onClick={ this.changeVaccinated }>你打疫苗了嗎? 
                { vaccinated ? ' 已經打了(．▽．) b' : ' 還沒(Q A Q)' }
            </h2>)
        }
        // 自定義方法 - 藥用賦值語句的型式 + 箭頭函數
        changeVaccinated = () => {
            const vaccinated = this.state.vaccinated
            this.setState({ vaccinated: !vaccinated })
        }
    }
    ReactDOM.render( <Vaccine/>, document.getElementById( 'container' ) )
    ```

## 總結 State

### 什麼是 State ?

1. State 是組件中最重要的屬性，值是**物件**（可以包含多個 key-value）。
2. 通過更新 State 重新渲染組件。

### State 必須注意的要點

1. 組件中 render 方法中的 this 為組件的實例物件。
2. 組件自訂義的函數中，this 為`undefined`如何解決?
    - 強制綁定 this：通過函數`bind()`方法
    - 賦值語句 + 箭頭函數

3. 狀態資料，不能直接修改或更新，必須借助`setState()`來更新

### 參考資料

- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
- [React 官網 - State & 生命週期](https://zh-hant.reactjs.org/docs/state-and-lifecycle.html)
