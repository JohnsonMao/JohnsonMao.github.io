## MODIFIED Requirements

### Requirement: Core components

The system SHALL include at least: a Header component, a Footer component, and a PostCard (or equivalent) component for rendering a single post summary in a list. These SHALL be implemented as Astro components unless interactivity requires an island. The Header SHALL include or support locale-aware links to the Home page, Blog list, and **About page**. The Header SHALL also include a locale switcher as specified by the i18n-routing capability.

#### Scenario: Header and Footer appear on layout pages
- **WHEN** a page using the base layout is rendered for any locale
- **THEN** the Header and Footer components are present in the output

#### Scenario: About page link in navigation
- **WHEN** the Header or Footer is rendered
- **THEN** a link to the "About" page SHALL be present and point to the correct localized URL
