'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export default function Footer() {
  const { locale } = useLanguage();
  const copy = locale === 'zh-CN'
    ? { privacy: '隐私', terms: '条款', refunds: '退款', support: '支持', rights: '版权所有。' }
    : { privacy: 'Privacy', terms: 'Terms', refunds: 'Refunds', support: 'Support', rights: 'All rights reserved.' };
  return (
    <footer className="footer">
      <div className="container">
        <ul className="footer-links">
          <li><Link href="/privacy">{copy.privacy}</Link></li>
          <li><Link href="/terms">{copy.terms}</Link></li>
          <li><Link href="/refunds">{copy.refunds}</Link></li>
          <li><Link href="/support">{copy.support}</Link></li>
        </ul>
        <p>&copy; {new Date().getFullYear()} TokenTint. {copy.rights}</p>
      </div>
    </footer>
  );
}
