"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeBadge = exports.assignBadge = exports.getBadges = void 0;
const badges_service_1 = require("./badges.service");
const getBadges = async (req, res, next) => {
    try {
        const badges = await (0, badges_service_1.getAllBadges)();
        res.status(200).json(badges);
    }
    catch (error) {
        next(error);
    }
};
exports.getBadges = getBadges;
const assignBadge = async (req, res, next) => {
    try {
        const { userId, badgeId } = req.body;
        const userBadge = await (0, badges_service_1.assignBadgeToUser)(userId, badgeId);
        res.status(201).json(userBadge);
    }
    catch (error) {
        next(error);
    }
};
exports.assignBadge = assignBadge;
const revokeBadge = async (req, res, next) => {
    try {
        const { userId, badgeId } = req.body;
        await (0, badges_service_1.revokeBadgeFromUser)(userId, badgeId);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.revokeBadge = revokeBadge;
