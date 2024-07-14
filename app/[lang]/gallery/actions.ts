'use server';

import cloudinary from '@/lib/cloudinary';
import { CloudImage } from '@/types/image';
import imagemin from 'imagemin';

export async function getAllImages(): Promise<CloudImage[]> {
  try {
    const results = await cloudinary.search
      .expression(
        `folder:${process.env.NEXT_PUBLIC_CLOUDINARY_GALLERY_FOLDER}/*`
      )
      .sort_by('public_id', 'desc')
      .execute();

    const cleanResult: CloudImage[] = results.resources.map(
      (result: any, index: number) => ({
        id: index,
        height: result.height,
        width: result.width,
        aspect_ratio: result.aspect_ratio,
        public_id: result.public_id,
        format: result.format,
      })
    );
    return cleanResult;
  } catch (error) {
    console.error('Error fetching image thumbnails:', error);
    return [];
  }
}

export async function getBackgroundBlurImage(
  image: CloudImage
): Promise<string> {
  const response = await fetch(
    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`
  );
  const buffer = await response.arrayBuffer();
  const minified = await imagemin.buffer(Buffer.from(buffer));

  let url = `data:image/jpeg;base64,${Buffer.from(minified).toString(
    'base64'
  )}`;
  return url;
}
