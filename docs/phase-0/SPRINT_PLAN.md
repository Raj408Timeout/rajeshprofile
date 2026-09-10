# Sprint Plan
## Rajesh Profile Portal — Phase 0 and Phase 1

**Sprint Length:** 2 weeks (1 week for Sprint 1.2)  
**Velocity:** ~10-15 hours/week (solo developer, working alongside full-time role)  
**Effort Estimate Unit:** Hours

---

## Sprint 0.1 — Discovery and Setup
**Dates:** Week 1-2 (2026-08-07 to 2026-08-20)

### Sprint Goal
Complete all foundational documentation, establish architectural decisions, and initialize the monorepo structure so that any development work in Phase 1 begins with a clear, agreed blueprint and a working local development environment.

### Sprint Backlog

| Item | ID | Estimated Hours | Actual Hours | Status |
|---|---|---|---|---|
| Write PRODUCT_DISCOVERY.md (problem, personas, risks) | P0-001 | 4 | — | Done |
| Write REQUIREMENTS.md (FRs, NFRs, user stories) | P0-002 | 5 | — | Done |
| Write ARCHITECTURE.md (component diagram, tech justification) | P0-003 | 5 | — | Done |
| Write DATA_MODEL.md (ER diagram, table definitions) | P0-004 | 3 | — | Done |
| Write API_DESIGN.md (all endpoints documented) | P0-005 | 4 | — | Done |
| Write AI_STRATEGY.md (model selection, token budgets, prompt strategy) | P0-006 | 4 | — | Done |
| Create 5 ADRs (ADR-001 through ADR-005) | P0-007 | 3 | — | Done |
| Write 4 AI prompt templates (JD, adapter, resume, recommendations) | P0-008 | 4 | — | Done |
| Initialize Turborepo monorepo with root package.json and turbo.json | P0-010 | 2 | — | Done |
| Create shared-types package with all TypeScript interfaces | P0-010b | 3 | — | Done |
| Write docker-compose.yml for local dev services | Infra | 2 | — | Done |
| Set up .gitignore, .env.example, prettier.config.js | Infra | 1 | — | Done |

**Total Estimated Hours:** 40 hours  
**Available Hours:** 20-30 (2 weeks × 10-15 hours/week)

**Note:** This sprint contains more work than a typical velocity permits. It is acceptable to carry over non-critical items (prompt templates) into Sprint 1.1 if the core documents are complete.

### Definition of Done — Sprint 0.1

A task is Done when:
- [ ] The document or file is committed to the `main` branch
- [ ] Markdown files render correctly with proper headings and tables (no formatting errors)
- [ ] TypeScript files compile without errors (`tsc --noEmit` passes)
- [ ] JSON files are valid (no parse errors)
- [ ] A second reading of each document confirms it contains no Lorem ipsum, TODOs marked as actual content, or contradictions with other documents
- [ ] The shared-types package exports are verified to be importable from a consumer package

### Sprint Retrospective Prompts
- Which document took significantly more or less time than estimated?
- Did any architecture decision feel uncertain? Should an additional ADR be written?
- Is the backlog in BACKLOG.md still accurate after writing the architecture documents?
- What learning gaps were identified that should be added to LEARNING_ROADMAP.md?

---

## Sprint 1.1 — Angular Portal Foundation
**Dates:** Week 3-4 (2026-08-21 to 2026-09-03)

### Sprint Goal
Build and run a working Angular 17 application that displays a static version of Rajesh's profile (using hardcoded data in the component, not yet connected to the API). By the end of this sprint, there is a visually polished, responsive, mobile-friendly public portal that renders all profile sections correctly.

### Sprint Backlog

| Item | ID | Estimated Hours | Actual Hours | Status |
|---|---|---|---|---|
| Scaffold Angular 17 app using `ng new` with routing and standalone components | P1-001 | 2 | — | Planned |
| Install Angular Material, configure theme (colors matching personal brand) | P1-001b | 1 | — | Planned |
| Create AppShellComponent: top navigation with responsive hamburger menu, footer | P1-002 | 3 | — | Planned |
| Create HeroComponent: name, title, summary, CTA buttons (Contact, View Projects) | P1-003 | 2 | — | Planned |
| Create SkillsComponent: skills grouped by category, proficiency indicator chips | P1-004 | 3 | — | Planned |
| Create ProjectsComponent: project cards with name, description, tech stack badges | P1-005 | 3 | — | Planned |
| Create ExperienceComponent: vertical timeline with role, company, dates, highlights | P1-006 | 4 | — | Planned |
| Create CertificationsComponent: certification cards with issuer and dates | P1-007 | 2 | — | Planned |
| Create ContactComponent: Angular Reactive Form with name, email, subject, message fields | P1-008 | 3 | — | Planned |
| Configure Angular routes: home (/), projects (/projects), experience (/experience), contact (/contact) | P1-010 | 1 | — | Planned |
| Write profile mock data service returning static JSON matching the shared-types Profile interface | P1-009b | 2 | — | Planned |
| Apply CSS animations: fade-in on scroll for each section, hover effects on cards | P1-011 | 3 | — | Planned |

**Total Estimated Hours:** 29 hours  
**Available Hours:** 20-30 hours

