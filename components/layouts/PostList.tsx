import { Locale } from '@/i18n-config';
import PostCard from '../cards/PostCard';

interface Props {
  lang: Locale;
  title: string;
  describe: string;
  datas: any;
}

export default function PostList({ lang, title, describe, datas }: Props) {
  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="space-y-2 pb-8 md:pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            {title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {describe}
          </p>
        </div>
        <hr />
        <div className="divide-y divide-gray-300 dark:divide-gray-600">
          {datas.map((data: any, id: number) => {
            return (
              <div key={id}>
                <PostCard lang={lang} data={data} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
