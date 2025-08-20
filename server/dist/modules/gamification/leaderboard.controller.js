"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboard = void 0;
const leaderboard_service_1 = require("./leaderboard.service");
const getLeaderboard = async (req, res, next) => {
    try {
        const leaderboard = await (0, leaderboard_service_1.getLeaderboardData)();
        res.status(200).json(leaderboard);
    }
    catch (error) {
        next(error);
    }
};
exports.getLeaderboard = getLeaderboard;
