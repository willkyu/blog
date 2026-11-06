'use strict';

const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '..', 'public');
const siteRoot = '/blog/';
const htmlFiles = [];
const publishedFiles = [];
const hiddenMarker = '<!-- flag of hidden posts -->';
const allowedBinds = new Set(['research', 'blog', 'pokemon', 'projects']);
const allowedAppearances = new Set(['text', 'gallery', 'book', 'browser', 'disc']);
const coverRequiredAppearances = new Set(['gallery', 'book', 'browser', 'disc']);

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.isFile()) {
      publishedFiles.push(fullPath);
      if (entry.name.endsWith('.html')) htmlFiles.push(fullPath);
    }
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

function compareFeedItems(left, right) {
  if (left.order !== right.order) return left.order - right.order;
  if (left.href < right.href) return -1;
  if (left.href > right.href) return 1;
  return 0;
}

function validateHomepageFeed() {
  const issues = [];
  const feedPath = path.join(publicDir, 'homepage-feed.json');
  if (!fs.existsSync(feedPath)) {
    return { issues: ['homepage-feed.json was not generated'], itemCount: 0 };
  }

  let feed;
  try {
    feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
  } catch (error) {
    return { issues: [`homepage-feed.json is not valid JSON: ${error.message}`], itemCount: 0 };
  }

  if (!feed || typeof feed !== 'object' || Array.isArray(feed)) {
    return { issues: ['homepage-feed.json must contain a JSON object'], itemCount: 0 };
  }

  const topLevelKeys = Object.keys(feed);
  const expectedTopLevelKeys = ['schemaVersion', 'source', 'generatedAt', 'items'];
  for (const key of topLevelKeys) {
    if (!expectedTopLevelKeys.includes(key)) issues.push(`feed has unexpected top-level field "${key}"`);
  }
  for (const key of expectedTopLevelKeys) {
    if (!topLevelKeys.includes(key)) issues.push(`feed is missing top-level field "${key}"`);
  }

  if (feed.schemaVersion !== 1) issues.push('feed.schemaVersion must be 1');
  if (feed.source !== 'blog') issues.push('feed.source must be "blog"');
  if (
    typeof feed.generatedAt !== 'string'
    || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(feed.generatedAt)
    || Number.isNaN(Date.parse(feed.generatedAt))
  ) {
    issues.push('feed.generatedAt must be a UTC ISO-8601 timestamp');
  }
  if (!Array.isArray(feed.items)) {
    issues.push('feed.items must be an array');
    return { issues, itemCount: 0 };
  }

  const requiredItemKeys = ['bind', 'title', 'summary', 'href', 'appearance', 'tags', 'order'];
  const allowedItemKeys = new Set([...requiredItemKeys, 'cover']);
  const hrefs = new Set();

  feed.items.forEach((item, index) => {
    const label = `feed.items[${index}]`;
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      issues.push(`${label} must be an object`);
      return;
    }

    for (const key of Object.keys(item)) {
      if (!allowedItemKeys.has(key)) issues.push(`${label} has unexpected field "${key}"`);
    }
    for (const key of requiredItemKeys) {
      if (!Object.hasOwn(item, key)) issues.push(`${label} is missing field "${key}"`);
    }

    if (!allowedBinds.has(item.bind)) issues.push(`${label}.bind is invalid`);
    if (!allowedAppearances.has(item.appearance)) issues.push(`${label}.appearance is invalid`);
    if (typeof item.title !== 'string' || !item.title.trim() || /[\r\n]/.test(item.title)) {
      issues.push(`${label}.title must be non-empty single-line text`);
    }
    if (typeof item.summary !== 'string' || !item.summary.trim() || /[\r\n]/.test(item.summary)) {
      issues.push(`${label}.summary must be non-empty single-line text`);
    }
    if (!Number.isSafeInteger(item.order)) issues.push(`${label}.order must be an integer`);
    if (!Array.isArray(item.tags) || item.tags.some(tag => typeof tag !== 'string' || !tag.trim())) {
      issues.push(`${label}.tags must be an array of non-empty strings`);
    }
    if (coverRequiredAppearances.has(item.appearance) && typeof item.cover !== 'string') {
      issues.push(`${label}.cover is required for appearance "${item.appearance}"`);
    }

    if (typeof item.href !== 'string' || !item.href.startsWith(siteRoot)) {
      issues.push(`${label}.href must start with ${siteRoot}`);
    } else {
      if (hrefs.has(item.href)) issues.push(`${label}.href duplicates ${item.href}`);
      hrefs.add(item.href);
      const resolved = localTarget(item.href);
      if (!resolved || resolved.malformed || !existsAsPublishedPath(resolved.target)) {
        issues.push(`${label}.href does not resolve in public/: ${item.href}`);
      }
    }

    if (Object.hasOwn(item, 'cover')) {
      if (typeof item.cover !== 'string' || !item.cover.startsWith(siteRoot)) {
        issues.push(`${label}.cover must start with ${siteRoot}`);
      } else {
        const resolved = localTarget(item.cover);
        if (
          !resolved
          || resolved.malformed
          || !fs.existsSync(resolved.target)
          || !fs.statSync(resolved.target).isFile()
        ) {
          issues.push(`${label}.cover does not resolve to a public file: ${item.cover}`);
        }
      }
    }
  });

  for (let index = 1; index < feed.items.length; index += 1) {
    if (compareFeedItems(feed.items[index - 1], feed.items[index]) > 0) {
      issues.push('feed.items is not sorted by order and then href');
      break;
    }
  }

  return { issues, itemCount: feed.items.length };
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

const publishedManifestFiles = publishedFiles
  .map(file => path.relative(publicDir, file).replace(/\\/g, '/'))
  .filter(file => /(^|\/)_homepage(?:\.|\/|$)/.test(file));
const manifestDiscoveryLeaks = [];
for (const discoveryFile of discoveryFiles) {
  const content = fs.readFileSync(discoveryFile, 'utf8');
  if (!content.includes('_homepage.md') && !content.includes(`${siteRoot}_homepage`)) continue;
  manifestDiscoveryLeaks.push(path.relative(publicDir, discoveryFile).replace(/\\/g, '/'));
}

const homepageFeed = validateHomepageFeed();

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

if (publishedManifestFiles.length) {
  console.error(`_homepage.md produced public file(s): ${publishedManifestFiles.join(', ')}`);
}

if (manifestDiscoveryLeaks.length) {
  console.error(`_homepage.md leaked into discovery surface(s): ${manifestDiscoveryLeaks.join(', ')}`);
}

if (homepageFeed.issues.length) {
  console.error(`Homepage feed validation failed with ${homepageFeed.issues.length} issue(s):`);
  for (const issue of homepageFeed.issues) console.error(`- ${issue}`);
}

if (
  failures.size
  || hiddenWithoutNoindex.length
  || exposedHiddenPages.size
  || publishedManifestFiles.length
  || manifestDiscoveryLeaks.length
  || homepageFeed.issues.length
) process.exit(1);

console.log(
  `Validated ${htmlFiles.length} HTML files: all local ${siteRoot} links resolve; `
  + `${hiddenPages.size} hidden page(s) and _homepage.md stay out of discovery surfaces; `
  + `homepage-feed.json contains ${homepageFeed.itemCount} valid item(s).`
);
