# Issue tracker: GitHub

Repository: JohnsonMao/JohnsonMao.github.io

任務與規格存放在 GitHub Issues，使用 gh CLI 操作。

## Conventions

- 一張 Issue 描述一個可追蹤的成果；規格可作為父 Issue。
- 子任務優先使用 GitHub sub-issues 連結父 Issue；不支援時，在子任務開頭寫 Part of #<number>，並在父 Issue 加入任務清單。
- 相依關係優先使用 GitHub 原生 issue dependencies；不支援時，在任務開頭寫 Blocked by: #<number>。
- 所有阻擋任務關閉後，該任務才可開始。
- 多行內容寫入暫存檔，以 --body-file 傳入 gh。
- 分流標籤依 triage-labels.md。

## Skill operations

- 「publish to the issue tracker」：建立 GitHub Issue。
- 「fetch the relevant ticket」：讀取指定 Issue、留言與相依關係。
- 使用 gh issue 的 create、view、list、edit、comment、close 子命令操作。

## Pull requests as a triage surface

PRs as a request surface: no.

## Wayfinding

- Map 使用一張帶 wayfinder:map 標籤的 Issue。
- 決策任務使用子 Issue，依類型加上 wayfinder:research、wayfinder:prototype、wayfinder:grilling 或 wayfinder:task。
- 從未關閉、無阻擋且未指派的子任務中，按 map 順序選取。
- 開始工作時指派給執行者。
- 解決後將答案記錄於留言、關閉任務，並將摘要與連結加入 map 的 Decisions-so-far。
