## Why

To enhance the technical writing experience and improve content organization, this change introduces MDX support for rich interactive components, a series feature for grouping related posts, and a draft preview mode to streamline the editing workflow.

## What Changes

- **MDX Support**: Install and configure `@astrojs/mdx` to allow using Astro components within blog posts.
- **Series/Collections**: 
    - Add an optional `series` field (string) to the blog content schema.
    - Implement a "Series Navigation" component at the bottom of `PostLayout` to guide readers through related articles in a series.
- **Draft Preview**:
    - Update `getCollection` logic to include posts with `draft: true` when running in a development environment (`import.meta.env.DEV`).
    - Ensure draft posts are still excluded from production builds.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `blog-content`: Update schema to include `series` field and formalize support for MDX files. Add requirements for draft handling in development.
- `blog-post-ux`: Add requirements for Series Navigation at the end of blog posts.

## Impact

- **Dependencies**: New dependency on `@astrojs/mdx`.
- **Schema**: `src/content/config.ts` will be updated.
- **Components**: `src/layouts/PostLayout.astro` will be modified to include series navigation.
- **Content**: Existing and future posts can now use `.mdx` extension and the `series` frontmatter field.
