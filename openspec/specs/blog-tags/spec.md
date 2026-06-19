# blog-tags Specification

## Purpose
TBD - created by archiving change blog-content-ux-batch. Update Purpose after archive.

## Requirements

### Requirement: Tag page per locale

The system SHALL provide a tag page for each supported locale at a stable path pattern (e.g. `/blog/tag/[tag]` for the default locale and `/en/blog/tag/[tag]` for English). Each tag page SHALL list only blog posts that belong to that locale (matching the post's `lang` field) and whose `tags` array includes the requested tag. Posts SHALL be ordered consistently with the main blog list (e.g. by publication date, newest first). Draft posts SHALL be excluded.

#### Scenario: Tag page shows only that locale's posts with that tag
- **WHEN** a user visits a tag page URL for a given locale and tag (e.g. `/en/blog/tag/astro`)
- **THEN** the page SHALL display only posts where `lang` matches the locale and `tags` includes the given tag, excluding drafts, in the same order as the blog list

#### Scenario: Invalid or empty tag
- **WHEN** the requested tag does not match any post in that locale (or tag is missing)
- **THEN** the system MAY show an empty list or a 404; behaviour SHALL be defined and consistent

---
### Requirement: Tag links from list and post
The system SHALL provide links to the corresponding tag page from the blog list and from the single post page. Each tag SHALL display its localized name derived from the Master Tag Registry based on the current page's locale.

#### Scenario: Post page links to localized tag pages
- **WHEN** a single post has tags defined in its shared metadata
- **THEN** the post layout SHALL render links displaying the localized tag names (e.g. "教學" instead of "tutorial" when locale is zh-TW)


<!-- @trace
source: tag-registry-optimization
updated: 2026-03-15
code:
  - src/pages/[...lang]/blog/[...slug].astro
  - src/content/blog/i18n-demo/_meta.ts
  - src/components/PostCard.astro
  - src/pages/[...lang]/tag/[tagId].astro
  - src/content/blog/test-series/01-first/en.md
  - src/content/blog/hello-world/_meta.ts
  - src/content/blog/test-series/01-first/_meta.ts
  - src/components/blog/RelatedPosts.astro
  - src/content/blog/only-english/_meta.ts
  - src/content/blog/test-series/02-second/_meta.ts
  - src/utils/content.ts
  - src/content/blog/test-series/02-second/en.mdx
  - src/content.config.ts
  - src/content/blog/second-post/_meta.ts
  - src/content/blog/test-series-1/en.md
  - src/components/blog/SeriesNav.astro
  - src/data/tags.ts
  - package.json
  - src/pages/[...lang]/blog/index.astro
  - src/content/blog/test-series-2/en.mdx
  - src/layouts/PostLayout.astro
tests:
  - src/utils/content.test.ts
  - src/data/tags.test.ts
  - src/utils/reading-time.test.ts
-->

---
### Requirement: URL-safe tag handling

Tag segment in the URL SHALL be URL-encoded (e.g. using a consistent encoding/decoding). The system SHALL define how tags containing spaces or special characters are represented in the URL (e.g. slugified or encoded) and SHALL resolve the tag page using the same convention.

#### Scenario: Tag with special characters
- **WHEN** a tag contains characters that are not safe for URLs
- **THEN** the system SHALL use a consistent encoding or slug so that the tag page URL is valid and the correct tag is resolved at build or request time

---
### Requirement: Master Tag Registry
The system SHALL maintain a central registry of all valid tag IDs and their corresponding localized display names AND optional localized descriptions. Any tag used in content metadata MUST exist in this registry.

#### Scenario: Tag display name is resolved
- **WHEN** a component requests the display name for tag ID "astro" in locale "zh-TW"
- **THEN** the system SHALL return "Astro" as defined in the registry.

#### Scenario: Tag description is resolved
- **WHEN** a component requests the description for tag ID "astro" in locale "zh-TW"
- **THEN** the system SHALL return the localized description if defined, or undefined if not.


<!-- @trace
source: improve-tag-system
updated: 2026-03-17
code:
  - src/i18n/en.json
  - src/content.config.ts
  - src/pages/[...lang]/tag/index.astro
  - src/components/theme/ThemeToggle.astro
  - src/data/tags.ts
  - src/i18n/zh-TW.json
  - src/pages/[...lang]/tag/[tagId].astro
tests:
  - src/data/tags.test.ts
-->

---
### Requirement: Build-time Tag Validation
The content processing pipeline SHALL validate that all tag IDs provided in `_meta.ts` files are registered in the Master Tag Registry. The build SHALL fail if an unregistered tag ID is encountered.

#### Scenario: Unregistered tag fails build
- **WHEN** a `_meta.ts` file contains a tag ID not present in the Master Tag Registry
- **THEN** the build system SHALL report a validation error and abort the build.

<!-- @trace
source: tag-registry-optimization
updated: 2026-03-15
code:
  - src/pages/[...lang]/blog/[...slug].astro
  - src/content/blog/i18n-demo/_meta.ts
  - src/components/PostCard.astro
  - src/pages/[...lang]/tag/[tagId].astro
  - src/content/blog/test-series/01-first/en.md
  - src/content/blog/hello-world/_meta.ts
  - src/content/blog/test-series/01-first/_meta.ts
  - src/components/blog/RelatedPosts.astro
  - src/content/blog/only-english/_meta.ts
  - src/content/blog/test-series/02-second/_meta.ts
  - src/utils/content.ts
  - src/content/blog/test-series/02-second/en.mdx
  - src/content.config.ts
  - src/content/blog/second-post/_meta.ts
  - src/content/blog/test-series-1/en.md
  - src/components/blog/SeriesNav.astro
  - src/data/tags.ts
  - package.json
  - src/pages/[...lang]/blog/index.astro
  - src/content/blog/test-series-2/en.mdx
  - src/layouts/PostLayout.astro
tests:
  - src/utils/content.test.ts
  - src/data/tags.test.ts
  - src/utils/reading-time.test.ts
-->

---
### Requirement: Tag Description Support
The Master Tag Registry SHALL allow optional localized descriptions for each tag.

#### Scenario: Tag registry includes description
- **WHEN** a tag is defined in `src/data/tags.ts`
- **THEN** it SHALL be possible to include a `description` object containing localized strings for each supported locale


<!-- @trace
source: improve-tag-system
updated: 2026-03-17
code:
  - src/i18n/en.json
  - src/content.config.ts
  - src/pages/[...lang]/tag/index.astro
  - src/components/theme/ThemeToggle.astro
  - src/data/tags.ts
  - src/i18n/zh-TW.json
  - src/pages/[...lang]/tag/[tagId].astro
tests:
  - src/data/tags.test.ts
-->

---
### Requirement: Tag Page Displays Description
The individual tag page at `/tag/[tagId]` (and localized variants) SHALL display the tag's localized description from the registry if available.

#### Scenario: Tag description is rendered
- **WHEN** a tag has a description in the registry
- **AND** a user visits its corresponding tag page
- **THEN** the description SHALL be rendered in the header section of the page


<!-- @trace
source: improve-tag-system
updated: 2026-03-17
code:
  - src/i18n/en.json
  - src/content.config.ts
  - src/pages/[...lang]/tag/index.astro
  - src/components/theme/ThemeToggle.astro
  - src/data/tags.ts
  - src/i18n/zh-TW.json
  - src/pages/[...lang]/tag/[tagId].astro
tests:
  - src/data/tags.test.ts
-->

---
### Requirement: Tag SEO metadata optimization
The individual tag page SHALL use the tag's localized description as its meta description when available.

#### Scenario: SEO description uses tag description
- **WHEN** a tag page is rendered
- **AND** the tag has a localized description in the registry
- **THEN** the page's `<meta name="description">` SHALL use that localized tag description

<!-- @trace
source: improve-tag-system
updated: 2026-03-17
code:
  - src/i18n/en.json
  - src/content.config.ts
  - src/pages/[...lang]/tag/index.astro
  - src/components/theme/ThemeToggle.astro
  - src/data/tags.ts
  - src/i18n/zh-TW.json
  - src/pages/[...lang]/tag/[tagId].astro
tests:
  - src/data/tags.test.ts
-->

---
### Requirement: Registry validation CLI script
The system SHALL provide a Node.js script at `scripts/check-registries.mjs` that validates all `tags` and `series` frontmatter values used across `src/content/blog/`, `src/content/til/`, and `src/content/notes/` against their corresponding i18n registry files (`tags.json` and `series.json`). The script SHALL be executable via `pnpm check-registries` and SHALL be included in the `pnpm check` script chain. The script SHALL use `gray-matter` for frontmatter parsing and SHALL NOT depend on the Astro runtime.

#### Scenario: All tags and series have registry entries
- **WHEN** `pnpm check-registries` is executed and every tag and series value used in content files has a matching entry in the corresponding zh-TW registry
- **THEN** the script SHALL exit 0 and print a summary: `✓ {N} tags, {M} series — all registry entries present.`

#### Scenario: Missing tag registry entry
- **WHEN** a content file uses a tag value not present in `src/i18n/messages/zh-TW/tags.json` registry
- **THEN** the script SHALL exit 1 and print the missing tag name and the file paths where it is used

#### Scenario: Missing series registry entry
- **WHEN** a content file uses a `series` value not present in `src/i18n/messages/zh-TW/series.json` registry
- **THEN** the script SHALL exit 1 and print the missing series ID and the file paths where it is used

#### Scenario: check-registries runs as part of pnpm check
- **WHEN** `pnpm check` is executed
- **THEN** `check-registries` SHALL run as part of the command chain, and `pnpm check` SHALL fail if `check-registries` exits 1

##### Example: output format on failure
```
Missing tag registry entries in zh-TW:
  "cooking"
    src/content/til/2025-01-01-pasta.md

Missing series registry entries in zh-TW:
  "cooking-series"
    src/content/blog/cooking-series/01-intro.zh-TW.md

→ Add missing entries to the corresponding i18n registry files.
```

<!-- @trace
source: content-schema-refactor
updated: 2026-06-20
code:
  - package.json
  - src/components/blog/SeriesNav.astro
  - src/layouts/PostLayout.astro
  - scripts/check-registries.mjs
  - src/content/til/.gitkeep
  - src/content.config.ts
  - src/content/about/en.md
  - src/content/about/zh-TW.md
  - src/i18n/messages/zh-TW/series.json
  - src/pages/[...lang]/about.astro
  - src/i18n/index.ts
  - src/content/notes/.gitkeep
  - src/utils/content.ts
  - src/i18n/messages/en/series.json
  - src/components/PostCard.astro
tests:
  - src/utils/content.test.ts
-->