/**
 * @rajesh-profile/shared-types
 *
 * Central export for all TypeScript interfaces shared across the Rajesh Profile Portal monorepo.
 * Import from this package in all apps and services to ensure type consistency.
 *
 * @example
 * // In Angular service
 * import type { Profile, Skill } from '@rajesh-profile/shared-types'
 *
 * // In React component
 * import type { JDAnalysisResponse, TokenUsageSummary } from '@rajesh-profile/shared-types'
 *
 * // In Express route handler
 * import type { ApiResponse, ContactFormRequest } from '@rajesh-profile/shared-types'
 */

// Profile data types
export type {
  Profile,
  Skill,
  SkillCategory,
  Experience,
  Project,
  Certification,
} from './profile.types'
export { Proficiency } from './profile.types'

// AI feature types
export type {
  JDAnalysisRequest,
  JDAnalysisResponse,
  ExtractedSkill,
  SkillMatch,
  SkillGap,
  MatchAnalysis,
  AdaptedProfile,
  AdaptedExperience,
  AdaptedProject,
  PrioritizedSkill,
  IdentifiedGap,
  ResumeGenerationRequest,
  ResumeContent,
  ResumeContact,
  ResumeExperience,
  ResumeProject,
  ResumeCertification,
  RecommendationResponse,
  SkillRecommendation,
  LearningStep,
  TokenUsageSummaryForCall,
} from './ai.types'

// Token usage types
export type {
  TokenUsageLog,
  TokenUsageSummary,
  FeatureBreakdown,
  DailyTokenUsage,
  ModelPricing,
} from './token.types'
export { AIFeature, MODEL_PRICING, estimateCostUsd } from './token.types'

// API envelope types
export type {
  ApiResponse,
  ApiErrorResponse,
  ApiError,
  ApiMeta,
  PaginatedResponse,
  PaginationMeta,
  ContactFormRequest,
  ContactFormResponse,
  HealthCheckResponse,
} from './api.types'
export type { ApiErrorCode } from './api.types'
export { isApiErrorResponse } from './api.types'
