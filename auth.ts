import NextAuth, { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log(user);

      if (user.email === 'hungdoba.hdb@gmail.com') {
        return true;
      }
      return '/unauthorized';
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
