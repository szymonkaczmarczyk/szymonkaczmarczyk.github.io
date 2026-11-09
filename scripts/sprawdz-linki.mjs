import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const distRoot = new URL('../dist/', import.meta.url).pathname;
const siteOrigin = 'https://szymonkaczmarczyk.is-a.dev';
const referencePattern = /\s(?:href|src|poster|srcset)="([^"]+)"|\sproperty="og:(?:image|url)" content="([^"]+)"/g;

function listHtmlFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return listHtmlFiles(path);
    return path.endsWith('.html') ? [path] : [];
  });
}

function pagePathOf(htmlFile) {
  const relativePath = relative(distRoot, htmlFile).replace(/index\.html$/, '');
  return '/' + relativePath;
}

function fileForPath(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const candidate = join(distRoot, decoded);
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    const index = join(candidate, 'index.html');
    return existsSync(index) ? index : null;
  }
  return existsSync(candidate) ? candidate : null;
}

function idsIn(htmlFile) {
  const html = readFileSync(htmlFile, 'utf8');
  return new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
}

function internalTargetsOf(rawValue, attributeSource) {
  const values = attributeSource.startsWith(' srcset')
    ? rawValue.split(',').map((candidate) => candidate.trim().split(/\s+/)[0])
    : [rawValue];
  return values
    .map((value) => (value.startsWith(siteOrigin) ? value.slice(siteOrigin.length) || '/' : value))
    .filter((value) => (value.startsWith('/') && !value.startsWith('//')) || value.startsWith('#'));
}

const problems = [];
const htmlFiles = listHtmlFiles(distRoot);
let checkedCount = 0;

for (const htmlFile of htmlFiles) {
  const pagePath = pagePathOf(htmlFile);
  const html = readFileSync(htmlFile, 'utf8');
  for (const match of html.matchAll(referencePattern)) {
    for (const target of internalTargetsOf(match[1] ?? match[2], match[0])) {
      checkedCount += 1;
      const [pathPart, anchor] = target.split('#');
      const targetFile = pathPart ? fileForPath(pathPart.split('?')[0]) : htmlFile;
      if (!targetFile) {
        problems.push(`${pagePath} -> ${target} (brak pliku)`);
        continue;
      }
      if (anchor && targetFile.endsWith('.html') && !idsIn(targetFile).has(anchor)) {
        problems.push(`${pagePath} -> ${target} (brak kotwicy)`);
      }
    }
  }
}

const sitemap = readFileSync(join(distRoot, 'sitemap.xml'), 'utf8');
for (const [, location] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  checkedCount += 1;
  if (!fileForPath(location.slice(siteOrigin.length) || '/')) problems.push(`sitemap.xml -> ${location} (brak strony)`);
}

console.log(`strony: ${htmlFiles.length}, sprawdzone odnośniki: ${checkedCount}, problemy: ${problems.length}`);
for (const problem of problems) console.log(`  ${problem}`);
process.exitCode = problems.length ? 1 : 0;
