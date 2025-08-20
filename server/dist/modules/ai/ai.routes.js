"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_controller_1 = require("./ai.controller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/ai/chat', auth_1.authRequired, ai_controller_1.getAIResponse);
exports.default = router;
