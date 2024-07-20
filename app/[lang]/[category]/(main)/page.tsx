import { Locale, locales } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import PostList from '@/components/layouts/PostList';
import { getCachePostByCategory } from '@/actions/cache/post';
import { post_category } from '@prisma/client';
import { getCacheCategories } from '@/actions/cache/category';

export async function generateStaticParams() {
  const categories: post_category[] = await getCacheCategories();

  return locales.flatMap((locale) =>
    categories.map((category: post_category) => ({
      lang: locale.locale,
      category: category.slug,
    }))
  );
}

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
