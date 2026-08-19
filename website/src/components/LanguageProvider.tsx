'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Locale = 'en' | 'zh-CN';

const LanguageContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void } | null>(null);
const STORAGE_KEY = 'tokentint-locale';
const COOKIE_KEY = 'tokentint-locale';

function getBrowserLocale(): Locale {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return languages.some((language) => language.toLowerCase().startsWith('zh')) ? 'zh-CN' : 'en';
}

export function LanguageProvider({ children, initialLocale = 'en' }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const savedLocale: Locale = saved === 'en' || saved === 'zh-CN' ? saved : (initialLocale === 'zh-CN' ? initialLocale : getBrowserLocale());
    setLocaleState(savedLocale);
    document.cookie = `${COOKIE_KEY}=${savedLocale}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = savedLocale;
  }, []);

  const setLocale = (nextLocale: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.cookie = `${COOKIE_KEY}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
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
