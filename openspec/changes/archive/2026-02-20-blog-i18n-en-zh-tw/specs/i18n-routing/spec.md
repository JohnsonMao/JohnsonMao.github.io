# i18n-routing

## Purpose

定義語系與路由行為：Astro i18n 設定、依語系產出頁面、locale-aware 連結、根路徑設備語系導向、語系切換器。

## ADDED Requirements

### Requirement: Astro i18n configuration

The system SHALL configure Astro's built-in i18n in `astro.config.mjs` with supported locales `en` and `zh-TW`, a default locale (e.g. `zh-TW`), and `prefixDefaultLocale: false` so that the default locale is served at the site root and the non-default locale is served under a path prefix (e.g. `/en/`).

#### Scenario: Config defines locales and default
- **WHEN** the site is built
- **THEN** the Astro config SHALL include `i18n.locales`, `i18n.defaultLocale`, and `i18n.prefixDefaultLocale` such that the default locale has no path prefix and other locales have a prefix

### Requirement: Per-locale page generation

The system SHALL generate static pages for each supported locale so that the home page, blog list page, and single post pages exist for every locale (e.g. `/` and `/en/` for home, `/blog/` and `/en/blog/` for list, `/blog/<slug>` and `/en/blog/<slug>` for posts).

#### Scenario: Each locale has home and blog routes
- **WHEN** a user requests a URL that includes a valid locale (or the default locale at root)
- **THEN** the corresponding page for that locale is served

### Requirement: Locale-aware internal links

The system SHALL use Astro's locale-aware APIs (e.g. `getRelativeLocaleUrl`) or equivalent logic when generating internal links (e.g. navigation, post links) so that links preserve or target the current locale.

#### Scenario: Navigation link keeps current locale
- **WHEN** a user is on a locale-prefixed page (e.g. `/en/blog/`) and clicks a site navigation link
- **THEN** the link SHALL point to the same locale (e.g. `/en/` or `/en/blog/...`)

### Requirement: Root path and device locale detection

The system SHALL serve at the site root (`/`) a page or redirect logic that SHALL, via client-side script, detect the user's preferred language (e.g. from `navigator.language` or `navigator.languages`) when no stored preference exists, and SHALL redirect to the matching locale path (e.g. `/en/`) when the preferred language is English; otherwise the root SHALL display the default locale (e.g. zh-TW). The system MAY store the user's locale preference in localStorage for subsequent visits.

#### Scenario: First visit with English browser preference
- **WHEN** a user with no stored preference visits `/` and their browser reports an English preference
- **THEN** the client script SHALL redirect them to `/en/` (or the configured English path)

#### Scenario: First visit with non-English or zh-TW preference
- **WHEN** a user with no stored preference visits `/` and their browser does not report English as preferred
- **THEN** the user SHALL remain on `/` and see the default locale content

#### Scenario: Stored preference takes precedence
- **WHEN** a user has a locale preference stored (e.g. in localStorage) and visits `/`
- **THEN** the client script SHALL redirect to the stored locale path if it differs from the default locale

### Requirement: Locale switcher

The system SHALL provide a locale switcher (e.g. in the Header) that SHALL link to the same logical page in the other locale (e.g. from `/en/blog/my-post` to the zh-TW equivalent if it exists, or to the other locale's blog list or home).

#### Scenario: Switcher links to other locale
- **WHEN** a user clicks the locale switcher
- **THEN** they SHALL be taken to the current page's counterpart in the other locale, or to a fallback URL for that locale (e.g. home or blog list)
