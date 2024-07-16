import Link from 'next/link';
import { auth } from '@/auth';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Mondai from '@/components/jlpt/read/Mondai';
import Mondai7 from '@/components/jlpt/read/Mondai7';
import Mondai8 from '@/components/jlpt/read/Mondai8';
import Mondai9 from '@/components/jlpt/read/Mondai9';
import Mondai10 from '@/components/jlpt/read/Mondai10';
import Mondai11 from '@/components/jlpt/read/Mondai11';
import Mondai12 from '@/components/jlpt/read/Mondai12';
import Mondai13 from '@/components/jlpt/read/Mondai13';
import { getCacheJLPTReadFullDetail } from '@/actions/cache/jlpt';

export default async function JLPTDetail({
  params,
}: {
  params: { lang: Locale; year: string; month: string };
}) {
  const session = await auth();
  const dictionary = await getDictionary(params.lang);
  const { mondais, questions } = await getCacheJLPTReadFullDetail(
    params.year,
    params.month
  );

  function getMondai(mondaiNumber: number) {
    const mondai = mondais.filter(
      (value) => value.mondai_number === mondaiNumber
    );
    const question = questions.filter(
      (value) => value.mondai_number === mondaiNumber
    );
    return { mondais: mondai, questions: question };
  }

  const renderMondaiComponents = () =>
    [1, 2, 3, 4, 5, 6].map((mondaiNumber, index) => (
      <Mondai
        session={session}
        data={getMondai(mondaiNumber)}
        mondai_number={mondaiNumber}
      />
    ));

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
        {renderMondaiComponents()}
        <Mondai7 session={session} data={getMondai(7)} />
        <Mondai8
          session={session}
          data1={getMondai(81)}
          data2={getMondai(82)}
          data3={getMondai(83)}
          data4={getMondai(84)}
        />
        <Mondai9
          session={session}
          data1={getMondai(91)}
          data2={getMondai(92)}
          data3={getMondai(93)}
          data4={getMondai(94)}
        />
        <Mondai10 session={session} data={getMondai(10)} />
        <Mondai11 session={session} data={getMondai(11)} />
        <Mondai12 session={session} data={getMondai(12)} />
        <Mondai13 session={session} data={getMondai(13)} />
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
