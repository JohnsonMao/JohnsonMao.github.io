## MODIFIED Requirements

### Requirement: Optional hreflang in layout

The base layout (or equivalent) SHALL output `<link rel="alternate" hreflang="..." href="..." />` in the document head for each page, for each supported locale, using the configured locales and the current page's equivalent URL per locale. The layout SHALL also output a link with `hreflang="x-default"` pointing to the default locale URL for that page.

#### Scenario: Hreflang links present for each locale
- **WHEN** any content page (home, blog list, or single post) is rendered
- **THEN** the head SHALL include an alternate link for each configured locale (e.g. `en`, `zh-TW` or `zh-Hant`) with the correct absolute URL for that page in that locale

#### Scenario: x-default points to default locale
- **WHEN** the layout outputs hreflang links
- **THEN** one link SHALL have `hreflang="x-default"` and its href SHALL be the default locale's URL for the current page
