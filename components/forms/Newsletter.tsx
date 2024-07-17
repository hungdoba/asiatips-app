'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { subscribe } from '@/actions/no-cache/subscribe';

interface Props {
  dictionary: any;
}

export default function Newsletter({ dictionary }: Props) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    const result = await subscribe(formData);
    if (result == true) {
      toast.success(dictionary.footer.successMessage);
    } else {
      toast.error(dictionary.footer.failMessage);
    }
  };

  return (
    <div className="mx-auto sm:text-center">
      <h2 className="mb-4 text-3xl tracking-tight font-extrabold">
        {dictionary.footer.signupForNewsletter}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row mx-auto md:max-w-screen-sm">
          <div className="relative w-3/4">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              className="block p-3 pl-10 w-full text-sm  bg-gray-50 rounded-l-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder={dictionary.footer.enterYourEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div className="w-1/4">
            <button
              type="submit"
              className="bg-gray-400 dark:bg-gray-800 hover:bg-gray-500 dark:hover:bg-gray-900 py-3 px-5 w-full text-sm font-medium text-center rounded-r-lg border border-gray-300 dark:border-gray-500 cursor-pointer"
            >
              {dictionary.footer.subscribe}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
