## MODIFIED Requirements

### Requirement: Copy Link functionality
The system SHALL provide copy-link functionality as part of the unified `SharePanel` component (see social-share-buttons spec). The standalone `CopyLink` component SHALL be removed. The `SharePanel` SHALL accept `copyLabel` and `copiedLabel` props for i18n text, sourced from `blog.copyLink` and `blog.copied` translation keys respectively.

#### Scenario: URL copied to clipboard
- **WHEN** the user clicks the copy-link button inside the `SharePanel`
- **THEN** the current page URL SHALL be saved to the clipboard and the button label SHALL display the translated "copied" text for 2 seconds before reverting to the original `copyLabel` text
