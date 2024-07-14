'use client';

import { useState } from 'react';
import { FiBookmark } from 'react-icons/fi';

export default function Bookmark() {
  const [marked, setMarkded] = useState(false);
  return (
    <FiBookmark
      onClick={() => setMarkded(!marked)}
      className={`w-4 h-4 ml-2 cursor-pointer ${marked && 'text-blue-600'}`}
    />
  );
}
