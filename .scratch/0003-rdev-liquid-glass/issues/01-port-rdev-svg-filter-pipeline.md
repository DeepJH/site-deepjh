# Issue 01 (GitHub #16): Port Authentic rdev/liquid-glass-react SVG Displacement & Chromatic Aberration Pipeline

## Status
- [x] Done

## Scope
- Extract the high-fidelity precomputed normal displacement map (Base64 JPEG) from `rdev/liquid-glass-react`.
- Create `src/components/LiquidGlassFilter.astro` defining SVG `<filter>` elements for liquid glass refraction.
- Implement edge mask extraction via `<radialGradient>` and `<feColorMatrix>` to ensure crystalline transmittance at center and intense refraction at rims.
- Implement 3-channel RGB chromatic aberration with independent displacement scales and micro-offsets blended via `<feBlend mode="screen">`.
- Remove legacy procedural turbulence filter `src/components/LiquidLensFilter.astro` and clean up `src/styles/global.css`.

## Acceptance
- [x] SVG displacement map and chromatic aberration filters embedded without external network dependencies.
- [x] Zero client-side JS runtime added.
- [x] Center region remains clear while edges produce realistic lens aberration.
