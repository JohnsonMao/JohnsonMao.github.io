# i18n-offline-fallback Specification

## Purpose

TBD - created by archiving change 'add-i18n-offline-pages'. Update Purpose after archive.

## Requirements

### Requirement: Language-Aware Offline Routing
The Service Worker SHALL detect the language context of a navigation request and return the corresponding offline fallback page when the network is unavailable and the requested page is not in the cache.

#### Scenario: Offline fallback for English users
- **WHEN** a user navigates to a URL starting with `/en/` AND the network is disconnected AND the page is NOT cached
- **THEN** the Service Worker SHALL return the content of `/en/offline/index.html`

#### Scenario: Offline fallback for default language users
- **WHEN** a user navigates to a URL NOT starting with `/en/` AND the network is disconnected AND the page is NOT cached
- **THEN** the Service Worker SHALL return the content of `/offline/index.html`

<!-- @trace
source: add-i18n-offline-pages
updated: 2026-03-12
code:
  - tsconfig.json
  - astro.config.mjs
  - src/i18n/en.json
  - src/i18n/zh-TW.json
  - package.json
  - src/pages/en/offline.astro
  - src/pages/offline.astro
  - src/sw.ts
  - scripts/test-push.js
-->