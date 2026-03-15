# i18n-routing

## Purpose

Define i18n and routing behavior: Astro i18n configuration, per-locale page generation, locale-aware links, root path redirection based on device locale, and locale switcher.

## Requirements

### Requirement: Astro i18n configuration

The system SHALL configure Astro's built-in i18n in `astro.config.mjs` with supported locales `en` and `zh-TW`, a default locale (e.g. `zh-TW`), and `prefixDefaultLocale: false` so that the default locale is served at the site root and the non-default locale is served under a path prefix (e.g. `/en/`).

#### Scenario: Config defines locales and default
- **WHEN** the site is built
- **THEN** the Astro config SHALL include `i18n.locales`, `i18n.defaultLocale`, and `i18n.prefixDefaultLocale` such that the default locale has no path prefix and other locales have a prefix

---
### Requirement: Per-locale page generation

The system SHALL generate static pages for each supported locale so that the home page, blog list page, and single post pages exist for every locale (e.g. `/` and `/en/` for home, `/blog/` and `/en/blog/` for list, `/blog/<slug>` and `/en/blog/<slug>` for posts).

#### Scenario: Each locale has home and blog routes
- **WHEN** a user requests a URL that includes a valid locale (or the default locale at root)
- **THEN** the corresponding page for that locale is served

---
### Requirement: Locale-aware internal links

The system SHALL use Astro's locale-aware APIs (e.g. `getRelativeLocaleUrl`) or equivalent logic when generating internal links (e.g. navigation, post links) so that links preserve or target the current locale.

#### Scenario: Navigation link keeps current locale
- **WHEN** a user is on a locale-prefixed page (e.g. `/en/blog/`) and clicks a site navigation link
- **THEN** the link SHALL point to the same locale (e.g. `/en/` or `/en/blog/...`)

---
### Requirement: Root path and locale detection

The system SHALL serve at the site root (`/`) a page or redirect logic that SHALL, via client-side script, detect the user's preferred language (e.g. from `navigator.languages`). If the user's preferred language is English, the system SHALL redirect to `/en/`.

#### Scenario: Redirect based on browser preference
- **WHEN** a user visits the root path (`/`) with English browser preference
- **THEN** the system SHALL redirect to `/en/`.

---
### Requirement: Independent Tag Module
The system SHALL provide an independent tag module accessible at `/[locale]/tag/[tagId]` which aggregates content across all supported collections (e.g. Blog). It SHALL resolve tags from both Markdown frontmatter and the `_meta.ts` shared metadata files.

#### Scenario: Tag page aggregates content
- **WHEN** a user visits `/[locale]/tag/[tagId]`
- **THEN** the page SHALL list all items from supported collections that match the specified tag ID within the current locale context.


<!-- @trace
source: modern-content-structure
updated: 2026-03-15
code:
  - src/content/blog/only-english/_meta.ts
  - package.json
  - src/utils/content.ts
  - src/content/blog/test-series/01-first/en.md
  - src/content/blog/test-series-2/en.mdx
  - src/content/blog/test-series/02-second/_meta.ts
  - src/layouts/PostLayout.astro
  - src/pages/[...lang]/blog/[...slug].astro
  - src/pages/[...lang]/tag/[tagId].astro
  - src/content/blog/i18n-demo/_meta.ts
  - src/components/PostCard.astro
  - src/components/blog/RelatedPosts.astro
  - src/content/blog/test-series/02-second/en.mdx
  - src/components/blog/SeriesNav.astro
  - src/content/blog/second-post/_meta.ts
  - src/content/blog/test-series-1/en.md
  - src/pages/[...lang]/blog/index.astro
  - src/content.config.ts
  - src/content/blog/test-series/01-first/_meta.ts
  - src/data/tags.ts
  - src/content/blog/hello-world/_meta.ts
tests:
  - src/utils/content.test.ts
  - src/utils/reading-time.test.ts
  - src/data/tags.test.ts
-->

---
### Requirement: Locale switcher

The system SHALL provide a locale switcher (e.g. in the Header) that SHALL link to the same logical page in the other locale (e.g. from `/en/blog/my-post` to the zh-TW equivalent if it exists, or to the other locale's blog list or home).

#### Scenario: Switcher links to other locale
- **WHEN** a user clicks the locale switcher
- **THEN** they SHALL be taken to the current page's counterpart in the other locale, or to a fallback URL for that locale (e.g. home or blog list)

---
### Requirement: Series path parsing
The system SHALL parse content IDs from multi-level directory paths (e.g., `series/slug/lang`) to correctly resolve slugs and series associations without requiring explicit fields in the content files.

#### Scenario: Slug is extracted correctly
- **WHEN** a post is located at `src/content/blog/my-series/01-first-post/zh-TW.md`
- **THEN** the system SHALL extract `my-series` as the series and `first-post` as the slug (stripping numerical prefixes if present)

<!-- @trace
source: modern-content-structure
updated: 2026-03-15
code:
  - src/content/blog/only-english/_meta.ts
  - package.json
  - src/utils/content.ts
  - src/content/blog/test-series/01-first/en.md
  - src/content/blog/test-series-2/en.mdx
  - src/content/blog/test-series/02-second/_meta.ts
  - src/layouts/PostLayout.astro
  - src/pages/[...lang]/blog/[...slug].astro
  - src/pages/[...lang]/tag/[tagId].astro
  - src/content/blog/i18n-demo/_meta.ts
  - src/components/PostCard.astro
  - src/components/blog/RelatedPosts.astro
  - src/content/blog/test-series/02-second/en.mdx
  - src/components/blog/SeriesNav.astro
  - src/content/blog/second-post/_meta.ts
  - src/content/blog/test-series-1/en.md
  - src/pages/[...lang]/blog/index.astro
  - src/content.config.ts
  - src/content/blog/test-series/01-first/_meta.ts
  - src/data/tags.ts
  - src/content/blog/hello-world/_meta.ts
tests:
  - src/utils/content.test.ts
  - src/utils/reading-time.test.ts
  - src/data/tags.test.ts
-->