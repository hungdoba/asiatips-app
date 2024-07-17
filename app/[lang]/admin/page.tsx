import Link from 'next/link';
import { auth } from '@/auth';
import {
  RevalidateGalleryButton,
  RevalidatePostButton,
  SignInButton,
  SignOutButton,
} from '@/components/controls/Button';

export default async function SignIn() {
  const session = await auth();
  if (!session?.user)
    return (
      <div className="mx-auto max-w-lg flex justify-center items-center">
        <SignInButton />
      </div>
    );

  return (
    <div className="mx-auto max-w-sm md:max-w-lg flex flex-col">
      <h1 className="leading-tight tracking-tight text-gray-900 dark:text-white mb-4">
        {`Logged in:`}
      </h1>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-8">
        {session.user.email}
      </h1>
      <Link
        href={`./admin/create`}
        className="w-full text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Create New Post
      </Link>
      <RevalidateGalleryButton />
      <RevalidatePostButton />
      <SignOutButton />
    </div>
  );
}
