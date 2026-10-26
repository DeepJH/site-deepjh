# Issue 02 (GitHub #25): Reduce Blur to 1.5px and Increase Transmittance to 98% with 2% Tint

## Status
- [x] Done

## Scope
- Update `src/styles/global.css`:
  - Set `.glass__warp, .glass-warp` backdrop blur to `1.5px` (`backdrop-filter: blur(1.5px) saturate(140%)`).
- Update `src/components/LiquidGlass.astro`:
  - Set capsule and card background tint to `bg-white/[0.02] dark:bg-zinc-900/[0.05]` (~98% transmittance).
  - Update card optical layer blur to `backdrop-blur-[1.5px] saturate-[140%]`.
  - Refine delicate specular rim border: `border border-white/40 dark:border-white/10`.
  - Refine bevel inset highlight: `shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),inset_0_-1px_1px_0_rgba(0,0,0,0.02),0_4px_20px_0_rgba(0,0,0,0.03)]`.

## Acceptance
- [x] Background text, links, and cards visible beneath the header pill with razor-sharp 98% clarity.
- [x] Milky frosted acrylic appearance completely removed.
- [x] Both light and dark modes deliver crystalline aesthetic.
