"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressUpdateSchema = exports.enrollmentSchema = void 0;
const zod_1 = require("zod");
exports.enrollmentSchema = zod_1.z.object({
    course_id: zod_1.z.number().int().positive(),
});
exports.progressUpdateSchema = zod_1.z.object({
    enrollment_id: zod_1.z.number().int().positive(),
    material_id: zod_1.z.number().int().positive(),
    status: zod_1.z.enum(['belum', 'sedang', 'selesai']).default('belum'),
});
