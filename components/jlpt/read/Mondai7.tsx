import MondaiContent from './MondaiContent';
import QAE from './QAE';

interface Props {
  session: any;
  data: any;
}

export default async function Mondai7({ session, data }: Props) {
  const from_number = data.questions[0].question_number;
  const to_number = data.questions[data.questions.length - 1].question_number;
  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="flex flex-col mb-4 md:mb-8 md:mt-8">
          <h2 className="mb-4">{`問題７　次の文章を読んで、${from_number} から ${to_number} の中に入る最もよいものを、１・２・３・４から一つ選びなさい。`}</h2>
          <MondaiContent session={session} mondai={data.mondais[0]} />
          {data.questions.map((question: any, id: number) => (
            <QAE key={id} question={question} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
}
