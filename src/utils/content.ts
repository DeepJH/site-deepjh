import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Returns all published projects, excluding drafts in production builds,
 * sorted chronologically by publishDate descending.
 */
export async function getPublishedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects');
  return projects
    .filter((project) => import.meta.env.DEV || !project.data.draft)
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

/**
 * Returns featured projects for the Curated Showcase on the homepage.
 */
export async function getFeaturedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getPublishedProjects();
  return projects.filter((project) => project.data.featured);
}

/**
 * Returns all published posts, excluding drafts in production builds,
 * sorted chronologically by publishDate descending.
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts');
  return posts
    .filter((post) => import.meta.env.DEV || !post.data.draft)
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}
