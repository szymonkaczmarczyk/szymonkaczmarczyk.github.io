import type { MetadataRoute } from 'next';
import { siteUrl } from '@/data/strona';

export const dynamic = 'force-static';

const paths = ['/', '/polityka-prywatnosci/', '/regulamin/'];
const lastModified = '2026-11-03';

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${siteUrl}${path}`, lastModified }));
}
