import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLanguageConfig, type Language } from '../config/languages';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  // Current language
  const language = i18n.language as Language;
  
  // Get language configuration
  const languageConfig = getLanguageConfig(language);
  
  // Extract properties from config
  const { isRTL, nativeName } = languageConfig;

  // Switch language function
  const switchLanguage = (newLanguage?: Language) => {
    const targetLanguage = newLanguage || (language === 'en' ? 'ar' : 'en');
    i18n.changeLanguage(targetLanguage);
  };

  // Update document direction and language when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return {
    language,
    isRTL,
    nativeName,
    languageConfig,
    switchLanguage,
    t,
  };
};

export default useLanguage; 