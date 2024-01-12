'use server';

import * as z from 'zod';

import { LoginSchema } from '@/schemas/form-schema';

export const login = async ({
  email,
  password,
}: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    // throw new Error('Invalid fields', { cause: validatedFields.error });
    return {
      error: 'Invalid fields',
    };
  }

  return {
    success: 'Success!',
  };
};
