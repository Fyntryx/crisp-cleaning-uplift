import { MetadataRoute } from 'next';

import { getLiveSuburbs } from '@/lib/suburbs';

const baseUrl = 'https://crispcleaning.com.au';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes = [
    '',
    '/about',
    '/contact',
    '/deep-cleaning-melbourne',
    '/end-of-lease-cleaning-melbourne',
    '/faq',
    '/privacy-policy',
    '/refund-cancellation',
    '/service-areas',
    '/terms-conditions',
  ];

  const suburbRoutes = getLiveSuburbs().map((sub) => 
    sub.path ? sub.path : `/house-cleaning-${sub.slug}`
  );

  const routes = [...baseRoutes, ...suburbRoutes];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.includes('cleaning') ? 0.9 : 0.8,
  }));
}
