## MODIFIED Requirements

### Requirement: Generate Web App Manifest and Service Worker
The system SHALL generate a standard Web App Manifest (`manifest.webmanifest`) and a Service Worker file (`sw.js`) during the build process, enabling PWA functionality.

#### Scenario: Manifest exists in dist
- **WHEN** the `pnpm build` command completes
- **THEN** a `manifest.webmanifest` file SHALL exist in the output directory (`dist/`)

#### Scenario: Service Worker exists in dist
- **WHEN** the `pnpm build` command completes
- **THEN** a `sw.js` file SHALL exist in the output directory (`dist/`)
