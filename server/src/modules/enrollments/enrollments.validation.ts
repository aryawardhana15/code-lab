import { z } from 'zod';

export const enrollmentSchema = z.object({
  course_id: z.number().int().positive(),
});

export const progressUpdateSchema = z.object({
  enrollment_id: z.number().int().positive(),
  material_id: z.number().int().positive(),
  status: z.enum(['belum', 'sedang', 'selesai']).default('belum'),
});

export type EnrollmentInput = z.infer<typeof enrollmentSchema>;
export type ProgressUpdateInput = z.infer<typeof progressUpdateSchema>;
