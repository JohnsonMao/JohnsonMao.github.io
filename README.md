# JohnsonMao's Blog

A static blog built with [Astro](https://astro.build), with deployment to Cloudflare Pages through GitHub Actions.

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
# Use the pinned Node.js and pnpm versions
nvm install
nvm use
npm install --global pnpm@10.20.0
pnpm install --frozen-lockfile

# Local dev server
pnpm dev

# Run all checks
pnpm check

# Build
pnpm build

# Preview production build
pnpm preview
```

pnpm is installed directly with npm. CI uses `pnpm/action-setup` to install the version declared in `package.json`; no package-manager shim is required.

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
- `.github/workflows/deploy.yml` runs **Validate and build** for pull requests targeting `main` and pushes to `main`. It installs dependencies once with pnpm caching, then runs separate typecheck, lint, unused-code, production unused-code, unit-test, content-registry, and build steps. A failed step stops subsequent steps and prevents deployment.
- Local development, CI, and deployment use Node.js 24.20.0 from `.nvmrc` and pnpm 10.20.0 from `package.json` (`packageManager`). Keep `engines.node` aligned when changing Node.js versions. `pnpm check` remains available locally to run all checks together.
- **Deploy to Cloudflare Pages** requires **Validate and build** to succeed and publishes its `dist/` artifact on `main`. Manual workflow runs deploy only when run on `main`.
- PRs only run CI; preview deployments are not configured.

### One-time setup

1. Create a Cloudflare Pages **Direct Upload** project with `main` as its production branch. If using an existing Git-integrated project, disable its automatic production and preview deployments so only Actions publishes the site.
2. In GitHub **Settings → Secrets and variables → Actions**, add these repository settings:

   | Type | Name | Value |
   | --- | --- | --- |
   | Secret | `CLOUDFLARE_API_TOKEN` | API token with Account → Cloudflare Pages → Edit permission, scoped to the target account |
   | Secret | `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |
   | Variable | `CLOUDFLARE_PAGES_PROJECT_NAME` | Existing Pages project name |
   | Variable | `SITE_URL` | New blog's HTTPS origin, such as `https://your-project.pages.dev` or your configured custom domain |

3. Push to `main`, or run the workflow manually on `main`. The deployment URL appears on the `cloudflare-pages` GitHub environment.

Production builds require `SITE_URL`; deployment requires the Cloudflare settings above. `SITE_URL` feeds Astro's site configuration for canonical URLs, sitemap, and RSS. Local development and PR checks fall back to the old URL when it is unset. To test the new origin locally, run `SITE_URL=https://your-project.pages.dev pnpm build`.

This workflow no longer publishes to GitHub Pages. Keep the existing GitHub Pages site enabled to retain the old published site during migration, and disable any other workflow that still publishes to it. Changing hosting does not move the `johnsonmao.github.io` address to Cloudflare.

See Cloudflare's [Direct Upload CI guide](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/) for account setup details.

## License

MIT
