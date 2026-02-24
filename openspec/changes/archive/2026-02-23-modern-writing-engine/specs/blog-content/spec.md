## ADDED Requirements

### Requirement: Draft post visibility in development
The system SHALL include blog posts marked with `draft: true` in the content collections when the application is running in the development environment (e.g., `import.meta.env.DEV` is true). These posts SHALL be available for previewing but SHALL NOT be included in production builds.

#### Scenario: Draft post visible in dev
- **WHEN** a post has `draft: true` in frontmatter and the system is running in development mode
- **THEN** the post SHALL be available in the blog collection and rendered on its preview URL

#### Scenario: Draft post hidden in production
- **WHEN** a post has `draft: true` in frontmatter and the system is running a production build
- **THEN** the post SHALL NOT be included in the build output and its URL SHALL NOT be reachable

## MODIFIED Requirements

### Requirement: Blog content collection with schema
The system SHALL provide a Content Collection named `blog` whose source files MAY be organized under locale-specific subdirectories (e.g. `src/content/blog/zh-TW/`, `src/content/blog/en/`) and SHALL define its schema in `src/content/config.ts` using Astro's `defineCollection` with a Zod schema for frontmatter validation. The schema SHALL include a required `lang` field (e.g. `z.enum(['en', 'zh-TW'])`) so that each entry is associated with a single locale.

#### Scenario: Valid frontmatter with lang passes validation
- **WHEN** a markdown or MDX file in the blog content directory has frontmatter that matches the defined schema (e.g. title, description, pubDate, lang, series)
- **THEN** the file is included in the collection and is available at build time for filtering by locale

#### Scenario: Invalid frontmatter fails build
- **WHEN** a markdown or MDX file has missing required fields (including `lang`) or invalid types in frontmatter
- **THEN** the build SHALL fail with a clear validation error

### Requirement: Frontmatter fields for blog posts
The blog collection schema SHALL require at least: `title` (string), `description` (string), `pubDate` (date or ISO string), and `lang` (enum of supported locales, e.g. `'en' | 'zh-TW'`). It SHALL support an optional `series` field (string) for grouping related posts. It MAY support optional fields such as `draft`, `tags`, or `updated`. Tags defined here SHALL be processed by the Independent Tag Module.

#### Scenario: Required fields including lang present
- **WHEN** a post includes title, description, pubDate, and lang in frontmatter
- **THEN** the post is valid and can be rendered for that locale

#### Scenario: Missing required field
- **WHEN** a post omits a required field (e.g. pubDate or lang)
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
