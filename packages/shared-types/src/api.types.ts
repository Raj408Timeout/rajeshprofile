/**
 * API Types — Shared TypeScript interfaces for HTTP API request/response shapes.
 * These interfaces define the envelope format used by both backend services.
 * All API responses are wrapped in ApiResponse<T>.
 */

// =====================================================================
// Response Envelope
// =====================================================================

/**
 * Metadata included in every API response.
 */
export interface ApiMeta {
  /** ISO 8601 timestamp of when the response was generated */
  timestamp: string
  /** API version string */
  version: string
  /** Unique request identifier for tracing and debugging */
  requestId: string
  /** Pagination metadata, present only on list responses */
  pagination?: PaginationMeta
}

/**
 * Pagination metadata for list responses.
 */
export interface PaginationMeta {
  /** Current page number (1-indexed) */
  page: number
  /** Number of items per page */
  perPage: number
  /** Total number of items across all pages */
  total: number
  /** Total number of pages */
  totalPages: number
}

/**
 * The standard success response envelope used by all API endpoints.
 * @template T - The type of the data payload
 *
 * @example
 * // Profile endpoint response
 * const response: ApiResponse<Profile> = {
 *   success: true,
 *   data: { id: '...', fullName: 'Rajeshkumar Kalaimani', ... },
 *   meta: { timestamp: '2026-08-07T10:30:00.000Z', version: '1.0', requestId: 'req_abc123' }
 * }
 */
export interface ApiResponse<T> {
  /** Always true for successful responses */
  success: true
  /** The response payload */
  data: T
  /** Response metadata */
  meta: ApiMeta
}

/**
 * A paginated list response wrapping an array of items.
 * @template T - The type of individual items in the list
 *
 * @example
 * const response: PaginatedResponse<Skill> = {
 *   success: true,
 *   data: [ ... ],
 *   meta: {
 *     timestamp: '...',
 *     version: '1.0',
 *     requestId: '...',
 *     pagination: { page: 1, perPage: 20, total: 47, totalPages: 3 }
 *   }
 * }
 */
export interface PaginatedResponse<T> {
  /** Always true for successful responses */
  success: true
  /** Array of items for the current page */
  data: T[]
  /** Response metadata including pagination info */
  meta: ApiMeta & { pagination: PaginationMeta }
}

// =====================================================================
// Error Response
// =====================================================================

/**
 * Structured error details returned by the API.
 */
export interface ApiError {
  /** Machine-readable error code for programmatic handling */
  code: ApiErrorCode
  /** Human-readable error message suitable for display */
  message: string
  /** The specific field that caused a validation error, if applicable */
  field?: string
  /** Request ID for correlation with server logs */
  requestId: string
  /** Additional error context (never includes stack traces) */
  details?: Record<string, unknown>
}

/**
 * The standard error response envelope.
 * Returned for all 4xx and 5xx HTTP responses.
 */
export interface ApiErrorResponse {
  /** Always false for error responses */
  success: false
  /** Error details */
  error: ApiError
}

// =====================================================================
// Error Codes
// =====================================================================

/**
 * All possible API error codes, as a string literal union.
 * These correspond 1:1 with the error taxonomy in API_DESIGN.md.
 */
export type ApiErrorCode =
  | 'VALIDATION_ERROR'        // 400 — Request body or query params failed validation
  | 'INVALID_JD_TEXT'         // 400 — JD text is empty, too short, or too long
  | 'UNAUTHORIZED'            // 401 — Missing or invalid admin API key
  | 'FORBIDDEN'               // 403 — Valid key but insufficient permissions
  | 'NOT_FOUND'               // 404 — Requested resource does not exist
  | 'CONFLICT'                // 409 — Duplicate resource
  | 'AI_OUTPUT_INVALID'       // 422 — LLM returned output that failed schema validation
  | 'RATE_LIMIT_EXCEEDED'     // 429 — Too many requests from this IP
  | 'INTERNAL_ERROR'          // 500 — Unexpected server error
  | 'AI_API_ERROR'            // 502 — Upstream AI API returned an error
  | 'AI_BUDGET_EXCEEDED'      // 503 — Monthly AI token budget exhausted
  | 'AI_TIMEOUT'              // 504 — AI API call exceeded timeout threshold

// =====================================================================
// Request Types
// =====================================================================

/**
 * Contact form submission request body.
 */
export interface ContactFormRequest {
  /** Sender's full name */
  name: string
  /** Sender's email address */
  email: string
  /** Message subject line */
  subject: string
  /** Message body */
  message: string
  /** Honeypot field — should always be empty. If populated, it's a bot. */
  website?: string
}

/**
 * Success response for contact form submission.
 */
export interface ContactFormResponse {
  /** Confirmation message to display to the user */
  message: string
}

// =====================================================================
// Health Check
// =====================================================================

/**
 * Response shape for GET /health endpoints on all services.
 */
export interface HealthCheckResponse {
  /** "ok" if all systems healthy, "degraded" if some subsystems are impaired */
  status: 'ok' | 'degraded'
  /** Seconds since service started */
  uptimeSeconds: number
  /** Current service version from package.json */
  version: string
  /** ISO 8601 timestamp of when the health check was performed */
  timestamp: string
  /** Database connection status */
  dbConnection: 'ok' | 'error'
  /** Redis connection status (optional, present on services with Redis) */
  redisConnection?: 'ok' | 'error'
  /** Error message if any subsystem is in error state */
  error?: string
}

// =====================================================================
// Type Guards
// =====================================================================

/**
 * Type guard to check if an API response is an error response.
 * @example
 * const result = await fetch('/api/v1/profile').then(r => r.json())
 * if (isApiErrorResponse(result)) {
 *   console.error(result.error.message)
 * } else {
 *   console.log(result.data.fullName)
 * }
 */
export function isApiErrorResponse(
  response: ApiResponse<unknown> | ApiErrorResponse
): response is ApiErrorResponse {
  return response.success === false
}
