# ADR-002: Angular for Public Portal, React for AI Dashboard

**Status:** Accepted  
**Date:** 2026-08-07  
**Deciders:** Rajeshkumar Kalaimani

---

## Context

This project requires two distinct frontend applications:

1. **Public-facing profile portal** — A marketing-style website presenting Rajesh's professional profile to recruiters, hiring managers, and other visitors. Requirements: polished design, fast initial load, SEO-friendliness, accessibility, long-term maintainability, low churn in design/UX.

2. **Private AI tools dashboard** — A data-dense tool for running JD analyses, generating resumes, viewing token usage charts, and interacting with the RAG assistant. Requirements: rapid feature iteration, complex state management (async AI results, loading states, error recovery), rich data visualization components, used only by Rajesh.

These two applications have different priorities, different users, different update cadences, and different complexity profiles. The question is whether to build them with the same framework or use different tools optimized for each use case.

---

## Decision

Use **Angular 17** for the public-facing profile portal (`apps/portal-angular`) and **React 18 with Vite** for the private AI tools dashboard (`apps/ai-dashboard-react`).

Both applications share TypeScript types via the `packages/shared-types` workspace.

---

## Consequences

### Positive

**Angular for the portal:**
- Angular's opinionated structure (components, services, modules, routing) reduces decision fatigue on a project where the UI is a means to an end, not the focus of learning
- Angular Material provides production-quality, accessible UI components out of the box, avoiding the need to build or evaluate a component library
- Angular's built-in SSR (Angular Universal) is available for SEO optimization without adding a separate framework
- TypeScript is a first-class citizen in Angular — no configuration needed for strict typing
- The portal's feature set is stable (it does not change after Phase 1); Angular's stability and long-term support align with a long-lived public page

**React for the dashboard:**
- React's ecosystem for data-heavy UI is unmatched: TanStack Query for server state, Recharts for charts, @react-pdf/renderer for PDF generation, react-hot-toast for notifications
- Vite's development server has sub-100ms HMR for rapid prototyping during AI feature development
- React's composable, hook-based architecture is well-suited to the async complexity of AI features (loading → success/error states with retry)
- Building in both Angular and React demonstrates framework-agnostic engineering capability, which is valuable for a Forward Deployed Engineer role

**Learning value:**
- Maintaining both frameworks simultaneously reinforces understanding of their differences and trade-offs — a real skill for an AI PM / FDE role where you may need to evaluate and recommend frameworks to clients

### Negative

**Two codebases to maintain:** A bug in the shared API client pattern must be fixed in two places. Conventions (file naming, component patterns) differ between the two applications.

**Larger cognitive overhead:** Switching between Angular and React within the same work session requires a mental context switch.

**Inconsistent UI between public and private:** The portal and dashboard may end up with visually inconsistent UIs if they evolve independently. Since these apps serve different audiences, this is acceptable but worth noting.

**Increased setup complexity:** Two build configurations, two sets of framework-specific tooling, two testing setups (Angular TestBed vs. React Testing Library).

---

## Alternatives Considered

### Angular for Both

Use Angular for both the public portal and the dashboard.

**Rejected because:** Angular's value in the dashboard context is lower — the dashboard requires rapid iteration and has a different component ecosystem fit (Recharts is a React library; equivalents exist in Angular but are less mature). Building both in Angular would mean missing the opportunity to demonstrate React proficiency, which is often required alongside Angular for FDE roles.

### React for Both

Use React (with Next.js for SSR) for both the public portal and the dashboard.

**Rejected because:** The main argument for "React for both" is framework consistency. But the primary reason to learn Angular in this project is that many enterprise clients and job descriptions mention Angular specifically. Using only React would leave a gap in demonstrated skills. Additionally, Next.js for the public portal adds complexity (server/client component split) that is not necessary for this use case.

### Vue 3 + Nuxt

Use Vue 3 and Nuxt for the public portal, React for the dashboard.

**Rejected because:** Vue 3 is less common in enterprise environments that Rajesh is targeting. Angular's relevance to his target market (enterprise software, healthcare, finance) is higher than Vue's.

### Single Page Application with Module Federation

Use Webpack Module Federation or similar to compose Angular and React within a single shell application.

**Rejected because:** Module Federation adds substantial complexity and is itself a significant learning topic. It is appropriate for large teams working on microfrontend architectures but is over-engineered for a two-app, single-developer project. The complexity cost does not justify the benefit at this scale.
