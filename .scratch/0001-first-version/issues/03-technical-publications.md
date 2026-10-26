# 03: Technical Publications & Build-Time Syntax Highlighting

**What to build:** Technical readers can browse and read in-depth technical Posts with clear typography, comfortable reading rhythm, and build-time syntax highlighting for code blocks without any client-side JavaScript overhead. Visitors can navigate to the `/posts` archive page, review post descriptions, publication dates, tags, and estimated reading times. Clicking an article navigates to `/posts/[slug]`, which presents high-contrast prose hierarchy and dual-theme Shiki code blocks matching both light and dark modes. The homepage displays the most recent published Posts.

**GitHub Issue:** #5 (https://github.com/DeepJH/site-deepjh/issues/5)

**Blocked by:** 01: Walking Skeleton & Chromatic Liquid Glass Shell (#3)

**Status:** completed

- [x] Content Collection schema defined for `posts` with strict validation for `title`, `description`, `publishDate`, `updatedDate`, `tags`, `draft`, and estimated reading time
- [x] Seed data created for at least 2 long-form technical Posts with diverse code blocks and headings
- [x] Build-time syntax highlighting configured with dual light/dark themes (zero client-side JS overhead)
- [x] High-contrast, fatigue-free prose typography layout with responsive scale
- [x] Dedicated `/posts` index page renders chronological post listing with tag metadata and reading times
- [x] Dedicated `/posts/[slug]` reader route renders full post content, headings, and styled code blocks
- [x] Homepage renders recent Posts section
- [x] Draft posts are excluded from production builds while available in local development
- [x] Playwright E2E test asserts navigation to `/posts`, reading a post, syntax-highlighted code block rendering, and draft exclusion
