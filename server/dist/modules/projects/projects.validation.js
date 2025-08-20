"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.createProjectSchema = void 0;
const zod_1 = require("zod");
exports.createProjectSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(150, 'Title cannot exceed 150 characters'),
    screenshot_url: zod_1.z.string().url('Invalid URL format').optional(),
    demo_url: zod_1.z.string().url('Invalid URL format').optional(),
    description: zod_1.z.string().optional(),
});
exports.updateProjectSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(150, 'Title cannot exceed 150 characters').optional(),
    screenshot_url: zod_1.z.string().url('Invalid URL format').optional(),
    demo_url: zod_1.z.string().url('Invalid URL format').optional(),
    description: zod_1.z.string().optional(),
    is_published: zod_1.z.boolean().optional(),
});
