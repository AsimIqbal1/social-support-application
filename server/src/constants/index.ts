import type { ValidFieldType } from '../types';

// Server constants
export const DEFAULT_PORT = 3001;
export const DEFAULT_FRONTEND_URL = 'http://localhost:5173';
export const DEFAULT_AI_DAILY_LIMIT = 50;

// Request limits
export const MAX_PROMPT_LENGTH = 1000;
export const MIN_PROMPT_LENGTH = 5;
export const MAX_TOKENS = 400;
export const REQUEST_BODY_LIMIT = '10mb';

// Rate limiting
export const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
export const RATE_LIMIT_MAX_REQUESTS = 50;

// OpenAI configuration
export const OPENAI_MODEL = 'gpt-3.5-turbo';
export const OPENAI_TEMPERATURE = 0.7;
export const OPENAI_FREQUENCY_PENALTY = 0.5;
export const OPENAI_PRESENCE_PENALTY = 0.3;

// Valid field types array
export const VALID_FIELD_TYPES: ValidFieldType[] = [
  'currentFinancialSituation',
  'employmentCircumstances',
  'reasonForApplying'
];

// Service name
export const SERVICE_NAME = 'social-support-ai-server';

// Mock usage for development
export const MOCK_USAGE = {
  promptTokens: 50,
  completionTokens: 200,
  totalTokens: 250
};

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
} as const; 