# 0005: Ultra-Clear Liquid Glass Refraction and Chromatic Dispersion

## User Stories

- **As a visitor**, I want the floating header pill to be hyper-transparent with near-zero opacity (~98% transmittance) and ultra-low blur (1.5px) so that background text, links, and cards remain razor-sharp and effortlessly readable as I scroll through the site.
- **As a design-conscious reader**, I want curved pill capsules to exhibit pronounced optical lens curvature and authentic RGB chromatic aberration (rainbow fringing) along their perimeter, giving the interface a crystalline, tactile liquid glass presence.
- **As a reader browsing long articles and project showcases**, I want content cards to share the ultra-clear aesthetic without geometric displacement stretching so that body typography remains flat and comfortable to read.

---

## Problem Statement

Following user review of the 4.5px / 88% transmittance implementation, further visual refinement is required:
1. **Residual Frosted Haziness**: While clearer than 9px, 4.5px blur and 12% fill opacity still produce a subtle milky film over background typography, preventing pure water-like optical clarity.
2. **Understated Chromatic Aberration**: Displacing Red, Green, and Blue channels at scales of -12, -10, -10 left Green and Blue with zero divergence, making chromatic aberration too faint to be distinctly observed.
3. **Desire for Distinct Lens Curvature**: The user explicitly requested an ultra-transparent presentation ("透透透透透") with enhanced lens distortion and prismatic chromatic aberration.

---

## Solution & Architecture Design

1. **Near-Zero Blur (1.5px)**: Reduce backdrop blur from 4.5px down to **1.5px** (`backdrop-blur-[1.5px]`), ensuring background text, cards, and substrates remain razor-sharp and legible beneath capsules without frosted milky haze.
2. **~98% Crystalline Transmittance**: Reduce white background tint to **2%** (`bg-white/[0.02] dark:bg-zinc-900/[0.05]`). Structural presence and depth are maintained purely through physical bevel inset highlights (`shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]`), micro-borders (`border-white/40 dark:border-white/10`), and refined top-down sheen gradients (`from-white/15 via-white/[0.02]`).
3. **Amplified Lens Displacement & Prismatic Chromatic Dispersion**:
   - Re-tune SVG `<feDisplacementMap>` scales across RGB channels with distinct divergence:
     - **Red Channel**: `scale="-24"`
     - **Green Channel**: `scale="-18"`
     - **Blue Channel**: `scale="-12"`
   - A 6px channel separation produces vivid, authentic optical chromatic dispersion (rainbow fringing) along the capsule perimeter.
   - The central viewing area remains crystalline and unwarped via `EDGE_MASK` compositing.
4. **Component Specialization**:
   - Pill capsules (`pill={true}`, Header navigation, Theme Switcher, Language Toggle) receive full SVG optical displacement + chromatic dispersion.
   - Cards (`pill={false}`, Showcase, Case Studies, Post list) receive ultra-clear 98% transmittance + 1.5px blur without displacement stretch.
5. **Docs-as-Code Synchronization**:
   - Synchronize domain definitions in `GLOSSARY.md` and document the ultra-clear refinement in `docs/adr/0005-liquid-glass-pill-morphology-and-lens-distortion.md`.

---

## Acceptance Criteria

- [x] Backdrop blur reduced to 1.5px (`backdrop-blur-[1.5px]`).
- [x] Capsule background tint reduced to 2% (`bg-white/[0.02] dark:bg-zinc-900/[0.05]`) for ~98% transmittance.
- [x] SVG displacement map scales tuned to Red: `-24`, Green: `-18`, Blue: `-12` for vivid chromatic dispersion.
- [x] Center region of pill capsule protected from interior distortion via `EDGE_MASK`.
- [x] Dual-seam verification: `pnpm check` (0 errors) and Playwright E2E suite (11/11 tests pass).
