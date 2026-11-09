import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const distRoot = new URL('../dist/', import.meta.url).pathname;
const singleLetterWord = /(?<=^|[\s(„"]|&nbsp;)([aiouwzAIOUWZ]) +(?=\S)/g;
const rawTextElements = /^<(script|style|textarea|pre)\b/i;

function listHtmlFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return listHtmlFiles(path);
    return path.endsWith('.html') ? [path] : [];
  });
}

function bindSingleLetterWords(html) {
  let rawTextElement = null;
  return html
    .split(/(<[^>]+>)/)
    .map((segment) => {
      if (segment.startsWith('<')) {
        const opening = segment.match(rawTextElements);
        if (opening) rawTextElement = opening[1].toLowerCase();
        else if (rawTextElement && segment.toLowerCase().startsWith(`</${rawTextElement}`)) rawTextElement = null;
        return segment;
      }
      if (rawTextElement) return segment;
      return segment.replace(singleLetterWord, '$1&nbsp;');
    })
    .join('');
}

let changedFiles = 0;
for (const htmlFile of listHtmlFiles(distRoot)) {
  const html = readFileSync(htmlFile, 'utf8');
  const bound = bindSingleLetterWords(html);
  if (bound !== html) {
    writeFileSync(htmlFile, bound);
    changedFiles += 1;
  }
}
console.log(`twarde spacje po jednoliterowych słowach: ${changedFiles} plików`);
