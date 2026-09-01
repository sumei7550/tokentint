'use client';

import Link from 'next/link';
import { useLanguage, localizedPath } from './LanguageProvider';

export default function Footer() {
  const { locale } = useLanguage();
  const path = (href: string) => localizedPath(href, locale);
  const copy = locale === 'zh-CN'
    ? {
      description: '拾取颜色。构建调色板。交付设计令牌。', product: '产品', extension: 'Chrome 扩展', pricing: '定价', upgrade: '升级',
      resources: '资源', support: '支持', faq: '常见问题', contact: '联系', legal: '法律', privacy: '隐私', terms: '条款', refunds: '退款', rights: '版权所有。',
    }
    : {
      description: 'Pick colors. Build palettes. Ship design tokens.', product: 'Product', extension: 'Chrome Extension', pricing: 'Pricing', upgrade: 'Upgrade',
      resources: 'Resources', support: 'Support', faq: 'FAQ', contact: 'Contact', legal: 'Legal', privacy: 'Privacy', terms: 'Terms', refunds: 'Refunds', rights: 'All rights reserved.',
    };
  const chromeStoreUrl = 'https://chromewebstore.google.com/detail/tokentint-%E2%80%93-color-picker/ifcilnndiaddmoppdpnhboaofffnjmbm?utm_source=website';
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href={path('/')} className="footer-logo" aria-label="TokenTint home">
            <img className="logo-mark" src="/images/brand/icon.png" alt="TokenTint logo" />
              <span>TokenTint</span>
            </Link>
            <p>{copy.description}</p>
          </div>
          <div className="footer-columns">
            <div className="footer-column"><h2>{copy.product}</h2><Link href={chromeStoreUrl}>{copy.extension}</Link><Link href={path('/pricing')}>{copy.pricing}</Link><Link href={path('/upgrade')}>{copy.upgrade}</Link></div>
            <div className="footer-column"><h2>{copy.resources}</h2><Link href={path('/support')}>{copy.support}</Link><Link href={path('/faq')}>{copy.faq}</Link><a href="mailto:support@tokentint.xyz">{copy.contact}</a></div>
            <div className="footer-column"><h2>{copy.legal}</h2><Link href={path('/privacy')}>{copy.privacy}</Link><Link href={path('/terms')}>{copy.terms}</Link><Link href={path('/refunds')}>{copy.refunds}</Link></div>
          </div>
        </div>
        <div className="footer-bottom"><p>&copy; 2026 TokenTint. {copy.rights}</p></div>
      </div>
    </footer>
  );
}
