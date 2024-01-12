'use server';

import * as z from 'zod';

import { LoginSchema } from '@/schemas/form-schema';

export const login = async ({
  email,
  password,
}: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    };
  }

  return {
    success: 'Success!',
  };
};
