import { SitemapStream, streamToPromise } from 'sitemap';
import { serverQueryContent } from '#content/server';

export default defineEventHandler(async (event) => {
  const defaults = { lastmod: new Date().toISOString(), changefreq: 'weekly' };

  // Fetching all the documents
  const docs = await serverQueryContent(event).find();

  const sitemap = new SitemapStream({ hostname: 'https://bogdankostyuk.xyz' });

  sitemap.write({ url: '/', ...defaults });

  for (const doc of docs)
    if (doc._path.includes('project'))
      sitemap.write({ url: doc._path, ...defaults });

  sitemap.end();

  return streamToPromise(sitemap);
});
