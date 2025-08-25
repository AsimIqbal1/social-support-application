export interface AIGenerateRequest {
  userPrompt: string;
  field: string;
  language: 'en' | 'ar';
  context?: Record<string, any>;
}

export interface AIGenerateResponse {
  success: boolean;
  content?: string | undefined;
  error?: string | undefined;
  usage?: OpenAIUsage | undefined;
}

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  service: string;
}

export interface OpenAIUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AIGenerationResult {
  content: string;
  usage?: OpenAIUsage;
}

export type ValidFieldType =
  | 'currentFinancialSituation'
  | 'employmentCircumstances'
  | 'reasonForApplying';

export interface EnvironmentConfig {
  PORT: number;
  NODE_ENV: string;
  OPENAI_API_KEY?: string | undefined;
  FRONTEND_URL: string;
  AI_DAILY_LIMIT_PER_IP: number;
}

export interface ErrorResponse {
  success: false;
  error: string;
  details?: any[];
}
