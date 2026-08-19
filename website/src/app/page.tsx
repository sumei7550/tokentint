'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import PricingCard from '@/components/PricingCard';

const chromeStoreUrl =
  'https://chromewebstore.google.com/detail/tokentint-%E2%80%93-color-picker/ifcilnndiaddmoppdpnhboaofffnjmbm';

const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TokenTint',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Chrome',
  url: 'https://www.tokentint.xyz/',
  description:
    'Pick colors from any website, save palettes, and export CSS variables, Tailwind config, or W3C design tokens. Chrome extension for developers and designers.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'USD',
      url: chromeStoreUrl,
    },
    {
      '@type': 'Offer',
      name: 'Pro (Lifetime)',
      price: '15',
      priceCurrency: 'USD',
      url: 'https://www.tokentint.xyz/pricing',
    },
  ],
  publisher: {
    '@type': 'Organization',
    name: 'TokenTint',
    url: 'https://www.tokentint.xyz/',
  },
};

const homepageCopy = {
  en: {
    hero: {
      kicker: 'Chrome color picker',
      headline: ['Pick colors from', 'any website.', 'Ship them.'],
      subtitle: 'Pick website colors, build palettes, and export design tokens.',
      primaryCta: 'Add to Chrome',
      secondaryCta: 'See how it works',
      note: 'Free to start · No account required',
      imageAlt: 'TokenTint color picker with Pick Color, format selector, project colors, and color history',
    },
    workflow: {
      eyebrow: 'A faster handoff',
      title: 'From first click to final token.',
      steps: [
        {
          label: '01 / PICK',
          title: 'Pick colors directly from any webpage.',
          description: 'Sample the colors you see while you browse, build, and gather visual references.',
          mediaAlt: 'TokenTint picking a color from a webpage',
        },
        {
          label: '02 / ORGANIZE',
          title: 'Save the colors that matter.',
          description: 'Keep discovered colors together in project palettes, ready to revisit when the work moves forward.',
        },
        {
          label: '03 / EXPORT',
          title: 'Turn a palette into production assets.',
          description: 'Export CSS Variables, Tailwind Config, and W3C Design Tokens for the stack you already use.',
        },
      ],
    },
    features: {
      eyebrow: 'Built for the people behind the product',
      title: 'One color workflow, three ways to move work forward.',
      items: [
        { title: 'Developers', description: 'Capture colors from the browser and move from a visual reference to CSS Variables or Tailwind without manual retyping.' },
        { title: 'Designers', description: 'Turn live-site inspiration and scattered references into organized project palettes you can revisit and share.' },
        { title: 'Design system teams', description: 'Export W3C Design Tokens to connect the colors in your source of truth with the code your team ships.' },
      ],
    },
    pricing: {
      title: 'Simple Pricing',
      free: {
        title: 'Free',
        features: ['Pick colors with EyeDropper', 'HEX/RGB/HSL formats', '20-color history', 'Single project palette', 'CSS Variables export', 'Dark/light mode'],
        cta: 'Add to Chrome',
      },
      pro: {
        title: 'Pro',
        billing: 'one-time',
        features: ['Everything in Free', 'Extract page colors', 'Multiple projects', 'Tailwind config export', 'W3C Design Tokens export'],
        cta: 'Upgrade to Pro',
      },
    },
  },
  'zh-CN': {
    hero: {
      kicker: 'Chrome 取色器',
      headline: ['从任意网站', '拾取颜色。', '立即交付。'],
      subtitle: '拾取网站颜色、创建调色板，并导出设计令牌。',
      primaryCta: '添加到 Chrome',
      secondaryCta: '了解工作方式',
      note: '免费开始 · 无需账户',
      imageAlt: 'TokenTint 取色器，包含取色、格式选择、项目颜色和颜色历史记录',
    },
    workflow: {
      eyebrow: '更快完成交接',
      title: '从第一次点击到最终令牌。',
      steps: [
        {
          label: '01 / PICK',
          title: '直接从任意网页拾取颜色。',
          description: '浏览、构建和收集视觉参考时，随手采样你看到的颜色。',
          mediaAlt: 'TokenTint 从网页中拾取颜色',
        },
        {
          label: '02 / ORGANIZE',
          title: '保存真正重要的颜色。',
          description: '将发现的颜色整理到项目调色板中，方便工作推进后再次查看。',
        },
        {
          label: '03 / EXPORT',
          title: '将调色板转化为生产资源。',
          description: '为你正在使用的技术栈导出 CSS Variables、Tailwind Config 和 W3C Design Tokens。',
        },
      ],
    },
    features: {
      eyebrow: '为产品背后的团队而生',
      title: '一套颜色工作流，三种推进工作的方式。',
      items: [
        { title: '开发者', description: '从浏览器中捕获颜色，将视觉参考直接转换为 CSS Variables 或 Tailwind，无需手动重复输入。' },
        { title: '设计师', description: '将真实网站的灵感和零散参考整理成项目调色板，方便回顾和分享。' },
        { title: '设计系统团队', description: '导出 W3C Design Tokens，让权威色彩来源与团队交付的代码保持连接。' },
      ],
    },
    pricing: {
      title: '简洁定价',
      free: {
        title: '免费版',
        features: ['使用 EyeDropper 取色', 'HEX/RGB/HSL 格式', '20 色历史记录', '单个项目调色板', 'CSS Variables 导出', '深色/浅色模式'],
        cta: '添加到 Chrome',
      },
      pro: {
        title: '专业版',
        billing: '一次性付款',
        features: ['免费版全部功能', '提取页面颜色', '多个项目', 'Tailwind 配置导出', 'W3C Design Tokens 导出'],
        cta: '升级到专业版',
      },
    },
  },
} as const;

