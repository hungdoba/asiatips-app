import { AI } from './action';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AI>
      <div className="fixed top-28 left-0 w-full h-[calc(100vh-96px)] bg-white dark:bg-slate-800">
        {children}
      </div>
    </AI>
  );
}
