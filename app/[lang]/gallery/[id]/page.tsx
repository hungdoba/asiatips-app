import { getAllImages, getBackgroundBlurImage } from '../actions';
import ImageView from './ImageView';

interface Props {
  params: {
    id: number;
  };
}

export default async function page({ params }: Props) {
  const images = await getAllImages();
  const backgroundImage = images[params.id];
  const background = await getBackgroundBlurImage(backgroundImage);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-10">
      <ImageView
        images={images}
        initSelectedId={Number(params.id)}
        backgroundUrl={background}
      />
    </div>
  );
}
