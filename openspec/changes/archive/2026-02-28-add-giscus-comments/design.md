## Context

Currently, the blog is a static site with no reader interaction. To foster community engagement, a comment system is needed. Giscus is chosen as it leverages GitHub Discussions, is lightweight, and matches the developer-centric nature of the blog.

## Goals / Non-Goals

**Goals:**
- Integrate Giscus into all blog posts via `PostLayout`.
- Support theme switching (light/dark) in sync with the site's theme toggle.
- Support localization (English and Traditional Chinese).
- Maintain high performance by using standard Giscus loading patterns.

**Non-Goals:**
- Custom Giscus CSS styling (standard themes like `light` and `dark` will be used).
- Support for other comment platforms in this change.

## Decisions

### 1. New Component: `src/components/blog/Giscus.astro`
A dedicated component will encapsulate the Giscus script and its configuration. This allows for clean integration and easy updates to Giscus settings.

### 2. Configuration via Props and Environment Variables
Key configuration like `repo`, `repoId`, `category`, and `categoryId` will be managed. For security and flexibility, these should ideally be available via environment variables or a configuration file, but for this PR, we will use hardcoded values for the specific repository `JohnsonMao/JohnsonMao.github.io`.

### 3. Theme Synchronization Logic
The Giscus component will include an inline script to:
1. Initialize the theme based on the current `document.documentElement.classList`.
2. Listen for theme changes (using a `MutationObserver` or by listening to the same mechanism the `ThemeToggle` uses) and send a `set-theme` message to the Giscus iframe.

### 4. Locale Mapping
The `locale` prop passed to `PostLayout` will be mapped to Giscus's supported languages:
- `en` -> `en`
- `zh-TW` -> `zh-TW`

### 5. Translation Heading
A new translation key `blog.comments` will be added to `src/i18n/*.json` to provide a localized heading above the Giscus iframe.

## Risks / Trade-offs

- [Risk] **External Dependency**: If Giscus or GitHub Discussions is down, the comment section will not load.
  - [Mitigation] This is acceptable as it is a progressive enhancement and does not break the core content reading experience.
- [Risk] **Theme Sync Complexity**: Ensuring the theme updates immediately when toggled without a page reload.
  - [Mitigation] Use `window.postMessage` to communicate with the Giscus iframe as per official documentation.
