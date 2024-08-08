import { MetadataRoute } from 'next';
import { post as PostType } from '@prisma/client';
import { getCacheAllPosts } from '@/actions/cache/post';
import { getCacheImagesCount } from '@/actions/cache/image';
import { getCacheJLPTTimes } from '@/actions/cache/jlpt';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const imagesCount = await getCacheImagesCount();
  const jlptTimes = await getCacheJLPTTimes();
  const postSlugs: PostType[] = await getCacheAllPosts();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Gallery
  for (let i = 0; i < imagesCount; i++) {
    const sitemapGalleryUrl: MetadataRoute.Sitemap[0] = {
      url: `https://${process.env.DOMAIN}/vi/gallery/${i}`,
      lastModified: new Date(2024, 7, 1, 11, 11, 11), // specific time
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: `https://${process.env.DOMAIN}/en/gallery/${i}`,
          ja: `https://${process.env.DOMAIN}/ja/gallery/${i}`,
        },
      },
    };
    sitemapEntries.push(sitemapGalleryUrl);
  }

  // Post
  postSlugs.forEach((post) => {
    const sitemapUrl: MetadataRoute.Sitemap[0] = {
      url: `https://${process.env.DOMAIN}/vi/${post.post_category}/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: `https://${process.env.DOMAIN}/en/${post.post_category}/${post.slug}`,
          ja: `https://${process.env.DOMAIN}/ja/${post.post_category}/${post.slug}`,
        },
      },
    };
    sitemapEntries.push(sitemapUrl);
  });

  // JLPT
  jlptTimes.forEach((time: { year: number; month: number }) => {
    ['read', 'listen'].forEach((slug) => {
      const sitemapUrl: MetadataRoute.Sitemap[0] = {
        url: `https://${process.env.DOMAIN}/vi/jlpt/n1/${time.year}/${time.month}/${slug}`,
        lastModified: new Date(2024, 7, 1, 11, 11, 11), // specific time
        changeFrequency: 'yearly',
        priority: 1,
        alternates: {
          languages: {
            en: `https://${process.env.DOMAIN}/en/jlpt/n1/${time.year}/${time.month}/${slug}`,
            ja: `https://${process.env.DOMAIN}/ja/jlpt/n1/${time.year}/${time.month}/${slug}`,
          },
        },
      };
      sitemapEntries.push(sitemapUrl);
    });
  });

  return sitemapEntries;
}
