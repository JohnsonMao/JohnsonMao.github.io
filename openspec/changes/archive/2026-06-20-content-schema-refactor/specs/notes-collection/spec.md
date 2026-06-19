## ADDED Requirements

### Requirement: Notes content collection with schema
The system SHALL provide a Content Collection named `notes` whose source files SHALL reside under `src/content/notes/`. The system SHALL define its schema in `src/content.config.ts` using Astro's `defineCollection` with a Zod schema. The schema SHALL require `title` (string) and `pubDate` (coercible date). The schema SHALL support optional `description` (string), `updated` (coercible date), `lang` (enum: `zh-TW` | `en`, default `zh-TW`), `tags` (array of `TAG_IDS` enum values), `status` (enum: `stub` | `draft` | `complete`, default `stub`), and `related` (array of strings referencing other note paths for cross-linking).

#### Scenario: Valid note passes validation
- **WHEN** a markdown file in `src/content/notes/` has frontmatter with `title` and `pubDate`
- **THEN** the entry is included in the `notes` collection with `status` defaulting to `stub`

#### Scenario: Missing required field fails build
- **WHEN** a notes file omits `title` or `pubDate`
- **THEN** schema validation SHALL fail and the build SHALL report the error

#### Scenario: status defaults to stub
- **WHEN** a note does not include a `status` field
- **THEN** the entry's `status` SHALL default to `stub`

#### Scenario: Unknown tag rejected
- **WHEN** a notes file includes a `tags` value not present in `TAG_IDS`
- **THEN** schema validation SHALL fail and the build SHALL report the error

#### Scenario: related accepts array of strings
- **WHEN** a note includes `related: [javascript/closures, react/hooks]`
- **THEN** the field is accepted and the values are available as strings in entry data

##### Example: status values
| frontmatter status | Accepted |
|--------------------|----------|
| (omitted)          | yes — defaults to `stub` |
| `stub`             | yes |
| `draft`            | yes |
| `complete`         | yes |
| `published`        | no — schema validation error |
