# Issue 02 (GitHub #32): Separate Header Bar from Compact Pill Morphology

## Status
- [x] Done

## Scope
- Update `src/components/LiquidGlass.astro` to distinguish between wide bars (`variant="bar"` or `as="nav"`) and compact pills (`pill={true}`).
- Header bar: utilize pure fluid glass (`glass-card` / `glass-bar` with 7.2px blur and 130% saturation, zero fill tint, dual borders) without applying the 256x256 spherical displacement map.
- Completely eliminate horizontal artifact lines across wide navigation bars.

## Acceptance
- [x] Header navigation bar displays zero horizontal artifact lines.
- [x] Text scrolling under the header remains sharp and undistorted.
