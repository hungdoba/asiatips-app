'use client';
import Link from 'next/link';
import { useState } from 'react';
import LocaleSwitcher from './LocaleSwitcher';
import { FiMenu, FiX } from 'react-icons/fi';
import { post_category } from '@prisma/client';

interface Props {
  lang: string;
  categories: post_category[];
  dictionary: any;
  session: any;
}

export default function LinkSwitcher({
  lang,
  categories,
  dictionary,
  session,
}: Props) {
  const [hiddenMenu, setHiddenMenu] = useState(true);
  const langCategories = categories.filter(
    (category) => category.locale === lang
  );

  const navigationLinks = langCategories.map((category) => ({
    href: `/${lang}/${category.slug}`,
    label: category.title,
  }));

  return (
    <>
      <div
        className={`${
          hiddenMenu
            ? '-translate-y-full opacity-0 md:translate-y-0 md:opacity-100'
            : 'translate-y-0 opacity-100'
        } transition-transform duration-300 ease-in-out z-10 items-center justify-between w-full fixed top-0 right-0 md:w-auto md:order-1 md:relative`}
        onClick={() => setHiddenMenu(!hiddenMenu)}
      >
        <ul className="flex flex-col font-medium p-4 md:p-0 border border-gray-100 bg-gray-200 md:bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
          {navigationLinks.map(({ href, label }, id) => (
            <li key={id}>
              <Link
                href={href}
                locale={lang}
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                {label}
              </Link>
            </li>
          ))}
          {session && (
            <li>
              <Link
                href={`/${lang}/admin`}
                locale={lang}
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                {dictionary.navbar.admin}
              </Link>
            </li>
          )}
        </ul>
        <div className="absolute md:hidden top-4 right-4 p-4">
          <FiX />
        </div>
      </div>
      <div className="flex flex-row items-center md:hidden">
        <div className="mr-4">
          <LocaleSwitcher />
        </div>
        <div className="mr-4 p-4">
          <FiMenu onClick={() => setHiddenMenu(!hiddenMenu)} />
        </div>
      </div>
    </>
  );
}
