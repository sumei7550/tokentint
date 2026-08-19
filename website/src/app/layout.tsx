import './globals.css';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { LanguageProvider } from '@/components/LanguageProvider';

const siteUrl = 'https://www.tokentint.xyz';
const defaultTitle = 'TokenTint — Color Picker Chrome Extension for Design Tokens';
const defaultDescription =
  'Pick colors from any website, save palettes, and export CSS variables, Tailwind config, or W3C design tokens. Free Chrome extension for developers and designers.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: '%s · TokenTint',
  },
  description: defaultDescription,
  applicationName: 'TokenTint',
  keywords: [
    'color picker chrome extension',
    'website color picker',
    'eyedropper extension',
    'design token generator',
    'css variables generator',
    'tailwind color generator',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'TokenTint',
    title: defaultTitle,
    description: defaultDescription,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'developer tools',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#635BFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const savedLocale = cookies().get('tokentint-locale')?.value;
  const initialLocale = savedLocale === 'zh-CN' ? 'zh-CN' : 'en';

  return (
    <html lang={initialLocale}>
      <body><LanguageProvider initialLocale={initialLocale}>{children}</LanguageProvider></body>
    </html>
  );
}
