import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokenTint Support',
  description: 'Get help with TokenTint installation, Pro activation, offline use, and bug reports.',
  alternates: {
    canonical: '/support',
    languages: { en: '/support', 'zh-CN': '/zh-CN/support', 'x-default': '/support' },
  },
  openGraph: { url: 'https://www.tokentint.xyz/support', locale: 'en_US' },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
