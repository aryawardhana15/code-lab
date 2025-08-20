"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderMaterialsService = exports.deleteMaterialService = exports.updateMaterialService = exports.createMaterialService = exports.getCourseMaterialsService = exports.deleteCourseService = exports.updateCourseService = exports.getCourseByIdService = exports.getAllCoursesService = exports.createCourseService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createCourseService = async (courseData) => {
    const { title, description, level, mentor_id, is_published } = courseData;
    const [result] = await db_1.default.execute('INSERT INTO courses (title, description, level, mentor_id, is_published) VALUES (?, ?, ?, ?, ?)', [title, description, level, mentor_id, is_published]);
    const courseId = result.insertId;
    const [rows] = await db_1.default.execute('SELECT * FROM courses WHERE id = ?', [courseId]);
    return rows[0];
};
exports.createCourseService = createCourseService;
const getAllCoursesService = async (level, published) => {
    let query = 'SELECT c.*, u.name as mentor_name FROM courses c LEFT JOIN users u ON c.mentor_id = u.id WHERE 1=1';
    const params = [];
    if (level) {
        query += ' AND c.level = ?';
        params.push(level);
    }
    if (published !== undefined) {
        query += ' AND c.is_published = ?';
        params.push(published === 'true');
    }
    const [rows] = await db_1.default.execute(query, params);
    return rows;
};
exports.getAllCoursesService = getAllCoursesService;
const getCourseByIdService = async (id) => {
    const [rows] = await db_1.default.execute('SELECT c.*, u.name as mentor_name FROM courses c LEFT JOIN users u ON c.mentor_id = u.id WHERE c.id = ?', [id]);
    return rows[0];
};
exports.getCourseByIdService = getCourseByIdService;
const updateCourseService = async (id, courseData) => {
    const fields = Object.keys(courseData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(courseData);
    if (fields.length === 0) {
        const [rows] = await db_1.default.execute('SELECT * FROM courses WHERE id = ?', [id]);
        return rows[0];
    }
    await db_1.default.execute(`UPDATE courses SET ${fields} WHERE id = ?`, [...values, id]);
    const [rows] = await db_1.default.execute('SELECT * FROM courses WHERE id = ?', [id]);
    return rows[0];
};
exports.updateCourseService = updateCourseService;
const deleteCourseService = async (id) => {
    await db_1.default.execute('DELETE FROM courses WHERE id = ?', [id]);
};
exports.deleteCourseService = deleteCourseService;
const getCourseMaterialsService = async (courseId) => {
    const [rows] = await db_1.default.execute('SELECT * FROM materials WHERE course_id = ? ORDER BY order_index ASC', [courseId]);
    return rows;
};
exports.getCourseMaterialsService = getCourseMaterialsService;
const createMaterialService = async (courseId, materialData) => {
    const { title, content, type, order_index } = materialData;
    const [result] = await db_1.default.execute('INSERT INTO materials (course_id, title, content, type, order_index) VALUES (?, ?, ?, ?, ?)', [courseId, title, content, type, order_index]);
    const materialId = result.insertId;
    const [rows] = await db_1.default.execute('SELECT * FROM materials WHERE id = ?', [materialId]);
    return rows[0];
};
exports.createMaterialService = createMaterialService;
const updateMaterialService = async (courseId, materialId, materialData) => {
    const fields = Object.keys(materialData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(materialData);
    if (fields.length === 0) {
        const [rows] = await db_1.default.execute('SELECT * FROM materials WHERE id = ?', [materialId]);
        return rows[0];
    }
    await db_1.default.execute(`UPDATE materials SET ${fields} WHERE id = ? AND course_id = ?`, [...values, materialId, courseId]);
    const [rows] = await db_1.default.execute('SELECT * FROM materials WHERE id = ?', [materialId]);
    return rows[0];
};
exports.updateMaterialService = updateMaterialService;
const deleteMaterialService = async (courseId, materialId) => {
    await db_1.default.execute('DELETE FROM materials WHERE id = ? AND course_id = ?', [materialId, courseId]);
};
exports.deleteMaterialService = deleteMaterialService;
const reorderMaterialsService = async (courseId, reorderData) => {
    const connection = await db_1.default.getConnection();
    try {
        await connection.beginTransaction();
        for (const item of reorderData) {
            await connection.execute('UPDATE materials SET order_index = ? WHERE id = ? AND course_id = ?', [item.order_index, item.id, courseId]);
        }
        await connection.commit();
    }
    catch (error) {
        await connection.rollback();
        throw error;
    }
    finally {
        connection.release();
    }
};
exports.reorderMaterialsService = reorderMaterialsService;
