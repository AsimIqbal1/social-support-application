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
router.post('/generate', aiRateLimit, validateAIRequest, handleValidationErrors, asyncHandler(async (req, res) => {
  const { userPrompt, field, language, context } = req.body as AIGenerateRequest;
  
  console.log(`📨 AI generation request: field=${field}, language=${language}, prompt length=${userPrompt.length}`);
  
  try {
    const result = await generateAIContent(userPrompt, field as ValidFieldType, language, context);
    
    const response: AIGenerateResponse = {
      success: true,
      content: result.content,
      usage: result.usage
    };
    
    console.log(`✅ AI generation completed successfully for ${field} in ${language}`);
    res.status(HTTP_STATUS.OK).json(response);
  } catch (error) {
    console.error('❌ AI generation failed:', error);
    
    const response: AIGenerateResponse = {
      success: false,
      error: 'Failed to generate AI content'
    };
    
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
  }
}));

export default router; 