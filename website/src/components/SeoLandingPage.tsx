'use client';

import Link from 'next/link';
import Navigation from './Navigation';
import Footer from './Footer';
import { useLanguage } from './LanguageProvider';

export const chromeStoreUrl =
  'https://chromewebstore.google.com/detail/tokentint-%E2%80%93-color-picker/ifcilnndiaddmoppdpnhboaofffnjmbm?utm_source=website';

const imageDimensions: Record<string, readonly [number, number]> = {
  '/images/screenshots/pick-color-free.png': [706, 602],
  '/images/screenshots/pick-color-free2.png': [345, 481],
  '/images/screenshots/20-history.png': [534, 876],
  '/images/screenshots/project-add-token-free.png': [373, 604],
  '/images/screenshots/extract-colors-pro.png': [756, 601],
  '/images/screenshots/extract-colors-pro3.png': [348, 478],
  '/images/screenshots/project-more-pro2.png': [376, 344],
  '/images/screenshots/export-more-pro.png': [353, 292],
  '/images/screenshots/export-tailwind-pro.png': [375, 600],
  '/images/screenshots/export-W3C-pro.png': [702, 934],
};

export type SeoLandingPageProps = {
  h1: string;
  intro: string;
  problem: string;
  solution: string;
  workflow: string[];
  workflowTitle?: string;
  workflowKickers?: string[];
  free: string[];
  pro: string[];
  why: string;
  related: { href: string; label: string }[];
  faqs: { question: string; answer: string }[];
  visual?: {
    heroSrc: string;
    heroAlt: string;
    showcaseTitle: string;
    heroSize?: 'compact' | 'short';
    showcaseSize?: 'tall';
    showcase?: { title?: string; src: string; alt: string }[];
  };
  proVisual?: { title: string; description: string; steps: { title: string; description: string; src: string; alt: string }[] };
  valueCards?: { title: string; description: string }[];
  outputExample?: { label: string; title: string; description: string; code: string; footer: string };
  hideShowcase?: boolean;
};

