import type { APIRoute } from 'astro';
import { projects } from '../data/projekty';
import { homePaths, localeMeta, locales, privacyPaths, projectPaths, termsPaths, type LocalizedPath } from '../data/jezyki';

const localizedPages: LocalizedPath[] = [homePaths, ...projects.map((project) => projectPaths(project.slug)), privacyPaths, termsPaths];

export const GET: APIRoute = ({ site }) => {
  const absolute = (path: string) => new URL(path, site).href;
  const entries = localizedPages.flatMap((paths) => {
    const alternates = locales.map((locale) => `    <xhtml:link rel="alternate" hreflang="${localeMeta[locale].htmlLang}" href="${absolute(paths[locale])}"/>`).join('\n');
    return locales.map((locale) => `  <url>\n    <loc>${absolute(paths[locale])}</loc>\n${alternates}\n  </url>`);
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
