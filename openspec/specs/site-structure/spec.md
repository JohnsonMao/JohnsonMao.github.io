# Site Structure

## Purpose

Site structure and routing updated for per-locale generation; URLs feature locale prefixes (or root path for default locale), with per-locale versions of every page.
## Requirements
### Requirement: Home page

The system SHALL provide a home page for each locale. The default locale home page SHALL be served at the site root (`/`) and SHALL be implemented with a root entry (e.g. `src/pages/index.astro`) that either renders the default locale content or runs client-side locale detection and redirect. Non-default locale home pages SHALL be served under the locale path (e.g. `/en/`) and SHALL be rendered from locale-aware page modules (e.g. `src/pages/[locale]/index.astro`). All home pages SHALL use a shared base layout (Header/Footer).

#### Scenario: Root URL returns default locale or redirects
- **WHEN** a user requests the root URL
- **THEN** either the default locale home page is served with the base layout applied, or client script redirects to the appropriate locale path

#### Scenario: Locale-prefixed URL returns that locale's home page
- **WHEN** a user requests a locale-prefixed home URL (e.g. `/en/`)
- **THEN** that locale's home page is served with the base layout applied

### Requirement: Blog list page

The system SHALL provide a blog list page for each locale (e.g. at `/blog/` for the default locale and `/en/blog/` for English) that SHALL display a list of posts from the blog collection for that locale, typically ordered by publication date (newest first).

#### Scenario: Blog list shows posts for current locale
- **WHEN** a user visits the blog list URL for a locale
- **THEN** the page SHALL display entries from the blog collection that belong to that locale, with at least title and date (or summary) per entry

### Requirement: Single post page with dynamic route

The system SHALL provide a dynamic route for individual blog posts per locale (e.g. `/blog/[...slug]` for the default locale and `/en/blog/[...slug]` for English) so that each post in the blog collection for that locale has a unique URL and SHALL use a dedicated post layout (e.g. PostLayout) for article presentation.

#### Scenario: Post URL returns single post for that locale
- **WHEN** a user requests a URL that corresponds to a blog post slug within a locale
- **THEN** the single post page for that locale is rendered with the post layout and full content

#### Scenario: Non-existent slug returns 404
- **WHEN** a user requests a slug that does not match any post in that locale
- **THEN** the system SHALL respond with a 404 or equivalent not-found behavior

### Requirement: Base layout and post layout

The system SHALL provide a BaseLayout (or equivalent) that SHALL include a common Header and Footer and SHALL be used by the home and blog list pages for all locales. The system SHALL provide a PostLayout (or equivalent) for single post pages that MAY extend or compose the base layout for consistent site chrome across locales.

#### Scenario: Shared chrome on all pages
- **WHEN** any page is rendered for any locale
- **THEN** the appropriate layout is applied so that site-wide navigation (e.g. Header/Footer) is consistent where specified

### Requirement: Core components

The system SHALL include at least: a Header component, a Footer component, and a PostCard (or equivalent) component for rendering a single post summary in a list. These SHALL be implemented as Astro components unless interactivity requires an island. The Header SHALL include or support locale-aware links to the Home page, Blog list, and **About page**. The Header SHALL also include a locale switcher as specified by the i18n-routing capability.

#### Scenario: Header and Footer appear on layout pages
- **WHEN** a page using the base layout is rendered for any locale
- **THEN** the Header and Footer components are present in the output

#### Scenario: About page link in navigation
- **WHEN** the Header or Footer is rendered
- **THEN** a link to the "About" page SHALL be present and point to the correct localized URL

### Requirement: RSS feed per locale

The system SHALL provide an RSS (or Atom) feed for each supported locale. The default locale feed SHALL be served at a stable path (e.g. `/feed.xml`); the non-default locale feed SHALL be served under the locale path (e.g. `/en/feed.xml`). Each feed SHALL contain only blog posts for that locale (matching `lang`), exclude draft posts, and order entries by publication date (newest first). Each feed SHALL be served with a content type appropriate for XML feed (e.g. `application/rss+xml` or `application/atom+xml`).

#### Scenario: Default locale feed returns that locale's posts
- **WHEN** a client requests the default locale feed URL (e.g. `/feed.xml`)
- **THEN** the response SHALL be a valid RSS or Atom document containing only posts whose `lang` matches the default locale, excluding drafts, ordered by pubDate descending

#### Scenario: Non-default locale feed returns that locale's posts
- **WHEN** a client requests the non-default locale feed URL (e.g. `/en/feed.xml`)
- **THEN** the response SHALL be a valid RSS or Atom document containing only posts whose `lang` matches that locale, excluding drafts, ordered by pubDate descending

#### Scenario: Feed response has correct content type
- **WHEN** a client requests a feed URL
- **THEN** the response SHALL include a Content-Type header indicating XML feed (e.g. `application/rss+xml` or `application/atom+xml`)

