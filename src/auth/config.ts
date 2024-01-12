import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { db } from '@/db';
import { users } from '@/db/schema';
import { LoginSchema } from '@/schemas/form-schema';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });
          
          if (!user || !user.password) return null;

          const isPassword = await bcrypt.compare(password, user.password);

          if (isPassword) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
