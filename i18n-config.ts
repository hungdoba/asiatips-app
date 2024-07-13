import { LanguageOption } from './types/common';

export const i18n = {
  defaultLocale: 'vi',
  locales: ['vi', 'ja', 'en'],
} as const;

export const locales: LanguageOption[] = [
  { locale: 'vi', name: 'Tiếng Việt', icon: '/flags/vi.svg' },
  { locale: 'ja', name: '日本語', icon: '/flags/ja.svg' },
  { locale: 'en', name: 'English', icon: '/flags/en.svg' },
];

export type Locale = (typeof i18n)['locales'][number];
