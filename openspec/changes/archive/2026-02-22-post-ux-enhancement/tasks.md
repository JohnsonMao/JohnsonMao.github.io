## 1. Preparation & Layout Updates

- [x] 1.1 Update `[...slug].astro` to pass `headings` to `PostLayout`.
- [x] 1.2 Update `PostLayout.astro` Props to accept `headings`.
- [x] 1.3 Add required translations (e.g., "Table of Contents", "Related Articles", "Copy link") to `src/i18n/index.ts`.

## 2. Table of Contents (TOC)

- [x] 2.1 Create `src/components/blog/TableOfContents.astro` to render the extracted headings.
- [x] 2.2 Integrate `TableOfContents` into `PostLayout.astro`.
- [x] 2.3 Add styling for TOC (sticky sidebar for desktop, top-level for mobile).
- [x] 2.4 Implement smooth scrolling (via CSS `scroll-behavior: smooth` or JS if needed).

## 3. Related Articles

- [x] 3.1 Create a utility or helper to calculate related posts based on tag overlap.
- [x] 3.2 Create `src/components/blog/RelatedPosts.astro` component.
- [x] 3.3 Integrate `RelatedPosts` into the bottom of `PostLayout.astro`.
- [x] 3.4 Style the related posts cards.

## 4. SEO & Social Features

- [x] 4.1 Create `src/components/seo/JsonLd.astro` for `BlogPosting` structured data.
- [x] 4.2 Integrate `JsonLd` into `PostLayout.astro`.
- [x] 4.3 Create `src/components/blog/CopyLink.astro` component with clipboard logic.
- [x] 4.4 Add "Copy Link" button to the post header or metadata section in `PostLayout.astro`.

## 5. Styling & Final Polish

- [x] 5.1 Refine Tailwind CSS v4 styles for all new components.
- [x] 5.2 Verify responsive behavior on mobile and desktop.
- [x] 5.3 Ensure dark mode compatibility for new UI elements.
