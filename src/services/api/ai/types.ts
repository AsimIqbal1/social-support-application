import type { Language } from '@/i18n/config/languages';
import type { HttpError } from '@/services/httpClient';

export interface AIGenerateRequest {
  userPrompt: string;
  field: string;
  language: Language;
  context?: Record<string, any>;
}

export interface AIGenerateResponse {
  success: boolean;
  content?: string;
  error?: string;
}

export interface UseAIGenerationReturn {
  data: AIGenerateResponse | undefined;
  isLoading: boolean;
  error: HttpError | null;
  isError: boolean;
  isSuccess: boolean;
  generateContent: (userPrompt: string, field: string, language: Language, context?: Record<string, any>) => Promise<AIGenerateResponse | undefined>;
  reset: () => void;
} 