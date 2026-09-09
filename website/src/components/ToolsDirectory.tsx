'use client';

import Link from 'next/link';
import Navigation from './Navigation';
import Footer from './Footer';
import { chromeStoreUrl } from './SeoLandingPage';
import { localizedPath, useLanguage } from './LanguageProvider';

const tools = [
  {
    href: '/color-picker-chrome-extension', number: '01', tier: 'Free',
    en: { title: 'Chrome Color Picker', description: 'Pick a color from any webpage, copy HEX, RGB, or HSL, and keep the last 20 colors in history.', action: 'Pick webpage colors' },
    zh: { title: 'Chrome 网页取色器', description: '从网页拾取颜色，复制 HEX、RGB 或 HSL，并在历史记录中保留最近 20 个颜色。', action: '从网页取色' },
  },
  {
    href: '/website-color-picker', number: '02', tier: 'Free + Pro',
    en: { title: 'Website Palette Extractor', description: 'Collect brand colors from a reference site and organize a palette for competitor research or a redesign.', action: 'Extract a website palette' },
    zh: { title: '网站调色板提取器', description: '从参考网站采集品牌色，为竞品研究、品牌分析或改版整理调色板。', action: '提取网站调色板' },
  },
  {
    href: '/css-variables-generator', number: '03', tier: 'Free',
    en: { title: 'CSS Variables Generator', description: 'Turn the website colors you selected into reusable CSS custom properties for your stylesheet.', action: 'Export CSS Variables' },
    zh: { title: 'CSS Variables 生成器', description: '将选定的网站颜色转换成样式表可以继续使用的 CSS 自定义属性。', action: '导出 CSS Variables' },
  },
  {
    href: '/tailwind-color-generator', number: '04', tier: 'Pro',
    en: { title: 'Tailwind-ready Palette', description: 'Carry collected website colors into a Tailwind Config starting point without inventing an automatic shade scale.', action: 'Create a Tailwind palette' },
    zh: { title: 'Tailwind-ready 调色板', description: '将采集的网站颜色导出为 Tailwind Config 起点，同时保留对名称和色阶的控制。', action: '创建 Tailwind 调色板' },
  },
  {
    href: '/design-token-generator', number: '05', tier: 'Pro',
    en: { title: 'Color Design Tokens', description: 'Group interface colors in a project and export a W3C Design Tokens starting point for your design system.', action: 'Export color tokens' },
    zh: { title: '颜色设计令牌', description: '在项目中整理界面颜色，并导出适合设计系统继续处理的 W3C Design Tokens。', action: '导出颜色令牌' },
  },
] as const;

export default function ToolsDirectory() {
  const { locale } = useLanguage();
  const isChinese = locale === 'zh-CN';
  const path = (href: string) => localizedPath(href, locale);
  const itemListJsonLd = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: isChinese ? 'TokenTint 颜色工作流工具' : 'TokenTint color workflow tools',
    itemListElement: tools.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: (isChinese ? tool.zh : tool.en).title, url: `https://www.tokentint.xyz${path(tool.href)}` })),
  };

  return <>
    <Navigation />
    <main className="tools-directory">
      <section className="tools-directory-hero"><div className="container">
        <p className="eyebrow">{isChinese ? '从网页颜色到可用代码' : 'FROM WEBSITE COLOR TO USABLE CODE'} <span>●</span></p>
        <h1>{isChinese ? '选择适合你的颜色工作流' : 'Choose the color workflow you need.'}</h1>
        <p>{isChinese ? '从网页取色和品牌调色板研究开始，再将选定颜色导出为 CSS Variables、Tailwind Config 或 W3C Design Tokens。' : 'Start with webpage color picking or brand-palette research, then carry the colors you selected into CSS Variables, Tailwind Config, or W3C Design Tokens.'}</p>
        <a href={chromeStoreUrl} className="cta-button" data-analytics-location="tools_hero">{isChinese ? '添加到 Chrome — 免费' : 'Add to Chrome — Free'}</a>
      </div></section>

      <section className="tools-directory-list"><div className="container">
        <div className="tools-directory-heading"><p className="eyebrow">{isChinese ? '五个明确入口' : 'FIVE FOCUSED PATHS'}</p><h2>{isChinese ? '先选择任务，再选择输出。' : 'Choose the task first, then the output.'}</h2></div>
        <div className="tools-directory-grid">{tools.map((tool) => { const copy = isChinese ? tool.zh : tool.en; return <article className="tools-directory-card" key={tool.href}>
          <div className="tools-directory-card-top"><span>{tool.number}</span><span>{tool.tier}</span></div>
          <h3>{copy.title}</h3><p>{copy.description}</p><Link href={path(tool.href)}>{copy.action}<span aria-hidden="true">→</span></Link>
        </article>; })}</div>
      </div></section>

      <section className="tools-directory-journey"><div className="container">
        <p className="eyebrow">{isChinese ? '完整工作流' : 'THE COMPLETE WORKFLOW'}</p><h2>{isChinese ? '拾取 → 整理 → 导出' : 'Pick → Organize → Export'}</h2>
        <p>{isChinese ? '免费版覆盖网页取色、历史记录、一个项目和 CSS Variables。需要页面颜色提取、多个项目、Tailwind 或 W3C 导出时，再升级 Pro。' : 'Free covers webpage picking, history, one project, and CSS Variables. Upgrade to Pro when you need page extraction, multiple projects, Tailwind, or W3C exports.'}</p>
        <div className="hero-ctas"><Link href={path('/pricing')} className="cta-secondary">{isChinese ? '比较免费版与 Pro' : 'Compare Free and Pro'}</Link><Link href={path('/faq')} className="cta-secondary">{isChinese ? '查看常见问题' : 'Read the FAQ'}</Link></div>
      </div></section>
    </main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
    <Footer />
  </>;
}
