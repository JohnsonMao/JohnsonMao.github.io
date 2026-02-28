# Blog Post UX

## Purpose

Enhance the article reading experience with navigation and sharing tools.
## Requirements
### Requirement: Automatic Table of Contents (TOC) extraction
The system SHALL automatically extract H2 and H3 headings from the blog post content at build time to generate a hierarchical Table of Contents. Each TOC item SHALL link to the corresponding section header using a generated ID (slug).

#### Scenario: TOC generated from headings
- **WHEN** a blog post contains multiple H2 and H3 headers
- **THEN** the post layout SHALL display a TOC containing links to these headers in the correct order

#### Scenario: Smooth scroll to headings
- **WHEN** a user clicks a TOC link
- **THEN** the browser SHALL smoothly scroll to the corresponding section header

### Requirement: Copy Link functionality
The system SHALL provide a "Copy Link" button or interactive element that, when clicked, copies the current post's full URL to the user's clipboard. The system SHOULD provide visual feedback (e.g., a "Copied!" tooltip or icon change) upon successful copy.

#### Scenario: URL copied to clipboard
- **WHEN** the user clicks the "Copy Link" button
- **THEN** the current page URL SHALL be saved to the clipboard and a success message SHALL be briefly displayed

### Requirement: Series navigation
For any blog post that is part of a series (as defined by the `series` field in frontmatter), the system SHALL display a "Series Navigation" component at the bottom of the article. This component SHALL list all posts in the same series, sorted by publication date, and SHALL highlight the currently viewed post. It SHALL provide links to the previous and next articles in the series if they exist.

#### Scenario: Series navigation displayed
- **WHEN** a post has a `series` field defined in its frontmatter
- **THEN** the "Series Navigation" component SHALL be rendered at the bottom of the post layout

#### Scenario: Highlights current post in series
- **WHEN** viewing a post in a series
- **THEN** the series navigation SHALL indicate which post is currently being read (e.g., using a "Current" badge or specialized styling)

#### Scenario: Links to other posts in series
- **WHEN** a series has multiple posts
- **THEN** the navigation SHALL provide clickable links to all other posts in that series within the same locale

### Requirement: Comment Section in Blog Posts
Each blog post SHALL include a dedicated comment section at the bottom of the article. The section SHALL be clearly marked with a heading (e.g., "Comments" or equivalent translation) and SHALL be accessible to readers for discussion.

#### Scenario: Comment section visible on all blog posts
- **WHEN** any blog post is rendered
- **THEN** the comment section (provided by the `blog-comments` capability) SHALL be displayed below the article content and any other post-reading UX components (e.g., related posts, series navigation)

