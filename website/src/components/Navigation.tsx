'use client';

import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from './LanguageProvider';

export default function Navigation() {
  const { locale } = useLanguage();
  const copy = locale === 'zh-CN'
    ? { product: '产品', features: '功能', pricing: '定价', support: '支持', cta: '添加到 Chrome' }
    : { product: 'Product', features: 'Features', pricing: 'Pricing', support: 'Support', cta: 'Add to Chrome' };
  const productLinks = locale === 'zh-CN'
    ? [
        ['Chrome 取色器', '/color-picker-chrome-extension'],
        ['网站取色器', '/website-color-picker'],
        ['设计令牌生成器', '/design-token-generator'],
        ['Tailwind 颜色生成器', '/tailwind-color-generator'],
      ]
    : [
        ['Chrome Color Picker', '/color-picker-chrome-extension'],
        ['Website Color Picker', '/website-color-picker'],
        ['Design Token Generator', '/design-token-generator'],
        ['Tailwind Color Generator', '/tailwind-color-generator'],
      ];

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link href="/" className="logo" aria-label="TokenTint home">
            <img className="logo-mark" src="/icon.svg" alt="" />
            <span>TokenTint <small>DESIGN TOKENS</small></span>
          </Link>
          <ul className="nav-links nav-main-links">
            <li className="product-menu">
              <button
                type="button"
                className="product-toggle"
                aria-haspopup="true"
                aria-expanded="false"
                tabIndex={-1}
              >
                {copy.product}<span className="product-chevron" aria-hidden="true" />
              </button>
              <ul className="product-dropdown">
                {productLinks.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li><a href="/#workflow">{copy.features}</a></li>
            <li><Link href="/pricing">{copy.pricing}</Link></li>
            <li><Link href="/support">{copy.support}</Link></li>
          </ul>
          <ul className="nav-links nav-actions">
            <li><LanguageToggle /></li>
            <li><a href="https://chromewebstore.google.com/detail/tokentint-%E2%80%93-color-picker/ifcilnndiaddmoppdpnhboaofffnjmbm" className="nav-cta">{copy.cta}</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
