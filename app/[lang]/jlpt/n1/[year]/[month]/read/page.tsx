import Link from 'next/link';
import { auth } from '@/auth';
import { Locale } from '@/i18n-config';
import { getJLPTReadDetail } from './actions';
import { getDictionary } from '@/get-dictionary';
import Mondai from '@/components/jlpt/read/Mondai';
import Mondai7 from '@/components/jlpt/read/Mondai7';
import Mondai8 from '@/components/jlpt/read/Mondai8';
import Mondai9 from '@/components/jlpt/read/Mondai9';
import Mondai10 from '@/components/jlpt/read/Mondai10';
import Mondai11 from '@/components/jlpt/read/Mondai11';
import Mondai12 from '@/components/jlpt/read/Mondai12';
import Mondai13 from '@/components/jlpt/read/Mondai13';

export default async function JLPTDetail({
  params,
}: {
  params: { lang: Locale; year: string; month: string };
}) {
  const session = await auth();
  const dictionary = await getDictionary(params.lang);

  const mondai1 = await getJLPTReadDetail(params.year, params.month, '1');
  const mondai2 = await getJLPTReadDetail(params.year, params.month, '2');
  const mondai3 = await getJLPTReadDetail(params.year, params.month, '3');
  const mondai4 = await getJLPTReadDetail(params.year, params.month, '4');
  const mondai5 = await getJLPTReadDetail(params.year, params.month, '5');
  const mondai6 = await getJLPTReadDetail(params.year, params.month, '6');
  const mondai7 = await getJLPTReadDetail(params.year, params.month, '7');
  const mondai81 = await getJLPTReadDetail(params.year, params.month, '81');
  const mondai82 = await getJLPTReadDetail(params.year, params.month, '82');
  const mondai83 = await getJLPTReadDetail(params.year, params.month, '83');
  const mondai84 = await getJLPTReadDetail(params.year, params.month, '84');
  const mondai91 = await getJLPTReadDetail(params.year, params.month, '91');
  const mondai92 = await getJLPTReadDetail(params.year, params.month, '92');
  const mondai93 = await getJLPTReadDetail(params.year, params.month, '93');
  const mondai94 = await getJLPTReadDetail(params.year, params.month, '94');
  const mondai10 = await getJLPTReadDetail(params.year, params.month, '10');
  const mondai11 = await getJLPTReadDetail(params.year, params.month, '11');
  const mondai12 = await getJLPTReadDetail(params.year, params.month, '12');
  const mondai13 = await getJLPTReadDetail(params.year, params.month, '13');

  return (
    <main className="container mx-auto w-full mt-4 md:max-w-5xl">
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
        <Mondai session={session} data={mondai1} mondai_number={1} />
        <Mondai session={session} data={mondai2} mondai_number={2} />
        <Mondai session={session} data={mondai3} mondai_number={3} />
        <Mondai session={session} data={mondai4} mondai_number={4} />
        <Mondai session={session} data={mondai5} mondai_number={5} />
        <Mondai session={session} data={mondai6} mondai_number={6} />
        <Mondai7 session={session} data={mondai7} />
        <Mondai8
          session={session}
          data1={mondai81}
          data2={mondai82}
          data3={mondai83}
          data4={mondai84}
        />
        <Mondai9
          session={session}
          data1={mondai91}
          data2={mondai92}
          data3={mondai93}
          data4={mondai94}
        />
        <Mondai10 session={session} data={mondai10} />
        <Mondai11 session={session} data={mondai11} />
        <Mondai12 session={session} data={mondai12} />
        <Mondai13 session={session} data={mondai13} />
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
    </main>
  );
}
