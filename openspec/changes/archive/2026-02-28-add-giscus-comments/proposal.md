## Why

A blog should be more than just a static site; it should be a place for discussion and feedback. Integrating Giscus will allow readers to comment on blog posts using their GitHub accounts, fostering community interaction and providing valuable feedback to the author.

## What Changes

- **Add Giscus Comment Component**: Create a reusable Astro component for Giscus.
- **PostLayout Integration**: Embed the Giscus component at the bottom of each blog post in `PostLayout`.
- **Theme Synchronization**: Ensure Giscus theme (light/dark) matches the site's current theme and responds to theme toggles.
- **Multi-language Support**: Pass the current locale (en/zh-TW) to Giscus to localize its interface.
- **New Translation Strings**: Add `blog.comments` to `i18n` files for the comment section heading.

## Capabilities

### New Capabilities
- `blog-comments`: Reader interaction via GitHub-powered comments using Giscus.

### Modified Capabilities
- `i18n-ui`: Addition of `blog.comments` translation key to support localized comment section headings.
- `blog-post-ux`: Inclusion of a comment section as part of the blog post reading experience.

## Impact

- **Affected Code**: `src/layouts/PostLayout.astro`, `src/i18n/*.json`.
- **New Components**: `src/components/blog/Giscus.astro`.
- **Dependencies**: No new npm dependencies required (Giscus is loaded via script).
- **External Dependencies**: GitHub repository must have "Discussions" enabled and Giscus App installed.
