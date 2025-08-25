
export interface AIGenerateRequest {
  userPrompt: string;
  field: string;
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
  generateContent: (userPrompt: string, field: string) => Promise<AIGenerateResponse | undefined>;
  reset: () => void;
} 