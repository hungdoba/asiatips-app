import { signIn, signOut } from '@/auth';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

export function SignInIcon() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <button role="button" aria-label="Log in">
        <FiLogIn className="hover:text-blue-500" />
      </button>
    </form>
  );
}

export function SignOutIcon() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button role="button" aria-label="Log out">
        <FiLogOut className="hover:text-blue-500" />
      </button>
    </form>
  );
}
