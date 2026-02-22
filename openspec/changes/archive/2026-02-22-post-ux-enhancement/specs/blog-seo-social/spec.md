## ADDED Requirements

### Requirement: JSON-LD BlogPosting structured data
The system SHALL inject a `<script type="application/ld+json">` block into the `<head>` of single blog post pages. This block SHALL contain structured data following the `BlogPosting` schema (Schema.org), including at least: `headline`, `description`, `datePublished`, `dateModified` (if available), `author`, `publisher`, and `image`.

#### Scenario: JSON-LD present in post head
- **WHEN** a blog post page is rendered
- **THEN** the HTML `<head>` SHALL contain a valid `BlogPosting` JSON-LD object with data derived from the post's frontmatter
