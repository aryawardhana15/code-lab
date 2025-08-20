"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidation = exports.updateMeValidation = void 0;
const zod_1 = require("zod");
exports.updateMeValidation = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100).optional(),
    avatar_url: zod_1.z.string().url().optional(),
});
exports.updateUserValidation = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100).optional(),
    email: zod_1.z.string().email().optional(),
    role: zod_1.z.enum(['student', 'mentor', 'admin']).optional(),
    avatar_url: zod_1.z.string().url().optional(),
});
