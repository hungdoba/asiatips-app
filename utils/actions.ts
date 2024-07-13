'use server';

import { Locale } from '@/i18n-config';
import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';
import { post_translation } from '@prisma/client';

export async function deleteImage(public_id: string): Promise<boolean> {
  try {
    await cloudinary.uploader.destroy(public_id, function (result) {
      return result;
    });
    return true;
  } catch {
    return false;
  }
}

export async function uploadImage(formData: FormData): Promise<string> {
  const file = formData.get('image') as File;
  const folder = formData.get('folder') as string;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const now = new Date();
  const localeTimestamp = now.toLocaleString().replace(/[^\w]/g, '_');

  const result = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: folder ?? 'asiatips/post',
          public_id: `image_${localeTimestamp}`,
          tags: ['asiatips.net app route'],
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      )
      .end(buffer);
  });
  return result.secure_url;
}

export async function subscribe(formData: FormData) {
  const email = formData.get('email') as string;
  try {
    await prisma.subscribe.create({
      data: {
        email: email,
      },
    });
    return true;
  } catch {
    return false;
  }
}

export async function getPostUpdate(slug: string) {
  let posts = await prisma.post.findMany({
    where: { slug: slug },
    include: { post_translation: true },
  });

  return posts;
}

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

    return true;
  } catch (error) {
    console.error('Error updating post:', error);
    return false;
  }
}

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

    return { message: 'Post created successfully', data: newPost };
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Internal Server Error');
  }
}

export async function getAllPost(lang: Locale) {
  let posts = await prisma.post.findMany({
    include: {
      post_translation: lang ? { where: { language_code: lang } } : true,
    },
  });
  return posts;
}
