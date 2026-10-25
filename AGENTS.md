# AGENTS.md

Welcome to **site-deepjh**, DeepJH's personal engineering showcase and technical publication platform.

## 🧭 Ground Truth & Core References

When working in this repository, always align with the following documented sources of truth:

1. **Domain Language**: Strictly follow definitions in [`GLOSSARY.md`](./GLOSSARY.md). Never mix domain concepts with avoided synonyms (e.g., use **Project** / **Case Study**, not "repo" or "demo").
2. **Architecture Decisions**: Respect accepted records in [`docs/adr/`](./docs/adr/):
   - [ADR 0001: Astro Content Collections](./docs/adr/0001-astro-content-collections.md)
   - [ADR 0002: Cloudflare Pages Deployment](./docs/adr/0002-cloudflare-pages-deployment.md)
   - [ADR 0003: Light-First Chromatic Liquid Glass](./docs/adr/0003-light-first-chromatic-glass-theme.md)
   - [ADR 0004: Dedicated Case Study Routes](./docs/adr/0004-project-case-study-routes.md)
3. **Feature Specifications**: Read active specs under [`docs/specs/`](./docs/specs/). All scope, user stories, and acceptance criteria live here.

## 🧪 Testing Seam Principle

Do NOT write unit tests asserting internal component markup or class names.
All automated verification must operate on the **single highest seam**:
- **Compile-time**: `pnpm astro check` & `tsc --noEmit` to validate Content Collection schemas.
- **Runtime E2E**: `pnpm test` (Playwright) against the pre-built static preview (`pnpm build && pnpm preview`), validating external user observable behaviors: HTTP 200 responses, navigation, theme toggle persistence, and accessibility.

## 🛠️ Engineering Rules

- **Zero-Runtime JS Baseline**: Static HTML pre-rendered by Astro. Client-side JS is reserved exclusively for the Theme Switcher.
- **Docs-as-Code**: Specifications, architecture decisions, and task checklists live directly in the Git repository alongside the code.
