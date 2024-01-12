'use server';

import bcrypt from 'bcrypt';
import * as z from 'zod';

import { db } from '@/db';
import { users } from '@/db/schema';
import { RegisterSchema } from '@/schemas/form-schema';
import { eq } from 'drizzle-orm';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return {
      error: 'Email already in use!',
    };
  }

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  return {
    success: 'Success!',
  };
};
