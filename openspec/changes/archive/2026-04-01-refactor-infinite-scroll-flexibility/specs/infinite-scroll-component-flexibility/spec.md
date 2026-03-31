## ADDED Requirements

### Requirement: InfiniteScrollUI accepts custom item renderer

The InfiniteScrollUI component SHALL accept a `renderItem` prop that is a function accepting an item of type T and returning an HTML string. This allows users to define how each item SHALL be rendered without modifying the component.

#### Scenario: Rendering with custom template

- **WHEN** the component receives a `renderItem` function and new items are loaded
- **THEN** each item SHALL be rendered using the provided `renderItem` function

#### Scenario: Multiple content types

- **WHEN** the component is used with different data types (e.g., articles, products, comments)
- **THEN** the component SHALL work correctly as long as a compatible `renderItem` function is provided

### Requirement: InfiniteScrollUI accepts custom data fetching function

The InfiniteScrollUI component SHALL accept a `fetchNextPage` prop that is a function accepting page number and locale, returning a Promise that resolves to a PaginationResult containing items and a hasMore flag.

#### Scenario: Fetching from different data sources

- **WHEN** the component receives a `fetchNextPage` function and the user scrolls to trigger loading
- **THEN** the component SHALL call the provided function with the correct page number and locale

#### Scenario: Handling different API responses

- **WHEN** the `fetchNextPage` function resolves with items and hasMore status
- **THEN** the component SHALL append the items and update the hasMore flag accordingly

### Requirement: Component supports TypeScript generics

The InfiniteScrollUI component SHALL be parameterized with a generic type T that represents the shape of each item being loaded.

#### Scenario: Type safety during usage

- **WHEN** a user implements the component with a specific item type
- **THEN** TypeScript SHALL ensure type consistency between the `fetchNextPage` return type and the `renderItem` parameter type

### Requirement: Props interface for InfiniteScrollUI

The InfiniteScrollUI component SHALL define a Props interface that includes:
- `renderItem: (item: T) => string` - function to render each item
- `fetchNextPage: (page: number, locale: string) => Promise<PaginationResult<T>>` - function to fetch paginated data
- `locale: Locale` - current locale
- Any other necessary props (e.g., loading indicator customization)

#### Scenario: Props configuration

- **WHEN** a user passes the required props to InfiniteScrollUI
- **THEN** the component SHALL use these props to control rendering and data fetching behavior

### Requirement: Backward compatibility wrapper

For existing uses of InfiniteScrollUI (specifically for articles), a wrapper component SHALL be created that provides predefined `renderItem` and `fetchNextPage` implementations.

#### Scenario: Using legacy article component

- **WHEN** existing code uses the article-specific version
- **THEN** it SHALL work identically to the current implementation
