"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testimonials_controller_1 = require("./testimonials.controller");
const validate_1 = require("../../middlewares/validate");
const testimonials_validation_1 = require("./testimonials.validation");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Public routes
router.get('/', testimonials_controller_1.getAllTestimonials); // Filter by approved=1
router.get('/:id', testimonials_controller_1.getTestimonialById);
// Authenticated routes (student submit)
router.post('/', auth_1.authRequired, (0, validate_1.validate)(testimonials_validation_1.createTestimonialSchema), testimonials_controller_1.createTestimonial);
// Admin routes for moderation
router.patch('/:id', auth_1.authRequired, (0, auth_1.roleRequired)(['admin']), (0, validate_1.validate)(testimonials_validation_1.updateTestimonialSchema), testimonials_controller_1.updateTestimonial);
router.patch('/:id/approve', auth_1.authRequired, (0, auth_1.roleRequired)(['admin']), testimonials_controller_1.approveTestimonial);
router.delete('/:id', auth_1.authRequired, (0, auth_1.roleRequired)(['admin']), testimonials_controller_1.deleteTestimonial);
exports.default = router;
