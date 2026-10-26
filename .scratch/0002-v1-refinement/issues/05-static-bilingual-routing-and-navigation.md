# 05: Static Bilingual Routing & Navigation

**What to build:** Implement pre-rendered static bilingual routing adhering to ADR 0006. Support English as default (`/`, `/projects`, `/posts`) and Chinese at `/zh`, `/zh/projects`, `/zh/posts`, `/zh/projects/[slug]`, and `/zh/posts/[slug]`. Add a zero-runtime pill language switcher (`EN / 中文`) in the navigation header that switches locales while preserving relative paths.

**GitHub Issue:** #13 (https://github.com/DeepJH/site-deepjh/issues/13)

**Blocked by:** 04: Flagship Publication & Digital Garden Syndication

**Status:** completed

- [x] Header navigation updated with an instant `EN / 中文` language switcher pill
- [x] Pre-rendered Chinese homepage implemented at `src/pages/zh/index.astro`
- [x] Pre-rendered Chinese projects index and case study pages implemented under `src/pages/zh/projects/`
- [x] Pre-rendered Chinese posts index and reading pages implemented under `src/pages/zh/posts/`
- [x] Zero-runtime JS baseline preserved across all bilingual routes
