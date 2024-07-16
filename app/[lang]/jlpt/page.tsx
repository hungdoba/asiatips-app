import Link from 'next/link';
import { Locale } from '@/i18n-config';
import { getJLPTTimes } from './actions';
import { getDictionary } from '@/get-dictionary';

export default async function JLPT({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);
  const datas = await getJLPTTimes();
  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="space-y-2 pb-8 md:pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            JLPT N1
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {dictionary.category.jlptOverview}
          </p>
        </div>
        <hr />
        <div className="divide-y divide-gray-300 dark:divide-gray-600 ">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {datas.map((data: any, id: number) => {
              return (
                <li key={id} className="py-3 sm:py-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0">
                      <div className="rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-2">
                        N1
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {`${data.year} - ${data.month}`}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Read, Listen, Grammar
                      </p>
                    </div>
                    <div className="space-x-4">
                      <Link
                        className="inline-flex items-center"
                        href={`/${params.lang}/jlpt/n1/${data.year}/${data.month}/read`}
                      >
                        {dictionary.jlpt.gotoRead}
                      </Link>
                      <Link
                        className="inline-flex items-center"
                        href={`/${params.lang}/jlpt/n1/${data.year}/${data.month}/listen`}
                      >
                        {dictionary.jlpt.gotoListen}
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
