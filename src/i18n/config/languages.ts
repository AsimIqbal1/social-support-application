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

export const getLanguageConfig = (language: Language): LanguageConfig => {
  return LANGUAGE_CONFIG[language] || LANGUAGE_CONFIG.en;
};