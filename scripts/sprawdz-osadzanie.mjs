import { liveSites } from '../src/data/prace.ts';
import { siteUrl } from '../src/data/strona.ts';

const portfolioOrigin = siteUrl;

function allowsFraming(headers) {
  const frameOptions = headers.get('x-frame-options')?.toLowerCase();
  if (frameOptions === 'deny' || frameOptions === 'sameorigin') return false;
  const policy = headers.get('content-security-policy') ?? '';
  const directive = policy.split(';').map((part) => part.trim()).find((part) => part.startsWith('frame-ancestors'));
  if (!directive) return true;
  const sources = directive.split(/\s+/).slice(1);
  return sources.includes('*') || sources.includes(portfolioOrigin) || sources.includes('https:');
}

let mismatches = 0;
for (const site of liveSites) {
  const response = await fetch(site.url, { redirect: 'follow' });
  const embeddable = allowsFraming(response.headers);
  const matches = embeddable === site.allowsEmbedding;
  if (!matches) mismatches += 1;
  console.log(`${site.url} - osadzanie ${embeddable ? 'dozwolone' : 'zablokowane'}, w danych: ${site.allowsEmbedding}${matches ? '' : ' - popraw allowsEmbedding w src/data/prace.ts'}`);
}
process.exitCode = mismatches ? 1 : 0;
