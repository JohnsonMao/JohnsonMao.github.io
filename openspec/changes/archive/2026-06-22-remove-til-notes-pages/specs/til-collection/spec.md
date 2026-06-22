## REMOVED Requirements

### Requirement: TIL content collection with schema
**Reason**: The `til` collection was designed for short "Today I Learned" entries citing external sources. After discussion, this content type overlaps entirely with the `notes` collection. The `source` field (the only differentiator) is better handled as inline markdown links. To reduce complexity, `til` is removed; all such content SHALL be written as `notes` entries instead.
**Migration**: The `til` collection definition SHALL be removed from `src/content.config.ts` and from the `collections` export. The `src/content/til/` directory SHALL be deleted. Any future short-form learning entries SHALL be created as `notes` entries under `src/content/notes/`.

#### Scenario: TIL content collection with schema is absent after this change
- **WHEN** the site is built after this change
- **THEN** the `til` collection SHALL NOT be defined in `src/content.config.ts` and SHALL NOT appear in the `collections` export
- **THEN** `pnpm build` SHALL complete without errors related to the removed `til` collection
