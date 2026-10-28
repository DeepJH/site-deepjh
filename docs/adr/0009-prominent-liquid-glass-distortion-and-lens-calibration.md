# ADR 0009: Prominent Liquid Glass Distortion and Lens Calibration

## Status
Accepted (Extends ADR 0005, ADR 0007, and ADR 0008)

## Context
Following the implementation of ADR 0008, the site achieved visual stability, eliminating horizontal artifact lines and text dragging across the header navigation bar. However, user feedback noted that the authentic "liquid water-drop distortion" (the signature optical bending and chromatic aberration seen in `rdev/liquid-glass-react` and `liquid-glass.maxrovensky.com`) was barely perceptible.

Investigation of the official implementation revealed three critical factors:
1. **Conservative Scale Values**: In earlier iterations, displacement scale was set to `-24 / -20 / -16`, whereas the official demo configures cards with `displacementScale: 100` (`-100 / -90 / -80`), resulting in vastly stronger lens curvature.
2. **Displacement Map Aspect Ratio Preservation**: The SVG filter previously used `preserveAspectRatio="none"`, which squeezed normal maps on non-square containers. The official implementation uses `preserveAspectRatio="xMidYMid slice"`, preserving the spherical lens geometry without vertical compression.
3. **Card-Level Optical Warp Inclusion**: In ADR 0008, `LiquidGlass` cards were set to `glass-card` without the SVG displacement filter. The official demo showcases rich liquid distortion on `User Info Card` (288×200, 1.44:1 ratio) as well as buttons.

## Decision

1. **Prominent Displacement Calibration (Scale -80 / -72 / -64)**:
   - Scale Red channel to `-80` (`displacementScale: 80 * -1`).
   - Scale Green channel to `-72` (`displacementScale * -0.9`).
   - Scale Blue channel to `-64` (`displacementScale * -0.8`).
   - Deliver dramatic, vibrant liquid water-drop lens bending around container perimeters and distinct RGB chromatic fringing.

2. **Equidistant Spherical Projection via `xMidYMid slice`**:
   - In `src/components/LiquidGlassFilter.astro`, update `<feImage>` from `preserveAspectRatio="none"` to `preserveAspectRatio="xMidYMid slice"`.
   - Ensures the 256×256 normal displacement map preserves spherical geometry across all card and pill aspect ratios (1:1 to 3:1), eliminating horizontal line artifacts.

3. **Liquid Glass Morphology Hierarchy Application**:
   - **`Liquid Glass Card` (`variant="card"`, `rounded-2xl`)**: Receives the optical `glass__warp` displacement layer. When layered over the chromatic substrate and body content, container borders refract background shapes like fluid glass.
   - **`Liquid Glass Pill` (`variant="pill"`, `rounded-full`)**: Compact controls (Theme Switcher, Language Toggle, action buttons) receive `glass__warp` for concentrated, jewel-like optical refraction.
   - **`Liquid Glass Bar` (`variant="bar"`, `rounded-full`)**: Wide navigation containers (Header bar, callout banners) retain crystal backdrop blur (`7.2px`, `130% saturation`) with dual specular rims, avoiding displacement map tiling or stretching across 20:1 wide bars.

4. **Zero-Degradation Text Sharpness**:
   - Strictly maintain `EDGE_MASK` with luminance filtering and `CENTER_CLEAN` composite isolation in the SVG filter.
   - Foreground typography and icons inside `glass__content` stay 100% vector sharp with zero optical warping or muddy smudging.

## Consequences

- **Positive**:
  - The signature fluid liquid-glass distortion and chromatic aberration from the official demo are vividly displayed on project cards, hero bio card, and compact interactive controls.
  - No horizontal line artifacts or black smudge dragging occurs, as `xMidYMid slice` and center masking maintain geometric integrity.
  - Zero-runtime JS constraint and Testing Seam Principle remain 100% satisfied.
- **Negative / Trade-offs**:
  - In non-Chromium browsers (Safari/Firefox), SVG filters on backdrop elements fall back gracefully to frosted glass without edge distortion, exactly as documented in the official demo.
