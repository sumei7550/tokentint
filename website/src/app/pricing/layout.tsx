import type { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'TokenTint Pricing',
  description: 'Compare TokenTint Free and Pro features, pricing, activation, offline use, and refunds.',
  alternates: {
    canonical: '/pricing',
    languages: { en: '/pricing', 'zh-CN': '/zh-CN/pricing', 'x-default': '/pricing' },
  },
  openGraph: { url: 'https://www.tokentint.xyz/pricing', locale: 'en_US' },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  const isChinese = headers().get('x-tokentint-locale') === 'zh-CN';
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'TokenTint Pro',
    description: isChinese
      ? 'TokenTint Pro 一次性购买，支持设计令牌导出以及 Tailwind/W3C 令牌导出。'
      : 'TokenTint Pro is a one-time purchase for design token export, including Tailwind and W3C token export.',
    image: ['https://www.tokentint.xyz/images/screenshots/export-more-pro.png'],
    brand: { '@type': 'Brand', name: 'TokenTint' },
    offers: {
      '@type': 'Offer',
      price: '15',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://www.tokentint.xyz${isChinese ? '/zh-CN/pricing' : '/pricing'}`,
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        url: `https://www.tokentint.xyz${isChinese ? '/zh-CN/refunds' : '/refunds'}`,
      },
    },
  };
  return <>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} /></>;
}
