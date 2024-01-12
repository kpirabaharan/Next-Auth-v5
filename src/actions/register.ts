'use server';

import * as z from 'zod';

import { LoginSchema, RegisterSchema } from '@/schemas/form-schema';

export const register = async ({
  name,
  email,
  password,
}: z.infer<typeof RegisterSchema>) => {
  const validatedFields = LoginSchema.safeParse({ name, email, password });

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    };
  }

  return {
    success: 'Success!',
  };
};
