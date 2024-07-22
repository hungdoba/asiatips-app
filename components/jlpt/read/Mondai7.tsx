import { getCacheJLPTReadMondaiFullDetail } from '@/actions/cache/jlpt';
import QAE from './QAE';

interface Props {
  session: any;
  year: string;
  month: string;
}

export default async function Mondai7({ session, year, month }: Props) {
  const datas = await getCacheJLPTReadMondaiFullDetail(year, month, 7);
  const from_number = datas.questions[0].question_number;
  const to_number = datas.questions[datas.questions.length - 1].question_number;
  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="flex flex-col mb-4 md:mb-8 md:mt-8">
          <h2 className="mb-4">{`問題７　次の文章を読んで、${from_number} から ${to_number} の中に入る最もよいものを、１・２・３・４から一つ選びなさい。`}</h2>
          <p
            className="mb-4"
            dangerouslySetInnerHTML={{
              __html: datas.mondais[0].mondai_content,
            }}
          />

          {datas.questions.map((question: any, id: number) => (
            <QAE key={id} question={question} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
}
