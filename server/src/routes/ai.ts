import { Router } from 'express';
import type { Request, Response } from 'express';
import type { AIGenerateRequest, AIGenerateResponse, ValidFieldType } from '../types';
import { HTTP_STATUS } from '../constants';
import { aiRateLimit } from '../config/rateLimit';
import { validateAIRequest, handleValidationErrors } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { generateAIContent } from '../services/aiService';

const router = Router();

// AI generate endpoint
router.post('/generate', 
  aiRateLimit,
  validateAIRequest,
  handleValidationErrors,
  asyncHandler(async (req: Request<{}, AIGenerateResponse, AIGenerateRequest>, res: Response<AIGenerateResponse>) => {
    const { userPrompt, field, context } = req.body;
    
    console.log(`🚀 AI generation request - Field: ${field}, Prompt length: ${userPrompt.length}${context ? ', With context' : ''}`);
    
    const result = await generateAIContent(userPrompt, field as ValidFieldType, context);
    
    const response: AIGenerateResponse = {
      success: true,
      content: result.content,
      usage: result.usage
    };

    console.log(`✅ AI generation successful - Tokens used: ${result.usage?.totalTokens || 'unknown'}`);
    res.status(HTTP_STATUS.OK).json(response);
  })
);

export default router; 