# 0006: Official Liquid Glass Rebuild and Vibrant Chromatic Substrate

## User Stories

- **As a site visitor**, I want the site background to feature rich, vibrant, high-contrast chromatic gradients so that the page feels dynamic, luminous, and visually engaging.
- **As a visitor scrolling through the site**, I want the floating header pill and interactive capsules to genuinely bend and refract the colorful background imagery and typography beneath them with authentic Apple-style liquid glass physics, as seen in the official Max Rovensky demo.
- **As a design enthusiast**, I want the liquid glass elements to have zero milky acrylic opacity, authentic 64-scale lens displacement, vivid RGB chromatic aberration, and tactile floating shadows.
- **As a reader**, I want content cards and article text to remain completely legible and sharp while enjoying the elevated translucent glass aesthetic.

---

## Problem Statement

Previous iterations of Liquid Glass suffered from visual weakness due to two root causes:
1. **Underlying Canvas Lack of Color**: The previous chromatic substrate had an opacity of only ~20% and was confined to subtle corners. Because optical refraction merely bends whatever pixels sit behind it, refracting a white/grey background produces invisible refraction and zero chromatic dispersion.
2. **Deviation from Official Demo Defaults**:
   - Previous versions introduced white/dark background tint overlays (`bg-white/12`, `bg-white/35`) which imparted an unwanted milky "acrylic" film.
   - The official demo (`https://liquid-glass.maxrovensky.com/`) uses pure `bg-transparent` with Scale 64 displacement (Red: -64, Green: -70.4, Blue: -76.8), 7.2px blur, and 130% saturation, accompanied by deep floating elevation shadows (`0px 12px 40px rgba(0,0,0,0.25)`).

---

## Architecture Design & Solution

1. **Vibrant Chromatic Substrate Rebuild**:
   - Re-architect `src/components/ChromaticSubstrate.astro` with an expansive, vibrant fluid gradient network spanning top-to-bottom.
   - Use high-saturation, luminescent hues: Cyan `#00D2FF`, Deep Violet `#7928CA`, Sunset Amber `#FF7700`, Electric Rose `#FF0080`.
   - Boost substrate opacity to **70%–85%** in light mode and **50%–70%** in dark mode, ensuring rich chromatic values directly behind the header and content areas.
2. **Official SVG Refraction Pipeline (`LiquidGlassFilter.astro`)**:
   - Red Channel: `scale="-64"`
   - Green Channel: `scale="-70.4"` (`64 * -1.1`)
   - Blue Channel: `scale="-76.8"` (`64 * -1.2`)
   - Radial mask stops at `76%` (`Math.max(30, 80 - 2 * 2)%`)
   - Combined Gaussian blur softened at `stdDeviation="0.3"`
   - `EDGE_MASK` preserved with discrete table values `0 0.1 1` for a crisp, distortion-free center.
3. **Official Component Material (`LiquidGlass.astro` & `global.css`)**:
   - Zero opaque tint: pure transparent base (`bg-transparent`).
   - Backdrop filter: `blur(7.2px) saturate(130%)`.
   - Physical floating shadow: `shadow-[0_12px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.55)]`.
   - Specular bevel rim: `border border-white/50 dark:border-white/15` with surface reflection highlights.
4. **Content Card Specialization**:
   - Content cards retain flat clarity using the 7.2px blur and 130% saturation without 256×256 displacement map stretching, preserving comfortable long-form reading.

---

## Acceptance Criteria

- [x] `ChromaticSubstrate.astro` renders high-density, vibrant gradients (Cyan, Violet, Amber, Rose) at 70%+ opacity.
- [x] `LiquidGlassFilter.astro` applies official displacement scales: Red `-64`, Green `-70.4`, Blue `-76.8`.
- [x] `LiquidGlass.astro` removes all milky `bg-white` fill tints and adopts official 7.2px blur and 130% saturation.
- [x] Official floating drop shadow applied (`0px 12px 40px rgba(0,0,0,0.18)`).
- [x] Text within header and cards remains 100% sharp and legible.
- [x] Dual-seam verification: `pnpm check` passes with 0 errors and `pnpm test` (11/11 E2E tests) passes.
