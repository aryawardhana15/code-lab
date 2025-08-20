"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboardData = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getLeaderboardData = async () => {
    const [rows] = await db_1.default.execute(`
    SELECT
      l.id,
      l.student_id,
      l.total_points,
      u.name AS student_name,
      u.avatar_url AS student_avatar_url
    FROM
      leaderboard l
    JOIN
      users u ON l.student_id = u.id
    ORDER BY
      l.total_points DESC
    LIMIT 10
  `);
    const leaderboard = rows;
    return leaderboard.map((entry, index) => ({
        rank: index + 1,
        userId: entry.student_id,
        username: entry.student_name,
        avatarUrl: entry.student_avatar_url,
        totalPoints: entry.total_points,
    }));
};
exports.getLeaderboardData = getLeaderboardData;
