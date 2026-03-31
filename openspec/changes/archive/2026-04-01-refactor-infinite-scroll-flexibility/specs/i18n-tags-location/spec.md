## ADDED Requirements

### Requirement: i18n tags location at @src/i18n/messages/

The i18n tags that were previously located at `@src/i18n/tags/` SHALL be moved to `@src/i18n/messages/` to consolidate all i18n resources in a single location.

#### Scenario: Access tags from new location

- **WHEN** code imports tags from `@src/i18n/messages/`
- **THEN** the tags SHALL be available and functional

#### Scenario: All imports are updated

- **WHEN** a codebase search is performed for imports from the old location
- **THEN** no imports from `@src/i18n/tags/` SHALL remain

### Requirement: Directory structure consolidation

All i18n resources including tags SHALL be co-located in the `@src/i18n/messages/` directory, with appropriate subdirectories if needed.

#### Scenario: Unified i18n structure

- **WHEN** inspecting the `@src/i18n/messages/` directory
- **THEN** it SHALL contain all message files, tag definitions, and related i18n configuration

### Requirement: No breaking changes to tag access

The mechanism for accessing tags (e.g., through the `t()` function or direct imports) SHALL remain unchanged after migration.

#### Scenario: Tag access patterns remain consistent

- **WHEN** code accesses tags using the existing patterns
- **THEN** the behavior SHALL be identical to before the migration
