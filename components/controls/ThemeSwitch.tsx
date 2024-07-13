'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiCloud } from 'react-icons/fi';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <FiCloud className="text-blue-500" />;

  function handleChangeTheme(): void {
    if (resolvedTheme === 'dark') {
      setTheme('light');
      return;
    }
    setTheme('dark');
  }

  return (
    <div className="p-4 hover:cursor-pointer" onClick={handleChangeTheme}>
      {resolvedTheme === 'dark' ? (
        <FiMoon className="text-gray-400" />
      ) : (
        <FiSun className="text-orange-600 hover:cursor-pointer" />
      )}
    </div>
  );
}
