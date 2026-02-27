## Why

Enhance the blog's user experience by providing a way for readers to quickly find content across articles. Currently, users have to manually browse or use tags. Adding a search feature makes the site more professional and easier to navigate as the number of posts grows.

## What Changes

Implement a full-text site search using **Pagefind**.
- **Search UI**: A search bar/modal that allows users to type queries.
- **Client-side Search**: Pagefind provides a low-bandwidth, client-side search experience.
- **Build-time Indexing**: Integration with the Astro build process to generate the search index.
- **Live Previews**: Search results should show titles, descriptions, and potentially snippets from the content.

## Capabilities

### New Capabilities
- `site-search`: Fully functional site-wide search using Pagefind, including UI components and build integration.

### Modified Capabilities
- (None)

## Impact

- **Build Pipeline**: Add Pagefind indexing step after `astro build`.
- **UI Components**: New search component (modal or header integration).
- **Public Assets**: Pagefind will generate a `pagefind/` directory in the output.
- **Dependencies**: Add `pagefind` as a dependency.
