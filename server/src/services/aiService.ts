import OpenAI from 'openai';
import type { ValidFieldType, AIGenerationResult } from '../types';
import { 
  OPENAI_MODEL, 
  OPENAI_TEMPERATURE, 
  OPENAI_FREQUENCY_PENALTY, 
  OPENAI_PRESENCE_PENALTY,
  MAX_TOKENS,
  MOCK_USAGE 
} from '../constants';
import { env, hasRealApiKey } from '../config/environment';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY || 'mock-api-key-for-development',
});

const buildContextString = (context?: Record<string, any>): string => {
  if (!context || Object.keys(context).length === 0) {
    return '';
  }

  const contextParts: string[] = [];
  
  if (context.maritalStatus) {
    contextParts.push(`Marital Status: ${context.maritalStatus}`);
  }
  if (context.dependents !== undefined) {
    contextParts.push(`Number of Dependents: ${context.dependents}`);
  }
  if (context.employmentStatus) {
    contextParts.push(`Employment Status: ${context.employmentStatus}`);
  }
  if (context.monthlyIncome !== undefined) {
    contextParts.push(`Monthly Income: ${context.monthlyIncome} AED`);
  }
  if (context.housingStatus) {
    contextParts.push(`Housing Status: ${context.housingStatus}`);
  }

  if (contextParts.length === 0) {
    return '';
  }

  return `\n\nUser's Current Situation:\n${contextParts.join('\n')}\n\nPlease use this information to provide more personalized and relevant assistance.`;
};

// System prompts for different fields
export const getSystemPrompt = (field: ValidFieldType, context?: Record<string, any>): string => {
  const basePrompt = `You are a helpful assistant for social welfare applications. 
Generate professional, empathetic content that helps users describe their situation clearly.
Keep responses under 800 characters, be respectful and professional.
Do not include personal information or specific details that the user hasn't provided.
Provide general guidance that users can customize for their specific situation. 
Write a response in a ready to submit format.`;

  const contextString = buildContextString(context);
  
  const fieldSpecificPrompts: Record<ValidFieldType, string> = {
    currentFinancialSituation: `${basePrompt}

Help users describe their financial hardship professionally while maintaining dignity.
Focus on current income, expenses, and financial challenges.
Use respectful language that acknowledges their difficulties without being dramatic. ${contextString}`,

    employmentCircumstances: `${basePrompt}

Help users explain employment challenges constructively.
Focus on employment status, recent changes, and efforts to find work.
Present the situation positively while being honest about challenges. ${contextString}`,

    reasonForApplying: `${basePrompt}

Help users articulate their need for assistance clearly and respectfully.
Focus on why support is needed and how it will help.
Emphasize the temporary nature of assistance and commitment to self-sufficiency. ${contextString}`
  };

  return fieldSpecificPrompts[field];
};

// Mock AI response for development/testing
export const generateMockResponse = (field: ValidFieldType, userPrompt: string, context?: Record<string, any>): string => {
  const mockResponses: Record<ValidFieldType, string> = {
    currentFinancialSituation: `Based on your situation, here's a professional description:

I am currently experiencing financial difficulties due to reduced income and increased expenses. My monthly income has been significantly impacted, making it challenging to meet essential living costs including housing, utilities, and basic necessities.

The primary factors contributing to my financial hardship include the circumstances you've described. Despite my efforts to manage expenses and explore additional income sources, I require temporary financial assistance to maintain stability during this challenging period.

I have taken steps to address the situation including budgeting and reducing non-essential expenses, but the gap between my current resources and essential needs remains significant.`,

    employmentCircumstances: `Here's a professional description of your employment situation:

I am currently facing employment challenges that have affected my financial stability. My employment status has changed due to the circumstances you've outlined, impacting my ability to maintain consistent income.

Prior to this situation, I maintained steady employment and have valuable work experience. I am actively pursuing new employment opportunities through job applications, networking, and skill development activities.

My goal is to secure stable employment that will allow me to regain financial independence. I am committed to returning to full-time work and have been exploring opportunities in relevant fields that match my experience and skills.`,

    reasonForApplying: `Here's a clear explanation for your application:

I am applying for social welfare assistance because I am currently experiencing temporary financial hardship that has made it difficult to meet my basic living needs. Despite my best efforts to manage my finances and seek additional income, I require support to ensure stability for myself and my family.

This assistance would provide crucial support during this challenging period, helping me maintain housing, nutrition, and other essential needs while I work toward regaining financial independence.

I am committed to using this support responsibly and am actively working on improving my situation through job searching and financial planning. My goal is to become self-sufficient again as soon as possible.`
  };

  return mockResponses[field] || `Professional response for ${field}: ${userPrompt}`;
};

// Main AI generation function
export const generateAIContent = async (
  userPrompt: string, 
  field: ValidFieldType,
  context?: Record<string, any>
): Promise<AIGenerationResult> => {
  console.log("context", context);
  if (!hasRealApiKey()) {
    console.log('🔧 Using mock AI response (no OpenAI API key configured)');
    return {
      content: generateMockResponse(field, userPrompt, context),
      usage: MOCK_USAGE
    };
  }

  try {    
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: getSystemPrompt(field, context) },
        { role: "user", content: userPrompt }
      ],
      max_tokens: MAX_TOKENS,
      temperature: OPENAI_TEMPERATURE,
      frequency_penalty: OPENAI_FREQUENCY_PENALTY,
      presence_penalty: OPENAI_PRESENCE_PENALTY
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated from OpenAI');
    }

    return {
      content,
      usage: completion.usage ? {
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens,
        totalTokens: completion.usage.total_tokens
      } : undefined
    };
  } catch (error) {
    console.error('🚨 OpenAI API error:', error);
    
    // Fallback to mock response on API error
    console.log('🔄 Falling back to mock response due to API error');
    return {
      content: generateMockResponse(field, userPrompt),
      usage: MOCK_USAGE
    };
  }
}; 