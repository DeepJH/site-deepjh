# Issue 03 (GitHub #29): Rebuild Liquid Glass Components with Zero-Tint and Official Elevation

## Status
- [x] Done

## Scope
- Update `src/styles/global.css`:
  - Set `.glass__warp, .glass-warp, .glass-card` to official `backdrop-filter: blur(7.2px) saturate(130%)`.
- Update `src/components/LiquidGlass.astro`:
  - Remove all milky white/zinc opaque background fills (`bg-white/..`). Use pure transparent base.
  - Apply official floating box shadow: `shadow-[0_12px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.55)]`.
  - Add specular rim reflection border (`border border-white/50 dark:border-white/15`).
  - Isolate foreground children so user typography remains 100% sharp.

## Acceptance
- [x] Zero milky acrylic haze; background colors shine through with crystal clarity.
- [x] Tactile, elevated floating presence matching the official demo.
- [x] Typography and child elements remain crisp and legible.
