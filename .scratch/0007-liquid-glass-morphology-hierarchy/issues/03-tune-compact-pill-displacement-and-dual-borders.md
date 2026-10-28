# Issue 03 (GitHub #33): Tune Compact Pill Displacement and Official Dual Borders

## Status
- [x] Done

## Scope
- Update `src/components/LiquidGlassFilter.astro` with calibrated light-mode safe displacement scales:
  - Red Channel: `scale="-24"`
  - Green Channel: `scale="-20"`
  - Blue Channel: `scale="-16"`
- Update `src/components/LiquidGlass.astro` with refined specular rim highlighting:
  - Multi-stop inset specular highlights and refined border properties.
  - Retain 100% sharp child typography with zero interior distortion.

## Acceptance
- [x] Compact pills (Language Toggle, Theme Switcher) display crisp prismatic chromatic fringing.
- [x] No black text smudging or dragging artifacts when scrolling over headings.
