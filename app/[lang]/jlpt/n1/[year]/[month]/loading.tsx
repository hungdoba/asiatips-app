export default function loading() {
  const elements = Array.from({ length: 5 }, (_, index) => index + 1);
  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="space-y-2 pb-8 md:pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            JLPT N1
          </h1>
          <div className="flex justify-between">
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {`20~~ - ~~`}
            </p>
            <p>~~~</p>
          </div>
        </div>
        <hr />
      </div>
      <div className="container mx-auto w-full mt-4 md:max-w-5xl animate-pulse">
        <div className="mx-4 md:mx-8">
          {elements.map(() => (
            <div className="flex flex-col mb-4 md:mb-8 md:mt-8">
              <h2 className="mb-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-72 md:w-96 mb-4" />
              </h2>
              {elements.map(() => (
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
