# infinite-scroll-component-flexibility Specification

## Purpose

TBD - created by archiving change 'refactor-infinite-scroll-flexibility'. Update Purpose after archive.

## Requirements

### Requirement: InfiniteScrollUI accepts custom item renderer

The InfiniteScrollUI component SHALL accept a `renderItem` prop that is a function accepting an item of type T and returning an HTML string. This allows users to define how each item SHALL be rendered without modifying the component.

#### Scenario: Rendering with custom template

- **WHEN** the component receives a `renderItem` function and new items are loaded
- **THEN** each item SHALL be rendered using the provided `renderItem` function

#### Scenario: Multiple content types

- **WHEN** the component is used with different data types (e.g., articles, products, comments)
- **THEN** the component SHALL work correctly as long as a compatible `renderItem` function is provided


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
### Requirement: InfiniteScrollUI accepts custom data fetching function

The InfiniteScrollUI component SHALL accept a `fetchNextPage` prop that is a function accepting page number and locale, returning a Promise that resolves to a PaginationResult containing items and a hasMore flag.

#### Scenario: Fetching from different data sources

- **WHEN** the component receives a `fetchNextPage` function and the user scrolls to trigger loading
- **THEN** the component SHALL call the provided function with the correct page number and locale

#### Scenario: Handling different API responses

- **WHEN** the `fetchNextPage` function resolves with items and hasMore status
- **THEN** the component SHALL append the items and update the hasMore flag accordingly


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
### Requirement: Component supports TypeScript generics

The InfiniteScrollUI component SHALL be parameterized with a generic type T that represents the shape of each item being loaded.

#### Scenario: Type safety during usage

- **WHEN** a user implements the component with a specific item type
- **THEN** TypeScript SHALL ensure type consistency between the `fetchNextPage` return type and the `renderItem` parameter type


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
### Requirement: Props interface for InfiniteScrollUI

The InfiniteScrollUI component SHALL define a Props interface that includes:
- `renderItem: (item: T) => string` - function to render each item
- `fetchNextPage: (page: number, locale: string) => Promise<PaginationResult<T>>` - function to fetch paginated data
- `locale: Locale` - current locale
- Any other necessary props (e.g., loading indicator customization)

#### Scenario: Props configuration

- **WHEN** a user passes the required props to InfiniteScrollUI
- **THEN** the component SHALL use these props to control rendering and data fetching behavior


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
### Requirement: Backward compatibility wrapper

For existing uses of InfiniteScrollUI (specifically for articles), a wrapper component SHALL be created that provides predefined `renderItem` and `fetchNextPage` implementations.

#### Scenario: Using legacy article component

- **WHEN** existing code uses the article-specific version
- **THEN** it SHALL work identically to the current implementation

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