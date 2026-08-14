// sitemap version 1
import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.tokentint.xyz';
const lastModified = new Date('2026-08-14');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
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
  ];
}