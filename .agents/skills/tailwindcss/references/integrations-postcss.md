---
name: tailwind-postcss-plugin
description: @tailwindcss/postcss plugin options — base path, optimize, and url rewriting
---

# @tailwindcss/postcss Plugin

Use the PostCSS plugin for Tailwind v4 in PostCSS-based setups (e.g. Next.js, Angular).

## Setup

**postcss.config.mjs:**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

Or with options:

```js
import tailwindcss from '@tailwindcss/postcss'

export default {
  plugins: [
    tailwindcss({
      base: path.resolve(__dirname, './src'),
      optimize: true,
      transformAssetUrls: true,
    }),
  ],
}
```

CSS entry: `@import "tailwindcss";` in your main CSS file.

## Plugin options

- **base (string):** Directory the plugin uses to resolve and scan source files. Defaults to the current working directory. Use when the build runs from a different root (e.g. monorepo).

- **optimize (boolean | { minify?: boolean }):** Same as Vite: `true` enables Lightning CSS optimization (and minification in production by default); `false` disables optimization; `{ minify: false }` optimizes without minifying.

- **transformAssetUrls (boolean):** Whether to rewrite `url(...)` in CSS (e.g. after `@import`). Default `true`. Set to `false` if your bundler/framework already handles asset URLs.

## Key Points

- No `postcss-import` required; the plugin handles `@import` and can rewrite `url()` when `transformAssetUrls` is true.
- Use `base` when the process cwd is not the project root so content detection and resolution are correct.

<!--
Source references:
- https://tailwindcss.com/docs/installation/using-postcss
- sources/tailwindcss/packages/@tailwindcss-postcss/README.md
- sources/tailwindcss/packages/@tailwindcss-postcss/src/
-->
