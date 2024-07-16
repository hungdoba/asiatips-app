'use server';

import cloudinary from '@/lib/cloudinary';
import { CloudImage } from '@/types/image';
import imagemin from 'imagemin';

export async function getImagesCount(): Promise<number> {
  try {
    const results = await cloudinary.search
      .expression(
        `folder:${process.env.NEXT_PUBLIC_CLOUDINARY_GALLERY_FOLDER}/*`
      )
      .execute();

    // Extract the total count from the results
    const totalCount = results.total_count;

    return totalCount;
  } catch (error) {
    return 1;
  }
}

export async function getAllImages(): Promise<CloudImage[]> {
  try {
    const results = await cloudinary.search
      .expression(
        `folder:${process.env.NEXT_PUBLIC_CLOUDINARY_GALLERY_FOLDER}/*`
      )
      .sort_by('public_id', 'desc')
      .execute();

    const cleanResult: CloudImage[] = await Promise.all(
      results.resources.map(async (result: any, index: number) => ({
        id: index,
        height: result.height,
        width: result.width,
        aspect_ratio: result.aspect_ratio,
        public_id: result.public_id,
        format: result.format,
        blur_data_url: await getBlurDataUrl(result.public_id, result.format),
      }))
    );

    return cleanResult;
  } catch (error) {
    console.error('Error fetching image thumbnails:', error);
    return [];
  }
}

export async function getBlurDataUrl(
  public_id: string,
  format: string
): Promise<string> {
  const response = await fetch(
    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${public_id}.${format}`
  );
  const buffer = await response.arrayBuffer();
  const minified = await imagemin.buffer(Buffer.from(buffer));

  const url = `data:image/jpeg;base64,${Buffer.from(minified).toString(
    'base64'
  )}`;
  return url;
}
