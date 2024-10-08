import Link from 'next/link';
import { auth } from '@/auth';
import { Locale } from '@/i18n-config';
import Newsletter from '../forms/Newsletter';
import ThemeSwitch from '../controls/ThemeSwitch';
import { SignInIcon, SignOutIcon } from '../controls/Icon';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { getDictionary } from '@/get-dictionary';
import { Suspense } from 'react';

interface Props {
  lang: Locale;
}

export default async function Footer({ lang }: Props) {
  const dictionary = await getDictionary(lang);
  const session = await auth();

  return (
    <div className="bg-gray-200 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="p-4 mx-auto max-w-screen-xl lg:pt-16 lg:pb-8 lg:px-6">
        {/* <Newsletter dictionary={dictionary} /> */}
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <Link
            aria-label="facebook"
            className="hover:cursor-pointer"
            href={`https://www.facebook.com/asiatips.net`}
            target="_blank"
          >
            <FaFacebook size={32} className="hover:text-blue-700" />
          </Link>

          <Link
            aria-label="twitter"
            className="hover:cursor-pointer"
            href={`https://x.com/asiatips__net`}
            target="_blank"
          >
            <FaXTwitter size={32} className="hover:text-blue-500" />
          </Link>

          <Link
            aria-label="instagram"
            className="hover:cursor-pointer"
            href={`https://www.instagram.com/asiatips_net`}
            target="_blank"
          >
            <FaInstagram size={32} className="hover:text-orange-700" />
          </Link>
        </div>
        <div className="mb-2 flex flex-row items-center space-x-2 text-sm">
          <div>{` • `}</div>
          <div>Asiatips.net</div>
          <Suspense fallback={<p>...</p>}>
            <ThemeSwitch />
          </Suspense>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <Suspense fallback={<p>...</p>}>
            {session ? <SignOutIcon /> : <SignInIcon />}
          </Suspense>
          <div>{` • `}</div>
          <div>All rights reserved</div>
          <div>{` • `}</div>
        </div>
      </div>
    </div>
  );
}
