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
export const getSystemPrompt = (field: ValidFieldType, language: 'en' | 'ar', context?: Record<string, any>): string => {
  const languageInstructions = language === 'ar' 
    ? 'You MUST write your response in Arabic language only. Use proper Arabic grammar and vocabulary.'
    : 'You MUST write your response in English language only.';

  const basePrompt = `You are helping someone write their social welfare application. You must write content FROM THE APPLICANT'S PERSPECTIVE that they will submit in their application form.

CRITICAL ROLE:
- You are writing AS THE APPLICANT (the person applying for help)
- The user will copy-paste your response into their application form
- Use the provided context about their situation to create personalized content
- DO NOT ask for more information - write based on what's provided
- DO NOT respond as a case worker or evaluator
- Write as if YOU are the person seeking assistance

LANGUAGE RULES:
${languageInstructions}

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
export const generateMockResponse = (field: ValidFieldType, language: 'en' | 'ar', context?: Record<string, any>): string => {
  const contextInfo = context ? 
    ` (Based on your context: ${Object.entries(context).map(([key, value]) => `${key}: ${value}`).join(', ')})` : 
    '';

  const mockResponses = {
    en: {
      currentFinancialSituation: `I am currently facing significant financial hardship due to limited income sources. My monthly income of ${context?.monthlyIncome || 'minimal amount'} is insufficient to cover basic living expenses including housing, utilities, and food costs. With ${context?.dependents || 'family members'} depending on me, I am struggling to meet our essential needs and require assistance to maintain a stable living situation.${contextInfo}`,
      
      employmentCircumstances: `I am currently ${context?.employmentStatus || 'seeking employment opportunities'} and face challenges in securing stable work. Despite my efforts to find employment, I encounter barriers that prevent me from achieving financial stability. I am committed to improving my employment situation and would benefit from support during this transitional period.${contextInfo}`,
      
      reasonForApplying: `I am applying for social support because my current financial situation prevents me from meeting basic needs for myself and my family. This assistance would provide crucial support while I work towards improving my circumstances. I view this as temporary help that will enable me to achieve greater stability and self-sufficiency.${contextInfo}`,
    },
    ar: {
      currentFinancialSituation: `أواجه حاليًا صعوبات مالية كبيرة بسبب محدودية مصادر الدخل. راتبي الشهري البالغ ${context?.monthlyIncome || 'مبلغ محدود'} درهم غير كافٍ لتغطية النفقات الأساسية للمعيشة بما في ذلك السكن والمرافق والطعام. مع وجود ${context?.dependents || 'أفراد العائلة'} يعتمدون علي، أكافح لتلبية احتياجاتنا الأساسية وأحتاج إلى المساعدة للحفاظ على وضع معيشي مستقر.${contextInfo}`,
      
      employmentCircumstances: `أنا حاليًا ${context?.employmentStatus === 'employed' ? 'موظف' : context?.employmentStatus === 'unemployed' ? 'عاطل عن العمل' : 'أبحث عن فرص عمل'} وأواجه تحديات في الحصول على عمل مستقر. رغم جهودي للعثور على عمل، أواجه عوائق تمنعني من تحقيق الاستقرار المالي. أنا ملتزم بتحسين وضعي الوظيفي وسأستفيد من الدعم خلال هذه الفترة الانتقالية.${contextInfo}`,
      
      reasonForApplying: `أتقدم بطلب للحصول على الدعم الاجتماعي لأن وضعي المالي الحالي يمنعني من تلبية الاحتياجات الأساسية لي ولعائلتي. هذه المساعدة ستوفر دعمًا حيويًا بينما أعمل على تحسين ظروفي. أنظر إلى هذا كمساعدة مؤقتة ستمكنني من تحقيق استقرار أكبر والاعتماد على الذات.${contextInfo}`,
    }
  };

  return mockResponses[language][field];
};

// Main AI generation function
export const generateAIContent = async (
  userPrompt: string,
  field: ValidFieldType,
  language: 'en' | 'ar',
  context?: Record<string, any>
): Promise<AIGenerationResult> => {
  console.log(`🤖 Generating AI content for field: ${field}, language: ${language}`);
  
  // Mock response if no real API key
  if (!hasRealApiKey()) {
    console.log('📝 Using mock response (no API key)');
    return {
      content: generateMockResponse(field, language, context),
      usage: MOCK_USAGE
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: getSystemPrompt(field, language, context) },
        { role: "user", content: userPrompt }
      ],
      max_tokens: MAX_TOKENS,
      temperature: OPENAI_TEMPERATURE,
      frequency_penalty: OPENAI_FREQUENCY_PENALTY,
      presence_penalty: OPENAI_PRESENCE_PENALTY,
    });

    const content = completion.choices[0]?.message?.content || '';
    const usage = completion.usage ? {
      promptTokens: completion.usage.prompt_tokens,
      completionTokens: completion.usage.completion_tokens,
      totalTokens: completion.usage.total_tokens
    } : MOCK_USAGE;

    console.log(`✅ AI content generated successfully, tokens used: ${usage.totalTokens}`);
    
    return { content, usage };
  } catch (error) {
    console.error('❌ OpenAI API error:', error);
    
    // Fallback to mock response on API error
    console.log('📝 Falling back to mock response due to API error');
    return {
      content: generateMockResponse(field, language, context),
      usage: MOCK_USAGE
    };
  }
}; 