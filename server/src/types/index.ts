// Request/Response types
export interface AIGenerateRequest {
  userPrompt: string;
  field: string;
}

export interface AIGenerateResponse {
  success: boolean;
  content?: string;
  error?: string;
  usage: OpenAIUsage | undefined;
}

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  service: string;
}

// OpenAI types
export interface OpenAIUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AIGenerationResult {
  content: string;
  usage: OpenAIUsage | undefined;
}

// Valid field types for AI generation
export type ValidFieldType = 'currentFinancialSituation' | 'employmentCircumstances' | 'reasonForApplying';

// Environment variables type
export interface EnvironmentConfig {
  PORT: number;
  NODE_ENV: string;
  OPENAI_API_KEY?: string | undefined;
  FRONTEND_URL: string;
  AI_DAILY_LIMIT_PER_IP: number;
}

// Error response type
export interface ErrorResponse {
  success: false;
  error: string;
  details?: any[];
} 