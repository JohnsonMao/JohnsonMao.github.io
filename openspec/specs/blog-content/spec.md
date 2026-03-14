# Blog Content

## Purpose

Content model supports multi-language; filtering articles by locale during build.
## Requirements
### Requirement: Blog content collection with schema
The system SHALL provide a Content Collection named `blog` whose source files SHALL be organized under slug-specific subdirectories with locale-specific filenames (e.g. `src/content/blog/[slug]/zh-TW.md`, `src/content/blog/[slug]/en.md`) and SHALL define its schema in `src/content/config.ts` using Astro's `defineCollection` with a Zod schema for frontmatter validation. The locale of each entry SHALL be derived from its filename or directory structure.

#### Scenario: Valid frontmatter passes validation
- **WHEN** a markdown or MDX file in the blog content directory has frontmatter that matches the defined schema (e.g. title, description, pubDate, series)
- **THEN** the file is included in the collection and is available at build time for filtering by locale

#### Scenario: Invalid frontmatter fails build
- **WHEN** a markdown or MDX file has missing required fields or invalid types in frontmatter
- **THEN** the build SHALL fail with a clear validation error

### Requirement: Frontmatter fields for blog posts
The blog collection schema SHALL require at least: `title` (string), `description` (string), and `pubDate` (date or ISO string). It SHALL support an optional `series` field (string) for grouping related posts. It MAY support optional fields such as `draft`, `tags`, or `updated`. Tags defined here SHALL be processed by the Independent Tag Module.

#### Scenario: Required fields present
- **WHEN** a post includes title, description, and pubDate in frontmatter
- **THEN** the post is valid and can be rendered for that locale

#### Scenario: Missing required field
- **WHEN** a post omits a required field (e.g. title or pubDate)
- **THEN** validation SHALL fail and the build SHALL report the error

#### Scenario: Series field included
- **WHEN** a post includes a `series` field in frontmatter
- **THEN** the post is associated with that series and can display series navigation

### Requirement: Markdown and optional MDX source
The system SHALL support `.md` and `.mdx` files in the blog collection. The system SHALL enable the MDX integration to support rich interactive features within content. Source files MAY be organized in locale subdirectories under the blog content root.

#### Scenario: Markdown file is loaded
- **WHEN** a `.md` file exists in the blog content directory (or a locale subdirectory thereof) with valid frontmatter including `lang`
- **THEN** it is included in the collection and its body is available for rendering when that locale is requested

#### Scenario: MDX file is loaded
- **WHEN** a `.mdx` file exists in the blog content directory with valid frontmatter
- **THEN** it is included in the collection and can use Astro components within its body

### Requirement: Reading time display

The system SHALL compute an estimated reading time for each blog post (e.g. from the post body character or word count and a constant words-per-minute or characters-per-minute) and SHALL display this reading time (e.g. "約 N 分鐘" / "N min read") on the single post layout (PostLayout) and on each post summary in the blog list (PostCard). The estimate MAY be rounded up to the nearest minute; very short content MAY be shown as "少於 1 分鐘" or omitted. The computation SHALL be deterministic at build time and SHALL NOT require changes to the blog content schema (body is already available).

#### Scenario: Single post shows reading time
- **WHEN** a single post page is rendered
- **THEN** the post layout SHALL display the estimated reading time for that post's content

#### Scenario: Blog list shows reading time per post
- **WHEN** the blog list page is rendered
- **THEN** each post card (or summary) SHALL display the estimated reading time for that post

### Requirement: Updated date display

When a blog post has an optional `updated` field in its frontmatter, the system SHALL display an "updated on" (or equivalent) date on the single post page (e.g. "更新於 YYYY-MM-DD" or "Updated on YYYY-MM-DD"). The system SHALL display this only when `updated` is present; when it is absent, no updated date SHALL be shown. The format MAY be locale-aware. If `updated` equals the publication date, the system MAY omit the updated line to avoid redundancy.

#### Scenario: Post with updated shows date
- **WHEN** a post has frontmatter `updated` set to a valid date
- **THEN** the single post page SHALL show a visible "updated on" date in a consistent position (e.g. near the publication date or at the end of the article metadata)

#### Scenario: Post without updated
- **WHEN** a post does not have `updated` in frontmatter
- **THEN** the single post page SHALL NOT display an "updated on" line (no requirement to show publication date only as "updated")

### Requirement: Draft post visibility in development
The system SHALL include blog posts marked with `draft: true` in the content collections when the application is running in the development environment (e.g., `import.meta.env.DEV` is true). These posts SHALL be available for previewing but SHALL NOT be included in production builds.

#### Scenario: Draft post visible in dev
- **WHEN** a post has `draft: true` in frontmatter and the system is running in development mode
- **THEN** the post SHALL be available in the blog collection and rendered on its preview URL

#### Scenario: Draft post hidden in production
- **WHEN** a post has `draft: true` in frontmatter and the system is running a production build
- **THEN** the post SHALL NOT be included in the build output and its URL SHALL NOT be reachable

