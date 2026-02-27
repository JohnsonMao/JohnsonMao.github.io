## ADDED Requirements

### Requirement: Indexing Content for Search
The system SHALL generate a search index during the build process that includes article titles, descriptions, tags, and full text content.

#### Scenario: Build Index after Astro Build
- **WHEN** the `astro build` command finishes.
- **THEN** the `pagefind` indexing command should run to scan the `dist` directory and generate the index in `dist/pagefind`.

### Requirement: Search UI Accessibility
The search interface SHALL be easily accessible from any page on the site, typically through a header button or a keyboard shortcut.

#### Scenario: Opening Search Modal
- **WHEN** a user clicks the search icon in the navigation bar.
- **THEN** a search overlay or modal should appear with a focused input field.

### Requirement: Real-time Search Results
The search results SHALL update as the user types, showing the most relevant articles first.

#### Scenario: Querying the Index
- **WHEN** a user enters "Tailwind" in the search input.
- **THEN** a list of articles containing "Tailwind" in their title or content should be displayed immediately.

### Requirement: Search Result Sneak-Peek
Search results SHALL show a brief snippet of the matching content with the query term highlighted.

#### Scenario: Displaying result snippets
- **WHEN** search results are displayed.
- **THEN** each result should include the article title and a snippet of text where the match was found.

### Requirement: Fallback and Empty States
The search UI SHALL handle cases where no results are found or the search index is loading.

#### Scenario: No results found
- **WHEN** a user enters a query that matches no content.
- **THEN** a "No results found" message should be displayed.

### Requirement: User can search for blog posts
The system SHALL provide a mechanism for users to input keywords and search for relevant blog posts.

#### Scenario: User performs a search
- **WHEN** the user types "Astro" into the search input field
- **THEN** the system SHALL display search results that include blog posts containing "Astro" in their title or content.

#### Scenario: User clears search input
- **WHEN** the user clears the search input field
- **THEN** the system SHALL clear the search results and revert to the default view (e.g., displaying all blog posts or recent posts).

### Requirement: Search is performed client-side
The search operation SHALL be performed client-side using a pre-built index.

#### Scenario: Search index is loaded
- **WHEN** the search component is initialized
- **THEN** the system SHALL load the search index from a static JSON file.

### Requirement: Search results are displayed
The system SHALL present search results in a user-friendly format, showing relevant information about each matching blog post.

#### Scenario: Displaying multiple search results
- **WHEN** a search query returns multiple matching blog posts
- **THEN** the system SHALL display a list of these posts, each showing at least the post title and a link to the post.

#### Scenario: No search results found
- **WHEN** a search query returns no matching blog posts
- **THEN** the system SHALL display a message indicating that no results were found.

### Requirement: Search results are navigable
Each search result SHALL provide a direct link to the corresponding blog post.

#### Scenario: Navigating to a search result
- **WHEN** the user clicks on a search result
- **THEN** the user SHALL be navigated to the full blog post.
