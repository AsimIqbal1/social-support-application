import type { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants';
import type { ErrorResponse } from '../types';

// Global error handler
export const globalErrorHandler = (
  error: Error,
  _req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction
): void => {
  console.error('🚨 Global error handler:', error);

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: 'Internal server error',
  });
};

// 404 handler for undefined routes
export const notFoundHandler = (
  _req: Request,
  res: Response<ErrorResponse>
): void => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    error: 'Endpoint not found',
  });
};

// Async error wrapper to catch async errors
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
