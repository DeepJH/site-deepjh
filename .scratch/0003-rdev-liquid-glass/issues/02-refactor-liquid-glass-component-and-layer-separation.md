# Issue 02 (GitHub #17): Refactor LiquidGlass.astro Component with DOM Layer Separation and Pill Morphology

## Status
- [x] Done

## Scope
- Refactor `src/components/LiquidGlass.astro` to cleanly decouple the background optical warp layer (`.glass__warp`) from foreground child content (`.glass__content`).
- Background layer applies `backdrop-filter` with blur and saturation, and connects to the SVG liquid glass filter.
- Foreground layer keeps text, buttons, and icons razor-sharp with appropriate text shadow and contrast.
- Support `pill` morphology (`rounded-full`) as well as rounded cards (`rounded-2xl`).
- Add specular highlights and fine reflection rim borders (`border-white/60`, subtle inset reflections).

## Acceptance
- [x] Text within liquid glass elements remains crisp and unwarped.
- [x] Pill containers render with full capsule curvature (`rounded-full`) and crystalline background.
- [x] Both light mode and dark mode styles provide optical depth and contrast.
