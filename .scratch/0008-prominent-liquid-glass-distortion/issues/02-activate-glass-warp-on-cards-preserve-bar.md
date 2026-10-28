# Issue 02 (GitHub #37): Activate Glass Warp on Liquid Glass Cards while Preserving Pure Header Bar

## Status
- [x] Done

## Scope
- In `src/components/LiquidGlass.astro`:
  - When `resolvedVariant === 'card'`, render the background optical layer with `glass__warp rounded-2xl` instead of `glass-card rounded-2xl`.
  - When `resolvedVariant === 'pill'`, render with `glass__warp rounded-full`.
  - When `resolvedVariant === 'bar'`, strictly maintain `glass-card rounded-full` (backdrop-filter without displacement filter) so the wide header navigation bar avoids stretching the 256x256 map.

## Acceptance
- [x] Cards (`variant="card"`) receive `glass__warp` optical displacement layer.
- [x] Header bar (`variant="bar"`) stays strictly on `glass-card` without stretched displacement.
- [x] Foreground text inside cards remains crisp and unwarped via `.glass__content`.
