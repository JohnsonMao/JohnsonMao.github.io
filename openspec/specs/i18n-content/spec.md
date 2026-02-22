# i18n-content

## Purpose

Define multi-language content behavior: Blog content separated by locale, list and single post pages with fallback support, and optional hreflang output.

## Requirements

### Requirement: Blog content resolution with fallback

The system SHALL prioritize blog collection entries that match the current page's locale. If a post does not exist in the requested locale, the system SHALL resolve the best available version based on a fallback logic (e.g. prioritized by user preferences or a default order) instead of strictly returning a 404.

#### Scenario: Blog list shows posts with fallback
- **WHEN** a user visits the blog list page for a locale (e.g. `/en/blog/`)
- **THEN** THE page SHALL display all unique articles, showing the version in the current locale if available, otherwise falling back to another available language version with a notice.

#### Scenario: Single post page resolves with fallback
- **WHEN** a user requests a single post URL for a locale (e.g. `/en/blog/my-post`) and that specific translation is missing
- **THEN** the system SHALL render the post using the best available language version (e.g. the default locale or a user-preferred locale if detectable) and SHOULD include an indication that the content is a fallback.

### Requirement: Optional hreflang in layout

The base layout (or equivalent) SHALL output `<link rel="alternate" hreflang="..." href="..." />` in the document head for each page, for each supported locale, using the configured locales and the current page's equivalent URL per locale. The layout SHALL also output a link with `hreflang="x-default"` pointing to the default locale URL for that page.

#### Scenario: Hreflang links present for each locale
- **WHEN** any content page (home, blog list, or single post) is rendered
- **THEN** the head SHALL include an alternate link for each configured locale (e.g. `en`, `zh-TW` or `zh-Hant`) with the correct absolute URL for that page in that locale

#### Scenario: x-default points to default locale
- **WHEN** the layout outputs hreflang links
- **THEN** one link SHALL have `hreflang="x-default"` and its href SHALL be the default locale's URL for the current page
