'use strict';

// Make Obsidian-style links and old root-relative links work at any Hexo root.
// This keeps the Markdown pleasant to edit while the generated URLs remain valid
// on GitHub Project Pages (currently /blog/).

const IMAGE_EXTENSIONS = new Set([
  'avif', 'bmp', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'webp'
]);

const NOTE_EXTENSION = /\.md$/i;

function sitePath(target) {
  const root = (hexo.config.root || '/').replace(/\/+$/, '');
  const clean = target.replace(/^\/+/, '').replace(/\\/g, '/');
  const encoded = clean
    .split('/')
    .map(segment => {
      try {
        return encodeURIComponent(decodeURIComponent(segment));
      } catch {
        return encodeURIComponent(segment);
      }
    })
    .join('/');

  return `${root}/${encoded}`.replace(/^\/$/, '/');
}

function markdownPath(target) {
  const clean = target.replace(/^\/+/, '').replace(/\\/g, '/');
  const encoded = clean
    .split('/')
    .map(segment => {
      try {
        return encodeURIComponent(decodeURIComponent(segment));
      } catch {
        return encodeURIComponent(segment);
      }
    })
    .join('/');
  return `/${encoded}`;
}

function normalizePostTarget(target) {
  return target
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/^_posts\//, '')
    .replace(NOTE_EXTENSION, '');
}

function splitTarget(target) {
  const hashIndex = target.indexOf('#');
  if (hashIndex === -1) return { path: target, heading: '' };
  return {
    path: target.slice(0, hashIndex),
    heading: target.slice(hashIndex + 1)
  };
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderEmbed(rawTarget, rawLabel) {
  const target = rawTarget.trim();
  const label = (rawLabel || '').trim();
  const { path: targetPath } = splitTarget(target);
  const extension = targetPath.includes('.')
    ? targetPath.slice(targetPath.lastIndexOf('.') + 1).toLowerCase()
    : '';

  if (!extension || NOTE_EXTENSION.test(targetPath)) {
    return renderNoteLink(target, label);
  }

  const url = markdownPath(targetPath);
  const name = targetPath.split('/').pop();

  if (IMAGE_EXTENSIONS.has(extension)) {
    const dimensions = label.match(/^(\d+)(?:x(\d+))?$/);
    if (dimensions) {
      const height = dimensions[2] ? ` height="${dimensions[2]}"` : '';
      return `<img src="${url}" alt="${name}" width="${dimensions[1]}"${height}>`;
    }
    return `![${label || name}](${url})`;
  }

  return `[${label || name}](${url})`;
}

function renderNoteLink(rawTarget, rawLabel) {
  const { path: targetPath, heading } = splitTarget(rawTarget.trim());
  const postTarget = normalizePostTarget(targetPath);
  const label = (rawLabel || heading || postTarget.split('/').pop()).trim();
  const quotedTarget = JSON.stringify(postTarget);
  const quotedLabel = JSON.stringify(label);

  if (heading) {
    const anchor = encodeURIComponent(heading.trim().toLowerCase().replace(/\s+/g, '-'));
    return `<a href="{% post_path ${quotedTarget} %}#${anchor}">${escapeHtml(label)}</a>`;
  }

  return `{% post_link ${quotedTarget} ${quotedLabel} %}`;
}

function transform(data) {
  let content = data.content;

  // Marked fixes Markdown URLs using config.root itself, but leaves raw HTML
  // untouched. Handle the latter before generating any HTML from wikilinks.
  const root = (hexo.config.root || '/').replace(/\/+$/, '');
  if (root) {
    content = content.replace(/((?:src|href)\s*=\s*["'])\/(?!\/)/gi, `$1${root}/`);
  }

  // Embeds must run first so their inner wikilinks are not consumed as notes.
  content = content.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
    (_match, target, label) => renderEmbed(target, label));
  content = content.replace(/(?<!!)\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
    (_match, target, label) => renderNoteLink(target, label));

  // Obsidian's vault-absolute attachment paths do not begin with a slash.
  content = content.replace(/(\]\()<?assets\//g, '$1/assets/');

  data.content = content;
  return data;
}

hexo.extend.filter.register('before_post_render', transform, 5);
