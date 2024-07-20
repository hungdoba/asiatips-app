import { unstable_cache } from 'next/cache';
import { getCategories } from '../no-cache/category';

// For jlpt listen
export const getCacheCategories = unstable_cache(
  async () => getCategories(),
  ['cache-categories'],
  { tags: ['cache-categories'] }
);
