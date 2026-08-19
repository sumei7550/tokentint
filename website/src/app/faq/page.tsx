'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FAQAccordion from '@/components/FAQAccordion';
import { useLanguage } from '@/components/LanguageProvider';

type FAQItem = readonly [question: string, answer: string];
type FAQSection = { title: string; items: readonly FAQItem[] };

const sections: readonly FAQSection[] = [
  {
    title: 'General',
    items: [
      ['What is TokenTint?', 'TokenTint is a Chrome extension that helps designers and developers capture colors from websites, organize palettes, and turn visual inspiration into reusable design assets.'],
      ['Who is TokenTint for?', 'TokenTint is built for frontend developers, UI designers, and design system teams who need a faster way to collect and manage colors.'],
    ],
  },
  {
    title: 'Chrome Extension',
    items: [
      ['How do I use TokenTint?', 'Install the Chrome extension, open any webpage, click Pick Color, and capture colors directly from the page.'],
      ['Can I pick colors from any website?', 'Yes. TokenTint is designed to capture colors from webpages you are viewing in Chrome.'],
      ['What color formats are supported?', 'TokenTint supports common color formats including HEX, RGB, and HSL.'],
    ],
  },
  {
    title: 'Free and Pro',
    items: [
      ['Is TokenTint free?', 'Yes. The free version includes core color picking features, color history, and basic palette management.'],
      ['What does TokenTint Pro include?', 'Pro unlocks advanced workflows such as page color extraction, multiple projects, Tailwind export, and W3C Design Token export.'],
      ['Can I upgrade later?', 'Yes. You can start with the free version and upgrade when you need advanced export and project features.'],
    ],
  },
  {
    title: 'Export and Workflow',
    items: [
      ['Can TokenTint export CSS Variables?', 'Yes. TokenTint can export colors into developer-friendly formats including CSS Variables.'],
      ['Does TokenTint support Tailwind?', 'Tailwind export is available as a Pro feature.'],
      ['What are Design Tokens?', 'Design Tokens are reusable values that connect design systems and code. TokenTint helps transform discovered colors into reusable token formats.'],
    ],
  },
  {
    title: 'Privacy',
    items: [
      ['Does TokenTint upload my browsing data?', 'TokenTint is designed as a browser-based workflow tool. Color picking happens through the extension workflow, and users control the colors they save and export.'],
    ],
  },
] as const;

const chineseSections: readonly FAQSection[] = [
  { title: '常见问题', items: [['TokenTint 是什么？', 'TokenTint 是一款 Chrome 扩展，帮助设计师和开发者从网站采集颜色、整理调色板，并将视觉灵感转化为可复用的设计资产。'], ['TokenTint 适合谁？', 'TokenTint 适合需要更快收集和管理颜色的前端开发者、UI 设计师和设计系统团队。']] },
  { title: 'Chrome 扩展', items: [['如何使用 TokenTint？', '安装 Chrome 扩展，打开任意网页，点击“拾取颜色”，即可直接从页面采集颜色。'], ['可以从任意网站取色吗？', '可以。TokenTint 用于采集你正在 Chrome 中查看的网页颜色。'], ['支持哪些颜色格式？', 'TokenTint 支持 HEX、RGB 和 HSL 等常用颜色格式。']] },
  { title: '免费版和 Pro', items: [['TokenTint 免费吗？', '免费版包含核心取色、颜色历史和基础调色板管理功能。'], ['TokenTint Pro 包含什么？', 'Pro 可解锁页面颜色提取、多项目、Tailwind 导出和 W3C 设计令牌导出等高级功能。'], ['可以之后再升级吗？', '可以。你可以先使用免费版，需要高级导出和项目功能时再升级。']] },
  { title: '导出与工作流', items: [['TokenTint 可以导出 CSS Variables 吗？', '可以。TokenTint 支持将颜色导出为 CSS Variables 等开发者友好的格式。'], ['TokenTint 支持 Tailwind 吗？', 'Tailwind 导出是 Pro 功能。'], ['什么是设计令牌？', '设计令牌是连接设计系统和代码的可复用值。TokenTint 可以将采集到的颜色转换为可复用的令牌格式。']] },
  { title: '隐私', items: [['TokenTint 会上传我的浏览数据吗？', 'TokenTint 是基于浏览器的工作流工具。取色通过扩展完成，用户可以自行控制保存和导出的颜色。']] },
];

export default function FAQPage() {
  const { locale } = useLanguage();
  const localizedSections = locale === 'zh-CN' ? chineseSections : sections;
  const localizedQuestions = localizedSections.flatMap(({ items }) => items);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: localizedQuestions.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  return (
    <>
      <Navigation />
      <main className="faq-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <section className="faq-hero">
          <div className="container">
            <p className="eyebrow">{locale === 'zh-CN' ? 'TokenTint 帮助中心' : 'TokenTint help center'}</p>
            <h1>{locale === 'zh-CN' ? '常见问题' : 'Frequently Asked Questions'}</h1>
            <p>{locale === 'zh-CN' ? '了解 TokenTint 这款 Chrome 取色器和设计令牌工作流工具。' : 'Everything you need to know about TokenTint, the Chrome color picker and design token workflow tool.'}</p>
          </div>
        </section>
        <div className="container faq-content">
          {localizedSections.map(({ title, items }) => (
            <section className="faq-section" key={title}>
              <h2>{title}</h2>
              <FAQAccordion items={items} />
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
