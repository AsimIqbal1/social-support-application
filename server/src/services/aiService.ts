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
  const basePrompt = `You are helping someone write their social welfare application. You must write content FROM THE APPLICANT'S PERSPECTIVE that they will submit in their application form.

CRITICAL ROLE:
- You are writing AS THE APPLICANT (the person applying for help)
- The user will copy-paste your response into their application form
- Use the provided context about their situation to create personalized content
- DO NOT ask for more information - write based on what's provided
- DO NOT respond as a case worker or evaluator
- Write as if YOU are the person seeking assistance

FORMATTING RULES:
- Generate ONLY the main content/body text for the application
- NO letter headers, subjects, salutations ("Dear Sir"), or closings ("Sincerely")
- Write direct, professional paragraphs ready for form submission
- Keep responses under 800 characters
- Use first person: "I am experiencing..." (you ARE the applicant)
- Create content ready for copy-paste into application forms`;

  const contextString = buildContextString(context);
  
  const fieldSpecificPrompts: Record<ValidFieldType, string> = {
    currentFinancialSituation: `${basePrompt}

Write as the applicant describing YOUR current financial hardship professionally while maintaining dignity.
Describe YOUR current income, expenses, and financial challenges using the context provided.
Write in first person as someone experiencing these difficulties. ${contextString}`,

    employmentCircumstances: `${basePrompt}

Write as the applicant explaining YOUR employment challenges constructively.
Describe YOUR employment status, recent changes, and efforts to find work using the context provided.
Present YOUR situation positively while being honest about challenges. ${contextString}`,

    reasonForApplying: `${basePrompt}

Write as the applicant articulating YOUR need for assistance clearly and respectfully.
Explain why YOU need support and how it will help YOU using the context provided.
Emphasize that YOU view this as temporary assistance and YOUR commitment to self-sufficiency. ${contextString}`
  };

  return fieldSpecificPrompts[field];
};

// Mock AI response for development/testing
export const generateMockResponse = (field: ValidFieldType, userPrompt: string, context?: Record<string, any>): string => {
  const mockResponses: Record<ValidFieldType, string> = {
    currentFinancialSituation: `I am currently experiencing financial difficulties due to reduced income and increased expenses. My monthly income has been significantly impacted, making it challenging to meet essential living costs including housing, utilities, and basic necessities.

The primary factors contributing to my financial hardship include recent changes in my employment situation. Despite my efforts to manage expenses and explore additional income sources, I require temporary financial assistance to maintain stability during this challenging period.

I have taken steps to address the situation including budgeting and reducing non-essential expenses, but the gap between my current resources and essential needs remains significant.`,

    employmentCircumstances: `I am currently facing employment challenges that have affected my financial stability. My employment status has changed, impacting my ability to maintain consistent income.

Prior to this situation, I maintained steady employment and have valuable work experience. I am actively pursuing new employment opportunities through job applications, networking, and skill development activities.

My goal is to secure stable employment that will allow me to regain financial independence. I am committed to returning to full-time work and have been exploring opportunities in relevant fields that match my experience and skills.`,

    reasonForApplying: `I am applying for social welfare assistance because I am currently experiencing temporary financial hardship that has made it difficult to meet my basic living needs. Despite my best efforts to manage my finances and seek additional income, I require support to ensure stability for myself and my family.

This assistance would provide crucial support during this challenging period, helping me maintain housing, nutrition, and other essential needs while I work toward regaining financial independence.

I am committed to using this support responsibly and am actively working on improving my situation through job searching and financial planning. My goal is to become self-sufficient again as soon as possible.`
  };

  return mockResponses[field] || `I am seeking assistance with ${field}. ${userPrompt} I would appreciate your consideration of my application for support during this challenging time.`;
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