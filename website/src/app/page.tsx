'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { localizedPath, useLanguage } from '@/components/LanguageProvider';
import PricingCard from '@/components/PricingCard';

const chromeStoreUrl = 'https://chromewebstore.google.com/detail/tokentint-%E2%80%93-color-picker/ifcilnndiaddmoppdpnhboaofffnjmbm?utm_source=website';

const content = {
  en: {
    hero: { kicker: 'Chrome color picker for design tokens', title: ['Pick colors from websites.', 'Ship usable tokens.'], subtitle: 'TokenTint is a Chrome extension that captures colors from any webpage, saves them to project palettes, and exports CSS Variables, Tailwind Config, or W3C Design Tokens.', primary: 'Add to Chrome — Free', secondary: 'See how it works', note: 'No account required · Free features work offline', alt: 'TokenTint Chrome extension showing color picking, projects, tokens, and history' },
    free: { eyebrow: 'FREE FOR OCCASIONAL WORK', title: 'Pick → Review → Save', description: 'For designers and developers who need to collect a few colors while browsing and keep them ready for the next task.', steps: [['01', 'Pick Color', 'Pick colors directly from webpages in HEX, RGB, or HSL.', '/images/screenshots/pick-color-free2.png', 'TokenTint Pick Color interface'], ['02', 'Review History', 'Keep the last 20 colors together instead of losing them in copied notes.', '/images/screenshots/20-history.png', 'TokenTint color history interface'], ['03', 'Save to Project', 'Build one reusable project palette and export CSS Variables when ready.', '/images/screenshots/project-add-token-free.png', 'TokenTint project tokens interface']] },
    pro: { eyebrow: 'PRO FOR REPEATED WORK', title: 'Extract → Organize → Export', description: 'For competitor research, brand work, and design token workflows: scan pages faster, manage multiple palettes, and hand code-ready color tokens to development.', steps: [['01', 'Extract Colors', 'Extract key colors from a webpage instead of picking them one by one.', '/images/screenshots/extract-colors-pro3.png', 'TokenTint Extract Colors interface'], ['02', 'Organize Projects', 'Keep separate palettes for different sites, brands, and products.', '/images/screenshots/project-more-pro2.png', 'TokenTint multiple projects interface'], ['03', 'Export Tokens', 'Export CSS Variables, Tailwind Config, or W3C Design Tokens for your codebase.', '/images/screenshots/export-more-pro.png', 'TokenTint W3C Design Tokens export']] },
    pricing: { title: 'Start free. Upgrade when you need more.', free: { title: 'Free', features: ['Pick colors from webpages', 'HEX, RGB, and HSL formats', 'Save colors to projects', '20-color history', 'CSS Variables export'], cta: 'Add to Chrome' }, pro: { title: 'Pro', billing: 'one-time', features: ['Everything in Free', 'Extract key colors from webpages', 'Multiple project palettes', 'Tailwind Config export', 'W3C Design Tokens export'], cta: 'Get Pro' } }
  },
  'zh-CN': {
    hero: { kicker: 'Chrome 颜色工作流扩展', title: ['拾取颜色。', '整理并导出令牌。'], subtitle: '从任意网页拾取颜色，整理成项目调色板，并导出可直接用于开发的 CSS、Tailwind 或 W3C 颜色令牌。', primary: '添加到 Chrome', secondary: '了解工作方式', note: '免费开始 · 无需账户', alt: 'TokenTint Chrome 扩展，展示取色、项目、令牌和历史记录' },
    free: { eyebrow: '免费工作流', title: '拾取 → 查看 → 保存', description: '浏览网页时，专注收集真正需要的颜色。', steps: [['01', '拾取颜色', '直接从网页中取色，并选择 HEX、RGB 或 HSL 格式。', '/images/screenshots/pick-color-free.png', 'TokenTint 拾取颜色界面'], ['02', '历史记录', '先查看最近 20 个颜色，再将需要的颜色加入项目。', '/images/screenshots/20-history.png', 'TokenTint 颜色历史记录'], ['03', '保存到项目', '将重要颜色保存到项目调色板中，并在准备好后导出为 CSS 变量。', '/images/screenshots/project-add-token-free.png', 'TokenTint 项目令牌界面']] },
    pro: { eyebrow: '专业版工作流', title: '提取 → 整理 → 导出', description: '将网页颜色整理为可复用项目调色板，管理多个项目，并导出可用于开发的颜色变量。', steps: [['01', '提取颜色', '扫描当前网页中的关键颜色，无需逐个拾取。', '/images/screenshots/extract-colors-pro3.png', 'TokenTint 提取颜色界面'], ['02', '整理项目', '为不同网站、品牌或设计方向管理和切换项目调色板。', '/images/screenshots/project-more-pro2.png', 'TokenTint 多项目界面'], ['03', '导出令牌', '将项目调色板导出为 CSS、Tailwind 配置或 W3C 设计令牌。', '/images/screenshots/export-more-pro.png', 'TokenTint 颜色令牌导出']] },
    pricing: { title: '免费开始，按需升级。', free: { title: '免费版', features: ['从任意网页拾取颜色', 'HEX、RGB 和 HSL 格式', '项目令牌', '20 色历史记录', 'CSS 变量导出'], cta: '添加到 Chrome' }, pro: { title: '专业版', billing: '一次性付款', features: ['免费版全部功能', '提取页面关键颜色', '多个项目调色板', 'Tailwind 配置导出', 'W3C 令牌导出'], cta: '获取专业版' } }
  }
} as const;

