import { auth } from '@/auth';
import { Locale } from '@/i18n-config';
import Newsletter from '../forms/Newsletter';
import ThemeSwitch from '../controls/ThemeSwitch';
import { SignInIcon, SignOutIcon } from '../controls/Icon';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { getDictionary } from '@/get-dictionary';

interface Props {
  lang: Locale;
}

export default async function Footer({ lang }: Props) {
  const dictionary = await getDictionary(lang);
  const session = await auth();

  return (
    <footer className="bg-gray-200 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="p-4 mx-auto max-w-screen-xl lg:pt-16 lg:pb-8 lg:px-6">
        <Newsletter dictionary={dictionary} />
      </div>
      <div className="flex flex-col items-center ">
        <div className="mb-3 flex space-x-4">
          <FaFacebook size={32} className="hover:text-blue-700" />
          <FaTwitter size={32} className="hover:text-blue-500" />
          <FaInstagram size={32} className="hover:text-orange-700" />
        </div>
        <div className="mb-2 flex space-x-2 text-sm ">
          <div>{` • `}</div>
          <div>Asiatips.net</div>
          <ThemeSwitch />
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          {session ? <SignOutIcon /> : <SignInIcon />}
          <div>{` • `}</div>
          <div>All rights reserved</div>
          <div>{` • `}</div>
        </div>
        <div className="mb-8 text-sm "></div>
      </div>
    </footer>
  );
}
