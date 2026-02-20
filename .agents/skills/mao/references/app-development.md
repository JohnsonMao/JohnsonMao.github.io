---
name: app-development
description: React/Next.js application conventions. Use when building web apps, choosing between Vite and Next.js, or writing React components.
---

# App Development

## Framework Selection

| Use Case | Choice |
|----------|--------|
| SPA, client-only, library playgrounds | Vite + React |
| SSR, SSG, SEO-critical, file-based routing, API routes | Next.js |

## React Conventions

| Convention | Preference |
|------------|------------|
| Component style | Functional components only |
| Typing | TypeScript with explicit props interfaces |
| State | `useState` for local, consider Zustand or React Context for shared |
| Styling | Tailwind CSS |
| Data fetching | React Query (TanStack Query) for client; Next.js `fetch`/server components for Next |

### Props and Component Structure

```tsx
// Prefer defining props interface above or in same file
interface DatePickerProps {
  title: string
  value?: Date | null
  onChange?: (value: Date | null) => void
}

const DatePicker = ({ title, value, onChange }: DatePickerProps) => {
  // ...
  return (/* JSX */)
}
```

### File and Export Conventions

- **Naming**: File/folder kebab-case, component PascalCase — e.g. `date-picker/date-picker.tsx` → `DatePicker`. One main component per file.
- **Exports**: Named exports from the component file: component, props type, and enums together, e.g. `export { DatePicker, DatePickerProps }`. Use `index.ts` only to re-export for shorter imports.
- **className**: Use `cn()` (from `tailwind-merge` + `clsx`) to merge base classes with `className`. Example: `className={cn('base-styles', className)}`.

Note: Component props/types live in the same file as the component; the root skill’s “types in types.ts” applies to non-UI modules.
