"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScheduleSchema = exports.createScheduleSchema = void 0;
const zod_1 = require("zod");
exports.createScheduleSchema = zod_1.z.object({
    course_id: zod_1.z.number().int().positive(),
    title: zod_1.z.string().min(1, 'Title is required').max(150, 'Title cannot exceed 150 characters'),
    start_at: zod_1.z.string().datetime('Invalid datetime format'),
    end_at: zod_1.z.string().datetime('Invalid datetime format'),
    meet_link: zod_1.z.string().url('Invalid URL format').optional(),
}).refine(data => new Date(data.start_at) > new Date(), {
    message: 'Start time must be in the future',
    path: ['start_at'],
}).refine(data => new Date(data.end_at) > new Date(), {
    message: 'End time must be in the future',
    path: ['end_at'],
}).refine(data => new Date(data.end_at) > new Date(data.start_at), {
    message: 'End time must be after start time',
    path: ['end_at'],
});
exports.updateScheduleSchema = zod_1.z.object({
    course_id: zod_1.z.number().int().positive().optional(),
    title: zod_1.z.string().min(1, 'Title is required').max(150, 'Title cannot exceed 150 characters').optional(),
    start_at: zod_1.z.string().datetime('Invalid datetime format').optional(),
    end_at: zod_1.z.string().datetime('Invalid datetime format').optional(),
    meet_link: zod_1.z.string().url('Invalid URL format').optional(),
}).refine(data => {
    if (data.start_at && new Date(data.start_at) <= new Date()) {
        return false;
    }
    if (data.end_at && new Date(data.end_at) <= new Date()) {
        return false;
    }
    if (data.start_at && data.end_at) {
        return new Date(data.end_at) > new Date(data.start_at);
    }
    return true;
}, {
    message: 'End time must be after start time and both times must be in the future',
    path: ['end_at'],
});
