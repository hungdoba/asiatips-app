import PostForm from '@/components/forms/PostForm';
import { PostInfo, PostStatic } from '@/types/post';

const Create = () => {
  const postStatic: PostStatic = {
    language: 'vi',
    slug: '',
    headerImage: undefined,
    category: 'tips',
    tags: 'tips, ',
    visible: true,
  };

  const postInfos: { [key: string]: PostInfo } = {
    vi: {
      title: '',
      brief: '',
      tableOfContent: '',
    },
  };

  const postContent: { [key: string]: string } = { vi: '' };

  return (
    <PostForm
      initialPostStatic={postStatic}
      initialPostInfo={postInfos}
      initialPostContent={postContent}
      mode="create"
    />
  );
};

export default Create;
