import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { WORKS } from '@/lib/works';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number, MetadataRoute.Sitemap[number]['changeFrequency']][] = [
    ['', 1, 'monthly'],
    ['/about', 0.8, 'monthly'],
    ['/business', 0.9, 'monthly'],
    ['/works', 0.9, 'weekly'],
    ['/request', 0.7, 'daily'],
    ['/notice', 0.5, 'weekly'],
    ['/archive', 0.5, 'monthly'],
    ['/privacy', 0.2, 'yearly'],
  ];
  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority })),
    ...WORKS.map((w) => ({
      url: `${SITE_URL}/works/${w.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: [`${SITE_URL}${w.img}`],
    })),
  ];
}
