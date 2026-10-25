# 0004 Dedicated Case Study Routes for Featured Projects

## Context and Decision
Most developer portfolios merely display card grids linking out to external GitHub repositories or live demos, which fails to showcase the depth of system architecture, engineering trade-offs, and quantified results. We decided to implement **dedicated case study routes (`/projects/[slug]`)** backed by Astro Content Collections. Each featured project can have its own rich MDX breakdown with architecture diagrams, benchmarks, and post-mortems alongside external source and demo links.

## Status
Accepted

## Considered Options
- **Card-Only External Redirects**: Quickest to implement, but flattens high-value engineering accomplishments into superficial links.
- **Modal Popups**: Breaks shareable deep URLs, hurts search engine indexing (SEO), and cramps complex diagrams or long-form analysis.
- **Dedicated Static Case Study Pages (`/projects/[slug]`)**: Provides permanent, indexable, beautifully rendered architectural narratives that prove deep technical craft.
