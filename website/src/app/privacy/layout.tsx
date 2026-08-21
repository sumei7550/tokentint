import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokenTint Privacy Policy',
  description: 'Learn how TokenTint handles local color, project, extension, and privacy data.',
  alternates: {
    canonical: '/privacy',
    languages: { en: '/privacy', 'zh-CN': '/zh-CN/privacy', 'x-default': '/privacy' },
  },
  openGraph: { url: 'https://www.tokentint.xyz/privacy', locale: 'en_US' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
