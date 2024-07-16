import ImageView from './ImageView';
import { getCacheAllImages } from '@/actions/cache/image';

interface Props {
  params: {
    id: number;
  };
}

export default async function page({ params }: Props) {
  const images = await getCacheAllImages();
  return <ImageView images={images} initSelectedId={Number(params.id)} />;
}
