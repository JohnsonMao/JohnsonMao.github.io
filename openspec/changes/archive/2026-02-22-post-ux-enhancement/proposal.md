## Why

Enhance the reading experience of the technical blog by providing better navigation (TOC), discovery (Related Articles), and social/SEO features (JSON-LD, Copy Link). These features are standard for professional technical blogs and help with user engagement and search engine visibility.

## What Changes

- **Automatic TOC Generation**: Automatically extract H2 and H3 headings from the post content to generate a Table of Contents.
- **Related Articles**: Implement a recommendation system based on existing tags to suggest other relevant posts.
- **JSON-LD (BlogPosting)**: Add structured data to help search engines understand the article content, improving SEO.
- **Copy Link Feature**: Add a button to easily copy the current post's URL, facilitating social sharing.
- **Layout Updates**: Modify `PostLayout.astro` and related CSS to integrate these new features seamlessly.

## Capabilities

### New Capabilities
- `blog-post-ux`: Enhanced navigation and sharing features for blog posts, including Table of Contents (TOC) and Copy Link functionality.
- `blog-related-content`: Discovery mechanism to recommend relevant articles based on tag overlap.

### Modified Capabilities
- `blog-seo-social`: Extend SEO capabilities to include structured data (JSON-LD `BlogPosting`) for blog posts.

## Impact

- `PostLayout.astro`: Will be the primary file for these changes.
- CSS/Styling: New styles for TOC, related articles section, and copy link button.
- Build Process: TOC extraction and tag-based recommendation logic will run at build time (Astro is a static site generator).
- Metadata: JSON-LD will be injected into the `<head>` of blog post pages.
