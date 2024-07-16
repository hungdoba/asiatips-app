import { auth } from '@/auth';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Locale } from '@/i18n-config';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getDictionary } from '@/get-dictionary';
import { getCachePostDetail } from '@/actions/cache/post';
import TableOfContent from '@/components/layouts/TableOfContent';
import TableOfContentClient from '@/components/layouts/TableOfContentClient';

export default async function PostDetail({
  params,
}: {
  params: { category: string; slug: string; lang: Locale };
}) {
  const session = await auth();
  const dictionary = await getDictionary(params.lang);
  const datas = await getCachePostDetail(
    params.lang,
    params.category,
    params.slug
  );

  return (
    <div className="container mx-auto w-full my-4 md:max-w-5xl">
      <div className="flex flex-col md:flex-row mx-4 md:mx-8">
        {/* Table of Content */}
        <div className="w-full md:w-1/4">
          <TableOfContentClient
            dictionary={dictionary}
            session={session}
            lang={params.lang}
            slug={params.slug}
            tableOfContent={<TableOfContent datas={datas} />}
          />
        </div>

        {/* Main article */}
        <div className="w-full md:w-3/4">
          <h1 className="text-4xl font-bold my-4">
            {datas[0].post_translation[0].post_title}
          </h1>
          <Image
            className="w-full rounded-xl"
            width={1920}
            height={1280}
            src={datas[0].header_image}
            alt="Article Image"
            priority
            sizes="(min-width: 1360px) 920px, (min-width: 780px) 66.96vw, (min-width: 680px) 608px, calc(94.44vw - 15px)"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
          <div className="prose dark:prose-invert max-w-none overflow-hidden mt-4 mdx-remote-a-blue prose-a:no-underline prose-a:text-cyan-500">
            <MDXRemote
              source={datas[0].post_translation[0].post_content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
