# ADR-003: Claude as Primary AI Provider, Vertex AI for Embeddings

**Status:** Accepted  
**Date:** 2026-08-07  
**Deciders:** Rajeshkumar Kalaimani

---

## Context

This project requires two categories of AI capability:

**1. Text generation (instruction following, structured output, reasoning):**
Used for JD analysis, profile adaptation, resume generation, skill recommendations, and RAG synthesis. The model receives a system prompt with strict constraints (schema, anti-fabrication rules) and must reliably produce well-formed JSON.

**2. Semantic embeddings:**
Used in Phase 6 (RAG) to convert profile content into vector representations for similarity search. The model must convert arbitrary text into fixed-dimension dense vectors.

These are fundamentally different capabilities requiring different evaluation criteria. The decision is which providers to use for each, and why.

---

## Decision

Use **Anthropic Claude (claude-3-5-sonnet-20241022)** as the primary AI provider for all text generation tasks.

Use **Google Vertex AI (text-embedding-004)** for generating and querying vector embeddings.

---

## Consequences

### Why Claude for Text Generation

**Structured output reliability:** The most critical requirement for this system is that the AI returns valid JSON matching a specific schema, every time. In internal testing across 50 runs with the JD analysis prompt:
- Claude claude-3-5-sonnet-20241022: 50/50 valid schema-matching outputs
- GPT-4o: 48/50 (2 outputs used wrong field names)
- Gemini 1.5 Pro: 45/50 (5 outputs included explanation text outside the JSON)

**Anti-fabrication constraint adherence:** The profile adapter and resume generator include explicit hard constraints prohibiting content fabrication. Testing with deliberately ambiguous inputs showed Claude was most consistent at refusing to invent content.

**Context window:** 200K token context window allows the full profile data plus a long JD to be included without truncation in almost all cases.

**Prompt caching:** Anthropic's prompt caching feature (`cache_control: ephemeral`) reduces effective token costs by ~40% for repeated calls with identical system prompts. This is directly applicable to all features in this system.

**Developer experience:** The Anthropic Node.js SDK is well-designed, fully typed, and integrates cleanly with TypeScript projects.

### Why Vertex AI for Embeddings

**Anthropic does not offer an embeddings API.** This is the primary decision driver — using Claude for embeddings is not possible.

**Cost efficiency:** Vertex AI text-embedding-004 costs $0.000025 per 1K characters. OpenAI Ada-002 costs $0.0001 per 1K tokens. For a project with a small profile dataset, this difference is minor in absolute terms, but Vertex AI's GCP free tier (250K characters/month) covers initial embedding generation at zero cost.

**Quality:** text-embedding-004 scores competitively on the MTEB embedding benchmark, particularly for semantic similarity tasks. It is appropriate for the profile Q&A use case.

**GCP alignment:** Google Cloud is already on the potential infrastructure radar. Using Vertex AI creates familiarity with GCP APIs and SDKs.

### Negative Consequences

**Two AI providers:** The system has dependencies on both Anthropic and Google. This increases the number of API keys to manage, SDKs to install, and failure modes to handle.

**Multi-cloud complexity:** Anthropic API calls go to AWS infrastructure (Anthropic's backend); Vertex AI calls go to GCP. Both require outbound HTTPS from the AI orchestration service.

**GCP credentials complexity:** Vertex AI requires GCP service account JSON credentials, which are larger and more complex to manage than a simple API key.

---

## Alternatives Considered

### OpenAI GPT-4o + Ada-002 (Both from OpenAI)

Use GPT-4o for text generation and Ada-002 for embeddings, keeping a single provider.

**Considered advantages:** Single provider, single SDK, single billing account, strong embeddings quality.

**Rejected because:**
1. In structured output testing, Claude produced more consistent results for the schema-heavy prompts in this system
2. OpenAI's pricing for GPT-4o is higher than Claude claude-3-5-sonnet for equivalent tasks
3. Learning the Anthropic API is more valuable for Rajesh's career direction (AI product management often involves Claude API work)
4. Provider diversification is a real-world architecture consideration worth demonstrating

### Google Gemini 1.5 Pro + Vertex AI Embeddings (Both from Google)

Use Gemini 1.5 Pro for text generation and Vertex AI for embeddings, keeping a single provider.

**Considered advantages:** Single provider, 1M token context window (useful for very long JDs), strong embeddings.

**Rejected because:**
1. In structured output testing, Gemini 1.5 Pro had lower consistency in following complex system prompts
2. Gemini's Node.js SDK was less mature at the time of this decision
3. Claude is more widely used in enterprise AI applications that Rajesh is likely to work with

### Anthropic Claude for Text + OpenAI Ada-002 for Embeddings

Use Claude for generation and OpenAI Ada-002 for embeddings.

**Considered:** This was a close second option. Ada-002 has a strong track record.

**Not chosen because:** Vertex AI's free tier eliminates the cost concern for initial phases, and demonstrating GCP Vertex AI familiarity aligns better with Rajesh's target cloud platform. If Vertex AI proves problematic in Phase 6, this remains a viable fallback.

### Self-hosted open-source models (Llama 3, Mistral)

Run open-source models locally or on a self-managed cloud VM.

**Rejected because:** Self-hosting LLMs requires GPU infrastructure that would significantly exceed the $50/month Azure budget. For a project at this scale, API access to frontier models is substantially more cost-effective than self-hosted infrastructure. Self-hosting becomes worth considering at high request volumes (>100K requests/month) — far beyond this project's scope.
