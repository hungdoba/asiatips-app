'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiCloud } from 'react-icons/fi';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <FiCloud className="text-blue-500" />;

  if (resolvedTheme === 'dark') {
    return (
      <FiMoon
        className="text-gray-400 hover:cursor-pointer"
        onClick={() => setTheme('light')}
      />
    );
  }

  if (resolvedTheme === 'light') {
    return (
      <FiSun
        className="text-yellow-500 hover:cursor-pointer"
        onClick={() => setTheme('dark')}
      />
    );
  }
}
