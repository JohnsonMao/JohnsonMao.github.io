## ADDED Requirements

### Requirement: SERIES_IDS constant for series validation
The system SHALL export a `SERIES_IDS` constant (TypeScript `as const` string literal array) and a `SeriesId` type from `src/content.config.ts`. The blog collection schema's `series` field SHALL be validated as `z.enum(SERIES_IDS).optional()` and `seriesOrder` SHALL be validated as `z.number().int().positive().optional()`. A new series entry SHALL only be usable in frontmatter after it is added to both `SERIES_IDS` and the series i18n registry files.

#### Scenario: Valid series name passes schema
- **WHEN** a blog post frontmatter contains `series: typescript-guide` and `typescript-guide` is in `SERIES_IDS`
- **THEN** schema validation passes and `series` is typed as `SeriesId`

#### Scenario: Unknown series name rejected at build
- **WHEN** a blog post frontmatter contains a `series` value not present in `SERIES_IDS`
- **THEN** Astro schema validation SHALL fail and the build SHALL report the error

#### Scenario: seriesOrder is a positive integer
- **WHEN** a blog post frontmatter contains `seriesOrder: 1`
- **THEN** the field is accepted

- **WHEN** a blog post frontmatter contains `seriesOrder: 0` or `seriesOrder: -1`
- **THEN** schema validation SHALL fail

---
### Requirement: Series i18n registry files
The system SHALL provide `src/i18n/messages/zh-TW/series.json` and `src/i18n/messages/en/series.json`. Each file SHALL contain a top-level `registry` object whose keys are series IDs matching entries in `SERIES_IDS`. Each registry entry SHALL have `name` (string) and `description` (string) fields. The structure SHALL be symmetric with `tags.json`.

#### Scenario: Registry contains all defined series
- **WHEN** `pnpm check-registries` is executed after all `SERIES_IDS` entries have registry entries
- **THEN** the script SHALL exit 0

#### Scenario: New series added without registry entry
- **WHEN** `SERIES_IDS` contains a value not present in `series.json` registry and `pnpm check-registries` is executed
- **THEN** the script SHALL exit 1 and report the missing series ID and the files using it

##### Example: registry entry structure
```json
{
  "typescript-guide": {
    "name": "TypeScript Complete Guide",
    "description": "TypeScript series from basics to advanced application."
  }
}
```
