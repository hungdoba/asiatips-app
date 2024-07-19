import Link from 'next/link';
import { auth } from '@/auth';
import Image from 'next/image';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import ThemeSwitch from '../controls/ThemeSwitch';
import LocaleSwitcher from '../controls/LocaleSwitcher';

interface Props {
  lang: Locale;
}

import React, { Suspense } from 'react';
import LinkSwitcher from '../controls/LinkSwitcher';

export default async function Navbar({ lang }: Props) {
  const session = await auth();
  const dictionary = await getDictionary(lang);

  return (
    <nav className="bg-gray-200 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto w-full md:max-w-5xl flex items-center justify-between py-4">
        <div className="flex flex-row">
          <Link
            href={`/${lang}`}
            className="flex items-center space-x-3 rtl:space-x-reverse pl-4"
          >
            <Image
              src="/icon.png"
              width={120}
              height={47}
              className="h-10 w-auto"
              alt="Asiatips Logo"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Link>
          <Suspense fallback={<p>...</p>}>
            <ThemeSwitch />
          </Suspense>
        </div>
        <div className="hidden md:flex md:order-2 space-x-3 md:space-x-0">
          <LocaleSwitcher />
        </div>
        <div>
          <Suspense fallback={<p>...</p>}>
            <LinkSwitcher
              lang={lang}
              dictionary={dictionary}
              session={session}
            />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
