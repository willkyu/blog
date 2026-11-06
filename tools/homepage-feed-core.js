'use strict';

const fs = require('fs');
const path = require('path');
const { validateHomepageItemTypesContract } = require('./homepage-item-types');

const ALLOWED_BINDS = new Set(['research', 'blog', 'pokemon', 'projects']);
const REQUIRED_FIELDS = ['bind', 'appearance', 'summary', 'order'];
const OPTIONAL_FIELDS = ['tags', 'enabled', 'cover'];
const ALLOWED_FIELDS = new Set([...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]);

class HomepageFeedError extends Error {
  constructor(message) {
    super(`Homepage manifest: ${message}`);
    this.name = 'HomepageFeedError';
  }
}

function normalizeSlashes(value) {
  return value.replace(/\\/g, '/');
}

function withoutMarkdownExtension(value) {
  return value.replace(/\.md$/i, '');
}

function normalizeDocumentTarget(value) {
  let target = normalizeSlashes(value.trim()).replace(/^\/+/, '');
  target = target.replace(/^source\//, '');
  return withoutMarkdownExtension(target);
}

function entryLabel(entry) {
  return `entry "${entry.title}" (${entry.target})`;
}

function parseFrontMatter(raw, manifestName) {
  const normalized = raw.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  if (!normalized.startsWith('---\n')) {
    throw new HomepageFeedError(`${manifestName} must start with YAML front matter`);
  }

  const closing = normalized.indexOf('\n---\n', 4);
  if (closing === -1) {
    throw new HomepageFeedError(`${manifestName} has unclosed YAML front matter`);
  }

  const frontMatter = normalized.slice(4, closing);
  const fields = new Map();
  for (const [index, line] of frontMatter.split('\n').entries()) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([A-Za-z][A-Za-z0-9_-]*)\s*:\s*(.*?)\s*$/);
    if (!match) {
      throw new HomepageFeedError(
        `${manifestName} front matter line ${index + 2} is invalid: ${trimmed}`
      );
    }
    if (fields.has(match[1])) {
      throw new HomepageFeedError(`${manifestName} repeats front matter field "${match[1]}"`);
    }
    fields.set(match[1], match[2]);
  }

  const unknown = [...fields.keys()].filter(key => key !== 'homepageManifest');
  if (unknown.length) {
    throw new HomepageFeedError(
      `${manifestName} has unsupported front matter field "${unknown[0]}"`
    );
  }
  if (fields.get('homepageManifest') !== '1') {
    throw new HomepageFeedError(`${manifestName} must set homepageManifest: 1`);
  }

  return normalized.slice(closing + 5);
}

