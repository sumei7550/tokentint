import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.tokentint.xyz';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        // /upgrade is the public checkout-entry page referenced by the
        // pricing offer. It is noindex, but must remain crawlable so Google
        // can see that directive and follow the canonical purchase flow.
        disallow: ['/api/', '/success', '/restore'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
