import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';

export default async function PostCard({
  lang,
  data,
}: {
  lang: Locale;
  data: any;
}) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="relative">
      <div className="flex items-stretch w-full my-2 p-2 md:p-6">
        <div className="w-1/3 max-h-fit">
          <Image
            src={data.header_image}
            alt="Post Image"
            className="w-full h-full rounded-lg object-cover object-center"
            height={1280}
            width={1920}
            sizes="(min-width: 1360px) 297px, (min-width: 780px) 22.32vw, (min-width: 680px) 202px, calc(31.39vw - 5px)"
            style={{
              objectFit: 'cover',
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className="flex flex-col justify-around w-2/3 pl-6">
          <h1 className="mb-2 md:text-xl md:font-bold">
            {data.post_translation[0].post_title}
          </h1>
          <p className="hidden md:block font-normal">
            {data.post_translation[0].post_brief}
          </p>
          <p className="font-semibold text-sm mb-2 text-gray-400">
            {new Date(data.created_at).toLocaleDateString()}
          </p>
          <Link href={`/${lang}/${data.post_category}/${data.slug}`}>
            {dictionary.postCard.readMore} {'>'}
          </Link>
        </div>
      </div>
    </div>
  );
}
