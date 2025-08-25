import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';
import { 
  MAX_PROMPT_LENGTH, 
  MIN_PROMPT_LENGTH, 
  VALID_FIELD_TYPES,
  HTTP_STATUS 
} from '../constants';
import type { ErrorResponse } from '../types';

// Validation rules for AI generate endpoint
export const validateAIRequest = [
  body('userPrompt')
    .isString()
    .trim()
    .isLength({ min: MIN_PROMPT_LENGTH, max: MAX_PROMPT_LENGTH })
    .withMessage(`Prompt must be between ${MIN_PROMPT_LENGTH} and ${MAX_PROMPT_LENGTH} characters`),
  body('field')
    .isString()
    .trim()
    .isIn(VALID_FIELD_TYPES)
    .withMessage(`Invalid field type. Must be one of: ${VALID_FIELD_TYPES.join(', ')}`),
  body('context')
    .optional()
    .isObject()
    .withMessage('Context must be an object'),
];

// Error handling middleware for validation results
export const handleValidationErrors = (
  req: Request, 
  res: Response<ErrorResponse>, 
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
    return;
  }
  next();
}; 