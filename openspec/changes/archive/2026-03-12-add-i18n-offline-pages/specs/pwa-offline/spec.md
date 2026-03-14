## ADDED Requirements

### Requirement: Precaching of Multi-Language Offline Pages
The PWA build process SHALL configure Workbox to include all language-specific offline fallback pages (`/offline/index.html` and `/en/offline/index.html`) in the precache manifest (`self.__WB_MANIFEST`).

#### Scenario: Offline pages included in build
- **WHEN** the production build is executed
- **THEN** both `/offline/index.html` and `/en/offline/index.html` SHALL be added to the Workbox precache list