function getChineseCopy(props: SeoLandingPageProps): SeoLandingPageProps {
  const common = {
    visual: props.visual,
    related: props.related.map((link) => ({ ...link, label: link.label })),
  };
  if (props.h1.includes('Website')) {
    return { ...props, ...common, h1: '适用于 Chrome 的网站取色器', intro: '直接采集参考页面中的颜色，无需在截图、开发者工具和单独的笔记文件之间来回切换。', problem: '当页面是你的视觉参考时，浏览器取色器只是第一步。手动重建参考页面的调色板既慢，又容易丢失上下文或遗漏辅助颜色。', solution: 'TokenTint 可以直接从当前页面采集颜色，在一个历史记录中查看，并通过 Pro 页面提取功能快速获得更完整的基础调色板。结果可以导出到 CSS 或令牌文件，而不是留在笔记本里。', workflow: ['打开参考页面，并从 Chrome 启动 TokenTint。', '拾取品牌色、背景色、文字色和强调色，边采集边查看历史记录。', '将参考页面的颜色保存到项目中，然后导出用于实现或设计系统评审。'], free: ['从当前页面拾取颜色', '复制 HEX、RGB 和 HSL', '20 个颜色历史记录', '单个项目调色板', 'CSS Variables 导出'], pro: ['从当前页面提取主要颜色', '多个项目调色板', 'Tailwind 配置导出', 'W3C 设计令牌导出', '包含免费版全部功能'], why: '基础取色器回答“这个像素是什么颜色”，而 TokenTint 进一步帮助你回答“如何在项目中使用这个参考页面的色彩语言”。', related: [{ href: '/color-picker-chrome-extension', label: '查看 Chrome 取色器' }, { href: '/tailwind-color-generator', label: '生成 Tailwind 调色板' }, { href: '/pricing', label: '查看免费版和 Pro 定价' }], faqs: [{ question: '可以从实时页面取色吗？', answer: '可以。TokenTint 专为通过 Chrome 扩展主动采集当前页面颜色而设计。' }, { question: 'TokenTint 可以提取整个网站的调色板吗？', answer: 'Pro 支持从当前页面提取更多主要颜色，生成更完整的页面调色板；免费版适合逐个主动拾取颜色。' }, { question: '采集页面颜色后可以做什么？', answer: '你可以复制 HEX、RGB 或 HSL，保存到项目调色板，并使用可用的导出格式进行实现。' }] };
  }
  if (props.h1.includes('Chrome Color Picker')) {
    return { ...props, ...common, h1: 'Chrome 网页取色器扩展', intro: '一款专注的 Chrome 取色器，用于采集网页颜色、复制 HEX、RGB 或 HSL 值，并将需要的颜色保存在项目调色板中。', problem: '网页取色时，你可能会反复拾取同一区域、把复制的值丢在笔记里，或手动切换不同格式。基础取色器只能给你一个颜色，却无法帮助你查看周围的颜色并整理使用。', solution: 'TokenTint 让网页取色保持简单：选择颜色，在 HEX、RGB 和 HSL 之间切换，查看最近历史，并将有用的值保存到项目调色板中。', workflowKickers: ['拾取', '查看', '保存'], workflow: ['拾取颜色。使用 Chrome 扩展直接从当前网页采集颜色。', '查看历史。集中查看最近 20 个颜色，并复制需要的格式。', '保存到项目。将有用的颜色放入可复用的项目调色板中。'], free: ['从网页拾取颜色', 'HEX、RGB 和 HSL 值', '20 色历史记录', '单个项目调色板', 'CSS 变量导出'], pro: ['免费版全部功能', '提取页面关键颜色', '多个项目调色板', 'Tailwind 配置导出', 'W3C 设计令牌导出'], why: '基础取色器只能回答光标下是什么颜色；TokenTint 还会保留你构建界面时需要的历史颜色、格式和项目上下文。', related: [{ href: '/website-color-picker', label: '从网站创建调色板' }, { href: '/pricing', label: '比较免费版和专业版' }, { href: '/support', label: '获取设置帮助' }], faqs: [{ question: '什么是 Chrome 取色器扩展？', answer: '它是一款可以从网页采集颜色并复制颜色值的浏览器扩展。TokenTint 支持 HEX、RGB 和 HSL。' }, { question: '历史记录可以保存多少颜色？', answer: '免费工作流会保留最近 20 个拾取的颜色，方便你在当前任务中查看和复用。' }, { question: '可以将拾取的颜色保存到项目吗？', answer: '可以。你可以将历史记录中的颜色加入项目调色板，并将调色板导出为 CSS 变量。' }], valueCards: [{ title: '直接在浏览器中拾取', description: '无需离开正在研究或构建的网页即可采集颜色。' }, { title: '保留颜色上下文', description: '查看最近颜色，并保留页面或组件周围的小型调色板。' }, { title: '复制正确格式', description: '在将颜色放入项目之前，在 HEX、RGB 和 HSL 之间切换。' }] };
  }
  if (props.h1.includes('Design Token')) {
    return { ...props, ...common, h1: '面向色彩系统的设计令牌生成器', intro: '将视觉参考中的颜色整理为可导出的颜色令牌，供开发者和设计系统工作流继续使用。', problem: '当颜色从浏览器复制到表格、之后再进行命名时，设计令牌很容易变得繁琐。这段手工流程会造成值不一致，也会拖慢设计与代码之间的反馈。', solution: 'TokenTint 提供一个专注的空间来收集颜色、将颜色归入项目调色板，并导出 CSS Variables 或 W3C Design Tokens。命名、语义决策和后续系统工作仍由你现有的工具和工作流负责。', workflow: ['从实时界面采集颜色，或直接使用已有颜色值。', '检查调色板，并将相关颜色归入同一个项目。', '导出适合开发的格式，再在代码库中完善名称和语义。'], free: ['颜色采集与格式转换', '20 个颜色历史记录', '单个项目调色板', 'CSS Variables 导出'], pro: ['多个项目调色板', 'W3C Design Tokens 导出', '页面颜色提取', 'Tailwind 配置导出', '包含免费版全部功能'], why: '它把设计系统的起点——界面中的真实颜色——连接到团队可以带入代码的导出格式，而不是一个孤立的转换计算器。', related: [{ href: '/color-picker-chrome-extension', label: '从 Chrome 取色器开始' }, { href: '/website-color-picker', label: '采集参考页面调色板' }, { href: '/tailwind-color-generator', label: '导出 Tailwind 颜色' }], faqs: [{ question: 'TokenTint 可以生成什么？', answer: '免费版支持 CSS Variables 导出，Pro 额外支持 W3C Design Tokens 导出以及项目和页面提取功能。' }, { question: '这是完整的设计令牌管理平台吗？', answer: 'TokenTint 专注于颜色采集和导出步骤，命名、语义和代码库结构可以在现有工作流中继续处理。' }, { question: '谁适合使用它？', answer: '需要将界面颜色转换为可复用颜色令牌的前端开发者、UI 设计师和设计系统工作流使用者。' }] };
  }
  if (props.h1.includes('Tailwind')) {
    return { ...props, ...common, h1: '界面颜色 Tailwind 生成器', intro: '将参考网站或产品界面中发现的颜色转换为适合 Tailwind 的调色板，无需重新输入每个值。', problem: 'Tailwind 项目需要一致的命名颜色，但源颜色往往存在于浏览器原型或现有网站中。基础取色器只能复制 HEX，无法帮助你收集、比较并带入配置。', solution: 'TokenTint 让你先采集并整理调色板，之后通过 Pro 导出 Tailwind 配置片段，并与其他项目格式一起使用。', workflow: ['从正在研究的界面采集品牌色、背景色、文字色和强调色。', '将颜色收集到 TokenTint 项目调色板中，并确认各种格式。', '使用 Pro Tailwind 导出作为配置起点，再补充符合代码库约定的语义名称和色阶。'], free: ['EyeDropper 取色', 'HEX、RGB 和 HSL 格式', '20 个颜色历史记录', '单个项目调色板', 'CSS Variables 导出'], pro: ['Tailwind 配置导出', '页面颜色提取', '多个项目调色板', 'W3C Design Tokens 导出', '包含免费版全部功能'], why: '它保留了颜色来源的上下文，并为 Tailwind 用户提供从浏览器参考到实现的直接桥梁，而不是留下一堆没有名称的 HEX 值。', related: [{ href: '/website-color-picker', label: '从网站拾取颜色' }, { href: '/design-token-generator', label: '生成设计令牌' }, { href: '/pricing', label: '比较免费版和 Pro' }], faqs: [{ question: 'TokenTint 可以导出 Tailwind 配置吗？', answer: '可以，Tailwind 配置导出是 Pro 功能。免费版仍支持取色、整理一个调色板和导出 CSS Variables。' }, { question: '可以根据现有网站生成颜色吗？', answer: '可以。你可以从当前页面采集颜色，也可以使用 Pro 页面提取功能生成更完整的基础调色板。' }, { question: '导出会替我完成 Tailwind 的设计决策吗？', answer: '不会。导出结果是一个适合配置的起点，你仍应根据项目约定选择语义名称、色阶和组织方式。' }] };
  }
  return { ...props, ...common, h1: '面向开发者的 Chrome 取色器扩展', intro: '一个实用的 Chrome 扩展，用于采集界面颜色，并将颜色带入后续的代码和设计系统工作。', problem: '基础取色器能给你一个颜色，但产品工作通常不会就此结束。你还需要记住来源、比较相关颜色，并将结果转换为项目可以使用的格式。', solution: 'TokenTint 保存 20 个颜色历史记录，支持复制 HEX、RGB 和 HSL，并帮助你从一个像素走向项目调色板和令牌导出。', workflow: ['在查看网页时打开 TokenTint，并启动 EyeDropper。', '采集重要颜色，然后复制当前任务所需的格式。', '将颜色整理到调色板中，准备好后导出 CSS Variables、Tailwind 配置或 W3C 令牌。'], free: ['EyeDropper 取色', 'HEX、RGB 和 HSL 格式', '20 个颜色历史记录', '单个项目调色板', 'CSS Variables 导出'], pro: ['包含免费版全部功能', '页面颜色提取', '多个项目调色板', 'Tailwind 配置导出', 'W3C Design Tokens 导出'], why: '它围绕从视觉参考到可复用项目值的交接流程构建，让你少花时间抄写颜色，多花时间交付一致的界面。', related: [{ href: '/website-color-picker', label: '从网站拾取颜色' }, { href: '/design-token-generator', label: '生成设计令牌' }, { href: '/tailwind-color-generator', label: '创建 Tailwind 颜色' }], faqs: [{ question: 'TokenTint 免费吗？', answer: '是的。核心取色、颜色格式、历史记录、一个项目调色板和 CSS Variables 导出均可免费使用。Pro 是一次性购买，用于解锁高级工作流。' }, { question: 'TokenTint 可以在任何网站上使用吗？', answer: '当你通过扩展主动调用取色功能，并且网页支持浏览器取色工作流时，就可以使用。' }, { question: '它与基础取色器有什么区别？', answer: 'TokenTint 将取色与历史记录、调色板和开发者友好的导出连接起来，而不是只复制一个颜色。' }] };
}

