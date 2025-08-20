"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteScheduleService = exports.updateScheduleService = exports.getScheduleByIdService = exports.getAllSchedulesService = exports.createScheduleService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createScheduleService = async (scheduleData) => {
    const { course_id, title, start_at, end_at, meet_link } = scheduleData;
    const [result] = await db_1.default.execute('INSERT INTO schedules (course_id, title, start_at, end_at, meet_link) VALUES (?, ?, ?, ?, ?)', [course_id, title, start_at, end_at, meet_link]);
    const scheduleId = result.insertId;
    const [rows] = await db_1.default.execute('SELECT * FROM schedules WHERE id = ?', [scheduleId]);
    return rows[0];
};
exports.createScheduleService = createScheduleService;
const getAllSchedulesService = async (courseId) => {
    let query = 'SELECT s.*, c.title as course_title FROM schedules s JOIN courses c ON s.course_id = c.id WHERE 1=1';
    const params = [];
    if (courseId) {
        query += ' AND s.course_id = ?';
        params.push(Number(courseId));
    }
    query += ' ORDER BY s.start_at ASC';
    const [rows] = await db_1.default.execute(query, params);
    return rows;
};
exports.getAllSchedulesService = getAllSchedulesService;
const getScheduleByIdService = async (id) => {
    const [rows] = await db_1.default.execute(`SELECT s.*, c.title as course_title
     FROM schedules s
     JOIN courses c ON s.course_id = c.id
     WHERE s.id = ?`, [id]);
    return rows[0];
};
exports.getScheduleByIdService = getScheduleByIdService;
const updateScheduleService = async (id, scheduleData) => {
    const fields = Object.keys(scheduleData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(scheduleData);
    if (fields.length === 0) {
        const [rows] = await db_1.default.execute('SELECT * FROM schedules WHERE id = ?', [id]);
        return rows[0];
    }
    await db_1.default.execute(`UPDATE schedules SET ${fields} WHERE id = ?`, [...values, id]);
    const [rows] = await db_1.default.execute('SELECT * FROM schedules WHERE id = ?', [id]);
    return rows[0];
};
exports.updateScheduleService = updateScheduleService;
const deleteScheduleService = async (id) => {
    await db_1.default.execute('DELETE FROM schedules WHERE id = ?', [id]);
};
exports.deleteScheduleService = deleteScheduleService;
