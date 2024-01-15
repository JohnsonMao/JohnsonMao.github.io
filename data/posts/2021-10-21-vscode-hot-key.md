---
title: VS Code 快捷鍵大師，時間就是金錢（圖多）
date: 2021/10/21 15:40:00
image: https://i.imgur.com/SzMnh4N.png
categories:
    - [程式語言, 工具, VS Code]
tags:
    - VS Code
description: 還常常得使用滑鼠來操作 VS Code 嗎？想要更加提升自己的 Coding 效率嗎？沒錯！在這個效率至上的時代，一天 24 小時，人人都努力把任何一點點能省的時間榨出來，只要善用快捷鍵，人人都能成為快捷鍵大師，這裡將會記錄著能提升效率的 VS Code 快捷鍵，從最簡單的開始，慢慢進階上去。
---

![快捷鍵大師，時間就是金錢](https://i.imgur.com/SzMnh4N.png)

## 前言

還常常得使用滑鼠來操作 VS Code 嗎？想要更加提升自己的 Coding 效率嗎？沒錯！在這個效率至上的時代，一天 24 小時，人人都努力把任何一點點能省的時間榨出來，只要善用快捷鍵，人人都能成為<del>鍵盤俠</del>**快捷鍵大師**，這裡將會記錄著能提升效率的 VS Code 快捷鍵，從最簡單的開始，慢慢進階上去。

此筆記是以 Windows 操作，如果是 Mac 可能會有些許不一樣
Mac 需把 `Ctrl` 換成 `Cmd ⌘`

## 快捷鍵是什麼？

快捷鍵是使用鍵盤組合，來完成一個操作，加速操作效率。
都有碰電腦的人，想必大家都有使用過快捷鍵的功能了，對這些快捷鍵有如左右手般熟悉，最常見的快捷鍵就是

- 復原`Ctrl + Z`
- 剪下`Ctrl + X`
- 複製`Ctrl + C`
- 貼上`Ctrl + V`
- 全選`Ctrl + A`

這些快捷鍵，不管使用什麼軟體，幾乎都會有這個萬用的功能

## 你應該嘗試看看

### 導覽至檔案

- 別再左側資料夾慢慢找檔案，善用`Ctrl + E`或`Ctrl + P`搜尋檔案，就可以直接切換檔案
  ![此圖範例為，快速導覽至 Nav.jsx](https://i.imgur.com/jHQoBOG.gif)

### 選取 (反白) 單字組合技

- #### 選取整行，Ctrl + L

  還在使用滑鼠選取整行程式碼嗎？可以嘗試看看使用`Ctrl + L`選取一整行唷

- #### 刪除整行，Shift + Delete 或 Ctrl + X

  還在使用滑鼠選取整行程式碼後按`Backspace`嗎？可以嘗試看看使用`Shift + Delete`或`Ctrl + X`刪除一整行唷

- #### 反白，Shift + 方向鍵

  還在使用滑鼠選取單字嗎？可以嘗試看看使用`Shift + 方向鍵`選取單字唷

- #### 單字間跳躍，Ctrl + 方向鍵

  使用`Ctrl + 方向鍵`，能以單字最為單位，移動游標
  注意 
  - 單字中有使用底線`_`，會視為與單字為一體
  - 如果使用橫槓`-`，則會拆分單字
  - 善用這個特性，可以提升開發效率

- #### 整行頭尾，Home 、 End 按鍵

  - 使用`Home`能到游標那行句子的頭，在按一次會到最左側
  - 使用`End`能到游標那行句子的尾巴

- #### 反白單字組合技

  還在使用滑鼠連點選取單字嗎？可以嘗試看看使用`Shift + Ctrl + 方向鍵`選取整個單字唷
  ![此圖範例為，選取 PropTypes 單字](https://i.imgur.com/fDzvWWO.gif)

### 選取同名字串

- 當想選取多個同名字串時，可以使用`Ctrl + D`，進行同名選取
  ![此圖範例為，選取 MyNavLink 換成 NavLink](https://i.imgur.com/zWquMNw.gif)

### 快速移動程式碼

- 還在整段複製貼上，移動程式碼嗎？可以嘗試看看使用`Alt + 上或下`來移動程式碼
  ![此圖範例為，把整個 ul 進行移動](https://i.imgur.com/YCYC974.gif)

### 快速複製程式碼

- 還在整段`Ctrl + C` + `Ctrl + V`，複製程式碼嗎？可以嘗試看看使用一個`Shift + Alt + 上或下`來複製程式碼
  ![此圖範例為，把整個 ul 格式複製貼上](https://i.imgur.com/Li08fjb.gif)

### 搜尋、取代功能

- `Ctrl + F`，我想這應該是大家最常用、最熟悉的快捷鍵，
  如同復原`Ctrl + Z`、剪下`Ctrl + X`、複製`Ctrl + C`、貼上`Ctrl + V`般熟悉

- `Ctrl + H`，我想這應該是大家常用，但不知道有這個快捷鍵，都是用`Ctrl + F`按出來
  ![取代](https://i.imgur.com/vmIpAIu.png)
  這還蠻常用的，像是 React 裡面 class 要換成 className 才能正常套用
  取代功能簡略介紹
  - 紅色框為你要搜尋的關鍵字
  - 綠色框為要幫關鍵字修改成什麼
  - 藍色框為，幫 所有 關鍵字都替換成綠色框的字

- `Ctrl + Shift + F`，可以搜尋整個專案中出現的關鍵字
  `Ctrl + Shift + E`，可以切換回專案檔案
  ![此圖範例為，搜尋整個專案的 addTodo](https://i.imgur.com/mZ0w6q9.gif)

### 新增檔案

- `Ctrl + N`，可以新增檔案，預設是`.txt`文字檔
  如果想把它切換成程式語言，HightLight效果，可以使用以下其中一個快捷鍵

  - `Ctrl + K + M`切換程式語言
  - `Ctrl + S`先儲存並把副檔名改成你要的程式語言，有使用設計軟體的，應該對儲存功能的快捷鍵相當熟悉

  ![此圖範例為，新增檔案並切換成 HTML 使用 HTML emmet](https://i.imgur.com/Vi5ZXGn.gif)

### 搜尋 Symbol (變數、函數)

- 當專案很大時，用滑鼠找很久，用`Ctrl + F`找又很多很雜
  可使用`Ctrl + Shift + O`來搜尋 Symbol (變數、函數)
  ![此圖範例為，搜尋 deleteTodo 函式](https://i.imgur.com/PTjyjfQ.gif)

### 修改 Symbol (變數、函數)

- 當游標在**Symbol**名稱時，按下`F2`可以幫變數重新命名
  有使用到變數的都會跟著一起改
  注意 `F2`的變數名稱修改優點，他只針對**變數名稱**，雖然字一樣，但是是字串型態，就不會跟著修改，如下圖
  ![此圖範例為，將變數 num 修改成 abc，注意最下面 console.log('num')是字串，所以不會修改到](https://i.imgur.com/hQSzktm.gif)

### 在 VS Code 中使用終端機功能

- 使用`Ctrl + ‵`或`Ctrl + J`可以開啟/關閉終端機，除了可以使用 node.js，也支援 git

### 註解

- 使用`Ctrl + /`這應該也是大多數人知道的功能

- 使用`Alt + Shift + A`可以多行註解

### 查看函數的實作

- 當你想查看函數是怎麼操作，可以對著函數名稱按下`F12`，會自動跳轉
  - 如果不想跳轉，想開新視窗，就按`Ctrl + Shift + F12`，就不會發生跳轉
  - 如果想要查看函數在哪些地方有用到，可以按`Alt + Shift + F12`，就可以看到
  ![此圖範例為，查看 checkAllTodo 函式，不發生跳轉](https://i.imgur.com/JXJ5wgR.gif)

### 關閉/開啟左側選單

- 使用`Ctrl + B`就能關閉/開啟左側選單
  ![紅色框為左側選單](https://i.imgur.com/8zAL1he.png)

## 比較少使用，但要使用時可以提高效率

### 快速進行內容排版

- 使用`Shift + Alt + F`，就能快速為程式碼進行 Format 排版
  ![此圖範例為，快速 Format 排版](https://i.imgur.com/lJDcUXS.gif)

### 快速移動到指定行數

- 使用`Ctrl + G`輸入要去的行數數字，即可快速到達該行數

### 幫所有分頁進行儲存

- 使用`Ctrl + Alt + S`，就能為所有分頁都進行儲存動作

### 關閉/復原 分頁

- 當你想關閉當前的檔案分頁，可以按`Ctrl + W`關閉當前檔案
- 當你想關閉所有的檔案分頁，可以按`Ctrl + K + W`關閉所有檔案
- 當你想關閉所有**已儲存**的檔案分頁，可以按`Ctrl + K + U`關閉以儲存檔案
- 當你想復原剛剛關閉的分頁，可以按`Ctrl + Shift + T`復原分頁

### 查看/關閉問題分頁

- 當打程式碼，有時候沒注意到問題，可以按`Ctrl + Shift + M`來初步查看問題分頁
  ![此圖範例為，a 的運算式沒輸入完](https://i.imgur.com/8fQ9moF.png)

### 切割視窗

- 可以使用`Ctrl + \`，進行切割視窗
  ![切割視窗](https://i.imgur.com/o3VGJjd.gif)

### 摺疊/展開程式碼

- 當程式碼打太多時，想要摺疊某個段落，可以使用`Ctrl + K + [`摺疊，使用`Ctrl + K + ]`展開
  **注意** 我只有在日文或英文輸入法才可以使用
  ![此圖範例為，摺疊展開 ul](https://i.imgur.com/ahu3ork.gif)

### 快速打開使用者設定

- 想要設定 VS Code 可以按`Ctrl + ,`來快速打開

### 更多 keyboard

[VS Code keyboard PDF](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)

### 參考資料

- [VS Code keyboard PDF](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
- [VS Code 快捷鍵大全](https://www.youtube.com/watch?v=8gJclv9z7I4)
