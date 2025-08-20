"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_controller_1 = require("./leaderboard.controller");
const router = (0, express_1.Router)();
router.get('/leaderboard', leaderboard_controller_1.getLeaderboard);
exports.default = router;
