"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveTestimonialService = exports.deleteTestimonialService = exports.updateTestimonialService = exports.getTestimonialByIdService = exports.getAllTestimonialsService = exports.createTestimonialService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createTestimonialService = async (testimonialData) => {
    const { student_id, name_override, photo_url, quote, rating } = testimonialData;
    const [result] = await db_1.default.execute('INSERT INTO testimonials (student_id, name_override, photo_url, quote, rating) VALUES (?, ?, ?, ?, ?)', [student_id, name_override, photo_url, quote, rating]);
    const testimonialId = result.insertId;
    const [rows] = await db_1.default.execute('SELECT * FROM testimonials WHERE id = ?', [testimonialId]);
    return rows[0];
};
exports.createTestimonialService = createTestimonialService;
const getAllTestimonialsService = async (approved) => {
    let query = `
    SELECT t.*, u.name as student_name, u.email as student_email
    FROM testimonials t
    LEFT JOIN users u ON t.student_id = u.id
    WHERE 1=1
  `;
    const params = [];
    if (approved !== undefined) {
        query += ' AND t.is_approved = ?';
        params.push(approved === 'true');
    }
    query += ' ORDER BY t.created_at DESC';
    const [rows] = await db_1.default.execute(query, params);
    return rows;
};
exports.getAllTestimonialsService = getAllTestimonialsService;
const getTestimonialByIdService = async (id) => {
    const [rows] = await db_1.default.execute(`SELECT t.*, u.name as student_name, u.email as student_email
     FROM testimonials t
     LEFT JOIN users u ON t.student_id = u.id
     WHERE t.id = ?`, [id]);
    return rows[0];
};
exports.getTestimonialByIdService = getTestimonialByIdService;
const updateTestimonialService = async (id, testimonialData) => {
    const fields = Object.keys(testimonialData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(testimonialData);
    if (fields.length === 0) {
        const [rows] = await db_1.default.execute('SELECT * FROM testimonials WHERE id = ?', [id]);
        return rows[0];
    }
    await db_1.default.execute(`UPDATE testimonials SET ${fields} WHERE id = ?`, [...values, id]);
    const [rows] = await db_1.default.execute('SELECT * FROM testimonials WHERE id = ?', [id]);
    return rows[0];
};
exports.updateTestimonialService = updateTestimonialService;
const deleteTestimonialService = async (id) => {
    await db_1.default.execute('DELETE FROM testimonials WHERE id = ?', [id]);
};
exports.deleteTestimonialService = deleteTestimonialService;
const approveTestimonialService = async (id, isApproved) => {
    await db_1.default.execute('UPDATE testimonials SET is_approved = ? WHERE id = ?', [isApproved, id]);
    const [rows] = await db_1.default.execute('SELECT * FROM testimonials WHERE id = ?', [id]);
    return rows[0];
};
exports.approveTestimonialService = approveTestimonialService;
