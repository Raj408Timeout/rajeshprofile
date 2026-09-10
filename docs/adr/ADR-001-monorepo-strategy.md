# ADR-001: Use Turborepo Monorepo Strategy

**Status:** Accepted  
**Date:** 2026-08-07  
**Deciders:** Rajeshkumar Kalaimani

---

## Context

This project consists of multiple interconnected workspaces:
- 2 frontend applications (Angular portal, React dashboard)
- 2 backend services (Profile Service, AI Orchestration Service)
- 1 shared types package (TypeScript interfaces used across all workspaces)

Without a monorepo strategy, these would live in separate repositories with the following consequences:
- The shared-types package would need to be published to npm (or a private registry) and versioned independently
- Every type change would require a publish → update → reinstall cycle across 4 consuming workspaces
- CI/CD would be 5 separate pipelines with no understanding of cross-workspace dependencies
- Developers (in this case, a solo developer) would need to keep 5 terminal windows open and manage 5 separate `node_modules` directories

The question is not *whether* to use a monorepo — that decision is clear given the shared-types dependency — but *which monorepo tool* to use.

---

## Decision

Use **Turborepo** as the monorepo task orchestration layer on top of npm workspaces.

The repository root defines npm workspaces pointing to `apps/*`, `backend/*`, and `packages/*`. Turborepo's `turbo.json` defines the task pipeline (build, dev, test, lint) with dependency ordering and caching rules.

---

## Consequences

### Positive

**Incremental builds with caching:** Turborepo caches the output of each task (build artifacts, test results) based on input file hashes. If the `shared-types` package hasn't changed, its build output is restored from cache rather than rebuilt. This dramatically reduces CI time as the project grows.

**Task pipeline with dependency awareness:** `turbo run build` automatically builds `shared-types` before building `portal-angular` or `profile-service`, because the pipeline defines `"dependsOn": ["^build"]`. No manual ordering scripts required.

**Single node_modules hoisting:** npm workspaces deduplicate dependencies at the root level, reducing disk usage and installation time.

**Developer experience:** `npm run dev` starts all services in parallel with a single command, with task output clearly labeled by workspace name.

**Parallel execution:** Turborepo runs independent tasks in parallel (e.g., running `portal-angular` tests and `ai-dashboard-react` tests simultaneously).

### Negative

**Turborepo learning curve:** Turborepo adds a new tool with its own configuration schema, caching model, and debugging procedures. Cache invalidation bugs can be subtle to diagnose.

**Large repository size:** All workspace `node_modules` (even with hoisting) in a monorepo can add up. For a project of this size (~5 workspaces), this is manageable but may slow down initial `npm install`.

**Single point of CI failure:** A break in one workspace (e.g., a TypeScript error in `shared-types`) blocks the CI pipeline for all workspaces. This is actually a feature (it enforces shared-types compatibility) but can feel frustrating.

**Onboarding complexity:** A new contributor needs to understand the monorepo structure before making changes. For a solo project, this is not a concern.

---

## Alternatives Considered

### Nx

Nx is a more feature-rich monorepo tool with first-class support for Angular, React, Node.js, and more. It includes code generators, affected-command detection (only run tasks for changed code), and an integrated project visualization graph.

**Why not chosen:** Nx has significantly more configuration overhead. For a solo developer learning both the tools and the domain simultaneously, Turborepo's simpler mental model was more appropriate. Nx would be the right choice if this project grew to a team of 5+ developers. Turborepo can be replaced by Nx later without changing the workspace structure.

### Separate Repositories

Each workspace lives in its own GitHub repository. TypeScript interfaces are either duplicated or published to a private npm registry (GitHub Packages or Verdaccio).

**Why not chosen:** The shared-types dependency makes separate repos impractical. Any interface change would require a publish-update-PR cycle across 4 repositories. The DX cost is too high for the benefit gained. Separate repos only make sense when team boundaries or security isolation require it — neither applies here.

### Lerna

Lerna was the original monorepo tool for JavaScript projects, primarily designed for publishing npm packages with independent versioning.

**Why not chosen:** Lerna's core value proposition is package publishing coordination. This project does not publish any packages to npm. Using Lerna here would be using the wrong tool for the job. Turborepo is purpose-built for development workflow optimization (builds, tests, dev servers), which is what this project needs.

### Yarn Workspaces / pnpm Workspaces (without Turborepo)

Use the package manager's built-in workspace feature without any task orchestration layer.

**Why not chosen:** Yarn/pnpm workspaces handle dependency resolution and hoisting but provide no caching for task outputs. Every build would be a full rebuild. Every CI run would rebuild unchanged workspaces. Turborepo's caching layer is the primary value it adds on top of workspaces.
