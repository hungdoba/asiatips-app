import ImageView from './ImageView';
import { getAllImages } from '../actions';

interface Props {
  params: {
    id: number;
  };
}

export default async function page({ params }: Props) {
  const images = await getAllImages();
  return <ImageView images={images} initSelectedId={Number(params.id)} />;
}
