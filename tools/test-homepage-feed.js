'use strict';

const assert = require('assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  HomepageFeedError,
  buildHomepageFeed,
  parseManifest
} = require('./homepage-feed-core');

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'homepage-feed-'));
const sourceDir = path.join(tempRoot, 'source');
const manifestPath = path.join(sourceDir, '_homepage.md');
fs.mkdirSync(path.join(sourceDir, 'images'), { recursive: true });
fs.writeFileSync(path.join(sourceDir, 'images', '封面 image.png'), 'fixture');

const posts = [
  {
    source: '_posts/Notes/Alpha.md',
    path: 'ignored-by-test/',
    permalink: 'https://willkyu.github.io/blog/custom-alpha/'
  },
  {
    source: '_posts/Notes/Beta.md',
    path: 'Beta/',
    permalink: 'https://willkyu.github.io/blog/Beta/'
  }
];

function manifest(body) {
  return `---\nhomepageManifest: 1\n---\n\n${body.trim()}\n`;
}

function build(raw, overrides = {}) {
  fs.writeFileSync(manifestPath, raw);
  return buildHomepageFeed({
    manifestPath,
    sourceDir,
    root: '/blog/',
    posts,
    generatedAt: new Date('2026-01-02T03:04:05.000Z'),
    ...overrides
  });
}

function expectError(fn, pattern) {
  assert.throws(fn, error => {
    assert.ok(error instanceof HomepageFeedError);
    assert.match(error.message, pattern);
    return true;
  });
}

expectError(
  () => build(manifest(`
## [[Notes/Beta|Beta title]]
bind:: projects
appearance:: gallery
summary:: Gallery summary.
cover:: [[images/封面 image.png]]
tags:: image， project
order:: 20

## [[_posts/Notes/Alpha.md|Alpha title]]
bind:: blog
appearance:: text
summary:: Text summary.
tags:: writing, notes
order:: 10
enabled:: true

## [[Notes/Beta|Disabled duplicate is still invalid]]
bind:: blog
appearance:: text
summary:: Disabled entry.
order:: 30
enabled:: false
  `)),
  /duplicates href/
);

const feed = build(manifest(`
## [[Notes/Beta|Beta title]]
bind:: projects
appearance:: gallery
summary:: Gallery summary.
cover:: [[images/封面 image.png]]
tags:: image， project
order:: 20

## [[_posts/Notes/Alpha.md|Alpha title]]
bind:: blog
appearance:: text
summary:: Text summary.
tags:: writing, notes
order:: 10
enabled:: true
`));

assert.deepEqual(feed, {
  schemaVersion: 1,
  source: 'blog',
  generatedAt: '2026-01-02T03:04:05.000Z',
  items: [
    {
      bind: 'blog',
      title: 'Alpha title',
      summary: 'Text summary.',
      href: '/blog/custom-alpha/',
      appearance: 'text',
      tags: ['writing', 'notes'],
      order: 10
    },
    {
      bind: 'projects',
      title: 'Beta title',
      summary: 'Gallery summary.',
      href: '/blog/Beta/',
      appearance: 'gallery',
      tags: ['image', 'project'],
      order: 20,
      cover: '/blog/images/%E5%B0%81%E9%9D%A2%20image.png'
    }
  ]
});

const disabledFeed = build(manifest(`
## [[Notes/Alpha|Not exported]]
bind:: research
appearance:: text
summary:: This remains valid but is disabled.
order:: 1
enabled:: false
`));
assert.deepEqual(disabledFeed.items, []);

expectError(
  () => parseManifest(manifest(`
## [[Notes/Alpha|Has ID]]
bind:: blog
appearance:: text
summary:: Summary.
order:: 1
id:: handwritten
  `)),
  /IDs are generated/
);

expectError(
  () => parseManifest(manifest(`
## [[Notes/Alpha|Has layout data]]
bind:: blog
appearance:: text
summary:: Summary.
order:: 1
x:: 20
  `)),
  /unsupported field "x"/
);

expectError(
  () => parseManifest(manifest(`
## [[Notes/Alpha|Missing cover]]
bind:: blog
appearance:: book
summary:: Summary.
order:: 1
  `)),
  /requires a cover/
);

expectError(
  () => build(manifest(`
## [[Notes/Missing|Missing post]]
bind:: blog
appearance:: text
summary:: Summary.
order:: 1
  `)),
  /does not resolve to a published blog post/
);

expectError(
  () => build(manifest(`
## [[Notes/Alpha|Missing asset]]
bind:: blog
appearance:: gallery
summary:: Summary.
cover:: [[images/missing.png]]
order:: 1
  `)),
  /cover does not resolve/
);

console.log('Homepage feed parser and resolver tests passed.');
