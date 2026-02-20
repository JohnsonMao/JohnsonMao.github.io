# i18n-ui

## Purpose

定義介面多語系：UI 字串依語系載入，layout 與頁面使用翻譯 key 而非硬編碼文案。

## Requirements

### Requirement: UI strings from locale-specific source

The system SHALL load UI strings (e.g. navigation labels, home page copy, blog list title) from a locale-specific source (e.g. JSON files such as `src/i18n/en.json` and `src/i18n/zh-TW.json`) keyed by locale, and SHALL use these strings in layouts and pages instead of hard-coded text.

#### Scenario: Rendered page shows correct locale strings
- **WHEN** a page is rendered for a given locale
- **THEN** the visible UI text (e.g. header, footer, headings) SHALL come from the translation source for that locale

#### Scenario: Each supported locale has a translation source
- **WHEN** the site is built
- **THEN** a translation file (or equivalent) SHALL exist for each configured locale so that no UI string is missing for any locale

### Requirement: Consistent translation key usage

The system SHALL use a consistent naming scheme for translation keys (e.g. nested keys like `nav.blog`, `home.welcome`) so that the same key is used across pages for the same semantic string.

#### Scenario: Same key used for same meaning
- **WHEN** the same UI concept (e.g. "Blog" link) appears in multiple places
- **THEN** the same translation key SHALL be used so that a single change in the translation file updates all occurrences for that locale
