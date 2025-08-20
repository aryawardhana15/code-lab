"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTestimonialSchema = exports.createTestimonialSchema = void 0;
const zod_1 = require("zod");
exports.createTestimonialSchema = zod_1.z.object({
    student_id: zod_1.z.number().int().positive().optional(), // Optional if name_override is used
    name_override: zod_1.z.string().max(100).optional(),
    photo_url: zod_1.z.string().url('Invalid URL format').optional(),
    quote: zod_1.z.string().min(1, 'Quote is required'),
    rating: zod_1.z.number().int().min(1).max(5).optional(),
});
exports.updateTestimonialSchema = zod_1.z.object({
    student_id: zod_1.z.number().int().positive().optional(),
    name_override: zod_1.z.string().max(100).optional(),
    photo_url: zod_1.z.string().url('Invalid URL format').optional(),
    quote: zod_1.z.string().min(1, 'Quote is required').optional(),
    rating: zod_1.z.number().int().min(1).max(5).optional(),
    is_approved: zod_1.z.boolean().optional(),
});
