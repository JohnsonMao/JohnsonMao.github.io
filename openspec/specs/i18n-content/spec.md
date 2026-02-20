# i18n-content

## Purpose

定義多語系內容行為：部落格內容依語系區分、列表與單篇僅顯示當前語系、可選 hreflang 輸出。

## Requirements

### Requirement: Blog content filtered by locale

The system SHALL filter blog collection entries by the current page's locale so that the blog list page and single post pages for a given locale SHALL only display or resolve posts whose language matches that locale.

#### Scenario: Blog list shows only current locale posts
- **WHEN** a user visits the blog list page for a locale (e.g. `/en/blog/`)
- **THEN** the page SHALL display only entries from the blog collection that belong to that locale

#### Scenario: Single post page only resolves same-locale posts
- **WHEN** a user requests a single post URL for a locale (e.g. `/en/blog/my-post`)
- **THEN** the system SHALL resolve the post from the blog collection for that locale; if no such post exists, the system SHALL respond with 404 or equivalent

### Requirement: Optional hreflang in layout

When the layout implements hreflang support, it SHALL output `<link rel="alternate" hreflang="..." href="..." />` (and `hreflang="x-default"` where appropriate) in the document head for each page, using the configured locales and the current page's canonical URL, so that search engines can discover alternate language versions.

#### Scenario: Hreflang links when implemented
- **WHEN** the feature is implemented and a page is rendered
- **THEN** the head SHALL include alternate links for each supported locale and optionally x-default pointing to the default locale URL
