---
name: tailwind-installation
description: How to install and wire Tailwind CSS with Vite, PostCSS, or the CLI
---

# Tailwind CSS Installation

Tailwind v4 is configured in CSS (no `tailwind.config.js`). Choose one integration.

## Using Vite

Best for Vite-based apps (React, Vue, SvelteKit, Nuxt, etc.).

```bash
npm install tailwindcss @tailwindcss/vite
```

**vite.config.ts:**

```ts
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

**CSS entry (e.g. src/index.css):**

```css
@import "tailwindcss";
```

Then run `npm run dev` and use utility classes in HTML/JSX.

## Using PostCSS

For Next.js, Angular, or any PostCSS pipeline.

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

**postcss.config.mjs:**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

**CSS entry:**

```css
@import "tailwindcss";
```

## Tailwind CLI

For no-bundler setups or standalone CSS builds.

```bash
npm install tailwindcss @tailwindcss/cli
```

**CSS (e.g. src/input.css):**

```css
@import "tailwindcss";
```

**Build commands:**

```bash
# One-off build
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css

# Watch mode
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch

# Minify
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --minify

# Source map
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --map
```

CLI options: `--input` / `-i`, `--output` / `-o` (default stdout), `--watch` / `-w`, `--minify` / `-m`, `--optimize`, `--cwd`, `--map`.

## Key Points

- Entry is always `@import "tailwindcss";` in your main CSS file.
- No `tailwind.config.js` in v4; theme and content are configured in CSS with `@theme` and `@source`.

<!--
Source references:
- https://tailwindcss.com/docs/installation
- https://tailwindcss.com/docs/installation/using-vite
- https://tailwindcss.com/docs/installation/using-postcss
- https://tailwindcss.com/docs/installation/tailwind-cli
- sources/tailwindcss/packages/@tailwindcss-cli/
-->
