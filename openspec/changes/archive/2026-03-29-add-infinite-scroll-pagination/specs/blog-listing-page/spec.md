## MODIFIED Requirements

### Requirement: Display blog article listing page

The blog listing page SHALL display articles from the collection, ordered by publication date in descending order (newest first), with support for infinite scroll pagination.

#### Scenario: Static initial rendering
- **WHEN** a user visits `/blog`
- **THEN** the page displays the first 10 most recent articles as static HTML during build time

#### Scenario: Dynamic article loading
- **WHEN** the user scrolls near the bottom of the page
- **THEN** the next batch of articles is fetched and appended to the page dynamically

#### Scenario: Locale-aware articles
- **WHEN** a user visits `/blog` in a specific locale
- **THEN** articles are displayed in the correct locale, using fallback locales where translations are unavailable

#### Scenario: Article metadata
- **WHEN** an article is displayed
- **THEN** it shows: title, description, publication date, reading time, and tags (matching existing PostCard behavior)
