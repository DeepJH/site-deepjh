# 0007 Official rdev Liquid Glass Rebuild and Vibrant Chromatic Substrate

## Context and Decision

Inspection of Max Rovensky's official demo (`https://liquid-glass.maxrovensky.com/`) and library `rdev/liquid-glass-react` revealed why previous iterations felt subdued or milky:
1. **The Role of the Optical Substrate**: Optical refraction and chromatic dispersion are purely bending what lies behind the lens. In a blank or washed-out white background, refracting white into white produces zero visible curvature. The official demo succeeds by scrolling glass over high-saturation, high-contrast photography.
2. **Official Demo Default Parameters**:
   - **Zero Background Tint**: The official demo uses `bg-transparent` with zero white or dark fill overlay (`bg-white/..`), relying entirely on the optical warp layer (`.glass__warp`) with backdrop blur and saturation.
   - **Pill Lens Displacement**: Uses Scale `64`, with RGB channel split: Red `-64`, Green `-70.4` (`64 * -1.1`), and Blue `-76.8` (`64 * -1.2`).
   - **Optical Blur & Saturation**: Uses `7.2px` blur (`4 + 0.1 * 32`) and `130%` saturation.
   - **Floating Elevation Shadow**: Uses `box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.25)`.

We decided to execute a ground-up rebuild of both the substrate and the liquid glass component system:
1. **Vibrant Chromatic Substrate**: Rebuild `ChromaticSubstrate.astro` with bold, full-bleed high-density fluid mesh gradients (Cyan `#00D2FF`, Deep Violet `#7928CA`, Sunset Amber `#FF7700`, Electric Rose `#FF0080`) at 70%–85% opacity across both light and dark themes. This provides a vivid, high-contrast chromatic canvas behind all navigation and content layers.
2. **Strict Official Parameter Mapping**: Rebuild `LiquidGlassFilter.astro` and `LiquidGlass.astro` to directly implement the official demo's exact mathematical transforms:
   - Zero opaque fill: completely transparent body.
   - Scale 64 displacement with genuine channel divergence (-64 / -70.4 / -76.8).
   - 7.2px backdrop blur with 130% saturation boost.
   - Elevated physical floating shadow.
3. **Component Specialization**:
   - Pills (Header Navigation, Theme Switcher, Language Toggle, Interactive Buttons) receive the official Scale 64 liquid refraction warp.
   - Content Cards (Showcase, Case Studies, Posts) receive pure optical high-transmittance backdrop filtering without displacement stretch.
4. **Zero-Runtime JS Baseline**: 100% pre-rendered Astro static HTML with declarative SVG `<filter>` and CSS.

## Status
Accepted

## Consequences
- High-contrast chromatic refraction is instantly recognizable across all screen sizes and scrolling states.
- Eliminates any lingering acrylic milky haze by discarding opaque fill colors.
- Maintains compliance with Zero-Runtime JS and the single testing seam principles.
