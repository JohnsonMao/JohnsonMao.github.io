---
name: git-commit
description: Automatically generates and executes high-quality Git commits following industry best practices. Trigger this skill whenever the user asks to "commit", "prepare a commit", "submit changes", or "wrap up a PR". It analyzes staged and unstaged changes, suggests a structured commit message in English, and performs the commit.
---

# Git Commit Skill

This skill automates the process of creating well-structured Git commits. It follows the Conventional Commits specification and best practices for message formatting.

## Workflow

1.  **Analyze Changes**: 
    - Run `git status` to see which files are modified and check for staged changes.
    - Run `git diff HEAD` (and `git diff --staged` if some files are already staged) to understand the content of the changes.
2.  **Determine Scope**:
    - Identify the primary module or directory affected by the changes (e.g., `auth`, `ui`, `api`, `docs`).
3.  **Select Type**:
    - `feat`: A new feature
    - `fix`: A bug fix
    - `docs`: Documentation only changes
    - `style`: Changes that do not affect the meaning of the code (formatting, etc)
    - `refactor`: A code change that neither fixes a bug nor adds a feature
    - `perf`: A code change that improves performance
    - `test`: Adding missing tests or correcting existing tests
    - `build`: Changes that affect the build system or dependencies
    - `ci`: Changes to CI configuration
    - `chore`: Other changes that don't modify src or test files
    - `revert`: Reverts a previous commit
4.  **Compose Message**:
    - **Header**: `<type>(<scope>): <subject>`
        - **STRICT LENGTH**: The entire header MUST be <= 50 characters.
        - `<subject>`: Use the imperative, present tense: "change" not "changed". Small letters only. NO dot (.) at the end.
    - **Body (Optional)**: If the change is complex, explain "what" and "why" (not "how"). Wrap lines at 72 characters.
5.  **Staging Logic**:
    - **If files are already staged**: Use the current staging area. DO NOT add more files unless explicitly asked.
    - **If NO files are staged**: Run `git add .` to automatically stage all modified and untracked files before committing.
6.  **Execute Commit**:
    - Execute `git commit -m "<message>"` (including body/footer if applicable).
    - Do NOT manually add a `Co-authored-by:` trailer — it is appended automatically by the system.
7.  **Confirm**:
    - Verify success with `git status`.

## Constraints
- **Language**: ALWAYS use English for the commit message.
- **Tone**: Professional and concise.
- **Automaticity**: Directly execute the commit after generating the message.
- **Scope**: ALWAYS include a scope. If unsure, use the directory name or a broad category.

## Examples
- `feat(auth): add google oauth provider`
- `fix(ui): resolve overlapping button in mobile view`
- `refactor(api): simplify user data normalization`
- `docs(readme): update installation instructions`
