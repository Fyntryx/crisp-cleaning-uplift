import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://crispcleaning.com.au';

function getRoutes(dir: string, basePath: string = ''): string[] {
  let routes: string[] = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        // Ignore Next.js specific directories or api/studio routes
        if (entry.name.startsWith('(') || entry.name.startsWith('_') || entry.name === 'api' || entry.name === 'studio') {
          continue;
        }
        const newBasePath = basePath ? `${basePath}/${entry.name}` : `/${entry.name}`;
        
        // Check if page.tsx exists in this directory
        const pagePath = path.join(dir, entry.name, 'page.tsx');
        if (fs.existsSync(pagePath)) {
          routes.push(newBasePath);
        }
        
        // Recursively search subdirectories
        routes = [...routes, ...getRoutes(path.join(dir, entry.name), newBasePath)];
      }
    }
  } catch (error) {
    console.error("Error reading directory for sitemap:", error);
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDir = path.join(process.cwd(), 'src', 'app');
  
  // Get dynamic routes based on folder structure
  const dynamicRoutes = getRoutes(appDir);

  const routes: MetadataRoute.Sitemap = dynamicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route.includes('/services') ? 0.9 : 0.8,
  }));

  // Add homepage manually
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...routes,
  ];
}
