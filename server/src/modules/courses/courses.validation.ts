import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Beginner'),
  mentor_id: z.number().int().positive().optional(),
  is_published: z.boolean().default(false),
});

export const updateCourseSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  mentor_id: z.number().int().positive().nullable().optional(),
  is_published: z.boolean().optional(),
});

export const createMaterialSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional(),
  type: z.enum(['text', 'video', 'pdf', 'quiz', 'code']).default('text'),
  order_index: z.number().int().min(0).default(0),
});

export const updateMaterialSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  content: z.string().optional(),
  type: z.enum(['text', 'video', 'pdf', 'quiz', 'code']).optional(),
  order_index: z.number().int().min(0).optional(),
});

export const reorderMaterialsSchema = z.array(
  z.object({
    id: z.number().int().positive(),
    order_index: z.number().int().min(0),
  })
);

export type CourseInput = z.infer<typeof createCourseSchema>;
export type MaterialInput = z.infer<typeof createMaterialSchema>;
export type ReorderMaterialsInput = z.infer<typeof reorderMaterialsSchema>;
