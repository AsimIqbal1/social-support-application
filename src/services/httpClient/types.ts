import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// Base API response structure
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// HTTP Error types
export interface HttpError {
  message: string;
  status?: number;
  statusText?: string;
  data?: any;
}

// Custom request configuration
export interface RequestConfig extends AxiosRequestConfig {
  showErrorToast?: boolean; // Whether to show error toast for this request
  errorMessage?: string; // Custom error message to show
}

// Response wrapper
export interface HttpResponse<T = any> extends AxiosResponse<T> {
  data: T;
}

// HTTP methods
export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

export type HttpMethodType = (typeof HttpMethod)[keyof typeof HttpMethod];

// Common HTTP status codes
export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

export type HttpStatusType = (typeof HttpStatus)[keyof typeof HttpStatus];
