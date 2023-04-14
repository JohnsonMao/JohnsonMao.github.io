---
title: React - 三大屬性 Props
date: 2021/07/31 21:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: 介紹組件 三大屬性中的 Props 屬性。
---

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 前言

介紹組件 三大屬性中的 Props 屬性。

## React 起手式

1. 老規矩，先建立一個 HTML，並搭建好環境

    [還不知道 HTML 起手式請點我](/2021/07/26/2021-7-26-react-base/#React-起手式)

## Props - 基礎

1. 在 script 中，使用類式組件。

    ```jsx
    class Person extends React.Component {
        render(){
            return (
            <ul>
              <li>
                <h4>姓名：小傑·富力士</h4>
                <h4>性別：男</h4>
                <h4>念能力：強化系</h4>
              </li>
            </ul>
            )
        }
    }
    ReactDOM.render( <Person/>, document.getElementById( 'app' ) )
    ```

2. 這樣就先完成了最簡單的組件
![組件](https://i.imgur.com/4FMKZSR.png)

3. 接著開始運用`props`功能

    ```jsx
    class Person extends React.Component {
        render(){
            return (
            <li>
                <h4>姓名：{ this.props.name }</h4>
                <h4>年齡：{ this.props.age }</h4>
                <h4>性別：{ this.props.gender }</h4>
            </li>
            )
        }
    }
    // 在 Person 標籤內添加 props 屬性
    ReactDOM.render( <Person name="小傑·富力士" age="12" gender="男"/>, document.getElementById( 'app' ) )
    ```

4. 接著開啟 live server，就可以查看到`props`內傳遞的值
![Props 值](https://i.imgur.com/CwE0VGj.png)

5. 再利用解構賦值，簡化程式碼

    ```jsx
    class Person extends React.Component {
        render(){
            // 這樣每次使用都可以不用加 this.props 了
            const { name, age, gender } = this.props;
            return (
            <li>
                <h4>姓名：{ name }</h4>
                <h4>年齡：{ age }</h4>
                <h4>性別：{ gender }</h4>
            </li>
            )
        }
    }
    // 在 Person 標籤內添加 props 屬性
    ReactDOM.render( <Person name="小傑·富力士" age="12" gender="男"/>, document.getElementById( 'app' ) )
    ```

## Props 批量傳遞 & 運算

1. 當資料要代入許多`props`時，可以用 React 裡提供的方法，來批量傳遞

    ```jsx
    class Person extends React.Component {
        render(){
            const { name, age, gender } = this.props;
            return (
            <li>
                <h4>姓名：{ name }</h4>
                <h4>年齡：{ age }</h4>
                <h4>性別：{ gender }</h4>
            </li>
            )
        }
    }
    // 資料
    const hunter = { 
        name: "小傑·富力士", 
        age: "12", 
        gender: "男", 
    }
    // 運用 React 裡提供的方法，類似 ES6 的展開運算符'...'，來批量傳遞
    ReactDOM.render( <Person {...hunter}/>, document.getElementById( 'app' ) )
    ```

2. 當小傑使用強制成長，把年齡提升 10 歲則可以直接在`{}`內進行運算

    ```jsx
    class Person extends React.Component {
        render(){
            const { name, age, gender } = this.props;
            return (
            <li>
                <h4>姓名：{ name }</h4>
                <h4>年齡：{ age + 10 }</h4>
                <h4>性別：{ gender }</h4>
            </li>
            )
        }
    }
    // 資料
    const hunter = { 
        name: "小傑·富力士", 
        age: "12", 
        gender: "男", 
    }
    ReactDOM.render( <Person {...hunter}/>, document.getElementById( 'app' ) )
    ```

3. 看到畫面時，這時候聰明的你，一定知道問題出在哪裡
![型別問題](https://i.imgur.com/xlDYm6H.png)

4. 沒錯！把資料的字串型態改成數字型態就能正常運算了。
    **當多人協作，且專案龐大時，很容易不小心出錯，變成難以找到問題**

### 檢查 props 資料型態與預處理的**套件**

1. 有些時候資料不齊全時，可以設置一些警告，來避免找不到問題出在哪裡
    例如：資料沒有名字，性別亂寫，年齡是字串型態。

    ```jsx
        // 資料
        const hunter = {
            age: "12", 
            gender: 9453,
        }
    ```

    ![錯誤呈現](https://i.imgur.com/vCsSlla.png)

2. 可以再環境配置裡新引入 [prop-types CDN](https://cdnjs.com/libraries/prop-types)

    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.7.2/prop-types.js"></script>
    ```

3. 為組件裡面，`render`上面，新增資料型態檢查

    ```jsx
    // 需注意這裡 propTypes 的 p 是小寫，React 設定的
    static propTypes = {
        // 這裡 PropTypes 的 P 是大寫，套件設定的
        name: PropTypes.string,
        age: PropTypes.number,
        gender: PropTypes.string,
    }
    ```

4. 這時雖然畫面還是一樣，但開發人員工具就會出現警告
    馬上就能發現資料型態的錯誤
![警告](https://i.imgur.com/fe8LdL1.png)

5. 這時發現沒名字卻沒報錯，在必須傳遞的資料添加`.isRequired`，就會設定必須傳，否則報錯

    ```jsx
    static propTypes = {
        // 設定 isRequired 為必傳
        name: PropTypes.string.isRequired,
        age: PropTypes.number,
        gender: PropTypes.string,
        // 如果要限定傳函數則設 PropTypes.func
    }
    ```

![警告](https://i.imgur.com/SZ4jnbd.png)

6. 這時名字年齡修正好，而性別故意不寫的話，為不是必傳的值，新增默認值

    ```jsx
    // 新增默認值，如果沒有設年齡的預設值，資料沒年齡時，會變成 NaN
    static defaultProps = {
        age: 12,
        gender: '無'
    }
    ```

    ![成功畫面](https://i.imgur.com/FnionQe.png)

## 使用函數式組件來進行 props 傳遞

- 雖然函數式組件沒有 this 指向，但可以透過參數來進行 props 傳遞

    ```jsx
    function Person( props ) {
        const { name, age, gender } = props;
        return (
            <li>
                <h4>姓名：{ name }</h4>
                <h4>年齡：{ age }</h4>
                <h4>性別：{ gender }</h4>
            </li>
        )
    }
    // 資料
    const hunter = {
        name: "小傑·富力士",
        age: 12,
        gender: "男"
    }
    ReactDOM.render( <Person {...hunter}/>, document.getElementById( 'app' ) )
    ```

## 總結 Props

1. props 是透過組件的**標籤屬性**傳遞。
2. PropTypes 套件非必須，但有使用除錯會比較快。
    - 需注意使用時的**大小寫**，大小寫寫錯雖然不會報錯，但會失效。
3. props 是從組件**外**往組件**內**傳遞資料
4. **注意** props 只能**讀取**，不可修改。
5. React 中 props 可以透過`...`展開運算符展開屬性

### 參考資料

- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
- [React 官網 - Components & Props](https://zh-hant.reactjs.org/docs/components-and-props.html)