export default function Home() {
  const { locale } = useLanguage();
  const copy = homepageCopy[locale];

  return (
    <>
      <Navigation />

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="hero-kicker">{copy.hero.kicker}</p>
                <h1>
                  <span className="hero-headline-line">{copy.hero.headline[0]}</span>
                  <span className="hero-headline-line">{copy.hero.headline[1]}</span>
                  <span className="hero-headline-line hero-headline-accent">{copy.hero.headline[2]}</span>
                </h1>
                <p className="hero-sub">{copy.hero.subtitle}</p>
                <div className="hero-ctas">
                  <Link href={chromeStoreUrl} className="cta-button">{copy.hero.primaryCta}</Link>
                  <a href="#workflow" className="cta-secondary">{copy.hero.secondaryCta}</a>
                </div>
                <p className="hero-note"><span>●</span> {copy.hero.note}</p>
              </div>
              <div className="hero-demo-wrap">
                <div className="hero-demo-glow" />
                <div className="hero-site-backdrop" aria-hidden="true">
                  <img src="/product/website-context.png" alt="" />
                </div>
                <div className="hero-popup-card">
                  <img
                    className="hero-demo"
                    src="/product/hero-popup.png"
                    alt={copy.hero.imageAlt}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="workflow-showcase" id="workflow">
          <div className="container">
            <div className="workflow-intro showcase-intro">
              <p className="eyebrow">{copy.workflow.eyebrow}</p>
              <h2>{copy.workflow.title}</h2>
            </div>
            <div className="showcase-rows">
              <article className="showcase-row">
                <div className="showcase-copy"><span className="showcase-number">{copy.workflow.steps[0].label}</span><h3>{copy.workflow.steps[0].title}</h3><p>{copy.workflow.steps[0].description}</p></div>
                <div className="showcase-image"><video autoPlay muted loop playsInline preload="metadata" poster="/product/popup.png" aria-label={copy.workflow.steps[0].mediaAlt}><source src="/product/hero-demo.mp4" type="video/mp4" /></video></div>
              </article>
              <article className="showcase-row showcase-row-reverse">
                <div className="showcase-copy"><span className="showcase-number">{copy.workflow.steps[1].label}</span><h3>{copy.workflow.steps[1].title}</h3><p>{copy.workflow.steps[1].description}</p></div>
                <div className="showcase-image"><img src="/product/palette.png" alt="TokenTint project palette with organized colors" /></div>
              </article>
              <article className="showcase-row">
                <div className="showcase-copy"><span className="showcase-number">{copy.workflow.steps[2].label}</span><h3>{copy.workflow.steps[2].title}</h3><p>{copy.workflow.steps[2].description}</p></div>
                <div className="showcase-image"><img src="/product/export.png" alt="TokenTint export options for CSS Variables, Tailwind, and W3C Design Tokens" /></div>
              </article>
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <div className="container">
            <p className="eyebrow features-eyebrow">{copy.features.eyebrow}</p>
            <h2>{copy.features.title}</h2>
            <div className="features-grid">
              {copy.features.items.map((feature) => (
                <div className="feature" key={feature.title}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pricing">
          <div className="container">
            <h2>{copy.pricing.title}</h2>
            <div className="pricing-cards">
              <PricingCard title={copy.pricing.free.title} price="$0" features={copy.pricing.free.features} cta={copy.pricing.free.cta} href={chromeStoreUrl} headingLevel="h3" />
              <PricingCard title={copy.pricing.pro.title} price="$15" billing={copy.pricing.pro.billing} features={copy.pricing.pro.features} cta={copy.pricing.pro.cta} href="/upgrade" featured headingLevel="h3" />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
    </>
  );
}
