# JohnsonMao's Blog

A static blog built with [Astro](https://astro.build), deployed on GitHub Pages.

## Tech Stack

- **Astro** — Static site framework
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Styling (with `@tailwindcss/typography`)
- **Content Collections** — Post management and frontmatter validation (Zod)
- **View Transitions** — In-app navigation transitions (ClientRouter)
- **pnpm** — Package manager

## Project Structure

```
src/
├── content.config.ts   # Content Collections and blog schema
├── content/blog/       # Post .md files
├── layouts/            # BaseLayout, PostLayout
├── components/         # Header, Footer, PostCard
├── pages/              # Home, blog list, single post
└── styles/             # global.css (Tailwind, typography)
```

## Development

```bash
# Install dependencies (Node 20+ recommended, e.g. nvm use 20.19.4)
pnpm install

# Local dev server
pnpm dev

# Typecheck and lint
pnpm check

# Build
pnpm build

# Preview production build
pnpm preview
```

## Writing Posts

Add Markdown files under `src/content/blog/`. Frontmatter must include:

- `title` (required)
- `description` (required)
- `pubDate` (required, date or ISO string)
- `draft`, `tags`, `updated` (optional)

Example:

```md
---
title: Post title
description: Short description
pubDate: 2025-02-20
---

Body content...
```

## Deployment

- Build output goes to `dist/` and can be deployed to any static host.
- This repo uses **GitHub Actions** to deploy to GitHub Pages: pushing to `main` runs `.github/workflows/deploy.yml` to build and publish.
- In the repo **Settings → Pages**, set **Source** to **GitHub Actions**.

## License

MIT
