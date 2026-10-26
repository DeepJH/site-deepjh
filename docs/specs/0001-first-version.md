# 0001: site-deepjh v1 (Initial Release)

## Problem Statement

As an experienced software engineer and builder, DeepJH needs an online presence that authentically communicates technical craftsmanship, architectural depth, and design sensibility. Traditional developer portfolios suffer from three major shortcomings:

1. **Superficial "Repo Dump" Mentality**: Conventional developer sites display generic card grids linking out to raw GitHub repositories without explaining architectural trade-offs, technical bottlenecks, system design choices, or quantified business/engineering impact.
2. **Generic AI-Slop / Cookie-Cutter Aesthetics**: Most technical portfolios rely on off-the-shelf templates, heavy full-stack runtimes, or uninspired dark-mode themes lacking polish, distinct visual personality, and high-tier typography.
3. **Bloated Runtime Complexity**: Using heavy full-stack web frameworks (e.g. dynamic Next.js runtimes or headless CMS backends) introduces hydration delays, client-side bundle bloat, infrastructure maintenance overhead, and external network failure modes for what is fundamentally static content.

Visitors (engineering leaders, recruiters, peers, and tech readers) lack a fast, immersive, and rigorous platform to evaluate DeepJH's deep engineering achievements and read long-form technical publications.

---

## Solution

Build **site-deepjh v1**, a lightweight, static-first engineering portfolio and technical publication site powered by **Astro**, **Tailwind CSS**, and **Cloudflare Pages**. 

The site features:
- **Showcase Curation**: An opinionated homepage featuring 3 to 6 high-impact **Projects**, avoiding superficial repository listings.
- **Dedicated Case Study Routes (`/projects/[slug]`)**: Deep-dive technical narratives complete with architecture breakdowns, benchmark results, engineering trade-offs, and external demo/code links.
- **Deep Technical Publications (`/posts` & `/posts/[slug]`)**: Code-level technical essays and system tutorials with compile-time syntax highlighting, zero client-side JavaScript overhead, and rigorous typographic rhythm.
- **Light-First Chromatic Liquid Glass Aesthetic**: A bespoke visual language pairing subtle, ambient **Chromatic Substrates** (pastel mesh glows) with translucent **Liquid Glass** surfaces, accompanied by an instant, zero-FOUC **Theme Switcher** for dark mode.
- **Zero-Maintenance Edge Delivery**: Pre-compiled static output deployed globally across Cloudflare's edge network for sub-100ms load times worldwide.

---

## User Stories

### Visiting & Discovery
1. As a visiting tech lead, I want to land on an instantly responsive, beautifully typeset homepage, so that I can immediately grasp DeepJH's engineering domain and aesthetic standards without layout shifting or hydration lag.
2. As an engineering hiring manager, I want to see a curated **Showcase** of 3 to 6 flagship **Projects** on the homepage, so that I can evaluate high-caliber representative work without wading through dozens of toy repositories.
3. As a technical reader, I want to see a brief bio and key engineering principles on the homepage, so that I understand DeepJH's background, technical values, and areas of expertise.
4. As a recruiter, I want clear, visible links to GitHub, LinkedIn, email, and RSS feeds in the header and footer, so that I can easily initiate contact or explore source code.

### Exploring Project Case Studies
5. As a visitor browsing the **Showcase**, I want to click any featured **Project** card and navigate to a dedicated **Case Study** page (`/projects/[slug]`), so that I can inspect the end-to-end technical narrative.
6. As a systems architect, I want the **Case Study** to display structured metadata (tech stack, role, development timeline, live demo link, and repository link), so that I get an immediate high-level project summary.
7. As a senior developer, I want the **Case Study** to provide deep architectural diagrams, technical challenges, and decision rationales, so that I can assess the depth of problem-solving.
8. As a performance engineer, I want the **Case Study** to highlight quantifiable results (e.g. latency reductions, throughput improvements, memory footprints), so that claims are backed by empirical evidence.
9. As a mobile visitor, I want **Case Study** diagrams, code samples, and benchmark tables to scroll cleanly and stay readable on narrow viewports, so that the reading experience remains uncompromised on smartphones.

