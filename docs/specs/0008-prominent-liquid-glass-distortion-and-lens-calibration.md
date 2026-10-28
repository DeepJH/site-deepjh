# Spec 0008: Prominent Liquid Glass Distortion and Lens Calibration

## Status
Accepted / In Progress

## Originating User Request
> "很好看着不错，基本稳定。但是我觉得液态玻璃的那种畸变效果还没有。调高一下。"

## Problem Statement
While earlier stabilization achieved clean rendering without horizontal line artifacts or black smudge dragging across the wide header, the liquid glass displacement scale (-24/-20/-16) and card-level filter exclusion resulted in barely noticeable optical refraction. The signature liquid water-drop bending and prismatic chromatic aberration seen in official implementations (`liquid-glass.maxrovensky.com`) were absent on cards and under-emphasized on compact controls.

## User Stories
1. **As a visitor**, when I view Showcase project cards and interactive pills, I see authentic liquid water-drop refraction bending background colors along the perimeter like a real glass lens.
2. **As a visitor**, when I read typography inside cards or navigation items, the text remains 100% vector sharp and pristine without blur or smudge.
3. **As a visitor**, when scrolling the page, the sticky header bar retains a clean crystal glass appearance without horizontal line artifacts or background black smudge dragging.

## Technical Architecture & Implementation Details

1. **Prominent SVG Filter Displacement Scales**:
   - In `src/components/LiquidGlassFilter.astro`:
     - Update Red channel: `scale="-80"`
     - Update Green channel: `scale="-72"`
     - Update Blue channel: `scale="-64"`
   - Provides dramatic optical edge curvature and vivid RGB chromatic dispersion matching official demo standards.

2. **Equidistant Spherical Geometry (`xMidYMid slice`)**:
   - In `src/components/LiquidGlassFilter.astro`:
     - `<feImage ... preserveAspectRatio="xMidYMid slice" />`
   - Preserves circular spherical lens geometry across any container aspect ratio, preventing directional compression.

3. **Card & Pill Morphology Refraction Activation**:
   - In `src/components/LiquidGlass.astro`:
     - `variant="card"`: Render background optical layer with `glass__warp rounded-2xl`.
     - `variant="pill"`: Render background optical layer with `glass__warp rounded-full`.
     - `variant="bar"`: Render background optical layer with `glass-card rounded-full` (backdrop-filter without displacement map, preserving crystal purity on 20:1 wide navbar).

4. **Forefront Vector Text Protection**:
   - Maintain `CENTER_CLEAN` composite isolation in the SVG filter.
   - Maintain `.glass__content` foreground layout in `LiquidGlass.astro` to ensure text is never passed into the displacement pipeline.

---

## Acceptance Criteria

- [x] `LiquidGlassFilter.astro` configured with scales `-80 / -72 / -64` and `preserveAspectRatio="xMidYMid slice"`.
- [x] `LiquidGlass.astro` activates `glass__warp` on both `variant="card"` and `variant="pill"`.
- [x] Header navigation bar (`variant="bar"`) renders cleanly with backdrop blur and zero stretched displacement artifacts.
- [x] Foreground text across all cards and controls remains 100% sharp and readable.
- [x] Dual-seam verification: `pnpm check` (0 errors) and Playwright E2E suite (11/11 tests pass).
