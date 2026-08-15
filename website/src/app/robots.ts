import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.tokentint.xyz';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/upgrade?*_rsc=*', '/'],
        disallow: ['/api/', '/upgrade', '/success', '/restore'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}