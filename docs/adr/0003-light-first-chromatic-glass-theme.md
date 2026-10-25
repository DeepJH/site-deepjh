# 0003 Light-First Chromatic Liquid Glass Theme Architecture

## Context and Decision
Most developer personal sites default to pure dark monochromes. We decided on a **Light-First, Switchable Dual-Theme** architecture. To showcase the depth and optical refraction of Liquid Glass, we introduce subtle, ambient **Chromatic Substrates** (soft pastel mesh glows) underneath transparent glass layers (`bg-white/60`, `backdrop-blur-md`, `border-white/80`). An inline zero-dependency theme script in the HTML `<head>` ensures zero Flash of Unstyled Content (FOUC) across light and dark transitions.

## Status
Accepted

## Considered Options
- **Dark-Only Monolith**: Easiest for contrast and border highlights, but forfeits the airy, luminous, and distinctive visual presence of Apple-style light-mode liquid glass.
- **Pure White / Flat Minimalist**: Crisp for reading, but completely negates glassmorphic optical refraction without underlying chromatic color fields.
- **Light-First with Chromatic Mesh**: Combines high-contrast editorial clarity for text with stunning, prismatic liquid glass refractions on interactive and floating surfaces.
