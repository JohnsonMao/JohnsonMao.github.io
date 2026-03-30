## ADDED Requirements

### Requirement: Generate paginated article data as static JSON files

The system SHALL generate static JSON files at build time containing paginated article data, with each file containing exactly 10 articles per page.

#### Scenario: Generate first page JSON
- **WHEN** the Astro build process runs
- **THEN** the system generates `/articles-data/[locale]/page-1.json` containing the first 10 most recent articles

#### Scenario: Generate subsequent page JSON
- **WHEN** there are more than 10 articles total
- **THEN** the system generates `/articles-data/[locale]/page-2.json`, `/articles-data/[locale]/page-3.json`, etc., each containing 10 articles

#### Scenario: JSON file structure
- **WHEN** a JSON file is generated
- **THEN** it SHALL contain fields: `page`, `locale`, `articles` (array), and `hasMore` (boolean)

#### Scenario: Articles ordered by date
- **WHEN** articles are included in JSON files
- **THEN** they SHALL be ordered by publication date in descending order (newest first)

### Requirement: Client-side infinite scroll detection

The system SHALL use the Intersection Observer API to detect when the user scrolls near the bottom of the page and automatically load the next batch of articles.

#### Scenario: Detect scroll to bottom
- **WHEN** an InfiniteScroll component is rendered on the page
- **THEN** an Intersection Observer is created to monitor a sentinel element near the bottom

#### Scenario: Load next page on scroll
- **WHEN** the user scrolls and the sentinel element becomes visible
- **THEN** the system SHALL fetch the next page JSON file and append articles to the DOM

#### Scenario: Prevent duplicate loads
- **WHEN** a page is already loading
- **THEN** the system SHALL not trigger additional fetch requests even if the sentinel is observed multiple times

#### Scenario: Stop loading when no more pages
- **WHEN** `hasMore` is false in the loaded JSON
- **THEN** the system SHALL stop observing the sentinel element and not attempt further loads

### Requirement: Display first 10 articles statically on initial page load

The blog listing page SHALL render exactly the first 10 most recent articles as static HTML during the build phase.

#### Scenario: First page rendering
- **WHEN** a user visits `/blog`
- **THEN** the page displays the 10 most recent articles as static HTML, with full article metadata

#### Scenario: SEO compatibility
- **WHEN** a search engine crawler visits `/blog`
- **THEN** the crawler can index the first 10 articles from the static HTML without requiring JavaScript

#### Scenario: Fallback for JavaScript disabled
- **WHEN** a user has JavaScript disabled
- **THEN** the user can still view the first 10 articles; only infinite scroll functionality is unavailable

### Requirement: Dynamically append loaded articles to the page

The system SHALL insert fetched article data into the DOM as new article cards that match the styling and structure of the initial articles.

#### Scenario: Append fetched articles
- **WHEN** an article page is fetched successfully
- **THEN** the system creates article card elements from the JSON data and appends them to the article list

#### Scenario: Maintain visual consistency
- **WHEN** articles are appended
- **THEN** they SHALL use the same component and styling as the statically-rendered initial articles

#### Scenario: Handle fetch errors
- **WHEN** a fetch request fails
- **THEN** the system SHALL log the error and re-enable the scroll sentinel so the user can retry by scrolling again
