'use server';

import * as z from 'zod';

import { LoginSchema } from '@/schemas/form-schema';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    };
  }

  return {
    success: 'Success!',
  };
};
