## ADDED Requirements

### Requirement: Service Worker Registration
The system SHALL register a Service Worker (`sw.js`) in the root scope upon loading the site. This Service Worker MUST be capable of handling offline caching strategies.

#### Scenario: Service Worker registered on load
- **WHEN** a user visits the website
- **THEN** the browser SHALL register the Service Worker script successfully

### Requirement: Offline Access to Visited Pages
The Service Worker SHALL cache visited HTML pages, CSS, JS, and image assets using a caching strategy (e.g., Stale-While-Revalidate or Cache-First) to allow users to access previously visited content when offline.

#### Scenario: Viewing a cached page while offline
- **WHEN** a user visits a page they have previously visited AND the network is disconnected
- **THEN** the page SHALL load correctly from the cache

### Requirement: Installable Web App
The system SHALL provide a Web App Manifest (`manifest.webmanifest`) containing the necessary metadata (name, icons, start_url, display mode) to allow the browser to prompt the user to install the website as an app.

#### Scenario: Browser detects installability
- **WHEN** a user visits the site
- **THEN** the browser SHALL recognize the site as an installable PWA (if supported by the browser)

### Requirement: Update Prompt
The system SHALL display a prompt to the user when a new version of the Service Worker (and thus new content) is available, offering a "Reload" action to update.

#### Scenario: New content available
- **WHEN** the Service Worker detects an update
- **THEN** a UI component (e.g., a toast or banner) SHALL appear asking the user to refresh the page to see new content
