'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Locale, locales } from '@/i18n-config';
import { usePathname } from 'next/navigation';
import { LanguageOption } from '@/types/common';
import Link from 'next/link';

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const currentLocale = pathName?.split('/')[1];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const changeLocaleInUrlPath = (urlPath: string, newLocale: Locale) => {
    const segments = urlPath.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  const Option: React.FC<{ option: LanguageOption }> = ({ option }) => (
    <div className="w-full inline-flex items-center">
      <Image
        className="mr-2"
        src={option.icon}
        alt="flag icon"
        width={16}
        height={16}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      {option.name}
    </div>
  );
  return (
    <div className="w-32 relative flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <Option
          option={
            locales.find((locale) => locale.locale === currentLocale) ??
            locales[0]
          }
        />
      </button>
      <div
        className={`w-full z-50 absolute top-full mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 transform transition-transform duration-300 ${
          isDropdownOpen
            ? 'translate-y-0 ease-out opacity-100'
            : 'translate-y-4 ease-in opacity-0'
        }`}
        id="language-dropdown-menu"
      >
        <ul className="py-2 font-medium">
          {locales
            .filter((locale) => locale.locale !== currentLocale)
            .map((locale, index) => (
              <li key={index}>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  href={changeLocaleInUrlPath(pathName, locale.locale)}
                >
                  {/* <Option option={locale} /> */}
                  {locale.locale}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
