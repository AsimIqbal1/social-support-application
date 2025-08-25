import { message } from 'antd';
import type {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { HttpStatus, type HttpError, type RequestConfig } from './types';
import { ERROR_MESSAGES, isDevelopment } from './config';

// Request interceptor
export const setupRequestInterceptor = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
      console.error('🔴 Request Error:', error);
      return Promise.reject(error);
    }
  );
};

// Response interceptor
export const setupResponseInterceptor = (
  axiosInstance: AxiosInstance
): void => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      return response;
    },
    (error: AxiosError): Promise<never> => {
      const httpError = handleResponseError(error);
      return Promise.reject(httpError);
    }
  );
};

// Error handler
const handleResponseError = (error: AxiosError): HttpError => {
  const config = error.config as RequestConfig;
  const showToast = config?.showErrorToast !== false; // Default to true
  const customMessage = config?.errorMessage;

  let errorMessage = customMessage || ERROR_MESSAGES.GENERIC_ERROR;
  let httpError: HttpError;

  if (error.response) {
    const { status, statusText, data } = error.response;

    httpError = {
      message: getErrorMessage(status, data) || errorMessage,
      status,
      statusText,
      data,
    };

    if (showToast) {
      showErrorToast(httpError.message, status);
    }

    if (isDevelopment) {
      console.error(`🔴 HTTP ${status} Error:`, {
        url: error.config?.url,
        method: error.config?.method,
        status,
        statusText,
        data,
      });
    }
  } else {
    httpError = {
      message: customMessage || ERROR_MESSAGES.GENERIC_ERROR,
      status: 0,
      statusText: 'Request Error',
    };

    if (showToast) {
      showErrorToast(httpError.message);
    }

    if (isDevelopment) {
      console.error('🔴 Request Setup Error:', error.message);
    }
  }

  return httpError;
};

// Get appropriate error message based on status code
const getErrorMessage = (status: number, responseData?: any): string => {
  // Try to get error message from response data first
  if (responseData) {
    if (typeof responseData === 'string') {
      return responseData;
    }
    if (responseData.error) {
      return responseData.error;
    }
    if (responseData.message) {
      return responseData.message;
    }
  }

  // Fallback to status-based messages
  switch (status) {
    case HttpStatus.BAD_REQUEST:
      return ERROR_MESSAGES.VALIDATION_ERROR;
    case HttpStatus.UNAUTHORIZED:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case HttpStatus.FORBIDDEN:
      return ERROR_MESSAGES.FORBIDDEN;
    case HttpStatus.NOT_FOUND:
      return ERROR_MESSAGES.NOT_FOUND;
    case HttpStatus.TOO_MANY_REQUESTS:
      return ERROR_MESSAGES.RATE_LIMITED;
    case HttpStatus.INTERNAL_SERVER_ERROR:
    case HttpStatus.BAD_GATEWAY:
    case HttpStatus.SERVICE_UNAVAILABLE:
      return ERROR_MESSAGES.SERVER_ERROR;
    default:
      return ERROR_MESSAGES.GENERIC_ERROR;
  }
};

// Show error toast notification
const showErrorToast = (errorMessage: string, status?: number): void => {
  const isRateLimited = status === HttpStatus.TOO_MANY_REQUESTS;
  const duration = isRateLimited ? 5 : 3; // Show rate limit errors longer

  message.error({
    content: errorMessage,
    duration,
    key: 'http-error', // Prevent duplicate toasts
  });
};
