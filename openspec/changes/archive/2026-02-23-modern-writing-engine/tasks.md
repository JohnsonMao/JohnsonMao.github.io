## 1. Setup & Infrastructure

- [x] 1.1 Install `@astrojs/mdx` dependency
- [x] 1.2 Configure `astro.config.mjs` to include MDX integration
- [x] 1.3 Update `src/content.config.ts` to support `.mdx` files and add `series` field

## 2. Content Logic Enhancements

- [x] 2.1 Update `src/utils/content.ts` to include draft posts in development mode
- [x] 2.2 Verify draft preview works by creating a sample draft post

## 3. Series Navigation

- [x] 3.1 Create `SeriesNav.astro` component to list and navigate related posts
- [x] 3.2 Add i18n strings for series navigation labels (e.g., "Part of the series", "Current")
- [x] 3.3 Integrate `SeriesNav` into `PostLayout.astro`
- [x] 3.4 Style `SeriesNav` using Tailwind CSS v4 to match the existing design

## 4. Verification

- [x] 4.1 Create a test series with multiple posts (one MD, one MDX) to verify navigation
- [x] 4.2 Verify production build excludes draft posts
- [x] 4.3 Verify MDX components work as expected in a blog post
