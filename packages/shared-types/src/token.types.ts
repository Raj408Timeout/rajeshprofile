/**
 * Token Types — Shared TypeScript interfaces for AI token usage tracking.
 * These interfaces are shared between the AI Orchestration Service and the React dashboard.
 */

// =====================================================================
// Enums
// =====================================================================

/**
 * Enumeration of all AI features that consume tokens.
 * Used for cost attribution and per-feature analytics.
 */
export enum AIFeature {
  /** Job description text analysis — skill extraction and seniority detection */
  JD_ANALYZER = 'JD_ANALYZER',
  /** Profile content reranking and reframing for a specific role */
  PROFILE_ADAPTER = 'PROFILE_ADAPTER',
  /** Tailored resume JSON generation from profile + JD analysis */
  RESUME_GENERATOR = 'RESUME_GENERATOR',
  /** Skill gap analysis and learning path recommendations */
  RECOMMENDATION_ENGINE = 'RECOMMENDATION_ENGINE',
  /** RAG conversational query synthesis (Phase 6) */
  RAG_QUERY = 'RAG_QUERY',
  /** Vertex AI embedding generation for profile content (Phase 6) */
  EMBEDDING_GENERATION = 'EMBEDDING_GENERATION',
}

// =====================================================================
// Token Usage Log
// =====================================================================

/**
 * A single AI API call log entry, as stored in the token_usage_logs table.
 * Every AI API call generates one of these records.
 */
export interface TokenUsageLog {
  /** Unique identifier (UUID) */
  id: string
  /** Which AI feature generated this call */
  feature: AIFeature
  /** Model identifier, e.g. "claude-3-5-sonnet-20241022" */
  modelId: string
  /** Number of tokens in the prompt (input) */
  promptTokens: number
  /** Number of tokens in the completion (output) */
  completionTokens: number
  /** Total tokens (promptTokens + completionTokens) */
  totalTokens: number
  /** Estimated cost in USD at current pricing rates */
  estimatedCostUsd: number
  /** Whether this result was served from cache (true = no new tokens consumed) */
  cacheHit: boolean
  /** SHA-256 hash of the JD text for JD_ANALYZER calls, for correlation */
  jdHash: string | null
  /** Duration of the API call in milliseconds */
  durationMs: number | null
  /** ISO 8601 timestamp of when the API call was made */
  createdAt: string
}

// =====================================================================
// Dashboard Types
// =====================================================================

/**
 * A single day's token usage summary for the dashboard chart.
 */
export interface DailyTokenUsage {
  /** Date in YYYY-MM-DD format */
  date: string
  /** Total tokens consumed on this day */
  totalTokens: number
  /** Estimated cost in USD for this day */
  costUsd: number
  /** Number of AI API calls made on this day */
  callCount: number
}

/**
 * Per-feature breakdown for the token dashboard.
 */
export interface FeatureBreakdown {
  /** The AI feature being summarized */
  feature: AIFeature
  /** Human-readable name for display (e.g., "JD Analyzer") */
  displayName: string
  /** Total number of API calls made for this feature in the period */
  callCount: number
  /** Total tokens consumed by this feature */
  totalTokens: number
  /** Total estimated cost in USD for this feature */
  totalCostUsd: number
  /** Percentage of calls that were cache hits (0-100) */
  cacheHitRatePercent: number
  /** Average tokens per non-cached call */
  avgTokensPerCall: number
}

/**
 * The complete token usage summary returned by GET /api/v1/token-usage.
 * Used to populate the React dashboard.
 */
export interface TokenUsageSummary {
  /** The period being summarized: "today", "week", or "month" */
  period: 'today' | 'week' | 'month'
  /** Start of the period in ISO 8601 format */
  periodStart: string
  /** End of the period in ISO 8601 format */
  periodEnd: string
  /** Total tokens consumed in this period */
  totalTokens: number
  /** Total number of AI API calls in this period */
  totalCalls: number
  /** Total estimated cost in USD for this period */
  totalCostUsd: number
  /** Configured monthly budget in USD */
  budgetUsd: number
  /** Percentage of monthly budget consumed (0-100+) */
  budgetUsedPercent: number
  /** Whether the budget warning threshold has been crossed */
  budgetWarning: boolean
  /** Whether the hard budget limit has been hit (AI features suspended) */
  budgetExceeded: boolean
  /** Per-feature cost and usage breakdown */
  byFeature: FeatureBreakdown[]
  /** Daily token usage breakdown for the past 30 days (for chart display) */
  dailyBreakdown: DailyTokenUsage[]
}

// =====================================================================
// Usage Estimation
// =====================================================================

/**
 * Cost per 1,000 tokens for a specific model, in USD.
 * Used for cost estimation before making an API call.
 */
export interface ModelPricing {
  /** Model identifier */
  modelId: string
  /** Cost per 1,000 input tokens in USD */
  inputCostPer1kTokens: number
  /** Cost per 1,000 output tokens in USD */
  outputCostPer1kTokens: number
  /** Whether prompt caching is supported for this model */
  supportsCaching: boolean
  /** Cost per 1,000 cache read tokens (typically lower than input cost) */
  cacheReadCostPer1kTokens: number | null
}

/**
 * Model pricing constants for known models.
 * Update when Anthropic changes pricing.
 * Prices as of 2026-08-07.
 */
export const MODEL_PRICING: Record<string, ModelPricing> = {
  'claude-3-5-sonnet-20241022': {
    modelId: 'claude-3-5-sonnet-20241022',
    inputCostPer1kTokens: 0.003,   // $3.00 per 1M tokens
    outputCostPer1kTokens: 0.015,  // $15.00 per 1M tokens
    supportsCaching: true,
    cacheReadCostPer1kTokens: 0.0003, // $0.30 per 1M cache read tokens
  },
  'claude-3-haiku-20240307': {
    modelId: 'claude-3-haiku-20240307',
    inputCostPer1kTokens: 0.00025, // $0.25 per 1M tokens
    outputCostPer1kTokens: 0.00125, // $1.25 per 1M tokens
    supportsCaching: true,
    cacheReadCostPer1kTokens: 0.000025,
  },
}

/**
 * Utility function to estimate the cost of an AI call.
 * @param modelId - The model identifier
 * @param promptTokens - Number of input tokens
 * @param completionTokens - Number of output tokens
 * @returns Estimated cost in USD, or null if the model is not in the pricing table
 */
export function estimateCostUsd(
  modelId: string,
  promptTokens: number,
  completionTokens: number
): number | null {
  const pricing = MODEL_PRICING[modelId]
  if (!pricing) return null

  const inputCost = (promptTokens / 1000) * pricing.inputCostPer1kTokens
  const outputCost = (completionTokens / 1000) * pricing.outputCostPer1kTokens
  return Math.round((inputCost + outputCost) * 1_000_000) / 1_000_000 // Round to 6 decimal places
}
