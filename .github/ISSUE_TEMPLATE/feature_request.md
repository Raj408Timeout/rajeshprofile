---
name: Feature Request
about: Propose a new feature for the Rajesh Profile Portal
title: '[FEATURE] '
labels: enhancement
assignees: rajeshkumarkalaimani
---

## Feature Summary

**One sentence describing the feature:**
<!-- What should this feature do? Be specific. -->

## Problem / Motivation

**What problem does this feature solve?**
<!-- Describe the problem this feature addresses. Include who is affected (recruiter, hiring manager, Rajesh) and how frequently the problem occurs. -->

**Example scenario:**
<!-- Walk through a concrete scenario where this feature would be used. -->

## Proposed Solution

**Describe your preferred approach:**
<!-- What should the implementation look like? Be as specific as helpful, but feel free to leave technical details open if you're not sure. -->

**Alternative approaches considered:**
<!-- List other ways this could be solved, and why you prefer the proposed solution. -->

## Technical Scope

**Which workspaces are affected?**
- [ ] `apps/portal-angular` — Public Angular portal
- [ ] `apps/ai-dashboard-react` — Private React dashboard
- [ ] `backend/profile-service` — Profile REST API
- [ ] `backend/ai-orchestration-service` — AI features
- [ ] `packages/shared-types` — Shared TypeScript types
- [ ] `infrastructure/` — Docker, Terraform, or CI/CD
- [ ] `docs/` — Documentation only

**Does this feature involve AI/LLM changes?**
- [ ] Yes — new or modified prompt template required
- [ ] Yes — new AI feature with token cost impact
- [ ] No — pure frontend or backend change

**Estimated effort:**
- [ ] Small (< 4 hours)
- [ ] Medium (half day to 1 day)
- [ ] Large (2-5 days)
- [ ] Epic (needs breakdown into sub-tasks)

## Acceptance Criteria

<!-- Define specific, testable criteria that confirm this feature is complete. Use Given/When/Then format if helpful. -->

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## AI Feature Checklist (if applicable)

If this feature involves LLM/AI:

- [ ] Prompt template designed and documented in `docs/prompts/`
- [ ] Token budget estimated and added to `docs/phase-0/AI_STRATEGY.md`
- [ ] Anti-hallucination constraints included in system prompt
- [ ] Output schema defined (Zod schema in the service)
- [ ] Graceful degradation behavior defined (what happens if Claude API is down?)
- [ ] Token usage will be logged to `token_usage_logs` table

## Additional Context

<!-- Any mockups, references, similar features in other tools, ADR links, or other relevant information. -->

**Related issues or PRs:**
<!-- Link to related issues or pull requests if any. -->

**Phase:**
<!-- Which project phase does this feature belong to? (Phase 1-7 from BACKLOG.md) -->
