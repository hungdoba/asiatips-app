import { auth } from '@/auth';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { post } from '@prisma/client';
import { Locale, locales } from '@/i18n-config';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getDictionary } from '@/get-dictionary';
import { Metadata, ResolvingMetadata } from 'next';
import { getCacheAllPosts, getCachePostDetail } from '@/actions/cache/post';
import TableOfContent from '@/components/layouts/TableOfContent';
import TableOfContentClient from '@/components/layouts/TableOfContentClient';

interface Props {
  params: { category: string; slug: string; lang: Locale };
}

export async function generateStaticParams() {
  const posts: post[] = await getCacheAllPosts();

  return locales.flatMap((locale) =>
    posts.map((post: post) => ({
      lang: locale.locale,
      category: post.post_category,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const datas = await getCachePostDetail(
    params.lang,
    params.category,
    params.slug
  );

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: datas[0].post_translation[0].post_title,
    description: datas[0].post_translation[0].post_brief,
    openGraph: {
      images: [datas[0].header_image, ...previousImages],
    },
  };
}

export default async function PostDetail({ params }: Props) {
  const session = await auth();
  const dictionary = await getDictionary(params.lang);
  // Dublicated with function in generate metadata but it cache, so no problem
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
