import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokenTint Terms of Service',
  description: 'Read the TokenTint terms of service for the Chrome extension and Pro purchase.',
  alternates: {
    canonical: '/terms',
    languages: { en: '/terms', 'zh-CN': '/zh-CN/terms', 'x-default': '/terms' },
  },
  openGraph: { url: 'https://www.tokentint.xyz/terms', locale: 'en_US' },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
