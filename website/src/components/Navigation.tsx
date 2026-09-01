'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageToggle from './LanguageToggle';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useLanguage, localizedPath } from './LanguageProvider';

export default function Navigation() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const path = (href: string) => localizedPath(href, locale);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productExpanded, setProductExpanded] = useState(false);
  const productMenuRef = useRef<HTMLLIElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const productToggleRef = useRef<HTMLButtonElement>(null);
  const productLinksRef = useRef<HTMLAnchorElement[]>([]);
  const copy = locale === 'zh-CN'
    ? { product: '产品', features: '功能', pricing: '定价', support: '支持', cta: '添加到 Chrome' }
    : { product: 'Product', features: 'Features', pricing: 'Pricing', support: 'Support', cta: 'Add to Chrome' };
  const productLinks = locale === 'zh-CN'
    ? [
        ['Chrome 取色器', path('/color-picker-chrome-extension')],
        ['网站取色器', path('/website-color-picker')],
        ['设计令牌生成器', path('/design-token-generator')],
        ['Tailwind 颜色生成器', path('/tailwind-color-generator')],
      ]
    : [
        ['Chrome Color Picker', '/color-picker-chrome-extension'],
        ['Website Color Picker', '/website-color-picker'],
        ['Design Token Generator', '/design-token-generator'],
        ['Tailwind Color Generator', '/tailwind-color-generator'],
      ];

  useEffect(() => {
    setProductOpen(false);
    setProductExpanded(false);
  }, [pathname]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!productMenuRef.current?.contains(event.target as Node)) setProductOpen(false);
      if (!mobileMenuRef.current?.contains(event.target as Node)) setMobileMenuOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleProductKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setProductOpen(true);
      if (event.key !== 'Enter') requestAnimationFrame(() => productLinksRef.current[0]?.focus());
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setProductOpen(false);
    }
  };

  const handleProductLinkKeyDown = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setProductOpen(false);
      productToggleRef.current?.focus();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = event.key === 'ArrowDown'
        ? (index + 1) % productLinks.length
        : (index - 1 + productLinks.length) % productLinks.length;
      productLinksRef.current[nextIndex]?.focus();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
            <Link href={path('/')} className="logo" aria-label="TokenTint home">
            <img className="logo-mark" src="/images/brand/icon.png" alt="TokenTint logo" />
            <span>TokenTint <small>DESIGN TOKENS</small></span>
          </Link>
          <ul className="nav-links nav-main-links">
            <li className={`product-menu${productOpen ? ' is-open' : ''}`} ref={productMenuRef}>
              <button
                type="button"
                className="product-toggle"
                aria-haspopup="true"
                aria-expanded={productOpen}
                aria-controls="product-navigation-menu"
                ref={productToggleRef}
                onClick={() => setProductOpen((open) => !open)}
                onKeyDown={handleProductKeyDown}
              >
                {copy.product}<span className="product-chevron" aria-hidden="true" />
              </button>
              <ul className="product-dropdown" id="product-navigation-menu" aria-label={copy.product}>
                {productLinks.map(([label, href], index) => (
                  <li key={href}>
                    <Link href={href} ref={(element) => { if (element) productLinksRef.current[index] = element; }} onKeyDown={(event) => handleProductLinkKeyDown(event, index)} onClick={() => setProductOpen(false)}>{label}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li><a href={`${path('/')}#free-workflow`}>{copy.features}</a></li>
            <li><Link href={path('/pricing')}>{copy.pricing}</Link></li>
            <li><Link href={path('/support')}>{copy.support}</Link></li>
          </ul>
          <ul className="nav-links nav-actions">
            <li><LanguageToggle /></li>
            <li><a href="https://chromewebstore.google.com/detail/tokentint-%E2%80%93-color-picker/ifcilnndiaddmoppdpnhboaofffnjmbm?utm_source=website" className="nav-cta">{copy.cta}</a></li>
          </ul>
          <div className="mobile-nav-controls" ref={mobileMenuRef}>
            <LanguageToggle />
            <button
              type="button"
              className="mobile-menu-toggle"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? '×' : '☰'}
            </button>
            {mobileMenuOpen && (
              <>
                <button type="button" className="mobile-navigation-overlay" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} />
                <div className="mobile-navigation-menu" id="mobile-navigation-menu" aria-label="Mobile navigation">
                <button type="button" className="mobile-product-toggle" aria-expanded={productExpanded} onClick={() => setProductExpanded((expanded) => !expanded)}>
                  {copy.product}<span className="product-chevron" aria-hidden="true" />
                </button>
                <ul className={`mobile-product-links${productExpanded ? ' is-expanded' : ''}`} aria-hidden={!productExpanded}>
                  {productLinks.map(([label, href]) => (
                    <li key={href}><Link href={href} onClick={() => { setProductOpen(false); setMobileMenuOpen(false); }}>{label}</Link></li>
                  ))}
                </ul>
                <a href={`${path('/')}#free-workflow`} onClick={() => setMobileMenuOpen(false)}>{copy.features}</a>
                <Link href={path('/pricing')} onClick={() => setMobileMenuOpen(false)}>{copy.pricing}</Link>
                <Link href={path('/support')} onClick={() => setMobileMenuOpen(false)}>{copy.support}</Link>
                <a href="https://chromewebstore.google.com/detail/tokentint-%E2%80%93-color-picker/ifcilnndiaddmoppdpnhboaofffnjmbm?utm_source=website" className="mobile-nav-cta" onClick={() => setMobileMenuOpen(false)}>{copy.cta}</a>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
