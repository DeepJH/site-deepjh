# Issue 01 (GitHub #20): Re-tune SVG Displacement Scale to Eradicate Edge Dark Artifacts

## Status
- [x] Done

## Scope
- Update `src/components/LiquidGlassFilter.astro` to re-tune displacement scale for Red, Green, Blue channels from -42 down to `-12`, `-11`, and `-10`.
- Ensure displacement concentrates solely at the subtle pill contour without pulling outside dark pixels into the element interior.
- Preserve 3-channel RGB chromatic aberration with crystalline purity.

## Acceptance
- [x] No dark fringe or tearing artifacts around curved capsule edges.
- [x] Subtle, natural optical refraction visible without visual distortion or smudge.
