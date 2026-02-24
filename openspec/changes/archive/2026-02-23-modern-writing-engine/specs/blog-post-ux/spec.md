## ADDED Requirements

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
