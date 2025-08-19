import { z } from 'zod';

export const updateMeValidation = z.object({
  name: z.string().min(1).max(100).optional(),
  avatar_url: z.string().url().optional(),
});

export const updateUserValidation = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  role: z.enum(['student', 'mentor', 'admin']).optional(),
  avatar_url: z.string().url().optional(),
});
