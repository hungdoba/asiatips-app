import PostForm from '@/components/forms/PostForm';
import { PostInfo, PostStatic } from '@/types/post';
import { getCacheCategories } from '@/actions/cache/category';

const Create = async () => {
  const categories = await getCacheCategories();

  const postStatic: PostStatic = {
    language: 'vi',
    slug: '',
    headerImage: '',
    category: 'tips',
    tags: 'tips, ',
    visible: true,
  };

  const postInfos: Record<string, PostInfo> = {
    vi: {
      title: '',
      brief: '',
      tableOfContent: '',
    },
    ja: {
      title: '',
      brief: '',
      tableOfContent: '',
    },
    en: {
      title: '',
      brief: '',
      tableOfContent: '',
    },
  };

  const postContents: Record<string, string> = {
    vi: 'Bài viết này không tồn tại trong ngôn ngữ hiện tại. Vui lòng chọn ngôn ngữ khác.',
    ja: 'この言語ではこの記事が存在しません。別の言語を選択してください。',
    en: 'This article does not exist in the current language. Please select another language.',
  };

  return (
    <PostForm
      mode="create"
      categories={categories}
      initialPostStatic={postStatic}
      initialPostInfos={postInfos}
      initialPostContents={postContents}
    />
  );
};

export default Create;
