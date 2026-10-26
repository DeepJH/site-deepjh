# 01: Walking Skeleton & Chromatic Liquid Glass Shell

**What to build:** A visitor landing on the root page experiences a fast, statically pre-rendered site with a responsive navigation header, global footer, and an ambient Chromatic Substrate background glow. The visitor can toggle the Theme Switcher between light and dark modes instantly without any flash of unstyled content (FOUC), and their preference persists across browser reloads and sessions. The baseline application passes compile-time type verification and runtime end-to-end testing against the pre-built static preview.

**GitHub Issue:** #3 (https://github.com/DeepJH/site-deepjh/issues/3)

**Blocked by:** None (can start immediately)

**Status:** completed

- [x] Statically pre-rendered Astro application boots with TypeScript and Tailwind CSS configured
- [x] Root layout renders the Chromatic Substrate ambient radial glow and responsive document shell
- [x] Global header includes brand navigation links and an interactive Theme Switcher
- [x] Theme Switcher toggles light and dark modes with zero FOUC, respecting system color scheme on first visit and persisting choices to localStorage
- [x] Global footer renders contact links (GitHub, LinkedIn, Email, RSS indicator)
- [x] Compile-time type check (`pnpm astro check` and `tsc --noEmit`) passes cleanly
- [x] Playwright E2E test runs against the static preview build and asserts HTTP 200, layout landmark presence, and theme toggle persistence
