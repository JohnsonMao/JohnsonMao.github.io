## ADDED Requirements

### Requirement: Render infinite scroll container component

The infinite scroll UI component SHALL render a container that holds the article list and includes a sentinel element at the bottom for detecting scroll events.

#### Scenario: Component initialization
- **WHEN** the InfiniteScrollUI component is rendered on the blog listing page
- **THEN** it displays the initial articles in a list and places a hidden sentinel element at the bottom

#### Scenario: Sentinel element detection
- **WHEN** the Intersection Observer detects the sentinel element entering the viewport
- **THEN** a loading indicator SHALL be displayed to the user

#### Scenario: Display loading state
- **WHEN** the next page is being fetched
- **THEN** a loading indicator (e.g., spinner or "Loading more articles...") is visible to the user

#### Scenario: Display loaded articles
- **WHEN** article data is received from the JSON file
- **THEN** the articles are rendered using the same card component as the initial articles

#### Scenario: Disable loading on last page
- **WHEN** the last page has been loaded (`hasMore === false`)
- **THEN** the loading indicator is hidden and the sentinel element is no longer observed

### Requirement: Fetch and parse paginated article JSON

The infinite scroll component SHALL fetch the appropriate JSON file for the next page and parse the article data.

#### Scenario: Construct fetch URL
- **WHEN** page N is requested
- **THEN** the system constructs URL `/articles-data/[locale]/page-[N].json` based on the current locale and page number

#### Scenario: Fetch next page
- **WHEN** the sentinel element is observed
- **THEN** the system fetches the next page JSON file and increments the page counter

#### Scenario: Parse JSON structure
- **WHEN** JSON is fetched successfully
- **THEN** the system correctly parses `page`, `locale`, `articles`, and `hasMore` fields

#### Scenario: Handle network errors
- **WHEN** a fetch request fails (network error, 404, etc.)
- **THEN** the system logs the error, re-enables the sentinel, and allows the user to retry

#### Scenario: Validate data format
- **WHEN** JSON is received
- **THEN** the system SHALL validate that articles contain required fields (`id`, `title`, `description`, `pubDate`)
