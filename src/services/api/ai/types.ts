
export interface AIGenerateRequest {
  userPrompt: string;
  field: string;
  context?: Record<string, any>; // Additional context for better AI responses
}

export interface AIGenerateResponse {
  success: boolean;
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface UseAIGenerationReturn {
  data: AIGenerateResponse | undefined;
  isLoading: boolean;
  error: any;
  isError: boolean;
  isSuccess: boolean;
  generateContent: (userPrompt: string, field: string, context?: Record<string, any>) => Promise<AIGenerateResponse | undefined>;
  reset: () => void;
} 