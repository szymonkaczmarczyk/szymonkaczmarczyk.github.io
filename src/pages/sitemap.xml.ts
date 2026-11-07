import type { APIRoute } from 'astro';
import { projectHref, projects } from '../data/projekty';
import { legalPages } from '../data/strona';

const publicPaths = ['/', ...projects.map((project) => projectHref(project.slug)), legalPages.privacy.href, legalPages.terms.href];

export const GET: APIRoute = ({ site }) => {
  const entries = publicPaths.map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
