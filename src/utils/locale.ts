/**
 * Locale helper utilities for static bilingual routing.
 */

export function isZhLocale(pathname: string): boolean {
  return pathname.startsWith('/zh');
}

export function getBilingualTarget(currentPath: string, isZh: boolean): string {
  if (isZh) {
    return currentPath.replace(/^\/zh/, '') || '/';
  }
  if (currentPath.includes('/posts/tag/')) {
    return '/zh/posts';
  }
  return `/zh${currentPath === '/' ? '' : currentPath}`;
}
