'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export type Locale = 'en' | 'zh-CN';

export function localizedPath(pathname: string, locale: Locale) {
  const englishPath = pathname.replace(/^\/zh-CN(?=\/|$)/, '') || '/';
  return locale === 'zh-CN' ? `/zh-CN${englishPath === '/' ? '' : englishPath}` : englishPath;
}

const LanguageContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void } | null>(null);
const COOKIE_KEY = 'tokentint-locale';

export function LanguageProvider({ children, initialLocale = 'en' }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const pathname = usePathname();

  useEffect(() => {
    const currentPathname = pathname ?? window.location.pathname;
    const isChinesePath = currentPathname === '/zh-CN' || currentPathname.startsWith('/zh-CN/');
    const resolvedLocale: Locale = isChinesePath ? 'zh-CN' : 'en';
    setLocaleState(resolvedLocale);
    document.cookie = `${COOKIE_KEY}=${resolvedLocale}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = resolvedLocale;
  }, [pathname]);

  const setLocale = (nextLocale: Locale) => {
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
