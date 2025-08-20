"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeSubmissionSchema = exports.submitChallengeSchema = exports.updateChallengeSchema = exports.createChallengeSchema = void 0;
const zod_1 = require("zod");
exports.createChallengeSchema = zod_1.z.object({
    course_id: zod_1.z.number().int().positive().nullable().optional(),
    title: zod_1.z.string().min(1, 'Title is required').max(150, 'Title cannot exceed 150 characters'),
    description: zod_1.z.string().optional(),
    points: zod_1.z.number().int().min(0).default(10),
    start_at: zod_1.z.string().datetime().optional(),
    end_at: zod_1.z.string().datetime().optional(),
    is_active: zod_1.z.boolean().default(true),
});
exports.updateChallengeSchema = zod_1.z.object({
    course_id: zod_1.z.number().int().positive().nullable().optional(),
    title: zod_1.z.string().min(1, 'Title is required').max(150, 'Title cannot exceed 150 characters').optional(),
    description: zod_1.z.string().optional(),
    points: zod_1.z.number().int().min(0).optional(),
    start_at: zod_1.z.string().datetime().optional(),
    end_at: zod_1.z.string().datetime().optional(),
    is_active: zod_1.z.boolean().optional(),
});
exports.submitChallengeSchema = zod_1.z.object({
    repo_url: zod_1.z.string().url('Invalid URL format').optional(),
    demo_url: zod_1.z.string().url('Invalid URL format').optional(),
    note: zod_1.z.string().optional(),
});
exports.gradeSubmissionSchema = zod_1.z.object({
    score: zod_1.z.number().int().min(0).max(100).nullable(),
    feedback: zod_1.z.string().optional(),
});
