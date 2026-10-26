# Issue 02 (GitHub #21): Reduce Blur by 50% to 4.5px and Boost Transmittance to 88%

## Status
- [x] Done

## Scope
- Update `src/styles/global.css` `.glass-warp` class: reduce backdrop blur from 9px to `4.5px` (`backdrop-blur-[4.5px]`), matching the 50% reduction request.
- Update `src/components/LiquidGlass.astro`: reduce white/dark fill opacity from 35%/40% to `12%` (`bg-white/12 dark:bg-zinc-900/18`), eliminating thick milky acrylic appearance.
- Refine specular rim highlight: delicate `border border-white/60 dark:border-white/15` and crisp top reflection `shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)]`.

## Acceptance
- [x] Header pill and cards render with high clarity and crystal-like transmittance.
- [x] Background typography remains crisp, sharp, and clearly legible under the scrolling header.
- [x] Thick milky acrylic plastic look is completely replaced by light-first fluid glass.
