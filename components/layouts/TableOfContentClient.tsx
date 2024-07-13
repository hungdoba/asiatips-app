'use client';
import { FiList } from 'react-icons/fi';
import { ReactNode, useState } from 'react';
import Link from 'next/link';

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
  const [visible, setVisible] = useState(false);
  return (
    <div className="md:mr-4">
      {/* Button show table of content */}
      <div
        className="fixed p-4 right-2 bottom-2 z-30 md:hidden"
        onClick={() => setVisible(!visible)}
      >
        <FiList />
      </div>

      {/* Table of content */}
      <div
        className={`${
          !visible && 'hidden md:block'
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-30 md:static justify-center items-center w-full h-full max-h-full bg-white bg-opacity-95 dark:bg-slate-800 dark:bg-opacity-95`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 md:bg-transparent md:dark:bg-transparent">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-0 md:pb-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dictionary.tableOfContent.title}
              </h3>

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
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Table of Contents */}
            <div className="p-4 md:p-0 md:pt-4 space-y-4">{tableOfContent}</div>

            {/* Admin action */}
            {session && (
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Link href={`/${lang}/admin/update/${slug}`}>
                  <div className="text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Modify
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
