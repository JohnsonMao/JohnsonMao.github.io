## Context

The blog currently lacks a search feature. As content grows, finding specific information becomes difficult. We want to implement a fast, client-side search that works with our static Astro build.

## Goals / Non-Goals

**Goals:**
- Implement site-wide search using Pagefind.
- Minimal bundle size impact by using Pagefind's client-side indexing.
- Seamless integration with the existing Tailwind CSS v4 styling.
- Automatic indexing during the build process.
- Keyboard-accessible search (e.g., `Cmd+K` or `/`).

**Non-Goals:**
- Server-side search (staying fully static).
- Real-time indexing of drafts (indexing is build-time only).
- Analytics for search queries (for now).

## Decisions

### 1. Pagefind for Search Engine
We chose Pagefind because it is designed specifically for static sites, provides a powerful indexing engine, and has a very small client-side footprint. It supports multiple languages and offers a fast, low-bandwidth search experience.

### 2. Custom UI using Pagefind JS API
Instead of using the default Pagefind UI component, we will build a custom search modal using Astro and standard DOM APIs (or a lightweight Web Component). This allows us to:
- Use Tailwind CSS v4 for styling to match the blog's aesthetic.
- Implement a custom "Spotlight" style modal.
- Optimize the loading of search assets.

### 3. Build Process Integration
Indexing will be handled by running `pagefind` after the Astro build.
- **Update `package.json`**: Add `pagefind` as a `devDependency`.
- **Build Hook**: Use a `postbuild` script or a small Astro integration to run `pagefind --site dist`.

### 4. Content Marking
We will use Pagefind's data attributes to ensure high-quality results:
- Add `data-pagefind-body` to the main content area in the post layout.
- Use `data-pagefind-weight` for titles and descriptions to boost their relevance.

## Risks / Trade-offs

- **Build Time**: Indexing adds a small amount of time to the build process.
- **Client-side JS**: Although small, Pagefind still requires JS to function. This fits within our "Astro islands" approach.
- **Index Size**: For very large sites, the index can grow, but for a personal blog, it will remain negligible.
