import ImageView from './ImageView';
import { getCacheAllImages } from '@/actions/cache/image';
// import { locales } from '@/i18n-config';
// import { getImagesCount } from '@/actions/no-cache/image';

interface Props {
  params: {
    id: number;
  };
}

// export async function generateStaticParams() {
//   const imagesCount = await getImagesCount();

//   return locales.flatMap((locale) =>
//     Array.from({ length: imagesCount }, (_, i) => ({
//       lang: locale.locale,
//       id: i.toString(),
//     }))
//   );
// }

export default async function page({ params }: Props) {
  const images = await getCacheAllImages();
  return <ImageView images={images} initSelectedId={Number(params.id)} />;
}
