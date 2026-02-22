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

### Requirement: Tag links from list and post

The system SHALL provide links to the corresponding tag page from the blog list and from the single post page (e.g. each tag displayed as a link to `/blog/tag/[tag]` or the locale-prefixed equivalent), so that users can navigate to all posts with that tag in the current locale.

#### Scenario: Post page links to tag pages
- **WHEN** a single post has frontmatter `tags: ['a', 'b']`
- **THEN** the post layout SHALL render links to the tag pages for the current locale for each tag (e.g. `/en/blog/tag/a`, `/en/blog/tag/b`)

#### Scenario: Blog list or tag page links to tag pages
- **WHEN** the blog list or a tag page displays posts (with tags)
- **THEN** each tag SHALL be linkable to its tag page for the current locale so users can discover more posts by tag

### Requirement: URL-safe tag handling

Tag segment in the URL SHALL be URL-encoded (e.g. using a consistent encoding/decoding). The system SHALL define how tags containing spaces or special characters are represented in the URL (e.g. slugified or encoded) and SHALL resolve the tag page using the same convention.

#### Scenario: Tag with special characters
- **WHEN** a tag contains characters that are not safe for URLs
- **THEN** the system SHALL use a consistent encoding or slug so that the tag page URL is valid and the correct tag is resolved at build or request time

