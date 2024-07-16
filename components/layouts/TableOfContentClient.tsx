'use client';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { FiAnchor, FiChevronUp, FiList } from 'react-icons/fi';

interface Props {
  dictionary: any;
  session: any;
  lang: string;
  slug: string;
  tableOfContent: ReactNode;
}

export default function TableOfContentClient({
  dictionary,
  tableOfContent,
  lang,
  session,
  slug,
}: Props) {
  const [pin, setPin] = useState(false);
  const [visible, setVisible] = useState(false);

  function handleShowTableOfContent(): void {
    setVisible(!visible);
    setPin(!pin);
  }

  function handleScrollToTheTop(): void {
    window.scrollTo({
      top: 0,
    });
  }

  return (
    <div className={`md:mr-8 md:top-4 ${pin ? 'md:sticky' : 'md:static'}`}>
      {/* Button show table of content */}
      <div className="fixed right-2 bottom-2 hover:cursor-pointer">
        <div className="p-2 md:p-4" onClick={handleScrollToTheTop}>
          <FiChevronUp />
        </div>
        <div className="p-2 md:p-4" onClick={handleShowTableOfContent}>
          <FiList />
        </div>
      </div>

      {/* Table of content */}
      <div
        className={`${
          !visible && 'hidden md:block'
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 md:relative justify-center items-center w-full h-full max-h-full bg-white bg-opacity-95 dark:bg-slate-800 dark:bg-opacity-95`}
      >
        <div className="relative p-4 md:p-0 w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg dark:bg-gray-700 md:bg-transparent md:dark:bg-transparent">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-0 md:pb-4 border-b rounded-t dark:border-gray-600">
              <div className="w-full flex flex-row items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {dictionary.tableOfContent.title}
                </h3>
                <div
                  className={`hidden md:block p-2 hover:cursor-pointer ${
                    pin
                      ? 'text-blue-500 dark:text-blue-600'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                  onClick={() => setPin(!pin)}
                >
                  <FiAnchor />
                </div>
              </div>

              {/* Button Close */}
              <button
                type="button"
                className="md:hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setVisible(!visible)}
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            {/* Table of Contents */}
            <article
              className="p-4 md:p-0 md:pt-4 space-y-4"
              onClick={() => setVisible(false)}
            >
              {tableOfContent}
            </article>

            {/* Admin action */}
            {session && (
              <div className="flex items-center justify-between p-4 border-t border-gray-400 dark:border-gray-600 mt-8">
                <Link
                  href={`/${lang}/admin/update/${slug}`}
                  className="w-full text-gray-400 dark:text-gray-500"
                >
                  {dictionary.tableOfContent.buttonUpdate}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
