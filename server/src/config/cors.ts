import type { CorsOptions } from 'cors';
import { env } from './environment.js';

export const corsConfig: CorsOptions = {
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export const getCorsOrigins = (): string | string[] => {
  // In development, allow multiple potential frontend URLs
  if (env.NODE_ENV === 'development') {
    return [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      env.FRONTEND_URL
    ].filter((url, index, arr) => arr.indexOf(url) === index); // Remove duplicates
  }
  
  return env.FRONTEND_URL;
};

// Update CORS config with dynamic origins
export const dynamicCorsConfig: CorsOptions = {
  ...corsConfig,
  origin: getCorsOrigins()
}; 