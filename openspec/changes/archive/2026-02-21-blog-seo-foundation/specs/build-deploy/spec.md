## ADDED Requirements

### Requirement: Sitemap generation

The system SHALL generate a sitemap (e.g. sitemap-index.xml or sitemap-0.xml) at build time that includes all static pages, including the default locale at the site root and locale-prefixed routes (e.g. `/en/`, `/blog/`, `/en/blog/`, and per-locale post URLs). The sitemap SHALL use the configured `site` URL as the base for all canonical URLs.

#### Scenario: Build produces sitemap
- **WHEN** the build command is run successfully
- **THEN** the output directory SHALL contain a sitemap file (or index) that lists the site root and locale-prefixed URLs

#### Scenario: Sitemap uses configured site URL
- **WHEN** the sitemap is generated
- **THEN** each URL in the sitemap SHALL use the full base URL from the Astro `site` config (e.g. `https://johnsonmao.github.io/...`)
