# 0005 Liquid Glass Pill Morphology and Lens Distortion

## Context and Decision
The original Liquid Glass component used generic rounded-rectangle containers with heavy 12px blur, which compromised optical clarity and looked like standard opaque frosted glass. Furthermore, initial attempts at hover displacement using generic turbulence noise distorted foreground text rather than creating genuine optical lens refraction.

We decided to execute an authentic, zero-runtime architectural port of **`rdev/liquid-glass-react`** into native Astro static components:
1. **Pill Capsule Morphology (`rounded-full`) & Layer Separation**: The interactive container cleanly separates the optical warp layer (`.glass__warp`) from foreground children, ensuring user text and icons remain razor-sharp while background substrates undergo realistic refraction.
2. **Precomputed Displacement Normal Map**: Embed the high-fidelity spherical lens displacement normal map from `rdev/liquid-glass-react` into an SVG `<feImage>` filter instead of relying on chaotic procedural noise.
3. **Selective Edge Masking (`EDGE_MASK`)**: Utilize `<feColorMatrix>` and radial mask compositions to concentrate refraction strictly along the capsule's curved perimeter, keeping the center crystalline and high-transmittance.
4. **Three-Channel Chromatic Aberration (RGB Split)**: Displace Red, Green, and Blue channels with independent scales and micro-offsets, recombining them via `<feBlend mode="screen">` to reproduce Apple-grade prismatic dispersion at pill rims.
5. **Optical Parameter Evolution & Ultra-Clear Tuning (98% Transmittance & Vivid Chromatic Dispersion)**:
   - *Evolutionary trajectory*: Evolved from initial 4.5px blur / 12% tint (~88% transmittance) to eliminate all residual milky fog.
   - *Near-zero blur*: Blur reduced to **1.5px** (`backdrop-blur-[1.5px]`), ensuring background typography and substrates remain ultra-crisp under scrolling pills.
   - *Ultra-clear transmittance*: Tint opacity reduced to **2%** (`bg-white/[0.02] dark:bg-zinc-900/[0.05]`) for **~98% crystalline transmittance**, defined cleanly by specular bevel highlights and delicate borders.
   - *Vivid chromatic aberration & lens distortion*: RGB channels split into distinct scales (**Red: -24, Green: -18, Blue: -12**), creating a pronounced prism spectrum along curved pill rims while preserving a completely undisturbed central optical window via `EDGE_MASK`.
6. **Zero Client-Side JS Runtime**: The entire displacement map, edge mask, and chromatic aberration pipeline operates 100% via declarative SVG `<filter>` and CSS `backdrop-filter`/`filter` styling, preserving our zero-runtime JS baseline.

## Status
Superseded by [ADR 0007](./0007-official-rdev-liquid-glass-and-vibrant-substrate.md) (optical parameters and substrate integration)

## Considered Options
- **Retain Rounded-Rectangle with Static Blur**: Safe and standard, but lacks tactile fluidity and distinct visual personality.
- **Heavy WebGL / Three.js Shaders**: High physical fidelity, but introduces client runtime bloat, hydration overhead, and mobile battery drain.
- **Generic SVG Turbulence Noise**: Distorts foreground text and produces fuzzy chaotic noise rather than realistic glass refraction.
- **Native SVG Port of `rdev/liquid-glass-react`**: Achieves authentic Apple VisionOS-grade prismatic chromatic aberration and edge refraction while maintaining zero runtime JS overhead.
