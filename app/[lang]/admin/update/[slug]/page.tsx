import PostForm from '@/components/forms/PostForm';
import { getPostData } from '@/actions/no-cache/post';
import { getCacheCategories } from '@/actions/cache/category';

interface Props {
  params: {
    slug: string;
  };
}

export default async function Update({ params }: Props) {
  const categories = await getCacheCategories();
  const { postStatic, postInfo, postContent } = await getPostData(params.slug);
  return (
    <PostForm
      mode="update"
      categories={categories}
      initialPostStatic={postStatic}
      initialPostInfos={postInfo}
      initialPostContents={postContent}
    />
  );
}
