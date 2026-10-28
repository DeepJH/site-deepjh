# 0008 Liquid Glass Morphology Hierarchy and Substrate Softening

## Context and Decision

User testing and visual verification of the official parameter port revealed two critical physical and aesthetic defects:
1. **Substrate Over-saturation**: The 85% opacity chromatic mesh was overly aggressive and neon-like. We decided to soften the opacity to **70% of current** (light mode: 50%–60%, dark mode: 35%–45%), retaining smooth, elegant `blur-3xl` ambient blooms that provide sufficient optical contrast without blinding fluorescence.
2. **Horizontal Artifact Lines & Text Dragging in Wide Navbars**:
   - The 256×256 displacement normal map from `rdev/liquid-glass-react` is mathematically spherical, designed for compact elements with 1:1 to 3:1 aspect ratios.
   - When stretched across an 800px+ sticky navbar (20:1 aspect ratio), the vertical axis is compressed 16-fold, collapsing the top and bottom spherical arcs into two harsh horizontal artifact lines spanning the entire navbar width.
   - Furthermore, a 64px displacement scale applied over dark body typography drags black letters across the entire 48px navbar height, generating massive dark smudge blobs.
3. **Morphology Hierarchy Decision**:
   - **Liquid Glass Bar (`as="nav"`, wide headers)**: Uses pure optical fluid glass (7.2px blur, 130% saturation, official dual-layer specular borders, and floating shadows) without the 256×256 spherical displacement map. This keeps wide navigation bars razor-sharp, completely eliminating horizontal artifact lines and text dragging smudges.
   - **Liquid Glass Pill (`pill={true}`, compact capsules)**: Applied strictly to compact controls (Language Switcher, Theme Switcher, buttons, badges) where the 1:1 to 3:1 aspect ratio perfectly matches the spherical normal map.
   - **Light-Mode Text Safety Scale**: In compact pills, displacement scale is tuned to **-24 / -20 / -16** (Red: -24, Green: -20, Blue: -16) to provide vibrant rainbow chromatic fringing along capsule rims without pulling dark background pixels into muddy smudges.
   - **Official Dual-Layer Specular Borders**: Incorporates the official demo's dual-masked specular borders (`mix-blend: screen / overlay` with inset highlights) to outline fluid water-drop contours without needing opaque fill tints.

## Status
Accepted (supersedes optical parameters of ADR 0007).

## Consequences
- Completely eliminates horizontal artifact lines across wide navigation bars.
- Prevents background typography from being dragged into dark smudge blobs.
- Delivers elegant, non-blinding chromatic ambient substrate at 70% intensity.
- Zero-runtime JS and single testing seam principles remain strictly preserved.
