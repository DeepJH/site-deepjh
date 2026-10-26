# 0005 Liquid Glass Pill Morphology and Lens Distortion

## Context and Decision
The original Liquid Glass component used generic rounded-rectangle containers with heavy 12px blur, which compromised optical clarity and looked like standard opaque frosted glass. Furthermore, initial attempts at hover displacement using generic turbulence noise distorted foreground text rather than creating genuine optical lens refraction.

We decided to execute an authentic, zero-runtime architectural port of **`rdev/liquid-glass-react`** into native Astro static components:
1. **Pill Capsule Morphology (`rounded-full`) & Layer Separation**: The interactive container cleanly separates the optical warp layer (`.glass__warp`) from foreground children, ensuring user text and icons remain razor-sharp while background substrates undergo realistic refraction.
2. **Precomputed Displacement Normal Map**: Embed the high-fidelity spherical lens displacement normal map from `rdev/liquid-glass-react` into an SVG `<feImage>` filter instead of relying on chaotic procedural noise.
3. **Selective Edge Masking (`EDGE_MASK`)**: Utilize `<feColorMatrix>` and radial mask compositions to concentrate refraction strictly along the capsule's curved perimeter, keeping the center crystalline and high-transmittance.
4. **Three-Channel Chromatic Aberration (RGB Split)**: Displace Red, Green, and Blue channels with independent scales and micro-offsets, recombining them via `<feBlend mode="screen">` to reproduce Apple-grade prismatic dispersion at pill rims.
5. **Hyper-Transparent Optical Tuning (50% Blur Reduction & Zero-Acrylic Transmittance)**:
   - Blur reduced by 50% from 9px to **4.5px** (`backdrop-blur-[4.5px]`), ensuring background typography remains crisp and legible under scrolling pills rather than muddy black smudges.
   - Tint opacity reduced from 35% to **12%** (`bg-white/12 dark:bg-zinc-900/18`) to eliminate thick milky "acrylic plastic" opacity and achieve true water-like crystal transmittance.
   - Displacement scale re-tuned to **-10 to -12** (down from -42) to eliminate dirty dark edge tearing and dark fringe artifacts along curved pill boundaries.
6. **Zero Client-Side JS Runtime**: The entire displacement map, edge mask, and chromatic aberration pipeline operates 100% via declarative SVG `<filter>` and CSS `backdrop-filter`/`filter` styling, preserving our zero-runtime JS baseline.

## Status
Accepted

## Considered Options
- **Retain Rounded-Rectangle with Static Blur**: Safe and standard, but lacks tactile fluidity and distinct visual personality.
- **Heavy WebGL / Three.js Shaders**: High physical fidelity, but introduces client runtime bloat, hydration overhead, and mobile battery drain.
- **Generic SVG Turbulence Noise**: Distorts foreground text and produces fuzzy chaotic noise rather than realistic glass refraction.
- **Native SVG Port of `rdev/liquid-glass-react`**: Achieves authentic Apple VisionOS-grade prismatic chromatic aberration and edge refraction while maintaining zero runtime JS overhead.
