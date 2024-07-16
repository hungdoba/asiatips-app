import { fetchPostData } from '@/utils/actions';
import PostForm from '@/components/forms/PostForm';

interface Props {
  params: {
    slug: string;
  };
}

export default async function Update({ params }: Props) {
  const { postStatic, postInfo, postContent } = await fetchPostData(
    params.slug
  );
  return (
    <PostForm
      initialPostStatic={postStatic}
      initialPostInfo={postInfo}
      initialPostContent={postContent}
      mode="update"
    />
  );
}
