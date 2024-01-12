import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';

import authConfig from '@/auth/config';
import { db } from '@/db';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
