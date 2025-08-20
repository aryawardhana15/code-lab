"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_controller_1 = require("./projects.controller");
const validate_1 = require("../../middlewares/validate");
const projects_validation_1 = require("./projects.validation");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Public routes
router.get('/', projects_controller_1.getAllProjects); // Filter by published=1
router.get('/:id', projects_controller_1.getProjectById);
// Authenticated routes (student upload)
router.post('/', auth_1.authRequired, (0, validate_1.validate)(projects_validation_1.createProjectSchema), projects_controller_1.createProject);
router.patch('/:id', auth_1.authRequired, projects_controller_1.updateProject); // Student can update their own project
// Admin/Mentor routes for moderation
router.patch('/:id/approve', auth_1.authRequired, (0, auth_1.roleRequired)(['mentor', 'admin']), projects_controller_1.approveProject);
router.delete('/:id', auth_1.authRequired, (0, auth_1.roleRequired)(['admin']), projects_controller_1.deleteProject);
exports.default = router;
