import prisma from '@/lib/prisma';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import PostList from '@/components/layouts/PostList';

async function getPostByCategory(lang: Locale, category: string) {
  let posts = await prisma.post.findMany({
    where: { post_category: category },
    include: {
      post_translation: lang ? { where: { language_code: lang } } : true,
    },
  });
  return posts;
}

export default async function Category({
  params,
}: {
  params: { category: string; lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  const datas = await getPostByCategory(params.lang, params.category);
  return (
    <PostList
      lang={params.lang}
      title={params.category.toUpperCase()}
      describe={dictionary.category.tipsOverview}
      datas={datas}
    />
  );
}
