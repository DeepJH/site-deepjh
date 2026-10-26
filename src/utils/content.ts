import { getCollection, type CollectionEntry } from 'astro:content';

interface PublishableEntry {
  data: {
    draft?: boolean;
    publishDate: Date;
  };
}

/**
 * Generic helper to filter out drafts in production builds and
 * sort entries chronologically by publishDate descending.
 */
function filterAndSortPublishedEntries<T extends PublishableEntry>(entries: T[]): T[] {
  return entries
    .filter((entry) => import.meta.env.DEV || !entry.data.draft)
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

/**
 * Returns all published projects, excluding drafts in production builds,
 * sorted chronologically by publishDate descending.
 */
export async function getPublishedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects');
  return filterAndSortPublishedEntries(projects);
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
  return filterAndSortPublishedEntries(posts);
}
