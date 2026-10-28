# Issue 02 (GitHub #28): Port Official rdev SVG Filter Parameters and Chromatic Aberration

## Status
- [x] Done

## Scope
- Update `src/components/LiquidGlassFilter.astro` to match official rdev parameters:
  - Red Channel Scale: `-64`
  - Green Channel Scale: `-70.4` (`64 * -1.1`)
  - Blue Channel Scale: `-76.8` (`64 * -1.2`)
  - Gaussian blur: `stdDeviation="0.3"`
  - Radial gradient inner edge offset: `76%`
- Verify discrete transfer mask `tableValues="0 0.1 1"` preserves a clean, undistorted central text window.

## Acceptance
- [x] SVG `<filter>` applies official Scale 64 refraction with genuine RGB channel separation.
- [x] Vivid rainbow chromatic aberration visible along curved capsule perimeters.
