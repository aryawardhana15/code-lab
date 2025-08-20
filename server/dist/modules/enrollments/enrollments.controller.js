"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgress = exports.getMyEnrollments = exports.enrollInCourse = void 0;
const enrollments_service_1 = require("./enrollments.service");
const enrollInCourse = async (req, res, next) => {
    try {
        const customReq = req;
        const { course_id } = req.body;
        const student_id = customReq.user.id;
        const enrollment = await (0, enrollments_service_1.enrollInCourseService)(student_id, course_id);
        res.status(201).json(enrollment);
    }
    catch (error) {
        next(error);
    }
};
exports.enrollInCourse = enrollInCourse;
const getMyEnrollments = async (req, res, next) => {
    try {
        const customReq = req;
        const student_id = customReq.user.id;
        const enrollments = await (0, enrollments_service_1.getMyEnrollmentsService)(student_id);
        res.status(200).json(enrollments);
    }
    catch (error) {
        next(error);
    }
};
exports.getMyEnrollments = getMyEnrollments;
const updateProgress = async (req, res, next) => {
    try {
        const customReq = req;
        const { enrollment_id, material_id, status } = req.body;
        const student_id = customReq.user.id; // Ensure the user updating progress is the enrolled student
        const updatedProgress = await (0, enrollments_service_1.updateProgressService)(student_id, enrollment_id, material_id, status);
        res.status(200).json(updatedProgress);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProgress = updateProgress;
