'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Locale = 'en' | 'zh-CN';

const LanguageContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void } | null>(null);
const STORAGE_KEY = 'tokentint-locale';

function getBrowserLocale(): Locale {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return languages.some((language) => language.toLowerCase().startsWith('zh')) ? 'zh-CN' : 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const initialLocale: Locale = saved === 'en' || saved === 'zh-CN' ? saved : getBrowserLocale();
    setLocaleState(initialLocale);
    document.documentElement.lang = initialLocale;
  }, []);

  const setLocale = (nextLocale: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    setLocaleState(nextLocale);
    document.documentElement.lang = nextLocale;
  };

  return <LanguageContext.Provider value={{ locale, setLocale }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
