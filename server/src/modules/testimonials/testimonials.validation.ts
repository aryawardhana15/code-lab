import { z } from 'zod';

export const createTestimonialSchema = z.object({
  student_id: z.number().int().positive().optional(), // Optional if name_override is used
  name_override: z.string().max(100).optional(),
  photo_url: z.string().url('Invalid URL format').optional(),
  quote: z.string().min(1, 'Quote is required'),
  rating: z.number().int().min(1).max(5).optional(),
});

export const updateTestimonialSchema = z.object({
  student_id: z.number().int().positive().optional(),
  name_override: z.string().max(100).optional(),
  photo_url: z.string().url('Invalid URL format').optional(),
  quote: z.string().min(1, 'Quote is required').optional(),
  rating: z.number().int().min(1).max(5).optional(),
  is_approved: z.boolean().optional(),
});

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
