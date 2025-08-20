import { z } from 'zod';

export const createChallengeSchema = z.object({
  course_id: z.number().int().positive().nullable().optional(),
  title: z.string().min(1, 'Title is required').max(150, 'Title cannot exceed 150 characters'),
  description: z.string().optional(),
  points: z.number().int().min(0).default(10),
  start_at: z.string().datetime().optional(),
  end_at: z.string().datetime().optional(),
  is_active: z.boolean().default(true),
});

export const updateChallengeSchema = z.object({
  course_id: z.number().int().positive().nullable().optional(),
  title: z.string().min(1, 'Title is required').max(150, 'Title cannot exceed 150 characters').optional(),
  description: z.string().optional(),
  points: z.number().int().min(0).optional(),
  start_at: z.string().datetime().optional(),
  end_at: z.string().datetime().optional(),
  is_active: z.boolean().optional(),
});

export const submitChallengeSchema = z.object({
  repo_url: z.string().url('Invalid URL format').optional(),
  demo_url: z.string().url('Invalid URL format').optional(),
  note: z.string().optional(),
});

export const gradeSubmissionSchema = z.object({
  score: z.number().int().min(0).max(100).nullable(),
  feedback: z.string().optional(),
});

export type CreateChallengeInput = z.infer<typeof createChallengeSchema>;
export type UpdateChallengeInput = z.infer<typeof updateChallengeSchema>;
export type SubmitChallengeInput = z.infer<typeof submitChallengeSchema>;
export type GradeSubmissionInput = z.infer<typeof gradeSubmissionSchema>;
