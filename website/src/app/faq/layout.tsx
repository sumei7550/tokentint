import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokenTint FAQ',
  description: 'Answers about TokenTint, the Chrome color picker, design token workflow, exports, and privacy.',
  alternates: {
    canonical: '/faq',
    languages: { en: '/faq', 'zh-CN': '/zh-CN/faq', 'x-default': '/faq' },
  },
  openGraph: { url: 'https://www.tokentint.xyz/faq', locale: 'en_US' },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
