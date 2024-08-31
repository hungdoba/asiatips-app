import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials?.email === 'hungdoba.hdb@gmail.com' &&
          credentials.password === 'dobahung6'
        ) {
          return {
            name: 'admin',
            email: 'hungdoba.hdb@gmail.com',
          };
        }
        return null;
      },
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
