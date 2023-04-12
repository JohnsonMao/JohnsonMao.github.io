---
title: React - 三大屬性 Props
date: 2021/10/10 21:00:00
index_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
banner_img: https://i.postimg.cc/kMk16Gqq/icons8-react-160.png
categories:
    - [程式語言, 前端, React]
tags:
    - React
excerpt: 介紹組件 三大屬性中的 Refs 屬性。
---

![從 0 開始學 React](https://i.postimg.cc/kMk16Gqq/icons8-react-160.png)

## 前言

介紹組件 三大屬性中的 Refs 屬性。

## React 起手式

1. 老規矩，先建立一個 HTML，並搭建好環境

    [還不知道 HTML 起手式請點我](/2021/07/26/2021-7-26-react-base/#React-起手式)

## 創建組件

1. 在 script 中，要引用 React 的三大屬性，必須使用類式組件。

    ```jsx
    class Dream extends React.Component {
        render(){
            // 需注意標籤閉合
            return (
                <div>
                    <input type="text" placeholder="輸入你的夢想"/><br/>
                    <button>點擊</button>
                </div>
            )
        }
    }
    ReactDOM.render( <Dream/>, document.getElementById( 'container' ) )
    ```

    ![畫面呈現](https://i.imgur.com/Li5QE8n.png)

2. 幫按鈕新增點擊事件

    ```jsx
    class Dream extends React.Component {
    
        // 使用賦值語句 + 箭頭函式
        showDream = () => {
            console.log( '你點擊按鈕了!!!' );
        }
    
        // 注意 onClick 為 React 給的方法，需注意大小寫
        render(){
            return (
                <div>
                    <input type="text" placeholder="輸入你的夢想"/><br/>
                    <button onClick={ this.showDream }>點擊</button>
                </div>
            )
        }
    }
    ReactDOM.render( <Dream/>, document.getElementById( 'container' ) )
    ```

    ![畫面呈現](https://i.imgur.com/UL7nww9.gif)

3. 讓點擊事件能過獲取到`input`裡面的值
    - 原生 JS 是利用`document.getElementById('id_name')`
    - jQuery 則是利用`$('#id_name')`
    - React 本身也有提供 ref 來取得值

## Refs 取得的三種方式

### 字串型態的 Ref （不推薦：未來 React 可能會廢棄）

- 在要取得的節點設置一個`ref="your_id"`
- 並利用`this.refs`取得節點

```jsx
class Dream extends React.Component {

    showDream = () => {
        // 取得節點
        const { dream } = this.refs
        alert( `祝你 ${dream.value} 夢想成真` )
    }
    // 在 input 裡添加 ref="dream"
    render(){
        return (
            <div>
                <input ref="dream" type="text" placeholder="輸入你的夢想"/><br/>
                <button onClick={ this.showDream }>點擊</button>
            </div>
        )
    }
}
ReactDOM.render( <Dream/>, document.getElementById( 'container' ) )
```

![畫面呈現](https://i.imgur.com/zqncGMd.gif)

### 回調形式的 Ref

- 使用回調形式的箭頭函數取得當前節點`( currentNode ) => { this.your_id = currentNode }`
- 因為使用回調形式，所以可以透過 this 取得屬性

```jsx
class Dream extends React.Component {

    showDream = () => {
        const { dream } = this
        alert( `祝你 ${dream.value} 夢想成真` )
    }
    // 在 input 裡使用回調形式的箭頭函數取得節點
    // 利用箭頭函數的 this 向外找的特性綁定到實例自己身上
    // 箭頭函數左側如果只有一個參數，可以省略括弧
    // 箭頭函數右側如果只有一句函數，可以省略括弧
    render(){
        return (
            <div>
                <input 
                    ref={ c => this.dream = c } 
                    type="text" 
                    placeholder="輸入你的夢想"/>
                <br/>
                <button onClick={ this.showDream }>點擊</button>
            </div>
        )
    }
}
ReactDOM.render( <Dream/>, document.getElementById( 'container' ) )
```

> 如果是使用行內函數的回調方式，會再更新頁面時，行內回調函數會被呼叫兩次，第一次是 null，第二次就是用 DOM，這過程是為了清空函數並重新賦予，大多數情況下並不會有什麼影響，如果想避免出現這個情況，可以用類綁定的函數解決

#### Class 類綁定的回調函數

- 這樣更新畫面也不會一直呼叫函數了

```jsx
class Dream extends React.Component {

    showDream = () => {
        const { dream } = this
        alert( `祝你 ${dream.value} 夢想成真` )
    }
    // 類綁定的回調函數
    saveDream = (c) => {
        this.dream = c
    }
    
    render(){
        // 改成使用函數
        return (
            <div>
                <input 
                    ref={ this.saveDream } 
                    type="text" 
                    placeholder="輸入你的夢想"/>
                <br/>
                <button onClick={ this.showDream }>點擊</button>
            </div>
        )
    }
}
ReactDOM.render( <Dream/>, document.getElementById( 'container' ) )
```

### createRef 的使用 （目前 React 最推薦使用的方式）

- 使用 createRef 創建一個容器，並掛在實例自身
- 容器跟 id 一樣，同個名字只能設定一個

```jsx
class Dream extends React.Component {
    // 使用 createRef() 創建容器
    dreamRef = React.createRef()
    
    showDream = () => {
        const { dreamRef } = this
        // 必須使用 current 來取得當前節點
        alert( `祝你 ${dreamRef.current.value} 夢想成真` )
    }
    
    render(){
        // 改成使用 createRef 的方式
        return (
            <div>
                <input 
                    ref={ this.dreamRef } 
                    type="text" 
                    placeholder="輸入你的夢想"/>
                <br/>
                <button onClick={ this.showDream }>點擊</button>
            </div>
        )
    }
}
ReactDOM.render( <Dream/>, document.getElementById( 'container' ) )
```

## 總結 Refs

1. refs 最簡單的寫法就是字串形式寫法 （不推薦使用）
2. 回調形式的 refs 雖麻煩一點，但比較不會出現奇怪的錯誤
3. createRef 雖最麻煩，但官方網站最推薦使用

### 參考資料

- [React 官網 - Refs & DOM](https://zh-hant.reactjs.org/docs/refs-and-the-dom.html)
- [React 全家桶](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)
