# Blog Content

## Purpose

定義部落格內容集合與 frontmatter 結構，供站點建置時驗證與渲染使用。

## Requirements

### Requirement: Blog content collection with schema

The system SHALL provide a Content Collection named `blog` under `src/content/blog/` and SHALL define its schema in `src/content/config.ts` using Astro's `defineCollection` with a Zod schema for frontmatter validation.

#### Scenario: Valid frontmatter passes validation
- **WHEN** a markdown file in `src/content/blog/` has frontmatter that matches the defined schema (e.g. title, description, pubDate)
- **THEN** the file is included in the collection and is available at build time

#### Scenario: Invalid frontmatter fails build
- **WHEN** a markdown file has missing required fields or invalid types in frontmatter
- **THEN** the build SHALL fail with a clear validation error

### Requirement: Frontmatter fields for blog posts

The blog collection schema SHALL require at least: `title` (string), `description` (string), and `pubDate` (date or ISO string). It MAY support optional fields such as `draft`, `tags`, or `updated`.

#### Scenario: Required fields present
- **WHEN** a post includes title, description, and pubDate in frontmatter
- **THEN** the post is valid and can be rendered

#### Scenario: Missing required field
- **WHEN** a post omits a required field (e.g. pubDate)
- **THEN** validation SHALL fail and the build SHALL report the error

### Requirement: Markdown and optional MDX source

The system SHALL support `.md` files in the blog collection. The system MAY support `.mdx` files when the MDX integration is enabled.

#### Scenario: Markdown file is loaded
- **WHEN** a `.md` file exists in `src/content/blog/`
- **THEN** it is included in the collection and its body is available for rendering
