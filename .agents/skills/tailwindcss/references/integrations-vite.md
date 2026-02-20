---
name: tailwind-vite-plugin
description: @tailwindcss/vite plugin options — optimize, minify, and usage with Vite
---

# @tailwindcss/vite Plugin

Use the Vite plugin for Tailwind v4 in Vite-based projects (React, Vue, SvelteKit, Nuxt, etc.).

## Setup

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

CSS entry: `@import "tailwindcss";` in your main CSS file.

## Plugin options

```ts
tailwindcss({
  // Enable/disable Lightning CSS optimization (default: true in production)
  optimize: true,

  // Or keep optimization but disable minification
  optimize: { minify: false },
})
```

- **optimize (boolean):** When `true`, output is optimized (and minified in production by default). When `false`, optimization is off. Default behavior: optimization on for production (`NODE_ENV === 'production'`), off in dev.
- **optimize.minify (boolean):** When `optimize` is an object, set `minify: false` to optimize without minifying. Minification also respects Vite’s `build.cssMinify`.

## Key Points

- Plugin runs at build and serve; no separate PostCSS config needed.
- Use `optimize: false` for faster dev builds; use `optimize: { minify: false }` to optimize but not minify.

<!--
Source references:
- https://tailwindcss.com/docs/installation/using-vite
- sources/tailwindcss/packages/@tailwindcss-vite/README.md
- sources/tailwindcss/packages/@tailwindcss-vite/src/index.ts
-->
