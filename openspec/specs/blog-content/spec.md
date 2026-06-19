# Blog Content

## Purpose

Content model supports multi-language; filtering articles by locale during build.

## Requirements

### Requirement: Blog content collection with schema
The system SHALL provide a Content Collection named `blog` whose source files SHALL be organized under slug-specific subdirectories with locale-specific filenames (e.g. `src/content/blog/[slug]/zh-TW.md`) or series-grouped directories (e.g. `src/content/blog/[seriesId]/[slug]/zh-TW.md`). The system SHALL define its schema in `src/content.config.ts` using Astro's `defineCollection` with a Zod schema for frontmatter validation. Tags SHALL be validated directly via the blog schema using `z.array(z.enum(TAG_IDS))`; no external `_meta.ts` file SHALL be required for tag management.

#### Scenario: Valid frontmatter passes validation
- **WHEN** a markdown or MDX file in the blog content directory has frontmatter that matches the defined schema (e.g. title, description, pubDate)
- **THEN** the file is included in the collection and is available at build time for filtering by locale

##### Example: Post with required frontmatter fields
- **GIVEN** `src/content/blog/hello-world/zh-TW.md` has frontmatter `title: "Hello World"`, `description: "My first post"`, `pubDate: 2024-01-01`
- **WHEN** `pnpm build` is run
- **THEN** the entry is included in the blog collection with `data.title === "Hello World"` and `data.pubDate` as a Date instance

#### Scenario: Missing required field
- **WHEN** a post omits a required field (e.g. title or pubDate)
- **THEN** validation SHALL fail and the build SHALL report the error

##### Example: Post missing pubDate fails build
- **GIVEN** `src/content/blog/test-post/zh-TW.md` has `title: "Test"` and `description: "desc"` but omits `pubDate`
- **WHEN** `pnpm build` is run
- **THEN** Astro reports a Zod validation error for the missing `pubDate` field and exits with a non-zero code


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

---
### Requirement: Frontmatter fields for blog posts
The blog collection schema SHALL require at least: `title` (string), `description` (string), and `pubDate` (date or ISO string). The schema SHALL support an optional `series` field validated as `z.enum(SERIES_IDS)` for type-safe series membership. The schema SHALL support an optional `seriesOrder` field (`z.number().int().positive()`) for explicit post ordering within a series. It SHALL support optional fields including `draft`, `tags`, `image`, and `updated`.

#### Scenario: Required fields present
- **WHEN** a post includes title, description, and pubDate in frontmatter
- **THEN** the post is valid and can be rendered for that locale

##### Example: Post with all required fields validates successfully
- **GIVEN** `src/content/blog/example/zh-TW.md` has `title: "Example"`, `description: "An example post"`, `pubDate: 2024-03-15`
- **WHEN** `pnpm build` is run
- **THEN** the post is included in the collection with `data.title === "Example"` and `data.pubDate` as a Date instance

#### Scenario: Missing required field
- **WHEN** a post omits a required field (e.g. title or pubDate)
- **THEN** validation SHALL fail and the build SHALL report the error

##### Example: Post missing title fails build
- **GIVEN** `src/content/blog/no-title/zh-TW.md` has `description: "No title"` and `pubDate: 2024-03-15` but omits `title`
- **WHEN** `pnpm build` is run
- **THEN** Astro reports a Zod validation error for the missing required `title` field

#### Scenario: Series field included with valid value
- **WHEN** a post includes `series: typescript-guide` and `typescript-guide` is in `SERIES_IDS`
- **THEN** the post is associated with that series and can display series navigation

#### Scenario: Series field with unknown value rejected
- **WHEN** a post includes a `series` value not present in `SERIES_IDS`
- **THEN** schema validation SHALL fail and the build SHALL report the error


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

---
### Requirement: Markdown and optional MDX source
The system SHALL support `.md` and `.mdx` files in the blog collection. The system SHALL enable the MDX integration to support rich interactive features within content. Source files MAY be organized in locale subdirectories under the blog content root.

