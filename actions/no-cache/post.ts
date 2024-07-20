'use server';

import prisma from '@/lib/prisma';
import { Locale } from '@/i18n-config';
import { revalidateTag } from 'next/cache';
import { post_translation } from '@prisma/client';
import { PostInfo, PostStatic } from '@/types/post';

// For admin update
export async function getPostData(slug: string) {
  const data = await prisma.post.findMany({
    where: { slug: slug },
    include: { post_translation: true },
  });
  const postData = data[0];

  const postStatic: PostStatic = {
    id: postData.id,
    language: 'vi',
    slug: postData.slug,
    headerImage: postData.header_image,
    category: postData.post_category,
    tags: postData.tags.join(', '),
    visible: postData.active ?? false,
  };

  const info: Record<string, PostInfo> = {};
  const content: Record<string, string> = {};

  postData.post_translation.forEach((translation: any) => {
    info[translation.language_code] = {
      title: translation.post_title,
      brief: translation.post_brief,
      tableOfContent: translation.table_of_contents,
    };
    content[translation.language_code] = translation.post_content;
  });

  return { postStatic, postInfo: info, postContent: content };
}

// For admin update
export async function updatePost(formData: FormData): Promise<any> {
  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;
  const post_category = formData.get('post_category') as string;
  const tags = (formData.get('tags') as string)
    .split(',')
    .map((tag) => tag.trim());
  const header_image = formData.get('header_image') as string;
  const active = formData.get('active') === 'true';
  const translations = JSON.parse(formData.get('translations') as string);

  try {
    // Validate incoming data (simplified validation)
    if (!id || !slug || !post_category || !translations) {
      throw new Error('Missing required fields');
    }

    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        slug,
        post_category,
        tags,
        header_image,
        active,
      },
    });

    // Upsert translations
    await Promise.all(
      translations.map((translation: post_translation) =>
        prisma.post_translation.upsert({
          where: {
            post_id_language_code: {
              post_id: Number(id),
              language_code: translation.language_code,
            },
          },
          update: {
            post_title: translation.post_title,
            post_brief: translation.post_brief,
            table_of_contents: translation.table_of_contents,
            post_content: translation.post_content,
          },
          create: {
            post_id: Number(id),
            language_code: translation.language_code,
            post_title: translation.post_title,
            post_brief: translation.post_brief,
            table_of_contents: translation.table_of_contents,
            post_content: translation.post_content,
          },
        })
      )
    );

    revalidateTag('cache-post');
    return true;
  } catch (error) {
    console.error('Error updating post:', error);
    return false;
  }
}

// For admin update
export async function createPost(formData: FormData): Promise<any> {
  const slug = formData.get('slug') as string;
  const post_category = formData.get('post_category') as string;
  const tags = (formData.get('tags') as string)
    .split(',')
    .map((tag) => tag.trim());
  const header_image = (formData.get('header_image') as string) || null;
  const active = formData.get('active') === 'true';
  const translations = JSON.parse(formData.get('translations') as string);

  try {
    // Validate incoming data (simplified validation)
    if (!slug || !post_category || !translations) {
      throw new Error('Missing required fields');
    }

    // Create a new post object
    const newPost = await prisma.post.create({
      data: {
        slug,
        post_category,
        tags: tags || [],
        header_image: header_image!,
        active: Boolean(active) || false,
        post_translation: {
          create: translations.map((translation: any) => ({
            language_code: translation.language_code,
            post_title: translation.post_title,
            post_brief: translation.post_brief,
            table_of_contents: translation.table_of_contents,
            post_content: translation.post_content,
          })),
        },
      },
      include: {
        post_translation: true,
      },
    });

    revalidateTag('cache-post');
    return { message: 'Post created successfully', data: newPost };
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Internal Server Error');
  }
}

// Has cache function
export async function getAllPosts(): Promise<any> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        active: true,
      },
      orderBy: {
        updated_at: 'desc',
      },
    });
    return posts;
  } catch (error) {
    throw new Error(`Error fetching posts: ${error}`);
  }
}

// Has cache function
export async function getAllFullPosts(lang?: string): Promise<any> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        active: true,
      },
      orderBy: {
        updated_at: 'desc',
      },
      include: {
        post_translation: lang ? { where: { language_code: lang } } : true,
      },
    });
    return posts;
  } catch (error) {
    throw new Error(`Error fetching posts: ${error}`);
  }
}

// Has cache function
export async function getPostByCategory(lang: Locale, category: string) {
  let posts = await prisma.post.findMany({
    where: { post_category: category },
    orderBy: {
      updated_at: 'desc',
    },
    include: {
      post_translation: lang ? { where: { language_code: lang } } : true,
    },
  });
  return posts;
}

// Has cache function
export async function getPostDetail(
  lang: Locale,
  category: string,
  slug: string
) {
  let posts = await prisma.post.findMany({
    where: { post_category: category, slug: slug },
    include: {
      post_translation: lang ? { where: { language_code: lang } } : true,
    },
  });
  return posts;
}
