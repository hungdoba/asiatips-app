import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';

import { Providers } from './providers';
import { i18n, Locale } from '@/i18n-config';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: 'Asiatips.net Enjoy Japan',
  description: 'Tips to live in Japan',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="bg-white text-black dark:bg-slate-800 dark:text-gray-300">
            <Navbar lang={params.lang} />
            {children}
            <Footer lang={params.lang} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
