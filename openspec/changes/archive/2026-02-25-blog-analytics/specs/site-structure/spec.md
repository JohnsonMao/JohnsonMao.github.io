## MODIFIED Requirements

### Requirement: Base layout and post layout

The system SHALL provide a BaseLayout (or equivalent) that SHALL include a common Header and Footer and SHALL be used by the home and blog list pages for all locales. The system SHALL provide a PostLayout (or equivalent) for single post pages that MAY extend or compose the base layout for consistent site chrome across locales. **The BaseLayout SHALL include the analytics tracking scripts when running in production.**

#### Scenario: Shared chrome on all pages
- **WHEN** any page is rendered for any locale
- **THEN** the appropriate layout is applied so that site-wide navigation (e.g. Header/Footer) is consistent where specified

#### Scenario: Analytics scripts in BaseLayout
- **WHEN** the BaseLayout is rendered in production
- **THEN** the analytics tracking scripts SHALL be included in the `<head>` or before the closing `</body>` tag
