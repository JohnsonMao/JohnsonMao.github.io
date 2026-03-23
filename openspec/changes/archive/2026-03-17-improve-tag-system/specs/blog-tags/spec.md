## ADDED Requirements

### Requirement: Tag Description Support
The Master Tag Registry SHALL allow optional localized descriptions for each tag.

#### Scenario: Tag registry includes description
- **WHEN** a tag is defined in `src/data/tags.ts`
- **THEN** it SHALL be possible to include a `description` object containing localized strings for each supported locale

### Requirement: Tag Page Displays Description
The individual tag page at `/tag/[tagId]` (and localized variants) SHALL display the tag's localized description from the registry if available.

#### Scenario: Tag description is rendered
- **WHEN** a tag has a description in the registry
- **AND** a user visits its corresponding tag page
- **THEN** the description SHALL be rendered in the header section of the page

### Requirement: Tag SEO metadata optimization
The individual tag page SHALL use the tag's localized description as its meta description when available.

#### Scenario: SEO description uses tag description
- **WHEN** a tag page is rendered
- **AND** the tag has a localized description in the registry
- **THEN** the page's `<meta name="description">` SHALL use that localized tag description

## MODIFIED Requirements

### Requirement: Master Tag Registry
The system SHALL maintain a central registry of all valid tag IDs and their corresponding localized display names AND optional localized descriptions. Any tag used in content metadata MUST exist in this registry.

#### Scenario: Tag display name is resolved
- **WHEN** a component requests the display name for tag ID "astro" in locale "zh-TW"
- **THEN** the system SHALL return "Astro" as defined in the registry.

#### Scenario: Tag description is resolved
- **WHEN** a component requests the description for tag ID "astro" in locale "zh-TW"
- **THEN** the system SHALL return the localized description if defined, or undefined if not.
