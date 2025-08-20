"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markNotificationAsRead = exports.getMyNotifications = void 0;
const notifications_service_1 = require("./notifications.service");
const getMyNotifications = async (req, res, next) => {
    try {
        const customReq = req;
        const user_id = customReq.user.id;
        const notifications = await (0, notifications_service_1.getMyNotificationsService)(user_id);
        res.status(200).json(notifications);
    }
    catch (error) {
        next(error);
    }
};
exports.getMyNotifications = getMyNotifications;
const markNotificationAsRead = async (req, res, next) => {
    try {
        const customReq = req;
        const { id } = req.params;
        const user_id = customReq.user.id;
        await (0, notifications_service_1.markNotificationAsReadService)(Number(id), user_id);
        res.status(200).json({ message: 'Notification marked as read' });
    }
    catch (error) {
        next(error);
    }
};
exports.markNotificationAsRead = markNotificationAsRead;
