import Link from 'next/link';
import { auth } from '@/auth';
import { Locale, locales } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Mondai from '@/components/jlpt/read/Mondai';
import Mondai7 from '@/components/jlpt/read/Mondai7';
import Mondai8 from '@/components/jlpt/read/Mondai8';
import Mondai9 from '@/components/jlpt/read/Mondai9';
import Mondai10 from '@/components/jlpt/read/Mondai10';
import Mondai11 from '@/components/jlpt/read/Mondai11';
import Mondai12 from '@/components/jlpt/read/Mondai12';
import Mondai13 from '@/components/jlpt/read/Mondai13';
import { getCacheJLPTTimes } from '@/actions/cache/jlpt';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const jlptTimes: any = await getCacheJLPTTimes();

  return locales.flatMap((locale) =>
    jlptTimes.map((time: any) => ({
      lang: locale.locale,
      year: time.year.toString(),
      month: time.month.toString(),
    }))
  );
}

export default async function JLPTDetail({
  params,
}: {
  params: { lang: Locale; year: string; month: string };
}) {
  const session = await auth();
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="space-y-2 pb-8 md:pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            JLPT N1
          </h1>
          <div className="flex justify-between">
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {`${params.year} - ${params.month}`}
            </p>
            <Link href={`./listen`}>{dictionary.jlpt.gotoListen}</Link>
          </div>
        </div>
        <hr />
      </div>
      <div className="underline-offset-4">
        <Suspense fallback={<p>...</p>}>
          <Mondai
            session={session}
            year={params.year}
            month={params.month}
            mondai_number={1}
          />
        </Suspense>
        <Suspense fallback={<p>...</p>}>
          <Mondai
            session={session}
            year={params.year}
            month={params.month}
            mondai_number={2}
          />
        </Suspense>
        <Suspense fallback={<p>...</p>}>
          <Mondai
            session={session}
            year={params.year}
            month={params.month}
            mondai_number={3}
          />
        </Suspense>
        <Suspense fallback={<p>...</p>}>
          <Mondai
            session={session}
            year={params.year}
            month={params.month}
            mondai_number={4}
          />
        </Suspense>
        <Suspense fallback={<p>...</p>}>
          <Mondai
            session={session}
            year={params.year}
            month={params.month}
            mondai_number={5}
          />
        </Suspense>
        <Suspense fallback={<p>...</p>}>
          <Mondai
            session={session}
            year={params.year}
            month={params.month}
            mondai_number={6}
          />
        </Suspense>
        <Suspense fallback={<p>...</p>}>
          <Mondai7 session={session} year={params.year} month={params.month} />
        </Suspense>
        <Suspense fallback={<p>...</p>}>
          <Mondai8 session={session} year={params.year} month={params.month} />
        </Suspense>
        <Suspense fallback={<p>...</p>}>
          <Mondai9 session={session} year={params.year} month={params.month} />
        </Suspense>
        <Suspense fallback={<p>...</p>}>
          <Mondai10 session={session} year={params.year} month={params.month} />
        </Suspense>
        <Suspense fallback={<p>...</p>}>
          <Mondai11 session={session} year={params.year} month={params.month} />
        </Suspense>
        <Suspense fallback={<p>...</p>}>
          <Mondai12 session={session} year={params.year} month={params.month} />
        </Suspense>
        <Suspense fallback={<p>...</p>}>
          <Mondai13 session={session} year={params.year} month={params.month} />
        </Suspense>
      </div>
      <div className="mx-4 md:mx-8 space-y-2 pb-6 pt-0 md:space-y-5">
        <hr className="pb-4" />
        <div className="flex justify-between">
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {`${params.year} - ${params.month}`}
          </p>
          <Link href={`./listen`}>{dictionary.jlpt.gotoListen}</Link>
        </div>
      </div>
    </div>
  );
}
