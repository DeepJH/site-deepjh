import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts } from '../utils/content';

export async function GET(context: APIContext) {
  const publishedPosts = await getPublishedPosts();

  return rss({
    title: 'DeepJH — Technical Publications',
    description:
      'Code-level technical essays, systems architecture deep dives, and distributed systems engineering by DeepJH.',
    site: context.site || 'https://deepjh.com',
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/posts/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
