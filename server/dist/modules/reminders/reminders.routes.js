"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reminders_controller_1 = require("./reminders.controller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// This route could be triggered by a cron job or manually for testing
router.post('/admin/reminders/send', auth_1.authRequired, (0, auth_1.roleRequired)(['admin']), reminders_controller_1.sendReminderEmail);
exports.default = router;
