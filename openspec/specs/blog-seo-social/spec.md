# blog-seo-social Specification

## Purpose
Support social sharing (Open Graph, Twitter Cards) and search engine visibility (JSON-LD BlogPosting).
## Requirements
### Requirement: Open Graph and Twitter Card meta in head

The system SHALL output in the `<head>` of each content page (home, blog list, single post) the following meta tags for social preview: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, and for Twitter: `twitter:card` (e.g. summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`. Image URLs SHALL be absolute (using the configured site base URL). The system SHALL support a site-wide default OG image and MAY allow per-page override (e.g. from post frontmatter).

#### Scenario: Single post has OG meta
- **WHEN** a user shares a single blog post URL on a platform that reads OG meta
- **THEN** the shared preview SHALL show that post's title, description, and image (or default) as defined by the page's meta tags

#### Scenario: Default image when page does not specify
- **WHEN** a page (e.g. home or blog list) does not provide a custom image
- **THEN** the system SHALL use the site-wide default OG image if configured

#### Scenario: Meta use absolute URLs
- **WHEN** og:image or og:url is output
- **THEN** each SHALL use the full base URL from site config (e.g. `https://example.com/...`)

### Requirement: Consistent meta from layout

The system SHALL produce these meta tags from a shared layout or head component (e.g. BaseLayout or a dedicated SeoHead) so that all content pages receive consistent behaviour and per-page values (title, description, image) are passed as props or derived from page data.

#### Scenario: All content pages have social meta
- **WHEN** the site is built
- **THEN** the home page, blog list page(s), and each single post page SHALL include the required OG and Twitter Card meta in the rendered HTML head

### Requirement: JSON-LD BlogPosting structured data
The system SHALL inject a `<script type="application/ld+json">` block into the `<head>` of single blog post pages. This block SHALL contain structured data following the `BlogPosting` schema (Schema.org), including at least: `headline`, `description`, `datePublished`, `dateModified` (if available), `author`, `publisher`, and `image`.

#### Scenario: JSON-LD present in post head
- **WHEN** a blog post page is rendered
- **THEN** the HTML `<head>` SHALL contain a valid `BlogPosting` JSON-LD object with data derived from the post's frontmatter
