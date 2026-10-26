# 02: Curated Showcase & Project Case Studies

**What to build:** Visitors browsing the homepage can discover a curated Showcase of 3 to 6 flagship Projects presented on translucent Liquid Glass cards that refract the underlying Chromatic Substrate. Visitors can click any Project card to navigate to its dedicated Case Study page (`/projects/[slug]`), which provides an in-depth technical narrative featuring system architecture breakdowns, engineering trade-offs, and quantified benchmark metrics. Visitors can also navigate to `/projects` to browse the full catalog of engineering projects. All content is strictly validated at build time via Astro Content Collections.

**GitHub Issue:** #4 (https://github.com/DeepJH/site-deepjh/issues/4)

**Blocked by:** 01: Walking Skeleton & Chromatic Liquid Glass Shell (#3)

**Status:** completed

- [x] Content Collection schema defined for `projects` with strict validation for `title`, `description`, `coverImage`, `tags`, `repoUrl`, `demoUrl`, `metrics`, `featured`, and `publishDate`
- [x] Seed data created for at least 1 flagship Project with a comprehensive Case Study markdown narrative
- [x] Liquid Glass project card component renders title, summary, tag list, and metrics highlights
- [x] Homepage renders the curated Showcase section highlighting featured Projects
- [x] Dedicated `/projects` index route lists all published projects
- [x] Dedicated `/projects/[slug]` route renders full Case Study deep-dive details (architecture diagrams, technical challenges, metrics tables, and external links)
- [x] Responsive layouts allow diagrams and metrics tables to scroll cleanly on mobile viewports
- [x] Compile-time schema validation rejects invalid project frontmatter
- [x] Playwright E2E test verifies navigation from Showcase card to the dedicated Case Study route and asserts semantic metadata
