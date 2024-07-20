import { post_category } from '@prisma/client';
import { Locale, locales } from '@/i18n-config';
import PostList from '@/components/layouts/PostList';
import { getCachePostByCategory } from '@/actions/cache/post';
import { getCacheCategories } from '@/actions/cache/category';
import { getDictionary } from '@/get-dictionary';

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
  const categories = await getCacheCategories();
  const dictionary = await getDictionary(params.lang);
  const currentCategory: post_category | undefined = categories.findLast(
    (category) =>
      category.locale === params.lang && category.slug === params.category
  );

  const datas = await getCachePostByCategory(params.lang, params.category);

  if (currentCategory === undefined) {
    return (
      <p>{`${params.category.toUpperCase()}: ${
        dictionary.error.categoryNotExist
      }`}</p>
    );
  }

  return (
    <PostList
      lang={params.lang}
      title={currentCategory.title}
      describe={currentCategory.describe}
      datas={datas}
    />
  );
}
