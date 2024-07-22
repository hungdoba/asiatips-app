import QAE from './QAE';

interface Props {
  session: any;
  data: any;
}

export default async function Mondai11({ session, data }: Props) {
  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="flex flex-col mb-4 md:mb-8 md:mt-8">
          <h2 className="mb-4">{`問題１１　AとBの両方を読んで、後の問いに対する答えとして、最もよいものを、１・２・３・４から一つ選びなさい。`}</h2>
          <h3 className="mb-4">(A)</h3>
          <p
            className="mb-4"
            dangerouslySetInnerHTML={{
              __html: data.mondais[0].mondai_content,
            }}
          />
          <h3 className="mb-4">(B)</h3>
          <p
            className="mb-4"
            dangerouslySetInnerHTML={{
              __html: data.mondais[0].note,
            }}
          />

          {data.questions.map((question: any, id: number) => (
            <QAE key={id} question={question} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
}
