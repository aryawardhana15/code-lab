"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderMaterialsSchema = exports.updateMaterialSchema = exports.createMaterialSchema = exports.updateCourseSchema = exports.createCourseSchema = void 0;
const zod_1 = require("zod");
exports.createCourseSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().optional(),
    level: zod_1.z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Beginner'),
    mentor_id: zod_1.z.number().int().positive().optional(),
    is_published: zod_1.z.boolean().default(false),
});
exports.updateCourseSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').optional(),
    description: zod_1.z.string().optional(),
    level: zod_1.z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
    mentor_id: zod_1.z.number().int().positive().nullable().optional(),
    is_published: zod_1.z.boolean().optional(),
});
exports.createMaterialSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    content: zod_1.z.string().optional(),
    type: zod_1.z.enum(['text', 'video', 'pdf', 'quiz', 'code']).default('text'),
    order_index: zod_1.z.number().int().min(0).default(0),
});
exports.updateMaterialSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').optional(),
    content: zod_1.z.string().optional(),
    type: zod_1.z.enum(['text', 'video', 'pdf', 'quiz', 'code']).optional(),
    order_index: zod_1.z.number().int().min(0).optional(),
});
exports.reorderMaterialsSchema = zod_1.z.array(zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    order_index: zod_1.z.number().int().min(0),
}));
