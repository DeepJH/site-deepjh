# 0002: v1 Refinement — Bilingual Routing, Pill Morphology & Digital Garden

## Problem Statement

Following the initial v1 walking skeleton release, the portfolio requires authentic personalization and visual refinement to accurately represent DeepJH's engineering craft and work:
1. **Generic Identity & Abstract Visuals**: Placeholder contact information (LinkedIn, dummy email), mock projects, and generic abstract blue dots do not reflect DeepJH's real-world identity, actual GitHub repositories, or technical direction (AI Agents & Full-Stack Systems).
2. **Heavy Boxy Glass Aesthetic**: The original Liquid Glass container relied on generic rounded-rectangle cards with dense 12px blur, resulting in optical muddiness rather than tactile, crystalline fluidity.
3. **Monolingual Limitation**: The engineering showcase caters to both international technical audiences and domestic Chinese peers, requiring pre-rendered bilingual access without client-side hydration bloat.
4. **Maintenance Overhead of Mock Articles**: Sprawling mock posts distract from DeepJH's real, ongoing technical knowledge base hosted in the `text-note` repository.

---

## Solution

Refine **site-deepjh** with authentic identity metadata, static bilingual routing, a 2×2 curated showcase of real projects, and an upgraded crystalline pill-capsule liquid glass aesthetic:

- **Canonical Identity & Avatar**:
  - Homepage title: canonically set to `Hello, Im DeepJH.`.
  - Fetch DeepJH's GitHub avatar (`https://avatars.githubusercontent.com/u/115404191?v=4`) into `public/avatar.png`, replacing all previous abstract blue dots in the header brand and hero section.
  - Domain metadata updated to `https://hereisdeepjh.dpdns.org`.
  - Contact links updated: GitHub (`https://github.com/DeepJH`), Email (`deepjhshenjing@gmail.com`), RSS (`/rss.xml`), removing LinkedIn entirely.
  - Position statement: *"Engineering autonomous agent workflows & high-craft full-stack web architectures."*
  - 3 Core Engineering Principles: Autonomous Workflows, Tactile Craft, Lean & Local-First.

- **Authentic Liquid Glass Port (`rdev/liquid-glass-react`) & Pill Morphology**:
  - Transition container styling to Pill Capsule Morphology (`rounded-full`) for navigation shells, badges, and interactive controls.
  - Implement an authentic, zero-runtime architectural port of `rdev/liquid-glass-react`:
    1. **Precomputed Displacement Normal Map**: Embed the high-fidelity spherical lens displacement normal map from `rdev/liquid-glass-react` into an SVG `<feImage>` filter instead of relying on chaotic procedural noise.
    2. **Edge Masking (`EDGE_MASK`)**: Utilize `<feColorMatrix>` and radial mask compositions to concentrate refraction strictly along the capsule's curved perimeter, keeping the center crystalline and high-transmittance.
    3. **Three-Channel Chromatic Aberration (RGB Split)**: Displace Red, Green, and Blue channels with independent scales and micro-offsets, recombining them via `<feBlend mode="screen">` to reproduce Apple-grade prismatic dispersion at pill rims.
    4. **DOM Layer Separation (`.glass__warp`)**: Cleanly separate the optical warp layer (`.glass__warp`) from foreground children, ensuring user text and icons remain razor-sharp while background substrates undergo realistic refraction.
    5. **Zero Client-Side JS Runtime**: Operate 100% via declarative SVG `<filter>` and CSS `backdrop-filter`/`filter` styling, preserving our zero-runtime JS baseline.
  - Reduce blur to 75% (~9px) and adjust background opacity (`bg-white/35 dark:bg-zinc-900/40`) for crystalline transmittance and clarity.
  - Boost Chromatic Substrate saturation by 120% (increase gradient glow opacity by 20% in `ChromaticSubstrate.astro`).

- **Curated 2×2 Project Showcase**:
  - Curate exactly 4 real GitHub projects in a balanced 2×2 grid:
    1. `aitopschool-downloader`: Automated multimedia & course asset extraction CLI tool for pedagogical platforms.
    2. `good-bye-othello`: High-performance AI Othello engine featuring alpha-beta search, heuristic bitboards, and game tree pruning.
    3. `brief-clock`: Minimalist tactile desktop timekeeper and productivity utility with clean visual geometry.
    4. `State_Tuning_Tutorial_For_RWKV`: Comprehensive practitioner's guide and fine-tuning pipeline for RWKV state-tuning.

