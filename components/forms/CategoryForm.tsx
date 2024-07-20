'use client';

// using it later
import { useState } from 'react';

interface Props {
  initCategories: string[];
}

export default function CategoryForm({ initCategories }: Props) {
  const [category, setCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>(initCategories);

  function handleAddCategory(): void {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
      setCategory('');
    }
  }

  function handleDeleteCategory(categoryToDelete: string): void {
    setCategories(
      categories.filter((category) => category !== categoryToDelete)
    );
  }

  function handleCategoryChanged(category: string) {
    setCategory(category.trim());
  }

  return (
    <div>
      <div className="relative">
        <input
          type="search"
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Category"
          value={category}
          onChange={(e) => handleCategoryChanged(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={handleAddCategory}
          className="absolute end-2.5 bottom-2.5 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Add
        </button>
      </div>
      <div className="mt-2">
        {categories.map((category, index) => (
          <div
            key={index}
            className="mb-2 flex items-center w-full max-w-xs p-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 border"
          >
            <div className="ms-3 text-sm font-normal">{category}</div>
            <button
              type="button"
              onClick={() => handleDeleteCategory(category)}
              className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-default"
              aria-label="Close"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
