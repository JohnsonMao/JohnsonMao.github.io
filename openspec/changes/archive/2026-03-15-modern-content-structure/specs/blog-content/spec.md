## MODIFIED Requirements

### Requirement: Blog content collection with schema
The system SHALL provide a Content Collection named `blog` whose source files SHALL be organized under slug-specific subdirectories with locale-specific filenames (e.g. `src/content/blog/[slug]/zh-TW.md`) or series-grouped directories (e.g. `src/content/blog/[seriesId]/[slug]/zh-TW.md`). The system SHALL define its schema in `src/content/config.ts` using Astro's `defineCollection` with a Zod schema for frontmatter validation. Tags SHALL be managed externally via a `_meta.ts` file in the same directory as the content.

#### Scenario: Valid frontmatter passes validation
- **WHEN** a markdown or MDX file in the blog content directory has frontmatter that matches the defined schema (e.g. title, description, pubDate)
- **THEN** the file is included in the collection and is available at build time for filtering by locale

#### Scenario: Missing required field
- **WHEN** a post omits a required field (e.g. title or pubDate)
- **THEN** validation SHALL fail and the build SHALL report the error

### Requirement: Shared metadata via _meta.ts
The system SHALL load shared metadata (e.g., tags) from a `_meta.ts` file located in the same directory as the content files. These attributes SHALL be automatically merged with the frontmatter of each language version during content processing.

#### Scenario: Tags are synchronized across locales
- **WHEN** a `_meta.ts` file defines a list of tags in an article directory
- **THEN** those tags SHALL be applied to all language versions of that article

## ADDED Requirements

### Requirement: Directory-based series grouping
The system SHALL identify blog series based on directory hierarchy. Files located in a subdirectory of the blog collection (e.g., `src/content/blog/[seriesId]/[slug]/`) SHALL be automatically associated with the series `seriesId`.

#### Scenario: Post belongs to a series
- **WHEN** a post is located in a nested directory under a series folder
- **THEN** the system SHALL extract the series ID from the path and make it available for series navigation
