import { locales } from '@/i18n-config';
import { post as PostType } from '@prisma/client';
import { getCacheAllPosts } from '@/actions/cache/post';
import { getCacheImagesCount } from '@/actions/cache/image';
import { getCacheJLPTTimes } from '@/actions/cache/_jlpt';

export default async function sitemap() {
  const imagesCount = await getCacheImagesCount();
  const jlptTimes: any = await getCacheJLPTTimes();
  const postSlugs: PostType[] = await getCacheAllPosts();

  const sitemapEntries: any = [];

  locales.forEach((locale) => {
    // gallery
    for (let i = 0; i < imagesCount; i++) {
      const galleryUrl = `https://${process.env.DOMAIN}/${locale.locale}/gallery/${i}`;
      const sitemapGalleryUrl = {
        url: galleryUrl,
        lastModified: new Date(2024, 7, 1, 11, 11, 11), // Example date for last modified
        changeFrequency: 'monthly',
        priority: 1,
      };
      sitemapEntries.push(sitemapGalleryUrl);
    }

    // post
    postSlugs.forEach((post) => {
      const sitemapUrl = {
        url: `https://${process.env.DOMAIN}/${locale.locale}/${post.post_category}/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'monthly',
        priority: 1,
      };
      sitemapEntries.push(sitemapUrl);
    });

    // jlpt
    jlptTimes.forEach((time: any) => {
      ['read', 'listen'].map((slug) => {
        let sitemapUrl = {
          url: `https://${process.env.DOMAIN}/${locale.locale}/jlpt/n1/${time.year}/${time.month}/${slug}`,
          lastModified: new Date(2024, 7, 1, 11, 11, 11),
          changeFrequency: 'yearly',
          priority: 1,
        };
        sitemapEntries.push(sitemapUrl);
      });
    });
  });

  return sitemapEntries;
}
