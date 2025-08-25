import dotenv from 'dotenv';
import type { EnvironmentConfig } from '../types';
import {
  DEFAULT_PORT,
  DEFAULT_FRONTEND_URL,
  DEFAULT_AI_DAILY_LIMIT,
} from '../constants';

// Load environment variables
dotenv.config();

export const env: EnvironmentConfig = {
  PORT: parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || undefined,
  FRONTEND_URL: process.env.FRONTEND_URL || DEFAULT_FRONTEND_URL,
  AI_DAILY_LIMIT_PER_IP: parseInt(
    process.env.AI_DAILY_LIMIT_PER_IP || DEFAULT_AI_DAILY_LIMIT.toString(),
    10
  ),
};

export const isProduction = (): boolean => env.NODE_ENV === 'production';
export const isDevelopment = (): boolean => env.NODE_ENV === 'development';
export const hasRealApiKey = (): boolean => {
  return !!env.OPENAI_API_KEY;
};
