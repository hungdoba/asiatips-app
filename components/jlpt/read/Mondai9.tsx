import QAE from './QAE';
import MondaiContent from './MondaiContent';

interface Props {
  session: any;
  data1: any;
  data2: any;
  data3: any;
  data4: any;
}

export default async function Mondai9({
  session,
  data1,
  data2,
  data3,
  data4,
}: Props) {
  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="flex flex-col mb-4 md:mb-8 md:mt-8">
          <h2 className="mb-4">
            問題９　次の（１）～（３）の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。
          </h2>

          {/* Q1 */}
          <div>
            <div className="flex flex-col">
              <MondaiContent session={session} mondai={data1.mondais[0]} />
              {data1.questions.map((question: any, id: number) => (
                <QAE key={id} question={question} session={session} />
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div>
            <div className="flex flex-col">
              <MondaiContent session={session} mondai={data2.mondais[0]} />
              {data2.questions.map((question: any, id: number) => (
                <QAE key={id} question={question} session={session} />
              ))}
            </div>
          </div>

          {/* Q3 */}
          <div>
            <div className="flex flex-col">
              <MondaiContent session={session} mondai={data3.mondais[0]} />
              {data3.questions.map((question: any, id: number) => (
                <QAE key={id} question={question} session={session} />
              ))}
            </div>
          </div>

          {/* Q4 */}
          {data4.mondais.length > 0 && (
            <div>
              <div className="flex flex-col">
                <MondaiContent session={session} mondai={data4.mondais[0]} />
                {data4.questions.map((question: any, id: number) => (
                  <QAE key={id} question={question} session={session} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
