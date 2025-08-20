"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportReports = void 0;
const reports_service_1 = require("./reports.service");
const exportReports = async (req, res, next) => {
    try {
        const { type } = req.params;
        let csvData;
        let filename;
        switch (type) {
            case 'users':
                csvData = await (0, reports_service_1.generateUsersReport)();
                filename = 'users_report.csv';
                break;
            case 'courses':
                csvData = await (0, reports_service_1.generateCoursesReport)();
                filename = 'courses_report.csv';
                break;
            case 'enrollments':
                csvData = await (0, reports_service_1.generateEnrollmentsReport)();
                filename = 'enrollments_report.csv';
                break;
            default:
                return res.status(400).json({ message: 'Invalid report type' });
        }
        res.header('Content-Type', 'text/csv');
        res.attachment(filename);
        res.send(csvData);
    }
    catch (error) {
        next(error);
    }
};
exports.exportReports = exportReports;
