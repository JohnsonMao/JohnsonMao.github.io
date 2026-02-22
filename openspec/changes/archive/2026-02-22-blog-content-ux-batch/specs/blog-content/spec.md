## ADDED Requirements

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
