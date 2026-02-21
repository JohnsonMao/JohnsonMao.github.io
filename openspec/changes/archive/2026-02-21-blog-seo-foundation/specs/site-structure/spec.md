## ADDED Requirements

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
