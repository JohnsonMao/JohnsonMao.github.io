# Blog Content (Delta)

## Purpose

內容模型支援語系；建置時能依語系過濾文章。

## MODIFIED Requirements

### Requirement: Blog content collection with schema

The system SHALL provide a Content Collection named `blog` whose source files MAY be organized under locale-specific subdirectories (e.g. `src/content/blog/zh-TW/`, `src/content/blog/en/`) and SHALL define its schema in `src/content/config.ts` using Astro's `defineCollection` with a Zod schema for frontmatter validation. The schema SHALL include a required `lang` field (e.g. `z.enum(['en', 'zh-TW'])`) so that each entry is associated with a single locale.

#### Scenario: Valid frontmatter with lang passes validation
- **WHEN** a markdown file in the blog content directory has frontmatter that matches the defined schema (e.g. title, description, pubDate, lang)
- **THEN** the file is included in the collection and is available at build time for filtering by locale

#### Scenario: Invalid frontmatter fails build
- **WHEN** a markdown file has missing required fields (including `lang`) or invalid types in frontmatter
- **THEN** the build SHALL fail with a clear validation error

### Requirement: Frontmatter fields for blog posts

The blog collection schema SHALL require at least: `title` (string), `description` (string), `pubDate` (date or ISO string), and `lang` (enum of supported locales, e.g. `'en' | 'zh-TW'`). It MAY support optional fields such as `draft`, `tags`, or `updated`.

#### Scenario: Required fields including lang present
- **WHEN** a post includes title, description, pubDate, and lang in frontmatter
- **THEN** the post is valid and can be rendered for that locale

#### Scenario: Missing required field
- **WHEN** a post omits a required field (e.g. pubDate or lang)
- **THEN** validation SHALL fail and the build SHALL report the error

### Requirement: Markdown and optional MDX source

The system SHALL support `.md` files in the blog collection. The system MAY support `.mdx` files when the MDX integration is enabled. Source files MAY be organized in locale subdirectories under the blog content root.

#### Scenario: Markdown file is loaded
- **WHEN** a `.md` file exists in the blog content directory (or a locale subdirectory thereof) with valid frontmatter including `lang`
- **THEN** it is included in the collection and its body is available for rendering when that locale is requested
