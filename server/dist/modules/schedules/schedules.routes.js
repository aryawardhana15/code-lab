"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedules_controller_1 = require("./schedules.controller");
const validate_1 = require("../../middlewares/validate");
const schedules_validation_1 = require("./schedules.validation");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Public routes (viewing schedules)
router.get('/', schedules_controller_1.getAllSchedules); // Filter by courseId
router.get('/:id', schedules_controller_1.getScheduleById);
// Admin/Mentor routes
router.post('/', auth_1.authRequired, (0, auth_1.roleRequired)(['mentor', 'admin']), (0, validate_1.validate)(schedules_validation_1.createScheduleSchema), schedules_controller_1.createSchedule);
router.patch('/:id', auth_1.authRequired, (0, auth_1.roleRequired)(['mentor', 'admin']), (0, validate_1.validate)(schedules_validation_1.updateScheduleSchema), schedules_controller_1.updateSchedule);
router.delete('/:id', auth_1.authRequired, (0, auth_1.roleRequired)(['admin']), schedules_controller_1.deleteSchedule);
exports.default = router;
