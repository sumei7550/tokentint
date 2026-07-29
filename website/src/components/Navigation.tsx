'use client';

import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from './LanguageProvider';

export default function Navigation() {
  const { locale } = useLanguage();
  const copy = locale === 'zh-CN'
    ? { pricing: '定价', support: '支持' }
    : { pricing: 'Pricing', support: 'Support' };
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link href="/" className="logo">
            TokenTint
          </Link>
          <ul className="nav-links">
            <li><Link href="/pricing">{copy.pricing}</Link></li>
            <li><Link href="/support">{copy.support}</Link></li>
            <li><LanguageToggle /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
