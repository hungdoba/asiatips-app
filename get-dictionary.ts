import 'server-only';
import type { Locale } from './i18n-config';

const dictionaries = {
  vi: () => import('./dictionaries/vi.json').then((module) => module.default),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();
