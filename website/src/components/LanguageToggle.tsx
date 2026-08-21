'use client';

import { useLanguage, localizedPath } from './LanguageProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const chooseLocale = (nextLocale: 'en' | 'zh-CN') => {
    const search = window.location.search;
    setLocale(nextLocale);
    router.push(`${localizedPath(pathname ?? '/', nextLocale)}${search}`);
    setOpen(false);
  };

  return (
    <div className="language-menu" ref={wrapperRef}>
      <button
        type="button"
        className="language-toggle"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Choose language"
      >
        <svg className="language-globe" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5S14.2 18.2 12 20.5C9.8 18.2 8.7 15.4 8.7 12S9.8 5.8 12 3.5Z" />
        </svg>
        <span>{locale === 'en' ? 'English' : '中文'}</span>
        <span className="language-chevron" aria-hidden="true" />
      </button>
      {open && (
        <div className="language-dropdown" role="listbox" aria-label="Languages">
          <button type="button" role="option" aria-selected={locale === 'en'} className={locale === 'en' ? 'active' : ''} onClick={() => chooseLocale('en')}>English</button>
          <button type="button" role="option" aria-selected={locale === 'zh-CN'} className={locale === 'zh-CN' ? 'active' : ''} onClick={() => chooseLocale('zh-CN')}>中文</button>
        </div>
      )}
    </div>
  );
}
