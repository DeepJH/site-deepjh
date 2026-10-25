# site-deepjh

> **DeepJH** 个人工程作品集与技术博客。基于 Astro + Tailwind CSS 构建，轻量、极速，采用浅色优先的彩色液态玻璃（Chromatic Liquid Glass）与现代工程美学设计。

---

## 📖 项目文档导航 (Documentation)

本项目严格遵循领域驱动设计与系统架构决策记录规范，核心文档详见：

- 📖 **[领域词汇表 (GLOSSARY.md)](./GLOSSARY.md)**: 定义了 Project、Post、Showcase、Case Study、Liquid Glass 等核心领域实体的边界与统一语言。
- 🏛️ **架构决策记录 (ADR)**:
  - [0001: 采用 Astro Content Collections 作为静态优先架构](./docs/adr/0001-astro-content-collections.md)
  - [0002: 采用 Cloudflare Pages 托管与边缘分发](./docs/adr/0002-cloudflare-pages-deployment.md)
  - [0003: 浅色优先的多光谱液态玻璃与双模主题架构](./docs/adr/0003-light-first-chromatic-glass-theme.md)
  - [0004: 精选项目独立深度案例剖析路由设计](./docs/adr/0004-project-case-study-routes.md)

---

## 🛠️ 技术底盘 (Tech Stack)

- **框架**: [Astro](https://astro.build/) (静态生成，零默认客户端 JS，原生 MDX 支持)
- **样式**: [Tailwind CSS](https://tailwindcss.com/) + 自定义液态玻璃与棱镜光晕系统
- **排印**: Geist Sans / Inter + Geist Mono / JetBrains Mono
- **语法着色**: Shiki (VS Code 同款静态构建期语法高亮)
- **类型安全**: TypeScript + Zod Content Schemas
- **托管分发**: Cloudflare Pages (全球 300+ 边缘 CDN 节点)

---

## 🧭 当前阶段

- [x] 需求挖掘与方案推演 (Grilling rounds completed)
- [x] 领域模型确立 (`GLOSSARY.md`)
- [x] 核心架构决策记录 (`docs/adr/0001` ~ `0004`)
- [ ] 代码工程脚手架初始化 (待确认后启动)
