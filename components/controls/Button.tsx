import { signIn, signOut } from '@/auth';
import { revalidateTag } from 'next/cache';

export function SignInButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        Sign in with Google
      </button>
    </form>
  );
}

export function RevalidateGalleryButton() {
  return (
    <form
      action={async () => {
        'use server';
        revalidateTag('cache-image');
      }}
      className="w-full"
    >
      <button className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        Revalidate Gallery
      </button>
    </form>
  );
}

export function RevalidatePostButton() {
  return (
    <form
      action={async () => {
        'use server';
        revalidateTag('cache-post');
      }}
      className="w-full"
    >
      <button className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        Revalidate Post
      </button>
    </form>
  );
}
