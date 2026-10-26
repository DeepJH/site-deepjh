# Issue 01 (GitHub #24): Amplify SVG Displacement to -24 and Widen RGB Chromatic Dispersion

## Status
- [x] Done

## Scope
- Update `src/components/LiquidGlassFilter.astro` to re-tune displacement scales across RGB channels:
  - Red Channel: `scale="-24"`
  - Green Channel: `scale="-18"`
  - Blue Channel: `scale="-12"`
- Ensure `EDGE_MASK` cleanly isolates perimeter refraction from the unwarped central reading area.
- Verify screen-blend compositing yields vivid, prismatic chromatic aberration at curved pill rims.

## Acceptance
- [x] Distinct, aesthetically pleasing rainbow chromatic dispersion visible along capsule perimeter.
- [x] No interior typography warping; center remains crystalline and undisplaced.
