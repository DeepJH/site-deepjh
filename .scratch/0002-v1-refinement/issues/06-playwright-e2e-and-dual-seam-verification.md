# 06: Playwright E2E & Dual-Seam Verification

**What to build:** Comprehensive verification against both highest seams: compile-time (`pnpm astro check` & `tsc --noEmit`) and runtime E2E (`pnpm test` with Playwright against the pre-built static preview). Tests validate canonical title `Hello, Im DeepJH.`, presence of the avatar asset, 4 projects in the showcase, bilingual route navigation (`/` and `/zh`), absence of LinkedIn, presence of email and digital garden links, and theme toggle functionality.

**GitHub Issue:** #14 (https://github.com/DeepJH/site-deepjh/issues/14)

**Blocked by:** 05: Static Bilingual Routing & Navigation

**Status:** completed

- [x] Playwright E2E tests updated to verify homepage title `Hello, Im DeepJH.`
- [x] E2E tests assert avatar image rendering (`/avatar.png`) in Header and Hero
- [x] E2E tests assert 4 projects displayed in 2x2 grid
- [x] E2E tests assert bilingual navigation between EN (`/`) and ZH (`/zh`)
- [x] E2E tests assert contact links: email `deepjhshenjing@gmail.com`, GitHub, absence of LinkedIn
- [x] `pnpm astro check` & `tsc --noEmit` pass with zero errors
- [x] `pnpm build && pnpm test` passes 100% across all browser fixtures