function alignChineseWorkflow(copy: SeoLandingPageProps): SeoLandingPageProps {
  if (copy.h1.includes('网站')) return { ...copy, h1: 'website color picker：适用于 Chrome 的网站取色器', intro: '使用 website color picker 从参考页面采集颜色，无需在截图、开发者工具和单独的笔记文件之间来回切换。', workflowKickers: ['收集', '比较', '保存到调色板'], workflow: ['收集。采集定义参考页面的品牌色、背景色、文字色、边框色和强调色。', '比较。集中查看颜色，移除重复值或不符合当前视觉方向的颜色。', '保存到调色板。将参考页面调色板保存到项目中，用于改版、竞品分析或实现工作。'] };
  if (copy.h1.includes('设计令牌')) return { ...copy, h1: 'design tokens：颜色设计令牌生成器', intro: '将视觉参考中的颜色整理为可导出的 design tokens，供开发者和设计系统工作流继续使用。', workflowKickers: ['收集', '整理', '导出'], workflow: ['收集。使用实时界面采集颜色，或通过页面提取创建初始颜色集合。', '整理。检查相关颜色，并在决定其用途前将它们归入同一个项目调色板。', '导出。下载 CSS Variables 或 W3C Design Tokens，作为开发工作的实用起点。'] };
  if (copy.h1.includes('Tailwind')) return { ...copy, h1: 'Tailwind-ready 调色板生成器', intro: '将参考网站或产品界面中发现的颜色整理为 Tailwind-ready 调色板，并导出配置起点；不会自动生成完整色阶或 Tailwind 主题。', workflowKickers: ['收集', '整理', '导出'], workflow: ['收集。从网页采集所需的品牌色、背景色、文字色、边框色和强调色。', '整理。将这些值保存在 TokenTint 项目调色板中，并在导出前确认格式。', '导出。下载 Tailwind Config 配置起点，再在代码库中继续处理名称、色阶和项目约定。'] };
  return { ...copy, h1: 'color picker：面向开发者的 Chrome 取色器扩展', intro: '一个实用的 Chrome color picker，用于采集界面颜色，并将颜色带入后续的代码和设计系统工作。', workflowKickers: ['拾取颜色', '查看历史', '保存到项目'] };
}

