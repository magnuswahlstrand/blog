# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Also read `AGENTS.md` — it holds the UI conventions (dark mode, small screens) that
almost every page change has to satisfy.

## Commands

Package manager is **pnpm** (CI uses it; the README's `npm` lines are stale).

```bash
pnpm dev            # dev server
pnpm build          # astro build -> dist/
pnpm preview        # preview the build
pnpm test           # vitest run (all tests)
pnpm test:watch     # vitest watch
pnpm format         # prettier --write .
pnpm format:check   # prettier --check .
```

Single test file / single test:

```bash
npx vitest run src/lib/recipe-flow/__tests__/layout.test.ts
npx vitest run -t "some test name"
```

Vitest only picks up `src/**/__tests__/**/*.test.ts` (node environment, globals on).
Astro components and pages are not covered by tests — the testable logic lives in
`src/lib/`.

Deployment is automatic: pushing to `main` triggers `.github/workflows/deploy.yml`
(GitHub Pages). `scripts/deploy.sh` / `pnpm deploy` is an older manual path that
copies `dist/` into a sibling `../magnuswahlstrand.github.io` repo — don't use it
unless asked.

`.husky/pre-commit` runs `lint-staged`, which prettier-formats every staged file.

## Architecture

Astro 5 static site (Tailwind + React islands + MDX), originally based on the
AstroPaper theme. Site config (title, author, socials, `postPerPage`) is in
`src/config.ts`; global page shell and meta tags in `src/layouts/Layout.astro`.

### Content sources — four separate mechanisms, deliberately

There are **no Astro content collections**. Each kind of content has its own loader:

1. **Blog posts** — `src/contents/*.{md,mdx}`, loaded via `loadPosts()` from
   `src/lib/posts/`, which globs them once and **zod-validates** frontmatter
   against `postSchema`; an invalid post throws at build time with its path.
   Never re-glob `contents/` in a page — call `loadPosts()`.
   `src/types.ts:Frontmatter` is a re-export of the schema-inferred type, so the
   type and the validation cannot drift.
   Two gotchas the schema encodes: `datetime` is a **`Date`**, not a string (YAML
   parses unquoted `2019-04-28` into a Date), and `slug` is **optional** — 8 posts
   omit it and fall back to the title via `@utils/slugify`.
   Sorting and draft filtering go through `@utils/getSortedPosts` (which applies
   `filterDraftPostsInProd` — drafts are visible in dev, hidden in prod).
   URLs come from `@utils/slugify(frontmatter)`, not the filename.
2. **Board games** — `src/games/*.md`, loaded by `src/lib/games/index.ts`, same
   glob-and-validate pattern as posts (`gameSchema`). Rendered by
   `src/pages/lists/board-games.astro`.
3. **Recipes** — TypeScript modules in `src/recipes/*.ts`, registered by hand in
   `src/recipes/index.ts` as a `Record<slug, RecipeFlow>`. Adding a recipe means
   creating the module *and* adding its slug to that map.
4. **JSON data** — `src/data/food-log.json`, `src/pages/menu/_menus.json`,
   imported directly by their pages (`_`-prefixed files are not routed by Astro).

### Recipe flow (`src/lib/recipe-flow/`)

The one non-trivial subsystem. A recipe is a DAG: `ingredients` (leaves) plus
`operations` that take `inputs` (ids of ingredients or other operations).

- `schema.ts` — zod schema + inferred `RecipeFlow` types.
- `validate.ts` — semantic checks zod can't express (duplicate ids, unknown input
  references, operations with no inputs); throws `ValidationError`.
- `layout.ts` — pure layout pass: assigns stages/rows and emits `LayoutRect` cells
  with pixel geometry.
- `wrap-text.ts` — text wrapping for the SVG labels.
- `RecipeFlow.astro` parses → validates → lays out → renders inline SVG at build
  time. A malformed recipe therefore fails the build, which is intended.

The layout and validation modules are the ones with test coverage; keep them pure
so they stay testable.

### Routing

`src/pages/` file routing, all static (`getStaticPaths`). `/articles/[slug]` exists
only as a meta-refresh redirect to `/posts/[slug]` for legacy URLs — keep it in sync
if post slugging changes. `rss.xml.ts` must export **`GET`** (uppercase); Astro
silently emits no file for a lowercase `get`.

### Styling

Tailwind with a `skin` token layer (`text-skin-*`, `bg-skin-*`, `border-skin-*`,
`fill-skin-*`) mapped to CSS variables in `src/styles/base.css`. Dark mode is the
`.theme-dark` class on `<html>`, **not** Tailwind's `dark:` variant. See `AGENTS.md`
before touching colors.

### Imports

`tsconfig.json` maps `@*` → `./src/*`, so `@components/...`, `@utils/...`,
`@layouts/...` all work, and `src/config` / `src/types` are imported bare. Both
styles appear in the codebase; match whatever the file you're editing already uses.
