import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import PostList from '@/components/layouts/PostList';
import { getCacheAllFullPosts } from '@/actions/cache/post';

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);
  const datas = await getCacheAllFullPosts(params.lang);
  return (
    <PostList
      lang={params.lang}
      title={dictionary.homePage.lastestPost}
      describe={dictionary.homePage.slogan}
      datas={datas}
    />
  );
}
