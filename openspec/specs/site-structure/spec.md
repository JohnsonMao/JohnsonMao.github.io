# Site Structure

## Purpose

定義首頁、部落格列表、單篇文章路由與共用版面（BaseLayout / PostLayout）及核心元件。

## Requirements

### Requirement: Home page

The system SHALL provide a home page at the site root (`/`) that SHALL be rendered from `src/pages/index.astro` and SHALL use a shared base layout (Header/Footer).

#### Scenario: Root URL returns home page
- **WHEN** a user requests the root URL
- **THEN** the home page is served with the base layout applied

### Requirement: Blog list page

The system SHALL provide a blog list page (e.g. at `/blog` or `/blog/`) that SHALL display a list of posts from the blog collection, typically ordered by publication date (newest first).

#### Scenario: Blog list shows posts
- **WHEN** a user visits the blog list URL
- **THEN** the page SHALL display entries from the blog collection with at least title and date (or summary) per entry

### Requirement: Single post page with dynamic route

The system SHALL provide a dynamic route for individual blog posts (e.g. `/blog/[...slug]` or `/blog/[slug]`) so that each post in the blog collection has a unique URL and SHALL use a dedicated post layout (e.g. PostLayout) for article presentation.

#### Scenario: Post URL returns single post
- **WHEN** a user requests a URL that corresponds to a blog post slug
- **THEN** the single post page is rendered with the post layout and full content

#### Scenario: Non-existent slug returns 404
- **WHEN** a user requests a slug that does not match any post
- **THEN** the system SHALL respond with a 404 or equivalent not-found behavior

### Requirement: Base layout and post layout

The system SHALL provide a BaseLayout (or equivalent) that SHALL include a common Header and Footer and SHALL be used by the home and blog list pages. The system SHALL provide a PostLayout (or equivalent) for single post pages that MAY extend or compose the base layout for consistent site chrome.

#### Scenario: Shared chrome on all pages
- **WHEN** any page is rendered
- **THEN** the appropriate layout is applied so that site-wide navigation (e.g. Header/Footer) is consistent where specified

### Requirement: Core components

The system SHALL include at least: a Header component, a Footer component, and a PostCard (or equivalent) component for rendering a single post summary in a list. These SHALL be implemented as Astro components unless interactivity requires an island.

#### Scenario: Header and Footer appear on layout pages
- **WHEN** a page using the base layout is rendered
- **THEN** the Header and Footer components are present in the output
