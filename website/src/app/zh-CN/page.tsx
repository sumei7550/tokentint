import type { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: 'TokenTint — Chrome 颜色取色器与设计令牌工具',
  description: '从网页拾取颜色、保存项目调色板，并导出 CSS、Tailwind 或 W3C 设计令牌。',
  alternates: { canonical: '/zh-CN', languages: { en: '/', 'zh-CN': '/zh-CN', 'x-default': '/' } },
  openGraph: { locale: 'zh_CN', url: 'https://www.tokentint.xyz/zh-CN' },
};

export default function ChineseHomePage() {
  return <Home />;
}
