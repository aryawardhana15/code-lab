import { z } from 'zod';

export const createForumPostSchema = z.object({
  course_id: z.number().int().positive(),
  title: z.string().min(1, 'Title is required').max(180, 'Title cannot exceed 180 characters'),
  content: z.string().min(1, 'Content is required'),
});

export const updateForumPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(180, 'Title cannot exceed 180 characters').optional(),
  content: z.string().min(1, 'Content is required').optional(),
});

export const createForumCommentSchema = z.object({
  content: z.string().min(1, 'Content is required'),
});

export type CreateForumPostInput = z.infer<typeof createForumPostSchema>;
export type UpdateForumPostInput = z.infer<typeof updateForumPostSchema>;
export type CreateForumCommentInput = z.infer<typeof createForumCommentSchema>;
