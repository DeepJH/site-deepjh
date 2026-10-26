# 0005 Liquid Glass Pill Morphology and Lens Distortion

## Context and Decision
The original Liquid Glass component used generic rounded-rectangle containers with heavy 12px blur, which compromised optical clarity and looked overly boxed. We decided to transition to a **Pill Capsule Morphology (`rounded-full`)** across interactive controls, navigation shells, and badges, while tuning the material to be **more crystalline and transparent (blur reduced to 75% at ~9px, opacity dropped for higher transmittance, and ambient substrate glow boosted by 120%)**. Furthermore, inspired by `rdev/liquid-glass-react`, interactive buttons feature **hover lens magnification with dynamic optical displacement distortion**, simulating realistic droplet refractions over background elements while retaining the zero-runtime client JS baseline.

## Status
Accepted

## Considered Options
- **Retain Rounded-Rectangle with Static Blur**: Safe and standard, but lacks tactile fluidity and distinct visual personality.
- **Heavy WebGL Runtime (Three.js / Shader Canvases)**: Maximum physical fidelity, but introduces substantial script payloads and battery drain that violate the zero-JS architecture.
- **Pill Morphology with SVG/CSS Lens Displacement Refraction**: Achieves Apple-grade liquid glass magnification and fluid distortion with zero runtime bundle overhead and high-contrast transparency.
