## ADDED Requirements

### Requirement: Analytics track page views
The system SHALL track page views across the entire site for analytics purposes.

#### Scenario: Analytics scripts are present on all pages
- **WHEN** any page is rendered for any locale
- **THEN** the analytics tracking scripts (GA4, Clarity, Cloudflare) SHALL be present in the HTML output

### Requirement: Analytics respect environment
The system SHALL only enable analytics tracking in the production environment.

#### Scenario: Analytics disabled in development
- **WHEN** the site is built or served in development mode
- **THEN** the analytics tracking scripts SHALL NOT be active or present in the output

### Requirement: Analytics privacy and data protection
The analytics system SHALL be configured to respect user privacy and comply with data protection regulations (e.g., anonymizing IP addresses in GA4, masking sensitive content in Clarity).

#### Scenario: Data is anonymized where supported
- **WHEN** a page view is tracked
- **THEN** the tracking service SHALL be configured with privacy-preserving settings (e.g. `anonymize_ip: true` for GA4)
