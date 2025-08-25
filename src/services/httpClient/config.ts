import type { AxiosRequestConfig } from 'axios';

// Environment variables
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10);

// HTTP Client configuration
export const httpConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // Enable credentials for CORS
  withCredentials: false,
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR:
    'Network connection failed. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. You do not have permission.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  RATE_LIMITED: 'Too many requests. Please wait and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
} as const;

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = API_TIMEOUT;

// Base URL for API requests
export const BASE_URL = API_BASE_URL;

// Environment check
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
