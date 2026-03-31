# i18n-tags-location Specification

## Purpose

TBD - created by archiving change 'refactor-infinite-scroll-flexibility'. Update Purpose after archive.

## Requirements

### Requirement: i18n tags location at @src/i18n/messages/

The i18n tags that were previously located at `@src/i18n/tags/` SHALL be moved to `@src/i18n/messages/` to consolidate all i18n resources in a single location.

#### Scenario: Access tags from new location

- **WHEN** code imports tags from `@src/i18n/messages/`
- **THEN** the tags SHALL be available and functional

#### Scenario: All imports are updated

- **WHEN** a codebase search is performed for imports from the old location
- **THEN** no imports from `@src/i18n/tags/` SHALL remain


<!-- @trace
source: refactor-infinite-scroll-flexibility
updated: 2026-04-01
code:
  - src/content/blog/typescript-guide/Introduction/zh-TW.md
  - src/content/blog/typescript-guide/advanced-infer-type/zh-TW.md
  - src/i18n/tags/en.json
  - src/content/blog/typescript-guide/basics-abstract-class/zh-TW.md
  - src/content/blog/typescript-guide/practice-frontend-setup/zh-TW.md
  - src/content/blog/typescript-guide/ts5-decorators-intro/zh-TW.md
  - src/content/blog/typescript-guide/advanced-async-function-and-promise/zh-TW.md
  - src/i18n/index.ts
  - src/content/blog/typescript-guide/basics-operator/zh-TW.md
  - src/i18n/messages/zh-TW/tags.json
  - src/content/blog/typescript-guide/epilogue/zh-TW.md
  - src/content/blog/typescript-guide/basics-class/zh-TW.md
  - src/content/blog/typescript-guide/advanced-flexible-use-of-generics/zh-TW.md
  - src/content/blog/typescript-guide/ts5-decorators-deep-dive/zh-TW.md
  - src/glob.loader.ts
  - src/content/blog/typescript-guide/practice-npm-package/zh-TW.md
  - src/i18n/messages/en/tags.json
  - src/pages/[...lang]/blog/index.astro
  - comment-system-design-doc.md
  - src/content/blog/typescript-guide/advanced-scope-and-target/zh-TW.md
  - src/components/InfiniteScrollUI.astro
  - src/content/blog/typescript-guide/advanced-tsconfig-setting/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-setup/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-data-persistence/zh-TW.md
  - src/content/blog/typescript-guide/basics-interface/zh-TW.md
  - src/content/blog/typescript-guide/practice-frontend-generics-component/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-routes/zh-TW.md
  - src/content/blog/typescript-guide/practice-frontend-fetch-api/zh-TW.md
  - src/components/PostCard.astro
  - src/content/blog/typescript-guide/decorators-intro/zh-TW.md
  - src/content/blog/typescript-guide/legacy-decorators-deep-dive/zh-TW.md
  - src/content/blog/typescript-guide/advanced-function-overloading-and-this/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-validate-and-middleware/zh-TW.md
  - src/content/blog/typescript-guide/advanced-module/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-typescript-5-decorator/zh-TW.md
  - src/content/blog/typescript-guide/advanced-conditional-type/zh-TW.md
  - src/content/blog/typescript-guide/basics-types/zh-TW.md
  - src/content/blog/typescript-guide/advanced-generics/zh-TW.md
  - src/i18n/tags/zh-TW.json
  - src/content/blog/typescript-guide/basics-object-array-and-functions/zh-TW.md
tests:
  - src/i18n/index.test.ts
-->

---
### Requirement: Directory structure consolidation

All i18n resources including tags SHALL be co-located in the `@src/i18n/messages/` directory, with appropriate subdirectories if needed.

#### Scenario: Unified i18n structure

- **WHEN** inspecting the `@src/i18n/messages/` directory
- **THEN** it SHALL contain all message files, tag definitions, and related i18n configuration


