'use client';

import { useLanguage } from './LanguageProvider';

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  const nextLocale = locale === 'en' ? 'zh-CN' : 'en';
  return (
    <button
      type="button"
      className="language-toggle"
      onClick={() => setLocale(nextLocale)}
      aria-label={locale === 'en' ? '切换至中文' : 'Switch to English'}
    >
      {locale === 'en' ? '中文' : 'EN'}
    </button>
  );
}
