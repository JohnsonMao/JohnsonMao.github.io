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

The base layout (or equivalent) SHALL output `<link rel="alternate" hreflang="..." href="..." />` in the document head for each page, for each supported locale, using the configured locales and the current page's equivalent URL per locale. The layout SHALL also output a link with `hreflang="x-default"` pointing to the default locale URL for that page.

#### Scenario: Hreflang links present for each locale
- **WHEN** any content page (home, blog list, or single post) is rendered
- **THEN** the head SHALL include an alternate link for each configured locale (e.g. `en`, `zh-TW` or `zh-Hant`) with the correct absolute URL for that page in that locale

#### Scenario: x-default points to default locale
- **WHEN** the layout outputs hreflang links
- **THEN** one link SHALL have `hreflang="x-default"` and its href SHALL be the default locale's URL for the current page
