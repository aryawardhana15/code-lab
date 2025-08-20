"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reports_controller_1 = require("./reports.controller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/admin/reports/:type', auth_1.authRequired, (0, auth_1.roleRequired)(['admin']), reports_controller_1.exportReports);
exports.default = router;
