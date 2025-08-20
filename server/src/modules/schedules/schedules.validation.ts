import { z } from 'zod';

export const createScheduleSchema = z.object({
  course_id: z.number().int().positive(),
  title: z.string().min(1, 'Title is required').max(150, 'Title cannot exceed 150 characters'),
  start_at: z.string().datetime('Invalid datetime format').min(new Date().toISOString(), 'Start time must be in the future'),
  end_at: z.string().datetime('Invalid datetime format').min(new Date().toISOString(), 'End time must be in the future'),
  meet_link: z.string().url('Invalid URL format').optional(),
}).refine(data => new Date(data.end_at) > new Date(data.start_at), {
  message: 'End time must be after start time',
  path: ['end_at'],
});

export const updateScheduleSchema = z.object({
  course_id: z.number().int().positive().optional(),
  title: z.string().min(1, 'Title is required').max(150, 'Title cannot exceed 150 characters').optional(),
  start_at: z.string().datetime('Invalid datetime format').optional(),
  end_at: z.string().datetime('Invalid datetime format').optional(),
  meet_link: z.string().url('Invalid URL format').optional(),
}).refine(data => {
  if (data.start_at && data.end_at) {
    return new Date(data.end_at) > new Date(data.start_at);
  }
  return true;
}, {
  message: 'End time must be after start time',
  path: ['end_at'],
});

export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;
export type UpdateScheduleInput = z.infer<typeof updateScheduleSchema>;
