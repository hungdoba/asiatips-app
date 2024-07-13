import { Locale } from "@/i18n-config";

export interface MenuItem {
  label: string;
  value: string;
}

export type LanguageOption = {
  locale: Locale;
  name: string;
  icon: string;
};
