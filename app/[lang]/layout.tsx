import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';

import { Providers } from './providers';
import { i18n, Locale } from '@/i18n-config';
import { Toaster } from 'react-hot-toast';

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
    <html
      lang={params.lang}
      suppressHydrationWarning
      className="scroll-smooth scroll-pt-4"
    >
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-white text-black dark:bg-slate-800 dark:text-gray-300`}
      >
        <div>
          {/* Show notification */}
          <Toaster />
        </div>
        <Providers>
          <header>
            <Navbar lang={params.lang} />
          </header>
          <main className="flex-grow flex items-center justify-center">
            {children}
          </main>
          <footer>
            <Footer lang={params.lang} />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