function parseHeading(line, lineNumber) {
  const match = line.match(/^##\s+\[\[([^\]|]+)\|([^\]]+)\]\]\s*$/);
  if (!match) {
    throw new HomepageFeedError(
      `line ${lineNumber} must be an H2 Wiki Link with an alias: ## [[document|title]]`
    );
  }

  const target = match[1].trim();
  const title = match[2].trim();
  if (!target || !title) {
    throw new HomepageFeedError(`line ${lineNumber} has an empty document target or title`);
  }

  return { target, title, lineNumber, fields: new Map() };
}

function validateEntry(entry, contract) {
  const label = entryLabel(entry);
  for (const field of REQUIRED_FIELDS) {
    if (!entry.fields.has(field)) {
      throw new HomepageFeedError(`${label} is missing required field "${field}"`);
    }
  }

  const bind = entry.fields.get('bind');
  if (!ALLOWED_BINDS.has(bind)) {
    throw new HomepageFeedError(
      `${label} has invalid bind "${bind}"; expected one of ${[...ALLOWED_BINDS].join(', ')}`
    );
  }

  const appearance = entry.fields.get('appearance');
  const itemType = contract.itemTypes.find(type => type.appearance === appearance);
  if (!itemType) {
    throw new HomepageFeedError(
      `${label} has invalid appearance "${appearance}"; expected one of ${contract.itemTypes.map(type => type.appearance).join(', ')}`
    );
  }

  const summary = entry.fields.get('summary');
  if (!summary) {
    throw new HomepageFeedError(`${label} must have a non-empty, single-line summary`);
  }

  const orderValue = entry.fields.get('order');
  if (!/^-?\d+$/.test(orderValue)) {
    throw new HomepageFeedError(`${label} has non-integer order "${orderValue}"`);
  }
  const order = Number(orderValue);
  if (!Number.isSafeInteger(order)) {
    throw new HomepageFeedError(`${label} has order outside JavaScript's safe integer range`);
  }

  const enabledValue = entry.fields.get('enabled');
  if (enabledValue !== undefined && enabledValue !== 'true' && enabledValue !== 'false') {
    throw new HomepageFeedError(`${label} has invalid enabled value "${enabledValue}"`);
  }

  const cover = entry.fields.get('cover');
  if (itemType.coverRequired && !cover) {
    throw new HomepageFeedError(`${label} requires a cover when appearance is "${appearance}"`);
  }

  const tags = (entry.fields.get('tags') || '')
    .split(/[,，]/)
    .map(tag => tag.trim())
    .filter(Boolean);

  return {
    target: entry.target,
    title: entry.title,
    bind,
    appearance,
    summary,
    order,
    enabled: enabledValue !== 'false',
    cover,
    tags
  };
}

function parseManifest(raw, manifestName = '_homepage.md', contract) {
  const validatedContract = validateHomepageItemTypesContract(contract);
  const body = parseFrontMatter(raw, manifestName).replace(/<!--[\s\S]*?-->/g, '');
  const entries = [];
  let current = null;

  for (const [index, originalLine] of body.split('\n').entries()) {
    const lineNumber = index + 4;
    const line = originalLine.trim();
    if (!line) continue;

    if (line.startsWith('##')) {
      if (current) entries.push(validateEntry(current, validatedContract));
      current = parseHeading(line, lineNumber);
      continue;
    }

    if (!current) {
      throw new HomepageFeedError(
        `line ${lineNumber} contains content before the first homepage entry`
      );
    }

    const fieldMatch = line.match(/^([A-Za-z][A-Za-z0-9_-]*)\s*::\s*(.*)$/);
    if (!fieldMatch) {
      throw new HomepageFeedError(
        `${entryLabel(current)} has invalid content on line ${lineNumber}; fields must use name:: value`
      );
    }

    const [, field, rawValue] = fieldMatch;
    const value = rawValue.trim();
    if (field === 'id') {
      throw new HomepageFeedError(
        `${entryLabel(current)} defines "id"; IDs are generated by the homepage and must not be set here`
      );
    }
    if (!ALLOWED_FIELDS.has(field)) {
      throw new HomepageFeedError(`${entryLabel(current)} has unsupported field "${field}"`);
    }
    if (current.fields.has(field)) {
      throw new HomepageFeedError(`${entryLabel(current)} repeats field "${field}"`);
    }
    current.fields.set(field, value);
  }

  if (current) entries.push(validateEntry(current, validatedContract));
  return entries;
}

function validateFeedItemContract(item, contract, label) {
  const { requiredFields, optionalFields, forbiddenFields } = contract.feedItem;
  const allowedFields = new Set([...requiredFields, ...optionalFields]);
  for (const field of requiredFields) {
    if (!Object.hasOwn(item, field)) {
      throw new HomepageFeedError(`${label} cannot satisfy contract: missing output field "${field}"`);
    }
  }
  for (const field of forbiddenFields) {
    if (Object.hasOwn(item, field)) {
      throw new HomepageFeedError(`${label} cannot satisfy contract: forbidden output field "${field}"`);
    }
  }
  for (const field of Object.keys(item)) {
    if (!allowedFields.has(field)) {
      throw new HomepageFeedError(`${label} cannot satisfy contract: unknown output field "${field}"`);
    }
  }
}

function postCandidates(posts, target) {
  const normalizedTarget = normalizeDocumentTarget(target);
  const exact = posts.filter(post => {
    const source = withoutMarkdownExtension(normalizeSlashes(post.source || ''));
    const vaultRelative = source.replace(/^_posts\//, '');
    return normalizedTarget === source || normalizedTarget === vaultRelative;
  });
  if (exact.length || normalizedTarget.includes('/')) return exact;

  return posts.filter(post => {
    const source = withoutMarkdownExtension(normalizeSlashes(post.source || ''));
    return path.posix.basename(source) === normalizedTarget;
  });
}

function resolvePost(entry, posts, siteRoot) {
  const candidates = postCandidates(posts, entry.target);
  const label = entryLabel(entry);
  if (!candidates.length) {
    throw new HomepageFeedError(`${label} does not resolve to a published blog post`);
  }
  if (candidates.length > 1) {
    throw new HomepageFeedError(
      `${label} is ambiguous; it matches ${candidates.map(post => post.source).join(', ')}`
    );
  }

  const post = candidates[0];
  if (post.hidden) {
    throw new HomepageFeedError(`${label} resolves to hidden post ${post.source}`);
  }

  let href;
  try {
    href = new URL(post.permalink).pathname;
  } catch {
    const relative = normalizeSlashes(post.path || '').replace(/^\/+/, '');
    href = `${siteRoot}${relative}`;
  }

  if (!href.startsWith(siteRoot)) {
    throw new HomepageFeedError(
      `${label} resolves outside configured site root ${siteRoot}: ${href}`
    );
  }
  return href;
}

function parseCoverTarget(value, entry) {
  const wikiMatch = value.match(/^!?\[\[([^\]|]+)(?:\|[^\]]+)?\]\]$/);
  if ((value.startsWith('[[') || value.startsWith('![[')) && !wikiMatch) {
    throw new HomepageFeedError(`${entryLabel(entry)} has malformed cover Wiki Link "${value}"`);
  }
  const target = (wikiMatch ? wikiMatch[1] : value).trim();
  if (!target) throw new HomepageFeedError(`${entryLabel(entry)} has an empty cover`);
  return target;
}

