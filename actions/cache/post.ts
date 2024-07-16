import { unstable_cache } from 'next/cache';
import {
  getAllFullPosts,
  getAllPosts,
  getPostByCategory,
  getPostDetail,
} from '../no-cache/post';
import { Locale } from '@/i18n-config';

// For sitemap
export const getCacheAllPosts = unstable_cache(
  async () => getAllPosts(),
  ['cache-all-posts'],
  { tags: ['cache-post'] }
);

// For home page
export const getCacheAllFullPosts = unstable_cache(
  async (lang: Locale) => getAllFullPosts(lang),
  ['cache-all-full-posts'],
  { tags: ['cache-post'] }
);

// For category page
export const getCachePostByCategory = unstable_cache(
  async (lang: Locale, category: string) => getPostByCategory(lang, category),
  ['cache-category-full-posts'],
  { tags: ['cache-post'] }
);

// For post detail page
export const getCachePostDetail = unstable_cache(
  async (lang: Locale, category: string, slug: string) =>
    getPostDetail(lang, category, slug),
  ['cache-posts-detail'],
  { tags: ['cache-post'] }
);
