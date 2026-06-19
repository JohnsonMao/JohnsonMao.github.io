## ADDED Requirements

### Requirement: Registry validation CLI script
The system SHALL provide a Node.js script at `scripts/check-registries.mjs` that validates all `tags` and `series` frontmatter values used across `src/content/blog/`, `src/content/til/`, and `src/content/notes/` against their corresponding i18n registry files (`tags.json` and `series.json`). The script SHALL be executable via `pnpm check-registries` and SHALL be included in the `pnpm check` script chain. The script SHALL use `gray-matter` for frontmatter parsing and SHALL NOT depend on the Astro runtime.

#### Scenario: All tags and series have registry entries
- **WHEN** `pnpm check-registries` is executed and every tag and series value used in content files has a matching entry in the corresponding zh-TW registry
- **THEN** the script SHALL exit 0 and print a summary: `✓ {N} tags, {M} series — all registry entries present.`

#### Scenario: Missing tag registry entry
- **WHEN** a content file uses a tag value not present in `src/i18n/messages/zh-TW/tags.json` registry
- **THEN** the script SHALL exit 1 and print the missing tag name and the file paths where it is used

#### Scenario: Missing series registry entry
- **WHEN** a content file uses a `series` value not present in `src/i18n/messages/zh-TW/series.json` registry
- **THEN** the script SHALL exit 1 and print the missing series ID and the file paths where it is used

#### Scenario: check-registries runs as part of pnpm check
- **WHEN** `pnpm check` is executed
- **THEN** `check-registries` SHALL run as part of the command chain, and `pnpm check` SHALL fail if `check-registries` exits 1

##### Example: output format on failure
```
Missing tag registry entries in zh-TW:
  "cooking"
    src/content/til/2025-01-01-pasta.md

Missing series registry entries in zh-TW:
  "cooking-series"
    src/content/blog/cooking-series/01-intro.zh-TW.md

→ Add missing entries to the corresponding i18n registry files.
```
