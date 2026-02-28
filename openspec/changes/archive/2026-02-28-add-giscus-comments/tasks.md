## 1. Preparation

- [x] 1.1 Add `blog.comments` translation to `src/i18n/en.json`
- [x] 1.2 Add `blog.comments` translation to `src/i18n/zh-TW.json`
- [x] 1.3 Add Giscus configuration placeholders to `.env.example`

## 2. Giscus Component Implementation

- [x] 2.1 Create `src/components/blog/Giscus.astro` component
- [x] 2.2 Implement Giscus script loading with repository and category configuration
- [x] 2.3 Implement theme synchronization logic (light/dark mode) using standard Giscus theme mapping
- [x] 2.4 Handle locale mapping for Giscus (en, zh-TW)

## 3. Layout Integration

- [x] 3.1 Import `Giscus` component into `src/layouts/PostLayout.astro`
- [x] 3.2 Add a localized heading (e.g., `blog.comments`) above the comment section
- [x] 3.3 Render `Giscus` component at the bottom of the article section in `PostLayout`

## 4. Verification

- [x] 4.1 Verify that the Giscus iframe loads correctly on a blog post page
- [x] 4.2 Confirm that Giscus theme switches instantly when the site theme is toggled
- [x] 4.3 Ensure Giscus UI is localized based on the post's current locale
- [x] 4.4 Check that the Giscus configuration can be managed via environment variables (optional/best practice)
