"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForumCommentSchema = exports.updateForumPostSchema = exports.createForumPostSchema = void 0;
const zod_1 = require("zod");
exports.createForumPostSchema = zod_1.z.object({
    course_id: zod_1.z.number().int().positive(),
    title: zod_1.z.string().min(1, 'Title is required').max(180, 'Title cannot exceed 180 characters'),
    content: zod_1.z.string().min(1, 'Content is required'),
});
exports.updateForumPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(180, 'Title cannot exceed 180 characters').optional(),
    content: zod_1.z.string().min(1, 'Content is required').optional(),
});
exports.createForumCommentSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, 'Content is required'),
});
