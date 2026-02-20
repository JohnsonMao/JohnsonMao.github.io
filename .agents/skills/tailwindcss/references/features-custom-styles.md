---
name: tailwind-custom-styles
description: Arbitrary values, custom CSS with @layer, @utility, @variant, and @custom-variant
---

# Adding Custom Styles

Use arbitrary values for one-off styles, and custom CSS / utilities / variants when you need reusable or complex behavior.

## Arbitrary values

Square-bracket notation for one-off values (works with variants like `hover:` and `lg:`):

```html
<div class="top-[117px] lg:top-[344px]"></div>
<div class="bg-[#bada55] text-[22px] before:content-['Festivus']"></div>
```

**CSS variable shorthand:** `fill-(--my-brand-color)` → `fill-[var(--my-brand-color)]`.

**Arbitrary properties:**

```html
<div class="[mask-type:luminance] hover:[mask-type:alpha]"></div>
<div class="[--scroll-offset:56px] lg:[--scroll-offset:44px]"></div>
```

**Whitespace:** use underscore for space; Tailwind converts it. For a literal underscore, escape: `before:content-['hello\_world']` (in JSX consider `String.raw`).

**Ambiguity:** use a type hint for CSS variables: `text-(length:--my-var)` vs `text-(color:--my-var)`.

## Custom CSS and layers

**Plain CSS** (no layer):

```css
@import "tailwindcss";
.my-custom-style { /* ... */ }
```

**Base styles** (defaults for elements):

```css
@layer base {
  h1 { font-size: var(--text-2xl); }
  h2 { font-size: var(--text-xl); }
}
```

**Component layer** (overridable by utilities):

```css
@layer components {
  .card {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-6);
    box-shadow: var(--shadow-xl);
  }
}
```

**Variants inside custom CSS:**

```css
.my-element {
  background: white;
  @variant dark { background: black; }
}
```

Nest for multiple variants: `@variant dark { @variant hover { ... } }`.

## Custom utilities — @utility

**Simple:**

```css
@utility content-auto {
  content-visibility: auto;
}
```

Use as `content-auto` or `hover:content-auto`.

**Complex (nesting):**

```css
@utility scrollbar-hidden {
  &::-webkit-scrollbar { display: none; }
}
```

**Functional (with value):** use `--value()` to resolve the utility’s argument.

- Theme: `--value(--tab-size-*)` matches theme keys like `--tab-size-2`, `--tab-size-4`.
- Bare: `--value(integer)`, `--value(percentage)`, etc.
- Literal: `--value("inherit", "initial", "unset")`.
- Arbitrary: `--value([integer])` for `tab-[76]`.

```css
@theme { --tab-size-2: 2; --tab-size-4: 4; }
@utility tab-* {
  tab-size: --value(--tab-size-*, integer, [integer]);
}
```

Negative utilities: define separate `inset-*` and `-inset-*` with `--value(integer) * -1` for the negative one. Modifiers use `--modifier()`.

## Custom variants — @custom-variant

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *)) { @slot; }
```

Usage: `theme-midnight:bg-black`. For multiple rules, nest:

```css
@custom-variant any-hover {
  @media (any-hover: hover) {
    &:hover { @slot; }
  }
}
```

## Key Points

- Use arbitrary values `[value]` or `[prop:value]` for one-offs; they work with all variants.
- Use `@layer base` / `@layer components` for defaults and component classes; use `@utility` for new utility classes; use `@custom-variant` for new variants.
- In `@utility`, `--value()` and `--modifier()` define how the utility and optional modifier resolve (theme, bare, literal, arbitrary).

<!--
Source references:
- https://tailwindcss.com/docs/adding-custom-styles
- https://tailwindcss.com/docs/theme
- sources/tailwindcss/
-->
