## ADDED Requirements

### Requirement: Tailwind CSS integration

The system SHALL use Tailwind CSS (v4) for styling. The project SHALL include Tailwind in the build pipeline (e.g. via Astro Tailwind integration or Vite/PostCSS plugin) so that utility classes are available in Astro components and layouts.

#### Scenario: Utility classes apply
- **WHEN** an Astro component uses Tailwind utility classes (e.g. for layout or typography)
- **THEN** the built site SHALL include the corresponding CSS and styles SHALL apply correctly

### Requirement: Base design tokens or theme (optional)

The system SHALL allow optional definition of a minimal set of design tokens or theme variables (e.g. via Tailwind `@theme` or CSS variables) for colors, spacing, or typography to keep the look consistent. This capability is optional for the initial implementation.

#### Scenario: Theme variables used in components
- **WHEN** components use theme-backed utilities or variables
- **THEN** the rendered output SHALL reflect the defined theme values

### Requirement: Prose styling for article body (optional)

The system SHALL support optional use of `@tailwindcss/typography` (or equivalent) to style article body content so that markdown-rendered content (headings, lists, code blocks) has readable typography. This capability is optional for the initial implementation.

#### Scenario: Article body has prose styles
- **WHEN** a post body is rendered in the post layout with a prose container class (or equivalent)
- **THEN** paragraphs, headings, and code blocks SHALL have appropriate typography and spacing
