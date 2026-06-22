## REMOVED Requirements

### Requirement: source field in notes schema
**Reason**: The `source` URL field was originally designed to cite external references in TIL-style entries. After merging TIL into notes, the source URL is better handled as inline markdown links in the note body; a dedicated schema field is unnecessary for this content type.
**Migration**: Any existing notes file with a `source` frontmatter field SHALL have that field removed. The URL SHALL be retained as a markdown link in the note body if the reference is still relevant.

#### Scenario: source field in notes schema is absent after this change
- **WHEN** a notes file includes a `source` frontmatter field after this change
- **THEN** the notes schema SHALL NOT define or expose `source` as a typed field; the field SHALL be stripped by Zod's default object parsing
