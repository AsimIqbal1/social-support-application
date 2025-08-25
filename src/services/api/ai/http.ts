import { httpClient } from '../../httpClient';
import { AI_ENDPOINTS } from '../endpoints';
import type { AIGenerateRequest, AIGenerateResponse } from './types';

export const generateAIContent = async (
  request: AIGenerateRequest
): Promise<AIGenerateResponse> => {
  return httpClient.post(AI_ENDPOINTS.GENERATE, request);
};