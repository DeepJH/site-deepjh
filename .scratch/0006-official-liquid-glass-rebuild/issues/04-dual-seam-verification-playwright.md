# Issue 04 (GitHub #30): Dual-Seam Verification with Astro Check and Playwright E2E

## Status
- [x] Done

## Scope
- Validate compile seam: `pnpm check` (`astro check && tsc --noEmit`).
- Validate runtime static preview seam: `pnpm test` (Playwright E2E suite against pre-rendered static build).
- Ensure zero errors, zero warnings, zero hydration issues, and full pass across 11 tests.

## Acceptance
- [x] `pnpm check` passes with 0 errors and 0 warnings.
- [x] `pnpm test` passes all 11 Playwright E2E tests.
