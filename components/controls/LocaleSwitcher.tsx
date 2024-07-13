'use client';
import Image from 'next/image';
import { useState } from 'react';
import { locales } from '@/i18n-config';
import { usePathname } from 'next/navigation';
import { LanguageOption } from '@/types/common';

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const currentLocale = pathName?.split('/')[1];

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const Option: React.FC<{ option: LanguageOption }> = ({ option }) => (
    <div className="inline-flex items-center">
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
    <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <Option
          option={
            locales.find((locale) => locale.locale === currentLocale) ??
            locales[0]
          }
        />
      </button>
      {isDropdownOpen && (
        <div
          className="z-50 absolute top-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
          id="language-dropdown-menu"
        >
          <ul className="py-2 font-medium">
            {locales.map((locale, index) => (
              <li key={index} role="none">
                <div
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  onClick={() => {
                    window.location.href = redirectedPathName(locale.locale);
                  }}
                >
                  <Option option={locale} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
