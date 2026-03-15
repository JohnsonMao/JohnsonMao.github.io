## MODIFIED Requirements

### Requirement: Tag links from list and post
The system SHALL provide links to the corresponding tag page from the blog list and from the single post page. Each tag SHALL display its localized name derived from the Master Tag Registry based on the current page's locale.

#### Scenario: Post page links to localized tag pages
- **WHEN** a single post has tags defined in its shared metadata
- **THEN** the post layout SHALL render links displaying the localized tag names (e.g. "教學" instead of "tutorial" when locale is zh-TW)

## ADDED Requirements

### Requirement: Master Tag Registry
The system SHALL maintain a central registry of all valid tag IDs and their corresponding localized display names. Any tag used in content metadata MUST exist in this registry.

#### Scenario: Tag display name is resolved
- **WHEN** a component requests the display name for tag ID "astro" in locale "zh-TW"
- **THEN** the system SHALL return "Astro" as defined in the registry.

### Requirement: Build-time Tag Validation
The content processing pipeline SHALL validate that all tag IDs provided in `_meta.ts` files are registered in the Master Tag Registry. The build SHALL fail if an unregistered tag ID is encountered.

#### Scenario: Unregistered tag fails build
- **WHEN** a `_meta.ts` file contains a tag ID not present in the Master Tag Registry
- **THEN** the build system SHALL report a validation error and abort the build.
