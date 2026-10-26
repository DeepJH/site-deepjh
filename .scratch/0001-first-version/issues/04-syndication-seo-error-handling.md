# 04: Syndication, SEO & Resilient Error Handling

**What to build:** Technical readers can subscribe to newly published Posts via an RSS feed reader using a valid `/rss.xml` endpoint. Search engines and social link previews receive rich OpenGraph, Twitter card, and canonical meta tags across all pages. Any navigation to non-existent URLs lands on a bespoke `/404` error page styled with the Liquid Glass visual theme, featuring friendly guidance and a direct link back to the homepage.

**GitHub Issue:** #6 (https://github.com/DeepJH/site-deepjh/issues/6)

**Blocked by:** 02: Curated Showcase & Project Case Studies (#4), 03: Technical Publications & Build-Time Syntax Highlighting (#5)

**Status:** completed

- [x] Auto-generated `/rss.xml` endpoint serving all published non-draft Posts with titles, descriptions, publication dates, and permalinks
- [x] OpenGraph and social preview metadata integrated into the global head layout across all routes (Home, Projects, Posts, Case Studies)
- [x] Custom `/404` page implemented with Liquid Glass surface aesthetic and navigation back to Home
- [x] Missing routes gracefully return HTTP 404 with custom error page markup
- [x] Playwright E2E test validates `/rss.xml` response format, 404 page rendering, and social meta tags presence
