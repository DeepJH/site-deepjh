# AGENTS.md

Welcome to **site-deepjh**, DeepJH's personal engineering showcase and technical publication platform.

## 🧭 Ground Truth & Core References

When working in this repository, always align with the following documented sources of truth:

1. **Domain Language**: Strictly follow definitions in [`GLOSSARY.md`](./GLOSSARY.md). Never mix domain concepts with avoided synonyms (e.g., use **Project** / **Case Study**, not "repo" or "demo").
2. **Architecture Decisions**: Respect accepted records in [`docs/adr/`](./docs/adr/):
   - [ADR 0001: Astro Content Collections](./docs/adr/0001-astro-content-collections.md)
   - [ADR 0002: Cloudflare Pages Deployment](./docs/adr/0002-cloudflare-pages-deployment.md)
   - [ADR 0003: Light-First Chromatic Liquid Glass](./docs/adr/0003-light-first-chromatic-glass-theme.md)
   - [ADR 0004: Dedicated Case Study Routes](./docs/adr/0004-project-case-study-routes.md)
   - [ADR 0005: Liquid Glass Pill Morphology and Lens Distortion](./docs/adr/0005-liquid-glass-pill-morphology-and-lens-distortion.md)
   - [ADR 0006: Static Bilingual Routing and Digital Garden Syndication](./docs/adr/0006-bilingual-routing-and-digital-garden-syndication.md)
   - [ADR 0007: Official rdev Liquid Glass Rebuild and Vibrant Chromatic Substrate](./docs/adr/0007-official-rdev-liquid-glass-and-vibrant-substrate.md)
   - [ADR 0008: Liquid Glass Morphology Hierarchy and Substrate Softening](./docs/adr/0008-liquid-glass-morphology-hierarchy-and-substrate-softening.md)
3. **Feature Specifications**: Read active specs under [`docs/specs/`](./docs/specs/). All scope, user stories, and acceptance criteria live here.

## 🧪 Testing Seam Principle

Do NOT write unit tests asserting internal component markup or class names.
All automated verification must operate on the **single highest seam**:

- **Compile-time**: `pnpm astro check` & `tsc --noEmit` to validate Content Collection schemas.
- **Runtime E2E**: `pnpm test` (Playwright) against the pre-built static preview (`pnpm build && pnpm preview`), validating external user observable behaviors: HTTP 200 responses, navigation, theme toggle persistence, and accessibility.

## 🛠️ Engineering Rules

- **Zero-Runtime JS Baseline**: Static HTML pre-rendered by Astro. Client-side JS is reserved exclusively for the Theme Switcher.
- **Docs-as-Code**: Specifications, architecture decisions, and task checklists live directly in the Git repository alongside the code.

## 🔄 Agent Standard Workflow (工作流规范)

对于所有功能开发、需求变更或重大重构任务，Agent 必须严格遵循以下六步闭环流程。

> [!IMPORTANT] **交互边界与自动化执行铁律**
>
> - **人机交互唯一节点**：只有**第 1 步 (`grill-with-docs`)** 保持与用户的交互式问答与方案对齐。
> - **全程自动推进**：一旦用户明确确认无误，**第 2 步至第 6 步（规格沉淀 → 双轨建单 → 测试驱动实现 → 双轴审查与修复 → 交付与状态流转）必须完全自主、全自动流水线式闭环执行**，中途严禁无故中断等待用户输入。
> - **全局工作流（重要）**：每次改动必须调用`grill-with-docs`和用户讨论以明确意图，并完成相关文档。当用户说`根据自定义工作流自动实现`时， **必须**询问是否根据 `to-spec，to-tickets，implement，code-review，修复和 in review` 这个自动实现工作流做下去。明确确认后才开始做下去。

1. **意图挖掘与对齐 (`grill-with-docs` - 唯一交互节点)**:
   - 遇到新需求或构想时，首先使用 `grill-with-docs` 明确用户意图，通过结构化提问消除歧义，深挖需求边界、架构取舍与验收标准。
   - **执行门禁**：在用户明确确认无误之前，严禁擅自提前进入编码或修改代码。一旦用户确认，立即全自动进入后续流程。
   - 做完后保存`GLOSSARY.md`和`docs/adr/000x-adr-doc-name.md`
2. **规格沉淀 (`to-spec` - 自动执行)**:
   - 自动将确认方案固化为 `docs/specs/000x-spec-doc-name.md` 目录下的系统功能规格说明，包含 User Stories、架构设计与验收清单。
3. **任务拆分与建单 (`to-tickets` - 自动双轨制)**:
   - 自动依据规格文档拆解为独立可验证的垂直切片任务，建立本地与远程双轨跟踪机制：
     - **本地轨**：在 `.scratch/` 目录下创建对应的任务切片文档与核对清单，版本化归档。
     - **远程轨**：通过 GitHub Issues 同步创建对应工单，打上规范状态标签（如 `ready-for-agent`）。
   - 两轨必须保持编号与标题的一致性，确保任务全生命周期可离线追溯与在线协作。
4. **测试驱动实现与状态同步 (`implement` - 自动推进与双轨同步)**:
   - 自动遵循 TDD 闭环，严格在最高接缝（编译期 `pnpm check` 与运行时静态预览 Playwright E2E）编写测试，以最小代价迭代实现功能。
   - **双轨同步维护**：每完成一个垂直切片任务，必须立即自动同步更新两轨状态：
     - 勾选本地 `.scratch/` 文档中的验收复选框并更新状态字段；
     - 同步更新 GitHub 对应 Issue 的进展状态与标签（切忌仅更新本地而遗漏 GitHub 状态）。
5. **双轴审查与问题修复 (`code-review` & 自动修复)**:
   - 自动触发标准轴（Standards）与规格轴（Spec）并行子代理审查。
   - 自动对审查发现的规范违规、代码坏味道与需求偏差进行就地修复，确保所有接缝测试持续绿灯。
6. **状态流转与交付 (Orca in-review & Issue 同步 - 自动完结)**:
   - 自动同步并更新 GitHub Issues 状态（关闭已完结工单）。
   - 自动在 Orca 中将当前 worktree 状态正式流转为 `in-review`：
     ```bash
     orca worktree set --worktree active --workspace-status in-review
     ```
   - 自动规范提交工作分支，并向用户交付完整的审查凭据与成果汇报。
