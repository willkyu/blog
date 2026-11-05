'use strict';

function plainText(html) {
  return String(html || '')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|ensp|emsp);/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

hexo.extend.generator.register('local-search', locals => {
  const root = hexo.config.root || '/';
  const entries = locals.posts
    .filter(post => !post.hidden)
    .map(post => ({
      title: post.title || 'Untitled',
      url: `${root}${post.path}`,
      date: post.date ? post.date.format('YYYY-MM-DD') : '',
      categories: post.categories ? post.categories.map(item => item.name) : [],
      tags: post.tags ? post.tags.map(item => item.name) : [],
      text: plainText(post.content).slice(0, 20000)
    }));

  return {
    path: 'search.json',
    data: JSON.stringify(entries)
  };
});
