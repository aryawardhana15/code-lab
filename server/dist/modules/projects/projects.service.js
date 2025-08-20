"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveProjectService = exports.deleteProjectService = exports.updateProjectService = exports.getProjectByIdService = exports.getAllProjectsService = exports.createProjectService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createProjectService = async (studentId, projectData) => {
    const { title, screenshot_url, demo_url, description } = projectData;
    const [result] = await db_1.default.execute('INSERT INTO projects (student_id, title, screenshot_url, demo_url, description) VALUES (?, ?, ?, ?, ?)', [studentId, title, screenshot_url, demo_url, description]);
    const projectId = result.insertId;
    const [rows] = await db_1.default.execute('SELECT * FROM projects WHERE id = ?', [projectId]);
    return rows[0];
};
exports.createProjectService = createProjectService;
const getAllProjectsService = async (published) => {
    let query = `
    SELECT p.*, u.name as student_name, u.email as student_email
    FROM projects p
    JOIN users u ON p.student_id = u.id
    WHERE 1=1
  `;
    const params = [];
    if (published !== undefined) {
        query += ' AND p.is_published = ?';
        params.push(published === 'true');
    }
    query += ' ORDER BY p.created_at DESC';
    const [rows] = await db_1.default.execute(query, params);
    return rows;
};
exports.getAllProjectsService = getAllProjectsService;
const getProjectByIdService = async (id) => {
    const [rows] = await db_1.default.execute(`SELECT p.*, u.name as student_name, u.email as student_email
     FROM projects p
     JOIN users u ON p.student_id = u.id
     WHERE p.id = ?`, [id]);
    return rows[0];
};
exports.getProjectByIdService = getProjectByIdService;
const updateProjectService = async (projectId, userId, userRole, projectData) => {
    const [projectRows] = await db_1.default.execute('SELECT * FROM projects WHERE id = ?', [projectId]);
    const project = projectRows[0];
    if (!project) {
        throw new Error('Project not found');
    }
    // Only allow owner or admin/mentor to update
    if (project.student_id !== userId && !['admin', 'mentor'].includes(userRole)) {
        throw new Error('Unauthorized to update this project');
    }
    const fields = Object.keys(projectData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(projectData);
    if (fields.length === 0) {
        return project;
    }
    await db_1.default.execute(`UPDATE projects SET ${fields} WHERE id = ?`, [...values, projectId]);
    const [updatedRows] = await db_1.default.execute('SELECT * FROM projects WHERE id = ?', [projectId]);
    return updatedRows[0];
};
exports.updateProjectService = updateProjectService;
const deleteProjectService = async (projectId, userId, userRole) => {
    const [projectRows] = await db_1.default.execute('SELECT * FROM projects WHERE id = ?', [projectId]);
    const project = projectRows[0];
    if (!project) {
        throw new Error('Project not found');
    }
    // Only allow owner or admin/mentor to delete
    if (project.student_id !== userId && !['admin', 'mentor'].includes(userRole)) {
        throw new Error('Unauthorized to delete this project');
    }
    await db_1.default.execute('DELETE FROM projects WHERE id = ?', [projectId]);
};
exports.deleteProjectService = deleteProjectService;
const approveProjectService = async (projectId, isPublished) => {
    await db_1.default.execute('UPDATE projects SET is_published = ? WHERE id = ?', [isPublished, projectId]);
    const [rows] = await db_1.default.execute('SELECT * FROM projects WHERE id = ?', [projectId]);
    return rows[0];
};
exports.approveProjectService = approveProjectService;
