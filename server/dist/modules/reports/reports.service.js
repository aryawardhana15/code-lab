"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEnrollmentsReport = exports.generateCoursesReport = exports.generateUsersReport = void 0;
const json2csv_1 = require("json2csv");
const db_1 = __importDefault(require("../../config/db"));
const generateUsersReport = async () => {
    const [rows] = await db_1.default.execute('SELECT id, name, email, role, created_at FROM users');
    const users = rows;
    const fields = ['id', 'name', 'email', 'role', 'created_at'];
    const json2csvParser = new json2csv_1.Parser({ fields });
    return json2csvParser.parse(users);
};
exports.generateUsersReport = generateUsersReport;
const generateCoursesReport = async () => {
    const [rows] = await db_1.default.execute('SELECT id, title, description, price, created_at FROM courses');
    const courses = rows;
    const fields = ['id', 'title', 'description', 'price', 'created_at'];
    const json2csvParser = new json2csv_1.Parser({ fields });
    return json2csvParser.parse(courses);
};
exports.generateCoursesReport = generateCoursesReport;
const generateEnrollmentsReport = async () => {
    const [rows] = await db_1.default.execute('SELECT id, student_id, course_id, created_at FROM enrollments');
    const enrollments = rows;
    const fields = ['id', 'student_id', 'course_id', 'created_at'];
    const json2csvParser = new json2csv_1.Parser({ fields });
    return json2csvParser.parse(enrollments);
};
exports.generateEnrollmentsReport = generateEnrollmentsReport;
