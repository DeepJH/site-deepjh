# 0002 Cloudflare Pages for Edge Deployment

## Context and Decision
We require zero-cost hosting with unlimited egress bandwidth, low worldwide latency (including Mainland China), and automated Git push-to-deploy for static outputs. We chose **Cloudflare Pages** over Vercel and traditional VPS. Astro generates a pure static directory (`dist/`) that Cloudflare distributes directly to its 300+ edge locations with zero server maintenance and automatic SSL.

## Status
Accepted

## Considered Options
- **Vercel**: Premier DX and preview branches, but enforces 100GB/mo free bandwidth caps and suffers from occasional DNS/routing latency in Asian regions.
- **Self-hosted VPS**: Complete server control, but incurs ongoing server rental costs, maintenance overhead, and security patching burdens.
- **Cloudflare Pages**: Generous free tier with no bandwidth limits, global CDN caching, custom domain DNS integration, and native GitHub integration.
