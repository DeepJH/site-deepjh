# 0001 Astro Content Collections for Static-First Architecture

## Context and Decision
We require a personal site for engineering showcases and technical long-form writing with zero server maintenance, maximal performance, and excellent typography. We chose **Astro** with its native **Content Collections** and **Tailwind CSS**, rejecting full-stack React runtimes (Next.js) and headless CMS platforms. Astro compiles Markdown/MDX into zero-client-JS static HTML by default while enforcing strict type-safe schemas across all content frontmatter at build time.

## Status
Accepted

## Considered Options
- **Next.js (App Router)**: Powerful full-stack React framework, but introduces unnecessary hydration cost, heavier bundle size, and runtime complexity for a purely static content site.
- **Headless CMS (Notion / Strapi)**: Decoupled CMS interfaces, but adds external network failure points, API rate limits, and breaks git-based offline writing.
- **Astro + Content Collections**: Zero JS baseline, instant page load, first-class Markdown/MDX handling, type-safe schemas via Zod, and effortless deployment to static edge CDN.
