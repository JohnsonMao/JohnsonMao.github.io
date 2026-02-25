# Build & Deploy

## Purpose

Define static build output, Astro configuration, and GitHub Pages deployment method.

## Requirements

### Requirement: Static build output

The system SHALL be buildable with Astro's build command (e.g. `astro build` or `pnpm build`) and SHALL produce a static output (default `dist/` or as configured) suitable for deployment to a static host. The build SHALL NOT require a server runtime unless an adapter is explicitly added later. **The build process SHALL support environment variables for configuring analytics (e.g., `GA_MEASUREMENT_ID`).**

#### Scenario: Build produces static assets
- **WHEN** the build command is run successfully
- **THEN** the output directory SHALL contain HTML, CSS, and static assets that can be served by a static file server or GitHub Pages

#### Scenario: Analytics IDs injected at build time
- **WHEN** the build command is run with analytics environment variables set
- **THEN** the values SHALL be injected into the generated tracking scripts

### Requirement: Astro config and site URL

The project SHALL include an Astro config file (`astro.config.mjs`, `astro.config.ts`, or equivalent) and SHALL set the `site` option to the final deployed URL (e.g. `https://johnsonmao.github.io`) so that sitemap and canonical URLs are correct.

#### Scenario: Build uses configured site URL
- **WHEN** the site is built with `site` set in config
- **THEN** generated sitemap or meta tags SHALL use that base URL where applicable

### Requirement: Sitemap generation

The system SHALL generate a sitemap (e.g. sitemap-index.xml or sitemap-0.xml) at build time that includes all static pages, including the default locale at the site root and locale-prefixed routes (e.g. `/en/`, `/blog/`, `/en/blog/`, and per-locale post URLs). The sitemap SHALL use the configured `site` URL as the base for all canonical URLs.

#### Scenario: Build produces sitemap
- **WHEN** the build command is run successfully
- **THEN** the output directory SHALL contain a sitemap file (or index) that lists the site root and locale-prefixed URLs

#### Scenario: Sitemap uses configured site URL
- **WHEN** the sitemap is generated
- **THEN** each URL in the sitemap SHALL use the full base URL from the Astro `site` config (e.g. `https://johnsonmao.github.io/...`)

### Requirement: Deployability to GitHub Pages

The project SHALL be deployable to GitHub Pages (or equivalent static hosting). Deployment MAY be done via GitHub Actions (e.g. build then push `dist/` to `gh-pages` or a docs folder) or by any workflow that serves the built static output. The design SHALL NOT require a custom server for production.

#### Scenario: Deployed site serves content
- **WHEN** the built output is deployed to the configured hosting target
- **THEN** the home page, blog list, and post pages SHALL be accessible at the expected URLs
