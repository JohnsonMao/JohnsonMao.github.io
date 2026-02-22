## 1. Data & Schema Setup

- [x] 1.1 Create author profile data file at `src/data/author.json` with fields: name, avatar, bio, and social links.
- [x] 1.2 Register the `about` content collection in `src/content.config.ts`.
- [x] 1.3 Create the `src/content/about/` directory and add `en.md` and `zh-TW.md`.

## 2. Localization & I18n

- [x] 2.1 Add translation keys for "About" navigation in `src/i18n/en.json` and `src/i18n/zh-TW.json`.
- [x] 2.2 Add translation strings for "About page title" and "Share this post" labels.

## 3. Component Development

- [x] 3.1 Create `AuthorBio.astro` component to display author information from `author.json`.
- [x] 3.2 Create `ShareButtons.astro` component with localized sharing links for Twitter, Threads, and Facebook.
- [x] 3.3 Style the new components using Tailwind CSS v4 to match the site's aesthetic.

## 4. Pages & Routing

- [x] 4.1 Create localized "About" page at `src/pages/[locale]/about.astro` to render the content from the collection.
- [x] 4.2 Create `src/pages/about.astro` to handle the default locale (redirect or direct render).
- [x] 4.3 Update Header and Footer components to include a link to the About page.

## 5. Layout Integration

- [x] 5.1 Update `PostLayout.astro` to import and render `ShareButtons` and `AuthorBio` at the bottom of the article.
- [x] 5.2 Verify that sharing links correctly encode the post URL and title.
- [x] 5.3 Ensure the layout remains responsive and handles dark mode correctly for the new components.