export default function SeoLandingPage(props: SeoLandingPageProps) {
  const { locale } = useLanguage();
  const path = (href: string) => locale === 'zh-CN' ? `/zh-CN${href}` : href;
  const copy = locale === 'zh-CN' ? alignChineseWorkflow(getChineseCopy(props)) : props;
  const useTwoColumnProWorkflow = props.h1.includes('Tailwind') || props.h1.includes('Design Token');
  const centerLastProRow = props.h1.includes('Website Color Picker');
  const visual = locale === 'zh-CN'
    ? { ...(copy.visual ?? getPageVisual(copy.h1)), heroAlt: copy.h1.includes('Tailwind') ? 'TokenTint 扩展中的 Tailwind 配置导出' : copy.h1.includes('Design Token') ? 'TokenTint 扩展中的项目令牌' : copy.h1.includes('Website') ? 'TokenTint 扩展中的页面颜色提取' : 'TokenTint 扩展中的取色功能', showcaseTitle: copy.h1.includes('Tailwind') ? '更快生成 Tailwind 调色板' : copy.h1.includes('Design Token') ? '从采集颜色到可用令牌' : copy.h1.includes('Website') ? '看见界面背后的颜色' : '从点击取色到交付代码' }
    : (copy.visual ?? getPageVisual(copy.h1));
  const landingPath = props.h1.includes('Chrome Color') ? '/color-picker-chrome-extension' : props.h1.includes('Website Color') ? '/website-color-picker' : props.h1.includes('Design Token') ? '/design-token-generator' : '/tailwind-color-generator';
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: copy.h1,
    description: copy.intro,
    url: `https://www.tokentint.xyz${path(landingPath)}`,
  };
  const translatedProVisual = copy.proVisual && locale === 'zh-CN' ? {
    ...copy.proVisual,
    title: props.h1.includes('Tailwind') ? 'Tailwind 工作流：打开 → 提取 → 整理 → 导出' : props.h1.includes('Design Token') ? '颜色令牌工作流：打开 → 提取 → 分组 → 导出' : '专业版工作流：打开 → 提取 → 整理 → 导出',
    description: props.h1.includes('Tailwind') ? '复用参考页面中的颜色，将选中的调色板带入 Tailwind 配置起点。' : props.h1.includes('Design Token') ? '从真实界面开始，整理颜色令牌，并将结果交给设计系统或代码工具。' : '将参考页面整理为可复用的颜色调色板，并支持多个项目和开发者友好的格式。',
    steps: copy.proVisual.steps.map((step, index) => ({ ...step, title: (props.h1.includes('Tailwind') ? ['打开参考页面', '提取网页颜色', '整理项目调色板', '导出 Tailwind 配置'] : props.h1.includes('Design Token') ? ['打开参考页面', '提取界面颜色', '整理项目令牌', '导出 CSS 或 W3C 令牌'] : ['打开参考页面', '提取页面颜色', '整理多个项目', '建立可复用颜色令牌集', '导出更多格式'])[index] ?? '整理颜色', description: props.h1.includes('Tailwind') ? ['打开要研究的真实界面，然后在其处于活动状态时启动 TokenTint。', '扫描当前页面，获得更广泛的起始颜色集合，无需逐个拾取。', '在选定项目中保留颜色，并选择应进入 Tailwind 主题的值。', '下载配置起点，并在代码库中完善名称、色阶和约定。'][index] : props.h1.includes('Design Token') ? ['打开要转换为可复用颜色令牌的真实界面。', '扫描当前页面，获得更广泛的起始颜色集合，无需逐个收集。', '在决定语义名称和角色前，将相关颜色保存在选定项目中。', '导出 CSS Variables 或 W3C Design Tokens，作为开发工作的起点。'][index] : ['打开要研究的具体项目或落地页，并在其处于活动状态时启动 TokenTint。', '扫描当前页面，获得更广泛的起始调色板，无需逐个拾取。', '在竞品、品牌、产品和改版方向之间切换不同项目调色板。', '选择代表性色彩，并在选定项目中将多个令牌保存在一起。', '将选定调色板导出为 CSS Variables、Tailwind Config 或 W3C Design Tokens。'][index], alt: step.alt.replace(/^TokenTint|^Reference|^Dribbble/, 'TokenTint') }))
  } : copy.proVisual;
  const translatedOutputExample = copy.outputExample && locale === 'zh-CN' ? { ...copy.outputExample, label: props.h1.includes('Tailwind') ? 'TAILWIND 配置' : '实际导出', title: props.h1.includes('Tailwind') ? '导出你收集的调色板，而不是虚构的色阶。' : '在导出前查看颜色令牌结构。', description: '先生成适合代码库使用的起点，再根据项目需要完善名称和语义。', footer: props.h1.includes('Tailwind') ? 'Pro：Tailwind 配置导出' : 'Pro：W3C 设计令牌导出' } : copy.outputExample;
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <Navigation />
      <main className="seo-page">
        <section className="seo-hero">
          <div className="container">
            <div className="seo-hero-grid">
              <div className="seo-hero-copy">
                <p className="eyebrow">{locale === 'zh-CN' ? '面向前端工作流的 TokenTint' : 'TokenTint for frontend workflows'} <span>●</span></p>
                <h1>{copy.h1}</h1>
                <p className="seo-intro">{copy.intro}</p>
                <div className="hero-ctas">
                  <a href={chromeStoreUrl} className="cta-button">{locale === 'zh-CN' ? '添加到 Chrome — 免费' : 'Add to Chrome — Free'}</a>
                  <Link href={path('/pricing')} className="cta-secondary">{locale === 'zh-CN' ? '比较方案' : 'Compare plans'}</Link>
                </div>
                <p className="hero-note"><span>✓</span> {locale === 'zh-CN' ? '永久免费 · 无需信用卡' : 'Free forever · No credit card required'}</p>
              </div>
              <ProductVisual visual={visual} />
            </div>
          </div>
        </section>

        <section className="product-strip" id="product"><div className="container"><p className="strip-label">{locale === 'zh-CN' ? '更从容地构建色彩系统' : 'A calmer way to build color systems'}</p><div className="strip-items"><span>01 / {locale === 'zh-CN' ? '采集' : 'Capture'}</span><span>02 / {locale === 'zh-CN' ? '整理' : 'Organize'}</span><span>03 / {locale === 'zh-CN' ? '交付' : 'Ship'}</span></div></div></section>

        <section className="seo-section"><div className="container seo-copy">
          <h2>{locale === 'zh-CN' ? '问题' : 'The problem'}</h2><p>{copy.problem}</p>
          <h2>{locale === 'zh-CN' ? 'TokenTint 如何解决' : 'How TokenTint solves it'}</h2><p>{copy.solution}</p>
        </div></section>

        <section className="seo-section seo-muted"><div className="container">
          <p className="eyebrow">{locale === 'zh-CN' ? '更顺畅的取色工作流' : 'A better color workflow'}</p><h2>{locale === 'zh-CN' ? '从参考页面到可用调色板。' : (copy.workflowTitle ?? 'From first click to final token.')}</h2>
          <ol className="workflow-list">{copy.workflow.map((step, index) => { const parts = locale === 'zh-CN' ? step.split('。') : step.split('. '); const title = parts[0] + (locale === 'zh-CN' ? '。' : '.'); const description = parts.slice(1).join(locale === 'zh-CN' ? '。' : '. '); return <li key={step}><span className="workflow-kicker">0{index + 1} / {(locale === 'zh-CN' ? (copy.workflowKickers ?? ['拾取', '整理', '导出', '交付']) : (copy.workflowKickers ?? ['Pick', 'Organize', 'Export']))[index]}</span><strong>{title}</strong>{description && <span>{description}</span>}</li>; })}</ol>
        </div></section>

        {!copy.hideShowcase && (copy.valueCards ? <section className="showcase-section"><div className="container"><div className="showcase-heading"><p className="eyebrow">{locale === 'zh-CN' ? '为什么选择 TokenTint' : 'Why TokenTint'}</p><h2>{visual.showcaseTitle}</h2></div><div className="showcase-grid">{copy.valueCards.map((card, index) => <article className="showcase-card" key={card.title}><div className="showcase-card-top"><span>0{index + 1}</span><span>TokenTint</span></div><div className="seo-copy"><h3>{card.title}</h3><p>{card.description}</p></div></article>)}</div></div></section> : <section className={`showcase-section${visual.showcaseSize === 'tall' ? ' showcase-section-tall' : ''}`}><div className="container"><div className="showcase-heading"><p className="eyebrow">{locale === 'zh-CN' ? '为高效工作而设计' : 'Built for momentum'}</p><h2>{visual.showcaseTitle}</h2></div><div className="showcase-grid"><ShowcaseCard title={(visual.showcase ?? [])[0]?.title ?? (locale === 'zh-CN' ? '从浏览器中拾取' : 'Capture from the browser')} label="01" src={(visual.showcase ?? [])[0]?.src ?? visual.heroSrc} alt={(visual.showcase ?? [])[0]?.alt ?? visual.heroAlt} /><ShowcaseCard title={(visual.showcase ?? [])[1]?.title ?? (locale === 'zh-CN' ? '按项目整理' : 'Organize by project')} label="02" src={(visual.showcase ?? [])[1]?.src ?? visual.heroSrc} alt={(visual.showcase ?? [])[1]?.alt ?? visual.heroAlt} /><ShowcaseCard title={(visual.showcase ?? [])[2]?.title ?? (locale === 'zh-CN' ? '导出到你的技术栈' : 'Export for your stack')} label="03" src={(visual.showcase ?? [])[2]?.src ?? visual.heroSrc} alt={(visual.showcase ?? [])[2]?.alt ?? visual.heroAlt} /></div></div></section>)}

        {translatedProVisual && <section className={`showcase-section pro-workflow-section${useTwoColumnProWorkflow ? ' pro-workflow-section-two-column' : ''}${centerLastProRow ? ' pro-workflow-section-centered-last-row' : ''}${visual.showcaseSize === 'tall' ? ' showcase-section-tall' : ''}`}><div className="container"><div className="showcase-heading"><p className="eyebrow">{locale === 'zh-CN' ? '专业版工作流' : 'Pro workflow'}</p><h2>{translatedProVisual.title}</h2><p>{translatedProVisual.description}</p></div><div className="showcase-grid">{translatedProVisual.steps.map((step, index) => <ShowcaseCard key={step.title} title={step.title} description={step.description} label={`0${index + 1}`} src={step.src} alt={step.alt} />)}</div></div></section>}

        {translatedOutputExample && <section className="seo-output-example"><div className="container seo-output-grid"><div><p className="eyebrow">{translatedOutputExample.label}</p><h2>{translatedOutputExample.title}</h2><p>{translatedOutputExample.description}</p></div><div className="seo-output-card"><div className="seo-output-card-top">{locale === 'zh-CN' ? 'TokenTint 导出' : 'TokenTint export'}</div><pre><code>{translatedOutputExample.code}</code></pre><div className="seo-output-card-footer">{translatedOutputExample.footer}</div></div></div></section>}

        <section className="seo-section seo-pricing-section"><div className="container">
          <h2>{locale === 'zh-CN' ? '免费版与 Pro' : 'Free vs Pro'}</h2>
          <div className="seo-columns"><div className="seo-card"><h3>{locale === 'zh-CN' ? '免费版' : 'Free'}</h3><ul>{copy.free.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="seo-card seo-card-pro"><h3>Pro</h3><ul>{copy.pro.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
          <p className="seo-copy"><strong>{locale === 'zh-CN' ? '为什么选择 TokenTint，而不是基础取色器？' : 'Why TokenTint instead of a basic color picker?'}</strong> {copy.why}</p>
        </div></section>

        <section className="seo-trust-strip"><div className="container"><div className="seo-trust-grid"><div><strong>{locale === 'zh-CN' ? '本地优先' : 'Local-first'}</strong><span>{locale === 'zh-CN' ? '颜色和项目保存在 Chrome 本地存储。' : 'Colors and projects stay in Chrome local storage.'}</span></div><div><strong>{locale === 'zh-CN' ? '无追踪' : 'No tracking'}</strong><span>{locale === 'zh-CN' ? '不使用分析或广告追踪工具。' : 'No analytics or advertising trackers.'}</span></div><div><strong>{locale === 'zh-CN' ? '一次购买' : 'One-time Pro'}</strong><span>{locale === 'zh-CN' ? 'Pro 无订阅，30 天内可申请退款。' : 'No subscription; 30-day refund policy.'}</span></div></div></div></section>

        <section className="seo-section seo-muted"><div className="container faq-section">
          <h2>{locale === 'zh-CN' ? '常见问题' : 'Frequently asked questions'}</h2>
          {copy.faqs.map((faq) => <div className="faq-item" key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}
        </div></section>

        <section className="seo-section"><div className="container seo-related"><h2>{locale === 'zh-CN' ? '探索 TokenTint' : 'Explore TokenTint'}</h2><div className="related-links">{copy.related.map((link) => <Link key={link.href} href={path(link.href)}>{link.label}</Link>)}</div></div></section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <Footer />
    </>
  );
}

function getPageVisual(h1: string): NonNullable<SeoLandingPageProps['visual']> {
  if (h1.toLowerCase().includes('tailwind')) return { heroSrc: '/images/screenshots/export-tailwind-pro.png', heroAlt: 'TokenTint Tailwind Config export in the Chrome extension', showcaseTitle: 'A faster path to a Tailwind palette.', showcase: [{ src: '/images/screenshots/export-tailwind-pro.png', alt: 'TokenTint Tailwind Config export' }] };
  if (h1.toLowerCase().includes('design token')) return { heroSrc: '/images/screenshots/project-add-token-free.png', heroAlt: 'TokenTint project tokens in the Chrome extension', showcaseTitle: 'From sampled colors to usable tokens.', showcase: [{ src: '/images/screenshots/project-add-token-free.png', alt: 'TokenTint project tokens' }, { src: '/images/screenshots/export-W3C-pro.png', alt: 'TokenTint W3C Design Tokens export' }] };
  if (h1.toLowerCase().includes('website')) return { heroSrc: '/images/screenshots/extract-colors-pro.png', heroAlt: 'TokenTint Extract Colors feature in the Chrome extension', showcaseTitle: 'See the colors behind the interface.', showcase: [{ src: '/images/screenshots/extract-colors-pro.png', alt: 'TokenTint Extract Colors' }] };
  return { heroSrc: '/images/screenshots/pick-color-free.png', heroAlt: 'TokenTint Pick Color feature in the Chrome extension', showcaseTitle: 'A real color workflow, from click to code.', showcase: [{ src: '/images/screenshots/pick-color-free.png', alt: 'TokenTint Pick Color' }] };
}

function ProductVisual({ visual }: { visual: NonNullable<SeoLandingPageProps['visual']> }) { const [width, height] = imageDimensions[visual.heroSrc]; return <div className="product-mockup"><div className="mockup-glow" /><div className={`real-product-visual${visual.heroSize === 'compact' ? ' compact' : ''}${visual.heroSize === 'short' ? ' short' : ''}`}><img src={visual.heroSrc} alt={visual.heroAlt} width={width} height={height} fetchPriority="high" /></div></div> }
function ShowcaseCard({ title, description, label, src, alt }: { title: string; description?: string; label: string; src: string; alt: string }) { const { locale } = useLanguage(); const [width, height] = imageDimensions[src]; return <article className="showcase-card"><div className="showcase-card-top"><span>{label}</span><span>TokenTint</span></div><div className="showcase-visual real-showcase-visual"><img src={src} alt={alt} width={width} height={height} /></div><h3>{title}</h3>{description && <p>{description}</p>}<a href={chromeStoreUrl}>{locale === 'zh-CN' ? '探索工作流' : 'Explore workflow'}</a></article> }
