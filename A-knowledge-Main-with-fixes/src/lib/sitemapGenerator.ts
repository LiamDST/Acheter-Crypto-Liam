import fs from 'fs';
import path from 'path';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

interface SitemapConfig {
  baseUrl: string;
  outputPath: string;
  routes: {
    path: string;
    lastmod?: string;
    changefreq?: SitemapEntry['changefreq'];
    priority?: number;
  }[];
}

/**
 * Generates a sitemap.xml file based on the provided configuration
 */
export function generateSitemap(config: SitemapConfig): void {
  const today = new Date().toISOString().split('T')[0];
  
  const entries: SitemapEntry[] = config.routes.map(route => ({
    loc: `${config.baseUrl}${route.path}`,
    lastmod: route.lastmod || today,
    changefreq: route.changefreq || 'weekly',
    priority: route.priority !== undefined ? route.priority : 0.7
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), config.outputPath), sitemap);
  console.log(`Sitemap generated at ${config.outputPath}`);
}

/**
 * Example usage:
 * 
 * generateSitemap({
 *   baseUrl: 'https://alyah-knowledge.com',
 *   outputPath: 'public/sitemap.xml',
 *   routes: [
 *     { path: '/', priority: 1.0, changefreq: 'daily' },
 *     { path: '/market', priority: 0.9, changefreq: 'hourly' },
 *     // ... other routes
 *   ]
 * });
 */

// For dynamic sitemap generation based on content (like articles or dictionary terms)
export async function generateDynamicSitemap(
  config: SitemapConfig,
  fetchContentUrls: () => Promise<string[]>,
  contentConfig: {
    changefreq: SitemapEntry['changefreq'];
    priority: number;
    basePath: string;
  }
): Promise<void> {
  try {
    // Get base routes
    const entries: SitemapEntry[] = config.routes.map(route => ({
      loc: `${config.baseUrl}${route.path}`,
      lastmod: route.lastmod || new Date().toISOString().split('T')[0],
      changefreq: route.changefreq || 'weekly',
      priority: route.priority !== undefined ? route.priority : 0.7
    }));

    // Get dynamic content routes
    const contentSlugs = await fetchContentUrls();
    const contentEntries: SitemapEntry[] = contentSlugs.map(slug => ({
      loc: `${config.baseUrl}${contentConfig.basePath}/${slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: contentConfig.changefreq,
      priority: contentConfig.priority
    }));

    // Combine all entries
    const allEntries = [...entries, ...contentEntries];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(process.cwd(), config.outputPath), sitemap);
    console.log(`Dynamic sitemap generated at ${config.outputPath} with ${allEntries.length} URLs`);
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
  }
}