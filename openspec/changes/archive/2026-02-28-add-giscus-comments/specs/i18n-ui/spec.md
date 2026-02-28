## MODIFIED Requirements

### Requirement: UI strings from locale-specific source

The system SHALL load UI strings (e.g. navigation labels, home page copy, blog list title, About page title, author bio labels, and **blog post comment section heading**) from a locale-specific source (e.g. JSON files such as `src/i18n/en.json` and `src/i18n/zh-TW.json`) keyed by locale, and SHALL use these strings in layouts and pages instead of hard-coded text.

#### Scenario: Rendered page shows correct locale strings
- **WHEN** a page is rendered for a given locale
- **THEN** the visible UI text (e.g. header, footer, headings) SHALL come from the translation source for that locale

#### Scenario: Each supported locale has a translation source
- **WHEN** the site is built
- **THEN** a translation file (or equivalent) SHALL exist for each configured locale so that no UI string is missing for any locale
