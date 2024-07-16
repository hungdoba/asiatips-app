import Link from 'next/link';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';

interface Props {
  params: {
    lang: Locale;
  };
}

export default async function Unauthorized({ params }: Props) {
  const dictionary = await getDictionary(params.lang);
  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-8">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            {dictionary.unauthorized.title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {dictionary.unauthorized.message}
          </p>
        </div>
        <hr />
        <div className="text-center py-40">
          <Link
            href="./"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            {dictionary.unauthorized.button}
          </Link>
        </div>
      </div>
    </div>
  );
}
