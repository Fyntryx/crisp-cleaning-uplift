import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/admin/', '/staff/'],
    },
    sitemap: 'https://crispcleaning.com.au/sitemap.xml',
  };
}
