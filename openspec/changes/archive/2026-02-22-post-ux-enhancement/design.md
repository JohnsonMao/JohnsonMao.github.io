## Context

The current blog uses Astro with Content Collections. Individual posts are rendered using `PostLayout.astro`. The goal is to enhance the post-reading experience by adding TOC, Related Articles, JSON-LD, and a Copy Link feature.

## Goals / Non-Goals

**Goals:**
- Automatically generate TOC from H2/H3 headings.
- Display related articles based on tag similarity.
- Add `BlogPosting` JSON-LD for better SEO.
- Provide a simple way to copy the article link.
- Keep the design clean and consistent with the existing theme.

**Non-Goals:**
- Complex AI-based recommendations (simple tag matching is enough).
- Full-text search integration.
- Dynamic comment system (out of scope for this task).

## Decisions

### 1. TOC Implementation
- **Mechanism**: Use `headings` returned from Astro's `render(entry)`.
- **Display**: A sticky sidebar on large screens and a collapsible or top-level list on mobile.
- **Rationale**: Built-in headings extraction is standard and performant in Astro.

### 2. Related Articles Logic
- **Algorithm**: 
  1. Get all posts in the same locale.
  2. For each post (excluding current), calculate `intersection(current.tags, post.tags).length`.
  3. Filter for posts with at least 1 shared tag.
  4. Sort by: Number of shared tags (desc) -> Publication date (desc).
  5. Take top 3.
- **Rationale**: Effective enough for small/medium blogs without external dependencies.

### 3. JSON-LD Component
- **Implementation**: A dedicated `JsonLd.astro` component or directly in `PostLayout.astro`'s `BaseLayout` slot.
- **Data Source**: Map frontmatter fields to `BlogPosting` properties.
- **Rationale**: Encapsulating SEO logic simplifies maintenance.

### 4. Copy Link Feature
- **Implementation**: A client-side `<button>` with a small inline `<script>`.
- **API**: Use `navigator.clipboard.writeText(window.location.href)`.
- **Rationale**: Minimal JS required for this standard feature.

## Risks / Trade-offs

- **[Risk]** TOC might be too long for some posts.
  - **Mitigation**: Limit extraction to H2/H3 only.
- **[Risk]** Related articles might be empty for very niche posts.
  - **Mitigation**: Show latest posts as fallback.
- **[Risk]** `navigator.clipboard` requires a secure context (HTTPS).
  - **Mitigation**: Standard for modern web; fallback to selection if needed (though rare now).