### Reading Technical Posts
10. As a tech reader, I want to navigate to a dedicated `/posts` index page, so that I can browse all published in-depth **Posts**.
11. As a visitor on the `/posts` page, I want each article listing to show its title, concise description, publication date, tags, and estimated reading time, so that I can choose articles relevant to my interests.
12. As a software engineer reading a **Post** (`/posts/[slug]`), I want clear typography, comfortable line lengths, and responsive heading hierarchy, so that long-form reading is effortless and fatigue-free.
13. As a developer inspecting code in a **Post**, I want syntax highlighting with accurate language tokenization and clear contrast via build-time syntax highlighting, so that code blocks are legible without needing client-side syntax scripts.
14. As an RSS enthusiast, I want a valid `/rss.xml` feed containing all published **Posts**, so that I can subscribe in my preferred RSS feed reader and receive updates automatically.

### Theme & Visual Interaction
15. As a visitor in a well-lit environment, I want the site to default to a luminous, light-mode palette where **Liquid Glass** surfaces refract the underlying **Chromatic Substrate**, so that the interface feels fresh, modern, and optically rich.
16. As a nighttime visitor, I want to toggle the **Theme Switcher** to dark mode, so that high-contrast white backgrounds shift to deep, eye-friendly tones with preserved glass highlights.
17. As a returning visitor, I want my theme preference to be remembered across page reloads and browser sessions via local storage, so that I do not have to toggle it repeatedly.
18. As a first-time visitor with a system-level dark mode preference, I want the site to respect my system dark mode setting automatically on first visit, so that my system defaults are honored.
19. As a visitor navigating between pages, I want zero Flash of Unstyled Content (FOUC) during theme initialization, so that transitions between pages remain fluid and seamless.
20. As a user who reduces animations, I want motion and transitions on glass highlights and page switches to be minimized or disabled, so that accessibility and comfort are respected.

### Authoring & DX
21. As the author, I want to author new **Projects** and **Posts** using standard Markdown and MDX documents in the repository, so that writing remains version-controlled, git-trackable, and executable offline.
22. As the author, I want build-time validation of frontmatter schemas, so that missing titles, dates, or malformed tags fail the build immediately before deployment.
23. As the author, I want to mark draft projects or articles with a draft flag, so that unfinished work is omitted from production builds while remaining visible during local development.

---

## Implementation Decisions

### Modules and Architectural Contracts
- **Static Site Engine**: Astro configured for complete build-time static HTML generation (`output: 'static'`).
- **Content Subsystem**: Astro Content Collections with strict Zod validation defining two data models:
  - `projects`: Schema validating `title`, `description`, `coverImage`, `tags`, `repoUrl`, `demoUrl`, `metrics`, `featured` boolean, and `publishDate`.
  - `posts`: Schema validating `title`, `description`, `publishDate`, `updatedDate`, `tags`, `draft` boolean, and estimated reading time.
- **Component Subsystem (Bespoke Components)**:
  - Layout & Shell: Root HTML document shell, head metadata, OpenGraph/SEO tags, inline zero-FOUC theme script, header with navigation and theme toggle, global footer.
  - Surface & Material: Reusable Liquid Glass container applying backdrop blur, subtle borders, and glow reflections; Chromatic Substrate ambient radial mesh gradients.
  - Domain Presentation: Project card, Showcase grid, Post card, and Theme Switcher.
- **Routing Contracts**:
  - `/` (Home): Profile bio, curated **Showcase**, recent **Posts**, skills/principles overview.
  - `/projects`: Complete index of engineering projects.
  - `/projects/[slug]`: Dedicated **Case Study** pages.
  - `/posts`: Technical writing archive with tag filters.
  - `/posts/[slug]`: In-depth technical articles.
  - `/rss.xml`: Auto-generated RSS feed.
  - `/404`: Custom 404 error page adhering to the design system.
