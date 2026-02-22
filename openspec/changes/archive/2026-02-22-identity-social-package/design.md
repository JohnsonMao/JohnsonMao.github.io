## Context

The site (JohnsonMao.github.io) currently provides blog posts in multiple locales but lacks a dedicated personal profile for the author. To improve engagement, we need to add an "About" page and include author information directly on blog posts.

## Goals / Non-Goals

**Goals:**
- Provide a localized "About" page for both `en` and `zh-TW`.
- Display a consistent author bio at the end of every blog post.
- Enable easy content sharing via Twitter, Threads, and Facebook.
- Maintain a central source for author-related metadata.

**Non-Goals:**
- Supporting multiple authors (this is a personal site).
- Implementing complex social media APIs (simple direct share links are sufficient).

## Decisions

### 1. Author Data Source
We will use a central JSON file at `src/data/author.json` to store profile information.
- **Rationale**: Keeps author metadata (social handles, avatar URL) in one place for easy updates.
- **Alternatives**: Inlining in components (too scattered) or a content collection (slightly overkill for a single record).

### 2. About Page Implementation
- **Content**: A new content collection named `about` will be registered. Content will be stored in `src/content/about/en.md` and `src/content/about/zh-TW.md`.
- **Routing**: Localized pages at `src/pages/[locale]/about.astro` and a redirect/default at `src/pages/about.astro`.
- **Rationale**: Matches the existing pattern for localized blog posts.

### 3. Share Buttons Logic
- **Mechanism**: Use standard intent URLs (e.g., `https://twitter.com/intent/tweet?url=...`).
- **Implementation**: A functional component `ShareButtons.astro` that calculates the absolute URL of the current page and the document title.
- **Rationale**: Zero client-side JavaScript overhead (SSG friendly).

### 4. Layout Integration
- **PostLayout.astro**: Will be updated to import and render `AuthorBio.astro` and `ShareButtons.astro` below the main content area.
- **NavLinks**: Navigation labels for "About" will be added to `src/i18n/ui.ts` (or equivalent).

## Risks / Trade-offs

- **[Risk] Social Link Encoding** → **[Mitigation]** Use `encodeURIComponent` for all dynamic parameters in share URLs to prevent breaking links with special characters in titles.
- **[Trade-off] Static Bio** → The bio in the JSON file is global. If a per-locale bio is needed, it will be moved to the `i18n` translation files or the JSON will be structured by locale. For now, we'll use translation keys for the bio text in the JSON if necessary.