#### Scenario: Markdown file is loaded
- **WHEN** a `.md` file exists in the blog content directory (or a locale subdirectory thereof) with valid frontmatter including `lang`
- **THEN** it is included in the collection and its body is available for rendering when that locale is requested

#### Scenario: MDX file is loaded
- **WHEN** a `.mdx` file exists in the blog content directory with valid frontmatter
- **THEN** it is included in the collection and can use Astro components within its body

---
### Requirement: Reading time display

The system SHALL compute an estimated reading time for each blog post (e.g. from the post body character or word count and a constant words-per-minute or characters-per-minute) and SHALL display this reading time (e.g. "約 N 分鐘" / "N min read") on the single post layout (PostLayout) and on each post summary in the blog list (PostCard). The estimate MAY be rounded up to the nearest minute; very short content MAY be shown as "少於 1 分鐘" or omitted. The computation SHALL be deterministic at build time and SHALL NOT require changes to the blog content schema (body is already available).

#### Scenario: Single post shows reading time
- **WHEN** a single post page is rendered
- **THEN** the post layout SHALL display the estimated reading time for that post's content

#### Scenario: Blog list shows reading time per post
- **WHEN** the blog list page is rendered
- **THEN** each post card (or summary) SHALL display the estimated reading time for that post

---
### Requirement: Updated date display

When a blog post has an optional `updated` field in its frontmatter, the system SHALL display an "updated on" (or equivalent) date on the single post page (e.g. "更新於 YYYY-MM-DD" or "Updated on YYYY-MM-DD"). The system SHALL display this only when `updated` is present; when it is absent, no updated date SHALL be shown. The format MAY be locale-aware. If `updated` equals the publication date, the system MAY omit the updated line to avoid redundancy.

#### Scenario: Post with updated shows date
- **WHEN** a post has frontmatter `updated` set to a valid date
- **THEN** the single post page SHALL show a visible "updated on" date in a consistent position (e.g. near the publication date or at the end of the article metadata)

#### Scenario: Post without updated
- **WHEN** a post does not have `updated` in frontmatter
- **THEN** the single post page SHALL NOT display an "updated on" line (no requirement to show publication date only as "updated")

---
### Requirement: Draft post visibility in development
The system SHALL include blog posts marked with `draft: true` in the content collections when the application is running in the development environment (e.g., `import.meta.env.DEV` is true). These posts SHALL be available for previewing but SHALL NOT be included in production builds.

#### Scenario: Draft post visible in dev
- **WHEN** a post has `draft: true` in frontmatter and the system is running in development mode
- **THEN** the post SHALL be available in the blog collection and rendered on its preview URL

#### Scenario: Draft post hidden in production
- **WHEN** a post has `draft: true` in frontmatter and the system is running a production build
- **THEN** the post SHALL NOT be included in the build output and its URL SHALL NOT be reachable

---
### Requirement: Directory-based series grouping
The system SHALL identify blog series based on directory hierarchy. Files located in a subdirectory of the blog collection (e.g., `src/content/blog/[seriesId]/[slug]/`) SHALL be automatically associated with the series `seriesId`.

#### Scenario: Post belongs to a series
- **WHEN** a post is located in a nested directory under a series folder
- **THEN** the system SHALL extract the series ID from the path and make it available for series navigation

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
### Requirement: about collection locale from filename
The system SHALL provide a Content Collection named `about` whose locale is derived from the source filename (e.g. `zh-TW.md` yields locale `zh-TW`, `en.md` yields locale `en`). The about collection schema SHALL NOT include a `lang` field; any existing `lang` frontmatter key in about source files SHALL be removed. The locale derivation logic for `about` SHALL be consistent with the locale derivation used for the `blog` collection.

#### Scenario: about entry locale matches filename
- **WHEN** an about source file is named `zh-TW.md`
- **THEN** the locale for that entry is `zh-TW` as derived from the filename

#### Scenario: about frontmatter lang field rejected
- **WHEN** an about source file contains a `lang:` frontmatter field after migration
- **THEN** the schema SHALL reject the extra field or ignore it, with no runtime `data.lang` property exposed

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