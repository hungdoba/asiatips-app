import { getPostData } from '@/actions/no-cache/post';
import PostForm from '@/components/forms/PostForm';

interface Props {
  params: {
    slug: string;
  };
}

export default async function Update({ params }: Props) {
  const { postStatic, postInfo, postContent } = await getPostData(params.slug);
  return (
    <PostForm
      initialPostStatic={postStatic}
      initialPostInfos={postInfo}
      initialPostContents={postContent}
      mode="update"
    />
  );
}
