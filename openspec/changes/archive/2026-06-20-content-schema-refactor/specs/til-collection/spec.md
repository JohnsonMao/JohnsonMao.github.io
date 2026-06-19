## ADDED Requirements

### Requirement: TIL content collection with schema
The system SHALL provide a Content Collection named `til` whose source files SHALL reside under `src/content/til/`. The system SHALL define its schema in `src/content.config.ts` using Astro's `defineCollection` with a Zod schema. The schema SHALL require `title` (string) and `pubDate` (coercible date). The schema SHALL support optional `lang` (enum: `zh-TW` | `en`, default `zh-TW`), `tags` (array of `TAG_IDS` enum values), and `source` (URL string for the origin reference).

#### Scenario: Valid TIL entry passes validation
- **WHEN** a markdown file in `src/content/til/` has frontmatter with `title` and `pubDate`
- **THEN** the entry is included in the `til` collection and available at build time

#### Scenario: Missing required field fails build
- **WHEN** a TIL file omits `title` or `pubDate`
- **THEN** schema validation SHALL fail and the build SHALL report the error

#### Scenario: Unknown tag rejected
- **WHEN** a TIL file includes a `tags` value not present in `TAG_IDS`
- **THEN** schema validation SHALL fail and the build SHALL report the error

#### Scenario: lang defaults when omitted
- **WHEN** a TIL file does not include a `lang` field
- **THEN** the entry's `lang` SHALL default to `zh-TW`

#### Scenario: source is an optional URL
- **WHEN** a TIL file includes `source: https://example.com/article`
- **THEN** the field is accepted and available in the entry data

- **WHEN** a TIL file includes `source: not-a-url`
- **THEN** schema validation SHALL fail with a URL format error
