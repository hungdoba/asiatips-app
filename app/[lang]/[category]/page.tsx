import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import PostList from '@/components/layouts/PostList';
import { getCachePostByCategory } from '@/actions/cache/post';

export default async function Category({
  params,
}: {
  params: { category: string; lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  const datas = await getCachePostByCategory(params.lang, params.category);
  return (
    <PostList
      lang={params.lang}
      title={params.category.toUpperCase()}
      describe={dictionary.category.tipsOverview}
      datas={datas}
    />
  );
}
