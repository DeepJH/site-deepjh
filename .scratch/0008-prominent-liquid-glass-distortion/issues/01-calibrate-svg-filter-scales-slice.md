# Issue 01 (GitHub #36): Calibrate SVG Filter Scales to -80/-72/-64 with xMidYMid slice

## Status
- [x] Done

## Scope
- In `src/components/LiquidGlassFilter.astro`:
  - Change `<feImage>` `preserveAspectRatio="none"` to `preserveAspectRatio="xMidYMid slice"`.
  - Re-scale displacement channels:
    - Red channel: `scale="-80"`
    - Green channel: `scale="-72"`
    - Blue channel: `scale="-64"`
  - Ensure center mask and alpha threshold remain intact to preserve foreground text clarity.

## Acceptance
- [x] SVG filter scales calibrated to `-80 / -72 / -64`.
- [x] `preserveAspectRatio="xMidYMid slice"` configured on displacement map `feImage`.
- [x] Zero compile or type errors in Astro check.
