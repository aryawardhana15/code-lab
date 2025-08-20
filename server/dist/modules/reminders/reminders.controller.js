"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReminderEmail = void 0;
const reminders_service_1 = require("./reminders.service");
const sendReminderEmail = async (req, res, next) => {
    try {
        const { to, subject, text, html } = req.body;
        await (0, reminders_service_1.sendEmail)(to, subject, text, html);
        res.status(200).json({ message: 'Reminder email sent successfully!' });
    }
    catch (error) {
        next(error);
    }
};
exports.sendReminderEmail = sendReminderEmail;