### Definition of Done — Sprint 1.1

A task is Done when:
- [ ] `ng build` completes with no errors or warnings
- [ ] `ng test` runs and all unit tests pass (minimum 1 test per component)
- [ ] `ng serve` runs and the component renders correctly in Chrome, Firefox, and Safari
- [ ] The component is responsive: tested at 390px (mobile), 768px (tablet), 1440px (desktop)
- [ ] TypeScript strict mode is satisfied: no type errors (`tsc --noEmit`)
- [ ] The component is accessible: no critical WCAG errors (checked with aXe browser extension)
- [ ] The component is connected to the profile mock data service (not hardcoded strings inside the component)
- [ ] Code is formatted with Prettier (`npm run format` produces no changes)

### Definition of Done — Sprint 1.1 (Sprint level)

The sprint is Done when:
- [ ] All individual items above are Done
- [ ] Running `ng serve` shows a complete, visually polished profile portal that a recruiter could look at
- [ ] Google Lighthouse score on the served app is > 85 in Performance, Accessibility, and Best Practices
- [ ] All components are exported from a feature module or standalone entry point
- [ ] The component tree is documented with a brief diagram in the Angular portal README

### Sprint Retrospective Prompts
- Did Angular Material's design system create friction, or did it accelerate development?
- Were any of the component designs unclear because the UX was not defined in Phase 0?
- What Angular 17 patterns (signals, defer, @for, @if) were used vs. traditional patterns?
- Is there anything that needs to be refactored before connecting to the real API in Sprint 1.2?

---

## Sprint 1.2 — Static Profile Content + API Connection
**Dates:** Week 5 (2026-09-04 to 2026-09-10)

### Sprint Goal
Replace static mock data in the Angular portal with real API calls to the Profile Service. By the end of this sprint, the portal displays Rajesh's real profile data from PostgreSQL via the Profile Service REST API, with proper loading states, error handling, and graceful degradation.

**Note:** This sprint requires Phase 2 backend work to be at least partially complete (GET /api/v1/profile endpoint working). If Phase 2 backend is not ready, Sprint 1.2 can run against a local JSON mock server (`json-server`) and backend connection happens in Sprint 2.1.

### Sprint Backlog

| Item | ID | Estimated Hours | Actual Hours | Status |
|---|---|---|---|---|
| Create Angular ProfileApiService using HttpClient to call GET /api/v1/profile | P1-009 | 2 | — | Planned |
| Replace mock data in all components with observables from ProfileApiService | P1-009c | 3 | — | Planned |
| Implement loading skeleton components (shown while API data is being fetched) | P1-009d | 2 | — | Planned |
| Implement error state component (shown if API returns error) with retry button | P1-009e | 2 | — | Planned |
| Configure Angular HTTP interceptor for setting Content-Type header and logging | P1-009f | 1 | — | Planned |
| Verify Angular environment files (environment.ts, environment.prod.ts) set API URLs correctly | P1-009g | 1 | — | Planned |
| Scaffold React 18 + Vite project in apps/ai-dashboard-react | P1-012 | 2 | — | Planned |
| Install React Router, TanStack Query, Tailwind CSS in React dashboard | P1-013 | 1 | — | Planned |
| Create React dashboard layout: sidebar with navigation links, main content area | P1-013b | 3 | — | Planned |
| Write unit tests for ProfileApiService with HttpClientTestingModule | P1-015b | 2 | — | Planned |
| Update portal-angular README.md with component overview and API connection details | Docs | 1 | — | Planned |
| Update ai-dashboard-react README.md with setup instructions | Docs | 0.5 | — | Planned |

**Total Estimated Hours:** 20.5 hours  
**Available Hours:** 10-15 hours (1 week)

**Scope note:** If estimated hours exceed available hours, the React dashboard scaffolding (P1-012, P1-013, P1-013b) should be the first items to carry over to Phase 2, as the Angular portal is the higher priority deliverable for Phase 1.

### Definition of Done — Sprint 1.2

A task is Done when:
- [ ] The Angular portal displays real data from the Profile Service API (or json-server mock)
- [ ] Loading skeleton is visible during data fetch (verified by throttling network to "Slow 3G" in DevTools)
- [ ] An error state component is shown if the API returns a 500 error (verified by temporarily pointing to a non-existent URL)
- [ ] `ng test` passes including the new HttpClient tests
- [ ] The React dashboard scaffold runs (`npm run dev` in the apps/ai-dashboard-react directory)

### Definition of Done — Sprint 1.2 (Sprint level)

The sprint is Done when:
- [ ] A visitor can open the Angular portal and see Rajesh's real profile data loaded from the API
- [ ] The portal handles API unavailability gracefully (error state, not blank screen)
- [ ] The React dashboard shell is running with placeholder content ready for Phase 3 AI features
- [ ] Both READMEs are updated and accurate
- [ ] The Phase 2 backend tasks needed for API connection are tracked in the backlog

### Sprint Retrospective Prompts
- How did connecting to a real API change the architecture of the components?
- Were there any data shape mismatches between what the API returned and what the components expected?
- Did the shared-types package actually prevent type errors at the boundary?
- What would need to change to connect to a staging API instead of localhost?