function encodePublicPath(relativePath) {
  return normalizeSlashes(relativePath)
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/');
}

function resolveCover(entry, sourceDir, siteRoot) {
  const rawTarget = parseCoverTarget(entry.cover, entry);
  let target = normalizeSlashes(rawTarget).replace(/^\/+/, '').replace(/^source\//, '');
  const absolute = path.resolve(sourceDir, ...target.split('/'));
  const relative = path.relative(sourceDir, absolute);

  if (!relative || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new HomepageFeedError(`${entryLabel(entry)} has cover outside the Obsidian Vault`);
  }
  if (relative.split(path.sep).some(segment => segment.startsWith('.'))) {
    throw new HomepageFeedError(`${entryLabel(entry)} has cover in a private dot-directory`);
  }
  if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    throw new HomepageFeedError(
      `${entryLabel(entry)} cover does not resolve to a file in the Vault: ${rawTarget}`
    );
  }
  if (/\.md$/i.test(relative)) {
    throw new HomepageFeedError(`${entryLabel(entry)} cover must be a public asset, not Markdown`);
  }

  target = normalizeSlashes(relative);
  return `${siteRoot}${encodePublicPath(target)}`;
}

function normalizeSiteRoot(root) {
  const normalized = `/${String(root || '/').replace(/^\/+|\/+$/g, '')}/`;
  return normalized === '//' ? '/' : normalized;
}

function buildHomepageFeed({ manifestPath, sourceDir, root, posts, contract, generatedAt = new Date() }) {
  const validatedContract = validateHomepageItemTypesContract(contract);
  const manifestName = path.basename(manifestPath);
  if (!fs.existsSync(manifestPath)) {
    throw new HomepageFeedError(`${manifestName} is missing from the Obsidian Vault root`);
  }

  const siteRoot = normalizeSiteRoot(root);
  const entries = parseManifest(
    fs.readFileSync(manifestPath, 'utf8'),
    manifestName,
    validatedContract
  );
  const resolved = [];
  const hrefSources = new Map();

  for (const entry of entries) {
    const href = resolvePost(entry, posts, siteRoot);
    if (hrefSources.has(href)) {
      throw new HomepageFeedError(
        `${entryLabel(entry)} duplicates href ${href} already used by "${hrefSources.get(href)}"`
      );
    }
    hrefSources.set(href, entry.title);

    const item = {
      bind: entry.bind,
      title: entry.title,
      summary: entry.summary,
      href,
      appearance: entry.appearance,
      tags: entry.tags,
      order: entry.order
    };
    if (entry.cover) item.cover = resolveCover(entry, sourceDir, siteRoot);
    validateFeedItemContract(item, validatedContract, entryLabel(entry));
    if (entry.enabled) resolved.push(item);
  }

  resolved.sort((left, right) => {
    if (left.order !== right.order) return left.order - right.order;
    if (left.href < right.href) return -1;
    if (left.href > right.href) return 1;
    return 0;
  });

  return {
    schemaVersion: validatedContract.feedSchemaVersion,
    source: 'blog',
    generatedAt: generatedAt.toISOString(),
    items: resolved
  };
}

module.exports = {
  ALLOWED_BINDS,
  HomepageFeedError,
  buildHomepageFeed,
  parseManifest
};
