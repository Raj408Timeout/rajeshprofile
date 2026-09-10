## Description

<!-- Clearly describe what this PR does and why it is needed. Link to the issue or backlog item this implements. -->

**Closes:** #<!-- issue number, if applicable -->

**Related backlog item:** <!-- e.g., P3-003 — Implement JD analyzer service -->

---

## Type of Change

<!-- Check all that apply -->

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Refactoring (no functional changes, no API changes)
- [ ] Documentation update (changes to .md files, comments, or ADRs)
- [ ] Infrastructure / CI/CD change
- [ ] Dependency update

---

## Changes Made

<!-- List the key files changed and what was done in each -->

- `file/path/here.ts` — What was changed and why
- `file/path/here.ts` — What was changed and why

---

## Testing Checklist

- [ ] I have run `npm test` from the monorepo root and all tests pass
- [ ] I have run `npm run lint` and there are no lint errors
- [ ] I have run `tsc --noEmit` and there are no TypeScript errors
- [ ] I have manually tested the affected feature in a browser
- [ ] I have added or updated unit tests for the changed code
- [ ] New test coverage meets the 80% minimum line coverage requirement
- [ ] For API changes: I have tested the endpoint with both valid and invalid inputs

---

## Screenshots (if UI changes)

<!-- Attach before/after screenshots for any visible UI changes. For API-only changes, skip this section. -->

**Before:**
<!-- Screenshot or "N/A" -->

**After:**
<!-- Screenshot or "N/A" -->

---

## AI Feature Checklist

<!-- Complete this section if this PR adds or modifies any AI/LLM functionality. Skip if not applicable. -->

- [ ] **Token usage is logged** — Every new AI API call writes a record to `token_usage_logs`
- [ ] **Cache is checked first** — New AI calls check Redis before hitting the API
- [ ] **Output schema is validated** — Zod validation runs on all LLM outputs before they are used
- [ ] **Hallucination check is in place** — Generated profile content is validated against source data
- [ ] **Graceful degradation tested** — I have simulated AI API failure and confirmed the error response is user-friendly
- [ ] **Prompt template is documented** — Changes to prompt templates are reflected in `docs/prompts/`
- [ ] **Token cost is within budget** — The estimated cost per call is within the budget defined in `docs/phase-0/AI_STRATEGY.md`
- [ ] **Prompt injection tested** — I have tested with adversarial inputs and confirmed the injection defense holds

---

## Database Checklist

<!-- Complete this section if this PR includes database changes. Skip if not applicable. -->

- [ ] A new Prisma migration file has been generated and committed
- [ ] The migration is reversible (down script is documented in the migration file comments)
- [ ] `prisma/seed.ts` has been updated if new seed data is required
- [ ] New database indexes have been added for any new query patterns
- [ ] The migration was tested against a fresh database (`prisma migrate reset`)

---

## Documentation

- [ ] I have updated the relevant documentation (API_DESIGN.md, ARCHITECTURE.md, etc.) if behavior has changed
- [ ] I have added a JSDoc comment to any new public function or interface
- [ ] If this is an architectural decision, I have created or updated an ADR

---

## Deployment Notes

<!-- Any special deployment steps needed for this change? (e.g., environment variable changes, migration that must run before traffic) -->

- [ ] No special deployment steps required
- [ ] Requires environment variable addition (listed below)
- [ ] Requires database migration before deployment
- [ ] Requires Redis cache flush

**New environment variables required:**
<!-- List any new keys needed in .env.example -->

---

## Reviewer Notes

<!-- Anything you want the reviewer to pay special attention to, areas of uncertainty, or alternative approaches you considered. -->
