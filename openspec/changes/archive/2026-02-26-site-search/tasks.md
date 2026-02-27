## 1. Setup and Tooling

- [x] 1.1 Install `pagefind` as a dev dependency via `pnpm add -D pagefind`.
- [x] 1.2 Update `package.json` to include a `postbuild` script: `"postbuild": "pagefind --site dist"`.
- [x] 1.3 Add `.pagefind_cache` (if generated) and `public/pagefind` (if we put it there, though it should be in `dist`) to `.gitignore`.


## 2. Content Preparation

- [x] 2.1 Update `PostLayout.astro` (or equivalent) to add `data-pagefind-body` to the main article tag.
- [x] 2.2 Add `data-pagefind-weight="10"` to article titles and `data-pagefind-weight="5"` to descriptions for better ranking.


## 3. Search UI Component

- [x] 3.1 Create `src/components/Search.astro` with a button and a hidden modal/dialog.
- [x] 3.2 Implement focus management and keyboard shortcuts (`Cmd+K` and `Esc`) in a `<script>` tag within the component.
- [x] 3.3 Style the search modal and results list using Tailwind CSS v4, ensuring it matches the blog's dark/light theme.

## 4. Search Logic and Integration

- [x] 4.1 Implement the search functionality using the Pagefind JS API (`/pagefind/pagefind.js`).
- [x] 4.2 Create a result rendering function that displays the title, snippet, and link for each match.
- [x] 4.3 Add the `Search` component to the site header or global layout.


## 5. Verification

- [x] 5.1 Run `npm run build` and verify that the `dist/pagefind` directory is successfully created.
- [x] 5.2 Launch the preview site using `npm run preview` and test search queries.
- [x] 5.3 Verify that the search modal works correctly on mobile and desktop devices.

