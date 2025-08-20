"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courses_controller_1 = require("./courses.controller");
const validate_1 = require("../../middlewares/validate");
const courses_validation_1 = require("./courses.validation");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Public routes
router.get('/', courses_controller_1.getAllCourses);
router.get('/:id', courses_controller_1.getCourseById);
router.get('/:id/materials', courses_controller_1.getCourseMaterials);
// Admin/Mentor routes for courses
router.post('/', auth_1.authRequired, (0, auth_1.roleRequired)(['mentor', 'admin']), (0, validate_1.validate)(courses_validation_1.createCourseSchema), courses_controller_1.createCourse);
router.patch('/:id', auth_1.authRequired, (0, auth_1.roleRequired)(['mentor', 'admin']), (0, validate_1.validate)(courses_validation_1.updateCourseSchema), courses_controller_1.updateCourse);
router.delete('/:id', auth_1.authRequired, (0, auth_1.roleRequired)(['admin']), courses_controller_1.deleteCourse);
// Admin/Mentor routes for materials
router.post('/:id/materials', auth_1.authRequired, (0, auth_1.roleRequired)(['mentor', 'admin']), (0, validate_1.validate)(courses_validation_1.createMaterialSchema), courses_controller_1.createMaterial);
router.patch('/:courseId/materials/:materialId', auth_1.authRequired, (0, auth_1.roleRequired)(['mentor', 'admin']), (0, validate_1.validate)(courses_validation_1.updateMaterialSchema), courses_controller_1.updateMaterial);
router.delete('/:courseId/materials/:materialId', auth_1.authRequired, (0, auth_1.roleRequired)(['admin']), courses_controller_1.deleteMaterial);
router.post('/:id/materials/reorder', auth_1.authRequired, (0, auth_1.roleRequired)(['mentor', 'admin']), (0, validate_1.validate)(courses_validation_1.reorderMaterialsSchema), courses_controller_1.reorderMaterials);
exports.default = router;
