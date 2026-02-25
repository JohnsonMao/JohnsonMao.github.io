## MODIFIED Requirements

### Requirement: Static build output

The system SHALL be buildable with Astro's build command (e.g. `astro build` or `pnpm build`) and SHALL produce a static output (default `dist/` or as configured) suitable for deployment to a static host. The build SHALL NOT require a server runtime unless an adapter is explicitly added later. **The build process SHALL support environment variables for configuring analytics (e.g., `GA_MEASUREMENT_ID`).**

#### Scenario: Build produces static assets
- **WHEN** the build command is run successfully
- **THEN** the output directory SHALL contain HTML, CSS, and static assets that can be served by a static file server or GitHub Pages

#### Scenario: Analytics IDs injected at build time
- **WHEN** the build command is run with analytics environment variables set
- **THEN** the values SHALL be injected into the generated tracking scripts
