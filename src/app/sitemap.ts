import { MetadataRoute } from 'next';

const baseUrl = 'https://crispcleaning.com.au';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
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
    '/house-cleaning-brighton',
    '/house-cleaning-cheltenham',
    '/house-cleaning-essendon',
    '/house-cleaning-hampton',
    '/house-cleaning-malvern',
    '/house-cleaning-maribyrnong',
    '/house-cleaning-toorak',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.includes('house-cleaning') ? 0.9 : 0.8,
  }));
}
