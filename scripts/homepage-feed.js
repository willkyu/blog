'use strict';

const path = require('path');
const { buildHomepageFeed } = require('../tools/homepage-feed-core');

hexo.extend.generator.register('homepage-feed', function homepageFeedGenerator(locals) {
  const posts = [];
  locals.posts.forEach(post => {
    posts.push({
      source: post.source,
      path: post.path,
      permalink: post.permalink,
      hidden: Boolean(post.hidden)
    });
  });

  const feed = buildHomepageFeed({
    manifestPath: path.join(this.source_dir, '_homepage.md'),
    sourceDir: this.source_dir,
    root: this.config.root,
    posts
  });

  return {
    path: 'homepage-feed.json',
    data: `${JSON.stringify(feed, null, 2)}\n`
  };
});
