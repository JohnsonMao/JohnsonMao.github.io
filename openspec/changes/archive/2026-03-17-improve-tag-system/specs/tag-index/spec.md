## ADDED Requirements

### Requirement: Tag Index Page
The system SHALL provide a tag index page at `/tag` (and localized variants like `/en/tag`) that lists all tags registered in the Master Tag Registry. For each tag, the page SHALL display its localized name and the total number of non-draft blog posts associated with that tag in the current locale.

#### Scenario: Tag index shows all registered tags with counts
- **WHEN** a user visits the tag index page for a given locale
- **THEN** the system SHALL display a list of all tags from the registry
- **AND** for each tag, show the count of posts that match the current locale and have that tag in their metadata

### Requirement: Tag Index SEO
The tag index page SHALL have unique SEO metadata (Title, Description) localized to the current page's language.

#### Scenario: Localized SEO on tag index
- **WHEN** a user visits `/zh-TW/tag`
- **THEN** the page Title and Description SHALL use the Traditional Chinese translations defined in the i18n system
