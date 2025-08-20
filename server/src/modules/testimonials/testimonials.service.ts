import pool from '../../config/db';
import { CreateTestimonialInput, UpdateTestimonialInput } from './testimonials.validation';

export const createTestimonialService = async (testimonialData: CreateTestimonialInput) => {
  const { student_id, name_override, photo_url, quote, rating } = testimonialData;
  const [result] = await pool.execute(
    'INSERT INTO testimonials (student_id, name_override, photo_url, quote, rating) VALUES (?, ?, ?, ?, ?)',
    [student_id, name_override, photo_url, quote, rating]
  );
  const testimonialId = (result as any).insertId;
  const [rows] = await pool.execute('SELECT * FROM testimonials WHERE id = ?', [testimonialId]);
  return (rows as any[])[0];
};

export const getAllTestimonialsService = async (approved?: string) => {
  let query = `
    SELECT t.*, u.name as student_name, u.email as student_email
    FROM testimonials t
    LEFT JOIN users u ON t.student_id = u.id
    WHERE 1=1
  `;
  const params: (string | boolean)[] = [];

  if (approved !== undefined) {
    query += ' AND t.is_approved = ?';
    params.push(approved === 'true');
  }

  query += ' ORDER BY t.created_at DESC';

  const [rows] = await pool.execute(query, params);
  return rows;
};

export const getTestimonialByIdService = async (id: number) => {
  const [rows] = await pool.execute(
    `SELECT t.*, u.name as student_name, u.email as student_email
     FROM testimonials t
     LEFT JOIN users u ON t.student_id = u.id
     WHERE t.id = ?`,
    [id]
  );
  return (rows as any[])[0];
};

export const updateTestimonialService = async (id: number, testimonialData: Partial<UpdateTestimonialInput>) => {
  const fields = Object.keys(testimonialData).map(key => `${key} = ?`).join(', ');
  const values = Object.values(testimonialData);

  if (fields.length === 0) {
    const [rows] = await pool.execute('SELECT * FROM testimonials WHERE id = ?', [id]);
    return (rows as any[])[0];
  }

  await pool.execute(`UPDATE testimonials SET ${fields} WHERE id = ?`, [...values, id]);
  const [rows] = await pool.execute('SELECT * FROM testimonials WHERE id = ?', [id]);
  return (rows as any[])[0];
};

export const deleteTestimonialService = async (id: number) => {
  await pool.execute('DELETE FROM testimonials WHERE id = ?', [id]);
};

export const approveTestimonialService = async (id: number, isApproved: boolean) => {
  await pool.execute('UPDATE testimonials SET is_approved = ? WHERE id = ?', [isApproved, id]);
  const [rows] = await pool.execute('SELECT * FROM testimonials WHERE id = ?', [id]);
  return (rows as any[])[0];
};
