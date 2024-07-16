import { unstable_cache } from 'next/cache';
import { getAllImages, getImagesCount } from '../no-cache/image';

// For gallery
export const getCacheAllImages = unstable_cache(
  async () => getAllImages(),
  ['cache-all-images'],
  { tags: ['cache-image'] }
);

// For sitemap
export const getCacheImagesCount = unstable_cache(
  async () => getImagesCount(),
  ['cache-images-count'],
  { tags: ['cache-image'] }
);
