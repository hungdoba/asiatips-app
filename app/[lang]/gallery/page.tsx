import Link from 'next/link';
import Image from 'next/image';
import { CloudImage } from '@/types/image';
import { getCacheAllImages } from '@/actions/cache/image';

export default async function page() {
  let images = await getCacheAllImages();

  return (
    <div className="container w-full px-2 md:mx-auto md:max-w-5xl my-2 md:my-8">
      <div className="columns-2 gap-2 md:gap-4 md:columns-3">
        {images.map((image: CloudImage) => (
          <Link
            href={`./gallery/${image.id}`}
            key={image.id}
            className="mb-2 md:mb-4 after:content group relative block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          >
            <Image
              alt="Photos around the world"
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              placeholder="blur"
              blurDataURL={image.blur_data_url}
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_350/${image.public_id}.${image.format}`}
              width={350}
              height={350 / image.aspect_ratio}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