- **Flagship Publication & Digital Garden Syndication**:
  - Replace mock posts with a single flagship bilingual reflection: 《思维的回响：关于 text-note 知识库与智能体实践》 (*Echoes of Thought: Notes on text-note Knowledge Base & Agentic Workflows*).
  - Prominent capsule callouts linking out to the external **Digital Garden** at `https://github.com/DeepJH/text-note`.

- **Static Pre-rendered Bilingual Routing**:
  - English default at `/`, `/projects`, `/posts`.
  - Chinese static routes at `/zh`, `/zh/projects`, `/zh/posts`, `/zh/projects/[slug]`, `/zh/posts/[slug]`.
  - Header pill switcher toggling seamlessly between `EN` and `中文` with zero runtime JS.

---

## User Stories

### Identity & Navigation
1. As a visitor, I see the browser tab and page title canonically displaying `Hello, Im DeepJH.`.
2. As a visitor, I see DeepJH's actual profile avatar in both the header brand pill and the homepage hero, replacing all previous abstract blue dots.
3. As a visitor, I can click the header language switcher pill (`EN / 中文`) to navigate between English and Chinese pre-rendered pages instantly.
4. As a collaborator, I can find DeepJH's direct email (`deepjhshenjing@gmail.com`), GitHub link, and RSS feed in the header and footer, with no dead or unwanted links (e.g. LinkedIn removed).

### Visual Craft & Tactile Experience
5. As an aesthetically minded visitor, I observe crystalline, pill-shaped (`rounded-full`) liquid glass elements with ~9px blur, high substrate transmittance, and high color vibrancy.
6. As an interactive visitor, when hovering over interactive buttons, I experience a subtle optical lens magnification and displacement refraction effect that renders smoothly without client-side JS runtime overhead.

### Project Showcase & Case Studies
7. As an engineering recruiter or tech lead, I see exactly 4 representative projects arranged in a balanced 2×2 grid on the homepage.
8. As a visitor clicking any of the 4 project cards, I can read a detailed case study page detailing technical architecture, challenges, and repository links.

### Publications & Digital Garden
9. As a technical reader, I can read the flagship publication exploring DeepJH's digital garden philosophy, agent workflows, and `text-note` repository.
10. As a visitor, I can click direct syndication links navigating directly to `https://github.com/DeepJH/text-note`.

---

## Architecture Design & Testing Seams

### Seams
- **Compile-time**: `pnpm astro check` & `tsc --noEmit` validating content schemas, routes, and component props.
- **Runtime E2E**: `pnpm test` (Playwright) against `pnpm build && pnpm preview` verifying:
  - Homepage title is `Hello, Im DeepJH.`.
  - Avatar image renders with valid `src="/avatar.png"`.
  - 4 projects are rendered in a 2x2 grid.
  - Language switcher toggles between `/` and `/zh` correctly.
  - No LinkedIn link is present; Email and GitHub links are correct.
  - Zero-runtime JS constraint respected (no extraneous client scripts).

---

## Acceptance Criteria
- [ ] DeepJH's avatar downloaded from GitHub to `public/avatar.png` and rendered in Header and Hero.
- [ ] Title canonicalized to `Hello, Im DeepJH.` across layouts.
- [ ] Contact details updated (domain `https://hereisdeepjh.dpdns.org`, email `deepjhshenjing@gmail.com`, LinkedIn removed).
- [ ] Liquid Glass updated with pill morphology (`rounded-full`), 75% blur (~9px), crystalline transmittance, and 120% substrate saturation.
- [ ] Authentic `rdev/liquid-glass-react` SVG filter pipeline implemented (displacement map, edge mask, 3-channel RGB chromatic aberration, DOM layer separation `.glass__warp`).
- [ ] Foreground text and interactive controls remain sharp without distorted text glyphs.
- [ ] 4 real projects implemented in Content Collections (`aitopschool-downloader`, `good-bye-othello`, `brief-clock`, `state-tuning-rwkv`) and displayed in 2×2 grid.
- [ ] Flagship publication implemented linking to `DeepJH/text-note`.
- [ ] Static bilingual routing (`/` and `/zh`) functional with header language toggle pill.
- [ ] `pnpm astro check` & `tsc --noEmit` pass with zero errors.
- [ ] Playwright E2E test suite updated and passing 100% against static preview.
