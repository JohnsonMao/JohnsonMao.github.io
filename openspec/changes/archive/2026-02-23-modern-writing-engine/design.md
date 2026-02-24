## Context

The current blog implementation uses standard Markdown and simple frontmatter. To support more advanced technical writing, we need MDX for interactivity, better content grouping for series, and a more robust draft preview workflow.

## Goals / Non-Goals

**Goals:**
- Provide MDX support for blog posts.
- Enable series-based organization and navigation.
- Implement a draft preview mode that is automatic in development environments.

**Non-Goals:**
- Creating a full CMS for managing drafts.
- Complex series management (like multi-locale series synchronization beyond basic listing).

## Decisions

### 1. MDX Integration
- **Choice**: Use `@astrojs/mdx`.
- **Rationale**: It is the official and most powerful way to use components in Markdown in Astro.
- **Alternatives**: Using Astro's custom components in MD, but it's less flexible and standard than MDX.

### 2. Series Navigation Implementation
- **Choice**: Implement as a shared component `SeriesNav.astro` used in `PostLayout.astro`.
- **Logic**: 
    1. Fetch all blog posts.
    2. Filter by the same `series` and `lang` (or fallback versions).
    3. Sort by `pubDate`.
    4. Pass to the component to render links.
- **Rationale**: Keeps `PostLayout` clean and makes series logic reusable.

### 3. Draft Preview Logic
- **Choice**: Update `src/utils/content.ts` (the central entry point for fetching content) to respect `import.meta.env.DEV`.
- **Implementation**: `getCollection(collection, ({ data }) => import.meta.env.DEV || data.draft !== true)`.
- **Rationale**: Affects all pages (blog list, tag pages, etc.) simultaneously, providing a consistent preview experience.

### 4. Schema Update
- **File**: `src/content.config.ts`.
- **Changes**: 
    - Add `series: z.string().optional()`.
    - Update glob pattern to `**/*.{md,mdx}`.

## Risks / Trade-offs

- **[Risk] MDX build performance** → [Mitigation] MDX adds build time, but it's negligible for the current blog size.
- **[Trade-off] Manual series ordering** → We use `pubDate` for ordering within a series. This is simple but might require manual adjusting of dates if exact ordering is needed regardless of real publication time.
