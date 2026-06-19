## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: about collection locale from filename
The system SHALL provide a Content Collection named `about` whose locale is derived from the source filename (e.g. `zh-TW.md` yields locale `zh-TW`, `en.md` yields locale `en`). The about collection schema SHALL NOT include a `lang` field; any existing `lang` frontmatter key in about source files SHALL be removed. The locale derivation logic for `about` SHALL be consistent with the locale derivation used for the `blog` collection.

#### Scenario: about entry locale matches filename
- **WHEN** an about source file is named `zh-TW.md`
- **THEN** the locale for that entry is `zh-TW` as derived from the filename

#### Scenario: about frontmatter lang field rejected
- **WHEN** an about source file contains a `lang:` frontmatter field after migration
- **THEN** the schema SHALL reject the extra field or ignore it, with no runtime `data.lang` property exposed
