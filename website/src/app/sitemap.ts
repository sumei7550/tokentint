import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.tokentint.xyz';

const publicRoutes = [
  '',
  '/tools',
  '/color-picker-chrome-extension',
  '/website-color-picker',
  '/css-variables-generator',
  '/tailwind-color-generator',
  '/design-token-generator',
  '/pricing',
  '/faq',
  '/support',
  '/privacy',
  '/terms',
  '/refunds',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.flatMap((path) => {
    const englishUrl = `${siteUrl}${path || '/'}`;
    const chineseUrl = `${siteUrl}/zh-CN${path}`;
    const priority = path === '' ? 1 : path === '/tools' ? 0.9 : path.includes('generator') || path.includes('picker') ? 0.8 : 0.5;
    const changeFrequency = path === '' || path === '/tools' || path.includes('generator') || path.includes('picker')
      ? 'monthly' as const
      : 'yearly' as const;

    return [
      {
        url: englishUrl,
        changeFrequency,
        priority,
        alternates: { languages: { en: englishUrl, 'zh-CN': chineseUrl, 'x-default': englishUrl } },
      },
      {
        url: chineseUrl,
        changeFrequency,
        priority: Math.max(priority - 0.1, 0.4),
        alternates: { languages: { en: englishUrl, 'zh-CN': chineseUrl, 'x-default': englishUrl } },
      },
    ];
  });
}