- **Design System & Theming**:
  - Chromatic Liquid Glass: Translucent surfaces with backdrop blur, light/dark tokenized background opacity, and crisp hairline borders.
  - Substrate Glows: Subtle radial gradient meshes positioned behind key content areas to anchor glass refractions.
  - Theme State Machine: Zero-dependency inline script in `<head>` checking stored preference or system color scheme, applying theme class before first paint to prevent FOUC.
- **Typography & Syntax Highlighting**:
  - Prose typography: High-contrast hierarchy with comfortable line lengths and generous leading.
  - Syntax highlighting: Build-time Shiki with dual themes matching light and dark modes without client-side JavaScript.

---

## Testing Decisions

### What Makes a Good Test
Tests must exclusively assert external, observable user behavior and contracts, not internal component implementation details or CSS utility class strings. A passing test suite proves:
1. Every static page builds successfully and returns HTTP 200 with valid, semantic HTML and correct meta tags.
2. The user can navigate between Home, Showcase, Case Studies, and Posts smoothly.
3. Content Collections enforce frontmatter integrity, rejecting invalid content.
4. The Theme Switcher toggles themes, updates DOM attributes, and persists across reloads.
5. The site functions completely with client-side JavaScript disabled (excluding interactive theme toggling).

### Testing Seams (Single Highest Seam)
- **Runtime E2E Seam**: Playwright test suite executed directly against the compiled static site (`astro build && astro preview`).
- **Compile-Time Static Seam**: `astro check && tsc --noEmit` validating Content Collection schemas and TypeScript integrity.

### Prior Art
Standard Playwright E2E suites for modern Astro static sites (navigating routes, checking DOM accessibility landmarks, verifying localStorage persistence, validating 404 response pages).

---

## Out of Scope

- **CMS Integration**: No headless CMS or external databases; all content remains strictly git-based Markdown/MDX.
- **Client-Side Comment Engine**: No third-party comment widgets in v1 (keeps pages 100% static, fast, and privacy-respecting).
- **Full-Text Client-Side Search Engine**: Search indexing is deferred to v2 once post volume exceeds 20 articles.
- **Dynamic Server-Side Rendering (SSR)**: No runtime server SSR; entire site is pure static assets distributed via Cloudflare Pages.

---

## Implementation Checklist

- [x] **Phase 1: Project Scaffolding & Tooling**
  - [x] Initialize Astro project with TypeScript and Tailwind CSS
  - [x] Configure Tailwind theme tokens for Liquid Glass and Chromatic Substrates
  - [x] Configure Playwright E2E test harness for static preview verification
- [x] **Phase 2: Content Collections & Schemas**
  - [x] Define `projects` and `posts` Content Collections with Zod schemas
  - [x] Provide initial seed content (1 Project Case Study + 2 Technical Posts)
- [x] **Phase 3: Core Layouts & Theming**
  - [x] Implement BaseLayout with zero-FOUC inline theme script
  - [x] Implement Chromatic Substrate background mesh component
  - [x] Implement Liquid Glass card and container primitives
  - [x] Implement Header with responsive navigation and Theme Switcher
  - [x] Implement Footer with social links and RSS indicator
- [x] **Phase 4: Routing & Domain Pages**
  - [x] Implement `/` (Home) with curated Showcase and recent Posts
  - [x] Implement `/projects` and `/projects/[slug]` (Case Study view)
  - [x] Implement `/posts` and `/posts/[slug]` (Article view with Shiki highlighting)
  - [x] Implement `/rss.xml` and `/404` custom page
- [x] **Phase 5: Seam Verification**
  - [x] Execute `astro check` schema and type verification
  - [x] Execute Playwright E2E test suite covering navigation, theme toggling, and rendering
