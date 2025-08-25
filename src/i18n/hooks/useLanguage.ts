import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLanguageConfig, type Language } from '../config/languages';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  const language = i18n.language as Language;

  const languageConfig = getLanguageConfig(language);

  const { isRTL, nativeName } = languageConfig;

  const switchLanguage = (newLanguage?: Language) => {
    const targetLanguage = newLanguage || (language === 'en' ? 'ar' : 'en');
    i18n.changeLanguage(targetLanguage);
  };

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
