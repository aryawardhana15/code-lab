"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notifications_controller_1 = require("./notifications.controller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/me', auth_1.authRequired, notifications_controller_1.getMyNotifications);
router.patch('/:id/read', auth_1.authRequired, notifications_controller_1.markNotificationAsRead);
exports.default = router;
