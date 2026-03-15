## MODIFIED Requirements

### Requirement: Independent Tag Module
The system SHALL provide an independent tag module accessible at `/[locale]/tag/[tagId]` which aggregates content across all supported collections (e.g. Blog). It SHALL resolve tags from both Markdown frontmatter and the `_meta.ts` shared metadata files.

#### Scenario: Tag page aggregates content
- **WHEN** a user visits `/[locale]/tag/[tagId]`
- **THEN** the page SHALL list all items from supported collections that match the specified tag ID within the current locale context.

## ADDED Requirements

### Requirement: Series path parsing
The system SHALL parse content IDs from multi-level directory paths (e.g., `series/slug/lang`) to correctly resolve slugs and series associations without requiring explicit fields in the content files.

#### Scenario: Slug is extracted correctly
- **WHEN** a post is located at `src/content/blog/my-series/01-first-post/zh-TW.md`
- **THEN** the system SHALL extract `my-series` as the series and `first-post` as the slug (stripping numerical prefixes if present)
