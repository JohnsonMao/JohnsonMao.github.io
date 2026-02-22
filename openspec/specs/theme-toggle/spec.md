# theme-toggle Specification

## Purpose
TBD - created by archiving change blog-content-ux-batch. Update Purpose after archive.
## Requirements
### Requirement: Light and dark theme application

The system SHALL support two visual themes (light and dark) and SHALL apply one of them to the entire site (e.g. via a class or attribute on the root element such as `<html>`). The theme SHALL affect at least background and text colours so that a "dark" theme provides a dark background with light text and a "light" theme the reverse. The system SHALL use CSS variables, Tailwind dark mode, or an equivalent mechanism so that components can style according to the active theme.

#### Scenario: Dark theme changes appearance
- **WHEN** the user has selected (or the system has applied) the dark theme
- **THEN** the main content area and site chrome SHALL render with dark background and light text (or equivalent contrast)

#### Scenario: Light theme is default or selectable
- **WHEN** the user has selected the light theme or no preference is stored
- **THEN** the site SHALL render with light background and dark text (or equivalent)

### Requirement: Theme toggle control and persistence

The system SHALL provide a visible control (e.g. button or switch) that allows the user to toggle between light and dark theme. The chosen theme SHALL be persisted across page loads (e.g. via localStorage with a stable key). On first load, the system MAY use a default (e.g. light) or the user's OS preference (`prefers-color-scheme`) if available; the choice SHALL be documented.

#### Scenario: Toggle switches theme
- **WHEN** the user activates the theme toggle
- **THEN** the active theme SHALL switch (light ↔ dark) and the visible page SHALL update accordingly

#### Scenario: Preference persists
- **WHEN** the user has chosen a theme and then navigates to another page or revisits the site
- **THEN** the same theme SHALL be applied without requiring the user to toggle again (until they change it or clear storage)

### Requirement: Toggle component and early application

The theme toggle SHALL be implemented as a client-side interactive component (e.g. an Astro island with `client:load`) that reads and writes the stored preference and updates the root element's theme class or attribute. To reduce flash of wrong theme (FOUC), the system SHOULD apply the stored theme as early as possible (e.g. via a small inline script in the layout that runs before or at the start of body) so that the correct theme is applied before first paint when possible.

#### Scenario: Stored theme applied on load
- **WHEN** the user has previously set a theme and the page loads
- **THEN** the layout SHALL apply that theme (e.g. set class on html) as early as possible so that the initial paint matches the user's preference

