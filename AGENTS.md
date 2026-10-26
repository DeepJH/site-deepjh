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

对于所有功能开发、需求变更或重大重构任务，Agent 必须严格遵循以下六步闭环流程：

1. **意图挖掘与对齐 (`grill-with-docs`)**:
   - 遇到新需求或构想时，首先使用 `grill-with-docs` 明确用户意图，通过结构化提问消除歧义，深挖需求边界、架构取舍与验收标准。
   - **执行门禁**：在用户明确确认无误之前，严禁擅自提前进入编码或修改代码。
2. **规格沉淀 (`to-spec`)**:
   - 用户确认后，将方案固化为 `docs/specs/` 目录下的系统功能规格说明，包含 User Stories、架构设计与验收清单。
3. **任务拆分与建单 (`to-tickets`)**:
   - 依据规格文档拆解为独立可验证的垂直切片任务，记录至 `.scratch/` 并在 GitHub Issues 中创建并跟踪对应工单。
4. **测试驱动实现 (`implement`)**:
   - 严格在最高接缝（编译期 `pnpm check` 与运行时静态预览 Playwright E2E）编写测试，以最小代价迭代实现功能。
5. **双轴审查与问题修复 (`code-review` & 修复)**:
   - 触发标准轴（Standards）与规格轴（Spec）并行子代理审查。
   - 对审查发现的规范违规、代码坏味道与需求偏差进行针对性修复，确保所有接缝测试持续绿灯。
6. **状态流转与交付 (Orca in-review & Issue 同步)**:
   - 同步并更新 GitHub Issues 状态（关闭已完结工单）。
   - 在 Orca 中将当前 worktree 状态正式流转为 `in-review`：
     ```bash
     orca worktree set --worktree active --workspace-status in-review
     ```
   - 规范提交工作分支并交付审查凭据。
