import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ChromePicker from '../../color-picker-chrome-extension/page';
import DesignTokens from '../../design-token-generator/page';
import FAQ from '../../faq/page';
import Pricing from '../../pricing/page';
import Privacy from '../../privacy/page';
import Refunds from '../../refunds/page';
import Restore from '../../restore/page';
import Success from '../../success/page';
import Support from '../../support/page';
import Tailwind from '../../tailwind-color-generator/page';
import Terms from '../../terms/page';
import Upgrade from '../../upgrade/page';
import WebsitePicker from '../../website-color-picker/page';

const pages: Record<string, { component: () => React.ReactNode; title: string; description: string }> = {
  'color-picker-chrome-extension': { component: ChromePicker, title: 'Chrome 中文取色器扩展', description: '在 Chrome 中从网页拾取颜色，并保存到项目调色板。' },
  'website-color-picker': { component: WebsitePicker, title: '网站颜色取色器', description: '从网站收集颜色，创建可复用的项目调色板。' },
  'design-token-generator': { component: DesignTokens, title: '颜色设计令牌生成器', description: '将界面颜色整理并导出为 CSS 或 W3C 设计令牌。' },
  'tailwind-color-generator': { component: Tailwind, title: 'Tailwind 颜色调色板生成器', description: '整理网页颜色并导出 Tailwind 配置起点。' },
  pricing: { component: Pricing, title: 'TokenTint 定价', description: '查看 TokenTint 免费版与 Pro 功能。' },
  support: { component: Support, title: 'TokenTint 支持', description: '获取 TokenTint 使用和激活支持。' },
  faq: { component: FAQ, title: 'TokenTint 常见问题', description: '查看 TokenTint 的常见问题与答案。' },
  privacy: { component: Privacy, title: '隐私政策', description: '了解 TokenTint 如何处理数据和隐私。' },
  terms: { component: Terms, title: '服务条款', description: 'TokenTint 服务条款。' },
  refunds: { component: Refunds, title: '退款政策', description: 'TokenTint 退款政策。' },
  restore: { component: Restore, title: '恢复购买', description: '恢复 TokenTint Pro 激活信息。' },
  upgrade: { component: Upgrade, title: '升级到 TokenTint Pro', description: '一次性购买 TokenTint Pro。' },
  success: { component: Success, title: '购买成功', description: 'TokenTint Pro 购买成功。' },
};

export function generateStaticParams() { return Object.keys(pages).map((slug) => ({ slug: [slug] })); }

export function generateMetadata({ params }: { params: { slug: string[] } }): Metadata {
  const page = pages[params.slug.join('/')];
  if (!page) return { title: 'Page not found' };
  const path = `/${params.slug.join('/')}`;
  return { title: page.title, description: page.description, alternates: { canonical: `/zh-CN${path}`, languages: { en: path, 'zh-CN': `/zh-CN${path}`, 'x-default': path } }, openGraph: { locale: 'zh_CN', url: `https://www.tokentint.xyz/zh-CN${path}` } };
}

export default function ChinesePage({ params }: { params: { slug: string[] } }) {
  const page = pages[params.slug.join('/')];
  if (!page) notFound();
  const Page = page.component;
  return <Page />;
}
