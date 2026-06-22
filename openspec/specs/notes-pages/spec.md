# notes-pages Specification

## Purpose

Provides static route pages for the `notes` content collection: a listing page at `/notes/` (and `/en/notes/`) showing all notes entries for the current locale sorted newest-first, and individual detail pages at `/notes/<slug>` (and `/en/notes/<slug>`) rendering each note's markdown content via `PostLayout`.

## Requirements

### Requirement: Notes listing page
The system SHALL generate a static notes listing page at `/notes/` (default locale) and `/en/notes/` (non-default locale). The page SHALL retrieve all notes entries whose `data.lang` matches the current locale using `getNotesForLocale(locale)`, sort them by `data.pubDate` in descending order, and render them in a `BaseLayout`. Each list item SHALL link to the note's detail page and display the note's title, publication date, and, if present, description and tags.

#### Scenario: Notes listing renders for default locale
- **WHEN** a visitor accesses `/notes/`
- **THEN** the page SHALL display notes entries where `data.lang === 'zh-TW'`, sorted newest-first

#### Scenario: Notes listing renders for non-default locale
- **WHEN** a visitor accesses `/en/notes/`
- **THEN** the page SHALL display notes entries where `data.lang === 'en'`, sorted newest-first

#### Scenario: Empty listing does not error
- **WHEN** `src/content/notes/` contains no markdown files (or none match the current locale)
- **THEN** the build SHALL succeed and the listing page SHALL render with an empty state (no list items), without throwing an error

#### Scenario: stub notes excluded from production listing
- **WHEN** the site is built for production (not DEV mode)
- **THEN** notes with `status: 'stub'` SHALL NOT appear in the listing page
- **WHEN** the site is built in DEV mode
- **THEN** notes with `status: 'stub'` SHALL appear in the listing page


<!-- @trace
source: remove-til-notes-pages
updated: 2026-06-22
code:
  - src/i18n/messages/zh-TW/notes.json
  - src/pages/[...lang]/notes/[...slug].astro
  - src/i18n/messages/en/nav.json
  - src/layouts/PostLayout.astro
  - src/components/Header.astro
  - src/content.config.ts
  - scripts/check-registries.mjs
  - src/i18n/messages/zh-TW/nav.json
  - src/utils/content.ts
  - src/content/til/.gitkeep
  - src/pages/[...lang]/notes/index.astro
  - src/i18n/messages/en/notes.json
tests:
  - src/utils/content.test.ts
-->

---
### Requirement: Notes detail page
The system SHALL generate a static detail page for each notes entry at `/notes/<slug>` (default locale) and `/en/notes/<slug>` (non-default locale). The detail page SHALL use `PostLayout`, rendering the note's markdown content with the note's `title`, `pubDate`, `description` (if present), and `tags` (if present). The `SeriesNav` component SHALL be suppressed (no series context). The `RelatedPosts` component SHALL receive an empty tags array to suppress recommendations.

#### Scenario: Note detail page renders content
- **WHEN** a visitor accesses `/notes/<slug>` for a note that exists with `data.lang === 'zh-TW'`
- **THEN** the page SHALL render the note's markdown body with its frontmatter title and date

#### Scenario: Non-default locale detail page renders
- **WHEN** a visitor accesses `/en/notes/<slug>` for a note that exists with `data.lang === 'en'`
- **THEN** the page SHALL render the note's markdown content

#### Scenario: Detail page not generated for stub in production
- **WHEN** the site is built in production mode
- **THEN** notes with `status: 'stub'` SHALL NOT have a generated detail page route

<!-- @trace
source: remove-til-notes-pages
updated: 2026-06-22
code:
  - src/pages/[...lang]/notes/index.astro
  - src/pages/[...lang]/notes/[...slug].astro
-->

<!-- @trace
source: remove-til-notes-pages
updated: 2026-06-22
code:
  - src/i18n/messages/zh-TW/notes.json
  - src/pages/[...lang]/notes/[...slug].astro
  - src/i18n/messages/en/nav.json
  - src/layouts/PostLayout.astro
  - src/components/Header.astro
  - src/content.config.ts
  - scripts/check-registries.mjs
  - src/i18n/messages/zh-TW/nav.json
  - src/utils/content.ts
  - src/content/til/.gitkeep
  - src/pages/[...lang]/notes/index.astro
  - src/i18n/messages/en/notes.json
tests:
  - src/utils/content.test.ts
-->