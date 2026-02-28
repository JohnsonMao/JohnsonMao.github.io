## ADDED Requirements

### Requirement: Giscus Comment Integration
The system SHALL integrate Giscus to allow readers to comment on blog posts using their GitHub accounts. The comment section SHALL be rendered at the bottom of the article content in the `PostLayout`.

#### Scenario: Giscus component rendered on post page
- **WHEN** a user navigates to a blog post page
- **THEN** the Giscus comment section SHALL be visible at the bottom of the article

### Requirement: Theme Synchronization
The Giscus component SHALL automatically synchronize its theme (light/dark) with the site's current theme. It SHALL update its theme dynamically when the user toggles the site's theme mode.

#### Scenario: Giscus theme matches site theme on load
- **WHEN** the site loads in dark mode
- **THEN** Giscus SHALL initialize with its dark theme variant

#### Scenario: Giscus theme updates on toggle
- **WHEN** the user clicks the theme toggle button
- **THEN** Giscus SHALL immediately switch its theme to match the new site theme

### Requirement: Multi-language Support
The Giscus component SHALL load its interface in the language that matches the current page locale (e.g., `en` for English posts, `zh-TW` for Traditional Chinese posts).

#### Scenario: Localized Giscus interface
- **WHEN** viewing a post in the `zh-TW` locale
- **THEN** Giscus SHALL display its UI (e.g., "Sign in", "Post comment") in Traditional Chinese
