# Issue 01 (GitHub #31): Soften Chromatic Substrate Opacity to 70% of Current

## Status
- [x] Done

## Scope
- Update `src/components/ChromaticSubstrate.astro` to scale all gradient stops down by 30%:
  - Light mode: 50%–60% opacity across all 5 mesh points.
  - Dark mode: 35%–45% opacity across all 5 mesh points.
- Maintain soft `blur-3xl` bloom across the entire viewport.

## Acceptance
- [x] Substrate provides rich chromatic refraction without fluorescent glare.
- [x] Verified across both light and dark modes.
