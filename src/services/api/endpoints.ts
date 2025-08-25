
const API_BASE = '/api';

export const AI_ENDPOINTS = {
  GENERATE: `${API_BASE}/ai/generate`,
} as const;

export const ENDPOINTS = {
  AI: AI_ENDPOINTS,
} as const; 