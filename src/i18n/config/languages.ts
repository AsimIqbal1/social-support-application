
export type Language = 'en' | 'ar';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  isRTL: boolean;
}

export const LANGUAGE_CONFIG: Record<Language, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    isRTL: false,
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    isRTL: true,
  },
};

// Helper function to get language config
export const getLanguageConfig = (language: Language): LanguageConfig => {
  return LANGUAGE_CONFIG[language] || LANGUAGE_CONFIG.en; // fallback to English
};

// Get all supported languages
export const getSupportedLanguages = (): LanguageConfig[] => {
  return Object.values(LANGUAGE_CONFIG);
};

// Check if a language is supported
export const isLanguageSupported = (language: string): language is Language => {
  return language in LANGUAGE_CONFIG;
};