'use client';

import { useState } from 'react';
import { FiBookmark } from 'react-icons/fi';

export default function Bookmark() {
  const [marked, setMarkded] = useState(false);
  return (
    <FiBookmark
      onClick={() => setMarkded(!marked)}
      className={`w-5 h-5 ml-2 cursor-pointer ${marked && 'text-blue-600'}`}
    />
  );
}
