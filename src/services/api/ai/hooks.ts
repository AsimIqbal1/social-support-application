
import { useAsync } from '@/hooks/useAsync';
import { generateAIContent } from './http';
import type { AIGenerateRequest, UseAIGenerationReturn } from './types';
import type { Language } from '@/i18n/config/languages';

export const useAIGeneration = (): UseAIGenerationReturn => {
  const {
    data,
    isLoading,
    error,
    isError,
    isSuccess,
    execute,
    reset
  } = useAsync(generateAIContent);

  const generateContent = async (userPrompt: string, field: string, language: Language, context?: Record<string, any>) => {
    return execute({ userPrompt, field, language, context } as AIGenerateRequest);
  };

  return {
    data,
    isLoading,
    error,
    isError,
    isSuccess,
    generateContent,
    reset,
  };
};