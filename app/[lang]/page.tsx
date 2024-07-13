import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import PostList from '@/components/layouts/PostList';
import { getAllPost } from '@/utils/actions';

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);
  const datas = await getAllPost(params.lang);
  return (
    <PostList
      lang={params.lang}
      title={dictionary.homePage.lastestPost}
      describe={dictionary.homePage.slogan}
      datas={datas}
    />
  );
}
