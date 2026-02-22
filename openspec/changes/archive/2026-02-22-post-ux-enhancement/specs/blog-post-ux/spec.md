## ADDED Requirements

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