<!-- @trace
source: refactor-infinite-scroll-flexibility
updated: 2026-04-01
code:
  - src/content/blog/typescript-guide/Introduction/zh-TW.md
  - src/content/blog/typescript-guide/advanced-infer-type/zh-TW.md
  - src/i18n/tags/en.json
  - src/content/blog/typescript-guide/basics-abstract-class/zh-TW.md
  - src/content/blog/typescript-guide/practice-frontend-setup/zh-TW.md
  - src/content/blog/typescript-guide/ts5-decorators-intro/zh-TW.md
  - src/content/blog/typescript-guide/advanced-async-function-and-promise/zh-TW.md
  - src/i18n/index.ts
  - src/content/blog/typescript-guide/basics-operator/zh-TW.md
  - src/i18n/messages/zh-TW/tags.json
  - src/content/blog/typescript-guide/epilogue/zh-TW.md
  - src/content/blog/typescript-guide/basics-class/zh-TW.md
  - src/content/blog/typescript-guide/advanced-flexible-use-of-generics/zh-TW.md
  - src/content/blog/typescript-guide/ts5-decorators-deep-dive/zh-TW.md
  - src/glob.loader.ts
  - src/content/blog/typescript-guide/practice-npm-package/zh-TW.md
  - src/i18n/messages/en/tags.json
  - src/pages/[...lang]/blog/index.astro
  - comment-system-design-doc.md
  - src/content/blog/typescript-guide/advanced-scope-and-target/zh-TW.md
  - src/components/InfiniteScrollUI.astro
  - src/content/blog/typescript-guide/advanced-tsconfig-setting/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-setup/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-data-persistence/zh-TW.md
  - src/content/blog/typescript-guide/basics-interface/zh-TW.md
  - src/content/blog/typescript-guide/practice-frontend-generics-component/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-routes/zh-TW.md
  - src/content/blog/typescript-guide/practice-frontend-fetch-api/zh-TW.md
  - src/components/PostCard.astro
  - src/content/blog/typescript-guide/decorators-intro/zh-TW.md
  - src/content/blog/typescript-guide/legacy-decorators-deep-dive/zh-TW.md
  - src/content/blog/typescript-guide/advanced-function-overloading-and-this/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-validate-and-middleware/zh-TW.md
  - src/content/blog/typescript-guide/advanced-module/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-typescript-5-decorator/zh-TW.md
  - src/content/blog/typescript-guide/advanced-conditional-type/zh-TW.md
  - src/content/blog/typescript-guide/basics-types/zh-TW.md
  - src/content/blog/typescript-guide/advanced-generics/zh-TW.md
  - src/i18n/tags/zh-TW.json
  - src/content/blog/typescript-guide/basics-object-array-and-functions/zh-TW.md
tests:
  - src/i18n/index.test.ts
-->

---
### Requirement: No breaking changes to tag access

The mechanism for accessing tags (e.g., through the `t()` function or direct imports) SHALL remain unchanged after migration.

#### Scenario: Tag access patterns remain consistent

- **WHEN** code accesses tags using the existing patterns
- **THEN** the behavior SHALL be identical to before the migration

<!-- @trace
source: refactor-infinite-scroll-flexibility
updated: 2026-04-01
code:
  - src/content/blog/typescript-guide/Introduction/zh-TW.md
  - src/content/blog/typescript-guide/advanced-infer-type/zh-TW.md
  - src/i18n/tags/en.json
  - src/content/blog/typescript-guide/basics-abstract-class/zh-TW.md
  - src/content/blog/typescript-guide/practice-frontend-setup/zh-TW.md
  - src/content/blog/typescript-guide/ts5-decorators-intro/zh-TW.md
  - src/content/blog/typescript-guide/advanced-async-function-and-promise/zh-TW.md
  - src/i18n/index.ts
  - src/content/blog/typescript-guide/basics-operator/zh-TW.md
  - src/i18n/messages/zh-TW/tags.json
  - src/content/blog/typescript-guide/epilogue/zh-TW.md
  - src/content/blog/typescript-guide/basics-class/zh-TW.md
  - src/content/blog/typescript-guide/advanced-flexible-use-of-generics/zh-TW.md
  - src/content/blog/typescript-guide/ts5-decorators-deep-dive/zh-TW.md
  - src/glob.loader.ts
  - src/content/blog/typescript-guide/practice-npm-package/zh-TW.md
  - src/i18n/messages/en/tags.json
  - src/pages/[...lang]/blog/index.astro
  - comment-system-design-doc.md
  - src/content/blog/typescript-guide/advanced-scope-and-target/zh-TW.md
  - src/components/InfiniteScrollUI.astro
  - src/content/blog/typescript-guide/advanced-tsconfig-setting/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-setup/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-data-persistence/zh-TW.md
  - src/content/blog/typescript-guide/basics-interface/zh-TW.md
  - src/content/blog/typescript-guide/practice-frontend-generics-component/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-routes/zh-TW.md
  - src/content/blog/typescript-guide/practice-frontend-fetch-api/zh-TW.md
  - src/components/PostCard.astro
  - src/content/blog/typescript-guide/decorators-intro/zh-TW.md
  - src/content/blog/typescript-guide/legacy-decorators-deep-dive/zh-TW.md
  - src/content/blog/typescript-guide/advanced-function-overloading-and-this/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-validate-and-middleware/zh-TW.md
  - src/content/blog/typescript-guide/advanced-module/zh-TW.md
  - src/content/blog/typescript-guide/practice-backend-typescript-5-decorator/zh-TW.md
  - src/content/blog/typescript-guide/advanced-conditional-type/zh-TW.md
  - src/content/blog/typescript-guide/basics-types/zh-TW.md
  - src/content/blog/typescript-guide/advanced-generics/zh-TW.md
  - src/i18n/tags/zh-TW.json
  - src/content/blog/typescript-guide/basics-object-array-and-functions/zh-TW.md
tests:
  - src/i18n/index.test.ts
-->