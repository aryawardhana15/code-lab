"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeBadgeFromUser = exports.assignBadgeToUser = exports.getAllBadges = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getAllBadges = async () => {
    const [rows] = await db_1.default.execute('SELECT * FROM badges');
    return rows;
};
exports.getAllBadges = getAllBadges;
const assignBadgeToUser = async (userId, badgeId) => {
    const [result] = await db_1.default.execute('INSERT INTO user_badges (user_id, badge_id) VALUES (?, ?)', [userId, badgeId]);
    const userBadgeId = result.insertId;
    const [rows] = await db_1.default.execute('SELECT * FROM user_badges WHERE id = ?', [userBadgeId]);
    return rows[0];
};
exports.assignBadgeToUser = assignBadgeToUser;
const revokeBadgeFromUser = async (userId, badgeId) => {
    await db_1.default.execute('DELETE FROM user_badges WHERE user_id = ? AND badge_id = ?', [userId, badgeId]);
};
exports.revokeBadgeFromUser = revokeBadgeFromUser;
