---
name: tailwind-theme
description: Theme variables with @theme, design token namespaces, and customizing defaults
---

# Theme Variables

Tailwind v4 uses **theme variables** (CSS custom properties in `@theme`) to drive utilities. Define or override them in your CSS.

## Defining theme variables

```css
@import "tailwindcss";

@theme {
  --color-mint-500: oklch(0.72 0.11 178);
  --font-poppins: Poppins, sans-serif;
  --breakpoint-3xl: 120rem;
}
```

- `--color-*` → color utilities (`bg-mint-500`, `text-mint-500`).
- `--font-*` → `font-*` utilities.
- `--breakpoint-*` → responsive variants (`3xl:*`).
- `--spacing-*`, `--radius-*`, `--shadow-*`, `--text-*`, `--ease-*`, `--animate-*`, etc. map to their utility namespaces.

New variables in these namespaces create new utility classes.

## Extending vs overriding

**Extend (add new tokens):**

```css
@theme {
  --font-script: Great Vibes, cursive;
}
```

**Override a single value:**

```css
@theme {
  --breakpoint-sm: 30rem;
}
```

**Replace a whole namespace:**

```css
@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-midnight: #121063;
  --color-tahiti: #3ab7bf;
}
```

**Custom theme only (no defaults):**

```css
@theme {
  --*: initial;
  --spacing: 4px;
  --font-body: Inter, sans-serif;
  --color-lagoon: oklch(0.72 0.11 221.19);
}
```

## Animation keyframes

Define keyframes for `--animate-*` inside `@theme`:

```css
@theme {
  --animate-fade-in-scale: fade-in-scale 0.3s ease-out;
  @keyframes fade-in-scale {
    0% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  }
}
```

## Referencing other variables

Use `@theme inline` when a theme variable should resolve to another variable’s **value** (not a `var()` reference):

```css
@theme inline {
  --font-sans: var(--font-inter);
}
```

## Using theme in custom CSS and JS

Theme variables are emitted as normal CSS variables on `:root`. Use them in custom CSS or arbitrary values:

```css
@layer components {
  .typography p {
    font-size: var(--text-base);
    color: var(--color-gray-700);
  }
}
```

```html
<div class="rounded-[calc(var(--radius-xl)-1px)]">...</div>
```

In JS: `getComputedStyle(document.documentElement).getPropertyValue('--shadow-xl')`.

## Key Points

- Use `@theme` for design tokens that should generate utilities; use `:root` for plain CSS variables.
- Namespaces: `--color-*`, `--font-*`, `--text-*`, `--breakpoint-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--ease-*`, `--animate-*`, etc.
- `--*: initial` or `--color-*: initial` clears default theme or a namespace.

<!--
Source references:
- https://tailwindcss.com/docs/configuration (theme variables)
- https://tailwindcss.com/docs/theme
- sources/tailwindcss/packages/tailwindcss/
-->
