'use strict';

const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '..', 'public');
const siteRoot = '/blog/';
const htmlFiles = [];
const hiddenMarker = '<!-- flag of hidden posts -->';

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(fullPath);
  }
}

function localTarget(url) {
  if (!url.startsWith(siteRoot)) return null;

  const withoutQuery = url.split(/[?#]/, 1)[0];
  let decoded;
  try {
    decoded = decodeURIComponent(withoutQuery.slice(siteRoot.length));
  } catch {
    return { malformed: true, url };
  }

  const relative = decoded.replace(/^\/+/, '');
  const target = path.resolve(publicDir, relative);
  if (!target.startsWith(publicDir + path.sep) && target !== publicDir) {
    return { malformed: true, url };
  }

  return { target, url };
}

function existsAsPublishedPath(target) {
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return true;
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    return fs.existsSync(path.join(target, 'index.html'));
  }
  return fs.existsSync(`${target}.html`) || fs.existsSync(path.join(target, 'index.html'));
}

if (!fs.existsSync(publicDir)) {
  console.error('public/ does not exist. Run npm run build first.');
  process.exit(1);
}

walk(publicDir);
const failures = new Map();
const hiddenPages = new Map();
const hiddenWithoutNoindex = [];
const attributePattern = /(?:href|src)=["']([^"']+)["']/gi;

for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const source = path.relative(publicDir, htmlFile).replace(/\\/g, '/');

  if (html.includes(hiddenMarker)) {
    const relativeUrl = source === 'index.html'
      ? ''
      : source.replace(/index\.html$/, '');
    hiddenPages.set(`${siteRoot}${relativeUrl}`, source);
    if (!html.includes('<meta name="robots" content="noindex">')) {
      hiddenWithoutNoindex.push(source);
    }
  }

  for (const match of html.matchAll(attributePattern)) {
    const resolved = localTarget(match[1]);
    if (!resolved) continue;
    if (resolved.malformed || !existsAsPublishedPath(resolved.target)) {
      if (!failures.has(resolved.url)) failures.set(resolved.url, new Set());
      failures.get(resolved.url).add(source);
    }
  }
}

const discoveryFiles = htmlFiles.filter(htmlFile => {
  const source = path.relative(publicDir, htmlFile).replace(/\\/g, '/');
  return source === 'index.html'
    || /^(?:page|timeline|categories|tags)\//.test(source);
});

for (const name of ['atom.xml', 'sitemap.xml', 'sitemap.txt', 'search.json']) {
  const fullPath = path.join(publicDir, name);
  if (fs.existsSync(fullPath)) discoveryFiles.push(fullPath);
}

const exposedHiddenPages = new Map();
for (const discoveryFile of discoveryFiles) {
  const content = fs.readFileSync(discoveryFile, 'utf8');
  const source = path.relative(publicDir, discoveryFile).replace(/\\/g, '/');
  for (const hiddenUrl of hiddenPages.keys()) {
    if (!content.includes(hiddenUrl)) continue;
    if (!exposedHiddenPages.has(hiddenUrl)) exposedHiddenPages.set(hiddenUrl, new Set());
    exposedHiddenPages.get(hiddenUrl).add(source);
  }
}

if (failures.size) {
  console.error(`Found ${failures.size} broken local URL(s):`);
  for (const [url, sources] of failures) {
    console.error(`- ${url} (from ${[...sources].join(', ')})`);
  }
}

if (hiddenWithoutNoindex.length) {
  console.error(`Hidden page(s) missing noindex: ${hiddenWithoutNoindex.join(', ')}`);
}

if (exposedHiddenPages.size) {
  console.error(`Found ${exposedHiddenPages.size} hidden page(s) in discovery surfaces:`);
  for (const [url, sources] of exposedHiddenPages) {
    console.error(`- ${url} (from ${[...sources].join(', ')})`);
  }
}

if (failures.size || hiddenWithoutNoindex.length || exposedHiddenPages.size) process.exit(1);

console.log(
  `Validated ${htmlFiles.length} HTML files: all local ${siteRoot} links resolve; `
  + `${hiddenPages.size} hidden page(s) stay out of indexes, feeds, and sitemaps.`
);
