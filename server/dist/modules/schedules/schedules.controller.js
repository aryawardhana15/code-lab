"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchedule = exports.updateSchedule = exports.getScheduleById = exports.getAllSchedules = exports.createSchedule = void 0;
const schedules_service_1 = require("./schedules.service");
const createSchedule = async (req, res, next) => {
    try {
        const scheduleData = req.body;
        const schedule = await (0, schedules_service_1.createScheduleService)(scheduleData);
        res.status(201).json(schedule);
    }
    catch (error) {
        next(error);
    }
};
exports.createSchedule = createSchedule;
const getAllSchedules = async (req, res, next) => {
    try {
        const { courseId } = req.query;
        const schedules = await (0, schedules_service_1.getAllSchedulesService)(courseId);
        res.status(200).json(schedules);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllSchedules = getAllSchedules;
const getScheduleById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const schedule = await (0, schedules_service_1.getScheduleByIdService)(Number(id));
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json(schedule);
    }
    catch (error) {
        next(error);
    }
};
exports.getScheduleById = getScheduleById;
const updateSchedule = async (req, res, next) => {
    try {
        const { id } = req.params;
        const scheduleData = req.body;
        const updatedSchedule = await (0, schedules_service_1.updateScheduleService)(Number(id), scheduleData);
        res.status(200).json(updatedSchedule);
    }
    catch (error) {
        next(error);
    }
};
exports.updateSchedule = updateSchedule;
const deleteSchedule = async (req, res, next) => {
    try {
        const { id } = req.params;
        await (0, schedules_service_1.deleteScheduleService)(Number(id));
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteSchedule = deleteSchedule;
