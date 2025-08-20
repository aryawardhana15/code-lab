import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(150, 'Title cannot exceed 150 characters'),
  screenshot_url: z.string().url('Invalid URL format').optional(),
  demo_url: z.string().url('Invalid URL format').optional(),
  description: z.string().optional(),
});

export const updateProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(150, 'Title cannot exceed 150 characters').optional(),
  screenshot_url: z.string().url('Invalid URL format').optional(),
  demo_url: z.string().url('Invalid URL format').optional(),
  description: z.string().optional(),
  is_published: z.boolean().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
