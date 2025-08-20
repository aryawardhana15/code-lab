"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markNotificationAsReadService = exports.getMyNotificationsService = exports.createNotificationService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const server_1 = require("../../server"); // Import the Socket.IO instance
const createNotificationService = async (userId, type, message) => {
    const [result] = await db_1.default.execute('INSERT INTO notifications (user_id, type, message) VALUES (?, ?, ?)', [userId, type, message]);
    const notificationId = result.insertId;
    const [rows] = await db_1.default.execute('SELECT * FROM notifications WHERE id = ?', [notificationId]);
    const newNotification = rows[0];
    // Emit notification via Socket.IO
    server_1.io.to(`user_${userId}`).emit('new_notification', newNotification);
    return newNotification;
};
exports.createNotificationService = createNotificationService;
const getMyNotificationsService = async (userId) => {
    const [rows] = await db_1.default.execute('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows;
};
exports.getMyNotificationsService = getMyNotificationsService;
const markNotificationAsReadService = async (notificationId, userId) => {
    const [notificationRows] = await db_1.default.execute('SELECT * FROM notifications WHERE id = ? AND user_id = ?', [notificationId, userId]);
    const notification = notificationRows[0];
    if (!notification) {
        throw new Error('Notification not found or does not belong to this user');
    }
    await db_1.default.execute('UPDATE notifications SET is_read = 1 WHERE id = ?', [notificationId]);
    return { message: 'Notification marked as read' };
};
exports.markNotificationAsReadService = markNotificationAsReadService;
