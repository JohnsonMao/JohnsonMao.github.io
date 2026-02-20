---
name: tailwind-content-sources
description: Content/source detection, @source, base path, and safelisting with @source inline
---

# Content and Source Detection

Tailwind scans project files for class names and generates CSS only for classes it finds. Control what is scanned with `@source` and `source()`.

## How detection works

- Files are treated as plain text; Tailwind looks for tokens that look like class names.
- **Dynamic class names are not detected:** use full class names, not string concatenation.

**Don’t:**

```html
<div class="text-{{ error ? 'red' : 'green' }}-600"></div>
```

```jsx
className={`bg-${color}-600 hover:bg-${color}-500`}
```

**Do:** use complete class names (e.g. map props to full strings):

```jsx
const colorVariants = {
  blue: "bg-blue-600 hover:bg-blue-500",
  red: "bg-red-600 hover:bg-red-500",
};
return <button className={`${colorVariants[color]} ...`}>{children}</button>;
```

## Default behavior

Tailwind scans every file except: `.gitignore`-listed, `node_modules`, binary files, CSS files, lockfiles. To scan extra paths (e.g. a dependency that uses Tailwind), register them explicitly.

## @source — register or ignore paths

**Add sources** (e.g. a package):

```css
@import "tailwindcss";
@source "../node_modules/@acmecorp/ui-lib";
```

**Set base path** for scanning (e.g. monorepo):

```css
@import "tailwindcss" source("../src");
```

**Ignore paths:**

```css
@import "tailwindcss";
@source not "../src/components/legacy";
```

**Disable auto-detection** (only use explicit sources):

```css
@import "tailwindcss" source(none);
@source "../admin";
@source "../shared";
```

## Safelist with @source inline

Force specific utilities (and optional variants) to be generated even if not found in content:

```css
@import "tailwindcss";
@source inline("underline");
```

With variants (brace-expansion style):

```css
@source inline("{hover:,focus:,}underline");
```

Ranges:

```css
@source inline("{hover:,}bg-red-{50,{100..900..100},950}");
```

## Exclude specific classes

```css
@source not inline("{hover:,focus:,}bg-red-{50,{100..900..100},950}");
```

## Key Points

- Always use full, static class names so the scanner can find them.
- `@source "path"` adds paths; `@source not "path"` ignores; `source(none)` turns off auto scan; `source("../dir")` sets base.
- Use `@source inline("...")` to safelist utilities/variants; use `@source not inline("...")` to exclude.

<!--
Source references:
- https://tailwindcss.com/docs/content-configuration
- sources/tailwindcss/
-->