type Step = readonly [string, string, string, string, string];
type WorkflowData = { eyebrow: string; title: string; description: string; steps: readonly Step[] };

function ExportExample({ locale }: { locale: 'en' | 'zh-CN' }) {
  const path = (href: string) => localizedPath(href, locale);
  return <section className="export-example"><div className="container export-example-grid"><div><p className="eyebrow">{locale === 'zh-CN' ? '从颜色到代码' : 'FROM COLOR TO CODE'}</p><h2>{locale === 'zh-CN' ? '导出结果可以直接带进你的工作流。' : 'See the output before you upgrade.'}</h2><p>{locale === 'zh-CN' ? '先从真实网页采集颜色，再将项目调色板导出为开发者可以继续处理的格式。' : 'Capture colors from a real interface, then take a project palette into the format your codebase already uses.'}</p><div className="export-example-actions"><Link href={path('/pricing')} className="cta-button">{locale === 'zh-CN' ? '查看方案' : 'Compare plans'}</Link><Link href={path('/design-token-generator')} className="cta-secondary">{locale === 'zh-CN' ? '查看令牌页面' : 'Explore token exports'}</Link></div></div><div className="export-code-card"><div className="export-code-top"><span>CSS Variables</span><span>TokenTint export</span></div><pre><code>{`:root {\n  --color-brand: #635BFF;\n  --color-surface: #F7F8FB;\n  --color-text: #10131A;\n}`}</code></pre><div className="export-code-footer">{locale === 'zh-CN' ? 'Pro 还支持 Tailwind Config 和 W3C Design Tokens' : 'Pro also exports Tailwind Config and W3C Design Tokens'}</div></div></div></section>;
}

function WorkflowSection({ kind, data }: { kind: 'free' | 'pro'; data: WorkflowData }) {
  const { locale } = useLanguage();
  const offer = kind === 'pro' ? (locale === 'zh-CN' ? '专业版 · $15 一次性购买' : 'Pro · $15 one-time purchase') : undefined;
  return <section className={`workflow-section workflow-${kind}`} id={kind === 'free' ? 'free-workflow' : 'pro-workflow'}><div className="container"><div className="workflow-heading"><p className="eyebrow">{data.eyebrow}</p><h2>{data.title}</h2><p>{data.description}</p>{offer && <p className="workflow-offer">{offer}</p>}</div><div className="workflow-grid">{data.steps.map(([number, title, description, image, alt]: Step) => <article className="workflow-card" key={title}><div className="workflow-card-copy"><span className="workflow-number">{number}</span><h3>{title}</h3><p>{description}</p></div><div className="workflow-card-media"><img src={image} alt={alt} /></div></article>)}</div></div></section>;
}

export default function Home() {
  const { locale } = useLanguage();
  const copy = content[locale];
  const softwareApplicationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TokenTint',
    applicationCategory: 'BrowserExtension',
    operatingSystem: 'Chrome',
    url: `https://www.tokentint.xyz${locale === 'zh-CN' ? '/zh-CN' : '/'}`,
    description: locale === 'zh-CN' ? '用于从网页取色、整理项目调色板并导出设计令牌的 Chrome 扩展。' : 'A Chrome extension for picking colors, organizing project palettes, and exporting design tokens.',
    offers: [
      { '@type': 'Offer', name: 'TokenTint Free', price: '0', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'TokenTint Pro', price: '15', priceCurrency: 'USD', description: locale === 'zh-CN' ? '一次性购买。' : 'One-time purchase.' },
    ],
  };
  return <><Navigation /><main><section className="hero"><div className="container hero-grid"><div className="hero-copy"><p className="hero-kicker">{copy.hero.kicker}</p><h1><span>{copy.hero.title[0]}</span><span className="hero-accent">{copy.hero.title[1]}</span></h1><p className="hero-sub">{copy.hero.subtitle}</p><div className="hero-ctas"><Link href={chromeStoreUrl} className="cta-button">{copy.hero.primary}</Link><a href="#free-workflow" className="cta-secondary">{copy.hero.secondary}</a></div><p className="hero-note"><span>●</span>{copy.hero.note}</p></div><div className="hero-product-shot"><img src="/images/screenshots/pick-color-free.png" alt={copy.hero.alt} /></div></div></section><WorkflowSection kind="free" data={copy.free} /><WorkflowSection kind="pro" data={copy.pro} /><ExportExample locale={locale} /><section className="pricing"><div className="container"><div className="section-heading"><p className="eyebrow">{locale === 'zh-CN' ? '按你的工作方式选择' : 'CHOOSE YOUR WORKFLOW'}</p><h2>{copy.pricing.title}</h2></div><div className="pricing-cards"><PricingCard title={copy.pricing.free.title} price="$0" features={copy.pricing.free.features} cta={copy.pricing.free.cta} href={chromeStoreUrl} headingLevel="h3" /><PricingCard title={copy.pricing.pro.title} price="$15" billing={copy.pricing.pro.billing} features={copy.pricing.pro.features} cta={copy.pricing.pro.cta} href={localizedPath('/upgrade', locale)} featured headingLevel="h3" /></div></div></section></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }} /></>;
}
