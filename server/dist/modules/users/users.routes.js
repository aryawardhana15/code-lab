"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const validate_1 = require("../../middlewares/validate");
const users_controller_1 = require("./users.controller");
const users_validation_1 = require("./users.validation");
const router = (0, express_1.Router)();
// User-specific routes (authenticated)
router.get('/me', auth_1.authRequired, users_controller_1.getMe);
router.patch('/me', auth_1.authRequired, (0, validate_1.validate)(users_validation_1.updateMeValidation), users_controller_1.updateMe);
// Admin-specific routes
router.get('/', auth_1.authRequired, (0, auth_1.roleRequired)(['admin']), users_controller_1.getAllUsers);
router.get('/:id', auth_1.authRequired, (0, auth_1.roleRequired)(['admin']), users_controller_1.getUserById);
router.patch('/:id', auth_1.authRequired, (0, auth_1.roleRequired)(['admin']), (0, validate_1.validate)(users_validation_1.updateUserValidation), users_controller_1.updateUser);
router.delete('/:id', auth_1.authRequired, (0, auth_1.roleRequired)(['admin']), users_controller_1.deleteUser);
exports.default = router;
