# Build & Deploy

## Purpose

定義靜態建置產出、Astro 設定與 GitHub Pages 部署方式。

## Requirements

### Requirement: Static build output

The system SHALL be buildable with Astro's build command (e.g. `astro build` or `pnpm build`) and SHALL produce a static output (default `dist/` or as configured) suitable for deployment to a static host. The build SHALL NOT require a server runtime unless an adapter is explicitly added later.

#### Scenario: Build produces static assets
- **WHEN** the build command is run successfully
- **THEN** the output directory SHALL contain HTML, CSS, and static assets that can be served by a static file server or GitHub Pages

### Requirement: Astro config and site URL

The project SHALL include an Astro config file (`astro.config.mjs`, `astro.config.ts`, or equivalent) and SHALL set the `site` option to the final deployed URL (e.g. `https://johnsonmao.github.io`) so that sitemap and canonical URLs are correct.

#### Scenario: Build uses configured site URL
- **WHEN** the site is built with `site` set in config
- **THEN** generated sitemap or meta tags SHALL use that base URL where applicable

### Requirement: Deployability to GitHub Pages

The project SHALL be deployable to GitHub Pages (or equivalent static hosting). Deployment MAY be done via GitHub Actions (e.g. build then push `dist/` to `gh-pages` or a docs folder) or by any workflow that serves the built static output. The design SHALL NOT require a custom server for production.

#### Scenario: Deployed site serves content
- **WHEN** the built output is deployed to the configured hosting target
- **THEN** the home page, blog list, and post pages SHALL be accessible at the expected URLs
