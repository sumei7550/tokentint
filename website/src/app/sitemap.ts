import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.tokentint.xyz';
// Keep this stable between builds so search engines do not see every deploy as
// a content update. Change it when sitemap-covered pages materially change.
const lastModified = new Date('2026-08-20T00:00:00.000Z');
const paths = [
  '/',
  '/pricing',
  '/support',
  '/faq',
  '/privacy',
  '/terms',
  '/refunds',
  '/color-picker-chrome-extension',
  '/website-color-picker',
  '/design-token-generator',
  '/tailwind-color-generator',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const frequency: MetadataRoute.Sitemap[number]['changeFrequency'] = path === '/' ? 'weekly' : 'monthly';
    const english = {
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: frequency,
      priority: path === '/' ? 1.0 : path === '/support' ? 0.5 : 0.8,
      alternates: { languages: { en: `${siteUrl}${path}`, 'zh-CN': `${siteUrl}/zh-CN${path === '/' ? '' : path}`, 'x-default': `${siteUrl}${path}` } },
    };
    const chinese = { ...english, url: `${siteUrl}/zh-CN${path === '/' ? '' : path}`, alternates: { languages: { en: `${siteUrl}${path}`, 'zh-CN': `${siteUrl}/zh-CN${path === '/' ? '' : path}`, 'x-default': `${siteUrl}${path}` } } };
    return [english, chinese];
  });
  /*
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/support`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...[
      'color-picker-chrome-extension',
      'website-color-picker',
      'design-token-generator',
      'tailwind-color-generator',
    ].map((slug) => ({
      url: `${siteUrl}/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];*/
}
